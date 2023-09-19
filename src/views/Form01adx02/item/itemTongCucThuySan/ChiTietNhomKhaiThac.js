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
import data0201Empty from '../../models/data0102';
import stylesOutLine from '../../../../utils/stylesOutLine';
const ChiTietNhomKhaiThac = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const {data0102, setData0102} = useContext(UserContext);

  const handleThemDong = () => {
    try {
      let objAdd = {
        // id: 0,
        tencang: '',
        loaicangca: '',
        diachi: '',
        dienthoai: '',
        soquyetdinhmocang: '',
        lydokhaitru: '',
        isdelete: false,
        ghichu: '',
      };
      // console.log('objAdd okokokokoko: ', objAdd);
      let updatedData0102 = {...data0102};
      // objAdd = {...objAdd, id: Math.random(1,9)};
      // if (updatedData0102.cangca_ds_denghi) {
      //   updatedData0102.cangca_ds_denghi.push(objAdd);
      // }
      updatedData0102.cangca_ds_denghi.push({...objAdd});
      setData0102(updatedData0102);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  const handleXoaDong = () => {
    try {
      let lastObject = data0102.cangca_ds_denghi.length;
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      data0102.cangca_ds_denghi.map(item => {
        if (item.hasOwnProperty('isdelete') && item.isdelete == true) {
          lastObject -= 1;
        }
      });
      if (lastObject == 1) {
        Alert.alert('Không thể xóa hết thông tin', '', [{text: 'OK'}]);
        return;
      }

      let itemToRemove = data0102.cangca_ds_denghi[selectedItemIndex];
      if (itemToRemove) {
        if (itemToRemove.hasOwnProperty('isdelete')) {
          itemToRemove.isdelete = true;
          // Update data0202 with the modified itemToRemove
          let tempData = {...data0102};
          tempData.cangca_ds_denghi[selectedItemIndex] = itemToRemove;
          // const updatedData0102 = {
          //   ...data0102,
          //   cangca_ds_denghi: data0102.cangca_ds_denghi.map(item =>
          //     item.id === itemToRemove.id ? itemToRemove : item,
          //   ),
          // };
          // const updatedData0102 = tempData;
          setData0102(tempData);
        }
        // else {
        //   // Item doesn't have isdelete field, remove it by filtering
        //   const updatedKhaiThac = data0102.cangca_ds_denghi.filter(
        //     item => item.id !== itemToRemove.id,
        //   );

        //   const updatedData0102 = {
        //     ...data0102,
        //     cangca_ds_denghi: updatedKhaiThac,
        //   };

        //   setData0102(updatedData0102);
        // }
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

      data0102.cangca_ds_denghi.forEach(item => {
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
    // console.log("data0102", data0102);

    let countIsDelete = 0;
    let rootIndex = index;
    let checkIsDeleted;
    if (item?.isdelete == true) {
      checkIsDeleted = true;
    } else {
      for (i = 0; i <= index; i++) {
        if (data0102.cangca_ds_denghi[i].isdelete) {
          countIsDelete++;
        }
      }
      rootIndex -= countIsDelete;
    }

    const isSelected = selectedItemIndex === index;
    if (checkIsDeleted) {
      return null;
    }

    return (
      <Pressable
        key={index}
        onPress={() => handleChonItem(index)}
        style={[
          {flexDirection: 'row', backgroundColor: 'white'},
          isSelected && {backgroundColor: '#badeda'},
        ]}>
        <Text style={styles.textTT}>{rootIndex + 1}</Text>

        <View style={stylesOutLine.outlineForm0102}>
          <TextInput
            style={stylesOutLine.textInputOutLineForm0101_1}
            value={item.tencang}
            // onChangeText={text => handleChangeTenLoai(text, item.id)}
            onChangeText={text => {
              let tempdata0102 = {...data0102};
              tempdata0102.cangca_ds_denghi[index].tencang = text;
              setData0102(tempdata0102);
            }}
          />
        </View>

        <View style={stylesOutLine.outlineForm0102}>
          <TextInput
            style={stylesOutLine.textInputOutLineForm0101_1}
            value={item.loaicangca}
            // onChangeText={text => handleChangeTenLoai(text, item.id)}
            onChangeText={text => {
              let tempdata0102 = {...data0102};
              tempdata0102.cangca_ds_denghi[index].loaicangca = text;
              setData0102(tempdata0102);
            }}
          />
        </View>

        <View style={stylesOutLine.outlineForm0102}>
          <TextInput
            style={stylesOutLine.textInputOutLineForm0101_1}
            value={item.diachi}
            // onChangeText={text => handleChangeTenLoai(text, item.id)}
            onChangeText={text => {
              let tempdata0102 = {...data0102};
              tempdata0102.cangca_ds_denghi[index].diachi = text;
              setData0102(tempdata0102);
            }}
          />
        </View>

        <View style={stylesOutLine.outlineForm0102}>
          <TextInput
            style={stylesOutLine.textInputOutLineForm0101_1}
            value={item.dienthoai}
            // onChangeText={text => handleChangeTenLoai(text, item.id)}
            onChangeText={text => {
              let tempdata0102 = {...data0102};
              tempdata0102.cangca_ds_denghi[index].dienthoai = text;
              setData0102(tempdata0102);
            }}
          />
        </View>

        <View style={stylesOutLine.outlineForm0102}>
          <TextInput
            style={stylesOutLine.textInputOutLineForm0101_1}
            value={item.soquyetdinhmocang}
            // onChangeText={text => handleChangeTenLoai(text, item.id)}
            onChangeText={text => {
              let tempdata0102 = {...data0102};
              tempdata0102.cangca_ds_denghi[index].soquyetdinhmocang = text;
              setData0102(tempdata0102);
            }}
          />
        </View>

        <View style={stylesOutLine.outlineForm0102}>
          <TextInput
            style={stylesOutLine.textInputOutLineForm0101_1}
            value={item.ghichu}
            // onChangeText={text => handleChangeTenLoai(text, item.id)}
            onChangeText={text => {
              let tempdata0102 = {...data0102};
              tempdata0102.cangca_ds_denghi[index].ghichu = text;
              setData0102(tempdata0102);
            }}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text
        style={{
          marginHorizontal: 25,
          fontWeight: 'bold',
          fontSize: 20,
          lineHeight: 28,
          color: 'black',
          marginVertical: 15,
        }}>
        1. Cảng cá đề nghị đưa vào danh sách cảng cá chỉ định:
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

              <Text style={styles.textTenLoaiThuySan}>Tên cảng cá</Text>
              <Text style={styles.textTenLoaiThuySan}>Cảng cá loại</Text>
              <Text style={styles.textTenLoaiThuySan}>Địa chỉ</Text>
              <Text style={styles.textTenLoaiThuySan}>Điện thoại</Text>
              <Text style={styles.textTenLoaiThuySan}>
                Số quyết định {`\n`} công bố mở cảng
              </Text>
              <Text style={styles.textTenLoaiThuySan}>Ghi chú</Text>
            </View>

            {/* <FlatList
          horizontal={false}
          showsVerticalScrollIndicator={false}
          data={data0102.cangca_ds_denghi}
          renderItem={({item, index}) => TenLoaiThuySanItem({item, index})}
          keyExtractor={item => item.id}
        /> */}

            {data0102.cangca_ds_denghi.map((item, index) =>
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

export default ChiTietNhomKhaiThac;

const styles = StyleSheet.create({
  textTongKhoiLuongTong: {
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 22,
    borderColor: '#0099FF',
    borderWidth: 1,
    width: 60,
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textTT: {
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 22,
    borderColor: '#0099FF',
    borderWidth: 0.6,
    width: 60,
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textTenLoaiThuySan: {
    fontWeight: '400',
    fontSize: 20,
    // lineHeight: 22,
    padding: 8,
    borderColor: '#0099FF',
    borderWidth: 0.6,
    width: 220,
    color: 'black',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
  textSanLuong: {
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 22,
    borderColor: '#0099FF',
    borderWidth: 0.6,
    width: 100,
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
