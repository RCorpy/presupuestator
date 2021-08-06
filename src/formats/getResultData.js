
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
        },
        gPerM2: 0,
    }

    //preparacion de datos y variables para el calculo

    const denominadorKgsResina = TAMAÑOS_DE_RESINA[mainData.resina]

    const totalKgForKitsPorCapa = (mainData.m2 * GRAMOS_POR_CAPA / 1000) % denominadorKgsResina > 1 ? 
        (mainData.m2 * GRAMOS_POR_CAPA / GRAMOS_EN_UN_KG) - (mainData.m2 * GRAMOS_POR_CAPA / GRAMOS_EN_UN_KG) % denominadorKgsResina + denominadorKgsResina :
        (mainData.m2 * GRAMOS_POR_CAPA / GRAMOS_EN_UN_KG) - (mainData.m2 * GRAMOS_POR_CAPA / GRAMOS_EN_UN_KG) % denominadorKgsResina

    const [imprimacion, capas] = mainData.capas.split("")

    result.imprimacion.sizeOfKits = [denominadorKgsResina, denominadorKgsResina*2, denominadorKgsResina*3, denominadorKgsResina*4, denominadorKgsResina*5]
    result.capas.sizeOfKits = [denominadorKgsResina, denominadorKgsResina*2, denominadorKgsResina*3, denominadorKgsResina*4, denominadorKgsResina*5]

    result.gPerM2 = totalKgForKitsPorCapa/mainData.m2 * GRAMOS_EN_UN_KG

    // fin de preparacion

    //Calculo de los kits

    let returnArray = [0,0,0,0,0]

    const calcularKits = (layers) => {
        
        let totalKgs = totalKgForKitsPorCapa*layers - denominadorKgsResina*5*returnArray[4]

        if(totalKgs==0){
            return returnArray
        }
        if(result.capas.sizeOfKits[4] > totalKgs){
            let positionInTheArray = totalKgs / denominadorKgsResina
            returnArray[positionInTheArray] = returnArray[positionInTheArray]+1
        }
        //probando aun (mejor mandar 2 o 3 kits de 18 o 24 que varios de 30 y alguno de 6)

        else if(returnArray[4]===0 &&
            (totalKgs % (denominadorKgsResina*3)===0 || totalKgs % (denominadorKgsResina*4) ===0) &&
            totalKgs % (denominadorKgsResina*5) !=0){
                if(totalKgs % (denominadorKgsResina*4) ===0){return [0,0,0,totalKgs/(denominadorKgsResina*4),0]}
                else{return [0,0,totalKgs/(denominadorKgsResina*3),0,0]}
        }
        //fin de pruebas
        else{
            returnArray[4] = returnArray[4]+1
            calcularKits(layers)
        }

        return returnArray
    }

    if(imprimacion){
        returnArray = [0,0,0,0,0]
        result.imprimacion.amountOfKits = calcularKits(imprimacion)
    }

    if(capas){
        returnArray = [0,0,0,0,0]
        result.capas.amountOfKits = calcularKits(capas)

    }

    //fin de calculo de kits
    console.log("gotten result: ", result)
    setResult(result)
}

export const modifyResultData = (result, subData)=>{
    console.log("updated result data")
}