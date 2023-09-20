import {StyleSheet } from 'react-native'


 const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 18,
  },
  actionDownload: {
    backgroundColor: '#3b82f6',
    marginRight: 10,
  },

  actionExportPDF: {
    backgroundColor: '#FF9800',
    marginRight: 10,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginRight: 8,
  },

  action: {
    flexDirection: 'row',
    marginVertical: 12,
    marginBottom: 24,
  },
    textHead: {
      textAlign: 'center',
      padding: 3,
      fontSize: 16,
      color: '#fff',
      fontWeight: '600'
    },
    btn: {
      borderRadius: 8,
      margin: 3
  
    },
    btnText: {
      paddingVertical: 6,
      paddingHorizontal: 14,
      fontSize: 20,
      fontWeight: '600'
    }
  });

  export default styles;