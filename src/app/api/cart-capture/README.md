# Abandoned-cart capture — Google Sheets setup

`POST /api/cart-capture` (fired when a checkout visitor blurs a valid phone
number) and the `payment.captured` webhook both write to a Google Sheet
through a small Apps Script "Web App" acting as a write API. There's no
database in this project — this is the whole storage layer.

## One-time setup

1. Create a new Google Sheet. Add a header row to a tab named **exactly**
   `Carts` (the default tab is usually named `Sheet1` — rename it, or
   `getSheetByName` returns `null` and every write throws):
   `cartId | phone | email | items | amount | status | createdAt | reminderSent`
2. In the Sheet, go to **Extensions > Apps Script**, delete the boilerplate,
   and paste the script below.
3. Set `SHARED_SECRET` in the script to a long random string (anything —
   it's just so randoms on the internet can't write to your sheet).
4. **Deploy > New deployment > Web app**. Execute as **Me**, access
   **Anyone**. Deploy, then copy the web app URL.
5. Set these two env vars (locally in `.env.local`, and in your host's
   project settings for production):
   ```
   CART_CAPTURE_SHEET_WEBHOOK_URL=<the web app URL from step 4>
   CART_CAPTURE_SHEET_SECRET=<the same string you put in SHARED_SECRET>
   ```
6. Whenever you edit the script after this (secret, sheet name, logic),
   you must **Deploy > Manage deployments > ✏️ > Version: New version >
   Deploy** — just saving the script does not update the live `/exec` URL.

## Apps Script source

```js
const SHARED_SECRET = "change-me-to-a-long-random-string";
const SHEET_NAME = "Carts";

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  if (body.secret !== SHARED_SECRET) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: "unauthorized" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (body.action === "create") {
    sheet.appendRow([
      body.cartId,
      body.phone,
      body.email,
      body.items,
      body.amount,
      body.status,
      body.createdAt,
      body.reminderSent,
    ]);
  } else if (body.action === "complete") {
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === body.cartId) {
        sheet.getRange(i + 1, 6).setValue("completed"); // column F = status
        break;
      }
    }
  }

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, cartId: body.cartId })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

## Notes

- Both env vars are optional in code — if either is unset, `/api/cart-capture`
  still returns a `cartId` (so checkout never breaks), it just logs a
  console error instead of writing a row. Set them whenever the Sheet is
  ready.
- Apps Script Web Apps always respond with HTTP 200, even for an error it
  catches itself (bad secret, missing sheet) — the real result is the JSON
  body's `ok` field, not the HTTP status. `src/lib/cart-capture.ts` checks
  the body, not just `res.ok` — if you modify the script's response shape,
  keep an `ok` boolean in it or that check needs updating too.
- `reminder_sent` is stored but nothing sets it to `true` yet or sends a
  WhatsApp message — that's a separate job to build later (e.g. a cron that
  reads rows where `status = pending` and `createdAt` is >1hr old).
- Matching on `cartId` for the "complete" step means a cart only flips to
  `completed` if the shopper reached the same checkout session that logged
  the phone number in the first place. Re-visiting checkout after abandoning
  once gets a new `cartId` and a new row — that's expected, not a bug.
