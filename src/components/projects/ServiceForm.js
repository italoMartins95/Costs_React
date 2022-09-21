import styles from './ProjectForm.module.css'
import {useState} from 'react'

import Input from '../form/Input'
import Button from '../form/Button'

function ServiceForm({textBtn , projectData , handleSubmit}){

    const [service , setService] = useState({})

    function handleOnChange(e){
        setService({ ...service, [e.target.name]: e.target.value })
    }

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    return(
        <form>
            <Input 
            textLabel='Serviço:'
            type='text'
            placeholder='Insira o nome do serviço'
            idName='nome'
            handleOnChange={handleOnChange}
            />
            <Input 
            textLabel='Valor:'
            type='number'
            placeholder='Insira o valor valor do serviço'
            idName='valor'
            handleOnChange={handleOnChange}
            />
            <Input 
            textLabel='Descrição:'
            type='text'
            placeholder='Descrição do serviço'
            idName='descricao'
            handleOnChange={handleOnChange}
            />
            <Button 
            textButton={textBtn}
            clickButton={submit}/>
        </form>
    )
}

export default ServiceForm