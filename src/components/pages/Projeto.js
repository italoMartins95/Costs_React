import styles from './Projeto.module.css'

import { parse , v4 as uuidv4 } from 'uuid'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom' //-> Esse hook "captura" o id do projeto passado como parâmetro atravez da URL no componente ProjectCard por meio do react-router-dom

import Conteiner from '../layout/Conteiner'
import ServiceCard from '../projects/ServiceCard'
import ProjectForm from '../projects/ProjectForm'
import ServiceForm from '../projects/ServiceForm'

import Message from '../layout/Message'
import Loading from '../layout/Loading'
import Button from '../form/Button'


function Projeto(){

    const {id} = useParams() //-> Essa constante recebe o id vindo do hook useParams()

    const [project , setProject] = useState([]) //-> Essa constante representa o objeto PROJECT buscado pelo useEffect() abaixo

    const [showProjectForm , setShowProjectForm] = useState(false) //-> Constante usada para fins de visualização de formulario de edição do objeto PROJECT

    const [showServiceForm , setShowServiceForm] = useState(false) //-> Constante usada para fins de visualização de formulario de edição dos serviços do projeto selecionado

    const [message , setMessage] = useState()
    const [typeMessage , setTypeMessage] = useState()

    useEffect(() => {
        /*
            Aqui o useEffect está buscando um projeto especifico, de acordo com o id recebido via react-router-dom (useParams())
            Usamos o setTimeout para simular o tempo de espera de 300ms referente a comunicação com o servidor
        */
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}` , {
            method: 'GET',
            headers: {
                    'Content-Type':'application/json'
            }})
            .then(response => response.json())
            .then(data => setProject(data)) //-> Aqui o objeto vindo via fetch é inserido na constante Project
            .catch(error => console.log(error))
        } , 300)        
    } , [id])


    function editProject(project){
        setMessage('')
        //Budget validation
        if(project.cost > project.orcamento){
            setMessage('O orçamento não pode ser menor que os custos envolvidos no projeto!')
            setTypeMessage('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}` , {
        method: 'PATCH' ,
        headers: {
            'Content-type':'Application/json'
        },
        body: JSON.stringify(project)})
        .then(response => response.json())
        .then(data => {
            setProject(data)
            setShowProjectForm(!showProjectForm)
            setMessage('Projeto atualizado!')
            setTypeMessage('sucess')
        })
        .catch(erro => console.log(erro))    
    }

    function toggleProjectForm(){
        //-> Essa função é responsavel por fazer alteração de visibilidade do formulário de edição do projeto.
        setShowProjectForm(!showProjectForm) 
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm) 
    }

    function createService(project){
        setMessage('')

        const lastService = project.services[project.services.length -1] //-> Retorna o objeto correspondente ao ultimo serviço que acaba de ser inserido no projeto
            lastService.id = uuidv4() //-> Inseri um id ao serviço

        const lastServiceValor = lastService.valor // -> Retorna o valor do ultimo serviço inserido

        const newCostProject = parseFloat(project.cost) + parseFloat(lastServiceValor)//-> Retorna o custo que o projeto já tinha + o custo do serviço que acaba de ser adicionado

        //Abaixo, temos uma validação que verifica se o custo do projeto vai estourar o orçamento

        if(newCostProject > parseFloat(project.orcamento)){
            setMessage('O valor do serviço ultrapassa o orçamento!')
            setTypeMessage('error')
            project.services.pop()
            return false
        }

        project.cost = newCostProject

        fetch(`http://localhost:5000/projects/${project.id}` , {
            method: 'PATCH' ,
            headers: {
                'Content-type':'Application/json'
            },
            body: JSON.stringify(project)})
            .then(response => response.json())
            .then(data => {
                setProject(data)
                setShowServiceForm(!showServiceForm)
                setMessage('Projeto atualizado!')
                setTypeMessage('sucess')
            })
            .catch(erro => console.log(erro))
        
    }

    function removeService(id , valor){
        setMessage('')

        const updateSevices = project.services.filter(
            service => service.id !== id
        )
        const updateProject = project        
        
        updateProject.services = updateSevices
        
        updateProject.cost -= parseInt(valor)

        
        fetch(`http://localhost:5000/projects/${updateProject.id}` , {
            method: 'PATCH' ,
            headers: {
                'Content-type':'Application/json'
            },
            body: JSON.stringify(updateProject)})
            .then(response => response.json())
            .then(data => {
                setProject(data)                
                setMessage('Projeto atualizado!')
                setTypeMessage('sucess')
            })
            .catch(erro => console.log(erro))
    }

    return(
        <>
            { project.nome ? (
                <div className={styles.project_details}>
                    <Conteiner customClass='collum'>
                        {message && <Message type={typeMessage} msg={message}/>}
                        <div className={styles.details_conteiner}>
                            <h1>Projeto: {project.nome}</h1>
                            <Button 
                            textButton={!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                            clickButton={toggleProjectForm}
                            />
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria: </span>{project.category.name}
                                </p>
                                <p>
                                    <span>Orçamento: </span> R$ {project.orcamento}
                                </p>
                                <p>
                                    <span>Total ultilizado: </span> R$ {project.cost}
                                </p>
                            </div>
                            ) : (
                            <div className={styles.project_info}>
                                <ProjectForm 
                                projectData={project}
                                handleSubmit={editProject}
                                btnText='Concluir edição'/>
                            </div>
                        )}
                        </div>
                        <div className={styles.details_form_conteiner}>
                                <h2>Serviços</h2>
                                <Button 
                                textButton={!showServiceForm ? 'Novo Serviço' : 'Fechar'}
                                clickButton={toggleServiceForm}
                                />
                                <div className={styles.project_info}>
                                    {showServiceForm ? (
                                    <ServiceForm 
                                    textBtn='Adicionar'
                                    projectData={project}
                                    handleSubmit={createService}
                                    />
                                    ) : (        
                                    <Conteiner customClass='start'>
                                        { project.services.length > 0 &&
                                            project.services.map(service => {
                                               return <ServiceCard
                                                nome={service.nome}
                                                valor={service.valor}
                                                descricao={service.descricao}
                                                handleRemove={removeService}
                                                key={service.id}
                                                id={service.id}/>
                                            })
                                        }                                        
                                    </Conteiner>
                                    )}
                                </div>
                        </div>
                    </Conteiner>
                </div>) : (             
                <Loading />
            )}
        </>
    )
}

export default Projeto