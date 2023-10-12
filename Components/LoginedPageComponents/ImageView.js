import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserContext } from "../../Context/UserContext";
import { PREFIX, blurhash } from "../../Data/Constants";
import { Image } from "expo-image";

const ImageView = ({ navigation }) => {
  const { userInfo } = useContext(UserContext)
  const { width, height } = Dimensions.get('screen');

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center'
    }}>
      <TouchableOpacity
        style={{
          zIndex: 10,
          position: 'absolute',
          right: 20,
          top: 20
        }}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons
          name='close'
          color='#fff'
          size={30}
        />
      </TouchableOpacity>
      <Image
        style={{ width, height }}
        source={(userInfo.profilePic[0] === 'f' ? '' : PREFIX) + userInfo.profilePic}
        placeholder={blurhash}
        contentFit='contain'
        transition={0}
      />
    </View>
  );
};

export default ImageView;

const styles = StyleSheet.create({});
