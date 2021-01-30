$(function(){
    //页面加载完毕，调用bt加载表格数据
    load();
})


//刷新表格
function reLoad(){
    //bt表格会自动搞定刷新数据
    $('#menu-btTable').bootstrapTable('refresh');
}


function load(){
    $("#menu-btTable").bootstrapTable({
        formatLoadingMessage:function()
        {
            return "数据加载中...";
        },
        formatNoMatches:function(){
            return "无匹配数据";
        },
        url:BASIC_URL+"showMenu",
        method:"POST",
        dataType:"JSON",
        sidePagination: "client",
        // sidePagination: "server",  //后端分页
        striped: false, //隔行换色
        // pageNumber:1, //初始化加载第一页
        pagination:false, //是否分页
        // pageSize:10,   //单页记录数
        columns:[
            {
                title:"序号",
                align:"center",
                halign:"center",
                formatter:function (value,row,index){
                    return index+1;
                }
            },
            {
                title: "菜单id",
                align: "center",
                halign: "center",
                field:"menuId"
            },
            {
                title: "菜单名字",
                align: "center",
                halign: "center",
                field:"menuName"
            },
            {
                title: "菜单级别",
                align: "center",
                halign: "center",
                field:"menuLevel"
            },
            {
                title: "创建时间",
                align: "center",
                halign: "center",
                field:"menuTime"
            },
            {
                title: "操作",
                align: "center",
                halign: "center",
                formatter:function (value, row, index){
                    let deleteTest='<a onclick="deleteMenu(\''+row.menuId+'\')">删除</a>'
                    return deleteTest;
                }
            },
        ]

    })

}

function deleteMenu(menuId){
    // console.log(menuId)
    let jsondata={}
    jsondata.menuId=menuId;
    console.log(jsondata)
    $.ajax({
        url: BASIC_URL+"deleteMenu",
        type:"post",
        data:JSON.stringify(jsondata),
        contentType:"application/json",
        dataType: "json",
        success:function (result){
            console.log(result)
            if (result.mark){
                alert("删除成功！！")
                reLoad();
            }else {
                alert("删除失败！！")
            }
        }
    })

}
