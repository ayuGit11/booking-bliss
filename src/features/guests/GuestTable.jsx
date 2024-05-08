import Spinner from "../../ui/Spinner";
import GuestRow from "./GuestRow";
import { useGuests } from "./useGuests";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

export default function GuestTable() {
  const { isLoading, guests } = useGuests();
  if (isLoading) return <Spinner />;
  if (!guests.length) return <Empty resourceName="guests" />;
  return (
    <Menus>
      <Table columns=" 1.5fr 1fr 2.2fr 1fr 0.6fr 0.2fr">
        <Table.Header>
          <div>Guest Id</div>
          <div>FullName</div>
          <div>E-mail</div>
          <div>Nationality</div>
          <div>No of Visits</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={guests}
          render={(guest) => <GuestRow guest={guest} key={guest.id} />}
        />
      </Table>
    </Menus>
  );
}
