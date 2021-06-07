import React, {Component} from 'react';

export default class FirstComponent extends Component {

constructor(props) {
    super(props)
    }

render() {
	//const animals = ["Dog", "Bird", "Cat", "Mouse", "Horse"]
    const inputelement = (<p style={{border:"1px solid #fff", padding:"10px", borderRadius: "5px",marginTop: "20px", color: "white"}}>{this.props.displaytext}</p>)
    const outputelement = (<p style={{border:"1px solid #fff", padding:"10px", borderRadius: "5px",marginTop: "20px", color: "white"}}>{this.props.displaytext}</p>)
    
    return(
    <div className="comptext">
    	{this.props.animals.map(animal => (
    	<div>
        <p style={{border:"1px solid #fff", padding:"10px", borderRadius: "5px",marginTop: "20px", color: "white"}}>{animal[0]}</p>
        <p style={{border:"1px solid #fff", padding:"10px", borderRadius: "5px",marginTop: "20px", color: "white"}}>{animal[1]}</p>
        </div>
        ))}

    </div>
    	)
    }
}