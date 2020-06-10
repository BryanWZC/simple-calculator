import React, {Component} from 'react';
import './App.css';
import {evaluate} from 'mathjs';
import Table from './table';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      // Expression to be evaluated by Mathjs library function
      toEvaluate: '0',
      // For 
      switch: false,
      history: [],
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }
  // Listens for keydown events after components mounted
  componentDidMount(){
    document.addEventListener('keydown',this.handleKeyDown);
  }
  componentWillUnmount(){
    document.removeEventListener('keydown',this.handleKeyDown);
  }
  //Handle switch for numbers
  handleClick(event) {
    let target = event.target;
    if (this.state.toEvaluate === '0' && target.className === 'num-button'){
      this.setState({toEvaluate: target.innerHTML});
    } else {
        if (this.state.switch === true){
          this.setState({toEvaluate: target.innerHTML});
          this.setState({switch: false});
        } else {
          this.setState({toEvaluate: this.state.toEvaluate.concat(target.innerHTML)});
        }
    }
  }
  // Handle switch for operators
  handleOperator(event){
    let target = event.target;
    this.setState({switch: false});
    this.setState({toEvaluate: this.state.toEvaluate.concat(target.innerHTML)});
  }
  // Method for equals sign for calculator
  handleEquals(){
    // Sets switch state to true so that we know to reset if number is pressed next or not if operator is pressed next
    this.setState({switch: true});
    // Using evaluate from Mathjs, if evaluation has more than 8 figures, it shall be reduced to 8
    try {
      let evaluateF = evaluate(this.state.toEvaluate);
      evaluateF.length > 8 ?
        evaluateF = evaluateF.toFixed(8).toString():
        evaluateF = evaluateF.toString();
      this.setState({toEvaluate: evaluateF})
      // Current evaluation to be stored in array to be fed into Table as props
      this.state.history.length < 5 ?
        this.setState({history: [evaluateF,...this.state.history]}):
        this.setState({history: [evaluateF, ...this.state.history.slice(0,-1)]});
    } catch(e) {
      this.setState({toEvaluate:'0'});
      alert('ERROR TRY AGAIN');
    }
    
  }

  // Handles resetting the calculator
  handleClear(){
    this.setState({toEvaluate:'0'});
  }

  // Handles taking 'toEvaluate' and reducing it by the last most string index. If length is one, resets to '0'
  handleBack(){
    (this.state.toEvaluate).length > 1 ?
      this.setState({toEvaluate: this.state.toEvaluate.slice(0,-1)}):
      this.handleClear();
  }

  // Method allows for keydown responses for user convenience 
  handleKeyDown(e) {
    let key = e.keyCode;
    // For numbers 0-9 not on number pad
    if (key >= 48 && key <= 57){
      if (this.state.toEvaluate === '0' || this.state.switch === true){
        this.setState({toEvaluate: String.fromCharCode(e.keyCode)})
        this.setState({switch: false});
      } else {
        this.setState({toEvaluate: this.state.toEvaluate.concat(String.fromCharCode(e.keyCode))});
      }
    } 
    // For numbers 0-9 on number pad
    if(key >= 96 && key <= 105) {
      if (this.state.toEvaluate === '0' || this.state.switch === true){
        this.setState({toEvaluate: String.fromCharCode(e.keyCode - 48)})
        this.setState({switch: false});
      } else {
        this.setState({toEvaluate: this.state.toEvaluate.concat(String.fromCharCode(e.keyCode - 48))});
      }   
    } 
    this.setState({switch: false});
    // For '-'
    if(key === 109 || key === 189){
      this.setState({toEvaluate: this.state.toEvaluate.concat(String.fromCharCode(45))});
    } 
    //For '*'
    if(key === 106){
      this.setState({toEvaluate: this.state.toEvaluate.concat(String.fromCharCode(42))});
    }
    // For '/'
    if(key === 111 || key === 191){
      this.setState({toEvaluate: this.state.toEvaluate.concat(String.fromCharCode(47))});
    }
    // For '.'
    if(key === 110 || key === 190){
      if (this.state.toEvaluate.slice(-1) !==  '.') {
        this.setState({toEvaluate: this.state.toEvaluate.concat(String.fromCharCode(46))});
        }
    }
    // For '+'
    if(key === 107){
      this.setState({toEvaluate: this.state.toEvaluate.concat(String.fromCharCode(43))});
    }
    // For 'enter' or '='
    if(key === 13 || key === 187){
      this.handleEquals();
    }
    // Clear on 'C'
    if(key === 67){
      this.handleClear();
    }
    if(key === 8){
      this.handleBack();
    }
  }

  render(){
    
    return (
      <div className="App">
        <div id = 'calculator'>
          <div id = 'display-wrapper'>
            <h1 id='display'>{this.state.toEvaluate}</h1>
          </div>
          <div id='button-wrapper'>
            <div id = 'number-pad'>
              <button id='one' className = 'num-button' onClick = {this.handleClick}>1</button>
              <button id='two' className = 'num-button' onClick = {this.handleClick}>2</button>
              <button id='three'className = 'num-button'  onClick = {this.handleClick}>3</button>
              <button id='four' className = 'num-button' onClick = {this.handleClick}>4</button>
              <button id='five' className = 'num-button' onClick = {this.handleClick}>5</button>
              <button id='six' className = 'num-button' onClick = {this.handleClick}>6</button>
              <button id='seven' className = 'num-button' onClick = {this.handleClick}>7</button>
              <button id='eight' className = 'num-button' onClick = {this.handleClick}>8</button>
              <button id='nine' className = 'num-button' onClick = {this.handleClick}>9</button>
              <button id='zero' className = 'num-button' onClick = {this.handleClick}>0</button>
            </div>
              <div id = 'operator-pad'>
                <button id='clear' className = 'op-button' onClick = {this.handleClear}>AC</button>
                <button id='back' className = 'op-button' onClick = {this.handleBack}>&lt;&lt;</button>
                <button id='add' className = 'op-button' onClick = {this.handleOperator}>+</button>
                <button id='subtract' className = 'op-button' onClick = {this.handleOperator}>-</button>
                <button id='multiply' className = 'op-button' onClick = {this.handleOperator}>*</button>
                <button id='divide' className = 'op-button' onClick = {this.handleOperator}>/</button>
                <button id='decimal' className = 'op-button' onClick = {this.handleOperator}>.</button>
                <button id='equals' className = 'op-button' onClick = {this.handleEquals}>=</button>
              </div>
          </div>
        </div>
        <Table history = {this.state.history} />
      </div>
    );
  }
}

export default App;
