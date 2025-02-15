var hljs = new function() {
  function j(v) {
    return v.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
  }

  function t(v) {
    return v.nodeName.toLowerCase()
  }

  function h(w, x) {
    var v = w && w.exec(x);
    return v && v.index == 0
  }

  function r(w) {
    var v = (w.className + " " + (w.parentNode ? w.parentNode.className : "")).split(/\s+/);
    v = v.map(function(x) {
      return x.replace(/^lang(uage)?-/, "")
    });
    return v.filter(function(x) {
      return i(x) || /no(-?)highlight/.test(x)
    })[0]
  }

  function o(x, y) {
    var v = {};
    for (var w in x) {
      v[w] = x[w]
    }
    if (y) {
      for (var w in y) {
        v[w] = y[w]
      }
    }
    return v
  }

  function u(x) {
    var v = [];
    (function w(y, z) {
      for (var A = y.firstChild; A; A = A.nextSibling) {
        if (A.nodeType == 3) {
          z += A.nodeValue.length
        } else {
          if (A.nodeType == 1) {
            v.push({
              event: "start",
              offset: z,
              node: A
            });
            z = w(A, z);
            if (!t(A).match(/br|hr|img|input/)) {
              v.push({
                event: "stop",
                offset: z,
                node: A
              })
            }
          }
        }
      }
      return z
    })(x, 0);
    return v
  }

  function q(w, y, C) {
    var x = 0;
    var F = "";
    var z = [];

    function B() {
      if (!w.length || !y.length) {
        return w.length ? w : y
      }
      if (w[0].offset != y[0].offset) {
        return (w[0].offset < y[0].offset) ? w : y
      }
      return y[0].event == "start" ? w : y
    }

    function A(H) {
      function G(I) {
        return " " + I.nodeName + '="' + j(I.value) + '"'
      }
      F += "<" + t(H) + Array.prototype.map.call(H.attributes, G).join("") + ">"
    }

    function E(G) {
      F += "</" + t(G) + ">"
    }

    function v(G) {
      (G.event == "start" ? A : E)(G.node)
    }
    while (w.length || y.length) {
      var D = B();
      F += j(C.substr(x, D[0].offset - x));
      x = D[0].offset;
      if (D == w) {
        z.reverse().forEach(E);
        do {
          v(D.splice(0, 1)[0]);
          D = B()
        } while (D == w && D.length && D[0].offset == x);
        z.reverse().forEach(A)
      } else {
        if (D[0].event == "start") {
          z.push(D[0].node)
        } else {
          z.pop()
        }
        v(D.splice(0, 1)[0])
      }
    }
    return F + j(C.substr(x))
  }

  function m(y) {
    function v(z) {
      return (z && z.source) || z
    }

    function w(A, z) {
      return RegExp(v(A), "m" + (y.cI ? "i" : "") + (z ? "g" : ""))
    }

    function x(D, C) {
      if (D.compiled) {
        return
      }
      D.compiled = true;
      D.k = D.k || D.bK;
      if (D.k) {
        var z = {};
        var E = function(G, F) {
          if (y.cI) {
            F = F.toLowerCase()
          }
          F.split(" ").forEach(function(H) {
            var I = H.split("|");
            z[I[0]] = [G, I[1] ? Number(I[1]) : 1]
          })
        };
        if (typeof D.k == "string") {
          E("keyword", D.k)
        } else {
          Object.keys(D.k).forEach(function(F) {
            E(F, D.k[F])
          })
        }
        D.k = z
      }
      D.lR = w(D.l || /\b[A-Za-z0-9_]+\b/, true);
      if (C) {
        if (D.bK) {
          D.b = "\\b(" + D.bK.split(" ").join("|") + ")\\b"
        }
        if (!D.b) {
          D.b = /\B|\b/
        }
        D.bR = w(D.b);
        if (!D.e && !D.eW) {
          D.e = /\B|\b/
        }
        if (D.e) {
          D.eR = w(D.e)
        }
        D.tE = v(D.e) || "";
        if (D.eW && C.tE) {
          D.tE += (D.e ? "|" : "") + C.tE
        }
      }
      if (D.i) {
        D.iR = w(D.i)
      }
      if (D.r === undefined) {
        D.r = 1
      }
      if (!D.c) {
        D.c = []
      }
      var B = [];
      D.c.forEach(function(F) {
        if (F.v) {
          F.v.forEach(function(G) {
            B.push(o(F, G))
          })
        } else {
          B.push(F == "self" ? D : F)
        }
      });
      D.c = B;
      D.c.forEach(function(F) {
        x(F, D)
      });
      if (D.starts) {
        x(D.starts, C)
      }
      var A = D.c.map(function(F) {
        return F.bK ? "\\.?(" + F.b + ")\\.?" : F.b
      }).concat([D.tE, D.i]).map(v).filter(Boolean);
      D.t = A.length ? w(A.join("|"), true) : {
        exec: function(F) {
          return null
        }
      }
    }
    x(y)
  }

  function c(T, L, J, R) {
    function v(V, W) {
      for (var U = 0; U < W.c.length; U++) {
        if (h(W.c[U].bR, V)) {
          return W.c[U]
        }
      }
    }

    function z(V, U) {
      if (h(V.eR, U)) {
        return V
      }
      if (V.eW) {
        return z(V.parent, U)
      }
    }

    function A(U, V) {
      return !J && h(V.iR, U)
    }

    function E(W, U) {
      var V = M.cI ? U[0].toLowerCase() : U[0];
      return W.k.hasOwnProperty(V) && W.k[V]
    }

    function w(aa, Y, X, W) {
      var U = W ? "" : b.classPrefix,
        V = '<span class="' + U,
        Z = X ? "" : "</span>";
      V += aa + '">';
      return V + Y + Z
    }

    function N() {
      if (!I.k) {
        return j(C)
      }
      var U = "";
      var X = 0;
      I.lR.lastIndex = 0;
      var V = I.lR.exec(C);
      while (V) {
        U += j(C.substr(X, V.index - X));
        var W = E(I, V);
        if (W) {
          H += W[1];
          U += w(W[0], j(V[0]))
        } else {
          U += j(V[0])
        }
        X = I.lR.lastIndex;
        V = I.lR.exec(C)
      }
      return U + j(C.substr(X))
    }

    function F() {
      if (I.sL && !f[I.sL]) {
        return j(C)
      }
      var U = I.sL ? c(I.sL, C, true, S) : e(C);
      if (I.r > 0) {
        H += U.r
      }
      if (I.subLanguageMode == "continuous") {
        S = U.top
      }
      return w(U.language, U.value, false, true)
    }

    function Q() {
      return I.sL !== undefined ? F() : N()
    }

    function P(W, V) {
      var U = W.cN ? w(W.cN, "", true) : "";
      if (W.rB) {
        D += U;
        C = ""
      } else {
        if (W.eB) {
          D += j(V) + U;
          C = ""
        } else {
          D += U;
          C = V
        }
      }
      I = Object.create(W, {
        parent: {
          value: I
        }
      })
    }

    function G(U, Y) {
      C += U;
      if (Y === undefined) {
        D += Q();
        return 0
      }
      var W = v(Y, I);
      if (W) {
        D += Q();
        P(W, Y);
        return W.rB ? 0 : Y.length
      }
      var X = z(I, Y);
      if (X) {
        var V = I;
        if (!(V.rE || V.eE)) {
          C += Y
        }
        D += Q();
        do {
          if (I.cN) {
            D += "</span>"
          }
          H += I.r;
          I = I.parent
        } while (I != X.parent);
        if (V.eE) {
          D += j(Y)
        }
        C = "";
        if (X.starts) {
          P(X.starts, "")
        }
        return V.rE ? 0 : Y.length
      }
      if (A(Y, I)) {
        throw new Error('Illegal lexeme "' + Y + '" for mode "' + (I.cN || "<unnamed>") + '"')
      }
      C += Y;
      return Y.length || 1
    }
    var M = i(T);
    if (!M) {
      throw new Error('Unknown language: "' + T + '"')
    }
    m(M);
    var I = R || M;
    var S;
    var D = "";
    for (var K = I; K != M; K = K.parent) {
      if (K.cN) {
        D = w(K.cN, "", true) + D
      }
    }
    var C = "";
    var H = 0;
    try {
      var B, y, x = 0;
      while (true) {
        I.t.lastIndex = x;
        B = I.t.exec(L);
        if (!B) {
          break
        }
        y = G(L.substr(x, B.index - x), B[0]);
        x = B.index + y
      }
      G(L.substr(x));
      for (var K = I; K.parent; K = K.parent) {
        if (K.cN) {
          D += "</span>"
        }
      }
      return {
        r: H,
        value: D,
        language: T,
        top: I
      }
    } catch (O) {
      if (O.message.indexOf("Illegal") != -1) {
        return {
          r: 0,
          value: j(L)
        }
      } else {
        throw O
      }
    }
  }

  function e(y, x) {
    x = x || b.languages || Object.keys(f);
    var v = {
      r: 0,
      value: j(y)
    };
    var w = v;
    x.forEach(function(z) {
      if (!i(z)) {
        return
      }
      var A = c(z, y, false);
      A.language = z;
      if (A.r > w.r) {
        w = A
      }
      if (A.r > v.r) {
        w = v;
        v = A
      }
    });
    if (w.language) {
      v.second_best = w
    }
    return v
  }

  function g(v) {
    if (b.tabReplace) {
      v = v.replace(/^((<[^>]+>|\t)+)/gm, function(w, z, y, x) {
        return z.replace(/\t/g, b.tabReplace)
      })
    }
    if (b.useBR) {
      v = v.replace(/\n/g, "<br>")
    }
    return v
  }

  function p(A) {
    var B = r(A);
    if (/no(-?)highlight/.test(B)) {
      return
    }
    var y;
    if (b.useBR) {
      y = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
      y.innerHTML = A.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")
    } else {
      y = A
    }
    var z = y.textContent;
    var v = B ? c(B, z, true) : e(z);
    var x = u(y);
    if (x.length) {
      var w = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
      w.innerHTML = v.value;
      v.value = q(x, u(w), z)
    }
    v.value = g(v.value);
    A.innerHTML = v.value;
    A.className += " hljs " + (!B && v.language || "");
    A.result = {
      language: v.language,
      re: v.r
    };
    if (v.second_best) {
      A.second_best = {
        language: v.second_best.language,
        re: v.second_best.r
      }
    }
  }
  var b = {
    classPrefix: "hljs-",
    tabReplace: null,
    useBR: false,
    languages: undefined
  };

  function s(v) {
    b = o(b, v)
  }

  function l() {
    if (l.called) {
      return
    }
    l.called = true;
    var v = document.querySelectorAll("pre code");
    Array.prototype.forEach.call(v, p)
  }

  function a() {
    addEventListener("DOMContentLoaded", l, false);
    addEventListener("load", l, false)
  }
  var f = {};
  var n = {};

  function d(v, x) {
    var w = f[v] = x(this);
    if (w.aliases) {
      w.aliases.forEach(function(y) {
        n[y] = v
      })
    }
  }

  function k() {
    return Object.keys(f)
  }

  function i(v) {
    return f[v] || f[n[v]]
  }
  this.highlight = c;
  this.highlightAuto = e;
  this.fixMarkup = g;
  this.highlightBlock = p;
  this.configure = s;
  this.initHighlighting = l;
  this.initHighlightingOnLoad = a;
  this.registerLanguage = d;
  this.listLanguages = k;
  this.getLanguage = i;
  this.inherit = o;
  this.IR = "[a-zA-Z][a-zA-Z0-9_]*";
  this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*";
  this.NR = "\\b\\d+(\\.\\d+)?";
  this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
  this.BNR = "\\b(0b[01]+)";
  this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
  this.BE = {
    b: "\\\\[\\s\\S]",
    r: 0
  };
  this.ASM = {
    cN: "string",
    b: "'",
    e: "'",
    i: "\\n",
    c: [this.BE]
  };
  this.QSM = {
    cN: "string",
    b: '"',
    e: '"',
    i: "\\n",
    c: [this.BE]
  };
  this.PWM = {
    b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/
  };
  this.CLCM = {
    cN: "comment",
    b: "//",
    e: "$",
    c: [this.PWM]
  };
  this.CBCM = {
    cN: "comment",
    b: "/\\*",
    e: "\\*/",
    c: [this.PWM]
  };
  this.HCM = {
    cN: "comment",
    b: "#",
    e: "$",
    c: [this.PWM]
  };
  this.NM = {
    cN: "number",
    b: this.NR,
    r: 0
  };
  this.CNM = {
    cN: "number",
    b: this.CNR,
    r: 0
  };
  this.BNM = {
    cN: "number",
    b: this.BNR,
    r: 0
  };
  this.CSSNM = {
    cN: "number",
    b: this.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
    r: 0
  };
  this.RM = {
    cN: "regexp",
    b: /\//,
    e: /\/[gim]*/,
    i: /\n/,
    c: [this.BE, {
      b: /\[/,
      e: /\]/,
      r: 0,
      c: [this.BE]
    }]
  };
  this.TM = {
    cN: "title",
    b: this.IR,
    r: 0
  };
  this.UTM = {
    cN: "title",
    b: this.UIR,
    r: 0
  }
}();
hljs.registerLanguage("javascript", function(a) {
  return {
    aliases: ["js"],
    k: {
      keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",
      literal: "true false null undefined NaN Infinity",
      built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document"
    },
    c: [{
      cN: "pi",
      b: /^\s*('|")use strict('|")/,
      r: 10
    }, a.ASM, a.QSM, a.CLCM, a.CBCM, a.CNM, {
      b: "(" + a.RSR + "|\\b(case|return|throw)\\b)\\s*",
      k: "return throw case",
      c: [a.CLCM, a.CBCM, a.RM, {
        b: /</,
        e: />;/,
        r: 0,
        sL: "xml"
      }],
      r: 0
    }, {
      cN: "function",
      bK: "function",
      e: /\{/,
      eE: true,
      c: [a.inherit(a.TM, {
        b: /[A-Za-z$_][0-9A-Za-z$_]*/
      }), {
        cN: "params",
        b: /\(/,
        e: /\)/,
        c: [a.CLCM, a.CBCM],
        i: /["'\(]/
      }],
      i: /\[|%/
    }, {
      b: /\$[(.]/
    }, {
      b: "\\." + a.IR,
      r: 0
    }]
  }
});
