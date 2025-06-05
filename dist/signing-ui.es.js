import { ref as u, onMounted as f, createElementBlock as h, openBlock as v, createElementVNode as s } from "vue";
const g = (n, i) => {
  const t = n.__vccOpts || n;
  for (const [e, a] of i)
    t[e] = a;
  return t;
}, m = ["width", "height"], p = {
  __name: "SigningPad",
  props: {
    width: { type: Number, default: 400 },
    height: { type: Number, default: 200 }
  },
  setup(n) {
    const i = n, t = u(null);
    let e, a = !1;
    f(() => {
      e = t.value.getContext("2d"), e.lineWidth = 2, e.lineJoin = "round", e.lineCap = "round", t.value.addEventListener("mousedown", c), t.value.addEventListener("mouseup", r), t.value.addEventListener("mousemove", d), t.value.addEventListener("mouseout", r);
    });
    function c(o) {
      a = !0, e.beginPath(), e.moveTo(o.offsetX, o.offsetY);
    }
    function d(o) {
      a && (e.lineTo(o.offsetX, o.offsetY), e.stroke());
    }
    function r() {
      a = !1, e.closePath();
    }
    function l() {
      e.clearRect(0, 0, i.width, i.height);
    }
    return (o, _) => (v(), h("div", null, [
      s("canvas", {
        ref_key: "canvas",
        ref: t,
        class: "border rounded",
        width: n.width,
        height: n.height
      }, null, 8, m),
      s("div", { class: "mt-2" }, [
        s("button", {
          onClick: l,
          class: "btn btn-warning"
        }, "Clear")
      ])
    ]));
  }
}, w = /* @__PURE__ */ g(p, [["__scopeId", "data-v-016a17af"]]), k = {
  install(n) {
    n.component("SigningPad", w);
  }
};
export {
  w as SigningPad,
  k as default
};
