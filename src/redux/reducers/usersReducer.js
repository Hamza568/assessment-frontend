const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_SUCCESS":
      return { ...state, users: action.payload };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "EDIT_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload.user : user
        ),
      };
    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    default:
      return state;
  }
};

export default usersReducer;
