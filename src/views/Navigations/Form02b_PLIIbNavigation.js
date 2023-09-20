import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useEffect} from 'react';

import Form02b_PLIIb from '../Form02b_PLIIb/Form02b_PLIIb';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Form02b_PLIIbDiary from '../Form02b_PLIIb/Form02b_PLIIbDiary';
import styles from './styles';
import Storage from '../../utils/storage';
import {useNetInfo} from '@react-native-community/netinfo';
import {UserContext} from '../../contexts/UserContext';
import Icon from 'react-native-vector-icons/AntDesign';
import data02b_PLIIbEmpty from '../Form02b_PLIIb/models/data02b_PLIIb';

const Stack = createStackNavigator();
const Form02b_PLIIbNavigation = () => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const {setData02b_PLIIb} = useContext(UserContext);

  const handleNavigateForm02b_PLIIb = async () => {
    navigation.navigate('form02b_PLIIb');
  };

  const CustomIconBack = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
          setData02b_PLIIb(data02b_PLIIbEmpty);
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
                onPress={() => handleNavigateForm02b_PLIIb()}>
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
        name="form02b_PLIIbDiary"
        component={Form02b_PLIIbDiary}
      />

      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: () => <CustomIconBack />,
        }}
        name="form02b_PLIIb"
        component={Form02b_PLIIb}
      />
    </Stack.Navigator>
  );
};

export default Form02b_PLIIbNavigation;
