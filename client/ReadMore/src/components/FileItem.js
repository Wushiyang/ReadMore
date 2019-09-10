import React,{ Component } from 'react'
import {View, Text, Image, TouchableNativeFeedback, StyleSheet} from 'react-native'
import { pTd, beautySize } from '../assets/js/utils';
import CheckBox from 'react-native-checkbox'

export default class FileItem extends Component{
    constructor(){
        super()
    }

    render(){
        let Info, Icon
        const {props} = this
        if (props.type === 'dir') {
            Info = (
                // <Text style={{fontSize: pTd(27), color: '#a39491'}}>{props.size} MB</Text>
                <Text style={{fontSize: pTd(0)}}></Text>
            )
            Icon = (
                <Image source={require('../assets/icon-file.png')} style={{height: pTd(57), width: pTd(57)}}/>
            )
        } else if (props.type === 'txt') {
            Info = (
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: pTd(62), height: pTd(30), borderRadius: pTd(5), backgroundColor: '#7ca4d8', justifyContent: 'center', alignItems: 'center', marginRight: pTd(24)}}>
                        <Text style={{fontSize: pTd(16), color: '#fff'}}>TXT</Text>
                    </View>
                    <Text style={{fontSize: pTd(20), color: '#a49997'}}>{beautySize(props.size)}</Text>
                </View>
            )

            Icon = (
                <CheckBox
                    checkboxStyle={{width: pTd(35), height: pTd(35)}}
                    label=''
                    checked={props.checked}
                    onChange={(checked) => props.checkfn(checked)}
                />
            )
            if (props.hasAddShelft) {
                Icon = (
                    <Text>已加入书架</Text>
                )
            }

        } else if (props.type === 'pdf'){
            Info = (
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: pTd(62), height: pTd(30), borderRadius: pTd(5), backgroundColor: '#e5814f', justifyContent: 'center', alignItems: 'center', marginRight: pTd(24)}}>
                        <Text style={{fontSize: pTd(16), color: '#fff'}}>TXT</Text>
                    </View>
                    <Text style={{fontSize: pTd(20), color: '#a49997'}}>{beautySize(props.size)}</Text>
                </View>
            )

            Icon = (
                <CheckBox
                    checkboxStyle={{width: pTd(35), height: pTd(35)}}
                    label=''
                    checked={props.checked}
                    onChange={(checked) => props.checkfn(checked)}
                />
            )                
            if (props.hasAddShelft) {
                Icon = (
                    <Text>已加入书架</Text>
                )
            }

        } else {
            return (
                <View>
                    <Text>缺少type</Text>
                </View>
            )
        }
        return (
            <TouchableNativeFeedback
                onPress={props.fn}>
                <View style={[styles.fileItem, {height: props.scrollItemHeight, borderTopWidth: props.scrollItemBorder}]}>
                    <View>
                        <Text style={{marginBottom: pTd(28), fontSize: pTd(30)}}>{props.name}</Text>
                        {Info}
                    </View>
                    {Icon}
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    fileItem: {
        width: '100%',
        borderTopColor: '#d3c4bf',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})