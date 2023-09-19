import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useContext} from 'react';
import TongCucThuySanView from './item/TongCucThuySanView';
import {UserContext} from '../../contexts/UserContext';
import {useNetInfo} from '@react-native-community/netinfo';

import KetQuaThuMua from './KetQuaThuMua';
import ThongTinVeCacTau from './item/ThongTinVeCacTau';
import ThongTinChiTietHoatDong from './item/B_ThongTinVeTauCa/ThongTinChiTietHoatDong';
import HeaderView from './item/HeaderView';
import AlertInputComponent from '../../utils/AlertInputComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import {useState} from 'react';
import Storage from '../../utils/storage';
import {useNavigation} from '@react-navigation/native';
import data0201Empty from './models/data0201';
import {ExportPDF} from '../Form02adx01/pdfForm0201/ExportPDF';
import uploadFile from '../../axios/uploadFile';
import {dataMau} from './pdfForm0201/dataMauPDF';
import {PrintfPDF} from './pdfForm0201/PrintfPDF';
import makeid from '../others/makeid';
import moment from 'moment';
const Form02ad01 = ({route}) => {
  const navigation = useNavigation();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const {isLoading} = useContext(UserContext);
  const {initialTitle, setInitialTitle} = useContext(UserContext);
  const {
    getDetailForm0201Id,
    setData0201,
    data0201,
    goBackAlert,
    setGoBackAlert,
    postForm0201,
    updateForm0201,
  } = useContext(UserContext);

  let titleForm0201 = '';

  const netInfo = useNetInfo();

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
    titleForm0201 = tieuDe;
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
    let objectPost = {...data0201};
    objectPost.dairy_name = tieuDe;

    // console.log(JSON.stringify(objectPost, null, 2));

    const isConnect = netInfo.isConnected;

    // chưa có mạng thì lưu local
    if (!isConnect) {
      const dataForm = modifyThongTinTauDCThumua(objectPost);
      let result = JSON.parse(await Storage.getItem('form02adx01'));
      console.log('RESULT:', data0201.dairy_name);
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
            await Storage.setItem('form02adx01', JSON.stringify(result));
            ToastAndroid.show('Tạo thành công', ToastAndroid.SHORT);
            setGoBackAlert(true);
            break;
          case 'update':
            result[id] = dataForm;
            await Storage.setItem('form02adx01', JSON.stringify(result));
            ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
            setGoBackAlert(true);
            break;
        }
      }
    } else if (string == 'create') {
      if (!data0201.id_tau) {
        Alert.alert('Lỗi', 'Bạn phải chọn tàu!', [
          {
            text: 'OK',
            onPress: () => {
              // setIsErrorPost(false);
            },
          },
        ]);
      } else {
        const result = await postForm0201(
          modifyThongTinTauDCThumua(objectPost),
        );
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
      await updateForm0201(modifyThongTinTauDCThumua(objectPost));
      if (!data0201.id_tau) {
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

  const id = route?.params?.id;

  useEffect(() => {
    if (id != undefined) {
      if (netInfo.isConnected) getDetailForm0201Id(id);
      else getDataLocal();
    } else {
      setInitialTitle(`NhatKyThuMuaChuyenTaiThuySan_${moment().format('DD/MM/YYYY')}`);
      setData0201(data0201Empty);
    }
  }, [netInfo, id]);

  // render data local to form
  const getDataLocal = async () => {
    const result = await Storage.getItem('form02adx01');
    if (result !== null) {
      const data = JSON.parse(result);
      if (data.length > 0)
        setData0201(modifyThongTinTauDCThumuaLocal(data[id]));
    }
  };

  const modifyThongTinTauDCThumua = data0201 => {
    // Modify thumua array
    const modifiedThumua = data0201.thumua.map(item => {
      if (!item.hasOwnProperty('isdelete')) {
        // Item has isdelete field with a value of 1, update id to 0
        return {...item, id: 0};
      }
      return item;
    });

    // Modify thongtintaudc_thumua array
    const modifiedThongTinTauDCThumua = data0201.thongtintaudc_thumua.map(
      item => {
        if (item.thongtinhoatdong) {
          const modifiedThongTinHoatDong = item.thongtinhoatdong.map(
            subItem => {
              if (!subItem.hasOwnProperty('isdelete')) {
                return {...subItem, id: 0};
              }
              return subItem;
            },
          );
          item = {...item, thongtinhoatdong: modifiedThongTinHoatDong};
        }

        if (!item.hasOwnProperty('isdelete')) {
          // Item has isdelete field with a value of 1, update id to 0
          item = {...item, id: 0};
        }

        return item;
      },
    );
    // Update data0201 with the modified thumua and thongtintaudc_thumua arrays
    const updatedData0201 = {
      ...data0201,
      thumua: modifiedThumua,
      thongtintaudc_thumua: modifiedThongTinTauDCThumua,
    };
    console.log('MODIFY:', JSON.stringify(updatedData0201, null, 2));
    return updatedData0201;
  };

  const modifyThongTinTauDCThumuaLocal = data0201 => {
    // Modify thumua array
    const modifiedThumua = data0201.thumua.map(item => {
      return {...item, id: makeid(7)};
    });

    // Modify thongtintaudc_thumua array
    const modifiedThongTinTauDCThumua = data0201.thongtintaudc_thumua.map(
      item => {
        if (item.thongtinhoatdong) {
          const modifiedThongTinHoatDong = item.thongtinhoatdong.map(
            subItem => {
              return {...subItem, id: makeid(7)};
            },
          );
          item = {...item, thongtinhoatdong: modifiedThongTinHoatDong};
        }

        // Item has isdelete field with a value of 1, update id to 0
        item = {...item, id: makeid(7)};

        return item;
      },
    );
    // Update data0201 with the modified thumua and thongtintaudc_thumua arrays
    const updatedData0201 = {
      ...data0201,
      thumua: modifiedThumua,
      thongtintaudc_thumua: modifiedThongTinTauDCThumua,
    };
    console.log('MODIFY Local:', JSON.stringify(updatedData0201, null, 2));
    return updatedData0201;
  };

  React.useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      setData0201(data0201Empty);
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
              'MẤU NHẬT KÝ THU MUA, CHUYỂN TẢI THỦY SẢN' +
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
            let dataFix = modifyThongTinTauDCThumua({...data0201});
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
      <KetQuaThuMua />
      <ThongTinVeCacTau />
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
        initialValue={initialTitle || data0201.dairy_name}
      />
    </ScrollView>
  );
};

export default Form02ad01;

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
