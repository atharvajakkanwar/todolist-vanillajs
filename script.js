// Code goes here
console.log("3");
var todoList = {
 todos: [],
 displayTodos: function() {
   if(this.todos.length === 0) {
     console.log("Empty todolist!");
   } else {
    for(var i = 0; i < this.todos.length; i++){
      var status = (this.todos[i].completed ? "Completed" : "Pending");
      console.log(i, this.todos[i].todoText, status); 
    }
   }
 },
  addTodos: function(todoText) {
  this.todos.push({
    todoText: todoText,
    completed: false
  });
  this.displayTodos();
},
deleteTodos: function(position) {
  this.todos.splice(position, 1);
  this.displayTodos();
},
changeTodo: function(position, newText) {
  this.todos[position].todoText = newText;
  this.displayTodos();
},
toggleCompleted: function(position) {
  this.todos[position].completed = !this.todos[position].completed;
},
toggleAll: function() {
  var completed = 0;
  for(var i =0 ; i < this.todos.length; i++){
    if (this.todos[i].completed == true) completed++;
  }
  var newStatus = true;
  if (completed == this.todos.length) newStatus = false;
  
  for(var i =0 ; i < this.todos.length; i++){
    this.todos[i].completed = newStatus;
  }
}
};

// Access the buttons
// Run the displayTodos() method

// var displayTodosButton = document.getElementById('display');
// displayTodosButton.addEventListener('click',function() {
//   todoList.displayTodos();
// });

// var toggleTodosButton = document.getElementById('toggle');
// toggleTodosButton.addEventListener('click',function() {
//   todoList.toggleAll();
// });

var handlers = {
  //   displayTodos: function() {
  //   todoList.displayTodos();
  // },
    toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  },
  addTodo: function() {
    addTodoText = document.getElementById("addTodoText");
    todoList.addTodos(addTodoText.value); //DOM's value
    addTodoText.value = "";
    view.displayTodos();
  },
  changeTodo: function() {
    changeTodoPosition = document.getElementById("changeTodoPosition");
    changeTodoText = document.getElementById("changeTodoText");
    todoList.changeTodo(changeTodoPosition.valueAsNumber, changeTodoText.value);
    changeTodoPosition.value = "";
    changeTodoText.value = "";
    view.displayTodos();
  },
  deleteTodos: function(position) {
    
    todoList.deleteTodos(position);
    view.displayTodos();
  },
  toggleTodo: function() {
    togglePosition = document.getElementById("togglePosition");
    todoList.toggleCompleted(togglePosition.valueAsNumber);
    togglePosition.value = "";
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todoUl = document.querySelector('ul');
    todoUl.innerHTML = ""; // clears li list efore adding new elements
    for(var i = 0; i < todoList.todos.length; i++){
      var todoLi = document.createElement('li');
      
      todoLi.id = i;
      
      if (todoList.todos[i].completed) {
        todoLi.textContent = todoList.todos[i].todoText + " Completed";
      } else {
        todoLi.textContent = todoList.todos[i].todoText + " Pending";
      }
      
      todoLi.appendChild(this.createDeleteButton());
      todoUl.appendChild(todoLi);
    }
  },
  createDeleteButton: function() {
    var deleteButton =document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  }
};

var  todosUL = document.querySelector('ul');
todosUL.addEventListener('click', function(event) {
  var elementClicked = event.target;
  //checkc what was clicked
  if(elementClicked.className === 'deleteButton') {
    // run delete handler
    handlers.deleteTodos(parseInt(elementClicked.parentNode.id));
  }
});
