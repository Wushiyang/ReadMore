/**
 * @flow
 */
import React from 'react'
import {View, StyleSheet, Text, Dimensions, ScrollView, StatusBar} from 'react-native'
import {pTd, getNowTime} from '../assets/js/utils'
import Pdf from 'react-native-pdf'
import RNFS from 'react-native-fs'

const {height, width} = Dimensions.get('window')
//页眉高度
const headerHeight = Math.floor(pTd(65))
//页脚高度
const footerHeight = Math.floor(pTd(65))
//页面内容左右padding
const contentpaddingHorizontal = Math.floor(pTd(28))
//页面内容高度
const contentHeight = Math.floor(height - headerHeight - footerHeight)
//页面内容宽度
const contentWidth = width - contentpaddingHorizontal * 2
//txt文字默认大小
const fontSize = Math.floor(pTd(35))
//txt文字默认行高
const lineHeight = Math.floor(fontSize * 1.2)
console.log(contentHeight, contentWidth, lineHeight, fontSize, lineHeight)

function PdfTemplate(props: any){
    return (
        <View style={styles.container}>
            <Pdf 
                source={props.source}
                style={styles.pdf}
                onError={error => console.log(error)}/>
        </View>
    )
}

function TxtTemplate(props: any){
    return (
        <View style={styles.txt}>
            <View style={styles.txtHeader}>
                <Text style={{fontSize: pTd(24)}}>开始</Text>            
            </View>
            <View style={styles.txtContent}>
                <Text style={{fontSize: props.font, lineHeight: lineHeight}}>{props.txt}</Text>
            </View>
            <View style={styles.txtFooter}>
                <Text style={{fontSize: pTd(24)}}>50%</Text>
                <Text style={{fontSize: pTd(24)}}>{props.time}</Text>
            </View>
        </View>
    )
}

type Props = {
    navigation: any
}

type State = {
    txt: string,
    type: string,
    uri: string,
    time: string,
    size: number,
    fontSize: number
}

let timer

export default class ReadPage extends React.Component<Props, State>{

    constructor(){
        super()
        this.state = {
            txt: '',
            type: '',
            uri: '',
            time: getNowTime(),
            size: 0,
            fontSize: fontSize
        }
    }

    componentWillMount(){
        const type = this.props.navigation.getParam('type')
        const uri = this.props.navigation.getParam('uri')
        this.setState({
            type: type,
            uri: uri
        })
        //获取时间
        timer = setInterval(()=>{
            this.setState({
                time: getNowTime()
            })
        }, 60000)
        RNFS.stat(uri).then( result => {
            this.setState({
                size: +result.size
            })
            console.log(result)
            RNFS.read(uri, 2000, 0).then( result => {
                console.log(result)
                this.setState({
                    txt: result
                })
            }).catch(error => console.log(error))
        }).catch(error => console.log(error))
    }

    componentWillUnMount(){
        timer &&　clearInterval(timer)
    }

    render(){
        const {state} = this 
        const {type, txt, time, fontSize} = state
        let content
        if (type === 'pdf') {
            content = (
                <PdfTemplate source={{uri: this.state.uri}} />
            )
        } else if (type === 'txt') {
            content = (
                <TxtTemplate 
                    time={time}
                    font={fontSize}
                    txt={txt}/>
            )
        }
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true} />
                {content}
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
    },
    txt: {
        flex: 1,
        width: pTd(750),
        backgroundColor: '#ccb49a',
        paddingHorizontal: contentpaddingHorizontal
    },
    txtHeader: {
        height: headerHeight,
        justifyContent: 'center'
    },
    txtContent: {
        height: contentHeight,
        overflow: 'hidden'
    },
    txtFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: footerHeight    
    }
})