import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import Spinner from 'react-native-loading-spinner-overlay';
import {UserContext} from '../../contexts/UserContext';
import Storage from '../../utils/storage';
import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import AlertInputComponent from '../../utils/AlertInputComponent';
import uploadFile from '../../axios/uploadFile';
import {ExportPDF} from './pdfForm01/ExportPDF';
import HeaderView from './HeaderView';
import TongCucThuySanView from './TongCucThuySanView';
import KetQuaKhaiThac from './KetQuaKhaiThac';
import ThongTinVeHoatDongChuyenTai from './ThongTinVeHoatDongChuyenTai';
import data0101Empty from './models/data0101Empty';
import { PrintfPDF } from './pdfForm01/PrintfPDF';
import { dataMau } from './pdfForm01/dataMauPDF';
const Form01adx01 = ({route}) => {
  const {
    getDetailForm0101_Id,
    setData0101,
    data0101,
    goBackAlert,
    setGoBackAlert,
    postForm0101,
    setIsPDFLoading,
    updateForm0101,
  } = useContext(UserContext);

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [initialValue, setInitialValue] = useState('');

  const {isLoading,setIsLoading} = useContext(UserContext);
  const {initialTitle, setInitialTitle} = useContext(UserContext);

  const netInfo = useNetInfo();
  const navigation = useNavigation();

  const id = route.params?.id;

  useEffect(() => {
    console.log('id: ', id);
  }, [id]);

  useEffect(() => {
    if (id != undefined) {
      if (netInfo.isConnected) getDetailForm0101_Id(id);
      else getDataLocal();
    } else {
      setInitialTitle('')
      setData0101(data0101Empty);
    }
  }, [netInfo, id, setData0101]);

  // render data local to form
  const getDataLocal = async () => {
    const result = await Storage.getItem('form01adx01');
    if (result !== null) {
      const data = JSON.parse(result);
      if (data.length > 0) setData0101(data[id]);
    }
  };

  //goback
  useEffect(() => {
    if (goBackAlert) {
      navigation.pop();
      setGoBackAlert(false);
    }
  }, [goBackAlert, navigation, setGoBackAlert]);

  //nghe chinh
  useEffect(() => {
    if (data0101.nghechinh) {
      setInitialValue(data0101.dairy_name);
    }
  }, [data0101]);

  const handleTriggerButtonClick = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  const modifyForm0101 = data0101 => {
    // Modify thumua array
    const modifiedKhaiThac = data0101.khaithac.map(item => {
      if (!item.hasOwnProperty('isdelete')) {
        // Item has isdelete field with a value of 1, update id to 0
        return {...item, id: 0};
      }
      return item;
    });

    // Modify thongtintaudc_thumua array
    const modifiedThuMua = data0101.thumua.map(item => {
      if (!item.hasOwnProperty('isdelete')) {
        // Item has isdelete field with a value of 1, update id to 0
        item = {...item, id: 0};
      }

      return item;
    });

    // Update data0202 with the modified thumua and thongtintaudc_thumua arrays
    const updatedData0101 = {
      ...data0101,
      khaithac: modifiedKhaiThac,
      thumua: modifiedThuMua,
    };

    // console.log('MODIFY:', JSON.stringify(updatedData0101, null, 2));

    return updatedData0101;
  };

  const handleDataSubmit = value => {
    if (value == '') {
      Alert.alert('Lỗi', 'Bạn phải nhập tiêu đề', [
        {
          text: 'OK',
          onPress: () => {
            // setIsErrorPost(false);
          },
        },
      ]);
      return;
    }

    if (id == undefined) {
      //neu la create thi field id khong ton tai
      console.log('CREATE ACTIVATED');
      handleCreateForm(value, 'create');
    } else {
      console.log('UPDATE ACTIVATED');
      handleCreateForm(value, 'update');
    }
  };
  const handleUpdate = () => {
    setPopupVisible(true);
  };

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
          onPress={() => {
            let dataFix = dataMau;
            dataFix.dairy_name = 'Mẫu NHẬT KÝ KHAI THÁC THỦY SẢN'+'_'+Math.floor(Math.random() * 100000);
            const result= ExportPDF(dataFix);
            if(!result) Alert.alert('Thất bại', `không thể tải file pdf`);
          }}>
          <Text style={styles.actionText}>Tải mẫu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionExportPDF, styles.button]}
          onPress={
            () => {
              let dataFix = modifyForm0102({...data0101});
              PrintfPDF(dataFix);
            }
            //data
          }>
          <Text style={styles.actionText}>Xuất File</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleCreateForm = async (value, string) => {
    let objectPost = {...data0101};
    objectPost.dairy_name = value;
    const isConnect = netInfo.isConnected;

    // chưa có mạng thì lưu local
    if (!isConnect) {
      const dataForm = modifyForm0101(objectPost);
      let result = JSON.parse(await Storage.getItem('form01adx01'));

      if (!dataForm.id_tau) {
        Alert.alert('Lỗi', 'Bạn phải chọn tàu!', [
          {
            text: 'OK',
            onPress: () => {
              // setIsErrorPost(false);
            },
          },
        ]);
      } else {
        if (result === null || !Array.isArray(result)) {
          result = [];
        }

        switch (string) {
          case 'create':
            result.push(dataForm);
            await Storage.setItem('form01adx01', JSON.stringify(result));
            ToastAndroid.show('Tạo thành công', ToastAndroid.SHORT);
            setGoBackAlert(true);
            break;
          case 'update':
            result[id] = dataForm;
            await Storage.setItem('form01adx01', JSON.stringify(result));
            ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
            setGoBackAlert(true);
            break;
        }
      }
    } else if (string == 'create') {
      console.log('CREATE');

      if (!data0101.id_tau) {
        Alert.alert('Lỗi', 'Bạn phải chọn tàu!', [
          {
            text: 'OK',
            onPress: () => {
              // setIsErrorPost(false);
            },
          },
        ]);
      } else {
        const result = await postForm0101(modifyForm0101(objectPost));
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
      }
    } else if (string == 'update') {
      console.log('UPDATED');
      await updateForm0101(modifyForm0101(objectPost));
      if (!data0101.id_tau) {
        Alert.alert('Lỗi', 'Bạn phải chọn tàu!', [
          {
            text: 'OK',
            onPress: () => {
              // setIsErrorPost(false);
            },
          },
        ]);
      }
    }
  };

  React.useEffect(() => {
    const backAction = () => {
      setData0101(data0101Empty);
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <HeaderView />
      <TongCucThuySanView />
      <KetQuaKhaiThac />
      <ThongTinVeHoatDongChuyenTai />
      {_renderActionView()}
      <Spinner
        visible={isLoading}
        textContent={'Đang tải...'}
        color="blue"
        textStyle={styles.spinnerText}
      />
      <AlertInputComponent
        visible={isPopupVisible}
        onClose={handlePopupClose}
        onSubmit={value => {
          if (value == '') {
            Alert.alert('Lỗi', 'Bạn phải nhập tiêu đề!', [
              {
                text: 'OK',
                onPress: () => {
                  // setIsErrorPost(false);
                },
              },
            ]);
          } else handleDataSubmit(value);
        }}
        initialValue={initialTitle || data0101.dairy_name}
      />
    </ScrollView>
  );
};

export default Form01adx01;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
