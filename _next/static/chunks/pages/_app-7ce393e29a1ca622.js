(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [2888],
  {
    95659: function (t, e, n) {
      "use strict";
      n.d(e, {
        Gd: function () {
          return f;
        },
        cu: function () {
          return p;
        },
      });
      var r = n(21170),
        i = n(12343),
        o = n(71235),
        s = n(92448),
        a = n(10350),
        c = n(9015);
      const u = "00000000000000000000000000000000",
        l = 100;
      class d {
        __init() {
          this._stack = [{}];
        }
        constructor(t, e = new a.s(), n = 4) {
          (this._version = n),
            d.prototype.__init.call(this),
            (this.getStackTop().scope = e),
            t && this.bindClient(t);
        }
        isOlderThan(t) {
          return this._version < t;
        }
        bindClient(t) {
          (this.getStackTop().client = t),
            t && t.setupIntegrations && t.setupIntegrations();
        }
        pushScope() {
          const t = a.s.clone(this.getScope());
          return (
            this.getStack().push({ client: this.getClient(), scope: t }), t
          );
        }
        popScope() {
          return !(this.getStack().length <= 1) && !!this.getStack().pop();
        }
        withScope(t) {
          const e = this.pushScope();
          try {
            t(e);
          } finally {
            this.popScope();
          }
        }
        getClient() {
          return this.getStackTop().client;
        }
        getScope() {
          return this.getStackTop().scope;
        }
        getStack() {
          return this._stack;
        }
        getStackTop() {
          return this._stack[this._stack.length - 1];
        }
        captureException(t, e) {
          const n = new Error("Sentry syntheticException");
          return (
            (this._lastEventId =
              this._withClient((r, i) =>
                r.captureException(
                  t,
                  { originalException: t, syntheticException: n, ...e },
                  i
                )
              ) || u),
            this._lastEventId
          );
        }
        captureMessage(t, e, n) {
          const r = new Error(t);
          return (
            (this._lastEventId =
              this._withClient((i, o) =>
                i.captureMessage(
                  t,
                  e,
                  { originalException: t, syntheticException: r, ...n },
                  o
                )
              ) || u),
            this._lastEventId
          );
        }
        captureEvent(t, e) {
          const n =
            this._withClient((n, r) => n.captureEvent(t, { ...e }, r)) || u;
          return "transaction" !== t.type && (this._lastEventId = n), n;
        }
        lastEventId() {
          return this._lastEventId;
        }
        addBreadcrumb(t, e) {
          const { scope: n, client: o } = this.getStackTop();
          if (!n || !o) return;
          const { beforeBreadcrumb: s = null, maxBreadcrumbs: a = l } =
            (o.getOptions && o.getOptions()) || {};
          if (a <= 0) return;
          const c = { timestamp: (0, r.yW)(), ...t },
            u = s ? (0, i.Cf)(() => s(c, e)) : c;
          null !== u && n.addBreadcrumb(u, a);
        }
        setUser(t) {
          const e = this.getScope();
          e && e.setUser(t);
        }
        setTags(t) {
          const e = this.getScope();
          e && e.setTags(t);
        }
        setExtras(t) {
          const e = this.getScope();
          e && e.setExtras(t);
        }
        setTag(t, e) {
          const n = this.getScope();
          n && n.setTag(t, e);
        }
        setExtra(t, e) {
          const n = this.getScope();
          n && n.setExtra(t, e);
        }
        setContext(t, e) {
          const n = this.getScope();
          n && n.setContext(t, e);
        }
        configureScope(t) {
          const { scope: e, client: n } = this.getStackTop();
          e && n && t(e);
        }
        run(t) {
          const e = _(this);
          try {
            t(this);
          } finally {
            _(e);
          }
        }
        getIntegration(t) {
          const e = this.getClient();
          if (!e) return null;
          try {
            return e.getIntegration(t);
          } catch (n) {
            return (
              ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                i.kg.warn(
                  `Cannot retrieve integration ${t.id} from the current Hub`
                ),
              null
            );
          }
        }
        startTransaction(t, e) {
          return this._callExtensionMethod("startTransaction", t, e);
        }
        traceHeaders() {
          return this._callExtensionMethod("traceHeaders");
        }
        captureSession(t = !1) {
          if (t) return this.endSession();
          this._sendSessionUpdate();
        }
        endSession() {
          const t = this.getStackTop(),
            e = t && t.scope,
            n = e && e.getSession();
          n && (0, c.RJ)(n), this._sendSessionUpdate(), e && e.setSession();
        }
        startSession(t) {
          const { scope: e, client: n } = this.getStackTop(),
            { release: r, environment: i } = (n && n.getOptions()) || {},
            { userAgent: s } = o.n2.navigator || {},
            a = (0, c.Hv)({
              release: r,
              environment: i,
              ...(e && { user: e.getUser() }),
              ...(s && { userAgent: s }),
              ...t,
            });
          if (e) {
            const t = e.getSession && e.getSession();
            t && "ok" === t.status && (0, c.CT)(t, { status: "exited" }),
              this.endSession(),
              e.setSession(a);
          }
          return a;
        }
        shouldSendDefaultPii() {
          const t = this.getClient(),
            e = t && t.getOptions();
          return Boolean(e && e.sendDefaultPii);
        }
        _sendSessionUpdate() {
          const { scope: t, client: e } = this.getStackTop();
          if (!t) return;
          const n = t.getSession();
          n && e && e.captureSession && e.captureSession(n);
        }
        _withClient(t) {
          const { scope: e, client: n } = this.getStackTop();
          return n && t(n, e);
        }
        _callExtensionMethod(t, ...e) {
          const n = p().__SENTRY__;
          if (n && n.extensions && "function" === typeof n.extensions[t])
            return n.extensions[t].apply(this, e);
          ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
            i.kg.warn(
              `Extension method ${t} couldn't be found, doing nothing.`
            );
        }
      }
      function p() {
        return (
          (o.n2.__SENTRY__ = o.n2.__SENTRY__ || {
            extensions: {},
            hub: void 0,
          }),
          o.n2
        );
      }
      function _(t) {
        const e = p(),
          n = m(e);
        return g(e, t), n;
      }
      function f() {
        const t = p();
        return (
          (h(t) && !m(t).isOlderThan(4)) || g(t, new d()),
          (0, s.KV)()
            ? (function (t) {
                try {
                  const e = p().__SENTRY__,
                    n =
                      e &&
                      e.extensions &&
                      e.extensions.domain &&
                      e.extensions.domain.active;
                  if (!n) return m(t);
                  if (!h(n) || m(n).isOlderThan(4)) {
                    const e = m(t).getStackTop();
                    g(n, new d(e.client, a.s.clone(e.scope)));
                  }
                  return m(n);
                } catch (e) {
                  return m(t);
                }
              })(t)
            : m(t)
        );
      }
      function h(t) {
        return !!(t && t.__SENTRY__ && t.__SENTRY__.hub);
      }
      function m(t) {
        return (0, o.YO)("hub", () => new d(), t);
      }
      function g(t, e) {
        if (!t) return !1;
        return ((t.__SENTRY__ = t.__SENTRY__ || {}).hub = e), !0;
      }
    },
    10350: function (t, e, n) {
      "use strict";
      n.d(e, {
        c: function () {
          return p;
        },
        s: function () {
          return l;
        },
      });
      var r = n(67597),
        i = n(21170),
        o = n(96893),
        s = n(12343),
        a = n(62844),
        c = n(71235),
        u = n(9015);
      class l {
        constructor() {
          (this._notifyingListeners = !1),
            (this._scopeListeners = []),
            (this._eventProcessors = []),
            (this._breadcrumbs = []),
            (this._attachments = []),
            (this._user = {}),
            (this._tags = {}),
            (this._extra = {}),
            (this._contexts = {}),
            (this._sdkProcessingMetadata = {});
        }
        static clone(t) {
          const e = new l();
          return (
            t &&
              ((e._breadcrumbs = [...t._breadcrumbs]),
              (e._tags = { ...t._tags }),
              (e._extra = { ...t._extra }),
              (e._contexts = { ...t._contexts }),
              (e._user = t._user),
              (e._level = t._level),
              (e._span = t._span),
              (e._session = t._session),
              (e._transactionName = t._transactionName),
              (e._fingerprint = t._fingerprint),
              (e._eventProcessors = [...t._eventProcessors]),
              (e._requestSession = t._requestSession),
              (e._attachments = [...t._attachments]),
              (e._sdkProcessingMetadata = { ...t._sdkProcessingMetadata })),
            e
          );
        }
        addScopeListener(t) {
          this._scopeListeners.push(t);
        }
        addEventProcessor(t) {
          return this._eventProcessors.push(t), this;
        }
        setUser(t) {
          return (
            (this._user = t || {}),
            this._session && (0, u.CT)(this._session, { user: t }),
            this._notifyScopeListeners(),
            this
          );
        }
        getUser() {
          return this._user;
        }
        getRequestSession() {
          return this._requestSession;
        }
        setRequestSession(t) {
          return (this._requestSession = t), this;
        }
        setTags(t) {
          return (
            (this._tags = { ...this._tags, ...t }),
            this._notifyScopeListeners(),
            this
          );
        }
        setTag(t, e) {
          return (
            (this._tags = { ...this._tags, [t]: e }),
            this._notifyScopeListeners(),
            this
          );
        }
        setExtras(t) {
          return (
            (this._extra = { ...this._extra, ...t }),
            this._notifyScopeListeners(),
            this
          );
        }
        setExtra(t, e) {
          return (
            (this._extra = { ...this._extra, [t]: e }),
            this._notifyScopeListeners(),
            this
          );
        }
        setFingerprint(t) {
          return (this._fingerprint = t), this._notifyScopeListeners(), this;
        }
        setLevel(t) {
          return (this._level = t), this._notifyScopeListeners(), this;
        }
        setTransactionName(t) {
          return (
            (this._transactionName = t), this._notifyScopeListeners(), this
          );
        }
        setContext(t, e) {
          return (
            null === e ? delete this._contexts[t] : (this._contexts[t] = e),
            this._notifyScopeListeners(),
            this
          );
        }
        setSpan(t) {
          return (this._span = t), this._notifyScopeListeners(), this;
        }
        getSpan() {
          return this._span;
        }
        getTransaction() {
          const t = this.getSpan();
          return t && t.transaction;
        }
        setSession(t) {
          return (
            t ? (this._session = t) : delete this._session,
            this._notifyScopeListeners(),
            this
          );
        }
        getSession() {
          return this._session;
        }
        update(t) {
          if (!t) return this;
          if ("function" === typeof t) {
            const e = t(this);
            return e instanceof l ? e : this;
          }
          return (
            t instanceof l
              ? ((this._tags = { ...this._tags, ...t._tags }),
                (this._extra = { ...this._extra, ...t._extra }),
                (this._contexts = { ...this._contexts, ...t._contexts }),
                t._user &&
                  Object.keys(t._user).length &&
                  (this._user = t._user),
                t._level && (this._level = t._level),
                t._fingerprint && (this._fingerprint = t._fingerprint),
                t._requestSession && (this._requestSession = t._requestSession))
              : (0, r.PO)(t) &&
                ((t = t),
                (this._tags = { ...this._tags, ...t.tags }),
                (this._extra = { ...this._extra, ...t.extra }),
                (this._contexts = { ...this._contexts, ...t.contexts }),
                t.user && (this._user = t.user),
                t.level && (this._level = t.level),
                t.fingerprint && (this._fingerprint = t.fingerprint),
                t.requestSession && (this._requestSession = t.requestSession)),
            this
          );
        }
        clear() {
          return (
            (this._breadcrumbs = []),
            (this._tags = {}),
            (this._extra = {}),
            (this._user = {}),
            (this._contexts = {}),
            (this._level = void 0),
            (this._transactionName = void 0),
            (this._fingerprint = void 0),
            (this._requestSession = void 0),
            (this._span = void 0),
            (this._session = void 0),
            this._notifyScopeListeners(),
            (this._attachments = []),
            this
          );
        }
        addBreadcrumb(t, e) {
          const n = "number" === typeof e ? e : 100;
          if (n <= 0) return this;
          const r = { timestamp: (0, i.yW)(), ...t };
          return (
            (this._breadcrumbs = [...this._breadcrumbs, r].slice(-n)),
            this._notifyScopeListeners(),
            this
          );
        }
        clearBreadcrumbs() {
          return (this._breadcrumbs = []), this._notifyScopeListeners(), this;
        }
        addAttachment(t) {
          return this._attachments.push(t), this;
        }
        getAttachments() {
          return this._attachments;
        }
        clearAttachments() {
          return (this._attachments = []), this;
        }
        applyToEvent(t, e = {}) {
          if (
            (this._extra &&
              Object.keys(this._extra).length &&
              (t.extra = { ...this._extra, ...t.extra }),
            this._tags &&
              Object.keys(this._tags).length &&
              (t.tags = { ...this._tags, ...t.tags }),
            this._user &&
              Object.keys(this._user).length &&
              (t.user = { ...this._user, ...t.user }),
            this._contexts &&
              Object.keys(this._contexts).length &&
              (t.contexts = { ...this._contexts, ...t.contexts }),
            this._level && (t.level = this._level),
            this._transactionName && (t.transaction = this._transactionName),
            this._span)
          ) {
            t.contexts = { trace: this._span.getTraceContext(), ...t.contexts };
            const e = this._span.transaction && this._span.transaction.name;
            e && (t.tags = { transaction: e, ...t.tags });
          }
          return (
            this._applyFingerprint(t),
            (t.breadcrumbs = [...(t.breadcrumbs || []), ...this._breadcrumbs]),
            (t.breadcrumbs = t.breadcrumbs.length > 0 ? t.breadcrumbs : void 0),
            (t.sdkProcessingMetadata = {
              ...t.sdkProcessingMetadata,
              ...this._sdkProcessingMetadata,
            }),
            this._notifyEventProcessors(
              [...d(), ...this._eventProcessors],
              t,
              e
            )
          );
        }
        setSDKProcessingMetadata(t) {
          return (
            (this._sdkProcessingMetadata = {
              ...this._sdkProcessingMetadata,
              ...t,
            }),
            this
          );
        }
        _notifyEventProcessors(t, e, n, i = 0) {
          return new o.cW((o, a) => {
            const c = t[i];
            if (null === e || "function" !== typeof c) o(e);
            else {
              const u = c({ ...e }, n);
              ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                c.id &&
                null === u &&
                s.kg.log(`Event processor "${c.id}" dropped event`),
                (0, r.J8)(u)
                  ? u
                      .then((e) =>
                        this._notifyEventProcessors(t, e, n, i + 1).then(o)
                      )
                      .then(null, a)
                  : this._notifyEventProcessors(t, u, n, i + 1)
                      .then(o)
                      .then(null, a);
            }
          });
        }
        _notifyScopeListeners() {
          this._notifyingListeners ||
            ((this._notifyingListeners = !0),
            this._scopeListeners.forEach((t) => {
              t(this);
            }),
            (this._notifyingListeners = !1));
        }
        _applyFingerprint(t) {
          (t.fingerprint = t.fingerprint ? (0, a.lE)(t.fingerprint) : []),
            this._fingerprint &&
              (t.fingerprint = t.fingerprint.concat(this._fingerprint)),
            t.fingerprint && !t.fingerprint.length && delete t.fingerprint;
        }
      }
      function d() {
        return (0, c.YO)("globalEventProcessors", () => []);
      }
      function p(t) {
        d().push(t);
      }
    },
    9015: function (t, e, n) {
      "use strict";
      n.d(e, {
        CT: function () {
          return a;
        },
        Hv: function () {
          return s;
        },
        RJ: function () {
          return c;
        },
      });
      var r = n(21170),
        i = n(62844),
        o = n(20535);
      function s(t) {
        const e = (0, r.ph)(),
          n = {
            sid: (0, i.DM)(),
            init: !0,
            timestamp: e,
            started: e,
            duration: 0,
            status: "ok",
            errors: 0,
            ignoreDuration: !1,
            toJSON: () =>
              (function (t) {
                return (0, o.Jr)({
                  sid: `${t.sid}`,
                  init: t.init,
                  started: new Date(1e3 * t.started).toISOString(),
                  timestamp: new Date(1e3 * t.timestamp).toISOString(),
                  status: t.status,
                  errors: t.errors,
                  did:
                    "number" === typeof t.did || "string" === typeof t.did
                      ? `${t.did}`
                      : void 0,
                  duration: t.duration,
                  attrs: {
                    release: t.release,
                    environment: t.environment,
                    ip_address: t.ipAddress,
                    user_agent: t.userAgent,
                  },
                });
              })(n),
          };
        return t && a(n, t), n;
      }
      function a(t, e = {}) {
        if (
          (e.user &&
            (!t.ipAddress &&
              e.user.ip_address &&
              (t.ipAddress = e.user.ip_address),
            t.did ||
              e.did ||
              (t.did = e.user.id || e.user.email || e.user.username)),
          (t.timestamp = e.timestamp || (0, r.ph)()),
          e.ignoreDuration && (t.ignoreDuration = e.ignoreDuration),
          e.sid && (t.sid = 32 === e.sid.length ? e.sid : (0, i.DM)()),
          void 0 !== e.init && (t.init = e.init),
          !t.did && e.did && (t.did = `${e.did}`),
          "number" === typeof e.started && (t.started = e.started),
          t.ignoreDuration)
        )
          t.duration = void 0;
        else if ("number" === typeof e.duration) t.duration = e.duration;
        else {
          const e = t.timestamp - t.started;
          t.duration = e >= 0 ? e : 0;
        }
        e.release && (t.release = e.release),
          e.environment && (t.environment = e.environment),
          !t.ipAddress && e.ipAddress && (t.ipAddress = e.ipAddress),
          !t.userAgent && e.userAgent && (t.userAgent = e.userAgent),
          "number" === typeof e.errors && (t.errors = e.errors),
          e.status && (t.status = e.status);
      }
      function c(t, e) {
        let n = {};
        e
          ? (n = { status: e })
          : "ok" === t.status && (n = { status: "exited" }),
          a(t, n);
      }
    },
    62758: function (t, e, n) {
      "use strict";
      n.d(e, {
        ro: function () {
          return m;
        },
        lb: function () {
          return h;
        },
      });
      var r = n(95659),
        i = n(12343),
        o = n(67597),
        s = n(92448),
        a = n(9732),
        c = n(63233);
      function u() {
        const t = (0, c.x1)();
        if (t) {
          const e = "internal_error";
          ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
            i.kg.log(`[Tracing] Transaction: ${e} -> Global error occured`),
            t.setStatus(e);
        }
      }
      var l = n(16458),
        d = n(33391);
      function p() {
        const t = this.getScope();
        if (t) {
          const e = t.getSpan();
          if (e) return { "sentry-trace": e.toTraceparent() };
        }
        return {};
      }
      function _(t, e, n) {
        if (!(0, c.zu)(e)) return (t.sampled = !1), t;
        if (void 0 !== t.sampled)
          return t.setMetadata({ sampleRate: Number(t.sampled) }), t;
        let r;
        return (
          "function" === typeof e.tracesSampler
            ? ((r = e.tracesSampler(n)),
              t.setMetadata({ sampleRate: Number(r) }))
            : void 0 !== n.parentSampled
            ? (r = n.parentSampled)
            : ((r = e.tracesSampleRate),
              t.setMetadata({ sampleRate: Number(r) })),
          (function (t) {
            if (
              (0, o.i2)(t) ||
              ("number" !== typeof t && "boolean" !== typeof t)
            )
              return (
                ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                  i.kg.warn(
                    `[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(
                      t
                    )} of type ${JSON.stringify(typeof t)}.`
                  ),
                !1
              );
            if (t < 0 || t > 1)
              return (
                ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                  i.kg.warn(
                    `[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got ${t}.`
                  ),
                !1
              );
            return !0;
          })(r)
            ? r
              ? ((t.sampled = Math.random() < r),
                t.sampled
                  ? (("undefined" === typeof __SENTRY_DEBUG__ ||
                      __SENTRY_DEBUG__) &&
                      i.kg.log(
                        `[Tracing] starting ${t.op} transaction - ${t.name}`
                      ),
                    t)
                  : (("undefined" === typeof __SENTRY_DEBUG__ ||
                      __SENTRY_DEBUG__) &&
                      i.kg.log(
                        `[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
                          r
                        )})`
                      ),
                    t))
              : (("undefined" === typeof __SENTRY_DEBUG__ ||
                  __SENTRY_DEBUG__) &&
                  i.kg.log(
                    "[Tracing] Discarding transaction because " +
                      ("function" === typeof e.tracesSampler
                        ? "tracesSampler returned 0 or false"
                        : "a negative sampling decision was inherited or tracesSampleRate is set to 0")
                  ),
                (t.sampled = !1),
                t)
            : (("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                i.kg.warn(
                  "[Tracing] Discarding transaction because of invalid sample rate."
                ),
              (t.sampled = !1),
              t)
        );
      }
      function f(t, e) {
        const n = this.getClient(),
          r = (n && n.getOptions()) || {},
          o = r.instrumenter || "sentry",
          s = t.instrumenter || "sentry";
        o !== s &&
          (("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
            i.kg.error(
              `A transaction was started with instrumenter=\`${s}\`, but the SDK is configured with the \`${o}\` instrumenter.\nThe transaction will not be sampled. Please use the ${o} instrumentation to start transactions.`
            ),
          (t.sampled = !1));
        let a = new d.Y(t, this);
        return (
          (a = _(a, r, {
            parentSampled: t.parentSampled,
            transactionContext: t,
            ...e,
          })),
          a.sampled &&
            a.initSpanRecorder(r._experiments && r._experiments.maxSpans),
          a
        );
      }
      function h(t, e, n, r, i, o, s) {
        const a = t.getClient(),
          c = (a && a.getOptions()) || {};
        let u = new l.io(e, t, n, r, s, i);
        return (
          (u = _(u, c, {
            parentSampled: e.parentSampled,
            transactionContext: e,
            ...o,
          })),
          u.sampled &&
            u.initSpanRecorder(c._experiments && c._experiments.maxSpans),
          u
        );
      }
      function m() {
        !(function () {
          const t = (0, r.cu)();
          t.__SENTRY__ &&
            ((t.__SENTRY__.extensions = t.__SENTRY__.extensions || {}),
            t.__SENTRY__.extensions.startTransaction ||
              (t.__SENTRY__.extensions.startTransaction = f),
            t.__SENTRY__.extensions.traceHeaders ||
              (t.__SENTRY__.extensions.traceHeaders = p));
        })(),
          (0, s.KV)() &&
            (function () {
              const e = (0, r.cu)();
              if (!e.__SENTRY__) return;
              const n = {
                  mongodb: () =>
                    new ((0, s.l$)(t, "./integrations/node/mongo").Mongo)(),
                  mongoose: () =>
                    new ((0, s.l$)(t, "./integrations/node/mongo").Mongo)({
                      mongoose: !0,
                    }),
                  mysql: () =>
                    new ((0, s.l$)(t, "./integrations/node/mysql").Mysql)(),
                  pg: () =>
                    new ((0, s.l$)(
                      t,
                      "./integrations/node/postgres"
                    ).Postgres)(),
                },
                i = Object.keys(n)
                  .filter((t) => !!(0, s.$y)(t))
                  .map((t) => {
                    try {
                      return n[t]();
                    } catch (e) {
                      return;
                    }
                  })
                  .filter((t) => t);
              i.length > 0 &&
                (e.__SENTRY__.integrations = [
                  ...(e.__SENTRY__.integrations || []),
                  ...i,
                ]);
            })(),
          (0, a.o)("error", u),
          (0, a.o)("unhandledrejection", u);
      }
      t = n.hmd(t);
    },
    16458: function (t, e, n) {
      "use strict";
      n.d(e, {
        hd: function () {
          return u;
        },
        io: function () {
          return d;
        },
        mg: function () {
          return c;
        },
        nT: function () {
          return a;
        },
      });
      var r = n(21170),
        i = n(12343),
        o = n(55334),
        s = n(33391);
      const a = 1e3,
        c = 3e4,
        u = 5e3;
      class l extends o.gB {
        constructor(t, e, n, r) {
          super(r),
            (this._pushActivity = t),
            (this._popActivity = e),
            (this.transactionSpanId = n);
        }
        add(t) {
          t.spanId !== this.transactionSpanId &&
            ((t.finish = (e) => {
              (t.endTimestamp = "number" === typeof e ? e : (0, r._I)()),
                this._popActivity(t.spanId);
            }),
            void 0 === t.endTimestamp && this._pushActivity(t.spanId)),
            super.add(t);
        }
      }
      class d extends s.Y {
        __init() {
          this.activities = {};
        }
        __init2() {
          this._heartbeatCounter = 0;
        }
        __init3() {
          this._finished = !1;
        }
        __init4() {
          this._beforeFinishCallbacks = [];
        }
        constructor(t, e, n = a, r = c, o = u, s = !1) {
          super(t, e),
            (this._idleHub = e),
            (this._idleTimeout = n),
            (this._finalTimeout = r),
            (this._heartbeatInterval = o),
            (this._onScope = s),
            d.prototype.__init.call(this),
            d.prototype.__init2.call(this),
            d.prototype.__init3.call(this),
            d.prototype.__init4.call(this),
            s &&
              (p(e),
              ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                i.kg.log(
                  `Setting idle transaction on scope. Span ID: ${this.spanId}`
                ),
              e.configureScope((t) => t.setSpan(this))),
            this._startIdleTimeout(),
            setTimeout(() => {
              this._finished ||
                (this.setStatus("deadline_exceeded"), this.finish());
            }, this._finalTimeout);
        }
        finish(t = (0, r._I)()) {
          if (
            ((this._finished = !0), (this.activities = {}), this.spanRecorder)
          ) {
            ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              i.kg.log(
                "[Tracing] finishing IdleTransaction",
                new Date(1e3 * t).toISOString(),
                this.op
              );
            for (const e of this._beforeFinishCallbacks) e(this, t);
            (this.spanRecorder.spans = this.spanRecorder.spans.filter((e) => {
              if (e.spanId === this.spanId) return !0;
              e.endTimestamp ||
                ((e.endTimestamp = t),
                e.setStatus("cancelled"),
                ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                  i.kg.log(
                    "[Tracing] cancelling span since transaction ended early",
                    JSON.stringify(e, void 0, 2)
                  ));
              const n = e.startTimestamp < t;
              return (
                n ||
                  (("undefined" === typeof __SENTRY_DEBUG__ ||
                    __SENTRY_DEBUG__) &&
                    i.kg.log(
                      "[Tracing] discarding Span since it happened after Transaction was finished",
                      JSON.stringify(e, void 0, 2)
                    )),
                n
              );
            })),
              ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                i.kg.log("[Tracing] flushing IdleTransaction");
          } else
            ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              i.kg.log("[Tracing] No active IdleTransaction");
          return this._onScope && p(this._idleHub), super.finish(t);
        }
        registerBeforeFinishCallback(t) {
          this._beforeFinishCallbacks.push(t);
        }
        initSpanRecorder(t) {
          if (!this.spanRecorder) {
            const e = (t) => {
                this._finished || this._pushActivity(t);
              },
              n = (t) => {
                this._finished || this._popActivity(t);
              };
            (this.spanRecorder = new l(e, n, this.spanId, t)),
              ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                i.kg.log("Starting heartbeat"),
              this._pingHeartbeat();
          }
          this.spanRecorder.add(this);
        }
        _cancelIdleTimeout() {
          this._idleTimeoutID &&
            (clearTimeout(this._idleTimeoutID), (this._idleTimeoutID = void 0));
        }
        _startIdleTimeout(t) {
          this._cancelIdleTimeout(),
            (this._idleTimeoutID = setTimeout(() => {
              this._finished ||
                0 !== Object.keys(this.activities).length ||
                this.finish(t);
            }, this._idleTimeout));
        }
        _pushActivity(t) {
          this._cancelIdleTimeout(),
            ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              i.kg.log(`[Tracing] pushActivity: ${t}`),
            (this.activities[t] = !0),
            ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              i.kg.log(
                "[Tracing] new activities count",
                Object.keys(this.activities).length
              );
        }
        _popActivity(t) {
          if (
            (this.activities[t] &&
              (("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                i.kg.log(`[Tracing] popActivity ${t}`),
              delete this.activities[t],
              ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                i.kg.log(
                  "[Tracing] new activities count",
                  Object.keys(this.activities).length
                )),
            0 === Object.keys(this.activities).length)
          ) {
            const t = (0, r._I)() + this._idleTimeout / 1e3;
            this._startIdleTimeout(t);
          }
        }
        _beat() {
          if (this._finished) return;
          const t = Object.keys(this.activities).join("");
          t === this._prevHeartbeatString
            ? this._heartbeatCounter++
            : (this._heartbeatCounter = 1),
            (this._prevHeartbeatString = t),
            this._heartbeatCounter >= 3
              ? (("undefined" === typeof __SENTRY_DEBUG__ ||
                  __SENTRY_DEBUG__) &&
                  i.kg.log(
                    "[Tracing] Transaction finished because of no change for 3 heart beats"
                  ),
                this.setStatus("deadline_exceeded"),
                this.finish())
              : this._pingHeartbeat();
        }
        _pingHeartbeat() {
          ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
            i.kg.log(
              `pinging Heartbeat -> current counter: ${this._heartbeatCounter}`
            ),
            setTimeout(() => {
              this._beat();
            }, this._heartbeatInterval);
        }
      }
      function p(t) {
        const e = t.getScope();
        if (e) {
          e.getTransaction() && e.setSpan(void 0);
        }
      }
    },
    55334: function (t, e, n) {
      "use strict";
      n.d(e, {
        Dr: function () {
          return u;
        },
        gB: function () {
          return c;
        },
      });
      var r = n(45375),
        i = n(62844),
        o = n(21170),
        s = n(12343),
        a = n(20535);
      class c {
        __init() {
          this.spans = [];
        }
        constructor(t = 1e3) {
          c.prototype.__init.call(this), (this._maxlen = t);
        }
        add(t) {
          this.spans.length > this._maxlen
            ? (t.spanRecorder = void 0)
            : this.spans.push(t);
        }
      }
      class u {
        __init2() {
          this.traceId = (0, i.DM)();
        }
        __init3() {
          this.spanId = (0, i.DM)().substring(16);
        }
        __init4() {
          this.startTimestamp = (0, o._I)();
        }
        __init5() {
          this.tags = {};
        }
        __init6() {
          this.data = {};
        }
        __init7() {
          this.instrumenter = "sentry";
        }
        constructor(t) {
          if (
            (u.prototype.__init2.call(this),
            u.prototype.__init3.call(this),
            u.prototype.__init4.call(this),
            u.prototype.__init5.call(this),
            u.prototype.__init6.call(this),
            u.prototype.__init7.call(this),
            !t)
          )
            return this;
          t.traceId && (this.traceId = t.traceId),
            t.spanId && (this.spanId = t.spanId),
            t.parentSpanId && (this.parentSpanId = t.parentSpanId),
            "sampled" in t && (this.sampled = t.sampled),
            t.op && (this.op = t.op),
            t.description && (this.description = t.description),
            t.data && (this.data = t.data),
            t.tags && (this.tags = t.tags),
            t.status && (this.status = t.status),
            t.startTimestamp && (this.startTimestamp = t.startTimestamp),
            t.endTimestamp && (this.endTimestamp = t.endTimestamp),
            t.instrumenter && (this.instrumenter = t.instrumenter);
        }
        startChild(t) {
          const e = new u({
            ...t,
            parentSpanId: this.spanId,
            sampled: this.sampled,
            traceId: this.traceId,
          });
          if (
            ((e.spanRecorder = this.spanRecorder),
            e.spanRecorder && e.spanRecorder.add(e),
            (e.transaction = this.transaction),
            ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              e.transaction)
          ) {
            const n = `[Tracing] Starting '${
              (t && t.op) || "< unknown op >"
            }' span on transaction '${
              e.transaction.name || "< unknown name >"
            }' (${e.transaction.spanId}).`;
            (e.transaction.metadata.spanMetadata[e.spanId] = { logMessage: n }),
              s.kg.log(n);
          }
          return e;
        }
        setTag(t, e) {
          return (this.tags = { ...this.tags, [t]: e }), this;
        }
        setData(t, e) {
          return (this.data = { ...this.data, [t]: e }), this;
        }
        setStatus(t) {
          return (this.status = t), this;
        }
        setHttpStatus(t) {
          this.setTag("http.status_code", String(t));
          const e = (function (t) {
            if (t < 400 && t >= 100) return "ok";
            if (t >= 400 && t < 500)
              switch (t) {
                case 401:
                  return "unauthenticated";
                case 403:
                  return "permission_denied";
                case 404:
                  return "not_found";
                case 409:
                  return "already_exists";
                case 413:
                  return "failed_precondition";
                case 429:
                  return "resource_exhausted";
                default:
                  return "invalid_argument";
              }
            if (t >= 500 && t < 600)
              switch (t) {
                case 501:
                  return "unimplemented";
                case 503:
                  return "unavailable";
                case 504:
                  return "deadline_exceeded";
                default:
                  return "internal_error";
              }
            return "unknown_error";
          })(t);
          return "unknown_error" !== e && this.setStatus(e), this;
        }
        isSuccess() {
          return "ok" === this.status;
        }
        finish(t) {
          if (
            ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
            this.transaction &&
            this.transaction.spanId !== this.spanId
          ) {
            const { logMessage: t } =
              this.transaction.metadata.spanMetadata[this.spanId];
            t && s.kg.log(t.replace("Starting", "Finishing"));
          }
          this.endTimestamp = "number" === typeof t ? t : (0, o._I)();
        }
        toTraceparent() {
          let t = "";
          return (
            void 0 !== this.sampled && (t = this.sampled ? "-1" : "-0"),
            `${this.traceId}-${this.spanId}${t}`
          );
        }
        toContext() {
          return (0, a.Jr)({
            data: this.data,
            description: this.description,
            endTimestamp: this.endTimestamp,
            op: this.op,
            parentSpanId: this.parentSpanId,
            sampled: this.sampled,
            spanId: this.spanId,
            startTimestamp: this.startTimestamp,
            status: this.status,
            tags: this.tags,
            traceId: this.traceId,
          });
        }
        updateWithContext(t) {
          return (
            (this.data = (0, r.h)(t.data, () => ({}))),
            (this.description = t.description),
            (this.endTimestamp = t.endTimestamp),
            (this.op = t.op),
            (this.parentSpanId = t.parentSpanId),
            (this.sampled = t.sampled),
            (this.spanId = (0, r.h)(t.spanId, () => this.spanId)),
            (this.startTimestamp = (0, r.h)(
              t.startTimestamp,
              () => this.startTimestamp
            )),
            (this.status = t.status),
            (this.tags = (0, r.h)(t.tags, () => ({}))),
            (this.traceId = (0, r.h)(t.traceId, () => this.traceId)),
            this
          );
        }
        getTraceContext() {
          return (0, a.Jr)({
            data: Object.keys(this.data).length > 0 ? this.data : void 0,
            description: this.description,
            op: this.op,
            parent_span_id: this.parentSpanId,
            span_id: this.spanId,
            status: this.status,
            tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
            trace_id: this.traceId,
          });
        }
        toJSON() {
          return (0, a.Jr)({
            data: Object.keys(this.data).length > 0 ? this.data : void 0,
            description: this.description,
            op: this.op,
            parent_span_id: this.parentSpanId,
            span_id: this.spanId,
            start_timestamp: this.startTimestamp,
            status: this.status,
            tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
            timestamp: this.endTimestamp,
            trace_id: this.traceId,
          });
        }
      }
    },
    33391: function (t, e, n) {
      "use strict";
      n.d(e, {
        Y: function () {
          return u;
        },
      });
      var r = n(45375),
        i = n(95659),
        o = n(21170),
        s = n(12343),
        a = n(20535),
        c = n(55334);
      class u extends c.Dr {
        __init() {
          this._measurements = {};
        }
        __init2() {
          this._contexts = {};
        }
        __init3() {
          this._frozenDynamicSamplingContext = void 0;
        }
        constructor(t, e) {
          super(t),
            u.prototype.__init.call(this),
            u.prototype.__init2.call(this),
            u.prototype.__init3.call(this),
            (this._hub = e || (0, i.Gd)()),
            (this._name = t.name || ""),
            (this.metadata = {
              source: "custom",
              ...t.metadata,
              spanMetadata: {},
              changes: [],
              propagations: 0,
            }),
            (this._trimEnd = t.trimEnd),
            (this.transaction = this);
          const n = this.metadata.dynamicSamplingContext;
          n && (this._frozenDynamicSamplingContext = { ...n });
        }
        get name() {
          return this._name;
        }
        set name(t) {
          this.setName(t);
        }
        setName(t, e = "custom") {
          (t === this.name && e === this.metadata.source) ||
            this.metadata.changes.push({
              source: this.metadata.source,
              timestamp: (0, o.ph)(),
              propagations: this.metadata.propagations,
            }),
            (this._name = t),
            (this.metadata.source = e);
        }
        initSpanRecorder(t = 1e3) {
          this.spanRecorder || (this.spanRecorder = new c.gB(t)),
            this.spanRecorder.add(this);
        }
        setContext(t, e) {
          null === e ? delete this._contexts[t] : (this._contexts[t] = e);
        }
        setMeasurement(t, e, n = "") {
          this._measurements[t] = { value: e, unit: n };
        }
        setMetadata(t) {
          this.metadata = { ...this.metadata, ...t };
        }
        finish(t) {
          if (void 0 !== this.endTimestamp) return;
          if (
            (this.name ||
              (("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                s.kg.warn(
                  "Transaction has no name, falling back to `<unlabeled transaction>`."
                ),
              (this.name = "<unlabeled transaction>")),
            super.finish(t),
            !0 !== this.sampled)
          ) {
            ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              s.kg.log(
                "[Tracing] Discarding transaction because its trace was not chosen to be sampled."
              );
            const t = this._hub.getClient();
            return void (
              t && t.recordDroppedEvent("sample_rate", "transaction")
            );
          }
          const e = this.spanRecorder
            ? this.spanRecorder.spans.filter(
                (t) => t !== this && t.endTimestamp
              )
            : [];
          this._trimEnd &&
            e.length > 0 &&
            (this.endTimestamp = e.reduce((t, e) =>
              t.endTimestamp && e.endTimestamp
                ? t.endTimestamp > e.endTimestamp
                  ? t
                  : e
                : t
            ).endTimestamp);
          const n = this.metadata,
            r = {
              contexts: { ...this._contexts, trace: this.getTraceContext() },
              spans: e,
              start_timestamp: this.startTimestamp,
              tags: this.tags,
              timestamp: this.endTimestamp,
              transaction: this.name,
              type: "transaction",
              sdkProcessingMetadata: {
                ...n,
                dynamicSamplingContext: this.getDynamicSamplingContext(),
              },
              ...(n.source && {
                transaction_info: {
                  source: n.source,
                  changes: n.changes,
                  propagations: n.propagations,
                },
              }),
            };
          return (
            Object.keys(this._measurements).length > 0 &&
              (("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                s.kg.log(
                  "[Measurements] Adding measurements to transaction",
                  JSON.stringify(this._measurements, void 0, 2)
                ),
              (r.measurements = this._measurements)),
            ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              s.kg.log(
                `[Tracing] Finishing ${this.op} transaction: ${this.name}.`
              ),
            this._hub.captureEvent(r)
          );
        }
        toContext() {
          const t = super.toContext();
          return (0, a.Jr)({ ...t, name: this.name, trimEnd: this._trimEnd });
        }
        updateWithContext(t) {
          return (
            super.updateWithContext(t),
            (this.name = (0, r.h)(t.name, () => "")),
            (this._trimEnd = t.trimEnd),
            this
          );
        }
        getDynamicSamplingContext() {
          if (this._frozenDynamicSamplingContext)
            return this._frozenDynamicSamplingContext;
          const t = this._hub || (0, i.Gd)(),
            e = t && t.getClient();
          if (!e) return {};
          const { environment: n, release: r } = e.getOptions() || {},
            { publicKey: o } = e.getDsn() || {},
            s = this.metadata.sampleRate,
            c = void 0 !== s ? s.toString() : void 0,
            u = t.getScope(),
            { segment: l } = (u && u.getUser()) || {},
            d = this.metadata.source,
            p = d && "url" !== d ? this.name : void 0;
          return (0, a.Jr)({
            environment: n,
            release: r,
            transaction: p,
            user_segment: l,
            public_key: o,
            trace_id: this.traceId,
            sample_rate: c,
          });
        }
      }
    },
    63233: function (t, e, n) {
      "use strict";
      n.d(e, {
        XL: function () {
          return s;
        },
        x1: function () {
          return o;
        },
        zu: function () {
          return i;
        },
      });
      var r = n(95659);
      function i(t) {
        const e = (0, r.Gd)().getClient(),
          n = t || (e && e.getOptions());
        return !!n && ("tracesSampleRate" in n || "tracesSampler" in n);
      }
      function o(t) {
        const e = (t || (0, r.Gd)()).getScope();
        return e && e.getTransaction();
      }
      function s(t) {
        return t / 1e3;
      }
    },
    58464: function (t, e, n) {
      "use strict";
      n.d(e, {
        Rt: function () {
          return o;
        },
        l4: function () {
          return a;
        },
        qT: function () {
          return c;
        },
      });
      var r = n(67597);
      const i = (0, n(71235).Rf)();
      function o(t, e) {
        try {
          let n = t;
          const r = 5,
            i = 80,
            o = [];
          let a = 0,
            c = 0;
          const u = " > ",
            l = u.length;
          let d;
          for (
            ;
            n &&
            a++ < r &&
            ((d = s(n, e)),
            !("html" === d || (a > 1 && c + o.length * l + d.length >= i)));

          )
            o.push(d), (c += d.length), (n = n.parentNode);
          return o.reverse().join(u);
        } catch (n) {
          return "<unknown>";
        }
      }
      function s(t, e) {
        const n = t,
          i = [];
        let o, s, a, c, u;
        if (!n || !n.tagName) return "";
        i.push(n.tagName.toLowerCase());
        const l =
          e && e.length
            ? e
                .filter((t) => n.getAttribute(t))
                .map((t) => [t, n.getAttribute(t)])
            : null;
        if (l && l.length)
          l.forEach((t) => {
            i.push(`[${t[0]}="${t[1]}"]`);
          });
        else if (
          (n.id && i.push(`#${n.id}`), (o = n.className), o && (0, r.HD)(o))
        )
          for (s = o.split(/\s+/), u = 0; u < s.length; u++) i.push(`.${s[u]}`);
        const d = ["type", "name", "title", "alt"];
        for (u = 0; u < d.length; u++)
          (a = d[u]), (c = n.getAttribute(a)), c && i.push(`[${a}="${c}"]`);
        return i.join("");
      }
      function a() {
        try {
          return i.document.location.href;
        } catch (t) {
          return "";
        }
      }
      function c(t) {
        return i.document && i.document.querySelector
          ? i.document.querySelector(t)
          : null;
      }
    },
    45375: function (t, e, n) {
      "use strict";
      function r(t, e) {
        return null != t ? t : e();
      }
      n.d(e, {
        h: function () {
          return r;
        },
      });
    },
    9732: function (t, e, n) {
      "use strict";
      n.d(e, {
        o: function () {
          return p;
        },
      });
      var r = n(67597),
        i = n(12343),
        o = n(20535),
        s = n(30360),
        a = n(8823);
      const c = (0, n(71235).Rf)(),
        u = {},
        l = {};
      function d(t) {
        if (!l[t])
          switch (((l[t] = !0), t)) {
            case "console":
              !(function () {
                if (!("console" in c)) return;
                i.RU.forEach(function (t) {
                  t in c.console &&
                    (0, o.hl)(c.console, t, function (e) {
                      return function (...n) {
                        _("console", { args: n, level: t }),
                          e && e.apply(c.console, n);
                      };
                    });
                });
              })();
              break;
            case "dom":
              !(function () {
                if (!("document" in c)) return;
                const t = _.bind(null, "dom"),
                  e = v(t, !0);
                c.document.addEventListener("click", e, !1),
                  c.document.addEventListener("keypress", e, !1),
                  ["EventTarget", "Node"].forEach((e) => {
                    const n = c[e] && c[e].prototype;
                    n &&
                      n.hasOwnProperty &&
                      n.hasOwnProperty("addEventListener") &&
                      ((0, o.hl)(n, "addEventListener", function (e) {
                        return function (n, r, i) {
                          if ("click" === n || "keypress" == n)
                            try {
                              const r = this,
                                o = (r.__sentry_instrumentation_handlers__ =
                                  r.__sentry_instrumentation_handlers__ || {}),
                                s = (o[n] = o[n] || { refCount: 0 });
                              if (!s.handler) {
                                const r = v(t);
                                (s.handler = r), e.call(this, n, r, i);
                              }
                              s.refCount++;
                            } catch (o) {}
                          return e.call(this, n, r, i);
                        };
                      }),
                      (0, o.hl)(n, "removeEventListener", function (t) {
                        return function (e, n, r) {
                          if ("click" === e || "keypress" == e)
                            try {
                              const n = this,
                                i = n.__sentry_instrumentation_handlers__ || {},
                                o = i[e];
                              o &&
                                (o.refCount--,
                                o.refCount <= 0 &&
                                  (t.call(this, e, o.handler, r),
                                  (o.handler = void 0),
                                  delete i[e]),
                                0 === Object.keys(i).length &&
                                  delete n.__sentry_instrumentation_handlers__);
                            } catch (i) {}
                          return t.call(this, e, n, r);
                        };
                      }));
                  });
              })();
              break;
            case "xhr":
              !(function () {
                if (!("XMLHttpRequest" in c)) return;
                const t = XMLHttpRequest.prototype;
                (0, o.hl)(t, "open", function (t) {
                  return function (...e) {
                    const n = this,
                      i = e[1],
                      s = (n.__sentry_xhr__ = {
                        method: (0, r.HD)(e[0]) ? e[0].toUpperCase() : e[0],
                        url: e[1],
                      });
                    (0, r.HD)(i) &&
                      "POST" === s.method &&
                      i.match(/sentry_key/) &&
                      (n.__sentry_own_request__ = !0);
                    const a = function () {
                      if (4 === n.readyState) {
                        try {
                          s.status_code = n.status;
                        } catch (t) {}
                        _("xhr", {
                          args: e,
                          endTimestamp: Date.now(),
                          startTimestamp: Date.now(),
                          xhr: n,
                        });
                      }
                    };
                    return (
                      "onreadystatechange" in n &&
                      "function" === typeof n.onreadystatechange
                        ? (0, o.hl)(n, "onreadystatechange", function (t) {
                            return function (...e) {
                              return a(), t.apply(n, e);
                            };
                          })
                        : n.addEventListener("readystatechange", a),
                      t.apply(n, e)
                    );
                  };
                }),
                  (0, o.hl)(t, "send", function (t) {
                    return function (...e) {
                      return (
                        this.__sentry_xhr__ &&
                          void 0 !== e[0] &&
                          (this.__sentry_xhr__.body = e[0]),
                        _("xhr", {
                          args: e,
                          startTimestamp: Date.now(),
                          xhr: this,
                        }),
                        t.apply(this, e)
                      );
                    };
                  });
              })();
              break;
            case "fetch":
              !(function () {
                if (!(0, a.t$)()) return;
                (0, o.hl)(c, "fetch", function (t) {
                  return function (...e) {
                    const n = {
                      args: e,
                      fetchData: { method: f(e), url: h(e) },
                      startTimestamp: Date.now(),
                    };
                    return (
                      _("fetch", { ...n }),
                      t.apply(c, e).then(
                        (t) => (
                          _("fetch", {
                            ...n,
                            endTimestamp: Date.now(),
                            response: t,
                          }),
                          t
                        ),
                        (t) => {
                          throw (
                            (_("fetch", {
                              ...n,
                              endTimestamp: Date.now(),
                              error: t,
                            }),
                            t)
                          );
                        }
                      )
                    );
                  };
                });
              })();
              break;
            case "history":
              !(function () {
                if (!(0, a.Bf)()) return;
                const t = c.onpopstate;
                function e(t) {
                  return function (...e) {
                    const n = e.length > 2 ? e[2] : void 0;
                    if (n) {
                      const t = m,
                        e = String(n);
                      (m = e), _("history", { from: t, to: e });
                    }
                    return t.apply(this, e);
                  };
                }
                (c.onpopstate = function (...e) {
                  const n = c.location.href,
                    r = m;
                  if (((m = n), _("history", { from: r, to: n }), t))
                    try {
                      return t.apply(this, e);
                    } catch (i) {}
                }),
                  (0, o.hl)(c.history, "pushState", e),
                  (0, o.hl)(c.history, "replaceState", e);
              })();
              break;
            case "error":
              (E = c.onerror),
                (c.onerror = function (t, e, n, r, i) {
                  return (
                    _("error", {
                      column: r,
                      error: i,
                      line: n,
                      msg: t,
                      url: e,
                    }),
                    !!E && E.apply(this, arguments)
                  );
                });
              break;
            case "unhandledrejection":
              (S = c.onunhandledrejection),
                (c.onunhandledrejection = function (t) {
                  return (
                    _("unhandledrejection", t), !S || S.apply(this, arguments)
                  );
                });
              break;
            default:
              return void (
                ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                i.kg.warn("unknown instrumentation type:", t)
              );
          }
      }
      function p(t, e) {
        (u[t] = u[t] || []), u[t].push(e), d(t);
      }
      function _(t, e) {
        if (t && u[t])
          for (const r of u[t] || [])
            try {
              r(e);
            } catch (n) {
              ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                i.kg.error(
                  `Error while triggering instrumentation handler.\nType: ${t}\nName: ${(0,
                  s.$P)(r)}\nError:`,
                  n
                );
            }
      }
      function f(t = []) {
        return "Request" in c && (0, r.V9)(t[0], Request) && t[0].method
          ? String(t[0].method).toUpperCase()
          : t[1] && t[1].method
          ? String(t[1].method).toUpperCase()
          : "GET";
      }
      function h(t = []) {
        return "string" === typeof t[0]
          ? t[0]
          : "Request" in c && (0, r.V9)(t[0], Request)
          ? t[0].url
          : String(t[0]);
      }
      let m;
      let g, y;
      function v(t, e = !1) {
        return (n) => {
          if (!n || y === n) return;
          if (
            (function (t) {
              if ("keypress" !== t.type) return !1;
              try {
                const e = t.target;
                if (!e || !e.tagName) return !0;
                if (
                  "INPUT" === e.tagName ||
                  "TEXTAREA" === e.tagName ||
                  e.isContentEditable
                )
                  return !1;
              } catch (e) {}
              return !0;
            })(n)
          )
            return;
          const r = "keypress" === n.type ? "input" : n.type;
          (void 0 === g ||
            (function (t, e) {
              if (!t) return !0;
              if (t.type !== e.type) return !0;
              try {
                if (t.target !== e.target) return !0;
              } catch (n) {}
              return !1;
            })(y, n)) &&
            (t({ event: n, name: r, global: e }), (y = n)),
            clearTimeout(g),
            (g = c.setTimeout(() => {
              g = void 0;
            }, 1e3));
        };
      }
      let E = null;
      let S = null;
    },
    67597: function (t, e, n) {
      "use strict";
      n.d(e, {
        Cy: function () {
          return m;
        },
        HD: function () {
          return u;
        },
        J8: function () {
          return h;
        },
        Kj: function () {
          return f;
        },
        PO: function () {
          return d;
        },
        TX: function () {
          return a;
        },
        V9: function () {
          return y;
        },
        VW: function () {
          return s;
        },
        VZ: function () {
          return i;
        },
        cO: function () {
          return p;
        },
        fm: function () {
          return c;
        },
        i2: function () {
          return g;
        },
        kK: function () {
          return _;
        },
        pt: function () {
          return l;
        },
      });
      const r = Object.prototype.toString;
      function i(t) {
        switch (r.call(t)) {
          case "[object Error]":
          case "[object Exception]":
          case "[object DOMException]":
            return !0;
          default:
            return y(t, Error);
        }
      }
      function o(t, e) {
        return r.call(t) === `[object ${e}]`;
      }
      function s(t) {
        return o(t, "ErrorEvent");
      }
      function a(t) {
        return o(t, "DOMError");
      }
      function c(t) {
        return o(t, "DOMException");
      }
      function u(t) {
        return o(t, "String");
      }
      function l(t) {
        return null === t || ("object" !== typeof t && "function" !== typeof t);
      }
      function d(t) {
        return o(t, "Object");
      }
      function p(t) {
        return "undefined" !== typeof Event && y(t, Event);
      }
      function _(t) {
        return "undefined" !== typeof Element && y(t, Element);
      }
      function f(t) {
        return o(t, "RegExp");
      }
      function h(t) {
        return Boolean(t && t.then && "function" === typeof t.then);
      }
      function m(t) {
        return (
          d(t) &&
          "nativeEvent" in t &&
          "preventDefault" in t &&
          "stopPropagation" in t
        );
      }
      function g(t) {
        return "number" === typeof t && t !== t;
      }
      function y(t, e) {
        try {
          return t instanceof e;
        } catch (n) {
          return !1;
        }
      }
    },
    12343: function (t, e, n) {
      "use strict";
      n.d(e, {
        Cf: function () {
          return o;
        },
        RU: function () {
          return i;
        },
        kg: function () {
          return a;
        },
      });
      var r = n(71235);
      const i = ["debug", "info", "warn", "error", "log", "assert", "trace"];
      function o(t) {
        if (!("console" in r.n2)) return t();
        const e = r.n2.console,
          n = {};
        i.forEach((t) => {
          const r = e[t] && e[t].__sentry_original__;
          t in e && r && ((n[t] = e[t]), (e[t] = r));
        });
        try {
          return t();
        } finally {
          Object.keys(n).forEach((t) => {
            e[t] = n[t];
          });
        }
      }
      function s() {
        let t = !1;
        const e = {
          enable: () => {
            t = !0;
          },
          disable: () => {
            t = !1;
          },
        };
        return (
          "undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__
            ? i.forEach((n) => {
                e[n] = (...e) => {
                  t &&
                    o(() => {
                      r.n2.console[n](`Sentry Logger [${n}]:`, ...e);
                    });
                };
              })
            : i.forEach((t) => {
                e[t] = () => {};
              }),
          e
        );
      }
      let a;
      a =
        "undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__
          ? (0, r.YO)("logger", s)
          : s();
    },
    62844: function (t, e, n) {
      "use strict";
      n.d(e, {
        DM: function () {
          return o;
        },
        Db: function () {
          return c;
        },
        EG: function () {
          return u;
        },
        YO: function () {
          return l;
        },
        jH: function () {
          return a;
        },
        lE: function () {
          return d;
        },
      });
      var r = n(20535),
        i = n(71235);
      function o() {
        const t = i.n2,
          e = t.crypto || t.msCrypto;
        if (e && e.randomUUID) return e.randomUUID().replace(/-/g, "");
        const n =
          e && e.getRandomValues
            ? () => e.getRandomValues(new Uint8Array(1))[0]
            : () => 16 * Math.random();
        return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, (t) =>
          (t ^ ((15 & n()) >> (t / 4))).toString(16)
        );
      }
      function s(t) {
        return t.exception && t.exception.values
          ? t.exception.values[0]
          : void 0;
      }
      function a(t) {
        const { message: e, event_id: n } = t;
        if (e) return e;
        const r = s(t);
        return r
          ? r.type && r.value
            ? `${r.type}: ${r.value}`
            : r.type || r.value || n || "<unknown>"
          : n || "<unknown>";
      }
      function c(t, e, n) {
        const r = (t.exception = t.exception || {}),
          i = (r.values = r.values || []),
          o = (i[0] = i[0] || {});
        o.value || (o.value = e || ""), o.type || (o.type = n || "Error");
      }
      function u(t, e) {
        const n = s(t);
        if (!n) return;
        const r = n.mechanism;
        if (
          ((n.mechanism = { type: "generic", handled: !0, ...r, ...e }),
          e && "data" in e)
        ) {
          const t = { ...(r && r.data), ...e.data };
          n.mechanism.data = t;
        }
      }
      function l(t) {
        if (t && t.__sentry_captured__) return !0;
        try {
          (0, r.xp)(t, "__sentry_captured__", !0);
        } catch (e) {}
        return !1;
      }
      function d(t) {
        return Array.isArray(t) ? t : [t];
      }
    },
    92448: function (t, e, n) {
      "use strict";
      n.d(e, {
        l$: function () {
          return o;
        },
        KV: function () {
          return i;
        },
        $y: function () {
          return s;
        },
      }),
        (t = n.hmd(t));
      var r = n(83454);
      function i() {
        return (
          !(
            "undefined" !== typeof __SENTRY_BROWSER_BUNDLE__ &&
            __SENTRY_BROWSER_BUNDLE__
          ) &&
          "[object process]" ===
            Object.prototype.toString.call("undefined" !== typeof r ? r : 0)
        );
      }
      function o(t, e) {
        return t.require(e);
      }
      function s(e) {
        let n;
        try {
          n = o(t, e);
        } catch (r) {}
        try {
          const { cwd: r } = o(t, "process");
          n = o(t, `${r()}/node_modules/${e}`);
        } catch (r) {}
        return n;
      }
    },
    20535: function (t, e, n) {
      "use strict";
      n.d(e, {
        $Q: function () {
          return c;
        },
        HK: function () {
          return u;
        },
        Jr: function () {
          return h;
        },
        Sh: function () {
          return d;
        },
        _j: function () {
          return l;
        },
        hl: function () {
          return s;
        },
        xp: function () {
          return a;
        },
        zf: function () {
          return f;
        },
      });
      var r = n(58464),
        i = n(67597),
        o = n(57321);
      function s(t, e, n) {
        if (!(e in t)) return;
        const r = t[e],
          i = n(r);
        if ("function" === typeof i)
          try {
            c(i, r);
          } catch (o) {}
        t[e] = i;
      }
      function a(t, e, n) {
        Object.defineProperty(t, e, {
          value: n,
          writable: !0,
          configurable: !0,
        });
      }
      function c(t, e) {
        const n = e.prototype || {};
        (t.prototype = e.prototype = n), a(t, "__sentry_original__", e);
      }
      function u(t) {
        return t.__sentry_original__;
      }
      function l(t) {
        return Object.keys(t)
          .map((e) => `${encodeURIComponent(e)}=${encodeURIComponent(t[e])}`)
          .join("&");
      }
      function d(t) {
        if ((0, i.VZ)(t))
          return { message: t.message, name: t.name, stack: t.stack, ..._(t) };
        if ((0, i.cO)(t)) {
          const e = {
            type: t.type,
            target: p(t.target),
            currentTarget: p(t.currentTarget),
            ..._(t),
          };
          return (
            "undefined" !== typeof CustomEvent &&
              (0, i.V9)(t, CustomEvent) &&
              (e.detail = t.detail),
            e
          );
        }
        return t;
      }
      function p(t) {
        try {
          return (0, i.kK)(t)
            ? (0, r.Rt)(t)
            : Object.prototype.toString.call(t);
        } catch (e) {
          return "<unknown>";
        }
      }
      function _(t) {
        if ("object" === typeof t && null !== t) {
          const e = {};
          for (const n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e;
        }
        return {};
      }
      function f(t, e = 40) {
        const n = Object.keys(d(t));
        if ((n.sort(), !n.length)) return "[object has no keys]";
        if (n[0].length >= e) return (0, o.$G)(n[0], e);
        for (let r = n.length; r > 0; r--) {
          const t = n.slice(0, r).join(", ");
          if (!(t.length > e)) return r === n.length ? t : (0, o.$G)(t, e);
        }
        return "";
      }
      function h(t) {
        return m(t, new Map());
      }
      function m(t, e) {
        if ((0, i.PO)(t)) {
          const n = e.get(t);
          if (void 0 !== n) return n;
          const r = {};
          e.set(t, r);
          for (const i of Object.keys(t))
            "undefined" !== typeof t[i] && (r[i] = m(t[i], e));
          return r;
        }
        if (Array.isArray(t)) {
          const n = e.get(t);
          if (void 0 !== n) return n;
          const r = [];
          return (
            e.set(t, r),
            t.forEach((t) => {
              r.push(m(t, e));
            }),
            r
          );
        }
        return t;
      }
    },
    30360: function (t, e, n) {
      "use strict";
      n.d(e, {
        $P: function () {
          return s;
        },
        Sq: function () {
          return i;
        },
        pE: function () {
          return r;
        },
      });
      function r(...t) {
        const e = t.sort((t, e) => t[0] - e[0]).map((t) => t[1]);
        return (t, n = 0) => {
          const r = [];
          for (const i of t.split("\n").slice(n)) {
            const t = i.replace(/\(error: (.*)\)/, "$1");
            for (const n of e) {
              const e = n(t);
              if (e) {
                r.push(e);
                break;
              }
            }
          }
          return (function (t) {
            if (!t.length) return [];
            let e = t;
            const n = e[0].function || "",
              r = e[e.length - 1].function || "";
            (-1 === n.indexOf("captureMessage") &&
              -1 === n.indexOf("captureException")) ||
              (e = e.slice(1));
            -1 !== r.indexOf("sentryWrapped") && (e = e.slice(0, -1));
            return e
              .slice(0, 50)
              .map((t) => ({
                ...t,
                filename: t.filename || e[0].filename,
                function: t.function || "?",
              }))
              .reverse();
          })(r);
        };
      }
      function i(t) {
        return Array.isArray(t) ? r(...t) : t;
      }
      const o = "<anonymous>";
      function s(t) {
        try {
          return (t && "function" === typeof t && t.name) || o;
        } catch (e) {
          return o;
        }
      }
    },
    57321: function (t, e, n) {
      "use strict";
      n.d(e, {
        $G: function () {
          return i;
        },
        U0: function () {
          return s;
        },
        nK: function () {
          return o;
        },
      });
      var r = n(67597);
      function i(t, e = 0) {
        return "string" !== typeof t || 0 === e || t.length <= e
          ? t
          : `${t.substr(0, e)}...`;
      }
      function o(t, e) {
        if (!Array.isArray(t)) return "";
        const n = [];
        for (let i = 0; i < t.length; i++) {
          const e = t[i];
          try {
            n.push(String(e));
          } catch (r) {
            n.push("[value cannot be serialized]");
          }
        }
        return n.join(e);
      }
      function s(t, e = [], n = !1) {
        return e.some((e) =>
          (function (t, e, n = !1) {
            return (
              !!(0, r.HD)(t) &&
              ((0, r.Kj)(e)
                ? e.test(t)
                : !!(0, r.HD)(e) && (n ? t === e : t.includes(e)))
            );
          })(t, e, n)
        );
      }
    },
    8823: function (t, e, n) {
      "use strict";
      n.d(e, {
        Ak: function () {
          return o;
        },
        Bf: function () {
          return c;
        },
        Du: function () {
          return s;
        },
        t$: function () {
          return a;
        },
      });
      var r = n(12343);
      const i = (0, n(71235).Rf)();
      function o() {
        if (!("fetch" in i)) return !1;
        try {
          return (
            new Headers(),
            new Request("http://www.example.com"),
            new Response(),
            !0
          );
        } catch (t) {
          return !1;
        }
      }
      function s(t) {
        return (
          t &&
          /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())
        );
      }
      function a() {
        if (!o()) return !1;
        if (s(i.fetch)) return !0;
        let t = !1;
        const e = i.document;
        if (e && "function" === typeof e.createElement)
          try {
            const n = e.createElement("iframe");
            (n.hidden = !0),
              e.head.appendChild(n),
              n.contentWindow &&
                n.contentWindow.fetch &&
                (t = s(n.contentWindow.fetch)),
              e.head.removeChild(n);
          } catch (n) {
            ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              r.kg.warn(
                "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
                n
              );
          }
        return t;
      }
      function c() {
        const t = i.chrome,
          e = t && t.app && t.app.runtime,
          n =
            "history" in i && !!i.history.pushState && !!i.history.replaceState;
        return !e && n;
      }
    },
    96893: function (t, e, n) {
      "use strict";
      n.d(e, {
        $2: function () {
          return s;
        },
        WD: function () {
          return o;
        },
        cW: function () {
          return a;
        },
      });
      var r,
        i = n(67597);
      function o(t) {
        return new a((e) => {
          e(t);
        });
      }
      function s(t) {
        return new a((e, n) => {
          n(t);
        });
      }
      !(function (t) {
        t[(t.PENDING = 0)] = "PENDING";
        t[(t.RESOLVED = 1)] = "RESOLVED";
        t[(t.REJECTED = 2)] = "REJECTED";
      })(r || (r = {}));
      class a {
        __init() {
          this._state = r.PENDING;
        }
        __init2() {
          this._handlers = [];
        }
        constructor(t) {
          a.prototype.__init.call(this),
            a.prototype.__init2.call(this),
            a.prototype.__init3.call(this),
            a.prototype.__init4.call(this),
            a.prototype.__init5.call(this),
            a.prototype.__init6.call(this);
          try {
            t(this._resolve, this._reject);
          } catch (e) {
            this._reject(e);
          }
        }
        then(t, e) {
          return new a((n, r) => {
            this._handlers.push([
              !1,
              (e) => {
                if (t)
                  try {
                    n(t(e));
                  } catch (i) {
                    r(i);
                  }
                else n(e);
              },
              (t) => {
                if (e)
                  try {
                    n(e(t));
                  } catch (i) {
                    r(i);
                  }
                else r(t);
              },
            ]),
              this._executeHandlers();
          });
        }
        catch(t) {
          return this.then((t) => t, t);
        }
        finally(t) {
          return new a((e, n) => {
            let r, i;
            return this.then(
              (e) => {
                (i = !1), (r = e), t && t();
              },
              (e) => {
                (i = !0), (r = e), t && t();
              }
            ).then(() => {
              i ? n(r) : e(r);
            });
          });
        }
        __init3() {
          this._resolve = (t) => {
            this._setResult(r.RESOLVED, t);
          };
        }
        __init4() {
          this._reject = (t) => {
            this._setResult(r.REJECTED, t);
          };
        }
        __init5() {
          this._setResult = (t, e) => {
            this._state === r.PENDING &&
              ((0, i.J8)(e)
                ? e.then(this._resolve, this._reject)
                : ((this._state = t),
                  (this._value = e),
                  this._executeHandlers()));
          };
        }
        __init6() {
          this._executeHandlers = () => {
            if (this._state === r.PENDING) return;
            const t = this._handlers.slice();
            (this._handlers = []),
              t.forEach((t) => {
                t[0] ||
                  (this._state === r.RESOLVED && t[1](this._value),
                  this._state === r.REJECTED && t[2](this._value),
                  (t[0] = !0));
              });
          };
        }
      }
    },
    21170: function (t, e, n) {
      "use strict";
      n.d(e, {
        Z1: function () {
          return _;
        },
        _I: function () {
          return d;
        },
        ph: function () {
          return l;
        },
        yW: function () {
          return u;
        },
      });
      var r = n(92448),
        i = n(71235);
      t = n.hmd(t);
      const o = (0, i.Rf)(),
        s = { nowSeconds: () => Date.now() / 1e3 };
      const a = (0, r.KV)()
          ? (function () {
              try {
                return (0, r.l$)(t, "perf_hooks").performance;
              } catch (e) {
                return;
              }
            })()
          : (function () {
              const { performance: t } = o;
              if (!t || !t.now) return;
              return { now: () => t.now(), timeOrigin: Date.now() - t.now() };
            })(),
        c =
          void 0 === a
            ? s
            : { nowSeconds: () => (a.timeOrigin + a.now()) / 1e3 },
        u = s.nowSeconds.bind(s),
        l = c.nowSeconds.bind(c),
        d = l;
      let p;
      const _ = (() => {
        const { performance: t } = o;
        if (!t || !t.now) return void (p = "none");
        const e = 36e5,
          n = t.now(),
          r = Date.now(),
          i = t.timeOrigin ? Math.abs(t.timeOrigin + n - r) : e,
          s = i < e,
          a = t.timing && t.timing.navigationStart,
          c = "number" === typeof a ? Math.abs(a + n - r) : e;
        return s || c < e
          ? i <= c
            ? ((p = "timeOrigin"), t.timeOrigin)
            : ((p = "navigationStart"), a)
          : ((p = "dateNow"), r);
      })();
    },
    71235: function (t, e, n) {
      "use strict";
      function r(t) {
        return t && t.Math == Math ? t : void 0;
      }
      n.d(e, {
        Rf: function () {
          return o;
        },
        YO: function () {
          return s;
        },
        n2: function () {
          return i;
        },
      });
      const i =
        ("object" == typeof globalThis && r(globalThis)) ||
        ("object" == typeof window && r(window)) ||
        ("object" == typeof self && r(self)) ||
        ("object" == typeof n.g && r(n.g)) ||
        (function () {
          return this;
        })() ||
        {};
      function o() {
        return i;
      }
      function s(t, e, n) {
        const r = n || i,
          o = (r.__SENTRY__ = r.__SENTRY__ || {});
        return o[t] || (o[t] = e());
      }
    },
    36808: function (t, e, n) {
      var r, i;
      !(function (o) {
        if (
          (void 0 ===
            (i = "function" === typeof (r = o) ? r.call(e, n, e, t) : r) ||
            (t.exports = i),
          !0,
          (t.exports = o()),
          !!0)
        ) {
          var s = window.Cookies,
            a = (window.Cookies = o());
          a.noConflict = function () {
            return (window.Cookies = s), a;
          };
        }
      })(function () {
        function t() {
          for (var t = 0, e = {}; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) e[r] = n[r];
          }
          return e;
        }
        function e(t) {
          return t.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
        }
        return (function n(r) {
          function i() {}
          function o(e, n, o) {
            if ("undefined" !== typeof document) {
              "number" ===
                typeof (o = t({ path: "/" }, i.defaults, o)).expires &&
                (o.expires = new Date(1 * new Date() + 864e5 * o.expires)),
                (o.expires = o.expires ? o.expires.toUTCString() : "");
              try {
                var s = JSON.stringify(n);
                /^[\{\[]/.test(s) && (n = s);
              } catch (u) {}
              (n = r.write
                ? r.write(n, e)
                : encodeURIComponent(String(n)).replace(
                    /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                    decodeURIComponent
                  )),
                (e = encodeURIComponent(String(e))
                  .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
                  .replace(/[\(\)]/g, escape));
              var a = "";
              for (var c in o)
                o[c] &&
                  ((a += "; " + c),
                  !0 !== o[c] && (a += "=" + o[c].split(";")[0]));
              return (document.cookie = e + "=" + n + a);
            }
          }
          function s(t, n) {
            if ("undefined" !== typeof document) {
              for (
                var i = {},
                  o = document.cookie ? document.cookie.split("; ") : [],
                  s = 0;
                s < o.length;
                s++
              ) {
                var a = o[s].split("="),
                  c = a.slice(1).join("=");
                n || '"' !== c.charAt(0) || (c = c.slice(1, -1));
                try {
                  var u = e(a[0]);
                  if (((c = (r.read || r)(c, u) || e(c)), n))
                    try {
                      c = JSON.parse(c);
                    } catch (l) {}
                  if (((i[u] = c), t === u)) break;
                } catch (l) {}
              }
              return t ? i[t] : i;
            }
          }
          return (
            (i.set = o),
            (i.get = function (t) {
              return s(t, !1);
            }),
            (i.getJSON = function (t) {
              return s(t, !0);
            }),
            (i.remove = function (e, n) {
              o(e, "", t(n, { expires: -1 }));
            }),
            (i.defaults = {}),
            (i.withConverter = n),
            i
          );
        })(function () {});
      });
    },
    83454: function (t, e, n) {
      "use strict";
      var r, i;
      t.exports =
        (null === (r = n.g.process) || void 0 === r ? void 0 : r.env) &&
        "object" ===
          typeof (null === (i = n.g.process) || void 0 === i ? void 0 : i.env)
          ? n.g.process
          : n(77663);
    },
    91118: function (t, e, n) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/_app",
        function () {
          return n(43091);
        },
      ]);
    },
    43091: function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, {
          default: function () {
            return wn;
          },
        });
      var r = n(85893),
        i = n(67294),
        o = n(9008),
        s = n.n(o),
        a = n(11163),
        c = n(36808),
        u = n.n(c),
        l = "cookie-consent-given",
        d = n(36617),
        p = n(37254),
        _ = n.n(p),
        f = function () {
          var t = (function () {
              var t = (0, i.useState)(!0),
                e = t[0],
                n = t[1];
              return (
                (0, i.useEffect)(function () {
                  u().get(l) || n(!1);
                }, []),
                {
                  hasConsent: e,
                  onConsentGiven: function () {
                    u().set(l, !0, { expires: 365, domain: "clearvpn.com" }),
                      n(!0);
                  },
                }
              );
            })(),
            e = t.hasConsent,
            n = t.onConsentGiven;
          return e
            ? ""
            : (0, r.jsx)("div", {
                className: _().wrapper,
                children: (0, r.jsxs)("div", {
                  className: _().container,
                  children: [
                    (0, r.jsx)(d.Z, {
                      path: "/images/cookie/cookies",
                      className: _().cookieImage,
                      alt: "",
                      width: "32",
                      height: "32",
                    }),
                    (0, r.jsxs)("div", {
                      className: _().text,
                      children: [
                        "ClearVPN uses cookies to personalize your experience on our website. By continuing to use this site, you agree to our cookie policy. Click ",
                        (0, r.jsx)("a", {
                          href: "https://macpaw.com/cookies",
                          children: "here",
                        }),
                        " to learn more.",
                      ],
                    }),
                    (0, r.jsx)("button", {
                      className: _().confirmButton,
                      onClick: n,
                      children: "Ok",
                    }),
                  ],
                }),
              });
        },
        h =
          (n(44366),
          [
            "/terms-of-service",
            "/privacy-policy",
            "/onboarding/mobile",
            "/onboarding/desktop",
          ]),
        m = n(45697),
        g = n.n(m);
      const y = "7.23.0";
      var v = n(62844),
        E = n(12343),
        S = n(95659),
        b = n(10350);
      const T = [];
      function x(t) {
        const e = t.defaultIntegrations || [],
          n = t.integrations;
        let r;
        e.forEach((t) => {
          t.isDefaultInstance = !0;
        }),
          (r = Array.isArray(n)
            ? [...e, ...n]
            : "function" === typeof n
            ? (0, v.lE)(n(e))
            : e);
        const i = (function (t) {
            const e = {};
            return (
              t.forEach((t) => {
                const { name: n } = t,
                  r = e[n];
                (r && !r.isDefaultInstance && t.isDefaultInstance) ||
                  (e[n] = t);
              }),
              Object.values(e)
            );
          })(r),
          o = i.findIndex((t) => "Debug" === t.name);
        if (-1 !== o) {
          const [t] = i.splice(o, 1);
          i.push(t);
        }
        return i;
      }
      var w = n(57321);
      const k = [
        /^Script error\.?$/,
        /^Javascript error: Script error\.? on line 0$/,
      ];
      class R {
        static __initStatic() {
          this.id = "InboundFilters";
        }
        __init() {
          this.name = R.id;
        }
        constructor(t = {}) {
          (this._options = t), R.prototype.__init.call(this);
        }
        setupOnce(t, e) {
          const n = (t) => {
            const n = e();
            if (n) {
              const e = n.getIntegration(R);
              if (e) {
                const r = n.getClient(),
                  i = r ? r.getOptions() : {},
                  o = (function (t = {}, e = {}) {
                    return {
                      allowUrls: [
                        ...(t.allowUrls || []),
                        ...(e.allowUrls || []),
                      ],
                      denyUrls: [...(t.denyUrls || []), ...(e.denyUrls || [])],
                      ignoreErrors: [
                        ...(t.ignoreErrors || []),
                        ...(e.ignoreErrors || []),
                        ...k,
                      ],
                      ignoreInternal:
                        void 0 === t.ignoreInternal || t.ignoreInternal,
                    };
                  })(e._options, i);
                return (function (t, e) {
                  if (
                    e.ignoreInternal &&
                    (function (t) {
                      try {
                        return "SentryError" === t.exception.values[0].type;
                      } catch (e) {}
                      return !1;
                    })(t)
                  )
                    return (
                      ("undefined" === typeof __SENTRY_DEBUG__ ||
                        __SENTRY_DEBUG__) &&
                        E.kg.warn(
                          `Event dropped due to being internal Sentry Error.\nEvent: ${(0,
                          v.jH)(t)}`
                        ),
                      !0
                    );
                  if (
                    (function (t, e) {
                      if (!e || !e.length) return !1;
                      return (function (t) {
                        if (t.message) return [t.message];
                        if (t.exception)
                          try {
                            const { type: e = "", value: n = "" } =
                              (t.exception.values && t.exception.values[0]) ||
                              {};
                            return [`${n}`, `${e}: ${n}`];
                          } catch (e) {
                            return (
                              ("undefined" === typeof __SENTRY_DEBUG__ ||
                                __SENTRY_DEBUG__) &&
                                E.kg.error(
                                  `Cannot extract message for event ${(0, v.jH)(
                                    t
                                  )}`
                                ),
                              []
                            );
                          }
                        return [];
                      })(t).some((t) => (0, w.U0)(t, e));
                    })(t, e.ignoreErrors)
                  )
                    return (
                      ("undefined" === typeof __SENTRY_DEBUG__ ||
                        __SENTRY_DEBUG__) &&
                        E.kg.warn(
                          `Event dropped due to being matched by \`ignoreErrors\` option.\nEvent: ${(0,
                          v.jH)(t)}`
                        ),
                      !0
                    );
                  if (
                    (function (t, e) {
                      if (!e || !e.length) return !1;
                      const n = N(t);
                      return !!n && (0, w.U0)(n, e);
                    })(t, e.denyUrls)
                  )
                    return (
                      ("undefined" === typeof __SENTRY_DEBUG__ ||
                        __SENTRY_DEBUG__) &&
                        E.kg.warn(
                          `Event dropped due to being matched by \`denyUrls\` option.\nEvent: ${(0,
                          v.jH)(t)}.\nUrl: ${N(t)}`
                        ),
                      !0
                    );
                  if (
                    !(function (t, e) {
                      if (!e || !e.length) return !0;
                      const n = N(t);
                      return !n || (0, w.U0)(n, e);
                    })(t, e.allowUrls)
                  )
                    return (
                      ("undefined" === typeof __SENTRY_DEBUG__ ||
                        __SENTRY_DEBUG__) &&
                        E.kg.warn(
                          `Event dropped due to not being matched by \`allowUrls\` option.\nEvent: ${(0,
                          v.jH)(t)}.\nUrl: ${N(t)}`
                        ),
                      !0
                    );
                  return !1;
                })(t, o)
                  ? null
                  : t;
              }
            }
            return t;
          };
          (n.id = this.name), t(n);
        }
      }
      function N(t) {
        try {
          let n;
          try {
            n = t.exception.values[0].stacktrace.frames;
          } catch (e) {}
          return n
            ? (function (t = []) {
                for (let e = t.length - 1; e >= 0; e--) {
                  const n = t[e];
                  if (
                    n &&
                    "<anonymous>" !== n.filename &&
                    "[native code]" !== n.filename
                  )
                    return n.filename || null;
                }
                return null;
              })(n)
            : null;
        } catch (n) {
          return (
            ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              E.kg.error(`Cannot extract url for event ${(0, v.jH)(t)}`),
            null
          );
        }
      }
      R.__initStatic();
      var D = n(20535);
      let O;
      class B {
        constructor() {
          B.prototype.__init.call(this);
        }
        static __initStatic() {
          this.id = "FunctionToString";
        }
        __init() {
          this.name = B.id;
        }
        setupOnce() {
          (O = Function.prototype.toString),
            (Function.prototype.toString = function (...t) {
              const e = (0, D.HK)(this) || this;
              return O.apply(e, t);
            });
        }
      }
      B.__initStatic();
      var C = n(30360),
        j = n(8823),
        U = n(9732);
      function G(t) {
        let e,
          n = t[0],
          r = 1;
        for (; r < t.length; ) {
          const i = t[r],
            o = t[r + 1];
          if (
            ((r += 2),
            ("optionalAccess" === i || "optionalCall" === i) && null == n)
          )
            return;
          "access" === i || "optionalAccess" === i
            ? ((e = n), (n = o(n)))
            : ("call" !== i && "optionalCall" !== i) ||
              ((n = o((...t) => n.call(e, ...t))), (e = void 0));
        }
        return n;
      }
      class I extends Error {
        constructor(t, e = "warn") {
          super(t),
            (this.message = t),
            (this.name = new.target.prototype.constructor.name),
            Object.setPrototypeOf(this, new.target.prototype),
            (this.logLevel = e);
        }
      }
      const Y =
        /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
      function $(t, e = !1) {
        const {
          host: n,
          path: r,
          pass: i,
          port: o,
          projectId: s,
          protocol: a,
          publicKey: c,
        } = t;
        return `${a}://${c}${e && i ? `:${i}` : ""}@${n}${o ? `:${o}` : ""}/${
          r ? `${r}/` : r
        }${s}`;
      }
      function P(t) {
        return {
          protocol: t.protocol,
          publicKey: t.publicKey || "",
          pass: t.pass || "",
          host: t.host,
          port: t.port || "",
          path: t.path || "",
          projectId: t.projectId,
        };
      }
      function L(t) {
        const e =
          "string" === typeof t
            ? (function (t) {
                const e = Y.exec(t);
                if (!e) throw new I(`Invalid Sentry Dsn: ${t}`);
                const [n, r, i = "", o, s = "", a] = e.slice(1);
                let c = "",
                  u = a;
                const l = u.split("/");
                if (
                  (l.length > 1 &&
                    ((c = l.slice(0, -1).join("/")), (u = l.pop())),
                  u)
                ) {
                  const t = u.match(/^\d+/);
                  t && (u = t[0]);
                }
                return P({
                  host: o,
                  pass: i,
                  path: c,
                  projectId: u,
                  port: s,
                  protocol: n,
                  publicKey: r,
                });
              })(t)
            : P(t);
        return (
          (function (t) {
            if ("undefined" !== typeof __SENTRY_DEBUG__ && !__SENTRY_DEBUG__)
              return;
            const { port: e, projectId: n, protocol: r } = t;
            if (
              (["protocol", "publicKey", "host", "projectId"].forEach((e) => {
                if (!t[e]) throw new I(`Invalid Sentry Dsn: ${e} missing`);
              }),
              !n.match(/^\d+$/))
            )
              throw new I(`Invalid Sentry Dsn: Invalid projectId ${n}`);
            if (
              !(function (t) {
                return "http" === t || "https" === t;
              })(r)
            )
              throw new I(`Invalid Sentry Dsn: Invalid protocol ${r}`);
            if (e && isNaN(parseInt(e, 10)))
              throw new I(`Invalid Sentry Dsn: Invalid port ${e}`);
          })(e),
          e
        );
      }
      var A = n(67597),
        M = n(96893);
      function F(t, e = 1 / 0, n = 1 / 0) {
        try {
          return H("", t, e, n);
        } catch (r) {
          return { ERROR: `**non-serializable** (${r})` };
        }
      }
      function q(t, e = 3, n = 102400) {
        const r = F(t, e);
        return (
          (i = r),
          (function (t) {
            return ~-encodeURI(t).split(/%..|./).length;
          })(JSON.stringify(i)) > n
            ? q(t, e - 1, n)
            : r
        );
        var i;
      }
      function H(
        t,
        e,
        r = 1 / 0,
        i = 1 / 0,
        o = (function () {
          const t = "function" === typeof WeakSet,
            e = t ? new WeakSet() : [];
          return [
            function (n) {
              if (t) return !!e.has(n) || (e.add(n), !1);
              for (let t = 0; t < e.length; t++) if (e[t] === n) return !0;
              return e.push(n), !1;
            },
            function (n) {
              if (t) e.delete(n);
              else
                for (let t = 0; t < e.length; t++)
                  if (e[t] === n) {
                    e.splice(t, 1);
                    break;
                  }
            },
          ];
        })()
      ) {
        const [s, a] = o;
        if (
          null === e ||
          (["number", "boolean", "string"].includes(typeof e) && !(0, A.i2)(e))
        )
          return e;
        const c = (function (t, e) {
          try {
            return "domain" === t && e && "object" === typeof e && e._events
              ? "[Domain]"
              : "domainEmitter" === t
              ? "[DomainEmitter]"
              : "undefined" !== typeof n.g && e === n.g
              ? "[Global]"
              : "undefined" !== typeof window && e === window
              ? "[Window]"
              : "undefined" !== typeof document && e === document
              ? "[Document]"
              : (0, A.Cy)(e)
              ? "[SyntheticEvent]"
              : "number" === typeof e && e !== e
              ? "[NaN]"
              : void 0 === e
              ? "[undefined]"
              : "function" === typeof e
              ? `[Function: ${(0, C.$P)(e)}]`
              : "symbol" === typeof e
              ? `[${String(e)}]`
              : "bigint" === typeof e
              ? `[BigInt: ${String(e)}]`
              : `[object ${Object.getPrototypeOf(e).constructor.name}]`;
          } catch (r) {
            return `**non-serializable** (${r})`;
          }
        })(t, e);
        if (!c.startsWith("[object ")) return c;
        if (e.__sentry_skip_normalization__) return e;
        if (0 === r) return c.replace("object ", "");
        if (s(e)) return "[Circular ~]";
        const u = e;
        if (u && "function" === typeof u.toJSON)
          try {
            return H("", u.toJSON(), r - 1, i, o);
          } catch (_) {}
        const l = Array.isArray(e) ? [] : {};
        let d = 0;
        const p = (0, D.Sh)(e);
        for (const n in p) {
          if (!Object.prototype.hasOwnProperty.call(p, n)) continue;
          if (d >= i) {
            l[n] = "[MaxProperties ~]";
            break;
          }
          const t = p[n];
          (l[n] = H(n, t, r - 1, i, o)), d++;
        }
        return a(e), l;
      }
      function z(t, e = []) {
        return [t, e];
      }
      function W(t, e) {
        const [n, r] = t;
        return [n, [...r, e]];
      }
      function X(t, e) {
        t[1].forEach((t) => {
          const n = t[0].type;
          e(t, n);
        });
      }
      function V(t, e) {
        return (e || new TextEncoder()).encode(t);
      }
      function J(t, e) {
        const [n, r] = t;
        let i = JSON.stringify(n);
        function o(t) {
          "string" === typeof i
            ? (i = "string" === typeof t ? i + t : [V(i, e), t])
            : i.push("string" === typeof t ? V(t, e) : t);
        }
        for (const a of r) {
          const [t, e] = a;
          if (
            (o(`\n${JSON.stringify(t)}\n`),
            "string" === typeof e || e instanceof Uint8Array)
          )
            o(e);
          else {
            let t;
            try {
              t = JSON.stringify(e);
            } catch (s) {
              t = JSON.stringify(F(e));
            }
            o(t);
          }
        }
        return "string" === typeof i
          ? i
          : (function (t) {
              const e = t.reduce((t, e) => t + e.length, 0),
                n = new Uint8Array(e);
              let r = 0;
              for (const i of t) n.set(i, r), (r += i.length);
              return n;
            })(i);
      }
      function K(t, e) {
        const n = "string" === typeof t.data ? V(t.data, e) : t.data;
        return [
          (0, D.Jr)({
            type: "attachment",
            length: n.length,
            filename: t.filename,
            content_type: t.contentType,
            attachment_type: t.attachmentType,
          }),
          n,
        ];
      }
      const Z = {
        session: "session",
        sessions: "session",
        attachment: "attachment",
        transaction: "transaction",
        event: "error",
        client_report: "internal",
        user_report: "default",
      };
      function Q(t) {
        return Z[t];
      }
      var tt = n(21170);
      function et(t) {
        const e = t.protocol ? `${t.protocol}:` : "",
          n = t.port ? `:${t.port}` : "";
        return `${e}//${t.host}${n}${t.path ? `/${t.path}` : ""}/api/`;
      }
      function nt(t, e = {}) {
        const n = "string" === typeof e ? e : e.tunnel,
          r = "string" !== typeof e && e._metadata ? e._metadata.sdk : void 0;
        return (
          n ||
          `${(function (t) {
            return `${et(t)}${t.projectId}/envelope/`;
          })(t)}?${(function (t, e) {
            return (0, D._j)({
              sentry_key: t.publicKey,
              sentry_version: "7",
              ...(e && { sentry_client: `${e.name}/${e.version}` }),
            });
          })(t, r)}`
        );
      }
      function rt(t) {
        if (!t || !t.sdk) return;
        const { name: e, version: n } = t.sdk;
        return { name: e, version: n };
      }
      function it(t, e, n, r) {
        const i = rt(n),
          o = t.type || "event";
        !(function (t, e) {
          e &&
            ((t.sdk = t.sdk || {}),
            (t.sdk.name = t.sdk.name || e.name),
            (t.sdk.version = t.sdk.version || e.version),
            (t.sdk.integrations = [
              ...(t.sdk.integrations || []),
              ...(e.integrations || []),
            ]),
            (t.sdk.packages = [
              ...(t.sdk.packages || []),
              ...(e.packages || []),
            ]));
        })(t, n && n.sdk);
        const s = (function (t, e, n, r) {
          const i =
            t.sdkProcessingMetadata &&
            t.sdkProcessingMetadata.dynamicSamplingContext;
          return {
            event_id: t.event_id,
            sent_at: new Date().toISOString(),
            ...(e && { sdk: e }),
            ...(!!n && { dsn: $(r) }),
            ...("transaction" === t.type &&
              i && { trace: (0, D.Jr)({ ...i }) }),
          };
        })(t, i, r, e);
        delete t.sdkProcessingMetadata;
        return z(s, [[{ type: o }, t]]);
      }
      var ot = n(9015);
      const st = "Not capturing exception because it's already been captured.";
      class at {
        __init() {
          this._integrations = {};
        }
        __init2() {
          this._integrationsInitialized = !1;
        }
        __init3() {
          this._numProcessing = 0;
        }
        __init4() {
          this._outcomes = {};
        }
        constructor(t) {
          if (
            (at.prototype.__init.call(this),
            at.prototype.__init2.call(this),
            at.prototype.__init3.call(this),
            at.prototype.__init4.call(this),
            (this._options = t),
            t.dsn)
          ) {
            this._dsn = L(t.dsn);
            const e = nt(this._dsn, t);
            this._transport = t.transport({
              recordDroppedEvent: this.recordDroppedEvent.bind(this),
              ...t.transportOptions,
              url: e,
            });
          } else
            ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              E.kg.warn("No DSN provided, client will not do anything.");
        }
        captureException(t, e, n) {
          if ((0, v.YO)(t))
            return void (
              ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              E.kg.log(st)
            );
          let r;
          return (
            this._process(
              this.eventFromException(t, e)
                .then((t) => this._captureEvent(t, e, n))
                .then((t) => {
                  r = t;
                })
            ),
            r
          );
        }
        captureMessage(t, e, n, r) {
          let i;
          const o = (0, A.pt)(t)
            ? this.eventFromMessage(String(t), e, n)
            : this.eventFromException(t, n);
          return (
            this._process(
              o
                .then((t) => this._captureEvent(t, n, r))
                .then((t) => {
                  i = t;
                })
            ),
            i
          );
        }
        captureEvent(t, e, n) {
          if (e && e.originalException && (0, v.YO)(e.originalException))
            return void (
              ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              E.kg.log(st)
            );
          let r;
          return (
            this._process(
              this._captureEvent(t, e, n).then((t) => {
                r = t;
              })
            ),
            r
          );
        }
        captureSession(t) {
          this._isEnabled()
            ? "string" !== typeof t.release
              ? ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                E.kg.warn(
                  "Discarded session because of missing or non-string release"
                )
              : (this.sendSession(t), (0, ot.CT)(t, { init: !1 }))
            : ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              E.kg.warn("SDK not enabled, will not capture session.");
        }
        getDsn() {
          return this._dsn;
        }
        getOptions() {
          return this._options;
        }
        getTransport() {
          return this._transport;
        }
        flush(t) {
          const e = this._transport;
          return e
            ? this._isClientDoneProcessing(t).then((n) =>
                e.flush(t).then((t) => n && t)
              )
            : (0, M.WD)(!0);
        }
        close(t) {
          return this.flush(t).then(
            (t) => ((this.getOptions().enabled = !1), t)
          );
        }
        setupIntegrations() {
          this._isEnabled() &&
            !this._integrationsInitialized &&
            ((this._integrations = (function (t) {
              const e = {};
              return (
                t.forEach((t) => {
                  (e[t.name] = t),
                    -1 === T.indexOf(t.name) &&
                      (t.setupOnce(b.c, S.Gd),
                      T.push(t.name),
                      ("undefined" === typeof __SENTRY_DEBUG__ ||
                        __SENTRY_DEBUG__) &&
                        E.kg.log(`Integration installed: ${t.name}`));
                }),
                e
              );
            })(this._options.integrations)),
            (this._integrationsInitialized = !0));
        }
        getIntegrationById(t) {
          return this._integrations[t];
        }
        getIntegration(t) {
          try {
            return this._integrations[t.id] || null;
          } catch (e) {
            return (
              ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                E.kg.warn(
                  `Cannot retrieve integration ${t.id} from the current Client`
                ),
              null
            );
          }
        }
        sendEvent(t, e = {}) {
          if (this._dsn) {
            let n = it(
              t,
              this._dsn,
              this._options._metadata,
              this._options.tunnel
            );
            for (const t of e.attachments || [])
              n = W(
                n,
                K(
                  t,
                  this._options.transportOptions &&
                    this._options.transportOptions.textEncoder
                )
              );
            this._sendEnvelope(n);
          }
        }
        sendSession(t) {
          if (this._dsn) {
            const e = (function (t, e, n, r) {
              const i = rt(n);
              return z(
                {
                  sent_at: new Date().toISOString(),
                  ...(i && { sdk: i }),
                  ...(!!r && { dsn: $(e) }),
                },
                [
                  "aggregates" in t
                    ? [{ type: "sessions" }, t]
                    : [{ type: "session" }, t],
                ]
              );
            })(t, this._dsn, this._options._metadata, this._options.tunnel);
            this._sendEnvelope(e);
          }
        }
        recordDroppedEvent(t, e, n) {
          if (this._options.sendClientReports) {
            const n = `${t}:${e}`;
            ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              E.kg.log(`Adding outcome: "${n}"`),
              (this._outcomes[n] = this._outcomes[n] + 1 || 1);
          }
        }
        _updateSessionFromEvent(t, e) {
          let n = !1,
            r = !1;
          const i = e.exception && e.exception.values;
          if (i) {
            r = !0;
            for (const t of i) {
              const e = t.mechanism;
              if (e && !1 === e.handled) {
                n = !0;
                break;
              }
            }
          }
          const o = "ok" === t.status;
          ((o && 0 === t.errors) || (o && n)) &&
            ((0, ot.CT)(t, {
              ...(n && { status: "crashed" }),
              errors: t.errors || Number(r || n),
            }),
            this.captureSession(t));
        }
        _isClientDoneProcessing(t) {
          return new M.cW((e) => {
            let n = 0;
            const r = setInterval(() => {
              0 == this._numProcessing
                ? (clearInterval(r), e(!0))
                : ((n += 1), t && n >= t && (clearInterval(r), e(!1)));
            }, 1);
          });
        }
        _isEnabled() {
          return !1 !== this.getOptions().enabled && void 0 !== this._dsn;
        }
        _prepareEvent(t, e, n) {
          const { normalizeDepth: r = 3, normalizeMaxBreadth: i = 1e3 } =
              this.getOptions(),
            o = {
              ...t,
              event_id: t.event_id || e.event_id || (0, v.DM)(),
              timestamp: t.timestamp || (0, tt.yW)(),
            };
          this._applyClientOptions(o), this._applyIntegrationsMetadata(o);
          let s = n;
          e.captureContext && (s = b.s.clone(s).update(e.captureContext));
          let a = (0, M.WD)(o);
          if (s && s.getAttachments) {
            const t = [...(e.attachments || []), ...s.getAttachments()];
            t.length && (e.attachments = t), (a = s.applyToEvent(o, e));
          }
          return a.then((t) =>
            "number" === typeof r && r > 0 ? this._normalizeEvent(t, r, i) : t
          );
        }
        _normalizeEvent(t, e, n) {
          if (!t) return null;
          const r = {
            ...t,
            ...(t.breadcrumbs && {
              breadcrumbs: t.breadcrumbs.map((t) => ({
                ...t,
                ...(t.data && { data: F(t.data, e, n) }),
              })),
            }),
            ...(t.user && { user: F(t.user, e, n) }),
            ...(t.contexts && { contexts: F(t.contexts, e, n) }),
            ...(t.extra && { extra: F(t.extra, e, n) }),
          };
          return (
            t.contexts &&
              t.contexts.trace &&
              r.contexts &&
              ((r.contexts.trace = t.contexts.trace),
              t.contexts.trace.data &&
                (r.contexts.trace.data = F(t.contexts.trace.data, e, n))),
            t.spans &&
              (r.spans = t.spans.map(
                (t) => (t.data && (t.data = F(t.data, e, n)), t)
              )),
            r
          );
        }
        _applyClientOptions(t) {
          const e = this.getOptions(),
            {
              environment: n,
              release: r,
              dist: i,
              maxValueLength: o = 250,
            } = e;
          "environment" in t ||
            (t.environment = "environment" in e ? n : "production"),
            void 0 === t.release && void 0 !== r && (t.release = r),
            void 0 === t.dist && void 0 !== i && (t.dist = i),
            t.message && (t.message = (0, w.$G)(t.message, o));
          const s = t.exception && t.exception.values && t.exception.values[0];
          s && s.value && (s.value = (0, w.$G)(s.value, o));
          const a = t.request;
          a && a.url && (a.url = (0, w.$G)(a.url, o));
        }
        _applyIntegrationsMetadata(t) {
          const e = Object.keys(this._integrations);
          e.length > 0 &&
            ((t.sdk = t.sdk || {}),
            (t.sdk.integrations = [...(t.sdk.integrations || []), ...e]));
        }
        _captureEvent(t, e = {}, n) {
          return this._processEvent(t, e, n).then(
            (t) => t.event_id,
            (t) => {
              if ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) {
                const e = t;
                "log" === e.logLevel ? E.kg.log(e.message) : E.kg.warn(e);
              }
            }
          );
        }
        _processEvent(t, e, n) {
          const r = this.getOptions(),
            { sampleRate: i } = r;
          if (!this._isEnabled())
            return (0, M.$2)(
              new I("SDK not enabled, will not capture event.", "log")
            );
          const o = "transaction" === t.type,
            s = o ? "beforeSendTransaction" : "beforeSend",
            a = r[s];
          return !o && "number" === typeof i && Math.random() > i
            ? (this.recordDroppedEvent("sample_rate", "error", t),
              (0, M.$2)(
                new I(
                  `Discarding event because it's not included in the random sample (sampling rate = ${i})`,
                  "log"
                )
              ))
            : this._prepareEvent(t, e, n)
                .then((n) => {
                  if (null === n)
                    throw (
                      (this.recordDroppedEvent(
                        "event_processor",
                        t.type || "error",
                        t
                      ),
                      new I(
                        "An event processor returned `null`, will not send event.",
                        "log"
                      ))
                    );
                  if ((e.data && !0 === e.data.__sentry__) || !a) return n;
                  return (function (t, e) {
                    const n = `\`${e}\` must return \`null\` or a valid event.`;
                    if ((0, A.J8)(t))
                      return t.then(
                        (t) => {
                          if (!(0, A.PO)(t) && null !== t) throw new I(n);
                          return t;
                        },
                        (t) => {
                          throw new I(`\`${e}\` rejected with ${t}`);
                        }
                      );
                    if (!(0, A.PO)(t) && null !== t) throw new I(n);
                    return t;
                  })(a(n, e), s);
                })
                .then((r) => {
                  if (null === r)
                    throw (
                      (this.recordDroppedEvent(
                        "before_send",
                        t.type || "error",
                        t
                      ),
                      new I(
                        `\`${s}\` returned \`null\`, will not send event.`,
                        "log"
                      ))
                    );
                  const i = n && n.getSession();
                  !o && i && this._updateSessionFromEvent(i, r);
                  const a = r.transaction_info;
                  if (o && a && r.transaction !== t.transaction) {
                    const t = "custom";
                    r.transaction_info = {
                      ...a,
                      source: t,
                      changes: [
                        ...a.changes,
                        {
                          source: t,
                          timestamp: r.timestamp,
                          propagations: a.propagations,
                        },
                      ],
                    };
                  }
                  return this.sendEvent(r, e), r;
                })
                .then(null, (t) => {
                  if (t instanceof I) throw t;
                  throw (
                    (this.captureException(t, {
                      data: { __sentry__: !0 },
                      originalException: t,
                    }),
                    new I(
                      `Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ${t}`
                    ))
                  );
                });
        }
        _process(t) {
          this._numProcessing++,
            t.then(
              (t) => (this._numProcessing--, t),
              (t) => (this._numProcessing--, t)
            );
        }
        _sendEnvelope(t) {
          this._transport && this._dsn
            ? this._transport.send(t).then(null, (t) => {
                ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                  E.kg.error("Error while sending event:", t);
              })
            : ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              E.kg.error("Transport disabled");
        }
        _clearOutcomes() {
          const t = this._outcomes;
          return (
            (this._outcomes = {}),
            Object.keys(t).map((e) => {
              const [n, r] = e.split(":");
              return { reason: n, category: r, quantity: t[e] };
            })
          );
        }
      }
      function ct(t, e) {
        const n = lt(t, e),
          r = { type: e && e.name, value: pt(e) };
        return (
          n.length && (r.stacktrace = { frames: n }),
          void 0 === r.type &&
            "" === r.value &&
            (r.value = "Unrecoverable error caught"),
          r
        );
      }
      function ut(t, e) {
        return { exception: { values: [ct(t, e)] } };
      }
      function lt(t, e) {
        const n = e.stacktrace || e.stack || "",
          r = (function (t) {
            if (t) {
              if ("number" === typeof t.framesToPop) return t.framesToPop;
              if (dt.test(t.message)) return 1;
            }
            return 0;
          })(e);
        try {
          return t(n, r);
        } catch (i) {}
        return [];
      }
      const dt = /Minified React error #\d+;/i;
      function pt(t) {
        const e = t && t.message;
        return e
          ? e.error && "string" === typeof e.error.message
            ? e.error.message
            : e
          : "No error message";
      }
      function _t(t, e, n, r, i) {
        let o;
        if ((0, A.VW)(e) && e.error) {
          return ut(t, e.error);
        }
        if ((0, A.TX)(e) || (0, A.fm)(e)) {
          const i = e;
          if ("stack" in e) o = ut(t, e);
          else {
            const e = i.name || ((0, A.TX)(i) ? "DOMError" : "DOMException"),
              s = i.message ? `${e}: ${i.message}` : e;
            (o = ft(t, s, n, r)), (0, v.Db)(o, s);
          }
          return (
            "code" in i &&
              (o.tags = { ...o.tags, "DOMException.code": `${i.code}` }),
            o
          );
        }
        if ((0, A.VZ)(e)) return ut(t, e);
        if ((0, A.PO)(e) || (0, A.cO)(e)) {
          return (
            (o = (function (t, e, n, r) {
              const i = (0, S.Gd)().getClient(),
                o = i && i.getOptions().normalizeDepth,
                s = {
                  exception: {
                    values: [
                      {
                        type: (0, A.cO)(e)
                          ? e.constructor.name
                          : r
                          ? "UnhandledRejection"
                          : "Error",
                        value: `Non-Error ${
                          r ? "promise rejection" : "exception"
                        } captured with keys: ${(0, D.zf)(e)}`,
                      },
                    ],
                  },
                  extra: { __serialized__: q(e, o) },
                };
              if (n) {
                const e = lt(t, n);
                e.length && (s.exception.values[0].stacktrace = { frames: e });
              }
              return s;
            })(t, e, n, i)),
            (0, v.EG)(o, { synthetic: !0 }),
            o
          );
        }
        return (
          (o = ft(t, e, n, r)),
          (0, v.Db)(o, `${e}`, void 0),
          (0, v.EG)(o, { synthetic: !0 }),
          o
        );
      }
      function ft(t, e, n, r) {
        const i = { message: e };
        if (r && n) {
          const r = lt(t, n);
          r.length &&
            (i.exception = {
              values: [{ value: e, stacktrace: { frames: r } }],
            });
        }
        return i;
      }
      function ht(t, e) {
        return (0, S.Gd)().captureException(t, { captureContext: e });
      }
      function mt(t, e) {
        const n = "string" === typeof e ? e : void 0,
          r = "string" !== typeof e ? { captureContext: e } : void 0;
        return (0, S.Gd)().captureMessage(t, n, r);
      }
      function gt(t) {
        (0, S.Gd)().withScope(t);
      }
      var yt = n(71235);
      const vt = yt.n2;
      let Et = 0;
      function St() {
        return Et > 0;
      }
      function bt() {
        Et++,
          setTimeout(() => {
            Et--;
          });
      }
      function Tt(t, e = {}, n) {
        if ("function" !== typeof t) return t;
        try {
          const e = t.__sentry_wrapped__;
          if (e) return e;
          if ((0, D.HK)(t)) return t;
        } catch (i) {
          return t;
        }
        const r = function () {
          const r = Array.prototype.slice.call(arguments);
          try {
            n && "function" === typeof n && n.apply(this, arguments);
            const i = r.map((t) => Tt(t, e));
            return t.apply(this, i);
          } catch (i) {
            throw (
              (bt(),
              gt((t) => {
                t.addEventProcessor(
                  (t) => (
                    e.mechanism &&
                      ((0, v.Db)(t, void 0, void 0), (0, v.EG)(t, e.mechanism)),
                    (t.extra = { ...t.extra, arguments: r }),
                    t
                  )
                ),
                  ht(i);
              }),
              i)
            );
          }
        };
        try {
          for (const e in t)
            Object.prototype.hasOwnProperty.call(t, e) && (r[e] = t[e]);
        } catch (o) {}
        (0, D.$Q)(r, t), (0, D.xp)(t, "__sentry_wrapped__", r);
        try {
          Object.getOwnPropertyDescriptor(r, "name").configurable &&
            Object.defineProperty(r, "name", { get: () => t.name });
        } catch (o) {}
        return r;
      }
      var xt = n(58464);
      const wt = ["fatal", "error", "warning", "log", "info", "debug"];
      function kt(t) {
        return "warn" === t ? "warning" : wt.includes(t) ? t : "log";
      }
      function Rt(t) {
        if (!t) return {};
        const e = t.match(
          /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
        );
        if (!e) return {};
        const n = e[6] || "",
          r = e[8] || "";
        return {
          host: e[4],
          path: e[5],
          protocol: e[2],
          relative: e[5] + n + r,
        };
      }
      const Nt = "Breadcrumbs";
      class Dt {
        static __initStatic() {
          this.id = Nt;
        }
        __init() {
          this.name = Dt.id;
        }
        constructor(t) {
          Dt.prototype.__init.call(this),
            (this.options = {
              console: !0,
              dom: !0,
              fetch: !0,
              history: !0,
              sentry: !0,
              xhr: !0,
              ...t,
            });
        }
        setupOnce() {
          this.options.console && (0, U.o)("console", Ot),
            this.options.dom &&
              (0, U.o)(
                "dom",
                (function (t) {
                  function e(e) {
                    let n,
                      r = "object" === typeof t ? t.serializeAttribute : void 0;
                    "string" === typeof r && (r = [r]);
                    try {
                      n = e.event.target
                        ? (0, xt.Rt)(e.event.target, r)
                        : (0, xt.Rt)(e.event, r);
                    } catch (i) {
                      n = "<unknown>";
                    }
                    0 !== n.length &&
                      (0, S.Gd)().addBreadcrumb(
                        { category: `ui.${e.name}`, message: n },
                        { event: e.event, name: e.name, global: e.global }
                      );
                  }
                  return e;
                })(this.options.dom)
              ),
            this.options.xhr && (0, U.o)("xhr", Bt),
            this.options.fetch && (0, U.o)("fetch", Ct),
            this.options.history && (0, U.o)("history", jt);
        }
        addSentryBreadcrumb(t) {
          this.options.sentry &&
            (0, S.Gd)().addBreadcrumb(
              {
                category:
                  "sentry." +
                  ("transaction" === t.type ? "transaction" : "event"),
                event_id: t.event_id,
                level: t.level,
                message: (0, v.jH)(t),
              },
              { event: t }
            );
        }
      }
      function Ot(t) {
        for (let n = 0; n < t.args.length; n++)
          if ("ref=Ref<" === t.args[n]) {
            t.args[n + 1] = "viewRef";
            break;
          }
        const e = {
          category: "console",
          data: { arguments: t.args, logger: "console" },
          level: kt(t.level),
          message: (0, w.nK)(t.args, " "),
        };
        if ("assert" === t.level) {
          if (!1 !== t.args[0]) return;
          (e.message = `Assertion failed: ${
            (0, w.nK)(t.args.slice(1), " ") || "console.assert"
          }`),
            (e.data.arguments = t.args.slice(1));
        }
        (0, S.Gd)().addBreadcrumb(e, { input: t.args, level: t.level });
      }
      function Bt(t) {
        if (t.endTimestamp) {
          if (t.xhr.__sentry_own_request__) return;
          const {
            method: e,
            url: n,
            status_code: r,
            body: i,
          } = t.xhr.__sentry_xhr__ || {};
          (0, S.Gd)().addBreadcrumb(
            {
              category: "xhr",
              data: { method: e, url: n, status_code: r },
              type: "http",
            },
            { xhr: t.xhr, input: i }
          );
        } else;
      }
      function Ct(t) {
        t.endTimestamp &&
          ((t.fetchData.url.match(/sentry_key/) &&
            "POST" === t.fetchData.method) ||
            (t.error
              ? (0, S.Gd)().addBreadcrumb(
                  {
                    category: "fetch",
                    data: t.fetchData,
                    level: "error",
                    type: "http",
                  },
                  { data: t.error, input: t.args }
                )
              : (0, S.Gd)().addBreadcrumb(
                  {
                    category: "fetch",
                    data: { ...t.fetchData, status_code: t.response.status },
                    type: "http",
                  },
                  { input: t.args, response: t.response }
                )));
      }
      function jt(t) {
        let e = t.from,
          n = t.to;
        const r = Rt(vt.location.href);
        let i = Rt(e);
        const o = Rt(n);
        i.path || (i = r),
          r.protocol === o.protocol && r.host === o.host && (n = o.relative),
          r.protocol === i.protocol && r.host === i.host && (e = i.relative),
          (0, S.Gd)().addBreadcrumb({
            category: "navigation",
            data: { from: e, to: n },
          });
      }
      Dt.__initStatic();
      class Ut extends at {
        constructor(t) {
          (t._metadata = t._metadata || {}),
            (t._metadata.sdk = t._metadata.sdk || {
              name: "sentry.javascript.browser",
              packages: [{ name: "npm:@sentry/browser", version: y }],
              version: y,
            }),
            super(t),
            t.sendClientReports &&
              vt.document &&
              vt.document.addEventListener("visibilitychange", () => {
                "hidden" === vt.document.visibilityState &&
                  this._flushOutcomes();
              });
        }
        eventFromException(t, e) {
          return (function (t, e, n, r) {
            const i = _t(t, e, (n && n.syntheticException) || void 0, r);
            return (
              (0, v.EG)(i),
              (i.level = "error"),
              n && n.event_id && (i.event_id = n.event_id),
              (0, M.WD)(i)
            );
          })(this._options.stackParser, t, e, this._options.attachStacktrace);
        }
        eventFromMessage(t, e = "info", n) {
          return (function (t, e, n = "info", r, i) {
            const o = ft(t, e, (r && r.syntheticException) || void 0, i);
            return (
              (o.level = n),
              r && r.event_id && (o.event_id = r.event_id),
              (0, M.WD)(o)
            );
          })(
            this._options.stackParser,
            t,
            e,
            n,
            this._options.attachStacktrace
          );
        }
        sendEvent(t, e) {
          G([
            this.getIntegrationById(Nt),
            "optionalAccess",
            (t) => t.addSentryBreadcrumb,
            "optionalCall",
            (e) => e(t),
          ]),
            super.sendEvent(t, e);
        }
        _prepareEvent(t, e, n) {
          return (
            (t.platform = t.platform || "javascript"),
            super._prepareEvent(t, e, n)
          );
        }
        _flushOutcomes() {
          const t = this._clearOutcomes();
          if (0 === t.length)
            return void (
              ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              E.kg.log("No outcomes to send")
            );
          if (!this._dsn)
            return void (
              ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              E.kg.log("No dsn provided, will not send outcomes")
            );
          ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
            E.kg.log("Sending outcomes:", t);
          const e = nt(this._dsn, this._options),
            n =
              ((r = t),
              z((i = this._options.tunnel && $(this._dsn)) ? { dsn: i } : {}, [
                [
                  { type: "client_report" },
                  { timestamp: o || (0, tt.yW)(), discarded_events: r },
                ],
              ]));
          var r, i, o;
          try {
            const t =
              "[object Navigator]" ===
              Object.prototype.toString.call(vt && vt.navigator);
            if (
              t &&
              "function" === typeof vt.navigator.sendBeacon &&
              !this._options.transportOptions
            ) {
              vt.navigator.sendBeacon.bind(vt.navigator)(e, J(n));
            } else this._sendEnvelope(n);
          } catch (s) {
            ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              E.kg.error(s);
          }
        }
      }
      const Gt = "?";
      function It(t, e, n, r) {
        const i = { filename: t, function: e, in_app: !0 };
        return void 0 !== n && (i.lineno = n), void 0 !== r && (i.colno = r), i;
      }
      const Yt =
          /^\s*at (?:(.*\).*?|.*?) ?\((?:address at )?)?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
        $t = /\((\S*)(?::(\d+))(?::(\d+))\)/,
        Pt =
          /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|safari-extension|safari-web-extension|capacitor)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
        Lt = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
        At =
          /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
        Mt = [
          [
            30,
            (t) => {
              const e = Yt.exec(t);
              if (e) {
                if (e[2] && 0 === e[2].indexOf("eval")) {
                  const t = $t.exec(e[2]);
                  t && ((e[2] = t[1]), (e[3] = t[2]), (e[4] = t[3]));
                }
                const [t, n] = qt(e[1] || Gt, e[2]);
                return It(n, t, e[3] ? +e[3] : void 0, e[4] ? +e[4] : void 0);
              }
            },
          ],
          [
            50,
            (t) => {
              const e = Pt.exec(t);
              if (e) {
                if (e[3] && e[3].indexOf(" > eval") > -1) {
                  const t = Lt.exec(e[3]);
                  t &&
                    ((e[1] = e[1] || "eval"),
                    (e[3] = t[1]),
                    (e[4] = t[2]),
                    (e[5] = ""));
                }
                let t = e[3],
                  n = e[1] || Gt;
                return (
                  ([n, t] = qt(n, t)),
                  It(t, n, e[4] ? +e[4] : void 0, e[5] ? +e[5] : void 0)
                );
              }
            },
          ],
          [
            40,
            (t) => {
              const e = At.exec(t);
              return e
                ? It(e[2], e[1] || Gt, +e[3], e[4] ? +e[4] : void 0)
                : void 0;
            },
          ],
        ],
        Ft = (0, C.pE)(...Mt),
        qt = (t, e) => {
          const n = -1 !== t.indexOf("safari-extension"),
            r = -1 !== t.indexOf("safari-web-extension");
          return n || r
            ? [
                -1 !== t.indexOf("@") ? t.split("@")[0] : Gt,
                n ? `safari-extension:${e}` : `safari-web-extension:${e}`,
              ]
            : [t, e];
        },
        Ht = [
          "EventTarget",
          "Window",
          "Node",
          "ApplicationCache",
          "AudioTrackList",
          "ChannelMergerNode",
          "CryptoOperation",
          "EventSource",
          "FileReader",
          "HTMLUnknownElement",
          "IDBDatabase",
          "IDBRequest",
          "IDBTransaction",
          "KeyOperation",
          "MediaController",
          "MessagePort",
          "ModalWindow",
          "Notification",
          "SVGElementInstance",
          "Screen",
          "TextTrack",
          "TextTrackCue",
          "TextTrackList",
          "WebSocket",
          "WebSocketWorker",
          "Worker",
          "XMLHttpRequest",
          "XMLHttpRequestEventTarget",
          "XMLHttpRequestUpload",
        ];
      class zt {
        static __initStatic() {
          this.id = "TryCatch";
        }
        __init() {
          this.name = zt.id;
        }
        constructor(t) {
          zt.prototype.__init.call(this),
            (this._options = {
              XMLHttpRequest: !0,
              eventTarget: !0,
              requestAnimationFrame: !0,
              setInterval: !0,
              setTimeout: !0,
              ...t,
            });
        }
        setupOnce() {
          this._options.setTimeout && (0, D.hl)(vt, "setTimeout", Wt),
            this._options.setInterval && (0, D.hl)(vt, "setInterval", Wt),
            this._options.requestAnimationFrame &&
              (0, D.hl)(vt, "requestAnimationFrame", Xt),
            this._options.XMLHttpRequest &&
              "XMLHttpRequest" in vt &&
              (0, D.hl)(XMLHttpRequest.prototype, "send", Vt);
          const t = this._options.eventTarget;
          if (t) {
            (Array.isArray(t) ? t : Ht).forEach(Jt);
          }
        }
      }
      function Wt(t) {
        return function (...e) {
          const n = e[0];
          return (
            (e[0] = Tt(n, {
              mechanism: {
                data: { function: (0, C.$P)(t) },
                handled: !0,
                type: "instrument",
              },
            })),
            t.apply(this, e)
          );
        };
      }
      function Xt(t) {
        return function (e) {
          return t.apply(this, [
            Tt(e, {
              mechanism: {
                data: {
                  function: "requestAnimationFrame",
                  handler: (0, C.$P)(t),
                },
                handled: !0,
                type: "instrument",
              },
            }),
          ]);
        };
      }
      function Vt(t) {
        return function (...e) {
          const n = this;
          return (
            ["onload", "onerror", "onprogress", "onreadystatechange"].forEach(
              (t) => {
                t in n &&
                  "function" === typeof n[t] &&
                  (0, D.hl)(n, t, function (e) {
                    const n = {
                        mechanism: {
                          data: { function: t, handler: (0, C.$P)(e) },
                          handled: !0,
                          type: "instrument",
                        },
                      },
                      r = (0, D.HK)(e);
                    return (
                      r && (n.mechanism.data.handler = (0, C.$P)(r)), Tt(e, n)
                    );
                  });
              }
            ),
            t.apply(this, e)
          );
        };
      }
      function Jt(t) {
        const e = vt,
          n = e[t] && e[t].prototype;
        n &&
          n.hasOwnProperty &&
          n.hasOwnProperty("addEventListener") &&
          ((0, D.hl)(n, "addEventListener", function (e) {
            return function (n, r, i) {
              try {
                "function" === typeof r.handleEvent &&
                  (r.handleEvent = Tt(r.handleEvent, {
                    mechanism: {
                      data: {
                        function: "handleEvent",
                        handler: (0, C.$P)(r),
                        target: t,
                      },
                      handled: !0,
                      type: "instrument",
                    },
                  }));
              } catch (o) {}
              return e.apply(this, [
                n,
                Tt(r, {
                  mechanism: {
                    data: {
                      function: "addEventListener",
                      handler: (0, C.$P)(r),
                      target: t,
                    },
                    handled: !0,
                    type: "instrument",
                  },
                }),
                i,
              ]);
            };
          }),
          (0, D.hl)(n, "removeEventListener", function (t) {
            return function (e, n, r) {
              const i = n;
              try {
                const n = i && i.__sentry_wrapped__;
                n && t.call(this, e, n, r);
              } catch (o) {}
              return t.call(this, e, i, r);
            };
          }));
      }
      zt.__initStatic();
      class Kt {
        static __initStatic() {
          this.id = "GlobalHandlers";
        }
        __init() {
          this.name = Kt.id;
        }
        __init2() {
          this._installFunc = { onerror: Zt, onunhandledrejection: Qt };
        }
        constructor(t) {
          Kt.prototype.__init.call(this),
            Kt.prototype.__init2.call(this),
            (this._options = { onerror: !0, onunhandledrejection: !0, ...t });
        }
        setupOnce() {
          Error.stackTraceLimit = 50;
          const t = this._options;
          for (const n in t) {
            const r = this._installFunc[n];
            r &&
              t[n] &&
              ((e = n),
              ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                E.kg.log(`Global Handler attached: ${e}`),
              r(),
              (this._installFunc[n] = void 0));
          }
          var e;
        }
      }
      function Zt() {
        (0, U.o)("error", (t) => {
          const [e, n, r] = ne();
          if (!e.getIntegration(Kt)) return;
          const { msg: i, url: o, line: s, column: a, error: c } = t;
          if (St() || (c && c.__sentry_own_request__)) return;
          const u =
            void 0 === c && (0, A.HD)(i)
              ? (function (t, e, n, r) {
                  const i =
                    /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
                  let o = (0, A.VW)(t) ? t.message : t,
                    s = "Error";
                  const a = o.match(i);
                  a && ((s = a[1]), (o = a[2]));
                  return te(
                    { exception: { values: [{ type: s, value: o }] } },
                    e,
                    n,
                    r
                  );
                })(i, o, s, a)
              : te(_t(n, c || i, void 0, r, !1), o, s, a);
          (u.level = "error"), ee(e, c, u, "onerror");
        });
      }
      function Qt() {
        (0, U.o)("unhandledrejection", (t) => {
          const [e, n, r] = ne();
          if (!e.getIntegration(Kt)) return;
          let i = t;
          try {
            "reason" in t
              ? (i = t.reason)
              : "detail" in t && "reason" in t.detail && (i = t.detail.reason);
          } catch (s) {}
          if (St() || (i && i.__sentry_own_request__)) return !0;
          const o = (0, A.pt)(i)
            ? {
                exception: {
                  values: [
                    {
                      type: "UnhandledRejection",
                      value: `Non-Error promise rejection captured with value: ${String(
                        i
                      )}`,
                    },
                  ],
                },
              }
            : _t(n, i, void 0, r, !0);
          (o.level = "error"), ee(e, i, o, "onunhandledrejection");
        });
      }
      function te(t, e, n, r) {
        const i = (t.exception = t.exception || {}),
          o = (i.values = i.values || []),
          s = (o[0] = o[0] || {}),
          a = (s.stacktrace = s.stacktrace || {}),
          c = (a.frames = a.frames || []),
          u = isNaN(parseInt(r, 10)) ? void 0 : r,
          l = isNaN(parseInt(n, 10)) ? void 0 : n,
          d = (0, A.HD)(e) && e.length > 0 ? e : (0, xt.l4)();
        return (
          0 === c.length &&
            c.push({
              colno: u,
              filename: d,
              function: "?",
              in_app: !0,
              lineno: l,
            }),
          t
        );
      }
      function ee(t, e, n, r) {
        (0, v.EG)(n, { handled: !1, type: r }),
          t.captureEvent(n, { originalException: e });
      }
      function ne() {
        const t = (0, S.Gd)(),
          e = t.getClient(),
          n = (e && e.getOptions()) || {
            stackParser: () => [],
            attachStacktrace: !1,
          };
        return [t, n.stackParser, n.attachStacktrace];
      }
      Kt.__initStatic();
      class re {
        static __initStatic() {
          this.id = "LinkedErrors";
        }
        __init() {
          this.name = re.id;
        }
        constructor(t = {}) {
          re.prototype.__init.call(this),
            (this._key = t.key || "cause"),
            (this._limit = t.limit || 5);
        }
        setupOnce() {
          const t = (0, S.Gd)().getClient();
          t &&
            (0, b.c)((e, n) => {
              const r = (0, S.Gd)().getIntegration(re);
              return r
                ? (function (t, e, n, r, i) {
                    if (
                      !r.exception ||
                      !r.exception.values ||
                      !i ||
                      !(0, A.V9)(i.originalException, Error)
                    )
                      return r;
                    const o = ie(t, n, i.originalException, e);
                    return (
                      (r.exception.values = [...o, ...r.exception.values]), r
                    );
                  })(t.getOptions().stackParser, r._key, r._limit, e, n)
                : e;
            });
        }
      }
      function ie(t, e, n, r, i = []) {
        if (!(0, A.V9)(n[r], Error) || i.length + 1 >= e) return i;
        const o = ct(t, n[r]);
        return ie(t, e, n[r], r, [o, ...i]);
      }
      re.__initStatic();
      class oe {
        constructor() {
          oe.prototype.__init.call(this);
        }
        static __initStatic() {
          this.id = "Dedupe";
        }
        __init() {
          this.name = oe.id;
        }
        setupOnce(t, e) {
          const n = (t) => {
            const n = e().getIntegration(oe);
            if (n) {
              try {
                if (
                  (function (t, e) {
                    if (!e) return !1;
                    if (
                      (function (t, e) {
                        const n = t.message,
                          r = e.message;
                        if (!n && !r) return !1;
                        if ((n && !r) || (!n && r)) return !1;
                        if (n !== r) return !1;
                        if (!ae(t, e)) return !1;
                        if (!se(t, e)) return !1;
                        return !0;
                      })(t, e)
                    )
                      return !0;
                    if (
                      (function (t, e) {
                        const n = ce(e),
                          r = ce(t);
                        if (!n || !r) return !1;
                        if (n.type !== r.type || n.value !== r.value) return !1;
                        if (!ae(t, e)) return !1;
                        if (!se(t, e)) return !1;
                        return !0;
                      })(t, e)
                    )
                      return !0;
                    return !1;
                  })(t, n._previousEvent)
                )
                  return (
                    ("undefined" === typeof __SENTRY_DEBUG__ ||
                      __SENTRY_DEBUG__) &&
                      E.kg.warn(
                        "Event dropped due to being a duplicate of previously captured event."
                      ),
                    null
                  );
              } catch (r) {
                return (n._previousEvent = t);
              }
              return (n._previousEvent = t);
            }
            return t;
          };
          (n.id = this.name), t(n);
        }
      }
      function se(t, e) {
        let n = ue(t),
          r = ue(e);
        if (!n && !r) return !0;
        if ((n && !r) || (!n && r)) return !1;
        if (((n = n), (r = r), r.length !== n.length)) return !1;
        for (let i = 0; i < r.length; i++) {
          const t = r[i],
            e = n[i];
          if (
            t.filename !== e.filename ||
            t.lineno !== e.lineno ||
            t.colno !== e.colno ||
            t.function !== e.function
          )
            return !1;
        }
        return !0;
      }
      function ae(t, e) {
        let n = t.fingerprint,
          r = e.fingerprint;
        if (!n && !r) return !0;
        if ((n && !r) || (!n && r)) return !1;
        (n = n), (r = r);
        try {
          return !(n.join("") !== r.join(""));
        } catch (i) {
          return !1;
        }
      }
      function ce(t) {
        return t.exception && t.exception.values && t.exception.values[0];
      }
      function ue(t) {
        const e = t.exception;
        if (e)
          try {
            return e.values[0].stacktrace.frames;
          } catch (n) {
            return;
          }
      }
      oe.__initStatic();
      class le {
        constructor() {
          le.prototype.__init.call(this);
        }
        static __initStatic() {
          this.id = "HttpContext";
        }
        __init() {
          this.name = le.id;
        }
        setupOnce() {
          (0, b.c)((t) => {
            if ((0, S.Gd)().getIntegration(le)) {
              if (!vt.navigator && !vt.location && !vt.document) return t;
              const e =
                  (t.request && t.request.url) ||
                  (vt.location && vt.location.href),
                { referrer: n } = vt.document || {},
                { userAgent: r } = vt.navigator || {},
                i = {
                  ...(e && { url: e }),
                  headers: {
                    ...(t.request && t.request.headers),
                    ...(n && { Referer: n }),
                    ...(r && { "User-Agent": r }),
                  },
                };
              return { ...t, request: i };
            }
            return t;
          });
        }
      }
      function de(t) {
        const e = [];
        function n(t) {
          return e.splice(e.indexOf(t), 1)[0];
        }
        return {
          $: e,
          add: function (r) {
            if (!(void 0 === t || e.length < t))
              return (0, M.$2)(
                new I("Not adding Promise because buffer limit was reached.")
              );
            const i = r();
            return (
              -1 === e.indexOf(i) && e.push(i),
              i.then(() => n(i)).then(null, () => n(i).then(null, () => {})),
              i
            );
          },
          drain: function (t) {
            return new M.cW((n, r) => {
              let i = e.length;
              if (!i) return n(!0);
              const o = setTimeout(() => {
                t && t > 0 && n(!1);
              }, t);
              e.forEach((t) => {
                (0, M.WD)(t).then(() => {
                  --i || (clearTimeout(o), n(!0));
                }, r);
              });
            });
          },
        };
      }
      le.__initStatic();
      function pe(t, { statusCode: e, headers: n }, r = Date.now()) {
        const i = { ...t },
          o = n && n["x-sentry-rate-limits"],
          s = n && n["retry-after"];
        if (o)
          for (const a of o.trim().split(",")) {
            const [t, e] = a.split(":", 2),
              n = parseInt(t, 10),
              o = 1e3 * (isNaN(n) ? 60 : n);
            if (e) for (const s of e.split(";")) i[s] = r + o;
            else i.all = r + o;
          }
        else
          s
            ? (i.all =
                r +
                (function (t, e = Date.now()) {
                  const n = parseInt(`${t}`, 10);
                  if (!isNaN(n)) return 1e3 * n;
                  const r = Date.parse(`${t}`);
                  return isNaN(r) ? 6e4 : r - e;
                })(s, r))
            : 429 === e && (i.all = r + 6e4);
        return i;
      }
      function _e(t, e, n = de(t.bufferSize || 30)) {
        let r = {};
        return {
          send: function (i) {
            const o = [];
            if (
              (X(i, (e, n) => {
                const i = Q(n);
                if (
                  (function (t, e, n = Date.now()) {
                    return (
                      (function (t, e) {
                        return t[e] || t.all || 0;
                      })(t, e) > n
                    );
                  })(r, i)
                ) {
                  const r = fe(e, n);
                  t.recordDroppedEvent("ratelimit_backoff", i, r);
                } else o.push(e);
              }),
              0 === o.length)
            )
              return (0, M.WD)();
            const s = z(i[0], o),
              a = (e) => {
                X(s, (n, r) => {
                  const i = fe(n, r);
                  t.recordDroppedEvent(e, Q(r), i);
                });
              };
            return n
              .add(() =>
                e({ body: J(s, t.textEncoder) }).then(
                  (t) => {
                    void 0 !== t.statusCode &&
                      (t.statusCode < 200 || t.statusCode >= 300) &&
                      ("undefined" === typeof __SENTRY_DEBUG__ ||
                        __SENTRY_DEBUG__) &&
                      E.kg.warn(
                        `Sentry responded with status code ${t.statusCode} to sent event.`
                      ),
                      (r = pe(r, t));
                  },
                  (t) => {
                    ("undefined" === typeof __SENTRY_DEBUG__ ||
                      __SENTRY_DEBUG__) &&
                      E.kg.error("Failed while sending event:", t),
                      a("network_error");
                  }
                )
              )
              .then(
                (t) => t,
                (t) => {
                  if (t instanceof I)
                    return (
                      ("undefined" === typeof __SENTRY_DEBUG__ ||
                        __SENTRY_DEBUG__) &&
                        E.kg.error(
                          "Skipped sending event because buffer is full."
                        ),
                      a("queue_overflow"),
                      (0, M.WD)()
                    );
                  throw t;
                }
              );
          },
          flush: (t) => n.drain(t),
        };
      }
      function fe(t, e) {
        if ("event" === e || "transaction" === e)
          return Array.isArray(t) ? t[1] : void 0;
      }
      let he;
      function me(
        t,
        e = (function () {
          if (he) return he;
          if ((0, j.Du)(vt.fetch)) return (he = vt.fetch.bind(vt));
          const t = vt.document;
          let e = vt.fetch;
          if (t && "function" === typeof t.createElement)
            try {
              const n = t.createElement("iframe");
              (n.hidden = !0), t.head.appendChild(n);
              const r = n.contentWindow;
              r && r.fetch && (e = r.fetch), t.head.removeChild(n);
            } catch (n) {
              ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                E.kg.warn(
                  "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
                  n
                );
            }
          return (he = e.bind(vt));
        })()
      ) {
        return _e(t, function (n) {
          const r = {
            body: n.body,
            method: "POST",
            referrerPolicy: "origin",
            headers: t.headers,
            keepalive: n.body.length <= 65536,
            ...t.fetchOptions,
          };
          try {
            return e(t.url, r).then((t) => ({
              statusCode: t.status,
              headers: {
                "x-sentry-rate-limits": t.headers.get("X-Sentry-Rate-Limits"),
                "retry-after": t.headers.get("Retry-After"),
              },
            }));
          } catch (i) {
            return (he = void 0), (0, M.$2)(i);
          }
        });
      }
      function ge(t) {
        return _e(t, function (e) {
          return new M.cW((n, r) => {
            const i = new XMLHttpRequest();
            (i.onerror = r),
              (i.onreadystatechange = () => {
                4 === i.readyState &&
                  n({
                    statusCode: i.status,
                    headers: {
                      "x-sentry-rate-limits": i.getResponseHeader(
                        "X-Sentry-Rate-Limits"
                      ),
                      "retry-after": i.getResponseHeader("Retry-After"),
                    },
                  });
              }),
              i.open("POST", t.url);
            for (const e in t.headers)
              Object.prototype.hasOwnProperty.call(t.headers, e) &&
                i.setRequestHeader(e, t.headers[e]);
            i.send(e.body);
          });
        });
      }
      const ye = [
        new R(),
        new B(),
        new zt(),
        new Dt(),
        new Kt(),
        new re(),
        new oe(),
        new le(),
      ];
      function ve(t = {}) {
        void 0 === t.defaultIntegrations && (t.defaultIntegrations = ye),
          void 0 === t.release &&
            ("string" === typeof __SENTRY_RELEASE__ &&
              (t.release = __SENTRY_RELEASE__),
            vt.SENTRY_RELEASE &&
              vt.SENTRY_RELEASE.id &&
              (t.release = vt.SENTRY_RELEASE.id)),
          void 0 === t.autoSessionTracking && (t.autoSessionTracking = !0),
          void 0 === t.sendClientReports && (t.sendClientReports = !0);
        const e = {
          ...t,
          stackParser: (0, C.Sq)(t.stackParser || Ft),
          integrations: x(t),
          transport: t.transport || ((0, j.Ak)() ? me : ge),
        };
        !(function (t, e) {
          !0 === e.debug &&
            ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__
              ? E.kg.enable()
              : console.warn(
                  "[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle."
                ));
          const n = (0, S.Gd)(),
            r = n.getScope();
          r && r.update(e.initialScope);
          const i = new t(e);
          n.bindClient(i);
        })(Ut, e),
          t.autoSessionTracking &&
            (function () {
              if ("undefined" === typeof vt.document)
                return void (
                  ("undefined" === typeof __SENTRY_DEBUG__ ||
                    __SENTRY_DEBUG__) &&
                  E.kg.warn(
                    "Session tracking in non-browser environment with @sentry/browser is not supported."
                  )
                );
              const t = (0, S.Gd)();
              if (!t.captureSession) return;
              Ee(t),
                (0, U.o)("history", ({ from: t, to: e }) => {
                  void 0 !== t && t !== e && Ee((0, S.Gd)());
                });
            })();
      }
      function Ee(t) {
        t.startSession({ ignoreDuration: !0 }), t.captureSession();
      }
      var Se = n(62758);
      const be = new RegExp(
        "^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$"
      );
      const Te = "baggage",
        xe = "sentry-",
        we = /^sentry-/;
      function ke(t) {
        return (function (t) {
          if (0 === Object.keys(t).length) return;
          return Object.entries(t).reduce((t, [e, n], r) => {
            const i = `${encodeURIComponent(e)}=${encodeURIComponent(n)}`,
              o = 0 === r ? i : `${t},${i}`;
            return o.length > 8192
              ? (("undefined" === typeof __SENTRY_DEBUG__ ||
                  __SENTRY_DEBUG__) &&
                  E.kg.warn(
                    `Not adding key: ${e} with val: ${n} to baggage header due to exceeding baggage size limits.`
                  ),
                t)
              : o;
          }, "");
        })(
          Object.entries(t).reduce(
            (t, [e, n]) => (n && (t[`sentry-${e}`] = n), t),
            {}
          )
        );
      }
      function Re(t) {
        return t
          .split(",")
          .map((t) => t.split("=").map((t) => decodeURIComponent(t.trim())))
          .reduce((t, [e, n]) => ((t[e] = n), t), {});
      }
      var Ne = n(16458),
        De = n(63233);
      const Oe = yt.n2;
      var Be = n(45375);
      const Ce = (t, e, n) => {
          let r, i;
          return (o) => {
            e.value >= 0 &&
              (o || n) &&
              ((i = e.value - (r || 0)),
              (i || void 0 === r) && ((r = e.value), (e.delta = i), t(e)));
          };
        },
        je = () =>
          Oe.__WEB_VITALS_POLYFILL__
            ? Oe.performance &&
              ((performance.getEntriesByType &&
                performance.getEntriesByType("navigation")[0]) ||
                (() => {
                  const t = Oe.performance.timing,
                    e = Oe.performance.navigation.type,
                    n = {
                      entryType: "navigation",
                      startTime: 0,
                      type:
                        2 == e
                          ? "back_forward"
                          : 1 === e
                          ? "reload"
                          : "navigate",
                    };
                  for (const r in t)
                    "navigationStart" !== r &&
                      "toJSON" !== r &&
                      (n[r] = Math.max(t[r] - t.navigationStart, 0));
                  return n;
                })())
            : Oe.performance &&
              performance.getEntriesByType &&
              performance.getEntriesByType("navigation")[0],
        Ue = () => {
          const t = je();
          return (t && t.activationStart) || 0;
        },
        Ge = (t, e) => {
          const n = je();
          let r = "navigate";
          return (
            n &&
              (r =
                Oe.document.prerendering || Ue() > 0
                  ? "prerender"
                  : n.type.replace(/_/g, "-")),
            {
              name: t,
              value: "undefined" === typeof e ? -1 : e,
              rating: "good",
              delta: 0,
              entries: [],
              id: `v3-${Date.now()}-${
                Math.floor(8999999999999 * Math.random()) + 1e12
              }`,
              navigationType: r,
            }
          );
        },
        Ie = (t, e, n) => {
          try {
            if (PerformanceObserver.supportedEntryTypes.includes(t)) {
              const r = new PerformanceObserver((t) => {
                e(t.getEntries());
              });
              return (
                r.observe(Object.assign({ type: t, buffered: !0 }, n || {})), r
              );
            }
          } catch (r) {}
        },
        Ye = (t, e) => {
          const n = (r) => {
            ("pagehide" !== r.type &&
              "hidden" !== Oe.document.visibilityState) ||
              (t(r),
              e &&
                (removeEventListener("visibilitychange", n, !0),
                removeEventListener("pagehide", n, !0)));
          };
          addEventListener("visibilitychange", n, !0),
            addEventListener("pagehide", n, !0);
        };
      let $e = -1;
      const Pe = () => (
          $e < 0 &&
            (($e =
              "hidden" !== Oe.document.visibilityState ||
              Oe.document.prerendering
                ? 1 / 0
                : 0),
            Ye(({ timeStamp: t }) => {
              $e = t;
            }, !0)),
          {
            get firstHiddenTime() {
              return $e;
            },
          }
        ),
        Le = {};
      function Ae(t) {
        return "number" === typeof t && isFinite(t);
      }
      function Me(t, { startTimestamp: e, ...n }) {
        return (
          e && t.startTimestamp > e && (t.startTimestamp = e),
          t.startChild({ startTimestamp: e, ...n })
        );
      }
      function Fe() {
        return Oe && Oe.addEventListener && Oe.performance;
      }
      let qe,
        He,
        ze = 0,
        We = {};
      function Xe(t = !1) {
        const e = Fe();
        e &&
          tt.Z1 &&
          (e.mark && Oe.performance.mark("sentry-tracing-init"),
          ((t, e = {}) => {
            const n = Ge("CLS", 0);
            let r,
              i = 0,
              o = [];
            const s = (t) => {
                t.forEach((t) => {
                  if (!t.hadRecentInput) {
                    const e = o[0],
                      s = o[o.length - 1];
                    i &&
                    0 !== o.length &&
                    t.startTime - s.startTime < 1e3 &&
                    t.startTime - e.startTime < 5e3
                      ? ((i += t.value), o.push(t))
                      : ((i = t.value), (o = [t])),
                      i > n.value && ((n.value = i), (n.entries = o), r && r());
                  }
                });
              },
              a = Ie("layout-shift", s);
            a &&
              ((r = Ce(t, n, e.reportAllChanges)),
              Ye(() => {
                s(a.takeRecords()), r(!0);
              }));
          })((t) => {
            const e = t.entries.pop();
            e &&
              (("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                E.kg.log("[Measurements] Adding CLS"),
              (We.cls = { value: t.value, unit: "" }),
              (He = e));
          }),
          (function (t) {
            ((t, e = {}) => {
              const n = Pe(),
                r = Ge("LCP");
              let i;
              const o = (t) => {
                  const e = t[t.length - 1];
                  if (e) {
                    const t = Math.max(e.startTime - Ue(), 0);
                    t < n.firstHiddenTime &&
                      ((r.value = t), (r.entries = [e]), i());
                  }
                },
                s = Ie("largest-contentful-paint", o);
              if (s) {
                i = Ce(t, r, e.reportAllChanges);
                const n = () => {
                  Le[r.id] ||
                    (o(s.takeRecords()),
                    s.disconnect(),
                    (Le[r.id] = !0),
                    i(!0));
                };
                ["keydown", "click"].forEach((t) => {
                  addEventListener(t, n, { once: !0, capture: !0 });
                }),
                  Ye(n, !0);
              }
            })(
              (t) => {
                const e = t.entries.pop();
                e &&
                  (("undefined" === typeof __SENTRY_DEBUG__ ||
                    __SENTRY_DEBUG__) &&
                    E.kg.log("[Measurements] Adding LCP"),
                  (We.lcp = { value: t.value, unit: "millisecond" }),
                  (qe = e));
              },
              { reportAllChanges: t }
            );
          })(t),
          ((t, e = {}) => {
            const n = Pe(),
              r = Ge("FID");
            let i;
            const o = (t) => {
                t.startTime < n.firstHiddenTime &&
                  ((r.value = t.processingStart - t.startTime),
                  r.entries.push(t),
                  i(!0));
              },
              s = (t) => {
                t.forEach(o);
              },
              a = Ie("first-input", s);
            (i = Ce(t, r, e.reportAllChanges)),
              a &&
                Ye(() => {
                  s(a.takeRecords()), a.disconnect();
                }, !0);
          })((t) => {
            const e = t.entries.pop();
            if (!e) return;
            const n = (0, De.XL)(tt.Z1),
              r = (0, De.XL)(e.startTime);
            ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              E.kg.log("[Measurements] Adding FID"),
              (We.fid = { value: t.value, unit: "millisecond" }),
              (We["mark.fid"] = { value: n + r, unit: "second" });
          }));
      }
      function Ve(t) {
        const e = Fe();
        if (!e || !Oe.performance.getEntries || !tt.Z1) return;
        ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
          E.kg.log("[Tracing] Adding & adjusting spans using Performance API");
        const n = (0, De.XL)(tt.Z1),
          r = e.getEntries();
        let i, o;
        if (
          (r.slice(ze).forEach((e) => {
            const r = (0, De.XL)(e.startTime),
              s = (0, De.XL)(e.duration);
            if (!("navigation" === t.op && n + r < t.startTimestamp))
              switch (e.entryType) {
                case "navigation":
                  !(function (t, e, n) {
                    [
                      "unloadEvent",
                      "redirect",
                      "domContentLoadedEvent",
                      "loadEvent",
                      "connect",
                    ].forEach((r) => {
                      Je(t, e, r, n);
                    }),
                      Je(t, e, "secureConnection", n, "TLS/SSL", "connectEnd"),
                      Je(t, e, "fetch", n, "cache", "domainLookupStart"),
                      Je(t, e, "domainLookup", n, "DNS"),
                      (function (t, e, n) {
                        Me(t, {
                          op: "browser",
                          description: "request",
                          startTimestamp: n + (0, De.XL)(e.requestStart),
                          endTimestamp: n + (0, De.XL)(e.responseEnd),
                        }),
                          Me(t, {
                            op: "browser",
                            description: "response",
                            startTimestamp: n + (0, De.XL)(e.responseStart),
                            endTimestamp: n + (0, De.XL)(e.responseEnd),
                          });
                      })(t, e, n);
                  })(t, e, n),
                    (i = n + (0, De.XL)(e.responseStart)),
                    (o = n + (0, De.XL)(e.requestStart));
                  break;
                case "mark":
                case "paint":
                case "measure": {
                  !(function (t, e, n, r, i) {
                    const o = i + n,
                      s = o + r;
                    Me(t, {
                      description: e.name,
                      endTimestamp: s,
                      op: e.entryType,
                      startTimestamp: o,
                    });
                  })(t, e, r, s, n);
                  const i = Pe(),
                    o = e.startTime < i.firstHiddenTime;
                  "first-paint" === e.name &&
                    o &&
                    (("undefined" === typeof __SENTRY_DEBUG__ ||
                      __SENTRY_DEBUG__) &&
                      E.kg.log("[Measurements] Adding FP"),
                    (We.fp = { value: e.startTime, unit: "millisecond" })),
                    "first-contentful-paint" === e.name &&
                      o &&
                      (("undefined" === typeof __SENTRY_DEBUG__ ||
                        __SENTRY_DEBUG__) &&
                        E.kg.log("[Measurements] Adding FCP"),
                      (We.fcp = { value: e.startTime, unit: "millisecond" }));
                  break;
                }
                case "resource": {
                  const i = e.name.replace(Oe.location.origin, "");
                  !(function (t, e, n, r, i, o) {
                    if (
                      "xmlhttprequest" === e.initiatorType ||
                      "fetch" === e.initiatorType
                    )
                      return;
                    const s = {};
                    "transferSize" in e &&
                      (s["Transfer Size"] = e.transferSize);
                    "encodedBodySize" in e &&
                      (s["Encoded Body Size"] = e.encodedBodySize);
                    "decodedBodySize" in e &&
                      (s["Decoded Body Size"] = e.decodedBodySize);
                    const a = o + r;
                    Me(t, {
                      description: n,
                      endTimestamp: a + i,
                      op: e.initiatorType
                        ? `resource.${e.initiatorType}`
                        : "resource.other",
                      startTimestamp: a,
                      data: s,
                    });
                  })(t, e, i, r, s, n);
                  break;
                }
              }
          }),
          (ze = Math.max(r.length - 1, 0)),
          (function (t) {
            const e = Oe.navigator;
            if (!e) return;
            const n = e.connection;
            n &&
              (n.effectiveType &&
                t.setTag("effectiveConnectionType", n.effectiveType),
              n.type && t.setTag("connectionType", n.type),
              Ae(n.rtt) &&
                (We["connection.rtt"] = { value: n.rtt, unit: "millisecond" }));
            Ae(e.deviceMemory) &&
              t.setTag("deviceMemory", `${e.deviceMemory} GB`);
            Ae(e.hardwareConcurrency) &&
              t.setTag("hardwareConcurrency", String(e.hardwareConcurrency));
          })(t),
          "pageload" === t.op)
        ) {
          "number" === typeof i &&
            (("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              E.kg.log("[Measurements] Adding TTFB"),
            (We.ttfb = {
              value: 1e3 * (i - t.startTimestamp),
              unit: "millisecond",
            }),
            "number" === typeof o &&
              o <= i &&
              (We["ttfb.requestTime"] = {
                value: 1e3 * (i - o),
                unit: "millisecond",
              })),
            ["fcp", "fp", "lcp"].forEach((e) => {
              if (!We[e] || n >= t.startTimestamp) return;
              const r = We[e].value,
                i = n + (0, De.XL)(r),
                o = Math.abs(1e3 * (i - t.startTimestamp)),
                s = o - r;
              ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
                E.kg.log(
                  `[Measurements] Normalized ${e} from ${r} to ${o} (${s})`
                ),
                (We[e].value = o);
            });
          const e = We["mark.fid"];
          e &&
            We.fid &&
            (Me(t, {
              description: "first input delay",
              endTimestamp: e.value + (0, De.XL)(We.fid.value),
              op: "ui.action",
              startTimestamp: e.value,
            }),
            delete We["mark.fid"]),
            "fcp" in We || delete We.cls,
            Object.keys(We).forEach((e) => {
              t.setMeasurement(e, We[e].value, We[e].unit);
            }),
            (function (t) {
              qe &&
                (("undefined" === typeof __SENTRY_DEBUG__ ||
                  __SENTRY_DEBUG__) &&
                  E.kg.log("[Measurements] Adding LCP Data"),
                qe.element && t.setTag("lcp.element", (0, xt.Rt)(qe.element)),
                qe.id && t.setTag("lcp.id", qe.id),
                qe.url && t.setTag("lcp.url", qe.url.trim().slice(0, 200)),
                t.setTag("lcp.size", qe.size));
              He &&
                He.sources &&
                (("undefined" === typeof __SENTRY_DEBUG__ ||
                  __SENTRY_DEBUG__) &&
                  E.kg.log("[Measurements] Adding CLS Data"),
                He.sources.forEach((e, n) =>
                  t.setTag(`cls.source.${n + 1}`, (0, xt.Rt)(e.node))
                ));
            })(t);
        }
        (qe = void 0), (He = void 0), (We = {});
      }
      function Je(t, e, n, r, i, o) {
        const s = o ? e[o] : e[`${n}End`],
          a = e[`${n}Start`];
        a &&
          s &&
          Me(t, {
            op: "browser",
            description: (0, Be.h)(i, () => n),
            startTimestamp: r + (0, De.XL)(a),
            endTimestamp: r + (0, De.XL)(s),
          });
      }
      const Ke = ["localhost", /^\//],
        Ze = {
          traceFetch: !0,
          traceXHR: !0,
          tracingOrigins: Ke,
          tracePropagationTargets: Ke,
        };
      function Qe(t) {
        const {
            traceFetch: e,
            traceXHR: n,
            tracePropagationTargets: r,
            tracingOrigins: i,
            shouldCreateSpanForRequest: o,
          } = { traceFetch: Ze.traceFetch, traceXHR: Ze.traceXHR, ...t },
          s = "function" === typeof o ? o : (t) => !0,
          a = (t) =>
            (function (t, e) {
              return (0, w.U0)(t, e || Ke);
            })(t, r || i),
          c = {};
        e &&
          (0, U.o)("fetch", (t) => {
            !(function (t, e, n, r) {
              if (!(0, De.zu)() || !t.fetchData || !e(t.fetchData.url)) return;
              if (t.endTimestamp) {
                const e = t.fetchData.__span;
                if (!e) return;
                const n = r[e];
                return void (
                  n &&
                  (t.response
                    ? n.setHttpStatus(t.response.status)
                    : t.error && n.setStatus("internal_error"),
                  n.finish(),
                  delete r[e])
                );
              }
              const i = (0, De.x1)();
              if (i) {
                const e = i.startChild({
                  data: { ...t.fetchData, type: "fetch" },
                  description: `${t.fetchData.method} ${t.fetchData.url}`,
                  op: "http.client",
                });
                (t.fetchData.__span = e.spanId), (r[e.spanId] = e);
                const o = t.args[0];
                t.args[1] = t.args[1] || {};
                const s = t.args[1];
                n(t.fetchData.url) &&
                  ((s.headers = (function (t, e, n, r) {
                    const i = ke(e),
                      o = n.toTraceparent(),
                      s =
                        "undefined" !== typeof Request && (0, A.V9)(t, Request)
                          ? t.headers
                          : r.headers;
                    if (s) {
                      if (
                        "undefined" !== typeof Headers &&
                        (0, A.V9)(s, Headers)
                      ) {
                        const t = new Headers(s);
                        return (
                          t.append("sentry-trace", o), i && t.append(Te, i), t
                        );
                      }
                      if (Array.isArray(s)) {
                        const t = [...s, ["sentry-trace", o]];
                        return i && t.push([Te, i]), t;
                      }
                      {
                        const t = "baggage" in s ? s.baggage : void 0,
                          e = [];
                        return (
                          Array.isArray(t) ? e.push(...t) : t && e.push(t),
                          i && e.push(i),
                          {
                            ...s,
                            "sentry-trace": o,
                            baggage: e.length > 0 ? e.join(",") : void 0,
                          }
                        );
                      }
                    }
                    return { "sentry-trace": o, baggage: i };
                  })(o, i.getDynamicSamplingContext(), e, s)),
                  i.metadata.propagations++);
              }
            })(t, s, a, c);
          }),
          n &&
            (0, U.o)("xhr", (t) => {
              !(function (t, e, n, r) {
                if (
                  !(0, De.zu)() ||
                  (t.xhr && t.xhr.__sentry_own_request__) ||
                  !(
                    t.xhr &&
                    t.xhr.__sentry_xhr__ &&
                    e(t.xhr.__sentry_xhr__.url)
                  )
                )
                  return;
                const i = t.xhr.__sentry_xhr__;
                if (t.endTimestamp) {
                  const e = t.xhr.__sentry_xhr_span_id__;
                  if (!e) return;
                  const n = r[e];
                  return void (
                    n &&
                    (n.setHttpStatus(i.status_code), n.finish(), delete r[e])
                  );
                }
                const o = (0, De.x1)();
                if (o) {
                  const e = o.startChild({
                    data: {
                      ...i.data,
                      type: "xhr",
                      method: i.method,
                      url: i.url,
                    },
                    description: `${i.method} ${i.url}`,
                    op: "http.client",
                  });
                  if (
                    ((t.xhr.__sentry_xhr_span_id__ = e.spanId),
                    (r[t.xhr.__sentry_xhr_span_id__] = e),
                    t.xhr.setRequestHeader && n(t.xhr.__sentry_xhr__.url))
                  )
                    try {
                      t.xhr.setRequestHeader("sentry-trace", e.toTraceparent());
                      const n = ke(o.getDynamicSamplingContext());
                      n && t.xhr.setRequestHeader(Te, n),
                        o.metadata.propagations++;
                    } catch (s) {}
                }
              })(t, s, a, c);
            });
      }
      const tn = {
        idleTimeout: Ne.nT,
        finalTimeout: Ne.mg,
        heartbeatInterval: Ne.hd,
        markBackgroundTransactions: !0,
        routingInstrumentation: function (t, e = !0, n = !0) {
          if (!Oe || !Oe.location)
            return void (
              ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              E.kg.warn(
                "Could not initialize routing instrumentation due to invalid location"
              )
            );
          let r,
            i = Oe.location.href;
          e &&
            (r = t({
              name: Oe.location.pathname,
              op: "pageload",
              metadata: { source: "url" },
            })),
            n &&
              (0, U.o)("history", ({ to: e, from: n }) => {
                void 0 === n && i && -1 !== i.indexOf(e)
                  ? (i = void 0)
                  : n !== e &&
                    ((i = void 0),
                    r &&
                      (("undefined" === typeof __SENTRY_DEBUG__ ||
                        __SENTRY_DEBUG__) &&
                        E.kg.log(
                          `[Tracing] Finishing current transaction with op: ${r.op}`
                        ),
                      r.finish()),
                    (r = t({
                      name: Oe.location.pathname,
                      op: "navigation",
                      metadata: { source: "url" },
                    })));
              });
        },
        startTransactionOnLocationChange: !0,
        startTransactionOnPageLoad: !0,
        _experiments: { enableLongTask: !0 },
        ...Ze,
      };
      class en {
        __init() {
          this.name = "BrowserTracing";
        }
        constructor(t) {
          en.prototype.__init.call(this),
            (this.options = { ...tn, ...t }),
            t &&
              !t.tracePropagationTargets &&
              t.tracingOrigins &&
              (this.options.tracePropagationTargets = t.tracingOrigins);
          const { _metricOptions: e } = this.options;
          Xe(e && e._reportAllChanges),
            G([
              this,
              "access",
              (t) => t.options,
              "access",
              (t) => t._experiments,
              "optionalAccess",
              (t) => t.enableLongTask,
            ]) &&
              Ie("longtask", (t) => {
                for (const e of t) {
                  const t = (0, De.x1)();
                  if (!t) return;
                  const n = (0, De.XL)(tt.Z1 + e.startTime),
                    r = (0, De.XL)(e.duration);
                  t.startChild({
                    description: "Main UI thread blocked",
                    op: "ui.long-task",
                    startTimestamp: n,
                    endTimestamp: n + r,
                  });
                }
              });
        }
        setupOnce(t, e) {
          this._getCurrentHub = e;
          const {
            routingInstrumentation: n,
            startTransactionOnLocationChange: r,
            startTransactionOnPageLoad: i,
            markBackgroundTransactions: o,
            traceFetch: s,
            traceXHR: a,
            tracePropagationTargets: c,
            shouldCreateSpanForRequest: u,
          } = this.options;
          n((t) => this._createRouteTransaction(t), i, r),
            o &&
              (Oe && Oe.document
                ? Oe.document.addEventListener("visibilitychange", () => {
                    const t = (0, De.x1)();
                    if (Oe.document.hidden && t) {
                      const e = "cancelled";
                      ("undefined" === typeof __SENTRY_DEBUG__ ||
                        __SENTRY_DEBUG__) &&
                        E.kg.log(
                          `[Tracing] Transaction: ${e} -> since tab moved to the background, op: ${t.op}`
                        ),
                        t.status || t.setStatus(e),
                        t.setTag("visibilitychange", "document.hidden"),
                        t.finish();
                    }
                  })
                : ("undefined" === typeof __SENTRY_DEBUG__ ||
                    __SENTRY_DEBUG__) &&
                  E.kg.warn(
                    "[Tracing] Could not set up background tab detection due to lack of global document"
                  )),
            Qe({
              traceFetch: s,
              traceXHR: a,
              tracePropagationTargets: c,
              shouldCreateSpanForRequest: u,
            });
        }
        _createRouteTransaction(t) {
          if (!this._getCurrentHub)
            return void (
              ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              E.kg.warn(
                `[Tracing] Did not create ${t.op} transaction because _getCurrentHub is invalid.`
              )
            );
          const {
              beforeNavigate: e,
              idleTimeout: n,
              finalTimeout: r,
              heartbeatInterval: i,
            } = this.options,
            o = "pageload" === t.op,
            s = o ? nn("sentry-trace") : null,
            a = o ? nn("baggage") : null,
            c = s
              ? (function (t) {
                  const e = t.match(be);
                  if (!t || !e) return;
                  let n;
                  return (
                    "1" === e[3] ? (n = !0) : "0" === e[3] && (n = !1),
                    { traceId: e[1], parentSampled: n, parentSpanId: e[2] }
                  );
                })(s)
              : void 0,
            u = a
              ? (function (t) {
                  if (!(0, A.HD)(t) && !Array.isArray(t)) return;
                  let e = {};
                  if (Array.isArray(t))
                    e = t.reduce((t, e) => ({ ...t, ...Re(e) }), {});
                  else {
                    if (!t) return;
                    e = Re(t);
                  }
                  const n = Object.entries(e).reduce(
                    (t, [e, n]) => (
                      e.match(we) && (t[e.slice(xe.length)] = n), t
                    ),
                    {}
                  );
                  return Object.keys(n).length > 0 ? n : void 0;
                })(a)
              : void 0,
            l = {
              ...t,
              ...c,
              metadata: {
                ...t.metadata,
                dynamicSamplingContext: c && !u ? {} : u,
              },
              trimEnd: !0,
            },
            d = "function" === typeof e ? e(l) : l,
            p = void 0 === d ? { ...l, sampled: !1 } : d;
          (p.metadata =
            p.name !== l.name
              ? { ...p.metadata, source: "custom" }
              : p.metadata),
            !1 === p.sampled &&
              ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              E.kg.log(
                `[Tracing] Will not send ${p.op} transaction because of beforeNavigate.`
              ),
            ("undefined" === typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__) &&
              E.kg.log(`[Tracing] Starting ${p.op} transaction on scope`);
          const _ = this._getCurrentHub(),
            { location: f } = Oe,
            h = (0, Se.lb)(_, p, n, r, !0, { location: f }, i);
          return (
            h.registerBeforeFinishCallback((t) => {
              Ve(t);
            }),
            h
          );
        }
      }
      function nn(t) {
        const e = (0, xt.qT)(`meta[name=${t}]`);
        return e ? e.getAttribute("content") : null;
      }
      function rn(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(t, r.key, r);
        }
      }
      function on(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      function sn(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {},
            r = Object.keys(n);
          "function" === typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function (t) {
                return Object.getOwnPropertyDescriptor(n, t).enumerable;
              })
            )),
            r.forEach(function (e) {
              on(t, e, n[e]);
            });
        }
        return t;
      }
      ("undefined" === typeof __SENTRY_TRACING__ || __SENTRY_TRACING__) &&
        (0, Se.ro)();
      var an = (function () {
          function t() {
            var e;
            !(function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            })(this, t),
              ((e = {
                dsn: "https://f8af2dd4d9b74a98b3797303a16e81fd@o36975.ingest.sentry.io/4504282597752832",
                integrations: [new en()],
                tracesSampleRate: 0.1,
              })._metadata = e._metadata || {}),
              (e._metadata.sdk = e._metadata.sdk || {
                name: "sentry.javascript.react",
                packages: [{ name: "npm:@sentry/react", version: y }],
                version: y,
              }),
              ve(e);
          }
          var e, n, r;
          return (
            (e = t),
            (n = [
              {
                key: "logError",
                value: function (t) {
                  var e =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {};
                  return ht(t, { extra: e });
                },
              },
              {
                key: "logCrash",
                value: function (t, e) {
                  return this.logError(t, sn({}, e, { level: "fatal" }));
                },
              },
              {
                key: "logApiError",
                value: function (t, e, n, r) {
                  for (
                    var i = arguments.length,
                      o = new Array(i > 4 ? i - 4 : 0),
                      s = 4;
                    s < i;
                    s++
                  )
                    o[s - 4] = arguments[s];
                  e < 400 || e >= 500
                    ? ht(
                        new Error(
                          "API Exception "
                            .concat(t, " ")
                            .concat(r, ": ")
                            .concat(e, " -- ")
                            .concat(n)
                        ),
                        sn({}, o)
                      )
                    : mt(
                        "API non-fatal Exception "
                          .concat(t, " ")
                          .concat(r, ": ")
                          .concat(e, " -- ")
                          .concat(n),
                        sn({}, o)
                      );
                },
              },
            ]),
            n && rn(e.prototype, n),
            r && rn(e, r),
            t
          );
        })(),
        cn = new an(),
        un = n(21576),
        ln = n(28002),
        dn = n.n(ln),
        pn = function (t) {
          var e = t.eventId,
            n = void 0 === e ? "" : e;
          return (0, r.jsxs)("div", {
            className: dn().page,
            children: [
              (0, r.jsxs)("main", {
                className: dn().main,
                children: [
                  (0, r.jsxs)("div", {
                    className: dn().textBlock,
                    children: [
                      (0, r.jsx)("h1", { children: "Something went wrong" }),
                      (0, r.jsxs)("span", {
                        children: [
                          "We\u2019ve encountered an unexpected error.",
                          (0, r.jsx)("br", {}),
                          "Please, ",
                          (0, r.jsx)("a", {
                            href: window.location.href,
                            children: "try again",
                          }),
                          " later or ",
                          (0, r.jsx)("a", {
                            href: "https://support.clearvpn.com/hc/requests/new",
                            children: "contact our support",
                          }),
                          " for assistance.",
                        ],
                      }),
                      n &&
                        (0, r.jsxs)("div", {
                          children: [
                            "Error report number: ",
                            (0, r.jsxs)("b", { children: ["$", n] }),
                          ],
                        }),
                    ],
                  }),
                  (0, r.jsx)("img", {
                    src: "/images/windows-uninstall/hoover-no.svg",
                    width: "196",
                    height: "147",
                    alt: "Hoover the cat saying `No!`",
                  }),
                ],
              }),
              (0, r.jsx)(un.Z, {}),
            ],
          });
        };
      pn.propTypes = { eventId: g().string };
      var _n = pn;
      function fn(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(t, r.key, r);
        }
      }
      function hn(t) {
        return (hn = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      function mn(t, e) {
        return !e || ("object" !== yn(e) && "function" !== typeof e)
          ? (function (t) {
              if (void 0 === t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return t;
            })(t)
          : e;
      }
      function gn(t, e) {
        return (gn =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      var yn = function (t) {
        return t && "undefined" !== typeof Symbol && t.constructor === Symbol
          ? "symbol"
          : typeof t;
      };
      function vn(t) {
        var e = (function () {
          if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" === typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = hn(t);
          if (e) {
            var i = hn(this).constructor;
            n = Reflect.construct(r, arguments, i);
          } else n = r.apply(this, arguments);
          return mn(this, n);
        };
      }
      var En = (function (t) {
        !(function (t, e) {
          if ("function" !== typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && gn(t, e);
        })(s, t);
        var e,
          n,
          i,
          o = vn(s);
        function s(t) {
          var e;
          return (
            (function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            })(this, s),
            ((e = o.call(this, t)).state = { hasError: !1, eventId: "" }),
            e
          );
        }
        return (
          (e = s),
          (i = [
            {
              key: "getDerivedStateFromError",
              value: function () {
                return { hasError: !0 };
              },
            },
          ]),
          (n = [
            {
              key: "componentDidCatch",
              value: function (t, e) {
                var n = cn.logCrash(t, e);
                console.log("Crash logged to Sentry #", n, t),
                  this.setState({ eventId: n });
              },
            },
            {
              key: "render",
              value: function () {
                return this.state.hasError
                  ? (0, r.jsx)(_n, { eventId: this.state.eventId })
                  : this.props.children;
              },
            },
          ]) && fn(e.prototype, n),
          i && fn(e, i),
          s
        );
      })(i.Component);
      En.propTypes = { children: g().node };
      var Sn = En;
      function bn(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      function Tn(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {},
            r = Object.keys(n);
          "function" === typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function (t) {
                return Object.getOwnPropertyDescriptor(n, t).enumerable;
              })
            )),
            r.forEach(function (e) {
              bn(t, e, n[e]);
            });
        }
        return t;
      }
      var xn = "start_url",
        wn = function (t) {
          var e = t.Component,
            n = t.pageProps,
            o = (0, a.useRouter)(),
            c = o.asPath,
            l = (function (t) {
              return !h.includes(t);
            })(o.route);
          (0, i.useEffect)(function () {
            if (!u().get(xn) && l) {
              var t = ""
                .concat(window.location.origin)
                .concat(window.location.pathname);
              u().set(xn, t, { expires: 7, domain: ".clearvpn.com" });
            }
          }, []);
          var d = c;
          return (
            d.includes("?") && (d = d.substring(0, c.indexOf("?"))),
            d.endsWith("/") && (d = d.slice(0, -1)),
            (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsxs)(s(), {
                  children: [
                    (0, r.jsx)("meta", {
                      name: "viewport",
                      content: "width=device-width,initial-scale=1.0",
                    }),
                    (0, r.jsx)("link", {
                      rel: "canonical",
                      href: "https://clearvpn.com".concat(d, "/"),
                    }),
                  ],
                }),
                (0, r.jsx)("div", {
                  className: "root",
                  children: (0, r.jsx)(Sn, {
                    children: (0, r.jsx)(e, Tn({}, n)),
                  }),
                }),
                l && (0, r.jsx)(f, {}),
              ],
            })
          );
        };
    },
    83813: function (t, e, n) {
      "use strict";
      var r = n(85893),
        i = (n(67294), n(45697)),
        o = n.n(i),
        s = n(65044),
        a = n.n(s),
        c = function (t) {
          var e = t.size,
            n = void 0 === e ? 25 : e,
            i = t.stroke,
            o = void 0 === i ? 3 : i,
            s = t.className,
            c = void 0 === s ? "" : s,
            u = t.white;
          return (0, r.jsxs)("div", {
            className: ""
              .concat(a().loader, " ")
              .concat(a()["loaderStroke".concat(o)], " ")
              .concat(c, " ")
              .concat(u ? a().white : ""),
            style: { width: "".concat(n, "px"), height: "".concat(n, "px") },
            children: [
              (0, r.jsx)("div", {
                style: {
                  width: "".concat(n, "px"),
                  height: "".concat(n, "px"),
                },
              }),
              (0, r.jsx)("div", {
                style: {
                  width: "".concat(n, "px"),
                  height: "".concat(n, "px"),
                },
              }),
              (0, r.jsx)("div", {
                style: {
                  width: "".concat(n, "px"),
                  height: "".concat(n, "px"),
                },
              }),
              (0, r.jsx)("div", {
                style: {
                  width: "".concat(n, "px"),
                  height: "".concat(n, "px"),
                },
              }),
            ],
          });
        };
      (c.propTypes = {
        size: o().number,
        stroke: o().number,
        className: o().string,
        white: o().bool,
      }),
        (e.Z = c);
    },
    36617: function (t, e, n) {
      "use strict";
      var r = n(85893),
        i = n(67294),
        o = n(45697),
        s = n.n(o);
      function a(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
      }
      function c(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      function u(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {},
            r = Object.keys(n);
          "function" === typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function (t) {
                return Object.getOwnPropertyDescriptor(n, t).enumerable;
              })
            )),
            r.forEach(function (e) {
              c(t, e, n[e]);
            });
        }
        return t;
      }
      function l(t, e) {
        if (null == t) return {};
        var n,
          r,
          i = (function (t, e) {
            if (null == t) return {};
            var n,
              r,
              i = {},
              o = Object.keys(t);
            for (r = 0; r < o.length; r++)
              (n = o[r]), e.indexOf(n) >= 0 || (i[n] = t[n]);
            return i;
          })(t, e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(t);
          for (r = 0; r < o.length; r++)
            (n = o[r]),
              e.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(t, n) &&
                  (i[n] = t[n]));
        }
        return i;
      }
      function d(t, e) {
        return (
          (function (t) {
            if (Array.isArray(t)) return t;
          })(t) ||
          (function (t, e) {
            var n =
              null == t
                ? null
                : ("undefined" !== typeof Symbol && t[Symbol.iterator]) ||
                  t["@@iterator"];
            if (null != n) {
              var r,
                i,
                o = [],
                s = !0,
                a = !1;
              try {
                for (
                  n = n.call(t);
                  !(s = (r = n.next()).done) &&
                  (o.push(r.value), !e || o.length !== e);
                  s = !0
                );
              } catch (c) {
                (a = !0), (i = c);
              } finally {
                try {
                  s || null == n.return || n.return();
                } finally {
                  if (a) throw i;
                }
              }
              return o;
            }
          })(t, e) ||
          (function (t, e) {
            if (!t) return;
            if ("string" === typeof t) return a(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return a(t, e);
          })(t, e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      var p = function (t) {
        var e = t.path,
          n = t.mediaQueries,
          o = t.pictureClassName,
          s = l(t, ["path", "mediaQueries", "pictureClassName"]);
        return (0, r.jsxs)("picture", {
          className: o,
          children: [
            null === n || void 0 === n
              ? void 0
              : n.map(function (t) {
                  var n = d(t, 3),
                    o = n[0],
                    s = n[1],
                    a = n[2],
                    c = void 0 === a ? "@2x" : a;
                  return (0,
                  r.jsxs)(i.Fragment, { children: [(0, r.jsx)("source", { media: o, srcSet: "".concat(e).concat(s, ".webp 1x, ").concat(e).concat(c, ".webp 2x"), type: "image/webp" }), (0, r.jsx)("source", { media: o, srcSet: "".concat(e).concat(s, ".png 1x, ").concat(e).concat(c, ".png 2x"), type: "image/png" })] }, o + s);
                }),
            (0, r.jsx)("source", {
              srcSet: "".concat(e, ".webp 1x, ").concat(e, "@2x.webp 2x"),
              type: "image/webp",
            }),
            (0, r.jsx)(
              "img",
              u(
                {
                  src: "".concat(e, ".png"),
                  srcSet: "".concat(e, "@2x.png 2x"),
                  alt: "",
                },
                s
              )
            ),
          ],
        });
      };
      (p.propTypes = {
        path: s().string.isRequired,
        mediaQueries: s().arrayOf(s().array),
      }),
        (e.Z = p);
    },
    64163: function (t, e, n) {
      "use strict";
      var r = n(85893),
        i = (n(67294), n(45697)),
        o = n.n(i),
        s = n(83813),
        a = n(50468),
        c = n.n(a);
      function u(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      function l(t, e) {
        if (null == t) return {};
        var n,
          r,
          i = (function (t, e) {
            if (null == t) return {};
            var n,
              r,
              i = {},
              o = Object.keys(t);
            for (r = 0; r < o.length; r++)
              (n = o[r]), e.indexOf(n) >= 0 || (i[n] = t[n]);
            return i;
          })(t, e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(t);
          for (r = 0; r < o.length; r++)
            (n = o[r]),
              e.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(t, n) &&
                  (i[n] = t[n]));
        }
        return i;
      }
      var d = function (t) {
        var e = t.text,
          n = t.onClick,
          i = t.isLoading,
          o = t.className,
          a = t.loaderSize,
          d = void 0 === a ? 25 : a,
          p = l(t, ["text", "onClick", "isLoading", "className", "loaderSize"]);
        return (0, r.jsx)(
          "button",
          (function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var n = null != arguments[e] ? arguments[e] : {},
                r = Object.keys(n);
              "function" === typeof Object.getOwnPropertySymbols &&
                (r = r.concat(
                  Object.getOwnPropertySymbols(n).filter(function (t) {
                    return Object.getOwnPropertyDescriptor(n, t).enumerable;
                  })
                )),
                r.forEach(function (e) {
                  u(t, e, n[e]);
                });
            }
            return t;
          })(
            {
              type: "submit",
              onClick: n,
              className: "".concat(c().button, " ").concat(o || ""),
            },
            p,
            {
              disabled: i,
              children: i ? (0, r.jsx)(s.Z, { white: !0, size: d }) : e,
            }
          )
        );
      };
      (d.propTypes = {
        text: o().string.isRequired,
        onClick: o().func,
        isLoading: o().bool,
        className: o().string,
        loaderSize: o().number,
      }),
        (e.Z = d);
    },
    23373: function (t, e, n) {
      "use strict";
      var r = n(85893),
        i = n(67294),
        o = n(45697),
        s = n.n(o),
        a = n(36808),
        c = n.n(a),
        u = n(51868),
        l = n(22240),
        d = n(64163),
        p = n(95928),
        _ = n.n(p),
        f = function (t) {
          var e = t.className,
            n = void 0 === e ? "" : e,
            o = t.formType,
            s = t.formId,
            a = t.group,
            p = t.language,
            f = t.noNewsLetterSub,
            h = void 0 !== f && f,
            m = t.onSubscribed,
            g = t.isIframe,
            y = void 0 !== g && g,
            v = t.withBorder,
            E = void 0 !== v && v,
            S = t.ctaText,
            b = void 0 === S ? "Get Started" : S,
            T = t.placeholderText,
            x = void 0 === T ? "Enter your email" : T,
            w = t.disclaimerText,
            k =
              void 0 === w
                ? "By proceeding, you agree to receive news, offers and updates from ClearVPN"
                : w,
            R = (0, i.useState)(""),
            N = R[0],
            D = R[1],
            O = (0, i.useState)(!1),
            B = O[0],
            C = O[1],
            j = (0, i.useState)(!1),
            U = j[0],
            G = j[1],
            I = (0, i.useState)(!1),
            Y = I[0],
            $ = I[1],
            P = ""
              .concat(_().input, " ")
              .concat(U && !B && N.length > 0 && _().error, " ")
              .concat(E ? _().withBorder : "");
          return (0, r.jsxs)("div", {
            className: "".concat(_().container, " ").concat(n),
            children: [
              (0, r.jsxs)("form", {
                className: _().form,
                onSubmit: function (t) {
                  if ((t.preventDefault(), G(!0), B)) {
                    $(!0);
                    var e = new URLSearchParams(
                      y ? window.parent.location.search : window.location.search
                    );
                    c().set("email", N, { domain: "clearvpn.com" }),
                      e.append("newsletter", "1"),
                      e.append("funnel", "web"),
                      (0, l.x)(N, o, s, a, h, p).finally(function () {
                        m
                          ? m()
                          : y
                          ? (console.log(
                              "Redirecting using: ",
                              window.parent.location
                            ),
                            (window.parent.location.href =
                              "/get-product/?".concat(e.toString())))
                          : (console.log(
                              "Redirecting non-iframe using: ",
                              window.location
                            ),
                            (window.location.href = "/get-product/?".concat(
                              e.toString()
                            )));
                      });
                  }
                },
                children: [
                  (0, r.jsx)("input", {
                    value: N,
                    onChange: function (t) {
                      var e = t.target.value;
                      D(e), C((0, u.o)(e));
                    },
                    onBlur: function () {
                      return G(!0);
                    },
                    onFocus: function () {
                      return G(!1);
                    },
                    className: P,
                    type: "email",
                    placeholder: x,
                    autoComplete: "email",
                    name: "email",
                    disabled: Y,
                  }),
                  (0, r.jsx)(d.Z, {
                    text: b,
                    className: _().button,
                    isLoading: Y,
                  }),
                ],
              }),
              k &&
                (0, r.jsx)("span", { className: _().disclaimer, children: k }),
            ],
          });
        };
      (f.propTypes = {
        className: s().string,
        formType: s().string,
        formId: s().string,
        group: s().string,
        noNewsLetterSub: s().bool,
        onSubscribed: s().func,
        isIframe: s().bool,
        withBorder: s().bool,
        ctaText: s().string,
      }),
        (e.Z = f);
    },
    21576: function (t, e, n) {
      "use strict";
      var r = n(85893),
        i = n(67294),
        o = n(45697),
        s = n.n(o),
        a = n(23373),
        c = n(22699),
        u = n(30999),
        l = n.n(u);
      function d(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      function p(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {},
            r = Object.keys(n);
          "function" === typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function (t) {
                return Object.getOwnPropertyDescriptor(n, t).enumerable;
              })
            )),
            r.forEach(function (e) {
              d(t, e, n[e]);
            });
        }
        return t;
      }
      var _ = [
          { text: "Blog", href: "/blog/" },
          { text: "My Account", href: "https://my.clearvpn.com/" },
          { text: "FAQ", href: "https://support.clearvpn.com/hc/en-us" },
          { text: "Become an affiliate", href: "/affiliates/" },
          { text: "ClearVPN for macOS", href: "/macos/" },
          { text: "ClearVPN for Windows", href: "/windows/" },
        ],
        f = [
          { text: "Terms of Service", href: "/terms-of-service/" },
          { text: "Privacy Policy", href: "/privacy-policy/" },
          {
            text: "Contact support",
            href: "https://support.clearvpn.com/hc/requests/new",
          },
        ],
        h = [
          {
            href: "https://www.facebook.com/ClearVPN/",
            icon: "/images/socials/facebook.svg",
            alt: "Facebook",
          },
          {
            href: "https://twitter.com/ClearVpn",
            icon: "/images/socials/twitter.svg",
            alt: "Twitter",
          },
        ],
        m = {
          title:
            "Subscribe to our newsletter to receive hot offers, ClearVPN updates and useful tips",
          placeholder: "Enter your email",
          cta: "Subscribe",
          success: "Thanks for subscribing!\nNow, please check your inbox",
        },
        g = function (t) {
          var e = t.leftColumnLinks,
            n = void 0 === e ? _ : e,
            o = t.rightColumnLinks,
            s = void 0 === o ? f : o,
            u = t.emailFormCopy,
            d = void 0 === u ? m : u,
            g = t.socialLinks,
            y = void 0 === g ? h : g,
            v = t.emailFormProps,
            E = void 0 === v ? {} : v,
            S = t.className,
            b = void 0 === S ? "" : S,
            T = (0, i.useState)("https://macpaw.com/clearvpn/"),
            x = T[0],
            w = T[1];
          (0, i.useEffect)(function () {
            w(x + (0, c.ZQ)());
          }, []);
          var k = (0, i.useState)(!1),
            R = k[0],
            N = k[1],
            D = (0, i.useCallback)(function () {
              return N(!0);
            }, []);
          return (0, r.jsxs)("footer", {
            className: "".concat(l().footer, " ").concat(b),
            children: [
              (0, r.jsxs)("div", {
                className: l().mainBlock,
                children: [
                  (0, r.jsxs)("div", {
                    className: l().emailSubColumn,
                    children: [
                      (0, r.jsxs)("picture", {
                        children: [
                          (0, r.jsx)("source", {
                            srcSet:
                              "/images/logo/logo-horizontal-white.webp 1x, /images/logo/logo-horizontal-white@2x.webp 2x",
                            type: "image/webp",
                          }),
                          (0, r.jsx)("img", {
                            src: "/images/logo/logo-horizontal-white.png",
                            srcSet: "/images/logo/logo-horizontal-white@2x.png",
                            alt: "ClearVPN logo",
                            width: "86",
                            height: "24",
                          }),
                        ],
                      }),
                      (0, r.jsx)("span", {
                        className: l().subscribeTitle,
                        children: d.title,
                      }),
                      R
                        ? (0, r.jsx)("span", {
                            className: l().successSubMessage,
                            children: d.success,
                          })
                        : (0, r.jsx)(
                            a.Z,
                            p(
                              {
                                className: l().emailForm,
                                onSubscribed: D,
                                ctaText: d.cta,
                                placeholderText: d.placeholder,
                              },
                              E
                            )
                          ),
                    ],
                  }),
                  (0, r.jsx)("div", {
                    className: l().linksBlock,
                    children: n.map(function (t) {
                      var e = t.text,
                        n = t.href;
                      return (0, r.jsx)("a", { href: n, children: e }, e);
                    }),
                  }),
                  (0, r.jsxs)("div", {
                    className: l().linksBlock,
                    children: [
                      s.map(function (t) {
                        var e = t.text,
                          n = t.href;
                        return (0, r.jsx)("a", { href: n, children: e }, e);
                      }),
                      (0, r.jsx)("div", {
                        className: l().socials,
                        children: y.map(function (t) {
                          var e = t.icon,
                            n = t.href,
                            i = t.alt;
                          return (0,
                          r.jsx)("a", { href: n, target: "_blank", rel: "noreferrer", children: (0, r.jsx)("img", { src: e, alt: i, width: "20", height: "20" }) }, n);
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              (0, r.jsxs)("div", {
                className: l().bottomLine,
                children: [
                  (0, r.jsx)("span", {
                    className: l().copyright,
                    children: "ClearVPN \xa9 2023. All rights are reserved",
                  }),
                  (0, r.jsxs)("div", {
                    className: l().macpawLogo,
                    children: [
                      (0, r.jsx)("span", { children: "Crafted by" }),
                      (0, r.jsx)("img", {
                        src: "/images/logo/macpaw-logo-white.svg",
                        alt: "MacPaw logo",
                        width: "68",
                        height: "12",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        };
      (g.propTypes = {
        leftColumnLinks: s().arrayOf(
          s().shape({
            text: s().string.isRequired,
            href: s().string.isRequired,
          })
        ),
        rightColumnLinks: s().arrayOf(
          s().shape({
            text: s().string.isRequired,
            href: s().string.isRequired,
          })
        ),
        emailFormCopy: s().shape({
          title: s().string.isRequired,
          placeholder: s().string.isRequired,
          cta: s().string.isRequired,
          success: s().string.isRequired,
        }),
        className: s().string,
      }),
        (e.Z = g);
    },
    14229: function (t, e, n) {
      "use strict";
      n.d(e, {
        Fm: function () {
          return u;
        },
        Hz: function () {
          return o;
        },
        YV: function () {
          return p;
        },
        Zz: function () {
          return l;
        },
        hP: function () {
          return d;
        },
        jl: function () {
          return c;
        },
      });
      var r = n(36808),
        i = n.n(r),
        o = "clearvpn.com",
        s = "access_token",
        a = "refresh_token",
        c = function () {
          return !!i().get(s);
        },
        u = function (t) {
          var e =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
          i().set(s, t, { domain: o, path: "/", secure: !0 }),
            i().set(a, e, { domain: o, path: "/", secure: !0 }),
            "localhost" === location.hostname &&
              (i().set(s, t, { domain: "localhost", path: "/", secure: !0 }),
              i().set(a, e, { domain: "localhost", path: "/", secure: !0 }));
        },
        l = function () {
          i().remove(s, { domain: o, path: "/" }),
            i().remove(a, { domain: o, path: "/" }),
            "localhost" === location.hostname &&
              (i().remove(s, { domain: "localhost", path: "/" }),
              i().remove(a, { domain: "localhost", path: "/" }));
        },
        d = function () {
          return i().get(s);
        },
        p = function () {
          return i().get(a);
        };
    },
    22240: function (t, e, n) {
      "use strict";
      n.d(e, {
        x: function () {
          return i;
        },
      });
      var r = n(59224),
        i = function (t) {
          var e,
            n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "",
            i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : "",
            o =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : "sub_webfunnel_general",
            s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
            a = arguments.length > 5 ? arguments[5] : void 0,
            c = [];
          return (
            i && c.push({ name: "sub_form", value: i }),
            s || c.push({ name: "newsletter_sub", value: "1" }),
            a && (e = { language_code: a }),
            (0, r.d)("/v1/marketing/emails/newsletters/subscribe", "POST", {
              email: t,
              event_params: c,
              form_type: n,
              groups: [o],
              contact: e,
            })
          );
        };
    },
    59224: function (t, e, n) {
      "use strict";
      n.d(e, {
        d: function () {
          return s;
        },
      });
      var r = n(34555),
        i = "https://api.clearvpn.com",
        o = "my.clearvpn.com",
        s = function (t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "GET",
            n = arguments.length > 2 ? arguments[2] : void 0;
          return fetch(i + t, {
            headers: {
              "Content-Type": "application/json",
              "App-Identity": o,
              "User-Locale": (0, r.Kd)(),
            },
            method: e,
            body: JSON.stringify(n),
          }).then(function (t) {
            return t.json();
          });
        };
    },
    34555: function (t, e, n) {
      "use strict";
      n.d(e, {
        Kd: function () {
          return l;
        },
        LV: function () {
          return u;
        },
        ZP: function () {
          return a;
        },
        tH: function () {
          return s;
        },
      });
      var r = n(36808),
        i = n.n(r),
        o = n(14229),
        s = "uk",
        a = "en",
        c = "locale",
        u = function (t) {
          return i().set(c, t, { domain: o.Hz, path: "/" });
        },
        l = function () {
          var t = i().get(c);
          return t || (window.location.href.includes("/ua") ? s : a);
        };
    },
    22699: function (t, e, n) {
      "use strict";
      function r(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      n.d(e, {
        Dt: function () {
          return a;
        },
        Fs: function () {
          return _;
        },
        TL: function () {
          return u;
        },
        ZQ: function () {
          return p;
        },
        eE: function () {
          return s;
        },
        eF: function () {
          return f;
        },
        gn: function () {
          return c;
        },
        tq: function () {
          return l;
        },
        y0: function () {
          return d;
        },
      });
      var i,
        o = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
        s = function () {
          return o.includes(navigator.platform);
        },
        a = function () {
          return navigator.userAgent.toLowerCase().includes("android");
        },
        c = function () {
          return (
            (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
              ("MacIntel" === navigator.platform &&
                navigator.maxTouchPoints > 1) ||
              (navigator.userAgent.includes("Mobile") &&
                navigator.userAgent.includes("Safari"))) &&
            !window.MSStream &&
            !a()
          );
        },
        u = function () {
          var t = window.navigator.userAgent,
            e = !!t.match(/iPad/i) || !!t.match(/iPhone/i),
            n = !!t.match(/WebKit/i);
          return e && n && !t.match(/CriOS/i);
        },
        l = function () {
          return a() || c();
        },
        d = {
          macos: "macos",
          windows: "windows",
          ios: "ios",
          android: "android",
        },
        p = function () {
          return s()
            ? d.macos
            : navigator.platform.includes("Win")
            ? d.windows
            : a()
            ? d.android
            : c()
            ? d.ios
            : "";
        },
        _ = [d.macos, d.windows, d.ios, d.android],
        f =
          (r((i = {}), d.macos, "macOS"),
          r(i, d.windows, "Windows"),
          r(i, d.ios, "iOS"),
          r(i, d.android, "Android"),
          i);
    },
    51868: function (t, e, n) {
      "use strict";
      n.d(e, {
        o: function () {
          return i;
        },
      });
      var r =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        i = function (t) {
          return r.test(t);
        };
    },
    37254: function (t) {
      t.exports = {
        wrapper: "CookieConsentBanner_wrapper__C85iV",
        container: "CookieConsentBanner_container__ybn8Z",
        cookieImage: "CookieConsentBanner_cookieImage__AFpkl",
        text: "CookieConsentBanner_text__vhtd5",
        confirmButton: "CookieConsentBanner_confirmButton__O_can",
      };
    },
    65044: function (t) {
      t.exports = {
        loader: "Loader_loader__0rlzb",
        "lds-ring": "Loader_lds-ring__rofQR",
        white: "Loader_white__lwm2r",
        loaderStroke2: "Loader_loaderStroke2__SFlIt",
        loaderStroke3: "Loader_loaderStroke3__Yrn_M",
      };
    },
    50468: function (t) {
      t.exports = { button: "SubmitButton_button__iUj9t" };
    },
    28002: function (t) {
      t.exports = {
        page: "ErrorPage_page__BzHPk",
        main: "ErrorPage_main__8suNv",
        textBlock: "ErrorPage_textBlock__epJ0i",
      };
    },
    95928: function (t) {
      t.exports = {
        container: "EmailForm_container__360C3",
        form: "EmailForm_form__r_qbx",
        input: "EmailForm_input____3XH",
        withBorder: "EmailForm_withBorder__fvl9O",
        error: "EmailForm_error__MaVQv",
        button: "EmailForm_button__yRVrv",
        disclaimer: "EmailForm_disclaimer__bjZqK",
      };
    },
    30999: function (t) {
      t.exports = {
        footer: "FullFooter_footer__4v7P6",
        mainBlock: "FullFooter_mainBlock__6BN5U",
        emailSubColumn: "FullFooter_emailSubColumn__UryB_",
        subscribeTitle: "FullFooter_subscribeTitle__ji_5m",
        emailForm: "FullFooter_emailForm__cTYht",
        successSubMessage: "FullFooter_successSubMessage__jiOJk",
        linksBlock: "FullFooter_linksBlock__EY7c9",
        socials: "FullFooter_socials__qN2X_",
        bottomLine: "FullFooter_bottomLine__VaTh5",
        copyright: "FullFooter_copyright__0Hqqo",
        macpawLogo: "FullFooter_macpawLogo__zRlJK",
      };
    },
    44366: function () {},
    77663: function (t) {
      !(function () {
        var e = {
            162: function (t) {
              var e,
                n,
                r = (t.exports = {});
              function i() {
                throw new Error("setTimeout has not been defined");
              }
              function o() {
                throw new Error("clearTimeout has not been defined");
              }
              function s(t) {
                if (e === setTimeout) return setTimeout(t, 0);
                if ((e === i || !e) && setTimeout)
                  return (e = setTimeout), setTimeout(t, 0);
                try {
                  return e(t, 0);
                } catch (r) {
                  try {
                    return e.call(null, t, 0);
                  } catch (r) {
                    return e.call(this, t, 0);
                  }
                }
              }
              !(function () {
                try {
                  e = "function" === typeof setTimeout ? setTimeout : i;
                } catch (t) {
                  e = i;
                }
                try {
                  n = "function" === typeof clearTimeout ? clearTimeout : o;
                } catch (t) {
                  n = o;
                }
              })();
              var a,
                c = [],
                u = !1,
                l = -1;
              function d() {
                u &&
                  a &&
                  ((u = !1),
                  a.length ? (c = a.concat(c)) : (l = -1),
                  c.length && p());
              }
              function p() {
                if (!u) {
                  var t = s(d);
                  u = !0;
                  for (var e = c.length; e; ) {
                    for (a = c, c = []; ++l < e; ) a && a[l].run();
                    (l = -1), (e = c.length);
                  }
                  (a = null),
                    (u = !1),
                    (function (t) {
                      if (n === clearTimeout) return clearTimeout(t);
                      if ((n === o || !n) && clearTimeout)
                        return (n = clearTimeout), clearTimeout(t);
                      try {
                        n(t);
                      } catch (e) {
                        try {
                          return n.call(null, t);
                        } catch (e) {
                          return n.call(this, t);
                        }
                      }
                    })(t);
                }
              }
              function _(t, e) {
                (this.fun = t), (this.array = e);
              }
              function f() {}
              (r.nextTick = function (t) {
                var e = new Array(arguments.length - 1);
                if (arguments.length > 1)
                  for (var n = 1; n < arguments.length; n++)
                    e[n - 1] = arguments[n];
                c.push(new _(t, e)), 1 !== c.length || u || s(p);
              }),
                (_.prototype.run = function () {
                  this.fun.apply(null, this.array);
                }),
                (r.title = "browser"),
                (r.browser = !0),
                (r.env = {}),
                (r.argv = []),
                (r.version = ""),
                (r.versions = {}),
                (r.on = f),
                (r.addListener = f),
                (r.once = f),
                (r.off = f),
                (r.removeListener = f),
                (r.removeAllListeners = f),
                (r.emit = f),
                (r.prependListener = f),
                (r.prependOnceListener = f),
                (r.listeners = function (t) {
                  return [];
                }),
                (r.binding = function (t) {
                  throw new Error("process.binding is not supported");
                }),
                (r.cwd = function () {
                  return "/";
                }),
                (r.chdir = function (t) {
                  throw new Error("process.chdir is not supported");
                }),
                (r.umask = function () {
                  return 0;
                });
            },
          },
          n = {};
        function r(t) {
          var i = n[t];
          if (void 0 !== i) return i.exports;
          var o = (n[t] = { exports: {} }),
            s = !0;
          try {
            e[t](o, o.exports, r), (s = !1);
          } finally {
            s && delete n[t];
          }
          return o.exports;
        }
        r.ab = "//";
        var i = r(162);
        t.exports = i;
      })();
    },
    9008: function (t, e, n) {
      t.exports = n(83121);
    },
    11163: function (t, e, n) {
      t.exports = n(80880);
    },
    92703: function (t, e, n) {
      "use strict";
      var r = n(50414);
      function i() {}
      function o() {}
      (o.resetWarningCache = i),
        (t.exports = function () {
          function t(t, e, n, i, o, s) {
            if (s !== r) {
              var a = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
              );
              throw ((a.name = "Invariant Violation"), a);
            }
          }
          function e() {
            return t;
          }
          t.isRequired = t;
          var n = {
            array: t,
            bigint: t,
            bool: t,
            func: t,
            number: t,
            object: t,
            string: t,
            symbol: t,
            any: t,
            arrayOf: e,
            element: t,
            elementType: t,
            instanceOf: e,
            node: t,
            objectOf: e,
            oneOf: e,
            oneOfType: e,
            shape: e,
            exact: e,
            checkPropTypes: o,
            resetWarningCache: i,
          };
          return (n.PropTypes = n), n;
        });
    },
    45697: function (t, e, n) {
      t.exports = n(92703)();
    },
    50414: function (t) {
      "use strict";
      t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    },
  },
  function (t) {
    var e = function (e) {
      return t((t.s = e));
    };
    t.O(0, [9774, 179], function () {
      return e(91118), e(80880);
    });
    var n = t.O();
    _N_E = n;
  },
]);
