import { Component } from 'react';
import socket from '../helper/socket';

class Card extends Component {
  clickHandler() {
    const { index, belong, player } = this.props;
    console.log(`player${player} click ${belong}'s ${index}th card`)
    if(belong === 'deck') {
      console.log(`socket.emit('draw', {player, index})`)
      socket.emit('draw', {player, index})
    } else {
      console.log(`socket.emit('guess', {player, belong, index})`)
      // socket.emit('guess', {player, belong, index})
    }
  }

  render() {
    let { index, relativePosition, card, belong, player } = this.props;
    if (!card) {
      card = {
        background: '#eee',
        color: 'eee',
        rank: '',
        isOpen: false
      };
    }
    const {background, color, rank, isOpen} = card;
    let cardElement = null;
    let className = ''
    if (isOpen) {
      className = 'checked'
      cardElement = rank
    } else if (relativePosition === 0) {
      className = 'checked'
      cardElement = rank
    } else {
      // className = 'unchecked'
      className = 'checked'
      cardElement = rank
    }
    const cardFaceStyle = {
      background,
      color,
      position: 'absolute',
      height: '100%',
      width: '100%',
      backfaceVisibility: 'hidden',
      boxShadow: '1px 1px 2px #aaa'
    }
    return (
      <div
        style={{
          display: 'inline-block',
          margin: '2px',
          width: '50px',
          height: '50px',
          fontSize: '40px',
          fontFamily: 'fantasy',
          textAlign: 'center',
          perspective: '200px',
          transformStyle: 'preserve-3d',
          cursor: 'pointer'
        }}
        className={'card-container ' + className}
        onClick={this.clickHandler.bind(this)}
      >
        <div
          className="card"
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          <div
            className="cover"
            style={ cardFaceStyle }
          >
            {'<'}
          </div>
          <div
            className="rank"
            style={ cardFaceStyle }
          >
            {cardElement}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;