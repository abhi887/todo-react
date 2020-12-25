import React from 'react';
import { Button,Card,Header } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Dash(props){
    const todoList = JSON.parse(localStorage.getItem("todoList"));
    if(todoList != null && todoList.length!==0){
        let tmp = [];
        // console.log(todoList);
        tmp = todoList.map(i=>{
            let todo = JSON.parse(localStorage.getItem(i));
            // return([<button type="button" data-todo={i} onClick={props.setDisplayTodo} id={i}>{todo.title}</button>,<br/>]);
            // return([<Button type="button" data-todo={i} onClick={props.setDisplayTodo} id={i} inverted color="teal">{todo.title}</Button>,<br/>]);
            return <Card centered data-todo={i}>
                    <Card.Header onClick={props.setDisplayTodo} data-todo={i}>
                        <Header as="h1" onClick={props.setDisplayTodo} data-todo={i}>{todo.title}</Header>
                    </Card.Header>
                    <Card.Content data-todo={i}>
                            <h3 onClick={props.setDisplayTodo} data-todo={i} fluid id={i} inverted color="teal">{todo.state.filter((j)=>j).length}/{todo.state.length}</h3>
                            <Button type="button" onClick={RemoveTodo} fluid floated="right" data-todo={i} id={i} inverted color="red">Delete</Button>
                    </Card.Content>
                </Card>;
        });
        // <Grid container columns={4} stackable> 
        //         {[...tmp]} 
        //     </Grid>
        return [
            <Card.Group>
                {[...tmp]}
            </Card.Group>,
            <Button onClick={props.contextEdit} key="2" circular="true" floated="right" color="olive" className="createButton" size="huge">
                <FontAwesomeIcon icon={faPlus}/>
            </Button>,
        ];
    }
    else{
        return([
        <h2>Create some todos to get started !</h2>,
        <Button onClick={props.contextEdit} key="2" circular="true" floated="right" color="olive" className="createButton" size="huge">
            <FontAwesomeIcon icon={faPlus}/>
        </Button>
        ]);
    }

    function RemoveTodo(e){
        let todo = e.target.dataset.todo;
        localStorage.removeItem(todo);
        let todoList = JSON.parse(localStorage.getItem("todoList"));
        todoList=todoList.filter((i)=>i!==todo);
        localStorage.setItem("todoList",JSON.stringify(todoList));
        props.setTodoListnCount(todoList);
    }

}



export default Dash;