import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {UserContext} from '../../../../contexts/UserContext';
import makeid from '../../../others/makeid';
import stylesOutLine from '../../../../utils/stylesOutLine';

const ChiTietVeSanLuongThuySan = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const {data0202, setData0202} = useContext(UserContext);

  const handleChangeTenLoai = (tenLoai, id) => {
    try {
      const updateData0202 = {...data0202};

      updateData0202.ls0202ds = updateData0202.ls0202ds.map(item => {
        if (item.id === id) {
          return {...item, tenloai: tenLoai};
        }
        return item;
      });
      setData0202(updateData0202);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleChangeKhoiLuong = (sanLuong, id) => {
    try {
      const updateData0202 = {...data0202};

      updateData0202.ls0202ds = updateData0202.ls0202ds.map(item => {
        if (item.id === id) {
          return {...item, khoiluong: parseInt(sanLuong, 10)};
        }
        return item;
      });
      setData0202(updateData0202);
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
        khoiluong: 0,
      };
      const updatedData0202 = {...data0202};
      if (updatedData0202.ls0202ds) {
        updatedData0202.ls0202ds.push(objAdd);
      }

      setData0202(updatedData0202);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleXoaDong = () => {
    try {
      let lastObject = data0202.ls0202ds.length;
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      data0202.ls0202ds.map(item => {
        if (item.hasOwnProperty('isdelete') && item.isdelete == true) {
          lastObject -= 1;
        }
      });
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      const itemToRemove = data0202.ls0202ds[selectedItemIndex];
      if (itemToRemove) {
        if (itemToRemove.hasOwnProperty('isdelete')) {
          itemToRemove.isdelete = true;
          // Update data0201 with the modified itemToRemove
          const updatedData0202 = {
            ...data0202,
            ls0202ds: data0202.ls0202ds.map(item =>
              item.id === itemToRemove.id ? itemToRemove : item,
            ),
          };
          setData0202(updatedData0202);
        } else {
          // Item doesn't have isdelete field, remove it by filtering
          const updatedKhaiThac = data0202.ls0202ds.filter(
            item => item.id !== itemToRemove.id,
          );

          const updatedData0202 = {
            ...data0202,
            ls0202ds: updatedKhaiThac,
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

  const calculateTongKhoiLuong = khoiluong => {
    try {
      let total = 0;

      data0202.ls0202ds.forEach(item => {
        if (item[khoiluong] && item.isdelete != true) {
          total += parseFloat(item[khoiluong]); // Convert to float to ensure proper addition
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
    if (item.isdelete == true) {
      checkIsDeleted = true;
    } else {
      for (i = 0; i <= index; i++) {
        if (
          data0202.ls0202ds[i].isdelete &&
          data0202.ls0202ds[i].isdelete == true
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

        <View style={stylesOutLine.outlineForm0202_1}>
          <TextInput
            style={[stylesOutLine.textInputOutLineForm0202_1, {width: '98%'}]}
            value={item.tenloai}
            onChangeText={text => handleChangeTenLoai(text, item.id)}
          />
        </View>

        <View style={stylesOutLine.outlineForm0202_1_2}>
          <TextInput
            keyboardType="numeric"
            style={stylesOutLine.textInputOutLineForm0202_1}
            value={item.khoiluong.toString()}
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

          <Text style={styles.textSanLuong}>
            Khối lượng bốc dỡ qua cảng(kg)
          </Text>
        </View>

        {/* <FlatList
          horizontal={false}
          showsVerticalScrollIndicator={false}
          data={data0202.ls0202ds}
          renderItem={({item, index}) => TenLoaiThuySanItem({item, index})}
          keyExtractor={item => item.id}
        /> */}

        {data0202.ls0202ds.map((item, index) =>
          TenLoaiThuySanItem({item, index}),
        )}

        <View style={{flexDirection: 'row', height: 50}}>
          <Text style={styles.textTongKhoiLuongTong}>Tổng khối lượng</Text>

          <Text style={styles.textSanLuong}>
            {calculateTongKhoiLuong('khoiluong')}
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

export default ChiTietVeSanLuongThuySan;

const styles = StyleSheet.create({
  textTongKhoiLuongTong: {
    fontWeight: '500',
    fontSize: 18,

    borderColor: '#0099FF',
    borderWidth: 1,
    width: '70%',
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textTT: {
    fontWeight: '500',
    fontSize: 18,

    borderColor: '#0099FF',
    borderWidth: 0.6,
    width: '10%',
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textTenLoaiThuySan: {
    fontWeight: '500',
    fontSize: 18,
    borderColor: '#0099FF',
    borderWidth: 0.6,
    width: '60%',
    height: 60,
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
    fontSize: 20,
    lineHeight: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});
