import React, { useContext } from 'react';

// import all the components we are going to use
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

//import basic react native components
import { BottomSheet } from 'react-native-btr';
import { ThemeContext } from '../../Context/ThemeContext';

const BottomSheetOpt = ({ show = false, onClose = () => { }, title = '', contents = [] }) => {
  const { theme } = useContext(ThemeContext)
  return (
    <View>
      <BottomSheet
        visible={show}
        onBackButtonPress={() => onClose(false)}
        onBackdropPress={() => onClose(false)}
      >
        <View style={styles.bottomNavigationView}>
          <View style={styles.bar(theme.primary)}></View>
          <SafeAreaView
            style={{
              flex: 1,
              marginTop: 20,
              gap: 10
            }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 15,
                color: theme.text
              }}>
              {title}
            </Text>
            <ScrollView contentContainerStyle={styles.optContainer}>
              {
                contents.map((content, index) => (
                  <TouchableOpacity key={index} onPress={() => onClose(content)}>
                    <Text style={{ color: theme.text }}>{content}</Text>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
          </SafeAreaView>
        </View>
      </BottomSheet>
    </View>
  );
};

export default BottomSheetOpt;

const styles = StyleSheet.create({
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 300,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  optContainer: {
    gap: 20,
    marginTop: 10,
    paddingBottom: 10
  },
  bar: (color) => ({
    marginTop: 15,
    height: 6,
    width: 50,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: color
  })
});
