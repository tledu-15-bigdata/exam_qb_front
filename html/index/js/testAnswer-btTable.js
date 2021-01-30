$(function(){
    //页面加载完毕，调用bt加载表格数据
    load();
})
var selections = []

//刷新表格
function reLoad(){
    //bt表格会自动搞定刷新数据
    $('#testAnswer-btTable').bootstrapTable('refresh');
}

//加载数据
function load(){
    let url = BASIC_URL+"getAtTableInfo";

    // 以下代码解决后台分页无法保存分页选中问题
// $("#testAnswer-btTable").bootstrapTable({
    var $table =
        $("#testAnswer-btTable").bootstrapTable({
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
            clickToSelect:true,		//是否选中
            maintainSelected:true,
            responseHandler:function(res){
                $.each(res.rows, function (i, row) {
                    row.checkStatus = $.inArray(row.atId, selections) != -1;	//判断当前行的数据id是否存在与选中的数组，存在则将多选框状态变为true
                    //注意这里的row.id 中的id指的是列表的主键，替换成你使用的就行了比如 studentId等
                    console.log(row.checkStatus)
                });
                return res;
            },
            queryParams:function (params){
                let temp = {
                    tId:localStorage.getItem("tId"),
                    // uId : JSON.parse(localStorage.getItem("Info")).uId,
                    offset : params.offset,
                    pageSize : params.limit
                };
                console.log(temp);
                return JSON.stringify(temp);
            },
            columns:[
                // {
                //     title: "<input type='checkbox' class='selectAllTestAnswer' onclick='selectAllTestAnswer()'/>全选",
                //     align:"center",
                //     halign:"center",
                //     formatter:function (value,row,index){
                //         return "<input type='checkbox' class='deleteTestAnswer' value='"+row.atId+"'/>"+(index+1);
                //     }
                //     // title: "全选",
                //     // align: "center",
                //     // halign: "center",
                //     // checkbox:true
                // },
                {
                    title: "行号",
                    filed:"checkStatus",
                    align:"center",//水平居中
                    halign:"center",//垂直居中
                    // formatter:function(value,row,index){
                    //     return index+1;
                    // }
                    checkbox: true,
                    //注意①
                    formatter:function(value,row,index){
                        // console.log("----------"+row.checkStatus);
                        // return true;
                        return row.checkStatus;
                    }
                },
                {
                    title: "试题详情",
                    align:"center",
                    halign:"center",
                    formatter:function (value,row,index){
                        if (row.atType==="单选题"){
                            return "<p>["+row.atType+"]"+row.atTopic+"("+row.atScore+"分)</p><p style='color: gray'>"+row.cName+"</p><p class='singel'>A、"+row.atA+"</p><p class='singel'>B、"+row.atB+"</p><p class='singel'>C、"+row.atC+"</p><p class='singel'>D、"+row.atD+"</p><p>正确答案："+row.atAnswer+"</p>"
                        }else if (row.atType==="简答题"){
                            return "<p>["+row.atType+"]"+row.atTopic+"("+row.atScore+"分)</p><p style='color: gray'>"+row.cName+"</p><p>正确答案："+row.atAnswer+"</p>"
                        }
                    }
                }]

        })


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
        // console.log(1111, selectionIds)
        console.log("11111111111")
        var ids = $.map(!$.isArray(rows) ? [rows] : rows,
            function (row) {
                return row.atId;//注意这里的row.id 中的id指的是列表的主键，替换成你使用的就行了比如 studentId等
            })
        var    func = $.inArray(e.type, ['check', 'check-all']) > -1 ? 'union' : 'difference';
        selections = _[func](selections, ids);

    });

}

// function responseHandler(res) {
//     $.each(res.rows, function (i, row) {
//         row.checkStatus = $.inArray(row.id, selectionIds) != -1;	//判断当前行的数据id是否存在与选中的数组，存在则将多选框状态变为true
//     });
//     return res;
// }

