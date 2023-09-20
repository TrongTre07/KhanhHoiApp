import React, { useContext } from 'react';
import { View, StyleSheet,Alert } from 'react-native';
import Pdf from 'react-native-pdf';
import RNPrint from 'react-native-print';

import moment from 'moment';
import vi from "moment/locale/vi";
export const PrintfPDF0202 = async (data) => { 
    // const duLieu = checkUndefine(data)
    const duLieu= data;
    console.log('duLieu: ', duLieu);
    moment.updateLocale("vi",vi);
    let totalByType =0;
    duLieu.ls0202ds.forEach(element => {
        totalByType+=Number(element.khoiluong);
    });
    
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
            
                </style>
            </head>
            
            <body>
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 20pt;">
                        <h1 style="margin: 0;">
                            Số 21 /2018/TT-BNNPTNT
                        </h1>
                        <h1 style="margin: 0;">
                            Mẫu số 02 (Phụ lục II)
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
                                Số ${duLieu?.sobiennhan||'...........'}
                            </h1>
            
                            <h1 style="padding-top: 4pt; text-align: center;width: 100%;font-style: italic;
                                        font-weight: normal;">
                                (Giấy biên nhận có giá trị 90 ngày, kể từ ngày được cấp)
                            </h1>
            
                            <!-- end -->
                            <!-- 2 thong tin -->
                            <div class="s2">
                                <div style="margin: 0 20pt 0 20pt;">
                                    <div style="display: flex; margin-top: 8pt;height: 13pt;">
                                        Tên cảng cá:
                                        ${duLieu?.tencangca||'..............................................................................................................................................................'}
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        Địa chỉ:
                                        ${duLieu?.diachi||'.....................................................................................................................................................................'}
                                    </div>
                                </div>
                            </div>
                            <!-- end -->
                            <!-- body and title-->
                            <h1 style="padding-top: 4pt; text-align: center;width: 100%;">
                                BIÊN NHẬN
                            </h1>
                            <div class="s2">
                                <div style="margin: 0 20pt 0 20pt;">
                                    <div style="display: flex; margin-top: 8pt;height: 13pt;">
                                        1. Họ và tên chủ tàu/thuyền trưởng:
                                        ${duLieu?.tenchutauthuyentruong||'................................................................................................................'}
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        2. Số đăng ký tàu:
                                        ${duLieu?.biensotau||'..................................................................................................................................................'}
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        <div style="width: 60%;">
                                            3. Giấy phép khai thác thủy sản số: ${duLieu?.giayphepkhaithac||'........................................'}
                                        </div>
                                        <div style="width: 40%;">
                                            ; Thời hạn đến: ${duLieu?.thoihan_gpkt?moment(duLieu.thoihan_gpkt).format('DD-MM-YYYY'):'..........................'};
                                        </div>
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        4. Ngày: ${duLieu?.ngaybochang?moment(duLieu.ngaybochang).format('DD-MM-YYYY') :'..............'} đã bốc dỡ qua cảng
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        5: Tổng sản lượng thủy sản bốc dỡ: ${totalByType!=0?totalByType+'':'...................'} kg
                                    </div>
                                </div>
                            </div>
                            <!-- end -->
            
                        </div>
                        <!-- end thong tin  -->
            
                        <!-- body table -->
                        <div class="s2" style="margin: 8pt 16pt 0 16pt; font-style: italic; ">
                            Chi tiết về sản lượng thủy sản bốc dỡ:
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
            
                                    <td style="text-align: center; vertical-align: middle; width: 22%;" rowspan="1"
                                        bgcolor="#D1D6DB">
                                        <p class="s4">
                                            Khối lượng bốc dỡ qua cảng (kg)
                                        </p>
                                    </td>
                                </tr>
                                ${duLieu?.ls0202ds?.map((line,index) => `
                                <tr>
                                    <td class="s5 center-table">
                                        ${index+1}
                                    </td>
                                    <td class="s5 center-table">
                                        ${line?.tenloai}
                                    </td>
                                    <td class="s5 center-table">
                                        ${line?.khoiluong==0?'':line?.khoiluong}
                                    </td>
                                </tr>
                                `).join('')}
            
                            </table>
                            <!-- 2 thong tin -->
                            <div class="s2">
                                <div style="margin: 0 20pt 0 20pt;">
                                    <div style="display: flex; margin-top: 8pt;height: 13pt;">
                                        6. Người thu mua sản phẩm (Cơ sở CBTS/nậu, vựa/người buôn):
                                        ${duLieu?.nguoithumua||'..................................................................'}
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        7. Hình thức bán sản phẩm (Toàn bộ/một phần/theo loài):
                                        ${duLieu?.hinhthucbansp||'...........................................................................'}
                                    </div>
                                </div>
                            </div>
                            <!-- end -->
                            <div class="new-page" style="display: flex; justify-content: space-between;">
                                <div style="margin-left: 20pt; margin-top: 20pt;">
                                    <div class="chuKy">
                                        <h1 style="margin-bottom: 6pt;">Đại diện tàu cá</h1>
                                        <div class="s6" style="margin-top: 4pt;">(ký, ghi rõ họ và tên)</div>
                                    </div>
                                </div>
                                <div style="margin-right: 20pt;">
                                    <div class="chuKy">
                                        <div class="s6" style="margin-bottom: 6pt;">Ngày ...... tháng ...... năm ......</div>
                                        <h1 style="margin-bottom: 6pt;">Đại diện cảng cá</h1>
                                        <div class="s6" style="margin-bottom: 6pt;">(ký, ghi rõ họ và tên)</div>
                                    </div>
                                </div>
                            </div>
            
                            <br>
                        </div>
            
                        <!-- end body table -->
            
                        <!-- table 2 -->
                        <!-- body table -->
                        <div class="new-page" style="width: 100%;">
                            <h1 style="margin: 8pt 16pt 0 16pt;">
                                XÁC NHẬN KHỐI LƯỢNG THỦY SẢN CÒN LẠI
                            </h1>
                            <div class="s2" style="margin: 2pt 16pt 0 16pt;font-size: 9pt; font-style: italic; ">
                                (Dùng cho tổ chức quản lý cảng cá xác nhận khối lượng nguyên liệu thủy sản còn lại khi chưa xác nhận
                                hết khối lượng nguyên liệu
                                thủy sản trong Giấy biên nhận thủy sản bốc dỡ qua cảng)
                            </div>
                            <div class="s2" style="margin: 8pt 16pt 0 16pt; ">
                                ............, ngày ${duLieu?.xacnhan?.ngaylap?moment(duLieu.xacnhan.ngaylap).format('LL'):'..... tháng ..... năm .....'}; Cảng cá: ${duLieu?.xacnhan?.cangca||'.......................'} xác nhận khối lượng thủy sản còn lại trong
                                Giấy biên nhận thủy sản bốc dỡ qua cảng sau khi cấp Giấy xác nhận nguyên
                                liệu thủy sản khai thác số: ${duLieu?.xacnhan?.soxacnhannguyenlieukhaithac}
            
                            </div>
                            <div style="overflow-x:auto; margin-top: 6pt;">
                                <table cellspacing="0"
                                    style="width:100%; height: auto; table-layout: fixed; overflow-wrap: break-word;">
                                    <tr>
                                        <td style="text-align: center;padding: 4pt; vertical-align: middle; width: 9%;" rowspan="1"
                                            bgcolor="#D1D6DB">
                                            <div class="s4">
                                                TT
                                            </div>
                                        </td>
                                        <td style="text-align:  center; vertical-align: middle; width: 25%;" rowspan="1"
                                            bgcolor="#D1D6DB">
                                            <p class="s4">
                                                Tên loài thủy sản</p>
                                        </td>
            
                                        <td style="text-align: center; vertical-align: middle; width: 22%;" rowspan="1"
                                            bgcolor="#D1D6DB">
                                            <p class="s4">
                                                Khối lượng thủy sản bốc dỡ qua cảng (kg)
                                            </p>
                                        </td>
            
                                        <td style="text-align: center; vertical-align: middle; width: 22%;" rowspan="1"
                                            bgcolor="#D1D6DB">
                                            <p class="s4">
                                                Khối lượng thủy sản đã xác nhận (kg)
                                            </p>
                                        </td>
            
                                        <td style="text-align: center; vertical-align: middle; width: 22%;" rowspan="1"
                                            bgcolor="#D1D6DB">
                                            <p class="s4">
                                                Khối lượng thủy sản còn lại (kg)
                                            </p>
                                        </td>
                                    </tr>
                                    ${duLieu?.xacnhan?.lsxacnhan_?.map((line,index) => `
                                    <tr>
                                        <td class="s5 center-table">
                                            ${index+1}
                                        </td>
                                        <td class="s5 center-table">
                                            ${line?.tenloai}
                                        </td>
                                        <td class="s5 center-table">
                                            ${line?.klbocdoquacang==0?'':line?.klbocdoquacang}
                                        </td>
                                        <td class="s5 center-table">
                                            ${line?.kldaxacnhan==0?'':line?.kldaxacnhan}
                                        </td>
                                        <td class="s5 center-table">
                                            ${line?.klconlai==0?'':line?.klconlai}
                                        </td>
                                    </tr>
                                    `).join('')}
            
                                </table>
                                <!-- end -->
                                <div style="float: right; margin-right: 20pt; margin-top:20p">
                                    <div class="chuKy">
                                        <h1 style="margin-bottom: 6pt;">
                                            Thủ trưởng đơn vị: ............
                                        </h1>
                                        <div class="s6 " style="margin-top: 0pt;">
                                            (ký tên, đóng dấu)
                                        </div>
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

