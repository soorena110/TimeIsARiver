import Dexie from 'dexie';

const DexieDB = new Dexie("syncing");

DexieDB.version(1)
    .stores({
        tasks_create: "name",
        tasks_update: "id",
        tasks_delete: "id",
        ticks_update: "taskId",
    });

export default DexieDB;
export const ticks_update = DexieDB.table('ticks_update');
export const tasks_create = DexieDB.table('tasks_create');
export const tasks_update = DexieDB.table('tasks_update');
export const tasks_delete = DexieDB.table('tasks_delete');