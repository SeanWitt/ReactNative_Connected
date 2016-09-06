import React, { Component } from 'react';
import { View,
         Text,
         StyleSheet,
         TextInput,
         TouchableHighlight,
         AlertIOS } from 'react-native';



export default class Login extends Component {

  constructor() {
  super ();
    this.state = {
      name: "",
      email: "",
      errors: []
    }
  }


  static get defaultProps() {
    return {
      title: 'Login'
    };
  }

  onLoginPressed() {
    fetch('http://localhost:3000/sessions/new', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({email: this.state.email, password: this.state.password})
    }).then((response) => response.json())
    .then((responseData) => { AlertIOS.alert(
      "Get Response",
      "Name:" + responseData.name + " Email:" + responseData.email
      );
    })
      .done();
  }


  render() {
    return (
       <View style = {styles.container}>
        <TextInput
          onChangeText={(val) => this.setState({email: val})}
          style={styles.input} placeholder=" Email">
        </TextInput>
        <TextInput
          onChangeText={(val) => this.setState({password: val})}
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}>
        </TextInput>
        <TouchableHighlight style={styles.button} onPress={this.onLoginPressed.bind(this)}>
        <Text style={styles.buttonText}>
          Login
        </Text>
        </TouchableHighlight>
      </View>
    )
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


module.exports = Login;

