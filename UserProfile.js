import React, { Component } from 'react';
import { View,
         Text,
         Image,
         ListView,
         StyleSheet,
         TextInput,
         TouchableHighlight,
         ActivityIndicator,
         AsyncStorage,
         AlertIOS } from 'react-native';

var REQUEST_URL = 'http://localhost:3000/users/'
const ACCESS_TOKEN = 'access_token'

import BottomTabBar from './BottomTabBar'
import WelcomePage from './WelcomePage'

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
        }
    }

    componentDidMount() {
      this.getToken();
    }

    async getToken() {
      try {
        let user = await AsyncStorage.getItem(ACCESS_TOKEN);
        const parsedUser = JSON.parse(user)
        this.setState({user: parsedUser})
      } catch (error) {
        throw error
      }
    }

    async deleteToken() {
      try {
        await AsyncStorage.removeItem(ACCESS_TOKEN)
        this.redirect('welcomepage');
      } catch(error) {
        console.log("Something went wrong in delete token");
      }
    }

    redirect(routeName){
      this.props.navigator.push({
        name: routeName,
        passProps: {
          user: this.state.user
        }
      });
    }

    onLogout() {
      debugger
      this.deleteToken();
    }

    render() {

      return (
        <View style={styles.container}>
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
                <Text style={styles.title}>
                    {this.state.user.username}
                </Text>
            </View>
        <TouchableHighlight style={styles.button} onPress={this.onLogout.bind(this)}>
          <Text style={styles.buttonText}>
            Logout
          </Text>
        </TouchableHighlight>
              </View>
          );
      }

}


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

module.exports = UserProfile;
