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
import {ExportPDF} from './pdfForm0401/ExportPDF';
import data0401Empty from './models/data0401';
import uploadFile from '../../axios/uploadFile';
import Storage from '../../utils/storage';
import {useNavigation} from '@react-navigation/native';
import { dataMau } from './pdfForm0401/dataMauPDF';
import { PrintfPDF } from './pdfForm0401/PrintfPDF';
const Form04ad01 = ({route}) => {
  const {
    getDetailForm0401Id,
    setData0401,
    data0401,
    goBackAlert,
    setGoBackAlert,
    postForm0401,
    updateForm0401,
  } = useContext(UserContext);
  const navigation = useNavigation();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const {isLoading} = useContext(UserContext);
  const {initialTitle, setInitialTitle} = useContext(UserContext);
  const netInfo = useNetInfo();

  let titleForm0401 = '';

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
    titleForm0401 = tieuDe;
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
    let objectPost = {...data0401};
    objectPost.dairyname = tieuDe;

    // console.log(JSON.stringify(objectPost, null, 2));

    const isConnect = netInfo.isConnected;

    // chưa có mạng thì lưu local
    if (!isConnect) {
      const dataForm = modifyThongTinKhaiThac(objectPost);
      let result = JSON.parse(await Storage.getItem('form04adx01'));

      if (!dataForm.tau_bs) {
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
            // console.log('ID:', id);

            result.push(dataForm);
            await Storage.setItem('form04adx01', JSON.stringify(result));
            ToastAndroid.show('Tạo thành công', ToastAndroid.SHORT);
            setGoBackAlert(true);
            break;
          case 'update':
            result[id] = dataForm;
            await Storage.setItem('form04adx01', JSON.stringify(result));
            ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
            setGoBackAlert(true);
            break;
        }
      }
    } else if (string == 'create') {
      if (!data0401.tau_bs) {
        Alert.alert('Lỗi', 'Bạn phải chọn tàu!', [
          {
            text: 'OK',
            onPress: () => {
              // setIsErrorPost(false);
            },
          },
        ]);
      } else {
        const result = await postForm0401(modifyThongTinKhaiThac(objectPost));
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
      await updateForm0401(modifyThongTinKhaiThac(objectPost));
      if (!data0401.tau_bs) {
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
      if (netInfo.isConnected) getDetailForm0401Id(id);
      else getDataLocal();
    } else {
      setInitialTitle('');
      setData0401(data0401Empty);
    }
  }, [netInfo, id, setData0401]);

  // render data local to form
  const getDataLocal = async () => {
    const result = await Storage.getItem('form04adx01');
    if (result !== null) {
      const data = JSON.parse(result);
      if (data.length > 0) {
        console.log(JSON.stringify(data[i], null, 2));
        setData0401(data[id]);
      }
    }
  };

  const modifyThongTinKhaiThac = data0401 => {
    const modifiedKhaiThac = {...data0401};

    if (modifiedKhaiThac.tau_chieudailonnhat === '') {
      modifiedKhaiThac.tau_chieudailonnhat = 0;
    }
    if (modifiedKhaiThac.tau_tongcongsuatmaychinh === '') {
      modifiedKhaiThac.tau_tongcongsuatmaychinh = 0;
    }

    if (modifiedKhaiThac.chuyenbien_so === '') {
      modifiedKhaiThac.chuyenbien_so = 0;
    }
    if (modifiedKhaiThac.nam === '') {
      modifiedKhaiThac.nam = 0;
    }
    if (modifiedKhaiThac.tongsolaodong === '') {
      modifiedKhaiThac.tongsolaodong = 0;
    }
    if (modifiedKhaiThac.songaykhaithac === '') {
      modifiedKhaiThac.songaykhaithac = 0;
    }
    if (modifiedKhaiThac.so_meluoi === '') {
      modifiedKhaiThac.so_meluoi = 0;
    }
    if (modifiedKhaiThac.tongsanluong === '') {
      modifiedKhaiThac.tongsanluong = 0;
    }
    if (modifiedKhaiThac.songayhoatdong === '') {
      modifiedKhaiThac.songayhoatdong = 0;
    }

    console.log('MODIFY:', JSON.stringify(modifiedKhaiThac, null, 2));

    return modifiedKhaiThac;
  };

  React.useEffect(() => {
    const backAction = () => {
      setData0401(data0401Empty);
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
            dataFix.dairyname = 'MẪU BÁO CÁO THĂM DÒ, TÌM KIẾM, DẪN DỤ NGUỒN LỢI THỦY SẢN'+'_'+Math.floor(Math.random() * 100000);
            const result= ExportPDF(dataFix);
            if(!result) Alert.alert('Thất bại', `không thể tải file pdf`);
          }}>
          <Text style={styles.actionText}>Tải mẫu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionExportPDF, styles.button]}
          onPress={async () => {
            let dataFix = {...data0401};
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
        initialValue={initialTitle || data0401?.dairyname}
      />
    </ScrollView>
  );
};

export default Form04ad01;

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
