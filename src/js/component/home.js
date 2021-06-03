import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import { useState, useEffect } from "react";
import { checkPropTypes } from "prop-types";

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

	const deleteItem = (index, event) => {
		let newTodo = [...todo];
		let removed = newTodo.splice(index, 1);
		setTodo(newTodo);
	};
	// function updateInput(key, value) {
	// 	this.setState({
	// 		[key]: value
	// 	});
	// }
	// function addItem() {
	// 	//crear item con único id
	// 	const newItem = {
	// 		id: 1 + Math.random(),
	// 		value: this.state.newItem.slice()
	// 	};
	// 	// copiar la lista actual de items
	// 	const list = [...this.state.list];

	// 	// añadir nuevo item
	// 	list.push(newItem);

	// 	// actualizar stado con una nueva lista y rsetearlo a newitem input
	// 	this.setState({
	// 		list,
	// 		newItem: ""
	// 	});
	// }
	// function deleteItem(id) {
	// 	//copia de los items en la lista

	// 	const list = [...this.state.list];

	// 	// filtro de los items borrados
	// 	const updatedList = list.filter(item => item.id !== id);

	// 	this.setState({ list: updatedList });
	// }
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
				<button onClick={handleClick}className="add-button">
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
