import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../styles/colors';
import commons from '../styles/commons';

export default class ButtonFavorite extends Component {

    render() {
        const props = this.props;
        const btnStyle = {
            container: {
                position: 'absolute',
                bottom: props.bottom ? props.bottom : 20,
                right: 20
            },
            buttonSty: {
                backgroundColor: props.isFavorite ? colors.marvelRed : colors.gray,
                width: 60,
                height: 60,
                borderRadius: 35,
                justifyContent: 'center'
            },
        }

        return (
            <View style={btnStyle.container}>
                <TouchableOpacity onPress={() => { props.onPress() }} style={[btnStyle.buttonSty, commons.shadow]}>
                    <Icon name='heart' size={30} color={colors.white} style={{ textAlign: 'center' }} />
                </TouchableOpacity>
            </View>
        )
    }
}
