
const simpleGit = ()=>({
diff:()=>new Promise((resolve,reject)=>{
    return resolve('values')
})as any
})
simpleGit.diff = new Promise((resolve,reject)=>{
    return resolve('values')
})as any
module.exports = simpleGit;