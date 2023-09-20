import { View, Text, TouchableOpacity, StyleSheet, Image, ToastAndroid } from 'react-native'
import React, { useContext, useEffect } from 'react';

import Form04_PLII from '../Form04_PLII/Form04_PLII';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Form04_PLIIDiary from '../Form04_PLII/Form04_PLIIDiary';
import styles from './styles';
import Storage from '../../utils/storage';
import {useNetInfo} from '@react-native-community/netinfo';
import {UserContext} from '../../contexts/UserContext';
import Icon from 'react-native-vector-icons/AntDesign';
import data04_PLIIEmpty from '../Form04_PLII/models/data04_PLII';

const Stack = createStackNavigator();
const Form04_PLIINavigation = () => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const {setData04_PLII} = useContext(UserContext);

  const handleNavigateForm04_PLII = async () => {
    navigation.navigate('form04_PLII');
  };

  const CustomIconBack = () => {
    return (
      <TouchableOpacity
        style={{marginLeft: 16}}

        onPress={() => {
          navigation.pop();
          setData04_PLII(data04_PLIIEmpty);
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
              Biên bản kiểm tra tàu cá rời cảng
              </Text>
              <TouchableOpacity
                style={{}}
                onPress={() => handleNavigateForm04_PLII()}>
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
        name="form04_PLIIDiary"
        component={Form04_PLIIDiary}
      />

      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: () => <CustomIconBack />,
        }}
        name="form04_PLII"
        component={Form04_PLII}
      />
    </Stack.Navigator>
  );
};

export default Form04_PLIINavigation;
