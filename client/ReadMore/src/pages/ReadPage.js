/**
 * @flow
 */
import React from 'react'
import {View, StyleSheet, Text, Dimensions, ScrollView, StatusBar, Modal, TouchableWithoutFeedback} from 'react-native'
import {pTd, getNowTime, countPageFontNumber} from '../assets/js/utils'
import Pdf from 'react-native-pdf'
import RNFS from 'react-native-fs'
import SvgGoback from '../assets/icon-goback2.svg'
const Utf8 = require('../assets/js/utf8')

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
const readLength = 80000
//换页阈值
const cpValue = Math.floor(width / 10)
const changPoint = cpValue > 30 ? cpValue : 30
//页面换分3个区块
const blockWidth = Math.floor(width / 3)
const touchBlock = [blockWidth, width - blockWidth]

function PdfTemplate(props: any){
    return (
        <Pdf 
            source={props.source}
            style={styles.pdf}
            onError={error => console.log(error)}/>   
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
    flag: | 'none' 
    | 'lClick'  //左点
    | 'cClick'  //中点
    | 'rClick'  //右点
    | 'lSlide'  //左滑
    | 'rSlide'  //右滑
    | 'upSlide' //上滑
    | 'downSlide' //下滑
    | 'lglClick' //长左点
    | 'lgcClick' //长中点
    | 'lgrClick' //长右点
    | 'lglSlide' //长左滑
    | 'lgrSlide' //长右滑
    | 'lgupSlide' //长上滑
    | 'lgdownSlide', //长下滑
    menuVisible: boolean
}

let timer

export default class ReadPage extends React.Component<Props, State>{

    //冗余字符
    rongYu = 4

    //触摸时间戳
    touchTimestamp = 0

    //阻滞检测
    stop = false

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
            flag: 'none',
            menuVisible: false
        }
    }

    componentWillMount(){
        const type = this.props.navigation.getParam('type')
        const uri = this.props.navigation.getParam('uri')
        //路由切换时clear计时器
        this.props.navigation.addListener(
            'willBlur',
            () => {
                timer && clearInterval(timer)
            }
        )
        this.setState({
            type: type,
            uri: uri
        })
        if (type === 'txt') {
            const {fileLoadPosition} = this.state
            //自动更新时间
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
    }

    componentWillUnMount(){
        timer && clearInterval(timer)
    }

    render(){
        const {state} = this 
        const {type, txt, time, fontSize, readPP, menuVisible} = state
        let content
        if (type === 'pdf') {
            content = (
                <View 
                    style={{flex: 1}}
                    onStartShouldSetResponder={this.onTouchStart.bind(this)}
                    onResponderRelease={this.onTouchRelease.bind(this)}
                    onMoveShouldSetResponder={this.onShouldTouchMove.bind(this)}
                    onResponderMove={this.onTouchMove.bind(this)}>
                    <PdfTemplate source={{uri: this.state.uri}} />
                </View>                

            )
        } else if (type === 'txt') {
            content = (
                <View 
                    style={[styles.content, {top: menuVisible?-StatusBar.currentHeight:0}]}
                    onStartShouldSetResponder={this.onTouchStart.bind(this)}
                    onResponderRelease={this.onTouchRelease.bind(this)}
                    onMoveShouldSetResponder={this.onShouldTouchMove.bind(this)}
                    onResponderMove={this.onTouchMove.bind(this)}>
                    <TxtTemplate 
                        time={time}
                        font={fontSize}
                        readPP={readPP}
                        txt={txt}/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <StatusBar hidden={!menuVisible} />
                {content}
                <View style={[styles.menuTop, {top: menuVisible?0:-pTd(100)}]}>
                    <SvgGoback width={pTd(48)} height={pTd(48)}/>
                </View>
                <View style={[styles.menuBottom, {bottom: menuVisible?0:-pTd(278)}]}></View>
            </View>
        )
    }

    // 百分比计算规则：
    //    ( 已读完的读取的字节 / 全文字节 + (读取长度 / 全文字节) * (分段点数组[分段点后点索引] / 分段点数组[分段点最后点索引]) ) * 100
    changePage(next: boolean){
        const {readIndex, loadPointList, uri, fileLoadPosition, readTxt, size} = this.state
        let changeIndex, changeLoadPosition
        if (next) {
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
        } else {
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
        let actualReadLength = readLength < size ? readLength: size
        // RNFS.readFile(uri).then( result => {
        RNFS.read(uri, actualReadLength + that.rongYu, fileLoadPosition, 'ascii').then( ascii => {
            let result = Utf8.decode(ascii)
            //重置字节冗余
            that.rongYu = 4
            const loadPointList = countPageFontNumber(contentHeight, contentWidth, lineHeight, fontSize, result)
            if (isStart === true) {
                const readPP = (fileLoadPosition / size +  (actualReadLength / size) * (loadPointList[1] / loadPointList[loadPointList.length - 1])) * 100
                that.setState({
                    readTxt: result,
                    txt: result.substring(0, loadPointList[1]),
                    loadPointList: loadPointList,
                    fileLoadPosition: fileLoadPosition,
                    readIndex: 0,
                    readPP: readPP
                })
            } else {
                const readPP = (fileLoadPosition + actualReadLength) / size * 100
                that.setState({
                    readTxt: result,
                    txt: result.substring(loadPointList[loadPointList.length - 2], loadPointList[loadPointList.length - 1]),
                    loadPointList: loadPointList,
                    fileLoadPosition: fileLoadPosition,
                    readIndex: loadPointList.length - 2,
                    readPP: readPP
                })
            }
        }).catch(({message, stack}) => {
            console.log(stack)
            // if(message === 'Invalid byte index'){
            //     that.rongYu--
            //     that.readFile(uri, size, fileLoadPosition, isStart)
            // } else if (message === 'Invalid UTF-8 detected') {
            //     that.readFile(uri, size, fileLoadPosition, isStart)
            // }
        })
    }

    onTouchStart(event: any){
        const {pageX, pageY, timestamp} = event.nativeEvent 
        let flag
        this.touchTimestamp = timestamp
        if (this.stop) {
            return false
        }
        if (this.state.menuVisible===true) {
            this.menuHide()
            this.stop = true
            setTimeout(()=>{
                this.stop = false              
            }, 300)
            return false
        }
        if (pageX < touchBlock[0]) {
            flag = 'lClick'
        } else if (touchBlock[0] <= pageX && pageX <= touchBlock[1]) {
            flag = 'cClick'
        } else {
            flag = 'rClick'
        }        
        this.setState({
            px: pageX,
            py: pageY,
            flag
        })
        return true
    }

    onShouldTouchMove(){
        if (this.state.menuVisible===true || this.stop) {
            return false
        }
        return true
    }

    onTouchRelease(event: any){
        let {flag, type} = this.state
        const {timestamp} = event.nativeEvent
        if (timestamp - this.touchTimestamp > 800) {
            //长时触摸
            flag = 'lg' + flag
        }
        console.log(flag)
        if (type === 'txt') {
            switch(flag){
                case 'lClick': 
                case 'lglClick':
                case 'rSlide': 
                case 'lgrSlide':                    
                    this.changePage(false)
                    break
                case 'cClick':
                    this.menuShow()
                    break
                case 'rClick': 
                case 'lgrClick':
                case 'lSlide': 
                case 'lglSlide':
                    this.changePage(true)
                    break
                case 'upSlide':
                case 'lgupSlide':                    
                case 'downSlide':
                case 'lgdownSlide':
                case 'lgcClick':                    
                    break
            }
        } else if (type === 'pdf') {
            switch(flag){
                case 'lClick': 
                case 'lglClick':
                case 'lSlide': 
                case 'lglSlide':
                case 'rClick': 
                case 'lgrClick':
                case 'rSlide': 
                case 'lgrSlide': 
                case 'upSlide':
                case 'downSlide':
                case 'lgupSlide':
                case 'lgdownSlide':                    
                case 'lgcClick':
                    break
                case 'cClick':
                    this.menuShow()
                    break
            }
        }
    }

    onTouchMove(event: any){
        const {pageX, pageY} = event.nativeEvent
        const {px, py} = this.state
        if (typeof px === 'number' && typeof py === 'number') {
            const moveX =  pageX - px
            const moveY = pageY - py
            if (moveX > changPoint) {
                this.setState({
                    flag: 'rSlide'
                })
            } else if (moveX < -changPoint) {
                this.setState({
                    flag: 'lSlide'
                })            
            } else if (moveY < -changPoint) {
                this.setState({
                    flag: 'upSlide'
                })  
            } else if (moveY > changPoint) {
                this.setState({
                    flag: 'downSlide'
                })  
            }
        }
    }

    menuShow(){
        this.setState({
            menuVisible: true
        })
    }

    menuHide(){
        this.setState({
            menuVisible: false
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: pTd(750),
        position: 'relative'
    },
    content: {
        flex: 1,
        position: 'absolute'
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
    },
    menuTop: {
        backgroundColor: '#322320', 
        height: pTd(100),
        width: pTd(750),
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        top: 0        
    },
    menuBottom: {
        backgroundColor: '#322320', 
        height: pTd(278),
        width: pTd(750),
        flexDirection: 'row',
        alignItems: 'center',        
        position: 'absolute',
        left: 0,
        bottom: 0
    }
})