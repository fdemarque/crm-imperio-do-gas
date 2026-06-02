import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabaseClient';

export const roleMiddleware = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
      }

      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
      }

      const userRole = user.user_metadata?.role || user.app_metadata?.role;
      
      if (userRole !== requiredRole) {
        return res.status(403).json({ error: 'Acesso negado: Permissão insuficiente' });
      }

      (req as any).user = user;
      next();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao validar permissões' });
    }
  };
};
