import React, { useState, useEffect } from 'react';
import './GuessCard.css';

// Import flag images
import pkImage from './flag-images/country-flags-main/png1000px/pk.png';
import phImage from './flag-images/country-flags-main/png1000px/ph.png';
import psImage from './flag-images/country-flags-main/png1000px/ps.png';
import nzImage from './flag-images/country-flags-main/png1000px/nz.png';
/////////
import arImage from './flag-images/country-flags-main/png1000px/ar.png';
import yeImage from './flag-images/country-flags-main/png1000px/ye.png';
import bdImage from './flag-images/country-flags-main/png1000px/bd.png';
import brImage from './flag-images/country-flags-main/png1000px/br.png';
////////
import esImage from './flag-images/country-flags-main/png1000px/es.png';
import gbImage from './flag-images/country-flags-main/png1000px/gb.png';
import inImage from './flag-images/country-flags-main/png1000px/in.png';
import itImage from './flag-images/country-flags-main/png1000px/it.png';
////////
import jpImage from './flag-images/country-flags-main/png1000px/jp.png';
import cnImage from './flag-images/country-flags-main/png1000px/cn.png';
import ruImage from './flag-images/country-flags-main/png1000px/ru.png';
import myImage from './flag-images/country-flags-main/png1000px/my.png';

function GuessCard({ onGameFinish }) {
    // Accept onGameFinish as a prop
    const [flags, setFlags] = useState([
        { country: 'Pakistan', image: pkImage }, // Use imported image files
        { country: 'New Zealand', image: nzImage },
        { country: 'Philippines', image: phImage },
        { country: 'Palastine', image: psImage },
        // Add more flag data as needed
        { country: 'Argentina', image: arImage },
        { country: 'Yemen', image: yeImage },
        { country: 'Bangladesh', image: bdImage },
        { country: 'Brazil', image: brImage },
        /////////
        { country: 'Spain', image: esImage },
        { country: 'Britain', image: gbImage },
        { country: 'India', image: inImage },
        { country: 'Italy', image: itImage },
        //////
        { country: 'Japan', image: jpImage },
        { country: 'China', image: cnImage },
        { country: 'Russia', image: ruImage },
        { country: 'Malaysia', image: myImage },
        // Add more flag data as needed
    ]);
    const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
    const [options, setOptions] = useState([]);
    const [correctGuesses, setCorrectGuesses] = useState(0);
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        const shuffledFlags = [...flags].sort(() => Math.random() - 0.5); // Shuffle flags
        setFlags(shuffledFlags);
    }, []); // Run only once when component mounts

    useEffect(() => {
        const selectRandomFlag = () => {
            const selectedFlag = flags[currentFlagIndex];
            if (!selectedFlag) return;

            const correctOption = selectedFlag.country;
            const incorrectOptions = flags
                .filter((flag) => flag.country !== correctOption)
                .map((flag) => flag.country)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);
            const allOptions = [...incorrectOptions, correctOption].sort(() => Math.random() - 0.5);
            setOptions(allOptions);
        };

        if (currentFlagIndex < flags.length) {
            selectRandomFlag();
        } else {
            console.log('Game over!');
        }
    }, [flags, currentFlagIndex]);

    const handleOptionClick = (selectedOption) => {
        const isCorrect = selectedOption === flags[currentFlagIndex]?.country;
        const selectedOptionElement = document.querySelector(`.grid-item[data-option="${selectedOption}"]`);

        if (isCorrect) {
            console.log('Correct answer!');

            setCorrectGuesses((prevCount) => prevCount + 1);
            setTotalScore((prevScore) => prevScore + 1);
        } else {
            console.log('Incorrect answer!');
        }

        // Update the CSS class of the selected option
        const updatedOptions = options.map((option) => {
            if (option === selectedOption) {
                return isCorrect ? 'correct' : 'incorrect';
            } else {
                return '';
            }
        });

        setOptions(updatedOptions);
    };

    const handleNextClick = () => {
        setCurrentFlagIndex((prevIndex) => prevIndex + 1);
        if (currentFlagIndex === flags.length - 1) {
            onGameFinish(totalScore, correctGuesses); // Pass totalScore and correctGuesses to onGameFinish
        }
    };

    return (
        <div className="cardd">
            <p className="nameflag">Name That Flag!</p>
            <div className="img-container">
                {flags[currentFlagIndex] && <img src={flags[currentFlagIndex].image} alt={flags[currentFlagIndex].country} />}
            </div>
            <div className="grid-container">
                {options.map((option, index) => (
                    <div key={index} className="grid-item" onClick={() => handleOptionClick(option)}>
                        {option}
                    </div>
                ))}
            </div>
            <button className="nextbtn" onClick={handleNextClick}>
                Next
            </button>
        </div>
    );
}

export default GuessCard;
