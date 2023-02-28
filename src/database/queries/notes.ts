import { Query } from "..";
import { BaseNote, Note } from "../../types/models/notes";

const all = (userid: string) => Query<Note[]>("SELECT * FROM Notes WHERE userid=?", "notes", [userid]);
const one = (userid: string, note_id: string) => Query<Note[]>("SELECT * FROM Notes WHERE id=? AND userid=?", "notes", [note_id, userid]);
const create = (newNote: BaseNote) => Query("INSERT INTO Notes SET ?", "notes", [newNote]);
const update = (content: string, note_id: string, userid: string) => Query("UPDATE Notes SET content=? WHERE id=? AND userid=?", "notes", [content, note_id, userid]);
const remove = (userid: string, note_id: string) => Query("DELETE FROM Notes WHERE id=? AND userid=?", "notes", [note_id, userid]);

export default {
    all,
    one,
    create,
    update,
    remove
};
