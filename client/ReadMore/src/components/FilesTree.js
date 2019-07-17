import React,{ Component } from 'react'
import {View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, TouchableOpacity} from 'react-native'
import { pTd } from '../assets/js/fit';
import IndexPanel from '../components/IndexPanel'

function FileItem(props){
    let Info, Icon
    if (props.type === 'dir') {
        Info = (
            <View>
                <Text>{props.size} 项</Text>
            </View>
        )
        Icon = (
            <Image source={require('../assets/icon-file.png')}/>
        )
    } else if (props.type === 'txt') {
        Info = (
            <View>
                <View>
                    <Text>TXT</Text>
                </View>
                <Text>{props.size} MB</Text>
            </View>
        )
        Icon = (
            <Image source={require('../assets/icon-file.png')}/>
        )        
    } else if (props.type === 'pdf'){
        Info = (
            <View>
                <View>
                    <Text>PDF</Text>
                </View>
                <Text>{props.size} MB</Text>
            </View>
        )
        Icon = (
            <Image source={require('../assets/icon-file.png')}/>
        )
    } else {
        return (
            <View>
                <Text>缺少type</Text>
            </View>
        )
    }
    return (
        <TouchableNativeFeedback>
            <View>
                <View>
                    <Text>{props.name}</Text>
                    {Info}
                </View>
                {Icon}
            </View>
        </TouchableNativeFeedback>
    )
}

export default class FilesTree extends Component{
    constructor(){
        super()
        this.selectPanel = this.selectPanel.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.selectAll = this.selectAll.bind(this)
    }
    state = {
        indexes: ['文件夹', '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        index: 0,
        selectNum: 0
    }
    render(){
        const indexes = this.state.indexes.map((val, index)=>({
            name: val,
            active: index < 10 ? true : false,
            fn: function(){
                
            }
        }))
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <TouchableWithoutFeedback 
                        onPress={this.selectPanel}>
                        <View style={styles.header}>
                            <Text style={{fontSize: pTd(28), color: '#a49997'}}>{this.state.indexes[this.state.index]}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View>
                        <Text>文件列表</Text>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <View style={styles.footer_left}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{marginLeft: pTd(43), fontSize: pTd(28)}}>已选</Text>
                            <Text style={{marginLeft: pTd(20), marginRight: pTd(20), fontSize: pTd(28), color: '#c45c5b'}}>{this.state.selectNum}</Text>
                            <Text style={{fontSize: pTd(28)}}>项</Text>
                        </View>
                        <TouchableOpacity
                            onPress={this.deleteItem}>
                            <View style={{width: pTd(140), flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: pTd(30)}}>全选</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footer_right}>
                        <TouchableOpacity
                            onPress={this.deleteItem}>
                            <View style={{width: pTd(140), flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: pTd(30)}}>删除</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.selectAll}>
                            <View style={{flex: 1, width: pTd(208), backgroundColor: '#e7afb0', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: pTd(30), color: '#fff'}}>加入书架</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <IndexPanel data={}/>
            </View>
        )
    }

    selectPanel(){
        alert('show select panel')
    }

    deleteItem(){
        alert('delete item')
    }

    selectAll(){
        alert('select all')
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1
    },
    scroll: {
        flex: 1,
        backgroundColor: 'red',        
    },
    header: {
        paddingLeft: pTd(40),
        paddingRight: pTd(40),
        backgroundColor: '#edded9',
        height: pTd(70),
        justifyContent: 'center',
    },
    footer: {
        position: 'absolute',
        height:　pTd(100),
        width: '100%',
        backgroundColor: '#fff',
        left: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    footer_left: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    footer_right: {
        flexDirection: 'row',
        alignItems: 'center'        
    }
})