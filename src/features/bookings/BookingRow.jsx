import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  HiTrash,
  HiEye,
  // HiArrowUpOnSquare,
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
} from "react-icons/hi2";

import Tag from "../../ui/Tag";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helper";
import { formatDistanceFromNow } from "../../utils/helper";
import { format, isToday } from "date-fns";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import toast from "react-hot-toast";
import { useEditBooking } from "./useEditBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking }) {
  var {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email, id: guestId, numOfVisits: visit },
    cabins: { name: cabinName, totalPrice: cabinPrice },
    packages: { totalPrice: packagePrice },
  } = booking;
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { isEditing, editBooking } = useEditBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const navigate = useNavigate();
  // We will not allow editing at this point, as it's too complex for bookings... People just need to delete a booking and create a new one

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const isOffer = visit > 2 ? true : false;
  var offPrice = 0;
  if (visit > 3) {
    offPrice = 0.3 * totalPrice;
  }
  if (visit === 2) {
    offPrice = 0.2 * totalPrice;
  }
  totalPrice = packagePrice + cabinPrice - offPrice;
  return (
    <Table.Row role="row">
      <Cabin>{cabinName}</Cabin>
      <Stacked>
        <span>{guestName && guestName}</span>
        <span>{email}</span>
        <span>GuestId:{guestId}</span>
      </Stacked>
      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>
      <Tag type={statusToTagName[status]}>
        {status && status.replace("-", " ")}
      </Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              onClick={() => navigate(`/admin/bookings/${bookingId}`)}
              icon={<HiEye />}
            >
              See details
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                onClick={() => {
                  navigate(`/admin/checkin/${bookingId}`);
                  if (isOffer) {
                    toast.success(
                      `Congratulations🥳🥳 You get ${offPrice} off on your booking.`
                    );
                    editBooking({
                      newBookingData: { totalPrice, offPrice },
                      id: bookingId,
                    });
                  }
                }}
                icon={<HiArrowDownOnSquare />}
              >
                Check in
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                onClick={() => {
                  checkout(bookingId);
                  navigate(`/admin/checkout/${bookingId}`);
                }}
                disabled={isCheckingOut}
                icon={<HiArrowUpOnSquare />}
              >
                Check out
              </Menus.Button>
            )}

            {/* <Menus.Button>Delete</Menus.Button> */}
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        {/* This needs to be OUTSIDE of the menu, which in no problem. The compound component gives us this flexibility */}
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            // These options will be passed wherever the function gets called, and they determine what happens next
            onConfirm={() => deleteBooking(bookingId)}
            disabled={isDeleting || isEditing}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
