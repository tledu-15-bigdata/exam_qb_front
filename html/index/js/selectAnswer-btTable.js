$(function(){
    //页面加载完毕，调用bt加载表格数据
    load();
})


//刷新表格
function reLoad(){
    //bt表格会自动搞定刷新数据
    $('#selectAnswer-table').bootstrapTable('refresh');
}

//加载数据
function load(){
    let url = BASIC_URL+"getTopicInfo";
    $("#selectAnswer-table").bootstrapTable({
        formatLoadingMessage:function()
        {
            return "数据加载中...";
        },
        formatNoMatches:function(){
            return "无匹配数据";
        },
        url:url,
        method:"POST",
        dataType:"JSON",
        // sidePagination: "client",
        sidePagination: "server",  //后端分页
        striped: true, //隔行换色
        pageNumber:1, //初始化加载第一页
        pagination:true, //是否分页
        pageSize:5,   //单页记录数
        queryParams:function (params){
            let temp = {
                uId:JSON.parse(localStorage.getItem("Info")).uId,
                // uId : JSON.parse(localStorage.getItem("Info")).uId,
                offset : params.offset,
                pageSize : params.limit
            };
            return JSON.stringify(temp);
        },
        columns:[
            {
                title:"<input type='checkbox' class='selectAll' onclick='selectAll()'/>全选",
                align:"center",
                halign:"center",
                formatter:function (value,row,index){
                    return "<input type='checkbox' class='addTestAnswer' value='"+row.aId+"'/>"+(index+1);
                }
            },
            {
                title: "试题详情",
                align:"center",
                halign:"center",
                formatter:function (value,row,index){
                    return "<p>["+row.aType+"]"+row.aTopic+"("+row.aScore+"分)</p><p style='color: gray'>"+row.cName+"</p>"
                }
            }]

    })

}
// 以下代码解决后台分页无法保存分页选中问题
var $table = $('#selectAnswer-table')
var selectionIds = []
//选中事件操作数组
var union = function (array, ids) {
    $.each(ids, function (i, id) {
        if ($.inArray(id, array) == -1) {
            array[array.length] = id;
        }
    });
    return array;
};
//取消选中事件操作数组
var difference = function (array, ids) {
    $.each(ids, function (i, id) {
        var index = $.inArray(id, array);
        if (index != -1) {
            array.splice(index, 1);
        }
    });
    return array;
};
var _ = { "union": union, "difference": difference };
//绑定选中事件、取消事件、全部选中、全部取消
$table.on('check.bs.table check-all.bs.table uncheck.bs.table uncheck-all.bs.table', function (e, rows) {
    console.log(1111, selectionIds)
    var ids = $.map(!$.isArray(rows) ? [rows] : rows, function (row) {
        return row.id;
    });
    func = $.inArray(e.type, ['check', 'check-all']) > -1 ? 'union' : 'difference';
    selectionIds = _[func](selectionIds, ids);
});


// // 以下代码解决后台分页无法保存分页选中问题
// var $table = $('#selectAnswer-table')
// var selectionIds = []
// //选中事件操作数组
// var union = function (array, ids) {
//     $.each(ids, function (i, id) {
//         if ($.inArray(id, array) == -1) {
//             array[array.length] = id;
//         }
//     });
//     return array;
// };
// //取消选中事件操作数组
// var difference = function (array, ids) {
//     $.each(ids, function (i, id) {
//         var index = $.inArray(id, array);
//         if (index != -1) {
//             array.splice(index, 1);
//         }
//     });
//     return array;
// };
// var _ = { "union": union, "difference": difference };
// //绑定选中事件、取消事件、全部选中、全部取消
// $table.on('check.bs.table check-all.bs.table uncheck.bs.table uncheck-all.bs.table', function (e, rows) {
//     console.log(1111, selectionIds)
//     var ids = $.map(!$.isArray(rows) ? [rows] : rows, function (row) {
//         return row.id;
//     });
//     func = $.inArray(e.type, ['check', 'check-all']) > -1 ? 'union' : 'difference';
//     selectionIds = _[func](selectionIds, ids);
// });