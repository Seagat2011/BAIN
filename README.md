# VMSKYE

VMSKYE is virtual machine based artificial intelligence engine, intended as alternative for artificial neural networks.   

VMSKYE implements an ecmascript6 virtual machine which emulates an x86_32/64 microprocessor instruction set, specifically built for targeted operation.  Optimzed Platform-Specific Code is automatically generated via analyzing the microprocessor's Program Status Word (PSW) 

### USAGE

	let engine = new __VMSKYE__( [ {json training set...},... ] ]) 
	let result = engine.__exec( [ {json data set...},... ],flags )
	console.log( result[0] )

### NOTES

All training sets must be separated into right hand side / left hand side assertions (rhs/lhs): 
	
```javascript
	var training_set1 = { 
		lhs : `{ num : 0, mult : '*', num : 0 }`, 
		rhs : `{ product : 0 }` 
	}
	
	var training_set2 = {
	        lhs : `{ num : 4, mult : '*', num : 4 }`,
		rhs : `{ product : 16 }`
	}
```
	
Quotes mitigate naming conflicts. The engine first attempts 

- Arithmetic match
- Boolean match

...on the training set; if these matches fail, then a more powerful algorithmic combination is attempted
through analysis of the virtual Core's Program Status Word Register (PSW)

An instantiation example

```javascript
        let training_set = [ training_set1, training_set2 ]
	let engine = new __VMSKYE__( training_set ) 
	let result = engine.__exec( [ `{ num : 0, mult : '*', num : 0 }` ] )
	console.log( result[0] ) // `{ product : 0 }` //
```

A basic multiplication table

```javascript
	let tt000 = { 
		lhs : `{ num : 0, mult : '*', num : 0 }`, 
		rhs : `{ product : 0 }` }
	let tt001 = { 
		lhs : `{ num : 0, mult : '*', num : 1 }`, 
		rhs : `{ product : 0 }` }
	let tt002 = { 
		lhs : `{ num : 0, mult : '*', num : 2 }`, 
		rhs : `{ product : 0 }` }
	 .
	 .
	let tt144 = { 
		lhs : `{ num : 12, mult : '*', num : 12 }`, 
		rhs : `{ product : 144 }` }
	let training_set = [ tt000,...,tt144 ]
	let engine = new __VMSKYE__( training_set )
	 .
	 .
	let tt_unk = `{ num : 12, mult : '*', num : 12 }`
	let result = engine.__exec( [ tt_unk ] ) 
	console.log( result[0] ) // `{ product : 144 }` //
```

A reverse multiplication table

```javascript
	let tt000 = { 
		lhs : `{ product : 0 }`, 
		rhs : `{ num : 0, mult : '*', num : 0 }` }
	let tt001 = { 
		lhs : `{ product : 0 }`, 
		rhs : `{ num : 0, mult : '*', num : 1 }` }
	let tt002 = { 
		lhs : `{ product : 0 }`, 
		rhs : `{ num : 0, mult : '*', num : 2 }` }
	 .
	 .
	let tt144 = { 
		lhs : `{ product : 144 }`, 
		rhs : `{ num : 12, mult : '*', num : 12 }` }
	let training_set = [ tt000,...,tt144 ]
	let engine = new __VMSKYE__( training_set )
	 .
	 .
	let tt_unk = `{ product : 144 }`
	let result00 = engine.__exec( [ tt_unk ] ) 
	let result01 = engine.__exec( [ tt_unk ],'converge' ) //iff many solutions, converge on first solution//
	console.log( result00 )   // [`{ num : 12, mult : '*', num : 12 }`,...] //
	console.log( result00[0] ) // `{ num : 12, mult : '*', num : 12 }` //
	console.log( result01 ) // [`{ num : 12, mult : '*', num : 12 }`] //
```

An example use of Arrays to add additional dimensional components (eg Time)

```javascript
      let tt000 = {
	       lhs : `[{ freq : 0x46, amp : 0x6, time_slice : 0x0 }, { freq : 0x43, amp : 0x4, time_slice : 0x01 },...]`,
	       rhs : `{ msg : 'Hello' }`
	}
```

A speech training example

