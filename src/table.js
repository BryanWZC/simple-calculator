import React from 'react';
import './table.css';

// To be rendered to App
class Table extends React.Component{
  // Only update if props have changed
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.history !== this.props.history
  }
  
  //Function that takes an array and returns JSX of calculation history based on passed props called'history
  displayHistory(historyArr){
      if(historyArr.length > 0) {
        return historyArr.map((value,i) => {
         return <div key = {Math.random().toString()+i} id = {'value'+i} className = 'container'>
            <h1>{value}</h1>
          </div>
        }
      )}
  }

  // Renders heading only if there is more than 0 elements in this.props.history
  heading (){
    if(this.props.history.length > 0){return <h1 id = 'heading'>History:</h1>}
  }

  render(){
    
    return(
      <div id='history'>
        {this.heading()}
        {this.displayHistory(this.props.history)}
      </div>
    )
  }
}

export default Table