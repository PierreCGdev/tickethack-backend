function checkBody(body, array){
    let valid = true;
    for(let item of array){
        if(!body[item] || body[item] === ""){
            valid = false
        }
    }
    return valid
}

module.exports = {checkBody}