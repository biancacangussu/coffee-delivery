import { HeaderButton, HeaderButtonsContainer, HeaderContainer } from "./styles";
import { MapPin, ShoppingCart } from "phosphor-react";
import coffeeLogoImg from "../../assets/logo.webp";

export function Header() {
  return (
    <HeaderContainer >
      <div className="container">
        <img src={coffeeLogoImg} />

        <HeaderButtonsContainer>
          <HeaderButton variant="purple">
            <MapPin size={20} weight="fill" />
            Vinhedo, SP
          </HeaderButton>

          <HeaderButton variant="yellow">
            <ShoppingCart size={20} weight="fill"/>
          </HeaderButton>
        </HeaderButtonsContainer>
      </div>
    </HeaderContainer>
  );
}