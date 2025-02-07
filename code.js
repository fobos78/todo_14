import ItemDeal from './ItemDeal'

let motivation_array = [
    'люблю webpack',
    'кто не работает, тот ест',
    'как не быть ленивым??',
    'Д/з само себя не сделает))'
];

let background_array = [
    'has-background-danger',
    'has-background-warning',
    'has-background-success',
    'has-background-primary',
    'has-background-info',
    'has-background-link'
];

let IA = [
    'has-text-danger',
    'has-text-warning',
    'has-text-success'
];

let Animation_Array = [
    'bounceOut',
    'rollOut',
    'rotateOut',
    "lightSpeedOut"
];
let Month_Array = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября','Ноября', 'Декабря'];

let select = document.querySelector("select");
let field = document.querySelector("input");
let button = document.querySelector(".button_plus");
let deals = document.querySelector(".deals");
let hero = document.querySelector(".hero");
let random_color = Math.floor(Math.random() * 3 + 3);



hero.classList.add(background_array[random_color]);

//функция создания нашего дела
function addDeal(){
    let content = field.value;
    if(!content){
        return;
    }
    let item = new ItemDeal(content, select.value-1);
    let item_to_JSON = JSON.stringify(item);
    localStorage.setItem(+item.now, item_to_JSON);
    GenerateDOM(item);
    field.value = '';
}

button.addEventListener("click", addDeal);
document.addEventListener("keypress", (e)=>{
    if(e.keyCode == 13){
        addDeal();
    }
})

function drawOnLoad(){
    for (let i = 0; i < localStorage.length; i++) {
        let lk_key = localStorage.key(i); // получить по номеру в объекте
        let content = localStorage.getItem(lk_key);
        let item = JSON.parse(content); 
        let tempo_dat = Date.parse(item.now);
        item.now = new Date(tempo_dat);
        GenerateDOM(item);
    }
};
drawOnLoad();


//д/з
// сделать классный дизайн, что бы срочное дело имело яркий красный цвет
// несрочное - зеленый или другой ( какой найдете в бульма)
// самое несрочное - любой нейтральный
// немного поиграть с дизайном
// все сдать пулл реквестом

function GenerateDOM(obj){
    deals.insertAdjacentHTML("afterbegin",
    `<div class="wrap_task animated ${background_array[obj.color]} bounce" id="${+obj.now}">
        <div class="task is-size-4">
            <p> <span class="has-text-white"> ${obj.name}</span>
            ${obj.now.getDate()} ${Month_Array[obj.now.getMonth()]}
            </p>
        </div>
        <span class="icon is-large tr">
            <i class="fa fa-trash thrash"></i>
        </span>
        </div>
    `)
}


deals.addEventListener("click", (e) =>{
    // let trash = e.target.closest("i");
    let wrap_task = e.target.closest(".wrap_task");
    wrap_task.classList.remove("zoomInLeft");
    wrap_task.classList.add(Animation_Array[GR(Animation_Array)]);
    setTimeout(() => {
        wrap_task.remove();
        localStorage.removeItem(wrap_task.id);
    }, 500);
    
});


function ChangeColorSelect(el){
    switch(el.value){
        case '1':
            el.className =" has-background-danger has-text-white";
            importance = background_array[0];
            
            break;
        case '2':
            el.className =" has-background-warning has-text-white";
            importance = background_array[1];
            break;
        case '3':
            el.className =" has-background-success has-text-white";
            importance = background_array[2];
            break;
        default:
            break;
    }
}

window.onload = () => {
    ChangeColorSelect(select);
}

select.onchange = () =>{
    ChangeColorSelect(select);
}

function GR(arr){
    return Math.round(Math.random() * (arr.length-1));
}







