import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, ScrollView, TextInput, } from 'react-native';
import Colors from '../../constant/Colors';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../../store/actions/products'


const EditProductScreen = props => {
    const productId = props.route.params?.productId;
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === productId));

    const { navigation } = props;

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const dispatch = useDispatch();

    const submitHandler = () => {
        if (editedProduct) {
            dispatch(productsActions.updateProduct(productId, title, description, imageUrl));
        } else {
            dispatch(productsActions.createProduct(title, description, imageUrl, +price));
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
                    onPressing={() => { submitHandler() }}
                />
            ),
        })
        return () => { }
    }, [navigation, dispatch, productId, title, description, imageUrl, price]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.fomrControl}>
                    <Text style={styles.label}>Title:</Text>
                    <TextInput style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View style={styles.fomrControl}>
                    <Text style={styles.label}>Image URL:</Text>
                    <TextInput style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)} />
                </View>

                {editedProduct ? null :
                    <View style={styles.fomrControl}>
                        <Text style={styles.label}>Price:</Text>
                        <TextInput style={styles.input}
                            value={price}
                            onChangeText={text => setPrice(text)} />
                    </View>}

                <View style={styles.fomrControl}>
                    <Text style={styles.label}>Description:</Text>
                    <TextInput style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)} />
                </View>
            </View>
        </ScrollView>
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
    }
})

export default EditProductScreen;