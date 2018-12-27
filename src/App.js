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
		let tms = (Date.now() - begining) / 200
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
						// transform="translate(100,100) scale(0.07,0.07) "
						// filter="url(#B)"
					/>
					<ReactLogo coo={coo} />
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

const ReactLogo = ({ coo }) => (
	<svg
		width="37"
		height="34"
		viewBox="0 0 37 34"
		x={coo.B.x - 20}
		y={coo.B.y - 20}
		fill="none"
		// transform={`translate(${120}, ${120})`}>
	>
		<path
			d="M36.8597 17.4131C36.8597 14.9563 33.8141 12.6281 29.1447 11.1843C30.2222 6.37663 29.7433 2.55166 27.6331 1.32707C27.1467 1.03982 26.578 0.903754 25.9569 0.903754V2.58946C26.3011 2.58946 26.578 2.65749 26.81 2.786C27.8277 3.37562 28.2692 5.6207 27.9249 8.50832C27.8426 9.21889 27.7079 9.96725 27.5433 10.7307C26.0766 10.3679 24.4752 10.0882 22.7915 9.90678C21.7813 8.50832 20.7337 7.23838 19.6786 6.12717C22.1181 3.83673 24.4079 2.5819 25.9644 2.5819V0.896194C23.9065 0.896194 21.2126 2.3778 18.4888 4.94793C15.7649 2.39292 13.071 0.926431 11.0132 0.926431V2.61214C12.5622 2.61214 14.8595 3.85941 17.299 6.13473C16.2513 7.24593 15.2037 8.50832 14.2085 9.90678C12.5173 10.0882 10.9159 10.3679 9.44923 10.7383C9.27712 9.98237 9.1499 9.24913 9.06011 8.54612C8.7084 5.6585 9.14242 3.41341 10.1526 2.81624C10.3771 2.68017 10.669 2.6197 11.0132 2.6197V0.933991C10.3846 0.933991 9.8159 1.07006 9.32201 1.35731C7.21927 2.5819 6.74784 6.3993 7.83288 11.1918C3.17841 12.6432 0.147766 14.9639 0.147766 17.4131C0.147766 19.8698 3.19338 22.1981 7.86281 23.6419C6.78525 28.4495 7.26417 32.2745 9.3744 33.4991C9.8608 33.7863 10.4295 33.9224 11.0581 33.9224C13.1159 33.9224 15.8098 32.4408 18.5337 29.8707C21.2575 32.4257 23.9514 33.8922 26.0093 33.8922C26.6378 33.8922 27.2066 33.7561 27.7004 33.4688C29.8032 32.2443 30.2746 28.4269 29.1896 23.6343C33.8291 22.1905 36.8597 19.8623 36.8597 17.4131ZM27.1168 12.3711C26.8399 13.3462 26.4957 14.3516 26.1065 15.357C25.7997 14.7522 25.478 14.1475 25.1263 13.5428C24.782 12.938 24.4154 12.3484 24.0487 11.7739C25.1113 11.9326 26.1365 12.1292 27.1168 12.3711ZM23.6895 20.4216C23.1058 21.4421 22.5072 22.4097 21.8861 23.3093C20.7711 23.4075 19.6412 23.4604 18.5037 23.4604C17.3738 23.4604 16.2439 23.4075 15.1364 23.3168C14.5153 22.4173 13.9091 21.4573 13.3255 20.4443C12.7567 19.4541 12.2404 18.4487 11.769 17.4358C12.2329 16.4228 12.7567 15.4099 13.318 14.4196C13.9017 13.3991 14.5003 12.4316 15.1214 11.532C16.2364 11.4337 17.3663 11.3808 18.5037 11.3808C19.6337 11.3808 20.7636 11.4337 21.8711 11.5245C22.4922 12.424 23.0984 13.384 23.682 14.397C24.2507 15.3872 24.7671 16.3926 25.2385 17.4055C24.7671 18.4185 24.2507 19.4314 23.6895 20.4216ZM26.1065 19.4389C26.5106 20.4519 26.8549 21.4648 27.1392 22.4475C26.1589 22.6894 25.1263 22.8935 24.0562 23.0523C24.4229 22.4702 24.7895 21.873 25.1338 21.2607C25.478 20.656 25.7997 20.0437 26.1065 19.4389ZM18.5187 27.5046C17.8228 26.7789 17.1269 25.9701 16.4384 25.0857C17.1119 25.1159 17.8003 25.1386 18.4963 25.1386C19.1997 25.1386 19.8956 25.1235 20.5766 25.0857C19.9031 25.9701 19.2072 26.7789 18.5187 27.5046ZM12.9513 23.0523C11.8887 22.8935 10.8635 22.697 9.88324 22.4551C10.1601 21.4799 10.5043 20.4746 10.8935 19.4692C11.2003 20.0739 11.522 20.6787 11.8737 21.2834C12.2254 21.8881 12.5846 22.4778 12.9513 23.0523ZM18.4813 7.32153C19.1772 8.04721 19.8731 8.85605 20.5616 9.74048C19.8881 9.71024 19.1997 9.68756 18.5037 9.68756C17.8003 9.68756 17.1044 9.70268 16.4235 9.74048C17.0969 8.85605 17.7929 8.04721 18.4813 7.32153ZM12.9438 11.7739C12.5772 12.356 12.2105 12.9531 11.8663 13.5654C11.522 14.1702 11.2003 14.7749 10.8935 15.3796C10.4894 14.3667 10.1452 13.3538 9.8608 12.3711C10.8411 12.1367 11.8737 11.9326 12.9438 11.7739ZM6.17164 21.238C3.52263 20.0966 1.80901 18.5999 1.80901 17.4131C1.80901 16.2263 3.52263 14.722 6.17164 13.5881C6.81519 13.3084 7.51859 13.059 8.24445 12.8246C8.67099 14.3062 9.23222 15.8483 9.92814 17.4282C9.2397 19.0005 8.68595 20.535 8.2669 22.0091C7.52608 21.7747 6.82267 21.5177 6.17164 21.238ZM10.1975 32.0402C9.17984 31.4505 8.73834 29.2055 9.08256 26.3178C9.16487 25.6073 9.29957 24.8589 9.46419 24.0954C10.9309 24.4583 12.5323 24.738 14.2159 24.9194C15.2262 26.3178 16.2738 27.5878 17.3289 28.699C14.8894 30.9894 12.5996 32.2443 11.0431 32.2443C10.7064 32.2367 10.422 32.1687 10.1975 32.0402ZM27.9474 26.28C28.2991 29.1677 27.8651 31.4127 26.8549 32.0099C26.6304 32.146 26.3385 32.2065 25.9943 32.2065C24.4453 32.2065 22.148 30.9592 19.7085 28.6839C20.7562 27.5727 21.8038 26.3103 22.799 24.9118C24.4902 24.7304 26.0916 24.4507 27.5583 24.0803C27.7304 24.8438 27.8651 25.577 27.9474 26.28ZM30.8284 21.238C30.1848 21.5177 29.4814 21.7672 28.7556 22.0015C28.329 20.5199 27.7678 18.9778 27.0719 17.398C27.7603 15.8256 28.3141 14.2911 28.7331 12.8171C29.4739 13.0514 30.1773 13.3084 30.8359 13.5881C33.4849 14.7296 35.1985 16.2263 35.1985 17.4131C35.191 18.5999 33.4774 20.1042 30.8284 21.238Z"
			fill="#61DAFB"
		/>
		<path
			d="M18.4963 20.8676C20.385 20.8676 21.9161 19.321 21.9161 17.4131C21.9161 15.5052 20.385 13.9585 18.4963 13.9585C16.6076 13.9585 15.0765 15.5052 15.0765 17.4131C15.0765 19.321 16.6076 20.8676 18.4963 20.8676Z"
			fill="#61DAFB"
		/>
	</svg>
)
