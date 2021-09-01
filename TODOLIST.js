// MY-LIST
var mylist=document.getElementsByClassName("list");

var arr={
    "hello":new Object(),
};

function addData(key){
    var task=document.createElement("div");
    task.setAttribute("class","tasks");
    task.setAttribute("id","main_tasks");

    return task;
}

function addobj(key){
    var obj={
        "name":document.getElementById(key).innerHTML,
        "count":0,
        "data":addData(key)
    }

    console.log(obj);
    arr[key]=obj;
    console.log(arr[key]);
}

addobj("li-1");
temp("li-1");
addobj("li-2");
addobj("li-3");
addobj("li-4");
console.log(arr);


//for first list
function temp(key){
    arr["li-1"].data=document.getElementsByClassName("tasks")[0];
    arr["li-1"].count=3;
}

// function addData(key);
// {

//     arr.key=value;
// }

console.log(document.getElementsByClassName("list-title")[0].innerHTML);

// LIST-CONTAINER
// var listcontainer=mylist[0].querySelectorAll("li");
// console.log(listcontainer);

//CLICKED FUNCTION

var active="li-1";
var count=4;

mylist[0].onclick = function(e) {
    var target = getEventTarget(e);
    active=target.id;

    var prevactive=mylist[0].querySelectorAll(".active-list");

    if(active!="")
    {
        prevactive[0].classList.remove("active-list");

        document.getElementById(active).classList.add("active-list");
        
        var listtitle=document.getElementsByClassName("list-title")[0];
        listtitle.innerHTML=arr[active].name;
        var taskcount=document.getElementsByClassName("task-count")[0];
        taskcount.innerHTML=arr[active].count+" tasks remaining";

        var todobody=document.getElementsByClassName("todo-body")[0];
        console.log(todobody.childNodes);
        todobody.removeChild(document.getElementById("main_tasks"));
        todobody.appendChild(arr[active].data);
    }
};
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}

/////////////////////////////////////////////////////////////

var listadder=document.getElementsByClassName("btn-list");
var inputlist=document.getElementById("add-new-list");

inputlist.addEventListener("keyup",function(e){
    if(e.code=="Enter")
    {
        listadding();
    }
})


function listadding() {
    count++;
    console.log("hello");
    var listname=document.getElementById("add-new-list").value;
    console.log(listname);
    if(listname!="")
    {
        var newlist=document.createElement("li");
        newlist.appendChild(document.createTextNode(listname));
        newlist.setAttribute("id","li-"+count);
        newlist.setAttribute("class","active-list");
    
        console.log(active);
        if(active!="")
        document.getElementById(active).classList.remove("active-list");
    
        //new active
        active="li-"+count;
    
        mylist[0].appendChild(newlist);
    
        if(active!="")
        {
            addobj(active);
            var listtitle=document.getElementsByClassName("list-title")[0];
            listtitle.innerHTML=arr[active].name;
            var taskcount=document.getElementsByClassName("task-count")[0];
            taskcount.innerHTML=arr[active].count+" tasks remaning";
    
            var todobody=document.getElementsByClassName("todo-body")[0];
            todobody.removeChild(document.getElementById("main_tasks"));
            todobody.appendChild(arr[active].data);
        }
    
        document.getElementById("add-new-list").value="";
    }
};


var deletelist=document.getElementById("deletelist");

deletelist.onclick=function(){
    if(active!="")
    {
        var deleteitem=document.getElementById(active);
        console.log(deleteitem);
        var parent=deleteitem.parentNode;
        parent.removeChild(deleteitem);
        
        var listcontainer=mylist[0].querySelectorAll("li");

        if(listcontainer.length==0) 
        {
            active="";
            var title=document.getElementsByClassName("list-title")[0];
            title.innerHTML="";
            var counter=document.getElementsByClassName("task-count")[0];
            counter.innerHTML="";
            var main=document.getElementById("main_tasks");
            main.innerHTML="";
        }
        else
        {
            active=listcontainer[0].id;
            console.log(active);
            
        }


        if(active!="")
        {
            document.getElementById(active).setAttribute("class","active-list");
            var listtitle=document.getElementsByClassName("list-title")[0];
            listtitle.innerHTML=arr[active].name;
            var taskcount=document.getElementsByClassName("task-count")[0];
            taskcount.innerHTML=arr[active].count+" tasks remaning";

            var todobody=document.getElementsByClassName("todo-body")[0];
            todobody.removeChild(document.getElementById("main_tasks"));
            todobody.appendChild(arr[active].data);
        }
    }
}



var addtaskbtn=document.getElementsByClassName("btn-task")[0];
var count_list=4;

var inputtask=document.getElementById("input-task");

inputtask.addEventListener("keyup",function(e){
    if(e.code=="Enter")
    {
        taskadding();
    }
})

function taskadding(){
    var newtask=document.getElementById("input-task").value;
    if(active!="" && newtask!="")
    {
        var tasks=arr[active].data;
        
        var taskremaning=arr[active].count;

        console.log(taskremaning)

        var input=document.createElement("input");
        input.setAttribute("type","checkbox");
        input.setAttribute("id","task-"+count_list);

        var span=document.createElement("span");
        span.setAttribute("class","custom-checkbox");
        // span.style.marginLeft="15px";

        var label=document.createElement("label");
        label.setAttribute("for","task-"+count_list);
        label.appendChild(span);
        label.appendChild(document.createTextNode(" "+newtask+" "));

        var task=document.createElement("div");
        task.setAttribute("class","task");
        task.appendChild(input);
        task.appendChild(label);

        tasks.appendChild(task);
        arr[active].data=tasks;
        arr[active].count=taskremaning+1;

        var taskcount=document.getElementsByClassName("task-count")[0];
        taskcount.innerHTML=taskremaning+1+" tasks remaining";

        count_list++;

        document.getElementById("input-task").value="";
    }
}

var cleartask=document.getElementById("cleartask");

cleartask.onclick=function(e)
{
    var main=document.getElementById("main_tasks");
    var inputcontainer=main.querySelectorAll("input");
    
    for(var i=0;i<inputcontainer.length;i++)
    {
        if(inputcontainer[i].checked==true)
        {
            var parent=inputcontainer[i].parentNode;
            parent.parentNode.removeChild(parent);
        }
    }
}

var checkbox=setInterval(function(){
    var main=document.getElementById("main_tasks");
    var inputcontainer=main.querySelectorAll("input");
    var label=main.querySelectorAll("label");
    for(var i=0;i<label.length;i++)
    {
        if(inputcontainer[i].checked==true)
        {
            label[i].style.textDecoration = "line-through";
            // label[i].style.opacity="0.5";
        }
        else
        {
            label[i].style.textDecoration="none";
        }
    }
},100)