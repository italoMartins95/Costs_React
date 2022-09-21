import styles from './Header.module.css'
import {Link} from 'react-router-dom'
import costs_logo from '../../img/costs_logo.png'

function Header(){
    return(
        <nav className={styles.navBar}>
            <Link to="/">
                <img src={costs_logo} alt="logoCost" />
            </Link>
            <ul>
                <li>
                    <Link to="/" className={styles.Link}>Home</Link>
                </li>
                <li>
                    <Link to="/Projetos" className={styles.Link}>Projetos</Link>
                </li>
            </ul>
            <div className={styles.menuHamburguer}></div>
        </nav>
    )
}

export default Header