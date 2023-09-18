import React, { useContext } from 'react';
import { View, StyleSheet,Alert } from 'react-native';
import Pdf from 'react-native-pdf';
import RNPrint from 'react-native-print';

import moment from 'moment';
import vi from "moment/locale/vi";
export const PrintfPDF = async (data) => { 
    // const duLieu = checkUndefine(data)
    const duLieu= data;
    moment.updateLocale("vi",vi);

    
    try {
        await RNPrint.print({
            html :  `
            <!DOCTYPE html>
            <html>
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>khai thac thuy san</title>
            
                <style type="text/css">
                    * {
                        margin: 0;
                        padding: 0;
                        text-indent: 0;
                    }
            
                    h1 {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: normal;
                        font-weight: bold;
                        text-decoration: none;
                        font-size: 13pt;
                        vertical-align: 11pt;
                    }
            
                    .p,
                    p {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: normal;
                        font-weight: bold;
                        text-decoration: none;
                        font-size: 11pt;
                    }
            
                    .s1 {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: normal;
                        font-weight: bold;
                        text-decoration: none;
                        font-size: 11pt;
                        word-wrap: break-word;
                    }
            
                    .s2 {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: normal;
                        font-weight: normal;
                        font-size: 11pt;
                    }
            
                    .s3 {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: italic;
                        font-weight: normal;
                        text-decoration: none;
                        font-size: 11pt;
                    }
            
                    .s4 {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: normal;
                        font-weight: bold;
                        text-decoration: none;
                        font-size: 11pt;
                        word-wrap: break-word;
                    }
            
                    .s5 {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: normal;
                        font-weight: normal;
                        text-decoration: none;
                        font-size: 11pt;
                        word-wrap: break-word;
                    }
            
                    .s6 {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: italic;
                        font-weight: normal;
                        text-decoration: none;
                        font-size: 11pt;
                    }
            
                    table,
                    tbody {
                        vertical-align: top;
                        overflow: visible;
                    }
            
                    /* Ngắt trang sau phần tử có class="new-page" */
                    .new-page {
                        page-break-after: always;
                    }
            
                    table {
                        border-collapse: collapse;
                        margin-left: 0;
                    }
            
                    table td {
                        border: 1pt solid #2B3D4F;
                    }
            
                    .table-header {
                        border: 1pt solid #2B3D4F;
                        background-color: #D1D6DB;
                        text-align: center;
                        padding-top: 5pt;
                        padding-bottom: 5pt;
            
                    }
            
                    .center-table {
                        text-align: center;
                        vertical-align: middle;
                        padding: 4pt;
                    }
            
                    .chuKy {
                        text-align: center;
                        /* vertical-align: middle; */
                        padding: 4pt;
                    }
            
                    .checkbox-container {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
            
                    input[type="checkbox"] {
                        -webkit-appearance: initial;
                        appearance: initial;
                        background: #fff;
                        width: 15px;
                        height: 15px;
                        border: 1px solid #000;
                        position: relative;
                    }
            
                    input[type="checkbox"]:checked:after {
                        /* Heres your symbol replacement */
                        content: "X";
                        color: #000;
                        position: absolute;
                        font-size: 11px;
                        left: 50%;
                        top: 55%;
                        -webkit-transform: translate(-50%, -50%);
                        -moz-transform: translate(-50%, -50%);
                        -ms-transform: translate(-50%, -50%);
                        transform: translate(-50%, -50%);
                    }
                </style>
            </head>
            
            <body>
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 20pt;">
                        <h1 style="margin: 0;">
                            Số 21 /2018/TT-BNNPTNT
                        </h1>
                        <h1 style="margin: 0;">
                            Mẫu số 04 (Phụ lục II)
                        </h1>
                    </div>
                    <h1 style="padding-top: 6pt; text-align: center;width: 100%;">
                        MẪU GIẤY BIÊN NHẬN THỦY SẢN BỐC DỠ QUA CẢNG
                    </h1>
                    <h1 style="padding-top: 10pt; text-align: center;width: 100%;">
                        CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                    </h1>
                    <h1 style="padding-top: 6pt; text-align: center;width: 100%;">
                        Độc lập - Tự do - Hạnh phúc
                    </h1>
                    <h1 style="padding-top: 0pt; text-align: center;width: 100%;">
                        --------------------
                    </h1>
                    <br />
                    <table style=" border-collapse:collapse; height:100%; width:100%;">
                        <!-- header -->
                        <div>
                            <h1 style="padding-top: 0pt; text-align: center;width: 100%;">
                                GIẤY BIÊN NHẬN THỦY SẢN BỐC DỠ QUA CẢNG
                            </h1>
            
                            <h1 style="padding-top: 4pt; text-align: center;width: 100%;">
                                Số ${duLieu?.sobienban||'...........'}
                            </h1>
            
                            <!-- end -->
                            <!-- 2 thong tin -->
                            <div class="s2">
                                <div style="margin: 16pt 20pt 0 20pt;">
                                <div class="s2" style="display: flex; margin-top: 8pt;">
                                <div style="display: flex; margin-top: 8pt;">
                                    <label style="white-space: nowrap;">Tên cảng cá: ${duLieu?.tencangca || '.....................................'}</label>
                                    <label style="white-space: nowrap;">; Địa chỉ: ${duLieu?.diachi || '...........................................................................................'}<label>
                                </div>
                            </div>
                            
                                    <div style="display: flex; margin-top: 8pt; margin-bottom: 15pt;">
                                        Thời gian:
                                        ${duLieu?.thoigiankt?moment(duLieu?.thoigiankt).format('hh [giờ] mm [phút,] [ngày] DD/MM/YYYY'): '.....................................................................................................................................................'}
                                    </div>
                                </div>
                            </div>
                            <!-- end -->
                            <!-- body and title-->
                            <div class="s2" style="height: auto;">
                                <div style="margin: 0 20pt 0 20pt;">
                                    <div class="s1" style="display: flex; margin-top: 8pt;">
                                        1. Đơn vị kiểm tra:
                                        ${duLieu?.donvikt||'................................................................................................................'}
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        <div style="width: 50%;">
                                            Người kiểm tra:
                                            ${duLieu?.kt1||'...........................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ; Chức vụ:
                                            ${duLieu?.cv1||'........................................................'};
                                        </div>
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        <div style="width: 50%;">
                                            Người kiểm tra:
                                            ${duLieu?.kt2||'...........................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ; Chức vụ:
                                            ${duLieu?.cv2||'........................................................'};
                                        </div>
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        <div style="width: 50%;">
                                            Người kiểm tra:
                                            ${duLieu?.kt3||'...........................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ; Chức vụ:
                                            ${duLieu?.cv3||'........................................................'};
                                        </div>
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        <div style="width: 50%;">
                                            Người kiểm tra:
                                            ${duLieu?.kt4||'...........................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ; Chức vụ:
                                            ${duLieu?.cv4||'........................................................'};
                                        </div>
                                    </div>
                                </div>
            
                                <!-- 2 -->
                                <div style="margin: 0 20pt 0 20pt;">
                                    <div class="s1" style="display: flex; margin-top: 8pt;">
                                        2. Kiểm tra tàu cá:
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        <div style="width: 50%;">
                                            Tên tàu:
                                            ${duLieu?.tentau||'.........................................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ; Số đăng ký tàu:
                                            ${duLieu?.sodangkytau||'.............................................'};
                                        </div>
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        <div style="width: 50%;">
                                            Họ tên chủ tàu:
                                            ${duLieu?.tenchutau||'............................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ; Địa chỉ:
                                            ${duLieu?.diachichutau||'...........................................................'};
                                        </div>
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        <div style="width: 50%;">
                                            Họ và tên thuyền trưởng:
                                            ${duLieu?.thuyentruong||'.........................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ; Địa chỉ:
                                            ${duLieu?.diachithuytruong||'...........................................................'};
                                        </div>
                                    </div>
                                </div>
            
                                <!-- 3 -->
                            </div>
                            <!-- end -->
            
                        </div>
                        <!-- end thong tin  -->
            
                        <!-- body table -->
                        <!-- 3 -->
                        <div class="s1" style="margin: 8pt 20pt 0 20pt; ">
                            3. Kiểm tra hồ sơ:
                        </div>
                        <div style="overflow-x:auto; margin-top: 6pt;">
                            <table cellspacing="0"
                                style="width:100%; height: auto; table-layout: fixed; overflow-wrap: break-word;">
            
                                <tr>
                                    <td class="s5 center-table" style="width: 42%;">
                                        Giấy chứng nhận đăng ký tàu cá
                                    </td>
                                    <td class="s5 center-table" style="width: 8%;">
                                        ${duLieu?.kt_chungnhantauca?'X':''}
                                    </td>
                                    <td class="s5 center-table " style="width: 42%;">
                                        Sổ danh bạ thuyền viên tàu cá
                                    </td>
                                    <td class="s5 center-table" style="width: 8%;">
                                        ${duLieu?.kt_sodanhbathuyvien?'X':''}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="s5 center-table">
                                        Giấy chứng nhận an toàn kỹ thuật tàu cá
                                    </td>
                                    <td class="s5 center-table">
                                        ${duLieu?.kt_antoankithuat?'X':''}
                                    </td>
                                    <td class="s5 center-table ">
                                        Văn bằng, chứng từ thuyền trưởng
                                    </td>
                                    <td class="s5 center-table">
                                        ${duLieu?.kt_chungtuthuyentruong?'X':''}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="s5 center-table">
                                        Giấy phép khai thác thủy sản
                                    </td>
                                    <td class="s5 center-table">
                                        ${duLieu?.kt_gpkt?'X':''}
                                    </td>
                                    <td class="s5 center-table ">
                                        Văn bằng, chứng từ máy trưởng
                                    </td>
                                    <td class="s5 center-table">
                                        ${duLieu?.kt_chungtumaytruong?'X':''}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="s5 center-table">
                                        Nhật ký khai thác thủy sản
                                    </td>
                                    <td class="s5 center-table">
                                        ${duLieu?.kt_nhatkykhaithac?'X':''}
                                    </td>
                                    <td class="s5 center-table ">
                                        Văn bằng, chứng từ thợ máy
                                    </td>
                                    <td class="s5 center-table">
                                        ${duLieu?.kt_chungtuthomay?'X':''}
                                    </td>
                                </tr>
                            </table>
                        </div>
            
                        <!-- 4 -->
                        <div class="s1" style="margin: 8pt 20pt 0 20pt; ">
                            4. Kiểm tra thực tế
                        </div>
                        <!-- 4.1 -->
                        <div class="s1" style="margin: 8pt 20pt 0 20pt;font-style: italic; ">
                            4.1 Trang thiết bị trên tàu <label class="s3" style="margin-left: 30pt;">(Ghi đủ (Đ) hoặc thiếu (T) vào
                                ô tương ứng)</label>
                        </div>
                        <div class="new-page" style="overflow-x:auto; margin-top: 3pt;">
                            <table style="width:100%; height: auto; overflow-wrap: break-word;">
                                <tr>
                                    <td class="s1 center-table" colspan="2">
                                        Loại trang thiết bị
                                    </td>
                                    <td class="s1 center-table">
                                        Diễn giải
                                    </td>
                                    <td class="s1 center-table" colspan="2">
                                        Loại trang thiết bị
                                    </td>
                                    <td class="s1 center-table">
                                        Diễn giải
                                    </td>
                                </tr>
                                <tr>
                                    <td class="s5 center-table" style="width: 22%;">Trang thiết bị hàng hải</td>
                                    <td class="s5 center-table" style="width: 8%;">
                                        ${duLieu?.tbhanghai==undefined?'':duLieu?.tbhanghai==true?'Đ':'T'}
    
                                    </td>
                                    <td class="s5 center-table" style="width: 20%;">
                                        ${duLieu?.tbhanghai_diengiai||''}
                                    </td>
    
                                    <td class="s5 center-table" style="width: 22%;">Cứu sinh, cứu hỏa</td>
                                    <td class="s5 center-table" style="width: 8%;">
                                        ${duLieu?.cuusinhcuuhoa==undefined?'':duLieu?.cuusinhcuuhoa==true?'Đ':'T'}
    
                                    </td>
                                    <td class="s5 center-table" style="width: 20%;">
                                        ${duLieu?.cuusinhcuuhoa_diengiai||''}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="s5 center-table" style="width: 22%;">Thông tin liên lạc, tín hiệu</td>
                                    <td class="s5 center-table" style="width: 8%;">
                                        ${duLieu?.ttlienlac==undefined?'':duLieu?.ttlienlac==true?'Đ':'T'}
    
                                    </td>
                                    <td class="s5 center-table" style="width: 20%;">
                                        ${duLieu?.ttlienlac_diengiai||''}
                                    </td>
    
                                    <td class="s5 center-table" style="width: 22%;">Giám sát hành trình</td>
                                    <td class="s5 center-table" style="width: 8%;">
                                        ${duLieu?.gsht==undefined?'':duLieu?.gsht==true?'Đ':'T'}
    
                                    </td>
                                    <td class="s5 center-table" style="width: 20%;">
                                        ${duLieu?.gsht_diengiai||''}
                                    </td>
                                </tr>
                            </table>
                        </div>
            
                        <!-- 4.2 -->
                        <div class="s1" style="margin: 8pt 20pt 0 20pt; font-style: italic;">
                            4.2 Loại nghề khai thác thủy sản và đánh dấu tàu cá 
                        </div>
                        <div style="overflow-x:auto; margin-top: 3pt;">
                            <table cellspacing="0"
                                style="width:100%; height: auto; table-layout: fixed; overflow-wrap: break-word;">
            
                                <tr>
                                    <td class="s5 center-table" style="width: 17%;">
                                        Lưới kéo
                                    </td>
                                    <td class="s5 center-table" style="width: 8%;">
                                        ${duLieu?.luoikeo?'X':''}
                                    </td>
                                    <td class="s5 center-table " style="width: 17%;">
                                        Lưới vây
                                    </td>
                                    <td class="s5 center-table" style="width: 8%;">
                                        ${duLieu?.luoivay?'X':''}
    
                                    </td>
                                    <td class="s5 center-table " style="width: 17%;">
                                        Nghề chụp
                                    </td>
                                    <td class="s5 center-table" style="width: 8%;">
                                        ${duLieu?.nghechup?'X':''}
                                    </td>
                                    <td class="s5 center-table " style="width: 17%;">
                                        Nghề khác: ${duLieu?.nghekhac}
                                    </td>
                                    <td class="s5 center-table" style="width: 8%;">
                                    ${duLieu?.isnghekhac?'X':''}
    
                                    </td>
                                </tr>
                                <tr>
                                    <td class="s5 center-table" style="width: 17%;">
                                        Nghề câu
                                    </td>
                                    <td class="s5 center-table" style="width: 8%;">
                                    ${duLieu?.nghecau?'X':''}
    
                                    </td>
                                    <td class="s5 center-table " style="width: 17%;">
                                        Lưới rê
                                    </td>
                                    <td class="s5 center-table" style="width: 8%;">
                                    ${duLieu?.luoire?'X':''}
    
                                    </td>
                                    <td class="s5 center-table " style="width: 17%;">
                                        Nghề lồng, bẩy
                                    </td>
                                    <td class="s5 center-table" style="width: 8%;">
                                    ${duLieu?.longbay?'X':''}
    
                                    </td>
                                    <td class="s5 center-table " style="width: 17%;">
                                        Đánh dấu tàu cá
                                    </td>
                                    <td class="s5 center-table" style="width: 8%;">
                                    ${duLieu?.danhdautauca?'X':''}
    
                                    </td>
                                </tr>
            
            
                            </table>
                        </div>      
            
                        <div class="s1" style="margin: 8pt 20pt 0 20pt; font-style: italic; ">
                            4.3 Số lượng thuyền viên tàu cá: ${duLieu?.sothuyenvien} người
                        </div>
                        <!-- 5 -->
                        <div class="s1" style="margin: 8pt 20pt 0 20pt; font-style: italic;">
                            5. Đã nộp báo cáo, nhật ký khai thác thủy sản chuyến trước
                        </div>
                        <div style="overflow-x:auto; margin-top: 3pt;">
                            <table cellspacing="0"
                                style="width:100%; height: auto; table-layout: fixed; overflow-wrap: break-word;">
            
                                <tr>
                                    <td class="s5 center-table" style="width: 42%;">
                                        Báo cáo khai thác thủy sản
                                    </td>
                                    <td class="s5 center-table" style="width: 8%;">
                                    ${duLieu?.bckhaithac?'X':''}
    
                                    </td>
                                    <td class="s5 center-table " style="width: 42%;">
                                        Nhật ký khai thác thủy sản
                                    </td>
                                    <td class="s5 center-table" style="width: 8%;">
                                    ${duLieu?.nhatkykhaithac?'X':''}
    
                                    </td>
                                </tr>
            
                            </table>
                        </div>   
                        <div class="s1" style="margin: 8pt 20pt 0 20pt; ">
                            6. Kết luận kiểm tra: <label class="s2" >${duLieu?.ketluan || '...........................................................................................................................'}</label>
                        </div>
                        <!-- end -->
                        <div style="display: flex; justify-content: space-between;">
                            <div style="margin-left: 20pt; margin-top: 12pt;">
                                <div class="chuKy">
                                    <h1 style="margin-bottom: 6pt;">Chủ tàu/thuyền trưởng</h1>
                                    <div class="s6 new-page" style="margin-top: 4pt;">(ký, ghi rõ họ và tên)</div>
                                </div>
                            </div>
                            <div style="margin-right: 20pt;  margin-top: 12pt;">
                                <div class="chuKy">
                                    <h1 style="margin-bottom: 6pt;">Đại diện đơn vị kiểm tra</h1>
                                    <div class="s6 new-page" style="margin-top: 4pt;">(ký, đóng dấu xác nhận)</div>
                                </div>
                            </div>
                        </div>
                        <!-- end body table -->
            
                    </table>
            
                </div>
            
                <!-- end -->
            </body>
            
            </html>`
        });
    } catch (error) {
        Alert.alert('Lỗi', error.message);
    }
};

