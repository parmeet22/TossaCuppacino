require('dotenv').config()
const express = require("express");
const path = require("path");
const {google} = require('googleapis');

let sheetsService = null;

const app = express();
const port = process.env.PORT || "8000";

  app.use(express.urlencoded());
  app.use(express.json());
  app.use(express.static('./'));
  app.get('/', (req, res) => {
    res.sendFile(path.join('index.html'),{ root: __dirname });
  });

  app.post('/api/postEmail',(request,response) => {
    authorize().then(()=>{
        console.log(request.body);
        return appendValues(process.env.SPREADSHEET_ID,'Sheet1!A2:B2','USER_ENTERED',[[new Date(), request.body.email]]);
    }).then(()=> response.send("created"));
  });
  
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });


const client = new google.auth.JWT(
    process.env.client_email,
    null,
    process.env.private_key.replace(/\\n/g, "\n"),
    ['https://www.googleapis.com/auth/spreadsheets']
);

async function authorize(){
   return new Promise((resolve,reject)=>{
        client.authorize(function(err,tokens){
            if(err){
                console.log(err);
                return reject();              
            }
            console.log('connected');
            sheetsService = google.sheets({version: 'v4' , auth : client});
            resolve();
        });   
    });
}


/**
   * Appends values in a Spreadsheet.
   * @param {string} spreadsheetId The spreadsheet ID.
   * @param {string} range The range of values to append.
   * @param {object} valueInputOption Value input options.
   * @param {(string[])[]} _values A 2d array of values to append.
   * @return {Promise} The appended values response.
   */
 async function appendValues(spreadsheetId, range, valueInputOption, _values) {
    return new Promise((resolve, reject) => {
      // [START sheets_append_values]
      let values = [
        [
          // Cell values ...
        ],
        // Additional rows ...
      ];
      values = _values;
      let resource = {
        values,
      };
      sheetsService.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption,
        resource,
      }, (err, result) => {
        if (err) {
          // Handle error.
          console.log(err);
          reject(err);
        } else {
          console.log(`${result} cells appended.`);
          resolve(result);
        }
      });

    });
  }
