'use strict';

import React, { Component } from 'react';
import { NavigatorIOS, StyleSheet, View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';




var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    }
});

class Downloads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],

        };
        this.onSend = this.onSend.bind(this);
    }

    componentWillMount() {
        this.setState({
        messages: [
            {_id: 4,
                text: 'I did nawt!!',
                createdAt: new Date(),
                user: {_id: 1, name: 'You', avatar: 'https://facebook.github.io/react/img/logo_og.png'}
            },

            {_id: 3,
                text: 'Cool story, person',
                createdAt: new Date(),
                user: {_id: 2, name: 'You', avatar: 'https://facebook.github.io/react/img/logo_og.png'}
            },

            {_id: 2,
                text: '...dont mess with a Guy on a Buffalloooooo!',
                createdAt: new Date(),
                user: {_id: 1, name: 'You', avatar: 'https://facebook.github.io/react/img/logo_og.png'}
            },

            {_id: 1,
                text: 'I dun told ya...',
                createdAt: new Date(),
                user: {_id: 2, name: 'You', avatar: 'https://facebook.github.io/react/img/logo_og.png'}
            },

        ],
        });
    }

    onSend(messages = []) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={{_id: 1}}
            />

        );
    }

}


module.exports = Downloads;
