import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native';
import axios from 'axios'
const ResultScreen = ({route}) => {
  const input_data = {
    age:route.params.age,
    gender:route.params.sex,
    spo2:route.params.spo2,
    bps:route.params.bps,
    ecg:route.params.ecg,
    lfoot:route.params.lfoot,
    rfoot:route.params.rfoot
  }
  const [loading, setLoading] = useState(true);
  const [responseText, setResponseText] = useState('');
  // console.log(route.params.ip)
  useEffect(()=>{
    axios.post(`http://${route.params.ip}:5000/predict`,input_data).then((res)=>{setResponseText(JSON.stringify(res.data))}).catch((e)=>{
      console.error('Error making POST request:', e.message);
      setResponseText('Error making POST request');
      alert(e.message);
    }).finally(()=>{
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    })
  },[])
  
  return (
    <View style={styles.container}>
      {

        loading ? 
        <>
        <Text style={styles.heading}>Predicting Results...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
        </>:
      <View>
        <Text style={styles.heading}>You are at a </Text>
        <Text style={styles.resultNumber}>{responseText.toString()}%</Text>
        {/* <Text style={styles.heading}>You are at a </Text> */}
        <Text style={styles.heading2}>Risk of Heart Attack</Text>
      </View>
      
      }
      
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
  heading: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 22,
    color: '#415b76',
  },
  heading2: {
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 22,
    color: '#415b76',
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3498db',
  },
});

export default ResultScreen;
