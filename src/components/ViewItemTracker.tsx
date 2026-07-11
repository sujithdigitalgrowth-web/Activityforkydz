"use client";

import { useEffect } from "react";
import type { Product } from "@/lib/products";
import { pushDataLayer, toDataLayerItems } from "@/lib/gtm";

export default function ViewItemTracker({ product }: { product: Product }) {
  useEffect(() => {
    pushDataLayer({
      event: "view_item",
      ecommerce: {
        currency: "INR",
        value: product.price,
        items: toDataLayerItems([product]),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);

  return null;
}
