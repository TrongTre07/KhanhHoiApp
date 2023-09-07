const moment = require('moment');
const currentDate = moment();
const formattedDate = currentDate.format('YYYY-MM-DDTHH:mm:ss');

const data0201Empty = {
  dairy_name: '',
  ten_chutau: '',
  ten_thuyentruong: '',
  id_tau: '',
  tau_bs: '',
  tau_chieudailonnhat: '',
  tau_tongcongsuatmaychinh: '',
  gpkt_so: '',
  gpkt_thoihan: '',
  chuyenbien_so: '',
  cang_di: '',
  ngay_di: formattedDate,
  cang_ve: '',
  ngay_ve: formattedDate,
  ngaynop: formattedDate,
  vaoso_so: '',
  date_create: formattedDate,
  thumua: [
    {
      id: 0,
      // dairy_id: data0201.id,
      ngaythang: formattedDate,
      id_tau: '',
      tau_bs: '',
      tm_ct_vt_vido: '',
      tm_ct_vt_kinhdo: '',
      loai_1: '',
      loai_2: '',
      loai_3: '',
      loai_4: '',
      loai_5: '',
      loai_6: '',
      loai_1_kl: '',
      loai_2_kl: '',
      loai_3_kl: '',
      loai_4_kl: '',
      loai_5_kl: '',
      loai_6_kl: '',
      tongsanluong: '',
    },
  ],
  thongtintaudc_thumua: [
    {
      id: 0,
      // dairy_id: 0,
      id_tau: '',
      tau_bs: '',
      tau_chieudailonnhat: '',
      tau_tongcongsuatmaychinh: '',
      gpkt_so: '',
      gpkt_thoihan: formattedDate,
      nghekt: '',
      cang_di: '',
      ngay_di: formattedDate,
      tg_khaithac_tungay: formattedDate,
      tg_khaithac_denngay: formattedDate,
      thongtinhoatdong: [
        {
          id: 0,
          // dairy_id: data0201.id,
          methu: '1',
          thoidiem_tha: formattedDate,
          vido_tha: '',
          kinhdo_tha: '',
          thoidiem_thu: formattedDate,
          vido_thu: '',
          kinhdo_thu: '',
          loai_1: '',
          loai_2: '',
          loai_3: '',
          loai_4: '',
          loai_5: '',
          loai_6: '',
          loai_1_kl: '',
          loai_2_kl: '',
          loai_3_kl: '',
          loai_4_kl: '',
          loai_5_kl: '',
          loai_6_kl: '',
          tongsanluong: '',
        },
      ],
      selected: false,
    },
  ],
  isdraft: false,
};

export default data0201Empty;
