import { createTask } from "./addTask.js";
import  { uniqueDates, orderDates } from "../Service/date.js";
import  dateElement   from "./dateElement.js";


export const displayTasks = () =>{
    //le asignamos a una constante el campo data-list del HTML
    const list = document.querySelector('[data-list]');

    //asifnamos lo que tenemos en el localStorage con un formatoa que podamos usar
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [] ;
    const dates = uniqueDates(taskList);
    orderDates(dates); 
   

    dates.forEach((date) => {
        const dateMoment = moment(date, 'DD/MM/YYYY');
        list.appendChild(dateElement(date));
        taskList.forEach((task) => {
          const taskDate = moment(task.dateFormat, 'DD/MM/YYYY');
          const diff = dateMoment.diff(taskDate);
          if (diff === 0) {
            list.appendChild(createTask(task));
          }
        });
      });
};