const fs = require('fs')

//书籍详情网页，例如https://book.qidian.com/info/1014130981#Catalog
module.exports = function excute (queue, url) {

    return new Promise((resolve) => {
        if (/info/.test(url)) {
            queue({
                uri: 'https://book.qidian.com/info/1014130981#Catalog',
                jQuery: {
                    name: 'cheerio',
                    options: {
                        decodeEntities: false
                    }
                },
                callback: (error, res, done) => {
                    if(error){
                        console.log(error);
                    }else{
                        let $ = res.$;
                        let title = $('.book-info > h1 > em').html()
                        console.log(title)
                        let author = $('.writer').html()
                        let tagEles = $('.tag .red')
                        let tags = []
                        for(let i=0; i < tagEles.length; i++) {
                            tags.push(tagEles.eq(i).html())
                        }
                        let img = $('.J-getJumpUrl > img')[0].src
                        let catalogEles = $('#j-catalogWrap .volume:nth-child(2) a[data-cid]')
                        let catalog = []
                        for(let i=0; i < catalogEles.length; i++) {
                            catalog.push({
                                title: catalogEles.eq(i).html().substr(2),
                                chapter: catalogEles.eq(i).attr('href')
                            })
                        }
                        let dbdata = {
                            name:  title,
                            author: author,
                            w_num:	null,
                            tags: tags,
                            img: img,
                            catalog: catalog
                        }
                        resolve({
                            raw: res,
                            dbdata: dbdata,
                            source: 'qidian',
                            title: `《${title}》`
                        })
                    }
                    done();
                }
            })
        }
    })
}