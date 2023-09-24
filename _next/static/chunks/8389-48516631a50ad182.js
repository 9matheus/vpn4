(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8389],
  {
    86010: function (e, t, n) {
      "use strict";
      function r(e) {
        var t,
          n,
          o = "";
        if ("string" == typeof e || "number" == typeof e) o += e;
        else if ("object" == typeof e)
          if (Array.isArray(e))
            for (t = 0; t < e.length; t++)
              e[t] && (n = r(e[t])) && (o && (o += " "), (o += n));
          else for (t in e) e[t] && (o && (o += " "), (o += t));
        return o;
      }
      t.Z = function () {
        for (var e, t, n = 0, o = ""; n < arguments.length; )
          (e = arguments[n++]) && (t = r(e)) && (o && (o += " "), (o += t));
        return o;
      };
    },
    62705: function (e, t, n) {
      var r = n(55639).Symbol;
      e.exports = r;
    },
    44239: function (e, t, n) {
      var r = n(62705),
        o = n(89607),
        i = n(2333),
        c = r ? r.toStringTag : void 0;
      e.exports = function (e) {
        return null == e
          ? void 0 === e
            ? "[object Undefined]"
            : "[object Null]"
          : c && c in Object(e)
          ? o(e)
          : i(e);
      };
    },
    27561: function (e, t, n) {
      var r = n(67990),
        o = /^\s+/;
      e.exports = function (e) {
        return e ? e.slice(0, r(e) + 1).replace(o, "") : e;
      };
    },
    31957: function (e, t, n) {
      var r = "object" == typeof n.g && n.g && n.g.Object === Object && n.g;
      e.exports = r;
    },
    89607: function (e, t, n) {
      var r = n(62705),
        o = Object.prototype,
        i = o.hasOwnProperty,
        c = o.toString,
        a = r ? r.toStringTag : void 0;
      e.exports = function (e) {
        var t = i.call(e, a),
          n = e[a];
        try {
          e[a] = void 0;
          var r = !0;
        } catch (s) {}
        var o = c.call(e);
        return r && (t ? (e[a] = n) : delete e[a]), o;
      };
    },
    2333: function (e) {
      var t = Object.prototype.toString;
      e.exports = function (e) {
        return t.call(e);
      };
    },
    55639: function (e, t, n) {
      var r = n(31957),
        o = "object" == typeof self && self && self.Object === Object && self,
        i = r || o || Function("return this")();
      e.exports = i;
    },
    67990: function (e) {
      var t = /\s/;
      e.exports = function (e) {
        for (var n = e.length; n-- && t.test(e.charAt(n)); );
        return n;
      };
    },
    23279: function (e, t, n) {
      var r = n(13218),
        o = n(7771),
        i = n(14841),
        c = Math.max,
        a = Math.min;
      e.exports = function (e, t, n) {
        var s,
          l,
          u,
          f,
          d,
          v,
          p = 0,
          h = !1,
          g = !1,
          _ = !0;
        if ("function" != typeof e) throw new TypeError("Expected a function");
        function y(t) {
          var n = s,
            r = l;
          return (s = l = void 0), (p = t), (f = e.apply(r, n));
        }
        function b(e) {
          return (p = e), (d = setTimeout(x, t)), h ? y(e) : f;
        }
        function m(e) {
          var n = e - v;
          return void 0 === v || n >= t || n < 0 || (g && e - p >= u);
        }
        function x() {
          var e = o();
          if (m(e)) return w(e);
          d = setTimeout(
            x,
            (function (e) {
              var n = t - (e - v);
              return g ? a(n, u - (e - p)) : n;
            })(e)
          );
        }
        function w(e) {
          return (d = void 0), _ && s ? y(e) : ((s = l = void 0), f);
        }
        function j() {
          var e = o(),
            n = m(e);
          if (((s = arguments), (l = this), (v = e), n)) {
            if (void 0 === d) return b(v);
            if (g) return clearTimeout(d), (d = setTimeout(x, t)), y(v);
          }
          return void 0 === d && (d = setTimeout(x, t)), f;
        }
        return (
          (t = i(t) || 0),
          r(n) &&
            ((h = !!n.leading),
            (u = (g = "maxWait" in n) ? c(i(n.maxWait) || 0, t) : u),
            (_ = "trailing" in n ? !!n.trailing : _)),
          (j.cancel = function () {
            void 0 !== d && clearTimeout(d), (p = 0), (s = v = l = d = void 0);
          }),
          (j.flush = function () {
            return void 0 === d ? f : w(o());
          }),
          j
        );
      };
    },
    13218: function (e) {
      e.exports = function (e) {
        var t = typeof e;
        return null != e && ("object" == t || "function" == t);
      };
    },
    37005: function (e) {
      e.exports = function (e) {
        return null != e && "object" == typeof e;
      };
    },
    33448: function (e, t, n) {
      var r = n(44239),
        o = n(37005);
      e.exports = function (e) {
        return "symbol" == typeof e || (o(e) && "[object Symbol]" == r(e));
      };
    },
    7771: function (e, t, n) {
      var r = n(55639);
      e.exports = function () {
        return r.Date.now();
      };
    },
    14841: function (e, t, n) {
      var r = n(27561),
        o = n(13218),
        i = n(33448),
        c = /^[-+]0x[0-9a-f]+$/i,
        a = /^0b[01]+$/i,
        s = /^0o[0-7]+$/i,
        l = parseInt;
      e.exports = function (e) {
        if ("number" == typeof e) return e;
        if (i(e)) return NaN;
        if (o(e)) {
          var t = "function" == typeof e.valueOf ? e.valueOf() : e;
          e = o(t) ? t + "" : t;
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = r(e);
        var n = a.test(e);
        return n || s.test(e) ? l(e.slice(2), n ? 2 : 8) : c.test(e) ? NaN : +e;
      };
    },
    95282: function (e, t, n) {
      "use strict";
      var r = n(85893),
        o = n(67294),
        i = n(86010),
        c = n(45697),
        a = n.n(c),
        s = n(81304),
        l = n.n(s),
        u = function (e) {
          var t = e.questions,
            n = e.title,
            c = e.ctaLink,
            a = e.dark,
            s = void 0 !== a && a,
            u = (0, o.useState)(void 0),
            f = u[0],
            d = u[1];
          return (0, r.jsxs)("section", {
            className: (0, i.Z)(l().section, s && l().dark),
            id: "faq",
            children: [
              (0, r.jsx)("h2", { className: l().title, children: n }),
              (0, r.jsx)("div", {
                className: l().questions,
                children: t.map(function (e) {
                  var t = e.id,
                    n = e.question,
                    o = e.answerView;
                  return (0, r.jsx)(
                    "div",
                    {
                      className: ""
                        .concat(l().entry, " ")
                        .concat(f === t ? l().entryOpened : ""),
                      children: (0, r.jsxs)("button", {
                        className: l().entryBody,
                        onClick: function () {
                          return (function (e) {
                            d(e === f ? void 0 : e);
                          })(t);
                        },
                        children: [
                          (0, r.jsxs)("div", {
                            className: l().entryQuestion,
                            children: [
                              (0, r.jsx)("span", { children: n }),
                              (0, r.jsx)("img", {
                                src: s
                                  ? "/images/dropdown-arrow.svg"
                                  : "/images/dropdown-arrow-dark-gray-80.svg",
                                alt: "Show answer toggle",
                                width: "24",
                                height: "14",
                                className: ""
                                  .concat(l().entryQuestionArrow, " ")
                                  .concat(
                                    f === t ? l().entryQuestionArrowOpen : ""
                                  ),
                              }),
                            ],
                          }),
                          (0, r.jsx)("div", {
                            className: ""
                              .concat(l().entryAnswer, " ")
                              .concat(f === t ? l().entryAnswerOpen : ""),
                            children: o(c),
                          }),
                        ],
                      }),
                    },
                    t
                  );
                }),
              }),
            ],
          });
        };
      (u.propTypes = {
        questions: a().arrayOf(
          a().shape({
            id: a().oneOfType([a().number, a().string]).isRequired,
            question: a().string.isRequired,
            answerView: a().node.isRequired,
          })
        ).isRequired,
        title: a().string.isRequired,
        ctaLink: a().string,
      }),
        (t.Z = u);
    },
    22584: function (e, t, n) {
      "use strict";
      var r = n(85893),
        o = n(67294),
        i = n(45697);
      function c(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      function a(e, t) {
        if (null == e) return {};
        var n,
          r,
          o = (function (e, t) {
            if (null == e) return {};
            var n,
              r,
              o = {},
              i = Object.keys(e);
            for (r = 0; r < i.length; r++)
              (n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
            return o;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(e);
          for (r = 0; r < i.length; r++)
            (n = i[r]),
              t.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) &&
                  (o[n] = e[n]));
        }
        return o;
      }
      var s = function (e) {
        var t = e.href,
          n = e.children,
          i = a(e, ["href", "children"]),
          s = (0, o.useState)(),
          l = s[0],
          u = s[1];
        return (
          (0, o.useEffect)(
            function () {
              var e = new URLSearchParams(window.location.search);
              e.toString().length > 0
                ? u(
                    ""
                      .concat(t)
                      .concat(t.includes("?") ? "&" : "?")
                      .concat(e.toString())
                  )
                : u(t);
            },
            [t]
          ),
          (0, r.jsx)(
            "a",
            (function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {},
                  r = Object.keys(n);
                "function" === typeof Object.getOwnPropertySymbols &&
                  (r = r.concat(
                    Object.getOwnPropertySymbols(n).filter(function (e) {
                      return Object.getOwnPropertyDescriptor(n, e).enumerable;
                    })
                  )),
                  r.forEach(function (t) {
                    c(e, t, n[t]);
                  });
              }
              return e;
            })({ href: l }, i, { children: n })
          )
        );
      };
      (s.propTypes = { href: n.n(i)().string.isRequired }), (t.Z = s);
    },
    18940: function (e, t, n) {
      "use strict";
      var r = n(85893),
        o = n(67294),
        i = n(23279),
        c = n.n(i),
        a = n(45697),
        s = n.n(a),
        l = n(36617),
        u = n(44386),
        f = n.n(u),
        d = [
          { text: "Blog", href: "/blog/" },
          { text: "Apps", href: "/apps/" },
          { text: "Support", href: "https://support.clearvpn.com/hc/en-us" },
          {
            text: "My account",
            href: "https://my.clearvpn.com/",
            target: "_blank",
          },
        ],
        v = function (e) {
          var t = e.links,
            n = void 0 === t ? d : t,
            i = e.getServiceHref,
            a = void 0 === i ? "/apps/" : i,
            s = e.getServiceText,
            u = void 0 === s ? "Get ClearVPN" : s,
            v = e.mainButtonComponent,
            p = void 0 === v ? null : v,
            h = e.hideGetService,
            g = void 0 !== h && h,
            _ = e.unclickableLogo,
            y = void 0 !== _ && _,
            b = e.logoHref,
            m = void 0 === b ? "/" : b,
            x = e.whiteLogo,
            w = void 0 !== x && x,
            j = e.isSticky,
            S = void 0 !== j && j,
            k = e.dark,
            O = void 0 !== k && k,
            A = e.className,
            F = void 0 === A ? "" : A,
            N = e.isRelative,
            Q = void 0 !== N && N,
            T = (0, o.useState)(!1),
            C = T[0],
            q = T[1],
            H = (0, o.useState)(!0),
            M = H[0],
            P = H[1];
          return (
            (0, o.useEffect)(function () {
              if (S) {
                var e = function () {
                  window.pageYOffset < 120 ? P(!0) : P(!1);
                };
                e();
                var t = c()(e, 100);
                return (
                  window.addEventListener("scroll", t),
                  function () {
                    return window.removeEventListener("scroll", t);
                  }
                );
              }
            }, []),
            (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsx)("header", {
                  className: ""
                    .concat(f().header, " ")
                    .concat(F, " ")
                    .concat(M && !Q ? f().static : "", " ")
                    .concat(O ? f().dark : "", " ")
                    .concat(Q ? f().relative : ""),
                  children: (0, r.jsxs)("div", {
                    className: f().container,
                    children: [
                      y
                        ? (0, r.jsx)(l.Z, {
                            path: w
                              ? "/images/logo/logo-horizontal-white"
                              : "/images/logo/logo-horizontal",
                            width: "116",
                            height: "32",
                            alt: "ClearVPN logo",
                          })
                        : (0, r.jsx)("a", {
                            href: m,
                            children: (0, r.jsx)(l.Z, {
                              path: w
                                ? "/images/logo/logo-horizontal-white"
                                : "/images/logo/logo-horizontal",
                              width: "116",
                              height: "32",
                              alt: "ClearVPN logo",
                            }),
                          }),
                      (n.length > 0 || !g) &&
                        (0, r.jsxs)(r.Fragment, {
                          children: [
                            (0, r.jsx)("button", {
                              className: f().mobileMenuToggle,
                              onClick: function () {
                                return q(!C);
                              },
                              children: (0, r.jsx)("svg", {
                                width: "16",
                                height: "15",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                stroke: "#333",
                                children: (0, r.jsx)("path", {
                                  d: "M0 1.929h16M0 7.929h16M0 13.929h16",
                                  strokeWidth: "2",
                                }),
                              }),
                            }),
                            (0, r.jsxs)("div", {
                              className: ""
                                .concat(f().buttonsBlock, " ")
                                .concat(C ? f().menuShown : ""),
                              children: [
                                n.map(function (e) {
                                  var t = e.text,
                                    n = e.href,
                                    o = e.target,
                                    i = void 0 === o ? "_self" : o,
                                    c = e.onClick,
                                    a = void 0 === c ? void 0 : c;
                                  return (0,
                                  r.jsx)("a", { href: n, target: i, rel: "_blank" === i ? "noreferrer" : "", onClick: a, children: t }, t);
                                }),
                                !g &&
                                  (p ||
                                    (0, r.jsx)("a", {
                                      href: a,
                                      className: f().getService,
                                      children: u,
                                    })),
                              ],
                            }),
                          ],
                        }),
                    ],
                  }),
                }),
                (0, r.jsx)("button", {
                  className: ""
                    .concat(f().backdropCover, " ")
                    .concat(C ? f().backdropCoverActive : ""),
                  onClick: function () {
                    return q(!1);
                  },
                }),
                (0, r.jsx)("div", {
                  className: M ? "" : f().headerPlaceholder,
                }),
              ],
            })
          );
        };
      (v.propTypes = {
        links: s().arrayOf(
          s().shape({
            text: s().string.isRequired,
            href: s().string.isRequired,
            target: s().string,
          })
        ),
        getServiceHref: s().string,
        getServiceText: s().string,
        hideGetService: s().bool,
        unclickableLogo: s().bool,
        whiteLogo: s().bool,
        isSticky: s().bool,
        className: s().string,
        isRelative: s().bool,
      }),
        (t.Z = v);
    },
    81304: function (e) {
      e.exports = {
        section: "FAQSection_section__H5TiJ",
        title: "FAQSection_title__LOy9l",
        questions: "FAQSection_questions__vbS3h",
        entry: "FAQSection_entry__55Cf4",
        entryOpened: "FAQSection_entryOpened__bDcR9",
        entryBody: "FAQSection_entryBody__Vy3LC",
        entryQuestion: "FAQSection_entryQuestion__GQEQd",
        entryQuestionArrow: "FAQSection_entryQuestionArrow__lzO_M",
        entryQuestionArrowOpen: "FAQSection_entryQuestionArrowOpen__ny1kl",
        entryAnswer: "FAQSection_entryAnswer__iKSp2",
        entryAnswerOpen: "FAQSection_entryAnswerOpen__YV3Tr",
        dark: "FAQSection_dark__33MXp",
      };
    },
    44386: function (e) {
      e.exports = {
        header: "FullHeader_header__RLffr",
        static: "FullHeader_static__LMReU",
        relative: "FullHeader_relative__iMGBz",
        container: "FullHeader_container__YkQua",
        mobileMenuToggle: "FullHeader_mobileMenuToggle___s_4B",
        buttonsBlock: "FullHeader_buttonsBlock__5qGu1",
        getService: "FullHeader_getService__gaK0H",
        menuShown: "FullHeader_menuShown__xvYD0",
        backdropCover: "FullHeader_backdropCover__0Eeex",
        backdropCoverActive: "FullHeader_backdropCoverActive__l1y47",
        headerPlaceholder: "FullHeader_headerPlaceholder__OpAkn",
        dark: "FullHeader_dark__VYBMW",
      };
    },
  },
]);
