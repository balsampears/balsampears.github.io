
 initCatalog()
 formatMultiLi()
 //初始化目录结构
 function initCatalog(){
     let $ul = $('#sidebarContent')
     let $template = $('<li class="chapter path" data-level="1.1"><div style="padding: 10px 15px; font-weight: bolder" onclick="upAndDown(event)"></div></li>')
     let $lis = $('#sidebarContent > li')

     $.each($lis, function(index, li){
         let pathStr = $(li).attr("path")
         let paths = getTruePath(pathStr)
         if (paths == null)
             return
         // 如果真实的路径没有生成目录的话，生成目录
         for (i=0;i<paths.length;i++){
             let path = paths[i]
             if ($('#'+path)[0] == undefined){
                 let $path = $template.clone().attr('id', path).css('display','block')
                 // 第一层目录直接插入，多层目录则插入到上一级目录中
                 $path.find('div').text(path)
                 // $ul.append($path)
                 if (i == 0){
                     $ul.append($path)
                 } else {
                     $('#'+paths[i - 1]).append($path)
                 }
             }
         }
         $('#'+paths[paths.length - 1]).append(this)
     })
 }
 //转换path为目录结构
 function getTruePath(path){
     if (path == undefined)
         return null
     let reg = /(?<=_posts\/).*(?=\/)/i
     let tPath = path.match(reg)
     if (tPath == null)
         return null
     tPath = tPath[0].split('/')
    //  console.log('原来的path:',path,'新的path:',tPath)
     return tPath
 }
 //格式化多层样式
 function formatMultiLi($lis){
     if ($lis == undefined)
         $lis = $('#sidebarContent > li')

     $.each($lis, function(index, li){
        // console.log($(li).find('.path'))
        $childLi = $(li).children(".post, .path")
         //若其下有子元素，则让子元素右移，本元素添加按钮
         if ($childLi.text() != undefined && $childLi.text() != ''){
             // console.log($childLi)
             $childLi.css('margin-left', '15px')
             //递归子元素
             formatMultiLi($childLi)
         }
     })
 }
 //目录隐藏或展开
 function upAndDown(event){
     let $li = $('#'+$(event.target).text())
    //  console.log($li)
     //隐藏
     if ($li.attr('isClosed') == undefined){
        //  console.log($li.children())
         $.each($li.children(),function(index, li){
             if (index == 0) 
                 return
             $(li).css('display','none')
         })
         $li.attr('isClosed','isClosed')
     } else {
         //展开
         $li.removeAttr('isClosed')
         $li.children().css('display','block')
     }
 }