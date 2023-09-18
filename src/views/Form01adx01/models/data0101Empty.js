import makeid from '../../others/makeid';

const moment = require('moment');

 const data0101Empty = ()=>{
  const data={
  isdraft: false,
  dairy_name: '',
  nghechinh: '',
  ten_chutau: '',
  ten_thuyentruong: '',
  id_tau: '',
  tau_bs: '',
  tau_chieudailonnhat: '',
  tau_tongcongsuatmaychinh: '',
  gpkt_so: '',
  gpkt_thoihan: moment().format('DD/MM/YYYY'),
  nghephu1: '',
  nghephu2: '',
  ncau_chieudaivangcau: '',
  ncau_soluoicau: '',
  nluoivay_chieudailuoi: '',
  nluoivay_chieucaoluoi: '',
  nluoichup_chuvimiengluoi: '',
  nluoichup_chieucaoluoi: '',
  nluoikeo_chieudaigiengphao: '',
  nluoikeo_chieudaitoanboluoi: '',
  nkhac: '',
  chuyenbien_so: '',
  cang_di: '',
  ngay_di: moment().format('YYYY-MM-DD'),
  cang_ve: '',
  ngay_ve: moment().format('YYYY-MM-DD'),
  ngaynop: moment().format('YYYY-MM-DD'),
  vaoso_so: '',
  khaithac: [
    {
      id: makeid(7),
      methu: '1',
      thoidiem_tha: moment().format('YYYY-MM-DDTHH:mm'),
      vido_tha: '',
      kinhdo_tha: '',
      thoidiem_thu: moment().format('YYYY-MM-DDTHH:mm'),
      vido_thu: '',
      kinhdo_thu: '',
      loai_1: '',
      loai_2: '',
      loai_3: '',
      loai_4: '',
      loai_5: '',
      loai_6: '',
      loai_7: '',
      loai_8: '',
      loai_9: '',
      loai_1_kl: '',
      loai_2_kl: '',
      loai_3_kl: '',
      loai_4_kl: '',
      loai_5_kl: '',
      loai_6_kl: '',
      loai_7_kl: '',
      loai_8_kl: '',
      loai_9_kl: '',
      tongsanluong: '',
    },
  ],
  thumua: [
    {
      id: makeid(7),
      ngaythang: moment().format('YYYY-MM-DD'),
      tm_ct_bstau: '',
      tm_ct_gpkt: '',
      tm_ct_vt_vido: '',
      tm_ct_vt_kinhdo: '',
      daban_ct_loai: '',
      daban_ct_khoiluong: '',
      tm_ct_thuyentruong: '',
    },
  ],
};

return data;
}

export default data0101Empty;

