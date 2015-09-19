module.exports = {
    getItem: getItem,
    setItem: setItem
}


function getItem(name){
    return localStorage.getItem(name);
}

function setItem(name, val){
    localStorage.setItem(name, val);
}
