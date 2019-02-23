import React, { Component } from "react";
import { Platform, View, StyleSheet, StatusBar, Image, SafeAreaView, TouchableOpacity, Alert, WebView } from 'react-native';
import { Container, Footer, FooterTab } from "native-base";
import ButtonFooter from "../components/ButtonFooter";
import colors from "../styles/colors";
import HomeScreen from "./HomeScreen";
import FavoriteScreen from "./FavoriteScreen";
import ironman from '../images/ironman.png';
import { Actions } from "react-native-router-flux";

export default class MainScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tab1: true,
      tab2: false,
    };
  }

  easterEgg = () => {
    Alert.alert(
      'Olá Mundo!',
      'Você acabou de descobrir o easter egg! Mega, hiper secreto! Agora você ganhou o privilégio de me pagar um café... :)',
      [
        { text: 'Não', onPress: () => { } },
        { text: 'Convidar', onPress: () => { Actions.invite() } },
      ],
      { cancelable: false }
    )
  }

  getHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          this.easterEgg()
        }}>
        <Image resizeMode="contain" source={ironman} style={{ flex: 2, width: 167, height: 44 }} />
      </TouchableOpacity>
    </View>
  );

  resetTab = () => {
    this.setState({
      tab1: false,
      tab2: false,
    });
  };

  callHome = () => {
    this.resetTab();
    this.setState({ tab1: true });
  };

  callFavorite = () => {
    this.resetTab();
    this.setState({ tab2: true });
  };

  render() {
    const { tab1, tab2 } = this.state;
    const { container, footer } = styles;

    return (
      <View style={container}>
        <StatusBar backgroundColor={colors.marvelRed} translucent barStyle="dark-content" />
        <SafeAreaView style={{ backgroundColor: colors.marvelRed }}>
          {this.getHeader()}
        </SafeAreaView>
        <Container>
          <View style={container}>
            {tab1 && <HomeScreen />}
            {tab2 && <FavoriteScreen />}
          </View>

          <Footer style={{ borderTopWidth: 0 }}>
            <FooterTab style={footer}>
              <ButtonFooter active={tab1} title={"Comics"} icon={'home'} onPress={() => this.callHome()} />
              <ButtonFooter active={tab2} title={"Favorites"} icon={'heart'} onPress={() => this.callFavorite()} />
            </FooterTab>
          </Footer>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    marginTop: Platform.OS === 'ios' ? 0 : 20,
    backgroundColor: colors.marvelRed,

  },
  footer: {
    backgroundColor: colors.dark44
  },
});
