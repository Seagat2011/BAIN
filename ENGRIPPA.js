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
	let engine = new __ENGRIPPA__( [ {json training set...} ] ]) 
	let result = engine.exec( [ {json training set...} ] ) // [ {...}, ...]
	console.log( result[0] ) // [ {desired json output...} ] //

NOTES
	All training sets must be separated in right hand side / left hand Side (rhs/lhs) assertions: 
	
	var training_set = { 
		lhs : { num : 0, times : `*`, num : 0 }, 
		rhs : { product : 0 } 
	}
	
*/
var virtual_core = {
	__stack__ :[], 		//__stack__[ 32535 ]//
	__register__:[], 		//__register__[ 255 ]//
	__memory_address__:[],	//__memory_address__[ 32535 ]//
	__memory_variable__:{},	//__memory_address__[ __memory_variable__['name'] ]//
}
var __AI__ = {
	__SYNTAXER__:{},
	__LEXER__:{},
	__SEMANTICS__:{},
}
var __STRATAGEM__ = ['arithmetic','logic','algorithmic'] //f(x);(a&&b)||c;[[a,b],[c]]:f(x)//
/*
var __ARITHMETIC_PROPERTIES__ = [
  'Zero Identity', // 0*0=0,1-1=0,0=0
  'Idempotence', // a|false,a+a=a,a*a=a
  'Duality', // a'+b'=ab,(ab)'=a+b
  'Associative', // (5+(2+3))=((5+2)+3)
  'Reflexive', // 0=2-2,2-2=0
  'Distributive', // (1+1)+0=(2)+0
  'Commutative', // 2*3=6,3*2=6
  'Inverse' // 5*1/5=1,6*1/6=1,2-2=0,-2+2=0
]
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
	`do{ ${self.param_block} }while( ${self._param[0]} );`,
	`while( ${self._param[0]} ){ ${self.param_block} }`,
	`for( ${self._param[0]} ; ${self._param[1]} ; ${self._param[2]} ){ ${self.param_block} }`,
	`for( ${self._param[0]} in ${self._param[1]} ){}`,
	`new`, `this`,	
	`Date( ${self._param[0]} )`,
	`Error( ${self._param[0]} )`,	
	`Math`, `Number`, `RegExp`, `String`,
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
	`++`, `==`, `===`, `typeof`,
	`^`, `%`, `=`, `!`,
 	`>`, `<`, `&`, `|`,
 	`.`, `-`, `+`, `_`,
 	`*`, `(`, `)`, `{`,
	`}`, `\\`, `[`, `]`,
	`?`, `"`, `:`, `'`,
	`--`,
]
*/
var __OPCODES__ = { '00' : true }//EOL//	
function __ENGRIPPA__(arr){
  this.__extend
  this.__serialize
  this.__deserialize
  this.__decompile
  this.__patch
  this.__exec
}
// INSTRUCTION_WORD : [OPCODE:8][DATA FIELD:N]
