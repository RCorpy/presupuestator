
const GRAMOS_POR_CAPA = 150
const GRAMOS_EN_UN_KG = 1000

const TAMAÑOS_DE_RESINA = {
    "epoxy brillo": 6,
    "epoxy mate":5.5,
    "acrilica": 5,
    "politop": 5
}


export const getResultData = (setResult, mainData) => {
    let result = {
        imprimacion: {
            amountOfKits: [0,0,0,0,0],
            sizeOfKits: [5,10,15,20,25],
        },
        capas: {
            amountOfKits: [0,0,0,0,0],
            sizeOfKits: [5,10,15,20,25],
        }
    }

    const totalKgForKits = (mainData.m2 * GRAMOS_POR_CAPA / 1000) % TAMAÑOS_DE_RESINA[mainData.resina] > 1 ? 
        (mainData.m2 * GRAMOS_POR_CAPA / GRAMOS_EN_UN_KG) - (mainData.m2 * GRAMOS_POR_CAPA / GRAMOS_EN_UN_KG) % TAMAÑOS_DE_RESINA[mainData.resina] + TAMAÑOS_DE_RESINA[mainData.resina] :
        (mainData.m2 * GRAMOS_POR_CAPA / GRAMOS_EN_UN_KG) - (mainData.m2 * GRAMOS_POR_CAPA / GRAMOS_EN_UN_KG) % TAMAÑOS_DE_RESINA[mainData.resina]

    console.log(totalKgForKits, "gramos por capa: ", totalKgForKits/mainData.m2 * GRAMOS_EN_UN_KG)

    console.log("gotten result: ", result)
    setResult(result)
}

export const modifyResultData = (result, subData)=>{
    console.log("updated result data")
}