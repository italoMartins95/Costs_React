import { Link } from 'react-router-dom'
import { BsPencil , BsFillTrashFill } from 'react-icons/bs'
import styles from './ProjectCard.module.css'

function ProjectCard({id , nome , budget , category , handleRemove}){

    const remove = () => handleRemove(id) // -> a constante remove representa uma função anônima que passa o id como parâmetro para o elemento pai

    //->IMPORTANTE: A propriedade 'to', do Link do JSX abaixo, contem uma template Sstring com o id do projeto que será editado usando o componente Projeto.
    return(
        <article className={styles.cards} id={id}>
            <h4>{nome}</h4>
            <p>
                <span>Orçamento: </span> R${budget}
            </p>
            <p className={styles.categoryText}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div>
                <Link to={`/Projeto/${id}`} className={styles.a}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    Remover <BsFillTrashFill />
                </button>
            </div>
        </article>
    )
}

export default ProjectCard