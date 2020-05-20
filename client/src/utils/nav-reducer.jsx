import React from 'react'

export default function navReducer (state, action) {
  switch (action.type) {
    case 'OPEN':
      return {
        navOpen: true
      }
    case 'CLOSE':
      return {
        navOpen: false
      }
    case 'TOGGLE':
      return {
        navOpen: action.navOpen
      }
    default:
      return state
  }
}
