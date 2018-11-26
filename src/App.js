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
      currentRoom: '',
      currentRoomKey: '',
      user: ''
    }
    
  }

  selectedRoom(value) {
    this.setState({ currentRoom: value.name });
    this.setState({ currentRoomKey: value.key })  
  }

  setUser(name) {
    if (name == null){
      this.setState({ user: '' })
    } else {
      this.setState({ user: name.displayName });
    }  
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
            setUser={this.setUser.bind(this)}
            user={this.state.user}
          />
          <Rooms 
            firebase={firebase}
            callbackFromParent={this.selectedRoom.bind(this)}
          />
          <MessageList 
            firebase={firebase}
            currentRoom={this.state.currentRoom}
            currentRoomKey={this.state.currentRoomKey}
            user={this.state.user}
          />
        </main>
      </div>
    );
  }
}

export default App;
