import { api } from "../lib/axios";

export interface OrderPayload {
  address: string;
  paymentMethod: string;
  items: {
    coffeeId: number;
    quantity: number;
  }[];
}

export async function orderItem(order: OrderPayload) {
  try {
    const response = await api.post("/orders", order);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar pedido:", error);
    return null;
  }
}
