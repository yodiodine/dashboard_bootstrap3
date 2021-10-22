window.onload = function(){

    let weeklyData = new Chart(
        document.getElementById('weekly-data-chart'),{
            type: 'line',
            data: {
                labels: ["05-01","05-02","05-03","05-04","05-05","05-06","05-07"],
                datasets: [
                    {
                        label: "접속한 사용자 수",
                        backgroundColor: "rgba(246, 81, 160,0.5)",
                        borderColor: "#f652a0",
                        data: [253,246,258,254,240,234,252],
                        fill: true,
                    }
                ]
            },
            options: {
                maintainAspectRatio:false,
                responsive: true,
                plugins: {
                title: {
                    display: false,
                    text: 'weekly-data-chart'
                },
                },
                interaction: {
                mode: 'index',
                intersect: false
                },
                scales: {
                x: {
                    display: true,
                    title: {
                    display: false,
                    text: 'Month'
                    }
                },
                y: {
                    display: true,
                    title: {
                    display: false,
                    text: 'Value'
                    }
                }
                }
            },
        }
    );

    let deviceData = new Chart(
        document.getElementById('device-kinds-chart'),{
            type: 'bar',
            data: {
            labels: ["갤럭시 노트9", "아이폰10","갤럭시 s10","아이폰9","아이폰8"],
                datasets: [
                    {
                        label: '접속 디바이스 수',
                        data: [1387,945,854,820,751],
                        borderColor: "#36eee0",
                        backgroundColor: "#bcece0",
                    }
                ]
            },
            options: {
                maintainAspectRatio:false,
                responsive: true,
                plugins: {
                    legend: {
                    position: 'top',
                    },
                    title: {
                        display: false,
                        text: 'Chart.js Bar Chart'
                    }
                }
            },
        }
    );

    
    let textValue = document.querySelector(".add-wrap input");
    let addBtn = document.querySelector(".add-todo");
    const todoList = document.querySelector(".todo-list");
    let todoArray = [];

    
    //시작할 때 로컬의 값을 배열로 불러온 후 화면에 띄우기
    if(localStorage.getItem("todolist") != null){
        todoArray = (JSON.parse(localStorage.getItem("todolist")));
        todoScreen();
    };

    

    //버튼 추가 시 배열에 할일 추가 + 로컬 저장 값 갱신 + li추가
    addBtn.addEventListener("click",function(){
        textValue.value ? checkOverLap() : alert("할 일을 입력하세요");
    })
    textValue.addEventListener("keyup",function(e){
        if(e.keyCode === 13){
            textValue.value ? checkOverLap() : alert("할 일을 입력하세요");
        }
    })

    function checkOverLap(){
        let check = false;
        for(let i=0; i<todoArray.length;i++){
            if(todoArray[i].todo == textValue.value){
                check = true;
                textValue.value="";
                break;
            }
        }
        check ? alert("동일한 할 일이 존재합니다") : insertTodo();
    }

    function insertTodo(){
        todoArray.push({todo : textValue.value , clear: false});
        localStorage.setItem("todolist",JSON.stringify(todoArray));
        textValue.value = "";

        todoList.innerHTML ="";
        todoScreen();
    }
    
    //체크박스 클릭 시 배열 값 갱신 + 로컬 저장 값 갱신
    document.addEventListener("click",function(e){
        if(e.target.type === "checkbox"){
            todoArray.forEach(element=>{
                if(element.todo === e.target.parentNode.children[1].textContent){
                    element.clear ? element.clear = false : element.clear = true;
                }
            })
            localStorage.setItem("todolist",JSON.stringify(todoArray));
        }
    })

    //삭제 시 배열 값 갱신, 로컬 값 갱신, li화면 갱신
    document.addEventListener("click",function(e){
        if(e.target.classList.contains("delete")){
            todoArray.forEach((element,idx)=>{
                if(element.todo === e.target.parentNode.parentNode.children[1].textContent){
                    todoArray.splice(idx,1);
                }
            })
            localStorage.setItem("todolist",JSON.stringify(todoArray));

            todoList.innerHTML =""
            todoScreen();
        }
    })
    
    //화면 투두리스트 갱신
    function todoScreen(){
        todoArray.forEach(element => {
            let checktemp ="";
            element.clear ? checktemp = "<input type='checkbox' checked>" :checktemp =  "<input type='checkbox'>"

            todoList.innerHTML += `<li>
            ${checktemp}
            <span>${element.todo}</span>
            <span><i class="far fa-trash-alt delete"></i></span>
            </li>`;
        });
    }

}
