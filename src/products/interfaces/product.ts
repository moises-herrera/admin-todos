export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

export interface ProductInCart {
  product: Product;
  quantity: number;
}