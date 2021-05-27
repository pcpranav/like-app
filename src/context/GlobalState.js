import React, { createContext, useReducer } from 'react';
import {reducer} from './AppReducer';

// Initial state
const initialState = {
  auth:false,
  username:""
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions
  function login(username) {
    dispatch({
      type: 'LOGIN',
      payload: username
    });
  }

  function logout() {
    dispatch({
      type: 'LOGOUT',
    });
  }

  return (<GlobalContext.Provider value={{
    auth: state.auth,
    username:state.username,
    login,
    logout
  }}>
    {children}
  </GlobalContext.Provider>);
}