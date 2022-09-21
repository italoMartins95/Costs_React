import { Link } from "react-router-dom"
import styles from './LinkButton.module.css'

function LinkButton({to , textButton}){
    return(
        <Link to={to} className={styles.LinkButton}>
            {textButton}
        </Link>
    )
}

export default LinkButton