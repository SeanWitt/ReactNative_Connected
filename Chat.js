'use strict';

import React, { Component } from 'react';
import { NavigatorIOS, StyleSheet, View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';


class Chat extends Component {
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

    onSend(messages = []) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend}
                    user={{_id: 1}}
                />
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        marginTop: 50,
    }
});

module.exports = Chat;
