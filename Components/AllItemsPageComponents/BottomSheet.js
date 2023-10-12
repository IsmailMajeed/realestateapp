import { View, Text, PanResponder, Modal, Animated, Easing, TouchableOpacity, ScrollView } from 'react-native'
import { useContext, useEffect, useRef, useState } from 'react'
import { FilterContext } from '../../Context/FiltersContext';
// import { SwipeablePanel } from 'rn-swipeable-panel';

import { SlideModal } from 'react-native-slide-modal';

export default function BottomSheet({ title, contents, show, onClose }) {
  // const [modalVisible, setModalVisible] = useState(false);

  // const translateY = useRef(new Animated.Value(500)).current;
  const { setFilter } = useContext(FilterContext);

  // const panResponder = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onMoveShouldSetPanResponder: () => true,
  //     onPanResponderMove: (_, gestureState) => {
  //       translateY.setValue(gestureState.dy);
  //     },
  //     onPanResponderRelease: (_, gestureState) => {
  //       if (gestureState.dy > 200) {
  //         hideBottomSheet();
  //       } else {
  //         showBottomSheet();
  //       }
  //     },
  //   })
  // ).current;

  // const showBottomSheet = () => {
  //   Animated.timing(translateY, {
  //     toValue: 0,
  //     duration: 300,
  //     easing: Easing.ease,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // if (show) {
  //   showBottomSheet()
  // }

  // const hideBottomSheet = () => {
  //   onClose();
  //   Animated.timing(translateY, {
  //     toValue: 500,
  //     duration: 300,
  //     easing: Easing.ease,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     translateY.setValue(500);
  //   });
  // };


  // const [panelProps, setPanelProps] = useState({
  //   fullWidth: true,
  //   openLarge: false,
  //   showCloseButton: true,
  //   onClose: () => onClose(),
  //   onPressCloseButton: () => onClose(),
  //   showCloseButton: false,
  //   noBackgroundOpacity: true,
  //   onlySmall: false,
  //   closeOnTouchOutside: false,
  //   allowTouchOutside: true,
  //   barStyle: {
  //     backgroundColor: '#E85451'
  //   }
  //   // ...or any prop you want
  // });
  // const [isPanelActive, setIsPanelActive] = useState(false);

  // const openPanel = () => {
  //   setIsPanelActive(true);
  // };

  // const closePanel = () => {
  //   setIsPanelActive(false);
  // };
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
    // <View>
    //   <SwipeablePanel
    //     {...panelProps} isActive={show}>
    //     <View
    //       style={{
    //         padding: 16,
    //         borderTopLeftRadius: 16,
    //         borderTopRightRadius: 16,
    //         borderWidth: 0,
    //         width: '100%',
    //         // transform: [{ translateY }],
    //       }}
    //     >
    //       <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10, }}>{title}</Text>
    //       {
    //         contents.map((content) => (
    //           <TouchableOpacity
    //             key={content.title} // Add a unique key for each item
    //             activeOpacity={0.5}
    //             onPress={() => {
    //               if (content.value === 'Condition') {
    //                 setFilter(content.value, '', content.title);
    //               }
    //               else if (title === 'Sort') {
    //                 setFilter(title, content.value);
    //               } else {
    //                 setFilter(content.value);
    //               }
    //               onClose();
    //             }}
    //           >
    //             <Text style={{ fontSize: 12, color: 'gray', borderWidth: 0, paddingVertical: 15 }}>
    //               {content.title}
    //             </Text>
    //           </TouchableOpacity>
    //         ))
    //       }
    //     </View>
    //   </SwipeablePanel>
    // </View>
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
                    key={content.title} // Add a unique key for each item
                    activeOpacity={0.5}
                    onPress={() => {
                      if (content.value === 'Condition') {
                        setFilter(content.value, '', content.title);
                      }
                      else if (title === 'Sort') {
                        setFilter(title, content.value);
                      } else {
                        setFilter(content.value);
                      }
                      onClose();
                    }}
                  >
                    <Text style={{ fontSize: 12, color: 'gray', borderWidth: 0, paddingVertical: 15 }}>
                      {content.title}
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
      {/* <Modal
    //     transparent={true}
    //     visible={show}
    //     animationType="slide"
    //     onRequestClose={hideBottomSheet}
    //   >
    //     <View
    //       style={{
    //         flex: 1,
    //         justifyContent: 'flex-end',
    //         backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //       }}
    //     >
    //       <Animated.View
    //         {...panResponder.panHandlers}
    //         style={{
    //           backgroundColor: 'white',
    //           padding: 16,
    //           borderTopLeftRadius: 16,
    //           borderTopRightRadius: 16,
    //           transform: [{ translateY }],
    //         }}
    //       >
    //         <TouchableOpacity
    //           onPress={hideBottomSheet}>
    //           <View style={{ position: 'relative', top: -5, paddingVertical: 2, paddingHorizontal: 25, borderRadius: 15, backgroundColor: '#E85451', alignSelf: 'center' }}></View>
    //         </TouchableOpacity>
    //         <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10, }}>{title}</Text>
    //         {
    //           contents.map((content) => (
    //             <TouchableOpacity
    //               key={content.value} // Add a unique key for each item
    //               activeOpacity={0.5}
    //               onPress={() => {
    //                 if (title === 'Sort') {
    //                   setFilter(title, content.value);
    //                 } else {
    //                   setFilter(content.value);
    //                 }
    //                 hideBottomSheet();
    //               }}
    //             >
    //               <Text style={{ fontSize: 12, color: 'gray', borderWidth: 0, paddingVertical: 15 }}>
    //                 {content.title}
    //               </Text>
    //             </TouchableOpacity>
    //           ))
    //         }
    //       </Animated.View>
    //     </View>
    //   </Modal> */}
    </Animated.View>
  )
}