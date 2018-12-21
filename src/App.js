import React, {
	useContext,
	useReducer,
	useEffect,
	useRef,
	useState
} from 'react'
import './App.sass'

const begining = Date.now()

export default () => {
	let [stop, setStop] = useState(false)

	let [time, setTime] = useState(0)

	useEffect(() => {
		let tms = (Date.now() - begining) / 100
		setTime(Number.parseFloat(tms).toFixed(0))
	})

	const [coo, setCoo] = useState({
		R: { ra: 100, rb: 50 },
		t: time,

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
		J: { x: 0, y: 0 }
	})
	let svgRef = useRef()
	const handleChange = e => {
		e.preventDefault()
		let bound = svgRef.current.getBoundingClientRect()

		let xb = e.clientX - bound.left
		let yb = e.clientY - bound.top
		let xa = 600
		let ya = 400

		let ra = coo.R.ra
		let rb = coo.R.rb

		let X = coo.B.x - coo.A.x
		let Y = coo.B.y - coo.A.y
		let theta = Math.atan2(Y, X)

		let H = Math.sqrt(X ** 2 + Y ** 2)

		let rho = 1.3 * Math.asin(rb / H)
		let tho = 1.3 * Math.asin(ra / H)

		let xa1 = xa + ra * Math.sin(theta)
		let ya1 = ya - ra * Math.cos(theta)

		let xa2 = xa - ra * Math.sin(theta)
		let ya2 = ya + ra * Math.cos(theta)

		let xb1 = xb + rb * Math.sin(theta)
		let yb1 = yb - rb * Math.cos(theta)

		let xb2 = xb - rb * Math.sin(theta)
		let yb2 = yb + rb * Math.cos(theta)

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

		function precise(x) {
			return Number.parseFloat(x).toFixed(1)
		}

		setCoo({
			...coo,
			t: time,
			A: { x: precise(xa), y: precise(ya) },
			B: { x: precise(xb), y: precise(yb) },

			A1: { x: precise(xa1), y: precise(ya1) },
			A2: { x: precise(xa2), y: precise(ya2) },

			B1: { x: precise(xb1), y: precise(yb1) },
			B2: { x: precise(xb2), y: precise(yb2) },

			C1: { x: precise(xc1), y: precise(yc1) },
			C2: { x: precise(xc2), y: precise(yc2) },

			D1: { x: precise(xd1), y: precise(yd1) },
			D2: { x: precise(xd2), y: precise(yd2) },

			I: { x: precise(xi), y: precise(yi) },
			J: { x: precise(xj), y: precise(yj) }
		})
	}

	console.log(time)
	const handleStop = e => {
		e.preventDefault()
		setTime(0)
	}

	return (
		<div className="App">
			<div className="stats">
				<h2>
					A: ( {coo.A.x}, {coo.A.x} )
				</h2>
				<h2>
					B: ( {coo.B.x}, {coo.B.x} )
				</h2>

				<h2>Time:{time} </h2>
				<h2>Time:{coo.t} </h2>
				{/* <button onClick={handleStop}>Stop</button> */}
			</div>
			<svg
				ref={svgRef}
				// viewBox="0 0 1000 700"
				// height="700"
				// width="1000"
				onMouseMove={e => handleChange(e)}>
				<defs>
					<radialGradient
						cx="50%"
						cy="50%"
						fx="50%"
						fy="50%"
						r="77%"
						id="radialGradient-1">
						<stop stop-color="#C86DD7" offset="0%" />
						<stop stop-color="#877AFF" offset="100%" />
					</radialGradient>
					<radialGradient
						cx="50%"
						cy="50%"
						fx="50%"
						fy="50%"
						r="77%"
						id="radialGradient-2">
						<stop stop-color="#C86DD7" offset="0%" />
						<stop stop-color="#877AFF" offset="100%" />
					</radialGradient>
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
					/>

					<circle
						className="B"
						cx={coo.B.x}
						cy={coo.B.y}
						r={coo.R.rb}
						// fill="#fa8072" />
						fill="url(#radialGradient-1)"
					/>

					<path
						className="R1R2D2D1"
						d={`M ${coo.C1.x} ${coo.C1.y} 
                  L ${coo.C2.x} ${coo.C2.y}
                  C ${coo.I.x} ${coo.I.y} ${coo.J.x} ${coo.J.y} ${coo.D2.x} ${
							coo.D2.y
						}
                  L ${coo.D1.x} ${coo.D1.y}
                  C  ${coo.J.x} ${coo.J.y} ${coo.I.x} ${coo.I.y} ${coo.C1.x} ${
							coo.C1.y
						}
                  `}
						// stroke="#fff00f"
						fill="url(#radialGradient-2)"
					/>
					<g opacity="100">
						<path
							className="C2I"
							d={`M ${coo.C2.x} ${coo.C2.y} 
                      L ${coo.I.x} ${coo.I.y}`}
							stroke="#00ff00"
							fill="none"
						/>
						<path
							className="C1I"
							d={`M ${coo.C1.x} ${coo.C1.y} 
                      L ${coo.I.x} ${coo.I.y}`}
							stroke="#00ff00"
							fill="none"
						/>
						<path
							className="D2I"
							d={`M ${coo.D2.x} ${coo.D2.y} 
                      L ${coo.J.x} ${coo.J.y}`}
							stroke="#00fff0"
							fill="none"
						/>
						<path
							className="C1I"
							d={`M ${coo.D1.x} ${coo.D1.y} 
                      L ${coo.J.x} ${coo.J.y}`}
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
		</div>
	)
}
