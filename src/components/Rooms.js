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

    addItem(e) {
        e.preventDefault();

        const newRoom = this.newItem.value;
        if (newRoom === '') {return};
        this.roomsRef.push({
            name: newRoom
          });

        this.addForm.reset();
    }

    handleClick(item) {
        this.props.callbackFromParent(item);
    }

    render() {
        return(
            <span>

                <form ref={(input) => {this.addForm = input}} className="form-control" onSubmit={(e) => {this.addItem(e)}}>
                    
                    <div className="form-group">
                        <label htmlFor="newItemInput">Add New Room</label>
                        <input ref={(input) => {this.newItem = input}} type="text" placeholder="text" id="newItemInput" className="form-control"></input>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>

                <ul className="list-group">
                    {
                        this.state.rooms.map((room, index) =>
                            <li className="list-group-item" key={index} onClick={() => this.handleClick(room)}> <h5>{room.name}</h5> </li>
                        )
                    }
                </ul>

            </span>
        )
    }
}

export default Rooms;