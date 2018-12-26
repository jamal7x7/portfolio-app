import React, {
	useContext,
	useReducer,
	useEffect,
	useRef,
	useState
} from 'react'
import './App.sass'
import reactLogo from './logo.svg'

const begining = Date.now()

// const sigmoid = x => 1 / (1 + Math.exp(-x / 10))

export default () => {
	let [stop, setStop] = useState(true)

	let [time, setTime] = useState(0)

	let [show, setShow] = useState(0)

	// let [phi0, setPhi0] = useState(0)

	useEffect(() => {
		let tms = (Date.now() - begining) / 100
		stop ? setTime(Number.parseFloat(tms).toFixed(1)) : setTime(time)

		// let myInterval = setInterval(() => {
		// 	stop === true ? tick() : stopTick()
		// }, 100)

		// return () => {
		// 	clearInterval(myInterval)
		// }
	})

	function tick() {
		// setTime(time + 1)
		console.log('running')
	}
	function stopTick() {
		// setTime(time)
		console.log('Stoped')
	}

	const [coo, setCoo] = useState({
		R: { ra: 150, rb: 50 },

		A: { x: 420, y: 300 },
		B: { x: 0, y: 0 },

		A1: { x: 0, y: 0 },
		A2: { x: 0, y: 0 },

		B1: { x: 0, y: 0 },
		B2: { x: 0, y: 0 },

		C1: { x: 0, y: 0 },
		C2: { x: 0, y: 0 },

		D1: { x: 0, y: 0 },
		D2: { x: 0, y: 0 },

		I: { x: 0, y: 0 },
		J: { x: 0, y: 0 },

		I1: { x: 0, y: 0 },
		I2: { x: 0, y: 0 },

		J1: { x: 0, y: 0 },
		J2: { x: 0, y: 0 }
	})
	let svgRef = useRef()
	useEffect(() => {
		// const handleChange = e => {
		// e.preventDefault()
		// let bound = svgRef.current.getBoundingClientRect()

		let hx = 350
		let hy = 200
		let phi = 0.2
		let phi2 = 0.25 * time
		// let phi0 = 100
		let phi0 = 0

		let xa = 600 + 30 * Math.cos(phi2 + 10)
		let ya = 400 + 50 * Math.sin(phi2 + 70)

		let xb = xa + hx * Math.cos(phi * time + phi0)
		let yb = ya + hy * Math.sin(phi * time + phi0)
		// let xb = e.clientX - bound.left
		// let yb = e.clientY - bound.top

		let ra = coo.R.ra
		let rb = coo.R.rb

		let X = coo.B.x - coo.A.x
		let Y = coo.B.y - coo.A.y
		let theta = Math.atan2(Y, X)

		let H = Math.sqrt(X ** 2 + Y ** 2)

		let rho = 1 * Math.asin(rb / H) + 0.1
		let tho = 1 * Math.asin(ra / H) + 0.2

		let k = (0.003 * H) ** 1
		let xa1 = xa + ra * Math.sin(theta)
		let ya1 = ya - ra * Math.cos(theta)

		let xa2 = xa - ra * Math.sin(theta)
		let ya2 = ya + ra * Math.cos(theta)

		let xa3 = xa + ra * Math.cos(theta)
		let ya3 = ya + ra * Math.sin(theta)

		let xb1 = xb + rb * Math.sin(theta)
		let yb1 = yb - rb * Math.cos(theta)

		let xb2 = xb - rb * Math.sin(theta)
		let yb2 = yb + rb * Math.cos(theta)

		let xb3 = xb - rb * Math.cos(theta)
		let yb3 = yb - rb * Math.sin(theta)

		let xc1 = xa + ra * Math.cos(theta - rho)
		let yc1 = ya + ra * Math.sin(theta - rho)

		let xc2 = xa + ra * Math.cos(rho + theta)
		let yc2 = ya + ra * Math.sin(rho + theta)

		let xd1 = xb - rb * Math.cos(theta + tho)
		let yd1 = yb - rb * Math.sin(theta + tho)

		let xd2 = xb - rb * Math.cos(theta - tho)
		let yd2 = yb - rb * Math.sin(theta - tho)

		let xi = xa + (ra * Math.cos(theta)) / Math.cos(rho)
		let yi = ya + (ra * Math.sin(theta)) / Math.cos(rho)

		let xj = xb - (rb * Math.cos(theta)) / Math.cos(tho)
		let yj = yb - (rb * Math.sin(theta)) / Math.cos(tho)

		let xi1 = k * (xi - xc1) + xc1
		let yi1 = k * (yi - yc1) + yc1

		let xi2 = k * (xi - xc2) + xc2
		let yi2 = k * (yi - yc2) + yc2

		let xj1 = k * (xj - xd1) + xd1
		let yj1 = k * (yj - yd1) + yd1

		let xj2 = k * (xj - xd2) + xd2
		let yj2 = k * (yj - yd2) + yd2

		function precise(x) {
			return Number.parseFloat(x).toFixed(1)
		}

		setCoo({
			...coo,
			k: precise(k),
			H: H,

			A: { x: precise(xa), y: precise(ya) },
			B: { x: precise(xb), y: precise(yb) },

			A1: { x: precise(xa1), y: precise(ya1) },
			A2: { x: precise(xa2), y: precise(ya2) },
			A3: { x: precise(xa3), y: precise(ya3) },

			B1: { x: precise(xb1), y: precise(yb1) },
			B2: { x: precise(xb2), y: precise(yb2) },
			B3: { x: precise(xb3), y: precise(yb3) },

			C1: { x: precise(xc1), y: precise(yc1) },
			C2: { x: precise(xc2), y: precise(yc2) },

			D1: { x: precise(xd1), y: precise(yd1) },
			D2: { x: precise(xd2), y: precise(yd2) },

			I: { x: precise(xi), y: precise(yi) },
			J: { x: precise(xj), y: precise(yj) },

			I1: { x: precise(xi1), y: precise(yi1) },
			I2: { x: precise(xi2), y: precise(yi2) },

			J1: { x: precise(xj1), y: precise(yj1) },
			J2: { x: precise(xj2), y: precise(yj2) }
		})
	})

	// console.log(time)
	const handleStop = e => {
		e.preventDefault()
		setStop(!stop)
	}
	const handleIsShown = e => {
		e.preventDefault()
		show === 0 ? setShow(1) : setShow(0)
	}

	return (
		<div className="App">
			<Stats
				coo={coo}
				show={show}
				stop={stop}
				time={time}
				handleStop={handleStop}
				handleIsShown={handleIsShown}
			/>

			<Blob
				coo={coo}
				show={show}
				stop={stop}
				time={time}
				// phi0={phi0}
				// setPhi0={setPhi0}
			/>
		</div>
	)
}

