const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { EOL } = require('os');
const { execSync } = require('child_process');
const { sjisToUtf8 } = require('./sjisToUtf8');

const check = (conditions) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    rl.on('line', rootDir => {
        const klasses = fs.readdirSync(rootDir);
        const arr = klasses.flatMap((klass) => {
            const klassPath = path.join(rootDir, klass);
            const studentNumbers = fs.readdirSync(klassPath);
            return studentNumbers.map(studentNumber => {
                const studentPath = path.join(klassPath, studentNumber);
                const fileNames = fs.readdirSync(studentPath);
                // 未提出。
                if (!fileNames.length)
                    return { klass, studentNumber, messages: ["未提出"] };

                const recursiveGetAllFilePaths = (filePath) => {
                    const stat = fs.statSync(filePath);
                    if (stat.isDirectory()) {
                        return fs.readdirSync(filePath).flatMap(fileName => {
                            return recursiveGetAllFilePaths(path.join(filePath, fileName));
                        });
                    }
                    return [filePath]
                };
                let filePaths = recursiveGetAllFilePaths(studentPath);

                // Unzip.
                const compressedExtensions = ['.zip', '.rar', '7z']
                const compressedFilePaths = filePaths.filter(filePath => compressedExtensions.some(ext => filePath.endsWith(ext)));
                compressedFilePaths.forEach(compressedFilePath => {
                    try {
                        const decompressedFilePath = compressedFilePath.split('.').slice(0, -1).join('.');
                        execSync(`"C:\\Program Files\\7-Zip\\7z.exe" -aoa x "${compressedFilePath}" -o"${decompressedFilePath}"`);
                    } catch ({ stdout, stderr }) {
                        console.log(sjisToUtf8(stdout));
                        console.error(sjisToUtf8(stderr));
                        process.exit(-1);
                    }
                });

                // Refresh filePaths.
                filePaths = recursiveGetAllFilePaths(studentPath);

                const messages = conditions.flatMap((condition) => {
                    const res = condition(filePaths);
                    return !res ? [] : Array.isArray(res) ? res : [res];
                });

                return messages.length ? { klass, studentNumber, messages } : null;
            }).filter(elm => !!elm);
        });

        const output = JSON.stringify(arr, null, 2)
        console.log(output);
        fs.writeFileSync('./output.json', output);
    })

    if (process.argv[2]) {
        rl.write(process.argv[2] + EOL);
        rl.close();
    }
};

module.exports = { check };