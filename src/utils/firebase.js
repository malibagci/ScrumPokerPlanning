import * as firebase from "firebase";

class Firebase {

  /**
   * Initializes  Firebase
   */
  static initialize() {
    firebase.initializeApp({
      apiKey: "AIzaSyA3yvRLc9YburkeP7GzI7S9C9q5OFuE214",
      authDomain: "scrum-poker-planning.firebaseapp.com",
      databaseURL: "https://scrum-poker-planning.firebaseio.com",
      projectId: "scrum-poker-planning",
      storageBucket: "scrum-poker-planning.appspot.com",
      messagingSenderId: "826484586237"
    });
  }

}

export default Firebase;