export interface SearchFilters {
  category: 'smartphone' | 'earbuds' | 'laptop' | null;
  max_price: number | null;
  min_price: number | null;
  currency: string | null;
  brand: string | null;
  must_have: string[];
}

export interface Product {
  product_id: number;
  name: string;
  brand: string;
  category: string;
  specs: Record<string, any>;
  image_url: string | null;
  offer_id: number;
  seller: string;
  price: number;
  currency: string;
  reason?: string;
  score?: number;
}

export interface SearchResponse {
  query: string;
  filters: SearchFilters;
  results: Product[];
}

export async function searchProducts(query: string, signal?: AbortSignal): Promise<SearchResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

  const response = await fetch(`${apiUrl}/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
