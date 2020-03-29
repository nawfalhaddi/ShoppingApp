import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Button, View, Text, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'
import { TextInput } from 'react-native-gesture-handler';
import Card from '../../components/UI/Card';
import Colors from '../../constant/Colors';
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'
import * as authActions from '../../store/actions/auth';

const AuthenticateScreen = props => {
    const dispatch = useDispatch();
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (error) {
            Alert.alert('Error', error, [{ text: 'okay' }]);
        }
        return () => { setError(null) }
    }, [error])


    const validationSchema = yup.object().shape({
        email: yup.string().email('Please Enter a valid email').required('Email is required'),
        password: yup.string().required('No password provided.').min(5, 'Password is too short - should be 5 chars minimum.')
    });

    const authHandler = async (values) => {
        let action;
        if (isSignUp) {
            action = authActions.signup(values.email, values.password);
        } else {
            action = authActions.login(values.email, values.password);
        }
        setIsLoading(true);
        try {
            await dispatch(action);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }



    }

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={styles.screen}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values) => {
                        authHandler(values);
                    }}
                    validationSchema={validationSchema}
                >
                    {formikProps => (

                        <Card style={styles.card}>
                            <ScrollView >
                                <Text style={styles.label}>E-mail:</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={formikProps.handleChange('email')}
                                    onBlur={formikProps.handleBlur('email')}
                                    value={formikProps.values.email}
                                    placeholder='example@example.xx'
                                    autoCapitalize='none'
                                    keyboardType='email-address'
                                />
                                {formikProps.touched.email && formikProps.errors.email ? <Text style={styles.errorMessage}>{formikProps.errors.email}</Text> : null}


                                <Text style={styles.label}>Password:</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType='default'
                                    secureTextEntry
                                    onChangeText={formikProps.handleChange('password')}
                                    onBlur={formikProps.handleBlur('password')}
                                    value={formikProps.values.password}
                                    placeholder='Password'
                                />
                                {formikProps.touched.password && formikProps.errors.password ? <Text style={styles.errorMessage}>{formikProps.errors.password}</Text> : null}

                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={styles.buttonContainer}>
                                        {isLoading ? <ActivityIndicator size='small' color={Colors.primary} /> : <Button onPress={() => { formikProps.handleSubmit() }} title={isSignUp ? 'Sign Up' : "Login"} color={Colors.primary} />}
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <Button onPress={() => {
                                            formikProps.resetForm();
                                            setIsSignUp(prevState => !prevState)
                                        }} title={`Switch to ${isSignUp ? "Login" : "Sign Up"}`} color={Colors.accent} />
                                    </View>


                                </View>


                            </ScrollView>

                        </Card>

                    )}

                </Formik>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,

    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        padding: 2,
        borderRadius: 10,
        borderColor: "#ccc",
        height: 40,
        backgroundColor: 'white'
    },
    card: {
        height: 300,
        width: '80%',
        padding: 10
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
        color: Colors.primary,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 15,
    },
    errorMessage: {
        color: 'red',
        fontFamily: 'open-sans',
        fontSize: 10
    }


})

export default AuthenticateScreen;