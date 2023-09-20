import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text , TouchableOpacity} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';

import { UserContext } from '../../../contexts/UserContext';
import { PrintfPDF } from './PrintfPDF';
import { ExportPDF } from './ExportPDF';

const ViewPDF = ({ route,navigation }) => {

  const { data0101 } = useContext(UserContext);
  const data = route?.params?.data;
  console.log('data',data);
  console.log('data0101');

  // const id = route.params?.id;
  // const data2 = route.params?.data;
  // let name;
  // try {
  //   name = data2?.find((item) => item?.id === id);

  //   if(!name.dairy_name){
  //     name = { dairy_name: 'filemau' };

  //   }
  // } catch (error) {
  //   if(data.dairy_name){
  //     name=data
  //   }else

  //   name = { dairy_name: 'filemau' };
  // }

  // const [fileExists, setFileExists] = useState(false);
  const localfile = { uri: `/storage/emulated/0/Download/nhatky_pdf/filemau.pdf` };

  useEffect(() => {
    checkFileExists();
  }, []);

  const checkFileExists = async () => {
    try {
      const exists = await RNFS.exists(localfile.uri);
      // setFileExists(exists);
    } catch (error) {
      console.log(error);
      // setFileExists(false);
    }
  };
  const CustomRightHeader = () => {
    return (
      <View style={{flexDirection:'row',alignContent:'space-around'}}>
        
        <TouchableOpacity
          style={[styles.actionDownload, styles.button]}
          onPress={() => {
            console.log('0102');
            let dataFix = data;
            dataFix.dairyname = 'Mẫu Kết quả rà soát cảng cá chỉ định có đủ hệ thống xác nhận nguồn gốc thủy sản từ khai thác'+'_'+Math.floor(Math.random() * 100000);
            const result = ExportPDF(dataFix);
            if (!result) Alert.alert('Thất bại', `không thể tải file pdf`);
          }}>
          <Text style={styles.actionText}>Tải file</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionExportPDF, styles.button]}
          onPress={
            () => {
              let dataFix = { ...data };
              PrintfPDF(dataFix);
            }
            //data
          }
          >
            
          <Text style={styles.actionText}>Xuất File</Text>
        </TouchableOpacity>
      </View>
    )
  }

  useEffect(() => {
    // Cấu hình header và truyền giá trị data cho CustomRightHeader
    navigation.setOptions({
      headerRight: () => <CustomRightHeader/>,  
    });
  }, []);

  // if (!fileExists) {
  //   return (
  //     <View style={styles.container}>
  //       {/* <TouchableOpacity
  //         style={[styles.actionDownload, styles.button]}
  //         onPress={() => {
  //           let dataFix = data0101;
  //           // dataFix.dairy_name =
  //           //   'Mẫu NHẬT KÝ KHAI THÁC THỦY SẢN' +
  //           //   '_' +
  //           //   Math.floor(Math.random() * 100000);
  //           const result = ExportPDF(dataFix);
  //           if (!result) Alert.alert('Thất bại', `không thể tải file pdf`);
  //         }}>
  //         <Text style={styles.actionText}>Tải mẫu</Text>
  //       </TouchableOpacity> */}
  //       {/* <TouchableOpacity
  //         // style={[styles.actionExportPDF, styles.button]}
  //         onPress={
  //           () => {
  //             let dataFix = { ...data0101 };
  //             PrintfPDF(dataFix);
  //           }
  //           //data
  //         }>
  //         <Text style={styles.actionText}>Xuất File</Text>
  //       </TouchableOpacity> */}
  //       <Text style={styles.messageText}>Bạn phải tải trước mới xem được.</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <Pdf source={localfile} style={styles.pdf} />
    </View>
  );
};

export default ViewPDF;

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 12,
  },
  actionDownload: {
    backgroundColor: '#3b82f6',
    marginRight: 10,
  },

  actionExportPDF: {
    backgroundColor: '#FF9800',
    marginRight: 10,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginRight: 8,
  },

  action: {
    flexDirection: 'row',
    marginVertical: 12,
    marginBottom: 24,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
  messageText: {
    fontSize: 16,
    color: 'red',
  },
});