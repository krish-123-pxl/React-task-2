import React, { useState } from "react";
import './Form.css';

export default function Input(props){
    const [name,setName] = useState('');
    const handleChange = (e)=>{
        setName(e.target.value);
    }
  return (
    <>
        <form className="formContainer">
          <label for="name">Name:</label>
          <input type={props.type} id={props.id} name={props.name} value={name} onChange={handleChange} placeholder={props.placeholder} style={{marginBlock:'20px'}}/>
            <label>Gender:</label>
            <label for='male'>Male:</label>
            <input type="radio" id="male" name="gender" value='Male'/>
            <label for='female'>Female:</label>
            <input type="radio" id="female" name="gender" value='Female'/>
            <div className="subjectBox" style={{marginBlock:'20px'}}>
              <h3>Subject:</h3>
                <input type="checkbox" id="hindi"/>
                <label className="subject" for='hindi'> Hindi,</label> <br/>
                <input type="checkbox" id="english"/>
                <label className="subject" for='english'> English,</label> <br/>
                <input type="checkbox" id="physics"/>
                <label className="subject" for='physics'> Physics,</label> <br/>
                <input type="checkbox" id="chemistry"/>
                <label className="subject" for='chemistry'> Chemistry,</label> <br/>
                <input type="checkbox" id="math"/>
                <label className="subject" for='math'> Mathematics</label><br/>
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
                  <button className="btn">Submit</button>
                </div>
            </div>
        </form>
    </>
  );
}