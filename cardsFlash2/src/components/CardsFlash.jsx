import React, {useState} from 'react'
import Cards from './Cards'
import '../index.css'


const startCard = {

    set: 0, cards: [{id: 'startCard', 
                    front: {
                            info: 'Let\'s begin here'}, 
                    back: {image: '../../crystal images/start.png',
                            info: 'Press the right arrow to enter the crystal game'},
            }]
}

const data = [

    {set: 1, cards: [{id: 'card1',
                    front: {
                            info: 'Which crystal is made up of 23 elements' },
                    back: { image: '../../crystal images/crystal1.png', 
                            info: 'Auralite 23' },},

                    {id: 'card2',
                    front: { image: '../../crystal images/crystal2.png', 
                            info: 'What is the name of this popular crystal' },
                    back: { image: '../../crystal images/crystal2.png', 
                            info: 'Amethyst' },},

                    {id: 'card3',
                    front: { image: '../../crystal images/crystal3.png', 
                            info: 'Can be mistaken for a popular crystal, yet the name reminds more of a Chariot' },
                    back: { image: '../../crystal images/crystal3.png', 
                            info: 'Charoite' },},
            ],
    },
    {set: 2, cards: [{id: 'card4',
                    front: {  
                            info: 'Which crystal is known to be widely used in technology' },
                    back: { image: '../../crystal images/crystal4.png', 
                            info: 'Clear Quartz' },},

                    {id: 'card5',
                    front: { image: '../../crystal images/crystal5.png', 
                            info: 'Name this crystal that is also known as the Love Stone yet can be mistaken as a slice of Ham' },
                    back: { image: '../../crystal images/crystal5.png', 
                            info: 'Rose Quartz' },},

                    {id: 'card6',
                    front: { image: '../../crystal images/crystal6.png', 
                            info: 'Associated with clarity, purification, and used for cleansing other crystals' },
                    back: { image: '../../crystal images/crystal6.png', 
                            info: 'Selenite (I wouldn\'t have guessed either 😊)' },},
            ],
    },
    {set: 3, cards: [{id: 'card7',
                    front: { image: '../../crystal images/crystal7.png', 
                            info: 'Can be mistaken as Dragon Glass (game of thrones), but really is Vulcanic Glass' },
                    back: { image: '../../crystal images/crystal7.png', 
                            info: 'Black Obsidian' },},

                    {id: 'card8',
                    front: { 
                            info: 'What amazing color does Lapis Lazuli have'},
                    back: { image: '../../crystal images/crystal8.png', 
                            info: 'Blue (Lapis Lazuli)' },},

                    {id: 'card9',
                    front: { 
                            info: 'Both in color and name this one reminds us of Lemons' },
                    back: { image: '../../crystal images/crystal9.png', 
                            info: 'Citrine' },},
            ],
    },

];

const CardsFlash = () => {

    /*const [cards, setCards] = useState(
        data.map((item, index) => ({
            front: {info: item.front.info, image: item.front.image}, 
            back: {info:item.back.info, image: item.back.image}
        }))
    )*/

    const [startCardShown, setStartCardShown] = useState(true);
    const [history, setHistory] = useState([]);
    const [currentSet, setCurrentSet] = useState(0);
    const [currentCard, setCurrentCard] = useState(0);
    /*const [previousCard, setPreviousCard] = useState(null);*/
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped(!flipped);
    }
    
    const handleNext = () => {

        if (startCardShown) {
            setStartCardShown(false);
        }
        let randomSetIndex, randomCardIndex;
        do {
            randomSetIndex = Math.floor(Math.random() * data.length);
            randomCardIndex = Math.floor(Math.random() * data[randomSetIndex].cards.length);
        } while ((startCardShown && randomSetIndex === 0) || randomSetIndex === currentSet && randomCardIndex === currentCard);
        setHistory([...history, {set: currentSet, card: currentCard}]);
        setCurrentSet(randomSetIndex);
        setCurrentCard(randomCardIndex);
        setFlipped(false);

        /*setPreviousCard(currentCard);*/
        
    }

    const handlePrevious = () => {
        if (history.length > 0) {
            const lastViewed = history[history.length - 1];
            setCurrentSet(lastViewed.set);
            setCurrentCard(lastViewed.card);
            setHistory(history.slice(0, -1));
            setFlipped(false);
          }

        /*
        if (previousCard !== null) {
            setCurrentCard(previousCard);
            setFlipped(false);
        }*/
    }
    
    return (
        <div>
            <div className={`card-container ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
                {startCardShown ? (
                    <Cards
                        key={startCard.cards[0].id}
                        set={startCard.set}
                        front={startCard.cards[0].front}
                        back={startCard.cards[0].back}
                    />
                ) : (
                    <Cards
                        key={data[currentSet].cards[currentCard].id}
                        set={data[currentSet].set}
                        front={data[currentSet].cards[currentCard].front}
                        back={data[currentSet].cards[currentCard].back}
                    />
                )}
            </div>
            <button className="nav-button prev-button" onClick={handlePrevious}></button>
            <button className="nav-button next-button" onClick={handleNext}></button>
        </div>
    )
}

export default FlashCards