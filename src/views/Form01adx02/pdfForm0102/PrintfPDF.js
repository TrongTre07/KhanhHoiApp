import React, { useContext } from 'react';
import { View, StyleSheet,Alert } from 'react-native';
import Pdf from 'react-native-pdf';
import RNPrint from 'react-native-print';

import moment from 'moment';
import vi from "moment/locale/vi";
export const PrintfPDF0102 = async (data) => { 
    // const duLieu = checkUndefine(data)
    const duLieu= data;
    // console.log('duLieu: ', duLieu);
    moment.updateLocale("vi",vi);
    
    try {
        await RNPrint.print({
            html :  `
            <!DOCTYPE html>
            <html>
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>bao cao</title>
            
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
                        font-size: 12pt;
                        vertical-align: 11pt;
                    }
            
                    .p,
                    p {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: normal;
                        font-weight: bold;
                        text-decoration: none;
                        font-size: 10pt;
                    }
            
                    .s1 {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: normal;
                        font-weight: bold;
                        text-decoration: none;
                        font-size: 10pt;
                    }
            
                    .s2 {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: normal;
                        font-weight: normal;
                        font-size: 10pt;
                    }
            
                    .s3 {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: italic;
                        font-weight: normal;
                        text-decoration: none;
                        font-size: 10pt;
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
                        font-size: 10pt;
                        word-wrap: break-word;
                    }
            
                    .s6 {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: italic;
                        font-weight: normal;
                        text-decoration: none;
                        font-size: 10pt;
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
                        padding: 5pt;
                    }
            
                    .chuKy {
                        text-align: center;
                        /* vertical-align: middle; */
                        padding: 5pt;
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
                        width: 13px;
                        height: 13px;
                        border: 1px solid #000;
                        position: relative;
                    }
            
                    input[type="checkbox"]:checked:after {
                        /* Heres your symbol replacement */
                        content: "X";
                        color: #000;
                        position: absolute;
                        font-size: 9px;
                        left: 50%;
                        top: 70%;
                        -webkit-transform: translate(-50%, -50%);
                        -moz-transform: translate(-50%, -50%);
                        -ms-transform: translate(-50%, -50%);
                        transform: translate(-50%, -50%);
                    }
                </style>
            </head>
            
            <body>
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12pt;">
                        <h1 style="margin: 0;">
                            Số 21 /2018/TT-BNNPTNT
                        </h1>
                        <h1 style="margin: 0;">
                            Mẫu số 01 (Phụ lục II)
                        </h1>
                    </div>
                    <h1 style="padding-top: 6pt; text-align: center;width: 100%;">
                        MẪU BÁO CÁO KẾT QUẢ RÀ SOÁT CẢNG CÁ CHỈ ĐỊNH CÓ ĐỦ <br>
                        HỆ THỐNG XÁC NHẬN NGUỒN GỐC THỦY HÀI SẢN TỪ KHAI THÁC
            
                    </h1>
                    <div style="display: flex; justify-content: space-around; align-items: center;">
                        <div>
                            <h1 style="padding-top: 6pt; text-align: center;width: 100%;">
                                [UBND CẤP TỈNH]
                            </h1>
                            <h1 style="padding-top: 6pt; text-align: center;width: 100%;">
                                [TÊN SỞ NN&PTNN]
                            </h1>
                            <h1 style="padding-top: 0pt; text-align: center;width: 100%;">
                                --------------------
                            </h1>
                            <div class="s5" style="padding-top: 6pt; text-align:center;width: 100%;">
                                Số: ${duLieu?.sobacao}
            
                            </div>
                        </div>
                        <div>
                            <h1 style="padding-top: 6pt; text-align: center;width: 100%;">
                                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                            </h1>
                            <h1 style="padding-top: 6pt; text-align: center;width: 100%;">
                                Độc lập - Tự do - Hạnh phúc
                            </h1>
                            <h1 style="padding-top: 0pt; text-align: center;width: 100%;">
                                --------------------
                            </h1>
                            <div class="s5" style="padding-top: 6pt; text-align:center;width: 100%;">
                                ......., ngày ...... tháng ......năm........
            
                            </div>
                        </div>
                    </div>
            
            
                    <br />
                    <table style=" border-collapse:collapse; height:100%; width:100%;">
                        <!-- header -->
                        <div>
                            <div>
                                <h1 style="padding-top: 6pt; text-align: center;width: 100%;">
                                    BÁO CÁO
                                </h1>
                                <h1 style="padding-top: 6pt; text-align: center;width: 100%;">
                                    Kết quả rà soát cảng cá chỉ định có đủ hệ thống xác nhận nguồn gốc <br>
                                    thủy sản từ khai thác
                                </h1>
                                <h1 style="padding-top: 0pt; text-align: center;width: 100%;">
                                    --------------------
                                </h1>
                                <div class="s5" style="padding-top: 6pt; text-align:center;width: 100%;">
                                    Kính gửi: ${duLieu?.kinhgui||'.......................'}
                                </div>
                            </div>
                            <div class="s5" style="margin: 12pt 30pt 0 30pt">
                                Căn cứ khoản 2 Điều 6 Thông tư số 21/2018/TT-BNNPTNT, [Sở Nông nghiệp
                                và Phát triển nông thôn] báo cáo kết quả rà soát cảng cá chỉ định có đủ hệ thống
                                xác nhận nguồn gốc thủy sản từ khai thác đề nghị Tổng cục Thủy sản tổng hợp,
                                trình Bộ Nông nghiệp và Phát triển nông thôn công bố đưa vào hoặc đưa ra
                                khỏi danh sách cảng cá chỉ định có đủ hệ thống xác nhận nguồn gốc thủy sản từ
                                khai thác như sau:
                            </div>
                            <!-- end -->
                        </div>
                        <!-- body table -->
                        <div class="s2">
                            <div class="s4" style="margin: 10pt 30pt 0 30pt">1. Cảng cá đề nghị đưa vào danh sách cảng cá chỉ định:
                            </div>
                            <table cellspacing="0"
                                style="width:100%; margin-top:6pt; height: auto; table-layout: fixed; overflow-wrap: break-word;">
                                <tr>
                                    <td style="text-align: center; vertical-align: middle; width: 8%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <div class="s4">
                                            TT
                                        </div>
                                    </td>
                                    <td style="text-align: center; vertical-align: middle; width: 60%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <p class="s4">
                                            Tên cảng cá</p>
                                    </td>
            
                                    <td style="text-align: center; vertical-align: middle; width: 22%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <p class="s4">
                                            Cảng cá loại </p>
                                    </td>
            
                                    <td style="text-align: center; vertical-align: middle; width: 22%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <p class="s4">
                                            Địa chỉ </p>
                                    </td>
                                    <td style="text-align: center; vertical-align: middle; width: 22%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <p class="s4">
                                            Điện thoại </p>
                                    </td>
                                    <td style="text-align: center; vertical-align: middle; width: 22%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <p class="s4">
                                            Số quyết định <br>
                                            công bố mở cảng </p>
                                    </td>
                                    <td style="text-align: center; vertical-align: middle; width: 22%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <p class="s4">
                                            Ghi chú
                                        </p>
                                    </td>
                                </tr>
                                ${duLieu?.cangca_ds_denghi.map((line,index) => `
                                <tr>
                                    <td class="s5 center-table">
                                        ${index+1}
                                    </td>
                                    <td class="s5 center-table">
                                        ${line?.tencang}
                                    </td>
                                    <td class="s5 center-table">
                                        ${line?.loaicangca}
                                    </td>
                                    <td class="s5 center-table">
                                        ${line?.diachi}
                                    </td>
                                    <td class="s5 center-table">
                                        ${line?.dienthoai}
                                    </td>
                                    <td class="s5 center-table">
                                        ${line?.soquyetdinhmocang}
                                    </td>
                                    <td class="s5 center-table">
                                        ${line?.ghichu}
                                    </td>
            
                                </tr>
                                `).join('')}
            
                            </table>
                            <!-- end table 1  -->
            
                            <!-- table 2 -->
                            <div class="s4" style="margin: 8pt 30pt 0 30pt">
                                2. Cảng cá đề nghị đưa khỏi danh sách cảng cá chỉ định: (Đối với cảng cá không đảm bảo đủ hệ thống
                                xác nhận
                                nguồn gốc thủy sản từ khai thác)
                            </div>
                            <table cellspacing="0"
                                style="width:100%; margin-top:6pt; height: auto; table-layout: fixed; overflow-wrap: break-word;">
                                <tr>
                                    <td style="text-align: center; vertical-align: middle; width: 8%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <div class="s4">
                                            TT
                                        </div>
                                    </td>
                                    <td style="text-align: center; vertical-align: middle; width: 60%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <p class="s4">
                                            Tên cảng cá</p>
                                    </td>
            
                                    <td style="text-align: center; vertical-align: middle; width: 22%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <p class="s4">
                                            Cảng cá loại </p>
                                    </td>
            
                                    <td style="text-align: center; vertical-align: middle; width: 22%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <p class="s4">
                                            Địa chỉ </p>
                                    </td>
                                    <td style="text-align: center; vertical-align: middle; width: 22%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <p class="s4">
                                            Điện thoại </p>
                                    </td>
                                    <td style="text-align: center; vertical-align: middle; width: 22%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <p class="s4">
                                            Lý do đề nghị đưa ra khỏi danh sách cảng chỉ định </p>
                                    </td>
                                    <td style="text-align: center; vertical-align: middle; width: 22%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <p class="s4">
                                            Ghi chú
                                        </p>
                                    </td>
                                </tr>
                                ${duLieu?.cangca_ds_khaitru.map((line,index) => `
                                <tr>
                                    <td class="s5 center-table">
                                        ${index+1}
                                    </td>
                                    <td class="s5 center-table">
                                        ${line?.tencang}
                                    </td>
                                    <td class="s5 center-table">
                                        ${line?.loaicangca}
                                    </td>
                                    <td class="s5 center-table">
                                        ${line?.diachi}
                                    </td>
                                    <td class="s5 center-table">
                                        ${line?.dienthoai}
                                    </td>
                                    <td class="s5 center-table">
                                        ${line?.lydokhaitru}
                                    </td>
                                    <td class="s5 center-table">
                                        ${line?.ghichu}
                                    </td>
            
                                </tr>
                                `).join('')}
            
                            </table>
            
                            <!-- end table 2 -->
            
                            <div style="float: right; margin-right: 30pt; margin-top:20pt">
                                <div class="chuKy">
                                    <h1>
                                        THỦ TRƯỞNG ĐƠN VỊ
                                    </h1>
                                    <div class="s6 new-page" style="margin-top: 4pt;">
                                        (ký, đóng dấu xác nhận)
                                    </div>
                                </div>
                            </div>
                        </div>
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

