// import type
import { CLEAR_ROLE, ROLE_DATA } from "./type";

export const role = (data, dispatch) => {
  dispatch({
    type: ROLE_DATA,
    role: {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
      restriction: data.restriction,
      currentPageAccess: data.currentPageAccess,
    },
  });
};

export const clearRole = (dispatch) => {
  dispatch({
    type: CLEAR_ROLE
  });
};