import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomDatePicker from '../others/CustomDatePicker';
import moment from 'moment';
import {useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import makeid from '../others/makeid';
import CustomDateTimePicker from '../others/CustomDateTimePicker';
import stylesOutLine from '../../utils/stylesOutLine';

const widthTT = 60;
const widthSoDkTauca = 200;
const widthThoiGian = 200;
const widthToaDo = 150;
const widthLoai = 100;
const widthTongKhoiLuong = 200;
const widthTongKhoiLuongTong = widthToaDo * 5 + widthTT + widthSoDkTauca;

const ThongTinVeHoatDongChuyenTai = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const {data0101, setData0101} = useContext(UserContext);

  const moment = require('moment');
  const handleThemDong = () => {
    try {
      const objectAdd = {
        id: makeid(7),
        methu: '1',
        thoidiem_tha: moment().format('YYYY-MM-DDTHH:mm'),
        vido_tha: '',
        kinhdo_tha: '',
        thoidiem_thu: moment().format('YYYY-MM-DDTHH:mm'),
        vido_thu: '',
        kinhdo_thu: '',
        loai_1: '',
        loai_2: '',
        loai_3: '',
        loai_4: '',
        loai_5: '',
        loai_6: '',
        loai_7: '',
        loai_8: '',
        loai_9: '',
        loai_1_kl: '',
        loai_2_kl: '',
        loai_3_kl: '',
        loai_4_kl: '',
        loai_5_kl: '',
        loai_6_kl: '',
        loai_7_kl: '',
        loai_8_kl: '',
        loai_9_kl: '',
        tongsanluong: '',
      };

      // Add objectAdd to the thumua array
      const updatedData0101 = {...data0101};

      //create se khong co field isdelete, get ve de update thi se co field isdelete
      // if (updatedData0101.thumua[0].isdelete != undefined) {
      //   //trong scope nay la update
      //   objectAdd.id = 0;
      // }
      if (updatedData0101.thumua) {
        updatedData0101.thumua.push(objectAdd);
      }

      setData0101(updatedData0101);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleXoaDong = () => {
    try {
      let lastObject = data0101.thumua.length;
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      data0101.thumua.map(item => {
        if (item.hasOwnProperty('isdelete') && item.isdelete == 1) {
          lastObject -= 1;
        }
      });
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      const itemToRemove = data0101.thumua[selectedItemIndex];
      if (itemToRemove) {
        if (itemToRemove.hasOwnProperty('isdelete')) {
          itemToRemove.isdelete = 1;
          // Update data0101 with the modified itemToRemove
          const updatedData0101 = {
            ...data0101,
            thumua: data0101.thumua.map(item =>
              item.id === itemToRemove.id ? itemToRemove : item,
            ),
          };
          setData0101(updatedData0101);
        } else {
          // Item doesn't have isdelete field, remove it by filtering
          const updatedThumua = data0101.thumua.filter(
            item => item.id !== itemToRemove.id,
          );

          const updatedData0101 = {
            ...data0101,
            thumua: updatedThumua,
          };

          setData0101(updatedData0101);
        }
      } else {
        Alert.alert('Cần chọn dòng', '', [{text: 'OK'}]);
      }
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChonItem = index => {
    console.log('index; ', index);
    setSelectedItemIndex(index);
  };

  const handleChangeViDo = (text, id) => {
    try {
      const updatedData0101 = {...data0101};

      updatedData0101.thumua = updatedData0101.thumua.map(item => {
        if (item.id === id) {
          return {...item, tm_ct_vt_vido: text};
        }
        return item;
      });

      setData0101(updatedData0101);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeKinhDo = (text, id) => {
    try {
      const updatedData0101 = {...data0101};

      updatedData0101.thumua = updatedData0101.thumua.map(item => {
        if (item.id === id) {
          return {...item, tm_ct_vt_kinhdo: text};
        }
        return item;
      });

      setData0101(updatedData0101);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeTenLoai = (text, id) => {
    try {
      const updatedData0101 = {...data0101};

      updatedData0101.thumua = updatedData0101.thumua.map(item => {
        if (item.id === id) {
          return {...item, daban_ct_loai: text};
        }
        return item;
      });

      setData0101(updatedData0101);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeKhoiLuong = (text, id) => {
    try {
      const updatedData0101 = {...data0101};

      updatedData0101.thumua = updatedData0101.thumua.map(item => {
        if (item.id === id) {
          return {...item, daban_ct_khoiluong: text};
        }
        return item;
      });

      setData0101(updatedData0101);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeDate = (date, id) => {
    try {
      // Create a copy of data0101
      const updatedData0101 = {...data0101};

      // Map over the thumua array inside data0101 and update the relevant property
      updatedData0101.thumua = updatedData0101.thumua.map(item => {
        if (item.id === id) {
          // Update the specific property
          return {
            ...item,
            ngaythang: moment(date).format('YYYY-MM-DDTHH:mm'),
          };
        }
        return item;
      });

      setData0101(updatedData0101);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeSoDkTau = (soDk, id) => {
    try {
      const updatedData0101 = {...data0101};
      updatedData0101.thumua = updatedData0101.thumua.map(item => {
        if (item.id === id) {
          return {...item, tm_ct_bstau: soDk};
        }
        return item;
      });

      setData0101(updatedData0101);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };
  const handleChangeGPKT = (soGPKT, id) => {
    try {
      const updatedData0101 = {...data0101};
      updatedData0101.thumua = updatedData0101.thumua.map(item => {
        if (item.id === id) {
          return {...item, tm_ct_gpkt: soGPKT};
        }
        return item;
      });

      setData0101(updatedData0101);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const calculateTongKhoiLuong = fieldName => {
    try {
      let total = 0;

      data0101.thumua.forEach(item => {
        if (item[fieldName] && item.isdelete != 1) {
          total += parseFloat(item[fieldName]); // Convert to float to ensure proper addition
        }
      });

      return total;
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const KetQuaThuMuaItem = ({item, index}) => {
    try {
      let countIsDelete = 0;
      const rootIndex = index;
      let checkIsDeleted;
      if (item.isdelete == 1) {
        checkIsDeleted = true;
      } else {
        for (i = 0; i <= index; i++) {
          if (data0101.thumua[i].isdelete && data0101.thumua[i].isdelete == 1) {
            countIsDelete++;
          }
        }
        index -= countIsDelete;
      }

      const isSelected = selectedItemIndex === rootIndex;
      if (checkIsDeleted) {
        return null;
      }
      return (
        <Pressable
          key={item.id}
          onPress={() => handleChonItem(rootIndex)}
          style={[
            {flexDirection: 'row', backgroundColor: 'white'},
            isSelected && {backgroundColor: '#badeda'},
          ]}>
          <Text style={styles.textTT}>{index + 1}</Text>

          {/* Picker ngay */}
          <View
            style={[
              styles.inputNgay,
              {
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              },
            ]}>
            <TextInput
              keyboardType="numeric"
              style={styles.textDate}
              value={moment(item.ngaythang).format('DD/MM/YYYY')}
              onChangeText={text => handleChangeDate(text, item.id)}
            />
            <CustomDatePicker
              onDateChange={date => {
                handleChangeDate(date, item.id);
              }}
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.tm_ct_bstau}
              onChangeText={text => handleChangeSoDkTau(text, item.id)}
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.tm_ct_gpkt}
              onChangeText={text => handleChangeGPKT(text, item.id)}
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.tm_ct_vt_vido}
              onChangeText={text => handleChangeViDo(text, item.id)}
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.tm_ct_vt_kinhdo}
              onChangeText={text => handleChangeKinhDo(text, item.id)}
            />
          </View>

          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.daban_ct_loai}
              onChangeText={text => handleChangeTenLoai(text, item.id)}
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.daban_ct_khoiluong}
              onChangeText={text => handleChangeKhoiLuong(text, item.id)}
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              keyboardType="numeric"
              editable={false}
              value={item.tm_ct_thuyentruong}
            />
          </View>
        </Pressable>
      );
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          lineHeight: 28,
          color: 'black',
          marginVertical: 15,
        }}>
        II. THÔNG TIN VỀ HOẠT ĐỘNG CHUYỂN TẢI (nếu có)
      </Text>
      <ScrollView>
        <ScrollView horizontal={true} style={{}}>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#0ACEF5',
              }}>
              <Text style={styles.textTT}>TT</Text>

              <Text style={styles.textNgayThang}>Ngày, tháng</Text>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.textViTriThuMua}>
                  Thông tin tàu thu mua/chuyển tải
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textToaDo}>Số đăng ký tàu</Text>
                  <Text style={styles.textToaDo}>Số giấy phép khai thác</Text>
                </View>
              </View>

              <View style={{flexDirection: 'column'}}>
                <Text style={styles.textViTriThuMua}>
                  Vị trí thu mua/chuyển tải
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textToaDo}>Vĩ độ</Text>
                  <Text style={styles.textToaDo}>Kinh độ</Text>
                </View>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.textViTriThuMua}>Đã bán/chuyển tải</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textToaDo}>Tên loài thủy sản</Text>
                  <Text style={styles.textToaDo}>Khối lượng (kg)</Text>
                </View>
              </View>

              <Text style={styles.textTongKhoiLuong}>
                {' '}
                Thuyền trưởng tàu thu mua/chuyển tải (ký, ghi gõ họ tên)
              </Text>
            </View>
            {/* <View style={{flexDirection: 'column'}}>
                {thumua.map((item, index) => (
                  <View key={item.id}>
                    <KetQuaThuMuaItem item={item} index={index} key={index} />
                  </View>
                ))}
              </View> */}
            <FlatList
              data={data0101.thumua}
              renderItem={KetQuaThuMuaItem}
              keyExtractor={item => item.id}
            />
            <View style={{flexDirection: 'row', height: 50}}>
              <Text style={styles.textTongKhoiLuongTong}>Tổng khối lượng</Text>

              <Text style={styles.textTongKhoiLuong}>
                {calculateTongKhoiLuong('daban_ct_khoiluong')}
              </Text>
              <View style={styles.textTongKhoiLuong} />
            </View>
          </View>
        </ScrollView>

        <View style={{flexDirection: 'row'}}>
          <Pressable
            style={styles.btnThemDong}
            onPress={() => handleThemDong()}>
            <Text style={styles.textBtn}>Thêm dòng</Text>
          </Pressable>
          <Pressable style={styles.btnXoaDong} onPress={() => handleXoaDong()}>
            <Text style={styles.textBtn}>Xóa dòng</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default ThongTinVeHoatDongChuyenTai;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  btnThemDong: {
    backgroundColor: '#3b82f6',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 50,
    borderWidth: 0.1,
    borderRadius: 10,
    margin: 10,
  },
  btnXoaDong: {
    backgroundColor: '#ef4444',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 50,
    borderWidth: 0.1,
    borderRadius: 10,
    margin: 10,
  },
  text: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    borderColor: '#0099FF',
    borderWidth: 0,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textBtn: {
    fontWeight: '200',
    fontSize: 18,
    lineHeight: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  textKhoiLuong: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    borderColor: '#0099FF',
    borderWidth: 1,
    width: widthLoai,
    height: 40,
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textKhoiLuongTong: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    borderColor: '#0099FF',
    borderWidth: 1,
    width: widthLoai,
    height: 50,
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },

  textKhoiLuongThuySanDaMua: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    borderColor: '#0099FF',
    borderWidth: 1,
    width: 600,
    height: 40,
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textViTriThuMua: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    borderColor: '#0099FF',
    borderWidth: 1,
    width: 300,
    height: 80,
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textToaDo: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    borderColor: '#0099FF',
    borderWidth: 1,
    width: widthToaDo,
    height: 55,
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textNgayThang: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    borderColor: '#0099FF',
    borderWidth: 1,
    width: widthSoDkTauca,
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textTT: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    borderColor: '#0099FF',
    borderWidth: 1,
    width: widthTT,
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textSoDkTauCa: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    borderColor: '#0099FF',
    borderWidth: 1,
    width: widthSoDkTauca,
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textTongKhoiLuong: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    borderColor: '#0099FF',
    borderWidth: 1,
    width: widthToaDo,
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textTongKhoiLuongTong: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    borderColor: '#0099FF',
    borderWidth: 1,
    width: widthTongKhoiLuongTong,
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textDate: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    borderColor: '#0099FF',
    borderWidth: 0,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  inputKhoiLuong: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    backgroundColor: 'white',
    color: 'black',
    width: 100,
    borderWidth: 1,
    borderColor: '#0099FF',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  inputToaDo: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,

    color: 'black',
    width: widthToaDo,
    borderWidth: 1,
    borderColor: '#0099FF',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  inputKhoiLuongLoai: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,

    color: 'black',
    width: widthLoai,
    borderWidth: 1,
    borderColor: '#0099FF',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  inputNgay: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,

    color: 'black',
    width: widthSoDkTauca,
    borderWidth: 1,
    borderColor: '#0099FF',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
