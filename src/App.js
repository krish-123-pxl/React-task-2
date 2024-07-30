import { useState } from 'react';
import './App.css';
import Form from './Components/Form';

function App() {
  return(
    <div className='container'>
      <h1 style={{textAlign:'center'}}>Form</h1>
      <Form type="text" id="name" name='name' placeholder='Enter Your Name:'/>
    </div>
  );
}

export default App;
