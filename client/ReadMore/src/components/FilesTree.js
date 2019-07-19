import React,{ Component } from 'react'
import {View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, TouchableOpacity, FlatList} from 'react-native'
import { pTd } from '../assets/js/fit';
import IndexPanel from '../components/IndexPanel'
import RNFS, { ExternalStorageDirectoryPath }from 'react-native-fs'

function FileItem(props){
    let Info, Icon
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
                <View style={{width: pTd(62), height: pTd(30), borderRadius: pTd(5), backgroundColor: '#7ca4d8', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: pTd(16), color: '#fff'}}>TXT</Text>
                </View>
                <Text style={{fontSize: pTd(20), color: '#a49997'}}>{props.size} MB</Text>
            </View>
        )
        Icon = (
            <Image source={require('../assets/icon-file.png')} style={{height: pTd(57), width: pTd(57)}}/>
        )
    } else if (props.type === 'pdf'){
        Info = (
            <View style={{flexDirection: 'row'}}>
                <View style={{width: pTd(62), height: pTd(30), borderRadius: pTd(5), backgroundColor: '#e5814f', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: pTd(16), color: '#fff'}}>TXT</Text>
                </View>
                <Text style={{fontSize: pTd(20), color: '#a49997'}}>{props.size} MB</Text>
            </View>
        )
        Icon = (
            <Image source={require('../assets/icon-file.png')} style={{height: pTd(57), width: pTd(57)}}/>
        )
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
            <View style={styles.fileItem}>
                <View>
                    <Text style={{marginBottom: pTd(28), fontSize: pTd(30)}}>{props.name}</Text>
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
        selectNum: 0,
        filesState: []
    }

    componentWillMount(){
        this.setFilePath(ExternalStorageDirectoryPath)
    }

    render(){
        let that = this
        const indexes = this.state.indexes.map((val, index)=>({
            name: val,
            active: index < 10 ? true : false,
            fn: function(){
                that.selectIndex(index)
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
                    <FlatList
                            data={this.state.filesState}
                            style={{width: '100%', paddingLeft: pTd(45), paddingRight: pTd(45), backgroundColor: '#fff'}}
                            keyExtractor={(item, index) => (index + '')}
                            renderItem={({item}) => (
                                <FileItem type={item.type} size={item.size} name={item.name} fn={()=>that.setFilePath(item.path)}/>
                            )}/>
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
                <IndexPanel
                    ref='filespanel'
                    data={indexes}/>
            </View>
        )
    }

    selectPanel(){
        this.refs.filespanel.setOpen()
    }

    deleteItem(){
        alert('delete item')
    }

    selectAll(){
        alert('select all')
    }

    selectIndex(index){
        this.refs.filespanel.setClose()
        this.setState({
            index: index
        })
    }

    setFilePath(path){
        let that = this
        this.props.setPath(path)
        // const indexes = this.state.indexes
        RNFS.readDir(path).then(result => {
            let filesState = []
            result.forEach(val => {

                // for(let i = 0; i < indexes.length; i++) {
                //     if (val.isDirectory()) {
                //         filesState.push({
                //             title: indexes[0],
                //             data: {
                //                 path: val.path,
                //                 name: val.name,
                //                 type: 'dir',
                //                 size: val.size/(1024*1024)
                //             }
                //         })
                //     }
                // }

                if (val.isDirectory()) {
                    filesState.push({
                        path: val.path,
                        name: val.name,
                        type: 'dir',
                        size: val.size/(1024*1024)
                    })
                }
                if (val.isFile()) {
                    const name = val.name
                    if (/\.txt$/.test(name)) {
                        filesState.push({
                            path: val.path,                                
                            name: name,                            
                            type: 'txt',
                            size: val.size/(1024*1024)
                        })
                    } else if (/\.pdf$/.test(name)) {
                        filesState.push({
                            path: val.path,                                
                            name: name,                            
                            type: 'pdf',
                            size: val.size/(1024*1024)
                        })
                    }
                }
            })
            that.setState({
                filesState: filesState
            })
        }).catch(error => {
            console.log(error)
        })
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1
    },
    scroll: {
        flex: 1,
        width: '100%',
        marginBottom: pTd(100) 
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
    },
    fileItem: {
        height: pTd(136),
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#d3c4bf',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})