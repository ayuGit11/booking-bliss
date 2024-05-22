import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useCabin } from "./useCabin";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 30px;
  background-color: var(--color-orange-200);
  border-bottom: 1px solid #ccc;
  border-radius: 5px;
`;

const CabinImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const CabinDescription = styled.div`
  background-color: var(--color-teal-200);
  padding: 20px;
  line-height: 2;
  border-radius: 10px;
  margin-bottom: 20px;
`;
const BackButton = styled(Button)`
  position: relative;
  margin-top: 10px;
  left: 20px;
`;

const DiscountContainer = styled.div`
  background-color: #f9f9f9;
  padding: 10px 20px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
`;

const RegularPrice = styled.span`
  text-decoration: line-through;
  color: #888;
  margin-right: 10px;
`;
const DiscountPrice = styled.span`
  color: #f00;
`;
const Buttont = styled(Button)`
  position: relative;
  margin-top: 10px;
  left: 40px;
`;
function DisplayCabinDetails() {
  const { cabin, isLoading } = useCabin();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const [playAnimation, setPlayAnimation] = useState(true);

  useEffect(() => {
    // Stop animation when the component unmounts
    return () => {
      setPlayAnimation(false);
    };
  }, []);

  if (isLoading) return <Spinner />;
  if (!cabin) return <Empty resourceName="cabin" />;

  const {
    id: cabinId,
    name,
    image,
    description,
    regularPrice,
    discount,
    totalPrice,
  } = cabin;
  return (
    <Container>
      <Row type="horizontal" align="center">
        <Heading as="h1">Cabin #{name}</Heading>
      </Row>
      <CabinImage src={image} alt={name} />
      <CabinDescription>
        <p>{description}</p>
      </CabinDescription>
      <DiscountContainer>
        <RegularPrice playAnimation={playAnimation}>
          Rs.{regularPrice}
        </RegularPrice>
        {discount && (
          <DiscountPrice>
            Rs.{totalPrice} (Rs.{discount} off)
          </DiscountPrice>
        )}
      </DiscountContainer>
      <BackButton variation="secondary" onClick={moveBack}>
        &larr; Back
      </BackButton>
      <Buttont onClick={() => navigate(`/users/cabins/${cabinId}/book`)}>
        Book Now
      </Buttont>
    </Container>
  );
}

export default DisplayCabinDetails;
