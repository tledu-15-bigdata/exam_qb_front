$(function () {
    //页面加载完毕，调用bt加载表格数据
    load();
})


//刷新表格
function reLoad() {
    //bt表格会自动搞定刷新数据
    $('#test-btTable').bootstrapTable('refresh');
}

var selections = [];

//加载数据
function load() {
    let url = BASIC_URL + "getTestInfo";
    var $table =
        $("#test-btTable").bootstrapTable({
            formatLoadingMessage: function () {
                return "数据加载中...";
            },
            formatNoMatches: function () {
                return "无匹配数据";
            },
            url: url,
            method: "POST",
            dataType: "JSON",
            // sidePagination: "client",
            sidePagination: "server",  //后端分页
            striped: true, //隔行换色
            pageNumber: 1, //初始化加载第一页
            pagination: true, //是否分页
            pageSize: 10,   //单页记录数
            clickToSelect: true,     //是否选中
            maintainSelected: true,
            responseHandler: function (res) {
                $.each(res.rows, function (i, row) {
                    //注意这里的row.id 中的id指的是列表的主键，替换成你使用的就行了比如 studentId等
                    row.checkStatus = $.inArray(row.tId, selections) !== -1;
                    console.log(row.checkStatus)
                });
                return res;
            },
            queryParams: function (params) {
                let temp = {
                    uId: JSON.parse(localStorage.getItem("Info")).uId,
                    offset: params.offset,
                    pageSize: params.limit
                };
                return JSON.stringify(temp);
            },
            columns: [
                // {
                //     // title:"行号",
                //     title:"<input type='checkbox' class='selectAllTest' onclick='selectAllTest()'/>",
                //     align:"center",
                //     halign:"center",
                //     formatter:function (value,row,index){
                //         return "<input type='checkbox' class='deleteTests' value='"+row.tId+"'/>"+(index+1);
                //     }
                // },

                {
                    title: '行号',
                    filed: 'checkStatus',
                    align: "center",//水平居中
                    halign: "center",//垂直居中
                    // formatter:function(value,row,index){
                    //     return index+1;
                    // }
                    checkbox: true,
                    //注意①
                    formatter: function (value, row, index) {
                        return row.checkStatus;
                    }
                },
                {
                    title: "序号",
                    align: "center",
                    halign: "center",
                    formatter: function (value, row, index) {
                        return (index + 1);
                    }
                },
                {
                    title: "类型",
                    align: "center",
                    halign: "center",
                    field: "tType"
                },
                {
                    title: "标题",
                    align: "center",
                    halign: "center",
                    field: "title"
                },
                {
                    title: "状态",
                    align: "center",
                    halign: "center",
                    field: "status",
                    formatter: function (value, row, index) {
                        if (value == 1) {
                            return "已开启";
                        } else {
                            return "未开启";
                        }
                    }
                },
                {
                    title: "考试时长",
                    align: "center",
                    halign: "center",
                    field: "tTime"
                },
                {
                    title: "考试开始时间",
                    align: "center",
                    halign: "center",
                    field: "tBeginTime"
                },
                {
                    title: "考试结束时间",
                    align: "center",
                    halign: "center",
                    field: "tEndTime"
                },
                {
                    title: "创建时间",
                    align: "center",
                    halign: "center",
                    field: "tCreateTime"
                },
                {
                    title: "管理",
                    align: 'center',//列名称、列数据居中 水平居中
                    halign: 'center', //垂直居中
                    width: '50px',//设置列宽
                    formatter: function (value, row, index) {
                        //如果将来 涉及到字符串数据传入参数  需要设置单引号
                        let setupTest = '<a onclick="setupTest(\'' + row.tId + '\')">考试设置</a>'
                        let setupAnswer = '<a onclick="setupAnswer(\'' + row.tId + '\')">试题设置</a>'
                        let testExamInfo = '<a onclick="lookForExamInfo(\'' + row.tId + '\')">考试结果</a>'
                        let deleteTest = '<a onclick="deleteTest(\'' + row.tId + '\')">删除试卷</a>'
                        return setupTest + " " + setupAnswer + " " + deleteTest + " " + testExamInfo;
                    }

                }
            ],
            // onDblClickRow(row,$element){
            //     console.log(row)
            //     lookDetail(row.tId);
            //     // console.log($element.innerHTML)
            // }

        })
//选中事件操作数组
    var union = function(array,ids){
        $.each(ids, function (i, id) {
            if($.inArray(id,array)==-1){
                array[array.length] = id;
            }
        });
        return array;
    };
    //取消选中事件操作数组
    var difference = function(array,ids){
        $.each(ids, function (i, id) {
            var index = $.inArray(id,array);
            if(index!=-1){
                array.splice(index, 1);
            }
        });
        return array;
    };
    var _ = {"union":union,"difference":difference};
    $table.on('check.bs.table check-all.bs.table ' +
        'uncheck.bs.table uncheck-all.bs.table', function (e, rows) {

        var ids = $.map(!$.isArray(rows) ? [rows] : rows,
            function (row) {
                return row.tId;//注意这里的row.id 中的id指的是列表的主键，替换成你使用的就行了比如 studentId等
            })
        var    func = $.inArray(e.type, ['check', 'check-all']) > -1 ? 'union' : 'difference';
        selections = _[func](selections, ids);

    });



}

//考试设置
function setupTest(tId) {
    localStorage.setItem("tId", tId);
    layer.open({
        type: 2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
        title: '考试设置',
        maxmin: false,
        shadeClose: false,
        area: ['800px', '50%'],//弹出层的宽高
        content: 'setupTest.html'//设置弹出层打开的页面
    });
}

//显示考试结果
function lookForExamInfo(tId) {
    localStorage.setItem("tId", tId);
    layer.open({
        type: 2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
        title: '题目修改',
        maxmin: false,
        shadeClose: false,
        area: ['1000px', '90%'],//弹出层的宽高
        content: 'examResult.html',//设置弹出层打开的页面

    });


}

//试题设置
function setupAnswer(tId) {
    localStorage.setItem("tId", tId);
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
function deleteTest(tId) {
    let jsondata = {};
    let data = {};
    data.tId = tId;
    let array = new Array();
    array.push(data);
    jsondata.deleteTestInfo = array;
    $.ajax({
        url: BASIC_URL + "deleteTestInfo",
        data: JSON.stringify(jsondata),
        type: "post",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            if (result.mark) {
                alert("删除成功！！！");
                reLoad();
            } else {
                alert("删除失败！！！");
            }
        }
    })
}