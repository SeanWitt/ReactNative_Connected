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

var REQUEST_URL = 'https://agile-dawn-41501.herokuapp.com/users/'
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
      this.deleteToken();
    }

    render() {

      return (
        <View>
          <Image style={styles.backgroundImage}
            source={{uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/X7O1GI92GY.jpg"}}
            width={380}
            height={200}/>

          <Image source={{uri: this.state.user.image_url}}
            style={styles.thumbnail} />
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
                <Text  style={styles.title}>
                   {this.state.user.username}
                </Text>
                <Text>
                   {this.state.user.city}, {this.state.user.state} {this.state.user.zipcode}
                </Text>
                <Text style={styles.description}>
                   {this.state.user.bio}
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

module.exports = UserProfile;
