//Firebase imports
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const app = initializeApp(firebaseConfig);
const auth = getAuth();
//
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { loginValidationSchema } from "../validation/validationSchema";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { styles } from "../styles/styles";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import UserCtx from "../userCtx";

const Form = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserCtx);
  const [isVisible, setIsVisible] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const stateChange = (user) => {
    setUser((prev) => (prev = user));
    if (initializing) setInitializing((prev) => (prev = false));
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(stateChange);
    return subscriber;
  }, []);

  const handleRegister = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredentials) => {
        setUser((prev) => ({ ...prev, email: '' }));
        storeUser('');
      })
      .catch((err) => Alert.alert(`Email repetido`));
  };

  const handleLogin = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredentials) => {
        setUser((prev) => ({ ...prev, email: values.email }));
        storeUser(values.email);
      })
      .catch((err) => Alert.alert(`email o contraseña incorrecta`));
  };

  const storeUser = async (user) => {
    try {
      const userEmail = JSON.stringify(user);
      AsyncStorage.setItem("Email", userEmail);
    } catch (err) {
      console.log(err);
    }
  };

  if (initializing) return <ActivityIndicator />;

  return (
    <View>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => {
          isNewUser ? handleRegister(values) : handleLogin(values);
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={styles.container}>
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={"white"}
                color={"white"}
                onChangeText={handleChange("email")}
                name="email"
                value={values.email}
                textAlignVertical="bottom"
              />
              <MaterialIcons name="alternate-email" color="white" size={24} />
            </View>

            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor={"white"}
                color={"white"}
                onChangeText={handleChange("password")}
                name="password"
                value={values.password}
                textAlignVertical="bottom"
                secureTextEntry={isVisible}
              />
              <Pressable onPress={() => setIsVisible(!isVisible)}>
                <Feather
                  color="white"
                  name={isVisible ? "eye" : "eye-off"}
                  size={24}
                />
              </Pressable>
            </View>

            <View></View>
            <TouchableHighlight
              onPress={() => navigation.navigate("ForgotPassword")}
              style={[styles.colorBtn]}
            >
              <Text style={[styles.buttonText, styles.textLight]}>
                Recuperar cuenta
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={
                isNewUser
                  ? [styles.button, styles.bgClaro]
                  : [styles.button, styles.bgClaro]
              }
              onPress={handleSubmit}
            >
              {isNewUser ? (
                <Text style={[styles.buttonText]}>Crear cuenta</Text>
              ) : (
                <Text style={[styles.buttonText]}>Login</Text>
              )}
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.button, styles.bg2daBotonera]}
              onPress={() => setIsNewUser((prev) => !prev)}
            >
              {isNewUser ? (
                <Text style={styles.buttonText}>Ya tengo una cuenta</Text>
              ) : (
                <Text style={styles.buttonText}>Sing Up</Text>
              )}
            </TouchableHighlight>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Form;
