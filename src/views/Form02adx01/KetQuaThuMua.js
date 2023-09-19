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
import stylesOutLine from '../../utils/stylesOutLine';

const widthTT = 60;
const widthSoDkTauca = 200;
const widthThoiGian = 200;
const widthToaDo = 150;
const widthLoai = 100;
const widthTongKhoiLuong = 200;
const widthTongKhoiLuongTong =
  widthToaDo * 2 + widthTT + widthSoDkTauca + widthThoiGian;

const KetQuaThuMua = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const {data0201, setData0201} = useContext(UserContext);

  const moment = require('moment');

  const handleThemDong = () => {
    try {
      const objectAdd = {
        id: makeid(7),
        ngaythang: moment().format('YYYY-MM-DD'),
        id_tau: '',
        tau_bs: '',
        tm_ct_vt_vido: '',
        tm_ct_vt_kinhdo: '',
        loai_1: '',
        loai_2: '',
        loai_3: '',
        loai_4: '',
        loai_5: '',
        loai_6: '',
        loai_1_kl: '',
        loai_2_kl: '',
        loai_3_kl: '',
        loai_4_kl: '',
        loai_5_kl: '',
        loai_6_kl: '',
        tongsanluong: '',
      };

      // Add objectAdd to the thumua array
      const updatedData0201 = {...data0201};

      //create se khong co field isdelete, get ve de update thi se co field isdelete
      // if (updatedData0201.thumua[0].isdelete != undefined) {
      //   //trong scope nay la update
      //   objectAdd.id = 0;
      // }
      if (updatedData0201.thumua) {
        updatedData0201.thumua.push(objectAdd);
      }

      setData0201(updatedData0201);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleXoaDong = () => {
    try {
      let lastObject = data0201.thumua.length;
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      data0201.thumua.map(item => {
        if (item.hasOwnProperty('isdelete') && item.isdelete == 1) {
          lastObject -= 1;
        }
      });
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      const itemToRemove = data0201.thumua[selectedItemIndex];
      if (itemToRemove) {
        if (itemToRemove.hasOwnProperty('isdelete')) {
          itemToRemove.isdelete = 1;
          // Update data0201 with the modified itemToRemove
          const updatedData0201 = {
            ...data0201,
            thumua: data0201.thumua.map(item =>
              item.id === itemToRemove.id ? itemToRemove : item,
            ),
          };
          setData0201(updatedData0201);
        } else {
          // Item doesn't have isdelete field, remove it by filtering
          const updatedThumua = data0201.thumua.filter(
            item => item.id !== itemToRemove.id,
          );

          const updatedData0201 = {
            ...data0201,
            thumua: updatedThumua,
          };

          setData0201(updatedData0201);
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
      const updatedData0201 = {...data0201};

      updatedData0201.thumua = updatedData0201.thumua.map(item => {
        if (item.id === id) {
          return {...item, tm_ct_vt_vido: text};
        }
        return item;
      });

      setData0201(updatedData0201);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeKinhDo = (text, id) => {
    try {
      const updatedData0201 = {...data0201};

      updatedData0201.thumua = updatedData0201.thumua.map(item => {
        if (item.id === id) {
          return {...item, tm_ct_vt_kinhdo: text};
        }
        return item;
      });

      setData0201(updatedData0201);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeKhoiLuongLoai = (khoiluong, id, loai) => {
    try {
      // Create a copy of data0201
      const updatedData0201 = {...data0201};

      // Map over the thumua array inside data0201 and update the relevant item
      updatedData0201.thumua = updatedData0201.thumua.map(item => {
        if (item.id === id && item.isdelete != 1) {
          // Update the specific property based on 'loai'
          if (loai === 'loai_1_kl') {
            item.loai_1_kl = khoiluong;
          } else if (loai === 'loai_2_kl') {
            item.loai_2_kl = khoiluong;
          } else if (loai === 'loai_3_kl') {
            item.loai_3_kl = khoiluong;
          } else if (loai === 'loai_4_kl') {
            item.loai_4_kl = khoiluong;
          } else if (loai === 'loai_5_kl') {
            item.loai_5_kl = khoiluong;
          } else if (loai === 'loai_6_kl') {
            item.loai_6_kl = khoiluong;
          }

          // Calculate the new total sanluong
          const newTongSanLuong =
            (parseInt(item.loai_1_kl) || 0) +
            (parseInt(item.loai_2_kl) || 0) +
            (parseInt(item.loai_3_kl) || 0) +
            (parseInt(item.loai_4_kl) || 0) +
            (parseInt(item.loai_5_kl) || 0) +
            (parseInt(item.loai_6_kl) || 0);

          // Update the 'tongsanluong' property
          item.tongsanluong = newTongSanLuong.toString();

          return item;
        }
        return item;
      });

      // Update data0201 with the modified thumua
      setData0201(updatedData0201);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };
  const handleChangeLoai = (text, loai) => {
    try {
      const updatedData0201 = {...data0201};

      updatedData0201.thumua = updatedData0201.thumua.map(item => ({
        ...item,
        [loai]: text,
      }));

      // Update data0201 with the modified thumua
      setData0201(updatedData0201);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeDate = (date, id) => {
    try {
      // Create a copy of data0201
      const updatedData0201 = {...data0201};

      // Map over the thumua array inside data0201 and update the relevant property
      updatedData0201.thumua = updatedData0201.thumua.map(item => {
        if (item.id === id) {
          // Update the specific property
          return {...item, ngaythang: moment(date).format('YYYY-MM-DD')};
        }
        return item;
      });

      // Update data0201 with the modified thumua
      setData0201(updatedData0201);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeSoDkTau = (soDk, id) => {
    try {
      // Create a copy of data0201
      const updatedData0201 = {...data0201};

      // Map over the thumua array inside data0201 and update the relevant property
      updatedData0201.thumua = updatedData0201.thumua.map(item => {
        if (item.id === id) {
          return {...item, tau_bs: soDk};
        }
        return item;
      });

      // Update data0201 with the modified thumua
      setData0201(updatedData0201);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const calculateTongKhoiLuong = fieldName => {
    try {
      let total = 0;

      data0201.thumua.forEach(item => {
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
          if (data0201.thumua[i].isdelete && data0201.thumua[i].isdelete == 1) {
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
          key={index}
          onPress={() => handleChonItem(rootIndex)}
          style={[
            {flexDirection: 'row', backgroundColor: 'white'},
            isSelected && {backgroundColor: '#badeda'},
          ]}>
          <Text style={styles.textTT}>{index + 1}</Text>

          <View style={stylesOutLine.outlineForm0201_tauca}>
            <TextInput
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.tau_bs}
              onChangeText={text => handleChangeSoDkTau(text, item.id)}
            />
          </View>
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
              onDateChange={date => handleChangeDate(date, item.id)}
            />
          </View>

          <View style={stylesOutLine.outlineForm0201_toado}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.tm_ct_vt_vido}
              onChangeText={text => handleChangeViDo(text, item.id)}
            />
          </View>

          <View style={stylesOutLine.outlineForm0201_toado}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.tm_ct_vt_kinhdo}
              onChangeText={text => handleChangeKinhDo(text, item.id)}
            />
          </View>

          <View style={stylesOutLine.outlineForm0201_loai}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.loai_1_kl}
              onChangeText={text =>
                handleChangeKhoiLuongLoai(text, item.id, 'loai_1_kl')
              }
            />
          </View>
          <View style={stylesOutLine.outlineForm0201_loai}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.loai_2_kl}
              onChangeText={text =>
                handleChangeKhoiLuongLoai(text, item.id, 'loai_2_kl')
              }
            />
          </View>
          <View style={stylesOutLine.outlineForm0201_loai}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.loai_3_kl}
              onChangeText={text =>
                handleChangeKhoiLuongLoai(text, item.id, 'loai_3_kl')
              }
            />
          </View>
          <View style={stylesOutLine.outlineForm0201_loai}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.loai_4_kl}
              onChangeText={text =>
                handleChangeKhoiLuongLoai(text, item.id, 'loai_4_kl')
              }
            />
          </View>
          <View style={stylesOutLine.outlineForm0201_loai}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.loai_5_kl}
              onChangeText={text =>
                handleChangeKhoiLuongLoai(text, item.id, 'loai_5_kl')
              }
            />
          </View>
          <View style={stylesOutLine.outlineForm0201_loai}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.loai_6_kl}
              onChangeText={text =>
                handleChangeKhoiLuongLoai(text, item.id, 'loai_6_kl')
              }
            />
          </View>

          <Text style={styles.textTongKhoiLuong}>{item.tongsanluong}</Text>
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
          fontSize: 22,
          lineHeight: 28,
          color: 'black',
          marginVertical: 15,
        }}>
        A. KẾT QUẢ THU MUA, CHUYỂN TẢI CẢU CHUYẾN BIỂN
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

              <Text style={styles.textSoDkTauCa}>Số đăng ký tàu cá</Text>
              <Text style={styles.textNgayThang}>
                Thời gian {'\n'} (ngày, tháng, năm)
              </Text>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.textViTriThuMua}>
                  Vị trí thu mua, chuyển tải
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textToaDo}>Vĩ độ</Text>
                  <Text style={styles.textToaDo}>Kinh độ</Text>
                </View>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.textKhoiLuongThuySanDaMua}>
                  Khối lượng loài thủy sản đã thu mua, chuyển tải (kg)
                </Text>
                <View style={{flexDirection: 'row'}}>
                  {/* View Loai 1 */}
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textKhoiLuong}>Loài</Text>
                    <TextInput
                      style={[
                        styles.inputKhoiLuong,
                        {backgroundColor: 'white'},
                      ]}
                      value={data0201.thumua[0].loai_1}
                      onChangeText={text =>
                        handleChangeLoai(text, 'loai_1')
                      }></TextInput>
                  </View>
                  {/* View Loài 2 */}
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textKhoiLuong}>Loài</Text>
                    <TextInput
                      style={[
                        styles.inputKhoiLuong,
                        {backgroundColor: 'white'},
                      ]}
                      value={data0201.thumua[0].loai_2}
                      onChangeText={text =>
                        handleChangeLoai(text, 'loai_2')
                      }></TextInput>
                  </View>
                  {/* View Loài 3 */}
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textKhoiLuong}>Loài</Text>
                    <TextInput
                      style={[
                        styles.inputKhoiLuong,
                        {backgroundColor: 'white'},
                      ]}
                      value={data0201.thumua[0].loai_3}
                      onChangeText={text =>
                        handleChangeLoai(text, 'loai_3')
                      }></TextInput>
                  </View>
                  {/* View Loài 4 */}
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textKhoiLuong}>Loài</Text>
                    <TextInput
                      style={[
                        styles.inputKhoiLuong,
                        {backgroundColor: 'white'},
                      ]}
                      value={data0201.thumua[0].loai_4}
                      onChangeText={text =>
                        handleChangeLoai(text, 'loai_4')
                      }></TextInput>
                  </View>
                  {/* View Loài 5 */}
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textKhoiLuong}>Loài</Text>
                    <TextInput
                      style={[
                        styles.inputKhoiLuong,
                        {backgroundColor: 'white'},
                      ]}
                      value={data0201.thumua[0].loai_5}
                      onChangeText={text =>
                        handleChangeLoai(text, 'loai_5')
                      }></TextInput>
                  </View>
                  {/* View Loài 6 */}
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textKhoiLuong}>Loài</Text>
                    <TextInput
                      style={[
                        styles.inputKhoiLuong,
                        {backgroundColor: 'white'},
                      ]}
                      value={data0201.thumua[0].loai_6}
                      onChangeText={text =>
                        handleChangeLoai(text, 'loai_6')
                      }></TextInput>
                  </View>
                </View>
              </View>
              <Text style={styles.textTongKhoiLuong}>Tổng khối lượng (kg)</Text>
            </View>
            {/* <View style={{flexDirection: 'column'}}>
              {thumua.map((item, index) => (
                <View key={item.id}>
                  <KetQuaThuMuaItem item={item} index={index} key={index} />
                </View>
              ))}
            </View> */}
            <FlatList
              data={data0201.thumua}
              renderItem={KetQuaThuMuaItem}
              keyExtractor={item => item.id}
            />
            <View style={{flexDirection: 'row', height: 50}}>
              <Text style={styles.textTongKhoiLuongTong}>Tổng khối lượng</Text>
              <Text style={styles.textKhoiLuongTong}>
                {calculateTongKhoiLuong('loai_1_kl')}
              </Text>
              <Text style={styles.textKhoiLuongTong}>
                {calculateTongKhoiLuong('loai_2_kl')}
              </Text>
              <Text style={styles.textKhoiLuongTong}>
                {calculateTongKhoiLuong('loai_3_kl')}
              </Text>
              <Text style={styles.textKhoiLuongTong}>
                {calculateTongKhoiLuong('loai_4_kl')}
              </Text>
              <Text style={styles.textKhoiLuongTong}>
                {calculateTongKhoiLuong('loai_5_kl')}
              </Text>
              <Text style={styles.textKhoiLuongTong}>
                {calculateTongKhoiLuong('loai_6_kl')}
              </Text>
              <Text style={styles.textTongKhoiLuong}>
                {calculateTongKhoiLuong('tongsanluong')}
              </Text>
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

export default KetQuaThuMua;

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
    fontSize: 20,
    lineHeight: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  textKhoiLuong: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    borderColor: '#0099FF',
    borderWidth: 0.6,
    width: widthLoai,
    height: 35,
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
    borderWidth: 0.6,
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
    borderWidth: 0.6,
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
    borderWidth: 0.6,
    width: widthToaDo,
    height: 50,
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textNgayThang: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    borderColor: '#0099FF',
    borderWidth: 0.6,
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
    borderWidth: 0.6,
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
    borderWidth: 0.6,
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
    width: widthTongKhoiLuong,
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
    // backgroundColor: 'white',
    color: 'black',
    width: 100,
    borderWidth: 0.6,
    borderColor: '#0099FF',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  inputToaDo: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    // backgroundColor: 'white',
    color: 'black',
    width: widthToaDo,
    borderWidth: 0.6,
    borderColor: '#0099FF',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  inputKhoiLuongLoai: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    // backgroundColor: 'white',
    color: 'black',
    width: widthLoai,
    borderWidth: 0.6,
    borderColor: '#0099FF',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  inputNgay: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    // backgroundColor: 'white',
    color: 'black',
    width: widthSoDkTauca,
    borderWidth: 0.6,
    borderColor: '#0099FF',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
