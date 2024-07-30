import React from "react";

export default function Label(props){
    return (
        <>
            <input type={props.type} id={props.id}/>
            <label className="subject" name={props.name} for={props.for}>{props.subject}</label>
        </>
    );
}