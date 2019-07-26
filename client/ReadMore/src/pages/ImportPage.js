import React,{ Component } from 'react'
import {View, Text, StyleSheet, Button, Image, ScrollView, TouchableWithoutFeedback} from 'react-native'
import { pTd } from '../assets/js/fit';
import { ExternalStorageDirectoryPath } from 'react-native-fs'
import NavigationServer from '../../NavigationService'

import { GoBack } from '../components/common'
import FilesTree from '../components/FilesTree'

export default class ImportPage extends Component{
    static navigationOptions = {
        title: '手机目录',
        headerLeft: <GoBack routeName='bookshelf'/>
    }
    state = {
        path: '/',
        lastPath: null
    }

    constructor(){
        super()
        this.goBack = this.goBack.bind(this)
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.left}>
                        <Text style={{fontSize: pTd(28), marginRight: pTd(15), color: '#685d5b'}}>存储卡:</Text>
                        <Text style={{fontSize: pTd(28), color: '#a49997'}}>{this.state.path}</Text>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={this.goBack}>
                        <View style={styles.right}>
                            <Image source={require('../assets/icon-goup.png')} style={styles.goup}/>
                            <Text style={{fontSize: pTd(28), color: '#685d5b'}}>上一级</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <FilesTree setPath={(path)=>this.setPath(path)} ref='filesTree'/>
            </View>
        )
    }

    goBack(){
        const lastPath = this.state.lastPath
        const path = this.state.path
        if (path === ExternalStorageDirectoryPath || path === '/') {
            return NavigationServer.navigate('bookshelf')
        }
        this.refs.filesTree.setFilePath(lastPath)
    }

    setPath(path){
        const lastPath = this.state.path
        this.setState({
            path: path,
            lastPath: lastPath
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9dedc'
    },
    header: {
        height: pTd(70),
        paddingLeft: pTd(40),
        paddingRight: pTd(40),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#dbd0ce',
        borderBottomWidth: 1
    },
    left: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        height: pTd(45),
        flexDirection: 'row',
        borderLeftWidth: 1,
        borderLeftColor: '#cec3c1',
        justifyContent: 'center',
        alignItems: 'center'        
    },
    goup: {
        height: pTd(28),
        width: pTd(28),
        marginLeft: pTd(14)
    }
})

