import { checkComplete } from "./checkComplete.js";
import { deleteIcon } from "./deleteIcon.js";
import { displayTasks } from './readTasks.js';



//generamos una funcion que recibe un evento
export const addTask = (evento) => {
    evento.preventDefault();
    
    //traemos la lista con el el input y la fecha 
    const list = document.querySelector('[data-list]');
    const input = document.querySelector("[data-form-input]");
    const calendar = document.querySelector('[data-form-date]');
    
    //asignamos los datos a una variable
    const value = input.value;
    const date = calendar.value;

    //le damos el formato a la fecha
    const dateFormat = moment(date).format('DD/MM/YYYY');
 
    //validamos los inputs si se cumple alguno no agrega la tarea
    if(value === "" || date === ""){
      return;
    }

    //vaciamos los inputs
    input.value = "";
    calendar.value= "";
    const complete =false;  
    //creamos un objeto con los datos
    const taskObj = {
        value,
        dateFormat,
        complete,
        id: uuid.v4(),
        };
        
      
    list.innerHTML= "";
    
    //la lista(array) es igual a lo que tenga el localStorage con la variable tasks(elementos adicionados)    
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [] ;
    //llenamos la lista con los objetos
    taskList.push(taskObj);
    //le seteamos los items en un formato string
    localStorage.setItem("tasks", JSON.stringify(taskList));
    
    displayTasks();
    
  };


  //creamos una constante con una funcion que recibe el objeto 
export const createTask = ({value, dateFormat, complete, id}) => {
    //creamos un li en el html y le agregamos la clase .card
    const task = document.createElement('li');
          task.classList.add('card')    
    //creamos un div
    const taskContent = document.createElement('div');    

    const check = checkComplete(id);
    if(complete){
      check.classList.toggle('fas');
      check.classList.toggle('completeIcon');
      check.classList.toggle('far');;
    }
    //creamos un span le agregamos una clase y le damos el valor(value) 
    const titleTask = document.createElement('span');
          titleTask.classList.add('task');
          titleTask.innerText = value;
          taskContent.appendChild(check);
          taskContent.appendChild(titleTask);

    //creamos un span  le agregamos el valor (dateFormat)
    const dateElement = document.createElement('span');
          dateElement.innerHTML = dateFormat;    
          task.appendChild(taskContent);
          task.appendChild(dateElement);
          task.appendChild(deleteIcon(id));
    return task;
}