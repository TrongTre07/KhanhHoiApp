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
import React, {useContext, useState} from 'react';
import CustomDatePicker from '../../../others/CustomDatePicker';
import moment from 'moment';
import {useEffect} from 'react';
import {UserContext} from '../../../../contexts/UserContext';
import CustomDateTimePicker from '../../../others/CustomDateTimePicker';
import {v4 as uuidv4} from 'uuid';
import makeid from '../../../others/makeid';

const widthTT = 60;
const widthSoDkTauca = 200;
const widthThoiGian = 200;
const widthToaDo = 150;
const widthLoai = 100;
const widthTongKhoiLuong = 200;
const widthTongKhoiLuongTong = widthToaDo * 4 + widthTT + widthThoiGian * 2;

const ThongTinChiTietHoatDong = ({selectedItem}) => {
  const moment = require('moment');

  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const {data0201, setData0201} = useContext(UserContext);
  // console.log(JSON.stringify(data0201, null, 2));
  if (selectedItem >= data0201?.thongtintaudc_thumua?.length) {
    selectedItem--;
  }

  const handleThemDong = () => {
    try {
      const objectAdd = {
        id: makeid(7),
        // dairy_id: data0201.id,
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
        loai_1_kl: '',
        loai_2_kl: '',
        loai_3_kl: '',
        loai_4_kl: '',
        loai_5_kl: '',
        loai_6_kl: '',
        tongsanluong: '',
      };

      const updatedData0201 = {...data0201};

      if (updatedData0201.thongtintaudc_thumua[selectedItem]) {
        updatedData0201.thongtintaudc_thumua[
          selectedItem
        ].thongtinhoatdong.push(objectAdd);
      }
      setData0201(updatedData0201);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleXoaDong = () => {
    try {
      let lastObject =
        data0201.thongtintaudc_thumua[selectedItem].thongtinhoatdong.length;
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      data0201.thongtintaudc_thumua[selectedItem].thongtinhoatdong.map(item => {
        if (item.hasOwnProperty('isdelete') && item.isdelete == 1) {
          lastObject -= 1;
        }
      });
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      if (
        data0201 &&
        data0201.thongtintaudc_thumua &&
        data0201.thongtintaudc_thumua[selectedItem]
      ) {
        const itemToRemove =
          data0201.thongtintaudc_thumua[selectedItem].thongtinhoatdong[
            selectedItemIndex
          ];

        if (itemToRemove) {
          if (itemToRemove.hasOwnProperty('isdelete')) {
            const updatedData0201 = {...data0201};

            updatedData0201.thongtintaudc_thumua[
              selectedItem
            ].thongtinhoatdong = updatedData0201.thongtintaudc_thumua[
              selectedItem
            ].thongtinhoatdong.map(item => {
              if (item.id === itemToRemove.id) {
                return {...item, isdelete: 1};
              }
              return item;
            });

            // Update data0201 with the modified thongtinhoatdong array
            setData0201(updatedData0201);
          } else {
            const updatedData0201 = {...data0201};
            updatedData0201.thongtintaudc_thumua[
              selectedItem
            ].thongtinhoatdong = updatedData0201.thongtintaudc_thumua[
              selectedItem
            ].thongtinhoatdong.filter(item => item.id !== itemToRemove.id);
            setData0201(updatedData0201);
          }
        } else {
          Alert.alert('Cần chọn dòng', '', [{text: 'OK'}]);
        }
      }
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChonItem = index => {
    setSelectedItemIndex(index);
  };

  const handleChangeViDoTha = (text, id) => {
    try {
      const updatedData0201 = {...data0201};

      if (updatedData0201.thongtintaudc_thumua[selectedItem]) {
        updatedData0201.thongtintaudc_thumua[selectedItem].thongtinhoatdong =
          updatedData0201.thongtintaudc_thumua[
            selectedItem
          ].thongtinhoatdong.map(item => {
            if (item.id === id) {
              return {...item, vido_tha: text};
            }
            return item;
          });
      }

      setData0201(updatedData0201);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeKinhDoTha = (text, id) => {
    try {
      const updatedData0201 = {...data0201};

      if (updatedData0201.thongtintaudc_thumua[selectedItem]) {
        updatedData0201.thongtintaudc_thumua[selectedItem].thongtinhoatdong =
          updatedData0201.thongtintaudc_thumua[
            selectedItem
          ].thongtinhoatdong.map(item => {
            if (item.id === id) {
              return {...item, kinhdo_tha: text};
            }
            return item;
          });
      }

      setData0201(updatedData0201);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeViDoThu = (text, id) => {
    try {
      const updatedData0201 = {...data0201};

      if (updatedData0201.thongtintaudc_thumua[selectedItem]) {
        updatedData0201.thongtintaudc_thumua[selectedItem].thongtinhoatdong =
          updatedData0201.thongtintaudc_thumua[
            selectedItem
          ].thongtinhoatdong.map(item => {
            if (item.id === id) {
              return {...item, vido_thu: text};
            }
            return item;
          });
      }

      setData0201(updatedData0201);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeKinhDoThu = (text, id) => {
    try {
      const updatedData0201 = {...data0201};

      if (updatedData0201.thongtintaudc_thumua[selectedItem]) {
        updatedData0201.thongtintaudc_thumua[selectedItem].thongtinhoatdong =
          updatedData0201.thongtintaudc_thumua[
            selectedItem
          ].thongtinhoatdong.map(item => {
            if (item.id === id) {
              return {...item, kinhdo_thu: text};
            }
            return item;
          });
      }

      setData0201(updatedData0201);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeKhoiLuongLoai = (khoiluong, id, loai) => {
    try {
      if (
        data0201 &&
        data0201.thongtintaudc_thumua &&
        data0201.thongtintaudc_thumua[selectedItem]
      ) {
        const updatedData0201 = {...data0201};
        const item = updatedData0201.thongtintaudc_thumua[
          selectedItem
        ].thongtinhoatdong.find(item => item.id === id);

        if (item) {
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

          const newTongSanLuong =
            (parseInt(item.loai_1_kl) || 0) +
            (parseInt(item.loai_2_kl) || 0) +
            (parseInt(item.loai_3_kl) || 0) +
            (parseInt(item.loai_4_kl) || 0) +
            (parseInt(item.loai_5_kl) || 0) +
            (parseInt(item.loai_6_kl) || 0);

          item.tongsanluong = newTongSanLuong.toString();

          setData0201(updatedData0201);
        }
      }
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeLoai = (text, loai) => {
    try {
      const updatedData0201 = {...data0201};

      if (updatedData0201.thongtintaudc_thumua[selectedItem]) {
        updatedData0201.thongtintaudc_thumua[selectedItem].thongtinhoatdong =
          updatedData0201.thongtintaudc_thumua[
            selectedItem
          ].thongtinhoatdong.map(item => {
            return {
              ...item,
              [loai]: text,
            };
          });
      }

      setData0201(updatedData0201);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeDateTha = (date, id) => {
    try {
      const updatedData0201 = {...data0201};

      if (updatedData0201.thongtintaudc_thumua[selectedItem]) {
        updatedData0201.thongtintaudc_thumua[selectedItem].thongtinhoatdong =
          updatedData0201.thongtintaudc_thumua[
            selectedItem
          ].thongtinhoatdong.map(item => {
            if (item.id === id) {
              return {
                ...item,
                thoidiem_tha: moment(date).format('YYYY-MM-DDTHH:mm'),
              };
            }
            return item;
          });
      }

      setData0201(updatedData0201);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };
  const handleChangeDateThu = (date, id) => {
    try {
      const updatedData0201 = {...data0201};

      if (updatedData0201.thongtintaudc_thumua[selectedItem]) {
        updatedData0201.thongtintaudc_thumua[selectedItem].thongtinhoatdong =
          updatedData0201.thongtintaudc_thumua[
            selectedItem
          ].thongtinhoatdong.map(item => {
            if (item.id === id) {
              return {
                ...item,
                thoidiem_thu: moment(date).format('YYYY-MM-DDTHH:mm'),
              };
            }
            return item;
          });
      }

      setData0201(updatedData0201);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  // const handleChangeDateThu = (date, id) => {
  //   const updatedThongTinHoatDong = thongTinHoatDong?.map(item => {
  //     if (item.id === id) {
  //       // return {...item, ngaythang: date};
  //       return {...item, thoidiem_thu: moment(date).format('DD/MM/YYYY hh:mm A')};
  //     }
  //     return item;
  //   });
  //   setThongTinHoatDong(updatedThongTinHoatDong);
  // };

  const calculateTongKhoiLuong = fieldName => {
    try {
      let total = 0;

      data0201.thongtintaudc_thumua[selectedItem].thongtinhoatdong?.forEach(
        item => {
          if (item[fieldName]) {
            total += parseFloat(item[fieldName]); // Convert to float to ensure proper addition
          }
        },
      );

      return total;
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const ThongTinHoatDongItem = ({item, index}) => {
    try {
      const rootIndex = index;
      let countIsDelete = 0;

      let checkIsDeleted;
      if (item.isdelete == 1) {
        checkIsDeleted = true;
      } else {
        for (i = 0; i <= index; i++) {
          if (
            data0201.thongtintaudc_thumua[selectedItem].thongtinhoatdong[i]
              .isdelete &&
            data0201.thongtintaudc_thumua[selectedItem].thongtinhoatdong[i]
              .isdelete == 1
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
          key={index}
          onPress={() => handleChonItem(rootIndex)}
          style={[
            {flexDirection: 'row', backgroundColor: 'white'},
            isSelected && {backgroundColor: 'lightblue'},
          ]}>
          <Text style={styles.textTT}>{index + 1}</Text>

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
              style={styles.textDate}
              value={moment(item.thoidiem_tha).format('DD/MM/YYYY HH:mm')}
              onChangeText={text => handleChangeDateTha(text, item.id)}
            />
            <CustomDateTimePicker
              onDateChange={date => handleChangeDateTha(date, item.id)}
            />
          </View>
          <TextInput
            keyboardType="numeric"
            style={styles.inputToaDo}
            value={item.vido_tha}
            onChangeText={text => handleChangeViDoTha(text, item.id)}
          />
          <TextInput
            keyboardType="numeric"
            style={styles.inputToaDo}
            value={item.kinhdo_tha}
            onChangeText={text => handleChangeKinhDoTha(text, item.id)}
          />
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
              style={styles.textDate}
              value={moment(item.thoidiem_thu).format('DD/MM/YYYY HH:mm')}
              onChangeText={text => handleChangeDateThu(text, item.id)}
            />
            <CustomDateTimePicker
              onDateChange={date => handleChangeDateThu(date, item.id)}
            />
          </View>
          <TextInput
            keyboardType="numeric"
            style={styles.inputToaDo}
            value={item.vido_thu}
            onChangeText={text => handleChangeViDoThu(text, item.id)}
          />
          <TextInput
            keyboardType="numeric"
            style={styles.inputToaDo}
            value={item.kinhdo_thu}
            onChangeText={text => handleChangeKinhDoThu(text, item.id)}
          />
          <TextInput
            keyboardType="numeric"
            style={styles.inputKhoiLuongLoai}
            value={item.loai_1_kl}
            onChangeText={text =>
              handleChangeKhoiLuongLoai(text, item.id, 'loai_1_kl')
            }
          />
          <TextInput
            keyboardType="numeric"
            style={styles.inputKhoiLuongLoai}
            value={item.loai_2_kl}
            onChangeText={text =>
              handleChangeKhoiLuongLoai(text, item.id, 'loai_2_kl')
            }
          />
          <TextInput
            keyboardType="numeric"
            style={styles.inputKhoiLuongLoai}
            value={item.loai_3_kl}
            onChangeText={text =>
              handleChangeKhoiLuongLoai(text, item.id, 'loai_3_kl')
            }
          />
          <TextInput
            keyboardType="numeric"
            style={styles.inputKhoiLuongLoai}
            value={item.loai_4_kl}
            onChangeText={text =>
              handleChangeKhoiLuongLoai(text, item.id, 'loai_4_kl')
            }
          />
          <TextInput
            keyboardType="numeric"
            style={styles.inputKhoiLuongLoai}
            value={item.loai_5_kl}
            onChangeText={text =>
              handleChangeKhoiLuongLoai(text, item.id, 'loai_5_kl')
            }
          />
          <TextInput
            keyboardType="numeric"
            style={styles.inputKhoiLuongLoai}
            value={item.loai_6_kl}
            onChangeText={text =>
              handleChangeKhoiLuongLoai(text, item.id, 'loai_6_kl')
            }
          />
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
        II. THÔNG TIN CHI TIẾT VỀ HOẠT ĐỘNG KHAI THÁC THỦY SẢN LIÊN QUAN ĐẾN SẢN
        PHẨM THU MUA, CHUYỂN TẢI
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
                Thời điểm thả {'\n'} (giờ, phút, ngày, tháng)
              </Text>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.textViTriThuMua}>Vị trí thả</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textToaDo}>Vĩ độ</Text>
                  <Text style={styles.textToaDo}>Kinh độ</Text>
                </View>
              </View>
              <Text style={styles.textNgayThang}>
                Thời điểm thu {'\n'} (giờ, phút, ngày, tháng)
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
                      value={
                        data0201.thongtintaudc_thumua[selectedItem]
                          .thongtinhoatdong[0]?.loai_1
                      }
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
                      value={
                        data0201.thongtintaudc_thumua[selectedItem]
                          .thongtinhoatdong[0]?.loai_2
                      }
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
                      value={
                        data0201.thongtintaudc_thumua[selectedItem]
                          .thongtinhoatdong[0]?.loai_3
                      }
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
                      value={
                        data0201.thongtintaudc_thumua[selectedItem]
                          .thongtinhoatdong[0]?.loai_4
                      }
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
                      value={
                        data0201.thongtintaudc_thumua[selectedItem]
                          .thongtinhoatdong[0]?.loai_5
                      }
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
                      value={
                        data0201.thongtintaudc_thumua[selectedItem]
                          .thongtinhoatdong[0]?.loai_6
                      }
                      onChangeText={text =>
                        handleChangeLoai(text, 'loai_6')
                      }></TextInput>
                  </View>
                </View>
              </View>
              <Text style={styles.textTongKhoiLuong}>Tổng khối lượng (kg)</Text>
            </View>

            <FlatList
              data={
                data0201.thongtintaudc_thumua[selectedItem].thongtinhoatdong
              }
              renderItem={ThongTinHoatDongItem}
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

        <View>
          <Text style={styles.note}>Ghi chú:</Text>
          <Text style={styles.contentNote}>
            * Trong số nhật ký thu mua, chuyển tải có nhiều mục B, mỗi mục ghi
            đầy đủ thông tin của một tàu khai thác thủy sản đã bán sản phẩm cho
            tàu thu mua chuyển tải; chỉ sao chép các thông tin từ Sổ nhật ký
            khai thác thủy sản đối với các hoạt động khai thác liên quan đến sản
            phẩm thủy sản đã thu mua, chuyển tải.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ThongTinChiTietHoatDong;

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
  note: {
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 25,
    borderColor: '#0099FF',
    color: 'black',
  },
  contentNote: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 25,
    borderColor: '#0099FF',
    color: 'black',
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
