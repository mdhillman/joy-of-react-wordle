import * as styles from "./game.module.css";
import Header from "../header/header";
import {useCallback, useRef, useState} from "react";
import Modal from "../modal/modal";
import Grid from "../game-grid/grid";
import Keyboard from "../keyboard/keyboard";
import {ALLOWED_WORDS} from "../../word-list";
import {GUESSES_ALLOWED} from "../../constants";
import ConfettiExplosion from 'react-confetti-explosion';

const TARGET_WORD = ALLOWED_WORDS[Math.floor(Math.random() * ALLOWED_WORDS.length)].toUpperCase();
console.log("The target word is below, but it's a secret!");
console.log(TARGET_WORD);

/**
 * Top level component to load UI.
 */
function Game() {
    const [guesses, setGuesses] = useState([]); // Submitted guesses
    const [pendingGuess, setPendingGuess] = useState('');   // Content of pending guess
    const [gameEnded, setGameEnded] = useState(null);   // Has the game ended?
    const [pendingError, setPendingError] = useState(null); // Is there a pending error
    const [infoVisible, setInfoVisible] = useState(false);   // Is info modal visible?
    const [isExploding, setIsExploding] = useState(false);

    const googleLink = `http://www.google.com/search?ie=UTF-8&q=${TARGET_WORD}+meaning`;

    const onKeyPress = (key) => {
        if(infoVisible) return;

        if(key === 'ENTER' || key === '⏎'){
            addGuess();
        } else if(key === 'DELETE' || key === 'BACKSPACE' || key === '⌫') {
            setPendingGuess(prev => prev.substring(0, prev.length - 1));
        } else if(pendingGuess.length < 5) {
            setPendingGuess(prev => prev.concat(key));
        }
    };

    const addGuess = () => {
        if(pendingGuess.trim().length < 5) return;

        if(pendingGuess === TARGET_WORD) {
            setGameEnded(true);
            setIsExploding(true);
        } else if(!ALLOWED_WORDS.includes(pendingGuess.toLowerCase())){
            showError('Guess is not in the list of allowed words');
        } else if(guesses.includes(pendingGuess)){
            showError('This word has already been guessed');
        } else {
            setGuesses(prev => [...prev, pendingGuess]);
            setPendingGuess('');

            if(guesses.length === GUESSES_ALLOWED - 1){
                setGameEnded(false);
            }
        }
    };

    const showError = (message) => {
        setPendingError(message);
        setTimeout(() => {
            setPendingError(null)
        }, 2000);
    }

    return (
        <div className={styles.wrapper}>

            {/* Title content */}
            <Header onInfoClick={() => setInfoVisible(true)}/>

            {/* Information modal */}
            {infoVisible && (
                <Modal setVisibility={setInfoVisible}/>
            )}

            {/* Game grid */}
            <Grid
                guesses={guesses}
                pendingGuess={pendingGuess}
                gameEnded={gameEnded}
                pendingError={pendingError}
                target={TARGET_WORD}/>

            {/* Information text */}
            <span className={styles.error}>{pendingError}</span>
            {gameEnded && (
                <span className={styles.success}>
                    You've completed this edition of <span style={{fontFamily: '"Bokor", system-ui'}}>Legally Distinct Word</span> game, congratulations!
                </span>
            )}
            {gameEnded === false && (
                <span className={styles.error}>
                    You're out of guesses, the word was <a href={googleLink} target="_blank">{TARGET_WORD}</a>. Refresh and try again!
                </span>
            )}

            {/* Keyboard controls */}
            <div className={styles.keyboard}>
                <Keyboard onPress={infoVisible ? null : onKeyPress}/>
            </div>

            {isExploding && <ConfettiExplosion
                className={styles.confetti}
                force={0.66}
                duration={2000}
                particleCount={200}
                width={window.innerWidth}
            />}

        </div>
    );
}

export default Game;