/* @ds-bundle: {"format":4,"namespace":"DesignSystem_00fa8e","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Toggle","sourcePath":"components/core/Toggle.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"GlassCard","sourcePath":"components/display/GlassCard.jsx"},{"name":"ListRow","sourcePath":"components/display/ListRow.jsx"},{"name":"SegmentTabs","sourcePath":"components/display/SegmentTabs.jsx"},{"name":"TideChart","sourcePath":"components/display/TideChart.jsx"}],"sourceHashes":{"components/core/Button.jsx":"c2655e8db784","components/core/Chip.jsx":"070b009bb96c","components/core/Input.jsx":"317e61cf04ae","components/core/Toggle.jsx":"494de17040af","components/display/Badge.jsx":"8d2052ca182a","components/display/GlassCard.jsx":"cbf5cff1f61f","components/display/ListRow.jsx":"bfc6f76f53a6","components/display/SegmentTabs.jsx":"dcbab378b013","components/display/TideChart.jsx":"e1ee64e7d066","ios-frame.jsx":"be3343be4b51"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_00fa8e = window.DesignSystem_00fa8e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
const base = {
  fontFamily: "'Noto Sans KR', system-ui, sans-serif",
  fontSize: 15,
  fontWeight: 700,
  lineHeight: '20px',
  border: 'none',
  borderRadius: 'var(--mt-radius-lg)',
  padding: '14px 20px',
  cursor: 'pointer',
  width: '100%',
  transition: 'all var(--mt-dur-fast) var(--mt-ease)'
};
const variants = {
  primary: {
    background: 'var(--mt-brand)',
    color: '#fff',
    boxShadow: 'var(--mt-shadow-brand)'
  },
  glass: {
    background: 'var(--mt-glass-strong)',
    color: 'var(--mt-ink)',
    fontWeight: 600,
    backdropFilter: 'var(--mt-blur-sm)',
    WebkitBackdropFilter: 'var(--mt-blur-sm)',
    border: '1px solid var(--mt-hairline-strong)',
    boxShadow: 'var(--mt-shadow-soft)'
  },
  tint: {
    background: 'var(--mt-brand-tint)',
    color: 'var(--mt-brand)',
    fontWeight: 600,
    border: '1px solid rgba(0,119,255,.25)'
  }
};
function Button({
  variant = 'primary',
  disabled = false,
  onClick,
  children,
  style
}) {
  const s = {
    ...base,
    ...variants[variant]
  };
  if (disabled) {
    s.background = variant === 'primary' ? 'var(--mt-brand-disabled)' : 'rgba(255,255,255,.35)';
    s.color = variant === 'primary' ? '#fff' : 'var(--mt-disabled)';
    s.boxShadow = 'none';
    s.cursor = 'not-allowed';
  }
  return /*#__PURE__*/React.createElement("button", {
    style: {
      ...s,
      ...style
    },
    disabled: disabled,
    onClick: onClick
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function Chip({
  selected = false,
  onClick,
  children,
  style
}) {
  const s = selected ? {
    background: 'var(--mt-brand)',
    color: '#fff',
    fontWeight: 700,
    border: '1px solid transparent',
    boxShadow: 'var(--mt-shadow-brand-soft)'
  } : {
    background: 'var(--mt-glass-soft)',
    color: 'var(--mt-body)',
    fontWeight: 400,
    border: '1px solid var(--mt-hairline-strong)',
    backdropFilter: 'var(--mt-blur-sm)',
    WebkitBackdropFilter: 'var(--mt-blur-sm)'
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      fontFamily: "'Noto Sans KR', system-ui, sans-serif",
      fontSize: 13,
      lineHeight: '18px',
      borderRadius: 'var(--mt-radius-pill)',
      padding: '8px 15px',
      cursor: 'pointer',
      transition: 'all var(--mt-dur-fast) var(--mt-ease)',
      ...s,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  error,
  style,
  inputStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const border = error ? '1.5px solid var(--mt-error)' : focus ? '1.5px solid var(--mt-brand)' : '1px solid var(--mt-hairline-strong)';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontFamily: "'Noto Sans KR', system-ui, sans-serif",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--mt-label-lg)',
      color: 'var(--mt-ink)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      font: 'var(--mt-body-lg)',
      color: 'var(--mt-ink)',
      padding: '13px 16px',
      background: focus ? 'rgba(255,255,255,.8)' : 'var(--mt-glass-soft)',
      backdropFilter: 'var(--mt-blur-sm)',
      WebkitBackdropFilter: 'var(--mt-blur-sm)',
      border,
      borderRadius: 'var(--mt-radius-lg)',
      outline: 'none',
      boxShadow: focus ? 'var(--mt-focus-ring), var(--mt-shadow-inset-input)' : 'var(--mt-shadow-inset-input)',
      transition: 'all var(--mt-dur-fast) var(--mt-ease)',
      ...inputStyle
    }
  })), error && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--mt-label-md)',
      color: 'var(--mt-error)'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Toggle.jsx
