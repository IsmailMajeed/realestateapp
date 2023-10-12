import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  inputStyling: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    ...Platform.select({
      android: {
        paddingVertical: 0,
      }
    })
  },
  heading: {
    fontWeight: '700',
    fontSize: 16,
    color: '#37474F'
  },
  coverImgStyle: (color) => ({
    backgroundColor: color,
    color: '#fff',
    fontSize: 12,
    borderRadius: 5,
    overflow: 'hidden',
    position: 'absolute',
    paddingHorizontal: 3,
    paddingVertical: 1,
    left: 5,
    top: 3
  })
})