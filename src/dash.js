import React from 'react';
import { Button,Card,Header } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faTrash } from '@fortawesome/free-solid-svg-icons';

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
                    <Card.Header data-todo={i} onClick={props.setDisplayTodo}>
                        <Header as="h1" data-todo={i}>{todo.title}</Header>
                    </Card.Header>
                    <Card.Content data-todo={i}>
                            <h3 data-todo={i} fluid id={i} inverted={true} color="teal">{todo.state.filter((j)=>j).length}/{todo.state.length}</h3>
                            <Button className="deleteButton" onClick={RemoveTodo} fluid={true} floated="right" size="huge" data-todo={i} id={i}>
                                <FontAwesomeIcon icon={faTrash} data-todo={i}/>
                            </Button>
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
        // console.log(e.target.parentElement.dataset.todo);
        let todo = e.target.tagName==="path" ? e.target.parentElement.dataset.todo : e.target.dataset.todo ;
        localStorage.removeItem(todo);
        let todoList = JSON.parse(localStorage.getItem("todoList"));
        todoList=todoList.filter((i)=>i!==todo);
        localStorage.setItem("todoList",JSON.stringify(todoList));
        props.setTodoListnCount(todoList);
    }

}



export default Dash;