import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    TextInputProps,
} from 'react-native';
import Lucide from './Lucide';

type Props = TextInputProps & {
    leftIcon?: string;
    rightIcon?: string;
    secureTextEntry?: boolean;
    onRightIconPress?: () => void;
    bgColor?: string;
};

export default function Input({
    leftIcon,
    rightIcon,
    secureTextEntry = false,
    onRightIconPress,
    bgColor = '#F1F5F9',
    style,
    ...props
}: Props) {
    const [hidden, setHidden] = useState(secureTextEntry);
    const showPasswordToggle = secureTextEntry && !rightIcon;

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            {leftIcon && (
                <View style={styles.iconLeft}>
                    <Lucide icon={leftIcon as any} color="#64748B" size={20} />
                </View>
            )}

            <TextInput
                {...props}
                secureTextEntry={hidden}
                placeholderTextColor="#9CA3AF"
                style={[styles.input, style]}
            />

            {showPasswordToggle && (
                <TouchableOpacity
                    style={styles.iconRight}
                    onPress={() => setHidden(!hidden)}
                >
                    <Lucide
                        icon={hidden ? 'Eye' : 'EyeOff'}
                        color="#64748B"
                        size={20}
                    />
                </TouchableOpacity>
            )}

            {!showPasswordToggle && rightIcon && (
                <TouchableOpacity
                    style={styles.iconRight}
                    onPress={onRightIconPress}
                    disabled={!onRightIconPress}
                >
                    <Lucide icon={rightIcon as any} color="#64748B" size={20} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        paddingHorizontal: 16,
        minHeight: 56,
        marginBottom: 16, 

        borderTopWidth: 2,
        borderTopColor: 'rgba(0, 0, 0, 0)',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
    },
    iconLeft: {
        marginRight: 12,
    },
    iconRight: {
        marginLeft: 12,
    },
});
