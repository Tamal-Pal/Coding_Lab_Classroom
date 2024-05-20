const fs = require('fs');
const child_process = require('child_process');
const randomString = require('randomstring');

const compiler = async ({ code, input }) => {
    const result = {
        error: null,
        output: 'output from cpp compiler'
    }

    const fileaName = randomString.generate(10)
    const sourceCodeFile = `${fileaName}.cpp`
    const executable = `${fileaName}.exe`
    const compileCommand = `g++ ${sourceCodeFile} -o ${executable}`
    const runCommand = executable

    fs.writeFileSync(sourceCodeFile, code)

    try {
        child_process.execSync(compileCommand); // Compile the code
        const output = child_process.execSync(runCommand, { input: input }); // Run the executable with input

        result.output = output.toString()
    } catch(e) {
        result.error = e?.output?.toString() || 'cannot compile'
    }
    
    try{
        fs.unlinkSync(sourceCodeFile)
    } catch(e){}

    try{
        fs.unlinkSync(executable)
    } catch(e){}

    return result
}

module.exports = compiler