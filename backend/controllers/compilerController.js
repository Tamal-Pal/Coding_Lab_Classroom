const cppCompiler = require("../utils/codes/cpp/compiler");
const cCompiler = require("../utils/codes/c/compiler");
const javaCompiler = require("../utils/codes/java/compiler");
const pythonCompiler = require("../utils/codes/python/compiler");
const jsCompiler = require("../utils/codes/javascript/compiler");

const database = require('../models/database')
const roles = require('../utils/roles')

const handleCompilation = async (req, res) => {
  const { code, input, notebook, user_id } = req.body;
  const validNotebook = notebook ? await database.validNotebook(notebook) : false;
  console.log('valid notebook', validNotebook)
  if(validNotebook && code && user_id) {
    const [room_id, student_id] = notebook.split('_')
    var validUser = false
    const role = roles.getRole(user_id)
    if(role === 'student') {
        validUser = student_id === user_id
    } else if(role === 'teacher') {
        validUser = await database.validRoomAdmin({ room_id, teacher_id: user_id })
    } else validUser = false

    if(validUser) {
        const { language } = await database.getRoomData(room_id)
        var result = {}

        if (language === "cpp") { result = await cppCompiler({ code, input }); } 
        else if (language === "c") { result = await cCompiler({ code, input }); } 
        else if (language === "java") { result = await javaCompiler({ code, input }); } 
        else if (language === "python") { result = await pythonCompiler({ code, input }); } 
        else if (language === "javascript") { result = await jsCompiler({ code, input }); } 
        else { result = { error: "Compiler Not Found" }; }

        database.addLog({ room_id, user_id, input, err: result.error, output: result.output })
        res.json(result);
        return;
    }

    res.json({
      error: true,
      output: 'invalid user'
    })
  }

  res.json({
    error: true,
    output: 'cannot compile'
  })
  return
};

module.exports = { handleCompilation };
