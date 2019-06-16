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
	let result = engine.__exec( [ {json training set...} ] ) // [ {...}, ...]
	console.log( result[0] ) // [ {desired json output...} ] //

NOTES
	All training sets must be separated into right hand side / left hand Side (rhs/lhs) assertions: 
	
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
function __ENGRIPPA__(test_case) {

    function __EGRIPP__() {
        var self = this
        self.lhs = []
        self.rhs = []
    }

    // ---------------------------------------------------- LEXICAL ANALYSIS ---------------------------------------------------- //
    var LEXEME = {
        "'": 1,
        '"': 1,
        '[': 1,
        ']': 1,
        '{': 1,
        '}': 1,
        ':': 1,
        ',': 1,
        ' ': 1,
    }
    var lexbuff = new __EGRIPP__()
    test_case.map((u,i)=>{
        u.map((v,j)=>{
            var b = ''
            c = []
            v.lhs.split('').map((w)=>{
                if (w === ' ') {
                    if (b) {
                        c.push(b)
                        b = ''
                    }
                } else if (w in LEXEME) {
                    if (b) {
                        c.push(b)
                        b = ''
                    }
                    c.push(w)
                } else {
                    b += w
                }
            }
            )
            lexbuff.lhs.push(c)
        }
        )
    }
    )

    // ---------------------------------------------------- SYNTAX ANALYSIS ---------------------------------------------------- //
    Object.prototype.hasScope = function(u) {
        return (u == this)
    }
    function __PSW__() {
        var self = this
        self.bracketstack = {
            '{': 0,
            '[': 0,
        }
        self.colonscope = false
        self.tokenscope = {
            scope: 'id',
            id: 'id',
            val: 'val'
        }
    }
    var SYNTAX = {
        "id": (u,i)=>{}
        ,
        "val": (u,i)=>{}
        ,
        "'": (u,i)=>{}
        ,
        '[': (u,i)=>{
            var psw = SYNTAX.PSW
            psw.bracketstack['[']++
        }
        ,
        '{': (u,i)=>{
            var psw = SYNTAX.PSW
            psw.bracketstack['{']++
        }
        ,
        '}': (u,i)=>{
            var psw = SYNTAX.PSW
            psw.bracketstack['{']--
        }
        ,
        ']': (u,i)=>{
            var psw = SYNTAX.PSW
            psw.bracketstack['[']--
        }
        ,
        '"': (u,i)=>{}
        ,
        ':': (u,i)=>{
            SYNTAX.updateColonScope(true)
        }
        ,
        ',': (u,i)=>{
            var psw = SYNTAX.PSW
            if ((psw.bracketstack['{'].hasScope(1) && psw.bracketstack['['].hasScope(0)) || (psw.bracketstack['{'].hasScope(0) && psw.bracketstack['['].hasScope(1))) {
                SYNTAX.updateColonScope(false)
            }
        }
        ,
        ' ': (u,i)=>{}
        ,
        PSW: {},
        updateColonScope: function(u) {
            var psw = SYNTAX.PSW
            if (u != null) {
                if (u == true) {
                    psw.colonscope = true
                    psw.tokenscope.scope = psw.tokenscope.val
                } else if (u == false) {
                    psw.colonscope = false
                    psw.tokenscope.scope = psw.tokenscope.id
                }
            } else {
                psw.tokenscope.scope = psw.colonscope ? psw.tokenscope.val : psw.tokenscope.id
            }
        },
    }
    var synbuff = new __EGRIPP__()
    lexbuff.lhs.map((w,i)=>{
        SYNTAX.PSW = new __PSW__()
        var c = []
        w.map((u,j)=>{
            var u_exists_in_lexeme = (u in SYNTAX)
            if (u_exists_in_lexeme) {
                SYNTAX[u](u)
            } else {
                u = SYNTAX.PSW.tokenscope.scope
            }
            c.push(u)
            return u
        }
        )
        synbuff.lhs.push(c)
        return w
    }
    )

    // ---------------------------------------------------- SEMANTIC ANALYSIS ---------------------------------------------------- //

    var semabuff = new __EGRIPP__()
    var GRAMMAR
    function __GRAMMAR__() {
        var self = this
        self.lhs = []
        self.rhs = []
        self.lhs.idx = 0
        self.rhs.idx = 0
    }
    __GRAMMAR__.prototype = []
    var g_no_solution_found = true
    function global_solution_monitor(e) {
        if ('target'in e.data) {
            var host = e.data
            var status = host.unsolved_status
            switch (host.target) {
            case 'global-solution-update':
                g_no_solution_found = status
                break
            }
        }
    }
    addEventListener('message', global_solution_monitor, false)
    Object.prototype.deep_parse = function(me, GRAMMAR, too) {
        var self = this
        if (g_no_solution_found) {
            var src = too ? [...self, ...too] : [...self];
            while (me[0] == src[0]) {
                me.shift()
                src.shift()
            }
            var scope_completed = ((me.length == 0) && (src.length == 0)) ? true : false;
            var jmp_scope = (!scope_completed && src[0].match(/^_/)) ? src[0] : '';
            var unsolved_solution = (g_no_solution_found == true)
            var program_status_word = [scope_completed ? '1' : '0', jmp_scope ? '1' : '0', unsolved_solution ? '1' : '0', ].join('')
            switch (program_status_word) {
            case '000':
                /* !scope_completed && !jmp_scope && !unsolved_solution */
            case '010':
                /* !scope_completed && jmp_scope && !unsolved_solution */
            case '100':
                /* scope_completed && !jmp_scope && !unsolved_solution */
            case '110':
                /* scope_completed && jmp_scope && !unsolved_solution */
                // NOP //
                break

            case '001':
                /* !scope_completed && !jmp_scope && unsolved_solution */
                // NOP - console.info(`Semantic Parse Error: unexpected token ' ${me[0]} ' encountered - no solution found.`) //
                break

            case '011':
                /* !scope_completed && jmp_scope && unsolved_solution */
                var w = me[0]
                src.shift()
                !(jmp_scope in GRAMMAR) && self.assert(false, {
                    msg: `Semantic Parse Error: unexpected token ' ${w} ' at index ???`
                });
                var j = GRAMMAR[jmp_scope].length - 1
                var code = []
                while (j + 1) {
                    code.push(`GRAMMAR[jmp_scope][${j--}].deep_parse([...me],GRAMMAR,src)`)
                }
                code.length && eval(code.join('\n'))
                break

            case '101':
                /* scope_completed && !jmp_scope && unsolved_solution */
            case '111':
                /* scope_completed && jmp_scope && unsolved_solution */
                postMessage({
                    target: 'global-solution-update',
                    unsolved_status: false
                })
                break

            default:
                break
            }
        }
    }
    Object.prototype.parse = function(me, i) {
        var self = this
        var idx = i || 0
        var w = me[idx]
        var first_tok = {
            '[': '_[_',
            '{': '_{_'
        };
        ((idx == 0) && (w in first_tok)) || self.assert(false, {
            msg: `Semantic Parse Error: unexpected token ' ${w} ' encountered at index ${idx}`
        });
        (idx == 0) && (w in first_tok) && (w = first_tok[w])
        if (w in self) {
            var code = []
            var j = self[w].length - 1
            while (j + 1) {
                code.push(`self[w][${j--}].deep_parse(me,self)`)
            }
            eval(code.join('\n'))
        } else {
            self.assert(false, {
                msg: `Semantic Parse Error: unexpected token ' ${w} ' at index ${idx}`
            })
        }
        return (g_no_solution_found && true)
    }
    Object.prototype.assert = function(v, o) {
        if (v == false) {
            console.info(`Scan aborted:`)
            throw Error(o.msg)
        }
    }
    Object.prototype.add = function(u, j, k) {
        var self = this;
        (self.length < k + 1) && self.push({})
        var src = self[k]
        !(u in src) && (src[u] = {})
        var srcu = src[u]
        !(j in srcu) && (srcu[j] = 0)
        srcu[j]++
    }
    Object.prototype.forEachOwnElement = function(cb) {
        var self = this
        var idx = 0
        for (var u in self) {
            if (self.hasOwnProperty(u)) {
                cb && (u = cb(u, self[u], self, idx++))
            }
        }
        return self
    }
    Object.prototype.next = function(w) {
        var self = this
        var idx = self.idx
        var result = false
        if (!self.tmp) {
            var tmp = {}
            self[0][w].forEachOwnElement((u,obj,me)=>{
                tmp[u] = obj
                return u
            }
            )
            self.tmp = tmp
        }
        (w in self[idx]) || self.assert(false, {
            msg: `Semantic Parse Error: unexpected token ' ${w} ' at index ${idx}`
        })
        var validStream = false
        self[idx][w].forEachOwnElement((u,obj,me)=>{
            (u in self.tmp) && (validStream = true)
            return u
        }
        )
        if (validStream) {
            self.idx++
            result = true
        } else {
            self.assert(false, {
                msg: `Semantic Parse Error: unexpected token ' ${w} ' at index ${idx}`
            })
        }
        return result
    }
    synbuff.lhs.map((w,idx,me)=>{
        !GRAMMAR && (GRAMMAR = new __GRAMMAR__())
        w.map((u,idy,too)=>{
            GRAMMAR.lhs.add(u, idx, idy)
            return u
        }
        )
        return w
    }
    )

    GRAMMAR.__exec = function(test) {
        var self = this
        var ii = 0
        var II = test.length
        var JJ = self.lhs.length;
        (II <= JJ) || self.assert({
            msg: `Semantic Parse Error: unexpected overall (extended) stream length. Implementation not available. Please update engrippa.`
        })
        while ((ii < II) && self.lhs.next(test[ii++]))
            ;
        if (ii == II) {
            console.info('Semantic Engine - parse successfull.')
        }
    }
    GRAMMAR.__decompile = function() {
    }
    GRAMMAR.__serialize = function() {
    }
    GRAMMAR.__deserialize = function() {
    }
    GRAMMAR.__patch = function() {
    }
    GRAMMAR.__extend = function() {
    }
    GRAMMAR.__includes = function() {
    }

    return GRAMMAR

}
// end __ENGRIPPA__

