import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {getSession, subscribeSession} from "../actions/sessionActions";
import {addVoter, setVoting} from "../actions/storyActions";

const votingOptions = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 134, '?'];

class DeveloperView extends Component {
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
    const {getSession, subscribeSession, addVoter, match} = this.props;
    const sessionId = match.params.sessionId;
    getSession(sessionId);
    subscribeSession(sessionId);
    addVoter(sessionId);
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
    let stories = [];
    for (const story in activeSessionStories) {
      if (activeSessionStories.hasOwnProperty(story)) {
        stories.push(activeSessionStories[story]);
      }
    }
    return (
      <div className="active-story-container">
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
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentSession: state.session.currentSession
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getSession,
  subscribeSession,
  addVoter,
  setVoting
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeveloperView)