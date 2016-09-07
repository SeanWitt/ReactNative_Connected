import React, { Component } from 'react';
import { View,
         Text,
         StyleSheet,
         TextInput,
         AsyncStorage,
         ActivityIndicator,
         TouchableHighlight,
         AlertIOS } from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Register extends Component {
 constructor() {
    super ();
      this.state = {
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        errors: [],
        showProgress: false,
      }
    }

  redirect(routeName, accessToken){
    this.props.navigator.push({
      name: routeName
    });
  }

  async storeToken(accessToken){
      try {
        await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
        console.log("Token was stored successfully");
      } catch(error){
        console.log("Something went wrong");
      }
    }

  async onRegisterPressed() {
    try {
      let response = await fetch('http://localhost:3000/users', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({username: this.state.username, email: this.state.email, password: this.state.password})
      })
      let res = await response.text();
      if (response.status >= 200 && response.status < 300){
        let accessToken = res;
        console.log(accessToken);
        this.storeToken(accessToken)
        this.redirect('featured', accessToken);
      } else {
        let error = res;
        throw error;
      }
    } catch(errors) {

      }
    }


  render() {
    return (

       <View style = {styles.container}>
        <TextInput
          onChangeText={(val) => this.setState({email: val})}
          style={styles.input} placeholder="Email">
        </TextInput>
        <TextInput
          onChangeText={(val) => this.setState({username: val})}
          style={styles.input} placeholder="Name">
        </TextInput>
        <TextInput
          onChangeText={(val) => this.setState({password: val})}
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}>
        </TextInput>
        <TextInput
          onChangeText={(val) => this.setState({password_confirmation: val})}
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}>
          </TextInput>
        <TouchableHighlight style={styles.button} onPress={this.onRegisterPressed.bind(this)}>
        <Text style={styles.buttonText}>
          Register
        </Text>
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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
    borderColor: '#48bbec',
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
  },
  heading: {
    fontSize: 30,
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

module.exports = Register;

