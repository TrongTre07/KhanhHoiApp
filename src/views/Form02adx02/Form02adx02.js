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
import TongCucThuySanView from './item/TongCucThuySanView';
import {UserContext} from '../../contexts/UserContext';
import {useNetInfo} from '@react-native-community/netinfo';
import HeaderView from './item/HeaderView';
import Spinner from 'react-native-loading-spinner-overlay';
import AlertInputComponent from '../../utils/AlertInputComponent';
import {ExportPDF} from './pdfForm0202/ExportPDF';
import data0202Empty from './models/data0202';
import uploadFile from '../../axios/uploadFile';
import Storage from '../../utils/storage';
import {useNavigation} from '@react-navigation/native';
import ChiTietNhomKhaiThac from './item/itemTongCucThuySan/ChiTietNhomKhaiThac';
import TableCangca2 from './item/itemTongCucThuySan/TableCangca2';
import ChiTietVeSanLuongThuySan from './item/itemTongCucThuySan/ChiTietVeSanLuongThuySan';
import XacNhanKhoiLuongThuySanConLai from './item/itemTongCucThuySan/XacNhanKhoiLuongThuySanConLai';
import {PrintfPDF} from './pdfForm0202/PrintfPDF';
import {dataMau} from './pdfForm0202/dataMauPDF';
import makeid from '../others/makeid';

const Form02ad02 = ({route}) => {
  const {
    getDetailForm0202Id,
    setData0202,
    data0202,
    goBackAlert,
    setGoBackAlert,
    postForm0202,
    updateForm0202,
  } = useContext(UserContext);
  const navigation = useNavigation();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const {isLoading} = useContext(UserContext);
  const {initialTitle, setInitialTitle} = useContext(UserContext);
  const netInfo = useNetInfo();

  let titleForm0202 = '';

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
    titleForm0202 = tieuDe;
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
    let objectPost = {...data0202};
    objectPost.dairy_name = tieuDe;

    // console.log(JSON.stringify(objectPost, null, 2));

    const isConnect = netInfo.isConnected;

    // chưa có mạng thì lưu local
    if (!isConnect) {
      const dataForm = modifyForm0202(objectPost);
      let result = JSON.parse(await Storage.getItem('form02adx02'));

      if (result === null || !Array.isArray(result)) {
        result = [];
      }

      switch (string) {
        case 'create':
          result.push(dataForm);
          await Storage.setItem('form02adx02', JSON.stringify(result));
          ToastAndroid.show('Tạo thành công', ToastAndroid.SHORT);
          setGoBackAlert(true);
          break;
        case 'update':
          result[id] = dataForm;
          await Storage.setItem('form02adx02', JSON.stringify(result));
          ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
          setGoBackAlert(true);
          break;
      }
    } else if (string == 'create') {
      const result = await postForm0202(modifyForm0202(objectPost));
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
      await updateForm0202(modifyForm0202(objectPost));
    }
  };

  const id = route?.params?.id;

  useEffect(() => {
    if (id != undefined) {
      if (netInfo.isConnected) getDetailForm0202Id(id);
      else getDataLocal();
    } else {
      setInitialTitle('');
      setData0202(data0202Empty);
    }
  }, [netInfo, id, setData0202]);

  // render data local to form
  const getDataLocal = async () => {
    const result = await Storage.getItem('form02adx02');
    if (result !== null) {
      const data = JSON.parse(result);
      if (data.length > 0) {
        console.log(JSON.stringify(data[i], null, 2));
        setData0202(modifyForm0202Local(data[id]));
      }
    }
  };

  const modifyThongTinKhaiThac = data0202 => {
    const modifiedKhaiThac = {...data0202};
    return modifiedKhaiThac;
  };

  const modifyForm0202 = data0202 => {
    // Modify thumua array
    const modifiedThumua = data0202.ls0202ds.map(item => {
      if (!item.hasOwnProperty('isdelete')) {
        // Item has isdelete field with a value of 1, update id to 0
        return {...item, id: 0};
      }
      return item;
    });

    // Modify thongtintaudc_thumua array
    const modifiedThongTinTauDCThumua = data0202.xacnhan.lsxacnhan_.map(
      item => {
        if (!item.hasOwnProperty('isdelete')) {
          // Item has isdelete field with a value of 1, update id to 0
          item = {...item, id: 0};
        }

        return item;
      },
    );

    // Update data0202 with the modified thumua and thongtintaudc_thumua arrays
    const updatedData0202 = {
      ...data0202,
      ls0202ds: modifiedThumua,
      xacnhan: {
        ...data0202.xacnhan, // Spread the existing properties from data0202.xacnhan
        lsxacnhan_: modifiedThongTinTauDCThumua, // Update lsxacnhan_ with the modified array
      },
    };

    console.log('MODIFY:', JSON.stringify(updatedData0202, null, 2));

    return updatedData0202;
  };
  const modifyForm0202Local = data0202 => {
    // Modify thumua array
    const modifiedThumua = data0202.ls0202ds.map(item => {
      return {...item, id: makeid(7)};
    });

    // Modify thongtintaudc_thumua array
    const modifiedThongTinTauDCThumua = data0202.xacnhan.lsxacnhan_.map(
      item => {
        // Item has isdelete field with a value of 1, update id to 0
        item = {...item, id: makeid(7)};
        return item;
      },
    );

    // Update data0202 with the modified thumua and thongtintaudc_thumua arrays
    const updatedData0202 = {
      ...data0202,
      ls0202ds: modifiedThumua,
      xacnhan: {
        ...data0202.xacnhan, // Spread the existing properties from data0202.xacnhan
        lsxacnhan_: modifiedThongTinTauDCThumua, // Update lsxacnhan_ with the modified array
      },
    };

    console.log('MODIFY LOCAL:', JSON.stringify(updatedData0202, null, 2));

    return updatedData0202;
  };

  React.useEffect(() => {
    const backAction = () => {
      setData0202(data0202Empty);
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
            let dataFix = dataMau;
            dataFix.dairy_name =
              'Mẫu Giấy biên nhận bốc dỡ qua cảng' +
              '_' +
              Math.floor(Math.random() * 100000);
            const result = ExportPDF(dataFix);
            if (!result) Alert.alert('Thất bại', `không thể tải file pdf`);
          }}>
          <Text style={styles.actionText}>Tải mẫu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionExportPDF, styles.button]}
          onPress={async () => {
            let dataFix = modifyForm0202({...data0202});
            PrintfPDF(dataFix);
          }}>
          <Text style={styles.actionText}>Xuất file</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView>
      <HeaderView />
      <TongCucThuySanView />
      <XacNhanKhoiLuongThuySanConLai />
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
        initialValue={initialTitle || data0202?.dairy_name}
      />
    </ScrollView>
  );
};

export default Form02ad02;

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
