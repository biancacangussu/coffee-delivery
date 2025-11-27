import { useFormContext } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { RegularText } from "../../../../components/Typography";
import { useCart } from "../../../../hooks/useCart";
import { orderItem } from "../../../../services/orderItem";
import { formatMoney } from "../../../../utils/formatMoney";
import { ConfirmationSectionContainer } from "./styles";

const DELIVERY_PRICE = 3.5;

export function ConfirmationSection() {
  const { formState, getValues } = useFormContext();
  const isSubmitDisabled = !formState.isValid;

  const { cartItemsTotal, cartQuantity, cleanCart, cartItems } = useCart();
  const cartTotal = DELIVERY_PRICE + cartItemsTotal;

  const formattedItemsTotal = formatMoney(cartItemsTotal);
  const formattedCartTotal = formatMoney(cartTotal);
  const formattedDeliveryPrice = formatMoney(DELIVERY_PRICE);

  const handleConfirmOrder = async () => {
    if (cartQuantity === 0) return;

    const form = getValues();

    const orderItems = cartItems.map((item) => ({
      coffeeId: item.id,
      quantity: item.quantity,
    }));

    const order = {
      address: `${form.street}, ${form.number}, ${form.district} - ${form.city}/${form.uf}`,
      paymentMethod: form.paymentMethod,
      items: orderItems,
    };

    const result = await orderItem(order);

    if (result) {
      cleanCart();
    } else {
      alert("Ocorreu um erro ao confirmar o pedido.");
    }
  };

  return (
    <ConfirmationSectionContainer>
      <div>
        <RegularText size="s">Total de itens</RegularText>
        <RegularText size="s">R$ {formattedItemsTotal}</RegularText>
      </div>

      <div>
        <RegularText size="s">Entrega</RegularText>
        <RegularText size="s">R$ {formattedDeliveryPrice}</RegularText>
      </div>

      <div>
        <RegularText weight="700" color="subtitle" size="l">
          Total
        </RegularText>
        <RegularText weight="700" color="subtitle" size="l">
          R$ {formattedCartTotal}
        </RegularText>
      </div>

      <Button
        text="Confirmar Pedido"
        disabled={cartQuantity <= 0 || isSubmitDisabled}
        onClick={handleConfirmOrder}
        type="submit"
      />
    </ConfirmationSectionContainer>
  );
}
