import styles from './Home.module.css'
import LinkButton from '../layout/LinkButton'
import imgHome from '../../img/imgHome.svg'

function Home(){
    return(
        <section className={styles.section}>
            <h1>Bem vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            <LinkButton 
                textButton="Criar Projeto" 
                to="/NewProject"
            />
            <img src={imgHome} alt="imgHome"/>
        </section>
    )
}

export default Home