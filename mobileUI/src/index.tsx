import React from 'react'
import Amplify from '@aws-amplify/core'
import awsconfig from './aws-exports'
import { Authenticator, ConfirmSignIn, ForgotPassword } from 'aws-amplify-react-native'
import { BottomTabNavigation } from './navigation/nav'
import  store  from './store/index'
import { Provider, useSelector, useDispatch } from 'react-redux'
import SignUp from './authComponents/SignUp'
import SignIn from './authComponents/SignIn'
import { addSignInStat} from './store/StoreCard'
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
 
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
  let persistor = persistStore(store)
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <ShowContent/>
        </PersistGate>
      </Provider>
    )
  
  
}


export default App
