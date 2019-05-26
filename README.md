# ENGRIPPA

ENGRIPPA is an artificial intelligence engine which spawns virtual machines, intended as alternative for artificial neural networks.   

### USAGE

    let vm = new __ENGRIPPA__( [ {json training set...}, ... ] ]) 
    let result = vm.__exec( [ {json data set...}, ... ],flags )
    console.log( result[0] )

### NOTES

All training sets must be separated into right hand side / left hand side assertions (rhs/lhs): 
    
```javascript 
    var training_set1 = { 
        lhs : `{ num : 0, mult : '*', num : 0 }`, 
        rhs : `{ product : 0 }` 
    }
```

The engine first attempts 

- Arithmetic match ( F = <((U)+(,(U)\*)...> ) whereby the functor, U, maps to the function, (U) = (U + U)^(U+U), which in turn generates number solutions from the Rational Number field, Q. This recursive construct is used to model any number-generating function in mathematics
- Boolean match (DNF,CNF,Series)

If these attempts fail, a more powerful algorithmic combination is attempted on the training sets by matching and then, partially modeling, features that the training set displays inline with aspects of the above methods 

An instantiation example

```javascript 
    let training_set = [ training_set1 ]
    let vm = new __ENGRIPPA__( training_set ) 
    let result = vm.__exec( [ `{ num : 0, mult : '*', num : 0 }` ] )
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
    let vm = new __ENGRIPPA__( training_set )
    let tt_unk = `{ num : 12, mult : '*', num : 12 }`
    let result = vm.__exec( [ tt_unk ] ) 
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
    let vm = new __ENGRIPPA__( training_set )
     .
     .
    let tt_unk = `{ product : 144 }`
    let result00 = vm.__exec( [ tt_unk ] ) 
    let result01 = vm.__exec( [ tt_unk ],'converge' ) //iff many solutions//
    console.log( result00 ) // [`{ num : 12, mult : '*', num : 12 }`, ... ] //
    console.log( result01 ) // [`{ num : 12, mult : '*', num : 12 }`] //
```

A subtraction table

```javascript 
    let tt000 = { 
           lhs : `[ num : 2, minus : '-', num : 1 ]`, 
           rhs : `{ result : 1 }` 
    }

    let tt001 = { 
           lhs : `[ num : 5, minus : '-', num : 3 ]`, 
           rhs : `{ result : 2 }` 
    }
    
    let training_set = [ tt000,tt001 ]
    
    let vm = new __ENGRIPPA__( training_set )
```

A speech training example

```javascript 
    let tt000 = {
           lhs : `[{ freq : 0x46, amp : 0x6, time_slice : 0x0 }, ... ]`,
           rhs : `{ msg : 'Hello' }`
    }
    
    let tt001 = {
           lhs : `[{ freq : 0x38, amp : 0x5, time_slice : 0x0 }, ... ]`,
           rhs : `{ msg : 'Hello' }`
    }
    
    let training_set = [ tt000,tt001 ]
    
    let vm = new __ENGRIPPA__( training_set )
```

Concurrent training sessions

```javascript 
    let tt000 = {
           lhs : `[{ freq : 0x46, amp : 0x6, time_slice : 0x0 }, ... ]`,
           rhs : `{ msg : 'Hello' }`
    }
    
    let tt001 = {
           lhs : `[{ freq : 0x55, amp : 0x7, time_slice : 0x0 }, ... ]`,
           rhs : `{ msg : 'World' }`
    }
    
    let training_set1 = [ tt000 ]
    let training_set2 = [ tt001 ]
    
    let vm = new __ENGRIPPA__( training_set1, training_set2 )
```

An automated trading example

```javascript 
    let tt000 = {
           lhs : `[
           { 'stock' : 'aapl', '5-yr-trend' : 150.4, '2-yr-trend' : 165.3, '1-yr-trend' : 173.3, '200-day-trend' : 177.2, '100-day-trend' : 181.5, '90-day-trend' : 184.3, '20-day-trend' : 186.0, '10-day-trend' : 188.0, '5-day-trend' : 188.8, '2-day-trend' : 191.0, '1-day-trend' : 192.5, '10-hr-trend' : 199.2, '5-hr-trend' : 199.4, '2-hr-trend' : 199.4 }, 
           { 'stock' : 'aapl', '5-yr-trend' : 150.4, '2-yr-trend' : 165.3, '1-yr-trend' : 173.3, '200-day-trend' : 177.2, '100-day-trend' : 181.5, '90-day-trend' : 184.3, '20-day-trend' : 186.0, '10-day-trend' : 188.0, '5-day-trend' : 188.8, '2-day-trend' : 191.0, '1-day-trend' : 192.5, '10-hr-trend' : 199.2, '5-hr-trend' : 199.4, '2-hr-trend' : 201.1 }, 
           { 'stock' : 'aapl', '5-yr-trend' : 150.4, '2-yr-trend' : 165.3, '1-yr-trend' : 173.3, '200-day-trend' : 177.2, '100-day-trend' : 181.5, '90-day-trend' : 184.3, '20-day-trend' : 186.0, '10-day-trend' : 188.0, '5-day-trend' : 188.8, '2-day-trend' : 191.0, '1-day-trend' : 192.5, '10-hr-trend' : 199.2, '5-hr-trend' : 199.6, '2-hr-trend' : 201.9 } 
           ]`,
           rhs : `{ msg : 'Watch' }`
    }
    
    let tt001 = {
           lhs : `[
           { 'stock' : 'aapl', '5-yr-trend' : 150.4, '2-yr-trend' : 165.3, '1-yr-trend' : 173.3, '200-day-trend' : 177.2, '100-day-trend' : 181.5, '90-day-trend' : 184.3, '20-day-trend' : 186.0, '10-day-trend' : 188.0, '5-day-trend' : 188.8, '2-day-trend' : 191.0, '1-day-trend' : 192.5, '10-hr-trend' : 199.2, '5-hr-trend' : 199.4, '2-hr-trend' : 199.4 }, 
           { 'stock' : 'aapl', '5-yr-trend' : 150.4, '2-yr-trend' : 165.3, '1-yr-trend' : 173.3, '200-day-trend' : 177.2, '100-day-trend' : 181.5, '90-day-trend' : 184.3, '20-day-trend' : 186.0, '10-day-trend' : 188.0, '5-day-trend' : 188.8, '2-day-trend' : 191.0, '1-day-trend' : 192.5, '10-hr-trend' : 199.2, '5-hr-trend' : 199.4, '2-hr-trend' : 201.1 }, 
           { 'stock' : 'aapl', '5-yr-trend' : 150.4, '2-yr-trend' : 165.3, '1-yr-trend' : 173.3, '200-day-trend' : 177.2, '100-day-trend' : 181.5, '90-day-trend' : 184.3, '20-day-trend' : 186.0, '10-day-trend' : 188.0, '5-day-trend' : 188.8, '2-day-trend' : 191.0, '1-day-trend' : 192.5, '10-hr-trend' : 199.2, '5-hr-trend' : 199.6, '2-hr-trend' : 201.9+ } 
           ]`,
           rhs : `{ msg : 'Buy' }`
    }
    
    let training_set00 = [ tt000 ]
    let training_set01 = [ tt001 ]
    
    let vm = new __ENGRIPPA__( training_set00, training_set01 )
```

To upgrade

```javascript 
    let tt000 = {
           lhs : `[{ freq : 0x46, amp : 0x6, time_slice : 0x0 }, ... ]`,
           rhs : `{ msg : 'Hello' }`
    }
    
    let tt001 = {
           lhs : `[{ freq : 0x55, amp : 0x7, time_slice : 0x0 }, ... ]`,
           rhs : `{ msg : 'Hello' }`
    }
    
    let training_set1 = [ tt000 ]
    let training_set2 = [ tt001 ]
    
    let vm = new __ENGRIPPA__( training_set1 )
    vm.__extend( training_set2 )
```

To patch

```javascript 
    let tt000 = {
           lhs : `[{ freq : 0x46, amp : 0x6, time_slice : 0x0 }, ... ]`,
           rhs : `{ msg : 'Hello' }`
    }
    
    let tt001 = {
           lhs : `[{ freq : 0x55, amp : 0x7, time_slice : 0x0 }, ... ]`,
           rhs : `{ msg : 'World' }`
    }
    
    let training_set1 = [ tt000 ]
    let training_set2 = [ tt001 ]
    
    let vm = new __ENGRIPPA__( training_set1 )
    vm.__patch( training_set2,training_set1 )
```

Dependancy graph: one-to-many

```javascript
/* -------------------------

    b
   /
 a - c
   \
    d   
	
------------------------- */
    let tt000 = {
           lhs : `{ { a } : { b, c, d } }`,
           rhs : `one-to-many`
    }
```

Dependancy graph: many-to-one

```javascript
/* -------------------------

  b
   \
 c - a
   /
  d
  
------------------------- */

    let tt000 = {
            lhs : `{ { b, c, d } : { a } }`,
            rhs : `many-to-one`
    }
```

Dependancy graph: many-to-one

```javascript
/* -----------------------------

    let a = { 
            b : { 1 : { d,e,f } },
            c : { 1 : { d,e,f } },
            d : { 1 : { d,e,f } },
    }
	
---------------------------- */

    let tt000 = {
            lhs : `{ { a } : { b, c, d } : { 1 } : { d,e,f } }`,
            rhs : `a-dependancy-graph-example`
    }
```

A condensed multiplication table 

```javascript
/* -------------------------

   let _tt000 = { 
            lhs : `{ num : 0, mult : '*', num : 0 },
            rhs : `{ product : 0 }`,
   }
    
   let _tt001 = { 
            lhs : `{ num : 1, mult : '*', num : 0 },
            rhs : `{ product : 0 }`,
   }
    
     . 
     .
     
   let _tt075 = { 
            lhs : `{ real : 0, mult : '*', real : 12 },
            rhs : `{ product : 0 }`,
   }
	
