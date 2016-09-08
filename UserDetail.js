'use strict';

import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, ListView, TouchableHighlight, ActivityIndicator } from 'react-native';

var Chat = require('./Chat');

var REQUEST_URL = 'http://localhost:3000/users/';

var styles = StyleSheet.create({
    container: {
        marginTop: 65,
        padding: 30
    },
    thumbnail: {
      width: 200,
      height: 150,
      marginLeft: 60,
      borderWidth: 1,
      borderColor: "black",
      marginTop: 30
    },
    title: {
      flex: 1,
      fontSize: 25,
      marginTop: 10,
      marginBottom: 8,
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
    button: {
      height: 50,
      backgroundColor: '#48BBEC',
      alignSelf: 'stretch',
      marginTop: 10,
      justifyContent: 'center'
    },
    buttonText: {
      fontSize: 22,
      color: '#FFF',
      alignSelf: 'center'
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
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
                      <Text  style={styles.title}>
                         {user.username}
                      </Text>
                      <Text>
                         {user.bio}
                      </Text>
                      <TouchableHighlight style={styles.button} onPress={() => this.messageUser(user) }>
                      <Text style={styles.buttonText}>
                        Message {user.name}
                      </Text>
                      </TouchableHighlight>
                  </View>

              </View>
          );
    }

      messageUser(receiving_user) {

       this.props.navigator.push({
           title: "New Message" ,
           component: Chat,
           passProps: {receiving_user}
       });
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
