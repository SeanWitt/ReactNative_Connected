'use strict';
import React, { Component } from 'react';
import { AppRegistry, TabBarIOS, View, Text } from 'react-native';
var Featured = require('./Featured');
var Search = require('./Search');
var Contacts = require('./Contacts');
var Register = require('./Register');
var Chat = require('./Chat');

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
                systemIcon="contacts"
                    selected={this.state.selectedTab === 'contacts'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'contacts'
                        });
                    }}>
                    <Contacts/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                title="Chat"
                    badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
                    icon={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB2klEQVRIS63VS6hPURTH8c+9MpIkCVN1DRhIJuaSlIzkVUjXiCKv8ih5k1K68hh5v0XeRpSJQhkyEkWRlFJKUbRqn9qO83fP3X97dM7Za/2+Z6291l49/lxbMBuHcbO2V/Tak3ldxCOcxRWcxq0i1cypAuzCBxxPe734glH/A7AW47C1JrYgpau/G0hE8BAzO4hEqs7gfikkANewGp8aRIbhAebhewkkAPtS/o90EPiazuJXKWAadmNug8AcLMHSEvHwqaroKk6ldORarzAL77sFjMVTTMyE4q8n4GCpeB5BPG/ASOzIBA/gHY6WQvJODo0L2Ia3mWCn9LVi1gHhFB0cKfuZKTzHcrxspdpwVeR+kffHmFQTu43NQ4U0RRC6M1LpRgXl6xl24l7t+3BEU/7VjJ0A4b8odXD0Qb4u4wkG0Ic9qZRfpGv+bm78L0DYRRNuSs2W++3FN8zHxnTNRwTnUxQrKuPBAGG3ECvTX+aQxbjUcOgBPYllMbTaAKozOYfJ+NGikkL3RtzEbQGhOT5V0HS8aQEZgTtDAVSa0YyvsX0QyBr0lgBCdx1iEq7qMIzWYwr6SwEBGYNjaVbEUIrp9xGH8Bn7w6gbQJWhqYj5HT0xGtdxotr8DVrcUpfc6KUIAAAAAElFTkSuQmCC'}}
                    selected={this.state.selectedTab === 'Chat'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'Chat',
                            notifCount: this.state.notifcount + 1,
                        });
                    }}>
                    <Chat/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                systemIcon="more"
                    selected={this.state.selectedTab === 'more'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'more'
                        });
                    }}>
                    <Register/>
                </TabBarIOS.Item>

            </TabBarIOS>
        );
    }
}

module.exports = BottomTabBar;
