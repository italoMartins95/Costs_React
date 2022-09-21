import styles from './Button.module.css'
import PropTyper from 'prop-types'

function Button({textButton , clickButton , custonButom}){
    return(
        <button onClick={clickButton} className={`${styles.button} ${styles[custonButom]}`}>
            {textButton}
        </button>
    )
}

Button.propTypes = {
    textButton: PropTyper.string
}

Button.defaultProps = {
    textButton: 'button'
}

export default Button