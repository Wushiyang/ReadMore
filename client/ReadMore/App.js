/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import BookShelf from './src/pages/BookShelf'
import BookShop from './src/pages/BookShop'
import PersonalCenter from './src/pages/PersonalCenter'
import { pTd } from './src/assets/js/utils'

const TabNavigator = createBottomTabNavigator(
	{
		bookshelf: {
			screen: BookShelf,
			navigationOptions: {
				title: '书架',
				tabBarIcon: () => {
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
				tabBarIcon: () => {
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
				tabBarIcon: () => {
					return (
						<Image source={require('./src/assets/icon-my.png')} style={styles.tabIcon}/>
					)
				}				
			}
		}
	},
	{
		initialRouteName: 'bookshop'
	}
);

const styles = StyleSheet.create({
	tabIcon: {
		width: pTd(40),
		height: pTd(40)
	}
})

const AppContainer = createAppContainer(TabNavigator)

export default  class App extends Component{
	render(){
		return (
			<AppContainer />
		)
	}
}