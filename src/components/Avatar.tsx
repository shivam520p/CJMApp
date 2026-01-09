import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function Avatar({ letter }: { letter: string }) {
    return (
        <LinearGradient
            colors={['#3B82F6', '#2563EB']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.container}
        >
            <View style={styles.innerBg}>

            <Text style={styles.text}>{letter}</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerBg: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#FFFFFF33"
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Inter-Bold',
    },
});
