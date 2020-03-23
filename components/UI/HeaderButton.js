import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
const CustomHeaderButton = props => {

    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <View style={styles.buttonContainer}>
            <TouchableCmp style={styles.customHeaderButton} onPress={props.onPressing} useForeground>
                <Ionicons name={props.iconName} size={props.size} color={props.color} />
            </TouchableCmp>
        </View>
    )
}

const styles = StyleSheet.create({
    customHeaderButton: {
        alignItems: "center",
        justifyContent: 'center',
        marginHorizontal: 10
    },
    buttonContainer:{
        borderRadius:20,
        overflow:'hidden',
        padding:1
    }
});

export default CustomHeaderButton;