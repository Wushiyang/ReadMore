import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {pTd} from '../assets/js/utils'
import Pdf from 'react-native-pdf'
import RNFS from 'react-native-fs' 

function PdfTemplate(props){
    return (
        <View style={styles.container}>
            <Pdf 
                source={props.source}
                style={styles.pdf}
                onError={error => console.log(error)}/>
        </View>
    )
}

export default class ReadPage extends Component{
    render(){
        // const source = {
        //     uri: 'https://wx7.syj368.com/other/app/plus会员维保协议-2019版.pdf'
        // }
        const type = this.props.navigation.getParam('type')
        const uri = this.props.navigation.getParam('uri')
        if (type === 'pdf') {
            console.log(RNFS.ExternalDirectoryPath)
            // RNFS.readDir(RNFS.ExternalStorageDirectoryPath).then(result => {
            //     console.log(result)
            // }).catch(error => console.log(error))
            return (
                <PdfTemplate source={{uri: uri}} />
            )
        }
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