import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function AddNoteInput({
    value,
    onChangeText,
}: any) {
    return (
        <LinearGradient
            colors={['#3B82F6', '#2563EB']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.gradient}
        >
            <View style={styles.inner}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder="Add a new note..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    style={styles.input}
                />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        borderRadius: 24,
        padding: 2,
        marginBottom: 16,
    },
    inner: {
        backgroundColor: '#F8FAFC',
        borderRadius: 22,
        padding: 18,
        minHeight: 120,
    },
    input: {
        fontSize: 16,
        color: '#0F172A',
        textAlignVertical: 'top',
    },
});
