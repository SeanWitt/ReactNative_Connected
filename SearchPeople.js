'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native';

var SearchResults = require('./SearchResults');

var styles = StyleSheet.create({
    container: {
        marginTop: 65,
        padding: 10
    },
    searchInput: {
        height: 36,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        borderWidth: 1,
        flex: 1,
        borderRadius: 4,
        padding: 5
    },
    button: {
        height: 36,
        backgroundColor: '#f39c12',
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 15
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
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

class SearchPeople extends Component {

    constructor(props) {
        super(props);
        this.state = {
            interest: '',
            zipcode: '',
            isLoading: false,
            errorMessage: ''
        };
    }

render() {
        var spinner = this.state.isLoading ?
            ( <ActivityIndicator
                hidden='true'
                size='large'/> ) :
            ( <View/>);
        return (
            <View style={styles.container}>
                <Text style={styles.instructions}>Search People Nearby With Your Interests</Text>
                <View>
                    <Text style={styles.fieldLabel}>Interest:</Text>
                    <TextInput style={styles.searchInput} onChange={this.interestInput.bind(this)}/>
                </View>
                <View>
                    <Text style={styles.fieldLabel}>Zipcode:</Text>
                    <TextInput style={styles.searchInput} onChange={this.zipcodeInput.bind(this)}/>
                </View>
                <TouchableHighlight style={styles.button}
                                    underlayColor='#f1c40f'
                                    onPress={this.searchPeople.bind(this)}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableHighlight>
                {spinner}
                <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            </View>
        );
    }

    interestInput(event) {
        this.setState({ interest: event.nativeEvent.text });
    }

    zipcodeInput(event) {
        this.setState({ bookAuthor: event.nativeEvent.text });
    }

    searchPeople() {
        this.fetchData();
    }

    fetchData() {

        this.setState({ isLoading: true });

        var baseURL = 'http://localhost:3000/users';
        if (this.state.interest !== '') {
            baseURL += encodeURIComponent('inauthor:' + this.state.interest);
        }
        if (this.state.zipcode !== '') {
            baseURL += (this.state.interest === '') ? encodeURIComponent('intitle:' + this.state.zipcode) : encodeURIComponent('+intitle:' + this.state.bookTitle);
        }

        console.log('URL: >>> ' + baseURL);
        fetch(baseURL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ isLoading: false});
                if (responseData.items) {

                    this.props.navigator.push({
                        title: 'Search Results',
                        component: SearchResults,
                        passProps: {users: responseData.items}
                    });
                } else {
                    this.setState({ errorMessage: 'No results found'});
                }
            })
            .catch(error =>
                this.setState({
                    isLoading: false,
                    errorMessage: error
                }))
            .done();
    }

}

module.exports = SearchPeople;
