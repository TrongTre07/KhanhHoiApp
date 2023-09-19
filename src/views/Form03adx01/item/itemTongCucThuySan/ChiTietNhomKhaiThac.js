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
import stylesOutLine from '../../../../utils/stylesOutLine';

const ChiTietNhomKhaiThac = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const {data0301, setData0301} = useContext(UserContext);

  const handleChangeTenLoai = (tenLoai, id) => {
    try {
      const updateData0301 = {...data0301};

      updateData0301.tblreport_0301_ls = updateData0301.tblreport_0301_ls.map(
        item => {
          if (item.id === id) {
            return {...item, tenloai: tenLoai};
          }
          return item;
        },
      );
      console.log(JSON.stringify(data0301, null, 2));
      setData0301(updateData0301);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeKhoiLuong = (sanLuong, id) => {
    try {
      const updateData0301 = {...data0301};

      updateData0301.tblreport_0301_ls = updateData0301.tblreport_0301_ls.map(
        item => {
          if (item.id === id) {
            return {...item, sanluong: parseInt(sanLuong, 10)};
          }
          return item;
        },
      );
      console.log(JSON.stringify(updateData0301, null, 2));
      setData0301(updateData0301);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleThemDong = () => {
    try {
      const objAdd = {
        id: makeid(7),
        tenloai: '',
        sanluong: 0,
      };
      const updatedData0301 = {...data0301};
      if (updatedData0301.tblreport_0301_ls) {
        updatedData0301.tblreport_0301_ls.push(objAdd);
      }

      setData0301(updatedData0301);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleXoaDong = () => {
    try {
      let lastObject = data0301.tblreport_0301_ls.length;
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      data0301.tblreport_0301_ls.map(item => {
        if (item.hasOwnProperty('isdelete') && item.isdelete == true) {
          lastObject -= 1;
        }
      });
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      const itemToRemove = data0301.tblreport_0301_ls[selectedItemIndex];
      if (itemToRemove) {
        if (itemToRemove.hasOwnProperty('isdelete')) {
          itemToRemove.isdelete = true;
          // Update data0201 with the modified itemToRemove
          const updatedData0301 = {
            ...data0301,
            tblreport_0301_ls: data0301.tblreport_0301_ls.map(item =>
              item.id === itemToRemove.id ? itemToRemove : item,
            ),
          };
          setData0301(updatedData0301);
        } else {
          // Item doesn't have isdelete field, remove it by filtering
          const updatedKhaiThac = data0301.tblreport_0301_ls.filter(
            item => item.id !== itemToRemove.id,
          );

          const updatedData0301 = {
            ...data0301,
            tblreport_0301_ls: updatedKhaiThac,
          };

          setData0301(updatedData0301);
        }
      } else {
        Alert.alert('Cần chọn dòng', '', [{text: 'OK'}]);
      }
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const calculateTongKhoiLuong = sanluong => {
    try {
      let total = 0;

      data0301.tblreport_0301_ls.forEach(item => {
        if (item[sanluong] && item.isdelete != true) {
          total += parseFloat(item[sanluong]); // Convert to float to ensure proper addition
        }
      });

      return total;
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChonItem = index => {
    console.log('index; ', index);
    setSelectedItemIndex(index);
  };

  const TenLoaiThuySanItem = ({item, index}) => {
    let countIsDelete = 0;
    const rootIndex = index;
    let checkIsDeleted;
    if (item?.isdelete == true) {
      checkIsDeleted = true;
    } else {
      for (i = 0; i <= index; i++) {
        if (
          data0301.tblreport_0301_ls[i].isdelete &&
          data0301.tblreport_0301_ls[i].isdelete == true
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
          isSelected && {backgroundColor: '#badeda'},
        ]}>
        <Text style={styles.textTT}>{index + 1}</Text>
        <View style={stylesOutLine.outlineForm0301}>
          <TextInput
            style={stylesOutLine.textInputOutLineForm0301_1}
            value={item.tenloai}
            onChangeText={text => handleChangeTenLoai(text, item.id)}
          />
        </View>

        <View style={stylesOutLine.outlineForm0301_2}>
          <TextInput
            keyboardType="numeric"
            style={stylesOutLine.textInputOutLineForm0301_2}
            value={item.sanluong.toString()}
            onChangeText={text => handleChangeKhoiLuong(text, item.id)}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text
        style={{
          fontStyle: 'italic',
          fontWeight: 'bold',
          fontSize: 22,
          lineHeight: 28,
          color: 'black',
          marginVertical: 15,
        }}>
        Chi tiết nhóm thủy sản khai thác chính
      </Text>
      {/* <ScrollView> */}
      <View style={{flexDirection: 'column'}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#0ACEF5',
          }}>
          <Text style={styles.textTT}>TT</Text>

          <Text style={styles.textTenLoaiThuySan}>Tên loài thủy sản</Text>

          <Text style={styles.textSanLuong}>Sản lượng (kg)</Text>
        </View>

        {/* <FlatList
          horizontal={false}
          showsVerticalScrollIndicator={false}
          data={data0301.tblreport_0301_ls}
          renderItem={({item, index}) => TenLoaiThuySanItem({item, index})}
          keyExtractor={item => item.id}
        /> */}

        {data0301.tblreport_0301_ls.map((item, index) =>
          TenLoaiThuySanItem({item, index}),
        )}

        <View style={{flexDirection: 'row', height: 50}}>
          <Text style={styles.textTongKhoiLuongTong}>Tổng khối lượng</Text>

          <Text style={styles.textSanLuong}>
            {calculateTongKhoiLuong('sanluong')}
          </Text>
        </View>
      </View>
      {/* </ScrollView> */}

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

export default ChiTietNhomKhaiThac;

const styles = StyleSheet.create({
  textTongKhoiLuongTong: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    borderColor: '#0099FF',
    borderWidth: 1,
    width: '80%',
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
    width: '10%',
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textTenLoaiThuySan: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    borderColor: '#0099FF',
    borderWidth: 0.6,
    width: '70%',
    height: 60,
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textSanLuong: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    borderColor: '#0099FF',
    borderWidth: 1,
    width: '20%',
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
