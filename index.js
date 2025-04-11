import express from 'express'
import { updateUser, getAllUsers } from './userService.js'

const PORT = 3000

const app = express()

app.use(express.json())

app.get('/users', async (_,res) => {
    try {
        const {rows} =await getAllUsers()
        res.json({ success: true, data: rows })
    } catch(e) {
        console.log(e)
        res.status(500).send('Unexpected error')
    }

})

app.patch('/user/:userId/:adminId',async (req, res) => {
    const { userId, adminId } = req.params;
    const updates = req.body;
  
    if (!userId || !adminId) {
      return res.status(400).json({ error: 'Missing userId or adminId' });
    }
  
    try {
      const result = await updateUser(userId, updates, adminId);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update user' });
    }

})

app.listen(PORT, () => console.log(`Express App listening on port ${PORT}`))