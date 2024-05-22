import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchBookingId } from "../../services/apiBookings";

export function useBookingId() {
  const { guestId } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookingId", guestId],
    queryFn: () => fetchBookingId(guestId),
    retry: false,
  });
  return { isLoading, error, data };
}
