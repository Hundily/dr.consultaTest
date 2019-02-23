import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'native-base';
import colors from '../styles/colors';

export default props => (
    <Button onPress={props.onPress}>
        <Icon name={props.icon} size={24} color={props.active ? colors.white : '#A3A3A3'} />
        <Text style={props.active ? styles.textTab_active : styles.textTab}>{props.title}</Text>
    </Button>
);

const styles = StyleSheet.create({
    textTab: {
        opacity: 0.6,
        fontSize: 12,
        color: '#A3A3A3'
    },
    textTab_active: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.white
    },
})