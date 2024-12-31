"use client";

import { Textarea } from "@nextui-org/input";
import { Controller, useFormContext } from "react-hook-form";

import { ITextArea } from "@/src/types";

interface IProps extends ITextArea {}

export default function NBTextArea({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  disabled = false,
  placeholder = "Enter your description",
}: IProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Textarea
          disableAnimation
          disableAutosize
          classNames={{
            base: "w-[100%]",
            input: "resize-y min-h-[40px]",
          }}
          {...field}
          errorMessage={errorMessage || ""}
          isDisabled={disabled}
          isInvalid={!!errors?.[name]}
          label={label}
          placeholder={placeholder}
          required={required}
          size={size}
          type={type}
          variant={variant}
        />
      )}
    />
  );
}
