/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: API to generate and manage character reports
 */

/**
 * @swagger
 * /api/reports/pdf:
 *   get:
 *     summary: Generate a PDF character report
 *     tags: [Reports]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/reports/excel-csv:
 *   get:
 *     summary: Generate an Excel and CSV character report
 *     tags: [Reports]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       '500':
 *         description: Internal server error
 */




const express = require("express");
const puppeteer = require("puppeteer");
const ExcelJS = require("exceljs");
const fastcsv = require("fast-csv");
const authMiddleware = require("../middleware/authMiddleware");
const Character = require("../models/Character");

const router = express.Router();

// Generate PDF report using Puppeteer
router.get("/pdf",authMiddleware, async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Fetch characters from the database
    const characters = await Character.find().populate("relations");

    let pdfContent = `
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
          }
          h1 {
            color: #333;
          }
          h2 {
            color: #666;
          }
          p {
            margin: 10px 0;
          }
          img {
            max-width: 100%;
            height: auto;
            margin-top: 10px;
          }
        </style>
        <h1>Character Report</h1>
      `;

    characters.forEach((character) => {
      pdfContent += `
          <div style="margin: 20px; padding: 20px; border: 1px solid #ccc;">
            <h2>${character.name}</h2>
            <p>Age: ${character.age}</p>
            <p>Gender: ${character.gender}</p>
            <p>Occupation: ${character.occupation}</p>
            <p>Relations: ${character.relations
              .map((relation) => relation.name)
              .join(", ")}</p>
            <img src="${character.photos[0].url}" />
          </div>
        `;
    });

    await page.setContent(pdfContent);
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });
    await browser.close();

    res.contentType("application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating PDF report", error: error.message });
  }
});

router.get("/excel-csv", async (req, res) => {
    try {
    const characters = await Character.find().populate("relations");
    
    // Create Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Character Report");
    worksheet.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "Age", key: "age", width: 10 },
      { header: "Gender", key: "gender", width: 10 },
      { header: "Occupation", key: "occupation", width: 20 },
      { header: "Relations", key: "relations", width: 40 },
      { header: "Photos", key: "photos", width: 40 },
    ];
    
    // Add data to Excel worksheet
    characters.forEach((character) => {
      const relations = character.relations
        .map((relation) => relation.name)
        .join(", ");
      
      const photos = character.photos.map(photo => `=HYPERLINK("<span class="math-inline">\{photo\.url\}", "</span>{photo.name}")`).join('\n');
      
      worksheet.addRow({
        name: character.name,
        age: character.age,
        gender: character.gender,
        occupation: character.occupation,
        relations,
        photos,
      });
    });
    
    // Generate CSV data
    const csvData = [['Name', 'Age', 'Gender', 'Occupation', 'Relations', 'Photos']];
    characters.forEach((character) => {
      const relations = character.relations
        .map((relation) => relation.name)
        .join(", ");
      
      const photos = character.photos.map(photo => photo.name).join('\n');
      
      csvData.push([
        character.name,
        character.age,
        character.gender,
        character.occupation,
        relations,
        photos,
      ]);
    });
    
    // Generate Excel and CSV files
    const excelBuffer = await workbook.xlsx.writeBuffer();
    const csvBuffer = await fastcsv.writeToBuffer(csvData, { headers: true });
    
    res.attachment("character_report.xlsx");
    res.send(excelBuffer);
    
    // Alternatively, you can send the CSV buffer for CSV format
    // res.attachment('character_report.csv');
    // res.send(csvBuffer);
    } catch (error) {
    res
    .status(500)
    .json({ message: "Error generating report", error: error.message });
    }
    });
  
  

module.exports = router;
