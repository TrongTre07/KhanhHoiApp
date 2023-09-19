// LoginContext.js
import React, {createContext, useEffect, useState, useMemo} from 'react';
import instance from '../axios/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ToastAndroid, Alert} from 'react-native';
import jwtDecode from 'jwt-decode';
import Storage from '../utils/storage';
import RNRestart from 'react-native-restart';

import data0101Empty from '../views/Form01adx01/models/data0101Empty';
import data0201Empty from '../views/Form02adx01/models/data0201';
import data0301Empty from '../views/Form03adx01/models/data0301';
import data0401Empty from '../views/Form04adx01/models/data0401';
import data0102Empty from '../views/Form01adx02/models/data0102';
import data0202Empty from '../views/Form02adx02/models/data0202';
import data03_PLIIEmpty from '../views/Form03_PLII/models/data03_PLII';
import data04_PLIIEmpty from '../views/Form04_PLII/models/data04_PLII';
import data02b_PLIIbEmpty from '../views/Form02b_PLIIb/models/data02b_PLIIb';
import data04_PLIII_03Empty from '../views/Form04_PLIII_03/models/data04_PLIII_03';

const UserContext = createContext();

const UserProvider = ({children}) => {
  const [data0101, setData0101] = useState(data0101Empty);
  const [data0201, setData0201] = useState(data0201Empty);
  const [data0301, setData0301] = useState(data0301Empty);
  const [data0401, setData0401] = useState(data0401Empty);
  const [data0102, setData0102] = useState(data0102Empty);
  const [data0202, setData0202] = useState(data0202Empty);
  const [data03_PLII, setData03_PLII] = useState(data03_PLIIEmpty);
  const [data04_PLII, setData04_PLII] = useState(data04_PLIIEmpty);
  const [data02b_PLIIb, setData02b_PLIIb] = useState(data02b_PLIIbEmpty);
  const [data04_PLIII_03, setData04_PLIII_03] = useState(data04_PLIII_03Empty);

  const [dataInfShip, setDataInfShip] = useState([]);
  const [token, setToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialTitle, setInitialTitle] = useState('');
  const [goBackAlert, setGoBackAlert] = useState(false);
  const [checkViewPDF, setCheckViewPDF] = useState(false);

  const [isPDFLoading, setIsPDFLoading] = useState(false);

  const login = async (username, password) => {
    try {
      const payload = {userName_: username, pass_: password};

      const response = await instance.post('home/login', payload);

      if (response.data != null) {
        await Storage.setItem('token', response.data);
        setIsLoggedIn(true);
        ToastAndroid.show('Đăng nhập thành công.', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          'Tài khoản hoặc mật khẩu không đúng.',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      setIsError(true);
      console.error('Error fetching data or saving token:', error);
      ToastAndroid.show(
        'Đăng nhập thất bại, vui lòng thử lại sau.',
        ToastAndroid.SHORT,
      );
    }
  };

  //check login token
  const checkLoginStatus = async () => {
    try {
      // có token thì true ko thì false
      const userToken = await Storage.getItem('token');
      if (userToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

  //gọi check login lần đầu
  useEffect(() => {
    checkLoginStatus();
  }, []);

  //form 0101 ...............................................................................................................
  //tạo form
  const postForm0101 = async obj => {
    try {
      // console.log("obj",obj)
      setIsLoading(true);
      const response = await instance.post('api/FormAppendix/0101/create', obj);

      if (response.data == false) {
        setIsLoading(false);
        return false;
      }
      setIsLoading(false);
      setInitialTitle('');
      return true;
    } catch (error) {
      setIsLoading(false);
      // if (error.response.status === 401) {
      //   getAlert401();
      // }
      console.log('POST 0101 ERROR: ', error);
      setInitialTitle('');
      return false;
    }
  };

  //getDi
  const getDiaryForm0101 = async () => {
    try {
      if (await Storage.getItem('token')) {
        const response = await instance.get('api/FormAppendix/getall_0101');
        // setData(await response.data);

        //api getShip
        const dataship = await instance.get('api/FormAppendix/getallship');
        setDataInfShip(await dataship.data);
        await Storage.setItem('dataInfShip', JSON.stringify(dataship.data));

        return response.data;
      }
    } catch (error) {
      console.log('getdiary 0101 ERROR: ', error);
      if (error.response.status === 401) {
        getAlert401();
      }
    }
  };

  const deleteForm0101_Id = async id => {
    try {
      if (id) {
        await instance.post(`api/FormAppendix/0101/del/${id}`);
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('Delete ERROR: ', error);
    }
  };

  const getDetailForm0101_Id = async id => {
    try {
      setIsLoading(true);
      if (!id) {
        setInitialTitle('');
      }
      if (await Storage.getItem('token')) {
        const response = await instance.get(
          `/api/FormAppendix/getdetail_0101_byid/${id}`,
        );

        setInitialTitle(response.data.dairy_name);
        setData0101(await response.data);
        setIsLoading(false);
        return response.data;
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 401) {
        getAlert401();
      }
      setInitialTitle('');
      console.log('ERROR: ', error);
    }
  };

  const updateForm0101 = async obj => {
    try {
      setIsLoading(true);
      const response = await instance.post(
        `/api/FormAppendix/0101/update`,
        obj,
      );
      if (response.data == true) {
        Alert.alert('Thành công', 'Bạn đã cập nhật thành công!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
              setGoBackAlert(true);
            },
          },
        ]);
      }
      setIsLoading(false);
      setInitialTitle('');
    } catch (error) {
      setIsLoading(false);
      console.log('ERROR UPDATE: ', error);
      if (error.response.status === 401) {
        getAlert401();
      } else
        Alert.alert('Lỗi', 'Không thể cập nhật!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
            },
          },
        ]);
      setInitialTitle('');
    }
  };
  //end

  //form 0201 ...............................................................................................................
  //get diary form
  const getDiaryForm0201 = async () => {
    try {
      if (await Storage.getItem('token')) {
        const response = await instance.get('api/FormAppendix/getall_0201');
        return response.data;
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
    }
  };

  //delete form
  const deleteForm0201Id = async id => {
    try {
      if (id) {
        await instance.post(`api/FormAppendix/0201/del/${id}`);
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('Delete ERROR: ', error);
    }
  };

  //get form theo id
  const getDetailForm0201Id = async id => {
    try {
      setIsLoading(true);
      if (!id) {
        setInitialTitle('');
      }
      if ((await Storage.getItem('token')) && id) {
        const response = await instance.get(
          `/api/FormAppendix/get_detail_0201_by_id/${id}`,
        );

        setInitialTitle(response.data.dairy_name);
        setData0201(await response.data);
        setIsLoading(false);
        return response.data;
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('ERROR: ', error);
      setIsLoading(false);
      setInitialTitle('');
    }
  };

  const postForm0201 = async obj => {
    try {
      setIsLoading(true);
      const response = await instance.post('api/FormAppendix/0201/create', obj);

      if (response.data == false) {
        setIsLoading(false);
        return false;
      }
      setIsLoading(false);
      setInitialTitle('');

      return true;
    } catch (error) {
      setIsLoading(false);

      if (error.response.status === 401) {
        getAlert401();
      } 
      setInitialTitle('');
      console.log('POST ERROR: ', error);
      return false;
    }
  };

  const updateForm0201 = async obj => {
    // dateedit
    try {
      const response = await instance.post(
        `/api/FormAppendix/0201/update`,
        obj,
      );
      if (response.data == true) {
        Alert.alert('Thành công', 'Bạn đã cập nhật thành công!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
              setGoBackAlert(true);
            },
          },
        ]);
      }
      setInitialTitle('');
    } catch (error) {
      console.log('ERROR UPDATE: ', error);
      if (error.response.status === 401) {
        getAlert401();
      } else
        Alert.alert('Lỗi', 'Không thể cập nhật!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
            },
          },
        ]);
      setInitialTitle('');
    }
  };

  //end

  //form 0301 ...............................................................................................................
  //get diary form
  const getDiaryForm0301 = async () => {
    try {
      if (await Storage.getItem('token')) {
        const response = await instance.get('api/FormAppendix/0301/getall');
        return response.data;
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
    }
  };

  //delete form
  const deleteForm0301Id = async id => {
    try {
      if (id) {
        await instance.post(`api/FormAppendix/0301/del/${id}`);
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('Delete ERROR: ', error);
    }
  };

  //get form theo id
  const getDetailForm0301Id = async id => {
    try {
      setIsLoading(true);
      if (!id) {
        setInitialTitle('');
      }
      if ((await Storage.getItem('token')) && id) {
        const response = await instance.get(
          `/api/FormAppendix/0301/getbyid/${id}`,
        );

        setInitialTitle(response.data.dairyname);
        setData0301(await response.data);
        setIsLoading(false);
        console.log('MODIFY:', JSON.stringify(response.data, null, 2));

        return response.data;
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('ERROR: ', error);
    }
  };

  const postForm0301 = async obj => {
    try {
      setIsLoading(true);
      const response = await instance.post('api/FormAppendix/0301/create', obj);

      if (response.data == false) {
        setIsLoading(false);
        return false;
      }
      setIsLoading(false);
      setInitialTitle('');

      return true;
    } catch (error) {
      setIsLoading(false);

      if (error.response.status === 401) {
        getAlert401();
      } 
      console.log('POST ERROR: ', error);
      setInitialTitle('');

      return false;
    }
  };

  const updateForm0301 = async obj => {
    // console.log(JSON.stringify(obj, null, 2));
    try {
      setIsLoading(true);
      const response = await instance.post(
        `/api/FormAppendix/0301/update`,
        obj,
      );
      if (response.data == true) {
        setIsLoading(false);
        Alert.alert('Thành công', 'Bạn đã cập nhật thành công!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
              setGoBackAlert(true);
            },
          },
        ]);
      }
      setInitialTitle('');
    } catch (error) {
      setIsLoading(false);

      console.log('ERROR UPDATE: ', error);
      if (error.response.status === 401) {
        getAlert401();
      } else
        Alert.alert('Lỗi', 'Không thể cập nhật!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
            },
          },
        ]);
      setInitialTitle('');
    }
  };
  //end

  //form 0401 ...............................................................................................................
  //get diary form
  const getDiaryForm0401 = async () => {
    try {
      if (await Storage.getItem('token')) {
        const response = await instance.get('api/FormAppendix/0401/getall');
        return response.data;
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
    }
  };

  //delete form
  const deleteForm0401Id = async id => {
    try {
      if (id) {
        await instance.post(`api/FormAppendix/0401/del/${id}`);
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('Delete ERROR: ', error);
    }
  };

  //get form theo id
  const getDetailForm0401Id = async id => {
    try {
      setIsLoading(true);
      if (!id) {
        setInitialTitle('');
      }
      if ((await Storage.getItem('token')) && id) {
        const response = await instance.get(
          `/api/FormAppendix/0401/getbyid/${id}`,
        );

        setInitialTitle(response.data.dairyname);
        setData0401(await response.data);
        setIsLoading(false);
        return response.data;
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('ERROR: ', error);
    }
  };

  const postForm0401 = async obj => {
    try {
      setIsLoading(true);
      const response = await instance.post('api/FormAppendix/0401/create', obj);

      if (response.data == false) {
        setIsLoading(false);
        return false;
      }
      setIsLoading(false);
      setInitialTitle('');

      return true;
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 401) {
        getAlert401();
      } 
      console.log('POST ERROR: ', error);
      setInitialTitle('');

      return false;
    }
  };
  const updateForm0401 = async obj => {
    // console.log(JSON.stringify(obj, null, 2));
    try {
      setIsLoading(true);
      const response = await instance.post(
        `/api/FormAppendix/0401/update`,
        obj,
      );
      if (response.data == true) {
        setIsLoading(false);
        Alert.alert('Thành công', 'Bạn đã cập nhật thành công!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
              setGoBackAlert(true);
            },
          },
        ]);
      }
      setInitialTitle('');
    } catch (error) {
      setIsLoading(false);
      setInitialTitle('');
      console.log('ERROR UPDATE: ', error);
      if (error.response.status === 401) {
        getAlert401();
      } else
        Alert.alert('Lỗi', 'Không thể cập nhật!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
            },
          },
        ]);
      setInitialTitle('');
    }
  };
  //end

  //form 0102 ...............................................................................................................
  //get diary form
  const getDiaryForm0102 = async () => {
    try {
      if (await Storage.getItem('token')) {
        const response = await instance.get('api/FormAppendix/bcrs/getall');
        return response.data;
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
    }
  };

  //delete form
  const deleteForm0102Id = async id => {
    try {
      if (id) {
        await instance.post(`api/FormAppendix/bcrs/del/${id}`);
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('Delete ERROR: ', error);
    }
  };

  //get form theo id
  const getDetailForm0102Id = async id => {
    try {
      setIsLoading(true);

      if (!id) {
        setInitialTitle('');
      }
      if ((await Storage.getItem('token')) && id) {
        const response = await instance.get(
          `/api/FormAppendix/bcrs/getbyid/${id}`,
        );
        setInitialTitle(response.data.dairyname);
        setData0102(await response.data);
        setIsLoading(false);

        return response.data;
      }
    } catch (error) {
      setIsLoading(false);

      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('ERROR: ', error);
    }
  };

  const postForm0102 = async obj => {
    try {
      setIsLoading(true);
      const response = await instance.post('api/FormAppendix/bcrs/create', obj);

      if (response.data == false) {
        setIsLoading(false);
        return false;
      }
      setIsLoading(false);
      setInitialTitle('');

      return true;
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 401) {
        getAlert401();
      } 
      console.log('POST ERROR: ', error);
      setInitialTitle('');

      return false;
    }
  };
  const updateForm0102 = async obj => {
    // console.log(JSON.stringify(obj, null, 2));
    try {
      setIsLoading(true);
      const response = await instance.post(
        `/api/FormAppendix/bcrs/update`,
        obj,
      );
      if (response.data == true) {
        setIsLoading(false);
        Alert.alert('Thành công', 'Bạn đã cập nhật thành công!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
              setGoBackAlert(true);
            },
          },
        ]);
      }
      setInitialTitle('');
    } catch (error) {
      setIsLoading(false);

      console.log('ERROR UPDATE: ', error);
      if (error.response.status === 401) {
        getAlert401();
      } else
        Alert.alert('Lỗi', 'Không thể cập nhật!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
            },
          },
        ]);
      setInitialTitle('');
    }
  };
  //end

  //form 0202 ...............................................................................................................
  //get diary form
  const getDiaryForm0202 = async () => {
    try {
      if (await Storage.getItem('token')) {
        const response = await instance.get('api/FormAppendix/0202/getall');
        return response.data;
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
    }
  };

  //delete form
  const deleteForm0202Id = async id => {
    try {
      if (id) {
        await instance.post(`api/FormAppendix/0202/del/${id}`);
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('Delete ERROR: ', error);
    }
  };

  //get form theo id
  const getDetailForm0202Id = async id => {
    try {
      setIsLoading(true);

      if (!id) {
        setInitialTitle('');
      }
      if ((await Storage.getItem('token')) && id) {
        const response = await instance.get(
          `/api/FormAppendix/0202/getbyid/${id}`,
        );

        setInitialTitle(response.data.dairy_name);
        setData0202(await response.data);
        setIsLoading(false);
        return response.data;
      }
    } catch (error) {
      setIsLoading(false);

      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('ERROR: ', error);
    }
  };

  const postForm0202 = async obj => {
    try {
      setIsLoading(true);
      const response = await instance.post('api/FormAppendix/0202/create', obj);

      if (response.data == false) {
        setIsLoading(false);
        return false;
      }
      setIsLoading(false);
      setInitialTitle('');

      return true;
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 401) {
        getAlert401();
      } 
      console.log('POST ERROR: ', error);
      setInitialTitle('');

      return false;
    }
  };
  const updateForm0202 = async obj => {
    // console.log(JSON.stringify(obj, null, 2));
    try {
      setIsLoading(true);
      const response = await instance.post(
        `/api/FormAppendix/0202/update`,
        obj,
      );
      if (response.data == true) {
        setIsLoading(false);
        Alert.alert('Thành công', 'Bạn đã cập nhật thành công!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
              setGoBackAlert(true);
              setData0202(data0202Empty);
            },
          },
        ]);
      }
      setInitialTitle('');
    } catch (error) {
      setIsLoading(false);

      console.log('ERROR UPDATE: ', error);
      if (error.response.status === 401) {
        getAlert401();
      } else
        Alert.alert('Lỗi', 'Không thể cập nhật!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
            },
          },
        ]);
      setInitialTitle('');
    }
  };
  //end

  //form 03_PLII ...............................................................................................................
  //get diary form
  const getDiaryForm03_PLII = async () => {
    try {
      if (await Storage.getItem('token')) {
        const response = await instance.get('api/FormAppendix/0203/getall');
        return response.data;
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
    }
  };

  //delete form
  const deleteForm03_PLII_Id = async id => {
    try {
      if (id) {
        await instance.post(`api/FormAppendix/0203/del/${id}`);
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('Delete ERROR: ', error);
    }
  };

  //get form theo id
  const getDetailForm03_PLII_Id = async id => {
    try {
      setIsLoading(true);

      if (!id) {
        setInitialTitle('');
      }
      if ((await Storage.getItem('token')) && id) {
        const response = await instance.get(
          `/api/FormAppendix/0203/getbyid/${id}`,
        );

        setInitialTitle(response?.data.dairyname);
        setData03_PLII(await response.data);
        setIsLoading(false);
        return response.data;
      }
    } catch (error) {
      setIsLoading(false);

      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('ERROR: ', error);
    }
  };

  const postForm03_PLII = async obj => {
    try {
      setIsLoading(true);
      const response = await instance.post('api/FormAppendix/0203/create', obj);

      if (response.data == false) {
        setIsLoading(false);
        return false;
      }
      setIsLoading(false);
      setInitialTitle('');

      return true;
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 401) {
        getAlert401();
      } 
      console.log('POST ERROR: ', error);
      setInitialTitle('');

      return false;
    }
  };
  const updateForm03_PLII = async obj => {
    // console.log(JSON.stringify(obj, null, 2));
    try {
      setIsLoading(true);
      const response = await instance.post(
        `/api/FormAppendix/0203/update`,
        obj,
      );
      if (response.data == true) {
        setIsLoading(false);
        Alert.alert('Thành công', 'Bạn đã cập nhật thành công!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
              setGoBackAlert(true);
            },
          },
        ]);
      }
      setInitialTitle('');
    } catch (error) {
      setIsLoading(false);

      console.log('ERROR UPDATE: ', error);
      if (error.response.status === 401) {
        getAlert401();
      } else
        Alert.alert('Lỗi', 'Không thể cập nhật!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
            },
          },
        ]);
      setInitialTitle('');
    }
  };
  //end

  //form 04_PLII ...............................................................................................................
  //get diary form
  const getDiaryForm04_PLII = async () => {
    try {
      if (await Storage.getItem('token')) {
        const response = await instance.get('api/FormAppendix/0204/getall');
        return response.data;
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
    }
  };

  //delete form
  const deleteForm04_PLII_Id = async id => {
    try {
      if (id) {
        await instance.post(`api/FormAppendix/0204/del/${id}`);
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('Delete ERROR: ', error);
    }
  };

  //get form theo id
  const getDetailForm04_PLII_Id = async id => {
    try {
      setIsLoading(true);

      if (!id) {
        setInitialTitle('');
      }
      if ((await Storage.getItem('token')) && id) {
        const response = await instance.get(
          `/api/FormAppendix/0204/getbyid/${id}`,
        );

        setInitialTitle(response?.data.dairyname);
        setData04_PLII(await response.data);
        setIsLoading(false);
        return response.data;
      }
    } catch (error) {
      setIsLoading(false);

      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('ERROR: ', error);
    }
  };

  const postForm04_PLII = async obj => {
    try {
      setIsLoading(true);
      const response = await instance.post('api/FormAppendix/0204/create', obj);

      if (response.data == false) {
        setIsLoading(false);
        return false;
      }
      setIsLoading(false);
      setInitialTitle('');

      return true;
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 401) {
        getAlert401();
      } 
      setInitialTitle('');

      return false;
    }
  };
  const updateForm04_PLII = async obj => {
    // console.log(JSON.stringify(obj, null, 2));
    try {
      setIsLoading(true);
      const response = await instance.post(
        `/api/FormAppendix/0204/update`,
        obj,
      );
      if (response.data == true) {
        setIsLoading(false);
        Alert.alert('Thành công', 'Bạn đã cập nhật thành công!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
              setGoBackAlert(true);
            },
          },
        ]);
      }
      setInitialTitle('');
    } catch (error) {
      setIsLoading(false);

      console.log('ERROR UPDATE: ', error);
      if (error.response.status === 401) {
        getAlert401();
      } else
        Alert.alert('Lỗi', 'Không thể cập nhật!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
            },
          },
        ]);
      setInitialTitle('');
    }
  };
  //end

  //form 02b_PLIIb ...............................................................................................................
  //get diary form
  const getDiaryForm02b_PLIIb = async () => {
    try {
      if (await Storage.getItem('token')) {
        const response = await instance.get(
          'api/FormAppendix/thongtinvantai/getall',
        );
        return response.data;
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
    }
  };

  //delete form
  const deleteForm02b_PLIIb_Id = async id => {
    try {
      if (id) {
        await instance.post(`api/FormAppendix/thongtinvantai/del/${id}`);
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('Delete ERROR: ', error);
    }
  };

  //get form theo id
  const getDetailForm02b_PLIIb_Id = async id => {
    try {
      setIsLoading(true);

      if (!id) {
        setInitialTitle('');
      }
      if ((await Storage.getItem('token')) && id) {
        const response = await instance.get(
          `/api/FormAppendix/thongtinvantai/getbyid/${id}`,
        );

        setInitialTitle(response?.data.dairyname);
        setData02b_PLIIb(await response.data);
        setIsLoading(false);
        return response.data;
      }
    } catch (error) {
      setIsLoading(false);

      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('ERROR: ', error);
    }
  };

  const postForm02b_PLIIb = async obj => {
    try {
      setIsLoading(true);
      const response = await instance.post(
        'api/FormAppendix/thongtinvantai/create',
        obj,
      );

      if (response.data == false) {
        setIsLoading(false);
        return false;
      }
      setIsLoading(false);
      setInitialTitle('');

      return true;
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 401) {
        getAlert401();
      } 
      console.log('POST ERROR: ', error);
      setInitialTitle('');

      return false;
    }
  };

  const updateForm02b_PLIIb = async obj => {
    // console.log(JSON.stringify(obj, null, 2));
    try {
      setIsLoading(true);
      const response = await instance.post(
        `/api/FormAppendix/thongtinvantai/update`,
        obj,
      );
      if (response.data == true) {
        setIsLoading(false);
        Alert.alert('Thành công', 'Bạn đã cập nhật thành công!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
              setGoBackAlert(true);
            },
          },
        ]);
      }
      setInitialTitle('');
    } catch (error) {
      setIsLoading(false);

      console.log('ERROR UPDATE: ', error);
      if (error.response.status === 401) {
        getAlert401();
      } else
        Alert.alert('Lỗi', 'Không thể cập nhật!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
            },
          },
        ]);
      setInitialTitle('');
    }
  };
  //end

  //form 04_PLIII_03 ...............................................................................................................
  //get diary form
  const getDiaryForm04_PLIII_03 = async () => {
    try {
      if (await Storage.getItem('token')) {
        const response = await instance.get(
          'api/FormAppendix/xacnhancamket/getall',
        );
        return response.data;
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
      return false; 
    }
  };

  //delete form
  const deleteForm04_PLIII_03_Id = async id => {
    try {
      if (id) {
        await instance.post(`api/FormAppendix/xacnhancamket/del/${id}`);
      }
    } catch (error) {
      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('Delete ERROR: ', error);
    }
  };

  //get form theo id
  const getDetailForm04_PLIII_03_Id = async id => {
    try {
      setIsLoading(true);

      if (!id) {
        setInitialTitle('');
      }
      if ((await Storage.getItem('token')) && id) {
        const response = await instance.get(
          `/api/FormAppendix/xacnhancamket/getbyid/${id}`,
        );

        setInitialTitle(response?.data.dairyname);
        setData04_PLIII_03(await response.data);
        setIsLoading(false);
        return response.data;
      }
    } catch (error) {
      setIsLoading(false);

      if (error.response.status === 401) {
        getAlert401();
      }
      console.log('ERROR: ', error);
    }
  };

  const postForm04_PLIII_03 = async obj => {
    try {
      setIsLoading(true);
      const response = await instance.post(
        'api/FormAppendix/xacnhancamket/create',
        obj,
      );

      if (response.data == false) {
        setIsLoading(false);
        return false;
      }
      setIsLoading(false);
      setInitialTitle('');

      return true;
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 401) {
        getAlert401();
      } 
      console.log('POST ERROR: ', error);
      setInitialTitle('');

      return false;
    }
  };

  const updateForm04_PLIII_03 = async obj => {
    // console.log(JSON.stringify(obj, null, 2));
    try {
      setIsLoading(true);
      const response = await instance.post(
        `/api/FormAppendix/xacnhancamket/update`,
        obj,
      );
      if (response.data == true) {
        setIsLoading(false);
        Alert.alert('Thành công', 'Bạn đã cập nhật thành công!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
              setGoBackAlert(true);
            },
          },
        ]);
      }
      setInitialTitle('');
    } catch (error) {
      setIsLoading(false);

      console.log('ERROR UPDATE: ', error);
      if (error.response.status === 401) {
        getAlert401();
      } else
        Alert.alert('Lỗi', 'Không thể cập nhật!', [
          {
            text: 'OK',
            onPress: () => {
              // ;
            },
          },
        ]);
      setInitialTitle('');
    }
  };
  //end

  //check token
  let is401ErrorDisplayed = false;
  const getAlert401 = () => {
    if (!is401ErrorDisplayed) { // Kiểm tra nếu lỗi 401 chưa được hiển thị
      is401ErrorDisplayed = true; // Đánh dấu rằng lỗi đã được hiển thị
      Alert.alert('Đã hết phiên đăng nhập!', 'Vui lòng đăng nhập lại', [
        {
          text: 'ok',
          onPress: () => {
            setIsLoggedIn(false);
            Storage.removeItem('token');
            is401ErrorDisplayed = false; // Đặt lại biến flag khi người dùng đã xử lý lỗi
          },
        },
      ]);
    }
  };

  const contextValues = useMemo(
    () => ({
      isPDFLoading,
      setIsPDFLoading,
      checkViewPDF,
      setCheckViewPDF,
      isLoggedIn,
      setIsLoggedIn,
      login,
      token,
      setToken,
      postForm0101,
      postForm0201,
      isLoading,
      setIsLoading,

      dataInfShip,

      getDiaryForm0101,
      deleteForm0101_Id,
      data0101,
      setData0101,
      getDetailForm0101_Id,
      updateForm0101,
      initialTitle,
      setInitialTitle,
      setDataInfShip,
      goBackAlert,
      setGoBackAlert,

      getDiaryForm0201,
      deleteForm0201Id,
      getDetailForm0201Id,
      postForm0201,
      data0201,
      setData0201,
      // data0201Empty,
      updateForm0201,

      getDiaryForm0301,
      deleteForm0301Id,
      getDetailForm0301Id,
      postForm0301,
      updateForm0301,
      data0301,
      setData0301,

      data0401,
      setData0401,
      getDetailForm0401Id,
      postForm0401,
      deleteForm0401Id,
      getDiaryForm0401,
      updateForm0401,

      data0102,
      setData0102,
      getDetailForm0102Id,
      postForm0102,
      deleteForm0102Id,
      getDiaryForm0102,
      updateForm0102,

      data0202,
      setData0202,
      getDetailForm0202Id,
      postForm0202,
      deleteForm0202Id,
      getDiaryForm0202,
      updateForm0202,

      data03_PLII,
      setData03_PLII,
      getDetailForm03_PLII_Id,
      postForm03_PLII,
      deleteForm03_PLII_Id,
      getDiaryForm03_PLII,
      updateForm03_PLII,

      data04_PLII,
      setData04_PLII,
      getDetailForm04_PLII_Id,
      postForm04_PLII,
      deleteForm04_PLII_Id,
      getDiaryForm04_PLII,
      updateForm04_PLII,

      data02b_PLIIb,
      setData02b_PLIIb,
      getDetailForm02b_PLIIb_Id,
      postForm02b_PLIIb,
      deleteForm02b_PLIIb_Id,
      getDiaryForm02b_PLIIb,
      updateForm02b_PLIIb,

      data04_PLIII_03,
      setData04_PLIII_03,
      getDetailForm04_PLIII_03_Id,
      postForm04_PLIII_03,
      deleteForm04_PLIII_03_Id,
      getDiaryForm04_PLIII_03,
      updateForm04_PLIII_03,
    }),
    [
      isPDFLoading,
      setIsPDFLoading,
      checkViewPDF,
      setCheckViewPDF,
      isLoggedIn,
      setIsLoggedIn,
      login,
      token,
      setToken,
      postForm0101,
      postForm0201,
      isLoading,
      setIsLoading,

      getDiaryForm0101,
      deleteForm0101_Id,
      dataInfShip,
      data0101,
      setData0101,
      getDetailForm0101_Id,
      updateForm0101,
      initialTitle,
      setInitialTitle,
      setDataInfShip,
      goBackAlert,
      setGoBackAlert,

      getDiaryForm0201,
      deleteForm0201Id,
      getDetailForm0201Id,
      postForm0201,
      data0201,
      setData0201,
      // data0201Empty,
      updateForm0201,

      getDiaryForm0301,
      deleteForm0301Id,
      getDetailForm0301Id,
      postForm0301,
      updateForm0301,
      data0301,
      setData0301,

      data0401,
      setData0401,
      getDetailForm0401Id,
      postForm0401,
      deleteForm0401Id,
      getDiaryForm0401,
      updateForm0401,

      data0102,
      setData0102,
      getDetailForm0102Id,
      postForm0102,
      deleteForm0102Id,
      getDiaryForm0102,
      updateForm0102,

      data0202,
      setData0202,
      getDetailForm0202Id,
      postForm0202,
      deleteForm0202Id,
      getDiaryForm0202,
      updateForm0202,

      data03_PLII,
      setData03_PLII,
      getDetailForm03_PLII_Id,
      postForm03_PLII,
      deleteForm03_PLII_Id,
      getDiaryForm03_PLII,
      updateForm03_PLII,

      data04_PLII,
      setData04_PLII,
      getDetailForm04_PLII_Id,
      postForm04_PLII,
      deleteForm04_PLII_Id,
      getDiaryForm04_PLII,
      updateForm04_PLII,

      data02b_PLIIb,
      setData02b_PLIIb,
      getDetailForm02b_PLIIb_Id,
      postForm02b_PLIIb,
      deleteForm02b_PLIIb_Id,
      getDiaryForm02b_PLIIb,
      updateForm02b_PLIIb,

      data04_PLIII_03,
      setData04_PLIII_03,
      getDetailForm04_PLIII_03_Id,
      postForm04_PLIII_03,
      deleteForm04_PLIII_03_Id,
      getDiaryForm04_PLIII_03,
      updateForm04_PLIII_03,
    ],
  );

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, UserProvider};
