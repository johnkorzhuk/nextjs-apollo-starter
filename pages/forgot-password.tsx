import { Field, Formik } from "formik";
import _get from "lodash/get";
import Router from "next/router";
import React from "react";
import { InputField } from "../components/fields/InputField";
import Layout from "../components/Layout";
import { ForgotPasswordComponent } from "../generated/apolloComponents";

const ForgotPasswordPage: React.SFC = () => {
  return (
    <Layout title="Register Page">
      <ForgotPasswordComponent>
        {fogotPassword => (
          <Formik
            onSubmit={async data => {
              const response = await fogotPassword({
                variables: data
              });

              if (_get(response, "data.forgotPassword")) {
                Router.push("/check-email");
              } else {
                // something went wrong
              }
            }}
            initialValues={{
              email: ""
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="email"
                  placeholder="email"
                  component={InputField}
                />
                <button type="submit">Reset Password</button>
              </form>
            )}
          </Formik>
        )}
      </ForgotPasswordComponent>
    </Layout>
  );
};

export default ForgotPasswordPage;
