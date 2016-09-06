'use strict';

import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, ListView, TouchableHighlight, ActivityIndicator } from 'react-native';

var REQUEST_URL = 'http://localhost:3000/users/';

var styles = StyleSheet.create({
    container: {
        marginTop: 65,
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
        fontSize: 15,
        marginBottom: 8,
        alignItems: 'flex-end'
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
    },
    separator: {
       height: 1,
       backgroundColor: '#dddddd'
    },
    listView: {
       backgroundColor: '#F5FCFF',
       marginTop: 65,
    },
    loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
    }
});



class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: new ListView.DataSource({
                   rowHasChanged: (row1, row2) => row1 !== row2
            }),
        }
    }

    componentDidMount() {
       this.fetchUsers(this.props.user);
    }

    fetchUsers(user){
       fetch(REQUEST_URL + user.id, {
          method: "get",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
        })
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData),
                isLoading: false
            });
        })
        .done();
    }

    render() {
        if (this.state.isLoading) {
             return this.renderLoadingView();
        }

        var user = this.props.user;
        // this.fetchUsers(interest);
          return (
              <View style={styles.container}>
                <Image source={{uri: user.image_url}}
                  style={styles.thumbnail} />
                  <Text style={styles.title}>
                    {user.username}
                  </Text>
              </View>
          );
    }


    renderLoadingView() {
      return (
          <View style={styles.loading}>
              <ActivityIndicator
                  size='large'/>
              <Text>
                Loading profile
              </Text>
          </View>
      );
    }
    renderUser(user) {
        return (
              <View>
              </View>
          );
    }
}


module.exports = UserDetail;
