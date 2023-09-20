import { View, Text, TouchableOpacity, StyleSheet, Image, ToastAndroid } from 'react-native'
import React, { useContext, useEffect } from 'react';

import Form03_PLII from '../Form03_PLII/Form03_PLII';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Form03_PLIIDiary from '../Form03_PLII/Form03_PLIIDiary';
import styles from './styles';
import Storage from '../../utils/storage';
import {useNetInfo} from '@react-native-community/netinfo';
import {UserContext} from '../../contexts/UserContext';
import Icon from 'react-native-vector-icons/AntDesign';
import data03_PLIIEmpty from '../Form03_PLII/models/data03_PLII';

const Stack = createStackNavigator();
const Form03_PLIINavigation = () => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const {setData03_PLII} = useContext(UserContext);

  const handleNavigateForm03_PLII = async () => {
    navigation.navigate('form03_PLII');
  };

  const CustomIconBack = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
          setData03_PLII(data03_PLIIEmpty);
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
              Biên bản kiểm tra tàu cá cập cảng
              </Text>
              <TouchableOpacity
                style={{}}
                onPress={() => handleNavigateForm03_PLII()}>
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
        name="form03_PLIIDiary"
        component={Form03_PLIIDiary}
      />

      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: () => <CustomIconBack />,
        }}
        name="form03_PLII"
        component={Form03_PLII}
      />
    </Stack.Navigator>
  );
};

export default Form03_PLIINavigation;
