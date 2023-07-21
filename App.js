import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TestSqlite from './src/views/TestSqlite'
import HeaderView from './src/views/HeaderView'
import TestLocation from './src/views/TestLocation'
import UserContext from './src/contexts/UserContext'
import ExportPDF from './src/views/ExportPDF'
import OpenPDF from './src/views/OpenPDF'

const App = () => {
  return (
   

    <View style={styles.container}>

      <OpenPDF/>
    </View>
    
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    padding: 12,
    flex: 1
  }
})