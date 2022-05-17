const SHOW_ERROR = true

function error(initiator: string, message: any){
    SHOW_ERROR && console.error(`${initiator} -`,message)
}

const info = { error }

export default info