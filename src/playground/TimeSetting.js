// useEffect(() => {
//   let tms = (Date.now() - begining) / 100
//   setTime(Number.parseFloat(tms).toFixed(0))
//   let myInterval = setInterval(() => {
//   	time <= 100 ? tick() : stopTick()
//   }, 100)
//   return function cleanup() {
//   	clearInterval(myInterval)
//   }
// })

// function tick() {
// 	setTime(time + 1)
// }
// function stopTick() {
// 	setTime(time)
// }

/////////////////////////////////////////////////////////////////////:::

// useEffect(() => {
//   let tms = (Date.now() - begining) / 100
//   stop ? setTime(Number.parseFloat(tms).toFixed(1)) : setTime(time)
// })

//////////////////////////////////////////////////////////////////////////

// let fps = {
// 	startTime: 0,
// 	frameNumber: 0,
// 	getFPS: function() {
// 		this.frameNumber++
// 		var d = new Date().getTime(),
// 			currentTime = (d - this.startTime) / 1000,
// 			result = Math.floor(this.frameNumber / currentTime)
// 		if (currentTime > 1) {
// 			this.startTime = new Date().getTime()
// 			this.frameNumber = 0
// 		}
// 		return result
// 	}
// }

// function gameLoop() {
// 	setTimeout(gameLoop, 1000 / 60)
// 	console.log(fps.getFPS())
// }
// window.onload = gameLoop
