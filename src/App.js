import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import Rooms from './components/Rooms';
import MessageList from './components/MessageList';
import User from './components/User';
import './style/app.css'

var config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUKCET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
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
        <nav className="navbar fixed-top navbar-dark bg-dark">
          <h1 className="navbar-brand mb-1 h1 text-info">
            Chat Messenger
          </h1>
        
          <User 
            firebase={firebase}
            setUser={this.setUser.bind(this)}
            user={this.state.user}
          />
        </nav>
        <main className="container">
          <div className="row">
            <div className="col-sm-4">
              <Rooms 
                firebase={firebase}
                callbackFromParent={this.selectedRoom.bind(this)}
              />
            </div>
            <div className="col-sm-8">
              <MessageList 
                firebase={firebase}
                currentRoom={this.state.currentRoom}
                currentRoomKey={this.state.currentRoomKey}
                user={this.state.user}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
