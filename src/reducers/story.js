export const VOTER_REQ_START = 'story/VOTER_REQ_START';
export const VOTER_REQ_ERROR = 'story/VOTER_REQ_ERROR';
export const VOTER_ADD_SUCCESS = 'story/VOTER_ADD_SUCCESS';
export const VOTER_VOTING_SUCCESS = 'story/VOTER_VOTING_SUCCESS';
export const STORY_SET_ACTIVE = 'story/STORY_SET_ACTIVE';
export const STORY_CURRENT_VOTER = 'story/STORY_CURRENT_VOTER';

const initialState = {
  isRequesting: false,
  currentSession: {},
  requestError: {},
  activeStory: {},
  currentVoter: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VOTER_REQ_START:
      return {
        ...state,
        isRequesting: true
      };

    case VOTER_REQ_ERROR:
      return {
        ...state,
        isRequesting: false,
        requestError: action.payload
      };

    case VOTER_ADD_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        currentSession: action.payload
      };

    case VOTER_VOTING_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        currentSession: action.payload
      };

    case STORY_SET_ACTIVE:
      return {
        ...state,
        activeStory: action.payload
      };

    case STORY_CURRENT_VOTER:
      return {
        ...state,
        currentVoter: action.payload
      };

    default:
      return state;
  }
}