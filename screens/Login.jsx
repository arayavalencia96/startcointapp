import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../styles/styles';
import { MaterialIcons, Feather } from '@expo/vector-icons';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  return (
    <View style={styles.container}>
      <View style={styles.inputWithIcon}>
        <TextInput style={styles.input}
          placeholder='poné email...'
          placeholderTextColor={'limegreen'}
          onChangeText={(email) => setEmail(curr => curr = email)}
          value={email}
          textAlignVertical='bottom'
        />
        <MaterialIcons name='alternate-email' size={24} />
      </View>
      <View style={styles.inputWithIcon}>

        <TextInput style={styles.input}
          placeholder='contraseña...'
          placeholderTextColor={'red'}
          onChangeText={(password) => setPassword(curr => curr = password)}
          value={password}
          textAlignVertical='bottom'
          secureTextEntry={isVisible}
        />
        <Pressable onPress={() => setIsVisible(!isVisible)}>
          <Feather name={isVisible ? "eye" : "eye-off"} size={24} />
        </Pressable>
      </View>


      <Text>email state: {email}</Text>
      <Text>email state: {password}</Text>

    </View>
  )
}

export default Login