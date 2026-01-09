import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import uuid from 'react-native-uuid';
import NetInfo from '@react-native-community/netinfo';

import AppText from '../AppText';
import Lucide from '../Lucide';
import { getLocalNotes, saveLocalNotes } from '../../storage/noteStorage';
import { createNoteApi, updateNoteApi } from '../../api/notes';

export default function AddNoteCard({
    jobId,
    onNoteAdded,
    editingNote,
    onCancelEdit,
}: any) {
    const [text, setText] = useState('');

    useEffect(() => {
        if (editingNote) setText(editingNote.text);
        else setText('');
    }, [editingNote]);

    const saveNote = async () => {
        if (!text.trim()) return;

        // ✏️ EDIT MODE
        if (editingNote) {
            const notes = await getLocalNotes(jobId);

            const updated = notes.map((n: any) =>
                n._id === editingNote._id ||
                    n.clientNoteId === editingNote.clientNoteId
                    ? { ...n, text, _syncStatus: 'pending' }
                    : n
            );

            await saveLocalNotes(jobId, updated);
            onNoteAdded();
            onCancelEdit();

            const net = await NetInfo.fetch();
            if (net.isConnected && editingNote._id) {
                try {
                    await updateNoteApi(jobId, editingNote._id, { text });
                } catch { }
            }
            return;
        }

        // ➕ ADD MODE
        const localNote = {
            _id: uuid.v4(),
            clientNoteId: uuid.v4(),
            jobId,
            text,
            createdAt: new Date().toISOString(),
            _syncStatus: 'pending',
        };

        const notes = await getLocalNotes(jobId);
        await saveLocalNotes(jobId, [localNote, ...notes]);

        setText('');
        onNoteAdded();

        const net = await NetInfo.fetch();
        if (net.isConnected) {
            try {
                await createNoteApi(jobId, {
                    clientNoteId: localNote.clientNoteId,
                    text: localNote.text,
                });
            } catch { }
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        placeholder="Write your note..."
                        placeholderTextColor="#9CA3AF"
                        multiline
                        style={styles.input}
                    />
                </View>

                <TouchableOpacity onPress={saveNote} activeOpacity={0.8}>
                    <LinearGradient
                        colors={['#3B82F6', '#2563EB']}
                        style={styles.button}
                    >
                        <View style={styles.buttonContent}>
                            <Lucide
                                icon={editingNote ? 'Save' : 'Plus'}
                                color="#FFF"
                                size={18}
                            />
                            <AppText style={styles.btnText}>
                                {editingNote ? 'Update Note' : 'Add Note'}
                            </AppText>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                {editingNote && (
                    <TouchableOpacity onPress={onCancelEdit} style={{ marginTop: 12 }}>
                        <AppText style={styles.cancelText}>Cancel Edit</AppText>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        marginBottom: 16,
        overflow: 'hidden',
    },
    content: {
        padding: 16,
    },
    inputWrapper: {
        backgroundColor: '#F1F5F9',
        borderRadius: 20,
        padding: 12,
        minHeight: 100,
        marginBottom: 16,
    },
    input: {
        fontSize: 16,
        textAlignVertical: 'top',
    },
    button: {
        borderRadius: 18,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
    },
    btnText: {
        color: '#FFF',
        fontSize: 16,
    },
    cancelText: {
        color: '#EF4444',
        textAlign: 'center',
        fontSize: 14,
    },
});
