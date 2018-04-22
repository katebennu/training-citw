import React, { Component } from 'react';
import { FlatList, View, StyleSheet, Text, Button } from 'react-native';
// import { Constants } from 'expo';

// class UserView extends Component {
//   render() {
//     return (
//       <View style={styles.userCard}>
//         <Text style={{fontSize: 15}}>{this.props.item.name}</ Text>
//         <Text>{this.props.item.email}</Text>
//         <Button 
//           onPress={onX}
//           title="X" />
//       }
//       </View>
//     );
//   }
// }

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => {
        this.setState({ users });
      });
  }

  onX(users, deletedUser) {
    this.setState(() => ({
      users: users.filter(user => user.name !== deletedUser.name)
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.users}
          // renderItem={({ item }) => <UserView item={item} />}
          renderItem={({ item }) =>
            <View style={styles.userCard}>
              <Text style={{ fontSize: 15 }}>{item.name}</ Text>
              <Text>{item.email}</Text>
              <Button
                onPress={() => this.onX(this.state.users, item)}
                title="X" />
              }
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  userCard: {
    flexDirection: 'row',
    margin: 25
  }
});