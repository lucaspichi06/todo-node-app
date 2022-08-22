const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: 'What would you like to do?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Create task`
            },
            {
                value: '2',
                name: `${'2.'.green} List tasks`
            },
            {
                value: '3',
                name: `${'3.'.green} List completed tasks`
            },
            {
                value: '4',
                name: `${'4.'.green} List pending tasks`
            },
            {
                value: '5',
                name: `${'5.'.green} Complete task(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Delete task`
            },
            {
                value: '0',
                name: `${'0.'.green} Exit`
            }
        ]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log('==================================='.green.bold);
    console.log('         Select an option          '.white.bold);
    console.log('===================================\n'.green.bold);

    const {opcion} = await inquirer.prompt(questions);
    return opcion;
}

const pause = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'enter'.green} to continue`
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
}

const readInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please insert a value';
                }
                return true;
            }
        }
    ];

    const {description} = await inquirer.prompt(question);
    return description;
}

const deleteMenu = async(tasks = []) => {
    const choices = tasks.map((task, i) => {
        return {
            value: task.id,
            name: `${((i + 1) + '.').green } ${task.description}`
        }
    });

    choices.unshift({
        value: '0',
        name: `${`0.`.green} Cancel`
    })

    const deleteQuestions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ]
    const {id} = await inquirer.prompt(deleteQuestions);
    return id;
}


const completeMenu = async(tasks = []) => {
    const choices = tasks.map((task, i) => {
        return {
            value: task.id,
            name: `${task.description}`,
            checked: task.completedOn ? true : false
        }
    });

    const completeQuestions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selections',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(completeQuestions);
    return ids;
}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const {ok} = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    deleteMenu,
    completeMenu,
    confirm
}