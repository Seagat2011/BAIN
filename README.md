# VMBAIN

Virtual Machine Based Artificial Intelligence Network (VMBAIN)  

vmBAIN implements an ecma6 virtual machine which emulates an x86 microprocessor instruction set, specifically built for targeted operation. vmBAIN is intended as an alternative for artificial neural networks.  

### USAGE

	let engine = new __VMBAIN__( [ {json training set...},... ] ]) 
	let result = engine.exec( [ {json data set...},... ],flags )
	console.log( result[0] )

### NOTES

All training sets must be separated into right hand side / left hand side assertions (rhs/lhs): 
	
```javascript
	var training_set1 = { 
		lhs : '{ num : 0, mult : "*", num : 0 }', 
		rhs : '{ product : 0 }' 
	}
	
	var training_set2 = {
	        lhs : '{ num : 4, mult : "*", num : 4 }',
		rhs : '{ product : 16 }'
	}
	
	var training_set = [ training_set1, training_set2 ]
```
	
Quotes mitigate naming conflicts. The engine first attempts 

- Arithmetic match
- Boolean match

...on the training set; if these matches fail, then a more powerful algorithmic combination is attempted
through analysis of the virtual Core's Program Status Word Register (PSW)

### EXAMPLE

```javascript
	let engine = new __VMBAIN__( training_set ) 
	let result = engine.exec( [ '{ num : 0, mult : `*`, num : 0 }' ] )
	console.log( result[0] ) //'{ product : 0 }'//
```

### EXAMPLE

```javascript
	let tt000 = { 
		lhs : '{ num : 0, mult : `*`, num : 0 }', 
		rhs : '{ product : 0 }' }
	let tt001 = { 
		lhs : '{ num : 0, mult : `*`, num : 1 }', 
		rhs : '{ product : 0 }' }
	let tt002 = { 
		lhs : '{ num : 0, mult : `*`, num : 2 }', 
		rhs : '{ product : 0 }' }
	 .
	 .
	let tt144 = { 
		lhs : '{ num : 12, mult : `*`, num : 12 }', 
		rhs : '{ product : 144 }' }
	let training_set = [ tt000,...,tt144 ]
	let engine = new __VMBAIN__( training_set )
	 .
	 .
	let tt_unk = '{ num : 120, mult : `*`, num : 120 }'
	let result = engine.exec( [ tt_unk ] ) 
	console.log( result[0] ) //'{ product : 14400 }'//
```

### EXAMPLE

```javascript
	let tt000 = { 
		lhs : '{ product : 0 }', 
		rhs : '{ num : 0, mult : `*`, num : 0 }' }
	let tt001 = { 
		lhs : '{ product : 0 }', 
		rhs : '{ num : 0, mult : `*`, num : 1 }' }
	let tt002 = { 
		lhs : '{ product : 0 }', 
		rhs : '{ num : 0, mult : `*`, num : 2 }' }
	 .
	 .
	let tt144 = { 
		lhs : '{ product : 144 }', 
		rhs : '{ num : 12, mult : `*`, num : 12 }' }
	let training_set = [ tt000,...,tt144 ]
	let engine = new __VMBAIN__( training_set )
	 .
	 .
	let tt_unk = '{ product : 1440 }'
	let result00 = engine.exec( [ tt_unk ] ) 
	let result01 = engine.exec( [ tt_unk ],`converge` ) //iff multiple solutions, converge on first answer//
	console.log( result00 )   //['{ num : 120, mult : `*`, num : 12 }',...]//
	console.log( result00[0] ) //'{ num : 120, mult : `*`, num : 12 }'//
	console.log( result01 ) //['{ num : 120, mult : `*`, num : 12 }']//
```

To include additional dimensional components (eg Time)

### EXAMPLE

```javascript
      let tt000 = {
	       lhs : '[{ freq : 0x46, amp : 0x6, time_slice : 0x0 }, { freq : 0x43, amp : 0x4, time_slice : 0x01 },...]',
	       rhs : '{ msg : "Hello" }'
	}
```

### EXAMPLE

```javascript
        let tt000 = {
	       lhs : '[{ freq : 0x46, amp : 0x6, time_slice : 0x0 },...]',
	       rhs : '{ msg : "Hello" }'
	}
	
	let tt001 = {
	       lhs : '[{ freq : 0x38, amp : 0x5, time_slice : 0x0 },...]',
	       rhs : '{ msg : "Hello" }'
	}
	
	let training_set = [ tt000,tt001 ]
	
	let engine = new __VMBAIN__( training_set )
```

For multiple concurrent training sessions

```javascript
        let tt000 = {
	       lhs : '[{ freq : 0x46, amp : 0x6, time_slice : 0x0 },...]',
	       rhs : '{ msg : "Hello" }'
	}
	
	let tt001 = {
	       lhs : '[{ freq : 0x55, amp : 0x7, time_slice : 0x0 },...]',
	       rhs : '{ msg : "World" }'
	}
	
	let training_set1 = [ tt000 ]
	let training_set2 = [ tt001 ]
	
	let engine = new __VMBAIN__( training_set1, training_set2 )
```
