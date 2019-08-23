module.exports = {
    async indexPage ( ctx ) {
        console.log('admin================')
        console.log(ctx.status)
        const title = 'admin page'
        await ctx.render('admin', {
            title,
        })
    },
}