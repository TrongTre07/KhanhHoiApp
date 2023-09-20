import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import React, {useContext} from 'react';

import {UserContext, UserProvider} from '../../contexts/UserContext';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderScreen = () => {
  const {isLoggedIn, setIsLoggedIn, dataInf} = useContext(UserContext);
  const navigation = useNavigation();

  const handleLogOut = () => {
    Alert.alert(
      'Xác nhận đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đăng xuất',
          onPress: async () => {
            setIsLoggedIn(false);
            AsyncStorage.removeItem('token');
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        // padding: 20,
      }}>
      <Image
        style={{width: 170, height: 100, resizeMode: 'contain'}}
        source={require('../../img/logo-khanhhoi.png')}
      />
      {isLoggedIn ? (
        <TouchableOpacity
          style={{
            backgroundColor: '#eee',
            borderRadius: 10,
            // borderWidth: 0.1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => handleLogOut()}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#000',
              marginHorizontal: 20,
              marginVertical: 10,
              
            }}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
      ) : (
        <Pressable
          style={{
            backgroundColor: '#eee',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('login')}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#000',
              marginHorizontal: 20,
              marginVertical: 10,
            }}>
            Đăng nhập
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default HeaderScreen;

const styles = StyleSheet.create({});
