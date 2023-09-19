import { StyleSheet} from 'react-native'

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor:'#fff'
    },
    inputContainer: {
        width: '80%',
        marginBottom: 16,
        padding: '10%',
        flexDirection: 'column',
        borderRadius: 8,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        // shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: 'white',
    },
    loginText: {
        color: 'black',
        fontWeight: '500',
        fontSize: 20,
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
        borderRadius:6
    },
    passwordIconContainer: {
        position: 'absolute',
        top:9,
        right: 10,
    },
    button: {
        backgroundColor: '#0033FF',
        justifyContent: 'center'
    },

    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
    },

    label: {
        color: '#000',
        fontSize: 14,
    },
});


export default styles