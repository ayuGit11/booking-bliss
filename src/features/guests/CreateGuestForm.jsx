import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import PropTypes from "prop-types";
import { useCreateGuest } from "./useCreateGuest";

function CreateGuestForm({ onCloseModal }) {
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {},
  });
  const { errors } = formState;
  const { isCreating, createGuest } = useCreateGuest();
  const isWorking = isCreating;

  function onSubmit(data) {
    createGuest(
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
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="FullName" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isWorking}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="E-mail" error={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          disabled={isWorking}
          {...register("email", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Input
          type="text"
          id="nationality"
          disabled={isWorking}
          {...register("nationality", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="National Id" error={errors?.id?.message}>
        <Input
          type="text"
          id="id"
          defaultValue={0}
          disabled={isWorking}
          {...register("id", { required: "This field is required" })}
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
        <Button disabled={isWorking}>Create new guest</Button>
      </FormRow>
    </Form>
  );
}
CreateGuestForm.propTypes = {
  guestToEdit: PropTypes.object.isRequired, // Adjust the prop type according to your cabin object structure
  onCloseModal: PropTypes.object.isRequired,
};

export default CreateGuestForm;
