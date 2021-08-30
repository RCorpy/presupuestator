const path = require("path");
const express = require("express");
const app = express(); // create express app
const XlsxPopulate = require('xlsx-populate');
const openMyFile = require('open');

const userName = require("./usuario").modules.userName

const PRECIO_PORTES_POR_KG = 0.33

const PRIMERA_FILA_CONCEPTOS = 18
const ULTIMA_FILA_CONCEPTOS = 43
const BLUE = "0080FF"
const WHITE = "ffffff"

const texteator = {
  "epoxy brillo":{
    name: "EPOXY"
  },
  "epoxy mate":{
    name: "EPOXY MATE"
  },
  "acrilica":{
    name: "ACRILICA"
  },
  "politop":{
    name: "POLITOP"
  }
}


// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.use(express. json())

app.post('/createexcel', (req, res)=>{

  const data = {...req.body.token}
  let thisFileName = ""

  console.log("hi Rigga", data)

  // Load an existing workbook
  XlsxPopulate.fromFileAsync("./basePresupuestosExcel.xlsx")
    .then(workbook => {
        // Modify the workbook.
        let today = new Date()
        thisFileName = Date.now().toString().substring(2).slice(0,-3) + ` ${data.m2}m²`
        let thisSheet = workbook.sheet("proforma")

        let totalKgs = parseFloat(data.kgsImprimacion)+parseFloat(data.kgsCapas)+parseInt(data.resultData.disolvente)

        thisSheet.cell("C5").value(data.concepto.toUpperCase())
        thisSheet.cell("C8").value(data.nombre.toLowerCase().split(" ").map(s=>(s.charAt(0).toUpperCase()+s.slice(1))).join(" ")) //Churraken :D
        thisSheet.cell("E4").value(`Nº: ${thisFileName}`)
        thisSheet.cell("B15").value( `${data.m2}m²`)
        thisSheet.cell("E7").value(data.color.toUpperCase())
        thisSheet.cell("E5").value("Fecha: " + today.getDate() + "/" + `${today.getMonth()+1 <10 ? "0"+(today.getMonth()+1) : (today.getMonth()+1)}` + "/" + today.getFullYear())
        thisSheet.cell("D45").value(data.descuento*100)
        thisSheet.cell("C47").value(`Portes ${totalKgs} kgs brutos`)
        thisSheet.cell("D47").value(totalKgs)
        thisSheet.cell("E47").value(PRECIO_PORTES_POR_KG)
        thisSheet.cell("F47").value(data.portes >= PRECIO_PORTES_POR_KG*totalKgs ? data.portes : PRECIO_PORTES_POR_KG*totalKgs)
        
        //Empezar a escribir conceptos

        let currentRow = PRIMERA_FILA_CONCEPTOS

        const makeTitle = (titulo)=>{
          thisSheet.cell(`B${currentRow}`).value(titulo).style("fill", BLUE).style("fontColor", WHITE)
          currentRow++
        }

        const makeCapasConceptRows = (amount, kitSize, price) =>{

          const capasObject = {
            'epoxy brillo':{
              1:"ENEPOXI HS100 MAGNUM ",
              2:"Catalizador 5 a 1",
              3:"COLOR 100% Sólidos (MANOS)"
            },
            "epoxy mate":{
              1:"ENEPOXY HS MATE",
              2:"Catalizador 10 a 1",
              3:"COLOR (MANOS)"
            },
            'acrilica':{
              1:"ENEKRIL",
              2:"",
              3:"COLOR (MANOS)"
            },
            'politop':{
              1:"POLITOP",
              2:"",
              3:"COLOR (MANOS)"
            }
          }
          if(amount){
            
            thisSheet.cell(`B${currentRow}`).value((data.resina == "epoxy brillo" || data.resina =="epoxy mate" ? "KIT ": "")+kitSize+" KGS")
            thisSheet.cell(`C${currentRow}`).value(capasObject[data.resina][1])
            thisSheet.cell(`D${currentRow}`).value(parseFloat(amount))
            thisSheet.cell(`E${currentRow}`).value(parseFloat(price)*parseFloat(data.multiplicador))
            currentRow++

            thisSheet.cell(`B${currentRow}`).value(capasObject[data.resina][2])
            thisSheet.cell(`C${currentRow}`).value(capasObject[data.resina][3].replace("COLOR", data.color.toUpperCase()).replace("MANOS", data.capas>1 ? "DOS MANOS" : "UNA MANO"))
            currentRow++
          }
        }

        const makeImprimacionConceptRows = (amount, kitSize, price) =>{

          const imprimacionObject = {
            'epoxy brillo':{
              1:"ENEPOXI HS100 PRIMER EPOXI RESINA",
              2:"Catalizador 5 a 1",
              3:"100% SOLIDOS"
            },
            "epoxy mate":{
              1:"ENEPOXI HS100 PRIMER EPOXI RESINA",
              2:"Catalizador 5 a 1",
              3:"100% SOLIDOS"
            },
            'acrilica':{
              1:"ENEKRIL PRIMER",
              2:"",
              3:""
            },
            'politop':{
              1:"ERROR",
              2:"ERROR",
              3:"ERROR"
            }
          }
          if(amount){
            
            thisSheet.cell(`B${currentRow}`).value((data.resina == "epoxy brillo" || data.resina =="epoxy mate" ? "KIT ": "")+kitSize+" KGS")
            thisSheet.cell(`C${currentRow}`).value(imprimacionObject[data.resina][1])
            thisSheet.cell(`D${currentRow}`).value(parseFloat(amount))
            thisSheet.cell(`E${currentRow}`).value(parseFloat(price)*parseFloat(data.multiplicador))
            currentRow++

            thisSheet.cell(`B${currentRow}`).value(imprimacionObject[data.resina][2])
            thisSheet.cell(`C${currentRow}`).value(imprimacionObject[data.resina][3])
            currentRow++
          }
        }

        const makeDisolventeConceptRow = (kitSize, price) =>{

          const disolventeObject = {
            'epoxy brillo': "ENESOL EPOXY",
            "epoxy mate": "ENESOL EPOXY",
            'acrilica': "AGUA",
            'politop': "ENESOL POLITOP"
          }
          if(kitSize){
            
            thisSheet.cell(`B${currentRow}`).value(kitSize+" LTS")
            thisSheet.cell(`C${currentRow}`).value(disolventeObject[data.resina])
            thisSheet.cell(`D${currentRow}`).value(1)
            thisSheet.cell(`E${currentRow}`).value(parseFloat(price)*parseFloat(kitSize)*parseFloat(data.multiplicador))
            currentRow++
          }
        }
        
        const makeHerramientasConceptRow = (name, amount) => {
          if(amount){
            thisSheet.cell(`B${currentRow}`).value("UNIDADES")
            thisSheet.cell(`C${currentRow}`).value(name)
            thisSheet.cell(`D${currentRow}`).value(amount)
            thisSheet.cell(`E${currentRow}`).value(0)
            currentRow++
          }
        }

        if(data.imprimacion){
          //titulo
            makeTitle("IMPRIMACIÓN")
          //filas
          for(let i=0; i<5; i++){
            makeImprimacionConceptRows(data.resultData.imprimacion.amountOfKits[i], data.resultData.imprimacion.sizeOfKits[i], data.priceObject.imprimacion[data.resultData.imprimacion.sizeOfKits[i]])
          }

          //hueco de harina de carzo
          currentRow++
        }
        if(data.capas){
          //titulo
            makeTitle(`${data.capas} MANO${data.capas>1 ? "S": ""} ${texteator[data.resina].name}`)
          //capas
          for(let i=0; i<5; i++){
            makeCapasConceptRows(data.resultData.capas.amountOfKits[i], data.resultData.capas.sizeOfKits[i], data.priceObject.capas[data.resultData.capas.sizeOfKits[i]])
          }
        }
        if(data.resultData.disolvente){
          //titulo
            makeTitle("DISOLVENTE")
          //capas
            makeDisolventeConceptRow(data.resultData.disolvente, data.disolventePrice)
        }
        if(data.herramientas.rodillos || data.herramientas.basculas || data.herramientas.cubos){
          //titulo
          makeTitle("HERRAMIENTAS")
          if(data.herramientas.rodillos){
            makeHerramientasConceptRow("RODILLOS", data.herramientas.rodillos)
          }
          if(data.herramientas.basculas){
            makeHerramientasConceptRow("BALANZA DE 2G A 5 KGS", data.herramientas.basculas)
          }
          if(data.herramientas.cubos){
            makeHerramientasConceptRow("CUBOS DE MEZCLA", data.herramientas.cubos)
          }
        }


        return workbook.toFileAsync(`presupuestos/${userName} ${thisFileName}.xlsx`)
    })
    .then(()=>{
      console.log("trying to open")
      openMyFile(path.join(__dirname,`/presupuestos/${userName} ${thisFileName}.xlsx`), {wait:true})
    })
    

  res.send("it might just work")
})

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});



// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});



        //SETTING COLOR -> cell.style("fill", "0000ff");
        //SETTING BOLD -> cell("X1").style('bold');

        // add two rich text fragments -> cell.value().add('hello ', { italic: true, bold: true }).add('world!', { fontColor: 'FF0000' });
        /*
            const richtext = new RichText();
            richtext.add('hello');
            cell.value(richtext);
            cell.value().text(); // returns 'hello'

            richtext.add(' world')
            richtext.text(); // returns 'hello world' 
            cell.value().text(); // returns 'hello'
            cell.value() === richtext; // returns false

            cell.value().add(' world');
            cell.value().text(); // returns 'hello world'
        */