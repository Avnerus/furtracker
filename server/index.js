import express from 'express';
import socketio from 'socket.io'
import _ from 'lodash';

import nuimotion from 'nuimotion';

const app = express();
const server = require('http').Server(app);
const io = socketio(server);

app.use(express.static('public'));


nuimotion.startSkeletonListener( [
    nuimotion.Joints.LEFT_HAND,
    nuimotion.Joints.RIGHT_HAND ],
    onSkeletonUpdate /* , 50 (the default) */ );

nuimotion.addListener(
    [ nuimotion.Events.SKELETON_TRACKING,
        nuimotion.Events.SKELETON_STOPPED_TRACKING ],
onEvent );

server.listen(3000, function () {
      console.log('listening on port 3000!');
});

nuimotion.init();

process.on('exit', function() {
    nuimotion.close();
});


function onSkeletonUpdate(skeleton) {
    console.log(skeleton);
}

function onEvent(event) {
    if (event.eventType == nuimotion.Events.GESTURE) {
        console.log("Gesture: " + event.gestureType + " Hand: " + event.hand + " State: " + event.step);
    } else {
        console.log("Event: " + event.eventType);
    }
}
