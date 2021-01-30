
let ResultList = new Array();

$(function(){
    //页面加载完毕，调用bt加载表格数据
    load();
})


//刷新表格
function reLoad(){
    //bt表格会自动搞定刷新数据
    $('#examinee-info-table').bootstrapTable('refresh');
}


function load(){
    $("#examinee-info-table").bootstrapTable({
        formatLoadingMessage:function()
        {
            return "数据加载中...";
        },
        formatNoMatches:function(){
            return "无匹配数据";
        },
        url:BASIC_URL+"getExamPaperInfo",
        method:"POST",
        dataType:"JSON",
        sidePagination: "client",
        // sidePagination: "server",  //后端分页
        striped: false, //隔行换色
        // pageNumber:1, //初始化加载第一页
        pagination:false, //是否分页
        // pageSize:10,   //单页记录数
        queryParams:function (params){
            let temp = {
                tId : localStorage.getItem("tId")
            };
            return JSON.stringify(temp);
        },
        columns:[
            {
                align:"center",
                // halign:"center",
                formatter:function (value,row,index){
                    let test="";
                    let answer="";
                    if (row.atType=="单选题"){
                        test='<p>'+(index+1)+'. '+row.atTopic+'[分值：'+row.atScore+']</p>'+
                            '<p>A. '+row.atA+'</p>'+
                            '<p>B. '+row.atB+'</p>'+
                            '<p>C. '+row.atC+'</p>'+
                            '<p>D. '+row.atD+'</p>';
                        answer='<p><input type="radio" name="answer'+(index+1)+'" class="exam-answer-single" value="a" onclick="getSingleAnswerInfo(this,\''+row.atId+'\')"/>A '+
                            '<input type="radio" name="answer'+(index+1)+'" class="exam-answer-single" value="b" onclick="getSingleAnswerInfo(this,\''+row.atId+'\')"/>B '+
                            '<input type="radio" name="answer'+(index+1)+'" class="exam-answer-single" value="c" onclick="getSingleAnswerInfo(this,\''+row.atId+'\')"/>C '+
                            '<input type="radio" name="answer'+(index+1)+'" class="exam-answer-single" value="d" onclick="getSingleAnswerInfo(this,\''+row.atId+'\')"/>D </p>';
                    }else {
                        test='<p>'+(index+1)+'. '+row.atTopic+'[分值：'+row.atScore+']</p>';
                        answer='<p>答题区：<textarea class="exam-answer" onblur="getShortAnswerInfo(this,\''+row.atId+'\')"></textarea>></p>'
                    }
                    return test+answer;
                }
            }
        ]

    })

}

function getSingleAnswerInfo(elem,atId){
    console.log($(elem).val())
    if ($(elem).prop("checked")){
        let Answer={}
        Answer.atId=atId;
        Answer.atAnswer=$(elem).val()
        ResultList.push(Answer);
        console.log(ResultList)

    }

}
function getShortAnswerInfo(elem,atId){
    let Answer={}
    Answer.atId=atId;
    Answer.atAnswer=$(elem).val()
    ResultList.push(Answer);

}