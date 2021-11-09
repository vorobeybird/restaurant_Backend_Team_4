import React from 'react'
import Amplify from '@aws-amplify/core'
import awsconfig from './aws-exports'
import { withAuthenticator, Authenticator, SignIn, ConfirmSignIn, ForgotPassword } from 'aws-amplify-react-native'
import { BottomTabNavigation } from './navigation/nav'
import { Store } from './store/index'
import { Provider } from 'react-redux'
import SignUp from './authComponents/SignUp'
import ConfirmSignUp from './authComponents/ConfirmSignUp'
import Auth from '@aws-amplify/auth'
Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
})
// const DisplayNav = (props:any) => {
//   if(props.authState === 'signedIn'){
//     return (
//     <Provider store={Store}>
//       <BottomTabNavigation/>
//     </Provider>
//     ) 
//   }else {
//     return (
//       <>
//       </>
//     )
//   }
// }

const App = () => {

  return (
    <Provider store={Store}>
      
        <SignUp/>
        <SignIn/>
        <ConfirmSignUp/>
        <ConfirmSignIn/>
        <ForgotPassword/>
      
    </Provider>
  )
}

export default withAuthenticator(App)
