import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useEffect} from 'react';

import Form04_PLIII_03 from '../Form04_PLIII_03/Form04_PLIII_03';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Form04_PLIII_03Diary from '../Form04_PLIII_03/Form04_PLIII_03Diary';
import styles from './styles';
import Storage from '../../utils/storage';
import {useNetInfo} from '@react-native-community/netinfo';
import {UserContext} from '../../contexts/UserContext';
import Icon from 'react-native-vector-icons/AntDesign';
import data04_PLIII_03Empty from '../Form04_PLIII_03/models/data04_PLIII_03';

const Stack = createStackNavigator();
const Form04_PLIII_03Navigation = () => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const {setData04_PLIII_03} = useContext(UserContext);

  const handleNavigateForm04_PLIII_03 = async () => {
    navigation.navigate('form04_PLIII_03');
  };

  const CustomIconBack = () => {
    return (
      <TouchableOpacity
        style={{marginLeft: 16}}

        onPress={() => {
          navigation.pop();
          setData04_PLIII_03(data04_PLIII_03Empty);
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
              <Text
                style={[
                  {
                    paddingVertical: 6,
                    paddingHorizontal: 16,
                    maxWidth: '90%',
                    fontSize: 19,
                    color: 'black',
                    // letterSpacing: 0.005,
                    letterSpacing: 0.5,
                    fontWeight: '600',
                  },
                ]}>
                Xác nhận cam kết sản phẩm thủy sản xuất khẩu có nguồn gốc từ
                thủy sản khai thác nhập khẩu
              </Text>
              <TouchableOpacity
                style={{}}
                onPress={() => handleNavigateForm04_PLIII_03()}>
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
        name="form04_PLIII_03Diary"
        component={Form04_PLIII_03Diary}
      />

      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: () => <CustomIconBack />,
        }}
        name="form04_PLIII_03"
        component={Form04_PLIII_03}
      />
    </Stack.Navigator>
  );
};

export default Form04_PLIII_03Navigation;
