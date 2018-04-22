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
              <Button
                onPress={() => this.onX(this.state.users, item)}
                title="X" />
              }
              <Button
                title={item.name}
                onPress={() => this.props.navigation.navigate('Details', { user: item })}
              />
            </View>
          }
        />
      </View>
    );
  }
}

class DetailsScreen extends Component {
  static navigationOptions = {
    title: 'Details',
  };

  render() {
    const { params } = this.props.navigation.state;
    console.warn(params);
    return (
      <View style={{ flex: 1, padding: 15 }}>
        <Text>{params.user.name}</Text>
        <Text>{params.user.email}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  userCard: {
    flexDirection: 'row',
    margin: 10
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