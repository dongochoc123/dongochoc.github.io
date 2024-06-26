/*! For license information please see tracker.js.LICENSE.txt */
!function() {
    var n = {
        366: function(n) {
            var e = {
                utf8: {
                    stringToBytes: function(n) {
                        return e.bin.stringToBytes(unescape(encodeURIComponent(n)))
                    },
                    bytesToString: function(n) {
                        return decodeURIComponent(escape(e.bin.bytesToString(n)))
                    }
                },
                bin: {
                    stringToBytes: function(n) {
                        for (var e = [], t = 0; t < n.length; t++)
                            e.push(255 & n.charCodeAt(t));
                        return e
                    },
                    bytesToString: function(n) {
                        for (var e = [], t = 0; t < n.length; t++)
                            e.push(String.fromCharCode(n[t]));
                        return e.join("")
                    }
                }
            };
            n.exports = e
        },
        843: function(n) {
            var e, t;
            e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            t = {
                rotl: function(n, e) {
                    return n << e | n >>> 32 - e
                },
                rotr: function(n, e) {
                    return n << 32 - e | n >>> e
                },
                endian: function(n) {
                    if (n.constructor == Number)
                        return 16711935 & t.rotl(n, 8) | 4278255360 & t.rotl(n, 24);
                    for (var e = 0; e < n.length; e++)
                        n[e] = t.endian(n[e]);
                    return n
                },
                randomBytes: function(n) {
                    for (var e = []; n > 0; n--)
                        e.push(Math.floor(256 * Math.random()));
                    return e
                },
                bytesToWords: function(n) {
                    for (var e = [], t = 0, r = 0; t < n.length; t++,
                    r += 8)
                        e[r >>> 5] |= n[t] << 24 - r % 32;
                    return e
                },
                wordsToBytes: function(n) {
                    for (var e = [], t = 0; t < 32 * n.length; t += 8)
                        e.push(n[t >>> 5] >>> 24 - t % 32 & 255);
                    return e
                },
                bytesToHex: function(n) {
                    for (var e = [], t = 0; t < n.length; t++)
                        e.push((n[t] >>> 4).toString(16)),
                        e.push((15 & n[t]).toString(16));
                    return e.join("")
                },
                hexToBytes: function(n) {
                    for (var e = [], t = 0; t < n.length; t += 2)
                        e.push(parseInt(n.substr(t, 2), 16));
                    return e
                },
                bytesToBase64: function(n) {
                    for (var t = [], r = 0; r < n.length; r += 3)
                        for (var o = n[r] << 16 | n[r + 1] << 8 | n[r + 2], i = 0; i < 4; i++)
                            8 * r + 6 * i <= 8 * n.length ? t.push(e.charAt(o >>> 6 * (3 - i) & 63)) : t.push("=");
                    return t.join("")
                },
                base64ToBytes: function(n) {
                    n = n.replace(/[^A-Z0-9+\/]/gi, "");
                    for (var t = [], r = 0, o = 0; r < n.length; o = ++r % 4)
                        0 != o && t.push((e.indexOf(n.charAt(r - 1)) & Math.pow(2, -2 * o + 8) - 1) << 2 * o | e.indexOf(n.charAt(r)) >>> 6 - 2 * o);
                    return t
                }
            },
            n.exports = t
        },
        363: function(n, e, t) {
            var r, o, i, a;
            r = t(843),
            o = t(366).utf8,
            i = t(366).bin,
            (a = function(n, e) {
                var t = r.wordsToBytes(function(n) {
                    n.constructor == String ? n = o.stringToBytes(n) : "undefined" != typeof Buffer && "function" == typeof Buffer.isBuffer && Buffer.isBuffer(n) ? n = Array.prototype.slice.call(n, 0) : Array.isArray(n) || (n = n.toString());
                    var e = r.bytesToWords(n)
                      , t = 8 * n.length
                      , i = []
                      , a = 1732584193
                      , c = -271733879
                      , u = -1732584194
                      , s = 271733878
                      , l = -1009589776;
                    e[t >> 5] |= 128 << 24 - t % 32,
                    e[15 + (t + 64 >>> 9 << 4)] = t;
                    for (var f = 0; f < e.length; f += 16) {
                        for (var d = a, v = c, p = u, g = s, m = l, h = 0; h < 80; h++) {
                            if (h < 16)
                                i[h] = e[f + h];
                            else {
                                var y = i[h - 3] ^ i[h - 8] ^ i[h - 14] ^ i[h - 16];
                                i[h] = y << 1 | y >>> 31
                            }
                            var w = (a << 5 | a >>> 27) + l + (i[h] >>> 0) + (h < 20 ? 1518500249 + (c & u | ~c & s) : h < 40 ? 1859775393 + (c ^ u ^ s) : h < 60 ? (c & u | c & s | u & s) - 1894007588 : (c ^ u ^ s) - 899497514);
                            l = s,
                            s = u,
                            u = c << 30 | c >>> 2,
                            c = a,
                            a = w
                        }
                        a += d,
                        c += v,
                        u += p,
                        s += g,
                        l += m
                    }
                    return [a, c, u, s, l]
                }(n));
                return e && e.asBytes ? t : e && e.asString ? i.bytesToString(t) : r.bytesToHex(t)
            }
            )._blocksize = 16,
            a._digestsize = 20,
            n.exports = a
        },
        972: function(n, e, t) {
            var r = t(679)
              , o = t(161)
              , i = o;
            i.v1 = r,
            i.v4 = o,
            n.exports = i
        },
        318: function(n) {
            for (var e = [], t = 0; t < 256; ++t)
                e[t] = (t + 256).toString(16).substr(1);
            n.exports = function(n, t) {
                var r = t || 0
                  , o = e;
                return [o[n[r++]], o[n[r++]], o[n[r++]], o[n[r++]], "-", o[n[r++]], o[n[r++]], "-", o[n[r++]], o[n[r++]], "-", o[n[r++]], o[n[r++]], "-", o[n[r++]], o[n[r++]], o[n[r++]], o[n[r++]], o[n[r++]], o[n[r++]]].join("")
            }
        },
        42: function(n) {
            var e = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
            if (e) {
                var t = new Uint8Array(16);
                n.exports = function() {
                    return e(t),
                    t
                }
            } else {
                var r = new Array(16);
                n.exports = function() {
                    for (var n, e = 0; e < 16; e++)
                        0 == (3 & e) && (n = 4294967296 * Math.random()),
                        r[e] = n >>> ((3 & e) << 3) & 255;
                    return r
                }
            }
        },
        679: function(n, e, t) {
            var r, o, i = t(42), a = t(318), c = 0, u = 0;
            n.exports = function(n, e, t) {
                var s = e && t || 0
                  , l = e || []
                  , f = (n = n || {}).node || r
                  , d = void 0 !== n.clockseq ? n.clockseq : o;
                if (null == f || null == d) {
                    var v = i();
                    null == f && (f = r = [1 | v[0], v[1], v[2], v[3], v[4], v[5]]),
                    null == d && (d = o = 16383 & (v[6] << 8 | v[7]))
                }
                var p = void 0 !== n.msecs ? n.msecs : (new Date).getTime()
                  , g = void 0 !== n.nsecs ? n.nsecs : u + 1
                  , m = p - c + (g - u) / 1e4;
                if (m < 0 && void 0 === n.clockseq && (d = d + 1 & 16383),
                (m < 0 || p > c) && void 0 === n.nsecs && (g = 0),
                g >= 1e4)
                    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
                c = p,
                u = g,
                o = d;
                var h = (1e4 * (268435455 & (p += 122192928e5)) + g) % 4294967296;
                l[s++] = h >>> 24 & 255,
                l[s++] = h >>> 16 & 255,
                l[s++] = h >>> 8 & 255,
                l[s++] = 255 & h;
                var y = p / 4294967296 * 1e4 & 268435455;
                l[s++] = y >>> 8 & 255,
                l[s++] = 255 & y,
                l[s++] = y >>> 24 & 15 | 16,
                l[s++] = y >>> 16 & 255,
                l[s++] = d >>> 8 | 128,
                l[s++] = 255 & d;
                for (var w = 0; w < 6; ++w)
                    l[s + w] = f[w];
                return e || a(l)
            }
        },
        161: function(n, e, t) {
            var r = t(42)
              , o = t(318);
            n.exports = function(n, e, t) {
                var i = e && t || 0;
                "string" == typeof n && (e = "binary" === n ? new Array(16) : null,
                n = null);
                var a = (n = n || {}).random || (n.rng || r)();
                if (a[6] = 15 & a[6] | 64,
                a[8] = 63 & a[8] | 128,
                e)
                    for (var c = 0; c < 16; ++c)
                        e[i + c] = a[c];
                return e || o(a)
            }
        }
    }
      , e = {};
    function t(r) {
        var o = e[r];
        if (void 0 !== o)
            return o.exports;
        var i = e[r] = {
            exports: {}
        };
        return n[r](i, i.exports, t),
        i.exports
    }
    t.n = function(n) {
        var e = n && n.__esModule ? function() {
            return n.default
        }
        : function() {
            return n
        }
        ;
        return t.d(e, {
            a: e
        }),
        e
    }
    ,
    t.d = function(n, e) {
        for (var r in e)
            t.o(e, r) && !t.o(n, r) && Object.defineProperty(n, r, {
                enumerable: !0,
                get: e[r]
            })
    }
    ,
    t.o = function(n, e) {
        return Object.prototype.hasOwnProperty.call(n, e)
    }
    ,
    function() {
        "use strict";
        var n = function() {
            return n = Object.assign || function(n) {
                for (var e, t = 1, r = arguments.length; t < r; t++)
                    for (var o in e = arguments[t])
                        Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
                return n
            }
            ,
            n.apply(this, arguments)
        };
        function e(n, e, t) {
            if (t || 2 === arguments.length)
                for (var r, o = 0, i = e.length; o < i; o++)
                    !r && o in e || (r || (r = Array.prototype.slice.call(e, 0, o)),
                    r[o] = e[o]);
            return n.concat(r || Array.prototype.slice.call(e))
        }
        Object.create,
        Object.create,
        "function" == typeof SuppressedError && SuppressedError;
        var r = t(972);
        var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        function i() {
            var n, e = {}, t = [], r = [], o = [], i = function(n, t) {
                null != t && "" !== t && (e[n] = t)
            };
            return {
                add: i,
                addDict: function(n) {
                    for (var e in n)
                        Object.prototype.hasOwnProperty.call(n, e) && i(e, n[e])
                },
                addJson: function(n, e, o) {
                    if (o && c(o)) {
                        var i = {
                            keyIfEncoded: n,
                            keyIfNotEncoded: e,
                            json: o
                        };
                        r.push(i),
                        t.push(i)
                    }
                },
                addContextEntity: function(n) {
                    o.push(n)
                },
                getPayload: function() {
                    return e
                },
                getJson: function() {
                    return t
                },
                withJsonProcessor: function(e) {
                    n = e
                },
                build: function() {
                    return null == n || n(this, r, o),
                    e
                }
            }
        }
        function a(n) {
            return function(t, r, i) {
                for (var a = function(e, r, i) {
                    var a, c = JSON.stringify(e);
                    n ? t.add(r, (a = c) ? function(n) {
                        var e, t, r, i, a, c = 0, u = 0, s = [];
                        if (!n)
                            return n;
                        n = unescape(encodeURIComponent(n));
                        do {
                            e = (a = n.charCodeAt(c++) << 16 | n.charCodeAt(c++) << 8 | n.charCodeAt(c++)) >> 18 & 63,
                            t = a >> 12 & 63,
                            r = a >> 6 & 63,
                            i = 63 & a,
                            s[u++] = o.charAt(e) + o.charAt(t) + o.charAt(r) + o.charAt(i)
                        } while (c < n.length);
                        var l = s.join("")
                          , f = n.length % 3;
                        return (f ? l.slice(0, f - 3) : l) + "===".slice(f || 3)
                    }(a).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_") : a) : t.add(i, c)
                }, c = function(e, r) {
                    var i = e || function() {
                        var e = t.getPayload();
                        if (n ? e.cx : e.co)
                            return JSON.parse(n ? function(n) {
                                if (!n)
                                    return n;
                                switch (4 - n.length % 4) {
                                case 2:
                                    n += "==";
                                    break;
                                case 3:
                                    n += "="
                                }
                                return function(n) {
                                    var e, t, r, i, a, c, u, s = 0, l = 0, f = [];
                                    if (!n)
                                        return n;
                                    n += "";
                                    do {
                                        e = (c = o.indexOf(n.charAt(s++)) << 18 | o.indexOf(n.charAt(s++)) << 12 | (i = o.indexOf(n.charAt(s++))) << 6 | (a = o.indexOf(n.charAt(s++)))) >> 16 & 255,
                                        t = c >> 8 & 255,
                                        r = 255 & c,
                                        f[l++] = 64 === i ? String.fromCharCode(e) : 64 === a ? String.fromCharCode(e, t) : String.fromCharCode(e, t, r)
                                    } while (s < n.length);
                                    return u = f.join("").replace(/\0+$/, ""),
                                    decodeURIComponent(u.split("").map((function(n) {
                                        return "%" + ("00" + n.charCodeAt(0).toString(16)).slice(-2)
                                    }
                                    )).join(""))
                                }(n.replace(/-/g, "+").replace(/_/g, "/"))
                            }(e.cx) : e.co)
                    }();
                    return i ? i.data = i.data.concat(r.data) : i = r,
                    i
                }, u = void 0, s = 0, l = r; s < l.length; s++) {
                    var f = l[s];
                    "cx" === f.keyIfEncoded ? u = c(u, f.json) : a(f.json, f.keyIfEncoded, f.keyIfNotEncoded)
                }
                r.length = 0,
                i.length && (u = c(u, {
                    schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
                    data: e([], i, !0)
                }),
                i.length = 0),
                u && a(u, "cx", "co")
            }
        }
        function c(n) {
            if (!u(n))
                return !1;
            for (var e in n)
                if (Object.prototype.hasOwnProperty.call(n, e))
                    return !0;
            return !1
        }
        function u(n) {
            return null != n && (n.constructor === {}.constructor || n.constructor === [].constructor)
        }
        var s, l = "Snowplow: ";
        !function(n) {
            n[n.none = 0] = "none",
            n[n.error = 1] = "error",
            n[n.warn = 2] = "warn",
            n[n.debug = 3] = "debug",
            n[n.info = 4] = "info"
        }(s || (s = {}));
        var f, d = (void 0 === f && (f = s.warn),
        {
            setLogLevel: function(n) {
                f = s[n] ? n : s.warn
            },
            warn: function(n, t) {
                for (var r = [], o = 2; o < arguments.length; o++)
                    r[o - 2] = arguments[o];
                if (f >= s.warn && "undefined" != typeof console) {
                    var i = l + n;
                    t ? console.warn.apply(console, e([i + "\n", t], r, !1)) : console.warn.apply(console, e([i], r, !1))
                }
            },
            error: function(n, t) {
                for (var r = [], o = 2; o < arguments.length; o++)
                    r[o - 2] = arguments[o];
                if (f >= s.error && "undefined" != typeof console) {
                    var i = l + n + "\n";
                    t ? console.error.apply(console, e([i + "\n", t], r, !1)) : console.error.apply(console, e([i], r, !1))
                }
            },
            debug: function(n) {
                for (var t = [], r = 1; r < arguments.length; r++)
                    t[r - 1] = arguments[r];
                f >= s.debug && "undefined" != typeof console && console.debug.apply(console, e([l + n], t, !1))
            },
            info: function(n) {
                for (var t = [], r = 1; r < arguments.length; r++)
                    t[r - 1] = arguments[r];
                f >= s.info && "undefined" != typeof console && console.info.apply(console, e([l + n], t, !1))
            }
        });
        function v() {
            var n = []
              , e = [];
            return {
                getGlobalPrimitives: function() {
                    return n
                },
                getConditionalProviders: function() {
                    return e
                },
                addGlobalContexts: function(t) {
                    for (var r = [], o = [], i = 0, a = t; i < a.length; i++) {
                        var c = a[i];
                        x(c) ? r.push(c) : b(c) && o.push(c)
                    }
                    n = n.concat(o),
                    e = e.concat(r)
                },
                clearGlobalContexts: function() {
                    e = [],
                    n = []
                },
                removeGlobalContexts: function(t) {
                    for (var r = function(t) {
                        x(t) ? e = e.filter((function(n) {
                            return JSON.stringify(n) !== JSON.stringify(t)
                        }
                        )) : b(t) && (n = n.filter((function(n) {
                            return JSON.stringify(n) !== JSON.stringify(t)
                        }
                        )))
                    }, o = 0, i = t; o < i.length; o++)
                        r(i[o])
                },
                getApplicableContexts: function(t) {
                    return function(t) {
                        var r = function(n) {
                            for (var e = 0, t = n.getJson(); e < t.length; e++) {
                                var r = t[e];
                                if ("ue_px" === r.keyIfEncoded && "object" == typeof r.json.data) {
                                    var o = r.json.data.schema;
                                    if ("string" == typeof o)
                                        return o
                                }
                            }
                            return ""
                        }(t)
                          , o = function(n) {
                            var e = n.getPayload().e;
                            return "string" == typeof e ? e : ""
                        }(t)
                          , i = []
                          , a = I(n, t, o, r);
                        i.push.apply(i, a);
                        var c = function(n, e, t, r) {
                            var o, i = O(n).map((function(n) {
                                var o = function(n, e, t, r) {
                                    if (k(n)) {
                                        var o = n[0]
                                          , i = !1;
                                        try {
                                            i = o({
                                                event: e.getPayload(),
                                                eventType: t,
                                                eventSchema: r
                                            })
                                        } catch (n) {
                                            i = !1
                                        }
                                        if (!0 === i)
                                            return I(n[1], e, t, r)
                                    } else if (S(n) && function(n, e) {
                                        var t = 0
                                          , r = 0
                                          , o = n.accept;
                                        Array.isArray(o) ? n.accept.some((function(n) {
                                            return T(n, e)
                                        }
                                        )) && r++ : "string" == typeof o && T(o, e) && r++;
                                        var i = n.reject;
                                        return Array.isArray(i) ? n.reject.some((function(n) {
                                            return T(n, e)
                                        }
                                        )) && t++ : "string" == typeof i && T(i, e) && t++,
                                        r > 0 && 0 === t
                                    }(n[0], r))
                                        return I(n[1], e, t, r);
                                    return []
                                }(n, e, t, r);
                                if (o && 0 !== o.length)
                                    return o
                            }
                            ));
                            return (o = []).concat.apply(o, i.filter((function(n) {
                                return null != n && n.filter(Boolean)
                            }
                            )))
                        }(e, t, o, r);
                        return i.push.apply(i, c),
                        i
                    }(t)
                }
            }
        }
        function p(n) {
            var e = n.split(".");
            return !!(e && e.length > 1) && function(n) {
                if ("*" === n[0] || "*" === n[1])
                    return !1;
                if (n.slice(2).length > 0) {
                    for (var e = !1, t = 0, r = n.slice(2); t < r.length; t++)
                        if ("*" === r[t])
                            e = !0;
                        else if (e)
                            return !1;
                    return !0
                }
                return 2 == n.length
            }(e)
        }
        function g(n) {
            var e = new RegExp("^iglu:((?:(?:[a-zA-Z0-9-_]+|\\*).)+(?:[a-zA-Z0-9-_]+|\\*))/([a-zA-Z0-9-_.]+|\\*)/jsonschema/([1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)$").exec(n);
            if (null !== e && p(e[1]))
                return e.slice(1, 6)
        }
        function m(n) {
            var e = g(n);
            if (e) {
                var t = e[0];
                return 5 === e.length && p(t)
            }
            return !1
        }
        function h(n) {
            return function(n) {
                return Array.isArray(n) && n.every((function(n) {
                    return "string" == typeof n
                }
                ))
            }(n) ? n.every((function(n) {
                return m(n)
            }
            )) : "string" == typeof n && m(n)
        }
        function y(n) {
            var e = n;
            return !!(c(e) && "schema"in e && "data"in e) && "string" == typeof e.schema && "object" == typeof e.data
        }
        function w(n) {
            return "function" == typeof n && n.length <= 1
        }
        function b(n) {
            return w(n) || y(n)
        }
        function k(n) {
            return !(!Array.isArray(n) || 2 !== n.length) && (Array.isArray(n[1]) ? w(n[0]) && n[1].every(b) : w(n[0]) && b(n[1]))
        }
        function S(n) {
            return !(!Array.isArray(n) || 2 !== n.length) && !!function(n) {
                var e = n
                  , t = 0;
                if (null != n && "object" == typeof n && !Array.isArray(n)) {
                    if (Object.prototype.hasOwnProperty.call(e, "accept")) {
                        if (!h(e.accept))
                            return !1;
                        t += 1
                    }
                    if (Object.prototype.hasOwnProperty.call(e, "reject")) {
                        if (!h(e.reject))
                            return !1;
                        t += 1
                    }
                    return t > 0 && t <= 2
                }
                return !1
            }(n[0]) && (Array.isArray(n[1]) ? n[1].every(b) : b(n[1]))
        }
        function x(n) {
            return k(n) || S(n)
        }
        function T(n, e) {
            if (!m(n))
                return !1;
            var t = g(n)
              , r = function(n) {
                var e = new RegExp("^iglu:([a-zA-Z0-9-_.]+)/([a-zA-Z0-9-_]+)/jsonschema/([1-9][0-9]*)-(0|[1-9][0-9]*)-(0|[1-9][0-9]*)$").exec(n);
                if (null !== e)
                    return e.slice(1, 6)
            }(e);
            if (t && r) {
                if (!function(n, e) {
                    var t = e.split(".")
                      , r = n.split(".");
                    if (t && r) {
                        if (t.length !== r.length)
                            return !1;
                        for (var o = 0; o < r.length; o++)
                            if (!C(t[o], r[o]))
                                return !1;
                        return !0
                    }
                    return !1
                }(t[0], r[0]))
                    return !1;
                for (var o = 1; o < 5; o++)
                    if (!C(t[o], r[o]))
                        return !1;
                return !0
            }
            return !1
        }
        function C(n, e) {
            return n && e && "*" === n || n === e
        }
        function O(n) {
            return Array.isArray(n) ? n : Array.of(n)
        }
        function I(n, e, t, r) {
            var o, i = O(n).map((function(n) {
                var o = function(n, e, t, r) {
                    if (y(n))
                        return [n];
                    if (w(n)) {
                        var o = function(n, e, t, r) {
                            var o = void 0;
                            try {
                                return o = n({
                                    event: e.getPayload(),
                                    eventType: t,
                                    eventSchema: r
                                }),
                                Array.isArray(o) && o.every(y) || y(o) ? o : void 0
                            } catch (n) {
                                o = void 0
                            }
                            return o
                        }(n, e, t, r);
                        if (y(o))
                            return [o];
                        if (Array.isArray(o))
                            return o
                    }
                }(n, e, t, r);
                if (o && 0 !== o.length)
                    return o
            }
            ));
            return (o = []).concat.apply(o, i.filter((function(n) {
                return null != n && n.filter(Boolean)
            }
            )))
        }
        function A(n) {
            var e = n.event
              , t = e.schema
              , r = e.data
              , o = i()
              , a = {
                schema: "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
                data: {
                    schema: t,
                    data: r
                }
            };
            return o.add("e", "ue"),
            o.addJson("ue_px", "ue_pr", a),
            o
        }
        function P(n) {
            return A({
                event: {
                    schema: "iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-1",
                    data: E({
                        targetUrl: n.targetUrl,
                        elementId: n.elementId,
                        elementClasses: n.elementClasses,
                        elementTarget: n.elementTarget,
                        elementContent: n.elementContent
                    })
                }
            })
        }
        function E(n, e) {
            void 0 === e && (e = {});
            var t = {};
            for (var r in n)
                (e[r] || null !== n[r] && void 0 !== n[r]) && (t[r] = n[r]);
            return t
        }
        var j = t(363)
          , L = t.n(j);
        function D(n, e, t) {
            void 0 === t && (t = 63072e3);
            try {
                var r = window.localStorage
                  , o = Date.now() + 1e3 * t;
                return r.setItem("".concat(n, ".expires"), o.toString()),
                r.setItem(n, e),
                !0
            } catch (n) {
                return !1
            }
        }
        function B(n) {
            try {
                var e = window.localStorage;
                return e.removeItem(n),
                e.removeItem(n + ".expires"),
                !0
            } catch (n) {
                return !1
            }
        }
        function N(n) {
            try {
                return window.sessionStorage.getItem(n)
            } catch (n) {
                return
            }
        }
        function _(n) {
            return !(!n || "string" != typeof n.valueOf())
        }
        function U(n) {
            return Number.isInteger && Number.isInteger(n) || "number" == typeof n && isFinite(n) && Math.floor(n) === n
        }
        function R(n) {
            if (!_(n)) {
                n = n.text || "";
                var e = document.getElementsByTagName("title");
                e && null != e[0] && (n = e[0].text)
            }
            return n
        }
        function M(n) {
            var e = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)").exec(n);
            return e ? e[1] : n
        }
        function V(n) {
            var e = n.length;
            return "." === n.charAt(--e) && (n = n.slice(0, e)),
            "*." === n.slice(0, 2) && (n = n.slice(1)),
            n
        }
        function z(n) {
            var e = window
              , t = J("referrer", e.location.href) || J("referer", e.location.href);
            if (t)
                return t;
            if (n)
                return n;
            try {
                if (e.top)
                    return e.top.document.referrer;
                if (e.parent)
                    return e.parent.document.referrer
            } catch (n) {}
            return document.referrer
        }
        function H(n, e, t, r) {
            return n.addEventListener ? (n.addEventListener(e, t, r),
            !0) : n.attachEvent ? n.attachEvent("on" + e, t) : void (n["on" + e] = t)
        }
        function J(n, e) {
            var t = new RegExp("^[^#]*[?&]" + n + "=([^&#]*)").exec(e);
            return t ? decodeURIComponent(t[1].replace(/\+/g, " ")) : null
        }
        function F(n, e, t, r) {
            q(n, "", -1, "/", e, t, r)
        }
        function G(n) {
            for (var e = document.cookie.split("; "), t = [], r = 0; r < e.length; r++)
                e[r].substring(0, n.length) === n && t.push(e[r]);
            return t
        }
        function q(n, e, t, r, o, i, a) {
            return arguments.length > 1 ? document.cookie = n + "=" + encodeURIComponent(null != e ? e : "") + (t ? "; Expires=" + new Date(+new Date + 1e3 * t).toUTCString() : "") + (r ? "; Path=" + r : "") + (o ? "; Domain=" + o : "") + (i ? "; SameSite=" + i : "") + (a ? "; Secure" : "") : decodeURIComponent((("; " + document.cookie).split("; " + n + "=")[1] || "").split(";")[0])
        }
        function X(n) {
            if (null == n || "object" != typeof n || Array.isArray(n))
                return function() {
                    return !0
                }
                ;
            var e = Object.prototype.hasOwnProperty.call(n, "allowlist")
              , t = function(n) {
                var e = {}
                  , t = n.allowlist || n.denylist;
                if (t) {
                    Array.isArray(t) || (t = [t]);
                    for (var r = 0; r < t.length; r++)
                        e[t[r]] = !0
                }
                return e
            }(n);
            return function(n, e) {
                return n.hasOwnProperty("filter") && n.filter ? n.filter : e
            }(n, (function(n) {
                return function(n, e) {
                    for (var t = 0, r = W(n); t < r.length; t++)
                        if (e[r[t]])
                            return !0;
                    return !1
                }(n, t) === e
            }
            ))
        }
        function W(n) {
            return n.className.match(/\S+/g) || []
        }
        var Y = "iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0"
          , Q = "iglu:com.snowplowanalytics.snowplow/browser_context/jsonschema/1-0-0"
          , Z = "iglu:com.snowplowanalytics.snowplow/client_session/jsonschema/1-0-2"
          , $ = "iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-4";
        function K(n, e, t, r, o, i, a, c, u, s, l, f, v, p, g, m, h) {
            var y, w, b = !1, k = [], S = !1, x = !0 === (r = "string" == typeof r ? r.toLowerCase() : r) || "beacon" === r || "true" === r, T = Boolean(x && window.navigator && window.navigator.sendBeacon && !(function(n, e) {
                var t = e.match("(iP.+; CPU .*OS (d+)[_d]*.*) AppleWebKit/");
                return !(!t || !t.length) && parseInt(t[0]) <= 13
            }(0, w = window.navigator.userAgent) || function(n, e, t) {
                var r = t.match("(Macintosh;.*Mac OS X (d+)_(d+)[_d]*.*) AppleWebKit/");
                return !(!r || !r.length) && (parseInt(r[0]) <= 10 || 10 === parseInt(r[0]) && parseInt(r[1]) <= 15)
            }(0, 0, w) && function(n) {
                return n.match("Version/.* Safari/") && !function(n) {
                    return n.match("Chrom(e|ium)")
                }(n)
            }(w))) && x, C = "get" === r, O = Boolean(window.XMLHttpRequest && "withCredentials"in new XMLHttpRequest), I = !C && O && ("post" === r || x), A = I ? o : "/i", P = "snowplowOutQueue_".concat(n, "_").concat(I ? "post2" : "get");
            if (x && (v = {}),
            i = t && function() {
                var n = "modernizr";
                if (!function() {
                    try {
                        return !!window.localStorage
                    } catch (n) {
                        return !0
                    }
                }())
                    return !1;
                try {
                    var e = window.localStorage;
                    return e.setItem(n, n),
                    e.removeItem(n),
                    !0
                } catch (n) {
                    return !1
                }
            }() && I && i || 1,
            t)
                try {
                    var E = window.localStorage.getItem(P);
                    k = E ? JSON.parse(E) : []
                } catch (n) {}
            function j(n) {
                var e = Object.keys(n).map((function(e) {
                    return [e, n[e]]
                }
                )).reduce((function(n, e) {
                    var t = e[0]
                      , r = e[1];
                    return n[t] = r.toString(),
                    n
                }
                ), {});
                return {
                    evt: e,
                    bytes: L(JSON.stringify(e))
                }
            }
            function L(n) {
                for (var e = 0, t = 0; t < n.length; t++) {
                    var r = n.charCodeAt(t);
                    r <= 127 ? e += 1 : r <= 2047 ? e += 2 : r >= 55296 && r <= 57343 ? (e += 4,
                    t++) : e += r < 65535 ? 3 : 4
                }
                return e
            }
            Array.isArray(k) || (k = []),
            e.outQueues.push(k),
            O && i > 1 && e.bufferFlushers.push((function(n) {
                b || U(n)
            }
            ));
            var B = function(n) {
                return "object" == typeof n[0] && "evt"in n[0]
            };
            function N(n, e) {
                R(e, !0, !1).send(M(V([n.evt])))
            }
            function U(n) {
                for (void 0 === n && (n = !1); k.length && "string" != typeof k[0] && "object" != typeof k[0]; )
                    k.shift();
                if (k.length) {
                    if (!_(y))
                        throw "No collector configured";
                    if (b = !0,
                    h && !S) {
                        var e = R(h, !1, n);
                        return S = !0,
                        e.timeout = l,
                        e.onreadystatechange = function() {
                            4 === e.readyState && U()
                        }
                        ,
                        void e.send()
                    }
                    if (O) {
                        var r, o, i = void 0;
                        B(k) ? (r = R(i = y, !0, n),
                        o = function(n) {
                            for (var e = 0, t = 0; e < n.length && !((t += n[e].bytes) >= a); )
                                e += 1;
                            return e
                        }(k)) : (i = z(k[0]),
                        r = R(i, !1, n),
                        o = 1);
                        var c = setTimeout((function() {
                            r.abort(),
                            b = !1
                        }
                        ), l)
                          , u = function(n) {
                            for (var e = 0; e < n; e++)
                                k.shift();
                            t && D(P, JSON.stringify(k.slice(0, s)))
                        }
                          , v = function(n) {
                            u(n),
                            U()
                        };
                        if (r.onreadystatechange = function() {
                            var n;
                            4 === r.readyState && r.status >= 200 && (clearTimeout(c),
                            r.status < 300 ? v(o) : (!((n = r.status) >= 200 && n < 300 || !g.includes(n) && m.includes(n)) || (d.error("Status ".concat(r.status, ", will not retry.")),
                            u(o)),
                            b = !1))
                        }
                        ,
                        B(k)) {
                            var p = k.slice(0, o);
                            if (p.length > 0) {
                                var w = !1
                                  , x = p.map((function(n) {
                                    return n.evt
                                }
                                ));
                                if (T) {
                                    var C = new Blob([M(V(x))],{
                                        type: "application/json"
                                    });
                                    try {
                                        w = navigator.sendBeacon(i, C)
                                    } catch (n) {
                                        w = !1
                                    }
                                }
                                !0 === w ? v(o) : r.send(M(V(x)))
                            }
                        } else
                            r.send()
                    } else if (f || B(k))
                        b = !1;
                    else {
                        var I = new Image(1,1)
                          , A = !0;
                        I.onload = function() {
                            A && (A = !1,
                            k.shift(),
                            t && D(P, JSON.stringify(k.slice(0, s))),
                            U())
                        }
                        ,
                        I.onerror = function() {
                            A && (A = !1,
                            b = !1)
                        }
                        ,
                        I.src = z(k[0]),
                        setTimeout((function() {
                            A && b && (A = !1,
                            U())
                        }
                        ), l)
                    }
                } else
                    b = !1
            }
            function R(n, e, t) {
                var r = new XMLHttpRequest;
                for (var o in e ? (r.open("POST", n, !t),
                r.setRequestHeader("Content-Type", "application/json; charset=UTF-8")) : r.open("GET", n, !t),
                r.withCredentials = p,
                f && r.setRequestHeader("SP-Anonymous", "*"),
                v)
                    Object.prototype.hasOwnProperty.call(v, o) && r.setRequestHeader(o, v[o]);
                return r
            }
            function M(n) {
                return JSON.stringify({
                    schema: $,
                    data: n
                })
            }
            function V(n) {
                for (var e = (new Date).getTime().toString(), t = 0; t < n.length; t++)
                    n[t].stm = e;
                return n
            }
            function z(n) {
                return u ? y + n.replace("?", "?stm=" + (new Date).getTime() + "&") : y + n
            }
            return {
                enqueueRequest: function(n, e) {
                    y = e + A;
                    var r = function(n, e) {
                        return d.warn("Event (" + n + "B) too big, max is " + e)
                    };
                    if (I) {
                        if ((l = j(n)).bytes >= a)
                            return r(l.bytes, a),
                            void N(l, y);
                        k.push(l)
                    } else {
                        var u = function(n) {
                            var e = "?"
                              , t = {
                                co: !0,
                                cx: !0
                            }
                              , r = !0;
                            for (var o in n)
                                n.hasOwnProperty(o) && !t.hasOwnProperty(o) && (r ? r = !1 : e += "&",
                                e += encodeURIComponent(o) + "=" + encodeURIComponent(n[o]));
                            for (var i in t)
                                n.hasOwnProperty(i) && t.hasOwnProperty(i) && (e += "&" + i + "=" + encodeURIComponent(n[i]));
                            return e
                        }(n);
                        if (c > 0) {
                            var l, f = L(z(u));
                            if (f >= c)
                                return r(f, c),
                                void (O && N(l = j(n), e + o))
                        }
                        k.push(u)
                    }
                    var v = !1;
                    t && (v = D(P, JSON.stringify(k.slice(0, s)))),
                    b || v && !(k.length >= i) || U()
                },
                executeQueue: function() {
                    b || U()
                },
                setUseLocalStorage: function(n) {
                    t = n
                },
                setAnonymousTracking: function(n) {
                    f = n
                },
                setCollectorUrl: function(n) {
                    y = n + A
                },
                setBufferSize: function(n) {
                    i = n
                }
            }
        }
        function nn(n, e, t) {
            var r, o, i;
            return "translate.googleusercontent.com" === n ? ("" === t && (t = e),
            n = M(e = null !== (o = e,
            "u",
            r = (i = new RegExp("^(?:https?|ftp)(?::/*(?:[^?]+))([?][^#]+)").exec(o)) && (null == i ? void 0 : i.length) > 1 ? J("u", i[1]) : null) && void 0 !== r ? r : "")) : "cc.bingj.com" !== n && "webcache.googleusercontent.com" !== n || (n = M(e = document.links[0].href)),
            [n, e, t]
        }
        var en = 0
          , tn = 1
          , rn = 2
          , on = 3
          , an = 4
          , cn = 5
          , un = 6
          , sn = 7
          , ln = 8
          , fn = 9
          , dn = 10;
        function vn(n, e) {
            void 0 === e && (e = {
                memorizedVisitCount: 1
            });
            var t = e.memorizedVisitCount;
            yn(n) ? (n[sn] = n[un],
            n[cn] = n[an],
            n[on]++) : n[on] = t;
            var o = (0,
            r.v4)();
            return n[un] = o,
            n[dn] = 0,
            n[ln] = "",
            n[fn] = void 0,
            o
        }
        function pn(n) {
            n[an] = Math.round((new Date).getTime() / 1e3)
        }
        function gn(n, e, t) {
            var r = n[fn];
            return {
                userId: t ? "00000000-0000-0000-0000-000000000000" : n[tn],
                sessionId: n[un],
                eventIndex: n[dn],
                sessionIndex: n[on],
                previousSessionId: t ? null : n[sn] || null,
                storageMechanism: "localStorage" == e ? "LOCAL_STORAGE" : "COOKIE_1",
                firstEventId: n[ln] || null,
                firstEventTimestamp: r ? new Date(r).toISOString() : null
            }
        }
        function mn(n) {
            return n[un]
        }
        function hn(n) {
            return n[on]
        }
        function yn(n) {
            return "0" === n[en]
        }
        var wn = "x";
        function bn() {
            return {
                viewport: Sn(kn()),
                documentSize: Sn((n = document.documentElement,
                e = document.body,
                t = e ? Math.max(e.offsetHeight, e.scrollHeight) : 0,
                r = Math.max(n.clientWidth, n.offsetWidth, n.scrollWidth),
                o = Math.max(n.clientHeight, n.offsetHeight, n.scrollHeight, t),
                isNaN(r) || isNaN(o) ? "" : r + wn + o)),
                resolution: Sn(screen.width + wn + screen.height),
                colorDepth: screen.colorDepth,
                devicePixelRatio: window.devicePixelRatio,
                cookiesEnabled: window.navigator.cookieEnabled,
                online: window.navigator.onLine,
                browserLanguage: navigator.language || navigator.userLanguage,
                documentLanguage: document.documentElement.lang,
                webdriver: window.navigator.webdriver,
                deviceMemory: window.navigator.deviceMemory,
                hardwareConcurrency: window.navigator.hardwareConcurrency
            };
            var n, e, t, r, o
        }
        function kn() {
            var n, e;
            if ("innerWidth"in window)
                n = window.innerWidth,
                e = window.innerHeight;
            else {
                var t = document.documentElement || document.body;
                n = t.clientWidth,
                e = t.clientHeight
            }
            return n >= 0 && e >= 0 ? n + wn + e : null
        }
        function Sn(n) {
            return n && n.split(wn).map((function(n) {
                return Math.floor(Number(n))
            }
            )).join(wn)
        }
        function xn(t, o, c, s, l, f) {
            void 0 === f && (f = {});
            var p = []
              , g = function(t, o, c, s, l, f) {
                var g, m, h, y, w, b, k, S, x, T, C, O, I, A, P, E, j, _, X, W, $, wn, kn, Sn, xn, Tn, Cn, On;
                f.eventMethod = null !== (g = f.eventMethod) && void 0 !== g ? g : "post";
                var In, An, Pn = function(n) {
                    var e;
                    return null !== (e = n.stateStorageStrategy) && void 0 !== e ? e : "cookieAndLocalStorage"
                }, En = function(n) {
                    var e, t;
                    return "boolean" != typeof n.anonymousTracking && null !== (t = !0 === (null === (e = n.anonymousTracking) || void 0 === e ? void 0 : e.withSessionTracking)) && void 0 !== t && t
                }, jn = function(n) {
                    var e, t;
                    return "boolean" != typeof n.anonymousTracking && null !== (t = !0 === (null === (e = n.anonymousTracking) || void 0 === e ? void 0 : e.withServerAnonymisation)) && void 0 !== t && t
                }, Ln = function(n) {
                    return !!n.anonymousTracking
                }, Dn = null !== (h = null === (m = null == f ? void 0 : f.contexts) || void 0 === m ? void 0 : m.browser) && void 0 !== h && h, Bn = null === (w = null === (y = null == f ? void 0 : f.contexts) || void 0 === y ? void 0 : y.webPage) || void 0 === w || w;
                p.push((In = function(n) {
                    return be ? null : n
                }
                ,
                An = function(n) {
                    return ye ? n : In(n)
                }
                ,
                {
                    beforeTrack: function(n) {
                        var e = He("ses")
                          , t = et()
                          , r = 0 === function(n) {
                            return n[dn]
                        }(t);
                        if (Qn = !!Vn && !!q(Vn),
                        ge || Qn)
                            $e();
                        else {
                            yn(t) ? (Wn = e || "none" == ke ? mn(t) : vn(t),
                            xe = hn(t)) : (new Date).getTime() - Se > 1e3 * he && (xe++,
                            Wn = vn(t, {
                                memorizedVisitCount: xe
                            })),
                            pn(t),
                            function(n, e) {
                                if (0 === n[dn]) {
                                    var t = e.build();
                                    n[ln] = t.eid;
                                    var r = t.dtm || t.ttm;
                                    n[fn] = r ? parseInt(r) : void 0
                                }
                            }(t, n),
                            function(n) {
                                n[dn] += 1
                            }(t);
                            var o = bn()
                              , i = o.viewport
                              , a = o.documentSize;
                            n.add("vp", i),
                            n.add("ds", a),
                            n.add("vid", An(xe)),
                            n.add("sid", An(Wn)),
                            n.add("duid", In(function(n) {
                                return n[tn]
                            }(t))),
                            n.add("uid", In(Yn)),
                            _e(),
                            n.add("refr", Me(Nn || te)),
                            n.add("url", Me(_n || ee));
                            var c = gn(t, ke, be);
                            if (!Ae || be && !ye || function(n, e) {
                                var t = {
                                    schema: Z,
                                    data: e
                                };
                                n.addContextEntity(t)
                            }(n, c),
                            "none" != ke) {
                                Qe(t);
                                var u = Ye();
                                e && !r || !u || !Pe || Ee || (Pe(c),
                                Ee = !1)
                            }
                            Se = (new Date).getTime()
                        }
                    }
                })),
                Bn && p.push({
                    contexts: function() {
                        return [{
                            schema: Y,
                            data: {
                                id: ot()
                            }
                        }]
                    }
                }),
                Dn && p.push({
                    contexts: function() {
                        return [{
                            schema: Q,
                            data: n(n({}, bn()), {
                                tabId: it()
                            })
                        }]
                    }
                }),
                p.push.apply(p, null !== (b = f.plugins) && void 0 !== b ? b : []);
                var Nn, _n, Un, Rn, Mn, Vn, zn, Hn, Jn, Fn, Gn, qn, Xn, Wn, Yn, Qn, Zn = function(t) {
                    void 0 === t && (t = {});
                    var o = t.base64
                      , i = t.corePlugins
                      , c = t.callback
                      , s = null != i ? i : []
                      , l = function(n, t, o) {
                        var i = function(n) {
                            return {
                                addPluginContexts: function(t) {
                                    var r = t ? e([], t, !0) : [];
                                    return n.forEach((function(n) {
                                        try {
                                            n.contexts && r.push.apply(r, n.contexts())
                                        } catch (n) {
                                            d.error("Error adding plugin contexts", n)
                                        }
                                    }
                                    )),
                                    r
                                }
                            }
                        }(t)
                          , c = v()
                          , s = n
                          , l = {};
                        function f(n, e) {
                            l[n] = e
                        }
                        return {
                            track: function(n, e, u) {
                                n.withJsonProcessor(a(s)),
                                n.add("eid", (0,
                                r.v4)()),
                                n.addDict(l);
                                var f = function(n) {
                                    return null == n ? {
                                        type: "dtm",
                                        value: (new Date).getTime()
                                    } : "number" == typeof n ? {
                                        type: "dtm",
                                        value: n
                                    } : "ttm" === n.type ? {
                                        type: "ttm",
                                        value: n.value
                                    } : {
                                        type: "dtm",
                                        value: n.value || (new Date).getTime()
                                    }
                                }(u);
                                n.add(f.type, f.value.toString());
                                var v = function(n) {
                                    if (n && n.length)
                                        return {
                                            schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
                                            data: n
                                        }
                                }(function(n, e) {
                                    var t = c.getApplicableContexts(n)
                                      , r = [];
                                    return e && e.length && r.push.apply(r, e),
                                    t && t.length && r.push.apply(r, t),
                                    r
                                }(n, i.addPluginContexts(e)));
                                void 0 !== v && n.addJson("cx", "co", v),
                                t.forEach((function(e) {
                                    try {
                                        e.beforeTrack && e.beforeTrack(n)
                                    } catch (n) {
                                        d.error("Plugin beforeTrack", n)
                                    }
                                }
                                )),
                                "function" == typeof o && o(n);
                                var p = n.build();
                                return t.forEach((function(n) {
                                    try {
                                        n.afterTrack && n.afterTrack(p)
                                    } catch (n) {
                                        d.error("Plugin afterTrack", n)
                                    }
                                }
                                )),
                                p
                            },
                            addPayloadPair: f,
                            getBase64Encoding: function() {
                                return s
                            },
                            setBase64Encoding: function(n) {
                                s = n
                            },
                            addPayloadDict: function(n) {
                                for (var e in n)
                                    Object.prototype.hasOwnProperty.call(n, e) && (l[e] = n[e])
                            },
                            resetPayloadPairs: function(n) {
                                l = u(n) ? n : {}
                            },
                            setTrackerVersion: function(n) {
                                f("tv", n)
                            },
                            setTrackerNamespace: function(n) {
                                f("tna", n)
                            },
                            setAppId: function(n) {
                                f("aid", n)
                            },
                            setPlatform: function(n) {
                                f("p", n)
                            },
                            setUserId: function(n) {
                                f("uid", n)
                            },
                            setScreenResolution: function(n, e) {
                                f("res", n + "x" + e)
                            },
                            setViewport: function(n, e) {
                                f("vp", n + "x" + e)
                            },
                            setColorDepth: function(n) {
                                f("cd", n)
                            },
                            setTimezone: function(n) {
                                f("tz", n)
                            },
                            setLang: function(n) {
                                f("lang", n)
                            },
                            setIpAddress: function(n) {
                                f("ip", n)
                            },
                            setUseragent: function(n) {
                                f("ua", n)
                            },
                            addGlobalContexts: function(n) {
                                c.addGlobalContexts(n)
                            },
                            clearGlobalContexts: function() {
                                c.clearGlobalContexts()
                            },
                            removeGlobalContexts: function(n) {
                                c.removeGlobalContexts(n)
                            }
                        }
                    }(null == o || o, s, c)
                      , f = n(n({}, l), {
                        addPlugin: function(n) {
                            var e, t, r = n.plugin;
                            s.push(r),
                            null === (e = r.logger) || void 0 === e || e.call(r, d),
                            null === (t = r.activateCorePlugin) || void 0 === t || t.call(r, f)
                        }
                    });
                    return null == s || s.forEach((function(n) {
                        var e, t;
                        null === (e = n.logger) || void 0 === e || e.call(n, d),
                        null === (t = n.activateCorePlugin) || void 0 === t || t.call(n, f)
                    }
                    )),
                    f
                }({
                    base64: f.encodeBase64,
                    corePlugins: p,
                    callback: function(n) {
                        ge || Qn || Te.enqueueRequest(n.build(), oe)
                    }
                }), $n = document.characterSet || document.charset, Kn = nn(window.location.hostname, window.location.href, z()), ne = V(Kn[0]), ee = Kn[1], te = Kn[2], re = null !== (k = f.platform) && void 0 !== k ? k : "web", oe = tt(s), ie = null !== (S = f.postPath) && void 0 !== S ? S : "/com.snowplowanalytics.snowplow/tp2", ae = null !== (x = f.appId) && void 0 !== x ? x : "", ce = document.title, ue = null === (T = f.resetActivityTrackingOnPageView) || void 0 === T || T, se = null !== (C = f.cookieName) && void 0 !== C ? C : "_sp_", le = null !== (O = f.cookieDomain) && void 0 !== O ? O : void 0, fe = "/", de = null !== (I = f.cookieSameSite) && void 0 !== I ? I : "None", ve = null === (A = f.cookieSecure) || void 0 === A || A, pe = navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack, ge = void 0 !== f.respectDoNotTrack && f.respectDoNotTrack && ("yes" === pe || "1" === pe), me = null !== (P = f.cookieLifetime) && void 0 !== P ? P : 63072e3, he = null !== (E = f.sessionCookieTimeout) && void 0 !== E ? E : 1800, ye = En(f), we = jn(f), be = Ln(f), ke = Pn(f), Se = (new Date).getTime(), xe = 1, Te = K(t, l, "localStorage" == ke || "cookieAndLocalStorage" == ke, f.eventMethod, ie, null !== (j = f.bufferSize) && void 0 !== j ? j : 1, null !== (_ = f.maxPostBytes) && void 0 !== _ ? _ : 4e4, null !== (X = f.maxGetBytes) && void 0 !== X ? X : 0, null === (W = f.useStm) || void 0 === W || W, null !== ($ = f.maxLocalStorageQueueSize) && void 0 !== $ ? $ : 1e3, null !== (wn = f.connectionTimeout) && void 0 !== wn ? wn : 5e3, we, null !== (kn = f.customHeaders) && void 0 !== kn ? kn : {}, null === (Sn = f.withCredentials) || void 0 === Sn || Sn, null !== (xn = f.retryStatusCodes) && void 0 !== xn ? xn : [], (null !== (Tn = f.dontRetryStatusCodes) && void 0 !== Tn ? Tn : []).concat([400, 401, 403, 410, 422]), f.idService), Ce = !1, Oe = !1, Ie = {
                    enabled: !1,
                    installed: !1,
                    configurations: {}
                }, Ae = null !== (On = null === (Cn = f.contexts) || void 0 === Cn ? void 0 : Cn.session) && void 0 !== On && On, Pe = f.onSessionUpdateCallback, Ee = !1;
                f.hasOwnProperty("discoverRootDomain") && f.discoverRootDomain && (le = function(n, e) {
                    for (var t = window.location.hostname, r = "_sp_root_domain_test_", o = r + (new Date).getTime(), i = "_test_value_" + (new Date).getTime(), a = t.split("."), c = a.length - 2; c >= 0; c--) {
                        var u = a.slice(c).join(".");
                        if (q(o, i, 0, "/", u, n, e),
                        q(o) === i) {
                            F(o, u, n, e);
                            for (var s = G(r), l = 0; l < s.length; l++)
                                F(s[l], u, n, e);
                            return u
                        }
                    }
                    return t
                }(de, ve));
                var je = bn()
                  , Le = je.browserLanguage
                  , De = je.resolution
                  , Be = je.colorDepth
                  , Ne = je.cookiesEnabled;
                function _e() {
                    (Kn = nn(window.location.hostname, window.location.href, z()))[1] !== ee && (te = z(ee)),
                    ne = V(Kn[0]),
                    ee = Kn[1]
                }
                function Ue(n) {
                    var e = (new Date).getTime()
                      , t = n.currentTarget;
                    (null == t ? void 0 : t.href) && (t.href = function(n, e, t) {
                        var r = e + "=" + t
                          , o = n.split("#")
                          , i = o[0].split("?")
                          , a = i.shift()
                          , c = i.join("?");
                        if (c) {
                            for (var u = !0, s = c.split("&"), l = 0; l < s.length; l++)
                                if (s[l].substr(0, 4) === e + "=") {
                                    u = !1,
                                    s[l] = r,
                                    c = s.join("&");
                                    break
                                }
                            u && (c = r + "&" + c)
                        } else
                            c = r;
                        return o[0] = a + "?" + c,
                        o.join("#")
                    }(t.href, "_sp", Xn + "." + e))
                }
                function Re(n) {
                    for (var e = 0; e < document.links.length; e++) {
                        var t = document.links[e];
                        !t.spDecorationEnabled && n(t) && (H(t, "click", Ue, !0),
                        H(t, "mousedown", Ue, !0),
                        t.spDecorationEnabled = !0)
                    }
                }
                function Me(n) {
                    var e;
                    return Rn && (e = new RegExp("#.*"),
                    n = n.replace(e, "")),
                    Mn && (e = new RegExp("[{}]","g"),
                    n = n.replace(e, "")),
                    n
                }
                function Ve(n) {
                    var e = new RegExp("^([a-z]+):").exec(n);
                    return e ? e[1] : null
                }
                function ze(n) {
                    return se + n + "." + qn
                }
                function He(n) {
                    var e = ze(n);
                    return "localStorage" == ke ? function(n) {
                        try {
                            var e = window.localStorage
                              , t = e.getItem(n + ".expires");
                            return null === t || +t > Date.now() ? e.getItem(n) : (e.removeItem(n),
                            void e.removeItem(n + ".expires"))
                        } catch (n) {
                            return
                        }
                    }(e) : "cookie" == ke || "cookieAndLocalStorage" == ke ? q(e) : void 0
                }
                function Je() {
                    _e(),
                    qn = L()((le || ne) + (fe || "/")).slice(0, 4)
                }
                function Fe() {
                    var n = new Date;
                    zn = n.getTime()
                }
                function Ge() {
                    !function() {
                        var n = qe()
                          , e = n[0];
                        e < Hn ? Hn = e : e > Jn && (Jn = e);
                        var t = n[1];
                        t < Fn ? Fn = t : t > Gn && (Gn = t)
                    }(),
                    Fe()
                }
                function qe() {
                    var n = document.documentElement;
                    return n ? [n.scrollLeft || window.pageXOffset, n.scrollTop || window.pageYOffset] : [0, 0]
                }
                function Xe() {
                    var n = qe()
                      , e = n[0];
                    Hn = e,
                    Jn = e;
                    var t = n[1];
                    Fn = t,
                    Gn = t
                }
                function We(n) {
                    return Math.round(n)
                }
                function Ye() {
                    return Ze(ze("ses"), "*", he)
                }
                function Qe(n) {
                    var e = ze("id")
                      , t = function(n) {
                        return n.shift(),
                        n.join(".")
                    }(n);
                    return Ze(e, t, me)
                }
                function Ze(n, e, t) {
                    return !(be && !ye) && ("localStorage" == ke ? D(n, e, t) : ("cookie" == ke || "cookieAndLocalStorage" == ke) && (q(n, e, t, fe, le, de, ve),
                    -1 !== document.cookie.indexOf("".concat(n, "="))))
                }
                function $e(n) {
                    var e = ze("id")
                      , t = ze("ses");
                    B(e),
                    B(t),
                    F(e, le, de, ve),
                    F(t, le, de, ve),
                    (null == n ? void 0 : n.preserveSession) || (Wn = (0,
                    r.v4)(),
                    xe = 1),
                    (null == n ? void 0 : n.preserveUser) || (Xn = be ? "" : (0,
                    r.v4)(),
                    Yn = null)
                }
                function Ke(n) {
                    n && n.stateStorageStrategy && (f.stateStorageStrategy = n.stateStorageStrategy,
                    ke = Pn(f)),
                    be = Ln(f),
                    ye = En(f),
                    we = jn(f),
                    Te.setUseLocalStorage("localStorage" == ke || "cookieAndLocalStorage" == ke),
                    Te.setAnonymousTracking(we)
                }
                function nt() {
                    if (!be || ye) {
                        var n = "none" != ke && !!He("ses")
                          , e = et();
                        Xn = function(n, e) {
                            var t;
                            return n[tn] ? t = n[tn] : e ? (t = "",
                            n[tn] = t) : (t = (0,
                            r.v4)(),
                            n[tn] = t),
                            t
                        }(e, be),
                        Wn = n ? mn(e) : vn(e),
                        xe = hn(e),
                        "none" != ke && (Ye(),
                        pn(e),
                        Qe(e))
                    }
                }
                function et() {
                    return "none" == ke ? ["1", "", 0, 0, 0, void 0, "", "", "", void 0, 0] : function(n, e, t, o) {
                        var i, a = new Date, c = Math.round(a.getTime() / 1e3);
                        n ? (i = n.split(".")).unshift("0") : i = ["1", e, c, o, c, "", t],
                        i[un] && "undefined" !== i[un] || (i[un] = (0,
                        r.v4)()),
                        i[sn] && "undefined" !== i[sn] || (i[sn] = ""),
                        i[ln] && "undefined" !== i[ln] || (i[ln] = ""),
                        i[fn] && "undefined" !== i[fn] || (i[fn] = ""),
                        i[dn] && "undefined" !== i[dn] || (i[dn] = 0);
                        var u = function(n, e) {
                            var t = parseInt(n);
                            return isNaN(t) ? e : t
                        }
                          , s = function(n) {
                            return n ? u(n, void 0) : void 0
                        };
                        return [i[en], i[tn], u(i[rn], c), u(i[on], o), u(i[an], c), s(i[cn]), i[un], i[sn], i[ln], s(i[fn]), u(i[dn], 0)]
                    }(He("id") || void 0, Xn, Wn, xe)
                }
                function tt(n) {
                    return 0 === n.indexOf("http") ? n : ("https:" === document.location.protocol ? "https" : "http") + "://" + n
                }
                function rt() {
                    Ce && null != l.pageViewId || (l.pageViewId = (0,
                    r.v4)())
                }
                function ot() {
                    return null == l.pageViewId && (l.pageViewId = (0,
                    r.v4)()),
                    l.pageViewId
                }
                function it() {
                    if ("none" === ke || be || !Bn)
                        return null;
                    var n = "_sp_tab_id"
                      , e = N(n);
                    return e || (function(n, e) {
                        try {
                            return window.sessionStorage.setItem(n, e),
                            !0
                        } catch (n) {
                            return !1
                        }
                    }(n, (0,
                    r.v4)()),
                    e = N(n)),
                    e || null
                }
                function at(n, e) {
                    return (n || []).concat(e ? e() : [])
                }
                function ct(n, e, t) {
                    var r = function(n, e) {
                        _e(),
                        n({
                            context: e,
                            pageViewId: ot(),
                            minXOffset: Hn,
                            minYOffset: Fn,
                            maxXOffset: Jn,
                            maxYOffset: Gn
                        }),
                        Xe()
                    }
                      , o = function() {
                        var o = new Date;
                        zn + n.configHeartBeatTimer > o.getTime() && r(n.callback, at(e, t))
                    };
                    0 === n.configMinimumVisitLength ? n.activityInterval = window.setInterval(o, n.configHeartBeatTimer) : n.activityInterval = window.setTimeout((function() {
                        var i = new Date;
                        zn + n.configMinimumVisitLength > i.getTime() && r(n.callback, at(e, t)),
                        n.activityInterval = window.setInterval(o, n.configHeartBeatTimer)
                    }
                    ), n.configMinimumVisitLength)
                }
                function ut(n) {
                    var e = n.minimumVisitLength
                      , t = n.heartbeatDelay
                      , r = n.callback;
                    if (U(e) && U(t))
                        return {
                            configMinimumVisitLength: 1e3 * e,
                            configHeartBeatTimer: 1e3 * t,
                            callback: r
                        };
                    d.error("Activity tracking minimumVisitLength & heartbeatDelay must be integers")
                }
                function st(n) {
                    var e = n.context
                      , t = n.minXOffset
                      , r = n.minYOffset
                      , o = n.maxXOffset
                      , a = n.maxYOffset
                      , c = document.title;
                    c !== ce && (ce = c,
                    Un = void 0),
                    Zn.track(function(n) {
                        var e = n.pageUrl
                          , t = n.pageTitle
                          , r = n.referrer
                          , o = n.minXOffset
                          , a = n.maxXOffset
                          , c = n.minYOffset
                          , u = n.maxYOffset
                          , s = i();
                        return s.add("e", "pp"),
                        s.add("url", e),
                        s.add("page", t),
                        s.add("refr", r),
                        o && !isNaN(Number(o)) && s.add("pp_mix", o.toString()),
                        a && !isNaN(Number(a)) && s.add("pp_max", a.toString()),
                        c && !isNaN(Number(c)) && s.add("pp_miy", c.toString()),
                        u && !isNaN(Number(u)) && s.add("pp_may", u.toString()),
                        s
                    }({
                        pageUrl: Me(_n || ee),
                        pageTitle: R(Un || ce),
                        referrer: Me(Nn || te),
                        minXOffset: We(t),
                        maxXOffset: We(o),
                        minYOffset: We(r),
                        maxYOffset: We(a)
                    }), e)
                }
                function lt(n) {
                    var e = Ie.configurations[n];
                    0 === (null == e ? void 0 : e.configMinimumVisitLength) ? window.clearTimeout(null == e ? void 0 : e.activityInterval) : window.clearInterval(null == e ? void 0 : e.activityInterval),
                    Ie.configurations[n] = void 0
                }
                Zn.setTrackerVersion(c),
                Zn.setTrackerNamespace(o),
                Zn.setAppId(ae),
                Zn.setPlatform(re),
                Zn.addPayloadPair("cookie", Ne ? "1" : "0"),
                Zn.addPayloadPair("cs", $n),
                Zn.addPayloadPair("lang", Le),
                Zn.addPayloadPair("res", De),
                Zn.addPayloadPair("cd", Be),
                Je(),
                nt(),
                f.crossDomainLinker && Re(f.crossDomainLinker);
                var ft = {
                    getDomainSessionIndex: function() {
                        return xe
                    },
                    getPageViewId: ot,
                    getTabId: it,
                    newSession: function() {
                        var n = et();
                        if (yn(n) ? (Wn = "none" != ke ? vn(n) : mn(n),
                        xe = hn(n)) : (xe++,
                        Wn = vn(n, {
                            memorizedVisitCount: xe
                        })),
                        pn(n),
                        "none" != ke) {
                            var e = gn(n, ke, be);
                            Qe(n),
                            Ye() && Pe && (Ee = !0,
                            Pe(e))
                        }
                        Se = (new Date).getTime()
                    },
                    getCookieName: function(n) {
                        return ze(n)
                    },
                    getUserId: function() {
                        return Yn
                    },
                    getDomainUserId: function() {
                        return et()[1]
                    },
                    getDomainUserInfo: function() {
                        return et()
                    },
                    setReferrerUrl: function(n) {
                        Nn = n
                    },
                    setCustomUrl: function(n) {
                        _e(),
                        _n = function(n, e) {
                            var t;
                            return Ve(e) ? e : "/" === e.slice(0, 1) ? Ve(n) + "://" + M(n) + e : ((t = (n = Me(n)).indexOf("?")) >= 0 && (n = n.slice(0, t)),
                            (t = n.lastIndexOf("/")) !== n.length - 1 && (n = n.slice(0, t + 1)),
                            n + e)
                        }(ee, n)
                    },
                    setDocumentTitle: function(n) {
                        ce = document.title,
                        Un = n
                    },
                    discardHashTag: function(n) {
                        Rn = n
                    },
                    discardBrace: function(n) {
                        Mn = n
                    },
                    setCookiePath: function(n) {
                        fe = n,
                        Je()
                    },
                    setVisitorCookieTimeout: function(n) {
                        me = n
                    },
                    crossDomainLinker: function(n) {
                        Re(n)
                    },
                    enableActivityTracking: function(e) {
                        Ie.configurations.pagePing || (Ie.enabled = !0,
                        Ie.configurations.pagePing = ut(n(n({}, e), {
                            callback: st
                        })))
                    },
                    enableActivityTrackingCallback: function(n) {
                        Ie.configurations.callback || (Ie.enabled = !0,
                        Ie.configurations.callback = ut(n))
                    },
                    disableActivityTracking: function() {
                        lt("pagePing")
                    },
                    disableActivityTrackingCallback: function() {
                        lt("callback")
                    },
                    updatePageActivity: function() {
                        Fe()
                    },
                    setOptOutCookie: function(n) {
                        Vn = n
                    },
                    setUserId: function(n) {
                        Yn = n
                    },
                    setUserIdFromLocation: function(n) {
                        _e(),
                        Yn = J(n, ee)
                    },
                    setUserIdFromReferrer: function(n) {
                        _e(),
                        Yn = J(n, te)
                    },
                    setUserIdFromCookie: function(n) {
                        Yn = q(n)
                    },
                    setCollectorUrl: function(n) {
                        oe = tt(n),
                        Te.setCollectorUrl(oe)
                    },
                    setBufferSize: function(n) {
                        Te.setBufferSize(n)
                    },
                    flushBuffer: function(n) {
                        void 0 === n && (n = {}),
                        Te.executeQueue(),
                        n.newBufferSize && Te.setBufferSize(n.newBufferSize)
                    },
                    trackPageView: function(n) {
                        void 0 === n && (n = {}),
                        function(n) {
                            var e = n.title
                              , t = n.context
                              , r = n.timestamp
                              , o = n.contextCallback;
                            _e(),
                            Oe && rt(),
                            Oe = !0,
                            ce = document.title;
                            var a = R((Un = e) || ce);
                            Zn.track(function(n) {
                                var e = n.pageUrl
                                  , t = n.pageTitle
                                  , r = n.referrer
                                  , o = i();
                                return o.add("e", "pv"),
                                o.add("url", e),
                                o.add("page", t),
                                o.add("refr", r),
                                o
                            }({
                                pageUrl: Me(_n || ee),
                                pageTitle: a,
                                referrer: Me(Nn || te)
                            }), at(t, o), r);
                            var c = new Date
                              , u = !1;
                            if (Ie.enabled && !Ie.installed) {
                                Ie.installed = !0,
                                u = !0;
                                var s = {
                                    update: function() {
                                        if ("undefined" != typeof window && "function" == typeof window.addEventListener) {
                                            var n = !1
                                              , e = Object.defineProperty({}, "passive", {
                                                get: function() {
                                                    n = !0
                                                },
                                                set: function() {}
                                            })
                                              , t = function() {};
                                            window.addEventListener("testPassiveEventSupport", t, e),
                                            window.removeEventListener("testPassiveEventSupport", t, e),
                                            s.hasSupport = n
                                        }
                                    }
                                };
                                s.update();
                                var l = "onwheel"in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
                                Object.prototype.hasOwnProperty.call(s, "hasSupport") ? H(document, l, Fe, {
                                    passive: !0
                                }) : H(document, l, Fe),
                                Xe();
                                var f = function(n, e) {
                                    return void 0 === e && (e = Fe),
                                    function(n) {
                                        return H(document, n, e)
                                    }
                                };
                                ["click", "mouseup", "mousedown", "mousemove", "keypress", "keydown", "keyup", "touchend", "touchstart"].forEach(f(document)),
                                ["resize", "focus", "blur"].forEach(f(window)),
                                f(window, Ge)("scroll")
                            }
                            if (Ie.enabled && (ue || u)) {
                                zn = c.getTime();
                                var d = void 0;
                                for (d in Ie.configurations) {
                                    var v = Ie.configurations[d];
                                    v && (window.clearInterval(v.activityInterval),
                                    ct(v, t, o))
                                }
                            }
                        }(n)
                    },
                    preservePageViewId: function() {
                        Ce = !0
                    },
                    disableAnonymousTracking: function(n) {
                        f.anonymousTracking = !1,
                        Ke(n),
                        nt(),
                        Te.executeQueue()
                    },
                    enableAnonymousTracking: function(n) {
                        var e;
                        f.anonymousTracking = null === (e = n && (null == n ? void 0 : n.options)) || void 0 === e || e,
                        Ke(n),
                        ye || rt()
                    },
                    clearUserData: $e
                };
                return n(n({}, ft), {
                    id: t,
                    namespace: o,
                    core: Zn,
                    sharedState: l
                })
            }(t, o, c, s, l, f)
              , m = n(n({}, g), {
                addPlugin: function(n) {
                    var e, t;
                    m.core.addPlugin(n),
                    null === (t = (e = n.plugin).activateBrowserPlugin) || void 0 === t || t.call(e, m)
                }
            });
            return p.forEach((function(n) {
                var e;
                null === (e = n.activateBrowserPlugin) || void 0 === e || e.call(n, m)
            }
            )),
            m
        }
        var Tn = {};
        function Cn(n, e) {
            try {
                (t = null != n ? n : Object.keys(Tn),
                On(t, Tn)).forEach(e)
            } catch (n) {
                d.error("Function failed", n)
            }
            var t
        }
        function On(n, e) {
            for (var t = [], r = 0, o = n; r < o.length; r++) {
                var i = o[r];
                e.hasOwnProperty(i) ? t.push(e[i]) : d.warn(i + " not configured")
            }
            return t
        }
        var In = function() {
            this.outQueues = [],
            this.bufferFlushers = [],
            this.hasLoaded = !1,
            this.registeredOnLoadHandlers = []
        };
        function An(n, e) {
            Cn(e, (function(e) {
                e.setOptOutCookie(n)
            }
            ))
        }
        var Pn = "undefined" != typeof window ? function() {
            var n = new In
              , e = document
              , t = window;
            function r() {
                var e;
                if (!n.hasLoaded)
                    for (n.hasLoaded = !0,
                    e = 0; e < n.registeredOnLoadHandlers.length; e++)
                        n.registeredOnLoadHandlers[e]();
                return !0
            }
            return e.visibilityState && H(e, "visibilitychange", (function() {
                "hidden" == e.visibilityState && n.bufferFlushers.forEach((function(n) {
                    n(!1)
                }
                ))
            }
            ), !1),
            H(t, "beforeunload", (function() {
                n.bufferFlushers.forEach((function(n) {
                    n(!1)
                }
                ))
            }
            ), !1),
            "loading" === document.readyState ? (e.addEventListener ? e.addEventListener("DOMContentLoaded", (function n() {
                e.removeEventListener("DOMContentLoaded", n, !1),
                r()
            }
            )) : e.attachEvent && e.attachEvent("onreadystatechange", (function n() {
                "complete" === e.readyState && (e.detachEvent("onreadystatechange", n),
                r())
            }
            )),
            H(t, "load", r, !1)) : r(),
            n
        }() : void 0;
        var En = {}
          , jn = {};
        function Ln(n, e) {
            void 0 === n && (n = {}),
            void 0 === e && (e = Object.keys(En)),
            e.forEach((function(e) {
                En[e] && (En[e].sharedState.hasLoaded ? (_n(n, e),
                Un(e)) : En[e].sharedState.registeredOnLoadHandlers.push((function() {
                    _n(n, e),
                    Un(e)
                }
                )))
            }
            ))
        }
        function Dn(n, e) {
            void 0 === e && (e = Object.keys(En)),
            function(e, t, r) {
                try {
                    On(null != e ? e : Object.keys(t), t).forEach((function(e) {
                        e.core.track(P(n), n.context, n.timestamp)
                    }
                    ))
                } catch (n) {
                    d.error("Function failed", n)
                }
            }(e, En)
        }
        function Bn(n, e, t) {
            for (var r, o, i, a, c, u; null !== (r = e.parentElement) && null != r && "A" !== (o = e.tagName.toUpperCase()) && "AREA" !== o; )
                e = r;
            var s = e;
            if (null != s.href) {
                var l = s.hostname || M(s.href)
                  , f = l.toLowerCase()
                  , d = s.href.replace(l, f);
                new RegExp("^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto):","i").test(d) || (i = s.id,
                a = W(s),
                c = s.target,
                u = jn[n.id].linkTrackingContent ? s.innerHTML : void 0,
                d = unescape(d),
                n.core.track(P({
                    targetUrl: d,
                    elementId: i,
                    elementClasses: a,
                    elementTarget: c,
                    elementContent: u
                }), function(n) {
                    for (var e, t = [], r = 1; r < arguments.length; r++)
                        t[r - 1] = arguments[r];
                    return null !== (e = null == n ? void 0 : n.map((function(n) {
                        if ("function" != typeof n)
                            return n;
                        try {
                            return n.apply(void 0, t)
                        } catch (n) {
                            return
                        }
                    }
                    )).filter(Boolean)) && void 0 !== e ? e : []
                }(t, e)))
            }
        }
        function Nn(n, e) {
            return function(t) {
                var r, o;
                r = (t = t || window.event).which || t.button,
                o = t.target || t.srcElement,
                "click" === t.type ? o && Bn(En[n], o, e) : "mousedown" === t.type ? 1 !== r && 2 !== r || !o ? jn[n].lastButton = jn[n].lastTarget = null : (jn[n].lastButton = r,
                jn[n].lastTarget = o) : "mouseup" === t.type && (r === jn[n].lastButton && o === jn[n].lastTarget && Bn(En[n], o, e),
                jn[n].lastButton = jn[n].lastTarget = null)
            }
        }
        function _n(n, e) {
            var t = void 0 === n ? {} : n
              , r = t.options
              , o = t.pseudoClicks
              , i = t.trackContent
              , a = t.context;
            jn[e] = {
                linkTrackingContent: i,
                linkTrackingContext: a,
                linkTrackingPseudoClicks: o,
                linkTrackingFilter: X(r)
            }
        }
        function Un(n) {
            var e, t, r, o, i, a = document.links;
            for (r = 0; r < a.length; r++)
                (null === (t = (e = jn[n]).linkTrackingFilter) || void 0 === t ? void 0 : t.call(e, a[r])) && !a[r][n] && (o = n,
                i = a[r],
                jn[o].linkTrackingPseudoClicks ? (H(i, "mouseup", Nn(o, jn[o].linkTrackingContext), !1),
                H(i, "mousedown", Nn(o, jn[o].linkTrackingContext), !1)) : H(i, "click", Nn(o, jn[o].linkTrackingContext), !1),
                a[r][n] = !0)
        }
        if (window.ubSnowplowInitialized)
            console.log("Tracker already initialized.");
        else {
            const n = "ubso"
              , e = ()=>{
                window.ub.consent && window.ub.consent.addEventListener("change", (e=>{
                    !0 === e.detail.new.statistics ? (An(""),
                    document.cookie = `${n}=; path=/; SameSite=Lax; Max-Age=0;`) : (An(n),
                    document.cookie = `${n}=1; path=/; SameSite=Lax;`)
                }
                ))
            }
              , t = (()=>{
                const n = window.ub.page.usedAs;
                return ()=>"main" === n
            }
            )()
              , r = ()=>{
                try {
                    return t() ? window.ub : window.parent.ub
                } catch (n) {
                    return
                }
            }
            ;
            (()=>{
                const n = r();
                if (!n || !n.page)
                    return;
                const o = {
                    id: n.page.id,
                    currentId: window.ub.page.id,
                    variantId: n.page.variantId,
                    routingStrategy: n.routingStrategy
                }
                  , i = n=>(n?.href ?? "").indexOf("/clkg/") >= 0
                  , a = (n,e)=>({
                    schema: "js_tracker_context_v1.1.json",
                    data: {
                        pageId: o.id,
                        variantId: o.variantId,
                        eventType: n ?? "",
                        eventMetadata: e ?? [],
                        routingStrategy: o.routingStrategy
                    }
                });
                var c, u, s, l, f;
                o.id && (t() || o.id !== o.currentId) && (s = "sp-ub",
                l = `${document.location.hostname}/_ub`,
                void 0 === (f = {
                    appId: "landing_page",
                    platform: "web",
                    eventMethod: "beacon",
                    postPath: "/i",
                    stateStorageStrategy: "none",
                    plugins: [{
                        activateBrowserPlugin: function(n) {
                            En[n.id] = n
                        }
                    }]
                }) && (f = {}),
                Pn && function(n, e, t, r, o, i) {
                    Tn.hasOwnProperty(n) || (Tn[n] = xn(n, e, t, r, o, i),
                    Tn[n])
                }(s, s, "js-".concat("3.15.0"), l, Pn, f),
                c = n.visitorId,
                Cn(undefined, (function(n) {
                    n.setUserId(c)
                }
                )),
                t() && (u = {
                    context: [a("visit")]
                },
                Cn(void 0, (function(n) {
                    n.trackPageView(u)
                }
                ))),
                window.ub.hooks.afterFormSubmit.push((n=>{
                    const e = n.isConversionGoal ? ["conversion"] : [];
                    !function(n, e) {
                        Cn(void 0, (function(e) {
                            e.core.track(A({
                                event: n.event
                            }), n.context, n.timestamp)
                        }
                        ))
                    }({
                        event: {
                            schema: "iglu:com.snowplowanalytics.snowplow/submit_form/jsonschema/1-0-0",
                            data: {
                                formId: "ub-form"
                            }
                        },
                        context: [a("form-submission", e)]
                    })
                }
                )),
                Ln({
                    options: {
                        filter: i
                    },
                    pseudoClicks: !0,
                    trackContent: !1,
                    context: [a("link-click", ["conversion"])]
                }),
                Ln({
                    options: {
                        filter: n=>!i(n)
                    },
                    pseudoClicks: !0,
                    trackContent: !1,
                    context: [a("link-click")]
                }),
                window.ubSnowplow = (n,e,t,r,o,i,c)=>{
                    let u;
                    u = "boolean" == typeof c ? c ? [a("link-click", ["conversion"])] : [a("link-click")] : c,
                    "trackLinkClick" !== n ? console.log("Unsupported event type.") : Dn({
                        targetUrl: e,
                        elementId: t,
                        elementClasses: r,
                        elementTarget: o,
                        elementContent: i,
                        context: u
                    })
                }
                ,
                e(),
                window.ubSnowplowInitialized = !0)
            }
            )()
        }
    }()
}();
