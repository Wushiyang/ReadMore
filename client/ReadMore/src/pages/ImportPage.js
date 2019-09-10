/**
 * @flow
 */
import React from 'react'
import {View, Text, StyleSheet, Image, TouchableWithoutFeedback, ActivityIndicator} from 'react-native'
import RNFS, {ExternalStorageDirectoryPath} from 'react-native-fs'
import NavigationServer from '../../NavigationService'
import { pTd, fitIndex } from '../assets/js/utils'
import BookServer from '../servers/BookServer'
import { GoBack } from '../components/common'
import {connect} from 'react-redux'
import {addBooksList} from '../redux/actions'
import type {BooksItem, Action} from '../redux/type'

//滚动项高度
const scrollItemHeaderHeight = pTd(70)
//滚动项索引高度
const scrollItemHeight = pTd(136)
//滚动项上边框
const scrollItemBorder = 1

import FilesTree from '../components/FilesTree'

type FileItem = {
    path: string,
    name: string,
    type: 'dir' | 'txt' | 'pdf',
    size: string,
    checked?: boolean,
    hasAddShelft?: boolean
}

type FilesStateItem = {
    title: string,
    data: FileItem[],
    scroll: [number, number]
}

type Props = {
    booksList: BooksItem[],
    addBooksList: (BooksItem[]) => Action
}

type State = {
    path: string,
    lastPath: ?string,
    indexes: string[],
    index: number,
    filesState: FilesStateItem[],
    fileList: BooksItem[],
    selectNum: number,
    scrollTop: number
}



class ImportPage extends React.Component<Props, State>{
    static navigationOptions = {
        title: '手机目录',
        headerLeft: <GoBack routeName='bookshelf'/>
    }

