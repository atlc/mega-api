import { Query } from "..";
import { BaseItem, Item } from "../../types/models/todo";

const all = (userid: string) => Query<Item[]>("SELECT * FROM Items WHERE userid=?", "todo", [userid]);
const one = (userid: string, item_id: string) => Query<Item[]>("SELECT * FROM Items WHERE id=? AND userid=?", "todo", [item_id, userid]);
const create = (newItem: BaseItem) => Query("INSERT INTO Items SET ?", "todo", [newItem]);
const toggle_completion = (current_status: boolean, item_id: string, userid: string) => Query("UPDATE Items SET completed=? WHERE id=? AND userid=?", "todo", [!current_status, item_id, userid]);
const update_content = (content: string, userid: string, id: string) => Query("UPDATE Items SET content=? WHERE id=? AND userid=?", "todo", [content, id, userid]);
const remove = (userid: string, item_id: string) => Query("DELETE FROM Items WHERE id=? AND userid=?", "todo", [item_id, userid]);

export default {
    all,
    one,
    create,
    toggle_completion,
    update_content,
    remove
};
