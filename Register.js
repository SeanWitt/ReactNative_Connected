import React, { Component } from 'react';
import { View,
         Text,
         StyleSheet,
         TextInput,
         Image,
         AsyncStorage,
         ActivityIndicator,
         TouchableHighlight,
         AlertIOS } from 'react-native';

import Featured from './Featured';
import BottomTabBar from './BottomTabBar';

// Need access_token from back-end user model/table
const ACCESS_TOKEN = 'access_token';

class Register extends Component {
 constructor() {
    super ();

    this.state = {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      bio: "",
      city: "",
      state: "",
      zipcode: "",
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
    this.setState({showProgress: true})
    try {
      let response = await fetch('http://localhost:3000/users', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user:{
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
            bio: this.state.bio,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
          }
        })
      })
      let res = await response.text();
      console.log(res);
      if (response.status >= 200 && response.status < 300){
        let accessToken = res;
        console.log(accessToken);
        this.storeToken(accessToken)
        this.redirect('bottomtabbar', accessToken);
      } else {
        let errors = res;
        throw errors;
      }
    } catch(errors) {
      //errors are in JSON form so we must parse them first.
      let formErrors = JSON.parse(errors);
      //We will store all the errors in the array.
      let errorsArray = [];
      for(var key in formErrors) {
        //If array is bigger than one we need to split it.
        if(formErrors[key].length > 1) {
            formErrors[key].map(error => errorsArray.push(`${key} ${error}`));
        } else {
            errorsArray.push(`${key} ${formErrors[key]}`);
        }
      }
      console.log(errorsArray)
      this.setState({errors: errorsArray})
      this.setState({showProgress: false})
    }
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
          onChangeText={(val) => this.setState({username: val})}
          style={styles.input} placeholder="Name" placeholderTextColor="#44A1A0">
        </TextInput>
        <TextInput
          onChangeText={(val) => this.setState({password: val})}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#44A1A0"
          secureTextEntry={true}>
        </TextInput>
        <TextInput
          onChangeText={(val) => this.setState({password_confirmation: val})}
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#44A1A0"
          secureTextEntry={true}>
        </TextInput>
        <TextInput
          onChangeText={(val) => this.setState({city: val})}
          style={styles.input}
          placeholder="City"
          placeholderTextColor="#44A1A0">
        </TextInput>
        <TextInput
          onChangeText={(val) => this.setState({state: val})}
          style={styles.input}
          placeholder="State"
          placeholderTextColor="#44A1A0">
        </TextInput>
        <TextInput
          onChangeText={(val) => this.setState({zipcode: val})}
          style={styles.input}
          placeholder="Zip code"
          placeholderTextColor="#44A1A0">
        </TextInput>
        <TextInput
          onChangeText={(val) => this.setState({bio: val})}
          style={styles.description}
          placeholder="Bio"
          placeholderTextColor="#44A1A0">
        </TextInput>
        <TouchableHighlight style={styles.button} onPress={this.onRegisterPressed.bind(this)}>
        <Text style={styles.buttonText}>
          Register
        </Text>
        </TouchableHighlight>

        <Errors errors={this.state.errors} />
      </View>
      </Image>
    );
  }
}

const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i)=> <Text key={i} style={styles.error}>{error}</Text>)}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10
  },
  input: {
    height: 35,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    backgroundColor: '#FFFFFA',
    opacity: .9,
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
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  description: {
    height:120,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    backgroundColor: '#FFFFFA',
    opacity: .9,
    borderRadius: 5,
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

