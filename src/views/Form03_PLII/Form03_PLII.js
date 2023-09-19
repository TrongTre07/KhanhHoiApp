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
import {ExportPDF} from './pdfForm03_PLII/ExportPDF';
import data03_PLIIEmpty from './models/data03_PLII';
import uploadFile from '../../axios/uploadFile';
import Storage from '../../utils/storage';
import {useNavigation} from '@react-navigation/native';
import HeaderView from './HeaderView';
import TongCucThuySanView from './TongCucThuySanView';
import TableForm03PL2 from './TableForm03PL2';
import KiemTraSanLuongKhaiThac from './KiemTraSanLuongKhaiThac';
import {dataMau} from './pdfForm03_PLII/dataMauPDF';
import {PrintfPDF} from './pdfForm03_PLII/PrintfPDF';
import makeid from '../others/makeid';
// import ChiTietNhomKhaiThac from './item/itemTongCucThuySan/ChiTietNhomKhaiThac';
// import TableCangca2 from './item/itemTongCucThuySan/TableCangca2';

const Form03_PLII = ({route}) => {
  const {
    getDetailForm03_PLII_Id,
    setData03_PLII,
    data03_PLII,
    goBackAlert,
    setGoBackAlert,
    postForm03_PLII,
    updateForm03_PLII,
  } = useContext(UserContext);
  const navigation = useNavigation();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const {isLoading} = useContext(UserContext);
  const {initialTitle, setInitialTitle} = useContext(UserContext);
  const netInfo = useNetInfo();

  let titleForm03_PLII = '';

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
    titleForm03_PLII = tieuDe;
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
    let objectPost = {...data03_PLII};
    objectPost.dairyname = tieuDe;

    // console.log(JSON.stringify(objectPost, null, 2));

    const isConnect = netInfo.isConnected;

    // chưa có mạng thì lưu local
    if (!isConnect) {
      const dataForm = modifyForm03_PL2(objectPost);
      let result = JSON.parse(await Storage.getItem('form03_PLII'));

      if (result === null || !Array.isArray(result)) {
        result = [];
      }

      switch (string) {
        case 'create':
          // console.log('ID:', id);

          result.push(dataForm);
          await Storage.setItem('form03_PLII', JSON.stringify(result));
          ToastAndroid.show('Tạo thành công', ToastAndroid.SHORT);
          setGoBackAlert(true);
          break;
        case 'update':
          result[id] = dataForm;
          await Storage.setItem('form03_PLII', JSON.stringify(result));
          ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
          setGoBackAlert(true);
          break;
      }
    } else if (string == 'create') {
      const result = await postForm03_PLII(modifyForm03_PL2(objectPost));
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
      await updateForm03_PLII(modifyForm03_PL2(objectPost));
    }
  };

  const id = route?.params?.id;

  useEffect(() => {
    if (id != undefined) {
      if (netInfo.isConnected) getDetailForm03_PLII_Id(id);
      else getDataLocal();
    } else {
      setInitialTitle('');
      setData03_PLII(data03_PLIIEmpty);
    }
  }, [netInfo, id, setData03_PLII]);

  // render data local to form
  const getDataLocal = async () => {
    const result = await Storage.getItem('form03_PLII');
    if (result !== null) {
      const data = JSON.parse(result);
      if (data.length > 0) {
        console.log(JSON.stringify(data[i], null, 2));
        setData03_PLII(modifyForm03_PL2Local(data[id]));
      }
    }
  };

  const modifyForm03_PL2 = data03_PLII => {
    // Modify thumua array
    const modifiedThumua = data03_PLII.tbldairy_0203_ls.map(item => {
      if (!item.hasOwnProperty('isdelete')) {
        // Item has isdelete field with a value of 1, update id to 0
        return {...item, id: 0};
      }
      return item;
    });
    // Update data0202 with the modified thumua and thongtintaudc_thumua arrays
    const updatedData0202 = {
      ...data03_PLII,
      tbldairy_0203_ls: modifiedThumua,
    };

    console.log('MODIFY:', JSON.stringify(updatedData0202, null, 2));

    return updatedData0202;
  };
  const modifyForm03_PL2Local = data03_PLII => {
    // Modify thumua array
    const modifiedThumua = data03_PLII.tbldairy_0203_ls.map(item => {
      // Item has isdelete field with a value of 1, update id to 0
      return {...item, id: makeid(7)};
    });
    // Update data0202 with the modified thumua and thongtintaudc_thumua arrays
    const updatedData0202 = {
      ...data03_PLII,
      tbldairy_0203_ls: modifiedThumua,
    };

    console.log('MODIFY:', JSON.stringify(updatedData0202, null, 2));

    return updatedData0202;
  };

  // check ko có wifi thì update local
  const handleUpdateDiaryLocal = async () => {
    const dataForm = {...data03_PLII};
    dataForm.dairyname = titleForm03_PLII;
    const result = await Storage.getItem('form03_PLII');
    if (result !== null) {
      const data = JSON.parse(result);
      data[id] = dataForm;
      await Storage.setItem('form03_PLII', JSON.stringify(data));
      console.log('STORAGE:', JSON.stringify(data, null, 2));
    }
    ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
    // setData03_PLII(data03_PLIIEmpty);
    setGoBackAlert(true);
  };

  React.useEffect(() => {
    const backAction = () => {
      setData03_PLII(data03_PLIIEmpty);
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
            dataFix.dairyname =
              'Mẫu Biên bản kiểm tra tàu cá cập cảng' +
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
            let dataFix = modifyForm03_PL2({...data03_PLII});
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
      <TableForm03PL2 />

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
        initialValue={initialTitle || data03_PLII?.dairyname}
      />
    </ScrollView>
  );
};

export default Form03_PLII;

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
