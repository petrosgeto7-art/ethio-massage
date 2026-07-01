const Jimp = require('jimp');

async function removeWhiteBackground() {
  const image = await Jimp.read('public/logo.png');
  
  // Replace pure white and near-white pixels with transparent
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    const a = this.bitmap.data[idx + 3];
    
    // If pixel is very bright/white, make it transparent
    if (r > 240 && g > 240 && b > 240) {
      this.bitmap.data[idx + 3] = 0; // Alpha to 0
    }
  });

  await image.writeAsync('public/logo_transparent.png');
  console.log('Successfully created transparent logo!');
}

removeWhiteBackground().catch(console.error);
