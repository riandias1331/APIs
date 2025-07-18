// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// interface AuthRequest extends Request {
//   user?: { id: string };
// }

// export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1]; // Extrai o token do header "Authorization: Bearer <token>"
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     const secret = process.env.JWT_SECRET as string;
//     const decoded = jwt.verify(token, secret) as { id: string };

//     req.user = { id: decoded.id }; // Adiciona o ID do usuário ao objeto req
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };


//////////////////////////



import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: { id: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token not provided.' });
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as { id: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};