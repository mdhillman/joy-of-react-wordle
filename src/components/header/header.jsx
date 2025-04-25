import {GAME_TITLE} from "../../constants";
import * as styles from "./header.module.css";

function Header({ onInfoClick }) {
    return (
        <header className={styles.header}>
            <h1>{GAME_TITLE}</h1>
            <span className={`material-symbols-outlined ${styles.info}`} onClick={onInfoClick}>
                info
            </span>
        </header>
    );
}

export default Header;