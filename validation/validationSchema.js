import * as yup from 'yup';
export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email Invalido")
    .required("Campo obligatorio"),
  password: yup
    .string()
    .trim("No debe comenzar ni terminar con espacios en blanco")
    .min(6, ({ min }) => `Debe tener un mínimo de ${min} caracteres`)
    .required("Campo obligatorio")
})

export const recuperarPass = yup.object().shape({
  email: yup
  .string()
  .email('Email Invalido')
  .required("Campo obligatorio")
})

