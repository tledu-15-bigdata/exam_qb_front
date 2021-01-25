$(function(){
    //页面加载完毕，调用bt加载表格数据
    load();
})


//刷新表格
function reLoad(){
    //bt表格会自动搞定刷新数据
    $('#testAnswer-btTable').bootstrapTable('refresh');
}

//加载数据
function load(){
    let url = BASIC_URL+"getAtTableInfo";
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
            {
                title: "<input type='checkbox' class='selectAllTestAnswer' onclick='selectAllTestAnswer()'/>全选",
                align:"center",
                halign:"center",
                formatter:function (value,row,index){
                    return "<input type='checkbox' class='deleteTestAnswer' value='"+row.atId+"'/>"+(index+1);
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

}