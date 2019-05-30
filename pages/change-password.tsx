import { Field, Formik } from "formik";
import _get from "lodash/get";
import { NextContext } from "next";
import Router from "next/router";
import React from "react";
import { InputField } from "../components/fields/InputField";
import Layout from "../components/Layout";
import { ChangePasswordComponent } from "../generated/apolloComponents";

interface ChangePasswordPageProps {
  token: string;
}

const ChangePasswordPage = ({ token }: ChangePasswordPageProps) => {
  return (
    <Layout title="Register Page">
      <ChangePasswordComponent>
        {changePassword => (
          <Formik
            onSubmit={async ({ password }) => {
              const response = await changePassword({
                variables: {
                  data: {
                    password,
                    token
                  }
                }
              });

              if (_get(response, "data.changePassword")) {
                Router.push("/");
              } else {
                // something went wrong
              }
            }}
            initialValues={{
              password: ""
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field name="password" component={InputField} type="password" />
                <button type="submit">Change Password</button>
              </form>
            )}
          </Formik>
        )}
      </ChangePasswordComponent>
    </Layout>
  );
};

ChangePasswordPage.getInitialProps = ({
  query
}: NextContext<{ token: string }>) => {
  const { token } = query;

  return {
    token
  };
};

export default ChangePasswordPage;
