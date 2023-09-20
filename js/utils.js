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
