// eslint-disable-next-line
import React from 'react'

export default function userReducer (state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        id: action.id,
        username: action.username,
        firstname: action.firstname,
        token: action.token
      }
    case 'LOGOUT':
      return {
        id: null,
        username: '',
        firstname: ''
      }
    default:
      return state
  }
}