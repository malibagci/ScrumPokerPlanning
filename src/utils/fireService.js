import * as firebase from "firebase";

class FireService {

  /**
   * Add New Session
   * @param session
   * @returns {firebase.Promise.<void>}
   */
  static addSession(session) {
    let sessionPath = "/session/" + session.sessionId;
    return firebase.database().ref(sessionPath).set({
      ...session,
      createdDate: firebase.database.ServerValue.TIMESTAMP,
    });
  }

  /**
   * Get Current Session
   * @param
   * @returns {firebase.Promise.<void>}
   */
  static getSession(sessionId) {
    let sessionPath = "/session/" + sessionId;
    return firebase.database().ref(sessionPath).once('value');
  }

  /**
   * Subscribe Current Session
   * @param
   * @returns
   */
  static subscribeSession(sessionId, cb) {
    let sessionPath = "/session/" + sessionId;
    firebase.database().ref(sessionPath).on('value', cb);
  }

  /**
   * Add New Voter
   * @param
   * @returns {firebase.Promise.<void>}
   */
  static addVoter(sessionId) {

    let sessionPath = "/session/" + sessionId;
    return firebase.database().ref(sessionPath).once('value').then((data) => {
      const session = data.val();
      console.log(session);
      let indexForVoter = 1;
      const voterCount = session.sessionVoters;
      if (session.voters) {
        indexForVoter = Object.keys(session.voters).length;
      }
      if (voterCount > indexForVoter) {
        let sessionPath = "/session/" + session.sessionId + '/voters/voter' + indexForVoter;
        return firebase.database().ref(sessionPath).set({
          name: 'voter' + indexForVoter
        });
      }
      else {
        return false;
      }

    });

  }

  /**
   * Set Active Story
   * @param sessionId,storyId
   * @returns {firebase.Promise.<void>}
   */
  static setActiveStory(sessionId, storyId) {
    let storyPath = "/session/" + sessionId + '/sessionStories/' + storyId + '/isActive';
    return firebase.database().ref(storyPath).set(true);
  }

  /**
   * Get Active Story
   * @param sessionId,storyId
   * @returns {firebase.Promise.<void>}
   */
  static getActiveStory(sessionId) {
    let storyPath = "/session/" + sessionId + '/sessionStories';
    return firebase.database().ref(storyPath).orderByChild('isActive').equalTo(true).once('value');
  }

  /**
   * Add Vote for Active Story
   * @param sessionId,storyId
   * @returns {firebase.Promise.<void>}
   */
  static setVoting(sessionId, storyId, voter, point) {
    let storyPath = "/session/" + sessionId + '/sessionStories/' + storyId + '/votes/' + voter.name;
    return firebase.database().ref(storyPath).set({point: point});
  }
}

export default FireService;


