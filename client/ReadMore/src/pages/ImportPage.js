import React,{ Component } from 'react'
import {View, Text, StyleSheet, Button, Image} from 'react-native'
import { pTd } from '../assets/js/fit';
import { goBack } from '../components/common'

export default class ImportPage extends Component{
    static navigationOptions = {
        title: '智能导入',
        headerLeft: <Image source={require('../assets/icon-goback.png')} style={{width: pTd(36), height: pTd(36), marginLeft: pTd(42)}} /> 
    } 
    render(){
        return (
            <Button onPress={ ()=>this.props.navigation.navigate('bookshelf') } title='智能导入' />
        )
    }
}

const styles = StyleSheet.create({
    headerImg: {

    }
})

