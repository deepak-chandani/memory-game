
class Card {
  constructor(value){
    this.value = value;
    this.isOpen = false;
    this.isMatched = false; // can be derived if we keep `matchedWith`
    // this.matchedWith: Card // matched with which Card ?
    this.position = null // position of card
  }

  static buildfromCard(card){
    const newCard = new Card(card.value)
    const attrs = ['isOpen', 'isMatched', 'position']
    for(let k of attrs){
      newCard[k] = card[k]
    }

    return newCard
  }
}

export default Card