/*
AUTHOR
	Seagat2011
	https://fold.it/portal/user/199249

VERSION
	Major.Minor.Bugfix.Patch
	1.0.0.0

STYLEGUIDE
	https://google.github.io/styleguide/jsguide.html

DESCRIPTION
	Virtual Machine Based Artificial Intelligence Network

USAGE
	let engine = new __VMSKYE__( [ {json training set...} ] ]) 
	let result = engine.exec( [ {json training set...} ] ) // [ {...}, ...]
	console.log( result[0] ) // [ {desired json output...} ] //

NOTES
	All training sets must be separated in right hand side / left hand Side (rhs/lhs) assertions: 
	
	var training_set = { 
		lhs : { num : 0, times : `*`, num : 0 }, 
		rhs : { product : 0 } 
	}
	
	The engine first attempts 

		- Arithmetic match
		- Boolean match

	...on the training set; if these methods fail, then a more powerful algorithmic combination is attempted
	through analysis of the virtual Core's Program Status Word Register flags (PSW)

EXAMPLE
	let engine = new __VMSKYE__( [ training_set ] ) 
	let result = engine.exec( [ { num : 0, times : `*`, num : 0 } ] ) //[ {...}, ...]//
	console.log( result[0] ) //{ product : 0 }//

EXAMPLE
	let tt000 = { 
		lhs:{ num : 0, times : `*`, num : 0 }, 
		rhs:{ product : 0 } }
	let tt001 = { 
		lhs:{ num : 0, times : `*`, num : 1 }, 
		rhs:{ product : 0 } }
	let tt002 = { 
		lhs:{ num : 0, times : `*`, num : 2 }, 
		rhs:{ product : 0 } }
	.
	.
	let tt144 = { 
		lhs:{ num : 12, times : `*`, num : 12 }, 
		rhs:{ product : 144 } }	
	let engine = new __VMSKYE__( [ tt000,...,tt144 ] )
	.
	.
	let tt_unk = { num:120, times:`*`, num:120 }
	let result = engine.exec( [ tt_unk ] ) 
	console.log( result[0] ) //{ product : 14400 }//

EXAMPLE
	let tt000 = { 
		lhs:{ product : 0 }, 
		rhs:{ num : 0, times : `*`, num : 0 } }
	let tt001 = { 
		lhs:{ product : 0 }, 
		rhs:{ num : 0, times : `*`, num : 1 } }
	let tt002 = { 
		lhs:{ product : 0 }, 
		rhs:{ num : 0, times : `*`, num : 2 } }
	.
	.
	let tt144 = { 
		lhs:{ product : 144 }, 
		rhs:{ num : 12, times : `*`, num : 12 } }	
	let engine = new __VMSKYE__( [ tt000,...,tt144 ] )
	.
	.
	let tt_unk = { product:1440 }
	let result = engine.exec( [ tt_unk ],`converge` ) //iff multiple solutions, converge on first answer//
	console.log( result[0] ) //{ num:120, times:`*`, num:12 }//

*/
var virtual_core = {
	__stack__ :[], 		//__stack__[ 32535 ]//
	__register__:[], 		//__register__[ 255 ]//
	__memory_address__:[],	//__memory_address__[ 32535 ]//
	__memory_variable__:{},	//__memory_address__[ __memory_variable__['name'] ]//
}
var __AI__ = {
	__SYNTAXER__
	__LEXER__
	__SEMANTICS__
}
var __STRATAGEM__ = ['arithmetic','logic','algorithmic'] //f(x);(a&&b)||c;[[a,b],[c]]:f(x)//
var __OPCODES__ = [
	`= ${self._param[0]}`,
	`${self._param[0]} =`,
	`constant ${self._param[0]}`,
	`let _${self._param[0]}`,
	`var _${self._param[0]}`,
	`${self._param[0]}`,
	`switch( {self._param[0]} ){`,
	`case ${self._param[0]}: `,
	`self.param_block`,
	`break`,
	`default: ${self._param[0]} }`,
	`else`,
	`self._param[0] }`,
	`if( ${self._param[0]} ){`,
	`self.param_block }`,
	`if( ${self._param[0]} ){ ${self.param_block} }`,
	`if( ${self._param[0]} ){ ${self.param_block} }`,
	`if( ${self._param[0]} ){ ${self.param_block} }`,
	`do{ ${self.param_block} }while( ${self._param[0]} );`,
	`while( ${self._param[0]} ){ ${self.param_block} }`,
	`for( ${self._param[0]} ; ${self._param[1]} ; ${self._param[2]} ){ ${self.param_block} }`,
	`for( ${self._param[0]} in ${self._param[1]} ){}`,
	`new`, `this`,	
	`Date( ${self._param[0]} )`,
	`Error( ${self._param[0]} )`,	
	`Math`, `Number`, `RegExp`,	`String`,
	`JSON.parse( ${self.param[0]} )`,
	`JSON.stringify( ${self.param[0]},' ',2 )`,
	
	`/${self.param[0]}/`,
	`/${self.param[0]}/i`, 
	`/${self.param[0]}/ig`, 
	`/${self.param[0]}/igm`,
	`/${self.param[0]}/g`, 
	`/${self.param[0]}/gm`, 
	`/${self.param[0]}/m`,	
	
	`/${self.param[0]}/.test( ${self.param[1]} )`,
	`/${self.param[0]}/i.test( ${self.param[1]} )`, 
	`/${self.param[0]}/ig.test( ${self.param[1]} )`, 
	`/${self.param[0]}/igm.test( ${self.param[1]} )`,
	`/${self.param[0]}/g.test( ${self.param[1]} )`, 
	`/${self.param[0]}/gm.test( ${self.param[1]} )`, 
	`/${self.param[0]}/m.test( ${self.param[1]} )`,
	
	`/${self.param[0]}/.match( ${self.param[1]} )`, 
	`/${self.param[0]}/i.match( ${self.param[1]} )`, 
	`/${self.param[0]}/ig.match( ${self.param[1]} )`, 
	`/${self.param[0]}/igm.match( ${self.param[1]} )`,
	`/${self.param[0]}/g.match( ${self.param[1]} )`, 
	`/${self.param[0]}/gm.match( ${self.param[1]} )`, 
	`/${self.param[0]}/m.match( ${self.param[1]} )`,
	
	`try{`,`}catch(e){`,`finally{`,
	`class`,`const`,`continue`,`debugger`,`delete`,
	`extends`,`function`,`import`,`in`,`return`,`super`
	`throw`,`void`,`with`,`yield`,`then`,`instanceof`,
	`implements`,`interface`,`package`,`private`,`protected`,
	`public`,`static`,`await`,`abstract`,`boolean`,`byte`,`char`,
	`double`,`final`,`float`,`goto`,`int`,`long`,`native`,`short`,
	`synchronized`,`transient`,`volatile`,
	`"${self.param[0]}"`,
	`'${self.param[0]}'`,
	`++`,	`==`,	`===`,	`typeof`,
	`^`,	`%`, 	`=`,	`!`, 	`>`, 	`<`, 	`&`, 	`|`, 	`.`, 	`-`, 	`+`, 	`_`, 	`*`,	`(`,	`)`,	`{`,
	`}`,	`\\`,	`[`,	`]`,
	`?`,	`"`,	`:`,	`'`,
	`--`,	
]
__OPCODES__[`00`] = true//EOL//	
// INSTRUCTION_WORD : [OPCODE:8][DATA FIELD:N]
