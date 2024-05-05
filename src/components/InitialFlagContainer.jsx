// InitialFlagContainer.jsx
import React from 'react';
import './InitialFlagContainer.css';

function InitialFlagContainer({ onStartClick }) {
    return (
        <>
            <div className="card">
                <div className="img-container">
                    <img src="\src\components\pk.png" alt="Pakistan Flag" />
                    <div className="outer-container">
                        <p className="Theh1">Guess The Flag</p>
                        <button className="startbtn" onClick={onStartClick}>
                            Start
                        </button>{' '}
                        {/* Call onStartClick when button clicked */}
                        <p className="p-text">20 Questions</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InitialFlagContainer;
