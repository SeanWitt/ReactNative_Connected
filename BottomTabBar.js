'use strict';
import React, { Component } from 'react';
import { AppRegistry,
        TabBarIOS,
        View,
        Text,
        AsyncStorage } from 'react-native';

var Featured = require('./Featured');
var Search = require('./Search');
var Contacts = require('./Contacts');
var Register = require('./Register');
var Chat = require('./Chat');
var UserProfile = require('./UserProfile')
var Conversations = require('./Conversations')
var Messages = require('./Messages');

class BottomTabBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'featured',
            notifCount: 1,
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
                title="User"
                    icon={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABXElEQVRIS7XVzyvlYRTH8Zf1sDAixnI2pERN2Gim/AFTs7CRsqYoJWpiwc4CRbGbmpTFJPYsLCyUH1kosZCFZmMzbCws6Kl767p97zPfe7/X2T7nfN7nOZ/nfL813jlq3llfWkArZvANH3GLnzj4X4NpAC04Q3OC2CF+4L4UKA1gEVORTlcxngUQxvA1AjjFlyyAI/RGAOfozgLYxfcIYCfnQ2JKGg/mMRsBTCP4VDFgHwMRwB8MZgH8wkgEsIzJLIA6XCHsQ3FcowtPWQChdgUTCSILmIttcxqTQ30DLtFYIPYX7XisBiBoXKCjQOwYPTHxcJb2BiHvDp8KBG/wuRqAeiyVeEkbCHtQckyxG3RiFEOojXT6gN9Yz/n0JjUJ0JRLDp/hcuIFWxjDv3xhMeADTtBWjnJRbvh39OE5yeRAX8sgni8dxmYSIMy7vwqAPWyX80wrZqbdg4oBr8vSMhm3xe9KAAAAAElFTkSuQmCC'}}
                    selected={this.state.selectedTab === 'userprofile'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'userprofile',
                            notifCount: this.state.notifcount + 1,
                        });
                    }}>
                    <UserProfile/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                title="Chat"
                    badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
                    icon={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABzElEQVRIS7XWO2gVQRTG8V9AK8VGRG0UhCRibCxipYUKPtJIII0WMZ2FYm+INqI2IuIDRCWN2giKSdQENARtkspGfBZKCgtBwU4RXxyYCZvLRtd714Et9uzO9585O+c72+Y/j7Z/1F+EX/hRdd7fAJ3owfp0rcZizOIVXuM+3iwE/BPgJNoxg5dJ8F0SWleAbsFzHCuDlAE2YhyDuF4xFQdwArvSYuamNQK24RD6Kgo3vnYH5/AkPygCluMRNjUpnqc9w1Z8jkAR8Bj78b5FwFoMY0cR0ItIz5EWxfP0S5jAWN7BKbzAjZoAA4iTdjwDHuJwOtd1MDbgLHYHYCmuYl8dygWNW+jPO5j35WsAReWfx84MiB2cqTFF/ejAUAbMBWpYfUhcSDU1kgFhYFGFe/GzRUgY4k1sbyy0lbiH7hYBTyP3+NgIiPtVGMXmJiG3cRFTZV6UYwG5lgzva0VQHPHTqXdEwS7opvlB2HW46tsUiMKJXvAl3a9JpyQaUhhbNKCjZd+vrB90pSO7J4ldxgpEnwjAEnxIXSw62gNEHZWOMsAVTOMTDiKMK0RiLMM3VE3dPLsOgegJd/Edk8lCYrVNj7IdRCz+HGoZvwHTNVQh3MJKqQAAAABJRU5ErkJggg=='}}
                    selected={this.state.selectedTab === 'Chat'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'chat'
                        });
                    }}>
                    <Messages/>
                </TabBarIOS.Item>

            </TabBarIOS>
        );
    }
}

module.exports = BottomTabBar;
