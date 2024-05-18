import { IncomingForm } from 'formidable';
import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Configurar Cloudinary com suas credenciais
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const form = new IncomingForm({
  keepExtensions: true,
  multiples: true,
});

export default async (req, res) => {
  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return reject(err);
      }

      try {
        const fileUploadPromises = Object.values(files).flat().map(file => {
          return cloudinary.v2.uploader.upload(file.filepath);
        });

        const uploadResults = await Promise.all(fileUploadPromises);
        const fileUrls = uploadResults.map(result => result.secure_url);

        res.status(200).json({ files: fileUrls });
        resolve();
      } catch (error) {
        res.status(500).json({ error: error.message });
        reject(error);
      }
    });
  });
};
