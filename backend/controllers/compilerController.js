
const handleCompilation = async (req, res) => {
    const { language, code, input } = req.body

    if (language && code) {
        console.log('language', language)
        console.log('code', code)
        res.json({
            'output': 'bingo'
        })
        return
    } else {
        res.json({
            'output': 'cannot compile'
        })
    }
}

module.exports = { handleCompilation }