------------------------- */

    let tt000 = {
            lhs : `{ [ num, int, real ] : { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12 }, op : { mult : '*' }, [ num, int, real ] : 0 }`,
            rhs : `{ result : { product : 0 } }`
    }

    let tt001 = {
            lhs : `{ [ num, int, real ] : 0, op : { mult : '*', div : '/' }, [ num, int, real ] : { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12 } }`,
            rhs : `{ result : { product : 0 } }`
    }

    let tt002 = {
            lhs : `{ [ num, int, real ] : { 0 }, op : { '*', '/', '+', '-' }, [ num, int, real ] : { 0 } }`,
            rhs : `{ result : 0 }`
    }
```

To view a library

```javascript 
    let tt000 = {
           lhs : `[{ freq : 0x46, amp : 0x6, time_slice : 0x0 }, ... ]`,
           rhs : `{ msg : 'Hello' }`
    }
    
    let tt001 = {
           lhs : `[{ freq : 0x55, amp : 0x7, time_slice : 0x0 }, ... ]`,
           rhs : `{ msg : 'Hello' }`
    }
    
    let training_set1 = [ tt000, tt001 ]
    
    let vm = new __ENGRIPPA__( training_set1 )
    console.log( vm.__includes() ) // [ `{ module : 'training_set1' }, { module : 'training_set2' }` ] //
