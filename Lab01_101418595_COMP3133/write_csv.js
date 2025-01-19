const fs = require('fs');

const inputFile = 'input_countries.csv';
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

async function deleteFile(filePath) {
    try {
        await fs.promises.unlink(filePath);
        console.log(`${filePath} deleted`);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.error(`Error deleting ${filePath}:`, err);
        }
    }
}

async function writeDataToFile(filePath, data) {
    try {
        await fs.promises.appendFile(filePath, data);
    } catch (err) {
        console.error(`Error writing to ${filePath}:`, err);
    }
}

async function processCSV() {
    await deleteFile(canadaFile);
    await deleteFile(usaFile);

    const header = 'country,year,population\n';
    await writeDataToFile(canadaFile, header);
    await writeDataToFile(usaFile, header);

    const csvParser = require('csv-parser');
    const readStream = fs.createReadStream(inputFile).pipe(csvParser());

    readStream.on('data', async (row) => {
        const { country } = row;

        if (country.toLowerCase() === 'canada') {
            await writeDataToFile(canadaFile, `${Object.values(row).join(',')}\n`);
        } else if (country.toLowerCase() === 'united states') {
            await writeDataToFile(usaFile, `${Object.values(row).join(',')}\n`);
        }
    });

    readStream.on('end', () => {
        console.log('CSV file successfully processed');
    });

    readStream.on('error', (err) => {
        console.error('Error reading the CSV file:', err);
    });
}

processCSV();