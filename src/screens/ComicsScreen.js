import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, AsyncStorage } from 'react-native';
import { Icon } from 'native-base';
import Ripple from "react-native-material-ripple";
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Actions } from 'react-native-router-flux';
import ButtonFavorite from '../components/ButtonFavorite';

export default class ComicsScreen extends Component {
  static navigationOptions = {
    headerStyle: { backgroundColor: colors.bee_yellow, border: 0 },
    headerTintColor: colors.dark,
    headerLeft: (
      <Ripple
        onPress={() => {
          Actions.pop();
        }}>
        <Icon name='arrow-back' style={{ marginLeft: 10, color: colors.black }} />
      </Ripple>
    ),
    headerRight: <View />
  }

  constructor(props) {
    super(props),
      this.state = {

      }
  }

  setFavorite = async (item) => {
    console.log('item', item);
    const { isFavorite } = this.state;

    let favoriteList = await AsyncStorage.getItem('favorite');

    if (!isFavorite) {
      let newData = JSON.parse(favoriteList);

      if (!newData) {
        newData = []
      }

      newData.push(item)
      await AsyncStorage.setItem('favorite', JSON.stringify(newData))
        .then(res => {
          console.log('res', res);
          this.setState({ isFavorite: true });
        }).catch(err => {
          console.log('err', err);
        })
    } else {
      let removeFav = JSON.parse(favoriteList);

      var newFav = [];
      removeFav.map(el => {
        console.log('el', el);
        if (el.id != item.id) {
          newFav.push(el)
        }
      });

      await AsyncStorage.setItem('favorite', JSON.stringify(newFav))
        .then(res => {
          console.log('res', res);
          this.setState({ isFavorite: false });
        }).catch(err => {
          console.log('err', err);
        })
    }
  }

  componentDidMount = async () => {
    const { item } = this.props;

    await AsyncStorage.getItem('favorite')
      .then(val => {
        if (val) {
          var isFavorite = JSON.parse(val).find(v => v.id == item.id)
          isFavorite ? this.setState({ isFavorite: true }) : this.setState({ isFavorite: false });
        }
      }).catch(err => {
        console.log('err', err);
      })

    this.setState({ loading: false });
  }

  render() {
    const item = this.props.item;

    console.log('state', this.state);

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>

          <View style={styles.body}>
            <Image style={styles.thumbnail} source={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }} />
            <Text style={[styles.text, { fontSize: 16, fontFamily: fonts.bold }]}>{item.title}</Text>
            <Text style={styles.text}>{item.description}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.text, styles.title]}>Price</Text>
              <Text style={styles.text}>{item.prices[0].price}</Text>
            </View>
            {item.creators.items.map(val => {
              return (
                <View key={val.name} style={{ flexDirection: 'row' }}>
                  <Text style={styles.text}>{val.role}</Text>
                  <Text style={[styles.text, styles.title]}>{val.name}</Text>
                </View>
              )
            })}
          </View>
        </ScrollView>
        <ButtonFavorite bottom={20} isFavorite={this.state.isFavorite} onPress={() => { this.setFavorite(item) }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,

  },
  scroll: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
  },
  thumbnail: {
    width: 180,
    height: 250,
    borderRadius: 4
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.bold
  }
});
