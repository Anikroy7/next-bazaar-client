"use client";

import { Textarea } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

import { ITextArea } from "@/src/types";

interface IProps extends ITextArea { }

export default function NBTextArea({
    variant = "bordered",
    size = "md",
    required = false,
    type = "text",
    label,
    name,
    disabled = false,
    placeholder = "Enter your description"
}: IProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const errorMessage = errors?.[name]?.message as string | undefined;

    return (
        <Textarea
            disableAnimation
            disableAutosize
            classNames={{
                base: "w-[100%]",
                input: "resize-y min-h-[40px]",
            }}
            {...register(name)}
            errorMessage={errorMessage || ""}
            isInvalid={!!errors?.[name]}
            label={label}
            required={required}
            size={size}
            type={type}
            variant={variant}
            isDisabled={disabled}
            placeholder={placeholder}
        />
    );
}
