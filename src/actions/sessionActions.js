import {push} from 'react-router-redux';
import FireService from '../utils/fireService'

export const SESSION_REQ_START = 'session/SESSION_REQ_START';
export const SESSION_REQ_ERROR = 'session/SESSION_REQ_ERROR';
export const SESSION_ADD_SUCCESS = 'session/SESSION_ADD_SUCCESS';
export const SESSION_GET_SUCCESS = 'session/SESSION_GET_SUCCESS';

// Session Request started
export const SessionReqStart = () => {
  return {
    type: SESSION_REQ_START,
  }
};

// Session Request failed
export const SessionReqError = (payload) => {
  return {
    type: SESSION_REQ_ERROR,
    payload
  }
};

// Add new session success
export const SessionAddSuccess = (payload) => {
  return {
    type: SESSION_ADD_SUCCESS,
    payload
  }
};

// Get current session success
export const SessionGetSuccess = (payload) => {
  return {
    type: SESSION_GET_SUCCESS,
    payload
  }
};

export const addSession = (session) => {
  return dispatch => {
    console.log("AdddingSession")
    dispatch(SessionReqStart());
    FireService.addSession(session).then((data) => {
      dispatch(SessionAddSuccess(session));
      dispatch(push('/view-planning-as-master/' + session.sessionId))
    }).catch((error) => {
      dispatch(SessionReqError(error));
    });
  }
};

export const getSession = (sessionId) => {
  return dispatch => {
    console.log("getSession")
    dispatch(SessionReqStart());
    FireService.getSession(sessionId).then((data) => {
      console.log(data);
      dispatch(SessionGetSuccess(data.val()));
    }).catch((error) => {
      dispatch(SessionReqError(error));
    });
  }
};

export const subscribeSession = (sessionId) => {
  return dispatch => {
    console.log("subscribeSession")
    dispatch(SessionReqStart());
    FireService.subscribeSession(sessionId,(data) => {
      console.log("subscribeSessionUpdate")
      dispatch(SessionGetSuccess(data.val()));
    });
  }
};

