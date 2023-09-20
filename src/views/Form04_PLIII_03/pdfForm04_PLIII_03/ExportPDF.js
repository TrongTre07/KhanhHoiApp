import React, { useState, useContext } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../../../contexts/UserContext';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { checkUndefine } from './checkUndefine';
import moment from 'moment';
import vi from "moment/locale/vi";
export const ExportPDF04_PLIII_03 = async (data) => {

    const duLieu = data;

    try {
        const html = `
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
                    font-size: 112t;
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
        
                .table {
                    page-break-before: avoid;
                    overflow-wrap: break-word;
                }
                .tr {
                    page-break-inside: avoid;
                  }
        
                table td {
                    border: 1pt solid #2B3D4F;
                    page-break-inside: avoid;
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
                <h1 style="padding-top: 6pt; text-align: center;width: 100%;">
                    MẪU XÁC NHẬN CAM KẾT SẢN PHẨM THỦY SẢN XUẤT KHẨU <br>CÓ NGUỐC GỐC TỪ THỦY SẢN KHAI THÁC NHẬP KHẨU
                </h1>
                <h1 style="padding-top: 6pt; text-align: center;width: 100%;">
                    STATEMENT OF EXPORT FISHERY PRODUCTS PROCESSED FROM <br> IMPORTED CATCHES
                </h1>
                <h1 style="padding-top: 4pt; text-align: center;width: 100%;font-style: italic;
                        font-weight: normal;">
                    (Promugated under Circular No: 21/2018/TT-BNNPTNT dated on 15/11/2018 <br>
                    by Minister of Ministry of Agriculture and Rural Development)
                </h1>
                <br />
                <table style=" border-collapse:collapse; height:100%; width:100%;">
                    <!-- header -->
                    <div>
                        <!-- end -->
                        <!-- 2 thong tin -->
                        <div class="s2">
                            <div style="margin: 0 20pt 0 20pt;">
                                <div style="display: flex; margin-top: 8pt;">
                                    Tôi đảm bảo rằng các sản phẩm thủy sản: ${duLieu?.sanphamthuysan} (tên và mã sản phẩm) được chế biến từ
                                    thủy sản đánh bắt hợp pháp sau:
                                </div>
                                <div style="display: flex; margin-top: 8pt;">
                                    I confirm that the processed fishery products: ${duLieu?.sanphamthuysan} (product description and Combined
                                    Nomenclature code) have been obtained from catches imported under the following catch
                                    certificate (s):</div>
                            </div>
                        </div>
                        <!-- end -->
                    </div>
                    <!-- end thong tin  -->
        
                    <!-- body table -->
                    <div style="overflow-x:auto; margin-top: 6pt;">
                        <table cellspacing="0"
                            style="width:100%; height: auto; table-layout: fixed; overflow-wrap: break-word;">
                            <tr>
                                <td style="text-align: center;padding: 4pt; vertical-align: middle; width: 11%;" rowspan="1"
                                    bgcolor="#D1D6DB">
                                    <div class="s4">
                                        Số chứng nhận thủy sản khai thác /Catch ce rtificate number
                                    </div>
                                </td>
                                <td style="text-align:  center; vertical-align: middle; width: 11%;" rowspan="1"
                                    bgcolor="#D1D6DB">
                                    <p class="s4">
                                        Tên tàu/Name of Fishing vessel</p>
                                </td>
        
                                <td style="text-align: center; vertical-align: middle; width: 10%;" rowspan="1"
                                    bgcolor="#D1D6DB">
                                    <p class="s4">
                                        Quốc gia treo cờ/Flag state
        
                                    </p>
                                </td>
                                <td style="text-align: center; vertical-align: middle; width: 12%;" rowspan="1"
                                bgcolor="#D1D6DB">
                                    <p class="s4">
                                        Ngày thông qua/Validti on date (s)
        
                                    </p>
                                </td>
                                <td style="text-align: center; vertical-align: middle; width: 23%;" rowspan="1"
                                    bgcolor="#D1D6DB">
                                    <p class="s4">
                                        Mô tả thủy sản khai thác/Catch description
        
                                    </p>
                                </td>
                                <td style="text-align: center; vertical-align: middle; width: 11%;" rowspan="1"
                                    bgcolor="#D1D6DB">
                                    <p class="s4">
                                        Tổng khối lượng thủy sản khai thác /Total landed weight (kg)
        
                                    </p>
                                </td>
                                <td style="text-align: center; vertical-align: middle; width: 11%;" rowspan="1"
                                    bgcolor="#D1D6DB">
                                    <p class="s4">
                                        Khối lượng thủy sản khai thác đưa vào chế biến/Catches processe d (kg)
        
        
                                    </p>
                                </td>
                                <td style="text-align: center; vertical-align: middle; width: 11%;" rowspan="1"
                                    bgcolor="#D1D6DB">
                                    <p class="s4">
                                        Sản phẩm sau khi chế biến xuất khẩ u/Proces sed fishery products and exported (kg)
        
                                    </p>
                                </td>
                            </tr>
                            ${duLieu?.tbl_xacnhancamket_ls?.map((line, index) => `
                            <tr>
                                <td class="s5 center-table">
                                    ${line?.sochungnhankhaithac}
                                </td>
                                <td class="s5 center-table">
                                    ${line?.tentau}
                                </td>
                                <td class="s5 center-table">
                                    ${line?.quocgiatreoco}
                                </td>
                                <td class="s5 center-table">
                                    <br>
                                </td>
                                <td class="s5 center-table">
                                    ${line?.motathuysankhaithac}
                                </td>
                                <td class="s5 center-table">
                                    ${line?.tongkhoiluongkhaithac == 0 ? '' : line?.tongkhoiluongkhaithac}
                                </td>
                                <td class="s5 center-table">
                                    ${line?.khoiluongthuysankhaithacchebien == 0 ? '' : line?.khoiluongthuysankhaithacchebien}
                                </td>
                                <td class="s5 center-table">
                                    ${line?.sanphamsaukhichebien == 0 ? '' : line?.sanphamsaukhichebien}
                                </td>
                            </tr>
                            `).join('')}
        
                        </table>
                        <!-- 1 thong tin -->
                        <div class="s2">
                            <div style="margin: 0 20pt 0 20pt;">
                                <div style="display: flex; margin-top: 6pt;">
                                    Tên và địa chỉ của cơ sở chế biến/Name and address of the processing plant: <br>
                                    ${duLieu?.tenvadiachicosochebien || '....................................................................................................................................................................... ....................................................................................................................................................................... .......................................................................................................................................................................'}
                                </div>
                                <div style="display: flex; margin-top: 6pt;">
                                    Tên và địa chỉ của nhà xuất khẩu (nếu khác với nhà máy chế biến)/Name and address of the
                                    exporter (if different from the processing plant):
                                    <br>
                                    ${duLieu?.tenvadiachinhaxuatkhau || '....................................................................................................................................................................... ....................................................................................................................................................................... .......................................................................................................................................................................'}
                                </div>
                                <div style="display: flex; margin-top: 6pt;">
                                    Mã số cơ sở chế biến/Approval number of the processing plant: <br>
                                    ${duLieu?.macosochebien ||   '....................................................................................................................................................................... ....................................................................................................................................................................... .......................................................................................................................................................................'}
                                </div>
                                <div style="display: flex; margin-top: 6pt;">
                                    Số giấy chứng nhận chất lượng, vệ sinh an toàn thực phẩm (Chứng thư vệ sinh) và ngày
                                    cấp/Health certificate number and date: <br>
                                    ${duLieu?.giayphiepantoanthucphamvangaycap ||   '....................................................................................................................................................................... ....................................................................................................................................................................... .......................................................................................................................................................................'}
                                </div>
                            </div>
                        </div>
                        <!-- end -->
        
                        <table cellspacing="0"
        style="page-break-after: avoid;margin-top: 12pt; width:100%; height: auto; overflow-wrap: break-word;">
        <tr class="tr">
            <td class="s2 center-table" colspan="1" style="width: 23%; vertical-align: top;">
                Đại diện của cơ sở chế biến/Responsible person of the processing plant
                <br>
                <br>
                <br>
            </td>
            <td class="s2 center-table" colspan="1" style="width: 25%; vertical-align: top;">
                Chữ ký/Signature 
                <br>
                <br>
                <br>

            </td>
            <td class="s2 center-table" colspan="1" style="width: 23%; vertical-align: top;">
                Ngày/Date
                <br>
                <br>
                <br>

            </td>
            <td class="s2 center-table" colspan="1" style="width: 24%; vertical-align: top;">
                Địa điểm/Place
                <br>
                <br>
                <br>

            </td>
        </tr>

    </table>
    <!-- end -->
        
                        <!-- 2 thong tin -->
                        <div class="s2">
                            <div style="margin: 0 20pt 0 20pt;">
                                <div style="display: flex; margin-top: 16pt;">
                                    Xác nhận của cơ quan có thẩm quyền/Endorsement by the competent authority: <br>
                                </div>
                                <div style="display: flex; margin-top: 6pt;">
                                    Số xác nhận/Statement No : ${duLieu?.soxacnhan || '..................................'};
                                </div>
                        </div>
                        <!-- end -->
                        <!-- 2 table -->
                        <table cellspacing="0" style="page-break-after: avoid;margin-top: 16pt; width:100%; height: auto; overflow-wrap: break-word;">
                            <tr>
                                <td class="s2 center-table" colspan="1" style="width: 23%; vertical-align:top;">
                                    Thủ trưởng cơ quan có thẩm quyền xác nhận/Public authority
                                    <br>
                                    <br>
                                    <br>
                                </td>
                                <td class="s2 center-table" colspan="1" style="width: 25%;vertical-align:top;;">
                                    Ký và đóng dấu/Signature and seal
                                    <br>
                                    <br>
                                    <br>
                
                                </td>
                                <td class="s2 center-table" colspan="1" style="width: 23%;vertical-align:top;">
                                    Ngày/Date
                                    <br>
                                    <br>
                                    <br>
                
                                </td>
                                <td class="s2 center-table" colspan="1" style="width: 24%;vertical-align:top;">
                                    Địa điểm/Place
                                    <br>
                                    <br>
                                    <br>
                
                                </td>
                            </tr>
                
                         </table>
                        <!-- end -->
                    </div>
                </table>
            </div>
        
            <!-- end -->
        </body>
        
        </html>`;
        const options = {
            html,
            fileName: `${duLieu?.dairyname}`,
            directory: 'nhatky_pdf',
        };
        const file = await RNHTMLtoPDF.convert(options);
        if (duLieu?.dairyname !== 'filemau') {
            console.log('pdf', file.filePath);
            Alert.alert('Thành công', `PDF lưu tại ${file.filePath.substring(20)}`);
        }
        return true;
        // setCheckViewPDF(false);

        // setIsLoading(false);
    } catch (error) {
        console.log('pdf', error);
        return false;
    }
};
