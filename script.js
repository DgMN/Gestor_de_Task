import { addTask } from './components/addTask.js';
import { displayTasks } from './components/readTasks.js';

const btn = document.querySelector("[data-form-btn]");

//le agrego un evento(addEventListe)/cual evento(click)/ que pasa despues? funcion createTask 
btn.addEventListener("click", addTask);

displayTasks();





