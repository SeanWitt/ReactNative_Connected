'use strict';
import React, { Component } from 'react';
import { AppRegistry, TabBarIOS, View, Text } from 'react-native';
var Featured = require('./Featured');
var Search = require('./Search');
var Contacts = require('./Contacts');
import Login from './Login.js';


class Connected extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'featured'
        };
    }

    render() {
        return (
            <TabBarIOS selectedTab={this.state.selectedTab}>
                <TabBarIOS.Item
                systemIcon="featured"
                    selected={this.state.selectedTab === 'featured'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'featured'
                        });
                    }}>
                    <Featured/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                systemIcon="search"
                    selected={this.state.selectedTab === 'search'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'search'
                        });
                    }}>
                    <Search/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                systemIcon="contacts"
                    selected={this.state.selectedTab === 'contacts'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'contacts'
                        });
                    }}>
                    <Contacts/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

AppRegistry.registerComponent('bookfinder', () => Connected);
