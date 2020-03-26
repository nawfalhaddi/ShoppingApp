import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Text, Platform, ScrollView, TextInput, KeyboardAvoidingView, } from 'react-native';
import Colors from '../../constant/Colors';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../../store/actions/products'
import { Formik } from 'formik';
import * as yup from 'yup';


const EditProductScreen = props => {
    const productId = props.route.params?.productId;
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === productId));
    const { navigation } = props;
    let formikSubmitHandler = null;
    const title = editedProduct ? editedProduct.title : '';
    const imageUrl = editedProduct ? editedProduct.imageUrl : '';
    const price = '';
    const description = editedProduct ? editedProduct.description : '';

    const validationSchema = yup.object().shape({
        title: yup.string().required('Ce champ est obligatoire').min(4, 'interdit moins 4 lettres'),
        price: editedProduct ? '' : yup.number().label('price').required(),
        description: yup.string().required(),
        imageUrl: yup.string().url().label('Image'),
    });


    const dispatch = useDispatch();

    const submitHandler = (values) => {
        if (editedProduct) {
            dispatch(productsActions.updateProduct(productId, values.title, values.description, values.imageUrl));
        } else {
            dispatch(productsActions.createProduct(values.title, values.description, values.imageUrl, +values.price));
        }
        navigation.pop(1);
    }


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: props.route.params?.productId ? 'Edit Product' : 'Add Product',
            headerRight: () => (
                <CustomHeaderButton iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    size={35}
                    color={Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPressing={() => {
                        formikSubmitHandler();
                    }}
                />
            ),
        })
        return () => { }
    }, [navigation, dispatch, productId, title, description, imageUrl, price]);


    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}>
            <ScrollView>

                <View style={styles.form}>
                    <Formik
                        initialValues={{
                            title: title,
                            price: price,
                            description: description,
                            imageUrl: imageUrl
                        }}
                        onSubmit={(values) => {
                            submitHandler(values);
                        }}
                        validationSchema={validationSchema}
                    >
                        {formikProps => {
                            formikSubmitHandler = formikProps.submitForm;
                            return (
                                <View>

                                    <View style={styles.fomrControl}>
                                        <Text style={styles.label}>Title:</Text>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={formikProps.handleChange('title')}
                                            onBlur={formikProps.handleBlur('title')}
                                            value={formikProps.values.title}

                                        />
                                        {formikProps.touched.title && formikProps.errors.title ?
                                            <Text style={styles.errorMessage}
                                            >{formikProps.errors.title}</Text> : null}
                                    </View>

                                    <View style={styles.fomrControl}>
                                        <Text style={styles.label}>Image URL:</Text>
                                        <TextInput style={styles.input}
                                            value={formikProps.values.imageUrl}
                                            onChangeText={formikProps.handleChange('imageUrl')}
                                            onBlur={formikProps.handleBlur('imageUrl')} />
                                        {formikProps.touched.imageUrl && formikProps.errors.imageUrl ? <Text style={styles.errorMessage}>{formikProps.errors.imageUrl}</Text> : null}
                                    </View>

                                    {editedProduct ? null :
                                        <View style={styles.fomrControl}>
                                            <Text style={styles.label}>Price:</Text>
                                            <TextInput style={styles.input}
                                                keyboardType='decimal-pad'
                                                value={formikProps.values.price}
                                                onChangeText={formikProps.handleChange('price')}
                                                onBlur={formikProps.handleBlur('price')} />
                                            {formikProps.touched.price && formikProps.errors.price ? <Text style={styles.errorMessage}>
                                                {formikProps.errors.price}</Text> : null}
                                        </View>}

                                    <View style={styles.fomrControl}>
                                        <Text style={styles.label}>Description:</Text>
                                        <TextInput style={styles.input}
                                            multiline
                                            value={formikProps.values.description}
                                            onChangeText={formikProps.handleChange('description')}
                                            onBlur={formikProps.handleBlur('description')} />
                                        {formikProps.touched.description && formikProps.errors.description ? <Text style={styles.errorMessage}
                                        >{formikProps.errors.description}</Text> : null}
                                    </View>
                                </View>
                            )
                        }
                        }
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    fomrControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    errorMessage: {
        color: 'red',
        fontFamily: 'open-sans',
        fontSize: 10
    }
})

export default EditProductScreen;