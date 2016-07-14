/// <reference path="jquery-1.9.1.js" />
$(document).ready(function () {
    LoadData();
});

//加载数据
function LoadData() {
    //$.ajax方法，里面一般只需要5个参数url,Type，dataType,success,error,
    //如果有参数的话,那么久还需要data参数
    //注意：双引号和单引号的嵌套原则
    $.ajax({
        url: "/Home/List",
        type: "GET",
        dataType: "json",
        //成功之后的回调函数
        success: function (result) {
            var html = "";
            $.each(result, function (key, item) {
                html += "<tr>";//tr标记要收尾呼应
                html += "<td>" + item.EmployeeID + "</td>";
                html += "<td>" + item.Name + "</td>";
                html += "<td>" + item.Age + "</td>";
                html += "<td>" + item.State + "</td>";
                html += "<td>" + item.Country + "</td>";
                //注意：为啥这最后的HTML最外层使用单引号‘’，因为<a href="">这里要是双引号
                html += '<td><a href="#" onclick="return getbyID(' + item.EmployeeID + ')" >Edit</a>|<a href="#" onclick="return Delete(' + item.EmployeeID + ')">Delete</a></td>';
                html += "<tr/>";//tr标记要收尾呼应

            })
            $(".tbody").html(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

//添加数据
function Add() {
    //验证
    var res = validate();
    if (res == false) {
        return false;
    }
    //创建一个empobj对象,传递参数
    var empObj = {
        EmployeeID: $("#EmployeeID").val(),
        Name: $("#Name").val(),
        Age: $("#Age").val(),
        State: $("#State").val(),
        Country: $("#Country").val()
    };

    $.ajax({
        url: "/Home/AddEmployee",
         //stringify()用于从一个对象解析出字符串，如
         //var a = {a:1,b:2}
         // 结果：
         //JSON.stringify(a)
         //"{"a":1,"b":2}"
        data: JSON.stringify(empObj),


    });


}


