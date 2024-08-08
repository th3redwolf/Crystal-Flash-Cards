import React from 'react'

const Cards = ({set, front, back}) => {

    return (
        <div className={`card set${set}`}>
            <div className="front">
                <h2>{front.info}</h2>
                {front.image && <img className="card-image" src={front.image}/>}
            </div>
            <div className="back">
                <h2>{back.info}</h2>
                {back.image && <img className="card-image" src={back.image}/>}
            </div>
        </div>
    )
}

export default Cards;