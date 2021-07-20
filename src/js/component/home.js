import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import { useState, useEffect } from "react";
import { checkPropTypes } from "prop-types";
import "../../styles/home.scss";

//create your first component
export function Home(props) {
	const [todo, setTodo] = useState(["Make the bed ", " Wash my hands"]);
	const [inputValue, setInputValue] = useState("");
	const toDoListUrl =
		"https://assets.breatheco.de/apis/fake/todos/user/yolandagb25";

	// const handleClick = () => {
	//     const newTodo = todo;
	//     newTodo.push(inputValue);
	//     setTodo(newTodo);
	//     console.log(todo, ["Esto es todo"]);
	//     setInputValue("");
	// };
	// const deleteItem = (index, event) => {
	//     let newTodo = [...todo];
	//     let removed = newTodo.splice(index, 1);
	//     setTodo(newTodo);
	// };
	function addTodo(e) {
		let input = document.querySelector("input").value;

		if (e.key === "Enter" && input != "") {
			let newTodos = [...todo, { label: input, done: false }];
			setTodo(newTodos);
			document.querySelector("input").value = "";

			fetch(toDoListUrl, {
				method: "PUT",
				body: JSON.stringify(newTodos),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					return resp.json();
				})
				.then(data => data)
				.catch(error => error);
		}
	}

	function deleteTodo(elementIndex) {
		var filtered = todo.filter(function(value, i) {
			return elementIndex !== i;
		});
		setTodo(filtered);
		fetch(toDoListUrl, {
			method: "PUT",
			body: JSON.stringify(filtered),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json();
			})
			.then(data => data)
			.catch(error => error);
	}

	function getTodos() {
		fetch(toDoListUrl, { method: "GET" })
			.then(response => response.json())
			.then(responseJSON => {
				setTodo(responseJSON);
				console.log(responseJSON);
			});
	}

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div className="todo-list">
			<div className="add-item-container">
				<div className="text-center">Add item</div>
				<br />
				<input
					onKeyPress={e => {
						addTodo(e);
					}}
				/>
				<br />
				<ul>
					{todo.map((value, index) => {
						return (
							<li className="key" key={index}>
								{value.label}
								<buttom
									className="delete-button"
									onClick={event => deleteTodo(index)}>
									X
								</buttom>
							</li>
						);
					})}
				</ul>
				<div className="text-muted pb-1">
					<p>{todo.length} to do</p>
				</div>
			</div>
		</div>
	);
}
