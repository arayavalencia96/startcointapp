import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 18,
    width: 350,
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'white',
    marginEnd: -25,
  },
  inputWithIcon: {
    width: 350,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  },
  button: {
    borderRadius: 15,
    marginTop: 25,
    padding: 10,
    alignItems: 'center',
    width: 200,
  },
  bgPowderBlue: {
    backgroundColor: 'powderblue',
  },
  bgClaro: {
    backgroundColor: '#eeeee4',
  },
  bgMistyRose: {
    backgroundColor: 'mistyrose'
  },
  bgBurlywood: {
    backgroundColor: 'burlywood'
  },
  bg2daBotonera: {
    backgroundColor: '#dac7c7',
  },
  bg3btn: {
    backgroundColor: '#c18f8f',
  },
  colorBtn: {
    color: 'white',
  },
  bgRebeccaPurple: {
    backgroundColor: 'rebeccapurple'
  },

  textLight: {
    color: 'snow'
  },

  buttonText: {
    fontSize: 18,
  },

  error: {
    color: 'red',
    alignSelf: 'center'
  },
  iconLogin: {
    width: 20,
    height: 20,
  }
});
