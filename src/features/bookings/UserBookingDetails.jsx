import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

const Container = styled.div`
  max-width: 1500px;
  margin: auto;
  margin-top: 100px;
  padding: 40px;
  background-color: var(--color-teal-200);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

function UserBookingDetails() {
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;
  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Container>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <TagWrapper>
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          </TagWrapper>
        </HeadingGroup>
      </Row>

      <BookingDataBox booking={booking} />

      <StyledButton variation="secondary" onClick={moveBack}>
        Back
      </StyledButton>
    </Container>
  );
}

export default UserBookingDetails;
