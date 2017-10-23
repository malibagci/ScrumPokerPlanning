import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {addSession} from "../actions/sessionActions";
import {setActiveStory} from "../actions/storyActions";

class AddStory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sessionName: '',
      sessionVoters: 0,
      sessionStories: []
    }
  }

  _addSession = () => {

    const {addSession, setActiveStory} = this.props;
    const sessionId = this.state.sessionName.replace(/ /g, '-');

    const session = {
      sessionId: sessionId,
      sessionName: this.state.sessionName,
      sessionVoters: this.state.sessionVoters,
      sessionStories: this.state.sessionStories,
      voters: {
        votermaster: {
          name: "votermaster"
        }
      }
    }
    addSession(session);
    //make first story active
    setActiveStory(session, 0);
  }

  _handleChange = (event) => {

    if (event.target.name === 'sessionStories') {
      const storiesArr = event.target.value.split('\n');
      let stories = {}
      storiesArr.map((story, key) => {
        stories[key] = {
          name: story,
          isActive: false,
          point: "-",
          id: key
        };
      });


      this.setState({[event.target.name]: stories})
    }
    else {
      this.setState({[event.target.name]: event.target.value})
    }

    if (event.target.value !== '') {
      // this.unsetError(event.target.name);
    }
  };

  render() {
    const {state, props} = this;
    return (
      <div className="session">
        <div className='session__wrapper'>

          <div className='session__info'>
            <div>
              <label htmlFor="sessionName">Session Name</label>
              <input onChange={this._handleChange} type="text" name="sessionName"/>
            </div>
            <div>
              <label htmlFor="sessionVoters">Number of Voters</label>
              <input onChange={this._handleChange} type="text" name="sessionVoters"/>
            </div>
          </div>
          <div className='session__story'>
            <label htmlFor="sessionStories">Paste your story list (Each line will be converted as a story)</label>
            <textarea onChange={this._handleChange} rows="4" name="sessionStories"/>
          </div>
          <div className='session__footer'>
            <button onClick={this._addSession}>Start Session</button>
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
  addSession,
  setActiveStory
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStory)