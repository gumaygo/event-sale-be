import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger_output.json";
import fs from "fs";
import path from "path";



export default function docs(app:Express){
    const css = fs.readFileSync(path.join(__dirname, '../../node_modules/swagger-ui-dist/swagger-ui.css'), 'utf8');
    const js = fs.readFileSync(path.join(__dirname, '../../node_modules/swagger-ui-dist/swagger-ui-bundle.js'), 'utf8');

   app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: css
   }));
   
}