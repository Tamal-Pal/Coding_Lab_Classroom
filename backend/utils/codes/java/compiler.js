const fs = require('fs');
const child_process = require('child_process');
const randomString = require('randomstring');
const process = require('process')

const compiler = async ({ code, input }) => {
    const result = {
        error: null,
        output: null
    }

    const folderName = randomString.generate(10)
    fs.mkdirSync(folderName)
    process.chdir(folderName)
    const fileName = parentOfMain(code)
    const sourceCodeFile = `${fileName}.java`
    const compileCommand = `javac ${sourceCodeFile}`
    const runCommand = `java ${fileName}`

    fs.writeFileSync(sourceCodeFile, code)

    try {
        child_process.execSync(compileCommand); // Compile the code
        const output = child_process.execSync(runCommand, { input: input }); // Run the executable with input

        result.output = output.toString()
    } catch(e) {
        result.error = e?.output?.toString() || 'cannot compile'
    }
    
    process.chdir('..')
    fs.rmSync(folderName, { recursive: true, force: true });

    return result
}

const parentOfMain = (code) => {

    const bracesStack = []
    const classStack = []
    const wordArr = code.split(/\s|\.|\(|\)/).filter(Boolean)
    var gotClass = false
    var theresMain = false
    
    function getInitialAlphabets(str) {
        // 1. Trim trailing special characters
        const trimmedStr = str.trimEnd(/[^a-zA-Z]/);
      
        // 2. Extract first continuous alphabets using a regular expression
        const match = trimmedStr.match(/^[a-zA-Z]+/);
      
        // 3. Return the matched alphabets or an empty string if no match
        return match ? match[0] : "";
      }
    
    var i = 0;
    while(i < wordArr.length){
    
        const word = wordArr[i]
        if(word === 'main'){
            theresMain = true
            break
        } else if(word === 'class') {
            const className = getInitialAlphabets(wordArr[i+1])
            classStack.push({
                index: i,
                atStack: bracesStack.length,
                name: className
            })
            gotClass = true
        } else if(word === '{' || word[0] === '{' || word[word.length - 1] === '{') {
            bracesStack.push({
                index: i,
                isOfAClass: gotClass
            })
            gotClass = false
        } else if(word === '}' || word[0] === '}' || word[word.length - 1] === '}') {
            const lastBrace = bracesStack.pop()
    
            if(lastBrace.isOfAClass){
                classStack.pop()
            }
        }
    
        i++;
    }
    
    if(theresMain){
        return classStack.pop().name
    }else{
        return null
    }
}

module.exports = compiler