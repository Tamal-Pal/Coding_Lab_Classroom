const Time = () => {
    const date = new Date()

    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()

    const time = `${h}h ${m}m ${s}s`

    return time
}

module.exports = Time