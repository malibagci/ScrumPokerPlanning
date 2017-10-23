export const SESSION_REQ_START = 'session/SESSION_REQ_START';
export const SESSION_REQ_ERROR = 'session/SESSION_REQ_ERROR';
export const SESSION_ADD_SUCCESS = 'session/SESSION_ADD_SUCCESS';
export const SESSION_GET_SUCCESS = 'session/SESSION_GET_SUCCESS';

const initialState = {
  isRequesting: false,
  currentSession: {},
  requestError: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SESSION_REQ_START:
      return {
        ...state,
        isRequesting: true
      };

    case SESSION_REQ_ERROR:
      return {
        ...state,
        isRequesting: false,
        requestError: action.payload
      };

    case SESSION_ADD_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        currentSession: action.payload
      };

    case SESSION_GET_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        currentSession: action.payload
      };


    default:
      return state;
  }
}