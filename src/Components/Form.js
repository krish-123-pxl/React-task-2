import React, { useEffect, useRef, useState } from "react";
import './Form.css';
import Input from "./Input.js";

export default function Form() {
  const [error, setError] = useState({});

  let [name, setName] = useState("");
  let [gender, setGender] = useState("");
  let [subject, setSubject] = useState([]);
  let [stream,setStream] = useState('');
  let [addr,setAddr] = useState('');

  const [flag, setFlag] = useState(false);
  const [editFlag,setEditFlag] = useState(false);
  const [records, setRecords] = useState([]);
  const [editIndex,setEditIndex] = useState('');
  
  let idis = [];

  useEffect(() => {
    if (localStorage.getItem("data")) {
      setRecords(JSON.parse(localStorage.getItem("data")));
      // console.log(localStorage.getItem("data"))
    }
  }, []);



  const handleChange = (e) => {
    setName(e.target.value);

  }
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  }

  // let genderArray = [];
  const handleSubjectChange = (e) => {
    let subjectCopy = [...subject];
    if (e.target.checked) {
      setSubject([...subject, e.target.value]);
    } else {
      const index = subjectCopy.indexOf(e.target.value);
      if (index > -1) {
        subjectCopy.splice(index, 1);
      }

      setSubject(subjectCopy);
    }

  }

  const addRef = useRef();
  const selectionRef = useRef();
  const tableRef = useRef();
  let subjectRef = useRef();
  const formRef = useRef();

  const newError = {};

  const validate = (e) => {
    // console.log(editFlag);
    // console.log(editIndex)

    e.preventDefault();
    if (name.length < 2) {
      newError.nameError = "Name should be atleast 2 characters !";
      setFlag(false);
    }
    else if (/(?=.*\d)/.test(Number(name))) {
      newError.nameError = "Name Can't have numbers !";
      setFlag(false);
    }
    else {
      newError.nameError = "";
      setFlag(true);
    }
    
    if (addr.length < 5) {
      newError.addError = "Invalid Address !";
      setFlag(false);
    }
    else {
      newError.addError = "";
      setAddr(addRef.current.value);
      setFlag(true);
    }
    if (selectionRef.current.value == "select") {
      newError.streamError = "Please a select a stream !";
      setFlag(false);
    }
    else {
      newError.streamError = "";
      setFlag(true);
    }
    if (gender !== "Male" && gender !== "Female") {
      newError.genderError = "Please Select a Gender !";
      setFlag(false);
    }
    else {
      newError.genderError = "";
      setFlag(true);
    }
    if (subject.length < 2 || subject.length > 3) {
      newError.subjecError = "Minimum 2 and maximum 3 selection are allowed !";
      setFlag(false);
    }
    else {
      newError.subjecError = "";
      setFlag(true);
    }
    setError(newError);
    // console.log(editFlag);
    
    if(flag && !editFlag) {
      storeDataInLocalStorage();
    }
    if(editFlag){
      // console.log("editing")
      let entireRecord = JSON.parse(localStorage.getItem("data"));
      // console.log(entireRecord[editIndex])
      entireRecord[editIndex].name = name;
      entireRecord[editIndex].gender =gender;
      entireRecord[editIndex].address = addr;
      entireRecord[editIndex].subjects = subject;
      entireRecord[editIndex].stream = selectionRef.current.value;
      
      if(flag && !(addr.length < 5 )){
        localStorage.setItem("data",JSON.stringify(entireRecord));
      }
      
    }
    
    
    
    // console.log(addr);
  

  }
  const storeDataInLocalStorage = () => {
    // console.log("stored");
    let date = new Date();
    if(addr.length < 5){
      
    }
    else{
      const object = {
        name: name,
        gender: gender,
        subjects: subject,
        stream: selectionRef.current.value,
        address:addr,
        id:date.getMilliseconds()
      }
        let copyRecords = [...records];
        copyRecords.push(object);
        setRecords(copyRecords);
        console.log(copyRecords)
        localStorage.setItem("data", JSON.stringify(copyRecords));
    
    }
  }

  const deleteField = (index)=>{
      let allRecords = JSON.parse(localStorage.getItem("data"));
      // let agree = confirm("Are you sure to delete");
      if(1){
        allRecords.splice(index,1);
        setRecords(allRecords);
        localStorage.setItem("data",JSON.stringify(allRecords));
      }
  }

  const editField = (index)=>{
    setEditIndex(index);
    setEditFlag(true);
    formRef.current.reset();
    let wholeRecords = JSON.parse(localStorage.getItem("data"));
    // console.log(wholeRecords[index].name);
    
    setName(wholeRecords[index].name);
    addRef.current.value = wholeRecords[index].address; 
    setAddr(wholeRecords[index].address);
    
    let radios = document.getElementsByName("gender");
    for(let i=0;i<radios.length;i++){
      if(radios[i].value == wholeRecords[index].gender){
        radios[i].checked = true;
        setGender(radios[i].value);
        break;
      }
    }
    let selectStream = document.getElementsByTagName("option");
    for(let i=0;i<selectStream.length;i++){
      // console.log(wholeRecords[index].stream);
      if(selectStream[i].value == wholeRecords[index].stream){
        selectStream[i].selected = true;
        setStream(selectStream[i].value);
        break;
      }
      
    }
    let subjectList = document.getElementsByTagName("Input");
    let subjectFromStorage = wholeRecords[index].subjects;
    setSubject(wholeRecords[index].subjects);

    // console.log(subjectFromStorage);
    for(let i=0;i<subjectList.length;i++){
      // console.log(subjectList[i].value);
      for(let j=0;j<subjectFromStorage.length;j++){
        // console.log(subjectFromStorage[j]);
        if(subjectList[i].value == subjectFromStorage[j]){
          subjectList[i].checked = true;
          break;
        }
      }
    }

    


  }


  return (
    <>
      <div className="mainContainer">
        <form className="formContainer" ref={formRef}>
          <h1 style={{ textAlign: 'center' }}>Form</h1>
          <label for="name">Name:</label>
          <input
            type="text"
            id='name'
            name='name'
            value={name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            style={{ marginBlock: '20px' }}
          /><p style={{ position: 'absolute', top: '100px', color: 'red' }}>{error.nameError}</p>
          <label>Gender:</label>
          <label for='male'>Male:</label>
          <input type="radio" onChange={handleGenderChange} id="male" name="gender" value='Male' />
          <label for='female'> Female:</label>
          <input type="radio" onChange={handleGenderChange} id="female" name="gender" value='Female' />
          <p style={{ position: 'absolute', top: '138px', color: 'red' }}>{error.genderError}</p>
          <div className="subjectBox" style={{ marginBlock: '20px' }}>
            <h3>Subject:</h3>
            <Input
              ref={subjectRef}
              type='checkbox'
              name='hindi'
              for='hindi'
              id='hindi'
              subject=' Hindi'
              value="Hindi"
              onChange={handleSubjectChange}
            /><br />
            <Input
              ref={subjectRef}
              type='checkbox'
              name='english'
              for='english'
              id='english'
              value="English"
              subject=' English'
              onChange={handleSubjectChange}
            /><br />
            <Input
              ref={subjectRef}
              type='checkbox'
              name='physics'
              for='physics'
              id='physics'
              subject=' Physics'
              value="Physics"
              onChange={handleSubjectChange}
            /><br />
            <Input
              ref={subjectRef}
              type='checkbox'
              name='chemistry'
              for='chemistry'
              id='chemistry'
              subject=' Chemistry'
              value="Chemistry"
              onChange={handleSubjectChange}
            /><br />
            <Input
              ref={subjectRef}
              type='checkbox'
              name='math'
              for='mathematics'
              id='mathematics'
              subject='Mathematics'
              value="Mathematics"
              onChange={handleSubjectChange}
            /><br />
            <p style={{ position: 'absolute', top: '300px', color: 'red' }}>{error.subjecError}</p>

            <div className="select" style={{ marginBlock: '20px' }}>
              <label for='stream'>Stream:</label>
              <select ref={selectionRef} style={{ width: '30%', textAlign: 'center', height: '20px' }}>
                <option value='select'>select</option>
                <option value='arts'>Arts</option>
                <option value='science'>Science</option>
                <option value='commerce'>Commerce</option>
              </select>
              <p style={{ position: 'absolute', top: '345px', color: 'red' }}>{error.streamError}</p>
            </div>
            <div className="address">
              <label for='address'>Address:</label> <br />
              <textarea onChange={(e)=>{setAddr(e.target.value)}} ref={addRef} rows={3} cols={30} id="address" placeholder="Enter your address" /><p style={{ position: 'absolute', top: '440px', color: 'red' }}>{error.addError}</p>
            </div>
            <div style={{ textAlign: 'center', marginTop: '5px' }}>
              <button style={{ marginTop: '15px' }} className="btn" onClick={validate}>Submit</button>
            </div>
          </div>
        </form>

        <table ref={tableRef}>
          <thead>
            <th>Name</th>
            <th>Gender</th>
            <th>Subjects</th>
            <th>Stream</th>
            <th>Address</th>
            <th>Modify</th>
          </thead>
          <tbody>
            {records.map((record, index) => {
              idis[index] = record.id; 
              return (
                <tr key={index}>
                  <td>{record.name}</td>
                  <td>{record.gender}</td>
                  <td>{""+record.subjects}</td>
                  <td>{record.stream}</td>
                  <td>{record.address}</td>
                  <td>
                    <div style={{display:"flex",gap:"10px"}}>
                    <span className="delete" onClick={() => deleteField(index)}><i class="fa-solid fa-trash"></i></span>
                    <span className="edit" onClick={()=> editField(index)}><i class="fa-solid fa-pen-to-square"></i></span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}