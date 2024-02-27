import { WidgetItem } from '@/dashboard/components';
import { products } from '@/products/data';
import { ProductInCart } from '@/products/interfaces';
import { ItemCard } from '@/shopping-cart/components';
import { StoredShoppingCart } from '@/shopping-cart/interfaces';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Carrito de compras',
  description: 'Productos en el carrito',
};

const getProductsInCart = (cart: StoredShoppingCart): ProductInCart[] => {
  const productsInCart = products.reduce((list, product) => {
    const quantity = cart[product.id];
    if (quantity) {
      list.push({ product, quantity });
    }
    return list;
  }, [] as ProductInCart[]);

  return productsInCart;
};

const getTotalPrice = (products: ProductInCart[]) => {
  return products.reduce(
    (total, { product: { price }, quantity }) => total + price * quantity,
    0
  );
};

export default function CartPage() {
  const cookieStore = cookies();
  const cart = JSON.parse(
    cookieStore.get('cart')?.value ?? '{}'
  ) as StoredShoppingCart;
  const productsInCart = getProductsInCart(cart);
  const totalToPay = getTotalPrice(productsInCart);

  return (
    <div>
      <h1 className="text-5xl">Productos en el carrito</h1>
      <hr className="mb-2" />

      <div className="flex w-full">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <div className="flex flex-col gap-2 w-full sm:w-8/12">
            {productsInCart.map((item) => (
              <ItemCard key={item.product.id} {...item} />
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total a pagar">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">
                ${(totalToPay * 1.15).toFixed(2)}
              </h3>
            </div>
            <span className="font-bold text-center text-gray-500">
              Impuestos 15%: ${(totalToPay * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
