import { Formik, Form as FormikForm, FormikHelpers, FormikValues } from "formik";
import * as yup from "yup";
import React from "react";

interface FormProps<T extends FormikValues = Record<string, unknown>> {
  LoginSchema: yup.ObjectSchema<T>;
  initialValues: T;
  onSubmit: (values: T, formikHelpers?: FormikHelpers<T>) => void;
  children: React.ReactNode;
}

function Form<T extends FormikValues = Record<string, unknown>>({
  LoginSchema,
  initialValues,
  onSubmit,
  children,
}: FormProps<T>) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {() => <FormikForm className="flex flex-col">{children}</FormikForm>}
    </Formik>
  );
}

export default Form;
