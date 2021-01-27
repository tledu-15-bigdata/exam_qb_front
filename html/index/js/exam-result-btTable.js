$(function(){

    //页面加载完毕，调用bt加载表格数据
    load();



})


//刷新表格
function reLoad(){
    //bt表格会自动搞定刷新数据
    $('#btTable').bootstrapTable('refresh');
}

//加载数据
function load(){
    let url = BASIC_URL+"getExamineeInfo";
    $("#examResultTable").bootstrapTable({
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
        pageSize:10,   //单页记录数
        queryParams:function (params){
            let temp = {
                uId : localStorage.getItem("tId"),
                offset : params.offset,
                pageSize : params.limit
            };
            return JSON.stringify(temp);
        },
        columns:[
            // {
            //     // title:"行号",
            //     align:"center",
            //     halign:"center",
            //     formatter:function (value,row,index){
            //         console.log(row);
            //         console.log(row.aId);
            //         return "<input type='checkbox' class='test-delete-more' value='"+row.aId+"'/>";
            //     }
            // },
            {
                title:"序号",
                align:"center",
                halign:"center",
                formatter:function (value,row,index){
                    return index+1;
                }
            },
            {
                title: "登录号",
                align:"center",
                halign:"center",
                field:"eAcc"
            },
            {
                title: "考生姓名",
                align:"center",
                halign:"center",
                field: "eName"
            },
            {
                title: "考生成绩",
                align:"center",
                halign:"center",
                field: "eScore"
            },
            {
                title: "登录时间",
                align:"center",
                halign:"center",
                field: "loginTime"
            },
            {
                title: "开始时间",
                align:"center",
                halign:"center",
                field: "beginTime"
            },
            {
                title: "交卷时间",
                align:"center",
                halign:"center",
                field: "endTime"
            },
            {
                title: "是否交卷",
                align:"center",
                halign:"center",
                field: "status",
                formatter:function (value,row,index){
                    let status="已交卷";
                    if (value==0){
                        status="未交卷"
                    }
                    return status;
                }
            },
            // {
            //     title: "操作",
            //     align:'center',//列名称、列数据居中 水平居中
            //     halign:'center', //垂直居中
            //     width:'50px',//设置列宽
            //     formatter:function(value,row,index){
            //         //如果将来 涉及到字符串数据传入参数  需要设置单引号
            //         let d='<a href="javascript:void(0);" onclick="removeData(\''+row.aId+'\')">删除</a>'
            //         let m='<a href="javascript:void(0);" onclick="modifyGoods(\''+row.aId+'\',\''+row.aType+'\')">修改</a>'
            //         return d+" "+m;
            //     }
            //
            // }
        ],
        // onDblClickRow(row,$element){
        //     console.log(row)
        //     lookDetail(row.aId);
        //     // console.log($element.innerHTML)
        // }

    })

}
