import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
// import TongCucThuySanView from './item/TongCucThuySanView';
import {UserContext} from '../../contexts/UserContext';
import {useNetInfo} from '@react-native-community/netinfo';
// import HeaderView from './item/HeaderView';
import Spinner from 'react-native-loading-spinner-overlay';
import AlertInputComponent from '../../utils/AlertInputComponent';
import {ExportPDF02b_PLIIb} from './pdfForm02b_PLIIb/ExportPDF';
import data02b_PLIIbEmpty from './models/data02b_PLIIb';
import uploadFile from '../../axios/uploadFile';
import Storage from '../../utils/storage';
import {useNavigation} from '@react-navigation/native';
import HeaderForm02_PL2B from './HeaderForm02PL2B';
import TableForm02PL2B from './TableForm02PL2B';
import { PrintfPDF02b_PLIIb } from './pdfForm02b_PLIIb/PrintfPDF';
import moment from 'moment';
// import ChiTietNhomKhaiThac from './item/itemTongCucThuySan/ChiTietNhomKhaiThac';
// import TableCangca2 from './item/itemTongCucThuySan/TableCangca2';

const Form02b_PLIIb = ({route}) => {
  const {
    getDetailForm02b_PLIIb_Id,
    setData02b_PLIIb,
    data02b_PLIIb,
    goBackAlert,
    setGoBackAlert,
    postForm02b_PLIIb,
    updateForm02b_PLIIb,
  } = useContext(UserContext);
  const navigation = useNavigation();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const {isLoading} = useContext(UserContext);
  const {initialTitle, setInitialTitle} = useContext(UserContext);
  const netInfo = useNetInfo();

  let titleForm02b_PLIIb = '';

  const handleTriggerButtonClick = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    if (goBackAlert) {
      navigation.pop();
      setGoBackAlert(false);
    }
  }, [goBackAlert, navigation, setGoBackAlert]);

  const handleDataSubmit = tieuDe => {
    titleForm02b_PLIIb = tieuDe;
    if (id == undefined) {
      //neu la create thi field id khong ton tai
      handleCreateForm(tieuDe, 'create');
    } else {
      handleCreateForm(tieuDe, 'update');
    }
  };
  const handleUpdate = () => {
    setPopupVisible(true);
  };

  const handleCreateForm = async (tieuDe, string) => {
    let objectPost = {...data02b_PLIIb};
    objectPost.dairyname = tieuDe;

    const isConnect = netInfo.isConnected;

    // chưa có mạng thì lưu local
    if (!isConnect) {
      const dataForm = objectPost;
      let result = JSON.parse(await Storage.getItem('form02b_PLIIb'));

      if (result === null || !Array.isArray(result)) {
        result = [];
      }

      switch (string) {
        case 'create':
          // console.log('ID:', id);

          result.push(dataForm);
          await Storage.setItem('form02b_PLIIb', JSON.stringify(result));
          ToastAndroid.show('Tạo thành công', ToastAndroid.SHORT);
          setGoBackAlert(true);
          break;
        case 'update':
          result[id] = dataForm;
          await Storage.setItem('form02b_PLIIb', JSON.stringify(result));
          ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
          setGoBackAlert(true);
          break;
      }
    } else if (string == 'create') {
      const result = await postForm02b_PLIIb(objectPost);
      if (result) {
        Alert.alert('Thành công', 'Bạn đã tạo thành công!', [
          {
            text: 'OK',
            onPress: () => {
              setGoBackAlert(true);
            },
          },
        ]);
      } else {
        Alert.alert('Lỗi! Đã có lỗi xảy ra', 'Vui lòng thử lại sau', [
          {
            text: 'OK',
            onPress: () => {
              setGoBackAlert(true);
            },
          },
        ]);
      }
    } else if (string == 'update') {
      await updateForm02b_PLIIb(objectPost);
    }
  };

  const id = route?.params?.id;

  useEffect(() => {
    if (id != undefined) {
      if (netInfo.isConnected) getDetailForm02b_PLIIb_Id(id);
      else getDataLocal();
    } else {
      setInitialTitle(`ThongTinVanTai_${moment().format('DD/MM/YYYY')}`)
      setData02b_PLIIb(data02b_PLIIbEmpty);
    }
  }, [netInfo, id, setData02b_PLIIb]);

  // render data local to form
  const getDataLocal = async () => {
    const result = await Storage.getItem('form02b_PLIIb');
    if (result !== null) {
      const data = JSON.parse(result);
      if (data.length > 0) {
        setData02b_PLIIb(data[id]);
      }
    }
  };

  // check ko có wifi thì update local
  // const handleUpdateDiaryLocal = async () => {
  //   const dataForm = {...data02b_PLIIb};
  //   dataForm.dairyname = titleForm02b_PLIIb;
  //   const result = await Storage.getItem('form02b_PLIIb');
  //   if (result !== null) {
  //     const data = JSON.parse(result);
  //     data[id] = dataForm;
  //     await Storage.setItem('form02b_PLIIb', JSON.stringify(data));
  //     console.log('STORAGE:', JSON.stringify(data, null, 2));
  //   }
  //   ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
  //   // setData02b_PLIIb(data02b_PLIIbEmpty);
  //   setGoBackAlert(true);
  // };

  React.useEffect(() => {
    const backAction = () => {
      setData02b_PLIIb(data02b_PLIIbEmpty);
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const _renderActionView = () => {
    return (
      <View style={styles.action}>
        {id != undefined ? (
          <TouchableOpacity
            style={[styles.actionCreate, styles.button]}
            onPress={() => {
              handleUpdate();
            }}>
            <Text style={styles.actionText}>Cập nhật</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.actionCreate, styles.button]}
            onPress={handleTriggerButtonClick}>
            <Text style={styles.actionText}>Tạo</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionDownload, styles.button]}
          onPress={async () => {
            // let dataFix = dataMau;
            // dataFix.dairy_name = 'Mẫu Thông tin vận tải'+'_'+Math.floor(Math.random() * 100000);
            const result= ExportPDF02b_PLIIb({dairyname : 'Mẫu Thông tin vận tải'+'_'+Math.floor(Math.random() * 100000)});
            if(!result) Alert.alert('Thất bại', `không thể tải file pdf`);
          }}>
          <Text style={styles.actionText}>Tải mẫu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionExportPDF, styles.button]}
          onPress={async () => {
            let dataFix = {...data02b_PLIIb};

            PrintfPDF02b_PLIIb(dataFix);
          }}>
          <Text style={styles.actionText}>Xuất file</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={{backgroundColor: 'white',padding:12}}>
      <HeaderForm02_PL2B />
      <TableForm02PL2B />
      <View style={{backgroundColor: '#fff'}}>{_renderActionView()}</View>
      <Spinner
        visible={isLoading}
        textContent={'Đang tải...'}
        color="blue"
        textStyle={styles.spinnerText}
      />
      <AlertInputComponent
        visible={isPopupVisible}
        onClose={handlePopupClose}
        onSubmit={tieuDe => {
          if (tieuDe == '') {
            Alert.alert('Lỗi', 'Bạn phải nhập tiêu đề!', [
              {
                text: 'OK',
                onPress: () => {
                  // setIsErrorPost(false);
                },
              },
            ]);
          } else handleDataSubmit(tieuDe);
        }}
        initialValue={initialTitle || data02b_PLIIb?.dairyname}
      />
    </ScrollView>
  );
};

export default Form02b_PLIIb;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginRight: 8,
  },

  action: {
    flexDirection: 'row',
    marginVertical: 12,
    marginBottom:24,
  },

  actionText: {
    color: 'white',
    fontSize: 18,
  },

  actionTextDark: {
    color: 'black',
    fontSize: 18,
  },

  actionCreate: {
    backgroundColor: '#4CAF50',
    marginRight: 10,
  },

  actionSave: {
    backgroundColor: '#e5e7eb',
    marginRight: 10,
  },

  actionDownload: {
    backgroundColor: '#3b82f6',
    marginRight: 10,
  },
  actionExportPDF: {
    backgroundColor: '#FF9800',
    marginRight: 10,
  },
});
