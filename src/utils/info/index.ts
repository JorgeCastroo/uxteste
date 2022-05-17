const SHOW_ERROR = true

function error(initiator: string, message: any){
    SHOW_ERROR && console.log(`ERROR ${initiator} -`,message)
}

const info = { error }

export default info