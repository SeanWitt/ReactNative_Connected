'use strict';

import React, { Component } from 'react';
import { NavigatorIOS, StyleSheet, View, Text } from 'react-native';

var SearchPeople = require('./SearchPeople');


var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class Search extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
            title: 'Find Friends',
            component: SearchPeople
        }}/>
        );
    }
}

module.exports = Search;
