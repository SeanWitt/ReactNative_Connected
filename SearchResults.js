'use strict';

var UserDetail = require('./UserDetail');
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TextInput, ListView, Navigator, TouchableHighlight, PickerIOS, ActivityIndicator } from 'react-native';

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
   }, listView: {
       backgroundColor: '#F5FCFF',
       marginTop: 65,
   },
   loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   }
});

class SearchResults extends Component {

    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.responseData)
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

    showUserDetail(user) {
        this.props.navigator.push({
            title: user.username,
            component: UserDetail,
            passProps: {user}
        });
    }

    renderUser(user) {
        return (
            <TouchableHighlight onPress={() => this.showUserDetail(user)}  underlayColor='#dddddd'>
                <View>
                    <View style={styles.container}>
                        <Image
                            source={{uri: user.image_url}}
                            style={styles.thumbnail} />
                                <View style={styles.rightContainer}>
                                    <Text style={styles.title}>{user.username}</Text>
                                </View>
                        </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
     );
    }




}

module.exports = SearchResults;
