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

import moment from 'moment';
import {UserContext} from '../../contexts/UserContext';
import makeid from '../others/makeid';

const TableReport = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const {data04_PLIII_03, setData04_PLIII_03} = useContext(UserContext);

  const handleThemDong = () => {
    try {
      const objAdd = {
        id: makeid(7),
        sochungnhankhaithac: '',
        tentau: '',
        quocgiatreoco: '',
        motathuysankhaithac: '',
        tongkhoiluongkhaithac: 0,
        khoiluongthuysankhaithacchebien: 0,
        sanphamsaukhichebien: 0,
      };
      // const objAdd = data04_PLIII_03Empty.data04_PLIII_03.tbldairy_0203_ls[0];
      // console.log('objAdd: ',data04_PLIII_03Empty.data04_PLIII_03.tbldairy_0203_ls[0]);

      // console.log('objAdd okokokokoko: ', objAdd);
      let updateddata04_PLIII_03 = {...data04_PLIII_03};
      // objAdd = {...objAdd, id: Math.random(1,9)};
      // if (updateddata04_PLIII_03.data04_PLIII_03.tbldairy_0203_ls) {
      //   updateddata04_PLIII_03.data04_PLIII_03.tbldairy_0203_ls.push(objAdd);
      // }
      updateddata04_PLIII_03.tbl_xacnhancamket_ls.push({...objAdd});
      setData04_PLIII_03(updateddata04_PLIII_03);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleXoaDong = () => {
    try {
      let lastObject = data04_PLIII_03.tbl_xacnhancamket_ls.length;
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      data04_PLIII_03.tbl_xacnhancamket_ls.map(item => {
        if (item.hasOwnProperty('isdelete') && item.isdelete == true) {
          lastObject -= 1;
        }
      });
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      let itemToRemove =
        data04_PLIII_03.tbl_xacnhancamket_ls[selectedItemIndex];
      if (itemToRemove) {
        if (itemToRemove.hasOwnProperty('isdelete')) {
          // Assuming itemToRemove contains the id you want to update
          const itemIdToRemove = itemToRemove.id;

          // Create a modified version of lsxacnhan_ by mapping over its items
          const modifiedLsxacnhan_ = data04_PLIII_03.tbl_xacnhancamket_ls.map(
            item => {
              // Check if the item has the same id as the item to remove
              if (item.id === itemIdToRemove) {
                // Update the item and mark it as deleted
                return {...item, isdelete: true};
              }
              // Otherwise, keep the item as is
              return item;
            },
          );

          // Create the updated data04_PLIII_03 object with the modified lsxacnhan_
          const updateddata04_PLIII_03 = {
            ...data04_PLIII_03,
            tbl_xacnhancamket_ls: modifiedLsxacnhan_,
          };

          // Update the state with the modified data
          setData04_PLIII_03(updateddata04_PLIII_03);
        } else {
          // Item doesn't have isdelete field, remove it by filtering

          const updatedKhaiThac = data04_PLIII_03.tbl_xacnhancamket_ls.filter(
            item => item.id !== itemToRemove.id,
          );

          const updateddata04_PLIII_03 = {
            ...data04_PLIII_03,
            tbl_xacnhancamket_ls: updatedKhaiThac,
          };
          console.log(JSON.stringify(updateddata04_PLIII_03, null, 2));

          setData04_PLIII_03(updateddata04_PLIII_03);
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

      data04_PLIII_03.tbldairy_0203_ls.forEach(item => {
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
    // console.log("data04_PLIII_03", data04_PLIII_03);

    let countIsDelete = 0;
    let rootIndex = index;
    if (item?.isdelete == true) {
      return null;
    } else {
      for (i = 0; i <= index; i++) {
        if (data04_PLIII_03.tbl_xacnhancamket_ls[i].isdelete) {
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
        <TextInput
          onFocus={() => handleChonItem(index)}
          style={styles.textTenLoaiThuySan}
          value={item.sochungnhankhaithac}
          onChangeText={text => {
            let tempData04_PLIII_03 = {...data04_PLIII_03};
            tempData04_PLIII_03.tbl_xacnhancamket_ls[
              index
            ].sochungnhankhaithac = text;
            setData04_PLIII_03(tempData04_PLIII_03);
          }}
        />

        <TextInput
          onFocus={() => handleChonItem(index)}
          style={styles.textTenLoaiThuySan}
          value={item.tentau}
          onChangeText={text => {
            let tempData04_PLIII_03 = {...data04_PLIII_03};
            tempData04_PLIII_03.tbl_xacnhancamket_ls[index].tentau = text;
            setData04_PLIII_03(tempData04_PLIII_03);
          }}
        />
        <TextInput
          onFocus={() => handleChonItem(index)}
          style={styles.textTenLoaiThuySan}
          value={item.quocgiatreoco}
          onChangeText={text => {
            let tempData04_PLIII_03 = {...data04_PLIII_03};
            tempData04_PLIII_03.tbl_xacnhancamket_ls[index].quocgiatreoco =
              text;
            setData04_PLIII_03(tempData04_PLIII_03);
          }}
        />

        <Text style={styles.textTT}></Text>
        <TextInput
          onFocus={() => handleChonItem(index)}
          style={styles.textTenLoaiThuySan}
          value={item.motathuysankhaithac}
          onChangeText={text => {
            let tempData04_PLIII_03 = {...data04_PLIII_03};
            tempData04_PLIII_03.tbl_xacnhancamket_ls[
              index
            ].motathuysankhaithac = text;
            setData04_PLIII_03(tempData04_PLIII_03);
          }}
        />

        <TextInput
          onFocus={() => handleChonItem(index)}
          style={styles.textTenLoaiThuySan}
          value={item.tongkhoiluongkhaithac.toString()}
          onChangeText={text => {
            let tempData04_PLIII_03 = {...data04_PLIII_03};
            if (isNaN(text)) {
              text = 0;
            } else if (text == '') {
              text = 0;
            }
            tempData04_PLIII_03.tbl_xacnhancamket_ls[
              index
            ].tongkhoiluongkhaithac = Number(text);
            setData04_PLIII_03(tempData04_PLIII_03);
          }}
        />
        <TextInput
          onFocus={() => handleChonItem(index)}
          style={styles.textTenLoaiThuySan}
          value={item.khoiluongthuysankhaithacchebien.toString()}
          onChangeText={text => {
            let tempData04_PLIII_03 = {...data04_PLIII_03};
            if (isNaN(text)) {
              text = 0;
            } else if (text == '') {
              text = 0;
            }
            tempData04_PLIII_03.tbl_xacnhancamket_ls[
              index
            ].khoiluongthuysankhaithacchebien = Number(text);
            setData04_PLIII_03(tempData04_PLIII_03);
          }}
        />
        <TextInput
          onFocus={() => handleChonItem(index)}
          style={styles.textTenLoaiThuySan}
          value={item.sanphamsaukhichebien.toString()}
          onChangeText={text => {
            let tempData04_PLIII_03 = {...data04_PLIII_03};
            if (isNaN(text)) {
              text = 0;
            } else if (text == '') {
              text = 0;
            }
            tempData04_PLIII_03.tbl_xacnhancamket_ls[
              index
            ].sanphamsaukhichebien = Number(text);
            setData04_PLIII_03(tempData04_PLIII_03);
          }}
        />
      </Pressable>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={{marginVertical: 5}}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{width: '100%'}}>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#0ACEF5',
              }}>
              <Text style={[styles.textTenLoaiThuySan, {height: 120}]}>
                Số chứng nhận thủy sån khai thác/Catch certificate number
              </Text>
              <Text style={styles.textTenLoaiThuySan}>
                Tên tàu/Name of Fishing vessel
              </Text>
              <Text style={styles.textTenLoaiThuySan}>
                Quốc gia treo cờ/Flag state
              </Text>
              <Text style={styles.textTT}>
                Ngày thông qua/Validtion date (s)
              </Text>
              <Text style={styles.textTenLoaiThuySan}>
                Mô tả thủy sån khai thác/Catch description
              </Text>
              <Text style={styles.textTenLoaiThuySan}>
                Tổng khối lượng thủy sản khai thác/Total landed weight (kg)
              </Text>
              <Text style={styles.textTenLoaiThuySan}>
                Khối lượng thủy sản khai thác đưa vào chế biến/Catches processed
                (kg)
              </Text>
              <Text style={styles.textTenLoaiThuySan}>
                Sản phẩm sau khi chế biến xuất khẩu/Processed fishery products
                and exported (kg)
              </Text>
            </View>

            {data04_PLIII_03.tbl_xacnhancamket_ls.map((item, index) =>
              TenLoaiThuySanItem({item, index}),
            )}
          </View>
        </ScrollView>
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

export default TableReport;

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
    width: 560,
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textTT: {
    fontWeight: '500',
    fontSize: 18,

    borderColor: '#0099FF',
    borderWidth: 1,
    width: 200,
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
    width: 300,
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textSanLuong: {
    fontWeight: '500',
    fontSize: 18,

    borderColor: '#0099FF',
    borderWidth: 1,
    width: 500,
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
