import React, { Component } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import {pTd} from '../assets/js/utils'

export default class Book extends Component{

    render(){
        const img = this.props.img
        const uri = this.props.uri
        if (img) {
            return (
                <Image source={img} style={styles.book}/>
            )
        }
        const name = this.props.name
        const type = this.props.type
        return (
            <View style={styles.book}>
                <View style={}>
                    <Text>{name}</Text>
                    <Text>{'- ' + type + ' -'}</Text>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    book: {
        width: pTd(190),
        height: pTd(252),
        justifyContent: 'center',
        alignItems: 'center'
    },
    inner: {
        width: pTd(170),
        height: pTd(228)
    }
})