const Stats = ({ coo, show, stop, time, handleStop, handleIsShown }) => {
	return (
		<div className="stats">
			<h2>
				A: ( {coo.A.x}, {coo.A.x} )
			</h2>
			<h2>
				B: ( {coo.B.x}, {coo.B.x} )
			</h2>

			<h2>Time:{time} </h2>
			{/* <h2>S(t):{sigmoid(time)} </h2> */}
			{/* <h2>Time:{coo.t} </h2> */}
			<h2>k:{coo.k} </h2>
			<button onClick={handleStop}>{stop ? 'Stop' : 'Continue'}</button>
			<button onClick={e => handleIsShown(e)}>
				{show === 1 ? 'Hide' : 'Show'}
			</button>
		</div>
	)
}
const Blob = ({ coo, show, stop, time }) => {
	let svgRef = useRef()
	// setPhi0(100)
	return (
		<svg
			ref={svgRef}
			// viewBox="0 0 1000 700"
			// height="700"
			// width="1000"
			// onMouseMove={e => handleChange(e)}
			// transform="matrix(1 0 0 -1 0 0)"
		>
			<defs>
				<radialGradient
					cx="50%"
					cy="50%"
					fx="50%"
					fy="50%"
					r="77%"
					id="radialGradient-1">
					<stop stopColor="#C86DD7" offset="0%" />
					<stop stopColor="#877AFF" offset="100%" />
				</radialGradient>
				<radialGradient
					cx="50%"
					cy="50%"
					fx="50%"
					fy="50%"
					r="77%"
					id="radialGradient-2">
					<stop stopColor="#C86DD7" offset="0%" />
					<stop stopColor="#61DAFB" offset="100%" />
				</radialGradient>

				<filter
					id="B"
					x="0"
					y="0"
					height="130%"
					width="130%"
					filterUnits="userSpaceOnUse">
					<feDropShadow
						dx="0"
						dy="0"
						stdDeviation="10 10"
						flood-color="#61DAFB"
						flood-opacity="1"
					/>
				</filter>

				<filter
					id="redShadow"
					x="0"
					y="0"
					height="130%"
					width="130%"
					filterUnits="userSpaceOnUse">
					<feDropShadow
						dx="0"
						dy="0"
						stdDeviation="20 20"
						flood-color="#C86DD7"
						flood-opacity=".4"
					/>
				</filter>
			</defs>

			<g>
				{/* <circle
					className="drop"
					cx={coo.A.x}
					cy={coo.A.y}
					r={coo.R.rb}
					fill="#877AFF">
					<animate
						attributeType="XML"
						attributeName="cy"
						from={coo.A.x}
						to="1200"
						dur="1s"
						repeatCount="indefinite"
					/>
				</circle> */}
				<circle
					className="A"
					cx={coo.A.x}
					cy={coo.A.y}
					r={coo.R.ra}
					fill="url(#radialGradient-1)"
					// filter="url(#redShadow)"
				/>
				<circle
					className="B"
					cx={coo.B.x}
					cy={coo.B.y}
					r={coo.R.rb}
					// fill="#fa8072" />
					fill="url(#radialGradient-1)"
				/>
				<g x={coo.B.x} y={coo.B.y}>
					<circle
						className="underB"
						cx={coo.B.x}
						cy={coo.B.y}
						r={coo.R.rb}
						// fill="#61DAFB"
						fill="url(#radialGradient-2)"
						opacity={coo.k}
						// transform="translate(500,500)"
						// filter="url(#B)"
					/>
					<ReactLogo />
				</g>
				{/* <img className="react-logo" src={reactLogo} alt="logo" /> */}

				{coo.H <= 370 && (
					<path
						className="R1R2D2D1"
						d={`M ${coo.C1.x} ${coo.C1.y} 
								Q ${coo.A3.x} ${coo.A3.y} ${coo.C2.x} ${coo.C2.y}
								C ${coo.I2.x} ${coo.I2.y} ${coo.J2.x} ${coo.J2.y} ${coo.D2.x} ${coo.D2.y}
								Q ${coo.B3.x} ${coo.B3.y} ${coo.D1.x} ${coo.D1.y}
								C ${coo.J1.x} ${coo.J1.y} ${coo.I1.x} ${coo.I1.y} ${coo.C1.x} ${coo.C1.y}
				    	`}
						// stroke="#fff00f"
						fill="url(#radialGradient-1)"
					/>
				)}
				{/* <Moving coo={coo} /> */}
				<g opacity={show}>
					<path
						className="C2I2"
						d={`M ${coo.C2.x} ${coo.C2.y} 
										L ${coo.I2.x} ${coo.I2.y}`}
						stroke="red"
						fill="none"
					/>

					<path
						className="C1I1"
						d={`M ${coo.C1.x} ${coo.C1.y} 
									L ${coo.I1.x} ${coo.I1.y}`}
						stroke="#00ff00"
						fill="none"
					/>
					<path
						className="D2I2"
						d={`M ${coo.D2.x} ${coo.D2.y} 
									L ${coo.J2.x} ${coo.J2.y}`}
						stroke="#00fff0"
						fill="none"
					/>
					<path
						className="C1I1"
						d={`M ${coo.D1.x} ${coo.D1.y} 
									L ${coo.J1.x} ${coo.J1.y}`}
						stroke="#00fff0"
						fill="none"
					/>
					<path
						className="AB"
						d={`M ${coo.B.x} ${coo.B.y} 
									L ${coo.A.x} ${coo.A.y}`}
						stroke="#ffffffa0"
						fill="none"
					/>
					<path
						className="A1A2"
						d={`M ${coo.A1.x} ${coo.A1.y} 
							L ${coo.A2.x} ${coo.A2.y}`}
						stroke="#ffffffa0"
						fill="none"
					/>
					<path
						className="B1B2"
						d={`M ${coo.B1.x} ${coo.B1.y} 
									L ${coo.B2.x} ${coo.B2.y}`}
						stroke="#ffffffa0"
						fill="none"
					/>
					<path
						d={`M ${coo.A.x} ${coo.A.y} 
									L ${coo.B.x} ${coo.A.y}
									L ${coo.B.x} ${coo.B.y}`}
						stroke="#ffff0011"
						fill="none"
					/>
				</g>
			</g>
		</svg>
	)
}

const ReactLogo = () => (
	<g fill="#61DAFB" transform="scale(0.07,0.07) translate(50,50)">
		<path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z" />
		<circle cx="420.9" cy="296.5" r="45.7" />
		<path d="M520.5 78.1z" />
	</g>
)
