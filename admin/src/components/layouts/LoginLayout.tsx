import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Grid, Paper, TextField, Button, Typography, Link} from "@mui/material";
import {Auth} from 'aws-amplify';

const LoginLayout = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [userSignInEmail, setUserSignInEmail] = useState("");
  const [userSignInPassword, setUserSignInPassword] = useState("");

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserEmail(e.currentTarget.value);
  }

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserPassword(e.currentTarget.value);
  }

  const confirmCodeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmCode(e.currentTarget.value);
  }

  const emailSignInChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserSignInEmail(e.currentTarget.value);
  }

  const passwordSignInChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserSignInPassword(e.currentTarget.value);
  }

  const signInHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await Auth.signIn(userSignInEmail, userSignInPassword);
      console.log(user)
    } catch (error) {
      console.log('error signing in', error);
    }
  };

  const signUpHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const {user} = await Auth.signUp({
        username: userEmail,
        password: userPassword,
        attributes: {
          email: userEmail,          // optional
          // phone_number,   // optional - E.164 number convention
          // other custom attributes
        }
      });
      console.log(user);
    } catch (error) {
      console.log('error signing up:', error);
    }
    setUserPassword("");
  }

  const confirmCodeHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const confirm = await Auth.confirmSignUp(userEmail, confirmCode);
      console.log(confirm);
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  //function for signOut
  //
  // async function signOut() {
  //   try {
  //     await AuthenticationScreen.signOut();
  //   } catch (error) {
  //     console.log('error signing out: ', error);
  //   }
  // }

  //function for global signOut
  // async function signOut() {
  //   try {
  //     await AuthenticationScreen.signOut({ global: true });
  //   } catch (error) {
  //     console.log('error signing out: ', error);
  //   }
  // }
  const paperStyle = {padding: "20px", height: "50vh", width: "280px", margin: "20px auto"}
  return <Grid>
    <Paper elevation={10} style={paperStyle}>
      <Grid>
        <h2>Sign in</h2>
      </Grid>
      <form onSubmit={signInHandler}>
        <TextField value={userSignInEmail} onChange={emailSignInChangeHandler} label="Email" placeholder="Enter your email" fullWidth required></TextField>
        <TextField value={userSignInPassword} onChange={passwordSignInChangeHandler} label="Password" placeholder="Enter your password" type="password" fullWidth required></TextField>
        <Button type="submit" color="primary" variant="contained" fullWidth>Sign In</Button>
      </form>
      <Typography>
        <Link href="#"> Forgot password?</Link>
      </Typography>
      <Typography>
        <p>Do you have an account?</p>
        <Link href="#">
          Sign Up
        </Link>
      </Typography>
    </Paper>
    <Paper elevation={10} style={paperStyle}>
      <Grid>
        <h2>Sign Up</h2>
      </Grid>
      <form onSubmit={signUpHandler}>
        <TextField value={userEmail} onChange={emailChangeHandler} label="Email" placeholder="Enter your email" fullWidth required></TextField>
        <TextField value={userPassword} onChange={passwordChangeHandler} label="Password" placeholder="Enter your password" type="password" fullWidth required></TextField>
        <Button type="submit" color="primary" variant="contained" fullWidth>Sign Up</Button>
      </form>
      <form onSubmit={confirmCodeHandler}>
        <TextField value={confirmCode} onChange={confirmCodeChangeHandler} label="Confirmation code" placeholder="Enter your code for confirmation" fullWidth required></TextField>
        <Button type="button" color="primary" variant="contained" fullWidth>Confirm code</Button>
      </form>
    </Paper>
  </Grid>
};

export default LoginLayout;
