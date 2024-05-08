import styled from "styled-components";
import PropTypes from "prop-types";
import CreateGuestForm from "./CreateGuestForm";
import { useDeleteGuest } from "./useDeleteGuest";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";

const Text = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Num = styled.div`
  font-weight: 600;
`;

function GuestRow({ guest }) {
  const { isDeleting, deleteGuest } = useDeleteGuest();
  const { id: guestId, fullName, email, nationality, numOfVisits } = guest;
  return (
    <Table.Row>
      <Num>{guestId}</Num>
      <Text>{fullName}</Text>
      <Text>{email}</Text>
      <Text>{nationality}</Text>
      <Num>{numOfVisits}</Num>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={guestId} />
            <Menus.List id={guestId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateGuestForm guestToEdit={guest} />
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="guests"
                disabled={isDeleting}
                onConfirm={() => deleteGuest(guestId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}
GuestRow.propTypes = {
  cabin: PropTypes.object.isRequired, // Adjust the prop type according to your cabin object structure
};
export default GuestRow;
