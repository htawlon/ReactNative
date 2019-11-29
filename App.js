import React ,{Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createAppContainer} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {createStackNavigator} from 'react-navigation-stack'
import Newpatient from './screen/Newpatient'
import Patients from './screen/Patients'
import Check from './screen/Check'

export default class App extends React.Component {
  render(){
  
     const MyStack=createStackNavigator({
       Check: {
         screen: Check
       },
       Patients: {
         screen :Patients
       },
       Newpatient: {
         screen: Newpatient
       }
     },{
       initialRouteName: "Check",
       defaultNavigationOptions: {
         header:null
       }
     })
     const AppContainer=createAppContainer(MyStack)

     return(<AppContainer></AppContainer>)
  }


}
