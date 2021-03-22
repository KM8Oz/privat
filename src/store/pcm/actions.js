
export default {
    videos: (context, response)=>{
        context.commit( 'offlineVideos' ,{videos:response})
        context.commit( 'subedVideos' ,{videos:response})
        context.commit( 'unsubedVideos' ,{videos:response})
    },
    platform: (context, response)=>{
        context.commit( 'platform' ,{plt:response})
    },
    liking:(context,res)=>{
        context.commit( 'liking' ,{res:res})
    },
    subscribing:(context,res)=>{
        context.commit( 'subscribing' ,{res:res})
    },
    updateSlides(context, res) {
        context.commit('updateSlides', {status:res.status})
    },
    categoSlides(context, res) {
        context.commit('categoSlides', {tags:res})
    },
    commenting(context, res){
     context.commit('commenting', {index:res.index})
    },
    commenting_mobile(context, res){
        context.commit('commenting', {index:res.index,tab:res.tab, auth:res.auth})
       },
    muteall:function(context, res){
        context.commit('muteall', {status:res.status})
        },
        theme:function(context, res){
            context.commit('theme', {status:res.status})
        },
        moreVideos: function(context, res){
            context.commit('moreVideos', res)
        },
}
