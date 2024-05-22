import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useBookingId } from "../guests/useBookingId";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
const BookingDetails = styled.div`
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: var(--color-teal-200);
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Info = styled.p`
  margin: 5px 0;
  strong {
    color: #555;
  }
`;

const Subtitle = styled.h2`
  color: #333;
`;

const CabinImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 4px;
`;

export default function UserDetails() {
  const { data, isLoading } = useBookingId();
  const navigate = useNavigate();
  if (isLoading) return <Spinner />;
  if (!data) return <Empty resourceName="User Booking Details" />;
  const { id: bookingId, totalPrice, guests, cabins } = data;
  const { id: guestId, fullName: guestName, email } = guests;
  const { id: cabinId, name: cabinName, image } = cabins;
  return (
    <BookingDetails>
      <Title>Welcome {guestName}!</Title>
      <Section>
        <Info>
          <strong>Email:</strong> {email}
        </Info>
        <Info>
          <strong>National ID:</strong> {guestId}
        </Info>
      </Section>
      <Section>
        <Info>
          <strong>Booking ID:</strong> {bookingId}
        </Info>
        <Info>
          <strong>Total Price:</strong> ${totalPrice}
        </Info>
      </Section>
      <Section>
        <Subtitle>Cabin Details</Subtitle>
        <Info>
          <strong>Cabin Name:</strong> {cabinName}
        </Info>
        {image && <CabinImage src={image} alt={`${cabinName}`} />}
      </Section>
      <Button
        onClick={() =>
          navigate(`/users/cabins/${cabinId}/book/${guestId}/${bookingId}`)
        }
      >
        Details of BookingId:#{bookingId}
      </Button>
    </BookingDetails>
  );
}
