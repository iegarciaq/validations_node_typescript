import express, { Response, Request } from 'express';
import { validationResult } from 'express-validator';

import { register, confirmPassword } from './utils/validations';

const app = express();
const port = 3000;

app.use(express.json());
// app.use(express.static("public"));
//app.set("view engine", "ejs");

app.post('/signin', confirmPassword(), (req, res) => {
  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.json({
      errors: errors.array()
    })
  }
  res.send('Hello World!');
});

app.post('/test', register(), (req: Request, res: Response) => {

  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.json({
      errors: errors.array()
    })
  }

  res.send('Test!');
});

app.listen(port, () => {
  return console.log(`http://localhost:${port}`);
});