'use strict';

var BookDetail = require('./UserDetail');
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, ListView, Navigator, TouchableHighlight, PickerIOS, ActivityIndicator } from 'react-native';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    },
    listView: {
        backgroundColor: '#F5FCFF'
    },
    cellContainer: {
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
    }
});

class SearchResults extends Component {

    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (row1, row2) => row1 !== row2});
        debugger
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.responseData.user)
        };
    }

    render() {

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderUser.bind(this)}
                style={styles.listView}
                />
        );
    }

    renderUser(user) {

        return (
            <TouchableHighlight onPress={() => this.showUserDetail(user)}
                                underlayColor='#dddddd'>

            </TouchableHighlight>
        );
    }

    showUserDetail(user) {

        this.props.navigator.push({
            title: user.username,
            component: UserDetail,
            passProps: {user}
        });
    }

}

module.exports = SearchResults;
