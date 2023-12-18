export const createUserErrorMsg=(user)=>{
    return `
        Uno o mas campos son invalidos,
        listado de campos requeridos:
        name:Este campo es obligatorio y de tipo string, el dato recibido fue ${user.name},
        name:Este campo es obligatorio y de tipo string, el dato recibido fue ${user.lastname},
        email:Este campo es obligatorio y de tipo string, el dato recibido fue ${user.email},
    `

}

export const FindIdErrorMsg=(id)=>{
    return `
        El ID buscado no existe o no fue encontrado
        El ID ingresado fue ${id}
    `
}

export const productErrorMsg=(productId)=>{
    return `
        El producto no existe o ya no esta en stock
        Su producto ingresado fue ${productId}
    `
}