import cryptojs from 'crypto-js'

export const crypto = (text: string) => {
    const start = "SINC_2013_GROUP_BLA*9!##XYZ"
    const senhaUtf16 = cryptojs.enc.Utf16LE.parse(start + text)
    const hash = cryptojs.SHA512(senhaUtf16)
    return hash.toString(cryptojs.enc.Hex)
}