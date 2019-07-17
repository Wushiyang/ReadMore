import React,{Component} from 'react'
import {View, Text, StyleSheet, Button, Image, TouchableWithoutFeedback} from 'react-native'
import { pTd } from '../assets/js/fit';
import NavigationService  from '../../NavigationService'

export function GoBack(props){
    return (
        <TouchableWithoutFeedback onPress={ ()=>NavigationService.navigate(props.routeName, props.params) }>
            <Image source={require('../assets/icon-goback.png')} style={{width: pTd(36), height: pTd(36), marginLeft: pTd(42)}} /> 
        </TouchableWithoutFeedback>
    )
}