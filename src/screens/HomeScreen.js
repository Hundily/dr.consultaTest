import React, { Component } from 'react';
import { StyleSheet, RefreshControl, View, FlatList, Text } from 'react-native';
import ComicsCell from '../components/ComicsCell';
import axios from 'axios';
import Loader from '../components/Loader';
import colors from '../styles/colors';
import { API, API_KEY } from '../config/AppConstants';

export default class HomeScreen extends Component {

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

    await axios.get( API.URL + `/v1/public/comics?ts=1550705814&apikey=2353ec726fac4524cb90e6228b58283d&hash=cd6ce192df0e666a77ffcebda22d5459`)
      .then(res => {
        this.setState({ comics: res.data.data.results, loading: false });
      }).catch(err => {
        this.setState({ loading: false });
        console.log('err', err);
      })
  }

  render() {
    const { comics, loading } = this.state;

    return (
      <View style={styles.container}>
        <Loader loading={loading} />

        {comics.length < 0 &&
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No comics</Text>
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
          renderItem={({ item }) => <ComicsCell item={item} />}
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
