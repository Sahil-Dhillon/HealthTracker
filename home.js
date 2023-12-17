
import Heart from 'react-native-vector-icons/FontAwesome5'
import Foot from 'react-native-vector-icons/MaterialCommunityIcons'
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import axios from 'axios'
import { RadioButton, TextInput } from 'react-native-paper';
const HomeScreen = ({navigation}) => {

  const [heartRate, setHeartRate] = useState(0);
  const [spo2, setSpo2] = useState(0);
  const [lfoot, setLfoot] = useState(0);
  const [rfoot, setRfoot] = useState(0);
  const [ecg, setEcg] = useState();
  const [gender, setGender] = useState(1);
  const [age, setAge] = useState("20");
  const [ip, setIp] = useState();
  const handleGenderChange = (value) => {
    setGender(value);
  };
  const handleAgeChange = (text) => {
    setAge(text);
  };
  // const input_data = [age,gender,spo2,heartRate,]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://try2-9e9cb.firebaseio.com/.json');
        const heartRateData = response.data.heartbeat;
        const ipaddr = response.data.ip;
        setIp(ipaddr)
        setHeartRate(heartRateData);
        // console.log(heartRateData);
        const spo2Data = response.data.spo2;
        setSpo2(spo2Data);
        // console.log(spo2Data);
        const lfootData = response.data.lfoot;
        setLfoot(lfootData);
        // console.log(lfootData);
        const rfootData = response.data.rfoot;
        setRfoot(rfootData);
        // console.log(rfootData);
        const ecgData = response.data.ecg;
        setEcg(ecgData);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    const intervalId = setInterval(fetchData, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  return (
    <View style={styles.container}>
        <Text style={styles.boxTextHead}>Health Tracker</Text>
      <View style={styles.gridContainer}>
        <View style={styles.box}>
          <RadioButton.Group onValueChange={handleGenderChange} value={gender}>
            <View style={styles.rowFlex}>
              <Text style={styles.boxText}>Male</Text>
              <RadioButton value={1} />
            </View>
            <View style={styles.rowFlex}>
              <Text style={styles.boxText}>Female</Text>
              <RadioButton value={0} />
            </View>
          </RadioButton.Group>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Age:</Text>
          <TextInput placeholder="Age" keyboardType="numeric" value={age} onChangeText={handleAgeChange} style={styles.inputBox}/>
        </View>
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.box}>
        <Heart name='heartbeat' size={50} color={'#fff'}/>
        <Text style={styles.boxText}>{heartRate}</Text>
        </View>
        <View style={styles.box}>
        <Text style={styles.boxText2}>SpO2</Text>
        <Text style={styles.boxText}>{spo2}</Text>
        </View>
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.box}>
        <Foot name='foot-print' size={50} color={'#fff'}/>
        <Text style={styles.boxText}>{lfoot}</Text>
        </View>
        <View style={styles.box}>
        <Foot name='foot-print' size={50} color={'#fff'}/>
        <Text style={styles.boxText}>{rfoot}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Result',{
        age:age,
        sex:gender,
        spo2:spo2,
        bps:heartRate,
        ecg:ecg,
        lfoot:lfoot,
        rfoot:rfoot,
        ip:ip
      })}}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#090e21',
    },
    gridContainer: {
      flexDirection: 'row',
      // marginBottom: 1,
    },
    rowFlex:{
      flexDirection:'row',
    },
    inputBox:{
      borderWidth: 2,
      borderColor: '#aaa',
      borderRadius: 4,
      margin: 8,
      fontSize:26,
      color:'#fff',
      textAlign:'center'
    },
    box: {
      flex: 1,
      aspectRatio: 1,
      borderWidth: 1,
      borderColor: '#aaa',
      borderRadius: 16,
      backgroundColor: '#1d1e33',
      margin: 8,
      shadowColor: '#1d1e31',
      shadowOffset: {
        width: -2,
        height: -2,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    boxText: {
      marginTop: 8,
      fontSize: 22,
      color: '#fff'
    },
    boxText2: {
      marginTop: 8,
      fontSize: 42,
      color: '#fff'
    },
    boxTextHead: {
      marginBottom: 30,
      fontSize: 42,
      color: '#fff'
    },
    button: {
      backgroundColor: '#3498db',
      padding: 16,
      borderRadius: 2,
      marginTop: 16,
      shadowColor: '#2c3e50',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 3,
      width:190
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
    },
  });

export default HomeScreen