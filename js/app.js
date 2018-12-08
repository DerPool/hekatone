

const API = new API_v1('http://game.local');


API.getTasks().then(res => {
    console.log("Tasks")
    console.log(res);
});

API.getTaskByID(1).then(res => {
    console.log("Task by ID");
    console.log(res); 
})