var test_case = [[{
    lhs: `['qid':qval,'qid':'qval','qid':qval]`,
    rhs: `[ 'qid':qval ]`
}], [{
    lhs: `{ ' qid ' : qval , ' qid ' : ' qval ' , ' qid ' : qval }`,
    rhs: `{ 'qid':qval }`
}, {
    lhs: `{ ' qid ' : qval , ' qid ' : ' qval ' , ' qid ' : qval , ' qid ' : ' qval ' , ' qid ' : qval }`,
    rhs: `{ 'id':qval }`
}, ], [{
    lhs: `{ { ' qid ' , ' qid ' , { ' qid ' : ' qval ' } } : qval , ' qid ' : ' qval ' , { ' qid ' , ' qid ' , ' qid ' } : qval }`,
    rhs: `{ id:{ 'id':qval } }`
}], [{
    lhs: `{ [ ' qid ' , ' qid ' , ' qid ' ] : qval , id : { ' qval ' , ' qval ' , ' qval ' } , [ ' qid ' , ' qid ' , ' qid ' ] : qval }`,
    rhs: `{ 'id':qval }`
}], ]

var test = ["[", "'", "id", "'", ":", "val", ",", "'", "id", "'", ":", "'", "val", "'", ",", "'", "id", "'", ":", "val", "]"]

var vm = new __ENGRIPPA__(test_case)
vm.__exec(test)

// INSTRUCTION_WORD : [OPCODE:8][DATA FIELD:N]
