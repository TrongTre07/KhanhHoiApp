import React, { useState, useContext } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../../../contexts/UserContext';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { checkUndefine } from './checkUndefine';
import moment from 'moment';
import vi from "moment/locale/vi";
export const ExportPDF0201 = async (data) => {

    // const duLieu = checkUndefine(data)
    const duLieu= data;
    // console.log('duLieu: ', duLieu);
    moment.updateLocale("vi",vi);

    let totalByType = [0,0,0,0,0,0];
    for (let i = 0; i < 6; i++) {
        totalByType[0] += Number(duLieu?.thumua[i]?.loai_1_kl||0)||0;//string number
        totalByType[1] += Number(duLieu?.thumua[i]?.loai_2_kl||0)||0;//string number
        totalByType[2] += Number(duLieu?.thumua[i]?.loai_3_kl||0)||0;//string number
        totalByType[3] += Number(duLieu?.thumua[i]?.loai_4_kl||0)||0;//string number
        totalByType[4] += Number(duLieu?.thumua[i]?.loai_5_kl||0)||0;//string number
        totalByType[5] += Number(duLieu?.thumua[i]?.loai_6_kl||0)||0;//string number
    }
    const bigdatatotal = [];

    duLieu?.thongtintaudc_thumua?.forEach(item => {

        const totalByTypea = [0,0,0,0,0,0];
        for (let i = 0; i < 6; i++) {
            totalByTypea[0] += Number(item?.thongtinhoatdong[i]?.loai_1_kl||0)||0;//string number
            totalByTypea[1] += Number(item?.thongtinhoatdong[i]?.loai_2_kl||0)||0;//string number
            totalByTypea[2] += Number(item?.thongtinhoatdong[i]?.loai_3_kl||0)||0;//string number
            totalByTypea[3] += Number(item?.thongtinhoatdong[i]?.loai_4_kl||0)||0;//string number
            totalByTypea[4] += Number(item?.thongtinhoatdong[i]?.loai_5_kl||0)||0;//string number
            totalByTypea[5] += Number(item?.thongtinhoatdong[i]?.loai_6_kl||0)||0;//string number
        }
        bigdatatotal.push(totalByTypea);
    });
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
                    font-size: 10pt;
                    vertical-align: 11pt;
                }
        
                .p,
                p {
                    color: black;
                    font-family: "Times New Roman", serif;
                    font-style: normal;
                    font-weight: bold;
                    text-decoration: none;
                    font-size: 8pt;
                }
        
                .s1 {
                    color: black;
                    font-family: "Times New Roman", serif;
                    font-style: normal;
                    font-weight: bold;
                    text-decoration: none;
                    font-size: 8pt;
                }
        
                .s2 {
                    color: black;
                    font-family: "Times New Roman", serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 8.5pt;
                }
        
                .s3 {
                    color: black;
                    font-family: "Times New Roman", serif;
                    font-style: italic;
                    font-weight: normal;
                    text-decoration: none;
                    font-size: 8pt;
                }
        
                .s4 {
                    color: black;
                    font-family: "Times New Roman", serif;
                    font-style: normal;
                    font-weight: bold;
                    text-decoration: none;
                    font-size: 8pt;
                    word-wrap: break-word;
                }
        
                .s5 {
                    color: black;
                    font-family: "Times New Roman", serif;
                    font-style: normal;
                    font-weight: normal;
                    text-decoration: none;
                    font-size: 8pt;
                    word-wrap: break-word;
                }
        
                .s6 {
                    color: black;
                    font-family: "Times New Roman", serif;
                    font-style: italic;
                    font-weight: normal;
                    text-decoration: none;
                    font-size: 9pt;
                }
        
                /* li {
                    display: block;
                }
        
                #l1 {
                    padding-left: 0pt;
                    counter-reset: c1 9;
                }
        
                #l1>li>*:first-child:before {
                    counter-increment: c1;
                    content: counter(c1, decimal)". ";
                    color: black;
                    font-family: "Times New Roman", serif;
                    font-style: normal;
                    font-weight: normal;
                    text-decoration: none;
                    font-size: 8pt;
                }
        
                #l1>li:first-child>*:first-child:before {
                    counter-increment: c1 0;
                } */
        
                /* #l2 {
                    padding-left: 0pt;
                    counter-reset: c2 1;
                }
        
                #l2>li>*:first-child:before {
                    counter-increment: c2;
                    content: counter(c2, lower-latin)". ";
                    color: black;
                    font-family: "Times New Roman", serif;
                    font-style: normal;
                    font-weight: normal;
                    text-decoration: none;
                    font-size: 8pt;
                }
        
                #l2>li:first-child>*:first-child:before {
                    counter-increment: c2 0;
                }
        
                li {
                    display: block;
                } */
        
                /* #l3 {
                    padding-left: 0pt;
                    counter-reset: d1 1;
                }
        
                #l3>li>*:first-child:before {
                    counter-increment: d1;
                    content: counter(d1, upper-roman)". ";
                    color: black;
                    font-family: "Times New Roman", serif;
                    font-style: normal;
                    font-weight: bold;
                    text-decoration: none;
                    font-size: 8pt;
                } */
        
                /* #l3>li:first-child>*:first-child:before {
                    counter-increment: d1 0;
                } */
        
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
            </style>
        </head>
        
        <body>
            <div>
                <h1 style="padding-top: 20pt; text-align: center;width: 100%;">
                    MẪU NHẬT KÝ THU MUA, CHUYỂN TẢI THUỶ SẢN
                </h1>
                <br />
                <table class="new-page" style=" 
                                    border-collapse:collapse; height:100%; width:100%;">
                    <!-- header -->
                    <div>
        
                        <div style="
                                        padding: 8pt;
                                        border: 1pt solid #2B3D4F;">
                            <h1 style="padding-top: 4pt; text-align: center;width: 100%;">
                                TỔNG CỤC THỦY SẢN
                            </h1>
                            <h1 style="padding-top: 0pt; text-align: center;width: 100%;">
                                --------------------
                            </h1>
                            <h1 style="padding-top: 8pt; text-align: center;width: 100%;">
                                NHẬT KÝ THU MUA, CHUYỂN TẢI THỦY SẢN
                            </h1>
                            <h1 style="padding-top: 8pt; text-align: center;width: 100%;font-style: normal;
                                        font-weight: normal;">
                                (DÙNG CHO TÀU THU MUA/CHUYỂN TẢI THỦY SẢN)
                            </h1>
                            <!-- end -->
        
                            <!-- body -->
                            <div class="s2">
                                <div style="margin: 16pt 16pt 0 0;">
                                    <div style="display: flex;">
                                        <div style="width: 50%;">
                                            1. Họ và tên chủ tàu: ${duLieu?.ten_chutau|| '............................................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ;2. Họ và tên thuyền trưởng: ${duLieu?.ten_thuyentruong|| '..........................................................'};
                                        </div>
                                    </div>
        
                                    <div style="display: flex; margin-top: 8pt;">
                                        <div style="width: 33%;">
                                            3. Số đăng ký tàu: ${duLieu?.tau_bs|| '.......................................'}
                                        </div>
                                        <div style="width: 33%;">
                                            4. Chiều dài lớn nhất của tàu: ${duLieu?.tau_chieudailonnhat|| '..................'} m
                                        </div>
        
                                        <div style="width: 34%;">
                                            ;5. Tổng công suất máy chính: ${duLieu?.tau_tongcongsuatmaychinh|| '..............'} CV;
                                        </div>
                                    </div>
        
                                    <div style="display: flex;margin-top: 8pt;">
                                        <div style="width: 50%;">
                                            6. Số giấy phép khai thác thủy sản: ${duLieu?.gpkt_so|| '................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ;Thời hạn đến: ${duLieu?.gpkt_thoihan|| '................................................'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- end -->
        
                        </div>
                        <div style="display: flex;">
                            <div class="s2" style="
                                        width: 30%;
                                        padding: 4pt 0 8pt 8pt;
                                        border-left: 1pt solid #2B3D4F;
                                        border-right: 1pt solid #2B3D4F;
                                        border-bottom: 1pt solid #2B3D4F;
                                        
                                        ">
                                <div>
                                    <h1 style="font-size: 9pt;">Chuyến biển số: ${duLieu?.chuyenbien_so||'..............................'}</h1>
                                    <div style="font-style: italic; width: 100%;text-align: center;">(Ghi chuyến biển số
                                        mấy
                                        trong năm)</div>
                                </div>
                            </div>
                            <div class="s2" style="
                                            width: 70%;
                                            padding: 4pt 0 6pt 6pt;
                                            border-right: 1pt solid #2B3D4F;
                                            border-bottom: 1pt solid #2B3D4F;">
                                <div style="display: flex">
                                    <div style="width: 50%;">
                                        10: Cảng đi: ${duLieu?.cang_di|| '............................................................'}
                                    </div>
                                    <div style="width: 50%;">
                                        ; Thời gian đi: ${duLieu?.ngay_di ? moment(duLieu?.ngay_di).format('[Ngày] LL') : 'Ngày .... Tháng .... Năm ....'} 
                                    </div>
                                </div>
                                <div style="display: flex;margin-top: 4pt;">
                                    <div style="width: 50%;">
                                        11: Cảng về: ${duLieu?.cang_ve||'............................................................'}
                                    </div>
                                    <div style="width: 50%;">
                                        ; Thời gian cập: ${duLieu?.ngay_ve ? moment(duLieu?.ngay_ve).format('[Ngày ]LL') : 'Ngày .... Tháng .... Năm ....'} 
                                    </div>
                                </div>
                                <div style="display: flex;margin-top: 4pt;">
                                    <div style="width: 50%;">
                                        12: Nộp Nhật ký: ${duLieu?.ngaynop ? moment(duLieu?.ngaynop).format('[Ngày] LL') : 'Ngày .... Tháng .... Năm ....'}
                                    </div>
                                    <div style="width: 50%;">
                                        ; Vào Sổ số: ${duLieu?.vaoso_so|| '.........................................'}
                                    </div>
                                </div>
        
                            </div>
                        </div>
                        <!-- end thong tin  -->
        
                        <!--  -->
                    </div>
        
                </table>
            </div>
        
            <!-- end -->
            <div class="new-page">
                <h1 style="padding-top: 7pt;padding-left: 18pt;text-align: left;">
                    A. KẾT QUẢ THU MUA, CHUYỂN TẢI CỦA CHUYẾN BIỂN
                </h1>
                <div style="overflow-x:auto;">
                    <table cellspacing="0"
                        style="width:100%; height: auto; table-layout: fixed; overflow-wrap: break-word;">
                        <tr>
                            <td style="text-align: center; vertical-align: middle; width: 5%;" rowspan="2"
                                bgcolor="#D1D6DB">
                                <div class="s4">
                                    STT
                                </div>
                            </td>
                            <td style="text-align: center; vertical-align: middle; width: 16%;" rowspan="2"
                                bgcolor="#D1D6DB">
                                <p class="s4">
                                    Số đăng ký tàu</p>
                            </td>
        
                            <td style="text-align: center; vertical-align: middle; width: 10%;" rowspan="2"
                                bgcolor="#D1D6DB">
                                <p class="s4">
                                    Ngày,tháng </p>
                            </td>
                            <td style="text-align: center; vertical-align: middle; " colspan="2" bgcolor="#D1D6DB">
                                <p class="s4">
                                    Vị trí thu mua/chuyển tải </p>
                            </td>
        
                            <td class="center-table" colspan="6" bgcolor="#D1D6DB">
                                <p class="s4">
                                    Khối lượng theo thành phần loài thủy sản (kg)</p>
                            </td>
                            <td style="width: 13%;" class="center-table" rowspan="2" bgcolor="#D1D6DB">
                                <p class="s4">
                                    Khối lượng thủy sản (kg)</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 7%;" class="s4 center-table" bgcolor="#D1D6DB">
                                Vĩ độ
                            </td>
                            <td style="width: 7%;" class="s4 center-table" bgcolor="#D1D6DB">
                                Kinh độ
                            </td>
        
                            <td style="width: 7%;" class="s4 center-table" bgcolor="#D1D6DB">
                                Loài<br>
                                ${duLieu?.thumua[0]?.loai_1}
        
                            </td>
                            <td style="width: 7%;" class="s4 center-table" bgcolor="#D1D6DB">
        
                                Loài<br>
                                ${duLieu?.thumua[0]?.loai_2}
        
                            </td>
                            <td style="width: 7%;" class="s4 center-table" bgcolor="#D1D6DB">
                                Loài<br>
                                ${duLieu?.thumua[0]?.loai_3}
        
        
                            </td>
                            <td style="width: 7%;" class="s4 center-table" bgcolor="#D1D6DB">
                                Loài<br>
                                ${duLieu?.thumua[0]?.loai_4}
        
                            </td>
                            <td style="width: 7%;" class="s4 center-table" bgcolor="#D1D6DB">
                                Loài <br>
                                ${duLieu?.thumua[0]?.loai_5}
        
                            </td>
                            <td style="width: 7%;" class="s4 center-table" bgcolor="#D1D6DB">
                                Loài<br>
                                ${duLieu?.thumua[0]?.loai_6}
                            </td>
        
        
                        </tr>
                        ${duLieu?.thumua.map((line,index) => `
                        <tr>
                            <td class="s5 center-table">
                                ${index+1}
                            </td>
                            <td class="s5 center-table">
                                ${line?.tau_bs}
                            </td>
                            <td class="center-table">
                                <p style="width: 100%;" class="s5">
                                    ${line?.ngaythang?moment(line?.ngaythang).format('DD-MM-YYYY'):''}
                                </p>
                            </td>
                            <td class="s5 center-table">
                                ${line?.tm_ct_vt_vido}
                            </td>
                            <td class="s5 center-table">
                                ${line?.tm_ct_vt_kinhdo}
                            </td>
                            <td class="s5 center-table">
                                ${line?.loai_1_kl}
                            </td>
                            <td class="s5 center-table">
                                ${line?.loai_2_kl}
                            </td>
                            <td class="s5 center-table">
                                ${line?.loai_3_kl}
                            </td>
                            <td class="s5 center-table">
                                ${line?.loai_4_kl}
                            </td>
                            <td class="s5 center-table">
                                ${line?.loai_5_kl}
                            </td>
                            <td class="s5 center-table">
                                ${line?.loai_6_kl}
                            </td>
                            <td class="s5 center-table">
                                ${line?.tongsanluong}
                            </td>
                        </tr>
                        `).join('')}

                        <tr>
                            <td class="s5 center-table" colspan="5">
                                Tổng khối lượng
                            </td>
        
                            <td class="center-table s5">
                                ${totalByType[0]==0?'':totalByType[0]}
                            </td>
                            <td class="center-table s5">
                                ${totalByType[1]==0?'':totalByType[1]}
                            </td>
                            <td class="center-table s5">
                                ${totalByType[2]==0?'':totalByType[2]}
                            </td>
                            <td class="center-table s5">
                                ${totalByType[3]==0?'':totalByType[3]}
                            </td>
                            <td class="center-table s5">
                                ${totalByType[4]==0?'':totalByType[4]}
                            </td>
                            <td class="center-table s5">
                                ${totalByType[5]==0?'':totalByType[5]}
                            </td>
                            </td>
                            <td class="center-table s5">
                                ${totalByType[0]+totalByType[1]+totalByType[2]+totalByType[3]+totalByType[4]+totalByType[5]==0?'':totalByType[0]+totalByType[1]+totalByType[2]+totalByType[3]+totalByType[4]+totalByType[5]}
                            </td>
                        </tr>
                    </table>
        
                </div>
                <!-- end -->
        
                <div style="float: right;">
                    <div class="chuKy">
                        <div class="s6">
                            Ngày ...... tháng ...... năm ......
        
                        </div>
                        <h1>
                            Thuyền trưởng tàu thu mua, chuyển tải
        
                        </h1>
                        <div class="s6 new-page">
                            (ký, ghi rõ họ và tên)
                        </div>
                    </div>
                </div>
                <br><br><br>
            </div>
            <!-- end -->
            ${duLieu?.thongtintaudc_thumua?.map((item,index) =>{ 
                return `
                <div class="new-page">
                    <h1 style="padding-top: 7pt;padding-left: 18pt;text-align: left;">
                        B${index+1}. THÔNG TIN VỀ CÁC TÀU ĐÃ ĐƯỢC THU MUA, CHUYỂN TẢI *
                    </h1>
                    <!-- end -->
                    <div>
                        <h1 style="padding-top: 7pt;padding-left: 18pt;text-align: left;">I. THÔNG TIN CHUNG VỀ TÀU CÁ</h1>
                        <div style="padding: 8pt; border: 0.4pt solid #2B3D4F;">
                            <!-- body -->
                            <div class="s2">
                                <div style="margin: 16pt 16pt 0 0;">
                                    <div style="display: flex;">
                                        <div style="width: 33%;">
                                            1.Số đăng ký tàu: ${item.tau_bs||'.............................................'}
                                        </div>
                                        <div style="width: 33%;">
                                            ;2. Chiều dài lớn nhất của tàu: ${item.tau_chieudailonnhat||'.....................'}
                                        </div>
                                        <div style="width: 33%;">
                                            m;3. Tổng công suất máy chính: ${item.tau_tongcongsuatmaychinh||'............'} CV
                                        </div>
                                    </div>
            
                                    <div style="display: flex; margin-top: 8pt;">
            
                                        <div style="width: 40%;">
                                            4. Số Giấy phép khai thác thủy sản: ${item.gpkt_so||'.............................'}
                                        </div>
                                        <div style="width: 30%;">
                                            ;Thời hạn đến: ${item.gpkt_thoihan?moment(item.gpkt_thoihan).format('DD/MM/YYYY'):'................................................'}
                                        </div>
                                        <div style="width: 30%;">
                                             ;5. Nghề khai thác: ${item.nghekt||'................................'}
                                        </div>
                                    </div>
            
                                    <div style="display: flex;margin-top: 8pt;">
                                        <div style="width: 50%;">
                                            6. Cảng đi ${item.cang_di||'......................................................................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ;Thời gian đi: ${item.ngay_di?' Ngày '+moment(item.ngay_di).format('LL'):'.................................................................................................'}
                                        </div>
                                    </div>
                                    <div style="display: flex;margin-top: 8pt;">
                                        7. Thời gian khai thác đối với sản phẩm thu mua, chuyển tải: Từ ngày ${item.tg_khaithac_tungay?moment(item.tg_khaithac_tungay).format('DD/MM/YYYY'):'..................'} đến ngày ${item.tg_khaithac_denngay?moment(item.tg_khaithac_denngay).format('DD/MM/YYYY'):'.................'}
                                        
                                    </div>
                                </div>
                            </div>
                            <!-- end -->
            
                        </div>
                        <!--  -->
                    </div>
                    <!-- end I thong tin  -->
                    <h1 style="padding-top: 7pt;padding-left: 18pt;text-align: left;">
                        II. THÔNG TIN CHI TIẾT VỀ HOẠT ĐỘNG KHAI THÁC THỦY SẢN LIÊN QUAN ĐẾN SẢN PHẨM THU MUA, CHUYỂN TẢI
                    </h1>
                    <div style="overflow-x:auto;">
                        <table cellspacing="0"
                            style="width:100%; height: auto; table-layout: fixed; overflow-wrap: break-word;">
                            <tr>
                                <td style="text-align: center; vertical-align: middle; width: 6%;" rowspan="2"
                                    bgcolor="#D1D6DB">
                                    <div class="s4">
                                        Mẻ thứ
                                    </div>
                                </td>
                                <td style="text-align: center; vertical-align: middle; width: 7%;" rowspan="2"
                                    bgcolor="#D1D6DB">
                                    <p class="s4">
                                        Thời điểm thả(giờ,phút,ngày,tháng)</p>
                                </td>
                                <td style="text-align: center; vertical-align: middle; " colspan="2" bgcolor="#D1D6DB">
                                    <p class="s4">
                                        Vị trí thả </p>
                                </td>
                                <td style="text-align: center; vertical-align: middle; width: 8%;" rowspan="2"
                                    bgcolor="#D1D6DB">
                                    <p class="s4">
                                        Thời điểm thu(giờ, phút, ngày, tháng) </p>
                                </td>
                                <td style="text-align: center; vertical-align: middle; " colspan="2" bgcolor="#D1D6DB">
                                    <p class="s4">
                                        Vị trí thu </p>
                                </td>
            
                                <td class="center-table" colspan="6" bgcolor="#D1D6DB">
                                    <p class="s4">
                                        Khối lượng loài thủy sản đã thu mua, chuyển tải (kg)</p>
                                </td>
                                <td style="width: 13%;" class="center-table" rowspan="2" bgcolor="#D1D6DB">
                                    <p class="s4">
                                    Tổng Khối lượng (kg)</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 7%;" class="s4 center-table" bgcolor="#D1D6DB">
                                    Vĩ độ
                                </td>
                                <td style="width: 7%;" class="s4 center-table" bgcolor="#D1D6DB">
                                    Kinh độ
                                </td>
                                <td style="width: 7%;" class="s4 center-table" bgcolor="#D1D6DB">
                                    Vĩ độ
                                </td>
                                <td style="width: 7%;" class="s4 center-table" bgcolor="#D1D6DB">
                                    Kinh độ
                                </td>
                                <td style="width: 7%;" class="s4 center-table" bgcolor="#D1D6DB">
                                    Loài<br>
                                    ${item.thongtinhoatdong[0]?.loai_1}
            
                                </td>
                                <td style="width: 7%;" class="s4 center-table" bgcolor="#D1D6DB">
            
                                    Loài<br>
                                    ${item.thongtinhoatdong[0]?.loai_2}
            
                                </td>
                                <td style="width: 7%;" class="s4 center-table" bgcolor="#D1D6DB">
                                    Loài<br>
                                    ${item.thongtinhoatdong[0]?.loai_3}
            
            
                                </td>
                                <td style="width: 7%;" class="s4 center-table" bgcolor="#D1D6DB">
                                    Loài<br>
                                    ${item.thongtinhoatdong[0]?.loai_4}
            
                                </td>
                                <td style="width: 7%;" class="s4 center-table" bgcolor="#D1D6DB">
                                    Loài<br>
                                    ${item.thongtinhoatdong[0]?.loai_5}
            
                                </td>
                                <td style="width: 7%;" class="s4 center-table" bgcolor="#D1D6DB">
                                    Loài<br>
                                    ${item.thongtinhoatdong[0]?.loai_6}
                                </td>
            
            
                            </tr>
                            ${item.thongtinhoatdong?.map((line,index) => `
                            <tr>
                                <td style="width: 7%;" class="s5 center-table">
                                    ${index+1}
                                </td>
                                <td style="width: 7%;" class="s5 center-table">
                                    ${line?.thoidiem_tha?moment(line?.thoidiem_tha).format('hh:mm DD-MM-YYYY'):''}

                                </td>
                                <td class="s5 center-table">
                                    ${line?.vido_tha}
                                </td>
                                <td class="s5 center-table">
                                    ${line?.kinhdo_tha}
                                </td>
                                <td style="width: 7%;" class="center-table">
                                    <p style="width: 100%;" class="s5">
                                    ${line?.thoidiem_thu?moment(line?.thoidiem_thu).format('hh:mm DD-MM-YYYY'):''}
                                    </p>
            
                                </td>
                                <td class="s5 center-table">
                                    ${line?.vido_thu}
                                </td>
                                <td class="s5 center-table">
                                    ${line?.kinhdo_thu}
                                </td>
                                <td class="s5 center-table">
                                    ${line?.loai_1_kl}
                                </td>
                                <td class="s5 center-table">
                                    ${line?.loai_2_kl}
                                </td>
                                <td class="s5 center-table">
                                    ${line?.loai_3_kl}
                                </td>
                                <td class="s5 center-table">
                                    ${line?.loai_4_kl}
                                </td>
                                <td class="s5 center-table">
                                    ${line?.loai_5_kl}
                                </td>
                                <td class="s5 center-table">
                                    ${line?.loai_6_kl}
                                </td>
            
                                <td class="s5 center-table">
                                    ${line?.tongsanluong}
                                </td>
            
                            </tr>
                            `).join('')}
                            <tr>
                                <td class="s5 center-table" colspan="7">
                                    Tổng khối lượng
                                </td>
            
                                <td class="center-table s5">
                                    ${bigdatatotal[index][0]==0?'':bigdatatotal[index][0]}
                                </td>
                                <td class="center-table s5">
                                    ${bigdatatotal[index][1]==0?'':bigdatatotal[index][1]}
                                </td>
                                <td class="center-table s5">
                                    ${bigdatatotal[index][2]==0?'':bigdatatotal[index][2]}
                                </td>
                                <td class="center-table s5">
                                    ${bigdatatotal[index][3]==0?'':bigdatatotal[index][3]}
                                </td>
                                <td class="center-table s5">
                                    ${bigdatatotal[index][4]==0?'':bigdatatotal[index][4]}
                                </td>
                                <td class="center-table s5">
                                    ${bigdatatotal[index][5]==0?'':bigdatatotal[index][5]}
                                </td>
                                </td>
                                <td class="center-table s5">
                                
                                    ${(bigdatatotal[index][0]+bigdatatotal[index][1]+bigdatatotal[index][2]+bigdatatotal[index][3]+bigdatatotal[index][4]+bigdatatotal[index][5])==0?'':(bigdatatotal[index][0]+bigdatatotal[index][1]+bigdatatotal[index][2]+bigdatatotal[index][3]+bigdatatotal[index][4]+bigdatatotal[index][5])}
                                </td>
                            </tr>
                        </table>
            
                    </div>
                    <!-- end -->
            
                    <div style="float: left;">
                        <div class="chuKy">
            
                            <div class="s6">
                                Ngày ...... tháng ...... năm ......
            
                            </div>
                            <h1>
                                Thuyền trưởng tàu khai thác thủy sản
            
                            </h1>
                            <div class="s6 new-page">
                                (ký, ghi rõ họ và tên)
                            </div>
                        </div>
                    </div>
                    <div style="float: right;">
                        <div class="chuKy">
            
                            <div class="s6">
                                Ngày ...... tháng ...... năm ......
            
                            </div>
                            <h1>
                                Thuyền trưởng tàu thu mua, chuyển tải
            
                            </h1>
                            <div class="s6 new-page">
                                (ký, ghi rõ họ và tên)
                            </div>
                        </div>
                    </div>
                    <br><br><br><br>
                    <div style="margin: 8px;" class="s2">
                        <p>
                            Ghi chú:
                        </p>
                        * Trong số nhật ký thu mua, chuyển tải có nhiều mục B, mỗi mục ghi đầy đủ thông tin của một tàu khai thác thủy sản đã bán sản phẩm cho tàu thu mua chuyển tải; chỉ sao chép các thông tin từ
                        Sổ nhật ký khai thác thủy sản đối với các hoạt động khai thác liên quan đến sản phẩm thủy sản đã thu mua, chuyển tải.
                    
                    </div>
                
                </div>
            `}).join('')}
        
            </body>
        
        </html>`;
        const options = {
            html,
            fileName: `${duLieu?.dairy_name}`,
            directory: 'nhatky_pdf',
        };
        const file = await RNHTMLtoPDF.convert(options);
        if(duLieu?.dairy_name!=='filemau'){
            Alert.alert('Thành công', `PDF lưu tại ${file.filePath.substring(20)}`);
        }
        return true;
        // setCheckViewPDF(false);

        // setIsLoading(false);
    } catch (error) {
        return false;
        Alert.alert('Lỗiiiiiii', error.message);
    }
};
