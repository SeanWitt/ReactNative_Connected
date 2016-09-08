import React, { Component } from 'react';
import { View,
         Text,
         StyleSheet,
         TextInput,
         Image,
         TouchableHighlight,
         AlertIOS } from 'react-native';



export default class Register extends Component {
 constructor() {
    super ();
      this.state = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        errors: []
      }
    }

  carTester() {
    fetch('http://localhost:3000', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
    .then((responseData) => { AlertIOS.alert(
      "Get Response",
      "Make:" + responseData.make + " Year:" + responseData.year
      );
    })
      .done();
  }

  onRegisterPressed() {

    fetch('http://localhost:3000/users', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({name: this.state.name, email: this.state.email, password: this.state.password})
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
      <Image source={{uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/W42GD64HOM.jpg"}} style={styles.backgroundImage}>
       <View style = {styles.container}>
        <TextInput
          onChangeText={(val) => this.setState({email: val})}
          style={styles.input} placeholder="Email" placeholderTextColor='#44A1A0'>
        </TextInput>
        <TextInput
          onChangeText={(val) => this.setState({name: val})}
          style={styles.input} placeholder="Name" placeholderTextColor="#44A1A0">
        </TextInput>
        <TextInput
          onChangeText={(val) => this.setState({password: val})}
          style={styles.input} placeholder="Password" placeholderTextColor="#44A1A0">
        </TextInput>
        <TextInput
          onChangeText={(val) => this.setState({password_confirmation: val})}
          style={styles.input} placeholder="Confirm Password" placeholderTextColor="#44A1A0">
          </TextInput>
        <TouchableHighlight style={styles.button} onPress={this.onRegisterPressed.bind(this)}>
        <Text style={styles.buttonText}>
          Register
        </Text>
        </TouchableHighlight>

      </View>
      </Image>
    );
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
    // borderWidth: 1,
    backgroundColor: '#FFFFFA',
    opacity: .9,
    borderRadius: 5,
    // borderColor: "#44A1A0",
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

