require('colors');
const { inquirerMenu,
    pause,
    readInput,
    deleteMenu, 
    completeMenu,
    confirm
} = require('./helpers/inquirer');
const { save, read } = require('./helpers/db');
const Tasks = require('./models/tasks');

console.clear();

const main = async() => {
    let opt = '';
    const tasks = new Tasks();
    const db = read();
    if (db) {
        // load from DB
        tasks.loadFromArray(db);
    }

    do {
        // shows the menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // create task
                const description = await readInput('Task description: ');
                tasks.insertTask(description);
                save(tasks.listArray);
                break;
            case '2':
                // list task
                tasks.listTasks();
                break;
            case '3':
                // list completed tasks
                tasks.listByStatus(true);
                break;
            case '4':
                // list pending tasks
                tasks.listByStatus(false);
                break;
            case '5':
                // complete pending tasks
                const ids = await completeMenu(tasks.listArray);
                tasks.toggleCompleted(ids);
                save(tasks.listArray);
                break;
            case '6':
                // delete task
                const id = await deleteMenu(tasks.listArray);
                if (id !== '0') {
                    const ok = await confirm('Do you want to delete the selected task?');
                    if (ok) {
                        tasks.deleteTask(id);
                        console.log('The task has been deleted');
                        save(tasks.listArray);
                    }
                }
                break;
        }

        if (opt !== '0') await pause();
    } while (opt !== '0');
}

main();