import { api } from "../lib/axios";
import type { Coffee } from "../pages/Home/components/CoffeeCard";

export async function getCoffees(): Promise<Coffee[]> {
  try {
    const response = await api.get<Coffee[]>("/coffees");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cafés:", error);
    return [];
  }
}
