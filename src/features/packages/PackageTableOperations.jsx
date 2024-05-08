import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
function PackageTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "price-asc", label: "Sort by price (low-first)" },
          { value: "price-desc", label: "Sort by price (high-first)" },
        ]}
      />
    </TableOperations>
  );
}
export default PackageTableOperations;
