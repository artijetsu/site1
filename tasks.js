// переменные
// находим все нужные элементы на странице и сохраняем в переменные

const buttonTheme = document.getElementById('themeToggle');
const tasksInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');

// массив для хранения данных

let tasks = [];

function ToggleTheme(){
    document.body.classList.toggle('dark-theme');
    if(document.body.classList.contains('dark-theme')){
        buttonTheme.textContent = 'слава жаве';
        localStorage.setItem('darkTheme', 'enabled');
        //локальное хранене состояния темы
    }else{
        buttonTheme.textContent = 'На темную сторону интернета';
        localStorage.setItem('darkTheme', 'disabled')
    }
}

buttonTheme.addEventListener('click', ToggleTheme);

// функции для работы с задачами

// функция добавления новой задачи 

function addTask(){
    //trim убирает лишние пробелы
    const taskText = tasksInput.value.trim();      

    //проверка на пустое поле ввода

    if (taskText == '') {
        alert('Пожалуйста введите задачу');
        return
    }

    //создание объекта задачи
    //объект - структура, хранящая данные в виде пар-ключ значение

    const newTask = {
        id: Date.now(), 
        text: taskText,
        completed: false
    }

    //добавление задачи в список
    // push() - добавление в конец списка
    tasks.push(newTask);

    //очищаем поля ввода после внесения данных
    tasksInput.value = '';

    saveTasks();

    //обновляем список задач
    renderTasks();

    //update counter
    updateCounters();


}

function toggleTaskComplete(taskid){
    //find 
    const task = tasks.find(task => task.id === taskid);

    //if task finded

    if(task){
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateCounters();

    }

}

//update counter tasks 

function updateCounters(){
    //langth - св-во возвращает число эл-ов в массиве
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    totalTasksSpan.textContent = totalTasks;
    completedTasksSpan.textContent = completedTasks;


}


function renderTasks(){
    //clear list
    taskList.innerHTML = '';

    //perebor element in massive
    // forEach() - metod perebota every el-nt in massive
    tasks.forEach(task => {
        //create el-nt list'a
        //CreateElement - metod cteate new html el-nt
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        // add class if task compl
        if(task.completed){
            taskItem.classList.add('completed'); 
        }

        taskItem.innerHTML = `
            <input type='checkbox' class='task-checkbox' ${task.completed ? 'checked' : ''}>
            <span class='task-text'>${task.text}</span>
            <button class='del-btn'>❌</button>
        `;

        const checkbox = taskItem.querySelector('.task-checkbox')
        const deleteBtn = taskItem.querySelector('.del-btn')


        //check click checkbox
        checkbox.addEventListener('click', () => {
            toggleTaskComplete(task.id);

        });

        deleteBtn.addEventListener('click', () => {
            deleteTask(task.id);

        });




        //add task in list
        //appendChild() - metod add el-nt in end other el-nt
        taskList.appendChild(taskItem);
    });
}


function updateCounters(){
    totalTasksSpan.textContent = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    completedTasksSpan.textContent = completedTasks;
}

// obrabotchiki events

buttonTheme.addEventListener('click', ToggleTheme);

addTaskBtn.addEventListener('click', addTask);

//initialization
//check save theme

if(localStorage.getItem('darkTheme') === 'enabled'){
    document.body.classList.add('dark-theme');
    buttonTheme.textContent = 'слава жава пипту'; 
}

// add tasks iz localstorage pri loading page

function loadTasks(){
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks){
        tasks = JSON.parse(savedTasks); //преобраз строк обратво в массив
        renderTasks();
        updateCounters(); 
    }
}

function deleteTask(taskid){
    //filter() - создание нового массива с элементами которые прошли фильтрацию
    // оставляем только заадчи которые прошли проверку, их ид != удаляем.
    tasks = tasks.filter(task => task.id !== taskid);
    saveTasks();
    renderTasks();
    updateCounters();
}

//save tasks in localrange
function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

//update function add task for save task in local+

// const originalAddTasks = addTask;
// addTask = function(){
//     originalAddTasks();
//     saveTasks();
// };

loadTasks();































