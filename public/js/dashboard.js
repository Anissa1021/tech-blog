var existingBlogs = document.querySelector("#existingblogs")
var createNew = document.querySelector("#createNew")
var newPost = document.querySelector("#newpost")
var newBlog = document.querySelector('#newBlog')

function hideCreateNew() {
  createNew.hidden=true;
}

hideCreateNew();

newPost.addEventListener("submit",event => {
  event.preventDefault()
  existingBlogs.hidden = true;
  newPost.hidden = true;
  createNew.hidden = false;
});

newBlog.addEventListener("submit", event => {
  var title = document.querySelector("#title").value;
  var content = document.querySelector("#content").value
  event.preventDefault()
  if (!title || !content) {
    alert('Enter title and content')
    return;
  }
  const blogObj = {
    title: title,
    content: content,
  }
  fetch("/api/blogs",{
    method:"POST",
    body:JSON.stringify(blogObj),
    headers:{
      "Content-Type":"application/json"
    }
  }).then(res=>{
    if(res.ok){
      createNew.setAttribute("hidden", "false")
      location.reload()
    } else {
      alert("Try again")
    }
  })
})