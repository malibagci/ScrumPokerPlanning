import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {getSession, subscribeSession} from "../actions/sessionActions";
import {setVoting, setCurrentVoter,getActiveStory} from "../actions/storyActions";

const votingOptions = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 134, '?'];

class MasterView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sessionName: '',
      sessionVoters: 0,
      sessionStories: [],
      selectedOption: null
    }
  }

  componentWillMount() {
    const {getSession, subscribeSession, match, setCurrentVoter,getActiveStory} = this.props;
    const sessionId = match.params.sessionId;
    getSession(sessionId);
    subscribeSession(sessionId);
    setCurrentVoter({name: 'votermaster'});
    getActiveStory(sessionId);
  }

  _setVoting = (point) => {
    const {setVoting, currentSession, activeStory, currentVoter} = this.props;
    setVoting(currentSession.sessionId, activeStory.id, currentVoter, point)
    console.log(this.state)
  }

  _handleChange = (event) => {
    if (event.target.name === 'sessionStories') {
      const stories = event.target.value.split('\n');
      this.setState({[event.target.name]: stories})
    }
    else {
      this.setState({[event.target.name]: event.target.value})
    }

    if (event.target.name === 'selectedOption') {
      this._setVoting(event.target.value)
    }
  };

  render() {
    const {state, props} = this;
    console.log(props)
    const activeSessionStories = props.currentSession.sessionStories;
    const activeSessionVoters = props.currentSession.voters;

    let stories = [], voters = [];
    // Generate array for map function. Firebase returns object
    for (const story in activeSessionStories) {
      if (activeSessionStories.hasOwnProperty(story)) {
        stories.push(activeSessionStories[story]);
      }
    }

    // Generate array for map function. Firebase returns object
    for (const voter in activeSessionVoters) {
      if (activeSessionVoters.hasOwnProperty(voter)) {
        voters.push(activeSessionVoters[voter]);
      }
    }

    return (
      <div className="active-story-container">
        <div className="sharing-url">Share Url: {window.location.href.replace('master', 'developer')}</div>
        <div className='active-story__wrapper'>
          <div className='story-list__wrapper'>
            <h4>Story List</h4>
            <table>
              <thead>
              <tr>
                <th>Story</th>
                <th>Story Point</th>
                <th>Status</th>
              </tr>
              </thead>
              <tbody>
              {
                stories.map((story, key) => {
                  return <tr key={key}>
                    <td>{story.name}</td>
                    <td>{story.point}</td>
                    <td>{story.isActive ? 'Active' : 'Not Voted'}</td>
                  </tr>
                })
              }
              </tbody>

            </table>
          </div>
          <div className='voting__wrapper'>
            <h4>Active Story</h4>
            <form>
              {
                votingOptions.map((value, key) => {
                  return <div className="radio" key={key}>
                    <label>
                      <input name="selectedOption" type="radio" value={value}
                             checked={this.state.selectedOption == value}
                             onChange={this._handleChange}/>
                      {value}
                    </label>
                  </div>
                })
              }
            </form>
          </div>
          <div className='panel__wrapper'>
            <h4>Scrum Master Panel</h4>
            <div className='panel__info'>
              <h5>{props.activeStory.name} is Active</h5>
              <div className="panel__voter-list">
                {
                  voters.map((voter, key) => {
                    return <div key={key}>
                      <span>{voter.name}:</span>
                      <span>{(props.activeStory.votes && props.activeStory.votes[voter.name]) ? props.activeStory.votes[voter.name].point : 'Not Voted'}</span>
                    </div>

                  })
                }

              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentSession: state.session.currentSession,
    activeStory: state.story.activeStory,
    currentVoter: state.story.currentVoter,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getSession,
  subscribeSession,
  setVoting,
  setCurrentVoter,
  getActiveStory
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterView)