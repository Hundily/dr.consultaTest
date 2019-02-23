import React, { Component } from 'react';
import { StyleSheet, RefreshControl, View, FlatList, AsyncStorage, Text } from 'react-native';
import ComicsCell from '../components/ComicsCell';
import Loader from '../components/Loader';
import colors from '../styles/colors';

export default class FavoriteScreen extends Component {

  constructor(props) {
    super(props),
      this.state = {
        comics: [],
        loading: true,
        refreshing: false
      }
  }

  componentDidMount = async () => {
    this.setState({ comics: [] });

    await AsyncStorage.getItem('favorite')
      .then(val => {
        if (val) {
          this.setState({ comics: JSON.parse(val), loading: false });
        }
      }).catch(err => {
        this.setState({ loading: false });
        console.log('err', err);
      })

    this.setState({ loading: false });
  }

  render() {
    const { comics, loading } = this.state;

    return (
      <View style={styles.container}>
        <Loader loading={loading} />

        {comics.length < 0 &&
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No favorite comics</Text>
          </View>
        }

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.componentDidMount}
              title={"Carregando..."}
              color={colors.white}
            />
          }
          data={comics}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ComicsCell item={item} isFavorite={true} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
