console.log('==========================================================')
// Freeze & Seal
// const me = {
// 	name: 'Jamal',
// 	surname: 'Rayan'
// }
// console.log(me.name)

// me.name = 'Kamal'
// console.log(me.name)

// Object.seal(me)
// me.loc = 'NY'
// console.log(me.loc)

// Object.freeze(me)
// me.name = 'Omar'
// console.log(me.name)

//TDZ Tomporal Dead Zone
// if (true) {
// 	const f = () => console.log(x)

// 	f()
// 	// var x = 'Jamal'
// 	let x = 'Jamal'
// 	f()
// }

// Iterable & Looping
let y = 100
for (let i = 0; i < 10; i++) {
	setTimeout(() => {
		console.log(i + y)
	}, 1000)
}

console.log('==========================================================')
