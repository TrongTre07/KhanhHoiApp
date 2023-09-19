import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  FlatList,
  TextInput,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserContext} from '../../../../contexts/UserContext';
import makeid from '../../../others/makeid';
import CustomDateTimePicker from '../../../others/CustomDateTimePicker';
import CustomDatePicker from '../../../others/CustomDatePicker';
import moment from 'moment';
import stylesOutLine from '../../../../utils/stylesOutLine';

const XacNhanKhoiLuongThuySanConLai = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const {data0202, setData0202} = useContext(UserContext);

  const handleThemDong = () => {
    try {
      const objAdd = {
        id: makeid(7),
        tenloai: '',
        klbocdoquacang: 0,
        kldaxacnhan: 0,
        klconlai: 0,
      };
      // const objAdd = data0202Empty.data0202.xacnhan.lsxacnhan_[0];
      // console.log('objAdd: ',data0202Empty.data0202.xacnhan.lsxacnhan_[0]);

      // console.log('objAdd okokokokoko: ', objAdd);
      let updatedData0202 = {...data0202};
      // objAdd = {...objAdd, id: Math.random(1,9)};
      // if (updatedData0202.data0202.xacnhan.lsxacnhan_) {
      //   updatedData0202.data0202.xacnhan.lsxacnhan_.push(objAdd);
      // }
      updatedData0202.xacnhan.lsxacnhan_.push({...objAdd});
      setData0202(updatedData0202);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleXoaDong = () => {
    try {
      let lastObject = data0202.xacnhan.lsxacnhan_.length;
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      data0202.xacnhan.lsxacnhan_.map(item => {
        if (item.hasOwnProperty('isdelete') && item.isdelete == true) {
          lastObject -= 1;
        }
      });
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      let itemToRemove = data0202.xacnhan.lsxacnhan_[selectedItemIndex];
      if (itemToRemove) {
        if (itemToRemove.hasOwnProperty('isdelete')) {
          // Assuming itemToRemove contains the id you want to update
          const itemIdToRemove = itemToRemove.id;

          // Create a modified version of lsxacnhan_ by mapping over its items
          const modifiedLsxacnhan_ = data0202.xacnhan.lsxacnhan_.map(item => {
            // Check if the item has the same id as the item to remove
            if (item.id === itemIdToRemove) {
              // Update the item and mark it as deleted
              return {...item, isdelete: true};
            }
            // Otherwise, keep the item as is
            return item;
          });

          // Create the updated data0202 object with the modified lsxacnhan_
          const updatedData0202 = {
            ...data0202,
            xacnhan: {
              ...data0202.xacnhan,
              lsxacnhan_: modifiedLsxacnhan_,
            },
          };

          // Update the state with the modified data
          setData0202(updatedData0202);
        } else {
          // Item doesn't have isdelete field, remove it by filtering

          const updatedKhaiThac = data0202.xacnhan.lsxacnhan_.filter(
            item => item.id !== itemToRemove.id,
          );

          const updatedData0202 = {
            ...data0202,
            xacnhan: {
              ...data0202.xacnhan,
              lsxacnhan_: updatedKhaiThac,
            },
          };
          console.log(JSON.stringify(updatedData0202, null, 2));

          setData0202(updatedData0202);
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

  const calculateTongKhoiLuong = khoiLuong => {
    try {
      let total = 0;

      data0202.xacnhan.lsxacnhan_.forEach(item => {
        if (item[khoiLuong] && item.isdelete != true) {
          total += parseFloat(item[khoiLuong]); // Convert to float to ensure proper addition
        }
      });

      return total;
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const TenLoaiThuySanItem = ({item, index}) => {
    // console.log("data0202", data0202);

    let countIsDelete = 0;
    let rootIndex = index;
    if (item?.isdelete == true) {
      return null;
    } else {
      for (i = 0; i <= index; i++) {
        if (data0202.xacnhan.lsxacnhan_[i].isdelete) {
          countIsDelete++;
        }
      }
      rootIndex -= countIsDelete;
    }

    const isSelected = selectedItemIndex === index;

    return (
      <Pressable
        key={item.id}
        onPress={() => handleChonItem(index)}
        style={[
          {flexDirection: 'row', backgroundColor: 'white'},
          isSelected && {backgroundColor: '#badeda'},
        ]}>
        <Text style={styles.textTT}>{rootIndex + 1}</Text>

        <View style={stylesOutLine.outline}>
          <TextInput
            style={[stylesOutLine.textInputOutLine]}
            value={item.tenloai}
            // onChangeText={text => handleChangeTenLoai(text, item.id)}
            onChangeText={text => {
              let tempdata0202 = {...data0202};
              tempdata0202.xacnhan.lsxacnhan_[index].tenloai = text;
              setData0202(tempdata0202);
            }}
          />
        </View>
        <View style={stylesOutLine.outline}>
          <TextInput
            style={stylesOutLine.textInputOutLine}
            value={item.klbocdoquacang.toString()}
            keyboardType="numeric"
            // onChangeText={text => handleChangeTenLoai(text, item.id)}
            onChangeText={text => {
              let tempdata0202 = {...data0202};
              tempdata0202.xacnhan.lsxacnhan_[index].klbocdoquacang =
                Number(text);
              setData0202(tempdata0202);
            }}
          />
        </View>
        <View style={stylesOutLine.outline}>
          <TextInput
            style={stylesOutLine.textInputOutLine}
            value={item.kldaxacnhan.toString()}
            keyboardType="numeric"
            // onChangeText={text => handleChangeTenLoai(text, item.id)}
            onChangeText={text => {
              let tempdata0202 = {...data0202};
              tempdata0202.xacnhan.lsxacnhan_[index].kldaxacnhan = parseInt(
                text,
                10,
              );
              setData0202(tempdata0202);
            }}
          />
        </View>
        <View style={stylesOutLine.outline}>
          <TextInput
            style={stylesOutLine.textInputOutLine}
            value={item.klconlai.toString()}
            keyboardType="numeric"
            // onChangeText={text => handleChangeTenLoai(text, item.id)}
            onChangeText={text => {
              let tempdata0202 = {...data0202};
              tempdata0202.xacnhan.lsxacnhan_[index].klconlai = parseInt(
                text,
                10,
              );
              setData0202(tempdata0202);
            }}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          //   marginHorizontal: 25,
          flexDirection: 'column',
          width: '100%',
          flexWrap: 'wrap',
          marginVertical: 20,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,

            color: 'black',
          }}>
          XÁC NHẬN KHỐI LƯỢNG THỦY SẢN CÒN LẠI{' '}
        </Text>
        <Text
          style={{
            fontWeight: 'normal',
            fontStyle: 'italic',
            fontSize: 22,

            color: 'black',
            fontWeight: '400',
            marginTop: 10,
          }}
          width="100%"
          numberOfLines={3}>
          (Dùng cho tổ chức quản lý cảng cá xác nhận khối lượng nguyên liệu thủy
          sản còn lại khi chưa xác nhận hết khối lượng nguyên liệu thủy sản
          trong Giấy biên nhận thủy sản bốc dỡ qua cảng)
        </Text>

        <View
          style={{
            flexDirection: 'column',
            marginVertical: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>.........,ngày:</Text>
            <TextInput
              onDateChange={date => {
                setData0202({
                  ...data0202,
                  xacnhan: {...data0202.xacnhan, ngaylap: date},
                });
              }}
              value={moment(data0202?.xacnhan.ngaylap).format('DD/MM/YYYY')}
              style={[styles.text, styles.input]}
            />
            <CustomDatePicker
              onDateChange={date => {
                setData0202({
                  ...data0202,
                  xacnhan: {...data0202.xacnhan, ngaylap: date},
                });
              }}
            />
            <Text style={styles.text}>; Cảng cá </Text>
            <TextInput
              style={[styles.text, styles.input]}
              value={data0202.xacnhan.cangca}
              onChangeText={text => {
                setData0202({
                  ...data0202,
                  xacnhan: {...data0202.xacnhan, cangca: text},
                });
              }}
            />
          </View>
          <Text style={[styles.text, {marginTop: 5}]}>
            xác nhận khối lượng thủy sản còn lại trong Giấy biên nhận thủy sản
            bốc dỡ
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text style={styles.text} numberOfLines={2}>
            qua cảng sau khi cấp Giấy xác nhận nguyên liệu thủy sản khai thác số
          </Text>
          <TextInput
            style={[styles.text, styles.input]}
            value={data0202.xacnhan.soxacnhannguyenlieukhaithac}
            onChangeText={text => {
              setData0202({
                ...data0202,
                xacnhan: {
                  ...data0202.xacnhan,
                  soxacnhannguyenlieukhaithac: text,
                },
              });
            }}
          />
        </View>
      </View>

      <ScrollView style={{marginVertical: 5}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#0ACEF5',
              }}>
              <Text style={styles.textTT}>TT</Text>

              <Text style={styles.textTenLoaiThuySan}>Tên loài thủy sản</Text>
              <Text style={styles.textTenLoaiThuySan}>
                Khối lượng thủy sản bốc dỡ qua cảng (kg)
              </Text>
              <Text style={styles.textTenLoaiThuySan}>
                Khối lượng thủy đã xác nhận (kg)
              </Text>
              <Text style={styles.textTenLoaiThuySan}>
                Khối lượng thủy còn lại (kg)
              </Text>
            </View>

            {data0202.xacnhan.lsxacnhan_.map((item, index) =>
              TenLoaiThuySanItem({item, index}),
            )}
            <View style={{flexDirection: 'row', height: 50}}>
              <Text style={styles.textTongKhoiLuongTong}>Tổng khối lượng</Text>

              <Text style={styles.textSanLuong}>
                {calculateTongKhoiLuong('klbocdoquacang')}
              </Text>
              <Text style={styles.textSanLuong}>
                {calculateTongKhoiLuong('kldaxacnhan')}
              </Text>
              <Text style={styles.textSanLuong}>
                {calculateTongKhoiLuong('klconlai')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{flexDirection: 'row'}}>
        <Pressable style={styles.btnThemDong} onPress={() => handleThemDong()}>
          <Text style={styles.textBtn}>Thêm dòng</Text>
        </Pressable>
        <Pressable style={styles.btnXoaDong} onPress={() => handleXoaDong()}>
          <Text style={styles.textBtn}>Xóa dòng</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default XacNhanKhoiLuongThuySanConLai;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 22,
    // backgroundColor:'red',
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    paddingVertical: 0,
    marginTop: 5,
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  row: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTongKhoiLuongTong: {
    fontWeight: '500',
    fontSize: 18,

    borderColor: '#0099FF',
    borderWidth: 1,
    width: '31%',
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textTT: {
    fontWeight: '500',
    fontSize: 18,

    borderColor: '#0099FF',
    borderWidth: 1,
    width: '8%',
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textTenLoaiThuySan: {
    fontWeight: '500',
    fontSize: 18,
    padding: 8,
    borderColor: '#0099FF',
    borderWidth: 1,
    width: '23%',
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textSanLuong: {
    fontWeight: '500',
    fontSize: 18,

    borderColor: '#0099FF',
    borderWidth: 1,
    width: '23%',
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
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
  textBtn: {
    fontWeight: '200',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});
