import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import PropTypes from "prop-types";
import { useCreateBooking } from "./useCreateBooking";
import { useCabins } from "../cabins/useCabins";
import { usePackages } from "../packages/usePackages";
import Select from "../../ui/Select";

function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState, watch, setValue } = useForm(
    {
      defaultValues: isEditSession ? editValues : {},
    }
  );
  const { errors } = formState;
  const { isCreating, createBooking } = useCreateBooking();
  const isWorking = isCreating;
  const { cabins } = useCabins();
  const { packages } = usePackages();

  function onSubmit(data) {
    createBooking(
      { ...data },
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
          disabled={isWorking}
          {...register("startDate", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
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
              message: "numGuests should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Status">
        <Select
          value={watch("status")}
          onChange={(e) => setValue("status", e.target.value)}
          disabled={isWorking}
          options={[
            { value: "checked-in", label: "Checked In" },
            { value: "unconfirmed", label: "Unconfirmed" },
            { value: "checked-out", label: "Checked Out" },
          ]}
        />
      </FormRow>

      <FormRow label="Is Paid">
        <Select
          value={watch("isPaid")}
          onChange={(e) => setValue("isPaid", e.target.value)}
          disabled={isWorking}
          options={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
        />
      </FormRow>

      <FormRow label="Package Name">
        <Select
          value={watch("packageId")} // Assuming you're using react-hook-form's watch function
          onChange={(e) => setValue("packageId", e.target.value)} // Assuming you're using react-hook-form's setValue function
          options={
            packages &&
            packages.map((pack) => ({
              value: pack.id,
              label: pack.name,
            }))
          }
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin Id">
        <Select
          value={watch("cabinId")} // Assuming you're using react-hook-form's watch function
          onChange={(e) => setValue("cabinId", e.target.value)} // Assuming you're using react-hook-form's setValue function
          options={
            cabins &&
            cabins.map((cabin) => ({
              value: cabin.id,
              label: cabin.name,
            }))
          }
          disabled={isWorking}
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
CreateBookingForm.propTypes = {
  bookingToEdit: PropTypes.object.isRequired, // Adjust the prop type according to your cabin object structure
  onCloseModal: PropTypes.object.isRequired,
};
export default CreateBookingForm;
