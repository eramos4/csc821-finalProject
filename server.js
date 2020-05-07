const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();

app.use(fileUpload({
  createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// const port = process.env.PORT || 5000;

// app.listen(port, () => 
//   console.log(`App is listening on port ${port}.`)
// );





const executePythonCode = (path) => {
   console.log('executing pyhton algorithim:')
   console.log(path)
}


app.post('/upload', async (req, res) => {
  try {
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
          //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
          let file = req.files.file;
          
          //Use the mv() method to place the file in upload directory (i.e. "uploads")
          let path = `${__dirname}/public/uploads/${file.name}`
          file.mv(path);

          

        //   const { spawn } = require('child_process');

        //   const bat = spawn(``);


          process.stdout.on('data', function(data) { 
            res.send(data.toString()); 
        } )
          
          //send response
          res.send({
              status: true,
              message: 'File is uploaded',
              data: {
                  name: file.name,
                  mimetype: file.mimetype,
                  size: file.size
              }
          });
      }
  } catch (err) {
      res.status(500).send(err);
  }
});



app.listen(5000, () => console.log('Server Started...'));
