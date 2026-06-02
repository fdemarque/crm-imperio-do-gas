import { Request, Response } from 'express';
import { supabase } from '../config/supabaseClient';
import csv from 'csv-parser';
import { Readable } from 'stream';

export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, document, birthdate, address } = req.body;
    const { data, error } = await supabase
      .from('clients')
      .insert([{ name, phone, email, document, birthdate, address }])
      .select();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClients = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*');

    if (error) throw error;
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, phone, email, document, birthdate, address } = req.body;
    
    const { data, error } = await supabase
      .from('clients')
      .update({ name, phone, email, document, birthdate, address })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;
    res.status(200).json({ message: 'Client deleted successfully', data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadClientsCsv = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const results: any[] = [];
    const stream = Readable.from(req.file.buffer);

    stream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        const { data, error } = await supabase
          .from('clients')
          .insert(results)
          .select();

        if (error) throw error;
        res.status(201).json({ message: `${results.length} clientes importados`, data });
      });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
