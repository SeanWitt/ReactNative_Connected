'use strict';

import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, ListView, TouchableHighlight, ActivityIndicator } from 'react-native';

var Chat = require('./Chat');

var REQUEST_URL = 'https://dbc-connected.herokuapp.com/users/';

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

              <View>
                <Image style={styles.backgroundImage}
                  source={{uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/X7O1GI92GY.jpg"}}
                  width={380}
                  height={200}
                  />

                <Image source={{uri: user.image_url}}
                  style={styles.thumbnail} />
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
                      <Text  style={styles.title}>
                         {user.username}
                      </Text>
                      <Text style={styles.description}>
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

var styles = StyleSheet.create({
    container: {
        // marginTop: 65,
        // padding: 30,
        // height: 600
    },
    thumbnail: {
      width: 200,
      height: 150,
      marginLeft: 80,
      borderWidth: 1,
      borderColor: "white",
      marginTop: -110
    },
    title: {
      flex: 1,
      fontSize: 25,
      margin: 10
    },
    image: {
      width: 107,
      height: 165,
      padding: 10
    },
    description: {
      padding: 10,
      fontSize: 13,
      color: '#656565',
      marginLeft: 15,
      marginRight: 15
    },
    backgroundImage: {
    },
    button: {
      height: 50,
      backgroundColor: '#48BBEC',
      alignSelf: 'stretch',
      marginTop: 10,
      justifyContent: 'center',
      margin: 10,
      borderRadius: 5
    },
    buttonText: {
      fontSize: 22,
      color: '#FFF',
      alignSelf: 'center'
  }
});


module.exports = UserDetail;
