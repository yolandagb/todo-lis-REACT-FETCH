import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import { useState, useEffect } from "react";
import { checkPropTypes } from "prop-types";

//create your first component
export function Home() {
	const [todo, setTodo] = useState([]);
	const toDoListUrl =
		"https://assets.breatheco.de/apis/fake/todos/user/tibisfly2";

	function addTodo(e) {
		let input = document.querySelector("input").value;
		console.log(input);
		if (e.key === "Enter" && input != "") {
			let newTodos = [...todo, { label: input, done: false }];
			setTodo(newTodos);
			document.querySelector("input").value = "";
			console.log(todo);
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
				.then(data => {
					console.log(data);
				})
				.catch(error => {
					console.log(error);
				});

			console.log(todo);
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
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});

		console.log(filtered);
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
		<div className="text-center mt-5">
			<div className="row w-100">
				<div className="col-md-12">
					<h1 className="display-2">Tibis TO DO List</h1>

					<div className="input container input-group mx-auto">
						<input
							type="text"
							onKeyPress={e => {
								addTodo(e);
							}}
						/>
					</div>
					<div className="list container">
						<ul>
							{todo.map((value, index) => (
								<li className="list-group-item" key={index}>
									{value.label}
									<button
										type="button"
										onClick={event => deleteTodo(index)}>
										<i className="fas fa-trash-alt" />
									</button>
								</li>
							))}
						</ul>
						<div className="text-muted pb-1">
							<p>{todo.length} to do</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// return (
// 	<div className="text-center mt-5">
// 		<h1>Hello Rigo!</h1>
// 		<p>
// 			<img src={rigoImage} />
// 		</p>
// 		<a href="#" className="btn btn-success">
// 			If you see this green button... bootstrap is working
// 		</a>
// 		<p>
// 			Made by{" "}
// 			<a href="http://www.4geeksacademy.com">4Geeks Academy</a>, with
// 			love!
// 		</p>
// 	</div>
// );
