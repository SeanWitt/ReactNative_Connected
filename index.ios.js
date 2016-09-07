'use strict';
import React, { Component } from 'react';
import { AppRegistry,
        TabBarIOS,
        View,
        Text,
        Navigator,
        StyleSheet } from 'react-native';

var Featured = require('./Featured');
var Search = require('./Search');
var Contacts = require('./Contacts');
var Register = require('./Register');
import Login from './Login';


class Connected extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         selectedTab: 'featured'
    //     };
    // }

    renderScene(route, navigator) {
        console.log(route);
        if(route.name == 'login') {
            return <Login navigator={navigator} />
        }
        if(route.name == 'register') {
            return <Register navigator={navigator} />
        }
        if(route.name == 'featured') {
            return <Featured navigator={navigator} />
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Navigator
                    initialRoute={{name: 'register'}}
                    renderScene={this.renderScene.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('bookfinder', () => Connected);
