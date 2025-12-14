let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector(".resetbtn");
let newgame=document.querySelector(".newgame");
let msgcontainer=document.querySelector(".msgcontainer");
let msg=document.querySelector(".msg");
let turn0=true;
const winpatterns=[
[0,1,2],
[0,3,6],
[0,4,8],
[1,4,7],
[2,5,8],
[2,4,6],
[3,4,5],
[6,7,8],
];



boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if (box.getAttribute("data-disabled") === "true") return;
     if(turn0){
        box.innerText="O";
        box.style.color="#5e503f";
        turn0=false;
     }else{
        box.innerText="X"
          box.style.color="#c6ac8f";
        turn0=true;
     }
    box.setAttribute("data-disabled", "true");
       checkwinner();
    });
});

const checkwinner=()=>{
for(let pattern of winpatterns ){
      let pos1val=boxes[pattern[0]].innerText;
      let pos2val=boxes[pattern[1]].innerText;
      let pos3val=boxes[pattern[2]].innerText;
      if(pos1val!=""&&pos2val!=""&&pos3val!=""){
            if(pos1val===pos2val&&pos2val===pos3val){
                console.log("winner is ",pos1val);
                 showwinner(pos1val);
               }



      }

}
};
const disableboxes=()=>{
   for(let box of boxes){
      box.setAttribute("data-disabled", "true"); 
   }
}
const enableboxes=()=>{
   for(let box of boxes){
      box.removeAttribute("data-disabled");
      box.innerText="";
   }
}

const showwinner=(winner)=>{
   msg.innerText=`Congratulations,Winner is ${winner}`;
   msgcontainer.classList.remove("hide");
   disableboxes();
};
const resetgame=()=>{
    turn0=true;
    enableboxes();
    msgcontainer.classList.add("hide");
}
newgame.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);
