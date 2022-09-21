import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import Button from '../form/Button'

import { useEffect, useState } from 'react'

function ProjectForm({btnText , handleSubmit , projectData}){

    const [category , setCategory] = useState([])
    const [project , setProject] = useState(projectData || {})

    const inserirProjeto = (e) => {         
        /* 
           Para inserir o projeto usamos um Metôdo que virá atravez do componente pai pela PROP 'handleSubmit'
           Este metodo possui um parâmetro que será a constante PROJECT. O projeto por sua vez, será inserido atravez de POST com fetch API *Para identificar os mecanismos de incersão, verifique o metodo passado no componente /NewProject
        */
        e.preventDefault()
        handleSubmit(project) 
    }

    function handleChange(e){
        //Este metodo inseri o atributo name e orcamento ao objeto PROJECT 
        setProject({ ...project, [e.target.name]: e.target.value})
    }

    function handleCategory(e){
        //Este metodo inseri o atributo category dentro do objeto PROJECT *category é um objeto que ficará dentro de outro objeto
        setProject({ ...project,
                category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text}
                })
        console.log(project)
    }

    //Abaixo, o mecanismo para busca das categorias contidas no servidor ficticio atravez do metodo FETCH

    useEffect(() => {
        fetch("http://localhost:5000/Category" , {
            method: 'GET',
            headers: {
                'Content-Type':'Application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => setCategory(data))
        .catch(error => console.log(error)) 
    } , [])
    

    return(
        <form className={styles.projectForm} onSubmit={inserirProjeto}>
            <Input 
                textLabel="Nome do Projeto:" 
                type="text" 
                idName="nome" 
                placeholder="Insira o nome do seu projeto" 
                value= {project.nome ? project.nome : ''}
                handleOnChange={handleChange}
            />
            <Input 
                textLabel="Orçamento:" 
                type="number" 
                idName="orcamento" 
                placeholder="Insira o orçamento total" 
                value= {project.orcamento ? project.orcamento : ''}
                handleOnChange={handleChange}
            />
            <Select 
                labelText="Categoria:" 
                idName="categoria" 
                options={category} 
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <Button 
                textButton={btnText} 
                custonButom='custonButom'
            />            
        </form>
    )
}

export default ProjectForm
