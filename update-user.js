import {updateUser} from './userService.js'

const [userId,jsonData, adminId] = process.argv.slice(2);

if(!userId || !adminId){
    process.stderr.write('Pls Fill All Filed\n');
    process.exit(1);
}
let parsData;
try {
    parsData = JSON.parse(jsonData)
} catch(e) {
    process.stderr.write('Pls set right json data \n')
    process.exit(1);
}

try {
    const res = await updateUser(userId, parsData, adminId)
    console.log(res)
} catch(e) {
    console.error(e)
} finally {
    process.exit()
}



