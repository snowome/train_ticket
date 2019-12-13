export function timeStrampFormatYMD(timeStramp = Date.now()) {
    const target = new Date(timeStramp)
    target.setHours(0)
    target.setMinutes(0)
    target.setSeconds(0)
    target.setMilliseconds(0)
    return target.getTime()
}