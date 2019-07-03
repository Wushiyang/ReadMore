import React, {Component} from 'react'
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native'
import {pTd} from '../assets/js/utils'

export default class BookShelf extends Component{
    render(){
        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../assets/icon-search.png')} style={[styles.icon, styles.src_r]}/>
                    <Image source={require('../assets/icon-add.png')} style={styles.icon}/>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e6dbd9',
        padding: pTd(35)
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    src_r: {
        marginRight: pTd(67)
    },
    icon: {
        width: pTd(38),
        height: pTd(38)
    }
})