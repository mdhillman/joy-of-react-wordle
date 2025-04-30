import * as styles from './grid-cell.module.css';

/**
 * Component for a single grid cell.
 *
 * @param active is this an active row
 * @param character character to display
 * @param matchType type of character match
 */
function GridCell({active, character, matchType}) {
    let cellColor = ''

    if(!active) {
        if(character) {
            cellColor = styles.none;
        }

        if (matchType === 'partial') {
            cellColor = styles.partial;
        } else if (matchType === 'exact') {
            cellColor = styles.exact;
        }
    }

    const activeClass = active ? styles.active : '';

    return (
        <div className={`${styles.cell} ${cellColor} ${activeClass}`}>
            {character}
        </div>
    )
}

export default GridCell;