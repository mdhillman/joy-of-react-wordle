import * as styles from './app.module.css';
import Header from "../header/header";
import {useState} from "react";
import Modal from "../modal/modal";

function App() {
    const [infoVisible, setInfoVisible] = useState(false);

    return (
        <div className={styles.wrapper}>
            <Header onInfoClick={() => setInfoVisible(true)}/>

            {infoVisible && (
                <Modal title="Hello" content="Some words here"/>
            )}
            <p>{infoVisible.toString()}</p>
        </div>
    );
}

export default App;