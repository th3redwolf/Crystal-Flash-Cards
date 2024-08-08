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
    const [flipped, setFlipped] = useState(false);

    // new
    const [guess, setGuess] = useState('');
    const [correctGuess, setCorrectGuess] = useState('');
    const [shuffle, setShuffle] = useState([]);
    const [shuffling, setShuffling] = useState(false);
    const [streak, setStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState();

    const [mastered, setMastered] = useState([]);
    const [showingMastered, setShowingMastered] = useState(false);

    const [dataa, setDataa] = useState([]);
    // *end new

    const handleFlip = () => {
        setFlipped(!flipped);
    }

    // new
    const shuffleCards = () => {

        setShuffling(true);
        let allCards = data.flatMap(set => set.cards.map(card => ({...card, set: set.set})));

        for (let i = allCards.length -1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
        }
        setShuffle(allCards);
        setFlipped(false);
        setTimeout(() => setShuffling(false), 1000);
        
    }

    const handleNext = () => {

        if (startCardShown) {
            setStartCardShown(false);
        }
        else {
            setHistory([...history, {set: currentSet, card: currentCard}]);
            
            if (shuffle.length > 0) {

                let filteredShuffle = shuffle.filter(card => !mastered.find(masteredCard => masteredCard.id === card.id));
                setShuffle(filteredShuffle);
                //const currentData = shuffle;
                if (currentCard < filteredShuffle.length - 1){
                    setCurrentCard(currentCard + 1);
                }
                else {
                    setCurrentCard(0);
                }
            }
            else {
                let filteredData = data[currentSet].cards.filter(card => !mastered.find(masteredCard => masteredCard.id === card.id));
                let newData = [...data];
                newData[currentSet].cards = filteredData;
                setDataa(newData);
                if (currentCard < filteredData.length - 1){
                    setCurrentCard(currentCard + 1);
                }
                else {
                    if (currentSet < data.length - 1) {
                        setCurrentSet(currentSet + 1);
                        setCurrentCard(0);
                    }
                    else {
                        setCurrentSet(0);
                        setCurrentCard(0);
                    }
                }
            }  
        }
        setFlipped(false);
        setCorrectGuess('');
        setGuess('');
    }
    // *end new

    const handlePrevious = () => {

        if (history.length > 0) {
            const lastViewed = history[history.length - 1];
            setCurrentSet(lastViewed.set);
            setCurrentCard(lastViewed.card);
            setHistory(history.slice(0, -1));
            setFlipped(false);
          }
    }

    // New (project3)
    const checkAnswer = () => {

        if (!flipped){
            const correctAnswer = shuffle.length > 0
            ? shuffle[currentCard].back.info.toLowerCase()
            : data[currentSet].cards[currentCard].back.info.toLowerCase();
            //const distance = levenshteinDistance(guess.toLowerCase(), correctAnswer.toLowerCase());
            const guessLowCase = guess.toLowerCase();

            if (guessLowCase.length >= 3 && correctAnswer.includes(guessLowCase)) {
                setCorrectGuess('correct');
                setStreak(streak + 1);
            }
            else {
                if (guessLowCase.length != 0){
                    setCorrectGuess('wrong');
                    if (longestStreak >= streak && longestStreak != 0){
                        setLongestStreak(longestStreak);
                    }
                    else {
                        setLongestStreak(streak);
                    }
                    setStreak(0);
                }   
            }
        }
    }

    const markAsMastered = (cardId) => {

        const card = data.flatMap(set => set.cards).find(card => card.id === cardId);
        setMastered(prevMastered => [...prevMastered, card]);
    }

    const showMastered = () => {

        setShowingMastered(!showingMastered);

    }
    // *end new
    
    return (
        <div>
            <div>
                <h3>Current Streak: {streak}, Longest Streak: {longestStreak}</h3>
            </div>
            <div className={`card-container ${flipped ? 'flipped' : ''} ${shuffling ? 'shuffling' : ''}`} onClick={handleFlip}>
                {startCardShown ? (
                    <Cards
                        key={startCard.cards[0].id}
                        set={startCard.set}
                        front={startCard.cards[0].front}
                        back={startCard.cards[0].back}
                    />
                ) : shuffle.length > 0 ? (
                    <Cards
                        key={shuffle[currentCard].id}
                        set={shuffle[currentCard].set}
                        front={shuffle[currentCard].front}
                        back={shuffle[currentCard].back}
                    />
                ) : showingMastered ? (
                    mastered.map((card, index) => (
                    <Cards 
                        key={card.id}
                        set={card.set}
                        front={card.front}
                        back={card.back}
                    />
                    ))
                ) : (
                    <Cards
                        key={data[currentSet].cards[currentCard].id}
                        set={data[currentSet].set}
                        front={data[currentSet].cards[currentCard].front}
                        back={data[currentSet].cards[currentCard].back}
                    />
                )}
            </div> 
            <div className="type-answer">
                <input
                    type="text"
                    placeholder="Enter guess .." 
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    id={correctGuess}
                    className="input-text"
                />
                <button className ="button submit" type="submit" onClick={checkAnswer}>Check Guess</button>
            </div>
            <button className="add-mastered" onClick={() => markAsMastered(shuffle.length > 0 ? shuffle[currentCard].id : data[currentSet].cards[currentCard].id)}>Add Mastered</button>
            <button className="nav-button prev-button" onClick={handlePrevious}></button>
            <button className="shuffle" onClick={shuffleCards}>Shuffle Cards</button>
            <button className="nav-button next-button" onClick={handleNext}></button>
            <button className="master-deck" onClick={showMastered}>Mastered Cards</button>
        </div>
    )
}

export default CardsFlash