import {push} from 'react-router-redux';
import FireService from '../utils/fireService'

export const VOTER_REQ_START = 'story/VOTER_REQ_START';
export const VOTER_REQ_ERROR = 'story/VOTER_REQ_ERROR';
export const VOTER_ADD_SUCCESS = 'story/VOTER_ADD_SUCCESS';
export const VOTER_VOTING_SUCCESS = 'story/VOTER_VOTING_SUCCESS';
export const STORY_SET_ACTIVE = 'story/STORY_SET_ACTIVE';
export const STORY_CURRENT_VOTER = 'story/STORY_CURRENT_VOTER';

// Session Request started
export const VoterReqStart = () => {
  return {
    type: VOTER_REQ_START,
  }
};

// Session Request failed
export const VoterReqError = (payload) => {
  return {
    type: VOTER_REQ_ERROR,
    payload
  }
};

// Add new session success
export const VoterAddSuccess = (payload) => {
  return {
    type: VOTER_ADD_SUCCESS,
    payload
  }
};

// Get current session success
export const VoterVotingSuccess = (payload) => {
  return {
    type: VOTER_VOTING_SUCCESS,
    payload
  }
};

// Get current session success
export const StorySetActive = (payload) => {
  return {
    type: STORY_SET_ACTIVE,
    payload
  }
};

// Set current voter
export const StoryCurrentVoter = (payload) => {
  return {
    type: STORY_CURRENT_VOTER,
    payload
  }
};

export const addVoter = (session) => {
  return dispatch => {
    console.log("AdddingSession")
    dispatch(VoterReqStart());
    FireService.addVoter(session).then((data) => {
      dispatch(VoterAddSuccess(session));
    }).catch((error) => {
      dispatch(VoterReqError(error));
    });
  }
};
export const setCurrentVoter = (voter) => {
  return dispatch => {
    dispatch(StoryCurrentVoter(voter));
  }
};
export const setVoting = (sessionId, storyId, voter, point) => {
  return dispatch => {
    console.log("getSession")
    dispatch(VoterReqStart());
    FireService.setVoting(sessionId, storyId, voter, point).then((data) => {
    }).catch((error) => {
      dispatch(VoterReqError(error));
    });
  }
};

export const setActiveStory = (session, storyId) => {
  return dispatch => {
    console.log("getSession")
    dispatch(VoterReqStart());
    FireService.setActiveStory(session.sessionId, storyId).then((data) => {
      dispatch(StorySetActive(session.sessionStories[storyId]));
    }).catch((error) => {
      dispatch(VoterReqError(error));
    });
  }
};

export const getActiveStory = (sessionId) => {
  return dispatch => {
    console.log("getSession")
    dispatch(VoterReqStart());
    FireService.getActiveStory(sessionId).then((data) => {
      dispatch(StorySetActive(data.val()[0]));
    }).catch((error) => {
      dispatch(VoterReqError(error));
    });
  }
};


