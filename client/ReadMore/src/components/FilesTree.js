/**
 * @flow
 */
import React,{ Component } from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, SectionList, findNodeHandle} from 'react-native'
import { pTd } from '../assets/js/utils'
import IndexPanel from '../components/IndexPanel'
import {BoxShadow} from 'react-native-shadow'
import CFileItem from './FileItem'
import type {FilesStateItem, FileItem} from '../pages/ImportPage'
import type {BooksItem, Action} from '../redux/type'

type Props = {
    filesState: FilesStateItem[],
    indexes: string[],
    selectNum: number,
    scrollItemHeaderHeight: number,
    index: number,
    fileList: BooksItem[],
    scrollTop: number,
    setStateData: (Object)=>void,
    setFilePath: (string)=>void,
    addToShelf: ()=>void,
    scrollItemHeight: number,
    scrollItemBorder: number
}
type state = {

}
export default class FilesTree extends Component<Props, state>{

    filespanel: any

    sectionlist: any

    constructor(){
        super()
    }

    render(){
        let that = this
        const {props} = this
        const {filesState} = props
        const indexes = props.indexes.map((val, index)=>{
            let active = false
            for(let i=0; i < filesState.length; i++){
                if (filesState[i].title === val) {
                    active = true
                    break 
                }
            }
            return {
                name: val,
                active: active,
                fn: function(){
                    that.selectIndex(val, index)
                }
            }
        })
        let footerRight = (
            <View style={styles.footer_right}>
                <View style={{width: pTd(140), height: pTd(100), justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: pTd(30), color: '#bcb0b0'}}>删除</Text>
                </View>
                <View style={{height: pTd(100), width: pTd(208), backgroundColor: '#e7afb0', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: pTd(30), color: '#fff'}}>加入书架</Text>
                </View>
            </View>
        )
        const shadowOpt = {
            height: pTd(100),
            width: pTd(750),
			color:"#eee",
            border: pTd(10),
            opacity: 0.8,
			x:0,
            y:0
        }
        if ( props.selectNum > 0 ) {
            footerRight = (
                <View style={styles.footer_right}>
                    <TouchableOpacity
                        onPress={this.deleteItem.bind(this)}>
                        <View style={{width: pTd(140), height: pTd(100), justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: pTd(30)}}>删除</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.addToShelf()}>
                        <View style={{height: pTd(100), width: pTd(208), backgroundColor: '#dd5049', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: pTd(30), color: '#fff'}}>加入书架</Text>
                        </View>
                    </TouchableOpacity>
                </View>                
            )
        }

        let rows = []
        props.filesState.forEach(val => {

            rows.push()
        })
        const curentIndex = props.filesState[props.index]
        return (
            <View style={styles.container}>
                <SectionList
                    sections={props.filesState}
                    ref={(sectionlist) => {that.sectionlist = sectionlist}}
                    style={{width: '100%', backgroundColor: '#fff'}}
                    keyExtractor={(item, index) => (index + '')}
                    initialNumToRender={500}
                    // getItemLayout={this.setItemLayout.bind(this)}
                    stickySectionHeadersEnabled={true}
                    ListEmptyComponent={()=>(
                        <Text>加载中</Text>
                    )}
                    ItemSeparatorComponent={()=>(
                        <View style={styles.itemSeparator}>
                            <View style={{borderTopWidth: props.scrollItemBorder, borderTopColor: '#d3c4bf'}}></View>
                        </View>
                    )}
                    renderSectionHeader={({section: {title}}) => (
                        <TouchableWithoutFeedback 
                            onPress={this.selectPanel.bind(this)}>
                            <View
                                style={[styles.fileHeader, {height: props.scrollItemHeaderHeight}]}>
                                <Text style={{fontSize: pTd(28), color: '#a49997'}}>{title}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    renderItem={({item, index, section}) => (
                        <CFileItem
                            type={item.type}
                            size={item.size}
                            name={item.name}
                            path={item.path}
                            fn={()=>{if (item.type==='dir') {props.setFilePath(item.path)}}}
                            checkfn={(checked)=>that.selectItem(checked, item)}
                            checked={item.checked}
                            hasAddShelft={item.hasAddShelft}
                            // scrollItemBorder={props.scrollItemBorder}
                            scrollItemHeight={props.scrollItemHeight} />
                    )}/>
                <BoxShadow setting={shadowOpt}>
                    <View style={styles.footer}>
                        <View style={styles.footer_left}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{marginLeft: pTd(43), fontSize: pTd(28)}}>已选</Text>
                                <Text style={{marginLeft: pTd(20), marginRight: pTd(20), fontSize: pTd(28), color: '#c45c5b'}}>{props.selectNum}</Text>
                                <Text style={{fontSize: pTd(28)}}>项</Text>
                            </View>
                            <TouchableOpacity
                                onPress={this.selectAll.bind(this)}>
                                <View style={{width: pTd(140), flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: pTd(30)}}>全选</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {footerRight}
                    </View>
                </BoxShadow>
                <IndexPanel
                    ref={(filespanel) => {this.filespanel = filespanel}}
                    data={indexes}/>
            </View>
        )
    }

