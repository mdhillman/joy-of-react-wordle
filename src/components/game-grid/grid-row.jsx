import styles from './grid-row.module.css';
import GridCell from "./grid-cell";

/**
 * Single row of the game grid
 *
 * @param active is this the active row
 * @param guess guess for this row
 * @param target target word
 * @param error is there an error
 */
function GridRow({active, guess, target, error}) {
    if(guess == null) return null;

    let classNames = styles.row;
    if(error) classNames += ` ${styles.error}`;

    return (
        <div className={classNames}>
            {guess.split('').map((char, i) => {
                let matchType = 'none';
                if(target.includes(char)) matchType = 'partial';
                if(target.charAt(i) === char) matchType = 'exact';
                
                return (
                    <GridCell key={`grid-cell-${i}`} active={active} character={char} matchType={matchType} />
                );
            })}
        </div>
    )
}
export default GridRow;