import React from 'react';
import axios from 'axios';


 class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pizzaType: '',
      pizzaData: {},
      showPizza: false

    };
  }


handleInput = (event) => {
  this.setState({
    pizzaType: event.target.value
  });
};

handleSubmit = async (event) => {
  event.preventDefault();
  //create a url for our request
  //http://localhost:3001/pizza?pizztype=Chicago
  let url = `${process.env.REACT_APP_SERVER}/pizza?pizzatype=${this.state.pizzaType}`;
  let pizzaData = await axios.get(url);
  console.log('pizza data',pizzaData.data);
  this.setState({
    pizzaData: pizzaData.data,
    error: false,
    showPizza: true
  })
};


  render() {
    console.log('pizza type',this.state.pizzaType)
    return (
      <>
        <h1>FIND YOUR PIZZA</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" onChange={this.handleInput} />
          </label>
          <button>Display Pizza</button>
        </form>
      {
        this.state.showPizza && <p>{this.state.pizzaData.pizzaType} pizza can be found in {this.state.pizzaData.location}</p>
      }
      </>
   
    )
  }
}
export default App;