import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../Context/ThemeContext'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FeatureOpt = ({ title, options, clicked, selected, count = 0, update, select }) => {
  const { theme } = useContext(ThemeContext)
  const [showOpt, setShowOpt] = useState(false)

  const getNum = (index) => {
    return selected[index].count;
  }
  const getVal = (index) => {
    if (index !== -1)
      return selected[index].value;
  }
  // console.log(selected);

  return (
    <>
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setShowOpt(!showOpt)
          }} style={styles.container}>
          <Text style={{ color: showOpt ? theme.primary : theme.text, fontWeight: '500' }}>{title}</Text>
          <View style={styles.sideBtnContainer}>
            {
              count > 0 && (
                <Text style={{
                  color: theme.invertText,
                  backgroundColor: theme.text,
                  textAlign: 'center',
                  width: 26,
                  paddingVertical: 5,
                  borderRadius: 13,
                  overflow: 'hidden'
                }}>{count}</Text>
              )
            }
            <MaterialCommunityIcons
              name={showOpt ? 'minus' : 'plus'}
              color={showOpt ? theme.primary : theme.text}
              size={25}
            />
          </View>
        </TouchableOpacity>
        <View>
          {
            showOpt && options.map((option, index) => (
              <TouchableOpacity
                onPress={() => {
                  (option.type !== 'addable' && option.type === 'select') ?
                    select({ featureName: title, ...option, count: 1 }) :
                    clicked({ featureName: title, ...option, count: 1 })
                }}
                activeOpacity={0.6}
                style={[styles.styleOpt, selected.some((opt) => opt.title === option.title && opt.type === option.type) && { borderColor: theme.primary }]}
                key={index}>
                <Text style={{ color: 'gray', fontSize: 12 }}>{option.title}</Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  {
                    selected.some((opt) => opt.title === option.title && opt.type === option.type) && (
                      <Text style={{ color: theme.text, fontSize: 12 }}>{getVal(selected.findIndex((opt) => opt.title === option.title && opt.type === option.type))}</Text>
                    )
                  }
                  {
                    option.type === 'select' && (
                      <MaterialCommunityIcons
                        style={{ borderWidth: 0, borderRadius: 10, padding: 10 }}
                        name={'chevron-down'}
                        color={theme.primary}
                        size={25}
                      />
                    )
                  }
                </View>
                {
                  option.type === 'addable' && selected.some((opt) => opt.title === option.title && opt.type === option.type) && (
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                      <TouchableOpacity
                        onPress={() => update(option, 'sub')}
                        style={{ borderWidth: 0, paddingVertical: 14, paddingLeft: 10 }}
                      >
                        <MaterialCommunityIcons
                          style={{ borderWidth: 1, borderColor: '#e1e1e1', borderRadius: 10, padding: 1 }}
                          name={'minus'}
                          color={'gray'}
                          size={15}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => { }}
                        style={{ borderWidth: 0, paddingVertical: 15, width: 30, alignItems: 'center' }}
                      >
                        <Text style={{ color: 'gray' }}>{getNum(selected.findIndex((opt) => opt.title === option.title && opt.type === option.type))}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => update(option, 'add')}
                        style={{ borderWidth: 0, paddingVertical: 14, paddingRight: 10 }}
                      >
                        <MaterialCommunityIcons
                          style={{ borderWidth: 1, borderColor: '#e1e1e1', borderRadius: 10, padding: 1 }}
                          name={'plus'}
                          color={'gray'}
                          size={15}
                        />
                      </TouchableOpacity>
                    </View>
                  )
                }
              </TouchableOpacity>
            ))
          }
        </View>
      </View >
    </>
  )
}

export default FeatureOpt

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sideBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  styleOpt: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    marginTop: 10,
    paddingLeft: 15,
    height: 50,
    // paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'space-between'
  }
})