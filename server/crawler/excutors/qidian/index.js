const fs = require('fs')

//书籍详情网页，例如https://book.qidian.com/info/1014130981#Catalog
module.exports = function excute (queue) {
    console.log('qidian: ', global.config)
    new Promise(resolve => {
        queue({
            uri: 'https://book.qidian.com/info/1014130981#Catalog',
            callback : function (error, res, done) {
                if(error){
                    console.log(error);
                }else{
                    var $ = res.$;
                    console.log($("title").text());
                }
                done();
            }
        })
    }).then( res => {
        queue({
            callback : function (error, res, done) {
                if(error){
                    console.log(error);
                }else{
                    var $ = res.$;
                    console.log($("title").text());
                }
                done();
            }
        })
    }) 
}