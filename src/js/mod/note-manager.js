import Toast from './toast.js'
import {Note}  from './note.js'
import Event from './event.js'
import $ from 'jquery'

var NoteManager = (function(){
    function load(){
        $.get('./api/notes')
        .done(function(ret){
            if(ret.status ===0 ){
                $.each(ret.data,function(idx,article){
                    new Note({
                        id: article.id,
                        context: article.text
                    });
                });
                Toast('更新')
                Event.fire('waterfall');
            }else{
                Toast(ret.errorMsg);
            }
        })
        .fail(function(){
            Toast('网络异常');
        })
    }
    function add(){
        new Note();
         Toast('添加成功')
    }

    return {
        load: load,
        add: add
    }

})()

export default NoteManager