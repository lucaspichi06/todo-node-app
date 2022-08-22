const Task = require('./task')
require('colors')

class Tasks {
    get listArray() {
        const listArray = [];
        Object.keys(this._list).forEach(key => {
            listArray.push(this._list[key]);
        });
        return listArray;
    }

    constructor() {
        this._list = {};
    }

    loadFromArray(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task;
        })
    }

    insertTask(description = '') {
        const task = new Task(description);
        this._list[task.id] = task;
    }

    deleteTask(id) {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    listTasks() {
        console.log();
        this.listArray.forEach((task, i) => {
            console.log(`${((i+1) + '.').green} ${task.description} :: ${task.completedOn ? 'Completed'.green : 'Pending'.red}`);
        });
    }

    listByStatus( completed = true) {
        let count = 0;
        this.listArray.forEach((task) => {
            const status = task.completedOn ? true : false;

            if (status === completed) {
                count++;
                console.log(`${(count + '.').green} ${task.description} :: ${task.completedOn ? task.completedOn.green : 'Pending'.red}`);
            }
        });
    }

    toggleCompleted(ids = []) {
        ids.forEach(id => {
            const task = this._list[id];
            if (!task.completedOn) {
                task.completedOn = new Date().toISOString();
            }
        });

        this.listArray.forEach(task => {
            if (!ids.includes(task.id)) {
                this._list[task.id].completedOn = null;
            }
        });
    };
}

module.exports = Tasks;