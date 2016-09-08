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

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            dataSource: new ListView.DataSource({
                   rowHasChanged: (row1, row2) => row1 !== row2
            }),
        }
    }

    async componentDidMount() {
        try {
          const user = await AsyncStorage.getItem(ACCESS_TOKEN);
          const parsedUser = JSON.parse(user)
          this.setState({user: parsedUser})
        } catch (error) {
          throw error
        }
    }

    render() {

          return (
              <View style={styles.container}>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
                      <Text style={styles.title}>
                         {this.state.user.username}
                      </Text>
                  </View>
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
