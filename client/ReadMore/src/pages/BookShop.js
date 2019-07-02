import React, {Component} from 'react'
import {View, Text} from 'react-native'

export default class BookShop extends Component{
    render(){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: 420, backgroundColor: 'red'}}>
                <Text>this is in BookShop</Text>
            </View>
        )
    }
}