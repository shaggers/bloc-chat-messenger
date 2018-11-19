import React, { Component } from 'react';

class Rooms extends Component {
    constructor(props){
        super(props)

        this.state= {
            rooms: []
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
        });
    }

    addItem(e){
        e.preventDefault();

        const newRoom = this.newItem.value;
        if (newRoom === '') {return};
        this.roomsRef.push({
            name: newRoom
          });

        this.addForm.reset();
    }

    render() {
        return(
            <span>
                <form ref={(input) => {this.addForm = input}} className="newItem" onSubmit={(e) => {this.addItem(e)}}>
                    <div className="formGroup">
                        <label htmlFor="newItemInput">Add New Room</label>
                        <input ref={(input) => {this.newItem = input}} type="text" placeholder="text" id="newItemInput"></input>
                    </div>
                        <button type="submit" className="submitAddedItem">Add</button>
                </form>
                <ul className="rooms">
                    {
                        this.state.rooms.map((room, index) =>
                            <li className="room" key={index}> {room.name} </li>
                        )
                    }
                </ul>
            </span>
        )
    }
}

export default Rooms;