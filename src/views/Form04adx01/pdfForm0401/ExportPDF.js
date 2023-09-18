import React, { useState, useContext } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../../../contexts/UserContext';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { checkUndefine } from './checkUndefine';
import moment from 'moment';
import vi from "moment/locale/vi";
export const ExportPDF = async (data) => {

    // const duLieu = checkUndefine(data)
    const duLieu= data;
    // console.log('duLieu: ', duLieu);
    moment.updateLocale("vi",vi);

    
    try {
        const html = `<!DOCTYPE html>
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
                input[type="checkbox"]{
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
                    -webkit-transform: translate(-50%,-50%);
                    -moz-transform: translate(-50%,-50%);
                    -ms-transform: translate(-50%,-50%);
                    transform: translate(-50%,-50%);
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
                        Mẫu số 04 (Phụ lục I)
                    </h1>
                </div>  


                <h1 style="padding-top: 6pt; text-align: center;width: 100%;">
                    MẪU BÁO CÁO THĂM DÒ, TÌM KIẾM, DẪN DỤ NGUỒN LỢI THỦY SẢN
                </h1>
                <h1 style="padding-top: 6pt; text-align: center;width: 100%;">
                    CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </h1>
                <h1 style="padding-top: 6pt; text-align: center;width: 100%;">
                    Độc lập - Tự do - Hạnh phúc
                </h1>
                <h1 style="padding-top: 0pt; text-align: center;width: 100%;">
                    --------------------
                </h1>
                <div class="s5" style="padding-top: 6pt; text-align:end;width: 100%;">
                    ......., ngày ...... tháng ......năm........

                </div>
                <br />
                <table class="new-page" style=" 
                                    border-collapse:collapse; height:100%; width:100%;">
                    <!-- header -->
                    <div>
                            <h1 style="padding-top: 4pt; text-align: center;width: 100%;">
                                BÁO CÁO THĂM DÒ, TÌM KIẾM, DẪN DỤ NGUỒN LỢI THỦY SẢN
                            </h1>
                            <h1 style="padding-top: 4pt; text-align: center;width: 100%;font-style: normal;
                                        font-weight: normal;">
                                CHUYẾN SỐ: ${duLieu?.chuyenbien_so+''||'.........'} /năm ${duLieu?.nam+''||'.......'}
                            </h1>
                            <h1 style="padding-top: 4pt; text-align: center;width: 100%;">
                                Từ ngày:  ${duLieu?.tungay?moment(duLieu?.tungay).format('DD/MM/YYYY'):'.........'} đến ngày: ${duLieu.denngay?moment(duLieu?.denngay).format('DD/MM/YYYY'):'.........'}
                            </h1>
                            <!-- end -->
        
                            <!-- body -->
                            <div class="s2">
                                <div style="margin: 0 0 0 0;">
                                    <div style="display: flex; margin-top: 8pt;">
                                        1. Họ và tên chủ tàu/thuyền trưởng: ${duLieu?.ten_chutau_thuyentruong||'.................................................................................................................'}
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        2. Địa chỉ: ${duLieu?.diachi||'...................................................................................................................................................................'}
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        <div style="width: 50%;">
                                            3. Số đăng ký tàu: ${duLieu?.tau_bs||'..........................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ;4. Tổng công suất máy chính: ${duLieu?.tau_tongcongsuatmaychinh||'......................'} CV;
                                        </div>
                                    </div>
                                    <div style="display: flex; margin-top: 8pt;">
                                        5. Chiều dài lớn nhất của tàu: ${duLieu?.tau_chieudailonnhat!=0?duLieu?.tau_chieudailonnhat +'':'.................'} m
                                    </div>
                                    <div style="display: flex;margin-top: 8pt;">
                                        <div style="width: 65%;">
                                            6.  Nghề (thăm dò/tìm kiếm/dẫn dụ): ${duLieu?.nghe||'.......................................................'}
                                        </div> 
                                        <div style="width: 35%;">
                                            ; 7. Số lao động: ${duLieu?.tongsolaodong!=0?duLieu?.tongsolaodong+'':'..........................'}
                                        </div>
                                    </div>
                                    <div style="display: flex;margin-top: 8pt;">
                                        <div style="width: 100%;">
                                            8. Số ngày hoạt động: ${duLieu?.songayhoatdong!=0?duLieu?.songayhoatdong+'':'..........................'}
                                        </div>
                                    </div>
                                    <div style="width: 100%; margin-top: 8pt;">
                                        9: Ngư trường hoạt động: 
                                        <div class="checkbox-container" style="margin-top: 4pt;">
                                            <label class="checkbox-label">
                                                Vịnh Bắc Bộ <input type="checkbox"  name="vinh-bac-bo" value="Vịnh Bắc Bộ" ${duLieu?.ngutruong_vinhbacbo?'checked':''}>
                                            </label>
                                            
                                            <label class="checkbox-label">
                                                Trung Bộ <input type="checkbox"  name="trung-bo" value="Trung Bộ" ${duLieu?.ngutruong_trungbo?'checked':''}> 
                                            </label>
                                            
                                            <label class="checkbox-label">
                                                Đông Nam Bộ <input type="checkbox"  name="dong-nam-bo" value="Đông Nam Bộ" ${duLieu?.ngutruong_dongnambo?'checked':''}> 
                                            </label>
                                            
                                            <label class="checkbox-label">
                                                Tây Nam Bộ <input type="checkbox"  name="tay-nam-bo" value="Tây Nam Bộ" ${duLieu?.ngutruong_taynambo?'checked':''}> 
                                            </label>
                                            
                                            <label class="checkbox-label">
                                                Giữa biển Đông <input type="checkbox"  name="giua-bien-dong" value="Giữa biển Đông" ${duLieu?.ngutruong_giuabiendong?'checked':''}> 
                                            </label>
                                        </div>
                                    </div>

                                    <div style="width: 100%; margin-top: 8pt;">
                                        10: Hợp tác với tàu khai thác thủy sản: Số đăng ký tàu khai thác: ${duLieu?.bs_tauhoptackhaithac||'....................................................'}
                                        <div class="checkbox-container" style="margin-top: 4pt; justify-content: space-around;">
                                            <label class="checkbox-label">
                                                Ăn chia sản phẩm <input type="checkbox"  name="vinh-bac-bo" value="Vịnh Bắc Bộ" ${duLieu?.anchia?'checked':''}>
                                            </label>
                                            
                                            <label class="checkbox-label">
                                                Trả tiền trực tiếp <input type="checkbox"  name="trung-bo" value="Trung Bộ" ${duLieu?.tratientructiep?'checked':''}> 
                                            </label>                     
                                        </div>
                                    </div>

                                    <div style="display: flex; margin-top: 8pt;">
                                        11. Tổng sản lượng khai thác thủy sản: ${duLieu?.tongsanluong!=0?duLieu?.tongsanluong+'':'......................................'} kg
                                    </div>

                                </div>
                            </div>
                            <!-- end -->
                            <!-- kys ten -->
                            <div style="float: right; margin-right: 15pt;">
                                <div class="chuKy">
                                    <h1>
                                        Người báo cáo
                    
                                    </h1>
                                    <div class="s6 new-page" style="margin-top: 4pt;">
                                        (ký, ghi rõ họ và tên)
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end thong tin  -->
                    </div>
                    <!-- body table -->
                </table>
            </div>
        
            <!-- end -->
            </body>
        
        </html>`;
        const options = {
            html,
            fileName: `${duLieu?.dairyname}`,
            directory: 'pdf',
        };
        const file = await RNHTMLtoPDF.convert(options);
        if(duLieu?.dairyname!=='filemau'){
            Alert.alert('Thành công', `PDF lưu tại ${file.filePath}`);
        }
        return true;
        // setCheckViewPDF(false);

        // setIsLoading(false);
    } catch (error) {
        return false;
    }
};
