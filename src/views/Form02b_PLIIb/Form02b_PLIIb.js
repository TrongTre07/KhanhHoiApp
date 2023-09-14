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
import React, {useEffect, useContext,useState} from 'react';
// import TongCucThuySanView from './item/TongCucThuySanView';
import {UserContext} from '../../contexts/UserContext';
import {useNetInfo} from '@react-native-community/netinfo';
// import HeaderView from './item/HeaderView';
import Spinner from 'react-native-loading-spinner-overlay';
import AlertInputComponent from '../../utils/AlertInputComponent';
import { ExportPDF } from './pdfForm02b_PLIIb/ExportPDF';
import data02b_PLIIbEmpty from './models/data02b_PLIIb';
import uploadFile from '../../axios/uploadFile';
import Storage from '../../utils/storage';
import {useNavigation} from '@react-navigation/native';
// import ChiTietNhomKhaiThac from './item/itemTongCucThuySan/ChiTietNhomKhaiThac';
// import TableCangca2 from './item/itemTongCucThuySan/TableCangca2';


const Form02b_PLIIb = ({route}) => {
  const {
    getDetailForm02b_PLIIbId,
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
  const {initialTitle} = useContext(UserContext);
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
    if (data02b_PLIIb.id == undefined) {
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

    // console.log(JSON.stringify(objectPost, null, 2));

    const isConnect = netInfo.isConnected;

    // chưa có mạng thì lưu local
    if (!isConnect) {
      const dataForm = objectPost;
      const result = await Storage.getItem('form02b_PLIIb');
    if (result !== null) {
        const data = JSON.parse(result);
        data.push(dataForm);
        await Storage.setItem('form02b_PLIIb', JSON.stringify(data));
        ToastAndroid.show('Tạo thành công', ToastAndroid.SHORT);
        setGoBackAlert(true);
      } else {
        const data = [];
        data.push(dataForm);
        await Storage.setItem('form02b_PLIIb', JSON.stringify(data));
        ToastAndroid.show('Tạo thành công', ToastAndroid.SHORT);
        setGoBackAlert(true);
      }
    } else if (string == 'create') {

        await postForm02b_PLIIb(modifyThongTinKhaiThac(objectPost));

    } else if (string == 'update') {
      await updateForm02b_PLIIb(modifyThongTinKhaiThac(objectPost));
    }
  };

  const id = route?.params?.id;

  useEffect(() => {
    if (id != undefined) {
      if (netInfo.isConnected) getDetailForm02b_PLIIbId(id);
      else getDataLocal();
    } else {
      setData02b_PLIIb(data02b_PLIIbEmpty);
    }
  }, [netInfo, id, setData02b_PLIIb]);

  // render data local to form
  const getDataLocal = async () => {
    const result = await Storage.getItem('form02b_PLIIb');
    if (result !== null) {
      const data = JSON.parse(result);
      if (data.length > 0) {
        console.log(JSON.stringify(data[i], null, 2));
        setData02b_PLIIb(data[id]);
      }
    }
  };

  const modifyThongTinKhaiThac = data02b_PLIIb => {
    const modifiedKhaiThac = {...data02b_PLIIb}; 

    // if (modifiedKhaiThac.tau_chieudailonnhat === '') {
    //   modifiedKhaiThac.tau_chieudailonnhat = 0;
    // }    
    // if (modifiedKhaiThac.tau_tongcongsuatmaychinh === '') {
    //   modifiedKhaiThac.tau_tongcongsuatmaychinh = 0;
    // }
    
    // if (modifiedKhaiThac.chuyenbien_so === '') {
    //   modifiedKhaiThac.chuyenbien_so = 0;
    // }
    // if (modifiedKhaiThac.nam === '') {
    //   modifiedKhaiThac.nam = 0;
    // }
    // if (modifiedKhaiThac.tongsolaodong === '') {
    //   modifiedKhaiThac.tongsolaodong = 0;
    // }
    // if (modifiedKhaiThac.songaykhaithac === '') {
    //   modifiedKhaiThac.songaykhaithac = 0;
    // }
    // if (modifiedKhaiThac.so_meluoi === '') {
    //   modifiedKhaiThac.so_meluoi = 0;
    // }
    // if (modifiedKhaiThac.tongsanluong === '') {
    //   modifiedKhaiThac.tongsanluong = 0;
    // }
    // if (modifiedKhaiThac.songayhoatdong === '') {
    //   modifiedKhaiThac.songayhoatdong = 0;
    // }

    console.log('modifiedKhaiThac:', JSON.stringify(modifiedKhaiThac, null, 2));

    return modifiedKhaiThac;
  };

  // check ko có wifi thì update local
  const handleUpdateDiaryLocal = async () => {
    const dataForm = {...data02b_PLIIb};
    dataForm.dairyname = titleForm02b_PLIIb;
    const result = await Storage.getItem('form02b_PLIIb');
    if (result !== null) {
      const data = JSON.parse(result);
      data[id] = dataForm;
      await Storage.setItem('form02b_PLIIb', JSON.stringify(data));
      console.log('STORAGE:', JSON.stringify(data, null, 2));
    }
    ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
    // setData02b_PLIIb(data02b_PLIIbEmpty);
    setGoBackAlert(true);
  };

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
              netInfo.isConnected ? handleUpdate() : handleUpdateDiaryLocal();
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
          onPress={ async () => {
            let dataFix = data02b_PLIIb;
            dataFix.dairyname = 'filemau';
            const exportPDF = await ExportPDF(dataFix);
            console.log(exportPDF);
             if(exportPDF)
              navigation.navigate('ViewPDF')
            else
              Alert.alert('Thất bại', `không thể xem file pdf`);

          }}
        >
          <Text style={styles.actionText}>Xem mẫu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionExportPDF, styles.button]}
          onPress={async() => {
            if(!netInfo.isConnected){
              ToastAndroid.show('Vui lòng kết nối internet.', ToastAndroid.SHORT);
              return;
            }
            let dataFix = data02b_PLIIb;
            dataFix.dairyname = 'filemau';
            const exportPDF = await ExportPDF(dataFix);
            if(exportPDF==true)
              uploadFile(`/storage/emulated/0/Android/data/com.khanhhoiapp/files/pdf/filemau.pdf`);
            else
              Alert.alert('Thất bại', `không thể xuất file pdf`);
          }}
        >
          <Text style={styles.actionText}>Xuất file</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView>
      {/* <HeaderView/> */}
      {/* <TongCucThuySanView /> */}
      {/* <ChiTietNhomKhaiThac/> */}
      {/* <TableCangca2/> */}
      <View style={{backgroundColor:'#fff'}}>
      {_renderActionView()}

      </View>
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
        initialValue={initialTitle}
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
    backgroundColor:'#fff'
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