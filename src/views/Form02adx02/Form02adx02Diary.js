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
import {ExportPDF0202} from './pdfForm0202/ExportPDF';
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

import moment from 'moment';
import {PrintfPDF0202} from './pdfForm0202/PrintfPDF';
import Spinner from 'react-native-loading-spinner-overlay';
const Form02adx02Diary = ({navigation}) => {
  const [dataDiary, setDataDiary] = useState([]);

  const {
    getDiaryForm0202,
    deleteForm0202Id,
    getDetailForm0202Id,
    isLoggedIn,
    setIsPDFLoading,
    isPDFLoading,
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
    const rawDiary = await getDiaryForm0202();
    try {
      if (rawDiary != undefined) {
        await rawDiary.sort(sortListForm);
      }
      setDataDiary(rawDiary);
      setRefreshing(false);
    } catch (error) {}
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
    const result = await Storage.getItem('form02adx02');
    if (result !== null) {
      const data = JSON.parse(result);
      setDataDiary(data);
    }
  };

  // nếu có wifi, gọi app lấy danh sách từ server
  // nếu không có wifi, lấy data từ local
  useFocusEffect(
    useCallback(() => {
      if (netInfo.isConnected) fetchdata();
      else getDataLocal();
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
            await deleteForm0202Id(id);
            fetchdata();
            setIsPDFLoading(false)
          },
        },
      ],
      {cancelable: false},
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
            await Storage.setItem('form02adx02', JSON.stringify(newData)); // update lại data vừa xoá
            setDataDiary(newData);
          },
        },
      ],
      {cancelable: false},
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
            dataTemp = await getDetailForm0202Id(id);
            dataTemp.dairy_name = 'filemau';
          } else {
            const result = await Storage.getItem('form02adx02');
            if (result !== null) {
              const dataLocal = JSON.parse(result);
              dataTemp = dataLocal[index];
              dataTemp.dairy_name = 'filemau';
            }
          }
          const result = await ExportPDF0202(dataTemp);
          setIsPDFLoading(false)
          result
            ? navigation.navigate('ViewPDF',{data:dataTemp,nameParams:'Mẫu Giấy biên nhận bốc dỡ qua cảng'})
            : Alert.alert('Thất bại', `không thể xem file pdf`);
        }}>
        <View style={[styles.btn, {backgroundColor: '#99FF33'}]}>
          <Text style={styles.btnText}>Xem</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('form02adx02', {
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
            tempData = await getDetailForm0202Id(id);
            tempData.dairy_name = tempData.dairy_name + '_' +
            Math.floor(Math.random() * 100000);
          } else {
            const result = await Storage.getItem('form02adx02');
            if (result !== null) {
              const dataLocal = JSON.parse(result);
              tempData = dataLocal[index];
              tempData.dairy_name = tempData.dairy_name + '_' +
              Math.floor(Math.random() * 100000);
            }
          }
          if (tempData) ExportPDF0202(tempData);
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
            tempData = await getDetailForm0202Id(id);
          } else {
            const result = await Storage.getItem('form02adx02');
            if (result !== null) {
              const dataLocal = JSON.parse(result);
              tempData = dataLocal[index];
            }
          }
          console.log('tempData: ', tempData);
          if (tempData) PrintfPDF0202(tempData);
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
    let khoiluong = 0;
    item.ls0202ds.forEach(element => {
      khoiluong += Number(element.khoiluong);
    });
    return [
      index,
      item.dairy_name,
      item.biensotau,
      item.tenchutauthuyentruong,
      moment(item.ngaybochang).format('DD/MM/YYYY'),
      khoiluong,
      item.nguoithumua,
      item.hinhthucbansp,
      moment(item.datecreate).format('DD/MM/YYYY HH:mm'),
      !item.dateedit ? '' : moment(item.dateedit).format('DD/MM/YYYY HH:mm'),
      elementButton(item.dairyid, index),
    ];
  });

  //colum
  let state = {
    tableHead: [
      'TT',
      'Tên',
      'Số tàu',
      'Thuyền trưởng',
      'Ngày bốc dỡ qua cảng',
      'Tổng khối lượng (kg)',
      'Người thu mua',
      'Hình thức bán sản phẩm',
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
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchdata()}
          />
        }>
        <Table borderStyle={{borderWidth: 1}}>
          <Row
            data={state.tableHead}
            flexArr={[0.8, 4, 2, 2, 2, 2, 2, 2, 2, 2, 4]}
            style={styles.head}
            textStyle={styles.textHead}
          />
          <TableWrapper style={styles.wrapper}>
            <Rows
              data={state.tableColum}
              flexArr={[0.8, 4, 2, 2, 2, 2, 2, 2, 2, 2, 4]}
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

export default Form02adx02Diary;

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
    fontSize: 14,
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
