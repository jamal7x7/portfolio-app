import React, { useRef } from 'react'
import ReactLogo from './ReactLogo'
import NodeLogo from './NodeLogo'

export default ({ coo, show, stop, time }) => {
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

				<radialGradient
					cx="50%"
					cy="50%"
					fx="50%"
					fy="50%"
					r="77%"
					id="radialGradient-sticky"
					// gradientTransform="translate(53, 2)"
				>
					<stop stopColor="#C86DD7" offset="0%" />
					<stop stopColor="#877AFF" offset="50%" />
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
						flood-opacity="0.2"
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
						flood-opacity={0.2 + Math.cos(0.2 * time) / 4}
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

				<text
					x={400}
					y={400}
					// x={400 + 2 * Math.cos(time / 10)}
					// y={400 + 6 * Math.sin(time / 10)}
					fill="#ffffffaa"
					style={{ textAnchor: 'middle', fontSize: 84, fontWeight: 700 }}>
					Design + Code
				</text>
				<text
					x={400}
					y={400}
					// x={400 + 2 * Math.cos(time / 10)}
					// y={400 + 6 * Math.sin(time / 10)}
					transform="translate(0, 50)"
					fill="#DD8EDA"
					style={{
						textAnchor: 'middle',
						fontSize: 24,
						fontWeight: 300,
						letterSpacing: 5
					}}>
					From Draft to Deployment
				</text>

				<circle
					className="A"
					cx={coo.A.x}
					cy={coo.A.y}
					r={coo.R.ra}
					fill="url(#radialGradient-1)"
					filter="url(#redShadow)"
					opacity="0.98"
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
						filter="url(#B)"
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
						fill="url(#radialGradient-sticky)"
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
