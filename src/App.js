import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import Rooms from './components/Rooms';

var config = {
  apiKey: "AIzaSyCBxhUrobjhX7UGwqtvPMjWPsd0qoK0tvc",
  authDomain: "bloc-chat-messenger-dd4f6.firebaseapp.com",
  databaseURL: "https://bloc-chat-messenger-dd4f6.firebaseio.com",
  projectId: "bloc-chat-messenger-dd4f6",
  storageBucket: "bloc-chat-messenger-dd4f6.appspot.com",
  messagingSenderId: "1015629588032"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Chat Messenger</h1>
        </header>
        <main>
          <Route exact path="/" component={Rooms} />
        </main>
      </div>
    );
  }
}

export default App;
