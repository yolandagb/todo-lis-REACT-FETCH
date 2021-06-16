import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import { useState, useEffect } from "react";
import { checkPropTypes } from "prop-types";
import "../../styles/home.scss";

//create your first component
export function Home(props) {


    const [todo, setTodo] = useState(["Make the bed ", " Wash my hands"]);
    const [inputValue, setInputValue] = useState("");

    const handleClick = () => {
        const newTodo = todo;
        newTodo.push(inputValue);
        setTodo(newTodo);
        console.log(todo, ["Esto es todo"]);
        setInputValue("");
    };
    // fetch('http://assets.breatheco.de/apis/fake/todos/user/yolandagb', {
    //     method: "PUT",
    //     body: JSON.stringify(todos),
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // })
    //     // .then(resp => {
    //     //     console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
    //     //     console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        //     console.log(resp.text([
        //         { label: "Make the bed", done: false },
        //         { label: "Walk the dog", done: false },
        //         { label: "Do the replits", done: false }
        //     ])); // Intentará devolver el resultado exacto como cadena (string)

        //     return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
        //     })
        //     .then(data => {
        //         //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        //         console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
        //     })
        //     .catch(error => {
        //         //manejo de errores
        //         console.log(error);
        //     }

    const deleteItem = (index, event) => {
        let newTodo = [...todo];
        let removed = newTodo.splice(index, 1);
        setTodo(newTodo);
    };

            return (
                <div className="todo-list">
                    <div className="add-item-container">
                        <div className="text-center">Add item</div>
                        <br />
                        <input
                            className="inputs-container"
                            type="text"
                            placeholder="What needs to be done"
                            value={inputValue}
                            onChange={e => setInputValue(event.target.value)}
                        />
                        <button onClick={handleClick} className="add-button">
                            Add
				</button>
                        <br />
                        <ul>
                            {todo.map((item, index) => {
                                return (
                                    <li className="key" key={index}>
                                        {item}
                                        <buttom
                                            className="delete-button"
                                            onClick={e => deleteItem(index, event)}>
                                            X
								</buttom>
                                    </li>
                                );
                            })}

                        </ul>
                    </div>
                </div>
            );
}