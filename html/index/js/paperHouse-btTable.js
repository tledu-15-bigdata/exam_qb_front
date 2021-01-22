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
    let url = BASIC_URL+"getTopicInfo";
    $("#btTable").bootstrapTable({
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
                uId : JSON.parse(localStorage.getItem("Info")).uId,
                offset : params.offset,
                pageSize : params.limit
            };
            return JSON.stringify(temp);
        },
        columns:[
            {
                // title:"行号",
                align:"center",
                halign:"center",
                formatter:function (value,row,index){
                    return "<input type='checkbox' class='test-delete-more' value='"+row.id+"'/>";
                }
            },
            {
                title:"行号",
                align:"center",
                halign:"center",
                formatter:function (value,row,index){
                    return index+1;
                }
            },
            {
                title: "题目类型",
                align:"center",
                halign:"center",
                field:"aType"
            },
            {
                title: "试题分类",
                align:"center",
                halign:"center",
                field: "cName"
            },
            {
                title: "试题内容",
                align:"center",
                halign:"center",
                field: "aTopic"
            },
            {
                title: "分值",
                align:"center",
                halign:"center",
                field: "aScore"
            },
            {
                title: "添加时间",
                align:"center",
                halign:"center",
                field: "aModifyTime"
            },
            {
                title: "操作",
                align:'center',//列名称、列数据居中 水平居中
                halign:'center', //垂直居中
                width:'50px',//设置列宽
                formatter:function(value,row,index){
                    //如果将来 涉及到字符串数据传入参数  需要设置单引号
                    let d='<a href="javascript:void(0);" onclick="removeData(\''+row.aId+'\')">删除</a>'
                    let m='<a href="javascript:void(0);" onclick="modifyGoods(\''+row.aId+'\',\''+row.aType+'\')">修改</a>'
                    return d+" "+m;
                }

            }
        ],
        onDblClickRow(row,$element){
            console.log(row)
            lookDetail(row.aId);
            // console.log($element.innerHTML)
        }

    })

}

function removeData(id){
    if(id){
        let JsonData={};
        let data={};
        data.aId=id;
        // JsonData.deleteAnswer=data;
        let url=BASIC_URL+"deleteAnswer";


        let array=new Array();
        array.push(data);
        JsonData.deleteAnswer=array;

        console.log(JsonData);
        $.ajax({
            url:url,
            type:'POST',
            data:JSON.stringify(JsonData),
            contentType:"application/json",
            dataType:'json',
            success:function(result){
                console.log(result)
                //将返回的result数据，渲染到页面上
                if(result.mark==true){
                    //删除成功-->重新渲染表格的数据
                    reLoad()
                }else{
                    alert("删除失败");
                }
            }
        })

    }
}

function modifyGoods(id,aType){
    localStorage.setItem("id",id);
    if (aType=="单选题"){


        // //打开 弹出层
        layer.open({
            type:2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
            title:'题目修改',
            maxmin:false,
            shadeClose:false,
            area:['600px', '90%'],//弹出层的宽高
            content:'modifyPaperTestSingle.html',//设置弹出层打开的页面
            //弹出层页面成功打开后，的设置
            // success:function(layero,index){
            //     //当前是表格页面     修改是表格的子页面   父页面JS代码中将数据传递给子页面中
            //     //获取子页面HTML对象
            //     let childBody= layer.getChildFrame('body',index);
            //
            //     //在childBody子页面body区域中find（查找）input标签name属性是xxx的那个input对象，给其设置值为xxx
            //     $(childBody).find('input[name=name]').val(name);
            //     $(childBody).find('input[name=stock]').val(stock);
            //     $(childBody).find('input[name=detail]').val(detail);
            //     $(childBody).find('input[name=money]').val(money);
            //     $(childBody).find('select[name=category]').val(category);
            //     //获取子页面JS对象
            // }
        });
    }else {
        layer.open({
            type:2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
            title:'题目修改',
            maxmin:false,
            shadeClose:false,
            area:['600px', '90%'],//弹出层的宽高
            content:'modifyPaperTestAnswer.html',//设置弹出层打开的页面

        });

    }
}
//试题详情
function lookDetail(id){
    localStorage.setItem("id",id);
    layer.open({
        type:2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
        title:'题目详情',
        maxmin:false,
        shadeClose:false,
        area:['600px', '90%'],//弹出层的宽高
        content:'PaperTestDetail.html',//设置弹出层打开的页面

    });

}
