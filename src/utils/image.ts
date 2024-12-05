import sharp from 'sharp'

export async function convertToWebp(buffer: Buffer) {
  return sharp(buffer)
    .webp({ quality: 80 }) // Define a qualidade da imagem .webp
    .toBuffer()
}
