import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet, TouchableWithoutFeedback, Modal} from 'react-native'
import {pTd} from '../assets/js/utils'

export default class DropDown extends Component{
    render(){
        const visible = this.props.visible
        if (visible) {
            return (
                <TouchableWithoutFeedback
                    onPress={ () => alert('tap')}>
                    <Modal 
                        style={styles.wrapper}
                        animationType="fade"
                        transparent={true}
                        visible={visible}
                        onRequestClose={() => {
                            alert("Modal has been closed.");
                        }}>
                        <FlatList 
                        data={this.props.data}
                        style={[styles.panel, this.props.viewStyle]}
                        renderItem={
                            ({item, index}) => (
                                <TouchableWithoutFeedback
                                    onPress={() => item.tap()}>
                                    <View style={styles.item}>
                                        <Text style={styles.text}>{item.name}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }/>
                    </Modal>
                </TouchableWithoutFeedback>
            )
        }
        return <View />
    }
}
const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%'
    },
    panel: {
        zIndex: 1000,
        width: pTd(265),
        backgroundColor: '#fff'        
    },
    item: {
        justifyContent: 'center',
        height: pTd(102),
        paddingLeft: pTd(30)
    },
    text: {
        textAlign: 'left',
        fontSize: pTd(32)
    }
})