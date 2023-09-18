import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import React, {useState, useMemo, useContext, useEffect} from 'react';
import styles from './styles';

import moment from 'moment';
import {UserContext} from '../../contexts/UserContext';
import {useNetInfo} from '@react-native-community/netinfo';
import {Picker} from '@react-native-picker/picker';
import CustomDatePicker from '../others/CustomDatePicker';
import Storage from '../../utils/storage';
import CheckBox from '@react-native-community/checkbox';
import CustomDateTimePicker from '../others/CustomDateTimePicker';

const widthText = 400;
const widthText4_2 = 300;
const TableKiemTraThucTe = ({}) => {
  //data
  const {dataInfShip, setData04_PLII, data04_PLII, setDataInfShip} =
    useContext(UserContext);
  const netInfo = useNetInfo();

  // check ko có wifi thì lấy dataInfShip từ local
  useEffect(() => {
    if (!netInfo.isConnected) {
      getShipInfo();
    }
  }, [netInfo.isConnected]);

  const getShipInfo = async () => {
    const result = await Storage.getItem('dataInfShip');
    if (result !== null) {
      const dataShip = JSON.parse(result);
      setDataInfShip(dataShip);
    }
  };

  const handleChangeThoiHanGPKT = thoiHan => {
    try {
      setData04_PLII({
        ...data04_PLII,
        thoigiankt: moment(thoiHan, 'DD/MM/YYYY HH:mm:ss').format(
          'YYYY-MM-DDTHH:mm:ss',
        ),
      });
    } catch (error) {
      console.log('ERROR ', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={[styles.row]}>
        <View style={[styles.row, {height: 'auto'}]}>
          <Text style={styles.textBold}>4. Kiểm tra thực tế</Text>

          <Text style={styles.text}>;</Text>
        </View>
      </View>
      <View style={[styles.row]}>
        <View style={[styles.row, {height: 'auto', marginBottom: 10}]}>
          <Text style={styles.textBold}>
            4.1 Trang thiết bị trên tàu( Ghi đủ (Đ) hoặc thiếu (T) vào ô tương
            ứng)
          </Text>

          <Text style={styles.text}>;</Text>
        </View>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: widthText,
              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <Text style={[styles.text, {marginLeft: 10}]}>
              Loại trang thiết bị
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthText,

              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <Text style={[styles.text, {marginLeft: 10}]}>
              Trang thiết bị hàng hải
            </Text>
            <CheckBox
              value={data04_PLII?.tbhanghai}
              onValueChange={value =>
                setData04_PLII({...data04_PLII, tbhanghai: value})
              }
              style={{marginRight: 20}}
              tintColors={{true: 'gray', false: 'gray'}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthText,
              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <Text style={[styles.text, {marginLeft: 10}]}>
              Thông tin liên lạc, tín hiệu
            </Text>
            <CheckBox
              value={data04_PLII?.ttlienlac}
              onValueChange={value =>
                setData04_PLII({...data04_PLII, ttlienlac: value})
              }
              style={{marginRight: 20}}
              tintColors={{true: 'gray', false: 'gray'}}
            />
          </View>
        </View>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: widthText,
              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <Text style={[styles.text, {marginLeft: 10}]}>Diễn giải</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthText,

              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <TextInput
              style={[
                styles.inputCheckBox,
                {marginHorizontal: 5, width: '100%'},
              ]}
              value={data04_PLII?.tbhanghai_diengiai}
              onChangeText={value =>
                setData04_PLII({...data04_PLII, tbhanghai_diengiai: value})
              }
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthText,
              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <TextInput
              style={[
                styles.inputCheckBox,
                {marginHorizontal: 5, width: '100%'},
              ]}
              value={data04_PLII?.ttlienlac_diengiai}
              onChangeText={value =>
                setData04_PLII({...data04_PLII, ttlienlac_diengiai: value})
              }
            />
          </View>
        </View>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: widthText,
              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <Text style={[styles.text, {marginLeft: 10}]}>
              Loại trang thiết bị
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthText,

              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <Text style={[styles.text, {marginLeft: 10}]}>
              Cứu sinh, cứu hỏa
            </Text>
            <CheckBox
              value={data04_PLII?.cuusinhcuuhoa}
              onValueChange={value =>
                setData04_PLII({...data04_PLII, cuusinhcuuhoa: value})
              }
              style={{marginRight: 20}}
              tintColors={{true: 'gray', false: 'gray'}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthText,
              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <Text style={[styles.text, {marginLeft: 10}]}>
              Giám sát hành trình
            </Text>
            <CheckBox
              value={data04_PLII?.gsht}
              onValueChange={value =>
                setData04_PLII({...data04_PLII, gsht: value})
              }
              style={{marginRight: 20}}
              tintColors={{true: 'gray', false: 'gray'}}
            />
          </View>
        </View>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: widthText,
              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <Text style={[styles.text, {marginLeft: 10}]}>Diễn giải</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthText,

              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <TextInput
              style={[
                styles.inputCheckBox,
                {marginHorizontal: 5, width: '100%'},
              ]}
              value={data04_PLII?.cuusinhcuuhoa_diengiai}
              onChangeText={value =>
                setData04_PLII({...data04_PLII, cuusinhcuuhoa_diengiai: value})
              }
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthText,
              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <TextInput
              style={[
                styles.inputCheckBox,
                {marginHorizontal: 5, width: '100%'},
              ]}
              value={data04_PLII?.gsht_diengiai}
              onChangeText={value =>
                setData04_PLII({...data04_PLII, gsht_diengiai: value})
              }
            />
          </View>
        </View>
      </ScrollView>

      <View style={[styles.row]}>
        <View style={[styles.row, {height: 'auto', marginBottom: 10}]}>
          <Text style={styles.textBold}>
            4.2 Loại nghề khai thác thủy sản và đánh dấu tàu cá
          </Text>
          <Text style={styles.text}>;</Text>
        </View>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthText4_2,

              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <Text style={[styles.text, {marginLeft: 10}]}>Lưới kéo</Text>
            <CheckBox
              value={data04_PLII?.luoikeo}
              onValueChange={value =>
                setData04_PLII({...data04_PLII, luoikeo: value})
              }
              style={{marginRight: 20}}
              tintColors={{true: 'gray', false: 'gray'}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthText4_2,
              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <Text style={[styles.text, {marginLeft: 10}]}>Nghề câu</Text>
            <CheckBox
              value={data04_PLII?.nghecau}
              onValueChange={value =>
                setData04_PLII({...data04_PLII, nghecau: value})
              }
              style={{marginRight: 20}}
              tintColors={{true: 'gray', false: 'gray'}}
            />
          </View>
        </View>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthText4_2,

              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <Text style={[styles.text, {marginLeft: 10}]}>Lưới vây</Text>
            <CheckBox
              value={data04_PLII?.luoivay}
              onValueChange={value =>
                setData04_PLII({...data04_PLII, luoivay: value})
              }
              style={{marginRight: 20}}
              tintColors={{true: 'gray', false: 'gray'}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthText4_2,
              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <Text style={[styles.text, {marginLeft: 10}]}>Lưới rê</Text>
            <CheckBox
              value={data04_PLII?.luoire}
              onValueChange={value =>
                setData04_PLII({...data04_PLII, luoire: value})
              }
              style={{marginRight: 20}}
              tintColors={{true: 'gray', false: 'gray'}}
            />
          </View>
        </View>

        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthText4_2,

              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <Text style={[styles.text, {marginLeft: 10}]}>Nghề chụp</Text>
            <CheckBox
              value={data04_PLII?.nghechup}
              onValueChange={value =>
                setData04_PLII({...data04_PLII, nghechup: value})
              }
              style={{marginRight: 20}}
              tintColors={{true: 'gray', false: 'gray'}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthText4_2,
              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <Text style={[styles.text, {marginLeft: 10}]}>Nghề lồng, bẩy</Text>
            <CheckBox
              value={data04_PLII?.longbay}
              onValueChange={value =>
                setData04_PLII({...data04_PLII, longbay: value})
              }
              style={{marginRight: 20}}
              tintColors={{true: 'gray', false: 'gray'}}
            />
          </View>
        </View>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthText4_2 * 2,

              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <Text style={[styles.text, {marginLeft: 10}]}>Nghề khác</Text>
            <TextInput
              style={[
                styles.inputCheckBox,
                {marginHorizontal: 5, width: '50%'},
              ]}
              onChangeText={value =>
                setData04_PLII({...data04_PLII, nghekhac: value})
              }
              value={data04_PLII?.nghekhac}
            />
            <CheckBox
              value={data04_PLII?.isnghekhac}
              onValueChange={value =>
                setData04_PLII({...data04_PLII, isnghekhac: value})
              }
              style={{marginRight: 20}}
              tintColors={{true: 'gray', false: 'gray'}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthText4_2 * 2,
              height: 60,
              borderColor: '#0099FF',
              borderWidth: 1,
            }}>
            <Text style={[styles.text, {marginLeft: 10}]}>Đánh dấu tàu cá</Text>
            <CheckBox
              value={data04_PLII?.danhdautauca}
              onValueChange={value =>
                setData04_PLII({...data04_PLII, danhdautauca: value})
              }
              style={{marginRight: 20}}
              tintColors={{true: 'gray', false: 'gray'}}
            />
          </View>
        </View>
      </ScrollView>

      <View style={[styles.row, {marginVertical: 10}]}>
        <View style={[styles.row, {height: 'auto'}]}>
          <Text style={styles.textBold}>4.3 Số lượng thuyền viên tàu cá:</Text>
          <TextInput
            keyboardType="numeric"
            style={[styles.inputCheckBox, styles.text]}
            value={data04_PLII?.sothuyenvien+''}
            onChangeText={value => {
              if (isNaN(value)) {
                value = 0;
              } else if (value == '') {
                value = 0;
              }
              setData04_PLII({
                ...data04_PLII,
                sothuyenvien: parseInt(value, 10),
              });
            }}
          />
          <Text style={styles.text}>người;</Text>
        </View>
      </View>
      <View style={[styles.row, {marginVertical: 10}]}>
        <View style={[styles.row, {height: 'auto'}]}>
          <Text style={styles.textBold}>
            5. Đã nộp báo cáo, nhật ký khai thác thủy sản chuyến trước
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '50%',

            height: 60,
            borderColor: '#0099FF',
            borderWidth: 1,
          }}>
          <Text style={[styles.text, {marginLeft: 10}]}>
            Trang thiết bị hàng hải
          </Text>
          <CheckBox
            value={data04_PLII?.bckhaithac}
            onValueChange={value =>
              setData04_PLII({...data04_PLII, bckhaithac: value})
            }
            style={{marginRight: 20}}
            tintColors={{true: 'gray', false: 'gray'}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '50%',

            height: 60,
            borderColor: '#0099FF',
            borderWidth: 1,
          }}>
          <Text style={[styles.text, {marginLeft: 10}]}>
            Trang thiết bị hàng hải
          </Text>
          <CheckBox
            value={data04_PLII?.nhatkykhaithac}
            onValueChange={value =>
              setData04_PLII({...data04_PLII, nhatkykhaithac: value})
            }
            style={{marginRight: 20}}
            tintColors={{true: 'gray', false: 'gray'}}
          />
        </View>
      </View>
      <View style={[styles.row, {marginVertical: 10}]}>
        <View style={[styles.row, {height: 'auto'}]}>
          <Text style={styles.textBold}>6. Kết luận kiểm tra:</Text>
          <TextInput
            style={[styles.inputCheckBox, styles.text]}
            value={data04_PLII?.ketluan}
            onChangeText={value =>
              setData04_PLII({...data04_PLII, ketluan: value})
            }
          />
          <Text style={styles.text}>;</Text>
        </View>
      </View>
    </View>
  );
};

export default TableKiemTraThucTe;
