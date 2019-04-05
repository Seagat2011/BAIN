# BAIN

Virtual Machine Based Artificial Intelligence Network Engine (BAIN)  

BAIN implements a virtual machine which emulates a microprocessor instruction set, specifically built for targeted operation. BAIN is intended as an alternative for artificial neural networks.  

### USAGE 

```javascript
let engine = new __BAIN__([ {json training data...}],[ {desired json output...} ]) 
let result = engine.exec([ {json training data...} ]) 
console.log(result.json) // >$ [ {desired json output...} ]
```
