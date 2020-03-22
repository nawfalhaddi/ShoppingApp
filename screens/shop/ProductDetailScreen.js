import React, { useLayoutEffect } from 'react';
import { View, Text, ScrollView, StyleSheet,Image,Button } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constant/Colors'

const ProductDetailScreen = props => {

    const productId = props.route.params.productId;
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));

    const { navigation } = props;
    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: selectedProduct.title })
        return () => { }
    }, [navigation])



    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.actions}>
                <Button color={Colors.primary} title="Add to Cart" onPress={() => { }} />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
      },
      actions: {
        marginVertical: 10,
        alignItems: 'center'
      },
      price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
      },
      description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
      }
});

export default ProductDetailScreen;