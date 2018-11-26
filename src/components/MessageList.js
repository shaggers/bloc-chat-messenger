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
                    <h2 className="border border-secondary">Select Conversation</h2> 
                }
                { 
                    this.props.currentRoom != '' &&
                    <h2 className="border border-secondary">{this.props.currentRoom}</h2>
                }
                        
                <ul className="list-group">
                    {
                        this.state.messages.map((message, index) => 
                                this.props.currentRoomKey == message.roomId && 
                                <li className="list-group-item bg-dark">
                                    <p className="text-left float-left"><b>{message.username}</b></p>
                                    <p className="text-right"><small>{message.sentAt}</small></p>
                                    <p className="text-left">{message.content}</p>  
                                </li>
                        )
                    }
                </ul>

                { this.props.currentRoom !== '' && 
                <form ref={(input) => {this.addForm = input}} className="form-control fixed-bottom bg-dark border-secondary w-100 mx-auto" onSubmit={(e) => {this.addItem(e)}}>
                        <label htmlFor="newMessageInput" className="text-secondary">New Message</label>
                    <div className="form-row">
                        <div className="col-10">
                            <input ref={(input) => {this.newItem = input}} type="text" placeholder="text" id="newMessageInput" className="form-control"></input>
                        </div>
                        <div className="col-2">
                            <button type="submit" className="btn btn-outline-info btn-block">Send</button>
                        </div>
                    </div>     
                </form>
                }
            </span>
        )
    }
}

export default MessageList;