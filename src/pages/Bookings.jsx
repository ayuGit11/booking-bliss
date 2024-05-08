import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import AddBooking from "../features/bookings/AddBooking";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
export default function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Bookings</Heading>
        <BookingTableOperations />
      </Row>
      <Row>
        <BookingTable />
        <AddBooking />
      </Row>
    </>
  );
}
