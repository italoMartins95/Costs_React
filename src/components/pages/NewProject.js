import styles from './NewProject.module.css'
import ProjectForm from '../projects/ProjectForm'

import { useNavigate } from 'react-router-dom'

function NewProject(){

    const history = useNavigate() //-> a constante history representa um objeto referente ao hook useNavegate() que será utilizado para enviar state para o componente pai

    function createPost(project){

        /*
           inicialização do Project que será incerido no banco:
           O projeto que vem do componente Filho 'PROJECTFORM' possue 3 atributos (nome , orçamento e category)
           Aqui vamos inserir mais dois atributos neste objeto antes de envia-lo para nosso banco.
        */

        project.cost = 0 
        project.services = [] 

        //Abaixo temos o mecanismo de inserção de dados em nosso banco atravez do metodo POST do protocolo HTTP

        fetch("http://localhost:5000/Projects", {
        method: 'POST',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify(project)})
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            //redirecionamento da pagina atravez do hook useNavegate
            history('/Projetos' , {state: {message: 'Projeto criado com sucesso'}})
        })
        .catch(error => console.log(error))
        
    }

    return(
        <section className={styles.newProject}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar serviços</p>
            <ProjectForm 
                btnText="Criar Projeto" 
                handleSubmit={createPost}
            />
        </section>
    )
}

export default NewProject
