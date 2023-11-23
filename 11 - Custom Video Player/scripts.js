const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// parused函数可以判断视频是否暂停，如果暂停就播放，如果播放就暂停
function togglePlay() {
  video.paused ? video.play() : video.pause();
}
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
skipButtons.forEach((button) => button.addEventListener("click", skip));

function handleRangeUpdate() {
  video[this.name] = this.value;
}
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = percent + "%";
}
video.addEventListener("timeupdate", handleProgress);

 function scrub(e) {
   const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
   video.currentTime = scrubTime;
 }
 progress.addEventListener('click', scrub);

let mousedown = false;
// 鼠标在 progress 上移动时更新进度

progress.addEventListener('mousemove', e => mousedown && scrub(e));

// 鼠标按下改变标志
progress.addEventListener('mousedown', () => mousedown = true);

// 鼠标抬起恢复标志
progress.addEventListener('mouseup', () => mousedown = false);