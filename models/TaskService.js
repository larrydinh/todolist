import { BaseService } from "./BaseService.js";
export class TaskService extends BaseService {
  constructor() {
    super(); //gọi lại phương thức constructor của class cha
  }
  //Định nghĩa phương thưc getAllTask
  getAllTask = () => {
    // const promise = this.get('http://svcy.myclass.vn/api/ToDoList/GetAllTask');
    // return promise;
    // có thể viết nhanh
    return this.get("http://svcy.myclass.vn/api/ToDoList/GetAllTask");
  };
  //Định nghĩa hàm đưa dữ liệu về backend
  addTask = (task) => {
    // đúng định dạng backend quy định
    return this.post("http://svcy.myclass.vn/api/ToDoList/AddTask", task);
  };
  deleteTask = (taskName) => {
    return this.delete(
      `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`
    );
  };
  doneTask = (taskName) => {
    return this.put(
      `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`
    );
  };
  rejectTask = (taskName) => {
    return this.put(
      `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`
    );
  };
}
