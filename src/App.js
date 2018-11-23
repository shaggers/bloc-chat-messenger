import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import Rooms from './components/Rooms';
import MessageList from './components/MessageList';

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
      currentRoom: {}
    }

    this.selectedRoom = this.selectedRoom.bind(this);
  }

  selectedRoom(value) {
    this.setState({ currentRoom: value });  
    console.log(this.state.currentRoom);
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Chat Messenger</h1>
        </header>
        <main>
          <Rooms 
            firebase={firebase}
            callbackFromParent={this.selectedRoom}
          />
          <MessageList 
            firebase={firebase}
          />
        </main>
      </div>
    );
  }
}

export default App;
