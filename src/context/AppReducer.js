export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        auth: true,
      };
    case "LOGOUT":
      return {
        ...state,
        auth: false,
      };
    case "NAME":
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};
