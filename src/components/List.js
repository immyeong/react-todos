import React, { useState } from 'react';

const List = React.memo(({ id, title, completed, todoData, setTodoData, provided, snapshot }) => {

    const [isEditing, setisEditing] = useState(false);
    const [editedTitle, seteditedTitle] = useState(title);

    const handleClick = (id) => {
        let newTodoData = todoData.filter(data => data.id !== id);
        setTodoData(newTodoData);
        localStorage.setItem('myTodo', JSON.stringify(newTodoData));
    };

    const checkedBox = (id) => {
        let newTodo = todoData.map(data => {
            if (data.id === id) {
                data.completed = !data.completed;
            }
            return data;
        })

        setTodoData(newTodo);
        localStorage.setItem('myTodo', JSON.stringify(newTodo));
    }

    const EditChange = (e) => {
        seteditedTitle(e.target.value);
    }

    const handleEditChange = (e) => {
        e.preventDefault();

        let newTodo = todoData.map(data => {
            if(data.id === id){
                data.title = editedTitle;
            }
            return data;
        })

        setTodoData(newTodo);
        localStorage.setItem('myTodo', JSON.stringify(newTodo));
        setisEditing(false);
    }

    if (isEditing) {
        return (
            <div className={`flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded`}>
                <form onSubmit={handleEditChange}>
                    <div>
                        <input
                            className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
                            value={editedTitle}
                            onChange={EditChange}
                            autoFocus />
                    </div>
                </form>
                <div>
                    <button className="mx-4 float-right" onClick={()=>setisEditing(false)}>x</button>
                    <button className="mx-4 float-right" type="submit" onClick={handleEditChange}>save</button>
                </div>
            </div>
        )
    } else {
        return (
            <div {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}
                key={id} className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded`}>
                <div>
                    <input type="checkbox" checked={completed} onChange={() => checkedBox(id)} />
                    <span className={completed ? "line-through" : undefined}>{title}</span>
                </div>
                <div>
                    <button className="mx-4 float-right" onClick={() => handleClick(id)}>x</button>
                    <button className="mx-4 float-right" onClick={() => setisEditing(true)}>edit</button>
                </div>
            </div>
        )
    }
});

export default List;
