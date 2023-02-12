import { state } from './state.js';
import { initTodo } from './todo.js';

const initPomodoro = () => {

    initTodo();

    state.activeTodo = {
        id: 'default',
        pomodoro: 0,
        title: 'Помодоро',
    }
};

initPomodoro();