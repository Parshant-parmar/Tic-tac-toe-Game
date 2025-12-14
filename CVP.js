let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".resetbtn");
let newgame = document.querySelector(".newgame");
let msgcontainer = document.querySelector(".msgcontainer");
let msg = document.querySelector(".msg");
let gameOver = false;   
let turn0 = true;

const winpatterns = [
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
      box.innerText = "O";
      box.style.color = "#5e503f";
      turn0 = false;
      box.setAttribute("data-disabled", "true");

      checkwinner();

      setTimeout(()=>{
        cpurun();
      }, 700);
    }
  });
});


function cpurun(){   
  if(gameOver) return; 

  for (let pattern of winpatterns){
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if(pos1val=="X" && pos2val=="X" && pos3val==""){
      placeX(pattern[2]);
      return;
    }
    if(pos2val=="X" && pos3val=="X" && pos1val==""){
      placeX(pattern[0]);
      return;
    }
    if(pos1val=="X" && pos3val=="X" && pos2val==""){
      placeX(pattern[1]);
      return;
    }
  }


  for (let pattern of winpatterns){
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if(pos1val=="O" && pos2val=="O" && pos3val==""){
      placeX(pattern[2]);
      return;
    }
    if(pos2val=="O" && pos3val=="O" && pos1val==""){
      placeX(pattern[0]);
      return;
    }
    if(pos1val=="O" && pos3val=="O" && pos2val==""){
      placeX(pattern[1]);
      return;
    }
  }


  if (boxes[4].innerText === "") {
    placeX(4);
    return;
  }


  let corner = [0,2,6,8];
  for (let i of corner){
    if (boxes[i].innerText === "") {
      placeX(i);
      return;
    }
  }


  let sides = [1,3,5,7];
  for (let i of sides){
    if (boxes[i].innerText === "") {
      placeX(i);
      return;
    }
  }
}


function placeX(index) {
  boxes[index].innerText = "X";            
  boxes[index].setAttribute("data-disabled", "true");
  turn0 = true;                           
  checkwinner();                           
}


const checkwinner = ()=>{
  for(let pattern of winpatterns){
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if(pos1val!="" && pos1val===pos2val && pos2val===pos3val){
      showwinner(pos1val);
      return;
    }
  }
};


const disableboxes = ()=>{
  for(let box of boxes){
    box.setAttribute("data-disabled", "true");
  }
};

const enableboxes = ()=>{
  for(let box of boxes){
    box.removeAttribute("data-disabled");
    box.innerText = "";
  }
};

const showwinner = (winner)=>{
    gameOver = true;
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgcontainer.classList.remove("hide");
  disableboxes();
};

const resetgame = ()=>{
  turn0 = true;
  enableboxes();
  msgcontainer.classList.add("hide");
};

newgame.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);