//let client_id = "138aa51bce2bf1b"
let client_id = "c2e83a801561800"
let client_secret = "664e9c17bc52c48c00fe417c673f02bbbce54a04";

let photos = document.getElementById("photos");

// Function gets input and uses imgur api to fetch data, manipulating the DOM for every item.
async function bro1() {
    let word = document.getElementById("text").value;
    let response = await fetch(`https://api.imgur.com/3/gallery/search/{{sort}}/{{window}}/{{page}}?q=${word}`, {
        headers: {
            Authorization: `Client-ID ${client_id}`,
        },
    });

    let APIData = await response.json();
    let newData = APIData.data;
    console.log(newData)

    photos.innerHTML = ""; // Clear existing content

    newData.forEach((item) => {
        let likes = document.createElement("p");
        let comments = document.createElement("p");
        let img = document.createElement("img");

        likes.innerText = "Likes: " + item.ups;
        comments.innerText = "Number of comments: " + item.comment_count;

        // img.src = item.images[0].link;
        img.src = item.images[0].link;
        let pictures = document.createElement("div")
        let stats = document.createElement("div");
        pictures.setAttribute("class","pictures");
        stats.setAttribute("class", "stats");
        stats.appendChild(likes);
        stats.appendChild(comments);

        pictures.appendChild(img);
        pictures.appendChild(stats); // Append stats below the image
        photos.appendChild(pictures)
        pictures.addEventListener("click", function () {
            let commentid = item.id;
            getComments(commentid);
        });





    });
}

async function getComments(id){

    let response = await fetch(`https://api.imgur.com/3/gallery/${id}/comments/best`,
        {
            headers: {
                Authorization: `Client-ID ${client_id}`,
            },
        })
    let commentdata = await response.json()
    let commentsArr = commentdata.data



    let div1 = document.createElement("div");
    div1.setAttribute("class", "modalBg");
    let div2 = document.createElement("div");
    div2.setAttribute("class", "modal");
    let close = document.createElement('button')
    close.setAttribute('class','close')
    close.innerText = "X"
    div2.appendChild(close)
    close.addEventListener('click',()=>div1.remove())
    let commentContainer = document.createElement('div')
    commentContainer.setAttribute('class','commentContainer')


        commentsArr.forEach(item=>{
            let comment = document.createElement('p');
            comment.setAttribute('class','comment')
            comment.innerText = item.comment
            commentContainer.appendChild(comment)
        })


    div2.appendChild(commentContainer)
    div1.appendChild(div2)
    photos.appendChild(div1)
}









