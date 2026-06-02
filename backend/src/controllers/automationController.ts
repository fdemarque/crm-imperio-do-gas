import { Request, Response } from 'express';
import { supabase } from '../config/supabaseClient';

export const createAutomation = async (req: Request, res: Response) => {
  try {
    const { name, message_template, trigger_type } = req.body;
    const { data, error } = await supabase
      .from('automations')
      .insert([{ name, message_template, trigger_type, is_active: true }])
      .select();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAutomations = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('automations')
      .select('*');

    if (error) throw error;
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const toggleAutomationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;
    
    const { data, error } = await supabase
      .from('automations')
      .update({ is_active })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
