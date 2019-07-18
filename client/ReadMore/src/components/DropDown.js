import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet, TouchableWithoutFeedback, Modal, Dimensions} from 'react-native'
import {pTd} from '../assets/js/utils'

export default class DropDown extends Component{

    constructor(){
        super()
        this.setOpen = this.setOpen.bind(this)
        this.setClose = this.setClose.bind(this)
    }

    state = {
        visible: false
    }

    render(){
        return (
            <Modal
                visible={ this.state.visible }
                onRequestClose={ this.setClose }
                transparent={ true }
                animationType='fade'>
                <TouchableWithoutFeedback
                    onPress={ this.setClose }
                    >
                    <View style={[styles.wrapper]}>
                        <FlatList 
                        data={this.props.data}
                        style={[styles.panel, this.props.viewStyle]}
                        renderItem={
                            ({item}) => (
                                <TouchableWithoutFeedback
                                    onPress={() => item.tap()}>
                                    <View style={styles.item}>
                                        <Text style={styles.text}>{item.name}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }/>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    setOpen(){
        this.setState({
            visible: true
        })
    }

    setClose(){
        this.setState({
            visible: false
        })
    }
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        height: '100%',
        width: '100%'
    },
    panel: {
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