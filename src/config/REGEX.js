module.exports.STU_REGEX = /^S\d+$/
module.exports.TCH_REGEX = /^T\d+$/
module.exports.USER_REGEX = /^(S|T)\d+$/

module.exports.FULLNAME_REGEX = /\S+/
module.exports.USER_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
module.exports.PWD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,24}$/