"use client";

import { ReactNode, useEffect, useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface formConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface IProps extends formConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
}

export default function NBForm({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: IProps) {
  const formConfig: formConfig = {};
  const methods = useForm(formConfig);

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues, { keepDefaultValues: false });
    }
  }, [defaultValues]);
  const submitHandler = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
