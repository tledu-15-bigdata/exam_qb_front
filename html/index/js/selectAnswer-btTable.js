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