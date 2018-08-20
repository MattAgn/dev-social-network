import axios from "axios";
import {
  PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";

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

const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export { getCurrentProfile, clearCurrentProfile, createProfile };
