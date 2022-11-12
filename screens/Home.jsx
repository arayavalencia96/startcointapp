import { View, Text, Pressable } from 'react-native';
import { styles } from '../styles/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import Form from './Form';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Form/>
    </View>
  )
}

{/* <Text>Home</Text>
      <Pressable onPress={() => navigation.navigate("Login")}>
        <MaterialCommunityIcons name='login-variant' size={48} color='tomato' />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Form")}>
        <MaterialCommunityIcons name='login' size={48} color='rebeccapurple' />
      </Pressable> */}

export default Home