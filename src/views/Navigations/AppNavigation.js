import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HeaderScreen from './HeaderScreen';
import Form01Navigation from './Form01Navigation';
import Login from '../login/Login';
import Form02adx01 from '../Form02adx01/Form02adx01';
import Form02adx01Navigation from './Form02adx01Navigation';
import ViewPDF from '../Form01adx01/pdfForm01/ViewPDF';
import Form03adx01Navigation from './Form03adx01Navigation';
import Form04adx01Navigation from './Form04adx01Navigation';
import Form01adx02Navigation from './Form01adx02Navigation';
import Form02adx02Navigation from './Form02adx02Navigation';
import Form03_PLIINavigation from './Form03_PLIINavigation';
import Form04_PLIINavigation from './Form04_PLIINavigation';
import Form02b_PLIIbNavigation from './Form02b_PLIIbNavigation';
import Form04_PLIII_03Navigation from './Form04_PLIII_03Navigation';
import {UserContext} from '../../contexts/UserContext';
import {useNetInfo} from '@react-native-community/netinfo';
import Storage from '../../utils/storage';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const MainNavigation = () => {
  const netInfo = useNetInfo();

  const autoPostForm = async (nameLocal, funtionUpload) => {
    const form = await Storage.getItem(nameLocal);

    if (form !== null) {
      let data = JSON.parse(form);
      const newData = [];

      for (const item of data) {
        let retryCount = 0;
        let success = false;

        while (retryCount < 3 && !success) {
          const result = await funtionUpload(item);
          // console.log('result ...', result);

          if (result) {
            success = true; // Tải lên thành công, thoát khỏi vòng lặp
          } else {
            retryCount++; // Tăng số lần thử lại nếu tải lên thất bại
          }
        }

        if (!success) {
          newData.push(item); // Nếu tải lên không thành công sau 3 lần thử, lưu lại dữ liệu
        }
      }

      await Storage.setItem(nameLocal, JSON.stringify(newData));

      if (newData.length < data.length) {
        ToastAndroid.show(
          `Đã gửi ${data.length - newData.length} bản ghi lên server`,
          ToastAndroid.SHORT,
        );
      }
    }
  };

  const {
    postForm0101,
    postForm0201,
    postForm0301,
    postForm0401,
    postForm0102,
    postForm0202,
    postForm03_PLII,
    postForm04_PLII,
    postForm02b_PLIIb,
    postForm04_PLIII_03,
  } = React.useContext(UserContext);

  let autoPostFormExecuted = false; // Biến để kiểm tra xem autoPostForm đã được thực hiện chưa

  useFocusEffect(
    React.useCallback(() => {
      console.log('render');
      if (netInfo.isConnected && !autoPostFormExecuted) {
        Promise.all([
          autoPostForm('form01adx01', postForm0101),
          autoPostForm('form02adx01', postForm0201),
          autoPostForm('form03adx01', postForm0301),
          autoPostForm('form04adx01', postForm0401),
          autoPostForm('form01adx02', postForm0102),
          autoPostForm('form02adx02', postForm0202),
          autoPostForm('form03_PLII', postForm03_PLII),
          autoPostForm('form04_PLII', postForm04_PLII),
          autoPostForm('form02b_PLIIb', postForm02b_PLIIb),
          autoPostForm('form04_PLIII_03', postForm04_PLIII_03),
        ]).then(() => {
          autoPostFormExecuted = true; // Đánh dấu là autoPostForm đã được thực hiện
        });
      }
    }, [netInfo.isConnected]),
  );
  

  return (
    <Drawer.Navigator 
      screenOptions={{
      unmountOnBlur: true
    }}>
      <Drawer.Screen
        name="Form01Navigation"
        component={Form01Navigation}
        options={{
          drawerType: 'front',
          headerTitle: HeaderScreen,
          title: () => (
            <Text style={styles.txt}>01-PLI. Nhật ký khai thác thủy sản</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Form02adx01Navigation"
        component={Form02adx01Navigation}
        options={{
          drawerType: 'front',
          headerTitle: HeaderScreen,
          title: () => (
            <Text style={styles.txt}>
              02-PLI. Nhật ký thu mua, chuyên tải thủy sản
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Form03adx01Navigation"
        component={Form03adx01Navigation}
        options={{
          drawerType: 'front',
          headerTitle: HeaderScreen,
          title: () => (
            <Text style={styles.txt}>03-PLI. Báo cáo khai thác thủy sản</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Form04adx01Navigation"
        component={Form04adx01Navigation}
        options={{
          drawerType: 'front',
          headerTitle: HeaderScreen,
          title: () => (
            <Text style={styles.txt}>
              04-PLI. Báo cáo thăm dò, tìm kiếm, dẫn dụ nguồn lợi thủy sản
            </Text>
          ),
        }}
      />

      <Drawer.Screen
        name="Form01adx02Navigation"
        component={Form01adx02Navigation}
        options={{
          drawerType: 'front',
          headerTitle: HeaderScreen,
          title: () => (
            <Text style={styles.txt}>
              01-PLII. Báo cáo kết quả rà soát cảng cá chỉ định có đủ hệ thống
              xác nhận nguồn gốc thủy sản từ khai thác
            </Text>
          ),
        }}
      />

      <Drawer.Screen
        name="Form02adx02Navigation"
        component={Form02adx02Navigation}
        options={{
          drawerType: 'front',
          headerTitle: HeaderScreen,
          title: () => (
            <Text style={styles.txt}>
              02-PLII. Giấy biên nhận thủy sản bốc dỡ qua cảng
            </Text>
          ),
        }}
      />

      <Drawer.Screen
        name="Form03_PLIINavigation"
        component={Form03_PLIINavigation}
        options={{
          drawerType: 'front',
          headerTitle: HeaderScreen,
          title: () => (
            <Text style={styles.txt}>
              03-PLII. Mẫu biên bản kiểm tra tàu cá cập cảng
            </Text>
          ),
        }}
      />

      <Drawer.Screen
        name="Form04_PLIINavigation"
        component={Form04_PLIINavigation}
        options={{
          drawerType: 'front',
          headerTitle: HeaderScreen,
          title: () => (
            <Text style={styles.txt}>
              04-PLII. Mẫu biên bản kiểm tra tàu cá rời cảng
            </Text>
          ),
        }}
      />

      <Drawer.Screen
        name="Form02b_PLIIbNavigation"
        component={Form02b_PLIIbNavigation}
        options={{
          drawerType: 'front',
          headerTitle: HeaderScreen,
          title: () => (
            <Text style={styles.txt}>02b-PLIIb. Thông tin vận tải</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Form04_PLIII_03Navigation"
        component={Form04_PLIII_03Navigation}
        options={{
          drawerType: 'front',
          headerTitle: HeaderScreen,
          title: () => (
            <Text style={styles.txt}>
              04-PLIII/03. Xác nhận cam kết sản phẩm thủy sản xuất khẩu có nguồn
              gốc từ thủy sản khai thác nhập khẩu
            </Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const AppNavigation = () => {

  // const CustomRightHeader = (data) => {
  //   return (
  //     <View style={{flexDirection:'row',alignContent:'space-around'}}>
        
  //       <TouchableOpacity
  //         style={[styles.actionDownload, styles.button]}
  //         onPress={() => {
  //           let dataFix = data;
  //           dataFix.dairy_name =
  //             'Mẫu NHẬT KÝ KHAI THÁC THỦY SẢN' +
  //             '_' +
  //             Math.floor(Math.random() * 100000);
  //           const result = ExportPDF(dataFix);
  //           if (!result) Alert.alert('Thất bại', `không thể tải file pdf`);
  //         }}>
  //         <Text style={styles.actionText}>Tải file</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         style={[styles.actionExportPDF, styles.button]}
  //         onPress={
  //           () => {
  //             let dataFix = { ...data };
  //             PrintfPDF(dataFix);
  //           }
  //           //data
  //         }
  //         >
            
  //         <Text style={styles.actionText}>Xuất File</Text>
  //       </TouchableOpacity>
  //     </View>
  //   )
  // }
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="MainNavigation"
        component={MainNavigation}></Stack.Screen>

      <Stack.Screen
        options={{
          title: '',
        }}
        name="login"
        component={Login}></Stack.Screen>

      <Stack.Screen
        options={{
          title: '',
          // headerRight: () => <CustomRightHeader data={data}/>
        }}
        name="ViewPDF"
        component={ViewPDF}></Stack.Screen>
    </Stack.Navigator>
  );
};


export default AppNavigation;

const styles = StyleSheet.create({
  txt: {
    fontSize: 16,
    textAlign: 'justify',
    color: '#000',
  },
});