```javascript
        let tt000 = {
	       lhs : `[{ freq : 0x46, amp : 0x6, time_slice : 0x0 },...]`,
	       rhs : `{ msg : 'Hello' }`
	}
	
	let tt001 = {
	       lhs : `[{ freq : 0x38, amp : 0x5, time_slice : 0x0 },...]`,
	       rhs : `{ msg : 'Hello' }`
	}
	
	let training_set = [ tt000,tt001 ]
	
	let engine = new __VMSKYE__( training_set )
```

For multiple concurrent training sessions

```javascript
        let tt000 = {
	       lhs : `[{ freq : 0x46, amp : 0x6, time_slice : 0x0 },...]`,
	       rhs : `{ msg : 'Hello' }`
	}
	
	let tt001 = {
	       lhs : `[{ freq : 0x55, amp : 0x7, time_slice : 0x0 },...]`,
	       rhs : `{ msg : 'World' }`
	}
	
	let training_set1 = [ tt000 ]
	let training_set2 = [ tt001 ]
	
	let engine = new __VMSKYE__( training_set1, training_set2 )
```

An automated trading example

```javascript
        let tt000 = {
	       lhs : `[
	       { 'stock' : 'aapl', '5-yr-avg' : 150.4, '2-yr-avg' : 165.3, '1-yr-avg' : 173.3, '200-day-avg' : 177.2, '100-day-avg' : 181.5, '90-day-avg' : 184.3, '20-day-avg' : 186.0, '10-day-avg' : 188.0, '5-day-avg' : 188.8, '2-day-avg' : 191.0, '1-day-avg' : 192.5, '10-hr-avg' : 199.2, '5-hr-avg' : 199.4, '2-hr-avg' : 199.4 }, 
	       { 'stock' : 'aapl', '5-yr-avg' : 150.4, '2-yr-avg' : 165.3, '1-yr-avg' : 173.3, '200-day-avg' : 177.2, '100-day-avg' : 181.5, '90-day-avg' : 184.3, '20-day-avg' : 186.0, '10-day-avg' : 188.0, '5-day-avg' : 188.8, '2-day-avg' : 191.0, '1-day-avg' : 192.5, '10-hr-avg' : 199.2, '5-hr-avg' : 199.4, '2-hr-avg' : 201.1 }, 
	       { 'stock' : 'aapl', '5-yr-avg' : 150.4, '2-yr-avg' : 165.3, '1-yr-avg' : 173.3, '200-day-avg' : 177.2, '100-day-avg' : 181.5, '90-day-avg' : 184.3, '20-day-avg' : 186.0, '10-day-avg' : 188.0, '5-day-avg' : 188.8, '2-day-avg' : 191.0, '1-day-avg' : 192.5, '10-hr-avg' : 199.2, '5-hr-avg' : 199.6, '2-hr-avg' : 201.9 } 
	       ]`,
	       rhs : `{ msg : 'Watch' }`
	}
	
	let tt001 = {
	       lhs : `[
	       { 'stock' : 'aapl', '5-yr-avg' : 150.4, '2-yr-avg' : 165.3, '1-yr-avg' : 173.3, '200-day-avg' : 177.2, '100-day-avg' : 181.5, '90-day-avg' : 184.3, '20-day-avg' : 186.0, '10-day-avg' : 188.0, '5-day-avg' : 188.8, '2-day-avg' : 191.0, '1-day-avg' : 192.5, '10-hr-avg' : 199.2, '5-hr-avg' : 199.4, '2-hr-avg' : 199.4 }, 
	       { 'stock' : 'aapl', '5-yr-avg' : 150.4, '2-yr-avg' : 165.3, '1-yr-avg' : 173.3, '200-day-avg' : 177.2, '100-day-avg' : 181.5, '90-day-avg' : 184.3, '20-day-avg' : 186.0, '10-day-avg' : 188.0, '5-day-avg' : 188.8, '2-day-avg' : 191.0, '1-day-avg' : 192.5, '10-hr-avg' : 199.2, '5-hr-avg' : 199.4, '2-hr-avg' : 201.1 }, 
	       { 'stock' : 'aapl', '5-yr-avg' : 150.4, '2-yr-avg' : 165.3, '1-yr-avg' : 173.3, '200-day-avg' : 177.2, '100-day-avg' : 181.5, '90-day-avg' : 184.3, '20-day-avg' : 186.0, '10-day-avg' : 188.0, '5-day-avg' : 188.8, '2-day-avg' : 191.0, '1-day-avg' : 192.5, '10-hr-avg' : 199.2, '5-hr-avg' : 199.6, '2-hr-avg' : 201.9+ } 
	       ]`,
	       rhs : `{ msg : 'Buy' }`
	}
	
	let training_set00 = [ tt000 ]
	let training_set01 = [ tt001 ]
	
	let engine = new __VMSKYE__( training_set00, training_set01 )
```

