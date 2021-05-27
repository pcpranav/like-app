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
  function login() {
    dispatch({
      type: 'LOGIN',
    });
  }

  function logout() {
    dispatch({
      type: 'LOGOUT',
    });
  }

  function naming(username) {
    dispatch({
      type: 'NAME',
      payload:username
    });
  }

  return (<GlobalContext.Provider value={{
    auth: state.auth,
    username:state.username,
    login,
    logout,
    naming
  }}>
    {children}
  </GlobalContext.Provider>);
}