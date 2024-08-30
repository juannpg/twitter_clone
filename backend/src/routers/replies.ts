import express from 'express'
import verifyToken from '../middleware/verifyToken'
import { prisma } from '../client'

const router = express.Router()

router.post('/replyTweet', verifyToken, async(req, res) => {
  const { content } = req.body;
  const { tweetId } = req.body;
  const { username } = (req as any).user;

  const tweetIdNumber = Number(tweetId);

  try {
    const tweet = await prisma.tweet.findUnique({
      where: {
        id: tweetIdNumber as number,
      }
    });

    if (!tweet) {
      return res.status(400).json({ message: 'Tweet not found' });
    }

    const reply = await prisma.reply.create({
      data: {
        content: content as string,
        tweetId: tweetIdNumber as number,
        username: username as string,
      },
    })

    if (!reply) {
      return res.status(400).json({ message: 'Reply not created' });
    }

    return res.status(200).json({ message: 'Reply created', reply });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating reply' });
  }
})

// store the tweet we want to see the replies of
let storedRepliesTweet: any;

router.get('/getRepliesTweet', async(req, res) => {
  const { id } = req.query;
  const idNumber = Number(id);
  
  try {
    const repliesTweet = await prisma.tweet.findUnique({
      where: {
        id: idNumber as number,
      },
      select: {
        id: true,
      },
    })

    // after getting the tweet with the id gotten from the url, store it
    storedRepliesTweet = repliesTweet;
    
  } catch (error) {
    return res.status(500).json({ message: 'Error getting replies tweet' });
  }
})

router.get('/getReplies', async(req, res) => {
  try {
    const replies = await prisma.reply.findMany({
      where: {
        // use the id we stored in the previous route
        tweetId: storedRepliesTweet.id as number,
      },
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

    if (!replies) {
      return res.status(400).json({ message: 'No replies found' });
    }

    return res.status(200).json({ replies });
  } catch (error) {
    return res.status(500).json({ message: 'Error getting replies' });
  }
})

export default router;