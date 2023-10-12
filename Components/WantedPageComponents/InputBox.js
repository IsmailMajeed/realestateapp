import React, { useEffect, useState, useRef, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from "../../Context/ThemeContext";

const InputBox = ({
  value,
  onChangeText,
  label,
  showIcon = false,
  iconName = '',
  iconColor = "#E85451",
  edit = true,
  clicked = () => { },
  password = false,
  multiline = false
}
) => {
  // const [pass, setPass] = useState(password)
  const [showPass, setShowPass] = useState(password);
  const moveText = useRef(new Animated.Value(0)).current;
  const { theme } = useContext(ThemeContext);
  const [focus, setFocus] = useState(false)

  useEffect(() => {
    if (value !== "") {
      setFocus(true)
      moveTextTop();
    }
  }, [value])

  const onFocusHandler = () => {
    setFocus(true);
    moveTextTop();
    // if (value !== "") {
    //   moveTextTop();
    // }
  };

  const onBlurHandler = () => {
    if (value === "") {
      moveTextBottom();
      setFocus(false)
    }
  };

  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -20],
  });

  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };

  const [height, setHeight] = useState(20);
  const handleContentSizeChange = (contentWidth, contentHeight) => {
    // Update the height based on the contentHeight + some padding
    setHeight(contentHeight + 20); // Adjust padding as needed
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => clicked()}
      style={styles.container}>
      <Animated.View style={[styles.animatedStyle, ((focus) ? styles.labelPositionTop : styles.labelPositionBottom), animStyle]}>
        <Text style={[styles.label, { color: focus ? 'black' : "lightgrey" }]}>{label}</Text>
      </Animated.View>
      <TextInput
        multiline={multiline}
        // numberOfLines={4}
        // autoCapitalize={"none"}
        style={[styles.input, { height }]}
        value={value}
        // onPressOut={() => blur()}
        onPressIn={() => clicked()}
        secureTextEntry={showPass}
        onChangeText={(text) => onChangeText(text)}
        editable={edit}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onContentSizeChange={(e) =>
          handleContentSizeChange(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height)
        }
      // blurOnSubmit
      />
      {
        password && (
          <TouchableOpacity
            style={{ position: 'absolute', bottom: 5, right: 0, borderWidth: 0, padding: 10 }}
            onPress={() => setShowPass(!showPass)}
            activeOpacity={1}
          >
            <Text
              style={{ color: theme.primary, fontSize: 12, backgroundColor: 'white' }}>
              {
                showPass ? 'Show' : 'Hide'
              }
            </Text>
          </TouchableOpacity>
        )
      }
      {
        showIcon && (
          <TouchableOpacity
            onPress={() => clicked()}
          // activeOpacity={1}
          >
            <MaterialCommunityIcons
              style={styles.iconStyling}
              name={iconName}
              color={iconColor}
              size={25} />
          </TouchableOpacity>
        )
      }
    </TouchableOpacity>
  );
};
export default InputBox;

const styles = StyleSheet.create({
  container: {
    // marginBottom: 20,
    // marginTop: 20,
    backgroundColor: "#fff",
    // paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    width: "100%",
    alignSelf: "center",
    ...Platform.select({
      android: {
        paddingVertical: 5,
      },
      ios: {
        paddingTop: 6,
        // paddingBottom: 5
      }
    })
  },
  icon: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontSize: 13,
    height: 35,
    color: "#000",
    paddingRight: 35,
    // borderWidth: 1,
    ...Platform.select({
      ios: {
        marginBottom: 5
      }
    })
  },
  label: {
    fontSize: 13,
  },
  animatedStyle: {
    // top: 13,
    left: 15,
    position: 'absolute',
    // borderRadius: 90,
    // borderWidth: 1,
    // zIndex: 10000,
    backgroundColor: 'white',
    paddingHorizontal: 5
  },
  iconStyling: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    ...Platform.select({
      android: {
        bottom: 4
      }
    })
  },
  labelPositionBottom: {
    top: 11,
    ...Platform.select({
      android: {
        top: 9
      }
    })
  },
  labelPositionTop: {
    top: 11,
    ...Platform.select({
      android: {
        top: 11
      }
    })
  }
});