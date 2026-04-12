/**
 * Storefront product order: newest SD-3 / LM items first; SD-2 vinyl and buff last.
 * Handles come from Shopify (see Storefront API `product.handle`).
 */
const PRIMARY_ORDER = [
  'sd-3-2-lp-vinyl',
  'loukeman-sd-3-cd',
  'loukeman-lm-shirt',
  'loukeman-sd-3-bundle',
];

const DEFER_TO_END = ['loukeman-sd-2-vinyl', 'rainbow-buff-1'];

export function sortProductsForStore(products) {
  if (!products?.length) {
    return products;
  }

  const primarySet = new Set(PRIMARY_ORDER);
  const deferSet = new Set(DEFER_TO_END);

  const primary = PRIMARY_ORDER.map((handle) =>
    products.find((p) => p.handle === handle)
  ).filter(Boolean);

  const deferred = DEFER_TO_END.map((handle) =>
    products.find((p) => p.handle === handle)
  ).filter(Boolean);

  const middle = products.filter(
    (p) => !primarySet.has(p.handle) && !deferSet.has(p.handle)
  );

  return [...primary, ...middle, ...deferred];
}
