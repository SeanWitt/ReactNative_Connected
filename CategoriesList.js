'use strict';

import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, ListView, TouchableHighlight, ActivityIndicatorIOS } from 'react-native';

var CategoryDetail = require('./CategoryDetail');


var REQUEST_URL = 'http://localhost:3000/interests';

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
        fontSize: 20,
        marginBottom: 8
    },
    author: {
        color: '#656565'
    },
    separator: {
       height: 1,
       backgroundColor: '#dddddd'
   }, listView: {
       backgroundColor: '#F5FCFF'
   },
   loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   }
});

class CategoriesList extends Component {
    constructor(props) {
           super(props);
           this.state = {
            isLoading: true,
            dataSource: new ListView.DataSource({
                   rowHasChanged: (row1, row2) => row1 !== row2
               })
           };
    }

    componentDidMount() {
       this.fetchData();
    }

    fetchData() {
       fetch(REQUEST_URL)
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

         return (
              <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderInterest.bind(this)}
                  style={styles.listView}
                  />
          );
  }

  renderLoadingView() {
      return (
          <View style={styles.loading}>
              <ActivityIndicatorIOS
                  size='large'/>
              <Text>
                  Loading Categories...
              </Text>
          </View>
      );
  }

  showInterestDetail(interest) {
       this.props.navigator.push({
           title: interest.name,
           component: CategoryDetail,
           passProps: {interest}
       });
  }

  renderInterest(interest) {
     return (
          <TouchableHighlight onPress={() => this.showInterestDetail(interest)}  underlayColor='#dddddd'>
              <View>
                  <View style={styles.container}>
                      <Image
                          source={{uri: interest.image_url}}
                          style={styles.thumbnail} />
                      <View style={styles.rightContainer}>
                          <Text style={styles.title}>{interest.name}</Text>
                      </View>
                  </View>
                  <View style={styles.separator} />
              </View>
          </TouchableHighlight>
     );
   }
}

module.exports = CategoriesList;
