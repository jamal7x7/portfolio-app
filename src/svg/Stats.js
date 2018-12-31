import React from 'react'

const sigmoid = (x, a = 1, b = 200, c = 1) => c / (1 + Math.exp(-a * (x - b)))

export default ({ coo, show, stop, time, handleStop, handleIsShown }) => {
	return (
		<div className="stats">
			<h2>
				A: ( {coo.A.x}, {coo.A.x} )
			</h2>
			<h2>
				B: ( {coo.B.x}, {coo.B.x} )
			</h2>

			<h2>Time:{time} </h2>
			<h2>S(t):{Math.round(100 * sigmoid(coo.H, 0.1, 250, 1)) / 100} </h2>
			{/* <h2>Time:{coo.t} </h2> */}
			<h2>k:{coo.k} </h2>

			{/* <h2>fps:{fps.getFPS()} </h2> */}

			<button onClick={handleStop}>{stop ? 'Stop' : 'Continue'}</button>
			<button onClick={e => handleIsShown(e)}>
				{show === 1 ? 'Hide' : 'Show'}
			</button>
		</div>
	)
}
