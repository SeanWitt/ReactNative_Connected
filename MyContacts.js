'use strict';

import React, { Component } from 'react';
import { NavigatorIOS, StyleSheet, View, Text } from 'react-native';

import Login from './Login.js';

var styles = StyleSheet.create({
  container:{
    marginTop: 40
  }

});

class MyContacts extends Component {
    render() {
        return (
        <View style={styles.container}>
            <Login/>
        </View>
        );
    }
}


module.exports = MyContacts;
