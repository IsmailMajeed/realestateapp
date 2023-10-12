import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../Context/ThemeContext';

const CustomHeader = ({ title = 'Back', border = 1 }) => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext)

  return (
    <View style={[styles.header, { backgroundColor: theme.background, borderBottomWidth: border }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left" color={theme.primary} size={30} />
      </TouchableOpacity>
      <TouchableOpacity style={{borderWidth: 0, paddingHorizontal: 10, paddingVertical: 10}} onPress={() => navigation.goBack()}>
        <Text style={[styles.title, { color: theme.text, }]}>{title}</Text>
      </TouchableOpacity>
      {/* Add other header elements as needed */}
    </View>
  );
};

const styles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // paddingVertical: 10,
    // gap: 10,
    borderColor: "#eee",
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default CustomHeader;
