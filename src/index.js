
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import React, {Component} from 'react';
import { Header } from 'semantic-ui-react'
import ReactDOM from 'react-dom';
import axios from 'axios';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  render() {
    return (

      <div style={{overflow: "scroll",height:"100vh",width:"100vw",backgroundImage: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"}}>
   		<Header as='h2' style={{textAlign:"center",padding:"10px"}}>lil Haven</Header>
   		<div style={{overflow: "scroll",height:"85vh",width:"50vw",marginLeft : "25vw",alignItems:"center", justifyContent:"center", textAlign:"center",background:"#e9eef3"}}>
        	<TodoList items={this.state.items} />
        </div>
        <div style={{width:"50vw",height:"15vh",justifyContent: 'flex-end',alignItems:"center",marginLeft : "25vw", justifyContent:"center",textAlign:"center",background:"#e9eef3"}}>
        <form onSubmit={this.handleSubmit}>
          <input
            style={{width: "90%",fontSize:"20pt",height:"40px"}}
            id="new-todo"
			type="text"
            placeholder="Start typing.."
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button style={{height:"40px"}}>
            Send
          </button>
        </form>
        </div>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    let res = ""
    if(this.state.text!== ""){
      axios.post("http://18.116.248.37:8080/predict", {"sentence": this.state.text})
      .then((response) => {
        console.log(response);
        res = response["data"]["response"];
        const newItem = {
	      text: this.state.text,
	      id: Date.now(),
	      response: res 
	    };
	    this.setState(state => ({
	      items: state.items.concat(newItem),
	      text: ''
	    }));
        console.log(this.state.items);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
  }
}

class TodoList extends React.Component {

  

  componentDidMount () {
    this.scrollToBottom()
  }
  componentDidUpdate () {
    this.scrollToBottom()
  }
  scrollToBottom = () => {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }
  render() {
    return (
      <div>
        {this.props.items.map(item => (
          <div>
	          <p style={{marginLeft : "50%",textAlign:"center",border:"1px solid #fff", padding:"10px", borderRadius: "10px",marginTop: "20px",background:"#dce775"}}>{item.text}</p>
	          <p style={{marginRight : "50%",border:"1px solid #fff", padding:"10px", borderRadius: "25px",marginTop: "20px",background:"#dce775"}}>{item.response}</p>
          </div>
        ))}
        <div ref={el => { this.el = el; }} />
      </div>
    );
  }
}



ReactDOM.render(
  <React.StrictMode>
    <TodoApp />,
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
