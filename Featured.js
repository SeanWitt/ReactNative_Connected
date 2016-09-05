'use strict';

import React, { Component } from 'react';
import { NavigatorIOS, StyleSheet, View, Text } from 'react-native';

var CategoriesList = require('./CategoriesList');

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});


class Featured extends React.Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
            title: 'Featured Categories',
            component: CategoriesList
            }}/>
        );
    }
}

module.exports = Featured;
