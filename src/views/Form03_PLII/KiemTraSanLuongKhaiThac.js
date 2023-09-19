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
import {UserContext} from '../../contexts/UserContext';
import makeid from '../others/makeid';

import moment from 'moment';
import stylesOutLine from '../../utils/stylesOutLine';

const KiemTraSanLuongKhaiThac = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const {data03_PLII, setData03_PLII} = useContext(UserContext);

  const handleThemDong = () => {
    try {
      const objAdd = {
        id: makeid(7),
        tenloai: '',
        slbaocao: 0,
        slthucte: 0,
      };
      // const objAdd = data03_PLIIEmpty.data03_PLII.tbldairy_0203_ls[0];
      // console.log('objAdd: ',data03_PLIIEmpty.data03_PLII.tbldairy_0203_ls[0]);

      // console.log('objAdd okokokokoko: ', objAdd);
      let updateddata03_PLII = {...data03_PLII};
      // objAdd = {...objAdd, id: Math.random(1,9)};
      // if (updateddata03_PLII.data03_PLII.tbldairy_0203_ls) {
      //   updateddata03_PLII.data03_PLII.tbldairy_0203_ls.push(objAdd);
      // }
      updateddata03_PLII.tbldairy_0203_ls.push({...objAdd});
      setData03_PLII(updateddata03_PLII);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleXoaDong = () => {
    try {
      let lastObject = data03_PLII.tbldairy_0203_ls.length;
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      data03_PLII.tbldairy_0203_ls.map(item => {
        if (item.hasOwnProperty('isdelete') && item.isdelete == true) {
          lastObject -= 1;
        }
      });
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      let itemToRemove = data03_PLII.tbldairy_0203_ls[selectedItemIndex];
      if (itemToRemove) {
        if (itemToRemove.hasOwnProperty('isdelete')) {
          // Assuming itemToRemove contains the id you want to update
          const itemIdToRemove = itemToRemove.id;

          // Create a modified version of lsxacnhan_ by mapping over its items
          const modifiedLsxacnhan_ = data03_PLII.tbldairy_0203_ls.map(item => {
            // Check if the item has the same id as the item to remove
            if (item.id === itemIdToRemove) {
              // Update the item and mark it as deleted
              return {...item, isdelete: true};
            }
            // Otherwise, keep the item as is
            return item;
          });

          // Create the updated data03_PLII object with the modified lsxacnhan_
          const updateddata03_PLII = {
            ...data03_PLII,
            tbldairy_0203_ls: modifiedLsxacnhan_,
          };

          // Update the state with the modified data
          setData03_PLII(updateddata03_PLII);
        } else {
          // Item doesn't have isdelete field, remove it by filtering

          const updatedKhaiThac = data03_PLII.tbldairy_0203_ls.filter(
            item => item.id !== itemToRemove.id,
          );

          const updateddata03_PLII = {
            ...data03_PLII,
            tbldairy_0203_ls: updatedKhaiThac,
          };
          console.log(JSON.stringify(updateddata03_PLII, null, 2));

          setData03_PLII(updateddata03_PLII);
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

      data03_PLII.tbldairy_0203_ls.forEach(item => {
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
    // console.log("data03_PLII", data03_PLII);

    let countIsDelete = 0;
    let rootIndex = index;
    if (item?.isdelete == true) {
      return null;
    } else {
      for (i = 0; i <= index; i++) {
        if (data03_PLII.tbldairy_0203_ls[i].isdelete) {
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

        <View style={stylesOutLine.outlineForm0302}>
          <TextInput
            style={stylesOutLine.textInputOutLineForm0302}
            value={item.tenloai}
            // onChangeText={text => handleChangeTenLoai(text, item.id)}
            onChangeText={text => {
              let tempdata03_PLII = {...data03_PLII};
              tempdata03_PLII.tbldairy_0203_ls[index].tenloai = text;
              setData03_PLII(tempdata03_PLII);
            }}
          />
        </View>

        <View style={stylesOutLine.outlineForm0302}>
          <TextInput
            style={stylesOutLine.textInputOutLineForm0302}
            value={item.slbaocao.toString()}
            keyboardType="numeric"
            // onChangeText={text => handleChangeTenLoai(text, item.id)}
            onChangeText={text => {
              let tempdata03_PLII = {...data03_PLII};
              if (isNaN(text)) {
                text = 0;
              }
              tempdata03_PLII.tbldairy_0203_ls[index].slbaocao = Number(text);
              setData03_PLII(tempdata03_PLII);
            }}
          />
        </View>
        <View style={stylesOutLine.outlineForm0302}>
          <TextInput
            style={stylesOutLine.textInputOutLineForm0302}
            value={item.slthucte.toString()}
            keyboardType="numeric"
            // onChangeText={text => handleChangeTenLoai(text, item.id)}
            onChangeText={text => {
              let tempdata03_PLII = {...data03_PLII};
              if (isNaN(text)) {
                text = 0;
              }
              tempdata03_PLII.tbldairy_0203_ls[index].slthucte = parseInt(
                text,
                10,
              );
              setData03_PLII(tempdata03_PLII);
            }}
          />
        </View>
        {/* <TextInput
          style={styles.textTenLoaiThuySan}
          value={item.klconlai.toString()}
          keyboardType="numeric"
          // onChangeText={text => handleChangeTenLoai(text, item.id)}
          onChangeText={text => {
            let tempdata03_PLII = {...data03_PLII};
            tempdata03_PLII.tbldairy_0203_ls[index].klconlai = parseInt(
              text,
              10,
            );
            setData03_PLII(tempdata03_PLII);
          }}
        /> */}
      </Pressable>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={{marginVertical: 5}}>
        <View
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{width: '100%'}}>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#0ACEF5',
              }}>
              <Text style={styles.textTT}>TT</Text>

              <Text style={styles.textTenLoaiThuySan}>Tên loài thủy sản</Text>
              <Text style={styles.textTenLoaiThuySan}>
                Số lượng theo báo cáo (kg)
              </Text>
              <Text style={styles.textTenLoaiThuySan}>
                Số lượng thực tế (kg)
              </Text>
            </View>

            {data03_PLII.tbldairy_0203_ls.map((item, index) =>
              TenLoaiThuySanItem({item, index}),
            )}
            <View style={{flexDirection: 'row', height: 50}}>
              <Text style={styles.textTongKhoiLuongTong}>Tổng cộng</Text>

              <Text style={styles.textSanLuong}>
                {calculateTongKhoiLuong('slbaocao')}
              </Text>
              <Text style={styles.textSanLuong}>
                {calculateTongKhoiLuong('slthucte')}
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

export default KiemTraSanLuongKhaiThac;

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
    width: '40%',
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textTT: {
    fontWeight: '500',
    fontSize: 18,

    borderColor: '#0099FF',
    borderWidth: 1,
    width: '10%',
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textTenLoaiThuySan: {
    fontWeight: '500',
    fontSize: 18,
    // lineHeight: 22,
    padding: 8,
    borderColor: '#0099FF',
    borderWidth: 1,
    width: '30%',
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textSanLuong: {
    fontWeight: '500',
    fontSize: 18,

    borderColor: '#0099FF',
    borderWidth: 1,
    width: '30%',
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
    fontSize: 18,
    lineHeight: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});
