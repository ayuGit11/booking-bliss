import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import UserCreateBookingForm from "./UserCreateBookingForm";
import CreateGuestForm from "../guests/CreateGuestForm";
import { useCabin } from "./useCabin";
import UserForm from "../guests/UserForm";

const UserBookCabinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  background-color: var(--color-orange-200);
  border-radius: 20px;
  padding: 40px;
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

const InfoSection = styled.div`
  margin-bottom: 30px;
`;

const ToggleButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const InfoText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  color: var(--color-silver-700);
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  background-color: #007bff;
  color: white;
  margin: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const SectionTitle = styled.h3`
  margin-bottom: 10px;
  color: var(--color-new-200);
  font-weight: bold;
`;

const ModalContent = styled.div`
  padding: 20px;
  text-align: left;
  font-size: 16px;
  line-height: 1.5;
`;

function UserBookCabin() {
  const [isNewUser, setIsNewUser] = useState(true);
  const { cabin } = useCabin();
  return (
    <UserBookCabinContainer>
      <FormBox>
        {isNewUser ? (
          <InfoSection>
            <SectionTitle>New Guest Registration</SectionTitle>
            <InfoText>Please add a new guest first.</InfoText>
            <InfoText>Please be careful while adding yourself.</InfoText>
            <InfoText>We need your national Id number for adding you.</InfoText>
            <Modal>
              <Modal.Open opens="guest-form">
                <StyledButton>Add new Guest</StyledButton>
              </Modal.Open>
              <Modal.Window name="guest-form">
                <ModalContent>
                  <CreateGuestForm />
                </ModalContent>
              </Modal.Window>
            </Modal>
          </InfoSection>
        ) : (
          <>
            <InfoSection>
              <SectionTitle>Booking Options</SectionTitle>
              <InfoText>You can now add a booking.</InfoText>
              <Modal>
                <Modal.Open opens="booking-form">
                  <StyledButton>Add new Booking</StyledButton>
                </Modal.Open>
                <Modal.Window name="booking-form">
                  <ModalContent>
                    <UserCreateBookingForm cabin={cabin} key={cabin.id} />
                  </ModalContent>
                </Modal.Window>
              </Modal>
            </InfoSection>
            <InfoSection>
              <SectionTitle>Your Bookings</SectionTitle>
              <InfoText>See Your booking details</InfoText>
              <Modal>
                <Modal.Open opens="booking-form">
                  <StyledButton>Existing Booking</StyledButton>
                </Modal.Open>
                <Modal.Window name="booking-form">
                  <ModalContent>
                    <UserForm />
                  </ModalContent>
                </Modal.Window>
              </Modal>
            </InfoSection>
          </>
        )}
      </FormBox>
      <ToggleButtonContainer>
        <StyledButton onClick={() => setIsNewUser(!isNewUser)}>
          {isNewUser ? "I'm an existing user" : "I'm a new user"}
        </StyledButton>
      </ToggleButtonContainer>
    </UserBookCabinContainer>
  );
}

export default UserBookCabin;
