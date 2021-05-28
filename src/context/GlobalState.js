import React, { createContext, useReducer } from "react";
import { reducer } from "./AppReducer";

// Initial state
const initialState = {
  auth: false,
  username: "",
  data: [
    {
      url: "https://res.cloudinary.com/djclc3a7t/image/upload/v1622048270/5_varpfj.png",
      name: "Five",
    },
    {
      url: "https://res.cloudinary.com/djclc3a7t/image/upload/v1622048270/4_uakrrm.png",
      name: "Four",
    },
    {
      url: "https://res.cloudinary.com/djclc3a7t/image/upload/v1622048270/3_lsai5t.png",
      name: "Three",
    },
    {
      url: "https://res.cloudinary.com/djclc3a7t/image/upload/v1622048270/1_w4lazg.png",
      name: "Two",
    },
    {
      url: "https://res.cloudinary.com/djclc3a7t/image/upload/v1622048270/2_lgkxfr.png",
      name: "One",
    },
  ],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions
  function login() {
    dispatch({
      type: "LOGIN",
    });
  }

  function logout() {
    dispatch({
      type: "LOGOUT",
    });
  }

  function naming(username) {
    dispatch({
      type: "NAME",
      payload: username,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        auth: state.auth,
        username: state.username,
        data: state.data,
        login,
        logout,
        naming,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