To upgrade

```javascript
        let tt000 = {
	       lhs : `[{ freq : 0x46, amp : 0x6, time_slice : 0x0 },...]`,
	       rhs : `{ msg : 'Hello' }`
	}
	
	let tt001 = {
	       lhs : `[{ freq : 0x55, amp : 0x7, time_slice : 0x0 },...]`,
	       rhs : `{ msg : 'World' }`
	}
	
	let training_set1 = [ tt000 ]
	let training_set2 = [ tt001 ]
	
	let engine = new __VMSKYE__( training_set1 )
	engine.__extend( training_set2 )
```

To patch

```javascript
        let tt000 = {
	       lhs : `[{ freq : 0x46, amp : 0x6, time_slice : 0x0 },...]`,
	       rhs : `{ msg : 'Hello' }`
	}
	
	let tt001 = {
	       lhs : `[{ freq : 0x55, amp : 0x7, time_slice : 0x0 },...]`,
	       rhs : `{ msg : 'World' }`
	}
	
	let training_set1 = [ tt000 ]
	let training_set2 = [ tt001 ]
	
	let engine = new __VMSKYE__( training_set1 )
	engine.__patch( training_set2,training_set1 )
```

To view a library

```javascript
        let tt000 = {
	       lhs : `[{ freq : 0x46, amp : 0x6, time_slice : 0x0 },...]`,
	       rhs : `{ msg : 'Hello' }`
	}
	
	let tt001 = {
	       lhs : `[{ freq : 0x55, amp : 0x7, time_slice : 0x0 },...]`,
	       rhs : `{ msg : 'Hello' }`
	}
	
	let training_set1 = [ tt000, tt001 ]
	
	let engine = new __VMSKYE__( training_set1 )
	console.log( engine.__includes() ) // [ `{ module : 'training_set1' }, { module : 'training_set2' }` ] //
```

To examine a runtime

```javascript
        let tt000 = {
	       lhs : `[{ freq : 0x46, amp : 0x6, time_slice : 0x0 },...]`,
	       rhs : `{ msg : 'Hello' }`
	}
	
	let tt001 = {
	       lhs : `[{ freq : 0x55, amp : 0x7, time_slice : 0x0 },...]`,
	       rhs : `{ msg : 'Hello' }`
	}
	
	let training_set1 = [ tt000, tt001 ]
	
	let engine = new __VMSKYE__( training_set1 )
	console.log( engine.__decompile() ) // [`let __0x0000 = { token : { freq : [ 0x46, 0x55 ] } }, let __0x0001 = { token : { amp : [ 0x6, 0x7 ] } }`,...] //
```

To unload a library

```javascript
        let tt000 = {
	       lhs : `[{ freq : 0x46, amp : 0x6, time_slice : 0x0 },...]`,
	       rhs : `{ msg : 'Hello' }`
	}
	
	let tt001 = {
	       lhs : `[{ freq : 0x55, amp : 0x7, time_slice : 0x0 },...]`,
	       rhs : `{ msg : 'Hello' }`
	}
	
	let training_set1 = [ tt000, tt001 ]
	
	let engine = new __VMSKYE__( training_set1 )
	let f = engine.__serialize()
	console.log( f ) // [{ __decompile : `let __0x0000 = { token : { freq : [ 0x46, 0x55 ] } }, let __0x0001 = { token : { amp : [ 0x6, 0x7 ] } }`,...] //
```

To load a library

```javascript
        let f = [{ __decompile : `let __0x0000 = { token : { freq : [ 0x46, 0x55 ] } }, let __0x0001 = { token : { amp : [ 0x6, 0x7 ] } }`,...]
	let engine = new __VMSKYE__()
	engine.__deserialize(f)
	console.log( engine.__decompile() ) // [`let __0x0000 = { token : { freq : [ 0x46, 0x55 ] } }, let __0x0001 = { token : { amp : [ 0x6, 0x7 ] } }`,...] //
```
