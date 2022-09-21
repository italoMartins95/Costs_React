import styles from './Select.module.css'

function Select({labelText , idName , options , handleOnChange , value}){
    return(
        <div className={styles.Select}>
            <label htmlFor={idName}>
                {labelText}
            </label>
            <select name={idName} id={idName} onChange={handleOnChange} value={value || ''}>
                <option>Selecione uma opção</option>
                {
                    options.map((opt) => (
                        <option value={opt.id} key={opt.id}>{opt.name}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default Select

