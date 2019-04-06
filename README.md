# VMBAIN

Virtual Machine Based Artificial Intelligence Network (VMBAIN)  

vmBAIN implements a virtual machine which emulates a microprocessor instruction set, specifically built for targeted operation. vmBAIN is intended as an alternative for artificial neural networks.  

### USAGE

	let engine = new __VMBAIN__( [ {json training data...} ],[ {desired json output...} ]) 
	let result = engine.exec( [ {json training data...} ] ) // [ {...}, ...]
	console.log( result[0] ) // [ {desired json output...} ] //

### NOTES

	All training data must be separated in right hand side / left hand Side (rhs/lhs) assertions: 
	
	```javascript
	var training_set = { 
		lhs : { num : 0, times : `*`, num : 0 }, 
		rhs : { product : 0 } 
	}
	```
	
	The engine first attempts 

		- Arithmetic match
		- Boolean match

	...on the training data; if these methods fail, then a more powerful algorithmic combination is attempted
	through analysis of the virtual Core's Program Status Word Register flags (PSW)

### EXAMPLE

	```javascript
	let engine = new __VMBAIN__( [ training_set ] ) 
	let result = engine.exec( [ set ] ) //[ {...}, ...]//
	console.log( result[0] ) //{...}//
	```

### EXAMPLE

	```javascript
	let tt000 = { 
		lhs : { num : 0, times : `*`, num : 0 }, 
		rhs : { product : 0 } }
	let tt001 = { 
		lhs : { num : 0, times : `*`, num : 1 }, 
		rhs : { product : 0 } }
	let tt002 = { 
		lhs : { num : 0, times : `*`, num : 2 }, 
		rhs : { product : 0 } }
	.
	.
	let tt000 = { 
		lhs : { num : 12, times : `*`, num : 12 }, 
		rhs : { product : 144 } }	
	let engine = new __VMBAIN__( [ tt000,...,tt144 ] )
	.
	.
	let tt_unk = { num : 120, times : `*`, num : 120 }
	let result = engine.exec( [ tt_unk ] ) 
	console.log( result[0] ) //{ product : 14400 }//
	```

### EXAMPLE

	```javascript
	let tt000 = { 
		lhs : { product : 0 }, 
		rhs : { num : 0, times : `*`, num : 0 } }
	let tt001 = { 
		lhs : { product : 0 }, 
		rhs : { num : 0, times : `*`, num : 1 } }
	let tt002 = { 
		lhs : { product : 0 }, 
		rhs : { num : 0, times : `*`, num : 2 } }
	.
	.
	let tt000 = { 
		lhs : { product : 144 }, 
		rhs : { num : 12, times : `*`, num : 12 } }	
	let engine = new __VMBAIN__( [ tt000,...,tt144 ] )
	.
	.
	let tt_unk = { product : 1440 }
	let result = engine.exec( [ tt_unk ],`converge` ) //multiple solutions, converge on first answer//
	console.log( result[0].json ) //{ num : 120, times : `*`, num : 12 }//
	```

