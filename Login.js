import React, { Component } from 'react';
import { View,
         Text,
         StyleSheet,
         Image,
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
      <Image source={{uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/13ZNX2TLX0.jpg"}} style={styles.backgroundImage}>
       <View style = {styles.container}>
        <TextInput
          onChangeText={(val) => this.setState({email: val})}
          style={styles.input} placeholder=" Email" placeholderTextColor='#44A1A0'>
        </TextInput>
        <TextInput
          onChangeText={(val) => this.setState({password: val})}
          style={styles.input} placeholder="Password" placeholderTextColor='#44A1A0'>
        </TextInput>
        <TouchableHighlight style={styles.button} onPress={this.onLoginPressed.bind(this)}>
        <Text style={styles.buttonText}>
          Login
        </Text>
        </TouchableHighlight>
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


module.exports = Login;

