const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  allowEIO3: true,
  allowEIO4: true,
  serveClient: true,
  cors: { origin: '*' },
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});

let serverID = 'undefined';

const hololensFeed = io.of('/holo');

hololensFeed.on('connection', function (socket) {
    console.log('a Hololens user connected: ' + socket.id + ' (server: ' + serverID + ' )');
    //register the server id, received the command from unity
    socket.on('RegServerId', function (data) {
      serverID = socket.id;
      console.log('reg server id : ' + serverID);
    });

    socket.on('disconnect', function () {
      if (serverID == socket.id) {
        serverID = 'undefined';
        console.log('removed Server: ' + socket.id);
      } else {
        console.log('Hololens user disconnected: ' + socket.id);
      }
    });

    socket.on('OnReceiveData', function (data) {
      if (serverID != 'undefined') {
        switch (data.EmitType) {
          //emit type: all;
          case 0:
            io.emit('OnReceiveData', { DataString: data.DataString, DataByte: data.DataByte });
            break;
          //emit type: server;
          case 1:
            io.to(serverID).emit('OnReceiveData', { DataString: data.DataString, DataByte: data.DataByte });
            break;
          //emit type: others;
          case 2:
            socket.broadcast.emit('OnReceiveData', { DataString: data.DataString, DataByte: data.DataByte });
            break;
        }
      } else {
        console.log('cannot find any active server');
      }
    });
  });


const nucFeed = io.of('/nuc');

nucFeed.on('connection', function (socket) {
    console.log('NUC connected: ' + socket.id + ' (server: ' + serverID + ' )');
    //register the server id, received the command from unity
    socket.on('RegServerId', function (data) {
      serverID = socket.id;
      console.log('reg server id : ' + serverID);
    });

    socket.on('disconnect', function () {
      if (serverID == socket.id) {
        serverID = 'undefined';
        console.log('removed Server: ' + socket.id);
      } else {
        console.log('NUC disconnected: ' + socket.id);
      }
    });

    socket.on('OnReceiveData', function (data) {
      if (serverID != 'undefined') {
        switch (data.EmitType) {
          //emit type: all;
          case 0:
            io.emit('OnReceiveData', { DataString: data.DataString, DataByte: data.DataByte });
            break;
          //emit type: server;
          case 1:
            io.to(serverID).emit('OnReceiveData', { DataString: data.DataString, DataByte: data.DataByte });
            break;
          //emit type: others;
          case 2:
            socket.broadcast.emit('OnReceiveData', { DataString: data.DataString, DataByte: data.DataByte });
            break;
        }
      } else {
        console.log('cannot find any active server');
      }
    });
  });

  const doctorFeed = io.of('/doctor');

doctorFeed.on('connection', function (socket) {
    console.log('NUC connected: ' + socket.id + ' (server: ' + serverID + ' )');
    //register the server id, received the command from unity
    socket.on('RegServerId', function (data) {
      serverID = socket.id;
      console.log('reg server id : ' + serverID);
    });

    socket.on('disconnect', function () {
      if (serverID == socket.id) {
        serverID = 'undefined';
        console.log('removed Server: ' + socket.id);
      } else {
        console.log('NUC disconnected: ' + socket.id);
      }
    });

    socket.on('OnReceiveData', function (data) {
      if (serverID != 'undefined') {
        switch (data.EmitType) {
          //emit type: all;
          case 0:
            io.emit('OnReceiveData', { DataString: data.DataString, DataByte: data.DataByte });
            break;
          //emit type: server;
          case 1:
            io.to(serverID).emit('OnReceiveData', { DataString: data.DataString, DataByte: data.DataByte });
            break;
          //emit type: others;
          case 2:
            socket.broadcast.emit('OnReceiveData', { DataString: data.DataString, DataByte: data.DataByte });
            break;
        }
      } else {
        console.log('cannot find any active server');
      }
    });
  });

