const path = require("path");
const express = require("express");
const app = express(); // create express app
const XlsxPopulate = require('xlsx-populate');

const userName = require("./usuario").modules.userName

const PRECIO_PORTES_POR_KG = 0.33

const PRIMERA_FILA_CONCEPTOS = 18
const ULTIMA_FILA_CONCEPTOS = 43

// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.use(express. json())

app.post('/createexcel', (req, res)=>{

  const data = {...req.body.token}
  console.log("hi Rigga", data)

  // Load an existing workbook
  XlsxPopulate.fromFileAsync("./basePresupuestosExcel.xlsx")
    .then(workbook => {
        // Modify the workbook.
        let today = new Date()
        let thisFileName = Date.now().toString().substring(2).slice(0,-3) + ` ${data.m2}m²`
        let thisSheet = workbook.sheet("proforma")

        thisSheet.cell("C5").value(data.concepto.toUpperCase())
        thisSheet.cell("C8").value(data.nombre.toLowerCase().split(" ").map(s=>(s.charAt(0).toUpperCase()+s.slice(1))).join(" ")) //Churraken :D
        thisSheet.cell("E4").value(`Nº: ${thisFileName}`)
        thisSheet.cell("B15").value( `${data.m2}m²`)
        thisSheet.cell("E7").value(data.color.toUpperCase())
        thisSheet.cell("E5").value("Fecha: " + today.getDate() + "/" + `${today.getMonth()+1 <10 ? "0"+today.getMonth()+1 : today.getMonth()+1}` + "/" + today.getFullYear())
        thisSheet.cell("D45").value(data.descuento*100)
        thisSheet.cell("C47").value(`Portes ${data.kgs} kgs brutos`)
        thisSheet.cell("D47").value(data.kgs)
        thisSheet.cell("E47").value(PRECIO_PORTES_POR_KG)
        thisSheet.cell("F47").value(data.portes >= PRECIO_PORTES_POR_KG*data.kgs ? data.portes : PRECIO_PORTES_POR_KG*data.kgs)
        
        //Empezar a escribir conceptos

        let currentRow = PRIMERA_FILA_CONCEPTOS

        if(data.imprimacion){
          //titulo

          //filas

          //hueco de harina de carzo
          currentRow++
        }
        if(data.capas){
          //titulo

          //capas

        }
        if(data.resultData.disolvente){
          //titulo

          //capas

        }
        if(data.herramientas.rodillos || data.herramientas.basculas || data.herramientas.cubos){
          //titulo

          if(data.herramientas.rodillos){
            
          }
          if(data.herramientas.basculas){
            
          }
          if(data.herramientas.cubos){
            
          }
        }


        return workbook.toFileAsync(`presupuestos/${userName} ${thisFileName}.xlsx`)
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