import React, { useContext } from 'react';
import { View, StyleSheet,Alert } from 'react-native';
import Pdf from 'react-native-pdf';
import RNPrint from 'react-native-print';

import moment from 'moment';
import vi from "moment/locale/vi";
export const PrintfPDF02b_PLIIb = async (data) => { 
    // const duLieu = checkUndefine(data)
    const duLieu= data;
 
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
                        font-size: 14pt;
                        vertical-align: 11pt;
                    }
            
                    .p,
                    p {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: normal;
                        font-weight: bold;
                        text-decoration: none;
                        font-size: 12pt;
                    }
            
                    .s1 {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: normal;
                        font-weight: bold;
                        text-decoration: none;
                        font-size: 12pt;
                    }
            
                    .s2 {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: normal;
                        font-weight: normal;
                        font-size: 12pt;
                        padding: 16pt;
                    }
            
                    .s3 {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: italic;
                        font-weight: normal;
                        text-decoration: none;
                        font-size: 12pt;
                    }
            
                    .s4 {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: normal;
                        font-weight: bold;
                        text-decoration: none;
                        font-size: 12pt;
                        word-wrap: break-word;
                    }
            
                    .s5 {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: normal;
                        font-weight: normal;
                        text-decoration: none;
                        font-size: 12pt;
                        word-wrap: break-word;
                    }
            
                    .s6 {
                        color: black;
                        font-family: "Times New Roman", serif;
                        font-style: italic;
                        font-weight: normal;
                        text-decoration: none;
                        font-size: 12pt;
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
                        /* vertical-align: middle; */
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
                    <h1 style="padding-top: 10pt; text-align: center;width: 100%;">
                        THÔNG TIN VẬN TẢI/TRANSPORT DETAILS
                    </h1>                
                    <table cellspacing="0" style="margin-top: 12pt; width:100%; height: auto; overflow-wrap: break-word;">
                        <tr>
                            <td class="s2" colspan="4">
                                Số chứng nhận/Document number: ${duLieu?.sochungnhan||''}
                            </td>
                        </tr>
                        <tr>
                            <td class="s2" colspan="4">
                                1. Quốc gia xuất khẩu/Country of Exportation: ${duLieu?.quocgiaxuatkhau||''}
                                <br>
                                <br>
                                Cảng/sân bay/địa điểm xuất phát khác/Port/airport/other place of departure: ${duLieu?.diadiemxuatphat||''}
            
                            </td>
                        </tr>
                        <tr>
                            <td class="s2" colspan="4">
                                Tên tàu/nước treo cờ/Vessel name/flag: ${duLieu?.tentau||''}
                                <br>
                                <br>
                                Số chuyến/số vận đơn đường biển/Voyage No./Bill of landing No: ${duLieu?.sochuyen||''}
                                <br>
                                <br>
                                Số chuyến bay/Số vận đơn hàng không/Flight number/Airway bill number: ${duLieu?.sochuyenbay || ''}
                                <br>
                                <br>
                                Quốc tịch xe và số đăng ký/Truck nationality and registration number: ${duLieu?.quoctichxevasodangky||''}
                                <br>
                                <br>
                                Số vận đơn đơn đường sắt/Railway bill number: ${duLieu?.sovanndonduongsat||''}
                                <br>
                                <br>
                                Các giấy tờ vận tải khác/Other transport documents: ${duLieu?.giaytovantaikhac||''}
            
                            </td>
                        </tr>
                        <tr>
                            <td class="s2" colspan="4">
                                2. Chữ ký của tàu chủ hàng xuất khẩu/Exporter Signature
                            </td>
                        </tr>
                        <tr>
                            <td class="s2 center-table" colspan="1" style="width: 23%;">
                                Số công-ten-nơ, xem danh sách kèm theo
                                <br>
                                Container number (s), see list below
                                <br>
                                <br>
                                <br>
                            </td>
                            <td class="s2 center-table" colspan="1" style="width: 25%;">
                                Tên của nhà xuất khẩu 
                                <br>
                                Name of Exporter
                                <br>
                                ${duLieu?.tennhaxuatkhau||''}
                                <br>
                                <br>
            
                            </td>
                            <td class="s2 center-table" colspan="1" style="width: 23%;">
                                Địa chỉ
                                <br>
                                Address
                                <br>
                                ${duLieu?.diachi||''}
                                <br>
                                <br>
            
                            </td>
                            <td class="s2 center-table" colspan="1" style="width: 24%;">
                                Chữ ký/Signature
                                <br>
                                <br>
                                <br>
            
                            </td>
                        </tr>
            
                     </table>
            
                </div>
            
                <!-- end -->
            </body>
            
            </html>`
        });
    } catch (error) {
        Alert.alert('Lỗi print', error.message);
    }
};