    constructor(){
        super()
        this.state = {
            path: '/',
            lastPath: null,
            indexes: ['文件夹', '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            index: 0,
            filesState: [],
            fileList: [],
            selectNum: 0,
            scrollTop: 0
        }
    }

    async componentDidMount(){
        this.setFilePath(ExternalStorageDirectoryPath)
    }

    render(){
        const {state} = this
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.left}>
                        <Text style={{fontSize: pTd(28), marginRight: pTd(15), color: '#685d5b'}}>存储卡:</Text>
                        <Text style={{fontSize: pTd(28), color: '#a49997'}}>{state.path}</Text>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={this.goBack.bind(this)}>
                        <View style={styles.right}>
                            <Image source={require('../assets/icon-goup.png')} style={styles.goup}/>
                            <Text style={{fontSize: pTd(28), color: '#685d5b'}}>上一级</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <FilesTree
                    indexes={state.indexes}
                    index={state.index}
                    selectNum={state.selectNum}
                    filesState={state.filesState}
                    fileList={state.fileList}
                    scrollTop={state.scrollTop}
                    setStateData={this.setStateData.bind(this)}
                    setFilePath={this.setFilePath.bind(this)}
                    addToShelf={this.addToShelf.bind(this)}
                    scrollItemHeaderHeight={scrollItemHeaderHeight}
                    scrollItemHeight={scrollItemHeight}
                    scrollItemBorder={scrollItemBorder}/>
            </View>
        )
    }

    goBack(){
        let path = this.state.path
        if (path === ExternalStorageDirectoryPath || path === '/') {
            return NavigationServer.navigate('bookshelf')
        }
        this.setFilePath(path.replace(/\/([^\/]+)$/, ''))
    }

    // 处理路径页面
    setFilePath(path: string){
        let that = this
        const lastPath = this.state.path
        let fileMap = new Map<string, FilesStateItem>()
        let scrollTotal = 0
        let filesState
        const { booksList } = this.props
        RNFS.readDir(path).then(result => {
            const sortResult = result.sort((a, b) => {
                //对获取文件信息排序，文件夹排最前面，文件排后面，文件夹和文件名字大写首字母ascii码排序
                if (!a.isDirectory() && b.isDirectory()) {
                    return 1
                } else if (a.isDirectory() && !b.isDirectory()) {
                    return -1
                } else {
                    if (fitIndex(a.name) > fitIndex(b.name)) {
                        return 1
                    } else {
                        return -1
                    }
                }
            })
            sortResult.forEach(val => {
                const capital = fitIndex(val.name)
                //文件夹处理
                if (val.isDirectory()) {
                    let dir = {
                        path: val.path,
                        name: val.name,
                        type: 'dir',
                        size: val.size
                    }

                    if (fileMap.has('文件夹')) {
                        let {data, scroll} = (fileMap.get('文件夹'): any)
                        fileMap.set('文件夹', {
                            title: '文件夹',
                            data: [...data, dir],
                            scroll: [scroll[0], scroll[1] + scrollItemHeight + scrollItemBorder]
                        })
                        scrollTotal += scrollItemHeight + scrollItemBorder
                    } else {
                        fileMap.set('文件夹',
                            {
                                title: '文件夹',
                                data: [dir],
                                scroll: [scrollTotal, scrollTotal + scrollItemHeaderHeight + scrollItemHeight + scrollItemBorder * 2]
                            }
                        )
                        scrollTotal += scrollItemHeaderHeight + scrollItemHeight + scrollItemBorder * 2
                    }
                //文件处理
                } else {
                    let file, hasAddShelft = false
                    let item
                    for(item of booksList){
                        //根据路径判断是否同一文件
                        if (item.path===val.path){
                            hasAddShelft = true
                            break
                        }
                    }
                    if (/\.txt$/.test(val.name)) {
                        file = {
                            path: val.path,
                            name: val.name,
                            type: 'txt',
                            size: val.size,
                            checked: false,
                            hasAddShelft: hasAddShelft
                        }
                    } else if (/\.pdf$/.test(val.name)) {
                        file = {
                            path: val.path,                                
                            name: val.name,                            
                            type: 'pdf',
                            size: val.size,
                            checked: false,
                            hasAddShelft: hasAddShelft                                                                   
                        }
                    }
                    if (typeof file === 'object') {
                        if (fileMap.has(capital)) {
                            let {data, scroll} = (fileMap.get(capital): any)
                            fileMap.set(capital, {
                                title: capital,
                                data: [...data, file],
                                scroll: [scroll[0], scroll[1] + scrollItemHeight + scrollItemBorder]
                            })
                            scrollTotal += scrollItemHeight + scrollItemBorder
                        } else {
                            fileMap.set(capital,
                                {
                                    title: capital,
                                    data: [file],
                                    scroll: [scrollTotal, scrollTotal + scrollItemHeaderHeight + scrollItemHeight + scrollItemBorder * 2]
                                }
                            )
                            scrollTotal += scrollItemHeaderHeight + scrollItemHeight + scrollItemBorder * 2
                        }
                    }
                }
            })
            filesState = [...fileMap.values()]
            that.setState({
                filesState: filesState,
                path: path,
                lastPath: lastPath,
                fileList: [],
                selectNum: 0
            })
            // that.initScroll()
        }).catch(error => {
            console.log(error)
        })
    }

    setStateData(data){
        this.setState(data)
    }

    // 添加选好书项到书架
    async addToShelf(){
        const fileList = this.state.fileList
        await BookServer.updateBooksList(fileList)
        this.props.addBooksList(fileList)
        this.setFilePath(this.state.path)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9dedc'
    },
    header: {
        height: pTd(70),
        paddingLeft: pTd(40),
        paddingRight: pTd(40),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#dbd0ce',
        borderBottomWidth: 1
    },
    left: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        height: pTd(45),
        flexDirection: 'row',
        borderLeftWidth: 1,
        borderLeftColor: '#cec3c1',
        justifyContent: 'center',
        alignItems: 'center'        
    },
    goup: {
        height: pTd(28),
        width: pTd(28),
        marginLeft: pTd(14)
    }
})

const mapStateToProps = state => {
    return {
        booksList: state.booksList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addBooksList: booksList => {
            dispatch(addBooksList(booksList))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ImportPage)

function isNotUndefined(y): %checks {
    return typeof y === "number";
  }