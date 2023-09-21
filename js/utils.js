function controllerInput() {
    if (controllerIdx !== null) {
        const gamepad = navigator.getGamepads()[controllerIdx];
        
        const buttons = gamepad.buttons;
        upPressed     = buttons[12].pressed;
        downPressed   = buttons[13].pressed;
        leftPressed   = buttons[14].pressed;
        rightPressed  = buttons[15].pressed;
        aPressed      = buttons[0].pressed;
        bPressed      = buttons[1].pressed;
        xPressed      = buttons[2].pressed;
        yPressed      = buttons[3].pressed;
        ltPressed     = buttons[6].pressed;
        rtPressed     = buttons[7].pressed;
        
        const stickDeadZone = 0.8;
        
        const leftRightValue = gamepad.axes[0];
        if (leftRightValue >= stickDeadZone) {
            rightPressed = true;
        } else if (leftRightValue <= -stickDeadZone) {
            leftPressed = true;
        }
        
        const upDownValue = gamepad.axes[1];
        if (upDownValue >= stickDeadZone) {
            downPressed = true;
        } else if (upDownValue <= -stickDeadZone) {
            upPressed = true;
        }
    }
}

Array.prototype.createObjectsFrom2D = function () {
    const objects = [];
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 555) {
                objects.push(new CollisionBlock({
                    position: {
                        x: x * 64,
                        y: y * 64,
                    }
                }))
            }
        })
    })
    
    return objects;
}