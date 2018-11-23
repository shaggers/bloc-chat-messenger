import React, {Component} from 'react';

class MessageList extends Component {
    constructor(props){
        super(props)

        this.state = {
            messages: []
        }

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ messages : this.state.messages.concat( room ) })
        });
    }

    render(){
        return(
            <span>
                
            </span>
        )
    }
}

export default MessageList;