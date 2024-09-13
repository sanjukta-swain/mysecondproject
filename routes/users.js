import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();



// Mock database
//const users = [
  //{
   // first_name: 'John',
    //last_name: 'Doe',
    //email: 'johndoe@example.com',
 // },
//  {
  //  first_name: 'Alice',
  //  last_name: 'Smith',
  //  email: 'alicesmith@example.com',
//  },
//];

//empty database for post request
let users =[]

//getting the list of users from the mock database
router.get("/",(req, res) => {
    res.send(users);
})

//post request at the home path
router.post('/', (req, res) => {
  const user = req.body;

  users.push({ ...user, id: uuidv4() });

  res.send(`${user.first_name} has been added to the Database`);
})  

//GET  /:id-get specific user by their id
router.get("/:id",(req,res) => {
    //pickup the id from the URL
    const{ id } = req.params
  
    //find the user with matching id
    const foundUser = users.find((user) =>  user.id === id);

    if (foundUser) {
      res.send(foundUser);
    } else {
      res.status(404).send('User not found');
    }
})

//DELETE /:id - delete a specific user based on their id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id)

  res.send(`${id} deleted successfully from database`);
})

//delete /:id - update a specific user based on their id 
router.patch('/:id', (req, res) => {
  const { id } = req.params;

  const { first_name, last_name, email} = req.body;

  const user = users.find((user) => user.id === id)

  if(first_name) user.first_name = first_name;
  if(last_name) user.last_name = last_name;
  if(email) user.email = email;

  res.send(`User with the ${id} has been updated`)

});
export default router