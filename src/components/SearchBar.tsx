import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Lucide from './Lucide';

export default function SearchBar() {
    return (
        <View style={styles.container}>
            <Lucide icon="Search" color="#0F172A80" size={20} />

            <TextInput
                placeholder="Search jobs..."
                placeholderTextColor="#0F172A80"
                style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 20,
        paddingHorizontal: 16,
        height: 44,
        marginTop: 12,
    },
    input: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
        color: '#0F172A80',
    },
});
