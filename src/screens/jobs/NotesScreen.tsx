import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import AddNoteCard from '../../components/notes/AddNoteCard';
import NoteItem from '../../components/notes/NoteItem';
import BackOnlineBanner from '../../components/BackOnlineBanner';

import { getLocalNotes, saveLocalNotes } from '../../storage/noteStorage';
import { syncNotesForJob } from '../../sync/noteSync';

const mergeNotes = (apiNotes: any[], localNotes: any[]) => {
    const map = new Map<string, any>();

    apiNotes.forEach(n =>
        map.set(n._id, { ...n, _syncStatus: 'synced' })
    );

    localNotes.forEach(n => {
        const key = n._id || n.clientNoteId;
        map.set(key, n);
    });

    return Array.from(map.values()).sort(
        (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
    );
};

export default function JobNotesTab({ job }: any) {
    const [notes, setNotes] = useState<any[]>([]);
    const [editingNote, setEditingNote] = useState<any>(null);

    const loadNotes = async () => {
        const local = await getLocalNotes(job._id);
        const api = job.notes || [];
        const merged = mergeNotes(api, local);
        setNotes(merged);
        await saveLocalNotes(job._id, merged);
    };

    useEffect(() => {
        loadNotes();

        const unsub = NetInfo.addEventListener(state => {
            if (state.isConnected) {
                syncNotesForJob(job._id).then(loadNotes);
            }
        });

        return unsub;
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <AddNoteCard
                jobId={job._id}
                editingNote={editingNote}
                onCancelEdit={() => setEditingNote(null)}
                onNoteAdded={loadNotes}
            />

            {notes.map(note => (
                <NoteItem
                    key={note._id || note.clientNoteId}
                    text={note.text}
                    time={note.createdAt}
                    onEdit={() => setEditingNote(note)}
                />
            ))}

            <BackOnlineBanner />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 32,
    },
});
