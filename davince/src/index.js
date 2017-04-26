import getInitialState from './getInitialState';
import addPlayer from './addPlayer';
import drawCard from './drawCard'
const DB = [];
const ClientPool = [];
let DBPointer = -1;
function handler(client){
  const cache = {
    roomId: null,
    whoAmI: null
  };
  client.on('init', function (data) {
    const { userName, roomId } = data;
    let initRoom = null;
    let initClients = [];
    if(roomId) {
      cache.roomId = roomId
      initRoom = DB[roomId];
      initClients = ClientPool[roomId];
    } else {
      cache.roomId = ++DBPointer;
      initRoom = getInitialState(DBPointer)
    }
    const { room, playerId } = addPlayer(initRoom, userName)
    initClients.push({client, whoAmI: playerId});
    DB[cache.roomId] = room;
    ClientPool[cache.roomId] = initClients;
    cache.whoAmI = playerId;
    // room.whoAmI = playerId;
    // client.emit('init', room)
    emit(cache.roomId, 'init')
  })
  client.on('draw', function(data){
    const room = DB[cache.roomId]
    const nextRoom = drawCard(room, data.player, data.index)
    client.emit('dirt', nextRoom)
  });
  client.on('event', function(data){
    client.emit('dirt', DB[cache.roomId])
  });
  client.on('disconnect', function(){console.log('disconnect')});
}

function emit(roomId, namespace) {
  const room = DB[roomId];
  const clients = ClientPool[roomId];
  clients.forEach((item) => {
    const {client, whoAmI} = item;
    room.whoAmI = whoAmI;
    client.emit(namespace, room)
  })
}

export default handler;