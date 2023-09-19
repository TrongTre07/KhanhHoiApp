import {
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  View,
  ToastAndroid,

} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import styles from './itemTongCucThuySan/styles';
import Table1 from './itemTongCucThuySan/Table1';
// import Table2 from './itemTongCucThuySan/Table2';

import {UserContext} from '../../../contexts/UserContext.js';
import CustomDatePicker from '../../others/CustomDatePicker';
import moment from 'moment';

const TongCucThuySanView = () => {
  const {data0202, setData0202} = useContext(UserContext);
  const handleChangeTuNgay = date => {
    try {
      // Create a copy of data0201
      const updatedData0202 = {...data0202};
      updatedData0202.tungay = moment(date).format('YYYY-MM-DD');

      // Update data0201 with the modified thumua
      setData0202(updatedData0202);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };
  const handleChangeDenNgay = date => {
    try {
      // Create a copy of data0201
      const updatedData0202 = {...data0202};
      updatedData0202.denngay = moment(date).format('YYYY-MM-DD');

      // Update data0201 with the modified thumua
      setData0202(updatedData0202);
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };
  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <Text style={styles.txtHeader}>
          MẪU GIẤY BIÊN NHẬN THỦY SẢN BỐC DỠ QUA CẢNG
        </Text>
        <Text style={styles.txtHeader}>
          {'\n'} CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
        </Text>
        <Text style={styles.txtHeader}>Độc lập - Tự do - Hạnh phúc</Text>
        <Text style={styles.txtHeader}>-----------</Text>
      </View>

      <View style={[styles.header]}>
        <Text style={styles.txtHeader}>
          GIẤY BIÊN NHẬN THỦY SẢN BỐC DỠ QUA CẢNG
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.txtHeader}>SỐ:</Text>
          <TextInput
            keyboardType="numeric"
            value={data0202?.sobiennhan.toString()}
            style={styles.txtHeader}
            placeholder="........."
            onChangeText={text => setData0202({...data0202, sobiennhan: text})}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.txtGiayBienNhan}>
            (Giấy biên nhận có giá trị 90 ngày, kể từ ngày được cấp)
          </Text>
        </View>
      </View>
      <Table1 />
      {/* <Table3 /> */}
    </View>
  );
};

export default TongCucThuySanView;
