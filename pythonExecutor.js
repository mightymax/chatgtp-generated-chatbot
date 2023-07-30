const { spawn } = require('child_process');

// Function to execute the Python script and return the response as JSON
function executePythonScript(scriptPath, args) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', [scriptPath, ...args]);

    let result = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          const jsonData = JSON.parse(result);
          resolve(jsonData);
        } catch (err) {
          reject('Invalid JSON response from the Python script.');
        }
      } else {
        reject(`Python script execution failed with code: ${code}, Error: ${error}`);
      }
    });
  });
}

module.exports = executePythonScript;
