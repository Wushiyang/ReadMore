import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {pTd} from '../assets/js/utils'
import NavigationService from '../../NavigationService'

export default class Book extends Component{

    constructor(props){
        super()
        this.handleTap = this.handleTap.bind(this)
    }

    render(){
        const img = this.props.img
        const uri = this.props.uri
        const name = this.props.name
        const type = this.props.type
        let content
        if (img) {
            content = <Image source={img} style={{width: '100%', height: '100%'}}/>
        } else {
            content = (
                <View style={styles.inner}>
                    <Text style={[styles.text, styles.title]}>{name}</Text>
                    <Text style={[styles.text, styles.ext]}>{'- ' + type + ' -'}</Text>
                </View>
            )
        }
        return (
            <TouchableOpacity 
                onPress={ this.handleTap }
                style={styles.book}
                activeOpacity={0.8}>
                {content}
            </TouchableOpacity>
        )
    }

    handleTap(){
        NavigationService.navigate('readpage')
        // this.props.navigation.navigate('readpage')
    }
}

const styles = StyleSheet.create({
    book: {
        width: pTd(190),
        height: pTd(252),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginLeft: pTd(30),
        marginRight: pTd(30),
        marginTop: pTd(30),
        marginBottom: pTd(30),
    },
    inner: {
        width: pTd(170),
        height: pTd(228),
        backgroundColor: '#e1d5d7',
        justifyContent: 'space-between'
    },
    title: {
        flexGrow: 1,
        color: '#64585a'
    },
    ext: {
        color: '#a29795'
    },
    text: {
        textAlign: 'center'
    }
})