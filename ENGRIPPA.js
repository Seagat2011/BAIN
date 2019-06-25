/* ----------------------------------------------------
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

---------------------------------------------------- */

function __ENGRIPPA__(test_case) {

    function __EGRIPP__() {
        var self = this
        self.lhs = []
        self.rhs = []
    }

    // ---------------------------------------------------- LEXICAL ANALYSIS ---------------------------------------------------- //
    var LEXEME = {
        "'": true,
        '"': true,
        '[': true,
        ']': true,
        '{': true,
        '}': true,
        ':': true,
        ',': true,
        ' ': true,
    }
    var lexbuff = new __EGRIPP__()
    test_case.map((u,i)=>{
        var b = ''
        var c = []
        var d = ''
        var e = []
        u.lhs.replace(/[\n\t]/g,'').split('').map((w)=>{
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
            return w
        }
        )
        lexbuff.lhs.push(c)
        // RHS //
        u.rhs.replace(/[\n\t]/g,'').split('').map((w)=>{
            if (w === ' ') {
                if (d) {
                    e.push(d)
                    d = ''
                }
            } else if (w in LEXEME) {
                if (d) {
                    e.push(d)
                    d = ''
                }
                e.push(w)
            } else {
                d += w
            }
            return w
        }
        )
        lexbuff.rhs.push(e)
        return u
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
    // LHS //
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
    // RHS //
    lexbuff.rhs.map((w,i)=>{
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
        synbuff.rhs.push(c)
        return w
    }
    )

    // ---------------------------------------------------- SEMANTIC ANALYSIS ---------------------------------------------------- //

    Object.prototype.assert = function(v, o) {
        if (v == false) {
            console.info(`Scan aborted:`)
            throw Error(o.msg)
        }
    }
    Object.prototype.forEachOwnElement = function(cb) {
        var self = this
        var idx = 0
        if(cb){
            for (var u in self) {
                if (self.hasOwnProperty(u)) {
                    (self[u] = cb(self[u], u, self, idx++))
                }
            }
        }
        return self
    }
    function expand_lexeme(g, u, i, v) {
        function expand(x, gg, k, ii, II, vv) {
            if (ii < II) {
                var uu = x[ii];
                (uu in gg) || (gg[uu] = {})
                if ((ii + 1) == II) {
                    gg[uu]['eos'] = vv[k]
                }
                expand(x, gg[uu], k, (ii + 1), II, vv)
            }
            return gg
        }
        var I = u.length
        while (i < I) {
            var isArrayType = (u instanceof Array)
            var isSubArrayType = (u[i]instanceof Array)
            if (isSubArrayType) {
                var j = 0
                var J = u[i].length
                expand(u[i], g, i, j, J, v)
            } else if (isArrayType) {
                expand(u, g, 0, i, I, v)
            }
            i++
        }
        return g
    }
    var semabuff = new __EGRIPP__()
    function __GRAMMAR__() {
        var self = this
    }
    __GRAMMAR__.prototype = []
    var GRAMMAR = new __GRAMMAR__()
    GRAMMAR.__LEXER__priv = function(tests) {
        var b = ''
        var result = []
        tests.map((u)=>{
            var test = [];
            u.replace(/[\n\t]/g,'').split('').map((w)=>{
                if (w === ' ') {
                    if (b) {
                        test.push(b)
                        b = ''
                    }
                } else if (w in LEXEME) {
                    if (b) {
                        test.push(b)
                        b = ''
                    }
                    test.push(w)
                } else {
                    b += w
                }
                return w
            }
            )
            result.push(test)
        }
        )
        return result
    }
    GRAMMAR.__exec = function(tests) {
        var self = this
        var ii = 0
        var m = self.__LEXER__priv(tests)
        var result = [];
        m.map((test)=>{
            var II = test.length
            try {
                var str = '{ an unexpected error occurred }'
                var __includes = self.__includes
                while ((ii < II) && __includes[test[ii]]) {
                    __includes = __includes[test[ii++]]
                }
                if (ii == II) {
                    str = __includes['eos'].join('')
                    console.info(`${str} - Parse successfull.`)
                } else {
                    str = `Error : unexpected token \\${test[ii]} at index ${ii}`
                }
            } catch (e) {
                str = [e.message,e.stack].join('\n')
            }                
            result.push(str)
            return test
        }
        )
        return result
    }
    GRAMMAR.__decompile = function() {
        console.info(`__ENGRIPPA__.__decompile - Functionality not yet implemented.`)
    }
    GRAMMAR.__serialize = function() {
        console.info(`__ENGRIPPA__.__serialize - Functionality not yet implemented.`)
    }
    GRAMMAR.__deserialize = function() {
        console.info(`__ENGRIPPA__.__deserialize - Functionality not yet implemented.`)
    }
    GRAMMAR.__patch = function() {
        console.info(`__ENGRIPPA__.__patch - Functionality not yet implemented.`)
    }
    GRAMMAR.__extend = function() {
        console.info(`__ENGRIPPA__.__extend - Functionality not yet implemented.`)
    }
    GRAMMAR.__includes = expand_lexeme({}, lexbuff.lhs, 0, lexbuff.rhs)

    return GRAMMAR

}
// end __ENGRIPPA__

var test_case = [{
    lhs: `['qid':qval,'qid':'qval','qid':qval]`,
    rhs: `[ 'qid':qval ]`
}, {
    lhs: `{ ' qid ' : qval , ' qid ' : ' qval ' , ' qid ' : qval }`,
    rhs: `{ 'qid':qval }`
}, {
    lhs: `{ ' qid ' : qval , ' qid ' : ' qval ' , ' qid ' : qval , ' qid ' : ' qval ' , ' qid ' : qval }`,
    rhs: `{ 'id':qval }`
}, , {
    lhs: `{ { ' qid ' , ' qid ' , { ' qid ' : ' qval ' } } : qval , ' qid ' : ' qval ' , { ' qid ' , ' qid ' , ' qid ' } : qval }`,
    rhs: `{ id:{ 'id':qval } }`
}, {
    lhs: `{ [ ' qid ' , ' qid ' , ' qid ' ] : qval , id : { ' qval ' , ' qval ' , ' qval ' } , [ ' qid ' , ' qid ' , ' qid ' ] : qval }`,
    rhs: `{ 'id':qval }`
}]

var test = [`{ [ ' qid ' , ' qid ' , ' qid ' ] : qval , id : { ' qval ' , ' qval ' , ' qval ' } , [ ' qid ' , ' qid ' , ' qid ' ] : qval }`]

var vm = new __ENGRIPPA__(test_case)
vm.__exec(test)
