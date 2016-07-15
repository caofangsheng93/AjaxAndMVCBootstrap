$(document).ready(function () {
    //加载数据
    LoadData();
});

//加载数据
function LoadData() {
    //$.ajax方法，里面一般只需要5个参数url,Type，dataType,success,error,
    //如果有参数的话,那么久还需要data参数
    //注意：双引号和单引号的嵌套原则
    $.ajax({
        //页面初始化的时候，加载数据，绑定到table上
        url: "/Home/List",
        type: "GET",
        dataType: "json",
        //成功之后的回调函数
        success: function (result) {
            var html = "";
            //each的第一个方法，厉害
            $.each(result, function (key, item) {
                html += "<tr>";//tr标记要收尾呼应
                html += "<td>" + item.EmployeeID + "</td>";
                html += "<td>" + item.Name + "</td>";
                html += "<td>" + item.Age + "</td>";
                html += "<td>" + item.State + "</td>";
                html += "<td>" + item.Country + "</td>";
                //注意：为啥这最后的HTML最外层使用单引号‘’，因为<a href="">这里要是双引号
                //点击编辑的时候，先根据ＩＤ获取数据，将获取到的数据，展示在弹出层上，然后用户可以进行修改
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
    //创建一个empobj对象,传递参数，然后通过JSON.stringify解析对象成字符串
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
        type: "POST",
        //通过Post方式，添加需要添加 ：contentType: "application/json;charset=utf-8",
        //不加这句话的话，用户输入的数据就传递不到后台控制器方法中
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //添加成功，重新加载数据
            LoadData();
            //隐藏模态窗体【隐藏】
            $("#myModal").modal("hide");
           // $("#myModal").hide(); //这样隐藏有问题
            
        },
        error: function (result) {
            alert(result.responseText);
        }
    });

}

//通过ID获取Employee
//js是弱类型的，函数的参数类型不用写
//获取详情之后，显示模态窗体
function getbyID(employeeID) {
    //设置文本框，边框的颜色
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
    
    //一般只要5个参数
    $.ajax({
        url: "/Home/GetEmployeeById/" + employeeID,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //设置文本框的值
            $("#EmployeeID").val(result.EmployeeID);
            $("#Name").val(result.Name);
            $("#Age").val(result.Age);
            $("#State").val(result.State);
            $("#Country").val(result.Country);

            //显示模态窗体
            //$("#myModal").show();//不能使用这个
            $('#myModal').modal('show');
            //隐藏添加按钮
            $("#btnAdd").hide();
            //显示更新按钮
            $("#btnUpdate").show();

        },
        error: function (result) {
            alert(result.responseText);

        }
    });
}


//更新
function Update() {
    //验证
    var res = validate();
    if (res == false) {
        return false;
    }

    var empObj = {
        EmployeeID: $("#EmployeeID").val(),
        Name: $("#Name").val(),
        Age: $("#Age").val(),
        State: $("#State").val(),
        Country: $("#Country").val(),

    };

    $.ajax({
        url: "/Home/UpdateEmployee",
        data: JSON.stringify(empObj),//参数
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        type: "post",
        success: function (result) {
            //更新成功，加载数据，清空输入框，隐藏模态窗体
            LoadData();
            //清空输入框
            $("#EmployeeID").val("");
            $("#Name").val("");
            $("#Age").val("");
            $("#State").val("");
            $("#Country").val("");

            //$("#myModal").hide();//不能使用这个
            $('#myModal').modal('hide');
        },
        error: function (result) {
            alert(result.responseText);
        }
    });

}

function Delete(empID) {
    //删除的时候，先弹窗提示
    var ans = confirm("你确定要删除该条记录么？");
    if (ans) {

        $.ajax({
            url: "/Home/DeleteEmployee/" + empID,
            type: "post",
            dataType: "json",
            success: function (result) {
                //删除成功之后，重新加载数据
                LoadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }

        });

    }

}

function clearTextBox() {
    $('#EmployeeID').val("");
    $('#Name').val("");
    $('#Age').val("");
    $('#State').val("");
    $('#Country').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');

}

//Valdidation using jquery  
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    if ($('#Age').val().trim() == "") {
        $('#Age').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Age').css('border-color', 'lightgrey');
    }
    if ($('#State').val().trim() == "") {
        $('#State').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#State').css('border-color', 'lightgrey');
    }
    if ($('#Country').val().trim() == "") {
        $('#Country').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Country').css('border-color', 'lightgrey');
    }
    return isValid;
}













