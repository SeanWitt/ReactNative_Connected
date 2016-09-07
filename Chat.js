'use strict';

import React, { Component } from 'react';
import { NavigatorIOS, StyleSheet, View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

var REQUEST_URL = 'http://localhost:3000/conversations';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            sender_id: 4,
            recipient_id: 5,
            message: '',
        };
        this.onSend = this.onSend.bind(this);
    }

    componentWillMount() {
        this.setState({
        messages: [
            {_id: 8,
                text: 'Wow your last text was really informative',
                createdAt: new Date(),
                user: {_id: 2, name: 'You', avatar: 'https://facebook.github.io/react/img/logo_og.png'}
            },

            {_id: 7,
                text: 'You just made this "work"',
                createdAt: new Date(2016, 8, 6, 13, 7),
                user: {_id: 2, name: 'You', avatar: 'https://facebook.github.io/react/img/logo_og.png'}
            },

            {_id: 6,
                text: 'More stuff blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
                createdAt: new Date(2016, 8, 6, 12, 37),
                user: {_id: 1, name: 'You', avatar: 'https://facebook.github.io/react/img/logo_og.png'}
            },

            {_id: 5,
                text: 'This is a bunch of text to fill the screen so I can see how the text bubble will look when someone types a bunch of stuff',
                createdAt: new Date(2016, 8, 6, 12, 20),
                user: {_id: 2, name: 'You', avatar: 'https://facebook.github.io/react/img/logo_og.png'}
            },

            {_id: 4,
                text: 'I did nawt!!',
                createdAt: new Date(2016, 8, 6, 12, 1),
                user: {_id: 1, name: 'You', avatar: 'https://facebook.github.io/react/img/logo_og.png'}
            },

            {_id: 3,
                text: 'Cool story, person',
                createdAt: new Date(2016, 8, 6, 11, 33),
                user: {_id: 2, name: 'You', avatar: 'https://facebook.github.io/react/img/logo_og.png'}
            },

            {_id: 2,
                text: '...dont mess with a Guy on a Buffalloooooo!',
                createdAt: new Date(2016, 8, 6, 11, 26),
                user: {_id: 1, name: 'You', avatar: 'https://facebook.github.io/react/img/logo_og.png'}
            },

            {_id: 1,
                text: 'I dun told ya...',
                createdAt: new Date(2016, 8, 6, 11, 23),
                user: {_id: 2, name: 'You', avatar: 'https://facebook.github.io/react/img/logo_og.png'}
            },

        ],
        });
    }

    fetchConvo(senderId, recipientId, messages){
        fetch(REQUEST_URL, {

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
        .then((responseData) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData),
                isLoading: false
            });
        })
        .done();
    }


    onSend(messages = []) {
        this.setState({message: messages[0].text})
        // console.log(this.state.message)
        this.fetchConvo(4, 5, messages[0].text)
        // this.setState((previousState) => {
        //     return {
        //         messages: GiftedChat.append(previousState.messages, messages),
        //     };
        // });
    }
                // onSend={this.onSend}
                // onChangeText={(message) => this.setState({message})}
                // {() => this.fetchConvo(4, 5), this.setState({message})}
                // onSend={() => this.fetchConvo(4, 5, this.state.messages)}
    render() {
        return (
            <View style={styles.container}>
                <GiftedChat messages={this.state.messages} onSend={this.onSend} user={{_id: 1}}/>
            </View>
        );
    }


}
// (val) =>this.setState({email: val})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        marginBottom: 50,
    },
});

module.exports = Chat;
