import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import moment from 'moment';
import vi from 'moment/locale/vi';

export const ExportPDF0101 = async (data) => {

    const duLieu = data;
    let klg = 0;

    moment.updateLocale("vi", vi);

    console.log('duLieu', duLieu);

    let totalByType = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 9; i++) {
        totalByType[0] += Number(duLieu?.khaithac[i]?.loai_1_kl || 0) || 0;//string number
        totalByType[1] += Number(duLieu?.khaithac[i]?.loai_2_kl || 0) || 0;//string number
        totalByType[2] += Number(duLieu?.khaithac[i]?.loai_3_kl || 0) || 0;//string number
        totalByType[3] += Number(duLieu?.khaithac[i]?.loai_4_kl || 0) || 0;//string number
        totalByType[4] += Number(duLieu?.khaithac[i]?.loai_5_kl || 0) || 0;//string number
        totalByType[5] += Number(duLieu?.khaithac[i]?.loai_6_kl || 0) || 0;//string number
        totalByType[6] += Number(duLieu?.khaithac[i]?.loai_7_kl || 0) || 0;//string number
        totalByType[7] += Number(duLieu?.khaithac[i]?.loai_8_kl || 0) || 0;//string number
        totalByType[8] += Number(duLieu?.khaithac[i]?.loai_9_kl || 0) || 0;//string number
    }

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
MẪU NHẬT KÝ KHAI THÁC THỦY SẢN
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
                                NHẬT KÝ KHAI THÁC THỦY SẢN
                            </h1>
                            <h1 style="padding-top: 8pt; text-align: center;width: 100%;font-style: normal;
                                        font-weight: normal;">
                                (NGHỀ CHÍNH: ${duLieu?.nghechinh || '...................'})
                            </h1>
                            <!-- end -->
        
                            <!-- body -->
                            <div class="s2">
                                <div style="margin: 16pt 16pt 0 0;">
                                    <div style="display: flex;">
                                        <div style="width: 50%;">
                                            1. Họ và tên chủ tàu: ${duLieu?.ten_chutau || '............................................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ;2. Họ và tên thuyền trưởng: ${duLieu?.ten_thuyentruong || '..........................................................'};
                                        </div>
                                    </div>
        
                                    <div style="display: flex; margin-top: 8pt;">
                                        <div style="width: 33%;">
                                            3. Số đăng ký tàu: ${duLieu?.tau_bs || '.......................................'}
                                        </div>
                                        <div style="width: 33%;">
                                            4. Chiều dài lớn nhất của tàu: ${duLieu?.tau_chieudailonnhat || '..................'} m
                                        </div>
        
                                        <div style="width: 34%;">
                                            ;5. Tổng công suất máy chính: ${duLieu?.tau_tongcongsuatmaychinh || '..............'} CV;
                                        </div>
</div>
        
                                    <div style="display: flex;margin-top: 8pt;">
                                        <div style="width: 50%;">
                                            6. Số giấy phép khai thác thủy sản: ${duLieu?.gpkt_so || '................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ;Thời hạn đến: ${duLieu?.gpkt_thoihan || '................................................'}
                                        </div>
                                    </div>
                                    <div style="display: flex;margin-top: 8pt;">
                                        <div style="width: 50%;">
                                            7. Nghề phụ 1: ${duLieu?.nghephu1 || '.......................................................................................'}
                                        </div>
                                        <div style="width: 50%;">
                                            ; 8. Nghề phụ 2: ${duLieu?.nghephu2 || '......................................................................'}
                                        </div>
                                    </div>
                                    <div style="display: flex;margin-top: 8pt;">
                                        9. Kích thước chủ yếu của ngư cụ  <label class="s3" style="padding-left: 12pt;" >(ghi cụ thể theo nghề chính):</label>
                                    </div>
                                    <div style="display: flex;margin-top: 8pt;">
                                        <div style="width: 60%;">
                                            a. Nghề câu: Chiều dài toàn bộ vàng câu:  ${duLieu?.ncau_chieudaivangcau || '.................................................................'}
                                        </div>
                                        <div style="width: 40%;">
                                            m; Số lưỡi câu: ${duLieu?.ncau_soluoicau || '..........................................................'} lưỡi
                                        </div>
                                    </div>
                                    <div style="display: flex;margin-top: 8pt;">
                                        <div style="width: 60%;">
                                            b. Nghề lưới vây, rê: Chiều dài toàn bộ lưới:  ${duLieu?.nluoivay_chieudailuoi || '...........................................................'}
                                        </div>
                                        <div style="width: 40%;">
                                            m; Chiều cao lưới: ${duLieu?.nluoivay_chieucaoluoi || '....................................................'} m
                                        </div>
                                    </div>
                                    <div style="display: flex;margin-top: 8pt;">
                                        <div style="width: 60%;">
                                            c. Nghề lưới chụp: Chu vi miệng lưới:  ${duLieu?.nluoichup_chuvimiengluoi || '.......................................................................'}
                                        </div>
                                        <div style="width: 40%;">
                                            m; Chiều cao lưới: ${duLieu?.nluoichup_chieucaoluoi || '....................................................'} m
                                        </div>
                                    </div>
                                    <div style="display: flex;margin-top: 8pt;">
                                        <div style="width: 60%;">
                                            d. Nghề lưới kéo: Chiều dài giềng phao  ${duLieu?.nluoikeo_chieudaigiengphao || '....................................................................'}
                                        </div>
                                        <div style="width: 40%;">
                                            m; Chiều cao lưới:  ${duLieu?.nluoikeo_chieudaitoanboluoi || '.....................................................'} m
                                        </div>
                                    </div>
                                    <div style="display: flex;margin-top: 8pt;">
                                        e. Nghề khác: ${duLieu?.nkhac || '...................................................................................................................................................................'}
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
                                    <h1 style="font-size: 9pt;">Chuyến biển số: ${duLieu?.chuyenbien_so || '..............................'}</h1>
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
                                    10: Cảng đi: ${duLieu?.cang_di || '............................................................'}
                                    </div>
                                    <div style="width: 50%;">
                                        ; Thời gian đi: ${duLieu?.ngay_di ? moment(duLieu?.ngay_di).format('[Ngày] LL') : 'Ngày .... Tháng .... Năm ....'} 
                                    </div>
                                </div>
                                <div style="display: flex;margin-top: 4pt;">
                                    <div style="width: 50%;">
                                        11: Cảng về: ${duLieu?.cang_ve || '............................................................'}
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
                                        ; Vào Sổ số: ${duLieu?.vaoso_so || '.........................................'}
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
                    I. THÔNG TIN VỀ HOẠT ĐỘNG KHAI THÁC THỦY SẢN
                </h1>
                <div style="overflow-x:auto;">
                    <table cellspacing="0"
                        style="width:100%; height: auto; table-layout: fixed; overflow-wrap: break-word;">
                        <tr>
                            <td style="text-align: center; vertical-align: middle; width: 4%;" rowspan="2"
                                bgcolor="#D1D6DB">
                                <div class="s4">
                                    Mẻ thứ
                                </div>
                            </td>
                            <td style="text-align: center; vertical-align: middle; " rowspan="2"
                                bgcolor="#D1D6DB">
                                <p class="s4">
                                    Thời điểm thả (giờ, phút, ngày, tháng)</p>
                            </td>
                            <td style="text-align: center; vertical-align: middle; width: 12%;" colspan="2"
                                bgcolor="#D1D6DB">
                                <p class="s4">
                                    Vị trí thả </p>
                            </td>
                            <td style="text-align: center; vertical-align: middle; " rowspan="2" bgcolor="#D1D6DB">
                                <p class="s4">
                                    Thời điểm thu (giờ, phút, ngày, tháng)
                                     </p>
                            </td>
        
                            <td class="center-table" style="width: 12%;" colspan="2" bgcolor="#D1D6DB">
                                <p class="s4">
                                    Vị trí thu</p>
                            </td>
                            <td style="width: 49%;" class="center-table" colspan="9" bgcolor="#D1D6DB">
                                <p class="s4">
                                    Sản lượng các loài thủy sản chủ yếu (kg) </p>
                            </td>
                            <td style="width: 9%;" class="center-table" rowspan="2" bgcolor="#D1D6DB">
                                <p class="s4">
                                    Tổng sản lượng (kg) </p>
                            </td>
                        </tr>
                        <tr>
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
                                Vĩ độ
                            </td>
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
                                Kinh độ
                            </td>
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
                                Vĩ độ
                            </td>
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
                                Kinh độ
                            </td>
        
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
                                Loài<br>
                                ${duLieu?.thumua[0]?.loai_1||''}
        
                            </td>
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
        
                                Loài<br>
                                ${duLieu?.thumua[0]?.loai_2||''}
        
                            </td>
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
                                Loài<br>
                                ${duLieu?.thumua[0]?.loai_3||''}
        
        
                            </td>
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
                                Loài<br>
                                ${duLieu?.thumua[0]?.loai_4||''}
        
                            </td>
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
                                Loài <br>
                                ${duLieu?.thumua[0]?.loai_5||''}
        
                            </td>
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
                                Loài<br>
                                ${duLieu?.thumua[0]?.loai_6||''}
                            </td>
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
                                Loài<br>
                                ${duLieu?.thumua[0]?.loai_7||''}
                            </td>
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
                                Loài<br>
                                ${duLieu?.thumua[0]?.loai_8||''}
                            </td>
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
                                Loài<br>
                                ${duLieu?.thumua[0]?.loai_9||''}
                            </td>
        
        
                        </tr>
                        ${duLieu?.khaithac.map((line, index) => `
                        <tr>
                            <td class="s5 center-table">
                                ${index + 1}
                            </td>
        
                            <td class="center-table">
                                <p style="width: 100%;" class="s5">
                                    ${line?.ngaythang ? moment(line?.ngaythang).format('DD-MM-YYYY') : ''}
                                </p>
                            </td>
                            <td class="s5 center-table">
                                ${line?.tm_ct_vt_vido || ''}
                            </td>
                            <td class="s5 center-table">
                                ${line?.tm_ct_vt_kinhdo || ''}
                            </td>
                            <td class="center-table">
                                <p style="width: 100%;" class="s5">
                                    ${line?.ngaythang ? moment(line?.ngaythang).format('DD-MM-YYYY') : ''}
                                </p>
                            </td>
                            <td class="s5 center-table">
                                ${line?.tm_ct_vt_vido || ''}
                            </td>
                            <td class="s5 center-table">
                                ${line?.tm_ct_vt_kinhdo || ''}
                            </td>
                            <td class="s5 center-table">
                                ${line?.loai_1_kl == 0 ? '' : line?.loai_1_kl}
                            </td>
                            <td class="s5 center-table">
                                ${line?.loai_2_kl == 0 ? '' : line?.loai_2_kl}
                            </td>
                            <td class="s5 center-table">
                                ${line?.loai_3_kl == 0 ? '' : line?.loai_3_kl}
                            </td>
                            <td class="s5 center-table">
                                ${line?.loai_4_kl == 0 ? '' : line?.loai_4_kl}
                            </td>
                            <td class="s5 center-table">
                                ${line?.loai_5_kl == 0 ? '' : line?.loai_5_kl}
                            </td>
                            <td class="s5 center-table">
                                ${line?.loai_6_kl == 0 ? '' : line?.loai_6_kl}
                            </td>
                            <td class="s5 center-table">
                                ${line?.loai_7_kl == 0 ? '' : line?.loai_7_kl}
                            </td>
                            <td class="s5 center-table">
                                ${line?.loai_8_kl == 0 ? '' : line?.loai_8_kl}
                            </td>
                            <td class="s5 center-table">
                                ${line?.loai_9_kl == 0 ? '' : line?.loai_9_kl}
                            </td>
                            <td class="s5 center-table">
                                ${line?.tongsanluong == 0 ? '' : line?.tongsanluong}
                            </td>
                        </tr>
                        `).join('')}
        
                        <tr>
                            <td class="s5 center-table" colspan="7">
                                Tổng khối lượng
                            </td>
        
                            <td class="center-table s5">
                                ${totalByType[0] == 0 ? '' : totalByType[0]}
                            </td>
                            <td class="center-table s5">
                                ${totalByType[1] == 0 ? '' : totalByType[1]}
                            </td>
                            <td class="center-table s5">
                                ${totalByType[2] == 0 ? '' : totalByType[2]}
                            </td>
                            <td class="center-table s5">
                                ${totalByType[3] == 0 ? '' : totalByType[3]}
                            </td>
                            <td class="center-table s5">
                                ${totalByType[4] == 0 ? '' : totalByType[4]}
                            </td>
                            <td class="center-table s5">
                                ${totalByType[5] == 0 ? '' : totalByType[5]}
                            </td>
                            <td class="center-table s5">
                                ${totalByType[6] == 0 ? '' : totalByType[6]}
                            </td>
                            <td class="center-table s5">
                                ${totalByType[7] == 0 ? '' : totalByType[7]}
                            </td>
                            <td class="center-table s5">
                                ${totalByType[8] == 0 ? '' : totalByType[8]}
                            </td>
                            <td class="center-table s5">
                            ${(totalByType[0] + totalByType[1] + totalByType[2] + totalByType[3] + totalByType[4] + totalByType[5] + totalByType[6] + totalByType[7] + totalByType[8])
                == 0 ? '' :
                (totalByType[0] + totalByType[1] + totalByType[2] + totalByType[3] + totalByType[4] + totalByType[5] + totalByType[6] + totalByType[7] + totalByType[8])}
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
                            Thuyền trưởng
        
                        </h1>
                        <div class="s6 new-page">
                            (ký, ghi rõ họ và tên)
                        </div>
                    </div>
                </div>
                <div style="float: left;margin: 8pt 8pt 8pt 8pt ">
                    <div>
                        <h1>
                            Ghi chú:
                        </h1>
                        <div class="s2 new-page">
                            * Đối với nghề lưới kéo, ghi cụ thể tên loài thủy sản có thể xuất khẩu và các loài khác:
                        </div>
                    </div>
                </div>
                <br><br><br>
            </div>
            <!-- end -->
            <div class="new-page">
                <h1 style="padding-top: 7pt;padding-left: 18pt;text-align: left;">
                    II. THÔNG TIN VỀ HOẠT ĐỘNG CHUYỂN TẢI (nếu có)
                </h1>
                <div style="overflow-x:auto;">
                    <table cellspacing="0"
                        style="width:100%; height: auto; table-layout: fixed; overflow-wrap: break-word;">
                        <tr>
                            <td style="text-align: center; vertical-align: middle; width: 10%;" rowspan="2"
                                bgcolor="#D1D6DB">
                                <div class="s4">
                                   TT
                                </div>
                            </td>
                            <td style="text-align: center; vertical-align: middle; width: 14%;" rowspan="2"
                                bgcolor="#D1D6DB">
                                <p class="s4">
                                    Ngày, tháng</p>
                            </td>
        
                            <td style="text-align: center; vertical-align: middle; width: 19%;" colspan="2"
                                bgcolor="#D1D6DB">
                                <p class="s4">
Thông tin tàu thu mua/chuyển tải </p>
                            </td>
        
                            <td style="width: 19%;" class="center-table" colspan="2" bgcolor="#D1D6DB">
                                <p class="s4">
                                    Vị trí thu mua/chuyển tải</p>
                            </td>
                            <td style="width: 19%;" class="center-table" colspan="2" bgcolor="#D1D6DB">
                                <p class="s4">
                                    Đã bán/chuyển tải</p>
                            </td>
                            <td style="width: 19%;" class="center-table" rowspan="2" bgcolor="#D1D6DB">
                                <p class="s4">
                                    Thuyền trưởng tàu thu mua/chuyển tải (ký, ghi gõ họ tên)</p>
                            </td>
                        </tr>
                        <tr>
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
                                Số đăng ký tàu
        
                            </td>
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
                                Số giấy phép khai thác
                            </td>
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
                                Vĩ độ
                            </td>
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
                                Kinh độ
                            </td>
        
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
                                Tên loài thủy sản
        
                            </td>
                            <td  class="s4 center-table" bgcolor="#D1D6DB">
                                Khối lượng (kg)
                            </td>  
                        </tr>
                        ${duLieu?.thumua.map((line, index) => {

                    klg += Number(line?.daban_ct_khoiluong);

                    return `
                        <tr>
                            <td class="s5 center-table">
                                ${index + 1}
                            </td>
        
                            <td class="center-table">
                                <p style="width: 100%;" class="s5">
                                    ${line?.ngaythang ? moment(line?.ngaythang).format('DD-MM-YYYY') : ''}
                                </p>
                            </td>
                            <td class="s5 center-table">
                                ${line?.tm_ct_bstau || ''}
                            </td>
                            <td class="s5 center-table">
                                ${line?.tm_ct_gpkt || ''}
                                </td>
                            <td class="center-table">
                                <p style="width: 100%;" class="s5">
                                ${line?.tm_ct_vt_vido || ''}
                                </p>
                            </td>
                            <td class="s5 center-table">
                                ${line?.tm_ct_vt_kinhdo || ''}
                            </td>
                            <td class="s5 center-table">
                                ${line?.daban_ct_loai || ''}
                            </td>
                            <td class="s5 center-table">
                                ${line?.daban_ct_khoiluong == 0 ? '' : line?.daban_ct_khoiluong || ''}
                            </td>
                            <td class="s5 center-table">
                                ${line?.tm_ct_thuyentruong || ''}
                            </td>
                            
                        </tr>
                        `}).join('')}
        
                        <tr>
                            <td class="s5 center-table" colspan="7">
                                Tổng khối lượng
                            </td>
        
                            <td class="center-table s5">
                                ${klg == 0 ? '' : klg || ''}
                            </td>
                            <td class="center-table s5">
                                <br>
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
                            Thuyền trưởng
        
                        </h1>
                        <div class="s6 new-page">
                            (ký, ghi rõ họ và tên)
                        </div>
                    </div>
                </div>
        
                <br><br><br>
            </div>
        
            </body>
        
        </html>`;
        const options = {
            html,
            fileName: `${duLieu?.dairy_name}`,
            directory: 'nhatky_pdf',
        };
        const file = await RNHTMLtoPDF.convert(options);
        if (duLieu?.dairy_name !== 'filemau') {
            Alert.alert('Thành công', `PDF lưu tại ${file.filePath.substring(20)}`);
        }
        return true;
        // setCheckViewPDF(false);

        // setIsLoading(false);
    } catch (error) {
        console.log(error);
        return false;
    }
};
