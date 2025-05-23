import styles from "./clipboard-button.module.css";

const EXACT_EMOJI = '🟩';
const PARTIAL_EMOJI = '🟨';
const MISSING_EMOJI = '⬛';

/**
 * Button to copy result to clipboard.
 *
 * @param guesses user submitted guesses.
 * @param target target word.
 */
function ClipboardButton({guesses, target}) {

    const copyToClipboard = () => {
        let message = `I completed the Legally Distinct Word Game in ${guesses.length + 1} guesses!`;
        message += `\n`;

        guesses.forEach(guess => {
            for(let i = 0; i < guess.length; i++) {
                const targetChar = target.charAt(i);
                const guessChart = guess.charAt(i);

                if(guessChart === targetChar) {
                    message += EXACT_EMOJI;
                } else if(target.includes(guessChart)) {
                    message += PARTIAL_EMOJI;
                } else {
                    message += MISSING_EMOJI;
                }
                message += ' ';
            }
            message += `\n`;
        });

        navigator.clipboard.writeText(message);
    }

    return (
        <button className={styles.button} onClick={copyToClipboard}>
            Copy result to clipboard
        </button>
    );
}

export default ClipboardButton;