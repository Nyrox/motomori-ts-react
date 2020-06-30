import * as nodeFs from "fs"
import * as nodeUtil from "util"


export const fs = {
    readdir: nodeUtil.promisify(nodeFs.readdir),
    stat: nodeUtil.promisify(nodeFs.stat),
}