// InitialFlagContainer.jsx
import React, { useState } from 'react';
import './InitialFlagContainer.css';

function InitialFlagContainer({ onStartClick }) {
    const [selectedContinent, setSelectedContinent] = useState('');

    const handleStartClick = () => {
        if (selectedContinent) {
            onStartClick(selectedContinent);
            console.log(`the value is----${selectedContinent}`);
        } else {
            alert('Please select a continent to start guessing flags!');
        }
    };

    return (
        <div className="body card" >
            <div className="bgimg">
                <img src="\src\components\World countries flags stock illustration.jpeg" alt="background-img" />
            </div>
            <div className="outer-container">
                <p className="Theh1">Guess The Flag Game</p>
                <p className="select-text">Select a continent to start guessing flags!</p>
                <div className="container">
                    <div className="option-container">
                        <input
                            type="radio"
                            id="africa"
                            name="continent"
                            value="Africa"
                            onChange={() => setSelectedContinent('Africa')}
                        />
                        <label htmlFor="africa">Africa</label>

                        <input
                            type="radio"
                            id="asia"
                            name="continent"
                            value="Asia"
                            onChange={() => setSelectedContinent('Asia')}
                        />
                        <label htmlFor="asia">Asia</label>

                        <input
                            type="radio"
                            id="europe"
                            name="continent"
                            value="Europe"
                            onChange={() => setSelectedContinent('Europe')}
                        />
                        <label htmlFor="europe">Europe</label>

                        <input
                            type="radio"
                            id="north-america"
                            name="continent"
                            value="North America"
                            onChange={() => setSelectedContinent('North America')}
                        />
                        <label htmlFor="north-america">North America</label>

                        <input
                            type="radio"
                            id="south-america"
                            name="continent"
                            value="South America"
                            onChange={() => setSelectedContinent('South America')}
                        />
                        <label htmlFor="south-america">South America</label>

                        <input
                            type="radio"
                            id="australia"
                            name="continent"
                            value="Australia"
                            onChange={() => setSelectedContinent('Australia')}
                        />
                        <label for="australia">Australia</label>
                       
                    </div>
                </div>
                <button className="startbtn" onClick={handleStartClick}>
                    Start
                </button>
                {/* <p className='question-text'>20 Questions Each Continent</p> */}
            </div>
        </div>
    );
}

export default InitialFlagContainer;
