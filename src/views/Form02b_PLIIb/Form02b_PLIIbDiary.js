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
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { ExportPDF02b_PLIIb } from './pdfForm02b_PLIIb/ExportPDF';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import Storage from '../../utils/storage';

import moment from 'moment';
import { PrintfPDF02b_PLIIb } from './pdfForm02b_PLIIb/PrintfPDF';
import Spinner from 'react-native-loading-spinner-overlay';
const Form02b_PLIIbDiary = ({ navigation }) => {
  const [dataDiary, setDataDiary] = useState([]);

  const {
    getDiaryForm02b_PLIIb,
    deleteForm02b_PLIIb_Id,
    getDetailForm02b_PLIIb_Id,
    isLoggedIn,
    isPDFLoading, setIsPDFLoading
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
    const rawDiary = await getDiaryForm02b_PLIIb();
    try {
      if (rawDiary != undefined) {
        await rawDiary.sort(sortListForm);
      }
      setDataDiary(rawDiary);
      setRefreshing(false);
    } catch (error) { }
  };

  const sortListForm = (a, b) => {
    let a_date;
    if (new Date(a.datecreate) >= new Date(a.dateedit)) {
      a_date = new Date(a.datecreate);
    } else {
      a_date = new Date(a.dateedit);
    }
    let b_date;
    if (new Date(b.datecreate) >= new Date(b.dateedit)) {
      b_date = new Date(b.datecreate);
    } else {
      b_date = new Date(b.dateedit);
    }
    const dateA = new Date(a_date);
    const dateB = new Date(b_date);
    return dateA - dateB;
  };


  const getDataLocal = async () => {
    const result = await Storage.getItem('form02b_PLIIb');
    if (result !== null) {
      const data = JSON.parse(result);
      setDataDiary(data);
    }
  };

  // nếu có wifi, gọi app lấy danh sách từ server
  // nếu không có wifi, lấy data từ local
  useFocusEffect(
    useCallback(() => {
      if (netInfo.isConnected)
         fetchdata();
      else 
         getDataLocal();

    }, [netInfo.isConnected]),
  );

  //delete id server
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
            setIsPDFLoading(true)
            await deleteForm02b_PLIIb_Id(id);
            fetchdata();
            setIsPDFLoading(false)
          },
        },
      ],
      { cancelable: false },
    );
  };

  //delete local
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
            await Storage.setItem('form02b_PLIIb', JSON.stringify(newData)); // update lại data vừa xoá
            setDataDiary(newData);
          },
        },
      ],
      { cancelable: false },
    );

  };

  //btn
  const elementButton = (id, index) => (
    <View style={styles.boxbtn}>
      <TouchableOpacity
        onPress={async () => {
setIsPDFLoading(true)
          let dataTemp;
          if (netInfo.isConnected) {
            dataTemp = await getDetailForm02b_PLIIb_Id(id);
            dataTemp.dairyname = 'filemau';
          } else {
            const result = await Storage.getItem('form02b_PLIIb');
            if (result !== null) {
              const dataLocal = JSON.parse(result);
              dataTemp = dataLocal[index];
              dataTemp.dairyname = 'filemau';
            }
          }
          const result = await ExportPDF02b_PLIIb(dataTemp);
          setIsPDFLoading(false)
          result
            ? navigation.navigate('ViewPDF',{data:dataTemp,nameParams:'Mẫu Thông tin vận tải'})
            : Alert.alert('Thất bại', `không thể xem file pdf`);
        }}>
        <View style={[styles.btn, {backgroundColor: '#99FF33'}]}>
          <Text style={styles.btnText}>Xem</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('form02b_PLIIb', {
            id: !netInfo.isConnected ? index : id,
          })
        }>
        <View style={[styles.btn, {backgroundColor: '#00FFFF'}]}>
          <Text style={styles.btnText}>Sửa</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          setIsPDFLoading(true)
          let tempData;
          if (netInfo.isConnected) {
            tempData = await getDetailForm02b_PLIIb_Id(id);
            tempData.dairyname = tempData.dairyname + '_' +
            Math.floor(Math.random() * 100000);
          } else {
            const result = await Storage.getItem('form02b_PLIIb');
            if (result !== null) {
              const dataLocal = JSON.parse(result);
              tempData = dataLocal[index];
              tempData.dairyname = tempData.dairyname + '_' +
              Math.floor(Math.random() * 100000);
            }
          }
          if (tempData) ExportPDF02b_PLIIb(tempData);
          else Alert.alert('Thất bại', `không thể tải file pdf`);
          setIsPDFLoading(false)
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
          setIsPDFLoading(true)
          let tempData;
          if (netInfo.isConnected) {
            tempData = await getDetailForm02b_PLIIb_Id(id);
          } else {
            const result = await Storage.getItem('form02b_PLIIb');
            if (result !== null) {
              const dataLocal = JSON.parse(result);
              tempData = dataLocal[index];
            }
          }
          console.log('tempData: ', tempData);
          if (tempData) PrintfPDF02b_PLIIb(tempData);
          else Alert.alert('Thất bại', `không thể in file pdf`);
          setIsPDFLoading(false)
        }}>
        <View style={[styles.btn, {backgroundColor: '#C0C0C0'}]}>
          <Text style={styles.btnText}>In</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  //data
  const selectedData = dataDiary?.map((item, index) => {

    return [
    index,
    item.dairyname,
    item.sochungnhan,
    item.quocgiaxuatkhau,
    item.tentau,
    item.sochuyen,
    item.sochuyenbay,
    item.quoctichxevasodangky,
    item.sovanndonduongsat,
    moment(item.datecreate).format('DD/MM/YYYY HH:mm'),
    !item.dateedit?'':moment(item.dateedit).format('DD/MM/YYYY HH:mm'),
    elementButton(item.id, index),
  ]});

  //colum
  let state = {
    tableHead: [
      'TT',
      'Tên',
      'Số chứng nhận',
      'Quốc gia xuất khẩu',
      'Tên tàu',
      'Số chuyến',
      'Số chuyến bay',
      'Quốc tịch xe, số đăng ký',
      'Số vận đơn',
      'Ngày tạo',
      'Sửa đổi lần cuối',
      'Thao tác',
    ],
    tableColum: selectedData,
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        // style={{width:800}}
        vertical={true}
        // onRefresh={fetchdata}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={()=>fetchdata()} />
        }>
        <Table borderStyle={{ borderWidth: 1}}>
          <Row
            data={state.tableHead}
            flexArr={[1,3.5,2,2,2,2,2,2,2,2,2,3 ]}
            style={styles.head}
            textStyle={styles.textHead}
          />
          <TableWrapper style={styles.wrapper}>
            <Rows
              data={state.tableColum}
              flexArr={[1,3.5,2,2,2,2,2,2,2,2,2,3 ]}
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

export default Form02b_PLIIbDiary;

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
    fontSize: 12, 
    color: '#000',
  },
  textHead: {
    textAlign: 'center',
    alignSelf: 'center',
    padding: 3,
    fontSize: 14,
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