import styles from './Input.module.css'
import PropTypes from 'prop-types'

function Input({type , textLabel , placeholder , idName , handleOnChange , value}){
    return(
        <div className={styles.Form_Control}> 
            <label htmlFor={idName}>
                {textLabel}
            </label>  
            <input 
                type={type} 
                placeholder={placeholder} 
                id={idName} 
                name={idName}
                onChange={handleOnChange}
                value={value}
            />
        </div>
    )
}

export default Input