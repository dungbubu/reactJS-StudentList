import { useEffect, useState } from 'react';
import "./App.css";

// Khai bao mang danh sach hoc vien
const STUDENTLIST = 
  [
    {
      id: 13,
      name: 'Nguyen Manh Dung C',
      dob: '24/06/1996',
      email: 'nguyenmanhdung1996C@gmail.com',
      phone: '01234567893'
    },

    {
      id: 12,
      name: 'Nguyen Manh Dung B',
      dob: '24/06/1996',
      email: 'nguyenmanhdung1996B@gmail.com',
      phone: '01234567892'
    },

    {
      id: 11,
      name: 'Nguyen Manh Dung A',
      dob: '24/06/1996',
      email: 'nguyenmanhdung1996A@gmail.com',
      phone: '01234567891'
    },
  ]

function App() {
  // Render
  // const [studentList, setStudentList] = useState(STUDENTLIST)

  // const listItems = studentList.map((student) =>
  //   (
  //     <tr key={student.id}>
  //       <td>{student.name}</td>
  //       <td>{student.dob}</td>
  //       <td>{student.email}</td>
  //       <td>{student.phone}</td>
  //       <td><a href="/#" onClick = {() => showModalEdit(student)}>Sửa</a></td>
  //       <td><a href="/#" onClick = {() => showModalDelete(student)}>Xóa</a></td>
  //     </tr>
  //   ));



  // Render từ dữ liệu server Heroku
  const [studentList, setStudentList] = useState([]) // Học hôm 1/4 Render từ dữ liệu server Heroku

  useEffect(() => {
    async function getUsers() 
      {
        const res = await fetch("https://server-dungbu.herokuapp.com/users");
        const data = await res.json();
        setStudentList(data);
      }
    getUsers();
  }, []);

  const listItems = studentList.map((student) =>
    (
      <tr key={student.id}>
        <td>{student.name}</td>
        <td>{student.dob}</td>
        <td>{student.email}</td>
        <td>{student.phone}</td>
        <td><a href="/#" onClick = {() => showModalEdit(student)}>Sửa</a></td>
        <td><a href="/#" onClick = {() => showModalDelete(student)}>Xóa</a></td>
      </tr>
    ));



  
  const [studentInfo, setStudentInfo] = useState(0) // Biến này để lưu thông tin (ID) khi xóa
  const [inputTable, setInputTable] = useState(false) // Biến này để ẩn/hiện bảng thêm mới học viên




  const [modalsDelete, setModalsDelete] = useState(false) // Biến này để ẩn/hiện Modal xóa
  // Hàm gọi Modal xóa xuất hiện
  function showModalDelete(studentID)
    {
      setStudentInfo(studentID.id)
      setModalsDelete(true)
    }
  // Nút chức năng xác nhận xóa/không xóa
  function cancelDelete() // Đây là nút cancel
    {
      setModalsDelete(false)
    }
  function realDelete(studentID) // Đây là nút Ok
    {
      setStudentList(studentList.filter(student => student.id !== studentInfo ));
      setModalsDelete(false)
    }




  const [editStudentId, setEditStudentId] = useState(); // Các biến chỉnh sửa thông tin của học viên
  const [inputNameEdit, setInputNameEdit] = useState();
  const [inputDobEdit, setInputDobEdit] = useState();
  const [inputEmailEdit, setInputEmailEdit] = useState();
  const [inputPhoneEdit, setInputPhoneEdit] = useState();

  const [modalsEdit, setModalsEdit] = useState(false) // Biến này để ẩn/hiện Modal sửa
  // Hàm gọi Modal sửa xuất hiện
  function showModalEdit(studentID)
    {
      setEditStudentId(studentID.id);
      let index = studentList.findIndex((student) => student.id === studentID.id);
      if (index > -1) 
        {
          let newStudent = [...studentList];
          setInputNameEdit(newStudent[index].name);
          setInputDobEdit(newStudent[index].dob);
          setInputEmailEdit(newStudent[index].email);
          setInputPhoneEdit(newStudent[index].phone);
        }
      setModalsEdit(true)
    }
  // Nút chức năng xác nhận sửa/không sửa
  function cancelEdit() // Đây là nút cancel
    {
      setModalsEdit(false)
    }
  function saveEdit() // Đây là nút lưu
    {
      let index = studentList.findIndex((student) => student.id === editStudentId);
      console.log(editStudentId)
      if (index > -1) 
        {
          let newStudentList = [...studentList];
          newStudentList[index].name = inputNameEdit;
          newStudentList[index].dob = inputDobEdit;
          newStudentList[index].email = inputEmailEdit;
          newStudentList[index].phone = inputPhoneEdit;

          setStudentList(newStudentList);
        }
      setModalsEdit(false)
    }




  const [newStudentId, setNewStudentId] = useState(3); // Các biến thông tin của học viên mới
  const [inputName, setInputName] = useState();
  const [inputDob, setInputDob] = useState();
  const [inputEmail, setInputEmail] = useState();
  const [inputPhone, setInputPhone] = useState();

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
      let newID = newStudentId + 1;
      setNewStudentId(newID)

      let newStudent = 
        {
          id: newID,
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




  // Lưu thông tin chỉnh sửa học viên
  function updateNameEdit(event) 
    {
      const inputNameValueEdit = event.target.value;
      setInputNameEdit(inputNameValueEdit);
    }
  function updateDobEdit(event) 
    {
      const inputDobValueEdit = event.target.value;
      setInputDobEdit(inputDobValueEdit);
    }
  function updateEmailEdit(event) 
    {
      const inputEmailValueEdit = event.target.value;
      setInputEmailEdit(inputEmailValueEdit);
    }
  function updatePhoneEdit(event) 
    {
      const inputPhoneValueEdit = event.target.value;
      setInputPhoneEdit(inputPhoneValueEdit);
    }



  
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
            {modalsDelete === true && 
              <div className="dashboard">
                <h2>Bạn chắc chắn sẽ xóa người này chứ</h2>
                <div className="text-center">
                  <button className="btn btn-yes" onClick={realDelete}>Yes</button>
                  <button className="btn btn-no" onClick={cancelDelete}>Cancel</button>
                </div>
              </div>
            }

            {/* Modal xác nhận sửa */}
            {modalsEdit === true && 
              <div className="dashboard">
                <h2>Bạn muốn sửa thông tin người này chứ</h2>

                <p>Họ tên:</p>
                <input type="text" placeholder={inputNameEdit} onChange={(event) => updateNameEdit(event)}></input>
          
                <p>Năm sinh:</p>
                <input type="text" defaultValue={inputDobEdit} onChange={(event) => updateDobEdit(event)}></input>
            
                <p>Email:</p>
                <input type="text" defaultValue={inputEmailEdit} onChange={(event) => updateEmailEdit(event)}></input>
            
                <p>Điện thoại:</p>
                <input type="text" defaultValue={inputPhoneEdit} onChange={(event) => updatePhoneEdit(event)}></input>

                <div className="text-center">
                  <button className="btn btn-yes" onClick={saveEdit}>Save</button>
                  <button className="btn btn-no" onClick={cancelEdit}>Cancel</button>
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
                  <th scope="col"></th>
                </tr>
              </thead>

              {/* Bảng danh sách học viên (nội dung) */}
              {/* <tbody>
                {listItems}
              </tbody> */}

              {/* Bảng danh sách học viên (nội dung) - Lấy từ server Heroku */}
              <tbody>
                {listItems}
              </tbody>
            </table>
          </main>
      </div>
  );
}

export default App;
