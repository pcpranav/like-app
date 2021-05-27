export const reducer=(state, action) => {
    switch(action.type) {
      case 'LOGIN':
        return {
          ...state,
          auth:true,
          username:action.payload
        }
      case 'LOGOUT':
        return {
          ...state,
          auth:false,
          username:""
        }
      default:
        return state;
    }
  }