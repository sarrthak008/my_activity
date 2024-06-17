
let page = document.querySelector("#menu")

const hideMenu=()=>{
     
     let opt=document.querySelectorAll("#tool a")
     opt.forEach((a)=>{
          a.addEventListener("click",()=>{
               page.style.display="none";
          })
     })
}
hideMenu()

const OpenMenu =()=>{
     let btn = document.querySelector("#nav i")
     btn.addEventListener("click",()=>{
           page.style.display="flex";
           //alert("hiii")
     })
}

OpenMenu()






url = `https://api.github.com/users/sarrthak008/events`

fetch(url).then((resp)=>{
   return resp.json();
}).then((result)=>{
     showEvent(result);
}).catch((err)=>console.log(err))

const showEvent=(data)=>{
  
let pushEventInfo={}

 data.forEach((eventsData) => {
   
   //console.log(eventsData.type)
    if(eventsData.type=="PushEvent"){
         pushEventInfo.pushMessage=`${eventsData.payload.commits[0].message}`,
         pushEventInfo.repo=`${eventsData.repo.name}`,
         pushEventInfo.url=`${eventsData.repo.url}`
         addPush(pushEventInfo)
      }

      if(eventsData.type=="WatchEvent"){
          fetch(eventsData.repo.url).then((resp)=>{
               return(resp.json())
          }).then((result)=>{
               //console.log(result)
             startRepo(result);
          }).catch((error)=>{
               console.log(error)
          })
      }


      if(eventsData.type=="CreateEvent"){
          console.log(eventsData)
          createRepo(eventsData)
      }

 });

}

showEvent()

let allInfoHtml = ""
let container = document.querySelector("#all-info")
let pushHtml = "";

function addPush(info){
   pushHtml+=`<div class="info" id="push"><i class="ri-restart-fill"></i>
            Sarthak push code in repo ${info.repo} 
            <br><p>commit is " ${info.pushMessage}"</p>
            <a target="_blank" href=https://github.com/${info.repo}>visit<i class="ri-arrow-right-up-line"></i></a>
       </div>`
      container.innerHTML+=pushHtml 
}





let starRepos ="";

function startRepo(info){

     starRepos+=`<div class="info" id="stars"><i class="ri-pushpin-fill"></i>
      Sarthak star a Repo ${info.full_name} <br>
     <a target="_blank" href=https://github.com/${info.full_name}>visit<i class="ri-arrow-right-up-line"></i></a>
</div>`

container.innerHTML+=starRepos;
}


let createdRepo = "";

function createRepo(info){
   console.log(info.repo.name)
     createdRepo+=`<div class="info" id="Repo"><i class="ri-chat-new-fill"></i>
     Sarthak create new repo ${info.repo.name} <br>
    <a target="_blank" href=https://github.com/${info}>visit<i class="ri-arrow-right-up-line"></i></a>
</div>`


container.innerHTML+=createdRepo;

}

createRepo()


