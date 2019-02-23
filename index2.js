const Discord = require('discord.js');
const client = new Discord.Client();

const GoogleSpreadsheet = require('google-spreadsheet')
const { promisify } = require('util')

const credentials = require(`./service-account.json`);
const url_token = require('./url-token.json');

client.login(url_token.discord_token);

async function accessSpreadsheet() {
  const doc = new GoogleSpreadsheet(url_token.SPREADSHEET_ID)
  await promisify(doc.useServiceAccountAuth)(credentials)
  const info = await promisify(doc.getInfo)()
  console.log(`Loaded doc: ` + info.title + ` by ` + info.author.email)
  const sheet = info.worksheets[0]
  console.log(`sheet 1: ` + sheet.title + ` ` + sheet.rowCount + `x` + sheet.colCount)


  const cells = await promisify(sheet.getCells)({

    'min-row': 1,
    'max-row': 5,
    'min-col': 1,
    'max-col': 2,
    'return-empty': true,

  })

  for (const cell of cells) {

    console.log(`${cell.row},${cell.col}: ${cell.value}`)

  }

  var cell = cells[0];

  // cells have a value, numericValue, and formula
  // updating `value` is "smart" and generally handles things for you
  cell.value = 123;
  cell.value = '=A1+B2'
  await cell.save(); //async

  // bulk updates make it easy to update many cells at once
  cells[0].value = 1;
  cells[1].value = 2;
  cells[2].formula = '=A1+B1';
  await sheet.bulkUpdateCells(cells); //async

}

accessSpreadsheet()