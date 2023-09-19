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
const widthLoai = 150;
const widthTongKhoiLuong = 200;
const widthTongKhoiLuongTong = widthToaDo * 4 + widthTT + widthSoDkTauca * 2;

const KetQuaKhaiThac = () => {
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

      // Add objectAdd to the khaithac array
      const updatedData0101 = {...data0101};

      //create se khong co field isdelete, get ve de update thi se co field isdelete
      // if (updatedData0101.khaithac[0].isdelete != undefined) {
      //   //trong scope nay la update
      //   objectAdd.id = 0;
      // }
      if (updatedData0101.khaithac) {
        updatedData0101.khaithac.push(objectAdd);
      }

      setData0101(updatedData0101);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleXoaDong = () => {
    try {
      let lastObject = data0101.khaithac.length;
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      data0101.khaithac.map(item => {
        if (item.hasOwnProperty('isdelete') && item.isdelete == 1) {
          lastObject -= 1;
        }
      });
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      const itemToRemove = data0101.khaithac[selectedItemIndex];
      if (itemToRemove) {
        if (itemToRemove.hasOwnProperty('isdelete')) {
          itemToRemove.isdelete = 1;
          // Update data0101 with the modified itemToRemove
          const updatedData0101 = {
            ...data0101,
            khaithac: data0101.khaithac.map(item =>
              item.id === itemToRemove.id ? itemToRemove : item,
            ),
          };
          setData0101(updatedData0101);
        } else {
          // Item doesn't have isdelete field, remove it by filtering
          const updatedThumua = data0101.khaithac.filter(
            item => item.id !== itemToRemove.id,
          );

          const updatedData0101 = {
            ...data0101,
            khaithac: updatedThumua,
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

  const handleChangeViDoTha = (text, id) => {
    try {
      const updatedData0101 = {...data0101};

      updatedData0101.khaithac = updatedData0101.khaithac.map(item => {
        if (item.id === id) {
          return {...item, vido_tha: text};
        }
        return item;
      });

      setData0101(updatedData0101);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeKinhDoTha = (text, id) => {
    try {
      const updatedData0101 = {...data0101};

      updatedData0101.khaithac = updatedData0101.khaithac.map(item => {
        if (item.id === id) {
          return {...item, kinhdo_tha: text};
        }
        return item;
      });

      setData0101(updatedData0101);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeViDoThu = (text, id) => {
    try {
      const updatedData0101 = {...data0101};

      updatedData0101.khaithac = updatedData0101.khaithac.map(item => {
        if (item.id === id) {
          return {...item, vido_thu: text};
        }
        return item;
      });

      setData0101(updatedData0101);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeKinhDoThu = (text, id) => {
    try {
      const updatedData0101 = {...data0101};

      updatedData0101.khaithac = updatedData0101.khaithac.map(item => {
        if (item.id === id) {
          return {...item, kinhdo_thu: text};
        }
        return item;
      });

      setData0101(updatedData0101);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeKhoiLuongLoai = (khoiluong, id, loai) => {
    try {
      if (khoiluong == '') {
        khoiluong = 0;
      } else if (isNaN(khoiluong)) {
        khoiluong = 0;
      }
      // Create a copy of data0101
      const updatedData0101 = {...data0101};

      // Map over the khaithac array inside data0101 and update the relevant item
      updatedData0101.khaithac = updatedData0101.khaithac.map(item => {
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
          } else if (loai === 'loai_7_kl') {
            item.loai_7_kl = khoiluong;
          } else if (loai === 'loai_8_kl') {
            item.loai_8_kl = khoiluong;
          } else if (loai === 'loai_9_kl') {
            item.loai_9_kl = khoiluong;
          }

          // Calculate the new total sanluong
          const newTongSanLuong =
            (parseInt(item.loai_1_kl) || 0) +
            (parseInt(item.loai_2_kl) || 0) +
            (parseInt(item.loai_3_kl) || 0) +
            (parseInt(item.loai_4_kl) || 0) +
            (parseInt(item.loai_5_kl) || 0) +
            (parseInt(item.loai_6_kl) || 0) +
            (parseInt(item.loai_7_kl) || 0) +
            (parseInt(item.loai_8_kl) || 0) +
            (parseInt(item.loai_9_kl) || 0);

          // Update the 'tongsanluong' property
          item.tongsanluong = newTongSanLuong.toString();

          return item;
        }
        return item;
      });

      // Update data0101 with the modified khaithac
      setData0101(updatedData0101);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };
  const handleChangeLoai = (text, loai) => {
    try {
      const updatedData0101 = {...data0101};

      updatedData0101.khaithac = updatedData0101.khaithac.map(item => ({
        ...item,
        [loai]: text,
      }));

      // Update data0101 with the modified khaithac
      setData0101(updatedData0101);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeDateTha = (date, id) => {
    try {
      // Create a copy of data0101
      const updatedData0101 = {...data0101};

      // Map over the khaithac array inside data0101 and update the relevant property
      updatedData0101.khaithac = updatedData0101.khaithac.map(item => {
        if (item.id === id) {
          // Update the specific property
          return {
            ...item,
            thoidiem_tha: moment(date).format('YYYY-MM-DDTHH:mm'),
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

  const handleChangeDateThu = (date, id) => {
    try {
      // Create a copy of data0101
      const updatedData0101 = {...data0101};

      // Map over the khaithac array inside data0101 and update the relevant property
      updatedData0101.khaithac = updatedData0101.khaithac.map(item => {
        if (item.id === id) {
          // Update the specific property
          return {
            ...item,
            thoidiem_thu: moment(date).format('YYYY-MM-DDTHH:mm'),
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
      // Create a copy of data0101
      const updatedData0101 = {...data0101};

      // Map over the khaithac array inside data0101 and update the relevant property
      updatedData0101.khaithac = updatedData0101.khaithac.map(item => {
        if (item.id === id) {
          return {...item, tau_bs: soDk};
        }
        return item;
      });

      // Update data0101 with the modified khaithac
      setData0101(updatedData0101);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const calculateTongKhoiLuong = fieldName => {
    try {
      let total = 0;

      data0101.khaithac.forEach(item => {
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
          if (
            data0101.khaithac[i].isdelete &&
            data0101.khaithac[i].isdelete == 1
          ) {
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
              value={moment(item.thoidiem_tha).format('DD/MM/YYYY HH:mm')}
              onChangeText={text => handleChangeDateTha(text, item.id)}
            />
            <CustomDateTimePicker
              onDateChange={date => {
                handleChangeDateTha(date, item.id);
              }}
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.vido_tha}
              onChangeText={text => handleChangeViDoTha(text, item.id)}
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.kinhdo_tha}
              onChangeText={text => handleChangeKinhDoTha(text, item.id)}
            />
          </View>

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
              value={moment(item.thoidiem_thu).format('DD/MM/YYYY HH:mm')}
              onChangeText={text => handleChangeDateThu(text, item.id)}
            />
            <CustomDateTimePicker
              onDateChange={date => {
                handleChangeDateThu(date, item.id);
              }}
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.vido_thu}
              onChangeText={text => handleChangeViDoThu(text, item.id)}
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.kinhdo_thu}
              onChangeText={text => handleChangeKinhDoThu(text, item.id)}
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.loai_1_kl}
              onChangeText={text =>
                handleChangeKhoiLuongLoai(text, item.id, 'loai_1_kl')
              }
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.loai_2_kl}
              onChangeText={text =>
                handleChangeKhoiLuongLoai(text, item.id, 'loai_2_kl')
              }
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.loai_3_kl}
              onChangeText={text =>
                handleChangeKhoiLuongLoai(text, item.id, 'loai_3_kl')
              }
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.loai_4_kl}
              onChangeText={text =>
                handleChangeKhoiLuongLoai(text, item.id, 'loai_4_kl')
              }
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.loai_5_kl}
              onChangeText={text =>
                handleChangeKhoiLuongLoai(text, item.id, 'loai_5_kl')
              }
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.loai_6_kl}
              onChangeText={text =>
                handleChangeKhoiLuongLoai(text, item.id, 'loai_6_kl')
              }
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.loai_7_kl}
              onChangeText={text =>
                handleChangeKhoiLuongLoai(text, item.id, 'loai_7_kl')
              }
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.loai_8_kl}
              onChangeText={text =>
                handleChangeKhoiLuongLoai(text, item.id, 'loai_8_kl')
              }
            />
          </View>
          <View style={stylesOutLine.outlineForm0101_1}>
            <TextInput
              keyboardType="numeric"
              style={stylesOutLine.textInputOutLineForm0101_1}
              value={item.loai_9_kl}
              onChangeText={text =>
                handleChangeKhoiLuongLoai(text, item.id, 'loai_9_kl')
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
          fontSize: 20,
          lineHeight: 28,
          color: 'black',
          marginVertical: 15,
        }}>
        I. THÔNG TIN VỀ HOẠT ĐỘNG KHAI THÁC THỦY SẢN
      </Text>
      <ScrollView>
        <ScrollView horizontal={true} style={{}}>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#0ACEF5',
              }}>
              <Text style={styles.textTT}>Mẻ thứ</Text>

              <Text style={styles.textNgayThang}>
                Thời điểm thả{'\n'}(giờ, phút, ngày, tháng)
              </Text>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.textViTriThuMua}>Vị trí thả</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textToaDo}>Vĩ độ</Text>
                  <Text style={styles.textToaDo}>Kinh độ</Text>
                </View>
              </View>
              <Text style={styles.textNgayThang}>
                Thời điểm thu{'\n'}(giờ, phút, ngày, tháng)
              </Text>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.textViTriThuMua}>Vị trí thu</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textToaDo}>Vĩ độ</Text>
                  <Text style={styles.textToaDo}>Kinh độ</Text>
                </View>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.textKhoiLuongThuySanDaMua}>
                  Sản lượng các loài thủy sản chủ yếu (kg)
                </Text>
                <View style={{flexDirection: 'row'}}>
                  {/* View Loai 1 */}
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textKhoiLuong}>Loài</Text>
                    <TextInput
                      style={[styles.inputKhoiLuong]}
                      value={data0101.khaithac[0].loai_1}
                      onChangeText={text =>
                        handleChangeLoai(text, 'loai_1')
                      }></TextInput>
                  </View>
                  {/* View Loài 2 */}
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textKhoiLuong}>Loài</Text>
                    <TextInput
                      style={[styles.inputKhoiLuong]}
                      value={data0101.khaithac[0].loai_2}
                      onChangeText={text =>
                        handleChangeLoai(text, 'loai_2')
                      }></TextInput>
                  </View>
                  {/* View Loài 3 */}
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textKhoiLuong}>Loài</Text>
                    <TextInput
                      style={[styles.inputKhoiLuong]}
                      value={data0101.khaithac[0].loai_3}
                      onChangeText={text =>
                        handleChangeLoai(text, 'loai_3')
                      }></TextInput>
                  </View>
                  {/* View Loài 4 */}
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textKhoiLuong}>Loài</Text>
                    <TextInput
                      style={[styles.inputKhoiLuong]}
                      value={data0101.khaithac[0].loai_4}
                      onChangeText={text =>
                        handleChangeLoai(text, 'loai_4')
                      }></TextInput>
                  </View>
                  {/* View Loài 5 */}
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textKhoiLuong}>Loài</Text>
                    <TextInput
                      style={[styles.inputKhoiLuong]}
                      value={data0101.khaithac[0].loai_5}
                      onChangeText={text =>
                        handleChangeLoai(text, 'loai_5')
                      }></TextInput>
                  </View>
                  {/* View Loài 6 */}
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textKhoiLuong}>Loài</Text>
                    <TextInput
                      style={[styles.inputKhoiLuong]}
                      value={data0101.khaithac[0].loai_6}
                      onChangeText={text =>
                        handleChangeLoai(text, 'loai_6')
                      }></TextInput>
                  </View>
                  {/* View Loài 7 */}
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textKhoiLuong}>Loài</Text>
                    <TextInput
                      style={[styles.inputKhoiLuong]}
                      value={data0101.khaithac[0].loai_7}
                      onChangeText={text =>
                        handleChangeLoai(text, 'loai_7')
                      }></TextInput>
                  </View>
                  {/* View Loài 8 */}
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textKhoiLuong}>Loài</Text>
                    <TextInput
                      style={[styles.inputKhoiLuong]}
                      value={data0101.khaithac[0].loai_8}
                      onChangeText={text =>
                        handleChangeLoai(text, 'loai_8')
                      }></TextInput>
                  </View>
                  {/* View Loài 9 */}
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textKhoiLuong}>Loài</Text>
                    <TextInput
                      style={[styles.inputKhoiLuong]}
                      value={data0101.khaithac[0].loai_9}
                      onChangeText={text =>
                        handleChangeLoai(text, 'loai_9')
                      }></TextInput>
                  </View>
                </View>
              </View>
              <Text style={styles.textTongKhoiLuong}>Tổng khối lượng (kg)</Text>
            </View>
            {/* <View style={{flexDirection: 'column'}}>
                {khaithac.map((item, index) => (
                  <View key={item.id}>
                    <KetQuaThuMuaItem item={item} index={index} key={index} />
                  </View>
                ))}
              </View> */}
            <FlatList
              data={data0101.khaithac}
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
              <Text style={styles.textKhoiLuongTong}>
                {calculateTongKhoiLuong('loai_7_kl')}
              </Text>
              <Text style={styles.textKhoiLuongTong}>
                {calculateTongKhoiLuong('loai_8_kl')}
              </Text>
              <Text style={styles.textKhoiLuongTong}>
                {calculateTongKhoiLuong('loai_9_kl')}
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

export default KetQuaKhaiThac;

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
    width: widthLoai * 9,
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
    width: widthToaDo * 2,
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
    backgroundColor: 'white',
    color: 'black',
    width: widthLoai,
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
