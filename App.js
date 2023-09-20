import {ScrollView, StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {UserContext, UserProvider} from './src/contexts/UserContext';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

import AppNavigation from './src/views/Navigations/AppNavigation';

import ThongTinVeHoatDongChuyenTai from './src/views/Form01adx01/ThongTinVeHoatDongChuyenTai';
import KetQuaKhaiThac from './src/views/Form01adx01/KetQuaKhaiThac';
import HeaderView from './src/views/Form01adx01/HeaderView';
import TongCucThuySanView from './src/views/Form01adx01/TongCucThuySanView';
const AppNav = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
  // if(AsyncStorage.getItem('token'))
  //   setIsLoggedIn(true)
  // else
  // setIsLoggedIn(false)

  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <UserProvider>
      <View style={styles.container}>
        <AppNav />
      </View>
    </UserProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 12,
    // paddingTop: 12,
    backgroundColor: '#fff',
  },
});
