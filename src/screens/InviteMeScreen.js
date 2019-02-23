import React from 'react';
import {
  WebView
} from 'react-native';

export default class InviteMeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <WebView source={{ uri: 'https://github.com/Hundily' }} />
    );
  }
}
