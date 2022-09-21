import { useLocation } from 'react-router-dom'
import styles from './Projetos.module.css'

import Message from '../layout/Message'
import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'
import Conteiner from '../layout/Conteiner'
import ProjectCard from '../projects/ProjectCard'

import { useState , useEffect} from 'react'

function Projetos(){

    const [projects , setProjects] = useState([]) 

    const [loading , setLoading] = useState(true) //-> Constante utilizada para sinalizar que o cliente esta buscando conecção com o servidor, até que o fecth consiga retornar a lista de projetos.
    const [messageDelete , setMessageDelete] = useState('') //-> Constante utilizada para sinalizar ao usuário o sucesso da execução do metodo removeProject()

    const location = useLocation()
    let mensagem = ''

    if(location.state){
        mensagem = location.state.message
    }

    /*
        O useEffect abaixo tem como objetivo conectar-se ao servidor, buscando os projetos cadastrados e listando os mesmos no Array Projects. Nesse caso, o fetch foi colocado dentro de um setTimeout com o objetivo de criar um 'delay' para que o componente Loading possa aparecer num intervalo de 300ms
    */
    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/projects" , {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json'
                }})
                .then(response => response.json())
                .then(data => {
                    setProjects(data) 
                    setLoading(false) //-> Encerra o loading, removendo o componente da tela.
                    console.log(data)
                })
                .catch(error => console.log(error))
        } , 300)
    } , [])

    function removeProject(id){
        /*
            Este mettodo conecta-se ao servidor com o objetivo de deletar o projeto selecionado. Em seguida se faz necessário atualizar a lista de projetos desatualizada nesta página, por isso após a execução do DELETE usamos o setProjects para redefinir a lista de projetos da página.
        */
        fetch(`http://localhost:5000/projects/${id}` , {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json'
            }})
            .then(response => response.json())
            .then(() => {
                setProjects(projects.filter((project) =>
                    project.id != id))
                setMessageDelete(`Projeto deletado com sucesso!`)
            })
            .catch(error => console.log(error))
    }

    return(
        <section className={styles.projects}>
            <div className={styles.titleProjects}>
                <h1>Meus projetos</h1>
                <LinkButton textButton="Novo Projeto" to="/NewProject"/>
            </div>            
            { mensagem && ( <Message type="sucess" msg={mensagem}/> )}
            { messageDelete && (<Message type="sucess" msg={messageDelete}/>)}
            <Conteiner customClass="start">
               { loading && <Loading /> }
               {
                   projects.length > 0 ? (
                   projects.map(project => (
                       <ProjectCard 
                        id={project.id} 
                        nome={project.nome} 
                        budget={project.orcamento} 
                        category={project.category.name}
                        key={project.id} 
                        handleRemove={removeProject}/>
                   ))):(
                       <p>Crie um novo projeto...</p>
                   )
               }
            </Conteiner>
        </section>
    )
}

export default Projetos