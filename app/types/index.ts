export interface User {
  id: string;
  email: string;
  name: string;
  role?: 'admin' | 'editor';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  thumbnail?: string;
  category_id?: string;
  category?: Category;
  author_id?: string;
  author?: User;
  status: 'draft' | 'published' | 'archived';
  featured?: boolean;
  views?: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  specifications?: Record<string, any>;
  price?: number;
  image_url?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

export interface APIResponse<T> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}
