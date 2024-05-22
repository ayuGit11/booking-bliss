import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useNavigate } from "react-router-dom";

function UserForm({ onCloseModal }) {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {},
  });
  const { errors } = formState;
  const navigate = useNavigate();

  function onSubmit(data) {
    const { id: guestId } = data;
    navigate(`/users/cabins/:cabinId/book/${guestId}`);
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="National Id" error={errors?.id?.message}>
        <Input
          type="text"
          id="id"
          defaultValue={0}
          {...register("id", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button type="submit">See Details</Button>
      </FormRow>
    </Form>
  );
}

export default UserForm;
