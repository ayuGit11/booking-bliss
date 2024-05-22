import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useCreateBooking } from "../bookings/useCreateBooking";
import { usePackages } from "../packages/usePackages";
import Select from "../../ui/Select";

function UserCreateBookingForm({ bookingToEdit = {}, onCloseModal, cabin }) {
  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);
  const { id: cabinId, maxCapacity: capacity } = cabin;
  const { register, handleSubmit, reset, formState, watch, setValue } = useForm(
    {
      defaultValues: isEditSession ? editValues : {},
    }
  );
  const { errors } = formState;
  const { isCreating, createBooking } = useCreateBooking();
  const isWorking = isCreating;
  const { packages } = usePackages();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  function onSubmit(data) {
    createBooking(
      { ...data, cabinId: cabinId },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type="modal">
      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          min={today} // Set the minimum date to today
          disabled={isWorking}
          {...register("startDate", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          min={today} // Set the minimum date to today
          disabled={isWorking}
          {...register("endDate", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Num of Guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          disabled={isWorking}
          {...register("numGuests", {
            required: "This field is required",
            min: {
              value: 1,
              message: "numGuests should be at least 1",
            },
            max: {
              value: capacity,
              message: `numGuests should not exceed ${capacity}`,
            },
          })}
        />
      </FormRow>
      <FormRow label="Num of Nights" error={errors?.numNights?.message}>
        <Input
          type="number"
          id="numNights"
          disabled={isWorking}
          {...register("numNights", {
            required: "This field is required",
            min: {
              value: 1,
              message: "numNights should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Cabin Id">
        <Input
          type="number"
          id="cabinId"
          value={cabinId}
          disabled={true}
          {...register("cabinId")}
        />
      </FormRow>

      <FormRow label="Guest Id" error={errors?.guestId?.message}>
        <Input
          type="text"
          id="guestId"
          disabled={isWorking}
          {...register("guestId", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Package Name">
        <Select
          value={watch("packageId")}
          onChange={(e) => setValue("packageId", e.target.value)}
          options={
            packages &&
            packages.map((pack) => ({
              value: pack.id,
              label: `${pack.name} (Price: Rs.${pack.price})`,
            }))
          }
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>Create new Booking</Button>
      </FormRow>
    </Form>
  );
}

export default UserCreateBookingForm;
