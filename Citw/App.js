/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Button,
  Alert
} from 'react-native';
import { getBatteryLevel } from 'react-native-fs';
import RNFS from 'react-native-fs';

// Render the contents of RNFS.DocumentDirectoryPath on the screen

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      fileLoaded: false
    };
  }

  getFile = () => {
    fetch('https://staltz.com/g.txt')
      .then(response => response.text())
      .then(fileContent => {
        // console.warn(fileContent);
        var path = RNFS.DocumentDirectoryPath + '/r.txt';
        // write the file
        RNFS.writeFile(path, fileContent, 'utf8')
          .then((success) => {
            console.warn('FILE WRITTEN!');

          })
          .catch((err) => {
            console.warn(err.message);
          });
      });
  }

  readFile = (path) => {
    RNFS.readFile(path)
      .then(

      )
  }

  checkFile = () => {
    var path = RNFS.DocumentDirectoryPath + '/r.txt';
    if (!RNFS.exists(RNFS.DocumentDirectoryPath)) {
      this.getFile();
    } else {
      console.warn('FILE EXISTS.');
      this.readFile(path);
    }
  }

  async componentDidMount() {
    this.checkFile();
  }
  onPress = () => {
    AsyncStorage.setItem('myname', 'K');
  }
  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.welcome}>
          Files:

        </Text>
        <Button title="Press" onPress={this.onPress} />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
