import { useState } from 'react';
import "./App.css";

// Khai bao mang danh sach hoc vien
const STUDENTLIST = 
  [
    {
      id: 3,
      name: 'Nguyen Manh Dung C',
      dob: '24/06/1996',
      email: 'nguyenmanhdung1996C@gmail.com',
      phone: '01234567893'
    },

    {
      id: 2,
      name: 'Nguyen Manh Dung B',
      dob: '24/06/1996',
      email: 'nguyenmanhdung1996B@gmail.com',
      phone: '01234567892'
    },

    {
      id: 1,
      name: 'Nguyen Manh Dung A',
      dob: '24/06/1996',
      email: 'nguyenmanhdung1996A@gmail.com',
      phone: '01234567891'
    },
  ]

function App() {
  // Khai báo biến State
  const [studentList, setStudentList] = useState(STUDENTLIST)
  const [studentInfo, setStudentInfo] = useState(0) // Biến này để lưu thông tin (ID) khi xóa
  const [modals, setModals] = useState(false) // Biến này để ẩn/hiện Modal
  const [inputTable, setInputTable] = useState(false) // Biến này để ẩn/hiện bảng thêm mới học viên
  const [addNew, setAddNew] = useState([]) // Biến này để lưu thông tin học viên mới

  const [newStudentId, setNewStudentId] = useState(0); // Các biến thông tin của học viên mới
  const [inputName, setInputName] = useState();
  const [inputDob, setInputDob] = useState();
  const [inputEmail, setInputEmail] = useState();
  const [inputPhone, setInputPhone] = useState();



  // Hàm gọi Modal xuất hiện
  function showModal(studentID)
    {
      setStudentInfo(studentID.id)
      setModals(true)
    }
  // Nút chức năng xác nhận xóa/không xóa
  function cancelDelete() // Đây là nút cancel
    {
      setModals(false)
    }
  function realDelete(studentID) // Đây là nút Ok
    {
      setStudentList(studentList.filter(student => student.id !== studentInfo ));
      setModals(false)
    }

  // Hàm gọi bảng thêm mới học viên
  function showInputTable()
    {
      setInputTable(true)
    }
  // Nút chức năng xác nhận thêm mới học viên
  function cancelAdd() // Đây là nút cancel
    {
      setInputTable(false)
    }
  function addData() // Đây là nút Ok
    {
      let newId = studentList[0].id + 1;
      setNewStudentId(newId)
      console.log("ID của học viên mới là: " + newId)

      let newStudent = 
        {
          id: newId,
          name : inputName,
          dob : inputDob,
          email : inputEmail,
          phone : inputPhone
        }
      
      studentList.unshift(newStudent);
      setInputTable(false)
    }

  // Lưu thông tin học viên mới vào biến state
  function updateName(event)
    {
      const inputNameValue = event.target.value;
      setInputName(inputNameValue);
    }
  function updateDob(event)
    {
      const inputDobValue= event.target.value;
      setInputDob(inputDobValue);
    }
  function updateEmail(event)
    {
      const inputEmailValue= event.target.value;
      setInputEmail(inputEmailValue);
    }
  function updatePhone(event)
    {
      const inputPhoneValue= event.target.value;
      setInputPhone(inputPhoneValue);
    }




  // Render
  const listItems = studentList.map((student) =>
    (
      <tr key={student.id}>
        <td>{student.name}</td>
        <td>{student.dob}</td>
        <td>{student.email}</td>
        <td>{student.phone}</td>
        <td><a href="/#" onClick = {() => showModal(student)}>Xóa</a></td>
      </tr>
    ));



  
  // Phần hiển thị Html
  return (
    <div className="studentList">
        <header className="container">
          <div className="dashboard">
            <h1>Danh sách học viên</h1>
            <button className="btn btn-add" onClick={showInputTable}>Thêm học viên</button>
          </div>
        </header>
          
          <main className="container">
            {/* Bảng điền thông tin học viên */}
            {inputTable === true && 
              <div className="dashboard">
                <h2>Thêm mới học viên</h2>

                <p>Họ tên:</p>
                <input type="text" placeholder="..." defaultValue="" onChange={(event) => updateName(event)}></input>
          
                <p>Năm sinh:</p>
                <input type="text" placeholder="..." defaultValue="" onChange={(event) => updateDob(event)}></input>
            
                <p>Email:</p>
                <input type="text" placeholder="..." defaultValue="" onChange={(event) => updateEmail(event)}></input>
            
                <p>Điện thoại:</p>
                <input type="text" placeholder="..." defaultValue="" onChange={(event) => updatePhone(event)}></input>
                
                <button className="btn btn-yes" onClick={addData}>Lưu</button>
                <button className="btn btn-no"  onClick={cancelAdd}>Quay lại</button>
              </div>
            }

            {/* Modal xác nhận xóa */}
            {modals === true && 
              <div className="dashboard">
                <h2>Bạn chắc chắn sẽ xóa người này chứ</h2>
                <div className="text-center">
                  <button className="btn btn-yes" onClick={realDelete}>Yes</button>
                  <button className="btn btn-no" onClick={cancelDelete}>Cancel</button>
                </div>
              </div>
            }

            <table className="table dashboard">
              {/* Bảng danh sách học viên (tiêu đề) */}
              <thead>
                <tr>
                  <th scope="col">Họ tên</th>
                  <th scope="col" className="text-right">Năm sinh</th>
                  <th scope="col">Email</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col"></th>
                </tr>
              </thead>

              {/* Bảng danh sách học viên (nội dung) */}
              <tbody>
                {listItems}
              </tbody>
            </table>
          </main>
      </div>
  );
}

export default App;
