import { useState } from 'react';
import "./App.css";

// Khai bao mang danh sach hoc vien
const STUDENTLIST = 
  [
    {
      id: 1,
      name: 'Nguyen Manh Dung A',
      dob: '24/06/1996',
      email: 'nguyenmanhdung1996A@gmail.com',
      phone: '01234567891'
    },

    {
      id: 2,
      name: 'Nguyen Manh Dung B',
      dob: '24/06/1996',
      email: 'nguyenmanhdung1996B@gmail.com',
      phone: '01234567892'
    },

    {
      id: 3,
      name: 'Nguyen Manh Dung C',
      dob: '24/06/1996',
      email: 'nguyenmanhdungC1996@gmail.com',
      phone: '01234567893'
    },
  ]

function App() {
  // Khai bao bien State
  const [studentList, setStudentList] = useState(STUDENTLIST)
  const [studentInfo, setStudentInfo] = useState(0) // Bien nay de luu thong tin (ID)
  const [modals, setModals] = useState(false) // Bien nay de an/hien Modal

  // Ham goi ra Modal xuat hien
  function showModal(studentID)
    {
      setStudentInfo(studentID.id)
      setModals(true)
    }

  function cancelDelete()
    {
      setModals(false)
    }
  function realDelete(studentID) //Đây là nút Ok
    {
      setStudentList(studentList.filter(student => student.id !== studentInfo ));
      setModals(false)
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

  return (
    <div className="studentList">
        <header className="container">
        <h1 class="title">Danh sách học viên</h1>
        <button id="add-student">Thêm học viên</button>
        </header>
          
          <main className="container">
            {/* Modal xac nhan co xoa nguoi nay hay khong */}
            {modals === true && 
              <div>
                <div className="delete-form-text"><p>Bạn chắc chắn sẽ xóa người này chứ</p></div>
          
                <div className="delete-group-btn">
                  <button className="confirm-btn" onClick={realDelete}>Yes</button>
                  <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
                </div>
              </div>}

            <table className="table table table-striped table-hover">
              {/* Hang tieu de cua bang */}
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Họ tên</th>
                  <th scope="col" className="text-right">Năm sinh</th>
                  <th scope="col">Email</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col"></th>
                </tr>
              </thead>

              {/* Hang noi dung cua bang */}
              <tbody id="data-table">
                {listItems}
              </tbody>

            </table>
          </main>
      </div>
  );
}

export default App;
