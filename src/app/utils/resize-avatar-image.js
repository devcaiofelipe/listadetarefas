import Jimp from 'jimp';
import { resolve } from 'path';


export default function resizeImage(filename) {
  const path = resolve(__dirname, '..', '..', 'uploads', 'avatars')

  Jimp.read(`${path}/${filename}`).then(image => {
    image.resize(160, 160).quality(100).write(`${path}/${filename}`);

  }).catch(err => {
    console.error(err);
  });
};
