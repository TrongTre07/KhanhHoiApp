import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text , TouchableOpacity} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';

import { UserContext } from '../../../contexts/UserContext';
//0101
import { PrintfPDF0101 } from './PrintfPDF';
import { ExportPDF0101 } from './ExportPDF';

//0201
import { PrintfPDF0201 } from '../../Form02adx01/pdfForm0201/PrintfPDF';
import { ExportPDF0201 } from '../../Form02adx01/pdfForm0201/ExportPDF';

//0301
import { PrintfPDF0301 } from '../../Form03adx01/pdfForm0301/PrintfPDF';
import { ExportPDF0301 } from '../../Form03adx01/pdfForm0301/ExportPDF';

//0401
import { PrintfPDF0401 } from '../../Form04adx01/pdfForm0401/PrintfPDF';
import { ExportPDF0401 } from '../../Form04adx01/pdfForm0401/ExportPDF';

//0102
import { PrintfPDF0102 } from '../../Form01adx02/pdfForm0102/PrintfPDF';
import { ExportPDF0102 } from '../../Form01adx02/pdfForm0102/ExportPDF';

//0202
import { PrintfPDF0202 } from '../../Form02adx02/pdfForm0202/PrintfPDF';
import { ExportPDF0202 } from '../../Form02adx02/pdfForm0202/ExportPDF';

//02b_PLIIb
import { PrintfPDF02b_PLIIb } from '../../Form02b_PLIIb/pdfForm02b_PLIIb/PrintfPDF';
import { ExportPDF02b_PLIIb } from '../../Form02b_PLIIb/pdfForm02b_PLIIb/ExportPDF';

//03_PLII
import { PrintfPDF03_PLII } from '../../Form03_PLII/pdfForm03_PLII/PrintfPDF';
import { ExportPDF03_PLII } from '../../Form03_PLII/pdfForm03_PLII/ExportPDF';

//04_PLII
import { PrintfPDF04_PLII } from '../../Form04_PLII/pdfForm04_PLII/PrintfPDF';
import { ExportPDF04_PLII } from '../../Form04_PLII/pdfForm04_PLII/ExportPDF';

//04_PLIII_03
import { PrintfPDF04_PLIII_03 } from '../../Form04_PLIII_03/pdfForm04_PLIII_03/PrintfPDF';
import { ExportPDF04_PLIII_03 } from '../../Form04_PLIII_03/pdfForm04_PLIII_03/ExportPDF';


const ViewPDF = ({ route,navigation }) => {

  // const { data0101 } = useContext(UserContext);
  const data = route?.params?.data;
  const nameParams = route?.params?.nameParams;
  console.log('data',data);
  console.log('nameParams',nameParams);

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
            let dataFix = data;
            if(dataFix?.dairy_name){
              dataFix.dairy_name = nameParams + '_' + Math.floor(Math.random() * 100000);
            }
            else{
              dataFix.dairyname = nameParams + '_' + Math.floor(Math.random() * 100000);
            }
            let result;
            switch (nameParams) {
              case 'Mẫu NHẬT KÝ KHAI THÁC THỦY SẢN':
                result = ExportPDF0101(dataFix);
                break;
              case 'MẤU NHẬT KÝ THU MUA, CHUYỂN TẢI THỦY SẢN':  
                result = ExportPDF0201(dataFix);
                break;
              case 'Mẫu Giấy biên nhận bốc dỡ qua cảng':
                result = ExportPDF0202(dataFix);
                break;
              case 'Mẫu Thông tin vận tải':
                result = ExportPDF02b_PLIIb(dataFix);
              case 'Mẫu Kết quả rà soát cảng cá chỉ định có đủ hệ thống xác nhận nguồn gốc thủy sản từ khai thác':
                result = ExportPDF0102(dataFix);
                break;
              case 'Mẫu Biên bản kiểm tra tàu cá cập cảng':
                 result = ExportPDF03_PLII(dataFix);
                break;
              case 'Mẫu Báo cáo khai thác thủy sản':
                result = ExportPDF0301(dataFix);
                break;
              case 'Mẫu Biên bản kiểm tra tàu cá rời cảng':
                result = ExportPDF04_PLII(dataFix);
                break;
              case 'Mẫu Xác nhận cam kết sản phẩm thủy sản xuất khẩu có nguồn gốc từ thủy sản khai thác nhập khẩu':
                result = ExportPDF04_PLIII_03(dataFix);
                break;
              case 'MẪU BÁO CÁO THĂM DÒ, TÌM KIẾM, DẪN DỤ NGUỒN LỢI THỦY SẢN':
                result = ExportPDF0401(dataFix);
                break;

            }

            if (!result) Alert.alert('Thất bại', `không thể tải file pdf`);
          }}>
          <Text style={styles.actionText}>Tải file</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionExportPDF, styles.button]}
          onPress={
            () => {
              let dataFix = { ...data };
              switch (nameParams) {
                case 'Mẫu NHẬT KÝ KHAI THÁC THỦY SẢN':
                  result = PrintfPDF0101(dataFix);
                  break;
                case 'MẤU NHẬT KÝ THU MUA, CHUYỂN TẢI THỦY SẢN':  
                  result = PrintfPDF0201(dataFix);
                  break;
                case 'Mẫu Giấy biên nhận bốc dỡ qua cảng':
                  result = PrintfPDF0202(dataFix);
                  break;
                case 'Mẫu Thông tin vận tải':
                  result = PrintfPDF02b_PLIIb(dataFix);
                  break;
                case 'Mẫu Kết quả rà soát cảng cá chỉ định có đủ hệ thống xác nhận nguồn gốc thủy sản từ khai thác':
                  result = PrintfPDF0102(dataFix);
                  break;
                case 'Mẫu Biên bản kiểm tra tàu cá cập cảng':
                   result = PrintfPDF03_PLII(dataFix);
                  break;
                case 'Mẫu Báo cáo khai thác thủy sản':
                  result = PrintfPDF0301(dataFix);
                  break;
                case 'Mẫu Biên bản kiểm tra tàu cá rời cảng':
                  result = PrintfPDF04_PLII(dataFix);
                  break;
                case 'Mẫu Xác nhận cam kết sản phẩm thủy sản xuất khẩu có nguồn gốc từ thủy sản khai thác nhập khẩu':
                  result = PrintfPDF04_PLIII_03(dataFix);
                  break;
                case 'MẪU BÁO CÁO THĂM DÒ, TÌM KIẾM, DẪN DỤ NGUỒN LỢI THỦY SẢN':
                  result = PrintfPDF0401(dataFix);
                  break;
  
              }
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