
url = `https://api.github.com/users/sarrthak008/events`

fetch(url).then((resp)=>{
   return resp.json();
}).then((result)=>{
     showEvent(result);
}).catch((err)=>console.log(err))

const showEvent=(data)=>{
  
let pushEventInfo={}

 data.forEach((eventsData) => {
   
   //console.log(eventsData)
    if(eventsData.type=="PushEvent"){
         pushEventInfo.pushMessage=`${eventsData.payload.commits[0].message}`,
         pushEventInfo.repo=`${eventsData.repo.name}`,
         pushEventInfo.url=`${eventsData.repo.url}`
         addPush(pushEventInfo)
      }

 });

}


let container = document.querySelector("#all-info")
let pushHtml = "";

function addPush(info){
   pushHtml+=`<div class="info">
            sarthak push code in repo ${info.repo} 
            <br><p>commit is " ${info.pushMessage}"</p>
            <a target="_blank" href=https://github.com/${info.repo}>visit<i class="ri-arrow-right-up-line"></i></a>
       </div>`
      container.innerHTML=pushHtml
}

