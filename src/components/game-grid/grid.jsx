import styles from "./grid.module.css";
import GridRow from "./grid-row";
import {GUESSES_ALLOWED} from "../../constants";

/**
 * Component for grid of guesses
 *
 * @param guesses list of already guessed words
 * @param pendingGuess guess not yet submitted
 * @param gameEnded has the game ended
 * @param pendingError is there a pending error
 * @param target target word
 */
function Grid({guesses, pendingGuess, gameEnded, pendingError, target}) {

    const getGuessForRow = (row) => {
        if(row < guesses.length){
            return guesses[row];
        } else if(row === guesses.length){
            return pendingGuess.padEnd(5, ' ');
        }
        return '     ';
    };

    return (
        <div className={styles.wrapper}>
            {[...Array(GUESSES_ALLOWED).keys()].map((_, i) => {
                const isActive = gameEnded === null && i === guesses.length;
                const isError = isActive && pendingError != null;

                return (
                    <GridRow
                        key={`grid-row-${i}`}
                        active={isActive}
                        guess={getGuessForRow(i)}
                        target={target}
                        error={isError}/>
                    );
            })}
        </div>
    );
}
export default Grid;