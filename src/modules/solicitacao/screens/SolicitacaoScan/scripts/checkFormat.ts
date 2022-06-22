import { ScanModes } from "../../../../../config/types"
import info from "../../../../../utils/info"

export default function checkFormat(scanMode: ScanModes, codeFormat: string){
    try {
        return scanMode === 'QR_CODE' ? codeFormat === 'QR_CODE' : scanMode === 'CODE_39' ? codeFormat !== 'QR_CODE' : true
    } catch (error) {
        info.error('checkFormat',error)
        return true
    }
}