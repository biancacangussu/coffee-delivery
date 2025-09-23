import { api } from "../lib/axios";
import type { OrderItem } from "../pages/Home/components/CoffeeCard";

export async function orderItem(cartItems: OrderItem[]): Promise<OrderItem[] | null> {
  try {
    const response = await api.post<OrderItem[]>("/orders", { items: cartItems });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar pedido:", error);
    return null;
  }
}
