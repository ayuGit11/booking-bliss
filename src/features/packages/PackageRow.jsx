import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helper";
import CreatePackageForm from "./CreatePackageForm";
import { useDeletePackage } from "./useDeletePackage";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;
const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Package = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function PackageRow({ pack }) {
  const { isDeleting, deletePackage } = useDeletePackage();
  const { id: packageId, name, price, discount, image, description } = pack;
  return (
    <Table.Row>
      <Img src={image} />
      <Package> {name}</Package>
      <Package> {description}</Package>
      <Price>{formatCurrency(price)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={packageId} />
            <Menus.List id={packageId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreatePackageForm packageToEdit={pack} />
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="packages"
                disabled={isDeleting}
                onConfirm={() => deletePackage(packageId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}
PackageRow.propTypes = {
  package: PropTypes.object.isRequired, // Adjust the prop type according to your cabin object structure
};
export default PackageRow;
//https://tnbnzgnztbodhoyhfxmd.supabase.
//co/storage/v1/object/sign/cabin-images/0.6108623110250893-cabin-003.
//jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbi1pbWFnZXMvMC4wNDU5ODkyODU0NDE5MjQ2LWNhYmluLTAwMi5qcGciLCJpYXQiOjE3MTIzNzQ4MTUsImV4cCI6MTc0MzkxMDgxNX0.I5nq1UjXYWJyO8wxKsjGL0GhEnKYg7TFGL9rK0KiMk0&t=2024-04-06T03%3A40%3A15.247Z
