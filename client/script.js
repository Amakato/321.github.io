
const bar=document.getElementById("bar");

searchBtn.onclick=async()=>{
try{
const r=await fetch(`http://localhost:3000/urls/${keyword.value}`);
if(!r.ok) throw new Error("Не найдено");

const urls=await r.json();
urlList.innerHTML="";
urls.forEach(u=>urlList.innerHTML+=`<option>${u}</option>`);
}catch(e){
alert(e.message);
}
};

downloadBtn.onclick=async()=>{
try{
bar.style.width="20%";
bar.innerHTML="20%";

const r=await fetch(`http://localhost:3000/download?url=${encodeURIComponent(urlList.value)}`);

bar.style.width="70%";
bar.innerHTML="70%";

const d=await r.json();

localStorage.setItem(urlList.value,d.content);

bar.style.width="100%";
bar.innerHTML="100%";

status.innerHTML="Размер: "+d.size;

load();
}catch(e){
alert(e.message);
}
};

function load(){
savedList.innerHTML="";
for(let i=0;i<localStorage.length;i++){
savedList.innerHTML+=`<option>${localStorage.key(i)}</option>`;
}
}

showBtn.onclick=()=>{
content.textContent=localStorage.getItem(savedList.value);
};

load();
