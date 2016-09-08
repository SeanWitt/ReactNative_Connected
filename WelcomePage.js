'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  Text,
  Image,
  View
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class WelcomePage extends Component {

  // componentWillMount() {
  //   this.getToken();
  // }
  navigate(routeName) {
    this.props.navigator.push({
      name: routeName
    });
  }

  // async getToken() {
  //   try {
  //     let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
  //     if(!accessToken) {
  //         console.log("Token not set");
  //     } else {
  //         this.verifyToken(accessToken)
  //     }
  //   } catch(error) {
  //       console.log("Something went wrong");
  //   }
  // }
  //If token is verified we will redirect the user to the home page
  // async verifyToken(token) {
  //   let accessToken = token

  //   try {
  //     let response = await fetch('http://localhost:3000');
  //     let res = await response.text();
  //     if (response.status >= 200 && response.status < 300) {
  //       //Verified token means user is loggen in to we redirect to home.
  //       this.navigate('bottomtabbar');
  //     } else {
  //         //Handle error
  //         let error = res;
  //         throw error;
  //     }
  //   } catch(error) {
  //       console.log("error response: " + error);
  //   }
  // }
  render() {
    return (
      <Image source={{uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/F6S6FIDJJ6.jpg"}} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome Friend </Text>
          <TouchableHighlight onPress={ this.navigate.bind(this,'register') } style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={ this.navigate.bind(this, 'login') } style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 400
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
    backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  title: {
    fontSize: 25,
    marginBottom: 15,
    color: "#FFFFFA"
  }
});


export default WelcomePage
