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
import BottomTabBar from './BottomTabBar';
import Login from './Login';
import WelcomePage from './WelcomePage';

var Chat = require('./Chat');



class Connected extends Component {

    renderScene(route, navigator) {
        console.log(route);
        if(route.name == 'welcomepage') {
            return <WelcomePage navigator={navigator} />
        }
        if(route.name == 'login') {
            return <Login navigator={navigator} />
        }
        if(route.name == 'register') {
            return <Register navigator={navigator} />
        }
        if(route.name == 'bottomtabbar') {
            return <BottomTabBar navigator={navigator} />
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Navigator
                    initialRoute={{name: 'welcomepage'}}
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

AppRegistry.registerComponent('Connected', () => Connected);

