import * as styles from './modal.module.css';

function Modal({ title, content }) {
    return (
        <div className={styles.modal}>
            <span className={`${styles.close} material-symbols-outlined`}>
                close
            </span>
            {title && (
                <h2>{title}</h2>
            )}
            <p>{content}</p>
        </div>);
}

export default Modal;