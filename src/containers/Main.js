import React, {Component} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import {Container} from 'reactstrap';

import AddStory from '../views/AddStory';
import DeveloperView from '../views/DeveloperView';
import MasterView from '../views/MasterView';

import {getSession,subscribeSession} from "../actions/sessionActions";

class Main extends Component {

  componentWillMount() {
    // const {getSession,subscribeSession} = this.props;
    // getSession();
  }

  componentDidUpdate() {
  }

  render() {
    const {props} = this;
    return (
      <div>
        {
          !props.isAppInitializing ?
            <div className="app animated fadeIn">
              <div className="app-body">
                <main className="main">
                  <Container fluid>
                    <Switch>
                      <Route path="/add-story" name="Add Story" component={AddStory}/>
                      <Route path="/view-planning-as-master/:sessionId" name="View Planning As Master" component={MasterView}/>
                      <Route path="/view-planning-as-developer/:sessionId" name="View Planning As Master"
                             component={DeveloperView}/>
                      <Redirect from="/" to="/add-story"/>
                    </Switch>
                  </Container>
                </main>
              </div>
            </div> :
            <div className="app justify-content-center">
              <div className="d-flex flex-row justify-content-center">
                <span className="app-loader fa fa-5x fa-spin fa-circle-o-notch"></span>
              </div>
            </div>
        }
      </div>
    );


  }

};

const mapStateToProps = (state) => {
  return {
    isAppInitializing: false
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getSession,
  subscribeSession
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Main));