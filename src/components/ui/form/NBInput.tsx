"use client";

import { Input } from "@nextui-org/input";
import { Controller, useFormContext } from "react-hook-form";
import React from "react";

import { IInput } from "@/src/types";

interface IProps extends IInput { }
const NBInput = React.memo(function NBInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  disabled = false,
}: IProps) {
  const {
    register,
    formState: { errors },
    control
  } = useFormContext();

  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          errorMessage={errorMessage || ""}
          isDisabled={disabled}
          isInvalid={!!errors?.[name]}
          label={label}
          required={required}
          size={size}
          type={type}
          variant={variant}
        />
      )}
    />

  );
});

export default NBInput;
