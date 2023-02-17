import fs from 'fs';

export interface IFile extends fs.Stats {
  filename: string;
  url: string;
}
