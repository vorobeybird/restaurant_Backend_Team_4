import React from 'react'
import Amplify from '@aws-amplify/core'
import awsconfig from './aws-exports'
import { Authenticator, ConfirmSignIn, ForgotPassword } from 'aws-amplify-react-native'
import { BottomTabNavigation } from './navigation/nav'
import { Store } from './store/index'

import { Provider, useSelector, useDispatch } from 'react-redux'
import SignUp from './authComponents/SignUp'
import SignIn from './authComponents/SignIn'
import { addSignInStat} from './store/StoreCard'

import ConfirmSignUp from './authComponents/ConfirmSignUp'

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
})

const ShowMainContent = () => {
  return (
    <BottomTabNavigation/>
  )
}
const ShowAuthContent = () => {
  const dispatch = useDispatch()
  const handleAddSignInStat = (item:any) => {
      dispatch(addSignInStat(item))
  }
  return (
    <Authenticator
      usernameAttributes='email'
      authState='signIn'
      hideDefault={true}
      onStateChange={(authState:any) => {console.log('...authState',authState);handleAddSignInStat(authState)}}>
      <SignUp/>
      <SignIn/>
      <ConfirmSignUp/>
      <ConfirmSignIn/>
      <ForgotPassword/>  
    </Authenticator>
  )
}
const ShowContent = () => {
  const cart = useSelector((state) => state.dishes);
  
  
  return (
    <>
      {cart.isSignedIn ==='signedIn' ? (
        <ShowMainContent/>
        
      ):(
        <ShowAuthContent/>
        
      )}
    </>
  )
}


const App = () => {
  
  return (
      <Provider store={Store}>
        <ShowContent/>
      </Provider>
    )
  
  
}


export default App
