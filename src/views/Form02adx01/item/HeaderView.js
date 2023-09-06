import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HeaderView = () => {
  const soQuyDinh = '';
  const mauSo = 'Mẫu số 02 (Phụ lục I)';
  const title = 'MẪU NHẬT KÝ THU MUA, CHUYỂN TẢI THỦY SẢN';
  return (
    <View style={styles.container}>
      <View style={styles.mauSoVaSoQuyDinhContainer}>
        <Text style={styles.soQuyDinhText}>{soQuyDinh}</Text>
        <Text style={styles.mauSoText}>{mauSo}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </View>
  );
};

export default HeaderView;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight:'bold',
    fontSize: 20,
    color:'black',
  },
  mauSoText: {
    fontWeight:'bold',
    fontSize: 18,
    color:'black',
    fontStyle:'italic'
  },
  soQuyDinhText: {
    fontWeight:'bold',
    fontSize: 18,
    color:'black',
    
  },
  mauSoVaSoQuyDinhContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor:'white'
  },
});
