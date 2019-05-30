import React from "react";
import isUuid from "validator/lib/isUUID";
import {
  ConfirmUserMutation,
  ConfirmUserVariables
} from "../generated/apolloComponents";
import { confirmUserMutation } from "../graphql/user/mutations/confirmUser";
import { MyContext } from "../interfaces/MyContext";
import redirect from "../lib/redirect";

class Confirm extends React.PureComponent {
  static async getInitialProps({
    query: { token },
    apolloClient,
    ...ctx
  }: MyContext) {
    if (!token || !isUuid(String(token), 4)) {
      return {};
    }

    await apolloClient.mutate<ConfirmUserMutation, ConfirmUserVariables>({
      mutation: confirmUserMutation,
      variables: {
        token: String(token)
      }
    });

    redirect(ctx, "/login");

    return {
      token
    };
  }

  render() {
    return "No token, something went wrong";
  }
}

export default Confirm;
