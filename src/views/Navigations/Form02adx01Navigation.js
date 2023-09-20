import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useEffect} from 'react';

import Form02adx01 from '../Form02adx01/Form02adx01';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Form02adx01Diary from '../Form02adx01/Form02adx01Diary';
import styles from './styles';
import Storage from '../../utils/storage';
import {useNetInfo} from '@react-native-community/netinfo';
import {UserContext} from '../../contexts/UserContext';
import Icon from 'react-native-vector-icons/AntDesign';
import data0201Empty from '../Form02adx01/models/data0201';

const Stack = createStackNavigator();
const Form02adx01Navigation = () => {
  // const {data0201, setData0201} = useContext(UserContext);
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const {setData0201} = React.useContext(UserContext);

  const handleNavigateForm02adx01 = async () => {
    // console.log('MODIFY:', JSON.stringify(data0201Empty, null, 2));

    navigation.navigate('form02adx01');
  };

  const CustomIconBack = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
          // console.log(data0201Empty.thongtintaudc_thumua[0]);
          setData0201(data0201Empty);
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
                Nhật ký thu mua, chuyền tải thủy sản
              </Text>
              <TouchableOpacity
                style={{}}
                onPress={() => handleNavigateForm02adx01()}>
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
        name="form02adx01Diary"
        component={Form02adx01Diary}
      />

      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: () => <CustomIconBack />,
        }}
        name="form02adx01"
        component={Form02adx01}
      />
    </Stack.Navigator>
  );
};

export default Form02adx01Navigation;
