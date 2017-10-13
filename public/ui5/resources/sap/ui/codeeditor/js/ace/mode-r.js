ace.define("ace/mode/tex_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(r,e,m){"use strict";var o=r("../lib/oop");var l=r("../lib/lang");var T=r("./text_highlight_rules").TextHighlightRules;var a=function(t){if(!t)t="text";this.$rules={"start":[{token:"comment",regex:"%.*$"},{token:t,regex:"\\\\[$&%#\\{\\}]"},{token:"keyword",regex:"\\\\(?:documentclass|usepackage|newcounter|setcounter|addtocounter|value|arabic|stepcounter|newenvironment|renewenvironment|ref|vref|eqref|pageref|label|cite[a-zA-Z]*|tag|begin|end|bibitem)\\b",next:"nospell"},{token:"keyword",regex:"\\\\(?:[a-zA-Z0-9]+|[^a-zA-Z0-9])"},{token:"paren.keyword.operator",regex:"[[({]"},{token:"paren.keyword.operator",regex:"[\\])}]"},{token:t,regex:"\\s+"}],"nospell":[{token:"comment",regex:"%.*$",next:"start"},{token:"nospell."+t,regex:"\\\\[$&%#\\{\\}]"},{token:"keyword",regex:"\\\\(?:documentclass|usepackage|newcounter|setcounter|addtocounter|value|arabic|stepcounter|newenvironment|renewenvironment|ref|vref|eqref|pageref|label|cite[a-zA-Z]*|tag|begin|end|bibitem)\\b"},{token:"keyword",regex:"\\\\(?:[a-zA-Z0-9]+|[^a-zA-Z0-9])",next:"start"},{token:"paren.keyword.operator",regex:"[[({]"},{token:"paren.keyword.operator",regex:"[\\])]"},{token:"paren.keyword.operator",regex:"}",next:"start"},{token:"nospell."+t,regex:"\\s+"},{token:"nospell."+t,regex:"\\w+"}]};};o.inherits(a,T);e.TexHighlightRules=a;});ace.define("ace/mode/r_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules","ace/mode/tex_highlight_rules"],function(r,e,m){var o=r("../lib/oop");var l=r("../lib/lang");var T=r("./text_highlight_rules").TextHighlightRules;var a=r("./tex_highlight_rules").TexHighlightRules;var R=function(){var k=l.arrayToMap(("function|if|in|break|next|repeat|else|for|return|switch|while|try|tryCatch|stop|warning|require|library|attach|detach|source|setMethod|setGeneric|setGroupGeneric|setClass").split("|"));var b=l.arrayToMap(("NULL|NA|TRUE|FALSE|T|F|Inf|NaN|NA_integer_|NA_real_|NA_character_|"+"NA_complex_").split("|"));this.$rules={"start":[{token:"comment.sectionhead",regex:"#+(?!').*(?:----|====|####)\\s*$"},{token:"comment",regex:"#+'",next:"rd-start"},{token:"comment",regex:"#.*$"},{token:"string",regex:'["]',next:"qqstring"},{token:"string",regex:"[']",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+[Li]?\\b"},{token:"constant.numeric",regex:"\\d+L\\b"},{token:"constant.numeric",regex:"\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b"},{token:"constant.numeric",regex:"\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b"},{token:"constant.language.boolean",regex:"(?:TRUE|FALSE|T|F)\\b"},{token:"identifier",regex:"`.*?`"},{onMatch:function(v){if(k[v])return"keyword";else if(b[v])return"constant.language";else if(v=='...'||v.match(/^\.\.\d+$/))return"variable.language";else return"identifier";},regex:"[a-zA-Z.][a-zA-Z0-9._]*\\b"},{token:"keyword.operator",regex:"%%|>=|<=|==|!=|\\->|<\\-|\\|\\||&&|=|\\+|\\-|\\*|/|\\^|>|<|!|&|\\||~|\\$|:"},{token:"keyword.operator",regex:"%.*?%"},{token:"paren.keyword.operator",regex:"[[({]"},{token:"paren.keyword.operator",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],"qqstring":[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",regex:'.+'}],"qstring":[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",regex:'.+'}]};var c=new a("comment").getRules();for(var i=0;i<c["start"].length;i++){c["start"][i].token+=".virtual-comment";}this.addRules(c,"rd-");this.$rules["rd-start"].unshift({token:"text",regex:"^",next:"start"});this.$rules["rd-start"].unshift({token:"keyword",regex:"@(?!@)[^ ]*"});this.$rules["rd-start"].unshift({token:"comment",regex:"@@"});this.$rules["rd-start"].push({token:"comment",regex:"[^%\\\\[({\\])}]+"});};o.inherits(R,T);e.RHighlightRules=R;});ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(r,e,m){"use strict";var R=r("../range").Range;var M=function(){};(function(){this.checkOutdent=function(l,i){if(!/^\s+$/.test(l))return false;return/^\s*\}/.test(i);};this.autoOutdent=function(d,a){var l=d.getLine(a);var b=l.match(/^(\s*\})/);if(!b)return 0;var c=b[1].length;var o=d.findMatchingBracket({row:a,column:c});if(!o||o.row==a)return 0;var i=this.$getIndent(d.getLine(o.row));d.replace(new R(a,0,a,c-1),i);};this.$getIndent=function(l){return l.match(/^\s*/)[0];};}).call(M.prototype);e.MatchingBraceOutdent=M;});ace.define("ace/mode/r",["require","exports","module","ace/range","ace/lib/oop","ace/mode/text","ace/mode/text_highlight_rules","ace/mode/r_highlight_rules","ace/mode/matching_brace_outdent"],function(r,e,m){"use strict";var R=r("../range").Range;var o=r("../lib/oop");var T=r("./text").Mode;var a=r("./text_highlight_rules").TextHighlightRules;var b=r("./r_highlight_rules").RHighlightRules;var M=r("./matching_brace_outdent").MatchingBraceOutdent;var c=function(){this.HighlightRules=b;this.$outdent=new M();this.$behaviour=this.$defaultBehaviour;};o.inherits(c,T);(function(){this.lineCommentStart="#";this.$id="ace/mode/r";}).call(c.prototype);e.Mode=c;});
