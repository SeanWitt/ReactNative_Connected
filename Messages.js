'use strict';

import React, { Component } from 'react';
import { NavigatorIOS, StyleSheet, View, Text } from 'react-native';

var Conversations = require('./Conversations');

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});


class Messages extends React.Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    title: 'Messages',
                    component: Conversations
            }}/>
        );
    }
}

module.exports = Messages;
