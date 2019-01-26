import React, { Component } from 'react';
import Card from './Cards/card.js'
import DrawButton from './Button/button.js';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      currentCard: {}
    }

    this.updateCard = this.updateCard.bind(this);
  }

  async componentDidMount() {
    const currentCards = this.state.cards.slice(0)
   let data = await fetch('http://localhost:3000',{mode:"cors"})
      .then(function(response) {
        return response.json();
      })
      .catch(function(err) {
        console.log(err);
     });
      console.log(data)
      data.forEach(function({id, name, description}) {
        description = description.replace(/"/g,"");
        currentCards.push({id, name, description});
      });
      
    this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards)
    }, ()=>{
      console.log(this.state)
    });
  }

  getRandomCard(currentCards) {
    let card = currentCards[Math.floor(Math.random() * currentCards.length)];
    return card;
  }

  updateCard() {
    const currentCards = this.state.cards;
    this.setState({
      currentCard: this.getRandomCard(currentCards)
    })
  }


  render() {
    return (
      <div className='App'>
      <header>Flash Fo Yo Azz</header>
      <h1 className= 'App'>Lets Get Learnt!</h1>
        <div className='card-row'> 
          <Card question={this.state.currentCard.name}
                answer={this.state.currentCard.id}
                description={this.state.currentCard.description} 
          />
        </div>
        <div className='button-row'>
          <DrawButton drawCard={this.updateCard} />
        </div>
      </div>
    );
  }
}