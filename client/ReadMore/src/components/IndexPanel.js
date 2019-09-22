/**
 * @flow
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback, Modal, TouchableOpacity} from 'react-native'
import {pTd} from '../assets/js/utils'

type PanelIndex = {
    name: string, 
    active: boolean,
    fn: ()=>void
}

function Box(props){
    if (props.active) {
        return (
            <TouchableOpacity
                onPress={props.fn}>
                <View style={{width: pTd(150), height: pTd(128), backgroundColor: '#e24f47', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: pTd(35), color: '#fff'}}>{props.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{width: pTd(150), height: pTd(128), backgroundColor: '#8f7f80', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: pTd(35), color: '#ada1a1'}}>{props.name}</Text>
        </View>
    )
}

type Props = {
    data: PanelIndex[]
}
type State = {
    visible: boolean
}
export default class DropDown extends Component<Props,State>{

    setOpen: ()=>void

    setClose: ()=>void

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
                transparent={ false }
                animationType='fade'>
                <TouchableWithoutFeedback
                    onPress={ this.setClose }
                    >
                    <View style={styles.wrapper}>
                        <View style={styles.mask}></View>
                        <View style={styles.panel}>
                            {boxes}
                        </View>
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
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    mask: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        opacity: 0.8,
        position: 'absolute'
    },
    panel: {
        width: pTd(626),  
        height: pTd(948),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
        alignContent: 'space-between'
    }
})