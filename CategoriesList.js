'use strict';

import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, ListView, TouchableHighlight } from 'react-native';

var FAKE_BOOK_DATA = [
    {volumeInfo: {title: 'The Catcher in the Rye', authors: "J. D. Salinger", imageLinks: {thumbnail: 'w'}}}
];

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 20,
        marginBottom: 8
    },
    author: {
        color: '#656565'
    },
    separator: {
       height: 1,
       backgroundColor: '#dddddd'
   }
});

class CategoriesList extends Component {
    render() {
      var book = FAKE_BOOK_DATA[0];
        return (
            <View style={styles.container}>
                <Image source={{uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRgVwAc_xSz-VgKZ4wVoE6igESZoly4KJoqq1y2zZuMv032iYLQobF3GPU'}}
                            style={styles.thumbnail} />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{book.volumeInfo.title}</Text>
                    <Text style={styles.author}>{book.volumeInfo.authors}</Text>
                </View>
            </View>
        );
    }
}

module.exports = CategoriesList;
