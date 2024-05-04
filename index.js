#! usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//Initializa ToDo-List Array and Condition variable
let todoList = [];
let conditions = true;
// Print welcome message
console.log(chalk.bold.italic.magentaBright.underline("\n \t Welcome to the Todo_List App\n"));
// Main function todo list operations
let main = async () => {
    while (conditions) {
        let operation = await inquirer.prompt([
            {
                name: "operator",
                type: "list",
                message: "What you want to do :",
                choices: [chalk.blueBright("Add Task"), chalk.redBright("Delete Task"), chalk.yellow("Update Task"), chalk.cyan("View todo-list"), chalk.redBright("Exit")], // new feature add
            }
        ]);
        //Conditional statement
        if (operation.operator === chalk.blueBright("Add Task")) {
            await addtask();
        }
        else if (operation.operator === chalk.redBright("Delete Task")) {
            await deleteTask();
        }
        else if (operation.operator === chalk.yellow("Update Task")) {
            await updateTask();
        }
        else if (operation.operator === chalk.cyan("View todo-list")) {
            await viewTask();
        }
        else if (operation.operator === chalk.redBright("Exit")) {
            conditions = false;
        }
        else {
            console.log("Invalid option");
        }
    }
};
// Function to add new task to the list
let addtask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your new task :",
        }
    ]);
    todoList.push(newTask.task);
    console.log(`\n "${chalk.cyan(newTask.task)}" Task added successfully in Todo-List\n`);
};
// Function to delete a task from the list
let deleteTask = async () => {
    await viewTask();
    let delete_task_num = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index number' of the task you want to delete :",
        }
    ]);
    let deletedTask = todoList.splice(delete_task_num.index - 1, 1);
    console.log('\n "${chalk.redBright(deletedTask)}" Task has been deleted successfully from your Todo-List\n');
};
// Function to update a task in list
let updateTask = async () => {
    await viewTask();
    let update_task_num = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index number' of the task you want to update :"
        },
        {
            name: "newtask",
            type: "input",
            message: "Enter the new update task name :"
        }
    ]);
    todoList[update_task_num.index - 1] = update_task_num.newtask;
    console.log(`\n "Task at index number ${update_task_num.index}" updated to "${chalk.yellow(update_task_num.newtask)}" successfully [Check "View todo-list" for updated list]\n`);
};
// Function to view all Todo List tasks
let viewTask = async () => {
    console.log(chalk.bold.magentaBright.italic.underline("\n \tyour Todo-List: \n"));
    todoList.forEach((task, index) => {
        console.log(`${index}, ${chalk.bold.blue(task)}`);
    });
    console.log("\n");
};
//Run the main function
main();