    //设置列表位置计算
    //留白显示不好看 暂时不使用
    // setItemLayout(data: FilesStateItem[], index: number){
    //     const {scrollItemHeaderHeight, scrollItemHeight, scrollItemBorder} = this.props
    //     let pos = [0, 0]
    //     for(let item of data){
    //         pos[0] = pos[1]
    //         pos[1] = pos[1] + item.data.length + 1
    //         if (index === pos[0]) {
    //             return {
    //                 index,
    //                 offset: item.offsetTop,
    //                 length: scrollItemHeaderHeight + scrollItemBorder
    //             }
    //         } else if (index === pos[1]) {
    //             const dataIndex = index - pos[0] - 2              
    //             return {
    //                 index,
    //                 offset: item.data[dataIndex].offsetTop + scrollItemHeight + scrollItemBorder,
    //                 length: 0
    //             }
    //         } else if (index > pos[0] && index < pos[1]){
    //             const dataIndex = index - pos[0] - 1
    //             return {
    //                 index,
    //                 offset: item.data[dataIndex].offsetTop,
    //                 length: scrollItemHeight + scrollItemBorder
    //             }
    //         }
    //         pos[1]++
    //     }
    // }

    // 索引面板开启
    selectPanel(){
        this.filespanel.setOpen()
    }

    // 索引面板选择索引
    selectIndex(capital: string, index: number){
        this.filespanel.setClose()
        const {scrollItemHeaderHeight, scrollItemBorder} = this.props
        const ind = this.props.filesState.findIndex((val)=>(val.title===capital))
        this.sectionlist.scrollToLocation({
            itemIndex: 0,
            sectionIndex: ind,
            viewOffset: scrollItemHeaderHeight + scrollItemBorder
        })
    }

    //初始化滚动
    initScroll(){

    }

    // 删除选择文件项
    deleteItem(){
        alert('delete item')
    }

    // 全选文件项
    selectAll(){
        let {fileList, filesState, setStateData} = this.props
        let count = 0
        filesState.forEach(item => {
            item.data.forEach(val => {
                if (/^(pdf|txt)$/.test(val.type)) {
                    val.checked = true
                    fileList.push({
                        img: val.img,
                        name: val.name,
                        ext: val.type,
                        path: val.path
                    })
                    count++
                }
            })
        })
        setStateData({
            filesState: filesState,
            fileList: fileList,
            selectNum: count
        })
    }

    // 单选文件项
    selectItem(ck: boolean, it: FileItem){
        let checked = !ck
        let {fileList, filesState, setStateData, selectNum} = this.props
        filesState.forEach(item => {
            item.data.forEach(val => {
                if (it.name === val.name) {
                    val.checked = checked
                }
            })
        })
        if (checked) {
            fileList.push({
                img: it.img,
                name: it.name,
                ext: it.type,
                path: it.path
            })
            setStateData({
                fileList: fileList,
                selectNum: ++selectNum,
                filesState: filesState
            })  
        } else {
            const find = fileList.findIndex(currentValue => (currentValue.name === it.name))
            fileList.slice(find, 1)
            setStateData({
                fileList: fileList,
                selectNum: --selectNum,
                filesState: filesState
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        flex: 1
    },
    footer: {
        height:　pTd(100),
        width: pTd(750),
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    footer_left: {
        flexDirection: 'row',
        alignItems: 'center',
        width: pTd(375),
        height:　pTd(100),        
        justifyContent: 'flex-start'           
    },
    footer_right: {
        flexDirection: 'row',
        alignItems: 'center',
        width: pTd(375),
        height:　pTd(100),        
        justifyContent: 'flex-end'
    },
    fileHeader: {
        paddingLeft: pTd(40),
        paddingRight: pTd(40),
        backgroundColor: '#eee',
        justifyContent: 'center'
    },
    itemSeparator: {
        paddingLeft: pTd(40),
        paddingRight: pTd(40)  
    }
})