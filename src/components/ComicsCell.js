import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, Image, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import goahead from "../images/goahead.png";
import colors from "../styles/colors";

export default class MoreListCell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFavorite: this.props.isFavorite ? this.props.isFavorite : false
        }
    }

    render() {
        const item = this.props.item;

        const { container, title, thumbnail } = styles;

        return (
            <TouchableOpacity style={container} onPress={() => { Actions.comics({ item: item, title: item.title,  }) }}>
                <Image style={thumbnail} source={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }} />
                <Text style={title}>{item.title}</Text>
                <Image source={goahead} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 20,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: colors.gray,
    },
    title: {
        flex: 1,
        fontSize: 16,
    },
    thumbnail: {
        marginHorizontal: 10,
        width: 80, height: 100,
        borderRadius: 4
    }
});