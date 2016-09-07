'use strict';
import React, { Component } from 'react';
import { AppRegistry, TabBarIOS, View, Text } from 'react-native';
var Featured = require('./Featured');
var Search = require('./Search');
var Contacts = require('./Contacts');
var Register = require('./Register');
var Chat = require('./Chat');


class Connected extends Component {

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
                systemIcon="more"
                    selected={this.state.selectedTab === 'more'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'more'
                        });
                    }}>
                    <Register/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                title="Chat"
                    badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
                    icon={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC9ElEQVRYR73XW8jUZRAG8J8U2sEkC8q6sKvyQkovCoQICjsoiVRXIaXRwWNqUVqSCZZeCCoJlWViCCURqWBRIEhBECUaHsBEEwwCyy46YSmVxgPv/2Nd9jvsfz93YFnYfWfmmXlnnpl3iHpyLW7BNTiHkzhQvtuyOKSN05fjCTyOccXxb0X/SsTWt9hUPn8PxPZAATyIN4rTjfgEB3G6OLm0gJpSQP6LOeVcnzj6A5D/V2EhluE1nOknskvwfDkf3ejlmlpKfwDWYAbuxzcDSWnDmdvxMTbgxToAHinKd2Bvm86r4xPwBabjw1Y2esvA1TiKl7C+pvNK7Zli50ZURdtjsjcAryKFl1Y72yGAi3EI7+GVZlutAFyEH7Ecb3XovFJfgEW4oTmgVgBuw25ch58GCcBo/IDx2N9osxWA+ViC6wfJeWXmFyzF230BuAufYSiSttcHCcSzWFuI6158WdmtMpBCWYwc3Invy52NQFitE0kwfyKFfTMS5GqEY/4LgHw24578UKL+Gp8jFFvRbV0QwwuA8MmdmIlh2IGn4nwSthYu/wgf4EICeAAhuX2YHADb8TNmlx+7AeBWvJsMB0BmedhqS5cBPIYVAZBJdV8pvqSlWxnIgNsWAOHnJ5H77yaAaRnvAbALe/BClwFkt7gpADIq05djSut14wrSeUeyNQVAhk9mdjaZq/DOBW7DBHwKv+LuiglH4k1Mxbqy/WwroP6py0BFL4H9heyLYcG5KT7Mwx/Nwyitka02EkBPd+i8Us9alkKPPIr3m2dBo5+xyJr9VV/LZJvAEuixwrjZC3qkv6W0TT+9Hk9AGccpvnTdoADI6yjDqpI4SHG1kpV4uHTaedO1Tgaik0V1VpOnjNzskY0RjipvhCw5Ydt023lSB0D44nAmGY43WHsOD5VUx+4VZa37roDtWUI6vYJwRfa7T3GiGIvDiYXWQ+mRZCQP1rwpet2s62QgxvPqScSXNUQTZnsZv7dTuXUBtOOjz7P/AxYIuOB5h798AAAAAElFTkSuQmCC'}}
                    selected={this.state.selectedTab === 'Chat'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'Chat',
                            notifCount: this.state.notifcount + 1,
                        });
                    }}>
                    <Chat/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

AppRegistry.registerComponent('Connected', () => Connected);
