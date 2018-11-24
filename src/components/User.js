import React, { Component } from 'react';

class User extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    handleSignIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider ).then(function(result) {
            const user = result.user.displayName;
            this.props.callbackFromParent(user);
        }).catch(function(error){
            const errorMessage = error.message;
            alert(errorMessage);
        })
    }

    handleSignOut() {
        this.props.firebase.auth().signOut();
    }

    render() {
        return(
            <span>
                <button onClick={() => this.handleSignIn()}>Sign In</button>
                <button onClick={() => this.handleSignOut()}>Sign Out</button>
            </span>
        )
    }
}

export default User;