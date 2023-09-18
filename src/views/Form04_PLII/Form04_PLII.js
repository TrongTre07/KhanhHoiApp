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
import {ExportPDF} from './pdfForm04_PLII/ExportPDF';
import data04_PLIIEmpty from './models/data04_PLII';
import uploadFile from '../../axios/uploadFile';
import Storage from '../../utils/storage';
import {useNavigation} from '@react-navigation/native';
import HeaderForm04_PL2 from './HeaderForm04_PL2';
import TongCucThuySanView from './TongCucThuySanForm04_PL2';
import TableForm04PL2 from './TableForm04PL2';
import {PrintfPDF} from './pdfForm04_PLII/PrintfPDF';
import { dataMau } from './pdfForm04_PLII/dataMauPDF';
// import ChiTietNhomKhaiThac from './item/itemTongCucThuySan/ChiTietNhomKhaiThac';
// import TableCangca2 from './item/itemTongCucThuySan/TableCangca2';

const Form04_PLII = ({route}) => {
  const {
    getDetailForm04_PLII_Id,
    setData04_PLII,
    data04_PLII,
    goBackAlert,
    setGoBackAlert,
    postForm04_PLII,
    updateForm04_PLII,
  } = useContext(UserContext);
  const navigation = useNavigation();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const {isLoading} = useContext(UserContext);
  const {initialTitle, setInitialTitle} = useContext(UserContext);
  const netInfo = useNetInfo();

  let titleForm04_PLII = '';

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
    titleForm04_PLII = tieuDe;
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
    let objectPost = {...data04_PLII};
    objectPost.dairyname = tieuDe;

    // console.log(JSON.stringify(objectPost, null, 2));

    const isConnect = netInfo.isConnected;

    // chưa có mạng thì lưu local
    if (!isConnect) {
      const dataForm = objectPost;
      let result = JSON.parse(await Storage.getItem('form04_PLII'));

      if (result === null || !Array.isArray(result)) {
        result = [];
      }

      switch (string) {
        case 'create':
          result.push(dataForm);
          await Storage.setItem('form04_PLII', JSON.stringify(result));
          ToastAndroid.show('Tạo thành công', ToastAndroid.SHORT);
          setGoBackAlert(true);
          break;
        case 'update':
          result[id] = dataForm;
          await Storage.setItem('form04_PLII', JSON.stringify(result));
          ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
          setGoBackAlert(true);
          break;
      }
    } else if (string == 'create') {
      const result = await postForm04_PLII(objectPost);
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
      await updateForm04_PLII(objectPost);
    }
  };

  const id = route?.params?.id;

  useEffect(() => {
    if (id != undefined) {
      if (netInfo.isConnected) getDetailForm04_PLII_Id(id);
      else getDataLocal();
    } else {
      setInitialTitle('')
      setData04_PLII(data04_PLIIEmpty);
    }
  }, [netInfo, id, setData04_PLII]);

  // render data local to form
  const getDataLocal = async () => {
    const result = await Storage.getItem('form04_PLII');
    if (result !== null) {
      const data = JSON.parse(result);
      if (data.length > 0) {
        console.log(JSON.stringify(data[i], null, 2));
        setData04_PLII(data[id]);
      }
    }
  };

  React.useEffect(() => {
    const backAction = () => {
      setData04_PLII(data04_PLIIEmpty);
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
            dataFix.dairyname = 'Mẫu Biên bản kiểm tra tàu cá rời cảng'+'_'+Math.floor(Math.random() * 100000);
            const result= ExportPDF(dataFix);
            if(!result) Alert.alert('Thất bại', `không thể tải file pdf`);
          }}>
          <Text style={styles.actionText}>Tải mẫu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionExportPDF, styles.button]}
          onPress={async () => {
            let dataFix = {...data04_PLII};
            PrintfPDF(dataFix);
          }}>
          <Text style={styles.actionText}>Xuất file</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView>
      <HeaderForm04_PL2 />
      <TongCucThuySanView />
      <TableForm04PL2 />
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
        initialValue={initialTitle || data04_PLII?.dairyname}
      />
    </ScrollView>
  );
};

export default Form04_PLII;

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
