export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  base_price: number;
  image_url: string;
  origin: string;
  temp: string;
  flavor_notes: string[];
  ingredients: string[];
  tags: string[];
  active: boolean;
  sort_order: number;
}

export interface ProductSize {
  id: string;
  product_id: string;
  size: "Small" | "Medium" | "Large";
  price_multiplier: number;
}

export interface Location {
  id: string;
  city: string;
  address: string;
  hours: string;
  image_url: string;
  map_link: string;
  active: boolean;
}

export interface Order {
  id: string;
  user_id: string | null;
  status: "pending" | "confirmed" | "preparing" | "ready" | "picked_up" | "cancelled";
  location_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  size: string;
  quantity: number;
  unit_price: number;
}

export interface Profile {
  id: string;
  name: string;
  phone: string;
  role: "customer" | "admin";
}
