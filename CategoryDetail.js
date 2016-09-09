'use strict';

import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, ListView, TouchableHighlight, ActivityIndicator } from 'react-native';

var UserDetail = require('./UserDetail');

var REQUEST_URL = 'https://dbc-connected.herokuapp.com/interests';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 15,
        marginBottom: 8
    },
    image: {
        width: 107,
        height: 165,
        padding: 10
    },
    description: {
        padding: 10,
        fontSize: 15,
        color: '#656565'
    },
    separator: {
       height: 1,
       backgroundColor: '#dddddd'
    },
    listView: {
       backgroundColor: '#F5FCFF',
       marginTop: 65,
    },
    loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
    }
});



class CategoryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: new ListView.DataSource({
                   rowHasChanged: (row1, row2) => row1 !== row2
            }),
            // users: [],
        }
    }

    componentDidMount() {
       this.fetchUsers(this.props.interest);
    }

    fetchUsers(interest){
       fetch(REQUEST_URL, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
            interest: interest,
        })
       })
        .then((response) => response.json())
       .then((responseData) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData),
                isLoading: false
            });
        })
        .done();
    }

    render() {
        if (this.state.isLoading) {
             return this.renderLoadingView();
        }

        var interest = this.props.interest;
        // this.fetchUsers(interest);
         return (
              <ListView
                  enableEmptySections={true}
                  dataSource={this.state.dataSource}
                  renderRow={this.renderUser.bind(this)}
                  style={styles.listView}
                  />
          );
    }

    showUserDetail(user) {
       this.props.navigator.push({
           title: user.username,
           component: UserDetail,
           passProps: {user}
       });
    }

    renderLoadingView() {
      return (
          <View style={styles.loading}>
              <ActivityIndicator
                  size='large'/>
              <Text>
                  Loading People Near you...
              </Text>
          </View>
      );
    }

    renderUser(user) {
        return (
            <TouchableHighlight onPress={() => this.showUserDetail(user)}  underlayColor='#dddddd'>
                <View>
                    <View style={styles.container}>
                        <Image
                            source={{uri: user.image_url}}
                            style={styles.thumbnail} />
                                <View style={styles.rightContainer}>
                                    <Text style={styles.title}>{user.username}</Text>
                                </View>
                        </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
     );
   }
}


module.exports = CategoryDetail;
