'use strict';

import React, { Component } from 'react';
import { NavigatorIOS, StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const ACCESS_TOKEN = 'access_token'
var REQUEST_URL = 'http://localhost:3000/conversations';
var FETCH_MESSAGES_URL = 'http://localhost:3000/users/';

class Chat extends Component {


    constructor(props) {


        super(props);
        this.state = {
            messages: [],
            sender_id: null,

            recipient_id: this.props.receiving_user.id,
        };
        this.onSend = this.onSend.bind(this);
    }


    async componentWillMount() {
        try {
            let userId = await AsyncStorage.getItem(ACCESS_TOKEN);
            this.setState({sender_id: JSON.parse(userId).id})
        } catch (error) {
            alertIOS("No User Logged In")
        }

        this.fetchConversation(this.state.sender_id).then((responseData) => {
             this.renderConversation(responseData)
        })
    }

    renderConversation(apiMessages){
        // function to take the @messages returned from the api and set them up in the GiftedChat format
        var messagesArray = []
        var user_id = " "
        var messageToRender = {}
        for (var i = 0; i < apiMessages.length; i ++) {
            if (apiMessages[i].user_id == this.state.sender_id) {
                user_id = 1
            }else{
                user_id = 2
            }
            messagesArray.unshift({_id: i+1, text: apiMessages[i].body, createdAt: apiMessages[i].created_at, user: {_id: user_id}, avatar: this.props.receiving_user.image_url})
        }
        this.setState({
            messages: messagesArray
        })
    }


    fetchConversation(senderId){
        var sender = senderId.toString()

        return fetch(FETCH_MESSAGES_URL + sender + "/messageswith/" + this.state.recipient_id.toString())  ///goes to SHOW route
        .then((response) => response.json())
    }

    addMessage(senderId, recipientId, messages){
        return fetch(REQUEST_URL, {  ////////goes to CREATE route

            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({
                sender_id: senderId,
                recipient_id: recipientId,
                message: messages

            })
        })
        .then((response) => response.json())
    }


    onSend(messages = []) {
        this.addMessage(this.state.sender_id, this.state.recipient_id, messages[0].text).then(() =>
            this.fetchConversation(1).then((responseData) => {
                this.renderConversation(responseData)
            })
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <GiftedChat messages={this.state.messages} onSend={this.onSend} user={{_id: 1}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        marginBottom: 50,
    },
});

module.exports = Chat;

// KEEP THIS FOR NOW AS A TEMPLATE FOR THE GIFTEDCHAT MESSAGE FORMAT -------------------------------
        // messages: [

        //     {_id: 2,
        //         text: '...dont mess with a Guy on a Buffalloooooo!',
        //         createdAt: new Date(2016, 8, 6, 11, 26),
        //         user: {_id: 1, name: 'You', avatar: 'https://facebook.github.io/react/img/logo_og.png'}
        //     },
