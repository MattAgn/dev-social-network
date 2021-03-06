import { ADD_POST, GET_POSTS, POST_LOADING } from "../actions/types";

const intialState = {
  posts: [],
  post: {},
  loading: false
};

function postReducer(state = intialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.payload
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    default:
      return state;
  }
}

export default postReducer;
