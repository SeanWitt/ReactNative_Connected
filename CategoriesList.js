'use strict';

import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, ListView, TouchableHighlight, ActivityIndicator } from 'react-native';

var CategoryDetail = require('./CategoryDetail');


var REQUEST_URL = 'https://dbc-connected.herokuapp.com/interests';



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
                  enableEmptySections={true}
                  dataSource={this.state.dataSource}
                  renderRow={this.renderInterest.bind(this)}
                  style={styles.listView}
                  />
          );
  }

  renderLoadingView() {
      return (
          <View style={styles.loading}>
              <ActivityIndicator
                  size='large'/>
              <Text>
                  Loading Categories...
              </Text>
          </View>
      );
  }

  showInterestDetail(interest) {
       this.props.navigator.push({
           title: "People near you that like " + interest.name,
           component: CategoryDetail,
           passProps: {interest}
       });
  }



  renderInterest(interest) {
     return (
          <TouchableHighlight onPress={() => this.showInterestDetail(interest)}  underlayColor='#dddddd'>
              <View>
                <Image source={{uri: interest.image_url}} style={styles.backgroundImage} >
                  <View style={styles.container}>

                      <View>
                          <Text style={styles.title}>{interest.name}</Text>
                      </View>

                  </View>
                 </Image>
                  <View style={styles.separator} />
              </View>
          </TouchableHighlight>
     );
   }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#F5FCFF',
        height: 90
        // padding: 10
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    rightContainer: {
        flex: 1
    },
    backgroundImage: {
      flex: 1,
      alignSelf: 'stretch',
      width: null,
    },
    title: {
      fontSize: 40,
      marginBottom: 8,
      color: "white"
    },
    author: {
      color: '#656565'
    },
    separator: {
      height: 1,
      backgroundColor: '#dddddd'
   }, listView: {
      backgroundColor: '#F5FCFF',
      marginTop: 65,
   },
   loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
   }
});

module.exports = CategoriesList;
