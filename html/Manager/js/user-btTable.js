$(function(){
    //页面加载完毕，调用bt加载表格数据
    load();
})


//刷新表格
function reLoad(){
    //bt表格会自动搞定刷新数据
    $('#user-btTable').bootstrapTable('refresh');
}


function load(){
    $("#user-btTable").bootstrapTable({
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
                title: "id",
                align: "center",
                halign: "center",
                field:"uId"
            },
            {
                title: "用户名",
                align: "center",
                halign: "center",
                field:"cc"
            },
            {
                title: "密码",
                align: "center",
                halign: "center",
                field:"pwd"
            },
            {
                title: "手机号",
                align: "center",
                halign: "center",
                field:"phone"
            },
            {
                title: "邮箱",
                align: "center",
                halign: "center",
                field:"email"
            },
            {
                title: "状态",
                align: "center",
                halign: "center",
                field:"isAllow",
                formatter:function (value,row,index){
                    let text = "正常";
                    if (value==0){
                        text = "被禁用";
                    }
                    return text;
                }
            },
            {
                title: "创建时间",
                align: "center",
                halign: "center",
                field:"createTime"
            },
            {
                title: "操作",
                align: "center",
                halign: "center",
                formatter:function (value, row, index){
                    let deleteTest='<a onclick="deleteUser(\''+row.uId+'\')">删除</a>';
                    let initTest='<a onclick="initPwd(\''+row.uId+'\')">初始化密码</a>';
                    let status = '';
                    if (row.isAllow===0){
                        status='<a onclick="changeStatus(\''+row.uId+'\',\''+row.isAllow+'\')">启用</a>';
                    }else {
                        status='<a onclick="changeStatus(\''+row.uId+'\',\''+row.isAllow+'\')">禁用</a>';
                    }
                    return status+" "+initTest+" "+deleteTest;
                }
            },
        ]

    })

}

function changeStatus(uId,isAllow){
    let jsondata={};
    jsondata.uId=uId;
    jsondata.isAllow=isAllow;
    console.log(jsondata);
    $.ajax({
        url: BASIC_URL + "updateIsAllow",
        type: "post",
        data: JSON.stringify(jsondata),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            console.log(result)
            if (result.mark) {
                if (isAllow===0){
                    alert("启用成功！！")
                }else {
                    alert("禁用成功！！")
                }
                reLoad();
            } else {
                if (isAllow===0){
                    alert("启用失败！！")
                }else {
                    alert("禁用失败！！")
                }
            }
        }
    })
}


function initPwd(tId) {
    let jsondata = {}
    jsondata.uId = uId;
    console.log(jsondata)
    $.ajax({
        url: BASIC_URL + "initPwd",
        type: "post",
        data: JSON.stringify(jsondata),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            console.log(result)
            if (result.mark) {
                alert("密码初始化成功，初始密码为:123456！！")
                reLoad();
            } else {
                alert("密码初始化失败！！")
            }
        }
    })
}

function deleteUser(uId){
    // console.log(menuId)
    let jsondata={}
    jsondata.uId=uId;
    console.log(jsondata)
    $.ajax({
        url: BASIC_URL+"deleteUser",
        type:"post",
        data:JSON.stringify(jsondata),
        contentType:"application/json",
        dataType: "json",
        success:function (result){
            console.log(result)
            if (result.mark){
                alert("删除用户成功！！")
                reLoad();
            }else {
                alert("删除用户失败！！")
            }
        }
    })

}
