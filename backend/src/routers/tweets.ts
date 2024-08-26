import express from 'express'
import verifyToken from '../middleware/verifyToken'
import { prisma } from '../client'

const router = express.Router()

router.get('/getTweets', async(req, res) => {
  try {
    const tweets = await prisma.tweet.findMany({
      select: {
        id: true,
        content: true,
        username: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    })

    if (!tweets) {
      return res.status(400).json({ message: 'No tweets found' });
    }

    return res.status(200).json({ tweets });
  } catch (error) {
    return res.status(500).json({ message: 'Error getting tweets' });
  }
})

router.post('/createTweet', verifyToken, async(req, res) => {
  const { content } = req.body;
  const { username } = (req as any).user;

  try {
    const createdTweet = await prisma.tweet.create({
      data: {
        content: content as string,
        username: username as string,
      },
    })

    if (!createdTweet) {
      return res.status(400).json({ message: 'Tweet not created' });
    }

    return res.status(201).json({ message: 'Tweet created', createdTweet });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating tweet' });
  }
})

export default router;