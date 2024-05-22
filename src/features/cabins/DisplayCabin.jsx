import Spinner from "../../ui/Spinner";
import DisplayCabinRow from "./DisplayCabinRow";
import { useCabins } from "./useCabins";
import Empty from "../../ui/Empty";

export default function DisplayCabin() {
  const { isLoading, cabins } = useCabins();
  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  return (
    <>
      {cabins.map((cabin) => (
        <DisplayCabinRow cabin={cabin} key={cabin.id} />
      ))}
    </>
  );
}
