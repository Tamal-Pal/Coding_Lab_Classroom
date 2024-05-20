
const cppCompiler = require('../utils/codes/cpp/compiler')
const cCompiler = require('../utils/codes/c/compiler')
const path = require('path')

const handleCompilation = async (req, res) => {
    const { language, code, input } = req.body

    if (language && code) {
        if(language === 'cpp'){
            const result = await cppCompiler({ code, input })
            res.json(result)
        } else if(language === 'c'){
            const result = await cCompiler({ code, input })
            res.json(result)
        }
        return
    } else {
        res.json({
            'output': 'cannot compile'
        })
    }
}

module.exports = { handleCompilation }