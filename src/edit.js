import React from 'react'
import { Form,TextArea } from 'semantic-ui-react';

class Edit extends React.Component{

    constructor(props){
        super();
        this.state={
            value:"",
        }
        this.handler = props.add;
        this.changeListener = this.changeListener.bind(this);
    }

    changeListener(e){
        e.persist();
        this.setState(()=>({value:e.target.value}));
        this.handler(e);
    }

    render(){
        return(
            <Form>
            <TextArea type="text" onChange={this.changeListener} id={this.props.id} className="textArea" placeholder={`Item #${this.props.id}`} value={this.state.value}/>
            <br/>
            </Form>);
    }
}

export default Edit;