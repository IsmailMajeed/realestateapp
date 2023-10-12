import { View, Text, Animated, TouchableOpacity, ScrollView } from 'react-native'
import { useEffect } from 'react'

import { SlideModal } from 'react-native-slide-modal';

export default function BottomSheetNew({ title, contents, show, onClose }) {
  const slideInAnimation = new Animated.Value(0);
  const slideIn = () => {
    Animated.spring(slideInAnimation, {
      toValue: 1, // End value
      tension: 10, // Adjust as needed
      useNativeDriver: false, // Required for positioning
    }).start();
  };
  useEffect(() => {
    if (show) {
      slideIn();
    }
  }, [show]);
  return (
    <Animated.View
      style={{
        position: 'absolute',
        transform: [
          {
            translateY: slideInAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [400, 0], // Adjust the starting and ending positions
            }),
          },
        ],
      }}
    >
      <SlideModal
        // modalType="iOS Form Sheet"
        modalType="iOS Bottom Sheet"
        modalVisible={show}
        // screenContainer={

        // }
        modalContainer={
          <View
            style={{
              padding: 16,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              borderWidth: 0,
              width: '100%',
              // height: '100%'
              // transform: [{ translateY }],
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10, }}>{title}</Text>
            <ScrollView
            >
              {
                contents.map((content) => (
                  <TouchableOpacity
                    key={content} // Add a unique key for each item
                    activeOpacity={0.5}
                    onPress={() => {
                      onClose(content);
                    }}
                  >
                    <Text style={{ fontSize: 12, color: 'gray', borderWidth: 0, paddingVertical: 15 }}>
                      {content}
                    </Text>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
          </View>
        }
        modalHeaderTitle=""
        pressDone={() => onClose()}
        pressCancel={() => onClose()}
        darkMode={false}
        doneDisabled={true}
      />

    </Animated.View>
  )
}