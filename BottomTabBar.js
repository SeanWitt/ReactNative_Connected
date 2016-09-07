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
            </TabBarIOS>
