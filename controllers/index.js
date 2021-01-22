import { TaskService } from "../models/TaskService.js";
import { Task } from "../models/Task.js";
// Khai báo đối tượng service
const taskSV = new TaskService();
const getAllTask = async () => {
  //dùng service để gọi api từ backend lấy dữ liệu về
  // const promise = taskSV.getAllTask();

  // promise.then(result => {
  //     console.log('result',result)
  // })
  try {
    //Bước 2: dùng service gọi api từ backend lấy dữ liệu về
    const result = await taskSV.getAllTask();
    console.log("result", result.data);
    //Bước 3: từ dữ liệu lấy về tách ra 2 mảng => render dữ liệu lên giao diện
    let taskToDo = result.data.filter((task) => task.status === false);
    console.log("task chua lam", taskToDo);
    let taskCompleted = result.data.filter((task) => task.status === true);
    console.log("task lam roi", taskCompleted);
    render(taskToDo, taskCompleted);
  } catch (err) {
    // lỗi trong hàm try sẽ trả về biến
  }
};
getAllTask();

const render = (taskToDo, taskCompleted) => {
  // từ mảng dữ liệu => tạo giao diện
  const contentToDo = taskToDo.reduce((content, item, index) => {
    // nếu có hàm phải cho thêm dấu '' vào
    return (content += `
    <li>
   <div> ${item.taskName} </div>
   <div>
              <a class="buttons me-0" style="cursor: pointer" onclick ="delTask('${item.taskName}')">
                <i class="fa fa-trash"></i>
              </a>
              <a class="buttons" style="cursor: pointer" onclick="putTask('${item.taskName}')">
                <i class="fa fa-check"></i>
              </a>
    </div>
              </li>

        `);
  }, "");
  //   dom giao diện in ra màn hình
  document.getElementById("todo").innerHTML = contentToDo;

  const contentCompleted = taskCompleted.reduce((content, item, index) => {
    // nếu có hàm phải cho thêm dấu '' vào
    return (content += `
    <li>
   <div> ${item.taskName} </div>
   <div>
              <a class="buttons me-0" style="cursor: pointer" onclick ="delTask('${item.taskName}')">
                <i class="fa fa-trash"></i>
              </a>
              <a class="buttons" style="cursor: pointer" onclick="undoTask('${item.taskName}')">
                <i class="fa fa-undo"></i>
              </a>
    </div>
              </li>

        `);
  }, "");
  //   dom giao diện in ra màn hình
  document.getElementById("completed").innerHTML = contentCompleted;
};

//===== nghiệp vụ thêm task =======
// B1: định nghĩa sự kiện click cho button #addItem

document.getElementById("addItem").onclick = async (event) => {
  // event.preventDefault();
  // event.target <= dại diện cho thẻ button đang được onclick

  // Lấy thông tin người dùng nhập từ giao diện
  let taskName = document.getElementById("newTask").value;
  // tạo ra object backend yêu cầu
  const taskModel = new Task();
  taskModel.taskName = taskName;
  //gọi api đưa dữ liệu về server
  try {
    let result = await taskSV.addTask(taskModel);
    console.log("ket qua them task", result.data);
  } catch (err) {
    console.log(err);
  }
};

//===== nghiệp vụ xóa task =======

window.delTask = async (taskName) => {
  let cfm = confirm("ban co muon xoa task?");
  if (cfm) {
    //gọi API mỗi lần người dùng bấm nút xóa dữ liệu
    try {
      let result = await taskSV.deleteTask(taskName);
      console.log(result.data);
      //gọi lại hàm get task sau khi bị xóa (cập nhật bảng thông báo)
      getAllTask();
    } catch (err) {
      console.log(err);
    }
  }
};

//===== nghiệp vụ cập nhật task đã hoàn thành =======
window.putTask = async (taskName) => {
  alert("completed nha ");

  try {
    let result = await taskSV.doneTask(taskName);
    console.log(result.data);
    getAllTask();
  } catch (err) {
    console.log(err);
  }
};

//===== nghiệp vụ undo cập nhật task đã hoàn thành =======
window.undoTask = async (taskName) => {
  console.log('this undotask',taskName)
  try {
    let result = await taskSV.rejectTask(taskName);
    console.log(result.data);
    getAllTask();

  } catch (err) {
    console.log(err);
  }
};
