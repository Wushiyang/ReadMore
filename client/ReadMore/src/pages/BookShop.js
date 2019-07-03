import React, {Component} from 'react'
import {View, Text} from 'react-native'
import { pTd } from '../assets/js/utils'

export default class BookShop extends Component{
    render(){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: pTd(450), backgroundColor: 'red'}}>
                <Text>this is in BookShop</Text>
            </View>
        )
    }
}