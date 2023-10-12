import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import CustomHeader from "../CustomHeader";
import { ThemeContext } from "../../Context/ThemeContext";
import { Image } from "expo-image";
import { Styles } from "../CommonStyling/Styles";
import { useNavigation } from "@react-navigation/native";

const ChangeCoverScreen = ({ route }) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const [images, setImages] = useState(route.params.images)
  const [coverIndex, setCoverIndex] = useState(0)

  const handleCoverBtn = () => {
    route.params.changeCover(coverIndex)
    navigation.goBack()
  }
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: theme.background,
    }}>
      <CustomHeader />
      <View style={styles.container}>
        {
          images.map((image, index) => (
            <View key={index}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setCoverIndex(index)
                }}
              >
                <Image
                  source={{ uri: image }}
                  contentFit="cover"
                  style={{
                    width: 150,
                    height: 120,
                    borderRadius: 10
                  }}
                />
              </TouchableOpacity>
              {
                coverIndex === index && (
                  <Text
                    style={Styles.coverImgStyle(theme.primary)}
                  >Cover Image</Text>
                )
              }
            </View>
          ))
        }
      </View>
      <TouchableOpacity onPress={handleCoverBtn} style={styles.coverBtn(theme.btn)}>
        <Text style={{ color: theme.invertText, fontWeight: '600' }}>SET AS COVER</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChangeCoverScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  coverBtn: (bgColor) => ({
    borderWidth: 1,
    marginHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: bgColor,
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0
  })
});
