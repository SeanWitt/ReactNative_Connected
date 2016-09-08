
import React, { Component } from 'react';
import { View,
         Text,
         StyleSheet,
         Image,
         TextInput,
         TouchableHighlight,
         ActivityIndicator,
         AsyncStorage,
         AlertIOS } from 'react-native';

const ACCESS_TOKEN = 'access_token'

import BottomTabBar from './BottomTabBar'

class Login extends Component {
  constructor() {
    super ();

    this.state = {
      email: "",
      password: "",
      error: "",
      showProgress: false,
    }
  }

  redirect(routeName){
    this.props.navigator.push({
      name: routeName
    });
  }

  async storeToken(accessToken){
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      this.getToken();
    } catch(error) {
      console.log("something went wrong in store token")
    }
  }

  async getToken() {
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log("token is: " + token);
    } catch(error) {
      console.log("something went wrong in get token")
    }
  }

  async removeToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN)
      this.getToken();
    } catch(error) {
      console.log("something went wrong in remove token")
    }
  }

  async onLoginPressed() {
    this.setState({showProgess: true})
    try {
      let response = await fetch('http://localhost:3000/sessions', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                session:{
                                  email: this.state.email,
                                  password: this.state.password,
                                }
                              })
                            });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          let accessToken = res;
          console.log(accessToken);
          //On success we will store the access_token in the AsyncStorage
          this.storeToken(accessToken);
          this.redirect('bottomtabbar');
      } else {
          //Handle error
          let error = res;
          throw error;
      }
    } catch(error) {
        this.setState({error: error});
        console.log("error " + error);
        this.setState({showProgress: false});
    }
  }


  render() {
    return (
      <Image source={{uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/13ZNX2TLX0.jpg"}} style={styles.backgroundImage}>
       <View style = {styles.container}>
        <TextInput
          onChangeText={(val) => this.setState({email: val})}
          style={styles.input} placeholder="Email" placeholderTextColor='#44A1A0'>
        </TextInput>
        <TextInput
          onChangeText={(val) => this.setState({password: val})}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor='#44A1A0'
          secureTextEntry={true}>
        </TextInput>
        <TouchableHighlight style={styles.button} onPress={this.onLoginPressed.bind(this)}>
        <Text style={styles.buttonText}>
          Login
        </Text>
        </TouchableHighlight>

        <Text style={styles.error}>
          {this.state.error}
        </Text>

        <ActivityIndicator animating={this.state.showProgress} size="large" style={styles.loader} />
      </View>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    backgroundColor: '#FFFFFA',
    borderColor: "#44A1A0",
    borderRadius: 5,
  },
  placeholderTextColor: {
    color: '#FFFFFA',
  },
  button: {
    height: 50,
    backgroundColor: "#44A1A0",
    alignSelf: 'stretch',
    marginTop: 10,
    borderRadius: 5,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFFFFA',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    height: 600
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  success: {
    color: 'green',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  },
  title: {
    fontWeight: '500',
  },
})


export default Login