```

A string template example

```javascript 
    let MSG = 'Hello'
    let tt000 = {
           lhs : `[{ freq : 0x46, amp : 0x6, time_slice : 0x0 }, ... ]`,
           rhs : `{ msg : ${MSG} }`
    }
    
    let tt001 = {
           lhs : `[{ freq : 0x55, amp : 0x7, time_slice : 0x0 }, ... ]`,
           rhs : `{ msg : ${MSG} }`
    }
    
    let training_set1 = [ tt000, tt001 ]
    
    let vm = new __ENGRIPPA__( training_set1 )
    console.log( vm.__exec([tt000]) ) // [{ msg : 'Hello' }] //
```

To examine a runtime

```javascript 
    let tt000 = {
           lhs : `[{ freq : 0x46, amp : 0x6, time_slice : 0x0 }, ... ]`,
           rhs : `{ msg : 'Hello' }`
    }
    
    let tt001 = {
           lhs : `[{ freq : 0x55, amp : 0x7, time_slice : 0x0 }, ... ]`,
           rhs : `{ msg : 'Hello' }`
    }
    
    let training_set1 = [ tt000, tt001 ]
    
    let vm = new __ENGRIPPA__( training_set1 )
    console.log( vm.__decompile() ) // [`let __0x0000 = { token : { freq : [ 0x46, 0x55 ] } }, let __0x0001 = { token : { amp : [ 0x6, 0x7 ] } }`, ... ] //
```

To unload a library

```javascript 
    let tt000 = {
           lhs : `[{ freq : 0x46, amp : 0x6, time_slice : 0x0 }, ... ]`,
           rhs : `{ msg : 'Hello' }`
    }
    
    let tt001 = {
           lhs : `[{ freq : 0x55, amp : 0x7, time_slice : 0x0 }, ... ]`,
           rhs : `{ msg : 'Hello' }`
    }
    
    let training_set1 = [ tt000, tt001 ]
    
    let vm = new __ENGRIPPA__( training_set1 )
    let f = vm.__serialize()
    console.log( f ) // [{ __decompile : `let __0x0000 = { token : { freq : [ 0x46, 0x55 ] } }, let __0x0001 = { token : { amp : [ 0x6, 0x7 ] } }`, ... ] //
```

To load a library

```javascript 
    let f = [{ __decompile : `let __0x0000 = { token : { freq : [ 0x46, 0x55 ] } }, let __0x0001 = { token : { amp : [ 0x6, 0x7 ] } }`, ... ]
    let vm = new __ENGRIPPA__()
    vm.__deserialize(f)
    console.log( vm.__decompile() ) // [`let __0x0000 = { token : { freq : [ 0x46, 0x55 ] } }, let __0x0001 = { token : { amp : [ 0x6, 0x7 ] } }`, ... ] //
```
