import { state } from "./state.js";

const todoListElem = document.querySelector('.todo__list');

const li = document.createElement('li');
li.classList.add('todo__item');

const todoAddBtn = document.createElement('button');
todoAddBtn.classList.add('todo__add');
todoAddBtn.textContent = 'Добавить покупку';
li.append(todoAddBtn);

const getTodo = () => {
    const todoList = JSON.parse(localStorage.getItem('pomodoro') || '[]');

    return todoList;
}

// добавление объекта в список
const addTodo = (title) => {
    const todo = {
        title,
        pomodoro: 0,
        id: Math.random().toString(16).substring(2,8),
    };

    const todoList = getTodo();
    todoList.push(todo);

    localStorage.setItem('pomodoro', JSON.stringify(todoList));
    return todo;
};

// изменение объекта в списке
export const updateTodo = (todo) => {
    const todoList = getTodo();
    if (!todoList.length) {
        return;
    }

    const todoItem = todoList.find((item) => item.id === todo.id);
    todoItem.title = todo.title;
    todoItem.pomodoto = todo.pomodoro;

    localStorage.setItem('pomodoro', JSON.stringify(todoList));
};

// удаление объекта в списке
const deleteTodo = (todo) => {
    const todoList = getTodo();

    const newTodoList = todoList.filter((item) => item.id !== todo.id);

    if(todo.id === state.activeTodo.id) {
        state.activeTodo = newTodoList[newTodoList.length - 1]; 
    }

    localStorage.setItem('pomodoro', JSON.stringify(newTodoList));
}

// стилизация объекта в списке и создание его скелета
const createTodoListItem = (todo) => {
        if(todo.id !== 'default') {
            const todoItem = document.createElement('li');
            todoItem.classList.add('todo__item');

            const todoItemWrapper = document.createElement('div');
            todoItemWrapper.classList.add('todo__item-wrapper'),
            todoItem.append(todoItemWrapper);

             const todoBtn = document.createElement('button');
             todoBtn.classList.add('todo__btn');
             todoBtn.textContent = todo.title;

             const editBtn = document.createElement('button');
             editBtn.classList.add('todo__edit');
             editBtn.ariaLabel = 'Редактировать';

             const delBtn = document.createElement('button');
             delBtn.classList.add('todo__del');
             delBtn.ariaLabel = 'Удалить';

             todoItemWrapper.append(todoBtn, editBtn, delBtn);

             todoListElem.prepend(todoItem);

             todoBtn.addEventListener('click', () => {
                state.activeTodo = todo;
                changeActiveBtn('work');
                stop();
             });

             editBtn.addEventListener('click', () => {
                todo.title = prompt('Название покупки', todo.title);
                todoBtn.textContent = todo.title;
                if(todo.id === state.activeTodo.id) {
                    state.activeTodo.title = todo.title
                }
                updateTodo(todo);
             });

             delBtn.addEventListener('click', () => {
                deleteTodo(todo);

                todoItem.remove();
             });
        };
    };

const renderTodoList = (list) => {
    todoListElem.textContent = '';
    list.forEach(createTodoListItem);
    todoListElem.append(li);
}

export const initTodo = () => {
    const todoList = getTodo();

    if (!todoList.length) {
        state.activeTodo = {
            id: 'default',
            pomodoro: 0,
            title: 'Помодоро',
        };
    } else {
        state.activeTodo = todoList[todoList.length - 1];  
    };

    renderTodoList(todoList);

    todoAddBtn.addEventListener('click', () => {
        const title = prompt('Введите наименование покупки');
        const todo = addTodo(title);
        createTodoListItem(todo);
    });
}