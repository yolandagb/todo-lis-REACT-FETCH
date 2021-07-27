import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import { useState, useEffect } from "react";
import { checkPropTypes } from "prop-types";
import "../../styles/home.scss";
import { event } from "jquery";

//create your first component
export function Home(props) {
	const [todo, setTodo] = useState(["Make the bed ", " Wash my hands"]);
	const [inputValue, setInputValue] = useState("");

	const handleClick = () => {
		const newTodo = todo;
		newTodo.push(inputValue);
		setTodo(newTodo);
		setInputValue("");
		fetch("http://assets.breatheco.de/apis/fake/todos/user/yolandagb", {
			method: "POST",
			body: JSON.stringify(newTodo),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => data.json())
			.catch(err => err());
	};
	const deleteItem = (index, event) => {
		let newTodo = [...todo];
		newTodo.splice(index, 1);
		setTodo(newTodo);
		fetch("http://assets.breatheco.de/apis/fake/todos/user/yolandagb", {
			method: "PUT",
			body: JSON.stringify(newTodo),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => data.json())
			.catch(err => err());
	};

	const getTodo = () => {
		fetch("http://assets.breatheco.de/apis/fake/todos/user/yolandagb", {
			method: "GET"
		})
			.then(response => response.json())
			.then(responseJSON => {
				setTodo(responseJSON);
			});
	};

	useEffect(() => {
		getTodo();
	}, []);

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
					onChange={event => setInputValue(event.target.value)}
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
								<button
									className="delete-button"
									onClick={() => deleteItem(index)}>
									X
								</button>
							</li>
						);
					})}

					{/* <li>{todo}</li> */}
					{/* {this.state.list.map(item => {
						return (
							<li key={item.id}>
								{item.value}
								<buttom
									onClick={() => this.deleteItem(item.id)}>
									X
								</buttom>
							</li>
						);
					})} */}
				</ul>
			</div>
		</div>
	);
}
