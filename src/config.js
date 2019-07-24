var x;
var IP="172.19.71.109"
const EventEmitter =require('events');
const configEmmiter=new EventEmitter();



 function connectToServer(myMethod,data,id) {
    var status="";
    fetch('http://127.0.0.1:8081/'+id, {

        method: myMethod,
        body: data,
        // Coordinate the body type with 'Content-Type'
        headers: new Headers({'Content-Type': 'application/json'}),
    }).then(response => response.json())
        .then(json => {

            if(myMethod==="delete")configEmmiter.emit("DELETE_RESULT",{Status:json['Status']})
            else if(myMethod==='post')configEmmiter.emit("EDIT_RESULT",{Status:json['Status']})
            else if(myMethod==='put')configEmmiter.emit("ADD_RESULT",{Status:json['Status']})

        })
        .catch(error => console.log(error))
    return status
}
function uploadImage(data) {
    fetch("http://127.0.0.1:8081/upload", {
        method: 'post',
        body: data
    }).then(response => {
        alert(response);
        return response.json();
    })
        .then(json => {
        }).catch((error) => {
//success = false;
        console.log(error);
        alert("error:" + error)
//func_fail.apply(obj,[error]);
    });
}
export default {connectToServer,uploadImage,IP,configEmmiter}