import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {UserProvider, UserContext} from '../../contexts/UserContext';
import Storage from '../../utils/storage';
import CheckBox from '@react-native-community/checkbox';
const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const {login, isLoggedIn} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSavePassword, setSavePassword] = useState(false);

  useEffect(() => {
    // This effect runs when the isLoggedIn state changes
    if (isLoggedIn) {
      // isLoggedIn is now true, navigate to another screen
      // ToastAndroid.show('Đăng nhập thành công.', ToastAndroid.SHORT);
      navigation.goBack();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    getDataUserLocal();
  }, []);

  const getDataUserLocal = async () => {
    const data = await Storage.getItem('userLogin');
    if (data != null) {
      const user = JSON.parse(data);
      setUsername(user.username);
      setPassword(user.password);
      setSavePassword(true);
      setShowPassword(true);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login(username, password);

      if (isSavePassword) {
        const user = {
          username: username,
          password: password,
        };
          
        const jsonValue = JSON.stringify(user);
        await Storage.setItem('userLogin', jsonValue);
      } else 
        await Storage.removeItem('userLogin');

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // ToastAndroid.show('Đăng nhập lỗi, vui lòng thử lại', ToastAndroid.SHORT);
    }
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.loginText}>Đăng nhập</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={'gray'}
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          value={username}
        />
        <View style={styles.input}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={'gray'}
            secureTextEntry={showPassword}
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <TouchableOpacity
            style={styles.passwordIconContainer}
            onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="gray"
              style={styles.passwordIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            disabled={false}
            value={isSavePassword}
            onValueChange={value => setSavePassword(value)}
            tintColors={{true: '#0033FF', false: 'gray'}}
          />
          <Text style={styles.label}>Lưu mật khẩu</Text>
        </View>

        <TouchableOpacity
          style={[styles.input, styles.button]}
          onPress={() => handleLogin()}>
          <Text style={{color: 'white', textAlign: 'center'}}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;