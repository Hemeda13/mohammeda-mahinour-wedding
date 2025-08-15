const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const uploadUrl = 'https://www.dropbox.com/request/w7tn74TzZk2jTjJnAA4W';
const outputPath = path.join(__dirname, 'src', 'assets', 'qr-code.png');

async function generateQRCode() {
  try {
    console.log('Generating QR code for:', uploadUrl);

    // Generate QR code as PNG buffer
    const qrCodeBuffer = await QRCode.toBuffer(uploadUrl, {
      type: 'png',
      width: 300,
      margin: 2,
      color: {
        dark: '#8b7d7e',  // Match your wedding theme color
        light: '#ffffff'
      }
    });

    // Save to assets folder
    fs.writeFileSync(outputPath, qrCodeBuffer);
    console.log('QR code saved successfully to:', outputPath);
    console.log('QR code points to:', uploadUrl);

  } catch (error) {
    console.error('Error generating QR code:', error);
  }
}

generateQRCode();
