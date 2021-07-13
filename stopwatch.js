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

  const setTime = (_ms) => {
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
    timerId = setInterval(() => {
      setTime(time.ms++);
    }, 10);
  };

  const stop = () => {
    clearInterval(timerId);
  };

  return { start, stop };
})();

(function init() {
  const $startBtn = document.querySelector('.startBtn');

  $startBtn.onclick = function (e) {
    if (runningStatus === 'stop' || runningStatus === 'paused') {
      runningStatus = 'running';
      this.textContent = 'pause';
      stopWatch.start();
      return;
    }

    runningStatus = 'paused';
    this.textContent = 'resume';
    stopWatch.stop();
  };
})();
