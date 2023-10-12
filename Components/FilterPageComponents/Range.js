import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'

import Thumb from './SliderFiles/Thumb';
import Rail from './SliderFiles/Rail';
import RailSelected from './SliderFiles/RailSelected';
import Label from './SliderFiles/Label';
import Notch from './SliderFiles/Notch';

import Slider from 'rn-range-slider';

export default function Range({ title }) {
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(1000000000);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000000000);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: '600', paddingVertical: 5 }}>{title}</Text>
      <View style={styles.rangeInputContainer}>
        <TextInput value={`${low}`} keyboardType='numeric' style={styles.rangeInputs} placeholder='0' />
        <Text>To</Text>
        <TextInput value={`${high}`} keyboardType='numeric' style={styles.rangeInputs} placeholder='Any' />
      </View>

      <Slider
        style={{
          marginTop: 20
        }}
        min={min}
        max={max}
        step={1}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  rangeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rangeInputs: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'lightgray',
    width: 130,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  container: {
    padding: 20
  }
})