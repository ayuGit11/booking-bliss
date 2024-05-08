import Button from "ui/Button";
import { useCheckout } from "./useCheckout";
import { useNavigate } from "react-router-dom";

function CheckoutButton({ bookingId }) {
  const { isLoading, mutate: checkout } = useCheckout();
  const navigate = useNavigate();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => {
        checkout(bookingId);
        navigate(`/checkout/${bookingId}`);
      }}
      disabled={isLoading}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
