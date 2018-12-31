import React, {
	// useContext,
	// useReducer,
	useEffect,
	// useRef,
	useState
} from 'react'
import './App.sass'
import Blob from './svg/Blob'
import BlobNode from './svg/BlobNode'
import Stats from './svg/Stats'
import Diamond from './svg/Diamond'

const begining = Date.now()

export default () => {
	let [stop, setStop] = useState(true)

	let [time, setTime] = useState(0)

	let [show, setShow] = useState(0)

	// let [phi0, setPhi0] = useState(0)

	useEffect(() => {
		let tms = (Date.now() - begining) / 150
		stop ? setTime(Number.parseFloat(tms).toFixed(3)) : setTime(time)
	})

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

	useEffect(() => {
		// const handleChange = e => {
		// e.preventDefault()
		// let bound = svgRef.current.getBoundingClientRect()

		let hx = 350
		let hy = 200
		let phi = 0.15
		let phi2 = 0.25 * time
		// let phi0 = 100
		let phi0 = 0

		let xa = 900 + 10 * Math.cos(phi2 + 10)
		let ya = 400 + 30 * Math.sin(phi2 + 70)

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
			{/* <Stats
				coo={coo}
				show={show}
				stop={stop}
				time={time}
				handleStop={handleStop}
				handleIsShown={handleIsShown}
			/> */}

			{/* <div className="contact">Let's talk</div> */}

			<Blob
				coo={coo}
				show={show}
				stop={stop}
				time={time}
				// phi0={phi0}
				// setPhi0={setPhi0}
			/>

			<BlobNode
				// coo={coo}
				show={show}
				stop={stop}
				time={time}
				// phi0={phi0}
				// setPhi0={setPhi0}
			/>

			{/* <Diamond /> */}
		</div>
	)
}
