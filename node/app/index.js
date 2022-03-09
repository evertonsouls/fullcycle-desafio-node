const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const util = require('util');
const express = require('express')
const mysql = require('mysql')

const bootstrap = async () => {
  try {
    const app = express()
    const connection = mysql.createConnection(config)

    const query = util.promisify(connection.query).bind(connection);

    let sql = `CREATE TABLE IF NOT EXISTS people (
      id int NOT NULL auto_increment, 
      name varchar(250) NULL,
      PRIMARY KEY (id)
    );`;
    await query(sql)

    sql = `INSERT INTO people(name) values('evertonsouls')`;
    await query(sql)

    app.get('/', async (req, res) => {
      const people = await query('SELECT * FROM people')

      let html = '<h1>Full Cycle Rocks!</h1>'
      html += '<ul>'
      html += people.map(person => `<li>${person.name}</li>`).join('')
      html += '</ul>'

      res.send(html)
    })

    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

bootstrap()