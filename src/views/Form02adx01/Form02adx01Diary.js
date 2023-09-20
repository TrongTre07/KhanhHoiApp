import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useEffect, useState, useCallback} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {ExportPDF0201} from './pdfForm0201/ExportPDF';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';
import Storage from '../../utils/storage';
import {PrintfPDF, PrintfPDF0201} from './pdfForm0201/PrintfPDF';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
const Form02adx01Diary = ({navigation}) => {
  const [dataDiary, setDataDiary] = useState([]);

  const {
    getDiaryForm0201,
    deleteForm0201Id,
    dataInfShip,
    isLoggedIn,
    getDetailForm0201Id,
    data0201,
    setData0201,
    checkViewPDF,
    setCheckViewPDF,
    isPDFLoading,
    setIsPDFLoading,
  } = useContext(UserContext);

  const netInfo = useNetInfo();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setDataDiary([]);
    }
  }, [isLoggedIn]);

  const fetchdata = async () => {
    //sap xep lai danh sach theo thoi gian update
    setRefreshing(true);
    const rawDiary = await getDiaryForm0201();
    try {
      if (rawDiary != undefined) {
        await rawDiary.sort(sortListForm);
      }
      setDataDiary(rawDiary);
      setRefreshing(false);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  const sortListForm = (a, b) => {
    let a_date;
    if (new Date(a.date_create) > new Date(a.date_modified)) {
      a_date = new Date(a.date_create);
    } else {
      a_date = new Date(a.date_modified);
    }
    let b_date;
    if (new Date(b.date_create) > new Date(b.date_modified)) {
      b_date = new Date(b.date_create);
    } else {
      b_date = new Date(b.date_modified);
    }
    const dateA = new Date(a_date);
    const dateB = new Date(b_date);
    return dateA - dateB;
  };

  const getDataLocal = async () => {
    const result = await Storage.getItem('form02adx01');
    if (result !== null) {
      const data = JSON.parse(result);
      setDataDiary(data);
    }
  };

  // nếu có wifi, gọi app lấy danh sách từ server
  // nếu không có wifi, lấy data từ local
  useFocusEffect(
    React.useCallback(() => {
      if (netInfo.isConnected) fetchdata();
      else getDataLocal();
    }, [netInfo.isConnected]),
  );

  const handleDelete = id => {
    Alert.alert(
      'Xác nhận xoá',
      'Bạn có chắc chắn muốn xoá dữ liệu này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xoá',
          onPress: async () => {
            setIsPDFLoading(true);
            await deleteForm0201Id(id);
            fetchdata();
            setIsPDFLoading(false);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleDeleteFormLocal = index => {
    Alert.alert(
      'Xác nhận xoá',
      'Bạn có chắc chắn muốn xoá dữ liệu này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xoá',
          onPress: async () => {
            // delete object at index
            const newData = [...dataDiary];
            newData.splice(index, 1);
            await Storage.setItem('form02adx01', JSON.stringify(newData)); // update lại data vừa xoá
            setDataDiary(newData);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const elementButton = (id, index) => (
    <View style={styles.boxbtn}>
      <TouchableOpacity
        // disabled={true}
        onPress={async () => {
          // if(!netInfo.isConnected){
          //   ToastAndroid.show('Vui lòng kết nối internet.', ToastAndroid.SHORT);
          //   return;
          // }
          // setCheckForm(true);
          // handleGeneratePDF(id);
          setIsPDFLoading(true);
          let dataTemp;
          if (netInfo.isConnected) {
            dataTemp = await getDetailForm0201Id(id);
            dataTemp.dairy_name = 'filemau';
          } else {
            const result = await Storage.getItem('form02adx01');
            if (result !== null) {
              const dataLocal = JSON.parse(result);
              dataTemp = dataLocal[index];
              dataTemp.dairy_name = 'filemau';
            }
          }
          const result = await ExportPDF0201(dataTemp);
          setIsPDFLoading(false);
          result
            ? navigation.navigate('ViewPDF', {data: dataTemp,nameParams:'MẤU NHẬT KÝ THU MUA, CHUYỂN TẢI THỦY SẢN'})
            : Alert.alert('Thất bại', `không thể xem file pdf`);
        }}>
        <View style={[styles.btn, {backgroundColor: '#99FF33'}]}>
          <Text style={styles.btnText}>Xem</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('form02adx01', {
            id: !netInfo.isConnected ? index : id,
          })
        }>
        <View style={[styles.btn, {backgroundColor: '#00FFFF'}]}>
          <Text style={styles.btnText}>Sửa</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          // if(!netInfo.isConnected){
          //   ToastAndroid.show('Vui lòng kết nối internet.', ToastAndroid.SHORT);
          //   return;
          // }
          // handleGeneratePDF(id);
          setIsPDFLoading(true);
          let tempData;
          if (netInfo.isConnected) {
            tempData = await getDetailForm0201Id(id);
            tempData.dairy_name = tempData.dairy_name + '_' +
            Math.floor(Math.random() * 100000);
          } else {
            const result = await Storage.getItem('form02adx01');
            if (result !== null) {
              const dataLocal = JSON.parse(result);
              tempData = dataLocal[index];
              tempData.dairy_name = tempData.dairy_name + '_' +
              Math.floor(Math.random() * 100000);
            }
          }
          if (tempData) ExportPDF0201(tempData);
          else Alert.alert('Thất bại', `không thể tải file pdf`);
          setIsPDFLoading(false);
        }}>
        <View style={[styles.btn, {backgroundColor: '#FF99FF'}]}>
          <Text style={styles.btnText}>Tải xuống</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          !netInfo.isConnected
            ? handleDeleteFormLocal(index)
            : handleDelete(id);
        }}>
        <View style={[styles.btn, {backgroundColor: '#FF3333'}]}>
          <Text style={styles.btnText}>Xoá</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          // if(!netInfo.isConnected){
          //   ToastAndroid.show('Vui lòng kết nối internet.', ToastAndroid.SHORT);
          //   return;
          // }
          // handerlePrintPDF(id)
          setIsPDFLoading(true);
          let tempData;
          if (netInfo.isConnected) {
            tempData = await getDetailForm0201Id(id);
          } else {
            const result = await Storage.getItem('form02adx01');
            if (result !== null) {
              const dataLocal = JSON.parse(result);
              tempData = dataLocal[index];
            }
          }
          console.log('tempData: ', tempData);
          if (tempData) PrintfPDF0201(tempData);
          else Alert.alert('Thất bại', `không thể in file pdf`);
          setIsPDFLoading(false);
        }}>
        <View style={[styles.btn, {backgroundColor: '#C0C0C0'}]}>
          <Text style={styles.btnText}>In</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  //data
  const selectedData = dataDiary?.map((item, index) => [
    index,
    item.dairy_name,
    item.tau_bs,
    item.ten_thuyentruong,
    item.chuyenbien_so,
    !item.date_create
      ? ''
      : moment(item.date_create).format('DD/MM/YYYY HH:mm'),
    !item.date_modified
      ? ''
      : moment(item.date_modified).format('DD/MM/YYYY HH:mm'),
    elementButton(item.id, index),
  ]);

  //colum
  let state = {
    tableHead: [
      'STT',
      'Tên',
      'Số tàu',
      'Thuyền trưởng',
      'Chuyến biển số',
      'Ngày tạo',
      'Sửa đổi lần cuối',
      'Thao tác',
    ],
    tableColum: selectedData,
  };

  return (
    <View style={styles.container}>
      <ScrollView
        // onRefresh={fetchdata}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchdata()}
          />
        }>
        <Table borderStyle={{borderWidth: 1}}>
          <Row
            data={state.tableHead}
            flexArr={[0.8, 1, 2, 1.5, 1.5, 2, 2, 3.5]}
            style={styles.head}
            textStyle={styles.textHead}
          />
          <TableWrapper style={styles.wrapper}>
            <Rows
              data={state.tableColum}
              flexArr={[0.8, 1, 2, 1.5, 1.5, 2, 2, 3.5]}
              style={styles.row}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </ScrollView>
      <Spinner
        visible={isPDFLoading}
        textContent={'Đang tải...'}
        color="blue"
        textStyle={styles.spinnerText}
      />
    </View>
  );
};

export default Form02adx01Diary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:16,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  head: {
    backgroundColor: '#3333FF',
  },
  wrapper: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  text: {
    textAlign: 'center',
    padding: 3,
    fontSize: 11,
    color: '#000',
  },
  textHead: {
    textAlign: 'center',
    alignSelf: 'center',
    padding: 3,
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },
  btn: {
    borderRadius: 8,
    margin: 3,
  },
  boxbtn: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 3,
  },
  btnText: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
});
