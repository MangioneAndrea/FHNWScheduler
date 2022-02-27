const net = require("net")
const client = new net.Socket();
//instruction packet from protocol:
//header: 0xA5 0x5A
//length: 0x00 0x05
//instruction code: 0x52 (device response depending on this code)
//parameters: 0x00 0x00 0x00 0x05
//ending: 0x0D 0x0A
const header = "A55A";
const length = "0005";
const instruction = "08";
const params = "00000005";
const end = "0D0A"
const hex = `${header}${length}${instruction}${params}${end}`
const reqHex = Buffer.from(hex, 'hex');
client.connect(139, "fs.edu.ds.fhnw.ch", () => {
    console.log('Connected to server');
    client.write(reqHex);
});

client.on('data', (data) => { //listen to data response from device
    console.log('Received from device: ' + data.toString("hex"));
    client.destroy();
});
client.on('error', (data) => { //listen to data response from device
    console.log('Received from device: ' + data);
    client.destroy();
});

client.on('close', () => {
    console.log('Connection to device closed');
});