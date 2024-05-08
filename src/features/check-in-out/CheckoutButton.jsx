import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();
  const navigate = useNavigate();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => {
        checkout(bookingId);
        navigate(`/checkout/${bookingId}`);
      }}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