try { (() => {
function Toggle({
  checked = false,
  onChange,
  label,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      background: 'var(--mt-glass)',
      backdropFilter: 'var(--mt-blur-md)',
      WebkitBackdropFilter: 'var(--mt-blur-md)',
      border: '1px solid var(--mt-hairline)',
      borderRadius: 'var(--mt-radius-lg)',
      padding: '13px 16px',
      boxShadow: 'var(--mt-shadow-glass)',
      fontFamily: "'Noto Sans KR', system-ui, sans-serif",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--mt-ink)'
    }
  }, label), /*#__PURE__*/React.createElement("button", {
    role: "switch",
    "aria-checked": checked,
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 46,
      height: 27,
      borderRadius: 14,
      border: 'none',
      cursor: 'pointer',
      position: 'relative',
      flex: 'none',
      background: checked ? 'var(--mt-brand)' : 'rgba(120,125,140,.35)',
      transition: 'background var(--mt-dur-fast) var(--mt-ease)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 22 : 3,
      width: 21,
      height: 21,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,.15)',
      transition: 'left var(--mt-dur-fast) var(--mt-ease)'
    }
  })));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
function Badge({
  variant = 'brand',
  display = false,
  children,
  style
}) {
  const v = {
    brand: {
      background: 'var(--mt-accent-tint)',
      color: 'var(--mt-accent)',
      border: '1px solid var(--mt-accent-border)'
    },
    neutral: {
      background: 'var(--mt-glass-soft)',
      color: 'var(--mt-muted)',
      border: '1px solid var(--mt-hairline)'
    },
    error: {
      background: 'var(--mt-error-bg)',
      color: 'var(--mt-error)',
      border: '1px solid transparent'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      font: display ? 'var(--mt-display-sm)' : 'var(--mt-label-md)',
      fontWeight: display ? 400 : 700,
      borderRadius: display ? 14 : 'var(--mt-radius-pill)',
      padding: display ? '7px 14px' : '5px 10px',
      ...v,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/GlassCard.jsx
try { (() => {
function GlassCard({
  level = 'card',
  radius = 'var(--mt-radius-xl)',
  style,
  children
}) {
  const bg = {
    card: 'var(--mt-glass)',
    soft: 'var(--mt-glass-soft)',
    strong: 'var(--mt-glass-strong)'
  }[level];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      backdropFilter: 'var(--mt-blur-md)',
      WebkitBackdropFilter: 'var(--mt-blur-md)',
      border: '1px solid var(--mt-hairline)',
      borderRadius: radius,
      boxShadow: 'var(--mt-shadow-glass)',
      padding: 20,
      fontFamily: "'Noto Sans KR', system-ui, sans-serif",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { GlassCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/GlassCard.jsx", error: String((e && e.message) || e) }); }

// components/display/ListRow.jsx
try { (() => {
const Chevron = ({
  up
}) => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 20 20"
}, /*#__PURE__*/React.createElement("path", {
  d: up ? 'M4 13 L10 6 L16 13' : 'M4 7 L10 14 L16 7',
  stroke: "var(--mt-info)",
  strokeWidth: "2.5",
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
function ListRow({
  direction = 'high',
  title,
  meta,
  badge,
  badgeVariant = 'neutral',
  emphasized = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      background: emphasized ? 'var(--mt-glass-soft)' : 'rgba(255,255,255,.32)',
      backdropFilter: 'var(--mt-blur-md)',
      WebkitBackdropFilter: 'var(--mt-blur-md)',
      border: `1px solid ${emphasized ? 'var(--mt-hairline)' : 'var(--mt-hairline-soft)'}`,
      borderRadius: 20,
      padding: '13px 16px',
      boxShadow: emphasized ? 'var(--mt-shadow-glass)' : 'none',
      fontFamily: "'Noto Sans KR', system-ui, sans-serif",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 13,
      background: 'rgba(46,111,163,.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Chevron, {
    up: direction === 'high'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      fontWeight: 700,
      color: 'var(--mt-ink)'
    }
  }, title), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--mt-muted)'
    }
  }, meta)), badge && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: badgeVariant === 'brand' ? 700 : 400,
      color: badgeVariant === 'brand' ? 'var(--mt-accent)' : 'var(--mt-muted)',
      background: badgeVariant === 'brand' ? 'var(--mt-accent-tint)' : 'rgba(255,255,255,.4)',
      border: `1px solid ${badgeVariant === 'brand' ? 'var(--mt-accent-border)' : 'var(--mt-hairline)'}`,
      borderRadius: 11,
      padding: '5px 10px',
      flex: 'none'
    }
  }, badge));
}
Object.assign(__ds_scope, { ListRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/display/SegmentTabs.jsx
try { (() => {
function SegmentTabs({
  items,
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      padding: 5,
      background: 'var(--mt-glass)',
      backdropFilter: 'var(--mt-blur-md)',
      WebkitBackdropFilter: 'var(--mt-blur-md)',
      border: '1px solid var(--mt-hairline)',
      borderRadius: 22,
      boxShadow: 'var(--mt-shadow-glass)',
      fontFamily: "'Noto Sans KR', system-ui, sans-serif",
      ...style
    }
  }, items.map(it => {
    const active = it === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it,
      onClick: () => onChange && onChange(it),
      style: {
        flex: 1,
        textAlign: 'center',
        fontSize: 13.5,
        lineHeight: '19px',
        padding: '10px 0',
        fontWeight: active ? 700 : 400,
        color: active ? '#fff' : 'var(--mt-body)',
        background: active ? 'var(--mt-brand)' : 'transparent',
        border: 'none',
        borderRadius: 17,
        cursor: 'pointer',
        boxShadow: active ? 'var(--mt-shadow-brand-soft)' : 'none',
        transition: 'all var(--mt-dur-fast) var(--mt-ease)'
      }
    }, it);
  }));
}
Object.assign(__ds_scope, { SegmentTabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/SegmentTabs.jsx", error: String((e && e.message) || e) }); }

// components/display/TideChart.jsx
try { (() => {
/** 조수 곡선 그래프. now(0~1)로 현재 시점 코랄 점 위치 지정. */
function TideChart({
  width = '100%',
  height = 96,
  now = 0.35,
  style
}) {
  // 고정 곡선 (두 번의 만조/간조) — 데이터 연동 시 path 계산으로 대체
  const d = 'M8 78 C40 18 76 18 104 50 C132 82 168 82 196 44 C216 18 244 20 268 40';
  // now 위치의 점 좌표 근사 (주요 지점 보간)
  const pts = [[8, 78], [56, 30], [104, 50], [150, 72], [196, 44], [232, 26], [268, 40]];
  const i = Math.min(pts.length - 2, Math.max(0, Math.floor(now * (pts.length - 1))));
  const t = now * (pts.length - 1) - i;
  const cx = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t;
  const cy = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t;
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 276 96",
    style: {
      display: 'block',
      ...style
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "62",
    x2: "268",
    y2: "62",
    stroke: "var(--mt-chart-grid)",
    strokeWidth: "2",
    strokeDasharray: "1 7",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: d,
    stroke: "var(--mt-chart-line)",
    strokeWidth: "5",
    fill: "none",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: "8",
    fill: "var(--mt-accent)",
    stroke: "#fff",
    strokeWidth: "3"
  }));
}
Object.assign(__ds_scope, { TideChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/TideChart.jsx", error: String((e && e.message) || e) }); }

// ios-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ios-frame.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.GlassCard = __ds_scope.GlassCard;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.SegmentTabs = __ds_scope.SegmentTabs;

__ds_ns.TideChart = __ds_scope.TideChart;

})();
