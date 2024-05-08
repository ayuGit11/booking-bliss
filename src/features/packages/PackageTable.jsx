import Spinner from "../../ui/Spinner";
import PackageRow from "./PackageRow";
import { usePackages } from "./usePackages";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

export default function PackageTable() {
  const { isLoading, packages } = usePackages();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  if (!packages.length) return <Empty resourceName="packages" />;
  //1. Filter
  const filterValue = searchParams.get("discount") || "all";
  let filteredPackages;
  if (filterValue === "all") filteredPackages = packages;
  if (filterValue === "no-discount")
    filteredPackages = packages.filter((pack) => pack.discount === 0);
  if (filterValue === "with-discount")
    filteredPackages = packages.filter((pack) => pack.discount > 0);
  //2.Sort

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedPackages = filteredPackages.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  return (
    <Menus>
      <Table columns=" 0.5fr 1fr 2.3fr 1fr 1fr 0.2fr">
        <Table.Header>
          <div>Package</div>
          <div>Name</div>
          <div>Description</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedPackages}
          render={(pack) => <PackageRow pack={pack} key={pack.id} />}
        />
      </Table>
    </Menus>
  );
}
