import {StyledEngineProvider, ThemeProvider} from '@mui/material/styles';
import theme from './theme';
import GlobalStyles from './theme/GlobalStyles';
import {Route, Switch} from 'react-router-dom';
import LoginLayout from './components/layouts/LoginLayout';
import AdminLayout from './components/layouts/AdminLayout';
import "./App.css";

import {AmplifyAuthenticator, AmplifySignOut, AmplifySignIn, AmplifySignUp} from '@aws-amplify/ui-react';
import {AuthState, onAuthUIStateChange} from '@aws-amplify/ui-components';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import React, {useState} from "react";

Amplify.configure(awsconfig);


function App() {
    const [authState, setAuthState] = useState<AuthState>();
    const [user, setUser] = useState<object | undefined>();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);
    return authState === AuthState.SignedIn && user ? (
        <div className="App">
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <GlobalStyles/>
                    <div className="App">
                        <Switch>
                            <Route path="/login"><LoginLayout/></Route>
                            <Route path="/"><AdminLayout/></Route>
                        </Switch>
                    </div>
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
                        inputProps: {required: true, autocomplete: "username"},
                    },
                    {
                        type: "password",
                        label: "Password *",
                        placeholder: "Enter your email address",
                        inputProps: {required: true, autocomplete: "new-password"},
                    },
                ]}
            />
            <AmplifySignIn slot="sign-in"
                           usernameAlias="email"
                           formFields={[
                               {type: "email"},
                               {type: "password"},
                           ]}/>
        </AmplifyAuthenticator>
    );
}

export default App;
