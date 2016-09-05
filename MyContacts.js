'use strict';

import React, { Component } from 'react';
import { NavigatorIOS, StyleSheet, View, Text } from 'react-native';

var MyContacts = require('./MyContacts');


var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class Contacts extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
            title: 'My Contacts',
            component: MyContacts
        }}/>
        );
    }
}

module.exports = Contacts;
