const http = require("http");

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.setHeader('Content-Type', 'text/plain');
        res.end('<h1>Hello World</h1>');
    }
    else if(req.url === '/reports'){
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Reports Page</h1>');
    }
    else if(req.url === '/about'){
        res.setHeader('Content-Type', 'text/javascript');
        res.end('About Page');
    }
    else if(req.url === '/data'){
        res.setHeader('Content-Type', 'application/json');
        res.end("ended");
    }
    else if(req.url === "/adddata" && req.method === "POST"){
        //some logic to get the payload sent by client.
        let str = ""
        console.log(req);
        req.on("data", (chunk)=>{
            str += chunk
        })
        //console.log(str)// will not print it as the event has not been finished
        req.on("end", () => {
            console.log(res) //now we can get the data
            console.log(str) //now we can get the data
        })
        res.end("data has been sent");
    }
    
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});