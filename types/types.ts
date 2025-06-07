// Base types
export interface Image {
  url: string;
  altText: string;
  isPrimary: boolean;
}

export interface Variant {
  id: string;
  name: string;
  priceOffset: number;
  stocks: Stock[];
}


export interface Stock {
  quantity: number;
  sku: string;
  barcode: string;
  location: string;
  variant: Variant;
}

export interface Category {
  id: string;
  name: string;
imageUrl:string;
description:string;
products:Product[];
subcategories:Subcategory[];  
}

export interface Subcategory {
  id: string;
  name: string;
}

// Main product interface
export interface Product {
  id: string;
  name: string;
  slug: string;
  image:string;
  description: string;
  basePrice: number;
  images: Image[];
  totalStock: number;
  stockCount: number;
  stocks: Stock[];
  category: Category;
  subcategory: Subcategory;
}

// Array type for multiple products
export type Products = Product[];

// Optional: More specific variant types if you want to be more strict

export type JeansSize = '28/32' | '30/32' | '32/32' | '34/32' | '36/32';

// Enhanced variant interface with specific types
export interface SizeVariant {
  name: SizeVariant | JeansSize | string; // string as fallback for other sizes
}

// Enhanced stock interface with typed variants
export interface TypedStock {
  quantity: number;
  sku: string;
  barcode: string;
  location: string;
  variant: SizeVariant;
}

// Enhanced product interface with typed stocks
export interface TypedProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  images: Image[];
  totalStock: number;
  stockCount: number;
  stocks: TypedStock[];
  category: Category;
  subcategory: Subcategory;
}

// Utility types for specific use cases
export interface ProductSummary {
  id: string;
  name: string;
  basePrice: number;
  primaryImage: string;
  totalStock: number;
  availableSizes: string[];
}

export interface StockSummary {
  sku: string;
  variant: string;
  quantity: number;
  isAvailable: boolean;
}

// API response types
export interface ProductsApiResponse {
  products: Product[];
  total: number;
  page?: number;
  limit?: number;
}

export interface SingleProductApiResponse {
  product: Product;
}

// For React Native component props
export interface ProductCardProps {
  product: Product;
  onPress?: (productId: string) => void;
  showStock?: boolean;
}

export interface ProductListProps {
  products: Product[];
  loading?: boolean;
  onProductPress?: (productId: string) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
}

// For filtering and searching
export interface ProductFilters {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sizes?: string[];
}

export interface ProductSearchParams {
  query?: string;
  filters?: ProductFilters;
  sortBy?: 'name' | 'price' | 'stock';
  sortOrder?: 'asc' | 'desc';
}

// For cart functionality
export interface CartItem {
  productId: string;
  productName: string;
  sku: string;
  variant: string;
  quantity: number;
  price: number;
  image: string;
}

// Error types
export interface ProductError {
  message: string;
  code?: string;
  field?: string;
}

// Form types for product management
export interface CreateProductRequest {
  name: string;
  description: string;
  basePrice: number;
  categoryId: string;
  subcategoryId: string;
  images: Omit<Image, 'isPrimary'>[];
  stocks: Omit<Stock, 'variant'> & { variantName: string }[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

export  type Slider={
  id:number,
  image:string,
  title:string
}