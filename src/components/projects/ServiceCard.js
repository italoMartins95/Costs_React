import styles from '../projects/ProjectCard.module.css'

import { BsFillTrashFill } from 'react-icons/bs'

function ServiceCard({ id , nome , valor , descricao , handleRemove}){

    const remove = (e) => {
        e.preventDefault()
        handleRemove( id , valor)
    }

    return( 
        <form className={styles.cards}>
            <h4>{nome}</h4>
            <p>
                <span>Valor:</span> R$ {valor}
            </p>
            <p>
                <span>Descrição:</span> {descricao}
            </p>
            <div>
                <button onClick={remove}>
                        Remover <BsFillTrashFill />
                </button>
            </div>            
        </form>
    )
}

export default ServiceCard