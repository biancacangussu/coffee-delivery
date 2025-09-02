import { useEffect, useState } from "react";
import { TitleText } from "../../../../components/Typography";
import { CoffeeCard, type Coffee } from "../CoffeeCard";
import { CoffeeList, OurCoffeesContainer } from "./styles";
import { getCoffees } from "../../../../services/getCoffees";

export function OurCoffees() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);

  useEffect(() => {
    async function loadCoffees() {
      try {
        const data = await getCoffees();
        setCoffees(data);
      } catch (error) {
        console.log(error);
      }
    }
    loadCoffees();
  }, []);

  return (
    <OurCoffeesContainer className="container">
      <TitleText size="l" color="subtitle">
        Nossos cafés
      </TitleText>

      <CoffeeList>
        {coffees.map((coffee) => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </CoffeeList>
    </OurCoffeesContainer>
  );
}
