/*

API key = AIzaSyCYd9SWqo1_9ckWvx--2D68sG_il9hYTtM

playlistId = PLQ_1WY7bfG-_40vcccLX3cKc8JQ5swuah

https://www.googleapis.com/youtube/v3/playlistItems

*/

const vidList = document.querySelector(".vidList");
const key = "AIzaSyCYd9SWqo1_9ckWvx--2D68sG_il9hYTtM";
const playlistId = "PLQ_1WY7bfG-_40vcccLX3cKc8JQ5swuah";
const num = 10;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

fetch(url)
.then(data=>{
    return data.json();
})
.then(json=>{
    let items = json.items;
    console.log(items);
    let result = '';

    items.map(item=>{
        let title = item.snippet.title;
        if(title.length > 30){
            title = title.substr(0, 30)+"...";
        }
        let content = item.snippet.description;
        if(content.length > 200){
            content = content.substr(0,200)+"...";
        }
        // let date = item.snippet.publishedAt;
        // date = date.split("T")[0];

        result += 
        `
        <div class="wrap">
            <article>
                <h2>${title}</h2>
            </article>
            <article>
                <p>${content}</p>
                <a href="${item.snippet.resourceId.videoId}"><span>VIEW VIDEO</span></a>                
            </article> 
            <article>
                <a href="${item.snippet.resourceId.videoId}" class="pic">
                    <img src="${item.snippet.thumbnails.medium.url}">
                </a>
            </article>
        </div>
        `;            
    })
    vidList.innerHTML = result;
});

vidList.addEventListener("click",(e)=>{
    e.preventDefault();

    if(!e.target.closest("a")) return;

    const vidId = e.target.closest("a").getAttribute("href");

    let pop = document.createElement("figure");
    pop.classList.add("pop");
    pop.innerHTML =`
            <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="70%" height="80%"></iframe>
            <span class="btnClose"><i class="fas fa-times close"></i></span>    
            `;
    vidList.append(pop);
});

vidList.addEventListener("click",(e)=>{
    const pop = vidList.querySelector(".pop");
    if(pop){
        const close = pop.querySelector("i");
        if(e.target == close) pop.remove();
    }
});
