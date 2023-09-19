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
import {ExportPDF} from './pdfForm04_PLIII_03/ExportPDF';
import data04_PLIII_03Empty from './models/data04_PLIII_03';
import uploadFile from '../../axios/uploadFile';
import Storage from '../../utils/storage';
import {useNavigation} from '@react-navigation/native';
import TableForm04_PL2_03 from './TableForm04_PL3_03';
import HeaderForm04_PL2_03 from './HeaderForm04_PL3_03';
import {PrintfPDF} from './pdfForm04_PLIII_03/PrintfPDF';
import { dataMau } from './pdfForm04_PLIII_03/dataMauPDF';
// import ChiTietNhomKhaiThac from './item/itemTongCucThuySan/ChiTietNhomKhaiThac';
// import TableCangca2 from './item/itemTongCucThuySan/TableCangca2';

const Form04_PLIII_03 = ({route}) => {
  const {
    getDetailForm04_PLIII_03_Id,
    setData04_PLIII_03,
    data04_PLIII_03,
    goBackAlert,
    setGoBackAlert,
    postForm04_PLIII_03,
    updateForm04_PLIII_03,
  } = useContext(UserContext);
  const navigation = useNavigation();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const {isLoading} = useContext(UserContext);
  const {initialTitle, setInitialTitle} = useContext(UserContext);
  const netInfo = useNetInfo();

  let titleForm04_PLIII_03 = '';

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
    titleForm04_PLIII_03 = tieuDe;
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
    let objectPost = {...data04_PLIII_03};
    objectPost.dairyname = tieuDe;

    // console.log(JSON.stringify(objectPost, null, 2));

    const isConnect = netInfo.isConnected;

    // chưa có mạng thì lưu local
    if (!isConnect) {
      const dataForm = modifyForm04_PL3_03(objectPost);
      let result = JSON.parse(await Storage.getItem('form04_PLIII_03'));

      if (result === null || !Array.isArray(result)) {
        result = [];
      }

      switch (string) {
        case 'create':
          // console.log('ID:', id);

          result.push(dataForm);
          await Storage.setItem('form04_PLIII_03', JSON.stringify(result));
          ToastAndroid.show('Tạo thành công', ToastAndroid.SHORT);
          setGoBackAlert(true);
          break;
        case 'update':
          result[id] = dataForm;
          await Storage.setItem('form04_PLIII_03', JSON.stringify(result));
          ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
          setGoBackAlert(true);
          break;
      }
    } else if (string == 'create') {
      const result = await postForm04_PLIII_03(modifyForm04_PL3_03(objectPost));
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
      await updateForm04_PLIII_03(modifyForm04_PL3_03(objectPost));
    }
  };

  const id = route?.params?.id;

  useEffect(() => {
    if (id != undefined) {
      if (netInfo.isConnected) getDetailForm04_PLIII_03_Id(id);
      else getDataLocal();
    } else {
      setInitialTitle('')
      setData04_PLIII_03(data04_PLIII_03Empty);
    }
  }, [netInfo, id, setData04_PLIII_03]);

  // render data local to form
  const getDataLocal = async () => {
    const result = await Storage.getItem('form04_PLIII_03');
    if (result !== null) {
      const data = JSON.parse(result);
      if (data.length > 0) {
        console.log(JSON.stringify(data[i], null, 2));
        setData04_PLIII_03(data[id]);
      }
    }
  };

  const modifyForm04_PL3_03 = data04_PLIII_03 => {
    // Modify thumua array
    const modifiedThumua = data04_PLIII_03.tbl_xacnhancamket_ls.map(item => {
      if (!item.hasOwnProperty('isdelete')) {
        // Item has isdelete field with a value of 1, update id to 0
        return {...item, id: 0};
      }
      return item;
    });

    // Update data0202 with the modified thumua and thongtintaudc_thumua arrays
    const updatedData04_PL3_03 = {
      ...data04_PLIII_03,
      tbl_xacnhancamket_ls: modifiedThumua,
    };

    console.log('MODIFY:', JSON.stringify(updatedData04_PL3_03, null, 2));

    return updatedData04_PL3_03;
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
          onPress={async () => {
            let dataFix = dataMau;
            dataFix.dairyname = 'Mẫu Xác nhận cam kết sản phẩm thủy sản xuất khẩu có nguồn gốc từ thủy sản khai thác nhập khẩu'+'_'+Math.floor(Math.random() * 100000);
            const result= ExportPDF(dataFix);
            if(!result) Alert.alert('Thất bại', `không thể tải file pdf`);
          }}>
          <Text style={styles.actionText}>Tải mẫu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionExportPDF, styles.button]}
          onPress={async () => {
            let dataFix = modifyForm04_PL3_03({...data04_PLIII_03});
            PrintfPDF(dataFix);
          }}>
          <Text style={styles.actionText}>Xuất file</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <HeaderForm04_PL2_03 />
      <TableForm04_PL2_03 />
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
        initialValue={initialTitle || data04_PLIII_03?.dairyname}
      />
    </ScrollView>
  );
};

export default Form04_PLIII_03;

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
