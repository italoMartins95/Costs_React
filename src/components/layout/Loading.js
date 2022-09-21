import styles from './Loading.module.css'
import loader from '../../img/loading.svg'

function Loader(){
    return(
        <div className={styles.loader}>
            <img src={loader} alt="loading"/>
        </div>
    )
}

export default Loader