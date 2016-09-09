'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, Text, Image,TextInput, ListView, Navigator, TouchableHighlight, PickerIOS, ActivityIndicator } from 'react-native';

var SearchResults = require('./SearchResults');
var CategoryDetail = require('./CategoryDetail');

var PickerItemIOS = PickerIOS.Item;

var REQUEST_URL = "https://agile-dawn-41501.herokuapp.com/users/search"

var INTERESTS = {
    interests: ['Sports', 'Music', 'Food', 'Fitness', 'Politics', 'Books']
  }

class SearchPeople extends Component {

    constructor(props) {
        super(props);
        this.state = {
            interest: '',
            zipcode: '',
            isLoading: false,
            interestSelection: "Food",
            errorMessage: '',
            isLoading: true,
            dataSource: new ListView.DataSource({
               rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
    }

render() {
        var interest = INTERESTS[this.state.interestSelection];
        var spinner = this.state.isLoading ?
            ( <ActivityIndicator
                hidden='true'
                size='large'/> ) :
            ( <View/>);

        return (

            <Image source={{uri: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/KM2U4NP9BN.jpg"}} style={styles.backgroundImage} >
            <View style={styles.container}>
                <View>
                        <PickerIOS
                            selectedValue = {this.state.interestSelection}
                            onValueChange={(interestSelection) => this.setState({interestSelection})}>
                              <PickerItemIOS
                                value={"Sports"}
                                label={"Sports"}
                            />
                            <PickerItemIOS
                                value={"Music"}
                                label={"Music"}
                            />
                            <PickerItemIOS
                                value={"Food"}
                                label={"Food"}
                            />
                            <PickerItemIOS
                                value={"Fitness"}
                                label={"Fitness"}
                            />
                            <PickerItemIOS
                                value={"Politics"}
                                label={"Politics"}
                            />
                            <PickerItemIOS
                                value={"Books"}
                                label={"Books"}
                            />
                        </PickerIOS>
                </View>
                <View>
                    <TextInput style={styles.input} placeholder="Zip Code" onChangeText={(val) => this.setState({zipcode: val})}/>
                </View>
                <TouchableHighlight style={styles.button}
                                    underlayColor='#f1c40f'
                                    onPress={this.searchPeople.bind(this)}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableHighlight>
                <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            </View>
            </Image>
        );
    }

    interestInput(event) {
        this.setState({ interest: event.nativeEvent.text });
    }

    zipcodeInput(event) {
        this.setState({ bookAuthor: event.nativeEvent.text });
    }

    searchPeople() {
        this.fetchUsers();
    }


    fetchUsers(){
       fetch(REQUEST_URL, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
            zipcode: this.state.zipcode,
            interest: this.state.interestSelection
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({ isLoading: false});
            this.props.navigator.push({
               title: "Search Results",
               component: SearchResults,
               passProps: {responseData}
            });
        })
        .done();
    }

}

var styles = StyleSheet.create({
    container: {
        marginTop: 65,
        padding: 10,
        backgroundColor: "white",
        opacity: .9,
        height: 600
    },
    input: {
        height: 50,
        marginTop: 100,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec',
        borderRadius: 5,
    },
    PickerIOS: {
        color: "white",
        marginTop: 300
    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center'
    },
    instructions: {
        fontSize: 18,
        alignSelf: 'center',
        marginBottom: 15
    },
    fieldLabel: {
        fontSize: 15,
        marginTop: 15
    },
    errorMessage: {
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 15,
        color: 'red'
    }
});

module.exports = SearchPeople;
