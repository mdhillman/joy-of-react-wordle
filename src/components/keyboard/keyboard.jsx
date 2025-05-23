import styles from "./keyboard.module.css";
import { useEffect, useState } from "react";
import { range } from "../../utils";

// Custom layout
const LAYOUT = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["⏎", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

// What keys codes are detected
const ALLOWED_KEYS = [13, 8, 46, ...range(65, 91)];

/**
 * Custom keyboard component
 *
 * @param onPress callback for key press event
 */
function Keyboard({ onPress }) {
    const [activeButtons, setActiveButtons] = useState([]);

    const keyHandler = (e) => {
        if (!onPress) return;
        if (!ALLOWED_KEYS.includes(e.keyCode)) return;

        const key = e.key.toUpperCase();
        if (!activeButtons.includes(key)) {
            setActiveButtons((prev) => [...prev, key]);
        }
        onPress(key);
    };

    useEffect(() => {
        document.addEventListener("keyup", keyHandler, false);
        return () => document.removeEventListener("keyup", keyHandler, false);
    });

    useEffect(() => {
        const interval = setTimeout(() => {
            if (activeButtons.length > 0) {
                setActiveButtons((prev) => prev.slice(1));
            }
        }, 100);
    }, [activeButtons]);

    return (
        <div className={styles.container}>
            {LAYOUT.map((row, i) => {
                return (
                    <div key={`keyboard-row-${i}`} className={styles.row}>
                        {row.map((key) => {
                            let classNames = styles.button;
                            if (activeButtons.includes(key)) classNames += " active";

                            return (
                                <button
                                    key={`keyboard-button-${key}`}
                                    className={classNames}
                                    onClick={() => onPress(key)}
                                >
                                    {key}
                                </button>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default Keyboard;
