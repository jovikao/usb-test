console.log("Test")
let filters = [
    { classCode: 255, subclassCode: 66, protocolCode: 1 },
    { classCode: 255, subclassCode: 66, protocolCode: 3 }
];

navigator.usb.requestDevice({ filters: filters })
    .then(device => {
        console.log(device)
    })