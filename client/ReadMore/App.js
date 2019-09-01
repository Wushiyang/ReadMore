/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import BookShelf from './src/pages/BookShelf'
import BookShop from './src/pages/BookShop'
import PersonalCenter from './src/pages/PersonalCenter'
import { pTd } from './src/assets/js/utils'
import ReadPage from './src/pages/ReadPage'
import NavigationService from './NavigationService'
import ImportPage from './src/pages/ImportPage'
import {Provider} from 'react-redux'
import store from './src/redux/index'

const TabNavigator = createBottomTabNavigator(
	{
		bookshelf: {
			screen: BookShelf,
			navigationOptions: {
				title: '书架',
				tabBarIcon: ({ focused }) => {
					if (focused) {
						return (
							<Image source={require('./src/assets/icon-bookshelf-red.png')} style={styles.tabIcon}/>
						)
					}
					return (
						<Image source={require('./src/assets/icon-bookshelf.png')} style={styles.tabIcon}/>
					)
				}
			}
		},
		bookshop: {
			screen: BookShop,
			navigationOptions: {
				title: '书城',
				tabBarIcon: ({ focused }) => {
					if (focused) {
						return (
							<Image source={require('./src/assets/icon-bookshop-red.png')} style={styles.tabIcon}/>
						)
					}
					return (
						<Image source={require('./src/assets/icon-bookshop.png')} style={styles.tabIcon}/>
					)
				}				
			}
		},
		personal: {
			screen: PersonalCenter,
			navigationOptions: {
				title: '我的',
				tabBarIcon: ({ focused }) => {
					if (focused) {
						return (
							<Image source={require('./src/assets/icon-my-red.png')} style={styles.tabIcon}/>
						)
					}
					return (
						<Image source={require('./src/assets/icon-my.png')} style={styles.tabIcon}/>
					)
				}				
			}
		}
	},
	{
		initialRouteName: 'bookshop',
		tabBarOptions: {
			activeTintColor: '#d81e06',
			inactiveTintColor: '#bfbfbf',
			style: {
				height: pTd(115),
				paddingTop: pTd(15),
				paddingBottom: pTd(15)
			},
			iconStyle: {
				// marginBottom: pTd(10)
			},
			labelStyle: {
				marginTop: pTd(10),
				lineHeight: pTd(25),
				fontSize: pTd(20)
			}
		}
	}
);

const withHeaderNavigator = createStackNavigator(
	{
		importpage: {
			screen: ImportPage
		}
	}
)

const stackNavigator = createStackNavigator(
	{
		main: {
			screen: TabNavigator
		},
		readpage: {
			screen: ReadPage
		},
		withheader: {
			screen: withHeaderNavigator
		}
	},
	{
		initialRouteName: 'main',
		headerMode: 'none'
	}
)

const styles = StyleSheet.create({
	tabIcon: {
		width: pTd(50),
		height: pTd(50)
	}
})

const AppContainer = createAppContainer(stackNavigator)

export default  class App extends Component{
	render(){
		return (
			<Provider store={store}>
				<AppContainer 
					ref={navigatorRef => {
						NavigationService.setTopLevelNavigator(navigatorRef)
					}}/>
			</Provider>
		)
	}
}