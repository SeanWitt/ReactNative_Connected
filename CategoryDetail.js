'use strict';

import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, ListView, TouchableHighlight, ActivityIndicatorIOS } from 'react-native';

var styles = StyleSheet.create({
    container: {
        marginTop: 75,
        alignItems: 'center'
    },
    image: {
        width: 107,
        height: 165,
        padding: 10
    },
    description: {
        padding: 10,
        fontSize: 15,
        color: '#656565'
    }
});

class CategoryDetail extends Component {
    render() {
        var interest = this.props.interest;
        var name = (typeof interest.name !== 'undefined') ? interest.name : '';
        var imageURI = (typeof interest.image_url !== 'undefined') ? interest.image_url : '';
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: imageURI}} />
                <Text style={styles.description}>{name}</Text>
            </View>
        );
    }
}

module.exports = CategoryDetail;
