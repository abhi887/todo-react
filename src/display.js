import React,{useState} from 'react';
import { Checkbox,Progress,Divider,Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Display(props){
    
    const [,setState] = useState();
    const todo = JSON.parse(localStorage.getItem(props.todo));
    const checkCount = (todo.state.filter(i=>i)).length

    let formatted = todo.items.map((i,index)=>{
        if(todo.state[index])
            // return(<h3><input type="checkbox" checked onChange={checkListener} id={index} value={i}></input>{i}</h3>);
            return(
            <tr>
                    <td><h2><Checkbox checked onChange={checkListener} id={index} value={i}/></h2></td>
                    <td><h2>{i}</h2></td>
            </tr>);
        else
            // return(<h3><input type="checkbox" onChange={checkListener} id={index} value={i}></input>{i}</h3>);
            return(
            <tr>
                    <td><h2><Checkbox onChange={checkListener} id={index} value={i}/></h2></td>
                    <td><h2>{i}</h2></td>
            </tr>);
    });

    return([
        <h1 className="todoTitle" key="01">{(todo.title).toUpperCase()}</h1>,
        <Divider inverted="true" key="02"/>,
        <table key="03"><tbody>{[...formatted]}</tbody></table>,
        <div key="04">
            <h3 className="progressPercent">{Math.floor((checkCount/formatted.length)*100)}%</h3>
            <Progress percent={(checkCount/formatted.length)*100} indicating className="progressBar"/>
        </div>,
        <Button key="05" onClick={props.setContextDash} floated="left" className="backButton" size="huge">
            <FontAwesomeIcon icon={faArrowLeft}/>
        </Button>
    ])

    function checkListener(e){
        todo.state[e.target.id] = !todo.state[e.target.id];
        localStorage.setItem(props.todo,JSON.stringify({"title":todo.title,"items":todo.items,"state":todo.state}));
        setState({});
    }
}

export default Display;