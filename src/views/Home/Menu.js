import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import styles from './styles'

import { UserContext } from '../../contexts/UserContext';
const Menu = ({navigation}) => {

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >
            <View style={styles.container}>
                <View style={styles.box}>
                    <View style={[styles.header,{alignItems:'center'}]}><Text style={styles.txtHeader}>Danh sách</Text></View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('form01adx01Diary')}
                        style={[styles.btn,]}>
                        <Text style={styles.text}>01-PLI. Nhật ký khai thác thủy sản</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn,]}>
                        <Text style={styles.text}>02-PLI. Nhật ký thu mua, chuyên tải thủy sản</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn,]}>
                        <Text style={styles.text}>04-PLI. Báo cáo thăm dò, tìm kiếm, dẫn dụ nguồn lợi thủy sản</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>


    )
}

export default Menu