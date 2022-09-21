import { useState , useEffect } from 'react'

import styles from './Message.module.css'

function Message(props){

    const [visible , setVisible] = useState(false) //-> Contatne utilizada para determinar a visibildiade do componente Message

    useEffect(() => {

        // Este usseEffect verifica se a propriedade 'msg' é True ou False

        if(!props.msg){ //-> Em caso de não haver mensagem, a visibilidade será False
            setVisible(false)
            return
        }

        setVisible(true) //-> Define a visibilidade como True
             

        const timer = setTimeout(() => {
            setVisible(false)       //-> Essa constante é responsavel por remover a visibilidade em um intervalo de 2000ms
        } , 2000)

    } , [props.msg])


    return(
        // -> Abaixo, caso visible seja True o JSX retorna a mensagem passada pelo componente pai atravez da props msg
        <>
            {visible && ( <p className={`${styles.mensagem} ${styles[props.type]}`}>
                            {props.msg}
                          </p> )}
        </>
    )
}

export default Message