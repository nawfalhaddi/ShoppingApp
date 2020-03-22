import React from 'react';
import { View, Image, StyleSheet, Text, Button, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native'
import Colors from '../../constant/Colors';

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback
    }
    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
                <TouchableCmp onPress={props.onViewDetail} useForeground>
                    <View>

                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: props.item.imageUrl }} />
                        </View>

                        <View style={styles.details}>
                            <Text style={styles.title} >{props.item.title}</Text>
                            <Text style={styles.price} >${props.item.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.actions}>
                            <Button color={Colors.primary} title="View Details" onPress={props.onViewDetail} />
                            <Button color={Colors.primary} title="To Cart" onPress={props.onAddToCart} />
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    product: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        margin: 20,
        height: 300,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 3
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    details: {
        height: '15%',
        alignItems: 'center',
        padding: 10
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10
    }
});

export default ProductItem;