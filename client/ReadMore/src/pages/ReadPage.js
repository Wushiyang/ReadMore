/**
 * @flow
 */
import React from 'react'
import {View, StyleSheet, Text, Dimensions, ScrollView, StatusBar} from 'react-native'
import {pTd, getNowTime, countPageFontNumber} from '../assets/js/utils'
import Pdf from 'react-native-pdf'
import RNFS from 'react-native-fs'
import {Base64} from 'js-base64'

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
//分段读取txt文件一次读取字节数
const readLength = 1000
//换页阈值
const cpValue = Math.floor(width / 8)
const changPoint = cpValue > 30 ? cpValue : 30
//页面换分3个区块
const blockWidth = Math.floor(width / 3)
const touchBlock = [blockWidth, width - blockWidth]

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
                <Text style={{fontSize: pTd(24)}}>{props.readPP.toFixed(2)}%</Text>
                <Text style={{fontSize: pTd(24)}}>{props.time}</Text>
            </View>
        </View>
    )
}

type Props = {
    navigation: any
}

type State = {
    readTxt: string,
    txt: string,
    type: string,
    uri: string,
    time: string,
    size: number,
    fontSize: number,
    loadPointList: number[],    //文章读取分段点数组(字符)
    readIndex: number,  //文章读取分段索引
    readPP: number, //阅读进度百分比
    fileLoadPosition: number, //文件读取位置(字节)
    px: ?number,
    py: ?number,
    flag: 'none' | 'left' | 'center' | 'right'
}

let timer

export default class ReadPage extends React.Component<Props, State>{

    constructor(){
        super()
        this.state = {
            readTxt: '',
            txt: '',
            type: '',
            uri: '',
            time: getNowTime(),
            size: 0,
            fontSize: fontSize,
            loadPointList: [],
            readIndex: 0,
            readPP: 0,
            fileLoadPosition: 0,
            px: null,
            py: null,
            flag: 'none'
        }
    }

    componentWillMount(){
        const type = this.props.navigation.getParam('type')
        const uri = this.props.navigation.getParam('uri')
        const {fileLoadPosition} = this.state
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
            let sz = +result.size
            this.setState({
                size: sz
            })
            this.readFile(uri, sz, fileLoadPosition, true)
        }).catch(error => console.log(error))
    }

    componentWillUnMount(){
        timer && clearInterval(timer)
    }

    render(){
        const {state} = this 
        const {type, txt, time, fontSize, readPP} = state
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
                    readPP={readPP}
                    txt={txt}/>
            )
        }
        return (
            <View 
                style={{flex: 1}}
                // onStartShouldSetResponder={()=>true}
                onStartShouldSetResponder={this.onTouchStart.bind(this)}
                onResponderRelease={this.onTouchRelease.bind(this)}
                onMoveShouldSetResponder={()=>true}
                onResponderMove={this.onTouchMove.bind(this)}>
                <StatusBar hidden={true} />
                {/* <View style={{height: 24}}>
                    <Text>x: {this.state.x.toFixed(2)} y: {this.state.y.toFixed(2)} px: {this.state.px.toFixed(2)} py: {this.state.py.toFixed(2)} StatusBar:{StatusBar.currentHeight}</Text>
                </View> */}
                {content}
            </View>
        )
    }

    // 百分比计算规则：
    //    ( 已读完的读取的字节 / 全文字节 + (读取长度 / 全文字节) * (分段点数组[分段点后点索引] / 分段点数组[分段点最后点索引]) ) * 100
    changePage(flag: string){
        const {readIndex, loadPointList, uri, fileLoadPosition, readTxt, size} = this.state
        let changeIndex, changeLoadPosition
        if (flag === 'right') {
            changeIndex = readIndex + 1
            changeLoadPosition = fileLoadPosition + readLength
            if(changeIndex + 1 >= loadPointList.length){
                if (changeLoadPosition >= size) {
                    return alert('已无更多章节!')
                }
                this.readFile(uri, size, changeLoadPosition, true)
            } else {
                const readPP = (fileLoadPosition / size +  (readLength / size) * (loadPointList[changeIndex + 1] / loadPointList[loadPointList.length - 1])) * 100
                this.setState({
                    txt: readTxt.substring(loadPointList[changeIndex], loadPointList[changeIndex + 1]),
                    readIndex: changeIndex,
                    readPP
                })
            }
        } else if (flag === 'left'){
            changeIndex = readIndex - 1
            changeLoadPosition = fileLoadPosition - readLength
            if(readIndex === 0){
                if (fileLoadPosition === 0) {
                    return alert('已经是第一页!')
                }
                this.readFile(uri, size, changeLoadPosition, false)
            } else {
                const readPP = (fileLoadPosition / size +  (readLength / size) * (loadPointList[readIndex] / loadPointList[loadPointList.length - 1])) * 100
                this.setState({
                    txt: readTxt.substring(loadPointList[changeIndex], loadPointList[readIndex]),
                    readIndex: changeIndex,
                    readPP
                })
            }
        }

    }

    readFile(uri: string, size: number, fileLoadPosition: number, isStart: boolean){
        let that = this
        // RNFS.readFile(uri).then( result => {
        RNFS.read(uri, readLength, fileLoadPosition, 'base64').then( base64 => {
            let result = Base64.decode(base64)
            const loadPointList = countPageFontNumber(contentHeight, contentWidth, lineHeight, fontSize, result)
            if (isStart === true) {
                const readPP = (fileLoadPosition / size +  (readLength / size) * (loadPointList[1] / loadPointList[loadPointList.length - 1])) * 100
                that.setState({
                    readTxt: result,
                    txt: result.substring(0, loadPointList[1]),
                    loadPointList: loadPointList,
                    fileLoadPosition: fileLoadPosition,
                    readIndex: 0,
                    readPP: readPP
                })
            } else {
                const readPP = (fileLoadPosition + readLength) / size * 100
                that.setState({
                    readTxt: result,
                    txt: result.substring(loadPointList[loadPointList.length - 2], loadPointList[loadPointList.length - 1]),
                    loadPointList: loadPointList,
                    fileLoadPosition: fileLoadPosition,                    
                    readIndex: loadPointList.length - 2,
                    readPP: readPP
                })
            }
        }).catch(error => console.log(error))
    }

    onTouchStart(event: any){
        const {pageX, pageY} = event.nativeEvent
        let flag
        if (pageX < touchBlock[0]) {
            flag = 'left'
        } else if (touchBlock[0] <= pageX && pageX <= touchBlock[1]) {
            flag = 'center'            
        } else {
            flag = 'right'
        }        
        this.setState({
            px: pageX,
            py: pageY,
            flag
        })
        return true
    }

    onTouchRelease(event: any){
        const {flag} = this.state
        if (flag === 'left') {
            console.log('left')
            this.changePage(flag)
        } else if (flag === 'center') {
            console.log('center')
        } else if (flag === 'right') {
            console.log('right')
            this.changePage(flag)
        }
    }

    onTouchMove(event: any){
        const {pageX, pageY} = event.nativeEvent
        const {px, py} = this.state
        if (typeof px === 'number') {
            const move =  pageX - px
            if (move > changPoint) {
                this.setState({
                    flag: 'right'
                })
            } else if (move < -changPoint) {
                this.setState({
                    flag: 'left'
                })            
            }
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