import React, {Component} from 'react'
import {View, Text, ScrollView, StyleSheet, Image, TouchableHighlight, Modal, TouchableWithoutFeedback, FlatList} from 'react-native'
import {pTd} from '../assets/js/utils'
import Book from '../components/Book'
import BookServer from '../servers/BookServer'

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
        const booksList = BookServer.getBooksList().map((val, index) => {
            return (
                <Book name={val.name} type={val.ext} key={index}/>
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
                            <Image source={require('../assets/icon-add.png')} style={styles.icon}/>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.content}>
                    {booksList}
                </View>

                {/* <Modal 
                    animationType='fade'
                    visible={this.state.addModalShow}>
                        <FlatList
                            data={[
                                {
                                    name: '本机导入',
                                    tap: function(){
                                        alert('本机导入')
                                    }
                                },
                                {
                                    name: '我的书籍',
                                    tap: function(){
                                        alert('我的书籍')
                                    }
                                }
                            ]}
                            style={styles.addModalPanel}
                            renderItem={({item}) => (
                                <TouchableWithoutFeedback
                                    onPress={item.tap}>
                                    <Text >{item.name}</Text>
                                </TouchableWithoutFeedback>
                            )}/>
                </Modal> */}
            </ScrollView>
        )
    }

    setAddModalVisible(visible){
        this.setState({
            addModalShow: visible
        })
    }

    handleSearch(){
        alert('搜索')
    }

    handleAdd(){
        this.setAddModalVisible(true)
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
    // addModalPanel: {

    // },
    // addModalItem: {
    //     width: pTd()
    // }
})