import React from 'react'
import { StatusBar } from 'react-native'
import Amplify from '@aws-amplify/core'
import { Authenticator } from 'aws-amplify-react-native'
import awsconfig from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'
import { BottomTabNavigation } from './navigation/nav'
Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
})

const App = () => {

  const signUpConfig = {
    hideAllDefaults: true,
    signUpFields: [
      {
        label: 'Email',
        key: 'email',
        required: true,
        displayOrder: 1,
        type: 'string',
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 2,
        type: 'password',
      },
    ],
  }
  return (
    <>
      <BottomTabNavigation/>
      
    </>
  )
}

export default withAuthenticator(App)
