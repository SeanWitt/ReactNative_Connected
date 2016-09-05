'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


var styles = StyleSheet.create({
    description: {
        fontSize: 20,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

class Contacts extends React.Component {
    render() {
        return (
        <View style={styles.container}>
          <Text style={styles.description}>
            Contacts Tab
          </Text>
      </View>
        );
    }
}

module.exports = Contacts;
