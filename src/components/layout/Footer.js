import styles from  './Footer.module.css'

import {BsLinkedin} from 'react-icons/bs'
import {AiFillGithub} from 'react-icons/ai'
import {BsInstagram} from 'react-icons/bs'

function Footer(){
    return(
        <footer>
            <ul className={styles.socialMedia}>
                <li>
                    <AiFillGithub />                
                </li>
                <li>
                    <BsInstagram />
                </li>
                <li>
                    <BsLinkedin />
                </li>
            </ul>
            <p><span>Costs</span> &copy; 2022</p>
        </footer>
    )
}

export default Footer