import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {pTd} from '../assets/js/utils'
import Pdf from 'react-native-pdf'

export default class ReadPage extends Component{
    render(){
        // const source = {
        //     uri: 'https://wx7.syj368.com/other/app/plus会员维保协议-2019版.pdf'
        // }
        const source = require('../mocker/books/[线dai(第五版)].教材扫描版.pdf')
        return (
            <View style={styles.container}>
                <Pdf 
                    source={source}
                    style={styles.pdf}
                    onError={error => console.log(error)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000' 
    },
    pdf: {
        flex: 1,
        width: pTd(750)
    }
})