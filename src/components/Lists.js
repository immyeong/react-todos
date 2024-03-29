import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import List from './List';

const Lists = React.memo( ({ todoData, setTodoData }) => {
    const handleEnd = (res) => {
        let newTodoData = [...todoData];

        const [reOrderItem] = newTodoData.splice(res.source.index, 1);
        newTodoData.splice(res.destination.index, 0, reOrderItem);
        setTodoData(newTodoData);
        localStorage.setItem('myTodo', JSON.stringify(newTodoData));
    }
    return (
        <DragDropContext onDragEnd={handleEnd}>
            <Droppable droppableId='todo'>
                {provided => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {todoData.map((data, index) => (
                            <Draggable
                                key={data.id}
                                draggableId={data.id.toString()}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <List
                                        key={data.id}
                                        id={data.id}
                                        title={data.title}
                                        completed={data.completed}
                                        todoData={todoData}
                                        setTodoData={setTodoData}
                                        provided={provided}
                                        snapshot={snapshot}
                                    />
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

        </DragDropContext>
    )
})

export default Lists