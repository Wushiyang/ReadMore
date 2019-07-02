import React, {Component} from 'react'
import {View, Text} from 'react-native'

export default class BookShelf extends Component{
    render(){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>this is in BookShelf</Text>
            </View>
        )
    }
}