import { View, Text, TouchableOpacity, StyleSheet, Image, ToastAndroid } from 'react-native'
import React, { useContext, useEffect } from 'react';

import Form01adx02 from '../Form01adx02/Form01adx02';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Form01adx02Diary from '../Form01adx02/Form01adx02Diary';
import styles from './styles';
import Storage from '../../utils/storage';
import {useNetInfo} from '@react-native-community/netinfo';
import {UserContext} from '../../contexts/UserContext';
import Icon from 'react-native-vector-icons/AntDesign';
import data0102Empty from '../Form01adx02/models/data0102';

const Stack = createStackNavigator();
const Form01adx02Navigation = () => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const {setData0102} = useContext(UserContext);

  const handleNavigateForm01adx02 = async () => {
    navigation.navigate('form01adx02');
  };

  const CustomIconBack = () => {

    return (
      <TouchableOpacity
        style={{marginLeft: 16}}
        onPress={() => {
          navigation.pop();
          setData0102(data0102Empty);
        }}>
        <Icon name="arrowleft" size={30} color="#000" />
      </TouchableOpacity>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Text style={[styles.btnText, {color: 'black'}]}>
                Báo cáo rà soát
              </Text>
              <TouchableOpacity
                style={{}}
                onPress={() => handleNavigateForm01adx02()}>
                <View style={[styles.btn, {backgroundColor: '#33CC00'}]}>
                  <Text style={[styles.btnText, {color: '#fff'}]}>Tạo</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity style={{}} onPress={() => Storage.setItem('token','kH1diaZdjtBBvQWsqQb+lXKkzdsHZy38TDO4eMChYlQ=x')}>
                <View style={[styles.btn, { backgroundColor: '#33CC00' }]}>
                  <Text style={[styles.btnText, { color: '#fff' }]}>token</Text>
                </View>
              </TouchableOpacity> */}
            </View>
          ),
        }}
        name="form01adx02Diary"
        component={Form01adx02Diary}
      />

      <Stack.Screen
      
        options={{
          headerTitle: '',
          headerLeft: () => <CustomIconBack />,
        }}
        name="form01adx02"
        component={Form01adx02}
      />
    </Stack.Navigator>
  );
};

export default Form01adx02Navigation;
