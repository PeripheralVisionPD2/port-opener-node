const NatAPI = require('nat-api')
const client = new NatAPI()
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("[PORT OPENNER] What port would you like to open?: ", (res) => {
    res = parseInt(res)
    console.log("[PORT OPENNER] Attempting to open port " + res.toString())
    client.map(res, (err) => {
        if (err) {
            console.log("[PORT OPENNER] An error occured while mapping the port!")
            return
        }
        console.log("[PORT OPENNER] Port successfully mapped!")
        rl.question("[PORT OPENNER] Press ENTER to unmap and exit.", () => {
            client.unmap(res, (err) => {
                if (err) {
                    console.log("[PORT OPENNER] An error occured while unmapping the port!")
                }
                console.log("[PORT OPENNER] Port successfully unmapped!")
                client.destroy(() => {
                    console.log("[PORT OPENNER] Successfully destroyed client, bye!")
                    process.exit()
                })
            })
        })
    })
})