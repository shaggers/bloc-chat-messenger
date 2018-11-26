import React, {Component} from 'react';

class MessageList extends Component {
    constructor(props){
        super(props)

        this.state = {
            messages: []
        }

        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messagesRef.orderByChild('sentAt').on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages : this.state.messages.concat( message ) });
        });
    }

    getTime(time){
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const displayTime = hours + ':' + minutes;
        return displayTime;
    }

    checkUserName(name) {
        if(name == ''){return 'guest'}
        else {return name};
    }

    addItem(e){
        e.preventDefault();

        const newMessage = this.newItem.value;
        if (newMessage === '') {return};
        if (this.props.currentRoom === '') {return};
        this.messagesRef.push({
            content: newMessage,
            roomId: this.props.currentRoomKey,
            sentAt: Date(this.props.firebase.database.ServerValue.TIMESTAMP),
            username: this.checkUserName(this.props.user)
          });

        this.addForm.reset();
    }

    render(){
        return(
            <span>
                { 
                    this.props.currentRoom == '' &&
                    <h2>Select Conversation</h2> 
                }
                { 
                    this.props.currentRoom != '' &&
                    <h2>{this.props.currentRoom}</h2>
                }
                        
                <ul>
                    {
                        this.state.messages.map((message, index) => 
                                this.props.currentRoomKey == message.roomId && 
                                <li>
                                    <p>{message.username}</p>
                                    <p>{message.content}</p>
                                    <p>{message.sentAt}</p>
                                </li>
                        )
                    }
                </ul>

                <form ref={(input) => {this.addForm = input}} className="newItem" onSubmit={(e) => {this.addItem(e)}}>
                    <div>
                        <label htmlFor="newMessageInput">New Message</label>
                        <input ref={(input) => {this.newItem = input}} type="text" placeholder="text" id="newMessageInput"></input>
                    </div>

                    <button type="submit" className="submitAddedItem">Send</button>
                </form>

            </span>
        )
    }
}

export default MessageList;