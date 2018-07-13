import axios from "axios";
import { PROFILE_LOADING, GET_PROFILE, CLEAR_CURRENT_PROFILE } from "./types";

const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});

const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export { getCurrentProfile, clearCurrentProfile };
