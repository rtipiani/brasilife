export interface QuoteItem {
  id: string;
  code: string;
  slug: string;
  name: string;
  category: string;
  quantity: number;
  imageUrl?: string;
}

const STORAGE_KEY = 'brasilife_b2b_quote_v1';
export const QUOTE_UPDATED_EVENT = 'brasilife:quote-updated';
export const QUOTE_DRAWER_OPEN_EVENT = 'brasilife:quote-drawer-open';

export function getQuoteItems(): QuoteItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveQuoteItems(items: QuoteItem[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(QUOTE_UPDATED_EVENT, { detail: items }));
  } catch {
    // ignore storage errors
  }
}

export function addToQuote(
  item: Omit<QuoteItem, 'quantity'>,
  quantity = 1,
  openDrawer = false
) {
  const current = getQuoteItems();
  const existingIndex = current.findIndex((i) => i.id === item.id);

  if (existingIndex > -1) {
    current[existingIndex].quantity += quantity;
    if (item.imageUrl && !current[existingIndex].imageUrl) {
      current[existingIndex].imageUrl = item.imageUrl;
    }
  } else {
    current.push({
      id: item.id,
      code: item.code,
      slug: item.slug,
      name: item.name,
      category: item.category,
      imageUrl: item.imageUrl,
      quantity,
    });
  }
  saveQuoteItems(current);
  if (openDrawer && typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(QUOTE_DRAWER_OPEN_EVENT));
  }
}

export function addMultipleToQuote(
  items: Omit<QuoteItem, 'quantity'>[],
  openDrawer = true
) {
  items.forEach((item) => {
    addToQuote(item, 1, false);
  });
  if (openDrawer && typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(QUOTE_DRAWER_OPEN_EVENT));
  }
}

export function updateQuoteItemQuantity(index: number, quantity: number) {
  const current = getQuoteItems();
  if (index < 0 || index >= current.length) return;
  if (quantity <= 0) {
    current.splice(index, 1);
  } else {
    current[index].quantity = quantity;
  }
  saveQuoteItems(current);
}

export function removeQuoteItem(index: number) {
  const current = getQuoteItems();
  current.splice(index, 1);
  saveQuoteItems(current);
}

export function clearQuote() {
  saveQuoteItems([]);
}

export function openQuoteDrawer() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(QUOTE_DRAWER_OPEN_EVENT));
  }
}
