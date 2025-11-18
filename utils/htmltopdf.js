const puppeteer = require("puppeteer");
const fs = require("fs")
const path = require("path")

async function generateReciptPDF(htmlContent,name) {
  try { 
    const browser = await puppeteer.launch({
        headless:"new"
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent,{waitUntil:"networkidle0"})
    const pdfPath=path.join(__dirname,`../slip/${name}.pdf`)
//       if (!fs.existsSync(pdfPath)) {
//     fs.mkdirSync(pdfPath, { recursive: true }); // creates full path safely
//   }
    await page.pdf({
        path:pdfPath,
        format:"A4",
        prontBackground:true
    })
    await browser.close();
    return `${name}.pdf`
}
    
    catch(err){
        console.error(err)
    }
}

module.exports = generateReciptPDF