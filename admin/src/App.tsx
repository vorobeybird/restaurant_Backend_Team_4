import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import GlobalStyles from "./theme/GlobalStyles";
import { Route, Switch } from "react-router-dom";
import LoginLayout from "./components/layouts/LoginLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import "./App.css";
import io from 'socket.io-client'
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignIn,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import React, { useState } from "react";
import { useSnackbar } from 'notistack';

Amplify.configure(awsconfig);

function Index() {
  const [authState, setAuthState] = useState<AuthState>();
  const [user, setUser] = useState<any>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  console.log(user);
  let group;
  if (user) {
    group = user.signInUserSession.idToken.payload["cognito:groups"];
    if(group){
        group = group[0]
    }
  }
  console.log(group);
  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);
  // const [orders, setOrders] = useState(true)


  React.useEffect(() => {
    const socket = io(`ws://${process.env.API_ADRESS}`)
    socket.on('connnection', () => {
      console.log('connected to server');
    })

    socket.on('order-added', (newOrders) => {
       enqueueSnackbar('Новый заказ!',{
        variant: 'info',
    });
      console.log("We were updated");
    })

    socket.on('message', (message) => {
      console.log(message);
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnecting');
    })

  }, [])

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {group === "Admin" && (
            <div className="App">
              <Switch>
                <Route path="/login">
                  <LoginLayout />
                </Route>
                <Route path="/">
                  <AdminLayout />
                </Route>
              </Switch>
            </div>
          )}
          {group !== "Admin" && (
            <div className="App">
              <p>You are not admin</p>
            </div>
          )}
        </ThemeProvider>
      </StyledEngineProvider>
      <AmplifySignOut />
    </div>
  ) : (
    <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: "email",
            label: "Email Address *",
            placeholder: "Enter your email address",
            inputProps: { required: true, autocomplete: "username" },
          },
          {
            type: "password",
            label: "Password *",
            placeholder: "Enter your email address",
            inputProps: { required: true, autocomplete: "new-password" },
          },
        ]}
      />
      <AmplifySignIn
        slot="sign-in"
        usernameAlias="email"
        formFields={[{ type: "email" }, { type: "password" }]}
      />
    </AmplifyAuthenticator>
  );
}

export default App;
