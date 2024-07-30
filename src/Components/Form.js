import React, { useState } from "react";
import './Form.css';
import Input from "./Input.js";

export default function Form(props){
    const [name,setName] = useState("");
    const [errorMsg,setErrorMsg] = useState("");

    const handleChange = (e)=>{
        setName(e.target.value);
    }

    const validate = (e)=>{
      e.preventDefault();
      if(name.length < 2){
        setErrorMsg("Name should be atleast 2 characters !");
        // console.log(errorMsg)
      }
      else if(/(?=.*\d)/.test(Number(name))){
        setErrorMsg("Name Can't have numbers !");
      }
    }
  return (
    <>
        <form className="formContainer">
      <h1 style={{textAlign:'center'}}>Form</h1>
          <label for="name">Name:</label>
          <input
            type="text"
            id='name'
            name='name'
            value={name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            style={{marginBlock:'20px'}}
          /><p style={{position:'absolute',top:'100px',color:'red'}}>{errorMsg}</p>
            <label>Gender:</label>
            <label for='male'>Male:</label>
            <input type="radio" id="male" name="gender" value='Male'/>
            <label for='female'> Female:</label>
            <input type="radio" id="female" name="gender" value='Female'/>
            <div className="subjectBox" style={{marginBlock:'20px'}}>
              <h3>Subject:</h3>
                <Input
                  type='checkbox'
                  name='hindi'
                  for='hindi'
                  id='hindi'
                  subject=' Hindi'
                /><br/>
                <Input
                  type='checkbox'
                  name='english'
                  for='english'
                  id='english'
                  subject=' English'
                /><br/>
                <Input
                  type='checkbox'
                  name='physics'
                  for='physics'
                  id='physics'
                  subject=' Physics'
                /><br/>
                <Input
                  type='checkbox'
                  name='chemistry'
                  for='chemistry'
                  id='chemistry'
                  subject=' Chemistry'
                /><br/>
                <Input
                  type='checkbox'
                  name='math'
                  for='math'
                  id='math'
                  subject='
                  Mathematics'
                /><br/>

                <div className="select" style={{marginBlock:'20px'}}>
                  <label for='stream'>Stream:</label>
                    <select style={{width:'30%',textAlign:'center',height:'20px'}}>
                      <option value='select'>select</option>
                      <option value='arts'>Arts</option>
                      <option value='science'>Science</option>
                      <option value='commerce'>Commerce</option>
                    </select>
                </div>
                <div className="address">
                    <label for='address'>Address:</label> <br/>
                    <textarea rows={3} cols={30} id="address" placeholder="Enter your address"/>
                </div>
                <div style={{textAlign:'center',marginTop:'5px'}}>
                  <button className="btn" onClick={validate}>Submit</button>
                </div>
            </div>
        </form>
    </>
  );
}