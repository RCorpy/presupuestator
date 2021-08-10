
const GRAMOS_POR_CAPA = 150
const GRAMOS_EN_UN_KG = 1000

const TAMAÑOS_DE_RESINA = {
    "epoxy brillo": 6,
    "epoxy mate":5.5,
    "acrilica": 5,
    "politop": 5
}


export const getResultData = (setResult, mainData, collapsableData) => {
    let result = {
        imprimacion: {
            amountOfKits: [0,0,0,0,0],
            sizeOfKits: [6,12,18,24,30],
        },
        capas: {
            amountOfKits: [0,0,0,0,0],
            sizeOfKits: [6,12,18,24,30],
        },
        gPerM2: {
            imprimacion: 0,
            capas: 0
        },
    }

    //preparacion de datos y variables para el calculo

    const denominadorKgsResina = TAMAÑOS_DE_RESINA[mainData.resina]

    //parece que va bien pero un ojo no esta de mas xD

    const totalKgForKitsPorCapa = (layers)=> (mainData.m2*layers * GRAMOS_POR_CAPA / GRAMOS_EN_UN_KG) % denominadorKgsResina > 1 ? 
        (mainData.m2*layers * GRAMOS_POR_CAPA / GRAMOS_EN_UN_KG) - (mainData.m2*layers * GRAMOS_POR_CAPA / GRAMOS_EN_UN_KG) % denominadorKgsResina + denominadorKgsResina :
        (mainData.m2*layers * GRAMOS_POR_CAPA / GRAMOS_EN_UN_KG) - (mainData.m2*layers * GRAMOS_POR_CAPA / GRAMOS_EN_UN_KG) % denominadorKgsResina

    const [imprimacion, capas] = mainData.capas.split("")

    result.imprimacion.sizeOfKits = [denominadorKgsResina, denominadorKgsResina*2, denominadorKgsResina*3, denominadorKgsResina*4, denominadorKgsResina*5]
    result.capas.sizeOfKits = [denominadorKgsResina, denominadorKgsResina*2, denominadorKgsResina*3, denominadorKgsResina*4, denominadorKgsResina*5]

    // fin de preparacion

    //Calculo de los kits

    let returnArray = [0,0,0,0,0]

    let totalKgs = 0

    const calcularKits = (layers) => {
        
        if(layers>1){
            totalKgs = totalKgForKitsPorCapa(layers) - denominadorKgsResina*5*returnArray[4]
            console.log("totalKgs", totalKgs)
        }
        else{
            totalKgs = totalKgForKitsPorCapa(layers) - denominadorKgsResina*5*returnArray[4]
        }

        

        if(totalKgs==0){
            return returnArray
        }
        if(result.capas.sizeOfKits[4] > totalKgs){
            let positionInTheArray = totalKgs / denominadorKgsResina-1
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

    let imprimacionKgs, capasKgs = 0

    if(imprimacion){
        returnArray = [0,0,0,0,0]
        result.imprimacion.amountOfKits = calcularKits(imprimacion)

        imprimacionKgs = result.imprimacion.amountOfKits.reduce((acc, value, index)=>{
            return acc+(value*result.imprimacion.sizeOfKits[index])
        })
        result.gPerM2.imprimacion = imprimacionKgs/mainData.m2 * GRAMOS_EN_UN_KG 
    }

    if(capas){
        returnArray = [0,0,0,0,0]
        result.capas.amountOfKits = calcularKits(capas)

        capasKgs = result.capas.amountOfKits.reduce((acc, value, index)=>{
            return acc+(value*result.capas.sizeOfKits[index])
        })

        result.gPerM2.capas = capasKgs/mainData.m2 * GRAMOS_EN_UN_KG * (capas ? 1/capas : 1)
    }

    if(collapsableData.disolvente){
        result.disolvente = ((imprimacionKgs+capasKgs) >60) ? Math.ceil((imprimacionKgs+capasKgs)/60) : 2
    }
    else{
        result.disolvente = 0
    }

    //fin de calculo de kits
    //console.log("gotten result: ", result)
    setResult(result)
}

export const modifyResultData = (result, subData)=>{
    console.log("updated result data")
}