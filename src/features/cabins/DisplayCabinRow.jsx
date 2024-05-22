import styled from "styled-components";
import { formatCurrency } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: var(--color-orange-200);
  border-bottom: 1px solid #ccc;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 5px;
`;

const CabinDetails = styled.div`
  flex-grow: 1;
`;

const CabinName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Capacity = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

const Price = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
`;

const Discount = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-green-700);
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto; /* Shifts the button container to the right */
`;

const Button = styled.button`
  background-color: #6464bf;
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a7a7ef;
  }
`;

function DisplayCabinRow({ cabin }) {
  const navigate = useNavigate();
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;
  return (
    <Row>
      <Img src={image} alt={name} />
      <CabinDetails>
        <CabinName>{name}</CabinName>
        <Capacity>Capacity: Fits up to {maxCapacity}</Capacity>
        <Price>Price: {formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>Discount: {formatCurrency(discount)}</Discount>
        ) : (
          ""
        )}
      </CabinDetails>
      <ButtonContainer>
        <Button onClick={() => navigate(`/users/cabins/${cabinId}`)}>
          See Details
        </Button>
        <Button onClick={() => navigate(`/users/cabins/${cabinId}/book`)}>
          Book Now
        </Button>
      </ButtonContainer>
    </Row>
  );
}

export default DisplayCabinRow;
