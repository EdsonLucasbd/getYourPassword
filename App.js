import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard';

let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@$#-*0123456789';

const App = () => {
  const [password, setPassword] = useState('');
  const [size, setSize] = useState(5);

  function generatePass() {
    let pass = '';
    for (let i = 0, leng = charset.length; i < size; i++){
      pass += charset.charAt(Math.floor(Math.random() * leng))
    }

    setPassword(pass);

  }

  function copyPass(){
    Clipboard.setString(password);
    Alert.alert('✓','Senha copiada 😁')
  }

  return (
    <View style={styles.container}>
      <Image 
      source={require('./src/assets/password.png')}
      style={styles.logo}
      />

      <Text style={styles.title}>{size} Caracteres</Text>
      
      <View style={styles.area}>
      <Slider 
        style={{ height: 50 }}
        minimumValue={5}
        maximumValue={15}
        minimumTrackTintColor="#ff0000"
        maximumTrackTintColor="#000"
        value={size}
        onValueChange={ (atualValue) => setSize(atualValue.toFixed(0)) }
      />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>

      { password != '' && (
        <View style={styles.area}>
        <Text style={styles.password} onLongPress={copyPass}>{password}</Text>
        </View>
      )}
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3ff'
  },
  logo: {
    marginBottom: 60
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  area: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 7,
  },
  button: {
    backgroundColor: '#ffa200',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 25
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  password: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20
  }
});

export default App;