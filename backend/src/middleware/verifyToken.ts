import { NextFunction, Request, Response } from 'express'
import { prisma } from '../client';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  // we get the header from the request
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Error: no token provided' });
  }
  
  // we get the token from the header
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'Error: token not found' });
  }

  // find the user with the token
  try {
    const user = await prisma.user.findUnique({
      where: {
        token: token as string,
      },
      select: {
        id: true,
        username: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // set the user in the request
    (req as any).user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error: ', error });
  }
};

export default verifyToken;