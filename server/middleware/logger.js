module.exports = function () {
    return function ( ctx, next ) {
        console.log('/logger=============')
        next()
    }
}