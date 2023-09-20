import { View, Text, TouchableOpacity, StyleSheet, Image, ToastAndroid } from 'react-native'
import React, { useContext, useEffect } from 'react';

import Form04adx01 from '../Form04adx01/Form04adx01';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Form04adx01Diary from '../Form04adx01/Form04adx01Diary';
import styles from './styles';
import Storage from '../../utils/storage';
import {useNetInfo} from '@react-native-community/netinfo';
import {UserContext} from '../../contexts/UserContext';
import Icon from 'react-native-vector-icons/AntDesign';
import data0401Empty from '../Form04adx01/models/data0401';

const Stack = createStackNavigator();
const Form04adx01Navigation = () => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const {setData0401} = useContext(UserContext);

  const handleNavigateForm04adx01 = async () => {
    navigation.navigate('form04adx01');
  };

  const CustomIconBack = () => {
    return (
      <TouchableOpacity
        style={{marginLeft: 16}}

        onPress={() => {
          navigation.pop();
          setData0401(data0401Empty);
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
              Báo cáo thăm dò, tìm kiếm, dẫn dụ nguồn lợi thủy sản
              </Text>
              <TouchableOpacity
                style={{}}
                onPress={() => handleNavigateForm04adx01()}>
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
        name="form04adx01Diary"
        component={Form04adx01Diary}
      />

      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: () => <CustomIconBack />,
        }}
        name="form04adx01"
        component={Form04adx01}
      />
    </Stack.Navigator>
  );
};

export default Form04adx01Navigation;
