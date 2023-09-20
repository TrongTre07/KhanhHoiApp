import { View, Text, TouchableOpacity, StyleSheet, Image, ToastAndroid } from 'react-native'
import React, { useContext, useEffect } from 'react';

import Form02adx02 from '../Form02adx02/Form02adx02';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Form02adx02Diary from '../Form02adx02/Form02adx02Diary';
import styles from './styles';
import Storage from '../../utils/storage';
import {useNetInfo} from '@react-native-community/netinfo';
import {UserContext} from '../../contexts/UserContext';
import Icon from 'react-native-vector-icons/AntDesign';
import data0202Empty from '../Form02adx02/models/data0202';

const Stack = createStackNavigator();
const Form02adx02Navigation = () => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const {setData0202} = useContext(UserContext);

  const handleNavigateForm02adx02 = async () => {
    navigation.navigate('form02adx02');
  };

  const CustomIconBack = () => {
    return (
      <TouchableOpacity
        style={{marginLeft: 16}}
        onPress={() => {
          navigation.pop();
          setData0202(data0202Empty);
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
              Biên nhận thủy sản bốc dỡ qua cảng
              </Text>
              <TouchableOpacity
                style={{}}
                onPress={() => handleNavigateForm02adx02()}>
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
        name="form02adx02Diary"
        component={Form02adx02Diary}
      />

      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: () => <CustomIconBack />,
        }}
        name="form02adx02"
        component={Form02adx02}
      />
    </Stack.Navigator>
  );
};

export default Form02adx02Navigation;
