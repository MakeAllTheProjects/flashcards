import React from 'react'

export default function userReducer (state, action) {
  switch (action.type) {
    case 'LOGIN':
      console.log('LOGIN')  
      return {
        id: action.id,
        username: action.username,
        firstname: action.firstname,
        token: action.token
      }
    case 'LOGOUT':
      console.log('LOGOUT')
      return {
        id: null,
        username: '',
        firstname: '',
        token: ''
      }
    default:
      return state
  }
}