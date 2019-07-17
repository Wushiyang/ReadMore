import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback, Modal, TouchableOpacity} from 'react-native'
import {pTd} from '../assets/js/utils'

function Box(props){
    return (
        <TouchableOpacity
            onPress={props.fn}>
            <View style={{width: pTd(150), height: pTd(128), backgroundColor: props.active?'#e24f47':'#8f7f80', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: pTd(35), color: props.active?'#fff':'#ada1a1'}}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

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
        const data = this.props.data
        const boxes = data.map((val, index) => (
            <Box name={val.name} active={val.active} fn={val.fn} key={index}/>
        ))
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
                        {boxes}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    setOpen(){
        console.log(this)
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
        width: pTd(626),  
        height: pTd(948),
        flexDirection: 'row',
        justifyContent: "space-between",
        alignContent: 'space-between'
    }
})