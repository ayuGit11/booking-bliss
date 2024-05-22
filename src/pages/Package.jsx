import PackageTable from "../features/packages/PackageTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddPackage from "../features/packages/AddPackage";
import PackageTableOperations from "../features/packages/PackageTableOperations";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Packages</Heading>
        <PackageTableOperations />
      </Row>

      <Row>
        <AddPackage />
        <PackageTable />
      </Row>
    </>
  );
}

export default Cabins;
