import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import styles from '../style/JourneyStyle'; 

const Journey = () => {
  const data = [10, 15, 7, 12, 9, 14, 11];

  const holidays = [
    { id: 1, name: 'dfgsdgfsd', date: '01.01.2024' },
    { id: 2, name: 'vtbtrs', date: '15.03.2024' },
    { id: 3, name: 'mljijier', date: '08.03.2024' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Schedule</Text>
        <LineChart
          style={{ height: 200 }}
          data={data}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={{ top: 20, bottom: 20 }}
        />
      </View>
      <View style={styles.holidayContainer}>
        <Text style={styles.holidayTitle}>fsgdfgsd</Text>
        <FlatList
          data={holidays}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.holidayItem}>
              <Text>{item.name}</Text>
              <Text>{item.date}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Journey;
