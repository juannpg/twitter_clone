import express from 'express'
import  argon2  from 'argon2' 
import { prisma } from '../client'

const router = express.Router()

router.post('/register', async(req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = await argon2.hash(password);

  if ( !email || !username || !password) {
    return res.status(400).json({ message: 'Provide all fields' });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: email as string,
        username: username as string,
        password: hashedPassword as string,
      },
    })

    if (!user) {
      return res.status(400).json({ message: 'User not created' });
    }

    return res.status(200).json({ message: 'User created', user });

  } catch (error) {
    return res.status(500).json({ message: 'Error creating user' });
  }
})

router.post('/login', async(req, res) => {
  const { username, password } = req.body;

  if ( !username || !password) {
    return res.status(400).json({ message: 'Provide all fields' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username as string,
      },
      select: {
        id: true,
        username: true,
        password: true,
        token: true,
      },
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const passVerify = await argon2.verify(
      user.password as string,
      password as string
    );

    if (!passVerify) {
      return res.status(400).json({ message: 'Wrong password' });
    }

    return res.status(200).json({ message: 'Login successful', user });

  } catch (error) {
    return res.status(500).json({ message: 'Error logging in' });
  }
})

export default router;