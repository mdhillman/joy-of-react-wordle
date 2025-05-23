import styles from "./modal.module.css";
import {GUESSES_ALLOWED} from "../../constants";
import sampleImageDark from "./sample-dark.png";
import sampleImageLight from "./sample-light.png";

/**
 * Information modal.
 *
 * @param setVisibility callback to update modal visibility
 */
function Modal({setVisibility}) {
    let sampleImage = sampleImageLight;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        sampleImage = sampleImageDark
    }

    return (
        <dialog className={styles.dialog} onClick={() => {setVisibility(false)}}>

            {/* Modal element */}
            <div className={styles.modal}>

                {/* Header content */}
                <div className={styles.header}>
                    <h1>How to play</h1>
                    <div className={styles.close} onClick={() => {setVisibility(false)}}>
                        <span className={'material-symbols-outlined'}>
                            close
                        </span>
                    </div>
                </div>

                {/* Main modal content */}
                <p>
                    Guess the target word within {GUESSES_ALLOWED} tries.
                </p>
                <ul>
                    <li>Each guess must be a valid 5 letter word.</li>
                    <li>The color of each individual tile will change to show how close your guess was to the target word:
                        <ul>
                            <li>Gray tiles denote a character that does not appear in the target word.</li>
                            <li>Yellow tiles denote a character that does appear in the target word, but not at the guessed position.</li>
                            <li>Green tiles denote a character that does appear in the target word, and is in the correct position.</li>
                        </ul>
                    </li>
                </ul>

                <img src={sampleImage} alt='sample-image'/>

                <p>
                    This game was created by Michael Hillman as an exercise within the <a href="https://courses.joshwcomeau.com/joy-of-react/" target="_blank" rel="noreferrer">Joy of React course</a>,
                    you can see the source code for it on GitHub <a href="https://github.com/mdhillman/joy-of-react-wordle" target="_blank" rel="noreferrer">here</a>.
                </p>
            </div>
        </dialog>
    );
}

export default Modal;
