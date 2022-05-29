const SHOW = {
    LOG: false,
    DATA: false,
    ERROR: false,
    WARN: false,
}

function log(initiator: string, message: any){
    SHOW.LOG && console.log(`LOG ${initiator} -`,message)
}

function dataLog(initiator: string, message: any){
    SHOW.DATA && console.log(`DATA ${initiator} -`,message)
}

function warnLog(initiator: string, message: any){
    SHOW.WARN && console.warn(`WARN ${initiator} -`,message)
}

function errorLog(initiator: string, message: any){
    SHOW.ERROR && console.log(`ERROR ${initiator} -`,message)
}

const info = { 
    log,
    data: dataLog,
    warn: warnLog,
    error: errorLog, 
}

export default info