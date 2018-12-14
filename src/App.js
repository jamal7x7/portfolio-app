import React, { useContext, useReducer, useEffect, useRef, useState } from 'react';
import './App.sass';

export default () => {
  const [coo, setCoo] = useState({
    R: { ra: 100, rb: 50},

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
  })
  let svgRef = useRef()
  const handleChange = e => {
    e.persist()
    let bound = svgRef.current.getBoundingClientRect();

    let xb = e.clientX - bound.left 
    let yb = e.clientY - bound.top 
    let xa = coo.A.x 
    let ya = coo.A.y

    let ra = coo.R.ra
    let rb = coo.R.rb
    
    let X = coo.B.x - coo.A.x
    let Y = coo.B.y - coo.A.y
    let theta = Math.atan(Y/X) 
    
    let H = Math.sqrt(X**2 + Y**2)
    
    let rho = 1*Math.asin(rb/H) 
    let tho = 1*Math.asin(ra/H) 
    
    let xa1 = xa + ra*Math.sin(theta)
    let ya1 = ya - ra*Math.cos(theta)

    let xa2 = xa - ra*Math.sin(theta)
    let ya2 = ya + ra*Math.cos(theta)

    let xb1 = xb + rb*Math.sin(theta)
    let yb1 = yb - rb*Math.cos(theta)

    let xb2 = xb - rb*Math.sin(theta)
    let yb2 = yb + rb*Math.cos(theta)

    let xc1 = xa + ra*Math.cos(theta - rho)
    let yc1 = ya + ra*Math.sin(theta - rho)

    let xc2 = xa + ra*Math.cos(rho + theta)
    let yc2 = ya + ra*Math.sin(rho + theta)

    let xd1 = xb - rb*Math.cos(theta + tho)
    let yd1 = yb - rb*Math.sin(theta + tho)

    let xd2 = xb - rb*Math.cos(theta - tho)
    let yd2 = yb - rb*Math.sin(theta - tho)

    let xi = xa + ra*Math.cos(theta)/Math.cos(rho)
    let yi = ya - ra*Math.cos(theta)/Math.cos(rho)

    let xj = xb - rb*Math.cos(theta)/Math.cos(tho)
    let yj = yb + rb*Math.cos(theta)/Math.cos(tho)
    setCoo({
      ...coo, 
      
      A: { x: 300, y: 300 }, 
      B: { x: xb, y: yb },

      A1: { x: xa1, y: ya1 },
      A2: { x: xa2, y: ya2 },

      B1: { x: xb1, y: yb1 },
      B2: { x: xb2, y: yb2 },

      C1: { x: xc1, y: yc1 },
      C2: { x: xc2, y: yc2 },

      D1: { x: xd1, y: yd1 },
      D2: { x: xd2, y: yd2 }, 

      I: { x: xi, y: yi },
      J: { x: xj, y: yj },
    })
  } 
  return (
    <div className="App" >
      <svg ref={svgRef}viewBox='0 0 1000 700'  height= '700' width= '1000' onMouseMove={handleChange}>
          <g >
                <circle 
                  className='A' 
                  cx={coo.A.x} 
                  cy={coo.A.y} 
                  r={coo.R.ra} 
                  fill="#61DAFB"/>

                <circle 
                  className='B' 
                  cx={coo.B.x} 
                  cy={coo.B.y} 
                  r={coo.R.rb}  
                  // fill="#fa8072" />
                  fill="#61DAFB"/>
                
                <path 
                  className='AB' 
                  d={`M ${coo.B.x} ${coo.B.y} 
                      L ${coo.A.x} ${coo.A.y}`}
                  stroke='#ffffff00' 
                  fill='none' />

                <path 
                  className='A1A2' 
                  d={`M ${coo.A1.x} ${coo.A1.y} 
                      L ${coo.A2.x} ${coo.A2.y}`}
                  stroke='#ffffff00' 
                  fill='none' />

                <path 
                  className='R1R2D2D1' 
                  d={`M ${coo.C1.x} ${coo.C1.y} 
                      L ${coo.C2.x} ${coo.C2.y}
                      C ${coo.I.x} ${coo.I.y} ${coo.J.x} ${coo.J.y} ${coo.D2.x} ${coo.D2.y}
                      L ${coo.D1.x} ${coo.D1.y}
                      C  ${coo.J.x} ${coo.J.y} ${coo.I.x} ${coo.I.y} ${coo.C1.x} ${coo.C1.y}
                    `}
                  stroke='#ffffffA9' 
                  fill='#61DAFB' />
                  
                <path 
                  className='B1B2' 
                  d={`M ${coo.B1.x} ${coo.B1.y} 
                      L ${coo.B2.x} ${coo.B2.y}`}
                  stroke='#ffffff00' 
                  fill='none' />

                <path 
                  d={`M ${coo.A.x} ${coo.A.y} 
                      L ${coo.B.x} ${coo.A.y}
                      L ${coo.B.x} ${coo.B.y}`}
                  stroke='#ffff0011' 
                  fill='none' />
              
          </g>
      </svg>        
    </div>
      )
}


