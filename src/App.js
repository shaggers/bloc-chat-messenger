import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import Rooms from './components/Rooms';
import MessageList from './components/MessageList';
import User from './components/User';

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
  constructor(props){
    super(props)

    this.state = {
      currentRoom: {},
      user: ''
    }
    
  }

  selectedRoom(value) {
    this.setState({ currentRoom: value });  
  }

  getUser(name) {
    this.setState({ user: name })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Chat Messenger</h1>
        </header>
        <main>
          <User 
            firebase={firebase}
            callbackFromParent={this.getUser.bind(this)}
          />
          <Rooms 
            firebase={firebase}
            callbackFromParent={this.selectedRoom.bind(this)}
          />
          <MessageList 
            firebase={firebase}
            currentRoom={this.state.currentRoom}
          />
        </main>
      </div>
    );
  }
}

export default App;
