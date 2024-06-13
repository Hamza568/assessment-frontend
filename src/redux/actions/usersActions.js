import axios from "axios";

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      dispatch({ type: "FETCH_USERS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_USERS_FAILURE", payload: error.message });
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      dispatch({ type: "DELETE_USER", payload: id });
    } catch (error) {
      dispatch({ type: "DELETE_USER_FAILURE", payload: error.message });
    }
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/users", user);
      dispatch({ type: "ADD_USER", payload: response.data });
    } catch (error) {
      dispatch({ type: "ADD_USER_FAILURE", payload: error.message });
    }
  };
};

export const editUser = (id, user) => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`http://localhost:5000/users/${id}`, user);
      // Update the user in the Redux store
      const updatedUsers = getState().users.map((u) =>
        u.id === id ? { ...u, ...user } : u
      );
      dispatch({ type: "FETCH_USERS_SUCCESS", payload: updatedUsers });
    } catch (error) {
      dispatch({ type: "EDIT_USER_FAILURE", payload: error.message });
    }
  };
};
