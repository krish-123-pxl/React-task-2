import React from "react";

export default function Label(props){
    return (
        <>
            <input onChange={props.onChange} type={props.type} id={props.id} value={props.value}/>
            <label className="subject" name={props.name} htmlFor
            ={props.for}>{props.subject}</label>
        </>
    );
}