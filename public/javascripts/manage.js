const axiosHandler = axios.create({
  baseURL: "http://localhost:3000"
});

function deleteVideo(evt) {
  const videoId = evt.target.dataset.idVideo;
  console.log(evt.target);
  axiosHandler
    .delete(`/video-delete/${videoId}`)
    .then(res => {
      const deleteRow = document.getElementById(videoId);
      deleteRow.parentNode.removeChild(deleteRow);
    })
    .catch(err => console.log("This is the err response :", err));
}

const videoDeleteButtons = document.getElementsByClassName("delete-icon");

for (let element of videoDeleteButtons) {
  element.onclick = deleteVideo;
}
