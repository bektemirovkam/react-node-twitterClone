import crypto from 'crypto'

export const generateMD5 = (key: string): string => {
    return crypto.createHash("md5").update(key).digest("hex")
}