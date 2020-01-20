const fileSelect = e => {
  $(".fileName").text(e.target.files[0].name);
};
console.log("toto");

function addViewedVideo(evt) {
  console.log(evt.target.id);
  const id = evt.target.id;
  axiosHandler
    .patch("/my_course", { videoId: id })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}
function removeViewedVideo(evt) {
  console.log(evt.target.id);
  const id = evt.target.id;
  axiosHandler
    .patch("/my_videos", { videoId: id })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

const addViewedBtn = document.getElementsByClassName("add-viewed-btn");
const removeViewedBtn = document.getElementsByClassName("remove-viewed-btn");

for (let btn of addViewedBtn) {
  btn.onclick = addViewedVideo;
}
for (let btn of removeViewedBtn) {
  btn.onclick = removeViewedVideo;
}
