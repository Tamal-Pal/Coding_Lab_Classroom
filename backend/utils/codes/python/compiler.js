const fs = require('fs');
const child_process = require('child_process');
const randomString = require('randomstring');

const compiler = async ({ code, input }) => {
    const result = {
        error: null,
        output: null
    }

    const fileName = randomString.generate(10)
    const sourceCodeFile = `${fileName}.py`
    const compileCommand = `python ${sourceCodeFile}`

    fs.writeFileSync(sourceCodeFile, code)

    try {
        const output = child_process.execSync(compileCommand, { input: input }); // Run the executable with input

        result.output = output.toString()
    } catch(e) {
        result.error = true
        result.output = e?.output?.toString() || 'cannot compile'
    }

    try{
        fs.unlinkSync(sourceCodeFile)
    } catch(e){}

    return result
}

module.exports = compiler