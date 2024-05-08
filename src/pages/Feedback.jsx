import { useEffect, useRef, useState } from "react";
import StarRating from "../ui/StarRating";
import Button from "../ui/Button";
import FormRow from "../ui/FormRow";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEditBooking } from "../features/bookings/useEditBooking";
import GlobalStyles from "../styles/GlobalStyles";

const Heading = styled.h1`
  text-align: center;
  font-size: 50px;
  font-weight: 2500px;
  padding-bottom: 10px;
`;

const Heading2 = styled.h2`
  text-align: center;
  font-size: 30px;
  font-weight: 1500px;
  padding-bottom: 10px;
  padding-bottom: 20px;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export default function Feedback() {
  let { bookingId } = useParams();
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);
  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );
  const { isEditing, editBooking } = useEditBooking();
  const navigate = useNavigate();
  function handleFeedback(userRating) {
    editBooking({ newBookingData: { userRating }, id: bookingId });
    navigate(`/bookings`);
  }
  return (
    <>
      <GlobalStyles />
      <>
        <Heading>Customer's Feedback</Heading>
        <Box>
          <Heading2>Rate our Service</Heading2>
          <StarRating onSetRating={setUserRating} />
        </Box>
        <FormRow>
          {userRating > 0 && (
            <Button
              disabled={isEditing}
              size="large"
              onClick={() => handleFeedback(userRating)}
            >
              Add {userRating}⭐
            </Button>
          )}
        </FormRow>
      </>
    </>
  );
}
