import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import UserCreateBookingForm from "./UserCreateBookingForm";
import CreateGuestForm from "../guests/CreateGuestForm";
import { useCabin } from "./useCabin";

const UserBookCabinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const FormBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 500px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
`;

const ToggleButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const InfoText = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

function UserBookCabin() {
  const [isNewUser, setIsNewUser] = useState(true);
  const { cabin } = useCabin();
  return (
    <UserBookCabinContainer>
      <FormBox>
        {isNewUser ? (
          <div>
            <InfoText>Please add a new guest first.</InfoText>
            <InfoText>Please be carefull while adding yourself.</InfoText>
            <InfoText>We need your national Id number for adding you.</InfoText>
            <Modal>
              <Modal.Open opens="guest-form">
                <Button>Add new Guest</Button>
              </Modal.Open>
              <Modal.Window name="guest-form">
                <CreateGuestForm />
              </Modal.Window>
            </Modal>
          </div>
        ) : (
          <div>
            <InfoText>You can now add a booking.</InfoText>
            <Modal>
              <Modal.Open opens="booking-form">
                <Button>Add new Booking</Button>
              </Modal.Open>
              <Modal.Window name="booking-form">
                <UserCreateBookingForm cabin={cabin} key={cabin.id} />
              </Modal.Window>
            </Modal>
          </div>
        )}
      </FormBox>
      <ToggleButtonContainer>
        <Button onClick={() => setIsNewUser(!isNewUser)}>
          {isNewUser ? "I'm an existing user" : "I'm a new user"}
        </Button>
      </ToggleButtonContainer>
    </UserBookCabinContainer>
  );
}

export default UserBookCabin;
