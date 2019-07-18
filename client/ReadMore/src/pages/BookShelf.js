import React, {Component} from 'react'
import {View, Text, ScrollView, StyleSheet, Image, TouchableHighlight, PermissionsAndroid} from 'react-native'
import {pTd} from '../assets/js/utils'
import Book from '../components/Book'
import BookServer from '../servers/BookServer'
import DropDown from '../components/DropDown'
import NavigationServer from '../../NavigationService'

async function requestFilePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: '申请文件夹权限',
          message: '一个很牛逼的应用想读取你的文件',
          buttonNeutral: '等会再问我',
          buttonNegative: '不行',
          buttonPositive: '好吧',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('现在你获得文件夹权限了');
      } else {
        console.log('用户并不屌你');
      }
    } catch (err) {
      console.warn(err);
    }
}

requestFilePermission()

export default class BookShelf extends Component{
    constructor(props){
        super()
        this.handleSearch = this.handleSearch.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
    }

    state = {
        addModalShow: false
    }

    render(){
        let that = this
        const booksList = BookServer.getBooksList().map((val, index) => {
            return (
                <Book name={val.name} type={val.ext} key={index} uri={val.path}/>
            )
        })
        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text>您好，陌生人！</Text>
                    </View>
                    <View style={styles.header_left}>
                        <TouchableHighlight 
                            style={[styles.icon_wrap, styles.src_r]}
                            onPress={this.handleSearch}
                            underlayColor='#dececf'>
                            <Image source={require('../assets/icon-search.png')} style={styles.icon}/>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.icon_wrap}
                            onPress={this.handleAdd}
                            underlayColor='#dececf'>
                            <View>
                                <Image source={require('../assets/icon-add.png')} style={styles.icon}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.content}>
                    {booksList}
                </View>
                <DropDown
                    ref='addPanel'
                    viewStyle={styles.addDropDown}
                    data={[
                        {
                            key: '0',
                            name: '本机导入',
                            tap: function(){
                                that.refs.addPanel.setClose()
                                NavigationServer.navigate('importpage')
                            }
                        },
                        {
                            key: '1',
                            name: '我的书籍',
                            tap: function(){
                                alert('我的书籍')
                            }
                        }
                    ]}/>
            </ScrollView>
        )
    }

    handleSearch(){
        alert('搜索')
    }

    handleAdd(){
        this.refs.addPanel.setOpen()
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e6dbd9'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: pTd(30),
        paddingRight: pTd(30),
        paddingTop: pTd(15),
        paddingBottom: pTd(15),
        height: pTd(114)
    },
    header_left: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    src_r: {
        marginRight: pTd(30)
    },
    icon_wrap: {
        width: pTd(84),
        height: pTd(84),
        borderRadius: pTd(42),
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: pTd(30),
        height: pTd(30)
    },
    content: {
        flexDirection: 'row'
    },
    addDropDown: {
        position: 'absolute',
        right: pTd(30),
        top: pTd(42)
    }
})