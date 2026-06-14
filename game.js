let floor=Number(localStorage.floor||1);
let atk=Number(localStorage.atk||3);
let gold=Number(localStorage.gold||0);
let hp=0;
let enemyMax=0;

const floorEl=document.getElementById("floor");
const enemyEl=document.getElementById("enemy");
const goldEl=document.getElementById("gold");
const msg=document.getElementById("msg");
const choices=document.getElementById("choices");

function save(){
localStorage.floor=floor;
localStorage.atk=atk;
localStorage.gold=gold;
}

function spawn(){
enemyMax=10+floor*8;
hp=enemyMax;
render();
}

function render(){
floorEl.textContent=floor+"F";
enemyEl.textContent="敵HP "+hp+"/"+enemyMax;
goldEl.textContent="Gold "+gold;
}

function reward(){
choices.innerHTML="";
let list=[
["攻撃力+2",()=>atk+=2],
["最大HP相当強化",()=>floor+=0],
["ゴールド+20",()=>gold+=20]
];

list.sort(()=>Math.random()-0.5);

for(let x of list.slice(0,3)){
let b=document.createElement("button");
b.textContent=x[0];
b.onclick=()=>{
x[1]();
choices.innerHTML="";
save();
spawn();
};
choices.appendChild(b);
}
}

document.getElementById("attack").onclick=()=>{
let damage=atk;
if(Math.random()<0.2) damage*=2;

hp-=damage;
msg.textContent=damage+"ダメージ";

if(hp<=0){
gold+=10;
floor++;
save();
reward();
spawn();
return;
}
render();
};

spawn();
