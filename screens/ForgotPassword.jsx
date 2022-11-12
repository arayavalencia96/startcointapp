import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import {
  SafeAreaView,
  TextInput,
  Text,
  TouchableHighlight,
  Alert,
} from "react-native";
import { styles } from "../styles/styles";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { recuperarPass } from "../validation/validationSchema";
const auth = getAuth();

const ForgotPassword = () => {
  const navigation = useNavigation();
  function handleReset(values) {
    sendPasswordResetEmail(auth, values.email)
      .then(() => Alert.alert(`Se envió correctamente a: ${values.email}`))
      .catch((err) => Alert.alert(`error, intentar más tarde.`));
  }

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={recuperarPass}
      onSubmit={(values) => handleReset(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
        isSubmitting,
      }) => (
        <SafeAreaView style={styles.container}>
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Ingresar email"
            placeholderTextColor={"white"}
            onChangeText={handleChange("email")}
            name="email"
            value={values.email}
            color="white"
          />
          <TouchableHighlight
            onPress={handleSubmit}
            style={[styles.button, styles.bg2daBotonera]}
          >
            {<Text style={[styles.buttonText]}>Recuperar Contraseña</Text>}
          </TouchableHighlight>
        </SafeAreaView>
      )}
    </Formik>
  );
};
export default ForgotPassword;
