import React, { Component } from 'react';
import { FlatList, View, StyleSheet, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';


class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

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
              <Button
                title="Go to Details"
                onPress={() => this.props.navigation.navigate('Details')}
              />
            </View>
          }
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
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

export default StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
);