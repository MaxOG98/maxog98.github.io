import React from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  FirstName: string;
  LastName: string;
  Email: string;
  Subject: string;
  Message: string;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Subject: "",
      Message: "",
    },
  });
  const onSubmit = (data: FormValues) => console.log(data);
  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-8 md:px-8 md:py-0"
    >
      <div className="grid w-full grid-cols-2 gap-x-4">
        <label htmlFor="FirstName">First Name</label>
        <label htmlFor="LastName">Last Name</label>
        <input
          type="text"
          className="mb-4"
          /* placeholder="FirstName" */
          {...register("FirstName", {
            required: { value: true, message: "First name is required" },
            maxLength: {
              value: 20,
              message: "First name should be less than 20 characters",
            },
          })}
        />
        <input
          type="text"
          className="mb-4"
          /* placeholder="LastName" */
          {...register("LastName", {
            required: { value: true, message: "Last name is required" },
            maxLength: {
              value: 20,
              message: "Last name should be less than 20 characters",
            },
          })}
        />
      </div>

      <label htmlFor="Email">Email</label>
      <input
        type="text"
        className="mb-4"
        {...register("Email", {
          required: { value: true, message: "Email is required" },
          pattern: /^\S+@\S+$/i,
        })}
      />
      <label htmlFor="Subject">Subject</label>
      <input
        type="text"
        className="mb-4"
        {...register("Subject", {
          required: { value: true, message: "Email subject is required" },
        })}
      />
      <label htmlFor="Message">Message</label>
      <textarea
        className="mb-4"
        {...register("Message", {
          required: { value: true, message: "Email message is required" },
        })}
      />

      <input
        type="submit"
        value="Submit"
        className="m-auto w-28 rounded-xl bg-accent px-4 py-3 font-semibold text-white hover:bg-accentdark"
      />
    </form>
  );
}
