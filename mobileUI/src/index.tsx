import React from 'react'
import Amplify from '@aws-amplify/core'
import awsconfig from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'
import { BottomTabNavigation } from './navigation/nav'

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
})

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Username',
      key: 'username',
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

const App = () => {
  return (
      <BottomTabNavigation/>
  )
}

export default withAuthenticator(App, {signUpConfig})
