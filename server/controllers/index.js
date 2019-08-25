module.exports = async ( ctx ) => {
    const title = 'home'
    console.log('home===============')
    ctx.session = {
      name: 'ivin'
    }
    await ctx.render('index', {
      title
    })
  }