import React, {Component} from 'react'
import {View, Text} from 'react-native'

export default class PersonalCenter extends Component{
    render(){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>this is in personal</Text>
            </View>
        )
    }
}