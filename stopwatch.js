let lap = [];
let runningStatus = 'stop'; // stop | paused | running
let timerId;
let time = {
  min: 0,
  sec: 0,
  ms: 0,
};

const util = (() => {
  const formatTime = (time) => (time < 10 ? '0' + time : time);
  return { formatTime };
})();

const stopWatch = (() => {
  const $min = document.querySelector('.display-m');
  const $sec = document.querySelector('.display-s');
  const $ms = document.querySelector('.display-ms');
  const $startBtn = document.querySelector('.startBtn');

  const setTime = (ms, sec, min) => {
    time.ms = ms;
    time.sec = sec ?? time.sec;
    time.min = min ?? time.min;

    if (time.ms >= 100) {
      time.ms = 0;
      time.sec++;
      if (time.sec >= 60) {
        time.sec = 0;
        time.min++;
      }
    }

    $min.textContent = util.formatTime(time.min);
    $sec.textContent = util.formatTime(time.sec);
    $ms.textContent = util.formatTime(time.ms);
  };

  const start = () => {
    $startBtn.textContent = 'pause';
    runningStatus = 'running';
    timerId = setInterval(() => {
      setTime(time.ms + 1);
    }, 10);
  };

  const stop = () => {
    $startBtn.textContent = 'resume';
    runningStatus = 'paused';
    clearInterval(timerId);
  };

  const reset = () => {
    if (runningStatus !== 'paused') return;

    $startBtn.textContent = 'Start';
    document.querySelector('.laps').innerHTML = '';
    runningStatus = 'stop';
    setTime(0, 0, 0);
    lap = [];
  };

  return { start, stop, reset };
})();

(function init() {
  const $startBtn = document.querySelector('.startBtn');
  const $resetBtn = document.querySelector('.resetBtn');

  $startBtn.onclick = function (e) {
    if (runningStatus === 'stop' || runningStatus === 'paused') {
      stopWatch.start();
      return;
    }

    stopWatch.stop();
  };

  $resetBtn.onclick = function (e) {
    stopWatch.reset();
  };
})();
