import uuid from 'react-native-uuid';
import NetInfo from '@react-native-community/netinfo';
import { createNoteApi } from '../api/notes';
import { getLocalNotes, saveLocalNotes } from '../storage/noteStorage';

const normalizeApiNote = (res: any) => {
    if (res?.data && res?.success) return res.data;
    return res;
};

export const syncNotesForJob = async (jobId: string) => {
    const net = await NetInfo.fetch();
    if (!net.isConnected) return;

    const notes = await getLocalNotes(jobId);
    let changed = false;

    for (let note of notes) {
        if (note._syncStatus === 'pending') {
            try {
                const payload = {
                    clientNoteId: note.clientNoteId,
                    text: note.text,
                };

                const res = await createNoteApi(jobId, payload);
                const apiNote = normalizeApiNote(res.data);

                Object.assign(note, {
                    ...apiNote,
                    _syncStatus: 'synced',
                });

                changed = true;
            } catch { }
        }
    }

    if (changed) {
        await saveLocalNotes(jobId, [...notes]);
    }
};
