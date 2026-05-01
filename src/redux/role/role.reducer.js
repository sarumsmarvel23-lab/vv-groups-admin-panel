import { CLEAR_ROLE, ROLE_DATA } from "./type";

const initialState = {
  _id: "",
  email: "",
  name: "",
  role: "",
  restriction: "",
  currentPageAccess: "",
};

const role = (state = initialState, action) => {
  switch (action.type) {
    case ROLE_DATA:
      return {
        ...state,
        ...action.role,
      };
    case CLEAR_ROLE:
      return initialState;
    default:
      return state;
  }
};

export default role;
