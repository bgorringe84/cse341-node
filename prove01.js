const http = require('http');

const userList = ['User 1', 'User 2'];

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Prove 1</title></head>');
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    
    res.write('<html>');
    res.write('<head><title>Prove 1<</title></head>');
    res.write('<body><ul>');
    for (const user of userList) {
      res.write(`<li>${user}</li>`);
    }
    res.write('</ul><input type="button" value="Add another user" onclick="history.go(-1)"></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/create-user') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody.split('=')[1]);
      userList.push(parsedBody.split('=')[1]);
    });
    res.statusCode = 302;
    res.setHeader('Location', 'users');
    res.end();
  }
});

server.listen(3000);