window.addEventListener('gamepadconnected', (event) => {
    controllerIdx = event.gamepad.index;
    console.log("connected")
});
window.addEventListener('gamepaddisconnected', (event) => {
    controllerIdx = null;
    console.log("disconnected")
});