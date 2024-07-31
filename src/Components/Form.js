import React, { useEffect, useRef, useState } from "react";
import './Form.css';
import Input from "./Input.js";

export default function Form() {
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [addErrorMsg, setAddErrorMsg] = useState("");
  const [selectionErrorMsg, setSelectionErrorMsg] = useState("");
  const [gender, setGender] = useState("");
  const [genderErrorMsg, setGenderErrorMsg] = useState("");
  const [subject, setSubject] = useState([]);
  const [subjecErrorMsg, setSubjectErrorMsg] = useState("");
  const [flag, setFlag] = useState(false);
  const [records, setRecords] = useState([]);

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

  const validate = (e) => {

    e.preventDefault();
    if (name.length < 2) {
      setErrorMsg("Name should be atleast 2 characters !");
      setFlag(false);
    }
    else if (/(?=.*\d)/.test(Number(name))) {
      setErrorMsg("Name Can't have numbers !");
      setFlag(false);
    }
    else {
      setErrorMsg("");
      setFlag(true);
    }
    if (addRef.current.value.length < 5) {
      setAddErrorMsg("Invalid Address !");
      setFlag(false);
    }
    else {
      setAddErrorMsg("");
      setFlag(true);
    }
    if (selectionRef.current.value == "select") {
      setSelectionErrorMsg("Please a select a stream !");
      setFlag(false);
    }
    else {
      setSelectionErrorMsg("");
      setFlag(true);
    }
    if (gender !== "Male" && gender !== "Female") {
      setGenderErrorMsg("Please Select A Gender !");
      setFlag(false);
    }
    else {
      setGenderErrorMsg("");
      setFlag(true);
    }
    // console.log(subject);
    if (subject.length < 2 || subject.length > 3) {
      setSubjectErrorMsg("Minimum 2 and maximum 3 selection are allowed !");
      setFlag(false);
    }
    else {
      setSubjectErrorMsg("");
      setFlag(true);
    }

    // console.log(flag);
    if (flag) {
      storeDataInLocalStorage();
    }

  }
  const storeDataInLocalStorage = () => {
    // console.log("stored");
    const object = {
      name: name,
      gender: gender,
      subjects: subject,
      stream: selectionRef.current.value
    }
    let copyRecords = [...records];
    copyRecords.push(object);
    setRecords(copyRecords);
    console.log(copyRecords)
    localStorage.setItem("data", JSON.stringify(copyRecords));
  }


  return (
    <>
      <div className="mainContainer">
        <form className="formContainer">
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
          /><p style={{ position: 'absolute', top: '100px', color: 'red' }}>{errorMsg}</p>
          <label>Gender:</label>
          <label for='male'>Male:</label>
          <input type="radio" onChange={handleGenderChange} id="male" name="gender" value='Male' />
          <label for='female'> Female:</label>
          <input type="radio" onChange={handleGenderChange} id="female" name="gender" value='Female' />
          <p style={{ position: 'absolute', top: '138px', color: 'red' }}>{genderErrorMsg}</p>
          <div className="subjectBox" style={{ marginBlock: '20px' }}>
            <h3>Subject:</h3>
            <Input
              // ref={subjectRef}
              type='checkbox'
              name='hindi'
              for='hindi'
              id='hindi'
              subject=' Hindi'
              value="Hindi"
              onChange={handleSubjectChange}
            /><br />
            <Input
              // ref={subjectRef}
              type='checkbox'
              name='english'
              for='english'
              id='english'
              value="English"
              subject=' English'
              onChange={handleSubjectChange}
            /><br />
            <Input
              type='checkbox'
              name='physics'
              for='physics'
              id='physics'
              subject=' Physics'
              value="Physics"
              onChange={handleSubjectChange}
            /><br />
            <Input
              type='checkbox'
              name='chemistry'
              for='chemistry'
              id='chemistry'
              subject=' Chemistry'
              value="Chemistry"
              onChange={handleSubjectChange}
            /><br />
            <Input
              type='checkbox'
              name='math'
              for='mathematics'
              id='mathematics'
              subject='
                  Mathematics'
              value="Mathematics"
              onChange={handleSubjectChange}
            /><br />
            <p style={{ position: 'absolute', top: '300px', color: 'red' }}>{subjecErrorMsg}</p>

            <div className="select" style={{ marginBlock: '20px' }}>
              <label for='stream'>Stream:</label>
              <select ref={selectionRef} style={{ width: '30%', textAlign: 'center', height: '20px' }}>
                <option value='select'>select</option>
                <option value='arts'>Arts</option>
                <option value='science'>Science</option>
                <option value='commerce'>Commerce</option>
              </select>
              <p style={{ position: 'absolute', top: '345px', color: 'red' }}>{selectionErrorMsg}</p>
            </div>
            <div className="address">
              <label for='address'>Address:</label> <br />
              <textarea ref={addRef} rows={3} cols={30} id="address" placeholder="Enter your address" /><p style={{ position: 'absolute', top: '440px', color: 'red' }}>{addErrorMsg}</p>
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
          </thead>
          <tbody>
            {records.map((record, index) => {
              return (
                <tr key={index}>
                  <td>{record.name}</td>
                  <td>{record.gender}</td>
                  <td>{""+record.subjects}</td>
                  <td>{record.stream}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}