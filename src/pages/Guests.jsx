import GuestTable from "../features/guests/GuestTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddGuest from "../features/guests/AddGuest";

function Guests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Guests</Heading>
      </Row>

      <Row>
        <AddGuest />
        <GuestTable />
      </Row>
    </>
  );
}

export default Guests;
