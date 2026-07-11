import type { Product } from "./products";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type DataLayerItem = {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
};

export function toDataLayerItems(
  products: Pick<Product, "slug" | "title" | "price">[]
): DataLayerItem[] {
  return products.map((p) => ({
    item_id: p.slug,
    item_name: p.title,
    price: p.price,
    quantity: 1,
  }));
}

export function pushDataLayer(data: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}
