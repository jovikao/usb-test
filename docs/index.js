console.log("Test")
let filters = [
    { classCode: 255, subclassCode: 66, protocolCode: 1 },
    { classCode: 255, subclassCode: 66, protocolCode: 3 }
];

var webusb = null;
var sync = null;

async function disconnect_usb() {
    if (sync != null)
        await sync.abort();
    webusb.close();
    webusb = null;
}

async function adb_test() {
    /*
    try{
        if(webusb != null){
            disconnect_usb();
            return;
        }else{

            webusb = await Adb.open("WebUSB");
            if(!webusb || !(webusb.isAdb() || webusb.isFastboot())){
                throw new Error("Could not open either ADB or Fastboot");
            }
        }
        //let adb = await webusb.connectAdb("host::");
        //let shell = await adb.shell("uname -a");
        console.log(await shell.receive());
    }catch(error){
        console.log(error);
    }
    */
}
function usb_conf_find(device, filter) {
    for (let i in device.configurations) {
        let conf = device.configurations[i];
        for (let j in conf.interfaces) {
            let intf = conf.interfaces[j];
            for (let k in intf.alternates) {
                let alt = intf.alternates[k];
                if (filter.classCode == alt.interfaceClass &&
                    filter.subclassCode == alt.interfaceSubclass &&
                    filter.protocolCode == alt.interfaceProtocol) {
                    return { conf: conf, intf: intf, alt: alt };
                }
            }
        }
    }
    return null;
}
async function usb() {
    navigator.usb.addEventListener('connect', event => {
        console.log("Connect")
        // Add |event.device| to the UI.
    });

    navigator.usb.addEventListener('disconnect', event => {
        console.log("Disconnect")
        // Remove |event.device| from the UI.
    });
    let device = await navigator.usb.requestDevice({ filters: filters })
    console.log("Device requested")
    console.log(device)
    let conf_match = usb_conf_find(device, { classCode: 255, subclassCode: 66, protocolCode: 1 });
    console.log(conf_match)
    let op = await device.open()
    console.log("Connected")
    console.log(op)
    await device.selectConfiguration(conf_match.conf.selectConfiguration)
    console.log("A")
    await device.claimInterface(conf_match.intf.interfaceNumber)
    console.log("B")
    //device.selectConfiguration(conf_match.conf.selectConfiguration)
    console.log("Opened")
    console.log(device.opened)
}
function usb_test() {
    //adb_test(); 
    usb();

}
