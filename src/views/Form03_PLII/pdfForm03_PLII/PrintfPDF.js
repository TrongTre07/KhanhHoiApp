import React, { useContext } from 'react';
import { View, StyleSheet,Alert } from 'react-native';
import Pdf from 'react-native-pdf';
import RNPrint from 'react-native-print';

import moment from 'moment';
import vi from "moment/locale/vi";
export const PrintfPDF03_PLII = async (data) => { 
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
                    input[type="checkbox"]{
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
                        -webkit-transform: translate(-50%,-50%);
                        -moz-transform: translate(-50%,-50%);
                        -ms-transform: translate(-50%,-50%);
                        transform: translate(-50%,-50%);
                    }
                </style>
            </head>
            
            <body>
                <div>
                    <div style="display: flex;font-size: 11pt; justify-content: space-between; align-items: center; padding-top: 5pt;">
                        <h1 style="margin: 0;">
                            Số 21 /2018/TT-BNNPTNT
                        </h1>
                        <h1 style="margin: 0; font-size: 11pt;">
                            Mẫu số 03 (Phụ lục II)
                        </h1>
                    </div>
                    <h1 style="padding-top: 6pt; text-align: center;width: 100%;">
                        MẪU BIÊN BẢN KIỂM TRA TÀU CÁ CẬP CẢNG
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
                                BIÊN BẢN KIỂM TRA TÀU CÁ CẬP CẢNG
                            </h1>
            
                            <h1 style="padding-top: 4pt; text-align: center;width: 100%;">
                                Số ${duLieu?.sobienban || '...........'}
                            </h1>
            
                            <!-- end -->
                            <!-- 2 thong tin -->
                            <div class="s2">
                                <div style="margin: 14pt 20pt 0 20pt;">
                                <div class="s2" style="display: flex; margin-top: 8pt;">
                                <div style="display: flex; margin-top: 0pt;">
                                    <label style="white-space: nowrap;">Tên cảng cá: ${duLieu?.tencangca || '.......................................'}</label>
                                    <label style="white-space: nowrap;">; Địa chỉ: ${duLieu?.diachi || '.........................................................................................'}<label>
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
                                        1. Đơn vị kiểm tra: ${duLieu?.donvikt || '..............................................................................................................'}
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        <div style="width: 50%;">
                                            Người kiểm tra: ${duLieu?.kt1 || '..........................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ; Chức vụ: ${duLieu?.cv1 || '..........................................................'}
                                        </div>
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        <div style="width: 50%;">
                                            Người kiểm tra: ${duLieu?.kt2 || '..........................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ; Chức vụ: ${duLieu?.cv2 || '..........................................................'}
                                        </div>
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        <div style="width: 50%;">
                                            Người kiểm tra: ${duLieu?.kt3 || '..........................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ; Chức vụ: ${duLieu?.cv3 || '..........................................................'}
                                        </div>
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        <div style="width: 50%;">
                                            Người kiểm tra: ${duLieu?.kt4 || '..........................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ; Chức vụ: ${duLieu?.cv4 || '..........................................................'}
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
                                            Tên tàu: ${duLieu?.tentau || '........................................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ; Số đăng ký tàu: ${duLieu?.sodangkytau || '.......................................................'}
                                        </div>
                                    </div>
                                    <div style="margin-top: 8pt;">
                                        Loại nghề khai thác thủy sản: ${duLieu?.nghekhaithac || '...........................................................................................................................'}
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        <div style="width: 50%;">
                                            Họ tên chủ tàu: ${duLieu?.tenchutau || '............................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ; Địa chỉ: ${duLieu?.diachichutau || '....................................................................'};
                                        </div>
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        <div style="width: 50%;">
                                            Họ và tên thuyền trưởng: ${duLieu?.thuyentruong || '........................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ; Địa chỉ: ${duLieu?.diachithuytruong || '....................................................................'};
                                        </div>
                                    </div>
                                </div>
    
                                <!-- 3 -->
                                <div style="margin: 0 20pt 0 20pt;">
                                    <div class="s1" style="display: flex; margin-top: 8pt;">
                                        3. Kiểm tra hồ sơ:
                                    </div>                                    
                                    <div class="checkbox-container" style="margin-top: 4pt; justify-content: space-around;">
                                        <label class="checkbox-label">
                                            Báo cáo khai thác thủy sản <input style="margin-left: 20pt;" type="checkbox"  ${duLieu?.bckhaithac ? 'checked' : ''}>
                                        </label>
                                        
                                        <label class="checkbox-label">
                                            Nhật ký khai thác thủy sản <input style="margin-left: 20pt;" type="checkbox" ${duLieu?.bcnhatky ? 'checked' : ''}> 
                                        </label>                     
                                    </div>
    
                                </div>
                            </div>
                            <!-- end -->
            
                        </div>
                        <!-- end thong tin  -->
            
                        <!-- body table -->
                        <div class="s1" style="margin: 8pt 16pt 0 16pt; ">
                            4. Kiểm tra sản lượng khai thác:
                        </div>
                        <div style="overflow-x:auto; margin-top: 6pt;">
                            <table cellspacing="0"
                                style="width:100%; height: auto; table-layout: fixed; overflow-wrap: break-word;">
                                <tr>
                                    <td style="text-align: center;padding: 4pt; vertical-align: middle; width: 8%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <div class="s4">
                                            TT
                                        </div>
                                    </td>
                                    <td style="text-align:  center; vertical-align: middle; width: 60%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <p class="s4">
                                            Tên loài thủy sản</p>
                                    </td>
    
                                    <td style="text-align:  center; vertical-align: middle; width: 60%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <p class="s4">
                                            Số lượng theo báo cáo (kg)</p>
                                    </td>
            
                                    <td style="text-align: center; vertical-align: middle; width: 22%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <p class="s4">
                                            Số lượng thực tế (kg)
                                        </p>
                                    </td>
                                </tr>
                                ${duLieu?.tbldairy_0203_ls?.map((line, index) => `
                                <tr>
                                    <td class="s5 center-table">
                                        ${index + 1}
                                    </td>
                                    <td class="s5 center-table">
                                        ${line?.tenloai}
                                    </td>
                                    <td class="s5 center-table">
                                        ${line?.slbaocao == 0 ? '' : line?.slbaocao}
                                    </td>
                                    <td class="s5 center-table">
                                        ${line?.slthucte == 0 ? '' : line?.slthucte}
                                    </td>
                                </tr>
                                `).join('')}
            
                            </table>
                            <!-- 2 thong tin -->
                            <div class="s1" style="margin: 8pt 20pt 0 16pt; ">
                        
                                5. Kết luận kiểm tra: <label class="s2" >${duLieu?.ketluan || '...................................................................................................................'}</label>
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
            
                            <br>
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

