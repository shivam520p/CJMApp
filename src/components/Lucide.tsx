import React from 'react';
import * as Icons from 'lucide-react-native';

type LucideProps = {
    icon: keyof typeof Icons;
    size?: number;
    color?: string;
};

export default function Lucide({
    icon,
    size = 20,
    color = '#111827',
}: LucideProps) {
    const Icon = Icons[icon] as React.ComponentType<any>;
    if (!Icon) return null;
    return <Icon size={size} color={color} />;
}
