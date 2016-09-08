'use strict';

import React, { Component } from 'react';
import { NavigatorIOS, StyleSheet, View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

var REQUEST_URL = 'http://localhost:3000/conversations';
var FETCH_MESSAGES_URL = 'http://localhost:3000/conversations/';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            sender_id: 1,
            recipient_id: this.props.receiving_user.id,
            // message: '',
            conversation: [],

        };
        this.onSend = this.onSend.bind(this);
    }

    componentWillMount() {
        this.fetchConversation(1).then((responseData) => {
             this.renderConversation(responseData)
             // this.setState({conversation: responseData})

        })

        // messages: [

        //     {_id: 2,
        //         text: '...dont mess with a Guy on a Buffalloooooo!',
        //         createdAt: new Date(2016, 8, 6, 11, 26),
        //         user: {_id: 1, name: 'You', avatar: 'https://facebook.github.io/react/img/logo_og.png'}
        //     },

            // {_id: 1,
            //     text: 'I dun told ya...',
            //     createdAt: new Date(2016, 8, 6, 11, 23),
            //     user: {_id: 2, name: 'You', avatar: 'https://facebook.github.io/react/img/logo_og.png'}
            // }

        // ],
        // });
    }

    renderConversation(apiMessages){
        // function to take the @messages returned from the api and set them up in the GiftedChat format
        var messagesArray = []
        var user_id = " "
        var messageToRender = {}
        for (var i = 0; i < apiMessages.length; i ++) {
            if (apiMessages[i].user_id == 1) {
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

        return fetch(FETCH_MESSAGES_URL + sender)
        .then((response) => response.json())



        // .then((responseData) => {


        //     return responseData

        //     // this.state.setState({
        //     //     conversation: [1,2,3]
        //     // //     conversation: responseData
        //     // });

        // })
    }

    addMessage(senderId, recipientId, messages){
        return fetch(REQUEST_URL, {

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
        // this.setState({message: messages[0].text})

        this.addMessage(this.state.sender_id, this.state.recipient_id, messages[0].text).then(() =>
            this.fetchConversation(1).then((responseData) => {
                this.renderConversation(responseData)
            })
            )



                // THIS IS ORIGINAL CODE TO DISPLAY NEW MESSAGE ON SCREEN___________________________________
                // WHEN SEND IS CLICKED, NEW MESSAGE IS APPENDED TO 'MESSAGE' STATE. WILL BE AT [0]
                    // this.setState((previousState) => {
                    //     return {
                    //         messages: GiftedChat.append(previousState.messages, messages),
                    //     };
                    // });
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
