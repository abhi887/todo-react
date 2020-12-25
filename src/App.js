import React from 'react';
import Edit from './edit';
import Display from './display';
import Dash from './dash';
import { Input,Container,Button,Header } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component{

  constructor(){
    super();
    this._addEdit = this._addEdit.bind(this);
    this.contextDisplay = this.contextDisplay.bind(this);
    this.setTodoName = this.setTodoName.bind(this);
    this.contextEdit = this.contextEdit.bind(this);
    this.contextDash = this.contextDash.bind(this);
    this.setDisplayTodo = this.setDisplayTodo.bind(this);
    this.setTodoListnCount = this.setTodoListnCount.bind(this);
    this.setContextDash = this.setContextDash.bind(this);

    let todoCount = localStorage.getItem("todoList") != null ? JSON.parse(localStorage.getItem("todoList")).length : 0 ;
    let todoList = localStorage.getItem("todoList") != null ? JSON.parse(localStorage.getItem("todoList")) : [] ;

    this.state = {
      edits:[<Edit key="1" add={this._addEdit} id="1"/>],
      todos:[],
      context:'dash',
      count:1,
      todoName:"",
      todoCount: todoCount,
      todoList:todoList,
      displayTodo:"",
    };
  }

  contextDash(e){    
    if(this.state.todoName !== "")
    {
      let todoCount = this.state.todoCount + 1;
      let todoList = this.state.todoList; 
      todoList.push(`todo${todoCount}`);
      localStorage.setItem(`todo${todoCount}`,JSON.stringify({"title":this.state.todoName,"items":this.state.todos,"state": new Array(...this.state.todos).fill(false,0,this.state.todos.length)}));
      localStorage.setItem("todoList",JSON.stringify(todoList));
      this.setState(()=>({
        context:"dash",
        todoCount:todoCount,
        todoList:todoList,
        todoName:"",
      }));
    }
  }

  contextEdit(e){
    this.setState(()=>({context:"edit"}));
  }

  contextDisplay(e){
    this.setState(()=>({context:"display"}));
  }

  setDisplayTodo(e){
    e.persist();
    console.log(`button for ${e.target.dataset.todo} clicked !`);
    this.contextDisplay(e);
    this.setState(()=>({displayTodo:e.target.dataset.todo}));
  }

  setTodoName(e){
    e.persist();
    this.setState(()=>({todoName:e.target.value}));
  }

  setTodoListnCount(newtodoList){
    this.setState(()=>({
      todoList:newtodoList,
      todoCount:newtodoList.length,
    }));
  }

  setContextDash(e){
    this.setState(()=>({
      context:"dash"
    }));
  }

  _addEdit(e){
    e.persist();
    let key = parseInt(this.state.count);
    let targetId = parseInt(e.target.id);
    // this.state.todos[targetId-1] = e.target.value;
    let tmpTodos = this.state.todos;
    tmpTodos[targetId-1] = e.target.value;
    if(parseInt(e.target.id) === key){
      this.setState(()=>({
        edits:[...this.state.edits,<Edit key={key+1} add={this._addEdit} id={key+1}/>],
        todo:[...this.state.todos,""],
        count:key+1,
        todos:[...tmpTodos],
      }));
    }
    else if(parseInt(e.target.id) === key-1){
      if(e.target.value === ""){
        let key = this.state.count;
        this.state.edits.pop();
        this.state.todos.pop();
        this.setState(()=>({
          edit:[...this.state.edits],
          // todos:[...this.state.todos],
          todos:[...tmpTodos],
          count: key-1,
        }))
      }
    }
  }

  render(){
    if(this.state.context==="edit")
    {      
      return ([
        <Container className="appContainer" fluid={true}>
          <div className="AppHeader"><Header as="h1"><span role="img" aria-label="bullsEye Emoji">🎯</span> To-do App </Header></div>
          {[  
              <Input type="text" onChange={this.setTodoName} id="todoName" placeholder="Todo title" required key="01"/>,
              <br key="02"/>,
              ...this.state.edits,
              <Button onClick={this.contextDash} color="teal" id="editCreateButton" key="03">Create Todo</Button>,
              <Button onClick={this.setContextDash} floated="left" className="backButton" size="huge" key="04">
                <FontAwesomeIcon icon={faArrowLeft}/>
              </Button>
          ]}
        </Container>
      ]);
    }
    else if(this.state.context==="dash"){
      return(
      <Container className="appContainer" fluid={true}>
        <div className="AppHeader"><Header as="h1"><span role="img" aria-label="bullsEye Emoji">🎯</span> To-do App </Header></div>
        <Dash setDisplayTodo={this.setDisplayTodo} contextEdit={this.contextEdit} setTodoListnCount={this.setTodoListnCount}/>
      </Container>);
    }
    else{
      return( 
      <Container className="appContainer" fluid={true}>
        <div className="AppHeader"><Header as="h1"><span role="img" aria-label="bullsEye Emoji">🎯</span> To-do App </Header></div>
        <Display setContextDash={this.setContextDash} todo={this.state.displayTodo}/>
      </Container>
      )
    }
  }
}


export default App;
