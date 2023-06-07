
function addNewTask() {
    var writtenTaskInput = document.querySelector(".addedTask");
    const addTaskButton = document.querySelector(".addTask");
    const tasksContainer = document.querySelector(".taskContainer");
    const clearAllButton = document.querySelector(".clear-button");
    const emptyList = document.querySelector(".empty-list");

    let savedTaskList = JSON.parse(localStorage.getItem("taskList"));
    
    addTaskButton.disabled = true;
    clearAllButton.style.display = "none";

    writtenTaskInput.addEventListener("input", () =>{
        if (writtenTaskInput.value !== "") {
            addTaskButton.disabled = false;
        }
    });

    if (savedTaskList  !== null) {
        for (i in savedTaskList ) {
            createElement(savedTaskList[i]);
        }
        deleteTask();
        deleteAllTasks();
    }
    else {
        savedTaskList  = [];
    }

    function createElement(task) {
        const listElement = document.createElement("li");
        listElement.classList.add("task");
        tasksContainer.appendChild(listElement);
        listElement.innerHTML = `
            <p>${task}</p>
            <button class="task-delete-button"">Delete</button>
        `;
        clearAllButton.style.display = "inline-block";
        emptyList.style.display = "none";
    }

    addTaskButton.addEventListener("click", () =>{
        if (writtenTaskInput.value !== "") {
            createElement(writtenTaskInput.value);
            savedTaskList.push(writtenTaskInput.value)
            localStorage.setItem('taskList', JSON.stringify(savedTaskList));
            writtenTaskInput.value = ""; 
            addTaskButton.disabled = true; 
        }
    })

    function deleteTask() {
        const deleteButton = document.querySelectorAll(".task-delete-button");
        deleteButton.forEach((button) => {
            button.addEventListener("click", () => {
                const listItem = button.parentElement;
                const index = Array.from(listItem.parentElement.children).indexOf(listItem);
        
                savedTaskList.splice(index, 1);
                localStorage.setItem("taskList", JSON.stringify(savedTaskList));
                listItem.remove();

                if (savedTaskList.length === 0) {
                    clearAllButton.style.display = "none";
                    emptyList.style.display = "inline-block";
                }
            });
        });
    }
    
    function deleteAllTasks() {
        clearAllButton.addEventListener("click", () =>{
            localStorage.clear();
            savedTaskList = [];
            const listOfTasks = tasksContainer.querySelectorAll(".task");
            listOfTasks.forEach(task =>{
                task.remove()
            })
            clearAllButton.style.display = "none";
            emptyList.style.display = "inline-block";
        });
    }
}

addNewTask(); 