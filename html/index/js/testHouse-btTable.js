$(function(){
    //页面加载完毕，调用bt加载表格数据
    load();
})


//刷新表格
function reLoad(){
    //bt表格会自动搞定刷新数据
    $('#test-btTable').bootstrapTable('refresh');
}

//加载数据
function load(){
    let url = BASIC_URL+"getTestInfo";
    $("#test-btTable").bootstrapTable({
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
        pageSize:2,   //单页记录数
        queryParams:function (params){
            let temp = {
                uId : JSON.parse(localStorage.getItem("Info")).uId,
                offset : params.offset,
                pageSize : params.limit
            };
            return JSON.stringify(temp);
        },
        columns:[
            {
                // title:"行号",
                title:"<input type='checkbox' class='selectAllTest' onclick='selectAllTest()'/>",
                align:"center",
                halign:"center",
                formatter:function (value,row,index){
                    return "<input type='checkbox' class='deleteTests' value='"+row.atId+"'/>"+(index+1);
                }
            },
            {
                title: "类型",
                align:"center",
                halign:"center",
                field:"tType"
            },
            {
                title: "标题",
                align:"center",
                halign:"center",
                field: "title"
            },
            {
                title: "状态",
                align:"center",
                halign:"center",
                field: "status",
                formatter:function (value,row,index){
                    if (value==1){
                        return "已开启";
                    }else{
                        return "未开启";
                    }
                }
            },
            {
                title: "考试时长",
                align:"center",
                halign:"center",
                field: "tTime"
            },
            {
                title: "考试开始时间",
                align:"center",
                halign:"center",
                field: "tBeginTime"
            },
            {
                title: "考试结束时间",
                align:"center",
                halign:"center",
                field: "tEndTime"
            },
            {
                title: "创建时间",
                align:"center",
                halign:"center",
                field: "tCreatTime"
            },
            {
                title: "管理",
                align:'center',//列名称、列数据居中 水平居中
                halign:'center', //垂直居中
                width:'50px',//设置列宽
                formatter:function(value,row,index){
                    //如果将来 涉及到字符串数据传入参数  需要设置单引号
                    localStorage.setItem("tId",row.tId);
                    let setupTest='<a onclick="setupTest(\''+row.tId+'\')">考试设置</a>'
                    let setupAnswer='<a onclick="setupAnswer()">试题设置</a>'
                    let deleteTest='<a onclick="deleteTest(\''+row.tId+'\')">删除试卷</a>'
                    return setupTest+" "+setupAnswer+" "+deleteTest;
                }

            }
        ],
        // onDblClickRow(row,$element){
        //     console.log(row)
        //     lookDetail(row.tId);
        //     // console.log($element.innerHTML)
        // }

    })

}

//考试设置
function setupTest(){
    layer.open({
        type: 2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
        title: '考试设置',
        maxmin: false,
        shadeClose: false,
        area: ['500px', '50%'],//弹出层的宽高
        content: 'setupTest.html'//设置弹出层打开的页面
    });
}
//试题设置
function setupAnswer(){
    layer.open({
        type: 2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
        title: '试题设置',
        maxmin: false,
        shadeClose: false,
        area: ['1200px', '90%'],//弹出层的宽高
        content: 'setupAnswer.html'//设置弹出层打开的页面
    });
}
//删除试卷及其试题
function deleteTest(tId){
    let jsondata={};
    let data={};
    data.tId=tId;
    let array=new Array();
    array.push(data);
    jsondata.deleteTestInfo=array;
    $.ajax({
        url: BASIC_URL+"deleteTestInfo",
        data:JSON.stringify(jsondata),
        type:"post",
        contentType:"application/json",
        dataType: "json",
        success:function (result){
            if (result.mark){
                alert("删除成功！！！");
            }else {
                alert("删除失败！！！");
            }
        }
    })
}