import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import {
  deepPurple,
  indigo,
  lightBlue,
  pink
} from '@material-ui/core/colors'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[700],
      light: deepPurple[400],
      dark: deepPurple[900],
      contrastText: deepPurple[50]
    },
    secondary: {
      main: lightBlue[600],
      light: lightBlue[300],
      dark: lightBlue[800],
      contrastText: lightBlue[50]
    },
    error: {
      main: pink.A400,
      light: pink[400],
      dark: pink[700],
      contrastText: pink[100]
    },
    background: {
      default: indigo[50]
    },
    zIndex: {
      appBar: 1400
    }
  },
  typography: [
    'Roboto'
  ].join(', ')
})
