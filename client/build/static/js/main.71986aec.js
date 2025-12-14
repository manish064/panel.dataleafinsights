/*! For license information please see main.71986aec.js.LICENSE.txt */
(()=>{var e={4:(e,t,r)=>{"use strict";var n=r(853),o=r(43),a=r(950);function i(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function l(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!==(4098&(t=e).flags)&&(r=t.return),e=t.return}while(e)}return 3===t.tag?r:null}function c(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function u(e){if(l(e)!==e)throw Error(i(188))}function d(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e;for(e=e.child;null!==e;){if(null!==(t=d(e)))return t;e=e.sibling}return null}var f=Object.assign,p=Symbol.for("react.element"),h=Symbol.for("react.transitional.element"),m=Symbol.for("react.portal"),g=Symbol.for("react.fragment"),y=Symbol.for("react.strict_mode"),b=Symbol.for("react.profiler"),v=Symbol.for("react.provider"),x=Symbol.for("react.consumer"),w=Symbol.for("react.context"),k=Symbol.for("react.forward_ref"),S=Symbol.for("react.suspense"),j=Symbol.for("react.suspense_list"),_=Symbol.for("react.memo"),E=Symbol.for("react.lazy");Symbol.for("react.scope");var C=Symbol.for("react.activity");Symbol.for("react.legacy_hidden"),Symbol.for("react.tracing_marker");var T=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var R=Symbol.iterator;function P(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=R&&e[R]||e["@@iterator"])?e:null}var z=Symbol.for("react.client.reference");function N(e){if(null==e)return null;if("function"===typeof e)return e.$$typeof===z?null:e.displayName||e.name||null;if("string"===typeof e)return e;switch(e){case g:return"Fragment";case b:return"Profiler";case y:return"StrictMode";case S:return"Suspense";case j:return"SuspenseList";case C:return"Activity"}if("object"===typeof e)switch(e.$$typeof){case m:return"Portal";case w:return(e.displayName||"Context")+".Provider";case x:return(e._context.displayName||"Context")+".Consumer";case k:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case _:return null!==(t=e.displayName||null)?t:N(e.type)||"Memo";case E:t=e._payload,e=e._init;try{return N(e(t))}catch(r){}}return null}var O=Array.isArray,A=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,L=a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,D={pending:!1,data:null,method:null,action:null},I=[],$=-1;function F(e){return{current:e}}function M(e){0>$||(e.current=I[$],I[$]=null,$--)}function B(e,t){$++,I[$]=e.current,e.current=t}var U=F(null),q=F(null),H=F(null),W=F(null);function V(e,t){switch(B(H,t),B(q,e),B(U,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?od(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)e=ad(t=od(t),e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}M(U),B(U,e)}function Y(){M(U),M(q),M(H)}function K(e){null!==e.memoizedState&&B(W,e);var t=U.current,r=ad(t,e.type);t!==r&&(B(q,e),B(U,r))}function Q(e){q.current===e&&(M(U),M(q)),W.current===e&&(M(W),Kd._currentValue=D)}var X=Object.prototype.hasOwnProperty,G=n.unstable_scheduleCallback,J=n.unstable_cancelCallback,Z=n.unstable_shouldYield,ee=n.unstable_requestPaint,te=n.unstable_now,re=n.unstable_getCurrentPriorityLevel,ne=n.unstable_ImmediatePriority,oe=n.unstable_UserBlockingPriority,ae=n.unstable_NormalPriority,ie=n.unstable_LowPriority,se=n.unstable_IdlePriority,le=n.log,ce=n.unstable_setDisableYieldValue,ue=null,de=null;function fe(e){if("function"===typeof le&&ce(e),de&&"function"===typeof de.setStrictMode)try{de.setStrictMode(ue,e)}catch(t){}}var pe=Math.clz32?Math.clz32:function(e){return 0===(e>>>=0)?32:31-(he(e)/me|0)|0},he=Math.log,me=Math.LN2;var ge=256,ye=4194304;function be(e){var t=42&e;if(0!==t)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return 4194048&e;case 4194304:case 8388608:case 16777216:case 33554432:return 62914560&e;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ve(e,t,r){var n=e.pendingLanes;if(0===n)return 0;var o=0,a=e.suspendedLanes,i=e.pingedLanes;e=e.warmLanes;var s=134217727&n;return 0!==s?0!==(n=s&~a)?o=be(n):0!==(i&=s)?o=be(i):r||0!==(r=s&~e)&&(o=be(r)):0!==(s=n&~a)?o=be(s):0!==i?o=be(i):r||0!==(r=n&~e)&&(o=be(r)),0===o?0:0!==t&&t!==o&&0===(t&a)&&((a=o&-o)>=(r=t&-t)||32===a&&0!==(4194048&r))?t:o}function xe(e,t){return 0===(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)}function we(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;default:return-1}}function ke(){var e=ge;return 0===(4194048&(ge<<=1))&&(ge=256),e}function Se(){var e=ye;return 0===(62914560&(ye<<=1))&&(ye=4194304),e}function je(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function _e(e,t){e.pendingLanes|=t,268435456!==t&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ee(e,t,r){e.pendingLanes|=t,e.suspendedLanes&=~t;var n=31-pe(t);e.entangledLanes|=t,e.entanglements[n]=1073741824|e.entanglements[n]|4194090&r}function Ce(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var n=31-pe(r),o=1<<n;o&t|e[n]&t&&(e[n]|=t),r&=~o}}function Te(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Re(e){return 2<(e&=-e)?8<e?0!==(134217727&e)?32:268435456:8:2}function Pe(){var e=L.p;return 0!==e?e:void 0===(e=window.event)?32:uf(e.type)}var ze=Math.random().toString(36).slice(2),Ne="__reactFiber$"+ze,Oe="__reactProps$"+ze,Ae="__reactContainer$"+ze,Le="__reactEvents$"+ze,De="__reactListeners$"+ze,Ie="__reactHandles$"+ze,$e="__reactResources$"+ze,Fe="__reactMarker$"+ze;function Me(e){delete e[Ne],delete e[Oe],delete e[Le],delete e[De],delete e[Ie]}function Be(e){var t=e[Ne];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Ae]||r[Ne]){if(r=t.alternate,null!==t.child||null!==r&&null!==r.child)for(e=vd(e);null!==e;){if(r=e[Ne])return r;e=vd(e)}return t}r=(e=r).parentNode}return null}function Ue(e){if(e=e[Ne]||e[Ae]){var t=e.tag;if(5===t||6===t||13===t||26===t||27===t||3===t)return e}return null}function qe(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e.stateNode;throw Error(i(33))}function He(e){var t=e[$e];return t||(t=e[$e]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function We(e){e[Fe]=!0}var Ve=new Set,Ye={};function Ke(e,t){Qe(e,t),Qe(e+"Capture",t)}function Qe(e,t){for(Ye[e]=t,e=0;e<t.length;e++)Ve.add(t[e])}var Xe,Ge,Je=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Ze={},et={};function tt(e,t,r){if(o=t,X.call(et,o)||!X.call(Ze,o)&&(Je.test(o)?et[o]=!0:(Ze[o]=!0,0)))if(null===r)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":return void e.removeAttribute(t);case"boolean":var n=t.toLowerCase().slice(0,5);if("data-"!==n&&"aria-"!==n)return void e.removeAttribute(t)}e.setAttribute(t,""+r)}var o}function rt(e,t,r){if(null===r)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(t)}e.setAttribute(t,""+r)}}function nt(e,t,r,n){if(null===n)e.removeAttribute(r);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(r)}e.setAttributeNS(t,r,""+n)}}function ot(e){if(void 0===Xe)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);Xe=t&&t[1]||"",Ge=-1<r.stack.indexOf("\n    at")?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return"\n"+Xe+e+Ge}var at=!1;function it(e,t){if(!e||at)return"";at=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var n={DetermineComponentFrameRoot:function(){try{if(t){var r=function(){throw Error()};if(Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(r,[])}catch(o){var n=o}Reflect.construct(e,[],r)}else{try{r.call()}catch(a){n=a}e.call(r.prototype)}}else{try{throw Error()}catch(i){n=i}(r=e())&&"function"===typeof r.catch&&r.catch(function(){})}}catch(s){if(s&&n&&"string"===typeof s.stack)return[s.stack,n.stack]}return[null,null]}};n.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var o=Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot,"name");o&&o.configurable&&Object.defineProperty(n.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var a=n.DetermineComponentFrameRoot(),i=a[0],s=a[1];if(i&&s){var l=i.split("\n"),c=s.split("\n");for(o=n=0;n<l.length&&!l[n].includes("DetermineComponentFrameRoot");)n++;for(;o<c.length&&!c[o].includes("DetermineComponentFrameRoot");)o++;if(n===l.length||o===c.length)for(n=l.length-1,o=c.length-1;1<=n&&0<=o&&l[n]!==c[o];)o--;for(;1<=n&&0<=o;n--,o--)if(l[n]!==c[o]){if(1!==n||1!==o)do{if(n--,0>--o||l[n]!==c[o]){var u="\n"+l[n].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}}while(1<=n&&0<=o);break}}}finally{at=!1,Error.prepareStackTrace=r}return(r=e?e.displayName||e.name:"")?ot(r):""}function st(e){switch(e.tag){case 26:case 27:case 5:return ot(e.type);case 16:return ot("Lazy");case 13:return ot("Suspense");case 19:return ot("SuspenseList");case 0:case 15:return it(e.type,!1);case 11:return it(e.type.render,!1);case 1:return it(e.type,!0);case 31:return ot("Activity");default:return""}}function lt(e){try{var t="";do{t+=st(e),e=e.return}while(e);return t}catch(r){return"\nError generating stack: "+r.message+"\n"+r.stack}}function ct(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function ut(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function dt(e){e._valueTracker||(e._valueTracker=function(e){var t=ut(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),n=""+e[t];if(!e.hasOwnProperty(t)&&"undefined"!==typeof r&&"function"===typeof r.get&&"function"===typeof r.set){var o=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(e){n=""+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function ft(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),n="";return e&&(n=ut(e)?e.checked?"true":"false":e.value),(e=n)!==r&&(t.setValue(e),!0)}function pt(e){if("undefined"===typeof(e=e||("undefined"!==typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}var ht=/[\n"\\]/g;function mt(e){return e.replace(ht,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function gt(e,t,r,n,o,a,i,s){e.name="",null!=i&&"function"!==typeof i&&"symbol"!==typeof i&&"boolean"!==typeof i?e.type=i:e.removeAttribute("type"),null!=t?"number"===i?(0===t&&""===e.value||e.value!=t)&&(e.value=""+ct(t)):e.value!==""+ct(t)&&(e.value=""+ct(t)):"submit"!==i&&"reset"!==i||e.removeAttribute("value"),null!=t?bt(e,i,ct(t)):null!=r?bt(e,i,ct(r)):null!=n&&e.removeAttribute("value"),null==o&&null!=a&&(e.defaultChecked=!!a),null!=o&&(e.checked=o&&"function"!==typeof o&&"symbol"!==typeof o),null!=s&&"function"!==typeof s&&"symbol"!==typeof s&&"boolean"!==typeof s?e.name=""+ct(s):e.removeAttribute("name")}function yt(e,t,r,n,o,a,i,s){if(null!=a&&"function"!==typeof a&&"symbol"!==typeof a&&"boolean"!==typeof a&&(e.type=a),null!=t||null!=r){if(!("submit"!==a&&"reset"!==a||void 0!==t&&null!==t))return;r=null!=r?""+ct(r):"",t=null!=t?""+ct(t):r,s||t===e.value||(e.value=t),e.defaultValue=t}n="function"!==typeof(n=null!=n?n:o)&&"symbol"!==typeof n&&!!n,e.checked=s?e.checked:!!n,e.defaultChecked=!!n,null!=i&&"function"!==typeof i&&"symbol"!==typeof i&&"boolean"!==typeof i&&(e.name=i)}function bt(e,t,r){"number"===t&&pt(e.ownerDocument)===e||e.defaultValue===""+r||(e.defaultValue=""+r)}function vt(e,t,r,n){if(e=e.options,t){t={};for(var o=0;o<r.length;o++)t["$"+r[o]]=!0;for(r=0;r<e.length;r++)o=t.hasOwnProperty("$"+e[r].value),e[r].selected!==o&&(e[r].selected=o),o&&n&&(e[r].defaultSelected=!0)}else{for(r=""+ct(r),t=null,o=0;o<e.length;o++){if(e[o].value===r)return e[o].selected=!0,void(n&&(e[o].defaultSelected=!0));null!==t||e[o].disabled||(t=e[o])}null!==t&&(t.selected=!0)}}function xt(e,t,r){null==t||((t=""+ct(t))!==e.value&&(e.value=t),null!=r)?e.defaultValue=null!=r?""+ct(r):"":e.defaultValue!==t&&(e.defaultValue=t)}function wt(e,t,r,n){if(null==t){if(null!=n){if(null!=r)throw Error(i(92));if(O(n)){if(1<n.length)throw Error(i(93));n=n[0]}r=n}null==r&&(r=""),t=r}r=ct(t),e.defaultValue=r,(n=e.textContent)===r&&""!==n&&null!==n&&(e.value=n)}function kt(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&3===r.nodeType)return void(r.nodeValue=t)}e.textContent=t}var St=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function jt(e,t,r){var n=0===t.indexOf("--");null==r||"boolean"===typeof r||""===r?n?e.setProperty(t,""):"float"===t?e.cssFloat="":e[t]="":n?e.setProperty(t,r):"number"!==typeof r||0===r||St.has(t)?"float"===t?e.cssFloat=r:e[t]=(""+r).trim():e[t]=r+"px"}function _t(e,t,r){if(null!=t&&"object"!==typeof t)throw Error(i(62));if(e=e.style,null!=r){for(var n in r)!r.hasOwnProperty(n)||null!=t&&t.hasOwnProperty(n)||(0===n.indexOf("--")?e.setProperty(n,""):"float"===n?e.cssFloat="":e[n]="");for(var o in t)n=t[o],t.hasOwnProperty(o)&&r[o]!==n&&jt(e,o,n)}else for(var a in t)t.hasOwnProperty(a)&&jt(e,a,t[a])}function Et(e){if(-1===e.indexOf("-"))return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ct=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Tt=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Rt(e){return Tt.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var Pt=null;function zt(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var Nt=null,Ot=null;function At(e){var t=Ue(e);if(t&&(e=t.stateNode)){var r=e[Oe]||null;e:switch(e=t.stateNode,t.type){case"input":if(gt(e,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),t=r.name,"radio"===r.type&&null!=t){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+mt(""+t)+'"][type="radio"]'),t=0;t<r.length;t++){var n=r[t];if(n!==e&&n.form===e.form){var o=n[Oe]||null;if(!o)throw Error(i(90));gt(n,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name)}}for(t=0;t<r.length;t++)(n=r[t]).form===e.form&&ft(n)}break e;case"textarea":xt(e,r.value,r.defaultValue);break e;case"select":null!=(t=r.value)&&vt(e,!!r.multiple,t,!1)}}}var Lt=!1;function Dt(e,t,r){if(Lt)return e(t,r);Lt=!0;try{return e(t)}finally{if(Lt=!1,(null!==Nt||null!==Ot)&&(Bc(),Nt&&(t=Nt,e=Ot,Ot=Nt=null,At(t),e)))for(t=0;t<e.length;t++)At(e[t])}}function It(e,t){var r=e.stateNode;if(null===r)return null;var n=r[Oe]||null;if(null===n)return null;r=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(n=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!n;break e;default:e=!1}if(e)return null;if(r&&"function"!==typeof r)throw Error(i(231,t,typeof r));return r}var $t=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Ft=!1;if($t)try{var Mt={};Object.defineProperty(Mt,"passive",{get:function(){Ft=!0}}),window.addEventListener("test",Mt,Mt),window.removeEventListener("test",Mt,Mt)}catch(Af){Ft=!1}var Bt=null,Ut=null,qt=null;function Ht(){if(qt)return qt;var e,t,r=Ut,n=r.length,o="value"in Bt?Bt.value:Bt.textContent,a=o.length;for(e=0;e<n&&r[e]===o[e];e++);var i=n-e;for(t=1;t<=i&&r[n-t]===o[a-t];t++);return qt=o.slice(e,1<t?1-t:void 0)}function Wt(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function Vt(){return!0}function Yt(){return!1}function Kt(e){function t(t,r,n,o,a){for(var i in this._reactName=t,this._targetInst=n,this.type=r,this.nativeEvent=o,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(i)&&(t=e[i],this[i]=t?t(o):o[i]);return this.isDefaultPrevented=(null!=o.defaultPrevented?o.defaultPrevented:!1===o.returnValue)?Vt:Yt,this.isPropagationStopped=Yt,this}return f(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!==typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=Vt)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!==typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=Vt)},persist:function(){},isPersistent:Vt}),t}var Qt,Xt,Gt,Jt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Zt=Kt(Jt),er=f({},Jt,{view:0,detail:0}),tr=Kt(er),rr=f({},er,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:pr,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Gt&&(Gt&&"mousemove"===e.type?(Qt=e.screenX-Gt.screenX,Xt=e.screenY-Gt.screenY):Xt=Qt=0,Gt=e),Qt)},movementY:function(e){return"movementY"in e?e.movementY:Xt}}),nr=Kt(rr),or=Kt(f({},rr,{dataTransfer:0})),ar=Kt(f({},er,{relatedTarget:0})),ir=Kt(f({},Jt,{animationName:0,elapsedTime:0,pseudoElement:0})),sr=Kt(f({},Jt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}})),lr=Kt(f({},Jt,{data:0})),cr={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ur={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},dr={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function fr(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=dr[e])&&!!t[e]}function pr(){return fr}var hr=Kt(f({},er,{key:function(e){if(e.key){var t=cr[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=Wt(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?ur[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:pr,charCode:function(e){return"keypress"===e.type?Wt(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?Wt(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}})),mr=Kt(f({},rr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),gr=Kt(f({},er,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:pr})),yr=Kt(f({},Jt,{propertyName:0,elapsedTime:0,pseudoElement:0})),br=Kt(f({},rr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),vr=Kt(f({},Jt,{newState:0,oldState:0})),xr=[9,13,27,32],wr=$t&&"CompositionEvent"in window,kr=null;$t&&"documentMode"in document&&(kr=document.documentMode);var Sr=$t&&"TextEvent"in window&&!kr,jr=$t&&(!wr||kr&&8<kr&&11>=kr),_r=String.fromCharCode(32),Er=!1;function Cr(e,t){switch(e){case"keyup":return-1!==xr.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Tr(e){return"object"===typeof(e=e.detail)&&"data"in e?e.data:null}var Rr=!1;var Pr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function zr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Pr[e.type]:"textarea"===t}function Nr(e,t,r,n){Nt?Ot?Ot.push(n):Ot=[n]:Nt=n,0<(t=Hu(t,"onChange")).length&&(r=new Zt("onChange","change",null,r,n),e.push({event:r,listeners:t}))}var Or=null,Ar=null;function Lr(e){Du(e,0)}function Dr(e){if(ft(qe(e)))return e}function Ir(e,t){if("change"===e)return t}var $r=!1;if($t){var Fr;if($t){var Mr="oninput"in document;if(!Mr){var Br=document.createElement("div");Br.setAttribute("oninput","return;"),Mr="function"===typeof Br.oninput}Fr=Mr}else Fr=!1;$r=Fr&&(!document.documentMode||9<document.documentMode)}function Ur(){Or&&(Or.detachEvent("onpropertychange",qr),Ar=Or=null)}function qr(e){if("value"===e.propertyName&&Dr(Ar)){var t=[];Nr(t,Ar,e,zt(e)),Dt(Lr,t)}}function Hr(e,t,r){"focusin"===e?(Ur(),Ar=r,(Or=t).attachEvent("onpropertychange",qr)):"focusout"===e&&Ur()}function Wr(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Dr(Ar)}function Vr(e,t){if("click"===e)return Dr(t)}function Yr(e,t){if("input"===e||"change"===e)return Dr(t)}var Kr="function"===typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e===1/t)||e!==e&&t!==t};function Qr(e,t){if(Kr(e,t))return!0;if("object"!==typeof e||null===e||"object"!==typeof t||null===t)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(n=0;n<r.length;n++){var o=r[n];if(!X.call(t,o)||!Kr(e[o],t[o]))return!1}return!0}function Xr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Gr(e,t){var r,n=Xr(e);for(e=0;n;){if(3===n.nodeType){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Xr(n)}}function Jr(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?Jr(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function Zr(e){for(var t=pt((e=null!=e&&null!=e.ownerDocument&&null!=e.ownerDocument.defaultView?e.ownerDocument.defaultView:window).document);t instanceof e.HTMLIFrameElement;){try{var r="string"===typeof t.contentWindow.location.href}catch(n){r=!1}if(!r)break;t=pt((e=t.contentWindow).document)}return t}function en(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var tn=$t&&"documentMode"in document&&11>=document.documentMode,rn=null,nn=null,on=null,an=!1;function sn(e,t,r){var n=r.window===r?r.document:9===r.nodeType?r:r.ownerDocument;an||null==rn||rn!==pt(n)||("selectionStart"in(n=rn)&&en(n)?n={start:n.selectionStart,end:n.selectionEnd}:n={anchorNode:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset},on&&Qr(on,n)||(on=n,0<(n=Hu(nn,"onSelect")).length&&(t=new Zt("onSelect","select",null,t,r),e.push({event:t,listeners:n}),t.target=rn)))}function ln(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var cn={animationend:ln("Animation","AnimationEnd"),animationiteration:ln("Animation","AnimationIteration"),animationstart:ln("Animation","AnimationStart"),transitionrun:ln("Transition","TransitionRun"),transitionstart:ln("Transition","TransitionStart"),transitioncancel:ln("Transition","TransitionCancel"),transitionend:ln("Transition","TransitionEnd")},un={},dn={};function fn(e){if(un[e])return un[e];if(!cn[e])return e;var t,r=cn[e];for(t in r)if(r.hasOwnProperty(t)&&t in dn)return un[e]=r[t];return e}$t&&(dn=document.createElement("div").style,"AnimationEvent"in window||(delete cn.animationend.animation,delete cn.animationiteration.animation,delete cn.animationstart.animation),"TransitionEvent"in window||delete cn.transitionend.transition);var pn=fn("animationend"),hn=fn("animationiteration"),mn=fn("animationstart"),gn=fn("transitionrun"),yn=fn("transitionstart"),bn=fn("transitioncancel"),vn=fn("transitionend"),xn=new Map,wn="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function kn(e,t){xn.set(e,t),Ke(t,[e])}wn.push("scrollEnd");var Sn=new WeakMap;function jn(e,t){if("object"===typeof e&&null!==e){var r=Sn.get(e);return void 0!==r?r:(t={value:e,source:t,stack:lt(t)},Sn.set(e,t),t)}return{value:e,source:t,stack:lt(t)}}var _n=[],En=0,Cn=0;function Tn(){for(var e=En,t=Cn=En=0;t<e;){var r=_n[t];_n[t++]=null;var n=_n[t];_n[t++]=null;var o=_n[t];_n[t++]=null;var a=_n[t];if(_n[t++]=null,null!==n&&null!==o){var i=n.pending;null===i?o.next=o:(o.next=i.next,i.next=o),n.pending=o}0!==a&&Nn(r,o,a)}}function Rn(e,t,r,n){_n[En++]=e,_n[En++]=t,_n[En++]=r,_n[En++]=n,Cn|=n,e.lanes|=n,null!==(e=e.alternate)&&(e.lanes|=n)}function Pn(e,t,r,n){return Rn(e,t,r,n),On(e)}function zn(e,t){return Rn(e,null,null,t),On(e)}function Nn(e,t,r){e.lanes|=r;var n=e.alternate;null!==n&&(n.lanes|=r);for(var o=!1,a=e.return;null!==a;)a.childLanes|=r,null!==(n=a.alternate)&&(n.childLanes|=r),22===a.tag&&(null===(e=a.stateNode)||1&e._visibility||(o=!0)),e=a,a=a.return;return 3===e.tag?(a=e.stateNode,o&&null!==t&&(o=31-pe(r),null===(n=(e=a.hiddenUpdates)[o])?e[o]=[t]:n.push(t),t.lane=536870912|r),a):null}function On(e){if(50<Nc)throw Nc=0,Oc=null,Error(i(185));for(var t=e.return;null!==t;)t=(e=t).return;return 3===e.tag?e.stateNode:null}var An={};function Ln(e,t,r,n){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Dn(e,t,r,n){return new Ln(e,t,r,n)}function In(e){return!(!(e=e.prototype)||!e.isReactComponent)}function $n(e,t){var r=e.alternate;return null===r?((r=Dn(e.tag,t,e.key,e.mode)).elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=65011712&e.flags,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r.refCleanup=e.refCleanup,r}function Fn(e,t){e.flags&=65011714;var r=e.alternate;return null===r?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=r.childLanes,e.lanes=r.lanes,e.child=r.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=r.memoizedProps,e.memoizedState=r.memoizedState,e.updateQueue=r.updateQueue,e.type=r.type,t=r.dependencies,e.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Mn(e,t,r,n,o,a){var s=0;if(n=e,"function"===typeof e)In(e)&&(s=1);else if("string"===typeof e)s=function(e,t,r){if(1===r||null!=t.itemProp)return!1;switch(e){case"meta":case"title":return!0;case"style":if("string"!==typeof t.precedence||"string"!==typeof t.href||""===t.href)break;return!0;case"link":if("string"!==typeof t.rel||"string"!==typeof t.href||""===t.href||t.onLoad||t.onError)break;return"stylesheet"!==t.rel||(e=t.disabled,"string"===typeof t.precedence&&null==e);case"script":if(t.async&&"function"!==typeof t.async&&"symbol"!==typeof t.async&&!t.onLoad&&!t.onError&&t.src&&"string"===typeof t.src)return!0}return!1}(e,r,U.current)?26:"html"===e||"head"===e||"body"===e?27:5;else e:switch(e){case C:return(e=Dn(31,r,t,o)).elementType=C,e.lanes=a,e;case g:return Bn(r.children,o,a,t);case y:s=8,o|=24;break;case b:return(e=Dn(12,r,t,2|o)).elementType=b,e.lanes=a,e;case S:return(e=Dn(13,r,t,o)).elementType=S,e.lanes=a,e;case j:return(e=Dn(19,r,t,o)).elementType=j,e.lanes=a,e;default:if("object"===typeof e&&null!==e)switch(e.$$typeof){case v:case w:s=10;break e;case x:s=9;break e;case k:s=11;break e;case _:s=14;break e;case E:s=16,n=null;break e}s=29,r=Error(i(130,null===e?"null":typeof e,"")),n=null}return(t=Dn(s,r,t,o)).elementType=e,t.type=n,t.lanes=a,t}function Bn(e,t,r,n){return(e=Dn(7,e,n,t)).lanes=r,e}function Un(e,t,r){return(e=Dn(6,e,null,t)).lanes=r,e}function qn(e,t,r){return(t=Dn(4,null!==e.children?e.children:[],e.key,t)).lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Hn=[],Wn=0,Vn=null,Yn=0,Kn=[],Qn=0,Xn=null,Gn=1,Jn="";function Zn(e,t){Hn[Wn++]=Yn,Hn[Wn++]=Vn,Vn=e,Yn=t}function eo(e,t,r){Kn[Qn++]=Gn,Kn[Qn++]=Jn,Kn[Qn++]=Xn,Xn=e;var n=Gn;e=Jn;var o=32-pe(n)-1;n&=~(1<<o),r+=1;var a=32-pe(t)+o;if(30<a){var i=o-o%5;a=(n&(1<<i)-1).toString(32),n>>=i,o-=i,Gn=1<<32-pe(t)+o|r<<o|n,Jn=a+e}else Gn=1<<a|r<<o|n,Jn=e}function to(e){null!==e.return&&(Zn(e,1),eo(e,1,0))}function ro(e){for(;e===Vn;)Vn=Hn[--Wn],Hn[Wn]=null,Yn=Hn[--Wn],Hn[Wn]=null;for(;e===Xn;)Xn=Kn[--Qn],Kn[Qn]=null,Jn=Kn[--Qn],Kn[Qn]=null,Gn=Kn[--Qn],Kn[Qn]=null}var no=null,oo=null,ao=!1,io=null,so=!1,lo=Error(i(519));function co(e){throw go(jn(Error(i(418,"")),e)),lo}function uo(e){var t=e.stateNode,r=e.type,n=e.memoizedProps;switch(t[Ne]=e,t[Oe]=n,r){case"dialog":Iu("cancel",t),Iu("close",t);break;case"iframe":case"object":case"embed":Iu("load",t);break;case"video":case"audio":for(r=0;r<Au.length;r++)Iu(Au[r],t);break;case"source":Iu("error",t);break;case"img":case"image":case"link":Iu("error",t),Iu("load",t);break;case"details":Iu("toggle",t);break;case"input":Iu("invalid",t),yt(t,n.value,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name,!0),dt(t);break;case"select":Iu("invalid",t);break;case"textarea":Iu("invalid",t),wt(t,n.value,n.defaultValue,n.children),dt(t)}"string"!==typeof(r=n.children)&&"number"!==typeof r&&"bigint"!==typeof r||t.textContent===""+r||!0===n.suppressHydrationWarning||Xu(t.textContent,r)?(null!=n.popover&&(Iu("beforetoggle",t),Iu("toggle",t)),null!=n.onScroll&&Iu("scroll",t),null!=n.onScrollEnd&&Iu("scrollend",t),null!=n.onClick&&(t.onclick=Gu),t=!0):t=!1,t||co(e)}function fo(e){for(no=e.return;no;)switch(no.tag){case 5:case 13:return void(so=!1);case 27:case 3:return void(so=!0);default:no=no.return}}function po(e){if(e!==no)return!1;if(!ao)return fo(e),ao=!0,!1;var t,r=e.tag;if((t=3!==r&&27!==r)&&((t=5===r)&&(t=!("form"!==(t=e.type)&&"button"!==t)||id(e.type,e.memoizedProps)),t=!t),t&&oo&&co(e),fo(e),13===r){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(i(317));e:{for(e=e.nextSibling,r=0;e;){if(8===e.nodeType)if("/$"===(t=e.data)){if(0===r){oo=yd(e.nextSibling);break e}r--}else"$"!==t&&"$!"!==t&&"$?"!==t||r++;e=e.nextSibling}oo=null}}else 27===r?(r=oo,pd(e.type)?(e=bd,bd=null,oo=e):oo=r):oo=no?yd(e.stateNode.nextSibling):null;return!0}function ho(){oo=no=null,ao=!1}function mo(){var e=io;return null!==e&&(null===vc?vc=e:vc.push.apply(vc,e),io=null),e}function go(e){null===io?io=[e]:io.push(e)}var yo=F(null),bo=null,vo=null;function xo(e,t,r){B(yo,t._currentValue),t._currentValue=r}function wo(e){e._currentValue=yo.current,M(yo)}function ko(e,t,r){for(;null!==e;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,null!==n&&(n.childLanes|=t)):null!==n&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===r)break;e=e.return}}function So(e,t,r,n){var o=e.child;for(null!==o&&(o.return=e);null!==o;){var a=o.dependencies;if(null!==a){var s=o.child;a=a.firstContext;e:for(;null!==a;){var l=a;a=o;for(var c=0;c<t.length;c++)if(l.context===t[c]){a.lanes|=r,null!==(l=a.alternate)&&(l.lanes|=r),ko(a.return,r,e),n||(s=null);break e}a=l.next}}else if(18===o.tag){if(null===(s=o.return))throw Error(i(341));s.lanes|=r,null!==(a=s.alternate)&&(a.lanes|=r),ko(s,r,e),s=null}else s=o.child;if(null!==s)s.return=o;else for(s=o;null!==s;){if(s===e){s=null;break}if(null!==(o=s.sibling)){o.return=s.return,s=o;break}s=s.return}o=s}}function jo(e,t,r,n){e=null;for(var o=t,a=!1;null!==o;){if(!a)if(0!==(524288&o.flags))a=!0;else if(0!==(262144&o.flags))break;if(10===o.tag){var s=o.alternate;if(null===s)throw Error(i(387));if(null!==(s=s.memoizedProps)){var l=o.type;Kr(o.pendingProps.value,s.value)||(null!==e?e.push(l):e=[l])}}else if(o===W.current){if(null===(s=o.alternate))throw Error(i(387));s.memoizedState.memoizedState!==o.memoizedState.memoizedState&&(null!==e?e.push(Kd):e=[Kd])}o=o.return}null!==e&&So(t,e,r,n),t.flags|=262144}function _o(e){for(e=e.firstContext;null!==e;){if(!Kr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Eo(e){bo=e,vo=null,null!==(e=e.dependencies)&&(e.firstContext=null)}function Co(e){return Ro(bo,e)}function To(e,t){return null===bo&&Eo(e),Ro(e,t)}function Ro(e,t){var r=t._currentValue;if(t={context:t,memoizedValue:r,next:null},null===vo){if(null===e)throw Error(i(308));vo=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else vo=vo.next=t;return r}var Po="undefined"!==typeof AbortController?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,r){e.push(r)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},zo=n.unstable_scheduleCallback,No=n.unstable_NormalPriority,Oo={$$typeof:w,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ao(){return{controller:new Po,data:new Map,refCount:0}}function Lo(e){e.refCount--,0===e.refCount&&zo(No,function(){e.controller.abort()})}var Do=null,Io=0,$o=0,Fo=null;function Mo(){if(0===--Io&&null!==Do){null!==Fo&&(Fo.status="fulfilled");var e=Do;Do=null,$o=0,Fo=null;for(var t=0;t<e.length;t++)(0,e[t])()}}var Bo=A.S;A.S=function(e,t){"object"===typeof t&&null!==t&&"function"===typeof t.then&&function(e,t){if(null===Do){var r=Do=[];Io=0,$o=Ru(),Fo={status:"pending",value:void 0,then:function(e){r.push(e)}}}Io++,t.then(Mo,Mo)}(0,t),null!==Bo&&Bo(e,t)};var Uo=F(null);function qo(){var e=Uo.current;return null!==e?e:nc.pooledCache}function Ho(e,t){B(Uo,null===t?Uo.current:t.pool)}function Wo(){var e=qo();return null===e?null:{parent:Oo._currentValue,pool:e}}var Vo=Error(i(460)),Yo=Error(i(474)),Ko=Error(i(542)),Qo={then:function(){}};function Xo(e){return"fulfilled"===(e=e.status)||"rejected"===e}function Go(){}function Jo(e,t,r){switch(void 0===(r=e[r])?e.push(t):r!==t&&(t.then(Go,Go),t=r),t.status){case"fulfilled":return t.value;case"rejected":throw ta(e=t.reason),e;default:if("string"===typeof t.status)t.then(Go,Go);else{if(null!==(e=nc)&&100<e.shellSuspendCounter)throw Error(i(482));(e=t).status="pending",e.then(function(e){if("pending"===t.status){var r=t;r.status="fulfilled",r.value=e}},function(e){if("pending"===t.status){var r=t;r.status="rejected",r.reason=e}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw ta(e=t.reason),e}throw Zo=t,Vo}}var Zo=null;function ea(){if(null===Zo)throw Error(i(459));var e=Zo;return Zo=null,e}function ta(e){if(e===Vo||e===Ko)throw Error(i(483))}var ra=!1;function na(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function oa(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function aa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ia(e,t,r){var n=e.updateQueue;if(null===n)return null;if(n=n.shared,0!==(2&rc)){var o=n.pending;return null===o?t.next=t:(t.next=o.next,o.next=t),n.pending=t,t=On(e),Nn(e,null,r),t}return Rn(e,n,t,r),On(e)}function sa(e,t,r){if(null!==(t=t.updateQueue)&&(t=t.shared,0!==(4194048&r))){var n=t.lanes;r|=n&=e.pendingLanes,t.lanes=r,Ce(e,r)}}function la(e,t){var r=e.updateQueue,n=e.alternate;if(null!==n&&r===(n=n.updateQueue)){var o=null,a=null;if(null!==(r=r.firstBaseUpdate)){do{var i={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};null===a?o=a=i:a=a.next=i,r=r.next}while(null!==r);null===a?o=a=t:a=a.next=t}else o=a=t;return r={baseState:n.baseState,firstBaseUpdate:o,lastBaseUpdate:a,shared:n.shared,callbacks:n.callbacks},void(e.updateQueue=r)}null===(e=r.lastBaseUpdate)?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}var ca=!1;function ua(){if(ca){if(null!==Fo)throw Fo}}function da(e,t,r,n){ca=!1;var o=e.updateQueue;ra=!1;var a=o.firstBaseUpdate,i=o.lastBaseUpdate,s=o.shared.pending;if(null!==s){o.shared.pending=null;var l=s,c=l.next;l.next=null,null===i?a=c:i.next=c,i=l;var u=e.alternate;null!==u&&((s=(u=u.updateQueue).lastBaseUpdate)!==i&&(null===s?u.firstBaseUpdate=c:s.next=c,u.lastBaseUpdate=l))}if(null!==a){var d=o.baseState;for(i=0,u=c=l=null,s=a;;){var p=-536870913&s.lane,h=p!==s.lane;if(h?(ac&p)===p:(n&p)===p){0!==p&&p===$o&&(ca=!0),null!==u&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});e:{var m=e,g=s;p=t;var y=r;switch(g.tag){case 1:if("function"===typeof(m=g.payload)){d=m.call(y,d,p);break e}d=m;break e;case 3:m.flags=-65537&m.flags|128;case 0:if(null===(p="function"===typeof(m=g.payload)?m.call(y,d,p):m)||void 0===p)break e;d=f({},d,p);break e;case 2:ra=!0}}null!==(p=s.callback)&&(e.flags|=64,h&&(e.flags|=8192),null===(h=o.callbacks)?o.callbacks=[p]:h.push(p))}else h={lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},null===u?(c=u=h,l=d):u=u.next=h,i|=p;if(null===(s=s.next)){if(null===(s=o.shared.pending))break;s=(h=s).next,h.next=null,o.lastBaseUpdate=h,o.shared.pending=null}}null===u&&(l=d),o.baseState=l,o.firstBaseUpdate=c,o.lastBaseUpdate=u,null===a&&(o.shared.lanes=0),pc|=i,e.lanes=i,e.memoizedState=d}}function fa(e,t){if("function"!==typeof e)throw Error(i(191,e));e.call(t)}function pa(e,t){var r=e.callbacks;if(null!==r)for(e.callbacks=null,e=0;e<r.length;e++)fa(r[e],t)}var ha=F(null),ma=F(0);function ga(e,t){B(ma,e=dc),B(ha,t),dc=e|t.baseLanes}function ya(){B(ma,dc),B(ha,ha.current)}function ba(){dc=ma.current,M(ha),M(ma)}var va=0,xa=null,wa=null,ka=null,Sa=!1,ja=!1,_a=!1,Ea=0,Ca=0,Ta=null,Ra=0;function Pa(){throw Error(i(321))}function za(e,t){if(null===t)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Kr(e[r],t[r]))return!1;return!0}function Na(e,t,r,n,o,a){return va=a,xa=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,A.H=null===e||null===e.memoizedState?Vi:Yi,_a=!1,a=r(n,o),_a=!1,ja&&(a=Aa(t,r,n,o)),Oa(e),a}function Oa(e){A.H=Wi;var t=null!==wa&&null!==wa.next;if(va=0,ka=wa=xa=null,Sa=!1,Ca=0,Ta=null,t)throw Error(i(300));null===e||Cs||null!==(e=e.dependencies)&&_o(e)&&(Cs=!0)}function Aa(e,t,r,n){xa=e;var o=0;do{if(ja&&(Ta=null),Ca=0,ja=!1,25<=o)throw Error(i(301));if(o+=1,ka=wa=null,null!=e.updateQueue){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,null!=a.memoCache&&(a.memoCache.index=0)}A.H=Ki,a=t(r,n)}while(ja);return a}function La(){var e=A.H,t=e.useState()[0];return t="function"===typeof t.then?Ba(t):t,e=e.useState()[0],(null!==wa?wa.memoizedState:null)!==e&&(xa.flags|=1024),t}function Da(){var e=0!==Ea;return Ea=0,e}function Ia(e,t,r){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r}function $a(e){if(Sa){for(e=e.memoizedState;null!==e;){var t=e.queue;null!==t&&(t.pending=null),e=e.next}Sa=!1}va=0,ka=wa=xa=null,ja=!1,Ca=Ea=0,Ta=null}function Fa(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===ka?xa.memoizedState=ka=e:ka=ka.next=e,ka}function Ma(){if(null===wa){var e=xa.alternate;e=null!==e?e.memoizedState:null}else e=wa.next;var t=null===ka?xa.memoizedState:ka.next;if(null!==t)ka=t,wa=e;else{if(null===e){if(null===xa.alternate)throw Error(i(467));throw Error(i(310))}e={memoizedState:(wa=e).memoizedState,baseState:wa.baseState,baseQueue:wa.baseQueue,queue:wa.queue,next:null},null===ka?xa.memoizedState=ka=e:ka=ka.next=e}return ka}function Ba(e){var t=Ca;return Ca+=1,null===Ta&&(Ta=[]),e=Jo(Ta,e,t),t=xa,null===(null===ka?t.memoizedState:ka.next)&&(t=t.alternate,A.H=null===t||null===t.memoizedState?Vi:Yi),e}function Ua(e){if(null!==e&&"object"===typeof e){if("function"===typeof e.then)return Ba(e);if(e.$$typeof===w)return Co(e)}throw Error(i(438,String(e)))}function qa(e){var t=null,r=xa.updateQueue;if(null!==r&&(t=r.memoCache),null==t){var n=xa.alternate;null!==n&&(null!==(n=n.updateQueue)&&(null!=(n=n.memoCache)&&(t={data:n.data.map(function(e){return e.slice()}),index:0})))}if(null==t&&(t={data:[],index:0}),null===r&&(r={lastEffect:null,events:null,stores:null,memoCache:null},xa.updateQueue=r),r.memoCache=t,void 0===(r=t.data[t.index]))for(r=t.data[t.index]=Array(e),n=0;n<e;n++)r[n]=T;return t.index++,r}function Ha(e,t){return"function"===typeof t?t(e):t}function Wa(e){return Va(Ma(),wa,e)}function Va(e,t,r){var n=e.queue;if(null===n)throw Error(i(311));n.lastRenderedReducer=r;var o=e.baseQueue,a=n.pending;if(null!==a){if(null!==o){var s=o.next;o.next=a.next,a.next=s}t.baseQueue=o=a,n.pending=null}if(a=e.baseState,null===o)e.memoizedState=a;else{var l=s=null,c=null,u=t=o.next,d=!1;do{var f=-536870913&u.lane;if(f!==u.lane?(ac&f)===f:(va&f)===f){var p=u.revertLane;if(0===p)null!==c&&(c=c.next={lane:0,revertLane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===$o&&(d=!0);else{if((va&p)===p){u=u.next,p===$o&&(d=!0);continue}f={lane:0,revertLane:u.revertLane,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},null===c?(l=c=f,s=a):c=c.next=f,xa.lanes|=p,pc|=p}f=u.action,_a&&r(a,f),a=u.hasEagerState?u.eagerState:r(a,f)}else p={lane:f,revertLane:u.revertLane,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},null===c?(l=c=p,s=a):c=c.next=p,xa.lanes|=f,pc|=f;u=u.next}while(null!==u&&u!==t);if(null===c?s=a:c.next=l,!Kr(a,e.memoizedState)&&(Cs=!0,d&&null!==(r=Fo)))throw r;e.memoizedState=a,e.baseState=s,e.baseQueue=c,n.lastRenderedState=a}return null===o&&(n.lanes=0),[e.memoizedState,n.dispatch]}function Ya(e){var t=Ma(),r=t.queue;if(null===r)throw Error(i(311));r.lastRenderedReducer=e;var n=r.dispatch,o=r.pending,a=t.memoizedState;if(null!==o){r.pending=null;var s=o=o.next;do{a=e(a,s.action),s=s.next}while(s!==o);Kr(a,t.memoizedState)||(Cs=!0),t.memoizedState=a,null===t.baseQueue&&(t.baseState=a),r.lastRenderedState=a}return[a,n]}function Ka(e,t,r){var n=xa,o=Ma(),a=ao;if(a){if(void 0===r)throw Error(i(407));r=r()}else r=t();var s=!Kr((wa||o).memoizedState,r);if(s&&(o.memoizedState=r,Cs=!0),o=o.queue,yi(2048,8,Ga.bind(null,n,o,e),[e]),o.getSnapshot!==t||s||null!==ka&&1&ka.memoizedState.tag){if(n.flags|=2048,hi(9,{destroy:void 0,resource:void 0},Xa.bind(null,n,o,r,t),null),null===nc)throw Error(i(349));a||0!==(124&va)||Qa(n,t,r)}return r}function Qa(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},null===(t=xa.updateQueue)?(t={lastEffect:null,events:null,stores:null,memoCache:null},xa.updateQueue=t,t.stores=[e]):null===(r=t.stores)?t.stores=[e]:r.push(e)}function Xa(e,t,r,n){t.value=r,t.getSnapshot=n,Ja(t)&&Za(e)}function Ga(e,t,r){return r(function(){Ja(t)&&Za(e)})}function Ja(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Kr(e,r)}catch(n){return!0}}function Za(e){var t=zn(e,2);null!==t&&Dc(t,e,2)}function ei(e){var t=Fa();if("function"===typeof e){var r=e;if(e=r(),_a){fe(!0);try{r()}finally{fe(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ha,lastRenderedState:e},t}function ti(e,t,r,n){return e.baseState=r,Va(e,wa,"function"===typeof n?n:Ha)}function ri(e,t,r,n,o){if(Ui(e))throw Error(i(485));if(null!==(e=t.action)){var a={payload:o,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(e){a.listeners.push(e)}};null!==A.T?r(!0):a.isTransition=!1,n(a),null===(r=t.pending)?(a.next=t.pending=a,ni(t,a)):(a.next=r.next,t.pending=r.next=a)}}function ni(e,t){var r=t.action,n=t.payload,o=e.state;if(t.isTransition){var a=A.T,i={};A.T=i;try{var s=r(o,n),l=A.S;null!==l&&l(i,s),oi(e,t,s)}catch(c){ii(e,t,c)}finally{A.T=a}}else try{oi(e,t,a=r(o,n))}catch(u){ii(e,t,u)}}function oi(e,t,r){null!==r&&"object"===typeof r&&"function"===typeof r.then?r.then(function(r){ai(e,t,r)},function(r){return ii(e,t,r)}):ai(e,t,r)}function ai(e,t,r){t.status="fulfilled",t.value=r,si(t),e.state=r,null!==(t=e.pending)&&((r=t.next)===t?e.pending=null:(r=r.next,t.next=r,ni(e,r)))}function ii(e,t,r){var n=e.pending;if(e.pending=null,null!==n){n=n.next;do{t.status="rejected",t.reason=r,si(t),t=t.next}while(t!==n)}e.action=null}function si(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function li(e,t){return t}function ci(e,t){if(ao){var r=nc.formState;if(null!==r){e:{var n=xa;if(ao){if(oo){t:{for(var o=oo,a=so;8!==o.nodeType;){if(!a){o=null;break t}if(null===(o=yd(o.nextSibling))){o=null;break t}}o="F!"===(a=o.data)||"F"===a?o:null}if(o){oo=yd(o.nextSibling),n="F!"===o.data;break e}}co(n)}n=!1}n&&(t=r[0])}}return(r=Fa()).memoizedState=r.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:li,lastRenderedState:t},r.queue=n,r=Fi.bind(null,xa,n),n.dispatch=r,n=ei(!1),a=Bi.bind(null,xa,!1,n.queue),o={state:t,dispatch:null,action:e,pending:null},(n=Fa()).queue=o,r=ri.bind(null,xa,o,a,r),o.dispatch=r,n.memoizedState=e,[t,r,!1]}function ui(e){return di(Ma(),wa,e)}function di(e,t,r){if(t=Va(e,t,li)[0],e=Wa(Ha)[0],"object"===typeof t&&null!==t&&"function"===typeof t.then)try{var n=Ba(t)}catch(i){if(i===Vo)throw Ko;throw i}else n=t;var o=(t=Ma()).queue,a=o.dispatch;return r!==t.memoizedState&&(xa.flags|=2048,hi(9,{destroy:void 0,resource:void 0},fi.bind(null,o,r),null)),[n,a,e]}function fi(e,t){e.action=t}function pi(e){var t=Ma(),r=wa;if(null!==r)return di(t,r,e);Ma(),t=t.memoizedState;var n=(r=Ma()).queue.dispatch;return r.memoizedState=e,[t,n,!1]}function hi(e,t,r,n){return e={tag:e,create:r,deps:n,inst:t,next:null},null===(t=xa.updateQueue)&&(t={lastEffect:null,events:null,stores:null,memoCache:null},xa.updateQueue=t),null===(r=t.lastEffect)?t.lastEffect=e.next=e:(n=r.next,r.next=e,e.next=n,t.lastEffect=e),e}function mi(){return Ma().memoizedState}function gi(e,t,r,n){var o=Fa();n=void 0===n?null:n,xa.flags|=e,o.memoizedState=hi(1|t,{destroy:void 0,resource:void 0},r,n)}function yi(e,t,r,n){var o=Ma();n=void 0===n?null:n;var a=o.memoizedState.inst;null!==wa&&null!==n&&za(n,wa.memoizedState.deps)?o.memoizedState=hi(t,a,r,n):(xa.flags|=e,o.memoizedState=hi(1|t,a,r,n))}function bi(e,t){gi(8390656,8,e,t)}function vi(e,t){yi(2048,8,e,t)}function xi(e,t){return yi(4,2,e,t)}function wi(e,t){return yi(4,4,e,t)}function ki(e,t){if("function"===typeof t){e=e();var r=t(e);return function(){"function"===typeof r?r():t(null)}}if(null!==t&&void 0!==t)return e=e(),t.current=e,function(){t.current=null}}function Si(e,t,r){r=null!==r&&void 0!==r?r.concat([e]):null,yi(4,4,ki.bind(null,t,e),r)}function ji(){}function _i(e,t){var r=Ma();t=void 0===t?null:t;var n=r.memoizedState;return null!==t&&za(t,n[1])?n[0]:(r.memoizedState=[e,t],e)}function Ei(e,t){var r=Ma();t=void 0===t?null:t;var n=r.memoizedState;if(null!==t&&za(t,n[1]))return n[0];if(n=e(),_a){fe(!0);try{e()}finally{fe(!1)}}return r.memoizedState=[n,t],n}function Ci(e,t,r){return void 0===r||0!==(1073741824&va)?e.memoizedState=t:(e.memoizedState=r,e=Lc(),xa.lanes|=e,pc|=e,r)}function Ti(e,t,r,n){return Kr(r,t)?r:null!==ha.current?(e=Ci(e,r,n),Kr(e,t)||(Cs=!0),e):0===(42&va)?(Cs=!0,e.memoizedState=r):(e=Lc(),xa.lanes|=e,pc|=e,t)}function Ri(e,t,r,n,o){var a=L.p;L.p=0!==a&&8>a?a:8;var i=A.T,s={};A.T=s,Bi(e,!1,t,r);try{var l=o(),c=A.S;if(null!==c&&c(s,l),null!==l&&"object"===typeof l&&"function"===typeof l.then)Mi(e,t,function(e,t){var r=[],n={status:"pending",value:null,reason:null,then:function(e){r.push(e)}};return e.then(function(){n.status="fulfilled",n.value=t;for(var e=0;e<r.length;e++)(0,r[e])(t)},function(e){for(n.status="rejected",n.reason=e,e=0;e<r.length;e++)(0,r[e])(void 0)}),n}(l,n),Ac());else Mi(e,t,n,Ac())}catch(u){Mi(e,t,{then:function(){},status:"rejected",reason:u},Ac())}finally{L.p=a,A.T=i}}function Pi(){}function zi(e,t,r,n){if(5!==e.tag)throw Error(i(476));var o=Ni(e).queue;Ri(e,o,t,D,null===r?Pi:function(){return Oi(e),r(n)})}function Ni(e){var t=e.memoizedState;if(null!==t)return t;var r={};return(t={memoizedState:D,baseState:D,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ha,lastRenderedState:D},next:null}).next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ha,lastRenderedState:r},next:null},e.memoizedState=t,null!==(e=e.alternate)&&(e.memoizedState=t),t}function Oi(e){Mi(e,Ni(e).next.queue,{},Ac())}function Ai(){return Co(Kd)}function Li(){return Ma().memoizedState}function Di(){return Ma().memoizedState}function Ii(e){for(var t=e.return;null!==t;){switch(t.tag){case 24:case 3:var r=Ac(),n=ia(t,e=aa(r),r);return null!==n&&(Dc(n,t,r),sa(n,t,r)),t={cache:Ao()},void(e.payload=t)}t=t.return}}function $i(e,t,r){var n=Ac();r={lane:n,revertLane:0,action:r,hasEagerState:!1,eagerState:null,next:null},Ui(e)?qi(t,r):null!==(r=Pn(e,t,r,n))&&(Dc(r,e,n),Hi(r,t,n))}function Fi(e,t,r){Mi(e,t,r,Ac())}function Mi(e,t,r,n){var o={lane:n,revertLane:0,action:r,hasEagerState:!1,eagerState:null,next:null};if(Ui(e))qi(t,o);else{var a=e.alternate;if(0===e.lanes&&(null===a||0===a.lanes)&&null!==(a=t.lastRenderedReducer))try{var i=t.lastRenderedState,s=a(i,r);if(o.hasEagerState=!0,o.eagerState=s,Kr(s,i))return Rn(e,t,o,0),null===nc&&Tn(),!1}catch(l){}if(null!==(r=Pn(e,t,o,n)))return Dc(r,e,n),Hi(r,t,n),!0}return!1}function Bi(e,t,r,n){if(n={lane:2,revertLane:Ru(),action:n,hasEagerState:!1,eagerState:null,next:null},Ui(e)){if(t)throw Error(i(479))}else null!==(t=Pn(e,r,n,2))&&Dc(t,e,2)}function Ui(e){var t=e.alternate;return e===xa||null!==t&&t===xa}function qi(e,t){ja=Sa=!0;var r=e.pending;null===r?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function Hi(e,t,r){if(0!==(4194048&r)){var n=t.lanes;r|=n&=e.pendingLanes,t.lanes=r,Ce(e,r)}}var Wi={readContext:Co,use:Ua,useCallback:Pa,useContext:Pa,useEffect:Pa,useImperativeHandle:Pa,useLayoutEffect:Pa,useInsertionEffect:Pa,useMemo:Pa,useReducer:Pa,useRef:Pa,useState:Pa,useDebugValue:Pa,useDeferredValue:Pa,useTransition:Pa,useSyncExternalStore:Pa,useId:Pa,useHostTransitionStatus:Pa,useFormState:Pa,useActionState:Pa,useOptimistic:Pa,useMemoCache:Pa,useCacheRefresh:Pa},Vi={readContext:Co,use:Ua,useCallback:function(e,t){return Fa().memoizedState=[e,void 0===t?null:t],e},useContext:Co,useEffect:bi,useImperativeHandle:function(e,t,r){r=null!==r&&void 0!==r?r.concat([e]):null,gi(4194308,4,ki.bind(null,t,e),r)},useLayoutEffect:function(e,t){return gi(4194308,4,e,t)},useInsertionEffect:function(e,t){gi(4,2,e,t)},useMemo:function(e,t){var r=Fa();t=void 0===t?null:t;var n=e();if(_a){fe(!0);try{e()}finally{fe(!1)}}return r.memoizedState=[n,t],n},useReducer:function(e,t,r){var n=Fa();if(void 0!==r){var o=r(t);if(_a){fe(!0);try{r(t)}finally{fe(!1)}}}else o=t;return n.memoizedState=n.baseState=o,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:o},n.queue=e,e=e.dispatch=$i.bind(null,xa,e),[n.memoizedState,e]},useRef:function(e){return e={current:e},Fa().memoizedState=e},useState:function(e){var t=(e=ei(e)).queue,r=Fi.bind(null,xa,t);return t.dispatch=r,[e.memoizedState,r]},useDebugValue:ji,useDeferredValue:function(e,t){return Ci(Fa(),e,t)},useTransition:function(){var e=ei(!1);return e=Ri.bind(null,xa,e.queue,!0,!1),Fa().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,r){var n=xa,o=Fa();if(ao){if(void 0===r)throw Error(i(407));r=r()}else{if(r=t(),null===nc)throw Error(i(349));0!==(124&ac)||Qa(n,t,r)}o.memoizedState=r;var a={value:r,getSnapshot:t};return o.queue=a,bi(Ga.bind(null,n,a,e),[e]),n.flags|=2048,hi(9,{destroy:void 0,resource:void 0},Xa.bind(null,n,a,r,t),null),r},useId:function(){var e=Fa(),t=nc.identifierPrefix;if(ao){var r=Jn;t="\xab"+t+"R"+(r=(Gn&~(1<<32-pe(Gn)-1)).toString(32)+r),0<(r=Ea++)&&(t+="H"+r.toString(32)),t+="\xbb"}else t="\xab"+t+"r"+(r=Ra++).toString(32)+"\xbb";return e.memoizedState=t},useHostTransitionStatus:Ai,useFormState:ci,useActionState:ci,useOptimistic:function(e){var t=Fa();t.memoizedState=t.baseState=e;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=r,t=Bi.bind(null,xa,!0,r),r.dispatch=t,[e,t]},useMemoCache:qa,useCacheRefresh:function(){return Fa().memoizedState=Ii.bind(null,xa)}},Yi={readContext:Co,use:Ua,useCallback:_i,useContext:Co,useEffect:vi,useImperativeHandle:Si,useInsertionEffect:xi,useLayoutEffect:wi,useMemo:Ei,useReducer:Wa,useRef:mi,useState:function(){return Wa(Ha)},useDebugValue:ji,useDeferredValue:function(e,t){return Ti(Ma(),wa.memoizedState,e,t)},useTransition:function(){var e=Wa(Ha)[0],t=Ma().memoizedState;return["boolean"===typeof e?e:Ba(e),t]},useSyncExternalStore:Ka,useId:Li,useHostTransitionStatus:Ai,useFormState:ui,useActionState:ui,useOptimistic:function(e,t){return ti(Ma(),0,e,t)},useMemoCache:qa,useCacheRefresh:Di},Ki={readContext:Co,use:Ua,useCallback:_i,useContext:Co,useEffect:vi,useImperativeHandle:Si,useInsertionEffect:xi,useLayoutEffect:wi,useMemo:Ei,useReducer:Ya,useRef:mi,useState:function(){return Ya(Ha)},useDebugValue:ji,useDeferredValue:function(e,t){var r=Ma();return null===wa?Ci(r,e,t):Ti(r,wa.memoizedState,e,t)},useTransition:function(){var e=Ya(Ha)[0],t=Ma().memoizedState;return["boolean"===typeof e?e:Ba(e),t]},useSyncExternalStore:Ka,useId:Li,useHostTransitionStatus:Ai,useFormState:pi,useActionState:pi,useOptimistic:function(e,t){var r=Ma();return null!==wa?ti(r,0,e,t):(r.baseState=e,[e,r.queue.dispatch])},useMemoCache:qa,useCacheRefresh:Di},Qi=null,Xi=0;function Gi(e){var t=Xi;return Xi+=1,null===Qi&&(Qi=[]),Jo(Qi,e,t)}function Ji(e,t){t=t.props.ref,e.ref=void 0!==t?t:null}function Zi(e,t){if(t.$$typeof===p)throw Error(i(525));throw e=Object.prototype.toString.call(t),Error(i(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function es(e){return(0,e._init)(e._payload)}function ts(e){function t(t,r){if(e){var n=t.deletions;null===n?(t.deletions=[r],t.flags|=16):n.push(r)}}function r(r,n){if(!e)return null;for(;null!==n;)t(r,n),n=n.sibling;return null}function n(e){for(var t=new Map;null!==e;)null!==e.key?t.set(e.key,e):t.set(e.index,e),e=e.sibling;return t}function o(e,t){return(e=$n(e,t)).index=0,e.sibling=null,e}function a(t,r,n){return t.index=n,e?null!==(n=t.alternate)?(n=n.index)<r?(t.flags|=67108866,r):n:(t.flags|=67108866,r):(t.flags|=1048576,r)}function s(t){return e&&null===t.alternate&&(t.flags|=67108866),t}function l(e,t,r,n){return null===t||6!==t.tag?((t=Un(r,e.mode,n)).return=e,t):((t=o(t,r)).return=e,t)}function c(e,t,r,n){var a=r.type;return a===g?d(e,t,r.props.children,n,r.key):null!==t&&(t.elementType===a||"object"===typeof a&&null!==a&&a.$$typeof===E&&es(a)===t.type)?(Ji(t=o(t,r.props),r),t.return=e,t):(Ji(t=Mn(r.type,r.key,r.props,null,e.mode,n),r),t.return=e,t)}function u(e,t,r,n){return null===t||4!==t.tag||t.stateNode.containerInfo!==r.containerInfo||t.stateNode.implementation!==r.implementation?((t=qn(r,e.mode,n)).return=e,t):((t=o(t,r.children||[])).return=e,t)}function d(e,t,r,n,a){return null===t||7!==t.tag?((t=Bn(r,e.mode,n,a)).return=e,t):((t=o(t,r)).return=e,t)}function f(e,t,r){if("string"===typeof t&&""!==t||"number"===typeof t||"bigint"===typeof t)return(t=Un(""+t,e.mode,r)).return=e,t;if("object"===typeof t&&null!==t){switch(t.$$typeof){case h:return Ji(r=Mn(t.type,t.key,t.props,null,e.mode,r),t),r.return=e,r;case m:return(t=qn(t,e.mode,r)).return=e,t;case E:return f(e,t=(0,t._init)(t._payload),r)}if(O(t)||P(t))return(t=Bn(t,e.mode,r,null)).return=e,t;if("function"===typeof t.then)return f(e,Gi(t),r);if(t.$$typeof===w)return f(e,To(e,t),r);Zi(e,t)}return null}function p(e,t,r,n){var o=null!==t?t.key:null;if("string"===typeof r&&""!==r||"number"===typeof r||"bigint"===typeof r)return null!==o?null:l(e,t,""+r,n);if("object"===typeof r&&null!==r){switch(r.$$typeof){case h:return r.key===o?c(e,t,r,n):null;case m:return r.key===o?u(e,t,r,n):null;case E:return p(e,t,r=(o=r._init)(r._payload),n)}if(O(r)||P(r))return null!==o?null:d(e,t,r,n,null);if("function"===typeof r.then)return p(e,t,Gi(r),n);if(r.$$typeof===w)return p(e,t,To(e,r),n);Zi(e,r)}return null}function y(e,t,r,n,o){if("string"===typeof n&&""!==n||"number"===typeof n||"bigint"===typeof n)return l(t,e=e.get(r)||null,""+n,o);if("object"===typeof n&&null!==n){switch(n.$$typeof){case h:return c(t,e=e.get(null===n.key?r:n.key)||null,n,o);case m:return u(t,e=e.get(null===n.key?r:n.key)||null,n,o);case E:return y(e,t,r,n=(0,n._init)(n._payload),o)}if(O(n)||P(n))return d(t,e=e.get(r)||null,n,o,null);if("function"===typeof n.then)return y(e,t,r,Gi(n),o);if(n.$$typeof===w)return y(e,t,r,To(t,n),o);Zi(t,n)}return null}function b(l,c,u,d){if("object"===typeof u&&null!==u&&u.type===g&&null===u.key&&(u=u.props.children),"object"===typeof u&&null!==u){switch(u.$$typeof){case h:e:{for(var v=u.key;null!==c;){if(c.key===v){if((v=u.type)===g){if(7===c.tag){r(l,c.sibling),(d=o(c,u.props.children)).return=l,l=d;break e}}else if(c.elementType===v||"object"===typeof v&&null!==v&&v.$$typeof===E&&es(v)===c.type){r(l,c.sibling),Ji(d=o(c,u.props),u),d.return=l,l=d;break e}r(l,c);break}t(l,c),c=c.sibling}u.type===g?((d=Bn(u.props.children,l.mode,d,u.key)).return=l,l=d):(Ji(d=Mn(u.type,u.key,u.props,null,l.mode,d),u),d.return=l,l=d)}return s(l);case m:e:{for(v=u.key;null!==c;){if(c.key===v){if(4===c.tag&&c.stateNode.containerInfo===u.containerInfo&&c.stateNode.implementation===u.implementation){r(l,c.sibling),(d=o(c,u.children||[])).return=l,l=d;break e}r(l,c);break}t(l,c),c=c.sibling}(d=qn(u,l.mode,d)).return=l,l=d}return s(l);case E:return b(l,c,u=(v=u._init)(u._payload),d)}if(O(u))return function(o,i,s,l){for(var c=null,u=null,d=i,h=i=0,m=null;null!==d&&h<s.length;h++){d.index>h?(m=d,d=null):m=d.sibling;var g=p(o,d,s[h],l);if(null===g){null===d&&(d=m);break}e&&d&&null===g.alternate&&t(o,d),i=a(g,i,h),null===u?c=g:u.sibling=g,u=g,d=m}if(h===s.length)return r(o,d),ao&&Zn(o,h),c;if(null===d){for(;h<s.length;h++)null!==(d=f(o,s[h],l))&&(i=a(d,i,h),null===u?c=d:u.sibling=d,u=d);return ao&&Zn(o,h),c}for(d=n(d);h<s.length;h++)null!==(m=y(d,o,h,s[h],l))&&(e&&null!==m.alternate&&d.delete(null===m.key?h:m.key),i=a(m,i,h),null===u?c=m:u.sibling=m,u=m);return e&&d.forEach(function(e){return t(o,e)}),ao&&Zn(o,h),c}(l,c,u,d);if(P(u)){if("function"!==typeof(v=P(u)))throw Error(i(150));return function(o,s,l,c){if(null==l)throw Error(i(151));for(var u=null,d=null,h=s,m=s=0,g=null,b=l.next();null!==h&&!b.done;m++,b=l.next()){h.index>m?(g=h,h=null):g=h.sibling;var v=p(o,h,b.value,c);if(null===v){null===h&&(h=g);break}e&&h&&null===v.alternate&&t(o,h),s=a(v,s,m),null===d?u=v:d.sibling=v,d=v,h=g}if(b.done)return r(o,h),ao&&Zn(o,m),u;if(null===h){for(;!b.done;m++,b=l.next())null!==(b=f(o,b.value,c))&&(s=a(b,s,m),null===d?u=b:d.sibling=b,d=b);return ao&&Zn(o,m),u}for(h=n(h);!b.done;m++,b=l.next())null!==(b=y(h,o,m,b.value,c))&&(e&&null!==b.alternate&&h.delete(null===b.key?m:b.key),s=a(b,s,m),null===d?u=b:d.sibling=b,d=b);return e&&h.forEach(function(e){return t(o,e)}),ao&&Zn(o,m),u}(l,c,u=v.call(u),d)}if("function"===typeof u.then)return b(l,c,Gi(u),d);if(u.$$typeof===w)return b(l,c,To(l,u),d);Zi(l,u)}return"string"===typeof u&&""!==u||"number"===typeof u||"bigint"===typeof u?(u=""+u,null!==c&&6===c.tag?(r(l,c.sibling),(d=o(c,u)).return=l,l=d):(r(l,c),(d=Un(u,l.mode,d)).return=l,l=d),s(l)):r(l,c)}return function(e,t,r,n){try{Xi=0;var o=b(e,t,r,n);return Qi=null,o}catch(i){if(i===Vo||i===Ko)throw i;var a=Dn(29,i,null,e.mode);return a.lanes=n,a.return=e,a}}}var rs=ts(!0),ns=ts(!1),os=F(null),as=null;function is(e){var t=e.alternate;B(us,1&us.current),B(os,e),null===as&&(null===t||null!==ha.current||null!==t.memoizedState)&&(as=e)}function ss(e){if(22===e.tag){if(B(us,us.current),B(os,e),null===as){var t=e.alternate;null!==t&&null!==t.memoizedState&&(as=e)}}else ls()}function ls(){B(us,us.current),B(os,os.current)}function cs(e){M(os),as===e&&(as=null),M(us)}var us=F(0);function ds(e){for(var t=e;null!==t;){if(13===t.tag){var r=t.memoizedState;if(null!==r&&(null===(r=r.dehydrated)||"$?"===r.data||gd(r)))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(0!==(128&t.flags))return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function fs(e,t,r,n){r=null===(r=r(n,t=e.memoizedState))||void 0===r?t:f({},t,r),e.memoizedState=r,0===e.lanes&&(e.updateQueue.baseState=r)}var ps={enqueueSetState:function(e,t,r){e=e._reactInternals;var n=Ac(),o=aa(n);o.payload=t,void 0!==r&&null!==r&&(o.callback=r),null!==(t=ia(e,o,n))&&(Dc(t,e,n),sa(t,e,n))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var n=Ac(),o=aa(n);o.tag=1,o.payload=t,void 0!==r&&null!==r&&(o.callback=r),null!==(t=ia(e,o,n))&&(Dc(t,e,n),sa(t,e,n))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=Ac(),n=aa(r);n.tag=2,void 0!==t&&null!==t&&(n.callback=t),null!==(t=ia(e,n,r))&&(Dc(t,e,r),sa(t,e,r))}};function hs(e,t,r,n,o,a,i){return"function"===typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(n,a,i):!t.prototype||!t.prototype.isPureReactComponent||(!Qr(r,n)||!Qr(o,a))}function ms(e,t,r,n){e=t.state,"function"===typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(r,n),"function"===typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(r,n),t.state!==e&&ps.enqueueReplaceState(t,t.state,null)}function gs(e,t){var r=t;if("ref"in t)for(var n in r={},t)"ref"!==n&&(r[n]=t[n]);if(e=e.defaultProps)for(var o in r===t&&(r=f({},r)),e)void 0===r[o]&&(r[o]=e[o]);return r}var ys="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)};function bs(e){ys(e)}function vs(e){console.error(e)}function xs(e){ys(e)}function ws(e,t){try{(0,e.onUncaughtError)(t.value,{componentStack:t.stack})}catch(r){setTimeout(function(){throw r})}}function ks(e,t,r){try{(0,e.onCaughtError)(r.value,{componentStack:r.stack,errorBoundary:1===t.tag?t.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function Ss(e,t,r){return(r=aa(r)).tag=3,r.payload={element:null},r.callback=function(){ws(e,t)},r}function js(e){return(e=aa(e)).tag=3,e}function _s(e,t,r,n){var o=r.type.getDerivedStateFromError;if("function"===typeof o){var a=n.value;e.payload=function(){return o(a)},e.callback=function(){ks(t,r,n)}}var i=r.stateNode;null!==i&&"function"===typeof i.componentDidCatch&&(e.callback=function(){ks(t,r,n),"function"!==typeof o&&(null===jc?jc=new Set([this]):jc.add(this));var e=n.stack;this.componentDidCatch(n.value,{componentStack:null!==e?e:""})})}var Es=Error(i(461)),Cs=!1;function Ts(e,t,r,n){t.child=null===e?ns(t,null,r,n):rs(t,e.child,r,n)}function Rs(e,t,r,n,o){r=r.render;var a=t.ref;if("ref"in n){var i={};for(var s in n)"ref"!==s&&(i[s]=n[s])}else i=n;return Eo(t),n=Na(e,t,r,i,a,o),s=Da(),null===e||Cs?(ao&&s&&to(t),t.flags|=1,Ts(e,t,n,o),t.child):(Ia(e,t,o),Qs(e,t,o))}function Ps(e,t,r,n,o){if(null===e){var a=r.type;return"function"!==typeof a||In(a)||void 0!==a.defaultProps||null!==r.compare?((e=Mn(r.type,null,n,t,t.mode,o)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=a,zs(e,t,a,n,o))}if(a=e.child,!Xs(e,o)){var i=a.memoizedProps;if((r=null!==(r=r.compare)?r:Qr)(i,n)&&e.ref===t.ref)return Qs(e,t,o)}return t.flags|=1,(e=$n(a,n)).ref=t.ref,e.return=t,t.child=e}function zs(e,t,r,n,o){if(null!==e){var a=e.memoizedProps;if(Qr(a,n)&&e.ref===t.ref){if(Cs=!1,t.pendingProps=n=a,!Xs(e,o))return t.lanes=e.lanes,Qs(e,t,o);0!==(131072&e.flags)&&(Cs=!0)}}return Ls(e,t,r,n,o)}function Ns(e,t,r){var n=t.pendingProps,o=n.children,a=null!==e?e.memoizedState:null;if("hidden"===n.mode){if(0!==(128&t.flags)){if(n=null!==a?a.baseLanes|r:r,null!==e){for(o=t.child=e.child,a=0;null!==o;)a=a|o.lanes|o.childLanes,o=o.sibling;t.childLanes=a&~n}else t.childLanes=0,t.child=null;return Os(e,t,n,r)}if(0===(536870912&r))return t.lanes=t.childLanes=536870912,Os(e,t,null!==a?a.baseLanes|r:r,r);t.memoizedState={baseLanes:0,cachePool:null},null!==e&&Ho(0,null!==a?a.cachePool:null),null!==a?ga(t,a):ya(),ss(t)}else null!==a?(Ho(0,a.cachePool),ga(t,a),ls(),t.memoizedState=null):(null!==e&&Ho(0,null),ya(),ls());return Ts(e,t,o,r),t.child}function Os(e,t,r,n){var o=qo();return o=null===o?null:{parent:Oo._currentValue,pool:o},t.memoizedState={baseLanes:r,cachePool:o},null!==e&&Ho(0,null),ya(),ss(t),null!==e&&jo(e,t,n,!0),null}function As(e,t){var r=t.ref;if(null===r)null!==e&&null!==e.ref&&(t.flags|=4194816);else{if("function"!==typeof r&&"object"!==typeof r)throw Error(i(284));null!==e&&e.ref===r||(t.flags|=4194816)}}function Ls(e,t,r,n,o){return Eo(t),r=Na(e,t,r,n,void 0,o),n=Da(),null===e||Cs?(ao&&n&&to(t),t.flags|=1,Ts(e,t,r,o),t.child):(Ia(e,t,o),Qs(e,t,o))}function Ds(e,t,r,n,o,a){return Eo(t),t.updateQueue=null,r=Aa(t,n,r,o),Oa(e),n=Da(),null===e||Cs?(ao&&n&&to(t),t.flags|=1,Ts(e,t,r,a),t.child):(Ia(e,t,a),Qs(e,t,a))}function Is(e,t,r,n,o){if(Eo(t),null===t.stateNode){var a=An,i=r.contextType;"object"===typeof i&&null!==i&&(a=Co(i)),a=new r(n,a),t.memoizedState=null!==a.state&&void 0!==a.state?a.state:null,a.updater=ps,t.stateNode=a,a._reactInternals=t,(a=t.stateNode).props=n,a.state=t.memoizedState,a.refs={},na(t),i=r.contextType,a.context="object"===typeof i&&null!==i?Co(i):An,a.state=t.memoizedState,"function"===typeof(i=r.getDerivedStateFromProps)&&(fs(t,r,i,n),a.state=t.memoizedState),"function"===typeof r.getDerivedStateFromProps||"function"===typeof a.getSnapshotBeforeUpdate||"function"!==typeof a.UNSAFE_componentWillMount&&"function"!==typeof a.componentWillMount||(i=a.state,"function"===typeof a.componentWillMount&&a.componentWillMount(),"function"===typeof a.UNSAFE_componentWillMount&&a.UNSAFE_componentWillMount(),i!==a.state&&ps.enqueueReplaceState(a,a.state,null),da(t,n,a,o),ua(),a.state=t.memoizedState),"function"===typeof a.componentDidMount&&(t.flags|=4194308),n=!0}else if(null===e){a=t.stateNode;var s=t.memoizedProps,l=gs(r,s);a.props=l;var c=a.context,u=r.contextType;i=An,"object"===typeof u&&null!==u&&(i=Co(u));var d=r.getDerivedStateFromProps;u="function"===typeof d||"function"===typeof a.getSnapshotBeforeUpdate,s=t.pendingProps!==s,u||"function"!==typeof a.UNSAFE_componentWillReceiveProps&&"function"!==typeof a.componentWillReceiveProps||(s||c!==i)&&ms(t,a,n,i),ra=!1;var f=t.memoizedState;a.state=f,da(t,n,a,o),ua(),c=t.memoizedState,s||f!==c||ra?("function"===typeof d&&(fs(t,r,d,n),c=t.memoizedState),(l=ra||hs(t,r,l,n,f,c,i))?(u||"function"!==typeof a.UNSAFE_componentWillMount&&"function"!==typeof a.componentWillMount||("function"===typeof a.componentWillMount&&a.componentWillMount(),"function"===typeof a.UNSAFE_componentWillMount&&a.UNSAFE_componentWillMount()),"function"===typeof a.componentDidMount&&(t.flags|=4194308)):("function"===typeof a.componentDidMount&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=c),a.props=n,a.state=c,a.context=i,n=l):("function"===typeof a.componentDidMount&&(t.flags|=4194308),n=!1)}else{a=t.stateNode,oa(e,t),u=gs(r,i=t.memoizedProps),a.props=u,d=t.pendingProps,f=a.context,c=r.contextType,l=An,"object"===typeof c&&null!==c&&(l=Co(c)),(c="function"===typeof(s=r.getDerivedStateFromProps)||"function"===typeof a.getSnapshotBeforeUpdate)||"function"!==typeof a.UNSAFE_componentWillReceiveProps&&"function"!==typeof a.componentWillReceiveProps||(i!==d||f!==l)&&ms(t,a,n,l),ra=!1,f=t.memoizedState,a.state=f,da(t,n,a,o),ua();var p=t.memoizedState;i!==d||f!==p||ra||null!==e&&null!==e.dependencies&&_o(e.dependencies)?("function"===typeof s&&(fs(t,r,s,n),p=t.memoizedState),(u=ra||hs(t,r,u,n,f,p,l)||null!==e&&null!==e.dependencies&&_o(e.dependencies))?(c||"function"!==typeof a.UNSAFE_componentWillUpdate&&"function"!==typeof a.componentWillUpdate||("function"===typeof a.componentWillUpdate&&a.componentWillUpdate(n,p,l),"function"===typeof a.UNSAFE_componentWillUpdate&&a.UNSAFE_componentWillUpdate(n,p,l)),"function"===typeof a.componentDidUpdate&&(t.flags|=4),"function"===typeof a.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!==typeof a.componentDidUpdate||i===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),"function"!==typeof a.getSnapshotBeforeUpdate||i===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=p),a.props=n,a.state=p,a.context=l,n=u):("function"!==typeof a.componentDidUpdate||i===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),"function"!==typeof a.getSnapshotBeforeUpdate||i===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),n=!1)}return a=n,As(e,t),n=0!==(128&t.flags),a||n?(a=t.stateNode,r=n&&"function"!==typeof r.getDerivedStateFromError?null:a.render(),t.flags|=1,null!==e&&n?(t.child=rs(t,e.child,null,o),t.child=rs(t,null,r,o)):Ts(e,t,r,o),t.memoizedState=a.state,e=t.child):e=Qs(e,t,o),e}function $s(e,t,r,n){return ho(),t.flags|=256,Ts(e,t,r,n),t.child}var Fs={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Ms(e){return{baseLanes:e,cachePool:Wo()}}function Bs(e,t,r){return e=null!==e?e.childLanes&~r:0,t&&(e|=gc),e}function Us(e,t,r){var n,o=t.pendingProps,a=!1,s=0!==(128&t.flags);if((n=s)||(n=(null===e||null!==e.memoizedState)&&0!==(2&us.current)),n&&(a=!0,t.flags&=-129),n=0!==(32&t.flags),t.flags&=-33,null===e){if(ao){if(a?is(t):ls(),ao){var l,c=oo;if(l=c){e:{for(l=c,c=so;8!==l.nodeType;){if(!c){c=null;break e}if(null===(l=yd(l.nextSibling))){c=null;break e}}c=l}null!==c?(t.memoizedState={dehydrated:c,treeContext:null!==Xn?{id:Gn,overflow:Jn}:null,retryLane:536870912,hydrationErrors:null},(l=Dn(18,null,null,0)).stateNode=c,l.return=t,t.child=l,no=t,oo=null,l=!0):l=!1}l||co(t)}if(null!==(c=t.memoizedState)&&null!==(c=c.dehydrated))return gd(c)?t.lanes=32:t.lanes=536870912,null;cs(t)}return c=o.children,o=o.fallback,a?(ls(),c=Hs({mode:"hidden",children:c},a=t.mode),o=Bn(o,a,r,null),c.return=t,o.return=t,c.sibling=o,t.child=c,(a=t.child).memoizedState=Ms(r),a.childLanes=Bs(e,n,r),t.memoizedState=Fs,o):(is(t),qs(t,c))}if(null!==(l=e.memoizedState)&&null!==(c=l.dehydrated)){if(s)256&t.flags?(is(t),t.flags&=-257,t=Ws(e,t,r)):null!==t.memoizedState?(ls(),t.child=e.child,t.flags|=128,t=null):(ls(),a=o.fallback,c=t.mode,o=Hs({mode:"visible",children:o.children},c),(a=Bn(a,c,r,null)).flags|=2,o.return=t,a.return=t,o.sibling=a,t.child=o,rs(t,e.child,null,r),(o=t.child).memoizedState=Ms(r),o.childLanes=Bs(e,n,r),t.memoizedState=Fs,t=a);else if(is(t),gd(c)){if(n=c.nextSibling&&c.nextSibling.dataset)var u=n.dgst;n=u,(o=Error(i(419))).stack="",o.digest=n,go({value:o,source:null,stack:null}),t=Ws(e,t,r)}else if(Cs||jo(e,t,r,!1),n=0!==(r&e.childLanes),Cs||n){if(null!==(n=nc)&&(0!==(o=0!==((o=0!==(42&(o=r&-r))?1:Te(o))&(n.suspendedLanes|r))?0:o)&&o!==l.retryLane))throw l.retryLane=o,zn(e,o),Dc(n,e,o),Es;"$?"===c.data||Yc(),t=Ws(e,t,r)}else"$?"===c.data?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,oo=yd(c.nextSibling),no=t,ao=!0,io=null,so=!1,null!==e&&(Kn[Qn++]=Gn,Kn[Qn++]=Jn,Kn[Qn++]=Xn,Gn=e.id,Jn=e.overflow,Xn=t),(t=qs(t,o.children)).flags|=4096);return t}return a?(ls(),a=o.fallback,c=t.mode,u=(l=e.child).sibling,(o=$n(l,{mode:"hidden",children:o.children})).subtreeFlags=65011712&l.subtreeFlags,null!==u?a=$n(u,a):(a=Bn(a,c,r,null)).flags|=2,a.return=t,o.return=t,o.sibling=a,t.child=o,o=a,a=t.child,null===(c=e.child.memoizedState)?c=Ms(r):(null!==(l=c.cachePool)?(u=Oo._currentValue,l=l.parent!==u?{parent:u,pool:u}:l):l=Wo(),c={baseLanes:c.baseLanes|r,cachePool:l}),a.memoizedState=c,a.childLanes=Bs(e,n,r),t.memoizedState=Fs,o):(is(t),e=(r=e.child).sibling,(r=$n(r,{mode:"visible",children:o.children})).return=t,r.sibling=null,null!==e&&(null===(n=t.deletions)?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r)}function qs(e,t){return(t=Hs({mode:"visible",children:t},e.mode)).return=e,e.child=t}function Hs(e,t){return(e=Dn(22,e,null,t)).lanes=0,e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},e}function Ws(e,t,r){return rs(t,e.child,null,r),(e=qs(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function Vs(e,t,r){e.lanes|=t;var n=e.alternate;null!==n&&(n.lanes|=t),ko(e.return,t,r)}function Ys(e,t,r,n,o){var a=e.memoizedState;null===a?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:r,tailMode:o}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=n,a.tail=r,a.tailMode=o)}function Ks(e,t,r){var n=t.pendingProps,o=n.revealOrder,a=n.tail;if(Ts(e,t,n.children,r),0!==(2&(n=us.current)))n=1&n|2,t.flags|=128;else{if(null!==e&&0!==(128&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&Vs(e,r,t);else if(19===e.tag)Vs(e,r,t);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}n&=1}switch(B(us,n),o){case"forwards":for(r=t.child,o=null;null!==r;)null!==(e=r.alternate)&&null===ds(e)&&(o=r),r=r.sibling;null===(r=o)?(o=t.child,t.child=null):(o=r.sibling,r.sibling=null),Ys(t,!1,o,r,a);break;case"backwards":for(r=null,o=t.child,t.child=null;null!==o;){if(null!==(e=o.alternate)&&null===ds(e)){t.child=o;break}e=o.sibling,o.sibling=r,r=o,o=e}Ys(t,!0,r,null,a);break;case"together":Ys(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Qs(e,t,r){if(null!==e&&(t.dependencies=e.dependencies),pc|=t.lanes,0===(r&t.childLanes)){if(null===e)return null;if(jo(e,t,r,!1),0===(r&t.childLanes))return null}if(null!==e&&t.child!==e.child)throw Error(i(153));if(null!==t.child){for(r=$n(e=t.child,e.pendingProps),t.child=r,r.return=t;null!==e.sibling;)e=e.sibling,(r=r.sibling=$n(e,e.pendingProps)).return=t;r.sibling=null}return t.child}function Xs(e,t){return 0!==(e.lanes&t)||!(null===(e=e.dependencies)||!_o(e))}function Gs(e,t,r){if(null!==e)if(e.memoizedProps!==t.pendingProps)Cs=!0;else{if(!Xs(e,r)&&0===(128&t.flags))return Cs=!1,function(e,t,r){switch(t.tag){case 3:V(t,t.stateNode.containerInfo),xo(0,Oo,e.memoizedState.cache),ho();break;case 27:case 5:K(t);break;case 4:V(t,t.stateNode.containerInfo);break;case 10:xo(0,t.type,t.memoizedProps.value);break;case 13:var n=t.memoizedState;if(null!==n)return null!==n.dehydrated?(is(t),t.flags|=128,null):0!==(r&t.child.childLanes)?Us(e,t,r):(is(t),null!==(e=Qs(e,t,r))?e.sibling:null);is(t);break;case 19:var o=0!==(128&e.flags);if((n=0!==(r&t.childLanes))||(jo(e,t,r,!1),n=0!==(r&t.childLanes)),o){if(n)return Ks(e,t,r);t.flags|=128}if(null!==(o=t.memoizedState)&&(o.rendering=null,o.tail=null,o.lastEffect=null),B(us,us.current),n)break;return null;case 22:case 23:return t.lanes=0,Ns(e,t,r);case 24:xo(0,Oo,e.memoizedState.cache)}return Qs(e,t,r)}(e,t,r);Cs=0!==(131072&e.flags)}else Cs=!1,ao&&0!==(1048576&t.flags)&&eo(t,Yn,t.index);switch(t.lanes=0,t.tag){case 16:e:{e=t.pendingProps;var n=t.elementType,o=n._init;if(n=o(n._payload),t.type=n,"function"!==typeof n){if(void 0!==n&&null!==n){if((o=n.$$typeof)===k){t.tag=11,t=Rs(null,t,n,e,r);break e}if(o===_){t.tag=14,t=Ps(null,t,n,e,r);break e}}throw t=N(n)||n,Error(i(306,t,""))}In(n)?(e=gs(n,e),t.tag=1,t=Is(null,t,n,e,r)):(t.tag=0,t=Ls(null,t,n,e,r))}return t;case 0:return Ls(e,t,t.type,t.pendingProps,r);case 1:return Is(e,t,n=t.type,o=gs(n,t.pendingProps),r);case 3:e:{if(V(t,t.stateNode.containerInfo),null===e)throw Error(i(387));n=t.pendingProps;var a=t.memoizedState;o=a.element,oa(e,t),da(t,n,null,r);var s=t.memoizedState;if(n=s.cache,xo(0,Oo,n),n!==a.cache&&So(t,[Oo],r,!0),ua(),n=s.element,a.isDehydrated){if(a={element:n,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=a,t.memoizedState=a,256&t.flags){t=$s(e,t,n,r);break e}if(n!==o){go(o=jn(Error(i(424)),t)),t=$s(e,t,n,r);break e}if(9===(e=t.stateNode.containerInfo).nodeType)e=e.body;else e="HTML"===e.nodeName?e.ownerDocument.body:e;for(oo=yd(e.firstChild),no=t,ao=!0,io=null,so=!0,r=ns(t,null,n,r),t.child=r;r;)r.flags=-3&r.flags|4096,r=r.sibling}else{if(ho(),n===o){t=Qs(e,t,r);break e}Ts(e,t,n,r)}t=t.child}return t;case 26:return As(e,t),null===e?(r=Td(t.type,null,t.pendingProps,null))?t.memoizedState=r:ao||(r=t.type,e=t.pendingProps,(n=nd(H.current).createElement(r))[Ne]=t,n[Oe]=e,ed(n,r,e),We(n),t.stateNode=n):t.memoizedState=Td(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return K(t),null===e&&ao&&(n=t.stateNode=xd(t.type,t.pendingProps,H.current),no=t,so=!0,o=oo,pd(t.type)?(bd=o,oo=yd(n.firstChild)):oo=o),Ts(e,t,t.pendingProps.children,r),As(e,t),null===e&&(t.flags|=4194304),t.child;case 5:return null===e&&ao&&((o=n=oo)&&(null!==(n=function(e,t,r,n){for(;1===e.nodeType;){var o=r;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!n&&("INPUT"!==e.nodeName||"hidden"!==e.type))break}else if(n){if(!e[Fe])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if("stylesheet"===(a=e.getAttribute("rel"))&&e.hasAttribute("data-precedence"))break;if(a!==o.rel||e.getAttribute("href")!==(null==o.href||""===o.href?null:o.href)||e.getAttribute("crossorigin")!==(null==o.crossOrigin?null:o.crossOrigin)||e.getAttribute("title")!==(null==o.title?null:o.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(((a=e.getAttribute("src"))!==(null==o.src?null:o.src)||e.getAttribute("type")!==(null==o.type?null:o.type)||e.getAttribute("crossorigin")!==(null==o.crossOrigin?null:o.crossOrigin))&&a&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else{if("input"!==t||"hidden"!==e.type)return e;var a=null==o.name?null:""+o.name;if("hidden"===o.type&&e.getAttribute("name")===a)return e}if(null===(e=yd(e.nextSibling)))break}return null}(n,t.type,t.pendingProps,so))?(t.stateNode=n,no=t,oo=yd(n.firstChild),so=!1,o=!0):o=!1),o||co(t)),K(t),o=t.type,a=t.pendingProps,s=null!==e?e.memoizedProps:null,n=a.children,id(o,a)?n=null:null!==s&&id(o,s)&&(t.flags|=32),null!==t.memoizedState&&(o=Na(e,t,La,null,null,r),Kd._currentValue=o),As(e,t),Ts(e,t,n,r),t.child;case 6:return null===e&&ao&&((e=r=oo)&&(null!==(r=function(e,t,r){if(""===t)return null;for(;3!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!r)return null;if(null===(e=yd(e.nextSibling)))return null}return e}(r,t.pendingProps,so))?(t.stateNode=r,no=t,oo=null,e=!0):e=!1),e||co(t)),null;case 13:return Us(e,t,r);case 4:return V(t,t.stateNode.containerInfo),n=t.pendingProps,null===e?t.child=rs(t,null,n,r):Ts(e,t,n,r),t.child;case 11:return Rs(e,t,t.type,t.pendingProps,r);case 7:return Ts(e,t,t.pendingProps,r),t.child;case 8:case 12:return Ts(e,t,t.pendingProps.children,r),t.child;case 10:return n=t.pendingProps,xo(0,t.type,n.value),Ts(e,t,n.children,r),t.child;case 9:return o=t.type._context,n=t.pendingProps.children,Eo(t),n=n(o=Co(o)),t.flags|=1,Ts(e,t,n,r),t.child;case 14:return Ps(e,t,t.type,t.pendingProps,r);case 15:return zs(e,t,t.type,t.pendingProps,r);case 19:return Ks(e,t,r);case 31:return n=t.pendingProps,r=t.mode,n={mode:n.mode,children:n.children},null===e?((r=Hs(n,r)).ref=t.ref,t.child=r,r.return=t,t=r):((r=$n(e.child,n)).ref=t.ref,t.child=r,r.return=t,t=r),t;case 22:return Ns(e,t,r);case 24:return Eo(t),n=Co(Oo),null===e?(null===(o=qo())&&(o=nc,a=Ao(),o.pooledCache=a,a.refCount++,null!==a&&(o.pooledCacheLanes|=r),o=a),t.memoizedState={parent:n,cache:o},na(t),xo(0,Oo,o)):(0!==(e.lanes&r)&&(oa(e,t),da(t,null,null,r),ua()),o=e.memoizedState,a=t.memoizedState,o.parent!==n?(o={parent:n,cache:n},t.memoizedState=o,0===t.lanes&&(t.memoizedState=t.updateQueue.baseState=o),xo(0,Oo,n)):(n=a.cache,xo(0,Oo,n),n!==o.cache&&So(t,[Oo],r,!0))),Ts(e,t,t.pendingProps.children,r),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Js(e){e.flags|=4}function Zs(e,t){if("stylesheet"!==t.type||0!==(4&t.state.loading))e.flags&=-16777217;else if(e.flags|=16777216,!Bd(t)){if(null!==(t=os.current)&&((4194048&ac)===ac?null!==as:(62914560&ac)!==ac&&0===(536870912&ac)||t!==as))throw Zo=Qo,Yo;e.flags|=8192}}function el(e,t){null!==t&&(e.flags|=4),16384&e.flags&&(t=22!==e.tag?Se():536870912,e.lanes|=t,yc|=t)}function tl(e,t){if(!ao)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;null!==t;)null!==t.alternate&&(r=t),t=t.sibling;null===r?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var n=null;null!==r;)null!==r.alternate&&(n=r),r=r.sibling;null===n?t||null===e.tail?e.tail=null:e.tail.sibling=null:n.sibling=null}}function rl(e){var t=null!==e.alternate&&e.alternate.child===e.child,r=0,n=0;if(t)for(var o=e.child;null!==o;)r|=o.lanes|o.childLanes,n|=65011712&o.subtreeFlags,n|=65011712&o.flags,o.return=e,o=o.sibling;else for(o=e.child;null!==o;)r|=o.lanes|o.childLanes,n|=o.subtreeFlags,n|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=n,e.childLanes=r,t}function nl(e,t,r){var n=t.pendingProps;switch(ro(t),t.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:case 1:return rl(t),null;case 3:return r=t.stateNode,n=null,null!==e&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),wo(Oo),Y(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==e&&null!==e.child||(po(t)?Js(t):null===e||e.memoizedState.isDehydrated&&0===(256&t.flags)||(t.flags|=1024,mo())),rl(t),null;case 26:return r=t.memoizedState,null===e?(Js(t),null!==r?(rl(t),Zs(t,r)):(rl(t),t.flags&=-16777217)):r?r!==e.memoizedState?(Js(t),rl(t),Zs(t,r)):(rl(t),t.flags&=-16777217):(e.memoizedProps!==n&&Js(t),rl(t),t.flags&=-16777217),null;case 27:Q(t),r=H.current;var o=t.type;if(null!==e&&null!=t.stateNode)e.memoizedProps!==n&&Js(t);else{if(!n){if(null===t.stateNode)throw Error(i(166));return rl(t),null}e=U.current,po(t)?uo(t):(e=xd(o,n,r),t.stateNode=e,Js(t))}return rl(t),null;case 5:if(Q(t),r=t.type,null!==e&&null!=t.stateNode)e.memoizedProps!==n&&Js(t);else{if(!n){if(null===t.stateNode)throw Error(i(166));return rl(t),null}if(e=U.current,po(t))uo(t);else{switch(o=nd(H.current),e){case 1:e=o.createElementNS("http://www.w3.org/2000/svg",r);break;case 2:e=o.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;default:switch(r){case"svg":e=o.createElementNS("http://www.w3.org/2000/svg",r);break;case"math":e=o.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;case"script":(e=o.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e="string"===typeof n.is?o.createElement("select",{is:n.is}):o.createElement("select"),n.multiple?e.multiple=!0:n.size&&(e.size=n.size);break;default:e="string"===typeof n.is?o.createElement(r,{is:n.is}):o.createElement(r)}}e[Ne]=t,e[Oe]=n;e:for(o=t.child;null!==o;){if(5===o.tag||6===o.tag)e.appendChild(o.stateNode);else if(4!==o.tag&&27!==o.tag&&null!==o.child){o.child.return=o,o=o.child;continue}if(o===t)break e;for(;null===o.sibling;){if(null===o.return||o.return===t)break e;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=e;e:switch(ed(e,r,n),r){case"button":case"input":case"select":case"textarea":e=!!n.autoFocus;break e;case"img":e=!0;break e;default:e=!1}e&&Js(t)}}return rl(t),t.flags&=-16777217,null;case 6:if(e&&null!=t.stateNode)e.memoizedProps!==n&&Js(t);else{if("string"!==typeof n&&null===t.stateNode)throw Error(i(166));if(e=H.current,po(t)){if(e=t.stateNode,r=t.memoizedProps,n=null,null!==(o=no))switch(o.tag){case 27:case 5:n=o.memoizedProps}e[Ne]=t,(e=!!(e.nodeValue===r||null!==n&&!0===n.suppressHydrationWarning||Xu(e.nodeValue,r)))||co(t)}else(e=nd(e).createTextNode(n))[Ne]=t,t.stateNode=e}return rl(t),null;case 13:if(n=t.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(o=po(t),null!==n&&null!==n.dehydrated){if(null===e){if(!o)throw Error(i(318));if(!(o=null!==(o=t.memoizedState)?o.dehydrated:null))throw Error(i(317));o[Ne]=t}else ho(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;rl(t),o=!1}else o=mo(),null!==e&&null!==e.memoizedState&&(e.memoizedState.hydrationErrors=o),o=!0;if(!o)return 256&t.flags?(cs(t),t):(cs(t),null)}if(cs(t),0!==(128&t.flags))return t.lanes=r,t;if(r=null!==n,e=null!==e&&null!==e.memoizedState,r){o=null,null!==(n=t.child).alternate&&null!==n.alternate.memoizedState&&null!==n.alternate.memoizedState.cachePool&&(o=n.alternate.memoizedState.cachePool.pool);var a=null;null!==n.memoizedState&&null!==n.memoizedState.cachePool&&(a=n.memoizedState.cachePool.pool),a!==o&&(n.flags|=2048)}return r!==e&&r&&(t.child.flags|=8192),el(t,t.updateQueue),rl(t),null;case 4:return Y(),null===e&&Mu(t.stateNode.containerInfo),rl(t),null;case 10:return wo(t.type),rl(t),null;case 19:if(M(us),null===(o=t.memoizedState))return rl(t),null;if(n=0!==(128&t.flags),null===(a=o.rendering))if(n)tl(o,!1);else{if(0!==fc||null!==e&&0!==(128&e.flags))for(e=t.child;null!==e;){if(null!==(a=ds(e))){for(t.flags|=128,tl(o,!1),e=a.updateQueue,t.updateQueue=e,el(t,e),t.subtreeFlags=0,e=r,r=t.child;null!==r;)Fn(r,e),r=r.sibling;return B(us,1&us.current|2),t.child}e=e.sibling}null!==o.tail&&te()>kc&&(t.flags|=128,n=!0,tl(o,!1),t.lanes=4194304)}else{if(!n)if(null!==(e=ds(a))){if(t.flags|=128,n=!0,e=e.updateQueue,t.updateQueue=e,el(t,e),tl(o,!0),null===o.tail&&"hidden"===o.tailMode&&!a.alternate&&!ao)return rl(t),null}else 2*te()-o.renderingStartTime>kc&&536870912!==r&&(t.flags|=128,n=!0,tl(o,!1),t.lanes=4194304);o.isBackwards?(a.sibling=t.child,t.child=a):(null!==(e=o.last)?e.sibling=a:t.child=a,o.last=a)}return null!==o.tail?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=te(),t.sibling=null,e=us.current,B(us,n?1&e|2:1&e),t):(rl(t),null);case 22:case 23:return cs(t),ba(),n=null!==t.memoizedState,null!==e?null!==e.memoizedState!==n&&(t.flags|=8192):n&&(t.flags|=8192),n?0!==(536870912&r)&&0===(128&t.flags)&&(rl(t),6&t.subtreeFlags&&(t.flags|=8192)):rl(t),null!==(r=t.updateQueue)&&el(t,r.retryQueue),r=null,null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(r=e.memoizedState.cachePool.pool),n=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(n=t.memoizedState.cachePool.pool),n!==r&&(t.flags|=2048),null!==e&&M(Uo),null;case 24:return r=null,null!==e&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),wo(Oo),rl(t),null;case 25:case 30:return null}throw Error(i(156,t.tag))}function ol(e,t){switch(ro(t),t.tag){case 1:return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 3:return wo(Oo),Y(),0!==(65536&(e=t.flags))&&0===(128&e)?(t.flags=-65537&e|128,t):null;case 26:case 27:case 5:return Q(t),null;case 13:if(cs(t),null!==(e=t.memoizedState)&&null!==e.dehydrated){if(null===t.alternate)throw Error(i(340));ho()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 19:return M(us),null;case 4:return Y(),null;case 10:return wo(t.type),null;case 22:case 23:return cs(t),ba(),null!==e&&M(Uo),65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 24:return wo(Oo),null;default:return null}}function al(e,t){switch(ro(t),t.tag){case 3:wo(Oo),Y();break;case 26:case 27:case 5:Q(t);break;case 4:Y();break;case 13:cs(t);break;case 19:M(us);break;case 10:wo(t.type);break;case 22:case 23:cs(t),ba(),null!==e&&M(Uo);break;case 24:wo(Oo)}}function il(e,t){try{var r=t.updateQueue,n=null!==r?r.lastEffect:null;if(null!==n){var o=n.next;r=o;do{if((r.tag&e)===e){n=void 0;var a=r.create,i=r.inst;n=a(),i.destroy=n}r=r.next}while(r!==o)}}catch(s){uu(t,t.return,s)}}function sl(e,t,r){try{var n=t.updateQueue,o=null!==n?n.lastEffect:null;if(null!==o){var a=o.next;n=a;do{if((n.tag&e)===e){var i=n.inst,s=i.destroy;if(void 0!==s){i.destroy=void 0,o=t;var l=r,c=s;try{c()}catch(u){uu(o,l,u)}}}n=n.next}while(n!==a)}}catch(u){uu(t,t.return,u)}}function ll(e){var t=e.updateQueue;if(null!==t){var r=e.stateNode;try{pa(t,r)}catch(n){uu(e,e.return,n)}}}function cl(e,t,r){r.props=gs(e.type,e.memoizedProps),r.state=e.memoizedState;try{r.componentWillUnmount()}catch(n){uu(e,t,n)}}function ul(e,t){try{var r=e.ref;if(null!==r){switch(e.tag){case 26:case 27:case 5:var n=e.stateNode;break;default:n=e.stateNode}"function"===typeof r?e.refCleanup=r(n):r.current=n}}catch(o){uu(e,t,o)}}function dl(e,t){var r=e.ref,n=e.refCleanup;if(null!==r)if("function"===typeof n)try{n()}catch(o){uu(e,t,o)}finally{e.refCleanup=null,null!=(e=e.alternate)&&(e.refCleanup=null)}else if("function"===typeof r)try{r(null)}catch(a){uu(e,t,a)}else r.current=null}function fl(e){var t=e.type,r=e.memoizedProps,n=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":r.autoFocus&&n.focus();break e;case"img":r.src?n.src=r.src:r.srcSet&&(n.srcset=r.srcSet)}}catch(o){uu(e,e.return,o)}}function pl(e,t,r){try{var n=e.stateNode;!function(e,t,r,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var o=null,a=null,s=null,l=null,c=null,u=null,d=null;for(h in r){var f=r[h];if(r.hasOwnProperty(h)&&null!=f)switch(h){case"checked":case"value":break;case"defaultValue":c=f;default:n.hasOwnProperty(h)||Ju(e,t,h,null,n,f)}}for(var p in n){var h=n[p];if(f=r[p],n.hasOwnProperty(p)&&(null!=h||null!=f))switch(p){case"type":a=h;break;case"name":o=h;break;case"checked":u=h;break;case"defaultChecked":d=h;break;case"value":s=h;break;case"defaultValue":l=h;break;case"children":case"dangerouslySetInnerHTML":if(null!=h)throw Error(i(137,t));break;default:h!==f&&Ju(e,t,p,h,n,f)}}return void gt(e,s,l,c,u,d,a,o);case"select":for(a in h=s=l=p=null,r)if(c=r[a],r.hasOwnProperty(a)&&null!=c)switch(a){case"value":break;case"multiple":h=c;default:n.hasOwnProperty(a)||Ju(e,t,a,null,n,c)}for(o in n)if(a=n[o],c=r[o],n.hasOwnProperty(o)&&(null!=a||null!=c))switch(o){case"value":p=a;break;case"defaultValue":l=a;break;case"multiple":s=a;default:a!==c&&Ju(e,t,o,a,n,c)}return t=l,r=s,n=h,void(null!=p?vt(e,!!r,p,!1):!!n!==!!r&&(null!=t?vt(e,!!r,t,!0):vt(e,!!r,r?[]:"",!1)));case"textarea":for(l in h=p=null,r)if(o=r[l],r.hasOwnProperty(l)&&null!=o&&!n.hasOwnProperty(l))switch(l){case"value":case"children":break;default:Ju(e,t,l,null,n,o)}for(s in n)if(o=n[s],a=r[s],n.hasOwnProperty(s)&&(null!=o||null!=a))switch(s){case"value":p=o;break;case"defaultValue":h=o;break;case"children":break;case"dangerouslySetInnerHTML":if(null!=o)throw Error(i(91));break;default:o!==a&&Ju(e,t,s,o,n,a)}return void xt(e,p,h);case"option":for(var m in r)if(p=r[m],r.hasOwnProperty(m)&&null!=p&&!n.hasOwnProperty(m))if("selected"===m)e.selected=!1;else Ju(e,t,m,null,n,p);for(c in n)if(p=n[c],h=r[c],n.hasOwnProperty(c)&&p!==h&&(null!=p||null!=h))if("selected"===c)e.selected=p&&"function"!==typeof p&&"symbol"!==typeof p;else Ju(e,t,c,p,n,h);return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var g in r)p=r[g],r.hasOwnProperty(g)&&null!=p&&!n.hasOwnProperty(g)&&Ju(e,t,g,null,n,p);for(u in n)if(p=n[u],h=r[u],n.hasOwnProperty(u)&&p!==h&&(null!=p||null!=h))switch(u){case"children":case"dangerouslySetInnerHTML":if(null!=p)throw Error(i(137,t));break;default:Ju(e,t,u,p,n,h)}return;default:if(Et(t)){for(var y in r)p=r[y],r.hasOwnProperty(y)&&void 0!==p&&!n.hasOwnProperty(y)&&Zu(e,t,y,void 0,n,p);for(d in n)p=n[d],h=r[d],!n.hasOwnProperty(d)||p===h||void 0===p&&void 0===h||Zu(e,t,d,p,n,h);return}}for(var b in r)p=r[b],r.hasOwnProperty(b)&&null!=p&&!n.hasOwnProperty(b)&&Ju(e,t,b,null,n,p);for(f in n)p=n[f],h=r[f],!n.hasOwnProperty(f)||p===h||null==p&&null==h||Ju(e,t,f,p,n,h)}(n,e.type,r,t),n[Oe]=t}catch(o){uu(e,e.return,o)}}function hl(e){return 5===e.tag||3===e.tag||26===e.tag||27===e.tag&&pd(e.type)||4===e.tag}function ml(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||hl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(27===e.tag&&pd(e.type))continue e;if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function gl(e,t,r){var n=e.tag;if(5===n||6===n)e=e.stateNode,t?(9===r.nodeType?r.body:"HTML"===r.nodeName?r.ownerDocument.body:r).insertBefore(e,t):((t=9===r.nodeType?r.body:"HTML"===r.nodeName?r.ownerDocument.body:r).appendChild(e),null!==(r=r._reactRootContainer)&&void 0!==r||null!==t.onclick||(t.onclick=Gu));else if(4!==n&&(27===n&&pd(e.type)&&(r=e.stateNode,t=null),null!==(e=e.child)))for(gl(e,t,r),e=e.sibling;null!==e;)gl(e,t,r),e=e.sibling}function yl(e,t,r){var n=e.tag;if(5===n||6===n)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(4!==n&&(27===n&&pd(e.type)&&(r=e.stateNode),null!==(e=e.child)))for(yl(e,t,r),e=e.sibling;null!==e;)yl(e,t,r),e=e.sibling}function bl(e){var t=e.stateNode,r=e.memoizedProps;try{for(var n=e.type,o=t.attributes;o.length;)t.removeAttributeNode(o[0]);ed(t,n,r),t[Ne]=e,t[Oe]=r}catch(a){uu(e,e.return,a)}}var vl=!1,xl=!1,wl=!1,kl="function"===typeof WeakSet?WeakSet:Set,Sl=null;function jl(e,t,r){var n=r.flags;switch(r.tag){case 0:case 11:case 15:Il(e,r),4&n&&il(5,r);break;case 1:if(Il(e,r),4&n)if(e=r.stateNode,null===t)try{e.componentDidMount()}catch(i){uu(r,r.return,i)}else{var o=gs(r.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(o,t,e.__reactInternalSnapshotBeforeUpdate)}catch(s){uu(r,r.return,s)}}64&n&&ll(r),512&n&&ul(r,r.return);break;case 3:if(Il(e,r),64&n&&null!==(e=r.updateQueue)){if(t=null,null!==r.child)switch(r.child.tag){case 27:case 5:case 1:t=r.child.stateNode}try{pa(e,t)}catch(i){uu(r,r.return,i)}}break;case 27:null===t&&4&n&&bl(r);case 26:case 5:Il(e,r),null===t&&4&n&&fl(r),512&n&&ul(r,r.return);break;case 12:Il(e,r);break;case 13:Il(e,r),4&n&&Pl(e,r),64&n&&(null!==(e=r.memoizedState)&&(null!==(e=e.dehydrated)&&function(e,t){var r=e.ownerDocument;if("$?"!==e.data||"complete"===r.readyState)t();else{var n=function(){t(),r.removeEventListener("DOMContentLoaded",n)};r.addEventListener("DOMContentLoaded",n),e._reactRetry=n}}(e,r=hu.bind(null,r))));break;case 22:if(!(n=null!==r.memoizedState||vl)){t=null!==t&&null!==t.memoizedState||xl,o=vl;var a=xl;vl=n,(xl=t)&&!a?Fl(e,r,0!==(8772&r.subtreeFlags)):Il(e,r),vl=o,xl=a}break;case 30:break;default:Il(e,r)}}function _l(e){var t=e.alternate;null!==t&&(e.alternate=null,_l(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(t=e.stateNode)&&Me(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var El=null,Cl=!1;function Tl(e,t,r){for(r=r.child;null!==r;)Rl(e,t,r),r=r.sibling}function Rl(e,t,r){if(de&&"function"===typeof de.onCommitFiberUnmount)try{de.onCommitFiberUnmount(ue,r)}catch(a){}switch(r.tag){case 26:xl||dl(r,t),Tl(e,t,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode).parentNode.removeChild(r);break;case 27:xl||dl(r,t);var n=El,o=Cl;pd(r.type)&&(El=r.stateNode,Cl=!1),Tl(e,t,r),wd(r.stateNode),El=n,Cl=o;break;case 5:xl||dl(r,t);case 6:if(n=El,o=Cl,El=null,Tl(e,t,r),Cl=o,null!==(El=n))if(Cl)try{(9===El.nodeType?El.body:"HTML"===El.nodeName?El.ownerDocument.body:El).removeChild(r.stateNode)}catch(i){uu(r,t,i)}else try{El.removeChild(r.stateNode)}catch(i){uu(r,t,i)}break;case 18:null!==El&&(Cl?(hd(9===(e=El).nodeType?e.body:"HTML"===e.nodeName?e.ownerDocument.body:e,r.stateNode),Tf(e)):hd(El,r.stateNode));break;case 4:n=El,o=Cl,El=r.stateNode.containerInfo,Cl=!0,Tl(e,t,r),El=n,Cl=o;break;case 0:case 11:case 14:case 15:xl||sl(2,r,t),xl||sl(4,r,t),Tl(e,t,r);break;case 1:xl||(dl(r,t),"function"===typeof(n=r.stateNode).componentWillUnmount&&cl(r,t,n)),Tl(e,t,r);break;case 21:Tl(e,t,r);break;case 22:xl=(n=xl)||null!==r.memoizedState,Tl(e,t,r),xl=n;break;default:Tl(e,t,r)}}function Pl(e,t){if(null===t.memoizedState&&(null!==(e=t.alternate)&&(null!==(e=e.memoizedState)&&null!==(e=e.dehydrated))))try{Tf(e)}catch(r){uu(t,t.return,r)}}function zl(e,t){var r=function(e){switch(e.tag){case 13:case 19:var t=e.stateNode;return null===t&&(t=e.stateNode=new kl),t;case 22:return null===(t=(e=e.stateNode)._retryCache)&&(t=e._retryCache=new kl),t;default:throw Error(i(435,e.tag))}}(e);t.forEach(function(t){var n=mu.bind(null,e,t);r.has(t)||(r.add(t),t.then(n,n))})}function Nl(e,t){var r=t.deletions;if(null!==r)for(var n=0;n<r.length;n++){var o=r[n],a=e,s=t,l=s;e:for(;null!==l;){switch(l.tag){case 27:if(pd(l.type)){El=l.stateNode,Cl=!1;break e}break;case 5:El=l.stateNode,Cl=!1;break e;case 3:case 4:El=l.stateNode.containerInfo,Cl=!0;break e}l=l.return}if(null===El)throw Error(i(160));Rl(a,s,o),El=null,Cl=!1,null!==(a=o.alternate)&&(a.return=null),o.return=null}if(13878&t.subtreeFlags)for(t=t.child;null!==t;)Al(t,e),t=t.sibling}var Ol=null;function Al(e,t){var r=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Nl(t,e),Ll(e),4&n&&(sl(3,e,e.return),il(3,e),sl(5,e,e.return));break;case 1:Nl(t,e),Ll(e),512&n&&(xl||null===r||dl(r,r.return)),64&n&&vl&&(null!==(e=e.updateQueue)&&(null!==(n=e.callbacks)&&(r=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=null===r?n:r.concat(n))));break;case 26:var o=Ol;if(Nl(t,e),Ll(e),512&n&&(xl||null===r||dl(r,r.return)),4&n){var a=null!==r?r.memoizedState:null;if(n=e.memoizedState,null===r)if(null===n)if(null===e.stateNode){e:{n=e.type,r=e.memoizedProps,o=o.ownerDocument||o;t:switch(n){case"title":(!(a=o.getElementsByTagName("title")[0])||a[Fe]||a[Ne]||"http://www.w3.org/2000/svg"===a.namespaceURI||a.hasAttribute("itemprop"))&&(a=o.createElement(n),o.head.insertBefore(a,o.querySelector("head > title"))),ed(a,n,r),a[Ne]=e,We(a),n=a;break e;case"link":var s=Fd("link","href",o).get(n+(r.href||""));if(s)for(var l=0;l<s.length;l++)if((a=s[l]).getAttribute("href")===(null==r.href||""===r.href?null:r.href)&&a.getAttribute("rel")===(null==r.rel?null:r.rel)&&a.getAttribute("title")===(null==r.title?null:r.title)&&a.getAttribute("crossorigin")===(null==r.crossOrigin?null:r.crossOrigin)){s.splice(l,1);break t}ed(a=o.createElement(n),n,r),o.head.appendChild(a);break;case"meta":if(s=Fd("meta","content",o).get(n+(r.content||"")))for(l=0;l<s.length;l++)if((a=s[l]).getAttribute("content")===(null==r.content?null:""+r.content)&&a.getAttribute("name")===(null==r.name?null:r.name)&&a.getAttribute("property")===(null==r.property?null:r.property)&&a.getAttribute("http-equiv")===(null==r.httpEquiv?null:r.httpEquiv)&&a.getAttribute("charset")===(null==r.charSet?null:r.charSet)){s.splice(l,1);break t}ed(a=o.createElement(n),n,r),o.head.appendChild(a);break;default:throw Error(i(468,n))}a[Ne]=e,We(a),n=a}e.stateNode=n}else Md(o,e.type,e.stateNode);else e.stateNode=Ad(o,n,e.memoizedProps);else a!==n?(null===a?null!==r.stateNode&&(r=r.stateNode).parentNode.removeChild(r):a.count--,null===n?Md(o,e.type,e.stateNode):Ad(o,n,e.memoizedProps)):null===n&&null!==e.stateNode&&pl(e,e.memoizedProps,r.memoizedProps)}break;case 27:Nl(t,e),Ll(e),512&n&&(xl||null===r||dl(r,r.return)),null!==r&&4&n&&pl(e,e.memoizedProps,r.memoizedProps);break;case 5:if(Nl(t,e),Ll(e),512&n&&(xl||null===r||dl(r,r.return)),32&e.flags){o=e.stateNode;try{kt(o,"")}catch(h){uu(e,e.return,h)}}4&n&&null!=e.stateNode&&pl(e,o=e.memoizedProps,null!==r?r.memoizedProps:o),1024&n&&(wl=!0);break;case 6:if(Nl(t,e),Ll(e),4&n){if(null===e.stateNode)throw Error(i(162));n=e.memoizedProps,r=e.stateNode;try{r.nodeValue=n}catch(h){uu(e,e.return,h)}}break;case 3:if($d=null,o=Ol,Ol=jd(t.containerInfo),Nl(t,e),Ol=o,Ll(e),4&n&&null!==r&&r.memoizedState.isDehydrated)try{Tf(t.containerInfo)}catch(h){uu(e,e.return,h)}wl&&(wl=!1,Dl(e));break;case 4:n=Ol,Ol=jd(e.stateNode.containerInfo),Nl(t,e),Ll(e),Ol=n;break;case 12:default:Nl(t,e),Ll(e);break;case 13:Nl(t,e),Ll(e),8192&e.child.flags&&null!==e.memoizedState!==(null!==r&&null!==r.memoizedState)&&(wc=te()),4&n&&(null!==(n=e.updateQueue)&&(e.updateQueue=null,zl(e,n)));break;case 22:o=null!==e.memoizedState;var c=null!==r&&null!==r.memoizedState,u=vl,d=xl;if(vl=u||o,xl=d||c,Nl(t,e),xl=d,vl=u,Ll(e),8192&n)e:for(t=e.stateNode,t._visibility=o?-2&t._visibility:1|t._visibility,o&&(null===r||c||vl||xl||$l(e)),r=null,t=e;;){if(5===t.tag||26===t.tag){if(null===r){c=r=t;try{if(a=c.stateNode,o)"function"===typeof(s=a.style).setProperty?s.setProperty("display","none","important"):s.display="none";else{l=c.stateNode;var f=c.memoizedProps.style,p=void 0!==f&&null!==f&&f.hasOwnProperty("display")?f.display:null;l.style.display=null==p||"boolean"===typeof p?"":(""+p).trim()}}catch(h){uu(c,c.return,h)}}}else if(6===t.tag){if(null===r){c=t;try{c.stateNode.nodeValue=o?"":c.memoizedProps}catch(h){uu(c,c.return,h)}}}else if((22!==t.tag&&23!==t.tag||null===t.memoizedState||t===e)&&null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;null===t.sibling;){if(null===t.return||t.return===e)break e;r===t&&(r=null),t=t.return}r===t&&(r=null),t.sibling.return=t.return,t=t.sibling}4&n&&(null!==(n=e.updateQueue)&&(null!==(r=n.retryQueue)&&(n.retryQueue=null,zl(e,r))));break;case 19:Nl(t,e),Ll(e),4&n&&(null!==(n=e.updateQueue)&&(e.updateQueue=null,zl(e,n)));case 30:case 21:}}function Ll(e){var t=e.flags;if(2&t){try{for(var r,n=e.return;null!==n;){if(hl(n)){r=n;break}n=n.return}if(null==r)throw Error(i(160));switch(r.tag){case 27:var o=r.stateNode;yl(e,ml(e),o);break;case 5:var a=r.stateNode;32&r.flags&&(kt(a,""),r.flags&=-33),yl(e,ml(e),a);break;case 3:case 4:var s=r.stateNode.containerInfo;gl(e,ml(e),s);break;default:throw Error(i(161))}}catch(l){uu(e,e.return,l)}e.flags&=-3}4096&t&&(e.flags&=-4097)}function Dl(e){if(1024&e.subtreeFlags)for(e=e.child;null!==e;){var t=e;Dl(t),5===t.tag&&1024&t.flags&&t.stateNode.reset(),e=e.sibling}}function Il(e,t){if(8772&t.subtreeFlags)for(t=t.child;null!==t;)jl(e,t.alternate,t),t=t.sibling}function $l(e){for(e=e.child;null!==e;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:sl(4,t,t.return),$l(t);break;case 1:dl(t,t.return);var r=t.stateNode;"function"===typeof r.componentWillUnmount&&cl(t,t.return,r),$l(t);break;case 27:wd(t.stateNode);case 26:case 5:dl(t,t.return),$l(t);break;case 22:null===t.memoizedState&&$l(t);break;default:$l(t)}e=e.sibling}}function Fl(e,t,r){for(r=r&&0!==(8772&t.subtreeFlags),t=t.child;null!==t;){var n=t.alternate,o=e,a=t,i=a.flags;switch(a.tag){case 0:case 11:case 15:Fl(o,a,r),il(4,a);break;case 1:if(Fl(o,a,r),"function"===typeof(o=(n=a).stateNode).componentDidMount)try{o.componentDidMount()}catch(c){uu(n,n.return,c)}if(null!==(o=(n=a).updateQueue)){var s=n.stateNode;try{var l=o.shared.hiddenCallbacks;if(null!==l)for(o.shared.hiddenCallbacks=null,o=0;o<l.length;o++)fa(l[o],s)}catch(c){uu(n,n.return,c)}}r&&64&i&&ll(a),ul(a,a.return);break;case 27:bl(a);case 26:case 5:Fl(o,a,r),r&&null===n&&4&i&&fl(a),ul(a,a.return);break;case 12:Fl(o,a,r);break;case 13:Fl(o,a,r),r&&4&i&&Pl(o,a);break;case 22:null===a.memoizedState&&Fl(o,a,r),ul(a,a.return);break;case 30:break;default:Fl(o,a,r)}t=t.sibling}}function Ml(e,t){var r=null;null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(r=e.memoizedState.cachePool.pool),e=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(e=t.memoizedState.cachePool.pool),e!==r&&(null!=e&&e.refCount++,null!=r&&Lo(r))}function Bl(e,t){e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Lo(e))}function Ul(e,t,r,n){if(10256&t.subtreeFlags)for(t=t.child;null!==t;)ql(e,t,r,n),t=t.sibling}function ql(e,t,r,n){var o=t.flags;switch(t.tag){case 0:case 11:case 15:Ul(e,t,r,n),2048&o&&il(9,t);break;case 1:case 13:default:Ul(e,t,r,n);break;case 3:Ul(e,t,r,n),2048&o&&(e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Lo(e)));break;case 12:if(2048&o){Ul(e,t,r,n),e=t.stateNode;try{var a=t.memoizedProps,i=a.id,s=a.onPostCommit;"function"===typeof s&&s(i,null===t.alternate?"mount":"update",e.passiveEffectDuration,-0)}catch(l){uu(t,t.return,l)}}else Ul(e,t,r,n);break;case 23:break;case 22:a=t.stateNode,i=t.alternate,null!==t.memoizedState?2&a._visibility?Ul(e,t,r,n):Wl(e,t):2&a._visibility?Ul(e,t,r,n):(a._visibility|=2,Hl(e,t,r,n,0!==(10256&t.subtreeFlags))),2048&o&&Ml(i,t);break;case 24:Ul(e,t,r,n),2048&o&&Bl(t.alternate,t)}}function Hl(e,t,r,n,o){for(o=o&&0!==(10256&t.subtreeFlags),t=t.child;null!==t;){var a=e,i=t,s=r,l=n,c=i.flags;switch(i.tag){case 0:case 11:case 15:Hl(a,i,s,l,o),il(8,i);break;case 23:break;case 22:var u=i.stateNode;null!==i.memoizedState?2&u._visibility?Hl(a,i,s,l,o):Wl(a,i):(u._visibility|=2,Hl(a,i,s,l,o)),o&&2048&c&&Ml(i.alternate,i);break;case 24:Hl(a,i,s,l,o),o&&2048&c&&Bl(i.alternate,i);break;default:Hl(a,i,s,l,o)}t=t.sibling}}function Wl(e,t){if(10256&t.subtreeFlags)for(t=t.child;null!==t;){var r=e,n=t,o=n.flags;switch(n.tag){case 22:Wl(r,n),2048&o&&Ml(n.alternate,n);break;case 24:Wl(r,n),2048&o&&Bl(n.alternate,n);break;default:Wl(r,n)}t=t.sibling}}var Vl=8192;function Yl(e){if(e.subtreeFlags&Vl)for(e=e.child;null!==e;)Kl(e),e=e.sibling}function Kl(e){switch(e.tag){case 26:Yl(e),e.flags&Vl&&null!==e.memoizedState&&function(e,t,r){if(null===Ud)throw Error(i(475));var n=Ud;if("stylesheet"===t.type&&("string"!==typeof r.media||!1!==matchMedia(r.media).matches)&&0===(4&t.state.loading)){if(null===t.instance){var o=Rd(r.href),a=e.querySelector(Pd(o));if(a)return null!==(e=a._p)&&"object"===typeof e&&"function"===typeof e.then&&(n.count++,n=Hd.bind(n),e.then(n,n)),t.state.loading|=4,t.instance=a,void We(a);a=e.ownerDocument||e,r=zd(r),(o=kd.get(o))&&Dd(r,o),We(a=a.createElement("link"));var s=a;s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),ed(a,"link",r),t.instance=a}null===n.stylesheets&&(n.stylesheets=new Map),n.stylesheets.set(t,e),(e=t.state.preload)&&0===(3&t.state.loading)&&(n.count++,t=Hd.bind(n),e.addEventListener("load",t),e.addEventListener("error",t))}}(Ol,e.memoizedState,e.memoizedProps);break;case 5:default:Yl(e);break;case 3:case 4:var t=Ol;Ol=jd(e.stateNode.containerInfo),Yl(e),Ol=t;break;case 22:null===e.memoizedState&&(null!==(t=e.alternate)&&null!==t.memoizedState?(t=Vl,Vl=16777216,Yl(e),Vl=t):Yl(e))}}function Ql(e){var t=e.alternate;if(null!==t&&null!==(e=t.child)){t.child=null;do{t=e.sibling,e.sibling=null,e=t}while(null!==e)}}function Xl(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var r=0;r<t.length;r++){var n=t[r];Sl=n,Zl(n,e)}Ql(e)}if(10256&e.subtreeFlags)for(e=e.child;null!==e;)Gl(e),e=e.sibling}function Gl(e){switch(e.tag){case 0:case 11:case 15:Xl(e),2048&e.flags&&sl(9,e,e.return);break;case 3:case 12:default:Xl(e);break;case 22:var t=e.stateNode;null!==e.memoizedState&&2&t._visibility&&(null===e.return||13!==e.return.tag)?(t._visibility&=-3,Jl(e)):Xl(e)}}function Jl(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var r=0;r<t.length;r++){var n=t[r];Sl=n,Zl(n,e)}Ql(e)}for(e=e.child;null!==e;){switch((t=e).tag){case 0:case 11:case 15:sl(8,t,t.return),Jl(t);break;case 22:2&(r=t.stateNode)._visibility&&(r._visibility&=-3,Jl(t));break;default:Jl(t)}e=e.sibling}}function Zl(e,t){for(;null!==Sl;){var r=Sl;switch(r.tag){case 0:case 11:case 15:sl(8,r,t);break;case 23:case 22:if(null!==r.memoizedState&&null!==r.memoizedState.cachePool){var n=r.memoizedState.cachePool.pool;null!=n&&n.refCount++}break;case 24:Lo(r.memoizedState.cache)}if(null!==(n=r.child))n.return=r,Sl=n;else e:for(r=e;null!==Sl;){var o=(n=Sl).sibling,a=n.return;if(_l(n),n===r){Sl=null;break e}if(null!==o){o.return=a,Sl=o;break e}Sl=a}}}var ec={getCacheForType:function(e){var t=Co(Oo),r=t.data.get(e);return void 0===r&&(r=e(),t.data.set(e,r)),r}},tc="function"===typeof WeakMap?WeakMap:Map,rc=0,nc=null,oc=null,ac=0,ic=0,sc=null,lc=!1,cc=!1,uc=!1,dc=0,fc=0,pc=0,hc=0,mc=0,gc=0,yc=0,bc=null,vc=null,xc=!1,wc=0,kc=1/0,Sc=null,jc=null,_c=0,Ec=null,Cc=null,Tc=0,Rc=0,Pc=null,zc=null,Nc=0,Oc=null;function Ac(){if(0!==(2&rc)&&0!==ac)return ac&-ac;if(null!==A.T){return 0!==$o?$o:Ru()}return Pe()}function Lc(){0===gc&&(gc=0===(536870912&ac)||ao?ke():536870912);var e=os.current;return null!==e&&(e.flags|=32),gc}function Dc(e,t,r){(e!==nc||2!==ic&&9!==ic)&&null===e.cancelPendingCommit||(qc(e,0),Mc(e,ac,gc,!1)),_e(e,r),0!==(2&rc)&&e===nc||(e===nc&&(0===(2&rc)&&(hc|=r),4===fc&&Mc(e,ac,gc,!1)),ku(e))}function Ic(e,t,r){if(0!==(6&rc))throw Error(i(327));for(var n=!r&&0===(124&t)&&0===(t&e.expiredLanes)||xe(e,t),o=n?function(e,t){var r=rc;rc|=2;var n=Wc(),o=Vc();nc!==e||ac!==t?(Sc=null,kc=te()+500,qc(e,t)):cc=xe(e,t);e:for(;;)try{if(0!==ic&&null!==oc){t=oc;var a=sc;t:switch(ic){case 1:ic=0,sc=null,Zc(e,t,a,1);break;case 2:case 9:if(Xo(a)){ic=0,sc=null,Jc(t);break}t=function(){2!==ic&&9!==ic||nc!==e||(ic=7),ku(e)},a.then(t,t);break e;case 3:ic=7;break e;case 4:ic=5;break e;case 7:Xo(a)?(ic=0,sc=null,Jc(t)):(ic=0,sc=null,Zc(e,t,a,7));break;case 5:var s=null;switch(oc.tag){case 26:s=oc.memoizedState;case 5:case 27:var l=oc;if(!s||Bd(s)){ic=0,sc=null;var c=l.sibling;if(null!==c)oc=c;else{var u=l.return;null!==u?(oc=u,eu(u)):oc=null}break t}}ic=0,sc=null,Zc(e,t,a,5);break;case 6:ic=0,sc=null,Zc(e,t,a,6);break;case 8:Uc(),fc=6;break e;default:throw Error(i(462))}}Xc();break}catch(d){Hc(e,d)}return vo=bo=null,A.H=n,A.A=o,rc=r,null!==oc?0:(nc=null,ac=0,Tn(),fc)}(e,t):Kc(e,t,!0),a=n;;){if(0===o){cc&&!n&&Mc(e,t,0,!1);break}if(r=e.current.alternate,!a||Fc(r)){if(2===o){if(a=t,e.errorRecoveryDisabledLanes&a)var s=0;else s=0!==(s=-536870913&e.pendingLanes)?s:536870912&s?536870912:0;if(0!==s){t=s;e:{var l=e;o=bc;var c=l.current.memoizedState.isDehydrated;if(c&&(qc(l,s).flags|=256),2!==(s=Kc(l,s,!1))){if(uc&&!c){l.errorRecoveryDisabledLanes|=a,hc|=a,o=4;break e}a=vc,vc=o,null!==a&&(null===vc?vc=a:vc.push.apply(vc,a))}o=s}if(a=!1,2!==o)continue}}if(1===o){qc(e,0),Mc(e,t,0,!0);break}e:{switch(n=e,a=o){case 0:case 1:throw Error(i(345));case 4:if((4194048&t)!==t)break;case 6:Mc(n,t,gc,!lc);break e;case 2:vc=null;break;case 3:case 5:break;default:throw Error(i(329))}if((62914560&t)===t&&10<(o=wc+300-te())){if(Mc(n,t,gc,!lc),0!==ve(n,0,!0))break e;n.timeoutHandle=ld($c.bind(null,n,r,vc,Sc,xc,t,gc,hc,yc,lc,a,2,-0,0),o)}else $c(n,r,vc,Sc,xc,t,gc,hc,yc,lc,a,0,-0,0)}break}o=Kc(e,t,!1),a=!1}ku(e)}function $c(e,t,r,n,o,a,s,l,c,u,d,f,p,h){if(e.timeoutHandle=-1,(8192&(f=t.subtreeFlags)||16785408===(16785408&f))&&(Ud={stylesheets:null,count:0,unsuspend:qd},Kl(t),null!==(f=function(){if(null===Ud)throw Error(i(475));var e=Ud;return e.stylesheets&&0===e.count&&Vd(e,e.stylesheets),0<e.count?function(t){var r=setTimeout(function(){if(e.stylesheets&&Vd(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(r)}}:null}())))return e.cancelPendingCommit=f(ru.bind(null,e,t,a,r,n,o,s,l,c,d,1,p,h)),void Mc(e,a,s,!u);ru(e,t,a,r,n,o,s,l,c)}function Fc(e){for(var t=e;;){var r=t.tag;if((0===r||11===r||15===r)&&16384&t.flags&&(null!==(r=t.updateQueue)&&null!==(r=r.stores)))for(var n=0;n<r.length;n++){var o=r[n],a=o.getSnapshot;o=o.value;try{if(!Kr(a(),o))return!1}catch(i){return!1}}if(r=t.child,16384&t.subtreeFlags&&null!==r)r.return=t,t=r;else{if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Mc(e,t,r,n){t&=~mc,t&=~hc,e.suspendedLanes|=t,e.pingedLanes&=~t,n&&(e.warmLanes|=t),n=e.expirationTimes;for(var o=t;0<o;){var a=31-pe(o),i=1<<a;n[a]=-1,o&=~i}0!==r&&Ee(e,r,t)}function Bc(){return 0!==(6&rc)||(Su(0,!1),!1)}function Uc(){if(null!==oc){if(0===ic)var e=oc.return;else vo=bo=null,$a(e=oc),Qi=null,Xi=0,e=oc;for(;null!==e;)al(e.alternate,e),e=e.return;oc=null}}function qc(e,t){var r=e.timeoutHandle;-1!==r&&(e.timeoutHandle=-1,cd(r)),null!==(r=e.cancelPendingCommit)&&(e.cancelPendingCommit=null,r()),Uc(),nc=e,oc=r=$n(e.current,null),ac=t,ic=0,sc=null,lc=!1,cc=xe(e,t),uc=!1,yc=gc=mc=hc=pc=fc=0,vc=bc=null,xc=!1,0!==(8&t)&&(t|=32&t);var n=e.entangledLanes;if(0!==n)for(e=e.entanglements,n&=t;0<n;){var o=31-pe(n),a=1<<o;t|=e[o],n&=~a}return dc=t,Tn(),r}function Hc(e,t){xa=null,A.H=Wi,t===Vo||t===Ko?(t=ea(),ic=3):t===Yo?(t=ea(),ic=4):ic=t===Es?8:null!==t&&"object"===typeof t&&"function"===typeof t.then?6:1,sc=t,null===oc&&(fc=1,ws(e,jn(t,e.current)))}function Wc(){var e=A.H;return A.H=Wi,null===e?Wi:e}function Vc(){var e=A.A;return A.A=ec,e}function Yc(){fc=4,lc||(4194048&ac)!==ac&&null!==os.current||(cc=!0),0===(134217727&pc)&&0===(134217727&hc)||null===nc||Mc(nc,ac,gc,!1)}function Kc(e,t,r){var n=rc;rc|=2;var o=Wc(),a=Vc();nc===e&&ac===t||(Sc=null,qc(e,t)),t=!1;var i=fc;e:for(;;)try{if(0!==ic&&null!==oc){var s=oc,l=sc;switch(ic){case 8:Uc(),i=6;break e;case 3:case 2:case 9:case 6:null===os.current&&(t=!0);var c=ic;if(ic=0,sc=null,Zc(e,s,l,c),r&&cc){i=0;break e}break;default:c=ic,ic=0,sc=null,Zc(e,s,l,c)}}Qc(),i=fc;break}catch(u){Hc(e,u)}return t&&e.shellSuspendCounter++,vo=bo=null,rc=n,A.H=o,A.A=a,null===oc&&(nc=null,ac=0,Tn()),i}function Qc(){for(;null!==oc;)Gc(oc)}function Xc(){for(;null!==oc&&!Z();)Gc(oc)}function Gc(e){var t=Gs(e.alternate,e,dc);e.memoizedProps=e.pendingProps,null===t?eu(e):oc=t}function Jc(e){var t=e,r=t.alternate;switch(t.tag){case 15:case 0:t=Ds(r,t,t.pendingProps,t.type,void 0,ac);break;case 11:t=Ds(r,t,t.pendingProps,t.type.render,t.ref,ac);break;case 5:$a(t);default:al(r,t),t=Gs(r,t=oc=Fn(t,dc),dc)}e.memoizedProps=e.pendingProps,null===t?eu(e):oc=t}function Zc(e,t,r,n){vo=bo=null,$a(t),Qi=null,Xi=0;var o=t.return;try{if(function(e,t,r,n,o){if(r.flags|=32768,null!==n&&"object"===typeof n&&"function"===typeof n.then){if(null!==(t=r.alternate)&&jo(t,r,o,!0),null!==(r=os.current)){switch(r.tag){case 13:return null===as?Yc():null===r.alternate&&0===fc&&(fc=3),r.flags&=-257,r.flags|=65536,r.lanes=o,n===Qo?r.flags|=16384:(null===(t=r.updateQueue)?r.updateQueue=new Set([n]):t.add(n),du(e,n,o)),!1;case 22:return r.flags|=65536,n===Qo?r.flags|=16384:(null===(t=r.updateQueue)?(t={transitions:null,markerInstances:null,retryQueue:new Set([n])},r.updateQueue=t):null===(r=t.retryQueue)?t.retryQueue=new Set([n]):r.add(n),du(e,n,o)),!1}throw Error(i(435,r.tag))}return du(e,n,o),Yc(),!1}if(ao)return null!==(t=os.current)?(0===(65536&t.flags)&&(t.flags|=256),t.flags|=65536,t.lanes=o,n!==lo&&go(jn(e=Error(i(422),{cause:n}),r))):(n!==lo&&go(jn(t=Error(i(423),{cause:n}),r)),(e=e.current.alternate).flags|=65536,o&=-o,e.lanes|=o,n=jn(n,r),la(e,o=Ss(e.stateNode,n,o)),4!==fc&&(fc=2)),!1;var a=Error(i(520),{cause:n});if(a=jn(a,r),null===bc?bc=[a]:bc.push(a),4!==fc&&(fc=2),null===t)return!0;n=jn(n,r),r=t;do{switch(r.tag){case 3:return r.flags|=65536,e=o&-o,r.lanes|=e,la(r,e=Ss(r.stateNode,n,e)),!1;case 1:if(t=r.type,a=r.stateNode,0===(128&r.flags)&&("function"===typeof t.getDerivedStateFromError||null!==a&&"function"===typeof a.componentDidCatch&&(null===jc||!jc.has(a))))return r.flags|=65536,o&=-o,r.lanes|=o,_s(o=js(o),e,r,n),la(r,o),!1}r=r.return}while(null!==r);return!1}(e,o,t,r,ac))return fc=1,ws(e,jn(r,e.current)),void(oc=null)}catch(a){if(null!==o)throw oc=o,a;return fc=1,ws(e,jn(r,e.current)),void(oc=null)}32768&t.flags?(ao||1===n?e=!0:cc||0!==(536870912&ac)?e=!1:(lc=e=!0,(2===n||9===n||3===n||6===n)&&(null!==(n=os.current)&&13===n.tag&&(n.flags|=16384))),tu(t,e)):eu(t)}function eu(e){var t=e;do{if(0!==(32768&t.flags))return void tu(t,lc);e=t.return;var r=nl(t.alternate,t,dc);if(null!==r)return void(oc=r);if(null!==(t=t.sibling))return void(oc=t);oc=t=e}while(null!==t);0===fc&&(fc=5)}function tu(e,t){do{var r=ol(e.alternate,e);if(null!==r)return r.flags&=32767,void(oc=r);if(null!==(r=e.return)&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!t&&null!==(e=e.sibling))return void(oc=e);oc=e=r}while(null!==e);fc=6,oc=null}function ru(e,t,r,n,o,a,s,l,c){e.cancelPendingCommit=null;do{su()}while(0!==_c);if(0!==(6&rc))throw Error(i(327));if(null!==t){if(t===e.current)throw Error(i(177));if(a=t.lanes|t.childLanes,function(e,t,r,n,o,a){var i=e.pendingLanes;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=r,e.entangledLanes&=r,e.errorRecoveryDisabledLanes&=r,e.shellSuspendCounter=0;var s=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(r=i&~r;0<r;){var u=31-pe(r),d=1<<u;s[u]=0,l[u]=-1;var f=c[u];if(null!==f)for(c[u]=null,u=0;u<f.length;u++){var p=f[u];null!==p&&(p.lane&=-536870913)}r&=~d}0!==n&&Ee(e,n,0),0!==a&&0===o&&0!==e.tag&&(e.suspendedLanes|=a&~(i&~t))}(e,r,a|=Cn,s,l,c),e===nc&&(oc=nc=null,ac=0),Cc=t,Ec=e,Tc=r,Rc=a,Pc=o,zc=n,0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?(e.callbackNode=null,e.callbackPriority=0,G(ae,function(){return lu(),null})):(e.callbackNode=null,e.callbackPriority=0),n=0!==(13878&t.flags),0!==(13878&t.subtreeFlags)||n){n=A.T,A.T=null,o=L.p,L.p=2,s=rc,rc|=4;try{!function(e,t){if(e=e.containerInfo,td=rf,en(e=Zr(e))){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{var n=(r=(r=e.ownerDocument)&&r.defaultView||window).getSelection&&r.getSelection();if(n&&0!==n.rangeCount){r=n.anchorNode;var o=n.anchorOffset,a=n.focusNode;n=n.focusOffset;try{r.nodeType,a.nodeType}catch(g){r=null;break e}var s=0,l=-1,c=-1,u=0,d=0,f=e,p=null;t:for(;;){for(var h;f!==r||0!==o&&3!==f.nodeType||(l=s+o),f!==a||0!==n&&3!==f.nodeType||(c=s+n),3===f.nodeType&&(s+=f.nodeValue.length),null!==(h=f.firstChild);)p=f,f=h;for(;;){if(f===e)break t;if(p===r&&++u===o&&(l=s),p===a&&++d===n&&(c=s),null!==(h=f.nextSibling))break;p=(f=p).parentNode}f=h}r=-1===l||-1===c?null:{start:l,end:c}}else r=null}r=r||{start:0,end:0}}else r=null;for(rd={focusedElem:e,selectionRange:r},rf=!1,Sl=t;null!==Sl;)if(e=(t=Sl).child,0!==(1024&t.subtreeFlags)&&null!==e)e.return=t,Sl=e;else for(;null!==Sl;){switch(a=(t=Sl).alternate,e=t.flags,t.tag){case 0:case 11:case 15:case 5:case 26:case 27:case 6:case 4:case 17:break;case 1:if(0!==(1024&e)&&null!==a){e=void 0,r=t,o=a.memoizedProps,a=a.memoizedState,n=r.stateNode;try{var m=gs(r.type,o,(r.elementType,r.type));e=n.getSnapshotBeforeUpdate(m,a),n.__reactInternalSnapshotBeforeUpdate=e}catch(y){uu(r,r.return,y)}}break;case 3:if(0!==(1024&e))if(9===(r=(e=t.stateNode.containerInfo).nodeType))md(e);else if(1===r)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":md(e);break;default:e.textContent=""}break;default:if(0!==(1024&e))throw Error(i(163))}if(null!==(e=t.sibling)){e.return=t.return,Sl=e;break}Sl=t.return}}(e,t)}finally{rc=s,L.p=o,A.T=n}}_c=1,nu(),ou(),au()}}function nu(){if(1===_c){_c=0;var e=Ec,t=Cc,r=0!==(13878&t.flags);if(0!==(13878&t.subtreeFlags)||r){r=A.T,A.T=null;var n=L.p;L.p=2;var o=rc;rc|=4;try{Al(t,e);var a=rd,i=Zr(e.containerInfo),s=a.focusedElem,l=a.selectionRange;if(i!==s&&s&&s.ownerDocument&&Jr(s.ownerDocument.documentElement,s)){if(null!==l&&en(s)){var c=l.start,u=l.end;if(void 0===u&&(u=c),"selectionStart"in s)s.selectionStart=c,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),h=s.textContent.length,m=Math.min(l.start,h),g=void 0===l.end?m:Math.min(l.end,h);!p.extend&&m>g&&(i=g,g=m,m=i);var y=Gr(s,m),b=Gr(s,g);if(y&&b&&(1!==p.rangeCount||p.anchorNode!==y.node||p.anchorOffset!==y.offset||p.focusNode!==b.node||p.focusOffset!==b.offset)){var v=d.createRange();v.setStart(y.node,y.offset),p.removeAllRanges(),m>g?(p.addRange(v),p.extend(b.node,b.offset)):(v.setEnd(b.node,b.offset),p.addRange(v))}}}}for(d=[],p=s;p=p.parentNode;)1===p.nodeType&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for("function"===typeof s.focus&&s.focus(),s=0;s<d.length;s++){var x=d[s];x.element.scrollLeft=x.left,x.element.scrollTop=x.top}}rf=!!td,rd=td=null}finally{rc=o,L.p=n,A.T=r}}e.current=t,_c=2}}function ou(){if(2===_c){_c=0;var e=Ec,t=Cc,r=0!==(8772&t.flags);if(0!==(8772&t.subtreeFlags)||r){r=A.T,A.T=null;var n=L.p;L.p=2;var o=rc;rc|=4;try{jl(e,t.alternate,t)}finally{rc=o,L.p=n,A.T=r}}_c=3}}function au(){if(4===_c||3===_c){_c=0,ee();var e=Ec,t=Cc,r=Tc,n=zc;0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?_c=5:(_c=0,Cc=Ec=null,iu(e,e.pendingLanes));var o=e.pendingLanes;if(0===o&&(jc=null),Re(r),t=t.stateNode,de&&"function"===typeof de.onCommitFiberRoot)try{de.onCommitFiberRoot(ue,t,void 0,128===(128&t.current.flags))}catch(l){}if(null!==n){t=A.T,o=L.p,L.p=2,A.T=null;try{for(var a=e.onRecoverableError,i=0;i<n.length;i++){var s=n[i];a(s.value,{componentStack:s.stack})}}finally{A.T=t,L.p=o}}0!==(3&Tc)&&su(),ku(e),o=e.pendingLanes,0!==(4194090&r)&&0!==(42&o)?e===Oc?Nc++:(Nc=0,Oc=e):Nc=0,Su(0,!1)}}function iu(e,t){0===(e.pooledCacheLanes&=t)&&(null!=(t=e.pooledCache)&&(e.pooledCache=null,Lo(t)))}function su(e){return nu(),ou(),au(),lu()}function lu(){if(5!==_c)return!1;var e=Ec,t=Rc;Rc=0;var r=Re(Tc),n=A.T,o=L.p;try{L.p=32>r?32:r,A.T=null,r=Pc,Pc=null;var a=Ec,s=Tc;if(_c=0,Cc=Ec=null,Tc=0,0!==(6&rc))throw Error(i(331));var l=rc;if(rc|=4,Gl(a.current),ql(a,a.current,s,r),rc=l,Su(0,!1),de&&"function"===typeof de.onPostCommitFiberRoot)try{de.onPostCommitFiberRoot(ue,a)}catch(c){}return!0}finally{L.p=o,A.T=n,iu(e,t)}}function cu(e,t,r){t=jn(r,t),null!==(e=ia(e,t=Ss(e.stateNode,t,2),2))&&(_e(e,2),ku(e))}function uu(e,t,r){if(3===e.tag)cu(e,e,r);else for(;null!==t;){if(3===t.tag){cu(t,e,r);break}if(1===t.tag){var n=t.stateNode;if("function"===typeof t.type.getDerivedStateFromError||"function"===typeof n.componentDidCatch&&(null===jc||!jc.has(n))){e=jn(r,e),null!==(n=ia(t,r=js(2),2))&&(_s(r,n,t,e),_e(n,2),ku(n));break}}t=t.return}}function du(e,t,r){var n=e.pingCache;if(null===n){n=e.pingCache=new tc;var o=new Set;n.set(t,o)}else void 0===(o=n.get(t))&&(o=new Set,n.set(t,o));o.has(r)||(uc=!0,o.add(r),e=fu.bind(null,e,t,r),t.then(e,e))}function fu(e,t,r){var n=e.pingCache;null!==n&&n.delete(t),e.pingedLanes|=e.suspendedLanes&r,e.warmLanes&=~r,nc===e&&(ac&r)===r&&(4===fc||3===fc&&(62914560&ac)===ac&&300>te()-wc?0===(2&rc)&&qc(e,0):mc|=r,yc===ac&&(yc=0)),ku(e)}function pu(e,t){0===t&&(t=Se()),null!==(e=zn(e,t))&&(_e(e,t),ku(e))}function hu(e){var t=e.memoizedState,r=0;null!==t&&(r=t.retryLane),pu(e,r)}function mu(e,t){var r=0;switch(e.tag){case 13:var n=e.stateNode,o=e.memoizedState;null!==o&&(r=o.retryLane);break;case 19:n=e.stateNode;break;case 22:n=e.stateNode._retryCache;break;default:throw Error(i(314))}null!==n&&n.delete(t),pu(e,r)}var gu=null,yu=null,bu=!1,vu=!1,xu=!1,wu=0;function ku(e){e!==yu&&null===e.next&&(null===yu?gu=yu=e:yu=yu.next=e),vu=!0,bu||(bu=!0,dd(function(){0!==(6&rc)?G(ne,ju):_u()}))}function Su(e,t){if(!xu&&vu){xu=!0;do{for(var r=!1,n=gu;null!==n;){if(!t)if(0!==e){var o=n.pendingLanes;if(0===o)var a=0;else{var i=n.suspendedLanes,s=n.pingedLanes;a=(1<<31-pe(42|e)+1)-1,a=201326741&(a&=o&~(i&~s))?201326741&a|1:a?2|a:0}0!==a&&(r=!0,Tu(n,a))}else a=ac,0===(3&(a=ve(n,n===nc?a:0,null!==n.cancelPendingCommit||-1!==n.timeoutHandle)))||xe(n,a)||(r=!0,Tu(n,a));n=n.next}}while(r);xu=!1}}function ju(){_u()}function _u(){vu=bu=!1;var e=0;0!==wu&&(function(){var e=window.event;if(e&&"popstate"===e.type)return e!==sd&&(sd=e,!0);return sd=null,!1}()&&(e=wu),wu=0);for(var t=te(),r=null,n=gu;null!==n;){var o=n.next,a=Eu(n,t);0===a?(n.next=null,null===r?gu=o:r.next=o,null===o&&(yu=r)):(r=n,(0!==e||0!==(3&a))&&(vu=!0)),n=o}Su(e,!1)}function Eu(e,t){for(var r=e.suspendedLanes,n=e.pingedLanes,o=e.expirationTimes,a=-62914561&e.pendingLanes;0<a;){var i=31-pe(a),s=1<<i,l=o[i];-1===l?0!==(s&r)&&0===(s&n)||(o[i]=we(s,t)):l<=t&&(e.expiredLanes|=s),a&=~s}if(r=ac,r=ve(e,e===(t=nc)?r:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle),n=e.callbackNode,0===r||e===t&&(2===ic||9===ic)||null!==e.cancelPendingCommit)return null!==n&&null!==n&&J(n),e.callbackNode=null,e.callbackPriority=0;if(0===(3&r)||xe(e,r)){if((t=r&-r)===e.callbackPriority)return t;switch(null!==n&&J(n),Re(r)){case 2:case 8:r=oe;break;case 32:default:r=ae;break;case 268435456:r=se}return n=Cu.bind(null,e),r=G(r,n),e.callbackPriority=t,e.callbackNode=r,t}return null!==n&&null!==n&&J(n),e.callbackPriority=2,e.callbackNode=null,2}function Cu(e,t){if(0!==_c&&5!==_c)return e.callbackNode=null,e.callbackPriority=0,null;var r=e.callbackNode;if(su()&&e.callbackNode!==r)return null;var n=ac;return 0===(n=ve(e,e===nc?n:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle))?null:(Ic(e,n,t),Eu(e,te()),null!=e.callbackNode&&e.callbackNode===r?Cu.bind(null,e):null)}function Tu(e,t){if(su())return null;Ic(e,t,!0)}function Ru(){return 0===wu&&(wu=ke()),wu}function Pu(e){return null==e||"symbol"===typeof e||"boolean"===typeof e?null:"function"===typeof e?e:Rt(""+e)}function zu(e,t){var r=t.ownerDocument.createElement("input");return r.name=t.name,r.value=t.value,e.id&&r.setAttribute("form",e.id),t.parentNode.insertBefore(r,t),e=new FormData(e),r.parentNode.removeChild(r),e}for(var Nu=0;Nu<wn.length;Nu++){var Ou=wn[Nu];kn(Ou.toLowerCase(),"on"+(Ou[0].toUpperCase()+Ou.slice(1)))}kn(pn,"onAnimationEnd"),kn(hn,"onAnimationIteration"),kn(mn,"onAnimationStart"),kn("dblclick","onDoubleClick"),kn("focusin","onFocus"),kn("focusout","onBlur"),kn(gn,"onTransitionRun"),kn(yn,"onTransitionStart"),kn(bn,"onTransitionCancel"),kn(vn,"onTransitionEnd"),Qe("onMouseEnter",["mouseout","mouseover"]),Qe("onMouseLeave",["mouseout","mouseover"]),Qe("onPointerEnter",["pointerout","pointerover"]),Qe("onPointerLeave",["pointerout","pointerover"]),Ke("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ke("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ke("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ke("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ke("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ke("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Au="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Lu=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Au));function Du(e,t){t=0!==(4&t);for(var r=0;r<e.length;r++){var n=e[r],o=n.event;n=n.listeners;e:{var a=void 0;if(t)for(var i=n.length-1;0<=i;i--){var s=n[i],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==a&&o.isPropagationStopped())break e;a=s,o.currentTarget=c;try{a(o)}catch(u){ys(u)}o.currentTarget=null,a=l}else for(i=0;i<n.length;i++){if(l=(s=n[i]).instance,c=s.currentTarget,s=s.listener,l!==a&&o.isPropagationStopped())break e;a=s,o.currentTarget=c;try{a(o)}catch(u){ys(u)}o.currentTarget=null,a=l}}}}function Iu(e,t){var r=t[Le];void 0===r&&(r=t[Le]=new Set);var n=e+"__bubble";r.has(n)||(Bu(t,e,2,!1),r.add(n))}function $u(e,t,r){var n=0;t&&(n|=4),Bu(r,e,n,t)}var Fu="_reactListening"+Math.random().toString(36).slice(2);function Mu(e){if(!e[Fu]){e[Fu]=!0,Ve.forEach(function(t){"selectionchange"!==t&&(Lu.has(t)||$u(t,!1,e),$u(t,!0,e))});var t=9===e.nodeType?e:e.ownerDocument;null===t||t[Fu]||(t[Fu]=!0,$u("selectionchange",!1,t))}}function Bu(e,t,r,n){switch(uf(t)){case 2:var o=nf;break;case 8:o=of;break;default:o=af}r=o.bind(null,t,r,e),o=void 0,!Ft||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(o=!0),n?void 0!==o?e.addEventListener(t,r,{capture:!0,passive:o}):e.addEventListener(t,r,!0):void 0!==o?e.addEventListener(t,r,{passive:o}):e.addEventListener(t,r,!1)}function Uu(e,t,r,n,o){var a=n;if(0===(1&t)&&0===(2&t)&&null!==n)e:for(;;){if(null===n)return;var i=n.tag;if(3===i||4===i){var s=n.stateNode.containerInfo;if(s===o)break;if(4===i)for(i=n.return;null!==i;){var c=i.tag;if((3===c||4===c)&&i.stateNode.containerInfo===o)return;i=i.return}for(;null!==s;){if(null===(i=Be(s)))return;if(5===(c=i.tag)||6===c||26===c||27===c){n=a=i;continue e}s=s.parentNode}}n=n.return}Dt(function(){var n=a,o=zt(r),i=[];e:{var s=xn.get(e);if(void 0!==s){var c=Zt,u=e;switch(e){case"keypress":if(0===Wt(r))break e;case"keydown":case"keyup":c=hr;break;case"focusin":u="focus",c=ar;break;case"focusout":u="blur",c=ar;break;case"beforeblur":case"afterblur":c=ar;break;case"click":if(2===r.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":c=nr;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":c=or;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":c=gr;break;case pn:case hn:case mn:c=ir;break;case vn:c=yr;break;case"scroll":case"scrollend":c=tr;break;case"wheel":c=br;break;case"copy":case"cut":case"paste":c=sr;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":c=mr;break;case"toggle":case"beforetoggle":c=vr}var d=0!==(4&t),f=!d&&("scroll"===e||"scrollend"===e),p=d?null!==s?s+"Capture":null:s;d=[];for(var h,m=n;null!==m;){var g=m;if(h=g.stateNode,5!==(g=g.tag)&&26!==g&&27!==g||null===h||null===p||null!=(g=It(m,p))&&d.push(qu(m,g,h)),f)break;m=m.return}0<d.length&&(s=new c(s,u,null,r,o),i.push({event:s,listeners:d}))}}if(0===(7&t)){if(c="mouseout"===e||"pointerout"===e,(!(s="mouseover"===e||"pointerover"===e)||r===Pt||!(u=r.relatedTarget||r.fromElement)||!Be(u)&&!u[Ae])&&(c||s)&&(s=o.window===o?o:(s=o.ownerDocument)?s.defaultView||s.parentWindow:window,c?(c=n,null!==(u=(u=r.relatedTarget||r.toElement)?Be(u):null)&&(f=l(u),d=u.tag,u!==f||5!==d&&27!==d&&6!==d)&&(u=null)):(c=null,u=n),c!==u)){if(d=nr,g="onMouseLeave",p="onMouseEnter",m="mouse","pointerout"!==e&&"pointerover"!==e||(d=mr,g="onPointerLeave",p="onPointerEnter",m="pointer"),f=null==c?s:qe(c),h=null==u?s:qe(u),(s=new d(g,m+"leave",c,r,o)).target=f,s.relatedTarget=h,g=null,Be(o)===n&&((d=new d(p,m+"enter",u,r,o)).target=h,d.relatedTarget=f,g=d),f=g,c&&u)e:{for(p=u,m=0,h=d=c;h;h=Wu(h))m++;for(h=0,g=p;g;g=Wu(g))h++;for(;0<m-h;)d=Wu(d),m--;for(;0<h-m;)p=Wu(p),h--;for(;m--;){if(d===p||null!==p&&d===p.alternate)break e;d=Wu(d),p=Wu(p)}d=null}else d=null;null!==c&&Vu(i,s,c,d,!1),null!==u&&null!==f&&Vu(i,f,u,d,!0)}if("select"===(c=(s=n?qe(n):window).nodeName&&s.nodeName.toLowerCase())||"input"===c&&"file"===s.type)var y=Ir;else if(zr(s))if($r)y=Yr;else{y=Wr;var b=Hr}else!(c=s.nodeName)||"input"!==c.toLowerCase()||"checkbox"!==s.type&&"radio"!==s.type?n&&Et(n.elementType)&&(y=Ir):y=Vr;switch(y&&(y=y(e,n))?Nr(i,y,r,o):(b&&b(e,s,n),"focusout"===e&&n&&"number"===s.type&&null!=n.memoizedProps.value&&bt(s,"number",s.value)),b=n?qe(n):window,e){case"focusin":(zr(b)||"true"===b.contentEditable)&&(rn=b,nn=n,on=null);break;case"focusout":on=nn=rn=null;break;case"mousedown":an=!0;break;case"contextmenu":case"mouseup":case"dragend":an=!1,sn(i,r,o);break;case"selectionchange":if(tn)break;case"keydown":case"keyup":sn(i,r,o)}var v;if(wr)e:{switch(e){case"compositionstart":var x="onCompositionStart";break e;case"compositionend":x="onCompositionEnd";break e;case"compositionupdate":x="onCompositionUpdate";break e}x=void 0}else Rr?Cr(e,r)&&(x="onCompositionEnd"):"keydown"===e&&229===r.keyCode&&(x="onCompositionStart");x&&(jr&&"ko"!==r.locale&&(Rr||"onCompositionStart"!==x?"onCompositionEnd"===x&&Rr&&(v=Ht()):(Ut="value"in(Bt=o)?Bt.value:Bt.textContent,Rr=!0)),0<(b=Hu(n,x)).length&&(x=new lr(x,e,null,r,o),i.push({event:x,listeners:b}),v?x.data=v:null!==(v=Tr(r))&&(x.data=v))),(v=Sr?function(e,t){switch(e){case"compositionend":return Tr(t);case"keypress":return 32!==t.which?null:(Er=!0,_r);case"textInput":return(e=t.data)===_r&&Er?null:e;default:return null}}(e,r):function(e,t){if(Rr)return"compositionend"===e||!wr&&Cr(e,t)?(e=Ht(),qt=Ut=Bt=null,Rr=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return jr&&"ko"!==t.locale?null:t.data}}(e,r))&&(0<(x=Hu(n,"onBeforeInput")).length&&(b=new lr("onBeforeInput","beforeinput",null,r,o),i.push({event:b,listeners:x}),b.data=v)),function(e,t,r,n,o){if("submit"===t&&r&&r.stateNode===o){var a=Pu((o[Oe]||null).action),i=n.submitter;i&&null!==(t=(t=i[Oe]||null)?Pu(t.formAction):i.getAttribute("formAction"))&&(a=t,i=null);var s=new Zt("action","action",null,n,o);e.push({event:s,listeners:[{instance:null,listener:function(){if(n.defaultPrevented){if(0!==wu){var e=i?zu(o,i):new FormData(o);zi(r,{pending:!0,data:e,method:o.method,action:a},null,e)}}else"function"===typeof a&&(s.preventDefault(),e=i?zu(o,i):new FormData(o),zi(r,{pending:!0,data:e,method:o.method,action:a},a,e))},currentTarget:o}]})}}(i,e,n,r,o)}Du(i,t)})}function qu(e,t,r){return{instance:e,listener:t,currentTarget:r}}function Hu(e,t){for(var r=t+"Capture",n=[];null!==e;){var o=e,a=o.stateNode;if(5!==(o=o.tag)&&26!==o&&27!==o||null===a||(null!=(o=It(e,r))&&n.unshift(qu(e,o,a)),null!=(o=It(e,t))&&n.push(qu(e,o,a))),3===e.tag)return n;e=e.return}return[]}function Wu(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag&&27!==e.tag);return e||null}function Vu(e,t,r,n,o){for(var a=t._reactName,i=[];null!==r&&r!==n;){var s=r,l=s.alternate,c=s.stateNode;if(s=s.tag,null!==l&&l===n)break;5!==s&&26!==s&&27!==s||null===c||(l=c,o?null!=(c=It(r,a))&&i.unshift(qu(r,c,l)):o||null!=(c=It(r,a))&&i.push(qu(r,c,l))),r=r.return}0!==i.length&&e.push({event:t,listeners:i})}var Yu=/\r\n?/g,Ku=/\u0000|\uFFFD/g;function Qu(e){return("string"===typeof e?e:""+e).replace(Yu,"\n").replace(Ku,"")}function Xu(e,t){return t=Qu(t),Qu(e)===t}function Gu(){}function Ju(e,t,r,n,o,a){switch(r){case"children":"string"===typeof n?"body"===t||"textarea"===t&&""===n||kt(e,n):("number"===typeof n||"bigint"===typeof n)&&"body"!==t&&kt(e,""+n);break;case"className":rt(e,"class",n);break;case"tabIndex":rt(e,"tabindex",n);break;case"dir":case"role":case"viewBox":case"width":case"height":rt(e,r,n);break;case"style":_t(e,n,a);break;case"data":if("object"!==t){rt(e,"data",n);break}case"src":case"href":if(""===n&&("a"!==t||"href"!==r)){e.removeAttribute(r);break}if(null==n||"function"===typeof n||"symbol"===typeof n||"boolean"===typeof n){e.removeAttribute(r);break}n=Rt(""+n),e.setAttribute(r,n);break;case"action":case"formAction":if("function"===typeof n){e.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}if("function"===typeof a&&("formAction"===r?("input"!==t&&Ju(e,t,"name",o.name,o,null),Ju(e,t,"formEncType",o.formEncType,o,null),Ju(e,t,"formMethod",o.formMethod,o,null),Ju(e,t,"formTarget",o.formTarget,o,null)):(Ju(e,t,"encType",o.encType,o,null),Ju(e,t,"method",o.method,o,null),Ju(e,t,"target",o.target,o,null))),null==n||"symbol"===typeof n||"boolean"===typeof n){e.removeAttribute(r);break}n=Rt(""+n),e.setAttribute(r,n);break;case"onClick":null!=n&&(e.onclick=Gu);break;case"onScroll":null!=n&&Iu("scroll",e);break;case"onScrollEnd":null!=n&&Iu("scrollend",e);break;case"dangerouslySetInnerHTML":if(null!=n){if("object"!==typeof n||!("__html"in n))throw Error(i(61));if(null!=(r=n.__html)){if(null!=o.children)throw Error(i(60));e.innerHTML=r}}break;case"multiple":e.multiple=n&&"function"!==typeof n&&"symbol"!==typeof n;break;case"muted":e.muted=n&&"function"!==typeof n&&"symbol"!==typeof n;break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":case"autoFocus":break;case"xlinkHref":if(null==n||"function"===typeof n||"boolean"===typeof n||"symbol"===typeof n){e.removeAttribute("xlink:href");break}r=Rt(""+n),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":null!=n&&"function"!==typeof n&&"symbol"!==typeof n?e.setAttribute(r,""+n):e.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":n&&"function"!==typeof n&&"symbol"!==typeof n?e.setAttribute(r,""):e.removeAttribute(r);break;case"capture":case"download":!0===n?e.setAttribute(r,""):!1!==n&&null!=n&&"function"!==typeof n&&"symbol"!==typeof n?e.setAttribute(r,n):e.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":null!=n&&"function"!==typeof n&&"symbol"!==typeof n&&!isNaN(n)&&1<=n?e.setAttribute(r,n):e.removeAttribute(r);break;case"rowSpan":case"start":null==n||"function"===typeof n||"symbol"===typeof n||isNaN(n)?e.removeAttribute(r):e.setAttribute(r,n);break;case"popover":Iu("beforetoggle",e),Iu("toggle",e),tt(e,"popover",n);break;case"xlinkActuate":nt(e,"http://www.w3.org/1999/xlink","xlink:actuate",n);break;case"xlinkArcrole":nt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",n);break;case"xlinkRole":nt(e,"http://www.w3.org/1999/xlink","xlink:role",n);break;case"xlinkShow":nt(e,"http://www.w3.org/1999/xlink","xlink:show",n);break;case"xlinkTitle":nt(e,"http://www.w3.org/1999/xlink","xlink:title",n);break;case"xlinkType":nt(e,"http://www.w3.org/1999/xlink","xlink:type",n);break;case"xmlBase":nt(e,"http://www.w3.org/XML/1998/namespace","xml:base",n);break;case"xmlLang":nt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",n);break;case"xmlSpace":nt(e,"http://www.w3.org/XML/1998/namespace","xml:space",n);break;case"is":tt(e,"is",n);break;case"innerText":case"textContent":break;default:(!(2<r.length)||"o"!==r[0]&&"O"!==r[0]||"n"!==r[1]&&"N"!==r[1])&&tt(e,r=Ct.get(r)||r,n)}}function Zu(e,t,r,n,o,a){switch(r){case"style":_t(e,n,a);break;case"dangerouslySetInnerHTML":if(null!=n){if("object"!==typeof n||!("__html"in n))throw Error(i(61));if(null!=(r=n.__html)){if(null!=o.children)throw Error(i(60));e.innerHTML=r}}break;case"children":"string"===typeof n?kt(e,n):("number"===typeof n||"bigint"===typeof n)&&kt(e,""+n);break;case"onScroll":null!=n&&Iu("scroll",e);break;case"onScrollEnd":null!=n&&Iu("scrollend",e);break;case"onClick":null!=n&&(e.onclick=Gu);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":case"innerText":case"textContent":break;default:Ye.hasOwnProperty(r)||("o"!==r[0]||"n"!==r[1]||(o=r.endsWith("Capture"),t=r.slice(2,o?r.length-7:void 0),"function"===typeof(a=null!=(a=e[Oe]||null)?a[r]:null)&&e.removeEventListener(t,a,o),"function"!==typeof n)?r in e?e[r]=n:!0===n?e.setAttribute(r,""):tt(e,r,n):("function"!==typeof a&&null!==a&&(r in e?e[r]=null:e.hasAttribute(r)&&e.removeAttribute(r)),e.addEventListener(t,n,o)))}}function ed(e,t,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Iu("error",e),Iu("load",e);var n,o=!1,a=!1;for(n in r)if(r.hasOwnProperty(n)){var s=r[n];if(null!=s)switch(n){case"src":o=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(i(137,t));default:Ju(e,t,n,s,r,null)}}return a&&Ju(e,t,"srcSet",r.srcSet,r,null),void(o&&Ju(e,t,"src",r.src,r,null));case"input":Iu("invalid",e);var l=n=s=a=null,c=null,u=null;for(o in r)if(r.hasOwnProperty(o)){var d=r[o];if(null!=d)switch(o){case"name":a=d;break;case"type":s=d;break;case"checked":c=d;break;case"defaultChecked":u=d;break;case"value":n=d;break;case"defaultValue":l=d;break;case"children":case"dangerouslySetInnerHTML":if(null!=d)throw Error(i(137,t));break;default:Ju(e,t,o,d,r,null)}}return yt(e,n,l,c,u,s,a,!1),void dt(e);case"select":for(a in Iu("invalid",e),o=s=n=null,r)if(r.hasOwnProperty(a)&&null!=(l=r[a]))switch(a){case"value":n=l;break;case"defaultValue":s=l;break;case"multiple":o=l;default:Ju(e,t,a,l,r,null)}return t=n,r=s,e.multiple=!!o,void(null!=t?vt(e,!!o,t,!1):null!=r&&vt(e,!!o,r,!0));case"textarea":for(s in Iu("invalid",e),n=a=o=null,r)if(r.hasOwnProperty(s)&&null!=(l=r[s]))switch(s){case"value":o=l;break;case"defaultValue":a=l;break;case"children":n=l;break;case"dangerouslySetInnerHTML":if(null!=l)throw Error(i(91));break;default:Ju(e,t,s,l,r,null)}return wt(e,o,a,n),void dt(e);case"option":for(c in r)if(r.hasOwnProperty(c)&&null!=(o=r[c]))if("selected"===c)e.selected=o&&"function"!==typeof o&&"symbol"!==typeof o;else Ju(e,t,c,o,r,null);return;case"dialog":Iu("beforetoggle",e),Iu("toggle",e),Iu("cancel",e),Iu("close",e);break;case"iframe":case"object":Iu("load",e);break;case"video":case"audio":for(o=0;o<Au.length;o++)Iu(Au[o],e);break;case"image":Iu("error",e),Iu("load",e);break;case"details":Iu("toggle",e);break;case"embed":case"source":case"link":Iu("error",e),Iu("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(u in r)if(r.hasOwnProperty(u)&&null!=(o=r[u]))switch(u){case"children":case"dangerouslySetInnerHTML":throw Error(i(137,t));default:Ju(e,t,u,o,r,null)}return;default:if(Et(t)){for(d in r)r.hasOwnProperty(d)&&(void 0!==(o=r[d])&&Zu(e,t,d,o,r,void 0));return}}for(l in r)r.hasOwnProperty(l)&&(null!=(o=r[l])&&Ju(e,t,l,o,r,null))}var td=null,rd=null;function nd(e){return 9===e.nodeType?e:e.ownerDocument}function od(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function ad(e,t){if(0===e)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return 1===e&&"foreignObject"===t?0:e}function id(e,t){return"textarea"===e||"noscript"===e||"string"===typeof t.children||"number"===typeof t.children||"bigint"===typeof t.children||"object"===typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var sd=null;var ld="function"===typeof setTimeout?setTimeout:void 0,cd="function"===typeof clearTimeout?clearTimeout:void 0,ud="function"===typeof Promise?Promise:void 0,dd="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof ud?function(e){return ud.resolve(null).then(e).catch(fd)}:ld;function fd(e){setTimeout(function(){throw e})}function pd(e){return"head"===e}function hd(e,t){var r=t,n=0,o=0;do{var a=r.nextSibling;if(e.removeChild(r),a&&8===a.nodeType)if("/$"===(r=a.data)){if(0<n&&8>n){r=n;var i=e.ownerDocument;if(1&r&&wd(i.documentElement),2&r&&wd(i.body),4&r)for(wd(r=i.head),i=r.firstChild;i;){var s=i.nextSibling,l=i.nodeName;i[Fe]||"SCRIPT"===l||"STYLE"===l||"LINK"===l&&"stylesheet"===i.rel.toLowerCase()||r.removeChild(i),i=s}}if(0===o)return e.removeChild(a),void Tf(t);o--}else"$"===r||"$?"===r||"$!"===r?o++:n=r.charCodeAt(0)-48;else n=0;r=a}while(r);Tf(t)}function md(e){var t=e.firstChild;for(t&&10===t.nodeType&&(t=t.nextSibling);t;){var r=t;switch(t=t.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":md(r),Me(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if("stylesheet"===r.rel.toLowerCase())continue}e.removeChild(r)}}function gd(e){return"$!"===e.data||"$?"===e.data&&"complete"===e.ownerDocument.readyState}function yd(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t||"F!"===t||"F"===t)break;if("/$"===t)return null}}return e}var bd=null;function vd(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var r=e.data;if("$"===r||"$!"===r||"$?"===r){if(0===t)return e;t--}else"/$"===r&&t++}e=e.previousSibling}return null}function xd(e,t,r){switch(t=nd(r),e){case"html":if(!(e=t.documentElement))throw Error(i(452));return e;case"head":if(!(e=t.head))throw Error(i(453));return e;case"body":if(!(e=t.body))throw Error(i(454));return e;default:throw Error(i(451))}}function wd(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Me(e)}var kd=new Map,Sd=new Set;function jd(e){return"function"===typeof e.getRootNode?e.getRootNode():9===e.nodeType?e:e.ownerDocument}var _d=L.d;L.d={f:function(){var e=_d.f(),t=Bc();return e||t},r:function(e){var t=Ue(e);null!==t&&5===t.tag&&"form"===t.type?Oi(t):_d.r(e)},D:function(e){_d.D(e),Cd("dns-prefetch",e,null)},C:function(e,t){_d.C(e,t),Cd("preconnect",e,t)},L:function(e,t,r){_d.L(e,t,r);var n=Ed;if(n&&e&&t){var o='link[rel="preload"][as="'+mt(t)+'"]';"image"===t&&r&&r.imageSrcSet?(o+='[imagesrcset="'+mt(r.imageSrcSet)+'"]',"string"===typeof r.imageSizes&&(o+='[imagesizes="'+mt(r.imageSizes)+'"]')):o+='[href="'+mt(e)+'"]';var a=o;switch(t){case"style":a=Rd(e);break;case"script":a=Nd(e)}kd.has(a)||(e=f({rel:"preload",href:"image"===t&&r&&r.imageSrcSet?void 0:e,as:t},r),kd.set(a,e),null!==n.querySelector(o)||"style"===t&&n.querySelector(Pd(a))||"script"===t&&n.querySelector(Od(a))||(ed(t=n.createElement("link"),"link",e),We(t),n.head.appendChild(t)))}},m:function(e,t){_d.m(e,t);var r=Ed;if(r&&e){var n=t&&"string"===typeof t.as?t.as:"script",o='link[rel="modulepreload"][as="'+mt(n)+'"][href="'+mt(e)+'"]',a=o;switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":a=Nd(e)}if(!kd.has(a)&&(e=f({rel:"modulepreload",href:e},t),kd.set(a,e),null===r.querySelector(o))){switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector(Od(a)))return}ed(n=r.createElement("link"),"link",e),We(n),r.head.appendChild(n)}}},X:function(e,t){_d.X(e,t);var r=Ed;if(r&&e){var n=He(r).hoistableScripts,o=Nd(e),a=n.get(o);a||((a=r.querySelector(Od(o)))||(e=f({src:e,async:!0},t),(t=kd.get(o))&&Id(e,t),We(a=r.createElement("script")),ed(a,"link",e),r.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},n.set(o,a))}},S:function(e,t,r){_d.S(e,t,r);var n=Ed;if(n&&e){var o=He(n).hoistableStyles,a=Rd(e);t=t||"default";var i=o.get(a);if(!i){var s={loading:0,preload:null};if(i=n.querySelector(Pd(a)))s.loading=5;else{e=f({rel:"stylesheet",href:e,"data-precedence":t},r),(r=kd.get(a))&&Dd(e,r);var l=i=n.createElement("link");We(l),ed(l,"link",e),l._p=new Promise(function(e,t){l.onload=e,l.onerror=t}),l.addEventListener("load",function(){s.loading|=1}),l.addEventListener("error",function(){s.loading|=2}),s.loading|=4,Ld(i,t,n)}i={type:"stylesheet",instance:i,count:1,state:s},o.set(a,i)}}},M:function(e,t){_d.M(e,t);var r=Ed;if(r&&e){var n=He(r).hoistableScripts,o=Nd(e),a=n.get(o);a||((a=r.querySelector(Od(o)))||(e=f({src:e,async:!0,type:"module"},t),(t=kd.get(o))&&Id(e,t),We(a=r.createElement("script")),ed(a,"link",e),r.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},n.set(o,a))}}};var Ed="undefined"===typeof document?null:document;function Cd(e,t,r){var n=Ed;if(n&&"string"===typeof t&&t){var o=mt(t);o='link[rel="'+e+'"][href="'+o+'"]',"string"===typeof r&&(o+='[crossorigin="'+r+'"]'),Sd.has(o)||(Sd.add(o),e={rel:e,crossOrigin:r,href:t},null===n.querySelector(o)&&(ed(t=n.createElement("link"),"link",e),We(t),n.head.appendChild(t)))}}function Td(e,t,r,n){var o,a,s,l,c=(c=H.current)?jd(c):null;if(!c)throw Error(i(446));switch(e){case"meta":case"title":return null;case"style":return"string"===typeof r.precedence&&"string"===typeof r.href?(t=Rd(r.href),(n=(r=He(c).hoistableStyles).get(t))||(n={type:"style",instance:null,count:0,state:null},r.set(t,n)),n):{type:"void",instance:null,count:0,state:null};case"link":if("stylesheet"===r.rel&&"string"===typeof r.href&&"string"===typeof r.precedence){e=Rd(r.href);var u=He(c).hoistableStyles,d=u.get(e);if(d||(c=c.ownerDocument||c,d={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},u.set(e,d),(u=c.querySelector(Pd(e)))&&!u._p&&(d.instance=u,d.state.loading=5),kd.has(e)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},kd.set(e,r),u||(o=c,a=e,s=r,l=d.state,o.querySelector('link[rel="preload"][as="style"]['+a+"]")?l.loading=1:(a=o.createElement("link"),l.preload=a,a.addEventListener("load",function(){return l.loading|=1}),a.addEventListener("error",function(){return l.loading|=2}),ed(a,"link",s),We(a),o.head.appendChild(a))))),t&&null===n)throw Error(i(528,""));return d}if(t&&null!==n)throw Error(i(529,""));return null;case"script":return t=r.async,"string"===typeof(r=r.src)&&t&&"function"!==typeof t&&"symbol"!==typeof t?(t=Nd(r),(n=(r=He(c).hoistableScripts).get(t))||(n={type:"script",instance:null,count:0,state:null},r.set(t,n)),n):{type:"void",instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Rd(e){return'href="'+mt(e)+'"'}function Pd(e){return'link[rel="stylesheet"]['+e+"]"}function zd(e){return f({},e,{"data-precedence":e.precedence,precedence:null})}function Nd(e){return'[src="'+mt(e)+'"]'}function Od(e){return"script[async]"+e}function Ad(e,t,r){if(t.count++,null===t.instance)switch(t.type){case"style":var n=e.querySelector('style[data-href~="'+mt(r.href)+'"]');if(n)return t.instance=n,We(n),n;var o=f({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return We(n=(e.ownerDocument||e).createElement("style")),ed(n,"style",o),Ld(n,r.precedence,e),t.instance=n;case"stylesheet":o=Rd(r.href);var a=e.querySelector(Pd(o));if(a)return t.state.loading|=4,t.instance=a,We(a),a;n=zd(r),(o=kd.get(o))&&Dd(n,o),We(a=(e.ownerDocument||e).createElement("link"));var s=a;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),ed(a,"link",n),t.state.loading|=4,Ld(a,r.precedence,e),t.instance=a;case"script":return a=Nd(r.src),(o=e.querySelector(Od(a)))?(t.instance=o,We(o),o):(n=r,(o=kd.get(a))&&Id(n=f({},r),o),We(o=(e=e.ownerDocument||e).createElement("script")),ed(o,"link",n),e.head.appendChild(o),t.instance=o);case"void":return null;default:throw Error(i(443,t.type))}else"stylesheet"===t.type&&0===(4&t.state.loading)&&(n=t.instance,t.state.loading|=4,Ld(n,r.precedence,e));return t.instance}function Ld(e,t,r){for(var n=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),o=n.length?n[n.length-1]:null,a=o,i=0;i<n.length;i++){var s=n[i];if(s.dataset.precedence===t)a=s;else if(a!==o)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=9===r.nodeType?r.head:r).insertBefore(e,t.firstChild)}function Dd(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.title&&(e.title=t.title)}function Id(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.integrity&&(e.integrity=t.integrity)}var $d=null;function Fd(e,t,r){if(null===$d){var n=new Map,o=$d=new Map;o.set(r,n)}else(n=(o=$d).get(r))||(n=new Map,o.set(r,n));if(n.has(e))return n;for(n.set(e,null),r=r.getElementsByTagName(e),o=0;o<r.length;o++){var a=r[o];if(!(a[Fe]||a[Ne]||"link"===e&&"stylesheet"===a.getAttribute("rel"))&&"http://www.w3.org/2000/svg"!==a.namespaceURI){var i=a.getAttribute(t)||"";i=e+i;var s=n.get(i);s?s.push(a):n.set(i,[a])}}return n}function Md(e,t,r){(e=e.ownerDocument||e).head.insertBefore(r,"title"===t?e.querySelector("head > title"):null)}function Bd(e){return"stylesheet"!==e.type||0!==(3&e.state.loading)}var Ud=null;function qd(){}function Hd(){if(this.count--,0===this.count)if(this.stylesheets)Vd(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}var Wd=null;function Vd(e,t){e.stylesheets=null,null!==e.unsuspend&&(e.count++,Wd=new Map,t.forEach(Yd,e),Wd=null,Hd.call(e))}function Yd(e,t){if(!(4&t.state.loading)){var r=Wd.get(e);if(r)var n=r.get(null);else{r=new Map,Wd.set(e,r);for(var o=e.querySelectorAll("link[data-precedence],style[data-precedence]"),a=0;a<o.length;a++){var i=o[a];"LINK"!==i.nodeName&&"not all"===i.getAttribute("media")||(r.set(i.dataset.precedence,i),n=i)}n&&r.set(null,n)}i=(o=t.instance).getAttribute("data-precedence"),(a=r.get(i)||n)===n&&r.set(null,o),r.set(i,o),this.count++,n=Hd.bind(this),o.addEventListener("load",n),o.addEventListener("error",n),a?a.parentNode.insertBefore(o,a.nextSibling):(e=9===e.nodeType?e.head:e).insertBefore(o,e.firstChild),t.state.loading|=4}}var Kd={$$typeof:w,Provider:null,Consumer:null,_currentValue:D,_currentValue2:D,_threadCount:0};function Qd(e,t,r,n,o,a,i,s){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=je(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=je(0),this.hiddenUpdates=je(null),this.identifierPrefix=n,this.onUncaughtError=o,this.onCaughtError=a,this.onRecoverableError=i,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.incompleteTransitions=new Map}function Xd(e,t,r,n,o,a,i,s,l,c,u,d){return e=new Qd(e,t,r,i,s,l,c,d),t=1,!0===a&&(t|=24),a=Dn(3,null,null,t),e.current=a,a.stateNode=e,(t=Ao()).refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:n,isDehydrated:r,cache:t},na(a),e}function Gd(e){return e?e=An:An}function Jd(e,t,r,n,o,a){o=Gd(o),null===n.context?n.context=o:n.pendingContext=o,(n=aa(t)).payload={element:r},null!==(a=void 0===a?null:a)&&(n.callback=a),null!==(r=ia(e,n,t))&&(Dc(r,0,t),sa(r,e,t))}function Zd(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var r=e.retryLane;e.retryLane=0!==r&&r<t?r:t}}function ef(e,t){Zd(e,t),(e=e.alternate)&&Zd(e,t)}function tf(e){if(13===e.tag){var t=zn(e,67108864);null!==t&&Dc(t,0,67108864),ef(e,67108864)}}var rf=!0;function nf(e,t,r,n){var o=A.T;A.T=null;var a=L.p;try{L.p=2,af(e,t,r,n)}finally{L.p=a,A.T=o}}function of(e,t,r,n){var o=A.T;A.T=null;var a=L.p;try{L.p=8,af(e,t,r,n)}finally{L.p=a,A.T=o}}function af(e,t,r,n){if(rf){var o=sf(n);if(null===o)Uu(e,t,n,lf,r),vf(e,n);else if(function(e,t,r,n,o){switch(t){case"focusin":return ff=xf(ff,e,t,r,n,o),!0;case"dragenter":return pf=xf(pf,e,t,r,n,o),!0;case"mouseover":return hf=xf(hf,e,t,r,n,o),!0;case"pointerover":var a=o.pointerId;return mf.set(a,xf(mf.get(a)||null,e,t,r,n,o)),!0;case"gotpointercapture":return a=o.pointerId,gf.set(a,xf(gf.get(a)||null,e,t,r,n,o)),!0}return!1}(o,e,t,r,n))n.stopPropagation();else if(vf(e,n),4&t&&-1<bf.indexOf(e)){for(;null!==o;){var a=Ue(o);if(null!==a)switch(a.tag){case 3:if((a=a.stateNode).current.memoizedState.isDehydrated){var i=be(a.pendingLanes);if(0!==i){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;i;){var l=1<<31-pe(i);s.entanglements[1]|=l,i&=~l}ku(a),0===(6&rc)&&(kc=te()+500,Su(0,!1))}}break;case 13:null!==(s=zn(a,2))&&Dc(s,0,2),Bc(),ef(a,2)}if(null===(a=sf(n))&&Uu(e,t,n,lf,r),a===o)break;o=a}null!==o&&n.stopPropagation()}else Uu(e,t,n,null,r)}}function sf(e){return cf(e=zt(e))}var lf=null;function cf(e){if(lf=null,null!==(e=Be(e))){var t=l(e);if(null===t)e=null;else{var r=t.tag;if(13===r){if(null!==(e=c(t)))return e;e=null}else if(3===r){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return lf=e,null}function uf(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(re()){case ne:return 2;case oe:return 8;case ae:case ie:return 32;case se:return 268435456;default:return 32}default:return 32}}var df=!1,ff=null,pf=null,hf=null,mf=new Map,gf=new Map,yf=[],bf="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function vf(e,t){switch(e){case"focusin":case"focusout":ff=null;break;case"dragenter":case"dragleave":pf=null;break;case"mouseover":case"mouseout":hf=null;break;case"pointerover":case"pointerout":mf.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":gf.delete(t.pointerId)}}function xf(e,t,r,n,o,a){return null===e||e.nativeEvent!==a?(e={blockedOn:t,domEventName:r,eventSystemFlags:n,nativeEvent:a,targetContainers:[o]},null!==t&&(null!==(t=Ue(t))&&tf(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,null!==o&&-1===t.indexOf(o)&&t.push(o),e)}function wf(e){var t=Be(e.target);if(null!==t){var r=l(t);if(null!==r)if(13===(t=r.tag)){if(null!==(t=c(r)))return e.blockedOn=t,void function(e,t){var r=L.p;try{return L.p=e,t()}finally{L.p=r}}(e.priority,function(){if(13===r.tag){var e=Ac();e=Te(e);var t=zn(r,e);null!==t&&Dc(t,0,e),ef(r,e)}})}else if(3===t&&r.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===r.tag?r.stateNode.containerInfo:null)}e.blockedOn=null}function kf(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var r=sf(e.nativeEvent);if(null!==r)return null!==(t=Ue(r))&&tf(t),e.blockedOn=r,!1;var n=new(r=e.nativeEvent).constructor(r.type,r);Pt=n,r.target.dispatchEvent(n),Pt=null,t.shift()}return!0}function Sf(e,t,r){kf(e)&&r.delete(t)}function jf(){df=!1,null!==ff&&kf(ff)&&(ff=null),null!==pf&&kf(pf)&&(pf=null),null!==hf&&kf(hf)&&(hf=null),mf.forEach(Sf),gf.forEach(Sf)}function _f(e,t){e.blockedOn===t&&(e.blockedOn=null,df||(df=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,jf)))}var Ef=null;function Cf(e){Ef!==e&&(Ef=e,n.unstable_scheduleCallback(n.unstable_NormalPriority,function(){Ef===e&&(Ef=null);for(var t=0;t<e.length;t+=3){var r=e[t],n=e[t+1],o=e[t+2];if("function"!==typeof n){if(null===cf(n||r))continue;break}var a=Ue(r);null!==a&&(e.splice(t,3),t-=3,zi(a,{pending:!0,data:o,method:r.method,action:n},n,o))}}))}function Tf(e){function t(t){return _f(t,e)}null!==ff&&_f(ff,e),null!==pf&&_f(pf,e),null!==hf&&_f(hf,e),mf.forEach(t),gf.forEach(t);for(var r=0;r<yf.length;r++){var n=yf[r];n.blockedOn===e&&(n.blockedOn=null)}for(;0<yf.length&&null===(r=yf[0]).blockedOn;)wf(r),null===r.blockedOn&&yf.shift();if(null!=(r=(e.ownerDocument||e).$$reactFormReplay))for(n=0;n<r.length;n+=3){var o=r[n],a=r[n+1],i=o[Oe]||null;if("function"===typeof a)i||Cf(r);else if(i){var s=null;if(a&&a.hasAttribute("formAction")){if(o=a,i=a[Oe]||null)s=i.formAction;else if(null!==cf(o))continue}else s=i.action;"function"===typeof s?r[n+1]=s:(r.splice(n,3),n-=3),Cf(r)}}}function Rf(e){this._internalRoot=e}function Pf(e){this._internalRoot=e}Pf.prototype.render=Rf.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error(i(409));Jd(t.current,Ac(),e,t,null,null)},Pf.prototype.unmount=Rf.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;Jd(e.current,2,null,e,null,null),Bc(),t[Ae]=null}},Pf.prototype.unstable_scheduleHydration=function(e){if(e){var t=Pe();e={blockedOn:null,target:e,priority:t};for(var r=0;r<yf.length&&0!==t&&t<yf[r].priority;r++);yf.splice(r,0,e),0===r&&wf(e)}};var zf=o.version;if("19.1.1"!==zf)throw Error(i(527,zf,"19.1.1"));L.findDOMNode=function(e){var t=e._reactInternals;if(void 0===t){if("function"===typeof e.render)throw Error(i(188));throw e=Object.keys(e).join(","),Error(i(268,e))}return e=function(e){var t=e.alternate;if(!t){if(null===(t=l(e)))throw Error(i(188));return t!==e?null:e}for(var r=e,n=t;;){var o=r.return;if(null===o)break;var a=o.alternate;if(null===a){if(null!==(n=o.return)){r=n;continue}break}if(o.child===a.child){for(a=o.child;a;){if(a===r)return u(o),e;if(a===n)return u(o),t;a=a.sibling}throw Error(i(188))}if(r.return!==n.return)r=o,n=a;else{for(var s=!1,c=o.child;c;){if(c===r){s=!0,r=o,n=a;break}if(c===n){s=!0,n=o,r=a;break}c=c.sibling}if(!s){for(c=a.child;c;){if(c===r){s=!0,r=a,n=o;break}if(c===n){s=!0,n=a,r=o;break}c=c.sibling}if(!s)throw Error(i(189))}}if(r.alternate!==n)throw Error(i(190))}if(3!==r.tag)throw Error(i(188));return r.stateNode.current===r?e:t}(t),e=null===(e=null!==e?d(e):null)?null:e.stateNode};var Nf={bundleType:0,version:"19.1.1",rendererPackageName:"react-dom",currentDispatcherRef:A,reconcilerVersion:"19.1.1"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var Of=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Of.isDisabled&&Of.supportsFiber)try{ue=Of.inject(Nf),de=Of}catch(Lf){}}t.createRoot=function(e,t){if(!s(e))throw Error(i(299));var r=!1,n="",o=bs,a=vs,l=xs;return null!==t&&void 0!==t&&(!0===t.unstable_strictMode&&(r=!0),void 0!==t.identifierPrefix&&(n=t.identifierPrefix),void 0!==t.onUncaughtError&&(o=t.onUncaughtError),void 0!==t.onCaughtError&&(a=t.onCaughtError),void 0!==t.onRecoverableError&&(l=t.onRecoverableError),void 0!==t.unstable_transitionCallbacks&&t.unstable_transitionCallbacks),t=Xd(e,1,!1,null,0,r,n,o,a,l,0,null),e[Ae]=t.current,Mu(e),new Rf(t)},t.hydrateRoot=function(e,t,r){if(!s(e))throw Error(i(299));var n=!1,o="",a=bs,l=vs,c=xs,u=null;return null!==r&&void 0!==r&&(!0===r.unstable_strictMode&&(n=!0),void 0!==r.identifierPrefix&&(o=r.identifierPrefix),void 0!==r.onUncaughtError&&(a=r.onUncaughtError),void 0!==r.onCaughtError&&(l=r.onCaughtError),void 0!==r.onRecoverableError&&(c=r.onRecoverableError),void 0!==r.unstable_transitionCallbacks&&r.unstable_transitionCallbacks,void 0!==r.formState&&(u=r.formState)),(t=Xd(e,1,!0,t,0,n,o,a,l,c,0,u)).context=Gd(null),r=t.current,(o=aa(n=Te(n=Ac()))).callback=null,ia(r,o,n),r=n,t.current.lanes=r,_e(t,r),ku(t),e[Ae]=t.current,Mu(e),new Pf(t)},t.version="19.1.1"},43:(e,t,r)=>{"use strict";e.exports=r(288)},288:(e,t)=>{"use strict";var r=Symbol.for("react.transitional.element"),n=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler"),s=Symbol.for("react.consumer"),l=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),p=Symbol.iterator;var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m=Object.assign,g={};function y(e,t,r){this.props=e,this.context=t,this.refs=g,this.updater=r||h}function b(){}function v(e,t,r){this.props=e,this.context=t,this.refs=g,this.updater=r||h}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if("object"!==typeof e&&"function"!==typeof e&&null!=e)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},b.prototype=y.prototype;var x=v.prototype=new b;x.constructor=v,m(x,y.prototype),x.isPureReactComponent=!0;var w=Array.isArray,k={H:null,A:null,T:null,S:null,V:null},S=Object.prototype.hasOwnProperty;function j(e,t,n,o,a,i){return n=i.ref,{$$typeof:r,type:e,key:t,ref:void 0!==n?n:null,props:i}}function _(e){return"object"===typeof e&&null!==e&&e.$$typeof===r}var E=/\/+/g;function C(e,t){return"object"===typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(e){return t[e]})}(""+e.key):t.toString(36)}function T(){}function R(e,t,o,a,i){var s=typeof e;"undefined"!==s&&"boolean"!==s||(e=null);var l,c,u=!1;if(null===e)u=!0;else switch(s){case"bigint":case"string":case"number":u=!0;break;case"object":switch(e.$$typeof){case r:case n:u=!0;break;case f:return R((u=e._init)(e._payload),t,o,a,i)}}if(u)return i=i(e),u=""===a?"."+C(e,0):a,w(i)?(o="",null!=u&&(o=u.replace(E,"$&/")+"/"),R(i,t,o,"",function(e){return e})):null!=i&&(_(i)&&(l=i,c=o+(null==i.key||e&&e.key===i.key?"":(""+i.key).replace(E,"$&/")+"/")+u,i=j(l.type,c,void 0,0,0,l.props)),t.push(i)),1;u=0;var d,h=""===a?".":a+":";if(w(e))for(var m=0;m<e.length;m++)u+=R(a=e[m],t,o,s=h+C(a,m),i);else if("function"===typeof(m=null===(d=e)||"object"!==typeof d?null:"function"===typeof(d=p&&d[p]||d["@@iterator"])?d:null))for(e=m.call(e),m=0;!(a=e.next()).done;)u+=R(a=a.value,t,o,s=h+C(a,m++),i);else if("object"===s){if("function"===typeof e.then)return R(function(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch("string"===typeof e.status?e.then(T,T):(e.status="pending",e.then(function(t){"pending"===e.status&&(e.status="fulfilled",e.value=t)},function(t){"pending"===e.status&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}(e),t,o,a,i);throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return u}function P(e,t,r){if(null==e)return e;var n=[],o=0;return R(e,n,"","",function(e){return t.call(r,e,o++)}),n}function z(e){if(-1===e._status){var t=e._result;(t=t()).then(function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)},function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)}),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var N="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)};function O(){}t.Children={map:P,forEach:function(e,t,r){P(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return P(e,function(){t++}),t},toArray:function(e){return P(e,function(e){return e})||[]},only:function(e){if(!_(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=y,t.Fragment=o,t.Profiler=i,t.PureComponent=v,t.StrictMode=a,t.Suspense=u,t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=k,t.__COMPILER_RUNTIME={__proto__:null,c:function(e){return k.H.useMemoCache(e)}},t.cache=function(e){return function(){return e.apply(null,arguments)}},t.cloneElement=function(e,t,r){if(null===e||void 0===e)throw Error("The argument must be a React element, but you passed "+e+".");var n=m({},e.props),o=e.key;if(null!=t)for(a in void 0!==t.ref&&void 0,void 0!==t.key&&(o=""+t.key),t)!S.call(t,a)||"key"===a||"__self"===a||"__source"===a||"ref"===a&&void 0===t.ref||(n[a]=t[a]);var a=arguments.length-2;if(1===a)n.children=r;else if(1<a){for(var i=Array(a),s=0;s<a;s++)i[s]=arguments[s+2];n.children=i}return j(e.type,o,void 0,0,0,n)},t.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider=e,e.Consumer={$$typeof:s,_context:e},e},t.createElement=function(e,t,r){var n,o={},a=null;if(null!=t)for(n in void 0!==t.key&&(a=""+t.key),t)S.call(t,n)&&"key"!==n&&"__self"!==n&&"__source"!==n&&(o[n]=t[n]);var i=arguments.length-2;if(1===i)o.children=r;else if(1<i){for(var s=Array(i),l=0;l<i;l++)s[l]=arguments[l+2];o.children=s}if(e&&e.defaultProps)for(n in i=e.defaultProps)void 0===o[n]&&(o[n]=i[n]);return j(e,a,void 0,0,0,o)},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=_,t.lazy=function(e){return{$$typeof:f,_payload:{_status:-1,_result:e},_init:z}},t.memo=function(e,t){return{$$typeof:d,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=k.T,r={};k.T=r;try{var n=e(),o=k.S;null!==o&&o(r,n),"object"===typeof n&&null!==n&&"function"===typeof n.then&&n.then(O,N)}catch(a){N(a)}finally{k.T=t}},t.unstable_useCacheRefresh=function(){return k.H.useCacheRefresh()},t.use=function(e){return k.H.use(e)},t.useActionState=function(e,t,r){return k.H.useActionState(e,t,r)},t.useCallback=function(e,t){return k.H.useCallback(e,t)},t.useContext=function(e){return k.H.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e,t){return k.H.useDeferredValue(e,t)},t.useEffect=function(e,t,r){var n=k.H;if("function"===typeof r)throw Error("useEffect CRUD overload is not enabled in this build of React.");return n.useEffect(e,t)},t.useId=function(){return k.H.useId()},t.useImperativeHandle=function(e,t,r){return k.H.useImperativeHandle(e,t,r)},t.useInsertionEffect=function(e,t){return k.H.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return k.H.useLayoutEffect(e,t)},t.useMemo=function(e,t){return k.H.useMemo(e,t)},t.useOptimistic=function(e,t){return k.H.useOptimistic(e,t)},t.useReducer=function(e,t,r){return k.H.useReducer(e,t,r)},t.useRef=function(e){return k.H.useRef(e)},t.useState=function(e){return k.H.useState(e)},t.useSyncExternalStore=function(e,t,r){return k.H.useSyncExternalStore(e,t,r)},t.useTransition=function(){return k.H.useTransition()},t.version="19.1.1"},324:e=>{e.exports=function(e,t,r,n){var o=r?r.call(n,e,t):void 0;if(void 0!==o)return!!o;if(e===t)return!0;if("object"!==typeof e||!e||"object"!==typeof t||!t)return!1;var a=Object.keys(e),i=Object.keys(t);if(a.length!==i.length)return!1;for(var s=Object.prototype.hasOwnProperty.bind(t),l=0;l<a.length;l++){var c=a[l];if(!s(c))return!1;var u=e[c],d=t[c];if(!1===(o=r?r.call(n,u,d,c):void 0)||void 0===o&&u!==d)return!1}return!0}},391:(e,t,r)=>{"use strict";!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=r(4)},579:(e,t,r)=>{"use strict";e.exports=r(799)},672:(e,t,r)=>{"use strict";var n=r(43);function o(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function a(){}var i={d:{f:a,r:function(){throw Error(o(522))},D:a,C:a,L:a,m:a,X:a,S:a,M:a},p:0,findDOMNode:null},s=Symbol.for("react.portal");var l=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){return"font"===e?"":"string"===typeof t?"use-credentials"===t?t:"":void 0}t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,t.createPortal=function(e,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!t||1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType)throw Error(o(299));return function(e,t,r){var n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:s,key:null==n?null:""+n,children:e,containerInfo:t,implementation:r}}(e,t,null,r)},t.flushSync=function(e){var t=l.T,r=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=r,i.d.f()}},t.preconnect=function(e,t){"string"===typeof e&&(t?t="string"===typeof(t=t.crossOrigin)?"use-credentials"===t?t:"":void 0:t=null,i.d.C(e,t))},t.prefetchDNS=function(e){"string"===typeof e&&i.d.D(e)},t.preinit=function(e,t){if("string"===typeof e&&t&&"string"===typeof t.as){var r=t.as,n=c(r,t.crossOrigin),o="string"===typeof t.integrity?t.integrity:void 0,a="string"===typeof t.fetchPriority?t.fetchPriority:void 0;"style"===r?i.d.S(e,"string"===typeof t.precedence?t.precedence:void 0,{crossOrigin:n,integrity:o,fetchPriority:a}):"script"===r&&i.d.X(e,{crossOrigin:n,integrity:o,fetchPriority:a,nonce:"string"===typeof t.nonce?t.nonce:void 0})}},t.preinitModule=function(e,t){if("string"===typeof e)if("object"===typeof t&&null!==t){if(null==t.as||"script"===t.as){var r=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:r,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0})}}else null==t&&i.d.M(e)},t.preload=function(e,t){if("string"===typeof e&&"object"===typeof t&&null!==t&&"string"===typeof t.as){var r=t.as,n=c(r,t.crossOrigin);i.d.L(e,r,{crossOrigin:n,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0,type:"string"===typeof t.type?t.type:void 0,fetchPriority:"string"===typeof t.fetchPriority?t.fetchPriority:void 0,referrerPolicy:"string"===typeof t.referrerPolicy?t.referrerPolicy:void 0,imageSrcSet:"string"===typeof t.imageSrcSet?t.imageSrcSet:void 0,imageSizes:"string"===typeof t.imageSizes?t.imageSizes:void 0,media:"string"===typeof t.media?t.media:void 0})}},t.preloadModule=function(e,t){if("string"===typeof e)if(t){var r=c(t.as,t.crossOrigin);i.d.m(e,{as:"string"===typeof t.as&&"script"!==t.as?t.as:void 0,crossOrigin:r,integrity:"string"===typeof t.integrity?t.integrity:void 0})}else i.d.m(e)},t.requestFormReset=function(e){i.d.r(e)},t.unstable_batchedUpdates=function(e,t){return e(t)},t.useFormState=function(e,t,r){return l.H.useFormState(e,t,r)},t.useFormStatus=function(){return l.H.useHostTransitionStatus()},t.version="19.1.1"},799:(e,t)=>{"use strict";var r=Symbol.for("react.transitional.element"),n=Symbol.for("react.fragment");function o(e,t,n){var o=null;if(void 0!==n&&(o=""+n),void 0!==t.key&&(o=""+t.key),"key"in t)for(var a in n={},t)"key"!==a&&(n[a]=t[a]);else n=t;return t=n.ref,{$$typeof:r,type:e,key:o,ref:void 0!==t?t:null,props:n}}t.Fragment=n,t.jsx=o,t.jsxs=o},853:(e,t,r)=>{"use strict";e.exports=r(896)},896:(e,t)=>{"use strict";function r(e,t){var r=e.length;e.push(t);e:for(;0<r;){var n=r-1>>>1,o=e[n];if(!(0<a(o,t)))break e;e[n]=t,e[r]=o,r=n}}function n(e){return 0===e.length?null:e[0]}function o(e){if(0===e.length)return null;var t=e[0],r=e.pop();if(r!==t){e[0]=r;e:for(var n=0,o=e.length,i=o>>>1;n<i;){var s=2*(n+1)-1,l=e[s],c=s+1,u=e[c];if(0>a(l,r))c<o&&0>a(u,l)?(e[n]=u,e[c]=r,n=c):(e[n]=l,e[s]=r,n=s);else{if(!(c<o&&0>a(u,r)))break e;e[n]=u,e[c]=r,n=c}}}return t}function a(e,t){var r=e.sortIndex-t.sortIndex;return 0!==r?r:e.id-t.id}if(t.unstable_now=void 0,"object"===typeof performance&&"function"===typeof performance.now){var i=performance;t.unstable_now=function(){return i.now()}}else{var s=Date,l=s.now();t.unstable_now=function(){return s.now()-l}}var c=[],u=[],d=1,f=null,p=3,h=!1,m=!1,g=!1,y=!1,b="function"===typeof setTimeout?setTimeout:null,v="function"===typeof clearTimeout?clearTimeout:null,x="undefined"!==typeof setImmediate?setImmediate:null;function w(e){for(var t=n(u);null!==t;){if(null===t.callback)o(u);else{if(!(t.startTime<=e))break;o(u),t.sortIndex=t.expirationTime,r(c,t)}t=n(u)}}function k(e){if(g=!1,w(e),!m)if(null!==n(c))m=!0,j||(j=!0,S());else{var t=n(u);null!==t&&N(k,t.startTime-e)}}var S,j=!1,_=-1,E=5,C=-1;function T(){return!!y||!(t.unstable_now()-C<E)}function R(){if(y=!1,j){var e=t.unstable_now();C=e;var r=!0;try{e:{m=!1,g&&(g=!1,v(_),_=-1),h=!0;var a=p;try{t:{for(w(e),f=n(c);null!==f&&!(f.expirationTime>e&&T());){var i=f.callback;if("function"===typeof i){f.callback=null,p=f.priorityLevel;var s=i(f.expirationTime<=e);if(e=t.unstable_now(),"function"===typeof s){f.callback=s,w(e),r=!0;break t}f===n(c)&&o(c),w(e)}else o(c);f=n(c)}if(null!==f)r=!0;else{var l=n(u);null!==l&&N(k,l.startTime-e),r=!1}}break e}finally{f=null,p=a,h=!1}r=void 0}}finally{r?S():j=!1}}}if("function"===typeof x)S=function(){x(R)};else if("undefined"!==typeof MessageChannel){var P=new MessageChannel,z=P.port2;P.port1.onmessage=R,S=function(){z.postMessage(null)}}else S=function(){b(R,0)};function N(e,r){_=b(function(){e(t.unstable_now())},r)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return p},t.unstable_next=function(e){switch(p){case 1:case 2:case 3:var t=3;break;default:t=p}var r=p;p=t;try{return e()}finally{p=r}},t.unstable_requestPaint=function(){y=!0},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var r=p;p=e;try{return t()}finally{p=r}},t.unstable_scheduleCallback=function(e,o,a){var i=t.unstable_now();switch("object"===typeof a&&null!==a?a="number"===typeof(a=a.delay)&&0<a?i+a:i:a=i,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return e={id:d++,callback:o,priorityLevel:e,startTime:a,expirationTime:s=a+s,sortIndex:-1},a>i?(e.sortIndex=a,r(u,e),null===n(c)&&e===n(u)&&(g?(v(_),_=-1):g=!0,N(k,a-i))):(e.sortIndex=s,r(c,e),m||h||(m=!0,j||(j=!0,S()))),e},t.unstable_shouldYield=T,t.unstable_wrapCallback=function(e){var t=p;return function(){var r=p;p=t;try{return e.apply(this,arguments)}finally{p=r}}}},950:(e,t,r)=>{"use strict";!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=r(672)}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nc=void 0,(()=>{"use strict";var e={};r.r(e),r.d(e,{hasBrowserEnv:()=>ln,hasStandardBrowserEnv:()=>un,hasStandardBrowserWebWorkerEnv:()=>dn,navigator:()=>cn,origin:()=>fn});var t={};r.r(t),r.d(t,{Decoder:()=>Ma,Encoder:()=>$a,PacketType:()=>Ia,protocol:()=>Da});var n=r(43),o=r(391),a="popstate";function i(){return p(function(e,t){let{pathname:r,search:n,hash:o}=e.location;return u("",{pathname:r,search:n,hash:o},t.state&&t.state.usr||null,t.state&&t.state.key||"default")},function(e,t){return"string"===typeof t?t:d(t)},null,arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}function s(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}function l(e,t){if(!e){"undefined"!==typeof console&&console.warn(t);try{throw new Error(t)}catch(r){}}}function c(e,t){return{usr:e.state,key:e.key,idx:t}}function u(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3?arguments[3]:void 0;return{pathname:"string"===typeof e?e:e.pathname,search:"",hash:"",..."string"===typeof t?f(t):t,state:r,key:t&&t.key||n||Math.random().toString(36).substring(2,10)}}function d(e){let{pathname:t="/",search:r="",hash:n=""}=e;return r&&"?"!==r&&(t+="?"===r.charAt(0)?r:"?"+r),n&&"#"!==n&&(t+="#"===n.charAt(0)?n:"#"+n),t}function f(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substring(r),e=e.substring(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substring(n),e=e.substring(0,n)),e&&(t.pathname=e)}return t}function p(e,t,r){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},{window:o=document.defaultView,v5Compat:i=!1}=n,s=o.history,l="POP",d=null,f=p();function p(){return(s.state||{idx:null}).idx}function m(){l="POP";let e=p(),t=null==e?null:e-f;f=e,d&&d({action:l,location:y.location,delta:t})}function g(e){return h(e)}null==f&&(f=0,s.replaceState({...s.state,idx:f},""));let y={get action(){return l},get location(){return e(o,s)},listen(e){if(d)throw new Error("A history only accepts one active listener");return o.addEventListener(a,m),d=e,()=>{o.removeEventListener(a,m),d=null}},createHref:e=>t(o,e),createURL:g,encodeLocation(e){let t=g(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:function(e,t){l="PUSH";let n=u(y.location,e,t);r&&r(n,e),f=p()+1;let a=c(n,f),h=y.createHref(n);try{s.pushState(a,"",h)}catch(m){if(m instanceof DOMException&&"DataCloneError"===m.name)throw m;o.location.assign(h)}i&&d&&d({action:l,location:y.location,delta:1})},replace:function(e,t){l="REPLACE";let n=u(y.location,e,t);r&&r(n,e),f=p();let o=c(n,f),a=y.createHref(n);s.replaceState(o,"",a),i&&d&&d({action:l,location:y.location,delta:0})},go:e=>s.go(e)};return y}function h(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r="http://localhost";"undefined"!==typeof window&&(r="null"!==window.location.origin?window.location.origin:window.location.href),s(r,"No window.location.(origin|href) available to create URL");let n="string"===typeof e?e:d(e);return n=n.replace(/ $/,"%20"),!t&&n.startsWith("//")&&(n=r+n),new URL(n,r)}new WeakMap;function m(e,t){return g(e,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:"/",!1)}function g(e,t,r,n){let o=z(("string"===typeof t?f(t):t).pathname||"/",r);if(null==o)return null;let a=y(e);!function(e){e.sort((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){let r=e.length===t.length&&e.slice(0,-1).every((e,r)=>e===t[r]);return r?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)))}(a);let i=null;for(let s=0;null==i&&s<a.length;++s){let e=P(o);i=C(a[s],e,n)}return i}function y(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",o=(e,o,a)=>{let i={relativePath:void 0===a?e.path||"":a,caseSensitive:!0===e.caseSensitive,childrenIndex:o,route:e};i.relativePath.startsWith("/")&&(s(i.relativePath.startsWith(n),`Absolute route path "${i.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),i.relativePath=i.relativePath.slice(n.length));let l=D([n,i.relativePath]),c=r.concat(i);e.children&&e.children.length>0&&(s(!0!==e.index,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),y(e.children,t,c,l)),(null!=e.path||e.index)&&t.push({path:l,score:E(l,e.index),routesMeta:c})};return e.forEach((e,t)=>{if(""!==e.path&&e.path?.includes("?"))for(let r of b(e.path))o(e,t,r);else o(e,t)}),t}function b(e){let t=e.split("/");if(0===t.length)return[];let[r,...n]=t,o=r.endsWith("?"),a=r.replace(/\?$/,"");if(0===n.length)return o?[a,""]:[a];let i=b(n.join("/")),s=[];return s.push(...i.map(e=>""===e?a:[a,e].join("/"))),o&&s.push(...i),s.map(t=>e.startsWith("/")&&""===t?"/":t)}var v=/^:[\w-]+$/,x=3,w=2,k=1,S=10,j=-2,_=e=>"*"===e;function E(e,t){let r=e.split("/"),n=r.length;return r.some(_)&&(n+=j),t&&(n+=w),r.filter(e=>!_(e)).reduce((e,t)=>e+(v.test(t)?x:""===t?k:S),n)}function C(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],{routesMeta:n}=e,o={},a="/",i=[];for(let s=0;s<n.length;++s){let e=n[s],l=s===n.length-1,c="/"===a?t:t.slice(a.length)||"/",u=T({path:e.relativePath,caseSensitive:e.caseSensitive,end:l},c),d=e.route;if(!u&&l&&r&&!n[n.length-1].route.index&&(u=T({path:e.relativePath,caseSensitive:e.caseSensitive,end:!1},c)),!u)return null;Object.assign(o,u.params),i.push({params:o,pathname:D([a,u.pathname]),pathnameBase:I(D([a,u.pathnameBase])),route:d}),"/"!==u.pathnameBase&&(a=D([a,u.pathnameBase]))}return i}function T(e,t){"string"===typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=R(e.path,e.caseSensitive,e.end),o=t.match(r);if(!o)return null;let a=o[0],i=a.replace(/(.)\/+$/,"$1"),s=o.slice(1),l=n.reduce((e,t,r)=>{let{paramName:n,isOptional:o}=t;if("*"===n){let e=s[r]||"";i=a.slice(0,a.length-e.length).replace(/(.)\/+$/,"$1")}const l=s[r];return e[n]=o&&!l?void 0:(l||"").replace(/%2F/g,"/"),e},{});return{params:l,pathname:a,pathnameBase:i,pattern:e}}function R(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];l("*"===e||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let n=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(e,t,r)=>(n.push({paramName:t,isOptional:null!=r}),r?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),o+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?o+="\\/*$":""!==e&&"/"!==e&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),n]}function P(e){try{return e.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(t){return l(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function z(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&"/"!==n?null:e.slice(r)||"/"}function N(e,t,r,n){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function O(e){return e.filter((e,t)=>0===t||e.route.path&&e.route.path.length>0)}function A(e){let t=O(e);return t.map((e,r)=>r===t.length-1?e.pathname:e.pathnameBase)}function L(e,t,r){let n,o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];"string"===typeof e?n=f(e):(n={...e},s(!n.pathname||!n.pathname.includes("?"),N("?","pathname","search",n)),s(!n.pathname||!n.pathname.includes("#"),N("#","pathname","hash",n)),s(!n.search||!n.search.includes("#"),N("#","search","hash",n)));let a,i=""===e||""===n.pathname,l=i?"/":n.pathname;if(null==l)a=r;else{let e=t.length-1;if(!o&&l.startsWith("..")){let t=l.split("/");for(;".."===t[0];)t.shift(),e-=1;n.pathname=t.join("/")}a=e>=0?t[e]:"/"}let c=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/",{pathname:r,search:n="",hash:o=""}="string"===typeof e?f(e):e,a=r?r.startsWith("/")?r:function(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(e=>{".."===e?r.length>1&&r.pop():"."!==e&&r.push(e)}),r.length>1?r.join("/"):"/"}(r,t):t;return{pathname:a,search:$(n),hash:F(o)}}(n,a),u=l&&"/"!==l&&l.endsWith("/"),d=(i||"."===l)&&r.endsWith("/");return c.pathname.endsWith("/")||!u&&!d||(c.pathname+="/"),c}var D=e=>e.join("/").replace(/\/\/+/g,"/"),I=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),$=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",F=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";function M(e){return null!=e&&"number"===typeof e.status&&"string"===typeof e.statusText&&"boolean"===typeof e.internal&&"data"in e}var B=["POST","PUT","PATCH","DELETE"],U=(new Set(B),["GET",...B]);new Set(U),Symbol("ResetLoaderData");var q=n.createContext(null);q.displayName="DataRouter";var H=n.createContext(null);H.displayName="DataRouterState";var W=n.createContext(!1);var V=n.createContext({isTransitioning:!1});V.displayName="ViewTransition";var Y=n.createContext(new Map);Y.displayName="Fetchers";var K=n.createContext(null);K.displayName="Await";var Q=n.createContext(null);Q.displayName="Navigation";var X=n.createContext(null);X.displayName="Location";var G=n.createContext({outlet:null,matches:[],isDataRoute:!1});G.displayName="Route";var J=n.createContext(null);J.displayName="RouteError";function Z(){return null!=n.useContext(X)}function ee(){return s(Z(),"useLocation() may be used only in the context of a <Router> component."),n.useContext(X).location}var te="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function re(e){n.useContext(Q).static||n.useLayoutEffect(e)}function ne(){let{isDataRoute:e}=n.useContext(G);return e?function(){let{router:e}=pe("useNavigate"),t=me("useNavigate"),r=n.useRef(!1);re(()=>{r.current=!0});let o=n.useCallback(async function(n){let o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};l(r.current,te),r.current&&("number"===typeof n?e.navigate(n):await e.navigate(n,{fromRouteId:t,...o}))},[e,t]);return o}():function(){s(Z(),"useNavigate() may be used only in the context of a <Router> component.");let e=n.useContext(q),{basename:t,navigator:r}=n.useContext(Q),{matches:o}=n.useContext(G),{pathname:a}=ee(),i=JSON.stringify(A(o)),c=n.useRef(!1);re(()=>{c.current=!0});let u=n.useCallback(function(n){let o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(l(c.current,te),!c.current)return;if("number"===typeof n)return void r.go(n);let s=L(n,JSON.parse(i),a,"path"===o.relative);null==e&&"/"!==t&&(s.pathname="/"===s.pathname?t:D([t,s.pathname])),(o.replace?r.replace:r.push)(s,o.state,o)},[t,r,i,a,e]);return u}()}n.createContext(null);function oe(){let{matches:e}=n.useContext(G),t=e[e.length-1];return t?t.params:{}}function ae(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{matches:r}=n.useContext(G),{pathname:o}=ee(),a=JSON.stringify(A(r));return n.useMemo(()=>L(e,JSON.parse(a),o,"path"===t),[e,a,o,t])}function ie(e,t,r,o){s(Z(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:a}=n.useContext(Q),{matches:i}=n.useContext(G),c=i[i.length-1],u=c?c.params:{},d=c?c.pathname:"/",p=c?c.pathnameBase:"/",h=c&&c.route;{let e=h&&h.path||"";be(d,!h||e.endsWith("*")||e.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${d}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.\n\nPlease change the parent <Route path="${e}"> to <Route path="${"/"===e?"*":`${e}/*`}">.`)}let g,y=ee();if(t){let e="string"===typeof t?f(t):t;s("/"===p||e.pathname?.startsWith(p),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${p}" but pathname "${e.pathname}" was given in the \`location\` prop.`),g=e}else g=y;let b=g.pathname||"/",v=b;if("/"!==p){let e=p.replace(/^\//,"").split("/");v="/"+b.replace(/^\//,"").split("/").slice(e.length).join("/")}let x=m(e,{pathname:v});l(h||null!=x,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),l(null==x||void 0!==x[x.length-1].route.element||void 0!==x[x.length-1].route.Component||void 0!==x[x.length-1].route.lazy,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let w=de(x&&x.map(e=>Object.assign({},e,{params:Object.assign({},u,e.params),pathname:D([p,a.encodeLocation?a.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?p:D([p,a.encodeLocation?a.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])})),i,r,o);return t&&w?n.createElement(X.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},w):w}function se(){let e=ge(),t=M(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,o="rgba(200,200,200, 0.5)",a={padding:"0.5rem",backgroundColor:o},i={padding:"2px 4px",backgroundColor:o},s=null;return console.error("Error handled by React Router default ErrorBoundary:",e),s=n.createElement(n.Fragment,null,n.createElement("p",null,"\ud83d\udcbf Hey developer \ud83d\udc4b"),n.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",n.createElement("code",{style:i},"ErrorBoundary")," or"," ",n.createElement("code",{style:i},"errorElement")," prop on your route.")),n.createElement(n.Fragment,null,n.createElement("h2",null,"Unexpected Application Error!"),n.createElement("h3",{style:{fontStyle:"italic"}},t),r?n.createElement("pre",{style:a},r):null,s)}var le=n.createElement(se,null),ce=class extends n.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return void 0!==this.state.error?n.createElement(G.Provider,{value:this.props.routeContext},n.createElement(J.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function ue(e){let{routeContext:t,match:r,children:o}=e,a=n.useContext(q);return a&&a.static&&a.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=r.route.id),n.createElement(G.Provider,{value:t},o)}function de(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(null==e){if(!r)return null;if(r.errors)e=r.matches;else{if(0!==t.length||r.initialized||!(r.matches.length>0))return null;e=r.matches}}let o=e,a=r?.errors;if(null!=a){let e=o.findIndex(e=>e.route.id&&void 0!==a?.[e.route.id]);s(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(",")}`),o=o.slice(0,Math.min(o.length,e+1))}let i=!1,l=-1;if(r)for(let n=0;n<o.length;n++){let e=o[n];if((e.route.HydrateFallback||e.route.hydrateFallbackElement)&&(l=n),e.route.id){let{loaderData:t,errors:n}=r,a=e.route.loader&&!t.hasOwnProperty(e.route.id)&&(!n||void 0===n[e.route.id]);if(e.route.lazy||a){i=!0,o=l>=0?o.slice(0,l+1):[o[0]];break}}}return o.reduceRight((e,s,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&s.route.id?a[s.route.id]:void 0,f=s.route.errorElement||le,i&&(l<0&&0===c?(be("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):l===c&&(d=!0,p=s.route.hydrateFallbackElement||null)));let h=t.concat(o.slice(0,c+1)),m=()=>{let t;return t=u?f:d?p:s.route.Component?n.createElement(s.route.Component,null):s.route.element?s.route.element:e,n.createElement(ue,{match:s,routeContext:{outlet:e,matches:h,isDataRoute:null!=r},children:t})};return r&&(s.route.ErrorBoundary||s.route.errorElement||0===c)?n.createElement(ce,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:m(),routeContext:{outlet:null,matches:h,isDataRoute:!0}}):m()},null)}function fe(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function pe(e){let t=n.useContext(q);return s(t,fe(e)),t}function he(e){let t=n.useContext(H);return s(t,fe(e)),t}function me(e){let t=function(e){let t=n.useContext(G);return s(t,fe(e)),t}(e),r=t.matches[t.matches.length-1];return s(r.route.id,`${e} can only be used on routes that contain a unique "id"`),r.route.id}function ge(){let e=n.useContext(J),t=he("useRouteError"),r=me("useRouteError");return void 0!==e?e:t.errors?.[r]}var ye={};function be(e,t,r){t||ye[e]||(ye[e]=!0,l(!1,r))}var ve={};function xe(e,t){e||ve[t]||(ve[t]=!0,console.warn(t))}n.memo(function(e){let{routes:t,future:r,state:n}=e;return ie(t,void 0,n,r)});function we(e){let{to:t,replace:r,state:o,relative:a}=e;s(Z(),"<Navigate> may be used only in the context of a <Router> component.");let{static:i}=n.useContext(Q);l(!i,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:c}=n.useContext(G),{pathname:u}=ee(),d=ne(),f=L(t,A(c),u,"path"===a),p=JSON.stringify(f);return n.useEffect(()=>{d(JSON.parse(p),{replace:r,state:o,relative:a})},[d,p,a,r,o]),null}function ke(e){s(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Se(e){let{basename:t="/",children:r=null,location:o,navigationType:a="POP",navigator:i,static:c=!1}=e;s(!Z(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let u=t.replace(/^\/*/,"/"),d=n.useMemo(()=>({basename:u,navigator:i,static:c,future:{}}),[u,i,c]);"string"===typeof o&&(o=f(o));let{pathname:p="/",search:h="",hash:m="",state:g=null,key:y="default"}=o,b=n.useMemo(()=>{let e=z(p,u);return null==e?null:{location:{pathname:e,search:h,hash:m,state:g,key:y},navigationType:a}},[u,p,h,m,g,y,a]);return l(null!=b,`<Router basename="${u}"> is not able to match the URL "${p}${h}${m}" because it does not start with the basename, so the <Router> won't render anything.`),null==b?null:n.createElement(Q.Provider,{value:d},n.createElement(X.Provider,{children:r,value:b}))}function je(e){let{children:t,location:r}=e;return ie(_e(t),r)}n.Component;function _e(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=[];return n.Children.forEach(e,(e,o)=>{if(!n.isValidElement(e))return;let a=[...t,o];if(e.type===n.Fragment)return void r.push.apply(r,_e(e.props.children,a));s(e.type===ke,`[${"string"===typeof e.type?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),s(!e.props.index||!e.props.children,"An index route cannot have child routes.");let i={id:e.props.id||a.join("-"),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:!0===e.props.hasErrorBoundary||null!=e.props.ErrorBoundary||null!=e.props.errorElement,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(i.children=_e(e.props.children,a)),r.push(i)}),r}var Ee="get",Ce="application/x-www-form-urlencoded";function Te(e){return null!=e&&"string"===typeof e.tagName}function Re(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return new URLSearchParams("string"===typeof e||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,r)=>{let n=e[r];return t.concat(Array.isArray(n)?n.map(e=>[r,e]):[[r,n]])},[]))}var Pe=null;var ze=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Ne(e){return null==e||ze.has(e)?e:(l(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ce}"`),null)}function Oe(e,t){let r,n,o,a,i;if(Te(s=e)&&"form"===s.tagName.toLowerCase()){let i=e.getAttribute("action");n=i?z(i,t):null,r=e.getAttribute("method")||Ee,o=Ne(e.getAttribute("enctype"))||Ce,a=new FormData(e)}else if(function(e){return Te(e)&&"button"===e.tagName.toLowerCase()}(e)||function(e){return Te(e)&&"input"===e.tagName.toLowerCase()}(e)&&("submit"===e.type||"image"===e.type)){let i=e.form;if(null==i)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let s=e.getAttribute("formaction")||i.getAttribute("action");if(n=s?z(s,t):null,r=e.getAttribute("formmethod")||i.getAttribute("method")||Ee,o=Ne(e.getAttribute("formenctype"))||Ne(i.getAttribute("enctype"))||Ce,a=new FormData(i,e),!function(){if(null===Pe)try{new FormData(document.createElement("form"),0),Pe=!1}catch(e){Pe=!0}return Pe}()){let{name:t,type:r,value:n}=e;if("image"===r){let e=t?`${t}.`:"";a.append(`${e}x`,"0"),a.append(`${e}y`,"0")}else t&&a.append(t,n)}}else{if(Te(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');r=Ee,n=null,o=Ce,i=e}var s;return a&&"text/plain"===o&&(i=a,a=void 0),{action:n,method:r.toLowerCase(),encType:o,formData:a,body:i}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");"undefined"!==typeof window?window:"undefined"!==typeof globalThis&&globalThis;function Ae(e){return{__html:e}}function Le(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}Symbol("SingleFetchRedirect");function De(e,t,r){let n="string"===typeof e?new URL(e,"undefined"===typeof window?"server://singlefetch/":window.location.origin):e;return"/"===n.pathname?n.pathname=`_root.${r}`:t&&"/"===z(n.pathname,t)?n.pathname=`${t.replace(/\/$/,"")}/_root.${r}`:n.pathname=`${n.pathname.replace(/\/$/,"")}.${r}`,n}async function Ie(e,t){if(e.id in t)return t[e.id];try{let r=await import(e.module);return t[e.id]=r,r}catch(r){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(r),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function $e(e){return null!=e&&"string"===typeof e.page}function Fe(e){return null!=e&&(null==e.href?"preload"===e.rel&&"string"===typeof e.imageSrcSet&&"string"===typeof e.imageSizes:"string"===typeof e.rel&&"string"===typeof e.href)}function Me(e,t,r,n,o,a){let i=(e,t)=>!r[t]||e.route.id!==r[t].route.id,s=(e,t)=>r[t].pathname!==e.pathname||r[t].route.path?.endsWith("*")&&r[t].params["*"]!==e.params["*"];return"assets"===a?t.filter((e,t)=>i(e,t)||s(e,t)):"data"===a?t.filter((t,a)=>{let l=n.routes[t.route.id];if(!l||!l.hasLoader)return!1;if(i(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let n=t.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:r[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if("boolean"===typeof n)return n}return!0}):[]}function Be(e,t){let{includeHydrateFallback:r}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return n=e.map(e=>{let n=t.routes[e.route.id];if(!n)return[];let o=[n.module];return n.clientActionModule&&(o=o.concat(n.clientActionModule)),n.clientLoaderModule&&(o=o.concat(n.clientLoaderModule)),r&&n.hydrateFallbackModule&&(o=o.concat(n.hydrateFallbackModule)),n.imports&&(o=o.concat(n.imports)),o}).flat(1),[...new Set(n)];var n}function Ue(e,t){let r=new Set,n=new Set(t);return e.reduce((e,o)=>{if(t&&!$e(o)&&"script"===o.as&&o.href&&n.has(o.href))return e;let a=JSON.stringify(function(e){let t={},r=Object.keys(e).sort();for(let n of r)t[n]=e[n];return t}(o));return r.has(a)||(r.add(a),e.push({key:a,link:o})),e},[])}function qe(e,t){return"lazy"===e.mode&&!0===t}function He(){let e=n.useContext(q);return Le(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function We(){let e=n.useContext(H);return Le(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Ve=n.createContext(void 0);function Ye(){let e=n.useContext(Ve);return Le(e,"You must render this element inside a <HydratedRouter> element"),e}function Ke(e,t){return r=>{e&&e(r),r.defaultPrevented||t(r)}}function Qe(e,t,r){if(r&&!Ze)return[e[0]];if(t){let r=e.findIndex(e=>void 0!==t[e.route.id]);return e.slice(0,r+1)}return e}Ve.displayName="FrameworkContext";function Xe(e){let{page:t,...r}=e,{router:o}=He(),a=n.useMemo(()=>m(o.routes,t,o.basename),[o.routes,t,o.basename]);return a?n.createElement(Je,{page:t,matches:a,...r}):null}function Ge(e){let{manifest:t,routeModules:r}=Ye(),[o,a]=n.useState([]);return n.useEffect(()=>{let n=!1;return async function(e,t,r){let n=await Promise.all(e.map(async e=>{let n=t.routes[e.route.id];if(n){let e=await Ie(n,r);return e.links?e.links():[]}return[]}));return Ue(n.flat(1).filter(Fe).filter(e=>"stylesheet"===e.rel||"preload"===e.rel).map(e=>"stylesheet"===e.rel?{...e,rel:"prefetch",as:"style"}:{...e,rel:"prefetch"}))}(e,t,r).then(e=>{n||a(e)}),()=>{n=!0}},[e,t,r]),o}function Je(e){let{page:t,matches:r,...o}=e,a=ee(),{manifest:i,routeModules:s}=Ye(),{basename:l}=He(),{loaderData:c,matches:u}=We(),d=n.useMemo(()=>Me(t,r,u,i,a,"data"),[t,r,u,i,a]),f=n.useMemo(()=>Me(t,r,u,i,a,"assets"),[t,r,u,i,a]),p=n.useMemo(()=>{if(t===a.pathname+a.search+a.hash)return[];let e=new Set,n=!1;if(r.forEach(t=>{let r=i.routes[t.route.id];r&&r.hasLoader&&(!d.some(e=>e.route.id===t.route.id)&&t.route.id in c&&s[t.route.id]?.shouldRevalidate||r.hasClientLoader?n=!0:e.add(t.route.id))}),0===e.size)return[];let o=De(t,l,"data");return n&&e.size>0&&o.searchParams.set("_routes",r.filter(t=>e.has(t.route.id)).map(e=>e.route.id).join(",")),[o.pathname+o.search]},[l,c,a,i,d,r,t,s]),h=n.useMemo(()=>Be(f,i),[f,i]),m=Ge(f);return n.createElement(n.Fragment,null,p.map(e=>n.createElement("link",{key:e,rel:"prefetch",as:"fetch",href:e,...o})),h.map(e=>n.createElement("link",{key:e,rel:"modulepreload",href:e,...o})),m.map(e=>{let{key:t,link:r}=e;return n.createElement("link",{key:t,...r})}))}var Ze=!1;function et(e){let{manifest:t,serverHandoffString:r,isSpaMode:o,renderMeta:a,routeDiscovery:i,ssr:s}=Ye(),{router:l,static:c,staticContext:u}=He(),{matches:d}=We(),f=n.useContext(W),p=qe(i,s);a&&(a.didRenderScripts=!0);let h=Qe(d,null,o);n.useEffect(()=>{0},[]);let g=n.useMemo(()=>{if(f)return null;let o=u?`window.__reactRouterContext = ${r};window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());`:" ",a=c?`${t.hmr?.runtime?`import ${JSON.stringify(t.hmr.runtime)};`:""}${p?"":`import ${JSON.stringify(t.url)}`};\n${h.map((e,r)=>{let n=`route${r}`,o=t.routes[e.route.id];Le(o,`Route ${e.route.id} not found in manifest`);let{clientActionModule:a,clientLoaderModule:i,clientMiddlewareModule:s,hydrateFallbackModule:l,module:c}=o,u=[...a?[{module:a,varName:`${n}_clientAction`}]:[],...i?[{module:i,varName:`${n}_clientLoader`}]:[],...s?[{module:s,varName:`${n}_clientMiddleware`}]:[],...l?[{module:l,varName:`${n}_HydrateFallback`}]:[],{module:c,varName:`${n}_main`}];return 1===u.length?`import * as ${n} from ${JSON.stringify(c)};`:[u.map(e=>`import * as ${e.varName} from "${e.module}";`).join("\n"),`const ${n} = {${u.map(e=>`...${e.varName}`).join(",")}};`].join("\n")}).join("\n")}\n  ${p?`window.__reactRouterManifest = ${JSON.stringify(function(e,t){let{sri:r,...n}=e,o=new Set(t.state.matches.map(e=>e.route.id)),a=t.state.location.pathname.split("/").filter(Boolean),i=["/"];for(a.pop();a.length>0;)i.push(`/${a.join("/")}`),a.pop();i.forEach(e=>{let r=m(t.routes,e,t.basename);r&&r.forEach(e=>o.add(e.route.id))});let s=[...o].reduce((e,t)=>Object.assign(e,{[t]:n.routes[t]}),{});return{...n,routes:s,sri:!!r||void 0}}(t,l),null,2)};`:""}\n  window.__reactRouterRouteModules = {${h.map((e,t)=>`${JSON.stringify(e.route.id)}:route${t}`).join(",")}};\n\nimport(${JSON.stringify(t.entry.module)});`:" ";return n.createElement(n.Fragment,null,n.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:Ae(o),type:void 0}),n.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:Ae(a),type:"module",async:!0}))},[]),y=Ze||f?[]:(t.entry.imports.concat(Be(h,t,{includeHydrateFallback:!0})),[...new Set(b)]);var b;let v="object"===typeof t.sri?t.sri:{};return xe(!f,"The <Scripts /> element is a no-op when using RSC and can be safely removed."),Ze||f?null:n.createElement(n.Fragment,null,"object"===typeof t.sri?n.createElement("script",{"rr-importmap":"",type:"importmap",suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:JSON.stringify({integrity:v})}}):null,p?null:n.createElement("link",{rel:"modulepreload",href:t.url,crossOrigin:e.crossOrigin,integrity:v[t.url],suppressHydrationWarning:!0}),n.createElement("link",{rel:"modulepreload",href:t.entry.module,crossOrigin:e.crossOrigin,integrity:v[t.entry.module],suppressHydrationWarning:!0}),y.map(t=>n.createElement("link",{key:t,rel:"modulepreload",href:t,crossOrigin:e.crossOrigin,integrity:v[t],suppressHydrationWarning:!0})),g)}function tt(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return e=>{t.forEach(t=>{"function"===typeof t?t(e):null!=t&&(t.current=e)})}}n.Component;function rt(e){let{error:t,isOutsideRemixApp:r}=e;console.error(t);let o,a=n.createElement("script",{dangerouslySetInnerHTML:{__html:'\n        console.log(\n          "\ud83d\udcbf Hey developer \ud83d\udc4b. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."\n        );\n      '}});if(M(t))return n.createElement(nt,{title:"Unhandled Thrown Response!"},n.createElement("h1",{style:{fontSize:"24px"}},t.status," ",t.statusText),a);if(t instanceof Error)0;else{let e=null==t?"Unknown Error":"object"===typeof t&&"toString"in t?t.toString():JSON.stringify(t);new Error(e)}return n.createElement(nt,{title:"Application Error!",isOutsideRemixApp:r},n.createElement("h1",{style:{fontSize:"24px"}},"Application Error"),n.createElement("pre",{style:{padding:"2rem",background:"hsla(10, 50%, 50%, 0.1)",color:"red",overflow:"auto"}},o.stack),a)}function nt(e){let{title:t,renderScripts:r,isOutsideRemixApp:o,children:a}=e,{routeModules:i}=Ye();return i.root?.Layout&&!o?a:n.createElement("html",{lang:"en"},n.createElement("head",null,n.createElement("meta",{charSet:"utf-8"}),n.createElement("meta",{name:"viewport",content:"width=device-width,initial-scale=1,viewport-fit=cover"}),n.createElement("title",null,t)),n.createElement("body",null,n.createElement("main",{style:{fontFamily:"system-ui, sans-serif",padding:"2rem"}},a,r?n.createElement(et,null):null)))}var ot="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement;try{ot&&(window.__reactRouterVersion="7.7.1")}catch(hm){}function at(e){let{basename:t,children:r,window:o}=e,a=n.useRef();null==a.current&&(a.current=i({window:o,v5Compat:!0}));let s=a.current,[l,c]=n.useState({action:s.action,location:s.location}),u=n.useCallback(e=>{n.startTransition(()=>c(e))},[c]);return n.useLayoutEffect(()=>s.listen(u),[s,u]),n.createElement(Se,{basename:t,children:r,location:l.location,navigationType:l.action,navigator:s})}var it=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,st=n.forwardRef(function(e,t){let r,{onClick:o,discover:a="render",prefetch:i="none",relative:c,reloadDocument:u,replace:f,state:p,target:h,to:m,preventScrollReset:g,viewTransition:y,...b}=e,{basename:v}=n.useContext(Q),x="string"===typeof m&&it.test(m),w=!1;if("string"===typeof m&&x&&(r=m,ot))try{let e=new URL(window.location.href),t=m.startsWith("//")?new URL(e.protocol+m):new URL(m),r=z(t.pathname,v);t.origin===e.origin&&null!=r?m=r+t.search+t.hash:w=!0}catch(hm){l(!1,`<Link to="${m}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let k=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};s(Z(),"useHref() may be used only in the context of a <Router> component.");let{basename:r,navigator:o}=n.useContext(Q),{hash:a,pathname:i,search:l}=ae(e,{relative:t}),c=i;return"/"!==r&&(c="/"===i?r:D([r,i])),o.createHref({pathname:c,search:l,hash:a})}(m,{relative:c}),[S,j,_]=function(e,t){let r=n.useContext(Ve),[o,a]=n.useState(!1),[i,s]=n.useState(!1),{onFocus:l,onBlur:c,onMouseEnter:u,onMouseLeave:d,onTouchStart:f}=t,p=n.useRef(null);n.useEffect(()=>{if("render"===e&&s(!0),"viewport"===e){let e=new IntersectionObserver(e=>{e.forEach(e=>{s(e.isIntersecting)})},{threshold:.5});return p.current&&e.observe(p.current),()=>{e.disconnect()}}},[e]),n.useEffect(()=>{if(o){let e=setTimeout(()=>{s(!0)},100);return()=>{clearTimeout(e)}}},[o]);let h=()=>{a(!0)},m=()=>{a(!1),s(!1)};return r?"intent"!==e?[i,p,{}]:[i,p,{onFocus:Ke(l,h),onBlur:Ke(c,m),onMouseEnter:Ke(u,h),onMouseLeave:Ke(d,m),onTouchStart:Ke(f,h)}]:[!1,p,{}]}(i,b),E=function(e){let{target:t,replace:r,state:o,preventScrollReset:a,relative:i,viewTransition:s}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},l=ne(),c=ee(),u=ae(e,{relative:i});return n.useCallback(n=>{if(function(e,t){return 0===e.button&&(!t||"_self"===t)&&!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)}(n,t)){n.preventDefault();let t=void 0!==r?r:d(c)===d(u);l(e,{replace:t,state:o,preventScrollReset:a,relative:i,viewTransition:s})}},[c,l,u,r,o,t,e,a,i,s])}(m,{replace:f,state:p,target:h,preventScrollReset:g,relative:c,viewTransition:y});let C=n.createElement("a",{...b,..._,href:r||k,onClick:w||u?o:function(e){o&&o(e),e.defaultPrevented||E(e)},ref:tt(t,j),target:h,"data-discover":x||"render"!==a?void 0:"true"});return S&&!x?n.createElement(n.Fragment,null,C,n.createElement(Xe,{page:k})):C});st.displayName="Link",n.forwardRef(function(e,t){let{"aria-current":r="page",caseSensitive:o=!1,className:a="",end:i=!1,style:l,to:c,viewTransition:u,children:d,...f}=e,p=ae(c,{relative:f.relative}),h=ee(),m=n.useContext(H),{navigator:g,basename:y}=n.useContext(Q),b=null!=m&&function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.useContext(V);s(null!=r,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:o}=ut("useViewTransitionState"),a=ae(e,{relative:t});if(!r.isTransitioning)return!1;let i=z(r.currentLocation.pathname,o)||r.currentLocation.pathname,l=z(r.nextLocation.pathname,o)||r.nextLocation.pathname;return null!=T(a.pathname,l)||null!=T(a.pathname,i)}(p)&&!0===u,v=g.encodeLocation?g.encodeLocation(p).pathname:p.pathname,x=h.pathname,w=m&&m.navigation&&m.navigation.location?m.navigation.location.pathname:null;o||(x=x.toLowerCase(),w=w?w.toLowerCase():null,v=v.toLowerCase()),w&&y&&(w=z(w,y)||w);const k="/"!==v&&v.endsWith("/")?v.length-1:v.length;let S,j=x===v||!i&&x.startsWith(v)&&"/"===x.charAt(k),_=null!=w&&(w===v||!i&&w.startsWith(v)&&"/"===w.charAt(v.length)),E={isActive:j,isPending:_,isTransitioning:b},C=j?r:void 0;S="function"===typeof a?a(E):[a,j?"active":null,_?"pending":null,b?"transitioning":null].filter(Boolean).join(" ");let R="function"===typeof l?l(E):l;return n.createElement(st,{...f,"aria-current":C,className:S,ref:t,style:R,to:c,viewTransition:u},"function"===typeof d?d(E):d)}).displayName="NavLink";var lt=n.forwardRef((e,t)=>{let{discover:r="render",fetcherKey:o,navigate:a,reloadDocument:i,replace:l,state:c,method:u=Ee,action:f,onSubmit:p,relative:h,preventScrollReset:m,viewTransition:g,...y}=e,b=ht(),v=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{basename:r}=n.useContext(Q),o=n.useContext(G);s(o,"useFormAction must be used inside a RouteContext");let[a]=o.matches.slice(-1),i={...ae(e||".",{relative:t})},l=ee();if(null==e){i.search=l.search;let e=new URLSearchParams(i.search),t=e.getAll("index"),r=t.some(e=>""===e);if(r){e.delete("index"),t.filter(e=>e).forEach(t=>e.append("index",t));let r=e.toString();i.search=r?`?${r}`:""}}e&&"."!==e||!a.route.index||(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index");"/"!==r&&(i.pathname="/"===i.pathname?r:D([r,i.pathname]));return d(i)}(f,{relative:h}),x="get"===u.toLowerCase()?"get":"post",w="string"===typeof f&&it.test(f);return n.createElement("form",{ref:t,method:x,action:v,onSubmit:i?p:e=>{if(p&&p(e),e.defaultPrevented)return;e.preventDefault();let t=e.nativeEvent.submitter,r=t?.getAttribute("formmethod")||u;b(t||e.currentTarget,{fetcherKey:o,method:r,navigate:a,replace:l,state:c,relative:h,preventScrollReset:m,viewTransition:g})},...y,"data-discover":w||"render"!==r?void 0:"true"})});function ct(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function ut(e){let t=n.useContext(q);return s(t,ct(e)),t}function dt(e){l("undefined"!==typeof URLSearchParams,"You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=n.useRef(Re(e)),r=n.useRef(!1),o=ee(),a=n.useMemo(()=>function(e,t){let r=Re(e);return t&&t.forEach((e,n)=>{r.has(n)||t.getAll(n).forEach(e=>{r.append(n,e)})}),r}(o.search,r.current?null:t.current),[o.search]),i=ne(),s=n.useCallback((e,t)=>{const n=Re("function"===typeof e?e(new URLSearchParams(a)):e);r.current=!0,i("?"+n,t)},[i,a]);return[a,s]}lt.displayName="Form";var ft=0,pt=()=>`__${String(++ft)}__`;function ht(){let{router:e}=ut("useSubmit"),{basename:t}=n.useContext(Q),r=me("useRouteId");return n.useCallback(async function(n){let o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{action:a,method:i,encType:s,formData:l,body:c}=Oe(n,t);if(!1===o.navigate){let t=o.fetcherKey||pt();await e.fetch(t,r,o.action||a,{preventScrollReset:o.preventScrollReset,formData:l,body:c,formMethod:o.method||i,formEncType:o.encType||s,flushSync:o.flushSync})}else await e.navigate(o.action||a,{preventScrollReset:o.preventScrollReset,formData:l,body:c,formMethod:o.method||i,formEncType:o.encType||s,replace:o.replace,state:o.state,fromRouteId:r,flushSync:o.flushSync,viewTransition:o.viewTransition})},[e,t,r])}function mt(e){var t,r,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(r=mt(e[t]))&&(n&&(n+=" "),n+=r)}else for(r in e)e[r]&&(n&&(n+=" "),n+=r);return n}const gt=function(){for(var e,t,r=0,n="",o=arguments.length;r<o;r++)(e=arguments[r])&&(t=mt(e))&&(n&&(n+=" "),n+=t);return n};!function(e){if(!e||"undefined"==typeof document)return;let t=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css",t.firstChild?t.insertBefore(r,t.firstChild):t.appendChild(r),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(document.createTextNode(e))}(':root{--toastify-color-light: #fff;--toastify-color-dark: #121212;--toastify-color-info: #3498db;--toastify-color-success: #07bc0c;--toastify-color-warning: #f1c40f;--toastify-color-error: hsl(6, 78%, 57%);--toastify-color-transparent: rgba(255, 255, 255, .7);--toastify-icon-color-info: var(--toastify-color-info);--toastify-icon-color-success: var(--toastify-color-success);--toastify-icon-color-warning: var(--toastify-color-warning);--toastify-icon-color-error: var(--toastify-color-error);--toastify-container-width: fit-content;--toastify-toast-width: 320px;--toastify-toast-offset: 16px;--toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));--toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));--toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));--toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));--toastify-toast-background: #fff;--toastify-toast-padding: 14px;--toastify-toast-min-height: 64px;--toastify-toast-max-height: 800px;--toastify-toast-bd-radius: 6px;--toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, .1);--toastify-font-family: sans-serif;--toastify-z-index: 9999;--toastify-text-color-light: #757575;--toastify-text-color-dark: #fff;--toastify-text-color-info: #fff;--toastify-text-color-success: #fff;--toastify-text-color-warning: #fff;--toastify-text-color-error: #fff;--toastify-spinner-color: #616161;--toastify-spinner-color-empty-area: #e0e0e0;--toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);--toastify-color-progress-dark: #bb86fc;--toastify-color-progress-info: var(--toastify-color-info);--toastify-color-progress-success: var(--toastify-color-success);--toastify-color-progress-warning: var(--toastify-color-warning);--toastify-color-progress-error: var(--toastify-color-error);--toastify-color-progress-bgo: .2}.Toastify__toast-container{z-index:var(--toastify-z-index);-webkit-transform:translate3d(0,0,var(--toastify-z-index));position:fixed;width:var(--toastify-container-width);box-sizing:border-box;color:#fff;display:flex;flex-direction:column}.Toastify__toast-container--top-left{top:var(--toastify-toast-top);left:var(--toastify-toast-left)}.Toastify__toast-container--top-center{top:var(--toastify-toast-top);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--top-right{top:var(--toastify-toast-top);right:var(--toastify-toast-right);align-items:end}.Toastify__toast-container--bottom-left{bottom:var(--toastify-toast-bottom);left:var(--toastify-toast-left)}.Toastify__toast-container--bottom-center{bottom:var(--toastify-toast-bottom);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--bottom-right{bottom:var(--toastify-toast-bottom);right:var(--toastify-toast-right);align-items:end}.Toastify__toast{--y: 0;position:relative;touch-action:none;width:var(--toastify-toast-width);min-height:var(--toastify-toast-min-height);box-sizing:border-box;margin-bottom:1rem;padding:var(--toastify-toast-padding);border-radius:var(--toastify-toast-bd-radius);box-shadow:var(--toastify-toast-shadow);max-height:var(--toastify-toast-max-height);font-family:var(--toastify-font-family);z-index:0;display:flex;flex:1 auto;align-items:center;word-break:break-word}@media only screen and (max-width: 480px){.Toastify__toast-container{width:100vw;left:env(safe-area-inset-left);margin:0}.Toastify__toast-container--top-left,.Toastify__toast-container--top-center,.Toastify__toast-container--top-right{top:env(safe-area-inset-top);transform:translate(0)}.Toastify__toast-container--bottom-left,.Toastify__toast-container--bottom-center,.Toastify__toast-container--bottom-right{bottom:env(safe-area-inset-bottom);transform:translate(0)}.Toastify__toast-container--rtl{right:env(safe-area-inset-right);left:initial}.Toastify__toast{--toastify-toast-width: 100%;margin-bottom:0;border-radius:0}}.Toastify__toast-container[data-stacked=true]{width:var(--toastify-toast-width)}.Toastify__toast--stacked{position:absolute;width:100%;transform:translate3d(0,var(--y),0) scale(var(--s));transition:transform .3s}.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,.Toastify__toast--stacked[data-collapsed] .Toastify__close-button{transition:opacity .1s}.Toastify__toast--stacked[data-collapsed=false]{overflow:visible}.Toastify__toast--stacked[data-collapsed=true]:not(:last-child)>*{opacity:0}.Toastify__toast--stacked:after{content:"";position:absolute;left:0;right:0;height:calc(var(--g) * 1px);bottom:100%}.Toastify__toast--stacked[data-pos=top]{top:0}.Toastify__toast--stacked[data-pos=bot]{bottom:0}.Toastify__toast--stacked[data-pos=bot].Toastify__toast--stacked:before{transform-origin:top}.Toastify__toast--stacked[data-pos=top].Toastify__toast--stacked:before{transform-origin:bottom}.Toastify__toast--stacked:before{content:"";position:absolute;left:0;right:0;bottom:0;height:100%;transform:scaleY(3);z-index:-1}.Toastify__toast--rtl{direction:rtl}.Toastify__toast--close-on-click{cursor:pointer}.Toastify__toast-icon{margin-inline-end:10px;width:22px;flex-shrink:0;display:flex}.Toastify--animate{animation-fill-mode:both;animation-duration:.5s}.Toastify--animate-icon{animation-fill-mode:both;animation-duration:.3s}.Toastify__toast-theme--dark{background:var(--toastify-color-dark);color:var(--toastify-text-color-dark)}.Toastify__toast-theme--light,.Toastify__toast-theme--colored.Toastify__toast--default{background:var(--toastify-color-light);color:var(--toastify-text-color-light)}.Toastify__toast-theme--colored.Toastify__toast--info{color:var(--toastify-text-color-info);background:var(--toastify-color-info)}.Toastify__toast-theme--colored.Toastify__toast--success{color:var(--toastify-text-color-success);background:var(--toastify-color-success)}.Toastify__toast-theme--colored.Toastify__toast--warning{color:var(--toastify-text-color-warning);background:var(--toastify-color-warning)}.Toastify__toast-theme--colored.Toastify__toast--error{color:var(--toastify-text-color-error);background:var(--toastify-color-error)}.Toastify__progress-bar-theme--light{background:var(--toastify-color-progress-light)}.Toastify__progress-bar-theme--dark{background:var(--toastify-color-progress-dark)}.Toastify__progress-bar--info{background:var(--toastify-color-progress-info)}.Toastify__progress-bar--success{background:var(--toastify-color-progress-success)}.Toastify__progress-bar--warning{background:var(--toastify-color-progress-warning)}.Toastify__progress-bar--error{background:var(--toastify-color-progress-error)}.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error{background:var(--toastify-color-transparent)}.Toastify__close-button{color:#fff;position:absolute;top:6px;right:6px;background:transparent;outline:none;border:none;padding:0;cursor:pointer;opacity:.7;transition:.3s ease;z-index:1}.Toastify__toast--rtl .Toastify__close-button{left:6px;right:unset}.Toastify__close-button--light{color:#000;opacity:.3}.Toastify__close-button>svg{fill:currentColor;height:16px;width:14px}.Toastify__close-button:hover,.Toastify__close-button:focus{opacity:1}@keyframes Toastify__trackProgress{0%{transform:scaleX(1)}to{transform:scaleX(0)}}.Toastify__progress-bar{position:absolute;bottom:0;left:0;width:100%;height:100%;z-index:1;opacity:.7;transform-origin:left}.Toastify__progress-bar--animated{animation:Toastify__trackProgress linear 1 forwards}.Toastify__progress-bar--controlled{transition:transform .2s}.Toastify__progress-bar--rtl{right:0;left:initial;transform-origin:right;border-bottom-left-radius:initial}.Toastify__progress-bar--wrp{position:absolute;overflow:hidden;bottom:0;left:0;width:100%;height:5px;border-bottom-left-radius:var(--toastify-toast-bd-radius);border-bottom-right-radius:var(--toastify-toast-bd-radius)}.Toastify__progress-bar--wrp[data-hidden=true]{opacity:0}.Toastify__progress-bar--bg{opacity:var(--toastify-color-progress-bgo);width:100%;height:100%}.Toastify__spinner{width:20px;height:20px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--toastify-spinner-color-empty-area);border-right-color:var(--toastify-spinner-color);animation:Toastify__spin .65s linear infinite}@keyframes Toastify__bounceInRight{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutRight{20%{opacity:1;transform:translate3d(-20px,var(--y),0)}to{opacity:0;transform:translate3d(2000px,var(--y),0)}}@keyframes Toastify__bounceInLeft{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutLeft{20%{opacity:1;transform:translate3d(20px,var(--y),0)}to{opacity:0;transform:translate3d(-2000px,var(--y),0)}}@keyframes Toastify__bounceInUp{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translateZ(0)}}@keyframes Toastify__bounceOutUp{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}@keyframes Toastify__bounceInDown{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:none}}@keyframes Toastify__bounceOutDown{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,2000px,0)}}.Toastify__bounce-enter--top-left,.Toastify__bounce-enter--bottom-left{animation-name:Toastify__bounceInLeft}.Toastify__bounce-enter--top-right,.Toastify__bounce-enter--bottom-right{animation-name:Toastify__bounceInRight}.Toastify__bounce-enter--top-center{animation-name:Toastify__bounceInDown}.Toastify__bounce-enter--bottom-center{animation-name:Toastify__bounceInUp}.Toastify__bounce-exit--top-left,.Toastify__bounce-exit--bottom-left{animation-name:Toastify__bounceOutLeft}.Toastify__bounce-exit--top-right,.Toastify__bounce-exit--bottom-right{animation-name:Toastify__bounceOutRight}.Toastify__bounce-exit--top-center{animation-name:Toastify__bounceOutUp}.Toastify__bounce-exit--bottom-center{animation-name:Toastify__bounceOutDown}@keyframes Toastify__zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes Toastify__zoomOut{0%{opacity:1}50%{opacity:0;transform:translate3d(0,var(--y),0) scale3d(.3,.3,.3)}to{opacity:0}}.Toastify__zoom-enter{animation-name:Toastify__zoomIn}.Toastify__zoom-exit{animation-name:Toastify__zoomOut}@keyframes Toastify__flipIn{0%{transform:perspective(400px) rotateX(90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotateX(-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotateX(10deg);opacity:1}80%{transform:perspective(400px) rotateX(-5deg)}to{transform:perspective(400px)}}@keyframes Toastify__flipOut{0%{transform:translate3d(0,var(--y),0) perspective(400px)}30%{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(-20deg);opacity:1}to{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(90deg);opacity:0}}.Toastify__flip-enter{animation-name:Toastify__flipIn}.Toastify__flip-exit{animation-name:Toastify__flipOut}@keyframes Toastify__slideInRight{0%{transform:translate3d(110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInLeft{0%{transform:translate3d(-110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInUp{0%{transform:translate3d(0,110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInDown{0%{transform:translate3d(0,-110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideOutRight{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(110%,var(--y),0)}}@keyframes Toastify__slideOutLeft{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(-110%,var(--y),0)}}@keyframes Toastify__slideOutDown{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,500px,0)}}@keyframes Toastify__slideOutUp{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,-500px,0)}}.Toastify__slide-enter--top-left,.Toastify__slide-enter--bottom-left{animation-name:Toastify__slideInLeft}.Toastify__slide-enter--top-right,.Toastify__slide-enter--bottom-right{animation-name:Toastify__slideInRight}.Toastify__slide-enter--top-center{animation-name:Toastify__slideInDown}.Toastify__slide-enter--bottom-center{animation-name:Toastify__slideInUp}.Toastify__slide-exit--top-left,.Toastify__slide-exit--bottom-left{animation-name:Toastify__slideOutLeft;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-right,.Toastify__slide-exit--bottom-right{animation-name:Toastify__slideOutRight;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-center{animation-name:Toastify__slideOutUp;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--bottom-center{animation-name:Toastify__slideOutDown;animation-timing-function:ease-in;animation-duration:.3s}@keyframes Toastify__spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n');var yt=e=>"number"==typeof e&&!isNaN(e),bt=e=>"string"==typeof e,vt=e=>"function"==typeof e,xt=e=>bt(e)||vt(e)?e:null,wt=(e,t)=>!1===e||yt(e)&&e>0?e:t,kt=e=>(0,n.isValidElement)(e)||bt(e)||vt(e)||yt(e);function St(e){let{enter:t,exit:r,appendPosition:o=!1,collapse:a=!0,collapseDuration:i=300}=e;return function(e){let{children:s,position:l,preventExitTransition:c,done:u,nodeRef:d,isIn:f,playToast:p}=e,h=o?`${t}--${l}`:t,m=o?`${r}--${l}`:r,g=(0,n.useRef)(0);return(0,n.useLayoutEffect)(()=>{let e=d.current,t=h.split(" "),r=n=>{n.target===d.current&&(p(),e.removeEventListener("animationend",r),e.removeEventListener("animationcancel",r),0===g.current&&"animationcancel"!==n.type&&e.classList.remove(...t))};e.classList.add(...t),e.addEventListener("animationend",r),e.addEventListener("animationcancel",r)},[]),(0,n.useEffect)(()=>{let e=d.current,t=()=>{e.removeEventListener("animationend",t),a?function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:300,{scrollHeight:n,style:o}=e;requestAnimationFrame(()=>{o.minHeight="initial",o.height=n+"px",o.transition=`all ${r}ms`,requestAnimationFrame(()=>{o.height="0",o.padding="0",o.margin="0",setTimeout(t,r)})})}(e,u,i):u()};f||(c?t():(g.current=1,e.className+=` ${m}`,e.addEventListener("animationend",t)))},[f]),n.createElement(n.Fragment,null,s)}}function jt(e,t){return{content:_t(e.content,e.props),containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,reason:e.removalReason,status:t}}function _t(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return(0,n.isValidElement)(e)&&!bt(e.type)?(0,n.cloneElement)(e,{closeToast:t.closeToast,toastProps:t,data:t.data,isPaused:r}):vt(e)?e({closeToast:t.closeToast,toastProps:t,data:t.data,isPaused:r}):e}function Et(e){let{delay:t,isRunning:r,closeToast:o,type:a="default",hide:i,className:s,controlledProgress:l,progress:c,rtl:u,isIn:d,theme:f}=e,p=i||l&&0===c,h={animationDuration:`${t}ms`,animationPlayState:r?"running":"paused"};l&&(h.transform=`scaleX(${c})`);let m=gt("Toastify__progress-bar",l?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${f}`,`Toastify__progress-bar--${a}`,{"Toastify__progress-bar--rtl":u}),g=vt(s)?s({rtl:u,type:a,defaultClassName:m}):gt(m,s),y={[l&&c>=1?"onTransitionEnd":"onAnimationEnd"]:l&&c<1?null:()=>{d&&o()}};return n.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":p},n.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${f} Toastify__progress-bar--${a}`}),n.createElement("div",{role:"progressbar","aria-hidden":p?"true":"false","aria-label":"notification timer",className:g,style:h,...y}))}var Ct=1,Tt=()=>""+Ct++;function Rt(e,t,r){let n=1,o=0,a=[],i=[],s=t,l=new Map,c=new Set,u=()=>{i=Array.from(l.values()),c.forEach(e=>e())},d=e=>{var t,r;null==(r=null==(t=e.props)?void 0:t.onClose)||r.call(t,e.removalReason),e.isActive=!1},f=e=>{if(null==e)l.forEach(d);else{let t=l.get(e);t&&d(t)}u()},p=e=>{var t,n;let{toastId:o,updateId:a}=e.props,i=null==a;e.staleId&&l.delete(e.staleId),e.isActive=!0,l.set(o,e),u(),r(jt(e,i?"added":"updated")),i&&(null==(n=(t=e.props).onOpen)||n.call(t))};return{id:e,props:s,observe:e=>(c.add(e),()=>c.delete(e)),toggle:(e,t)=>{l.forEach(r=>{var n;(null==t||t===r.props.toastId)&&(null==(n=r.toggle)||n.call(r,e))})},removeToast:f,toasts:l,clearQueue:()=>{o-=a.length,a=[]},buildToast:(t,i)=>{if((t=>{let{containerId:r,toastId:n,updateId:o}=t,a=r?r!==e:1!==e,i=l.has(n)&&null==o;return a||i})(i))return;let{toastId:c,updateId:d,data:h,staleId:m,delay:g}=i,y=null==d;y&&o++;let b={...s,style:s.toastStyle,key:n++,...Object.fromEntries(Object.entries(i).filter(e=>{let[t,r]=e;return null!=r})),toastId:c,updateId:d,data:h,isIn:!1,className:xt(i.className||s.toastClassName),progressClassName:xt(i.progressClassName||s.progressClassName),autoClose:!i.isLoading&&wt(i.autoClose,s.autoClose),closeToast(e){l.get(c).removalReason=e,f(c)},deleteToast(){let e=l.get(c);if(null!=e){if(r(jt(e,"removed")),l.delete(c),o--,o<0&&(o=0),a.length>0)return void p(a.shift());u()}}};b.closeButton=s.closeButton,!1===i.closeButton||kt(i.closeButton)?b.closeButton=i.closeButton:!0===i.closeButton&&(b.closeButton=!kt(s.closeButton)||s.closeButton);let v={content:t,props:b,staleId:m};s.limit&&s.limit>0&&o>s.limit&&y?a.push(v):yt(g)?setTimeout(()=>{p(v)},g):p(v)},setProps(e){s=e},setToggle:(e,t)=>{let r=l.get(e);r&&(r.toggle=t)},isToastActive:e=>{var t;return null==(t=l.get(e))?void 0:t.isActive},getSnapshot:()=>i}}var Pt=new Map,zt=[],Nt=new Set,Ot=e=>Nt.forEach(t=>t(e)),At=()=>Pt.size>0;function Lt(e,t){var r;if(t)return!(null==(r=Pt.get(t))||!r.isToastActive(e));let n=!1;return Pt.forEach(t=>{t.isToastActive(e)&&(n=!0)}),n}function Dt(e){if(At()){if(null==e||(e=>bt(e)||yt(e))(e))Pt.forEach(t=>{t.removeToast(e)});else if(e&&("containerId"in e||"id"in e)){let t=Pt.get(e.containerId);t?t.removeToast(e.id):Pt.forEach(t=>{t.removeToast(e.id)})}}else zt=zt.filter(t=>null!=e&&t.options.toastId!==e)}function It(e,t){kt(e)&&(At()||zt.push({content:e,options:t}),Pt.forEach(r=>{r.buildToast(e,t)}))}function $t(e,t){Pt.forEach(r=>{(null==t||null==t||!t.containerId||(null==t?void 0:t.containerId)===r.id)&&r.toggle(e,null==t?void 0:t.id)})}function Ft(e){let t=e.containerId||1;return{subscribe(r){let n=Rt(t,e,Ot);Pt.set(t,n);let o=n.observe(r);return zt.forEach(e=>It(e.content,e.options)),zt=[],()=>{o(),Pt.delete(t)}},setProps(e){var r;null==(r=Pt.get(t))||r.setProps(e)},getSnapshot(){var e;return null==(e=Pt.get(t))?void 0:e.getSnapshot()}}}function Mt(e){return e&&(bt(e.toastId)||yt(e.toastId))?e.toastId:Tt()}function Bt(e,t){return It(e,t),t.toastId}function Ut(e,t){return{...t,type:t&&t.type||e,toastId:Mt(t)}}function qt(e){return(t,r)=>Bt(t,Ut(e,r))}function Ht(e,t){return Bt(e,Ut("default",t))}function Wt(e){let[t,r]=(0,n.useState)(!1),[o,a]=(0,n.useState)(!1),i=(0,n.useRef)(null),s=(0,n.useRef)({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:l,pauseOnHover:c,closeToast:u,onClick:d,closeOnClick:f}=e;function p(){r(!0)}function h(){r(!1)}function m(r){let n=i.current;if(s.canDrag&&n){s.didMove=!0,t&&h(),"x"===e.draggableDirection?s.delta=r.clientX-s.start:s.delta=r.clientY-s.start,s.start!==r.clientX&&(s.canCloseOnClick=!1);let o="x"===e.draggableDirection?`${s.delta}px, var(--y)`:`0, calc(${s.delta}px + var(--y))`;n.style.transform=`translate3d(${o},0)`,n.style.opacity=""+(1-Math.abs(s.delta/s.removalDistance))}}function g(){document.removeEventListener("pointermove",m),document.removeEventListener("pointerup",g);let t=i.current;if(s.canDrag&&s.didMove&&t){if(s.canDrag=!1,Math.abs(s.delta)>s.removalDistance)return a(!0),e.closeToast(!0),void e.collapseAll();t.style.transition="transform 0.2s, opacity 0.2s",t.style.removeProperty("transform"),t.style.removeProperty("opacity")}}(function(e){var t;null==(t=Pt.get(e.containerId||1))||t.setToggle(e.id,e.fn)})({id:e.toastId,containerId:e.containerId,fn:r}),(0,n.useEffect)(()=>{if(e.pauseOnFocusLoss)return document.hasFocus()||h(),window.addEventListener("focus",p),window.addEventListener("blur",h),()=>{window.removeEventListener("focus",p),window.removeEventListener("blur",h)}},[e.pauseOnFocusLoss]);let y={onPointerDown:function(t){if(!0===e.draggable||e.draggable===t.pointerType){s.didMove=!1,document.addEventListener("pointermove",m),document.addEventListener("pointerup",g);let r=i.current;s.canCloseOnClick=!0,s.canDrag=!0,r.style.transition="none","x"===e.draggableDirection?(s.start=t.clientX,s.removalDistance=r.offsetWidth*(e.draggablePercent/100)):(s.start=t.clientY,s.removalDistance=r.offsetHeight*(80===e.draggablePercent?1.5*e.draggablePercent:e.draggablePercent)/100)}},onPointerUp:function(t){let{top:r,bottom:n,left:o,right:a}=i.current.getBoundingClientRect();"touchend"!==t.nativeEvent.type&&e.pauseOnHover&&t.clientX>=o&&t.clientX<=a&&t.clientY>=r&&t.clientY<=n?h():p()}};return l&&c&&(y.onMouseEnter=h,e.stacked||(y.onMouseLeave=p)),f&&(y.onClick=e=>{d&&d(e),s.canCloseOnClick&&u(!0)}),{playToast:p,pauseToast:h,isRunning:t,preventExitTransition:o,toastRef:i,eventHandlers:y}}Ht.loading=(e,t)=>Bt(e,Ut("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...t})),Ht.promise=function(e,t,r){let n,{pending:o,error:a,success:i}=t;o&&(n=bt(o)?Ht.loading(o,r):Ht.loading(o.render,{...r,...o}));let s={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},l=(e,t,o)=>{if(null==t)return void Ht.dismiss(n);let a={type:e,...s,...r,data:o},i=bt(t)?{render:t}:t;return n?Ht.update(n,{...a,...i}):Ht(i.render,{...a,...i}),o},c=vt(e)?e():e;return c.then(e=>l("success",i,e)).catch(e=>l("error",a,e)),c},Ht.success=qt("success"),Ht.info=qt("info"),Ht.error=qt("error"),Ht.warning=qt("warning"),Ht.warn=Ht.warning,Ht.dark=(e,t)=>Bt(e,Ut("default",{theme:"dark",...t})),Ht.dismiss=function(e){Dt(e)},Ht.clearWaitingQueue=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Pt.forEach(t=>{t.props.limit&&(!e.containerId||t.id===e.containerId)&&t.clearQueue()})},Ht.isActive=Lt,Ht.update=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=((e,t)=>{let{containerId:r}=t;var n;return null==(n=Pt.get(r||1))?void 0:n.toasts.get(e)})(e,t);if(r){let{props:n,content:o}=r,a={delay:100,...n,...t,toastId:t.toastId||e,updateId:Tt()};a.toastId!==e&&(a.staleId=e);let i=a.render||o;delete a.render,Bt(i,a)}},Ht.done=e=>{Ht.update(e,{progress:1})},Ht.onChange=function(e){return Nt.add(e),()=>{Nt.delete(e)}},Ht.play=e=>$t(!0,e),Ht.pause=e=>$t(!1,e);var Vt="undefined"!=typeof window?n.useLayoutEffect:n.useEffect,Yt=e=>{let{theme:t,type:r,isLoading:o,...a}=e;return n.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:"colored"===t?"currentColor":`var(--toastify-icon-color-${r})`,...a})};var Kt={info:function(e){return n.createElement(Yt,{...e},n.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(e){return n.createElement(Yt,{...e},n.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(e){return n.createElement(Yt,{...e},n.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(e){return n.createElement(Yt,{...e},n.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return n.createElement("div",{className:"Toastify__spinner"})}};function Qt(e){let{theme:t,type:r,isLoading:o,icon:a}=e,i=null,s={theme:t,type:r};return!1===a||(vt(a)?i=a({...s,isLoading:o}):(0,n.isValidElement)(a)?i=(0,n.cloneElement)(a,s):o?i=Kt.spinner():(e=>e in Kt)(r)&&(i=Kt[r](s))),i}var Xt=e=>{let{isRunning:t,preventExitTransition:r,toastRef:o,eventHandlers:a,playToast:i}=Wt(e),{closeButton:s,children:l,autoClose:c,onClick:u,type:d,hideProgressBar:f,closeToast:p,transition:h,position:m,className:g,style:y,progressClassName:b,updateId:v,role:x,progress:w,rtl:k,toastId:S,deleteToast:j,isIn:_,isLoading:E,closeOnClick:C,theme:T,ariaLabel:R}=e,P=gt("Toastify__toast",`Toastify__toast-theme--${T}`,`Toastify__toast--${d}`,{"Toastify__toast--rtl":k},{"Toastify__toast--close-on-click":C}),z=vt(g)?g({rtl:k,position:m,type:d,defaultClassName:P}):gt(P,g),N=Qt(e),O=!!w||!c,A={closeToast:p,type:d,theme:T},L=null;return!1===s||(L=vt(s)?s(A):(0,n.isValidElement)(s)?(0,n.cloneElement)(s,A):function(e){let{closeToast:t,theme:r,ariaLabel:o="close"}=e;return n.createElement("button",{className:`Toastify__close-button Toastify__close-button--${r}`,type:"button",onClick:e=>{e.stopPropagation(),t(!0)},"aria-label":o},n.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},n.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}(A)),n.createElement(h,{isIn:_,done:j,position:m,preventExitTransition:r,nodeRef:o,playToast:i},n.createElement("div",{id:S,tabIndex:0,onClick:u,"data-in":_,className:z,...a,style:y,ref:o,..._&&{role:x,"aria-label":R}},null!=N&&n.createElement("div",{className:gt("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!E})},N),_t(l,e,!t),L,!e.customProgressBar&&n.createElement(Et,{...v&&!O?{key:`p-${v}`}:{},rtl:k,theme:T,delay:c,isRunning:t,isIn:_,closeToast:p,hide:f,type:d,className:b,controlledProgress:O,progress:w||0})))},Gt=function(e){return{enter:`Toastify--animate Toastify__${e}-enter`,exit:`Toastify--animate Toastify__${e}-exit`,appendPosition:arguments.length>1&&void 0!==arguments[1]&&arguments[1]}},Jt=St(Gt("bounce",!0)),Zt=(St(Gt("slide",!0)),St(Gt("zoom")),St(Gt("flip")),{position:"top-right",transition:Jt,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light","aria-label":"Notifications Alt+T",hotKeys:e=>e.altKey&&"KeyT"===e.code});function er(e){let t={...Zt,...e},r=e.stacked,[o,a]=(0,n.useState)(!0),i=(0,n.useRef)(null),{getToastToRender:s,isToastActive:l,count:c}=function(e){var t;let{subscribe:r,getSnapshot:o,setProps:a}=(0,n.useRef)(Ft(e)).current;a(e);let i=null==(t=(0,n.useSyncExternalStore)(r,o,o))?void 0:t.slice();return{getToastToRender:function(t){if(!i)return[];let r=new Map;return e.newestOnTop&&i.reverse(),i.forEach(e=>{let{position:t}=e.props;r.has(t)||r.set(t,[]),r.get(t).push(e)}),Array.from(r,e=>t(e[0],e[1]))},isToastActive:Lt,count:null==i?void 0:i.length}}(t),{className:u,style:d,rtl:f,containerId:p,hotKeys:h}=t;function m(e){let t=gt("Toastify__toast-container",`Toastify__toast-container--${e}`,{"Toastify__toast-container--rtl":f});return vt(u)?u({position:e,rtl:f,defaultClassName:t}):gt(t,xt(u))}function g(){r&&(a(!0),Ht.play())}return Vt(()=>{var e;if(r){let r=i.current.querySelectorAll('[data-in="true"]'),n=12,a=null==(e=t.position)?void 0:e.includes("top"),s=0,l=0;Array.from(r).reverse().forEach((e,t)=>{let r=e;r.classList.add("Toastify__toast--stacked"),t>0&&(r.dataset.collapsed=`${o}`),r.dataset.pos||(r.dataset.pos=a?"top":"bot");let i=s*(o?.2:1)+(o?0:n*t);r.style.setProperty("--y",`${a?i:-1*i}px`),r.style.setProperty("--g",`${n}`),r.style.setProperty("--s",""+(1-(o?l:0))),s+=r.offsetHeight,l+=.025})}},[o,c,r]),(0,n.useEffect)(()=>{function e(e){var t;let r=i.current;h(e)&&(null==(t=r.querySelector('[tabIndex="0"]'))||t.focus(),a(!1),Ht.pause()),"Escape"===e.key&&(document.activeElement===r||null!=r&&r.contains(document.activeElement))&&(a(!0),Ht.play())}return document.addEventListener("keydown",e),()=>{document.removeEventListener("keydown",e)}},[h]),n.createElement("section",{ref:i,className:"Toastify",id:p,onMouseEnter:()=>{r&&(a(!1),Ht.pause())},onMouseLeave:g,"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions text","aria-label":t["aria-label"]},s((e,t)=>{let o=t.length?{...d}:{...d,pointerEvents:"none"};return n.createElement("div",{tabIndex:-1,className:m(e),"data-stacked":r,style:o,key:`c-${e}`},t.map(e=>{let{content:t,props:o}=e;return n.createElement(Xt,{...o,stacked:r,collapseAll:g,isIn:l(o.toastId,o.containerId),key:`t-${o.key}`},t)}))}))}function tr(e,t){return function(){return e.apply(t,arguments)}}const{toString:rr}=Object.prototype,{getPrototypeOf:nr}=Object,{iterator:or,toStringTag:ar}=Symbol,ir=(e=>t=>{const r=rr.call(t);return e[r]||(e[r]=r.slice(8,-1).toLowerCase())})(Object.create(null)),sr=e=>(e=e.toLowerCase(),t=>ir(t)===e),lr=e=>t=>typeof t===e,{isArray:cr}=Array,ur=lr("undefined");function dr(e){return null!==e&&!ur(e)&&null!==e.constructor&&!ur(e.constructor)&&hr(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const fr=sr("ArrayBuffer");const pr=lr("string"),hr=lr("function"),mr=lr("number"),gr=e=>null!==e&&"object"===typeof e,yr=e=>{if("object"!==ir(e))return!1;const t=nr(e);return(null===t||t===Object.prototype||null===Object.getPrototypeOf(t))&&!(ar in e)&&!(or in e)},br=sr("Date"),vr=sr("File"),xr=sr("Blob"),wr=sr("FileList"),kr=sr("URLSearchParams"),[Sr,jr,_r,Er]=["ReadableStream","Request","Response","Headers"].map(sr);function Cr(e,t){let r,n,{allOwnKeys:o=!1}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(null!==e&&"undefined"!==typeof e)if("object"!==typeof e&&(e=[e]),cr(e))for(r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else{if(dr(e))return;const n=o?Object.getOwnPropertyNames(e):Object.keys(e),a=n.length;let i;for(r=0;r<a;r++)i=n[r],t.call(null,e[i],i,e)}}function Tr(e,t){if(dr(e))return null;t=t.toLowerCase();const r=Object.keys(e);let n,o=r.length;for(;o-- >0;)if(n=r[o],t===n.toLowerCase())return n;return null}const Rr="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:"undefined"!==typeof window?window:global,Pr=e=>!ur(e)&&e!==Rr;const zr=(Nr="undefined"!==typeof Uint8Array&&nr(Uint8Array),e=>Nr&&e instanceof Nr);var Nr;const Or=sr("HTMLFormElement"),Ar=(e=>{let{hasOwnProperty:t}=e;return(e,r)=>t.call(e,r)})(Object.prototype),Lr=sr("RegExp"),Dr=(e,t)=>{const r=Object.getOwnPropertyDescriptors(e),n={};Cr(r,(r,o)=>{let a;!1!==(a=t(r,o,e))&&(n[o]=a||r)}),Object.defineProperties(e,n)};const Ir=sr("AsyncFunction"),$r=(Fr="function"===typeof setImmediate,Mr=hr(Rr.postMessage),Fr?setImmediate:Mr?((e,t)=>(Rr.addEventListener("message",r=>{let{source:n,data:o}=r;n===Rr&&o===e&&t.length&&t.shift()()},!1),r=>{t.push(r),Rr.postMessage(e,"*")}))(`axios@${Math.random()}`,[]):e=>setTimeout(e));var Fr,Mr;const Br="undefined"!==typeof queueMicrotask?queueMicrotask.bind(Rr):"undefined"!==typeof process&&process.nextTick||$r,Ur={isArray:cr,isArrayBuffer:fr,isBuffer:dr,isFormData:e=>{let t;return e&&("function"===typeof FormData&&e instanceof FormData||hr(e.append)&&("formdata"===(t=ir(e))||"object"===t&&hr(e.toString)&&"[object FormData]"===e.toString()))},isArrayBufferView:function(e){let t;return t="undefined"!==typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&fr(e.buffer),t},isString:pr,isNumber:mr,isBoolean:e=>!0===e||!1===e,isObject:gr,isPlainObject:yr,isEmptyObject:e=>{if(!gr(e)||dr(e))return!1;try{return 0===Object.keys(e).length&&Object.getPrototypeOf(e)===Object.prototype}catch(hm){return!1}},isReadableStream:Sr,isRequest:jr,isResponse:_r,isHeaders:Er,isUndefined:ur,isDate:br,isFile:vr,isBlob:xr,isRegExp:Lr,isFunction:hr,isStream:e=>gr(e)&&hr(e.pipe),isURLSearchParams:kr,isTypedArray:zr,isFileList:wr,forEach:Cr,merge:function e(){const{caseless:t}=Pr(this)&&this||{},r={},n=(n,o)=>{const a=t&&Tr(r,o)||o;yr(r[a])&&yr(n)?r[a]=e(r[a],n):yr(n)?r[a]=e({},n):cr(n)?r[a]=n.slice():r[a]=n};for(let o=0,a=arguments.length;o<a;o++)arguments[o]&&Cr(arguments[o],n);return r},extend:function(e,t,r){let{allOwnKeys:n}=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return Cr(t,(t,n)=>{r&&hr(t)?e[n]=tr(t,r):e[n]=t},{allOwnKeys:n}),e},trim:e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),stripBOM:e=>(65279===e.charCodeAt(0)&&(e=e.slice(1)),e),inherits:(e,t,r,n)=>{e.prototype=Object.create(t.prototype,n),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),r&&Object.assign(e.prototype,r)},toFlatObject:(e,t,r,n)=>{let o,a,i;const s={};if(t=t||{},null==e)return t;do{for(o=Object.getOwnPropertyNames(e),a=o.length;a-- >0;)i=o[a],n&&!n(i,e,t)||s[i]||(t[i]=e[i],s[i]=!0);e=!1!==r&&nr(e)}while(e&&(!r||r(e,t))&&e!==Object.prototype);return t},kindOf:ir,kindOfTest:sr,endsWith:(e,t,r)=>{e=String(e),(void 0===r||r>e.length)&&(r=e.length),r-=t.length;const n=e.indexOf(t,r);return-1!==n&&n===r},toArray:e=>{if(!e)return null;if(cr(e))return e;let t=e.length;if(!mr(t))return null;const r=new Array(t);for(;t-- >0;)r[t]=e[t];return r},forEachEntry:(e,t)=>{const r=(e&&e[or]).call(e);let n;for(;(n=r.next())&&!n.done;){const r=n.value;t.call(e,r[0],r[1])}},matchAll:(e,t)=>{let r;const n=[];for(;null!==(r=e.exec(t));)n.push(r);return n},isHTMLForm:Or,hasOwnProperty:Ar,hasOwnProp:Ar,reduceDescriptors:Dr,freezeMethods:e=>{Dr(e,(t,r)=>{if(hr(e)&&-1!==["arguments","caller","callee"].indexOf(r))return!1;const n=e[r];hr(n)&&(t.enumerable=!1,"writable"in t?t.writable=!1:t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+r+"'")}))})},toObjectSet:(e,t)=>{const r={},n=e=>{e.forEach(e=>{r[e]=!0})};return cr(e)?n(e):n(String(e).split(t)),r},toCamelCase:e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(e,t,r){return t.toUpperCase()+r}),noop:()=>{},toFiniteNumber:(e,t)=>null!=e&&Number.isFinite(e=+e)?e:t,findKey:Tr,global:Rr,isContextDefined:Pr,isSpecCompliantForm:function(e){return!!(e&&hr(e.append)&&"FormData"===e[ar]&&e[or])},toJSONObject:e=>{const t=new Array(10),r=(e,n)=>{if(gr(e)){if(t.indexOf(e)>=0)return;if(dr(e))return e;if(!("toJSON"in e)){t[n]=e;const o=cr(e)?[]:{};return Cr(e,(e,t)=>{const a=r(e,n+1);!ur(a)&&(o[t]=a)}),t[n]=void 0,o}}return e};return r(e,0)},isAsyncFn:Ir,isThenable:e=>e&&(gr(e)||hr(e))&&hr(e.then)&&hr(e.catch),setImmediate:$r,asap:Br,isIterable:e=>null!=e&&hr(e[or])};function qr(e,t,r,n,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack,this.message=e,this.name="AxiosError",t&&(this.code=t),r&&(this.config=r),n&&(this.request=n),o&&(this.response=o,this.status=o.status?o.status:null)}Ur.inherits(qr,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:Ur.toJSONObject(this.config),code:this.code,status:this.status}}});const Hr=qr.prototype,Wr={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{Wr[e]={value:e}}),Object.defineProperties(qr,Wr),Object.defineProperty(Hr,"isAxiosError",{value:!0}),qr.from=(e,t,r,n,o,a)=>{const i=Object.create(Hr);return Ur.toFlatObject(e,i,function(e){return e!==Error.prototype},e=>"isAxiosError"!==e),qr.call(i,e.message,t,r,n,o),i.cause=e,i.name=e.name,a&&Object.assign(i,a),i};const Vr=qr;function Yr(e){return Ur.isPlainObject(e)||Ur.isArray(e)}function Kr(e){return Ur.endsWith(e,"[]")?e.slice(0,-2):e}function Qr(e,t,r){return e?e.concat(t).map(function(e,t){return e=Kr(e),!r&&t?"["+e+"]":e}).join(r?".":""):t}const Xr=Ur.toFlatObject(Ur,{},null,function(e){return/^is[A-Z]/.test(e)});const Gr=function(e,t,r){if(!Ur.isObject(e))throw new TypeError("target must be an object");t=t||new FormData;const n=(r=Ur.toFlatObject(r,{metaTokens:!0,dots:!1,indexes:!1},!1,function(e,t){return!Ur.isUndefined(t[e])})).metaTokens,o=r.visitor||c,a=r.dots,i=r.indexes,s=(r.Blob||"undefined"!==typeof Blob&&Blob)&&Ur.isSpecCompliantForm(t);if(!Ur.isFunction(o))throw new TypeError("visitor must be a function");function l(e){if(null===e)return"";if(Ur.isDate(e))return e.toISOString();if(Ur.isBoolean(e))return e.toString();if(!s&&Ur.isBlob(e))throw new Vr("Blob is not supported. Use a Buffer instead.");return Ur.isArrayBuffer(e)||Ur.isTypedArray(e)?s&&"function"===typeof Blob?new Blob([e]):Buffer.from(e):e}function c(e,r,o){let s=e;if(e&&!o&&"object"===typeof e)if(Ur.endsWith(r,"{}"))r=n?r:r.slice(0,-2),e=JSON.stringify(e);else if(Ur.isArray(e)&&function(e){return Ur.isArray(e)&&!e.some(Yr)}(e)||(Ur.isFileList(e)||Ur.endsWith(r,"[]"))&&(s=Ur.toArray(e)))return r=Kr(r),s.forEach(function(e,n){!Ur.isUndefined(e)&&null!==e&&t.append(!0===i?Qr([r],n,a):null===i?r:r+"[]",l(e))}),!1;return!!Yr(e)||(t.append(Qr(o,r,a),l(e)),!1)}const u=[],d=Object.assign(Xr,{defaultVisitor:c,convertValue:l,isVisitable:Yr});if(!Ur.isObject(e))throw new TypeError("data must be an object");return function e(r,n){if(!Ur.isUndefined(r)){if(-1!==u.indexOf(r))throw Error("Circular reference detected in "+n.join("."));u.push(r),Ur.forEach(r,function(r,a){!0===(!(Ur.isUndefined(r)||null===r)&&o.call(t,r,Ur.isString(a)?a.trim():a,n,d))&&e(r,n?n.concat(a):[a])}),u.pop()}}(e),t};function Jr(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(e){return t[e]})}function Zr(e,t){this._pairs=[],e&&Gr(e,this,t)}const en=Zr.prototype;en.append=function(e,t){this._pairs.push([e,t])},en.toString=function(e){const t=e?function(t){return e.call(this,t,Jr)}:Jr;return this._pairs.map(function(e){return t(e[0])+"="+t(e[1])},"").join("&")};const tn=Zr;function rn(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function nn(e,t,r){if(!t)return e;const n=r&&r.encode||rn;Ur.isFunction(r)&&(r={serialize:r});const o=r&&r.serialize;let a;if(a=o?o(t,r):Ur.isURLSearchParams(t)?t.toString():new tn(t,r).toString(n),a){const t=e.indexOf("#");-1!==t&&(e=e.slice(0,t)),e+=(-1===e.indexOf("?")?"?":"&")+a}return e}const on=class{constructor(){this.handlers=[]}use(e,t,r){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){Ur.forEach(this.handlers,function(t){null!==t&&e(t)})}},an={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},sn={isBrowser:!0,classes:{URLSearchParams:"undefined"!==typeof URLSearchParams?URLSearchParams:tn,FormData:"undefined"!==typeof FormData?FormData:null,Blob:"undefined"!==typeof Blob?Blob:null},protocols:["http","https","file","blob","url","data"]},ln="undefined"!==typeof window&&"undefined"!==typeof document,cn="object"===typeof navigator&&navigator||void 0,un=ln&&(!cn||["ReactNative","NativeScript","NS"].indexOf(cn.product)<0),dn="undefined"!==typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&"function"===typeof self.importScripts,fn=ln&&window.location.href||"http://localhost",pn={...e,...sn};const hn=function(e){function t(e,r,n,o){let a=e[o++];if("__proto__"===a)return!0;const i=Number.isFinite(+a),s=o>=e.length;if(a=!a&&Ur.isArray(n)?n.length:a,s)return Ur.hasOwnProp(n,a)?n[a]=[n[a],r]:n[a]=r,!i;n[a]&&Ur.isObject(n[a])||(n[a]=[]);return t(e,r,n[a],o)&&Ur.isArray(n[a])&&(n[a]=function(e){const t={},r=Object.keys(e);let n;const o=r.length;let a;for(n=0;n<o;n++)a=r[n],t[a]=e[a];return t}(n[a])),!i}if(Ur.isFormData(e)&&Ur.isFunction(e.entries)){const r={};return Ur.forEachEntry(e,(e,n)=>{t(function(e){return Ur.matchAll(/\w+|\[(\w*)]/g,e).map(e=>"[]"===e[0]?"":e[1]||e[0])}(e),n,r,0)}),r}return null};const mn={transitional:an,adapter:["xhr","http","fetch"],transformRequest:[function(e,t){const r=t.getContentType()||"",n=r.indexOf("application/json")>-1,o=Ur.isObject(e);o&&Ur.isHTMLForm(e)&&(e=new FormData(e));if(Ur.isFormData(e))return n?JSON.stringify(hn(e)):e;if(Ur.isArrayBuffer(e)||Ur.isBuffer(e)||Ur.isStream(e)||Ur.isFile(e)||Ur.isBlob(e)||Ur.isReadableStream(e))return e;if(Ur.isArrayBufferView(e))return e.buffer;if(Ur.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let a;if(o){if(r.indexOf("application/x-www-form-urlencoded")>-1)return function(e,t){return Gr(e,new pn.classes.URLSearchParams,{visitor:function(e,t,r,n){return pn.isNode&&Ur.isBuffer(e)?(this.append(t,e.toString("base64")),!1):n.defaultVisitor.apply(this,arguments)},...t})}(e,this.formSerializer).toString();if((a=Ur.isFileList(e))||r.indexOf("multipart/form-data")>-1){const t=this.env&&this.env.FormData;return Gr(a?{"files[]":e}:e,t&&new t,this.formSerializer)}}return o||n?(t.setContentType("application/json",!1),function(e,t,r){if(Ur.isString(e))try{return(t||JSON.parse)(e),Ur.trim(e)}catch(hm){if("SyntaxError"!==hm.name)throw hm}return(r||JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){const t=this.transitional||mn.transitional,r=t&&t.forcedJSONParsing,n="json"===this.responseType;if(Ur.isResponse(e)||Ur.isReadableStream(e))return e;if(e&&Ur.isString(e)&&(r&&!this.responseType||n)){const r=!(t&&t.silentJSONParsing)&&n;try{return JSON.parse(e)}catch(hm){if(r){if("SyntaxError"===hm.name)throw Vr.from(hm,Vr.ERR_BAD_RESPONSE,this,null,this.response);throw hm}}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:pn.classes.FormData,Blob:pn.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};Ur.forEach(["delete","get","head","post","put","patch"],e=>{mn.headers[e]={}});const gn=mn,yn=Ur.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),bn=Symbol("internals");function vn(e){return e&&String(e).trim().toLowerCase()}function xn(e){return!1===e||null==e?e:Ur.isArray(e)?e.map(xn):String(e)}function wn(e,t,r,n,o){return Ur.isFunction(n)?n.call(this,t,r):(o&&(t=r),Ur.isString(t)?Ur.isString(n)?-1!==t.indexOf(n):Ur.isRegExp(n)?n.test(t):void 0:void 0)}class kn{constructor(e){e&&this.set(e)}set(e,t,r){const n=this;function o(e,t,r){const o=vn(t);if(!o)throw new Error("header name must be a non-empty string");const a=Ur.findKey(n,o);(!a||void 0===n[a]||!0===r||void 0===r&&!1!==n[a])&&(n[a||t]=xn(e))}const a=(e,t)=>Ur.forEach(e,(e,r)=>o(e,r,t));if(Ur.isPlainObject(e)||e instanceof this.constructor)a(e,t);else if(Ur.isString(e)&&(e=e.trim())&&!/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim()))a((e=>{const t={};let r,n,o;return e&&e.split("\n").forEach(function(e){o=e.indexOf(":"),r=e.substring(0,o).trim().toLowerCase(),n=e.substring(o+1).trim(),!r||t[r]&&yn[r]||("set-cookie"===r?t[r]?t[r].push(n):t[r]=[n]:t[r]=t[r]?t[r]+", "+n:n)}),t})(e),t);else if(Ur.isObject(e)&&Ur.isIterable(e)){let r,n,o={};for(const t of e){if(!Ur.isArray(t))throw TypeError("Object iterator must return a key-value pair");o[n=t[0]]=(r=o[n])?Ur.isArray(r)?[...r,t[1]]:[r,t[1]]:t[1]}a(o,t)}else null!=e&&o(t,e,r);return this}get(e,t){if(e=vn(e)){const r=Ur.findKey(this,e);if(r){const e=this[r];if(!t)return e;if(!0===t)return function(e){const t=Object.create(null),r=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let n;for(;n=r.exec(e);)t[n[1]]=n[2];return t}(e);if(Ur.isFunction(t))return t.call(this,e,r);if(Ur.isRegExp(t))return t.exec(e);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=vn(e)){const r=Ur.findKey(this,e);return!(!r||void 0===this[r]||t&&!wn(0,this[r],r,t))}return!1}delete(e,t){const r=this;let n=!1;function o(e){if(e=vn(e)){const o=Ur.findKey(r,e);!o||t&&!wn(0,r[o],o,t)||(delete r[o],n=!0)}}return Ur.isArray(e)?e.forEach(o):o(e),n}clear(e){const t=Object.keys(this);let r=t.length,n=!1;for(;r--;){const o=t[r];e&&!wn(0,this[o],o,e,!0)||(delete this[o],n=!0)}return n}normalize(e){const t=this,r={};return Ur.forEach(this,(n,o)=>{const a=Ur.findKey(r,o);if(a)return t[a]=xn(n),void delete t[o];const i=e?function(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,t,r)=>t.toUpperCase()+r)}(o):String(o).trim();i!==o&&delete t[o],t[i]=xn(n),r[i]=!0}),this}concat(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return this.constructor.concat(this,...t)}toJSON(e){const t=Object.create(null);return Ur.forEach(this,(r,n)=>{null!=r&&!1!==r&&(t[n]=e&&Ur.isArray(r)?r.join(", "):r)}),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(e=>{let[t,r]=e;return t+": "+r}).join("\n")}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e){const t=new this(e);for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];return n.forEach(e=>t.set(e)),t}static accessor(e){const t=(this[bn]=this[bn]={accessors:{}}).accessors,r=this.prototype;function n(e){const n=vn(e);t[n]||(!function(e,t){const r=Ur.toCamelCase(" "+t);["get","set","has"].forEach(n=>{Object.defineProperty(e,n+r,{value:function(e,r,o){return this[n].call(this,t,e,r,o)},configurable:!0})})}(r,e),t[n]=!0)}return Ur.isArray(e)?e.forEach(n):n(e),this}}kn.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]),Ur.reduceDescriptors(kn.prototype,(e,t)=>{let{value:r}=e,n=t[0].toUpperCase()+t.slice(1);return{get:()=>r,set(e){this[n]=e}}}),Ur.freezeMethods(kn);const Sn=kn;function jn(e,t){const r=this||gn,n=t||r,o=Sn.from(n.headers);let a=n.data;return Ur.forEach(e,function(e){a=e.call(r,a,o.normalize(),t?t.status:void 0)}),o.normalize(),a}function _n(e){return!(!e||!e.__CANCEL__)}function En(e,t,r){Vr.call(this,null==e?"canceled":e,Vr.ERR_CANCELED,t,r),this.name="CanceledError"}Ur.inherits(En,Vr,{__CANCEL__:!0});const Cn=En;function Tn(e,t,r){const n=r.config.validateStatus;r.status&&n&&!n(r.status)?t(new Vr("Request failed with status code "+r.status,[Vr.ERR_BAD_REQUEST,Vr.ERR_BAD_RESPONSE][Math.floor(r.status/100)-4],r.config,r.request,r)):e(r)}const Rn=function(e,t){e=e||10;const r=new Array(e),n=new Array(e);let o,a=0,i=0;return t=void 0!==t?t:1e3,function(s){const l=Date.now(),c=n[i];o||(o=l),r[a]=s,n[a]=l;let u=i,d=0;for(;u!==a;)d+=r[u++],u%=e;if(a=(a+1)%e,a===i&&(i=(i+1)%e),l-o<t)return;const f=c&&l-c;return f?Math.round(1e3*d/f):void 0}};const Pn=function(e,t){let r,n,o=0,a=1e3/t;const i=function(t){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Date.now();o=a,r=null,n&&(clearTimeout(n),n=null),e(...t)};return[function(){const e=Date.now(),t=e-o;for(var s=arguments.length,l=new Array(s),c=0;c<s;c++)l[c]=arguments[c];t>=a?i(l,e):(r=l,n||(n=setTimeout(()=>{n=null,i(r)},a-t)))},()=>r&&i(r)]},zn=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3,n=0;const o=Rn(50,250);return Pn(r=>{const a=r.loaded,i=r.lengthComputable?r.total:void 0,s=a-n,l=o(s);n=a;e({loaded:a,total:i,progress:i?a/i:void 0,bytes:s,rate:l||void 0,estimated:l&&i&&a<=i?(i-a)/l:void 0,event:r,lengthComputable:null!=i,[t?"download":"upload"]:!0})},r)},Nn=(e,t)=>{const r=null!=e;return[n=>t[0]({lengthComputable:r,total:e,loaded:n}),t[1]]},On=e=>function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Ur.asap(()=>e(...r))},An=pn.hasStandardBrowserEnv?((e,t)=>r=>(r=new URL(r,pn.origin),e.protocol===r.protocol&&e.host===r.host&&(t||e.port===r.port)))(new URL(pn.origin),pn.navigator&&/(msie|trident)/i.test(pn.navigator.userAgent)):()=>!0,Ln=pn.hasStandardBrowserEnv?{write(e,t,r,n,o,a){const i=[e+"="+encodeURIComponent(t)];Ur.isNumber(r)&&i.push("expires="+new Date(r).toGMTString()),Ur.isString(n)&&i.push("path="+n),Ur.isString(o)&&i.push("domain="+o),!0===a&&i.push("secure"),document.cookie=i.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read:()=>null,remove(){}};function Dn(e,t,r){let n=!function(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}(t);return e&&(n||0==r)?function(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}(e,t):t}const In=e=>e instanceof Sn?{...e}:e;function $n(e,t){t=t||{};const r={};function n(e,t,r,n){return Ur.isPlainObject(e)&&Ur.isPlainObject(t)?Ur.merge.call({caseless:n},e,t):Ur.isPlainObject(t)?Ur.merge({},t):Ur.isArray(t)?t.slice():t}function o(e,t,r,o){return Ur.isUndefined(t)?Ur.isUndefined(e)?void 0:n(void 0,e,0,o):n(e,t,0,o)}function a(e,t){if(!Ur.isUndefined(t))return n(void 0,t)}function i(e,t){return Ur.isUndefined(t)?Ur.isUndefined(e)?void 0:n(void 0,e):n(void 0,t)}function s(r,o,a){return a in t?n(r,o):a in e?n(void 0,r):void 0}const l={url:a,method:a,data:a,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,withXSRFToken:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:s,headers:(e,t,r)=>o(In(e),In(t),0,!0)};return Ur.forEach(Object.keys({...e,...t}),function(n){const a=l[n]||o,i=a(e[n],t[n],n);Ur.isUndefined(i)&&a!==s||(r[n]=i)}),r}const Fn=e=>{const t=$n({},e);let r,{data:n,withXSRFToken:o,xsrfHeaderName:a,xsrfCookieName:i,headers:s,auth:l}=t;if(t.headers=s=Sn.from(s),t.url=nn(Dn(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),l&&s.set("Authorization","Basic "+btoa((l.username||"")+":"+(l.password?unescape(encodeURIComponent(l.password)):""))),Ur.isFormData(n))if(pn.hasStandardBrowserEnv||pn.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(!1!==(r=s.getContentType())){const[e,...t]=r?r.split(";").map(e=>e.trim()).filter(Boolean):[];s.setContentType([e||"multipart/form-data",...t].join("; "))}if(pn.hasStandardBrowserEnv&&(o&&Ur.isFunction(o)&&(o=o(t)),o||!1!==o&&An(t.url))){const e=a&&i&&Ln.read(i);e&&s.set(a,e)}return t},Mn="undefined"!==typeof XMLHttpRequest&&function(e){return new Promise(function(t,r){const n=Fn(e);let o=n.data;const a=Sn.from(n.headers).normalize();let i,s,l,c,u,{responseType:d,onUploadProgress:f,onDownloadProgress:p}=n;function h(){c&&c(),u&&u(),n.cancelToken&&n.cancelToken.unsubscribe(i),n.signal&&n.signal.removeEventListener("abort",i)}let m=new XMLHttpRequest;function g(){if(!m)return;const n=Sn.from("getAllResponseHeaders"in m&&m.getAllResponseHeaders());Tn(function(e){t(e),h()},function(e){r(e),h()},{data:d&&"text"!==d&&"json"!==d?m.response:m.responseText,status:m.status,statusText:m.statusText,headers:n,config:e,request:m}),m=null}m.open(n.method.toUpperCase(),n.url,!0),m.timeout=n.timeout,"onloadend"in m?m.onloadend=g:m.onreadystatechange=function(){m&&4===m.readyState&&(0!==m.status||m.responseURL&&0===m.responseURL.indexOf("file:"))&&setTimeout(g)},m.onabort=function(){m&&(r(new Vr("Request aborted",Vr.ECONNABORTED,e,m)),m=null)},m.onerror=function(){r(new Vr("Network Error",Vr.ERR_NETWORK,e,m)),m=null},m.ontimeout=function(){let t=n.timeout?"timeout of "+n.timeout+"ms exceeded":"timeout exceeded";const o=n.transitional||an;n.timeoutErrorMessage&&(t=n.timeoutErrorMessage),r(new Vr(t,o.clarifyTimeoutError?Vr.ETIMEDOUT:Vr.ECONNABORTED,e,m)),m=null},void 0===o&&a.setContentType(null),"setRequestHeader"in m&&Ur.forEach(a.toJSON(),function(e,t){m.setRequestHeader(t,e)}),Ur.isUndefined(n.withCredentials)||(m.withCredentials=!!n.withCredentials),d&&"json"!==d&&(m.responseType=n.responseType),p&&([l,u]=zn(p,!0),m.addEventListener("progress",l)),f&&m.upload&&([s,c]=zn(f),m.upload.addEventListener("progress",s),m.upload.addEventListener("loadend",c)),(n.cancelToken||n.signal)&&(i=t=>{m&&(r(!t||t.type?new Cn(null,e,m):t),m.abort(),m=null)},n.cancelToken&&n.cancelToken.subscribe(i),n.signal&&(n.signal.aborted?i():n.signal.addEventListener("abort",i)));const y=function(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}(n.url);y&&-1===pn.protocols.indexOf(y)?r(new Vr("Unsupported protocol "+y+":",Vr.ERR_BAD_REQUEST,e)):m.send(o||null)})},Bn=(e,t)=>{const{length:r}=e=e?e.filter(Boolean):[];if(t||r){let r,n=new AbortController;const o=function(e){if(!r){r=!0,i();const t=e instanceof Error?e:this.reason;n.abort(t instanceof Vr?t:new Cn(t instanceof Error?t.message:t))}};let a=t&&setTimeout(()=>{a=null,o(new Vr(`timeout ${t} of ms exceeded`,Vr.ETIMEDOUT))},t);const i=()=>{e&&(a&&clearTimeout(a),a=null,e.forEach(e=>{e.unsubscribe?e.unsubscribe(o):e.removeEventListener("abort",o)}),e=null)};e.forEach(e=>e.addEventListener("abort",o));const{signal:s}=n;return s.unsubscribe=()=>Ur.asap(i),s}},Un=function*(e,t){let r=e.byteLength;if(!t||r<t)return void(yield e);let n,o=0;for(;o<r;)n=o+t,yield e.slice(o,n),o=n},qn=async function*(e){if(e[Symbol.asyncIterator])return void(yield*e);const t=e.getReader();try{for(;;){const{done:e,value:r}=await t.read();if(e)break;yield r}}finally{await t.cancel()}},Hn=(e,t,r,n)=>{const o=async function*(e,t){for await(const r of qn(e))yield*Un(r,t)}(e,t);let a,i=0,s=e=>{a||(a=!0,n&&n(e))};return new ReadableStream({async pull(e){try{const{done:t,value:n}=await o.next();if(t)return s(),void e.close();let a=n.byteLength;if(r){let e=i+=a;r(e)}e.enqueue(new Uint8Array(n))}catch(t){throw s(t),t}},cancel:e=>(s(e),o.return())},{highWaterMark:2})},Wn="function"===typeof fetch&&"function"===typeof Request&&"function"===typeof Response,Vn=Wn&&"function"===typeof ReadableStream,Yn=Wn&&("function"===typeof TextEncoder?(Kn=new TextEncoder,e=>Kn.encode(e)):async e=>new Uint8Array(await new Response(e).arrayBuffer()));var Kn;const Qn=function(e){try{for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return!!e(...r)}catch(hm){return!1}},Xn=Vn&&Qn(()=>{let e=!1;const t=new Request(pn.origin,{body:new ReadableStream,method:"POST",get duplex(){return e=!0,"half"}}).headers.has("Content-Type");return e&&!t}),Gn=Vn&&Qn(()=>Ur.isReadableStream(new Response("").body)),Jn={stream:Gn&&(e=>e.body)};var Zn;Wn&&(Zn=new Response,["text","arrayBuffer","blob","formData","stream"].forEach(e=>{!Jn[e]&&(Jn[e]=Ur.isFunction(Zn[e])?t=>t[e]():(t,r)=>{throw new Vr(`Response type '${e}' is not supported`,Vr.ERR_NOT_SUPPORT,r)})}));const eo=async(e,t)=>{const r=Ur.toFiniteNumber(e.getContentLength());return null==r?(async e=>{if(null==e)return 0;if(Ur.isBlob(e))return e.size;if(Ur.isSpecCompliantForm(e)){const t=new Request(pn.origin,{method:"POST",body:e});return(await t.arrayBuffer()).byteLength}return Ur.isArrayBufferView(e)||Ur.isArrayBuffer(e)?e.byteLength:(Ur.isURLSearchParams(e)&&(e+=""),Ur.isString(e)?(await Yn(e)).byteLength:void 0)})(t):r},to=Wn&&(async e=>{let{url:t,method:r,data:n,signal:o,cancelToken:a,timeout:i,onDownloadProgress:s,onUploadProgress:l,responseType:c,headers:u,withCredentials:d="same-origin",fetchOptions:f}=Fn(e);c=c?(c+"").toLowerCase():"text";let p,h=Bn([o,a&&a.toAbortSignal()],i);const m=h&&h.unsubscribe&&(()=>{h.unsubscribe()});let g;try{if(l&&Xn&&"get"!==r&&"head"!==r&&0!==(g=await eo(u,n))){let e,r=new Request(t,{method:"POST",body:n,duplex:"half"});if(Ur.isFormData(n)&&(e=r.headers.get("content-type"))&&u.setContentType(e),r.body){const[e,t]=Nn(g,zn(On(l)));n=Hn(r.body,65536,e,t)}}Ur.isString(d)||(d=d?"include":"omit");const o="credentials"in Request.prototype;p=new Request(t,{...f,signal:h,method:r.toUpperCase(),headers:u.normalize().toJSON(),body:n,duplex:"half",credentials:o?d:void 0});let a=await fetch(p,f);const i=Gn&&("stream"===c||"response"===c);if(Gn&&(s||i&&m)){const e={};["status","statusText","headers"].forEach(t=>{e[t]=a[t]});const t=Ur.toFiniteNumber(a.headers.get("content-length")),[r,n]=s&&Nn(t,zn(On(s),!0))||[];a=new Response(Hn(a.body,65536,r,()=>{n&&n(),m&&m()}),e)}c=c||"text";let y=await Jn[Ur.findKey(Jn,c)||"text"](a,e);return!i&&m&&m(),await new Promise((t,r)=>{Tn(t,r,{data:y,headers:Sn.from(a.headers),status:a.status,statusText:a.statusText,config:e,request:p})})}catch(y){if(m&&m(),y&&"TypeError"===y.name&&/Load failed|fetch/i.test(y.message))throw Object.assign(new Vr("Network Error",Vr.ERR_NETWORK,e,p),{cause:y.cause||y});throw Vr.from(y,y&&y.code,e,p)}}),ro={http:null,xhr:Mn,fetch:to};Ur.forEach(ro,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch(hm){}Object.defineProperty(e,"adapterName",{value:t})}});const no=e=>`- ${e}`,oo=e=>Ur.isFunction(e)||null===e||!1===e,ao=e=>{e=Ur.isArray(e)?e:[e];const{length:t}=e;let r,n;const o={};for(let a=0;a<t;a++){let t;if(r=e[a],n=r,!oo(r)&&(n=ro[(t=String(r)).toLowerCase()],void 0===n))throw new Vr(`Unknown adapter '${t}'`);if(n)break;o[t||"#"+a]=n}if(!n){const e=Object.entries(o).map(e=>{let[t,r]=e;return`adapter ${t} `+(!1===r?"is not supported by the environment":"is not available in the build")});let r=t?e.length>1?"since :\n"+e.map(no).join("\n"):" "+no(e[0]):"as no adapter specified";throw new Vr("There is no suitable adapter to dispatch the request "+r,"ERR_NOT_SUPPORT")}return n};function io(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Cn(null,e)}function so(e){io(e),e.headers=Sn.from(e.headers),e.data=jn.call(e,e.transformRequest),-1!==["post","put","patch"].indexOf(e.method)&&e.headers.setContentType("application/x-www-form-urlencoded",!1);return ao(e.adapter||gn.adapter)(e).then(function(t){return io(e),t.data=jn.call(e,e.transformResponse,t),t.headers=Sn.from(t.headers),t},function(t){return _n(t)||(io(e),t&&t.response&&(t.response.data=jn.call(e,e.transformResponse,t.response),t.response.headers=Sn.from(t.response.headers))),Promise.reject(t)})}const lo="1.11.0",co={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{co[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const uo={};co.transitional=function(e,t,r){function n(e,t){return"[Axios v"+lo+"] Transitional option '"+e+"'"+t+(r?". "+r:"")}return(r,o,a)=>{if(!1===e)throw new Vr(n(o," has been removed"+(t?" in "+t:"")),Vr.ERR_DEPRECATED);return t&&!uo[o]&&(uo[o]=!0,console.warn(n(o," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(r,o,a)}},co.spelling=function(e){return(t,r)=>(console.warn(`${r} is likely a misspelling of ${e}`),!0)};const fo={assertOptions:function(e,t,r){if("object"!==typeof e)throw new Vr("options must be an object",Vr.ERR_BAD_OPTION_VALUE);const n=Object.keys(e);let o=n.length;for(;o-- >0;){const a=n[o],i=t[a];if(i){const t=e[a],r=void 0===t||i(t,a,e);if(!0!==r)throw new Vr("option "+a+" must be "+r,Vr.ERR_BAD_OPTION_VALUE);continue}if(!0!==r)throw new Vr("Unknown option "+a,Vr.ERR_BAD_OPTION)}},validators:co},po=fo.validators;class ho{constructor(e){this.defaults=e||{},this.interceptors={request:new on,response:new on}}async request(e,t){try{return await this._request(e,t)}catch(r){if(r instanceof Error){let e={};Error.captureStackTrace?Error.captureStackTrace(e):e=new Error;const t=e.stack?e.stack.replace(/^.+\n/,""):"";try{r.stack?t&&!String(r.stack).endsWith(t.replace(/^.+\n.+\n/,""))&&(r.stack+="\n"+t):r.stack=t}catch(hm){}}throw r}}_request(e,t){"string"===typeof e?(t=t||{}).url=e:t=e||{},t=$n(this.defaults,t);const{transitional:r,paramsSerializer:n,headers:o}=t;void 0!==r&&fo.assertOptions(r,{silentJSONParsing:po.transitional(po.boolean),forcedJSONParsing:po.transitional(po.boolean),clarifyTimeoutError:po.transitional(po.boolean)},!1),null!=n&&(Ur.isFunction(n)?t.paramsSerializer={serialize:n}:fo.assertOptions(n,{encode:po.function,serialize:po.function},!0)),void 0!==t.allowAbsoluteUrls||(void 0!==this.defaults.allowAbsoluteUrls?t.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:t.allowAbsoluteUrls=!0),fo.assertOptions(t,{baseUrl:po.spelling("baseURL"),withXsrfToken:po.spelling("withXSRFToken")},!0),t.method=(t.method||this.defaults.method||"get").toLowerCase();let a=o&&Ur.merge(o.common,o[t.method]);o&&Ur.forEach(["delete","get","head","post","put","patch","common"],e=>{delete o[e]}),t.headers=Sn.concat(a,o);const i=[];let s=!0;this.interceptors.request.forEach(function(e){"function"===typeof e.runWhen&&!1===e.runWhen(t)||(s=s&&e.synchronous,i.unshift(e.fulfilled,e.rejected))});const l=[];let c;this.interceptors.response.forEach(function(e){l.push(e.fulfilled,e.rejected)});let u,d=0;if(!s){const e=[so.bind(this),void 0];for(e.unshift(...i),e.push(...l),u=e.length,c=Promise.resolve(t);d<u;)c=c.then(e[d++],e[d++]);return c}u=i.length;let f=t;for(d=0;d<u;){const e=i[d++],t=i[d++];try{f=e(f)}catch(p){t.call(this,p);break}}try{c=so.call(this,f)}catch(p){return Promise.reject(p)}for(d=0,u=l.length;d<u;)c=c.then(l[d++],l[d++]);return c}getUri(e){return nn(Dn((e=$n(this.defaults,e)).baseURL,e.url,e.allowAbsoluteUrls),e.params,e.paramsSerializer)}}Ur.forEach(["delete","get","head","options"],function(e){ho.prototype[e]=function(t,r){return this.request($n(r||{},{method:e,url:t,data:(r||{}).data}))}}),Ur.forEach(["post","put","patch"],function(e){function t(t){return function(r,n,o){return this.request($n(o||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:r,data:n}))}}ho.prototype[e]=t(),ho.prototype[e+"Form"]=t(!0)});const mo=ho;class go{constructor(e){if("function"!==typeof e)throw new TypeError("executor must be a function.");let t;this.promise=new Promise(function(e){t=e});const r=this;this.promise.then(e=>{if(!r._listeners)return;let t=r._listeners.length;for(;t-- >0;)r._listeners[t](e);r._listeners=null}),this.promise.then=e=>{let t;const n=new Promise(e=>{r.subscribe(e),t=e}).then(e);return n.cancel=function(){r.unsubscribe(t)},n},e(function(e,n,o){r.reason||(r.reason=new Cn(e,n,o),t(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}toAbortSignal(){const e=new AbortController,t=t=>{e.abort(t)};return this.subscribe(t),e.signal.unsubscribe=()=>this.unsubscribe(t),e.signal}static source(){let e;return{token:new go(function(t){e=t}),cancel:e}}}const yo=go;const bo={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(bo).forEach(e=>{let[t,r]=e;bo[r]=t});const vo=bo;const xo=function e(t){const r=new mo(t),n=tr(mo.prototype.request,r);return Ur.extend(n,mo.prototype,r,{allOwnKeys:!0}),Ur.extend(n,r,null,{allOwnKeys:!0}),n.create=function(r){return e($n(t,r))},n}(gn);xo.Axios=mo,xo.CanceledError=Cn,xo.CancelToken=yo,xo.isCancel=_n,xo.VERSION=lo,xo.toFormData=Gr,xo.AxiosError=Vr,xo.Cancel=xo.CanceledError,xo.all=function(e){return Promise.all(e)},xo.spread=function(e){return function(t){return e.apply(null,t)}},xo.isAxiosError=function(e){return Ur.isObject(e)&&!0===e.isAxiosError},xo.mergeConfig=$n,xo.AxiosHeaders=Sn,xo.formToJSON=e=>hn(Ur.isHTMLForm(e)?new FormData(e):e),xo.getAdapter=ao,xo.HttpStatusCode=vo,xo.default=xo;const wo=xo;var ko=r(579);const So=(0,n.createContext)(),jo=()=>{const e=(0,n.useContext)(So);if(!e)throw new Error("useAuth must be used within an AuthProvider");return e};wo.defaults.baseURL="https://dataleaf-server-production.up.railway.app",wo.interceptors.request.use(e=>{const t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e)),wo.interceptors.response.use(e=>e,e=>{var t;return 401===(null===(t=e.response)||void 0===t?void 0:t.status)&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="/login"),Promise.reject(e)});const _o=e=>{let{children:t}=e;const[r,o]=(0,n.useState)(null),[a,i]=(0,n.useState)(!0);(0,n.useEffect)(()=>{(async()=>{const e=localStorage.getItem("token"),t=localStorage.getItem("user");if(e&&t)try{const e=await wo.get("/auth/verify");e.data.success?(o(e.data.user),localStorage.setItem("user",JSON.stringify(e.data.user))):(localStorage.removeItem("token"),localStorage.removeItem("user"))}catch(r){console.error("Token verification failed:",r),localStorage.removeItem("token"),localStorage.removeItem("user")}i(!1)})()},[]);const s={user:r,loading:a,login:async(e,t)=>{try{const r=await wo.post("/auth/login",{email:e,password:t});if(r.data.success){const{token:e,user:t}=r.data;return localStorage.setItem("token",e),localStorage.setItem("user",JSON.stringify(t)),o(t),{success:!0}}return{success:!1,message:r.data.message}}catch(a){var r,n;return{success:!1,message:(null===(r=a.response)||void 0===r||null===(n=r.data)||void 0===n?void 0:n.message)||"Login failed"}}},setAuthenticatedUser:(e,t)=>{localStorage.setItem("token",t),localStorage.setItem("user",JSON.stringify(e)),o(e)},register:async e=>{try{const t=await wo.post("/auth/register",e);if(t.data.success){const{token:e,user:r}=t.data;return localStorage.setItem("token",e),localStorage.setItem("user",JSON.stringify(r)),o(r),{success:!0}}return{success:!1,message:t.data.message}}catch(n){var t,r;return{success:!1,message:(null===(t=n.response)||void 0===t||null===(r=t.data)||void 0===r?void 0:r.message)||"Registration failed"}}},logout:()=>{localStorage.removeItem("token"),localStorage.removeItem("user"),o(null)},updateUser:e=>{o(e),localStorage.setItem("user",JSON.stringify(e))},refreshUser:async()=>{try{const e=await wo.get("/auth/verify");if(e.data.success)return o(e.data.user),localStorage.setItem("user",JSON.stringify(e.data.user)),e.data.user}catch(e){console.error("Failed to refresh user data:",e)}return null},getUserProfile:async()=>{try{const e=await wo.get("/users/profile");if(e.data.success)return{user:e.data.user,hasPassword:e.data.hasPassword}}catch(e){console.error("Failed to get user profile:",e)}return null},sendVerificationEmail:async e=>{try{const t=await wo.post("/auth/send-verification-email",{email:e});return{success:t.data.success,message:t.data.message}}catch(n){var t,r;return{success:!1,message:(null===(t=n.response)||void 0===t||null===(r=t.data)||void 0===r?void 0:r.message)||"Failed to send verification email"}}},resendRegistrationEmail:async e=>{try{const t=JSON.parse(localStorage.getItem("pendingRegistration")||"{}");if(t.email===e){const e=await wo.post("/auth/register",t);return{success:e.data.success,message:e.data.message}}return{success:!1,message:"Registration data not found. Please register again."}}catch(n){var t,r;return{success:!1,message:(null===(t=n.response)||void 0===t||null===(r=t.data)||void 0===r?void 0:r.message)||"Failed to resend registration email"}}},verifyEmail:async(e,t)=>{try{const r=await wo.post("/auth/verify-email",{email:e,otp:t});if(r.data.success&&r.data.token){const{token:e,user:t}=r.data;localStorage.setItem("token",e),localStorage.setItem("user",JSON.stringify(t)),o(t)}return{success:r.data.success,message:r.data.message}}catch(a){var r,n;return{success:!1,message:(null===(r=a.response)||void 0===r||null===(n=r.data)||void 0===n?void 0:n.message)||"Email verification failed"}}},completeRegistration:async(e,t)=>{try{const r=await wo.post("/auth/complete-registration",{email:e,otp:t});if(r.data.success&&r.data.token){const{token:e,user:t}=r.data;localStorage.setItem("token",e),localStorage.setItem("user",JSON.stringify(t)),localStorage.removeItem("pendingRegistration"),o(t)}return{success:r.data.success,message:r.data.message}}catch(a){var r,n;return{success:!1,message:(null===(r=a.response)||void 0===r||null===(n=r.data)||void 0===n?void 0:n.message)||"Registration completion failed"}}},forgotPassword:async e=>{try{const t=await wo.post("/auth/forgot-password",{email:e});return{success:t.data.success,message:t.data.message}}catch(n){var t,r;return{success:!1,message:(null===(t=n.response)||void 0===t||null===(r=t.data)||void 0===r?void 0:r.message)||"Failed to process password reset request"}}},resetPassword:async(e,t,r)=>{try{const n=await wo.post("/auth/reset-password",{email:e,otp:t,newPassword:r});return{success:n.data.success,message:n.data.message}}catch(a){var n,o;return{success:!1,message:(null===(n=a.response)||void 0===n||null===(o=n.data)||void 0===o?void 0:o.message)||"Password reset failed"}}},setPasswordForGoogleUser:async(e,t,r)=>{try{const n=await wo.post("/auth/set-password-google",{email:e,otp:t,newPassword:r});return{success:n.data.success,message:n.data.message}}catch(a){var n,o;return{success:!1,message:(null===(n=a.response)||void 0===n||null===(o=n.data)||void 0===o?void 0:o.message)||"Failed to set password"}}},linkGoogleAccount:async()=>{try{return window.location.href="https://dataleaf-server-production.up.railway.app/auth/google",{success:!0,message:"Redirecting to Google for account linking..."}}catch(e){return{success:!1,message:"Failed to initiate Google account linking"}}},checkUserType:async e=>{try{const t=await wo.post("/auth/check-user-type",{email:e});return{success:t.data.success,isGoogleUser:t.data.isGoogleUser}}catch(n){var t,r;return{success:!1,message:(null===(t=n.response)||void 0===t||null===(r=t.data)||void 0===r?void 0:r.message)||"Failed to check user type"}}}};return(0,ko.jsx)(So.Provider,{value:s,children:t})},Eo=Object.create(null);Eo.open="0",Eo.close="1",Eo.ping="2",Eo.pong="3",Eo.message="4",Eo.upgrade="5",Eo.noop="6";const Co=Object.create(null);Object.keys(Eo).forEach(e=>{Co[Eo[e]]=e});const To={type:"error",data:"parser error"},Ro="function"===typeof Blob||"undefined"!==typeof Blob&&"[object BlobConstructor]"===Object.prototype.toString.call(Blob),Po="function"===typeof ArrayBuffer,zo=e=>"function"===typeof ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer instanceof ArrayBuffer,No=(e,t,r)=>{let{type:n,data:o}=e;return Ro&&o instanceof Blob?t?r(o):Oo(o,r):Po&&(o instanceof ArrayBuffer||zo(o))?t?r(o):Oo(new Blob([o]),r):r(Eo[n]+(o||""))},Oo=(e,t)=>{const r=new FileReader;return r.onload=function(){const e=r.result.split(",")[1];t("b"+(e||""))},r.readAsDataURL(e)};function Ao(e){return e instanceof Uint8Array?e:e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}let Lo;const Do="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Io="undefined"===typeof Uint8Array?[]:new Uint8Array(256);for(let r=0;r<64;r++)Io[Do.charCodeAt(r)]=r;const $o="function"===typeof ArrayBuffer,Fo=(e,t)=>{if("string"!==typeof e)return{type:"message",data:Bo(e,t)};const r=e.charAt(0);if("b"===r)return{type:"message",data:Mo(e.substring(1),t)};return Co[r]?e.length>1?{type:Co[r],data:e.substring(1)}:{type:Co[r]}:To},Mo=(e,t)=>{if($o){const r=(e=>{let t,r,n,o,a,i=.75*e.length,s=e.length,l=0;"="===e[e.length-1]&&(i--,"="===e[e.length-2]&&i--);const c=new ArrayBuffer(i),u=new Uint8Array(c);for(t=0;t<s;t+=4)r=Io[e.charCodeAt(t)],n=Io[e.charCodeAt(t+1)],o=Io[e.charCodeAt(t+2)],a=Io[e.charCodeAt(t+3)],u[l++]=r<<2|n>>4,u[l++]=(15&n)<<4|o>>2,u[l++]=(3&o)<<6|63&a;return c})(e);return Bo(r,t)}return{base64:!0,data:e}},Bo=(e,t)=>"blob"===t?e instanceof Blob?e:new Blob([e]):e instanceof ArrayBuffer?e:e.buffer,Uo=String.fromCharCode(30);function qo(){return new TransformStream({transform(e,t){!function(e,t){Ro&&e.data instanceof Blob?e.data.arrayBuffer().then(Ao).then(t):Po&&(e.data instanceof ArrayBuffer||zo(e.data))?t(Ao(e.data)):No(e,!1,e=>{Lo||(Lo=new TextEncoder),t(Lo.encode(e))})}(e,r=>{const n=r.length;let o;if(n<126)o=new Uint8Array(1),new DataView(o.buffer).setUint8(0,n);else if(n<65536){o=new Uint8Array(3);const e=new DataView(o.buffer);e.setUint8(0,126),e.setUint16(1,n)}else{o=new Uint8Array(9);const e=new DataView(o.buffer);e.setUint8(0,127),e.setBigUint64(1,BigInt(n))}e.data&&"string"!==typeof e.data&&(o[0]|=128),t.enqueue(o),t.enqueue(r)})}})}let Ho;function Wo(e){return e.reduce((e,t)=>e+t.length,0)}function Vo(e,t){if(e[0].length===t)return e.shift();const r=new Uint8Array(t);let n=0;for(let o=0;o<t;o++)r[o]=e[0][n++],n===e[0].length&&(e.shift(),n=0);return e.length&&n<e[0].length&&(e[0]=e[0].slice(n)),r}function Yo(e){if(e)return function(e){for(var t in Yo.prototype)e[t]=Yo.prototype[t];return e}(e)}Yo.prototype.on=Yo.prototype.addEventListener=function(e,t){return this._callbacks=this._callbacks||{},(this._callbacks["$"+e]=this._callbacks["$"+e]||[]).push(t),this},Yo.prototype.once=function(e,t){function r(){this.off(e,r),t.apply(this,arguments)}return r.fn=t,this.on(e,r),this},Yo.prototype.off=Yo.prototype.removeListener=Yo.prototype.removeAllListeners=Yo.prototype.removeEventListener=function(e,t){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var r,n=this._callbacks["$"+e];if(!n)return this;if(1==arguments.length)return delete this._callbacks["$"+e],this;for(var o=0;o<n.length;o++)if((r=n[o])===t||r.fn===t){n.splice(o,1);break}return 0===n.length&&delete this._callbacks["$"+e],this},Yo.prototype.emit=function(e){this._callbacks=this._callbacks||{};for(var t=new Array(arguments.length-1),r=this._callbacks["$"+e],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(r){n=0;for(var o=(r=r.slice(0)).length;n<o;++n)r[n].apply(this,t)}return this},Yo.prototype.emitReserved=Yo.prototype.emit,Yo.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks["$"+e]||[]},Yo.prototype.hasListeners=function(e){return!!this.listeners(e).length};const Ko="function"===typeof Promise&&"function"===typeof Promise.resolve?e=>Promise.resolve().then(e):(e,t)=>t(e,0),Qo="undefined"!==typeof self?self:"undefined"!==typeof window?window:Function("return this")();function Xo(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return r.reduce((t,r)=>(e.hasOwnProperty(r)&&(t[r]=e[r]),t),{})}const Go=Qo.setTimeout,Jo=Qo.clearTimeout;function Zo(e,t){t.useNativeTimers?(e.setTimeoutFn=Go.bind(Qo),e.clearTimeoutFn=Jo.bind(Qo)):(e.setTimeoutFn=Qo.setTimeout.bind(Qo),e.clearTimeoutFn=Qo.clearTimeout.bind(Qo))}function ea(e){return"string"===typeof e?function(e){let t=0,r=0;for(let n=0,o=e.length;n<o;n++)t=e.charCodeAt(n),t<128?r+=1:t<2048?r+=2:t<55296||t>=57344?r+=3:(n++,r+=4);return r}(e):Math.ceil(1.33*(e.byteLength||e.size))}function ta(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}class ra extends Error{constructor(e,t,r){super(e),this.description=t,this.context=r,this.type="TransportError"}}class na extends Yo{constructor(e){super(),this.writable=!1,Zo(this,e),this.opts=e,this.query=e.query,this.socket=e.socket,this.supportsBinary=!e.forceBase64}onError(e,t,r){return super.emitReserved("error",new ra(e,t,r)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return"opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this}send(e){"open"===this.readyState&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){const t=Fo(e,this.socket.binaryType);this.onPacket(t)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}pause(e){}createUri(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e+"://"+this._hostname()+this._port()+this.opts.path+this._query(t)}_hostname(){const e=this.opts.hostname;return-1===e.indexOf(":")?e:"["+e+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(443!==this.opts.port)||!this.opts.secure&&80!==Number(this.opts.port))?":"+this.opts.port:""}_query(e){const t=function(e){let t="";for(let r in e)e.hasOwnProperty(r)&&(t.length&&(t+="&"),t+=encodeURIComponent(r)+"="+encodeURIComponent(e[r]));return t}(e);return t.length?"?"+t:""}}class oa extends na{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(e){this.readyState="pausing";const t=()=>{this.readyState="paused",e()};if(this._polling||!this.writable){let e=0;this._polling&&(e++,this.once("pollComplete",function(){--e||t()})),this.writable||(e++,this.once("drain",function(){--e||t()}))}else t()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){((e,t)=>{const r=e.split(Uo),n=[];for(let o=0;o<r.length;o++){const e=Fo(r[o],t);if(n.push(e),"error"===e.type)break}return n})(e,this.socket.binaryType).forEach(e=>{if("opening"===this.readyState&&"open"===e.type&&this.onOpen(),"close"===e.type)return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(e)}),"closed"!==this.readyState&&(this._polling=!1,this.emitReserved("pollComplete"),"open"===this.readyState&&this._poll())}doClose(){const e=()=>{this.write([{type:"close"}])};"open"===this.readyState?e():this.once("open",e)}write(e){this.writable=!1,((e,t)=>{const r=e.length,n=new Array(r);let o=0;e.forEach((e,a)=>{No(e,!1,e=>{n[a]=e,++o===r&&t(n.join(Uo))})})})(e,e=>{this.doWrite(e,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const e=this.opts.secure?"https":"http",t=this.query||{};return!1!==this.opts.timestampRequests&&(t[this.opts.timestampParam]=ta()),this.supportsBinary||t.sid||(t.b64=1),this.createUri(e,t)}}let aa=!1;try{aa="undefined"!==typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(mm){}const ia=aa;function sa(){}class la extends oa{constructor(e){if(super(e),"undefined"!==typeof location){const t="https:"===location.protocol;let r=location.port;r||(r=t?"443":"80"),this.xd="undefined"!==typeof location&&e.hostname!==location.hostname||r!==e.port}}doWrite(e,t){const r=this.request({method:"POST",data:e});r.on("success",t),r.on("error",(e,t)=>{this.onError("xhr post error",e,t)})}doPoll(){const e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(e,t)=>{this.onError("xhr poll error",e,t)}),this.pollXhr=e}}class ca extends Yo{constructor(e,t,r){super(),this.createRequest=e,Zo(this,r),this._opts=r,this._method=r.method||"GET",this._uri=t,this._data=void 0!==r.data?r.data:null,this._create()}_create(){var e;const t=Xo(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");t.xdomain=!!this._opts.xd;const r=this._xhr=this.createRequest(t);try{r.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){r.setDisableHeaderCheck&&r.setDisableHeaderCheck(!0);for(let e in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(e)&&r.setRequestHeader(e,this._opts.extraHeaders[e])}}catch(hm){}if("POST"===this._method)try{r.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(hm){}try{r.setRequestHeader("Accept","*/*")}catch(hm){}null===(e=this._opts.cookieJar)||void 0===e||e.addCookies(r),"withCredentials"in r&&(r.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(r.timeout=this._opts.requestTimeout),r.onreadystatechange=()=>{var e;3===r.readyState&&(null===(e=this._opts.cookieJar)||void 0===e||e.parseCookies(r.getResponseHeader("set-cookie"))),4===r.readyState&&(200===r.status||1223===r.status?this._onLoad():this.setTimeoutFn(()=>{this._onError("number"===typeof r.status?r.status:0)},0))},r.send(this._data)}catch(hm){return void this.setTimeoutFn(()=>{this._onError(hm)},0)}"undefined"!==typeof document&&(this._index=ca.requestsCount++,ca.requests[this._index]=this)}_onError(e){this.emitReserved("error",e,this._xhr),this._cleanup(!0)}_cleanup(e){if("undefined"!==typeof this._xhr&&null!==this._xhr){if(this._xhr.onreadystatechange=sa,e)try{this._xhr.abort()}catch(hm){}"undefined"!==typeof document&&delete ca.requests[this._index],this._xhr=null}}_onLoad(){const e=this._xhr.responseText;null!==e&&(this.emitReserved("data",e),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}if(ca.requestsCount=0,ca.requests={},"undefined"!==typeof document)if("function"===typeof attachEvent)attachEvent("onunload",ua);else if("function"===typeof addEventListener){addEventListener("onpagehide"in Qo?"pagehide":"unload",ua,!1)}function ua(){for(let e in ca.requests)ca.requests.hasOwnProperty(e)&&ca.requests[e].abort()}const da=function(){const e=fa({xdomain:!1});return e&&null!==e.responseType}();function fa(e){const t=e.xdomain;try{if("undefined"!==typeof XMLHttpRequest&&(!t||ia))return new XMLHttpRequest}catch(hm){}if(!t)try{return new(Qo[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(hm){}}const pa="undefined"!==typeof navigator&&"string"===typeof navigator.product&&"reactnative"===navigator.product.toLowerCase();class ha extends na{get name(){return"websocket"}doOpen(){const e=this.uri(),t=this.opts.protocols,r=pa?{}:Xo(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(r.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(e,t,r)}catch(mm){return this.emitReserved("error",mm)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const r=e[t],n=t===e.length-1;No(r,this.supportsBinary,e=>{try{this.doWrite(r,e)}catch(hm){}n&&Ko(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){"undefined"!==typeof this.ws&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const e=this.opts.secure?"wss":"ws",t=this.query||{};return this.opts.timestampRequests&&(t[this.opts.timestampParam]=ta()),this.supportsBinary||(t.b64=1),this.createUri(e,t)}}const ma=Qo.WebSocket||Qo.MozWebSocket;const ga={websocket:class extends ha{createSocket(e,t,r){return pa?new ma(e,t,r):t?new ma(e,t):new ma(e)}doWrite(e,t){this.ws.send(t)}},webtransport:class extends na{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(mm){return this.emitReserved("error",mm)}this._transport.closed.then(()=>{this.onClose()}).catch(e=>{this.onError("webtransport error",e)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(e=>{const t=function(e,t){Ho||(Ho=new TextDecoder);const r=[];let n=0,o=-1,a=!1;return new TransformStream({transform(i,s){for(r.push(i);;){if(0===n){if(Wo(r)<1)break;const e=Vo(r,1);a=128===(128&e[0]),o=127&e[0],n=o<126?3:126===o?1:2}else if(1===n){if(Wo(r)<2)break;const e=Vo(r,2);o=new DataView(e.buffer,e.byteOffset,e.length).getUint16(0),n=3}else if(2===n){if(Wo(r)<8)break;const e=Vo(r,8),t=new DataView(e.buffer,e.byteOffset,e.length),a=t.getUint32(0);if(a>Math.pow(2,21)-1){s.enqueue(To);break}o=a*Math.pow(2,32)+t.getUint32(4),n=3}else{if(Wo(r)<o)break;const e=Vo(r,o);s.enqueue(Fo(a?e:Ho.decode(e),t)),n=0}if(0===o||o>e){s.enqueue(To);break}}}})}(Number.MAX_SAFE_INTEGER,this.socket.binaryType),r=e.readable.pipeThrough(t).getReader(),n=qo();n.readable.pipeTo(e.writable),this._writer=n.writable.getWriter();const o=()=>{r.read().then(e=>{let{done:t,value:r}=e;t||(this.onPacket(r),o())}).catch(e=>{})};o();const a={type:"open"};this.query.sid&&(a.data=`{"sid":"${this.query.sid}"}`),this._writer.write(a).then(()=>this.onOpen())})})}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const r=e[t],n=t===e.length-1;this._writer.write(r).then(()=>{n&&Ko(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var e;null===(e=this._transport)||void 0===e||e.close()}},polling:class extends la{constructor(e){super(e);const t=e&&e.forceBase64;this.supportsBinary=da&&!t}request(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.assign(e,{xd:this.xd},this.opts),new ca(fa,this.uri(),e)}}},ya=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,ba=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function va(e){if(e.length>8e3)throw"URI too long";const t=e,r=e.indexOf("["),n=e.indexOf("]");-1!=r&&-1!=n&&(e=e.substring(0,r)+e.substring(r,n).replace(/:/g,";")+e.substring(n,e.length));let o=ya.exec(e||""),a={},i=14;for(;i--;)a[ba[i]]=o[i]||"";return-1!=r&&-1!=n&&(a.source=t,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,":"),a.authority=a.authority.replace("[","").replace("]","").replace(/;/g,":"),a.ipv6uri=!0),a.pathNames=function(e,t){const r=/\/{2,9}/g,n=t.replace(r,"/").split("/");"/"!=t.slice(0,1)&&0!==t.length||n.splice(0,1);"/"==t.slice(-1)&&n.splice(n.length-1,1);return n}(0,a.path),a.queryKey=function(e,t){const r={};return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(e,t,n){t&&(r[t]=n)}),r}(0,a.query),a}const xa="function"===typeof addEventListener&&"function"===typeof removeEventListener,wa=[];xa&&addEventListener("offline",()=>{wa.forEach(e=>e())},!1);class ka extends Yo{constructor(e,t){if(super(),this.binaryType="arraybuffer",this.writeBuffer=[],this._prevBufferLen=0,this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,e&&"object"===typeof e&&(t=e,e=null),e){const r=va(e);t.hostname=r.host,t.secure="https"===r.protocol||"wss"===r.protocol,t.port=r.port,r.query&&(t.query=r.query)}else t.host&&(t.hostname=va(t.host).host);Zo(this,t),this.secure=null!=t.secure?t.secure:"undefined"!==typeof location&&"https:"===location.protocol,t.hostname&&!t.port&&(t.port=this.secure?"443":"80"),this.hostname=t.hostname||("undefined"!==typeof location?location.hostname:"localhost"),this.port=t.port||("undefined"!==typeof location&&location.port?location.port:this.secure?"443":"80"),this.transports=[],this._transportsByName={},t.transports.forEach(e=>{const t=e.prototype.name;this.transports.push(t),this._transportsByName[t]=e}),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},t),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),"string"===typeof this.opts.query&&(this.opts.query=function(e){let t={},r=e.split("&");for(let n=0,o=r.length;n<o;n++){let e=r[n].split("=");t[decodeURIComponent(e[0])]=decodeURIComponent(e[1])}return t}(this.opts.query)),xa&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),"localhost"!==this.hostname&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},wa.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(e){const t=Object.assign({},this.opts.query);t.EIO=4,t.transport=e,this.id&&(t.sid=this.id);const r=Object.assign({},this.opts,{query:t,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[e]);return new this._transportsByName[e](r)}_open(){if(0===this.transports.length)return void this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);const e=this.opts.rememberUpgrade&&ka.priorWebsocketSuccess&&-1!==this.transports.indexOf("websocket")?"websocket":this.transports[0];this.readyState="opening";const t=this.createTransport(e);t.open(),this.setTransport(t)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",e=>this._onClose("transport close",e))}onOpen(){this.readyState="open",ka.priorWebsocketSuccess="websocket"===this.transport.name,this.emitReserved("open"),this.flush()}_onPacket(e){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const t=new Error("server error");t.code=e.data,this._onError(t);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data)}}onHandshake(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this._pingInterval=e.pingInterval,this._pingTimeout=e.pingTimeout,this._maxPayload=e.maxPayload,this.onOpen(),"closed"!==this.readyState&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const e=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+e,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},e),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,0===this.writeBuffer.length?this.emitReserved("drain"):this.flush()}flush(){if("closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const e=this._getWritablePackets();this.transport.send(e),this._prevBufferLen=e.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&"polling"===this.transport.name&&this.writeBuffer.length>1))return this.writeBuffer;let e=1;for(let t=0;t<this.writeBuffer.length;t++){const r=this.writeBuffer[t].data;if(r&&(e+=ea(r)),t>0&&e>this._maxPayload)return this.writeBuffer.slice(0,t);e+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const e=Date.now()>this._pingTimeoutTime;return e&&(this._pingTimeoutTime=0,Ko(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),e}write(e,t,r){return this._sendPacket("message",e,t,r),this}send(e,t,r){return this._sendPacket("message",e,t,r),this}_sendPacket(e,t,r,n){if("function"===typeof t&&(n=t,t=void 0),"function"===typeof r&&(n=r,r=null),"closing"===this.readyState||"closed"===this.readyState)return;(r=r||{}).compress=!1!==r.compress;const o={type:e,data:t,options:r};this.emitReserved("packetCreate",o),this.writeBuffer.push(o),n&&this.once("flush",n),this.flush()}close(){const e=()=>{this._onClose("forced close"),this.transport.close()},t=()=>{this.off("upgrade",t),this.off("upgradeError",t),e()},r=()=>{this.once("upgrade",t),this.once("upgradeError",t)};return"opening"!==this.readyState&&"open"!==this.readyState||(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?r():e()}):this.upgrading?r():e()),this}_onError(e){if(ka.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&"opening"===this.readyState)return this.transports.shift(),this._open();this.emitReserved("error",e),this._onClose("transport error",e)}_onClose(e,t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),xa&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const e=wa.indexOf(this._offlineEventListener);-1!==e&&wa.splice(e,1)}this.readyState="closed",this.id=null,this.emitReserved("close",e,t),this.writeBuffer=[],this._prevBufferLen=0}}}ka.protocol=4;class Sa extends ka{constructor(){super(...arguments),this._upgrades=[]}onOpen(){if(super.onOpen(),"open"===this.readyState&&this.opts.upgrade)for(let e=0;e<this._upgrades.length;e++)this._probe(this._upgrades[e])}_probe(e){let t=this.createTransport(e),r=!1;ka.priorWebsocketSuccess=!1;const n=()=>{r||(t.send([{type:"ping",data:"probe"}]),t.once("packet",e=>{if(!r)if("pong"===e.type&&"probe"===e.data){if(this.upgrading=!0,this.emitReserved("upgrading",t),!t)return;ka.priorWebsocketSuccess="websocket"===t.name,this.transport.pause(()=>{r||"closed"!==this.readyState&&(c(),this.setTransport(t),t.send([{type:"upgrade"}]),this.emitReserved("upgrade",t),t=null,this.upgrading=!1,this.flush())})}else{const e=new Error("probe error");e.transport=t.name,this.emitReserved("upgradeError",e)}}))};function o(){r||(r=!0,c(),t.close(),t=null)}const a=e=>{const r=new Error("probe error: "+e);r.transport=t.name,o(),this.emitReserved("upgradeError",r)};function i(){a("transport closed")}function s(){a("socket closed")}function l(e){t&&e.name!==t.name&&o()}const c=()=>{t.removeListener("open",n),t.removeListener("error",a),t.removeListener("close",i),this.off("close",s),this.off("upgrading",l)};t.once("open",n),t.once("error",a),t.once("close",i),this.once("close",s),this.once("upgrading",l),-1!==this._upgrades.indexOf("webtransport")&&"webtransport"!==e?this.setTimeoutFn(()=>{r||t.open()},200):t.open()}onHandshake(e){this._upgrades=this._filterUpgrades(e.upgrades),super.onHandshake(e)}_filterUpgrades(e){const t=[];for(let r=0;r<e.length;r++)~this.transports.indexOf(e[r])&&t.push(e[r]);return t}}class ja extends Sa{constructor(e){const t="object"===typeof e?e:arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};(!t.transports||t.transports&&"string"===typeof t.transports[0])&&(t.transports=(t.transports||["polling","websocket","webtransport"]).map(e=>ga[e]).filter(e=>!!e)),super(e,t)}}const _a="function"===typeof ArrayBuffer,Ea=Object.prototype.toString,Ca="function"===typeof Blob||"undefined"!==typeof Blob&&"[object BlobConstructor]"===Ea.call(Blob),Ta="function"===typeof File||"undefined"!==typeof File&&"[object FileConstructor]"===Ea.call(File);function Ra(e){return _a&&(e instanceof ArrayBuffer||(e=>"function"===typeof ArrayBuffer.isView?ArrayBuffer.isView(e):e.buffer instanceof ArrayBuffer)(e))||Ca&&e instanceof Blob||Ta&&e instanceof File}function Pa(e,t){if(!e||"object"!==typeof e)return!1;if(Array.isArray(e)){for(let t=0,r=e.length;t<r;t++)if(Pa(e[t]))return!0;return!1}if(Ra(e))return!0;if(e.toJSON&&"function"===typeof e.toJSON&&1===arguments.length)return Pa(e.toJSON(),!0);for(const r in e)if(Object.prototype.hasOwnProperty.call(e,r)&&Pa(e[r]))return!0;return!1}function za(e){const t=[],r=e.data,n=e;return n.data=Na(r,t),n.attachments=t.length,{packet:n,buffers:t}}function Na(e,t){if(!e)return e;if(Ra(e)){const r={_placeholder:!0,num:t.length};return t.push(e),r}if(Array.isArray(e)){const r=new Array(e.length);for(let n=0;n<e.length;n++)r[n]=Na(e[n],t);return r}if("object"===typeof e&&!(e instanceof Date)){const r={};for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=Na(e[n],t));return r}return e}function Oa(e,t){return e.data=Aa(e.data,t),delete e.attachments,e}function Aa(e,t){if(!e)return e;if(e&&!0===e._placeholder){if("number"===typeof e.num&&e.num>=0&&e.num<t.length)return t[e.num];throw new Error("illegal attachments")}if(Array.isArray(e))for(let r=0;r<e.length;r++)e[r]=Aa(e[r],t);else if("object"===typeof e)for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&(e[r]=Aa(e[r],t));return e}const La=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"],Da=5;var Ia;!function(e){e[e.CONNECT=0]="CONNECT",e[e.DISCONNECT=1]="DISCONNECT",e[e.EVENT=2]="EVENT",e[e.ACK=3]="ACK",e[e.CONNECT_ERROR=4]="CONNECT_ERROR",e[e.BINARY_EVENT=5]="BINARY_EVENT",e[e.BINARY_ACK=6]="BINARY_ACK"}(Ia||(Ia={}));class $a{constructor(e){this.replacer=e}encode(e){return e.type!==Ia.EVENT&&e.type!==Ia.ACK||!Pa(e)?[this.encodeAsString(e)]:this.encodeAsBinary({type:e.type===Ia.EVENT?Ia.BINARY_EVENT:Ia.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id})}encodeAsString(e){let t=""+e.type;return e.type!==Ia.BINARY_EVENT&&e.type!==Ia.BINARY_ACK||(t+=e.attachments+"-"),e.nsp&&"/"!==e.nsp&&(t+=e.nsp+","),null!=e.id&&(t+=e.id),null!=e.data&&(t+=JSON.stringify(e.data,this.replacer)),t}encodeAsBinary(e){const t=za(e),r=this.encodeAsString(t.packet),n=t.buffers;return n.unshift(r),n}}function Fa(e){return"[object Object]"===Object.prototype.toString.call(e)}class Ma extends Yo{constructor(e){super(),this.reviver=e}add(e){let t;if("string"===typeof e){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");t=this.decodeString(e);const r=t.type===Ia.BINARY_EVENT;r||t.type===Ia.BINARY_ACK?(t.type=r?Ia.EVENT:Ia.ACK,this.reconstructor=new Ba(t),0===t.attachments&&super.emitReserved("decoded",t)):super.emitReserved("decoded",t)}else{if(!Ra(e)&&!e.base64)throw new Error("Unknown type: "+e);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");t=this.reconstructor.takeBinaryData(e),t&&(this.reconstructor=null,super.emitReserved("decoded",t))}}decodeString(e){let t=0;const r={type:Number(e.charAt(0))};if(void 0===Ia[r.type])throw new Error("unknown packet type "+r.type);if(r.type===Ia.BINARY_EVENT||r.type===Ia.BINARY_ACK){const n=t+1;for(;"-"!==e.charAt(++t)&&t!=e.length;);const o=e.substring(n,t);if(o!=Number(o)||"-"!==e.charAt(t))throw new Error("Illegal attachments");r.attachments=Number(o)}if("/"===e.charAt(t+1)){const n=t+1;for(;++t;){if(","===e.charAt(t))break;if(t===e.length)break}r.nsp=e.substring(n,t)}else r.nsp="/";const n=e.charAt(t+1);if(""!==n&&Number(n)==n){const n=t+1;for(;++t;){const r=e.charAt(t);if(null==r||Number(r)!=r){--t;break}if(t===e.length)break}r.id=Number(e.substring(n,t+1))}if(e.charAt(++t)){const n=this.tryParse(e.substr(t));if(!Ma.isPayloadValid(r.type,n))throw new Error("invalid payload");r.data=n}return r}tryParse(e){try{return JSON.parse(e,this.reviver)}catch(hm){return!1}}static isPayloadValid(e,t){switch(e){case Ia.CONNECT:return Fa(t);case Ia.DISCONNECT:return void 0===t;case Ia.CONNECT_ERROR:return"string"===typeof t||Fa(t);case Ia.EVENT:case Ia.BINARY_EVENT:return Array.isArray(t)&&("number"===typeof t[0]||"string"===typeof t[0]&&-1===La.indexOf(t[0]));case Ia.ACK:case Ia.BINARY_ACK:return Array.isArray(t)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class Ba{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){const e=Oa(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}function Ua(e,t,r){return e.on(t,r),function(){e.off(t,r)}}const qa=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class Ha extends Yo{constructor(e,t,r){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=t,r&&r.auth&&(this.auth=r.auth),this._opts=Object.assign({},r),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const e=this.io;this.subs=[Ua(e,"open",this.onopen.bind(this)),Ua(e,"packet",this.onpacket.bind(this)),Ua(e,"error",this.onerror.bind(this)),Ua(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected||(this.subEvents(),this.io._reconnecting||this.io.open(),"open"===this.io._readyState&&this.onopen()),this}open(){return this.connect()}send(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.unshift("message"),this.emit.apply(this,t),this}emit(e){var t,r,n;if(qa.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');for(var o=arguments.length,a=new Array(o>1?o-1:0),i=1;i<o;i++)a[i-1]=arguments[i];if(a.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(a),this;const s={type:Ia.EVENT,data:a,options:{}};if(s.options.compress=!1!==this.flags.compress,"function"===typeof a[a.length-1]){const e=this.ids++,t=a.pop();this._registerAckCallback(e,t),s.id=e}const l=null===(r=null===(t=this.io.engine)||void 0===t?void 0:t.transport)||void 0===r?void 0:r.writable,c=this.connected&&!(null===(n=this.io.engine)||void 0===n?void 0:n._hasPingExpired());return this.flags.volatile&&!l||(c?(this.notifyOutgoingListeners(s),this.packet(s)):this.sendBuffer.push(s)),this.flags={},this}_registerAckCallback(e,t){var r,n=this;const o=null!==(r=this.flags.timeout)&&void 0!==r?r:this._opts.ackTimeout;if(void 0===o)return void(this.acks[e]=t);const a=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let t=0;t<this.sendBuffer.length;t++)this.sendBuffer[t].id===e&&this.sendBuffer.splice(t,1);t.call(this,new Error("operation has timed out"))},o),i=function(){n.io.clearTimeoutFn(a);for(var e=arguments.length,r=new Array(e),o=0;o<e;o++)r[o]=arguments[o];t.apply(n,r)};i.withError=!0,this.acks[e]=i}emitWithAck(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return new Promise((t,n)=>{const o=(e,r)=>e?n(e):t(r);o.withError=!0,r.push(o),this.emit(e,...r)})}_addToQueue(e){var t=this;let r;"function"===typeof e[e.length-1]&&(r=e.pop());const n={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push(function(e){if(n!==t._queue[0])return;if(null!==e)n.tryCount>t._opts.retries&&(t._queue.shift(),r&&r(e));else if(t._queue.shift(),r){for(var o=arguments.length,a=new Array(o>1?o-1:0),i=1;i<o;i++)a[i-1]=arguments[i];r(null,...a)}return n.pending=!1,t._drainQueue()}),this._queue.push(n),this._drainQueue()}_drainQueue(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!this.connected||0===this._queue.length)return;const t=this._queue[0];t.pending&&!e||(t.pending=!0,t.tryCount++,this.flags=t.flags,this.emit.apply(this,t.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){"function"==typeof this.auth?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:Ia.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,t){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,t),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(e=>{if(!this.sendBuffer.some(t=>String(t.id)===e)){const t=this.acks[e];delete this.acks[e],t.withError&&t.call(this,new Error("socket has been disconnected"))}})}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case Ia.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case Ia.EVENT:case Ia.BINARY_EVENT:this.onevent(e);break;case Ia.ACK:case Ia.BINARY_ACK:this.onack(e);break;case Ia.DISCONNECT:this.ondisconnect();break;case Ia.CONNECT_ERROR:this.destroy();const t=new Error(e.data.message);t.data=e.data.data,this.emitReserved("connect_error",t)}}onevent(e){const t=e.data||[];null!=e.id&&t.push(this.ack(e.id)),this.connected?this.emitEvent(t):this.receiveBuffer.push(Object.freeze(t))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){const t=this._anyListeners.slice();for(const r of t)r.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&"string"===typeof e[e.length-1]&&(this._lastOffset=e[e.length-1])}ack(e){const t=this;let r=!1;return function(){if(!r){r=!0;for(var n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];t.packet({type:Ia.ACK,id:e,data:o})}}}onack(e){const t=this.acks[e.id];"function"===typeof t&&(delete this.acks[e.id],t.withError&&e.data.unshift(null),t.apply(this,e.data))}onconnect(e,t){this.id=e,this.recovered=t&&this._pid===t,this._pid=t,this.connected=!0,this.emitBuffered(),this.emitReserved("connect"),this._drainQueue(!0)}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:Ia.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){const t=this._anyListeners;for(let r=0;r<t.length;r++)if(e===t[r])return t.splice(r,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){const t=this._anyOutgoingListeners;for(let r=0;r<t.length;r++)if(e===t[r])return t.splice(r,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const t=this._anyOutgoingListeners.slice();for(const r of t)r.apply(this,e.data)}}}function Wa(e){e=e||{},this.ms=e.min||100,this.max=e.max||1e4,this.factor=e.factor||2,this.jitter=e.jitter>0&&e.jitter<=1?e.jitter:0,this.attempts=0}Wa.prototype.duration=function(){var e=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var t=Math.random(),r=Math.floor(t*this.jitter*e);e=0==(1&Math.floor(10*t))?e-r:e+r}return 0|Math.min(e,this.max)},Wa.prototype.reset=function(){this.attempts=0},Wa.prototype.setMin=function(e){this.ms=e},Wa.prototype.setMax=function(e){this.max=e},Wa.prototype.setJitter=function(e){this.jitter=e};class Va extends Yo{constructor(e,r){var n;super(),this.nsps={},this.subs=[],e&&"object"===typeof e&&(r=e,e=void 0),(r=r||{}).path=r.path||"/socket.io",this.opts=r,Zo(this,r),this.reconnection(!1!==r.reconnection),this.reconnectionAttempts(r.reconnectionAttempts||1/0),this.reconnectionDelay(r.reconnectionDelay||1e3),this.reconnectionDelayMax(r.reconnectionDelayMax||5e3),this.randomizationFactor(null!==(n=r.randomizationFactor)&&void 0!==n?n:.5),this.backoff=new Wa({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(null==r.timeout?2e4:r.timeout),this._readyState="closed",this.uri=e;const o=r.parser||t;this.encoder=new o.Encoder,this.decoder=new o.Decoder,this._autoConnect=!1!==r.autoConnect,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,e||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(e){return void 0===e?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var t;return void 0===e?this._reconnectionDelay:(this._reconnectionDelay=e,null===(t=this.backoff)||void 0===t||t.setMin(e),this)}randomizationFactor(e){var t;return void 0===e?this._randomizationFactor:(this._randomizationFactor=e,null===(t=this.backoff)||void 0===t||t.setJitter(e),this)}reconnectionDelayMax(e){var t;return void 0===e?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,null===(t=this.backoff)||void 0===t||t.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new ja(this.uri,this.opts);const t=this.engine,r=this;this._readyState="opening",this.skipReconnect=!1;const n=Ua(t,"open",function(){r.onopen(),e&&e()}),o=t=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",t),e?e(t):this.maybeReconnectOnOpen()},a=Ua(t,"error",o);if(!1!==this._timeout){const e=this._timeout,r=this.setTimeoutFn(()=>{n(),o(new Error("timeout")),t.close()},e);this.opts.autoUnref&&r.unref(),this.subs.push(()=>{this.clearTimeoutFn(r)})}return this.subs.push(n),this.subs.push(a),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const e=this.engine;this.subs.push(Ua(e,"ping",this.onping.bind(this)),Ua(e,"data",this.ondata.bind(this)),Ua(e,"error",this.onerror.bind(this)),Ua(e,"close",this.onclose.bind(this)),Ua(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(hm){this.onclose("parse error",hm)}}ondecoded(e){Ko(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,t){let r=this.nsps[e];return r?this._autoConnect&&!r.active&&r.connect():(r=new Ha(this,e,t),this.nsps[e]=r),r}_destroy(e){const t=Object.keys(this.nsps);for(const r of t){if(this.nsps[r].active)return}this._close()}_packet(e){const t=this.encoder.encode(e);for(let r=0;r<t.length;r++)this.engine.write(t[r],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(e,t){var r;this.cleanup(),null===(r=this.engine)||void 0===r||r.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,t),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const t=this.backoff.duration();this._reconnecting=!0;const r=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),e.skipReconnect||e.open(t=>{t?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",t)):e.onreconnect()}))},t);this.opts.autoUnref&&r.unref(),this.subs.push(()=>{this.clearTimeoutFn(r)})}}onreconnect(){const e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}}const Ya={};function Ka(e,t){"object"===typeof e&&(t=e,e=void 0);const r=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2?arguments[2]:void 0,n=e;r=r||"undefined"!==typeof location&&location,null==e&&(e=r.protocol+"//"+r.host),"string"===typeof e&&("/"===e.charAt(0)&&(e="/"===e.charAt(1)?r.protocol+e:r.host+e),/^(https?|wss?):\/\//.test(e)||(e="undefined"!==typeof r?r.protocol+"//"+e:"https://"+e),n=va(e)),n.port||(/^(http|ws)$/.test(n.protocol)?n.port="80":/^(http|ws)s$/.test(n.protocol)&&(n.port="443")),n.path=n.path||"/";const o=-1!==n.host.indexOf(":")?"["+n.host+"]":n.host;return n.id=n.protocol+"://"+o+":"+n.port+t,n.href=n.protocol+"://"+o+(r&&r.port===n.port?"":":"+n.port),n}(e,(t=t||{}).path||"/socket.io"),n=r.source,o=r.id,a=r.path,i=Ya[o]&&a in Ya[o].nsps;let s;return t.forceNew||t["force new connection"]||!1===t.multiplex||i?s=new Va(n,t):(Ya[o]||(Ya[o]=new Va(n,t)),s=Ya[o]),r.query&&!t.query&&(t.query=r.queryKey),s.socket(r.path,t)}Object.assign(Ka,{Manager:Va,Socket:Ha,io:Ka,connect:Ka});const Qa=(0,n.createContext)(),Xa=()=>{const e=(0,n.useContext)(Qa);if(!e)throw new Error("useSocket must be used within a SocketProvider");return e},Ga=e=>{let{children:t}=e;const[r,o]=(0,n.useState)(null),[a,i]=(0,n.useState)(!1),{user:s}=jo();(0,n.useEffect)(()=>{if(s){const e=Ka("https://dataleaf-server-production.up.railway.app",{withCredentials:!0,transports:["websocket","polling"]});return e.on("connect",()=>{console.log("Socket connected:",e.id),i(!0),e.emit("join-user-room",s.id)}),e.on("disconnect",()=>{console.log("Socket disconnected"),i(!1)}),e.on("connect_error",e=>{console.error("Socket connection error:",e),i(!1)}),o(e),()=>{e.disconnect()}}r&&(r.disconnect(),o(null),i(!1))},[s]);const l={socket:r,connected:a};return(0,ko.jsx)(Qa.Provider,{value:l,children:t})},Ja=e=>{const t=(e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase()))(e);return t.charAt(0).toUpperCase()+t.slice(1)},Za=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((e,t,r)=>Boolean(e)&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim()},ei=e=>{for(const t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0};var ti={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const ri=(0,n.forwardRef)((e,t)=>{let{color:r="currentColor",size:o=24,strokeWidth:a=2,absoluteStrokeWidth:i,className:s="",children:l,iconNode:c,...u}=e;return(0,n.createElement)("svg",{ref:t,...ti,width:o,height:o,stroke:r,strokeWidth:i?24*Number(a)/Number(o):a,className:Za("lucide",s),...!l&&!ei(u)&&{"aria-hidden":"true"},...u},[...c.map(e=>{let[t,r]=e;return(0,n.createElement)(t,r)}),...Array.isArray(l)?l:[l]])}),ni=(e,t)=>{const r=(0,n.forwardRef)((r,o)=>{let{className:a,...i}=r;return(0,n.createElement)(ri,{ref:o,iconNode:t,className:Za(`lucide-${s=Ja(e),s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,a),...i});var s});return r.displayName=Ja(e),r},oi=ni("layout-dashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]),ai=ni("clipboard-list",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]]),ii=ni("gift",[["rect",{x:"3",y:"8",width:"18",height:"4",rx:"1",key:"bkv52"}],["path",{d:"M12 8v13",key:"1c76mn"}],["path",{d:"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7",key:"6wjy6b"}],["path",{d:"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",key:"1ihvrl"}]]),si=ni("user",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]),li=ni("chevron-down",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]),ci=ni("history",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]),ui=ni("log-out",[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]),di=ni("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),fi=ni("menu",[["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 18h16",key:"19g7jn"}],["path",{d:"M4 6h16",key:"1o0s65"}]]);var pi=function(){return pi=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},pi.apply(this,arguments)};Object.create;function hi(e,t,r){if(r||2===arguments.length)for(var n,o=0,a=t.length;o<a;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))}Object.create;"function"===typeof SuppressedError&&SuppressedError;var mi=r(324),gi=r.n(mi),yi="-ms-",bi="-moz-",vi="-webkit-",xi="comm",wi="rule",ki="decl",Si="@keyframes",ji=Math.abs,_i=String.fromCharCode,Ei=Object.assign;function Ci(e){return e.trim()}function Ti(e,t){return(e=t.exec(e))?e[0]:e}function Ri(e,t,r){return e.replace(t,r)}function Pi(e,t,r){return e.indexOf(t,r)}function zi(e,t){return 0|e.charCodeAt(t)}function Ni(e,t,r){return e.slice(t,r)}function Oi(e){return e.length}function Ai(e){return e.length}function Li(e,t){return t.push(e),e}function Di(e,t){return e.filter(function(e){return!Ti(e,t)})}var Ii=1,$i=1,Fi=0,Mi=0,Bi=0,Ui="";function qi(e,t,r,n,o,a,i,s){return{value:e,root:t,parent:r,type:n,props:o,children:a,line:Ii,column:$i,length:i,return:"",siblings:s}}function Hi(e,t){return Ei(qi("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Wi(e){for(;e.root;)e=Hi(e.root,{children:[e]});Li(e,e.siblings)}function Vi(){return Bi=Mi>0?zi(Ui,--Mi):0,$i--,10===Bi&&($i=1,Ii--),Bi}function Yi(){return Bi=Mi<Fi?zi(Ui,Mi++):0,$i++,10===Bi&&($i=1,Ii++),Bi}function Ki(){return zi(Ui,Mi)}function Qi(){return Mi}function Xi(e,t){return Ni(Ui,e,t)}function Gi(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Ji(e){return Ii=$i=1,Fi=Oi(Ui=e),Mi=0,[]}function Zi(e){return Ui="",e}function es(e){return Ci(Xi(Mi-1,ns(91===e?e+2:40===e?e+1:e)))}function ts(e){for(;(Bi=Ki())&&Bi<33;)Yi();return Gi(e)>2||Gi(Bi)>3?"":" "}function rs(e,t){for(;--t&&Yi()&&!(Bi<48||Bi>102||Bi>57&&Bi<65||Bi>70&&Bi<97););return Xi(e,Qi()+(t<6&&32==Ki()&&32==Yi()))}function ns(e){for(;Yi();)switch(Bi){case e:return Mi;case 34:case 39:34!==e&&39!==e&&ns(Bi);break;case 40:41===e&&ns(e);break;case 92:Yi()}return Mi}function os(e,t){for(;Yi()&&e+Bi!==57&&(e+Bi!==84||47!==Ki()););return"/*"+Xi(t,Mi-1)+"*"+_i(47===e?e:Yi())}function as(e){for(;!Gi(Ki());)Yi();return Xi(e,Mi)}function is(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function ss(e,t,r,n){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case ki:return e.return=e.return||e.value;case xi:return"";case Si:return e.return=e.value+"{"+is(e.children,n)+"}";case wi:if(!Oi(e.value=e.props.join(",")))return""}return Oi(r=is(e.children,n))?e.return=e.value+"{"+r+"}":""}function ls(e,t,r){switch(function(e,t){return 45^zi(e,0)?(((t<<2^zi(e,0))<<2^zi(e,1))<<2^zi(e,2))<<2^zi(e,3):0}(e,t)){case 5103:return vi+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return vi+e+e;case 4789:return bi+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return vi+e+bi+e+yi+e+e;case 5936:switch(zi(e,t+11)){case 114:return vi+e+yi+Ri(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return vi+e+yi+Ri(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return vi+e+yi+Ri(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return vi+e+yi+e+e;case 6165:return vi+e+yi+"flex-"+e+e;case 5187:return vi+e+Ri(e,/(\w+).+(:[^]+)/,vi+"box-$1$2"+yi+"flex-$1$2")+e;case 5443:return vi+e+yi+"flex-item-"+Ri(e,/flex-|-self/g,"")+(Ti(e,/flex-|baseline/)?"":yi+"grid-row-"+Ri(e,/flex-|-self/g,""))+e;case 4675:return vi+e+yi+"flex-line-pack"+Ri(e,/align-content|flex-|-self/g,"")+e;case 5548:return vi+e+yi+Ri(e,"shrink","negative")+e;case 5292:return vi+e+yi+Ri(e,"basis","preferred-size")+e;case 6060:return vi+"box-"+Ri(e,"-grow","")+vi+e+yi+Ri(e,"grow","positive")+e;case 4554:return vi+Ri(e,/([^-])(transform)/g,"$1"+vi+"$2")+e;case 6187:return Ri(Ri(Ri(e,/(zoom-|grab)/,vi+"$1"),/(image-set)/,vi+"$1"),e,"")+e;case 5495:case 3959:return Ri(e,/(image-set\([^]*)/,vi+"$1$`$1");case 4968:return Ri(Ri(e,/(.+:)(flex-)?(.*)/,vi+"box-pack:$3"+yi+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+vi+e+e;case 4200:if(!Ti(e,/flex-|baseline/))return yi+"grid-column-align"+Ni(e,t)+e;break;case 2592:case 3360:return yi+Ri(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(e,r){return t=r,Ti(e.props,/grid-\w+-end/)})?~Pi(e+(r=r[t].value),"span",0)?e:yi+Ri(e,"-start","")+e+yi+"grid-row-span:"+(~Pi(r,"span",0)?Ti(r,/\d+/):+Ti(r,/\d+/)-+Ti(e,/\d+/))+";":yi+Ri(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(e){return Ti(e.props,/grid-\w+-start/)})?e:yi+Ri(Ri(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return Ri(e,/(.+)-inline(.+)/,vi+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Oi(e)-1-t>6)switch(zi(e,t+1)){case 109:if(45!==zi(e,t+4))break;case 102:return Ri(e,/(.+:)(.+)-([^]+)/,"$1"+vi+"$2-$3$1"+bi+(108==zi(e,t+3)?"$3":"$2-$3"))+e;case 115:return~Pi(e,"stretch",0)?ls(Ri(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return Ri(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,r,n,o,a,i,s){return yi+r+":"+n+s+(o?yi+r+"-span:"+(a?i:+i-+n)+s:"")+e});case 4949:if(121===zi(e,t+6))return Ri(e,":",":"+vi)+e;break;case 6444:switch(zi(e,45===zi(e,14)?18:11)){case 120:return Ri(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+vi+(45===zi(e,14)?"inline-":"")+"box$3$1"+vi+"$2$3$1"+yi+"$2box$3")+e;case 100:return Ri(e,":",":"+yi)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return Ri(e,"scroll-","scroll-snap-")+e}return e}function cs(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case ki:return void(e.return=ls(e.value,e.length,r));case Si:return is([Hi(e,{value:Ri(e.value,"@","@"+vi)})],n);case wi:if(e.length)return function(e,t){return e.map(t).join("")}(r=e.props,function(t){switch(Ti(t,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Wi(Hi(e,{props:[Ri(t,/:(read-\w+)/,":-moz-$1")]})),Wi(Hi(e,{props:[t]})),Ei(e,{props:Di(r,n)});break;case"::placeholder":Wi(Hi(e,{props:[Ri(t,/:(plac\w+)/,":"+vi+"input-$1")]})),Wi(Hi(e,{props:[Ri(t,/:(plac\w+)/,":-moz-$1")]})),Wi(Hi(e,{props:[Ri(t,/:(plac\w+)/,yi+"input-$1")]})),Wi(Hi(e,{props:[t]})),Ei(e,{props:Di(r,n)})}return""})}}function us(e){return Zi(ds("",null,null,null,[""],e=Ji(e),0,[0],e))}function ds(e,t,r,n,o,a,i,s,l){for(var c=0,u=0,d=i,f=0,p=0,h=0,m=1,g=1,y=1,b=0,v="",x=o,w=a,k=n,S=v;g;)switch(h=b,b=Yi()){case 40:if(108!=h&&58==zi(S,d-1)){-1!=Pi(S+=Ri(es(b),"&","&\f"),"&\f",ji(c?s[c-1]:0))&&(y=-1);break}case 34:case 39:case 91:S+=es(b);break;case 9:case 10:case 13:case 32:S+=ts(h);break;case 92:S+=rs(Qi()-1,7);continue;case 47:switch(Ki()){case 42:case 47:Li(ps(os(Yi(),Qi()),t,r,l),l);break;default:S+="/"}break;case 123*m:s[c++]=Oi(S)*y;case 125*m:case 59:case 0:switch(b){case 0:case 125:g=0;case 59+u:-1==y&&(S=Ri(S,/\f/g,"")),p>0&&Oi(S)-d&&Li(p>32?hs(S+";",n,r,d-1,l):hs(Ri(S," ","")+";",n,r,d-2,l),l);break;case 59:S+=";";default:if(Li(k=fs(S,t,r,c,u,o,s,v,x=[],w=[],d,a),a),123===b)if(0===u)ds(S,t,k,k,x,a,d,s,w);else switch(99===f&&110===zi(S,3)?100:f){case 100:case 108:case 109:case 115:ds(e,k,k,n&&Li(fs(e,k,k,0,0,o,s,v,o,x=[],d,w),w),o,w,d,s,n?x:w);break;default:ds(S,k,k,k,[""],w,0,s,w)}}c=u=p=0,m=y=1,v=S="",d=i;break;case 58:d=1+Oi(S),p=h;default:if(m<1)if(123==b)--m;else if(125==b&&0==m++&&125==Vi())continue;switch(S+=_i(b),b*m){case 38:y=u>0?1:(S+="\f",-1);break;case 44:s[c++]=(Oi(S)-1)*y,y=1;break;case 64:45===Ki()&&(S+=es(Yi())),f=Ki(),u=d=Oi(v=S+=as(Qi())),b++;break;case 45:45===h&&2==Oi(S)&&(m=0)}}return a}function fs(e,t,r,n,o,a,i,s,l,c,u,d){for(var f=o-1,p=0===o?a:[""],h=Ai(p),m=0,g=0,y=0;m<n;++m)for(var b=0,v=Ni(e,f+1,f=ji(g=i[m])),x=e;b<h;++b)(x=Ci(g>0?p[b]+" "+v:Ri(v,/&\f/g,p[b])))&&(l[y++]=x);return qi(e,t,r,0===o?wi:s,l,c,u,d)}function ps(e,t,r,n){return qi(e,t,r,xi,_i(Bi),Ni(e,2,-2),0,n)}function hs(e,t,r,n,o){return qi(e,t,r,ki,Ni(e,0,n),Ni(e,n+1,-1),n,o)}var ms={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},gs="undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_URL:"https://dataleaf-server-production.up.railway.app"}&&({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_URL:"https://dataleaf-server-production.up.railway.app"}.REACT_APP_SC_ATTR||{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_URL:"https://dataleaf-server-production.up.railway.app"}.SC_ATTR)||"data-styled",ys="active",bs="data-styled-version",vs="6.1.19",xs="/*!sc*/\n",ws="undefined"!=typeof window&&"undefined"!=typeof document,ks=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_URL:"https://dataleaf-server-production.up.railway.app"}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_URL:"https://dataleaf-server-production.up.railway.app"}.REACT_APP_SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_URL:"https://dataleaf-server-production.up.railway.app"}.REACT_APP_SC_DISABLE_SPEEDY?"false"!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_URL:"https://dataleaf-server-production.up.railway.app"}.REACT_APP_SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_URL:"https://dataleaf-server-production.up.railway.app"}.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_URL:"https://dataleaf-server-production.up.railway.app"}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_URL:"https://dataleaf-server-production.up.railway.app"}.SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_URL:"https://dataleaf-server-production.up.railway.app"}.SC_DISABLE_SPEEDY&&("false"!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_URL:"https://dataleaf-server-production.up.railway.app"}.SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_URL:"https://dataleaf-server-production.up.railway.app"}.SC_DISABLE_SPEEDY)),Ss=(new Set,Object.freeze([])),js=Object.freeze({});function _s(e,t,r){return void 0===r&&(r=js),e.theme!==r.theme&&e.theme||t||r.theme}var Es=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),Cs=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Ts=/(^-|-$)/g;function Rs(e){return e.replace(Cs,"-").replace(Ts,"")}var Ps=/(a)(d)/gi,zs=function(e){return String.fromCharCode(e+(e>25?39:97))};function Ns(e){var t,r="";for(t=Math.abs(e);t>52;t=t/52|0)r=zs(t%52)+r;return(zs(t%52)+r).replace(Ps,"$1-$2")}var Os,As=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},Ls=function(e){return As(5381,e)};function Ds(e){return Ns(Ls(e)>>>0)}function Is(e){return e.displayName||e.name||"Component"}function $s(e){return"string"==typeof e&&!0}var Fs="function"==typeof Symbol&&Symbol.for,Ms=Fs?Symbol.for("react.memo"):60115,Bs=Fs?Symbol.for("react.forward_ref"):60112,Us={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},qs={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Hs={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Ws=((Os={})[Bs]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Os[Ms]=Hs,Os);function Vs(e){return("type"in(t=e)&&t.type.$$typeof)===Ms?Hs:"$$typeof"in e?Ws[e.$$typeof]:Us;var t}var Ys=Object.defineProperty,Ks=Object.getOwnPropertyNames,Qs=Object.getOwnPropertySymbols,Xs=Object.getOwnPropertyDescriptor,Gs=Object.getPrototypeOf,Js=Object.prototype;function Zs(e,t,r){if("string"!=typeof t){if(Js){var n=Gs(t);n&&n!==Js&&Zs(e,n,r)}var o=Ks(t);Qs&&(o=o.concat(Qs(t)));for(var a=Vs(e),i=Vs(t),s=0;s<o.length;++s){var l=o[s];if(!(l in qs||r&&r[l]||i&&l in i||a&&l in a)){var c=Xs(t,l);try{Ys(e,l,c)}catch(e){}}}}return e}function el(e){return"function"==typeof e}function tl(e){return"object"==typeof e&&"styledComponentId"in e}function rl(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function nl(e,t){if(0===e.length)return"";for(var r=e[0],n=1;n<e.length;n++)r+=t?t+e[n]:e[n];return r}function ol(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function al(e,t,r){if(void 0===r&&(r=!1),!r&&!ol(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=al(e[n],t[n]);else if(ol(t))for(var n in t)e[n]=al(e[n],t[n]);return e}function il(e,t){Object.defineProperty(e,"toString",{value:t})}function sl(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var ll=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}return e.prototype.indexOfGroup=function(e){for(var t=0,r=0;r<e;r++)t+=this.groupSizes[r];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var r=this.groupSizes,n=r.length,o=n;e>=o;)if((o<<=1)<0)throw sl(16,"".concat(e));this.groupSizes=new Uint32Array(o),this.groupSizes.set(r),this.length=o;for(var a=n;a<o;a++)this.groupSizes[a]=0}for(var i=this.indexOfGroup(e+1),s=(a=0,t.length);a<s;a++)this.tag.insertRule(i,t[a])&&(this.groupSizes[e]++,i++)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],r=this.indexOfGroup(e),n=r+t;this.groupSizes[e]=0;for(var o=r;o<n;o++)this.tag.deleteRule(r)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var r=this.groupSizes[e],n=this.indexOfGroup(e),o=n+r,a=n;a<o;a++)t+="".concat(this.tag.getRule(a)).concat(xs);return t},e}(),cl=new Map,ul=new Map,dl=1,fl=function(e){if(cl.has(e))return cl.get(e);for(;ul.has(dl);)dl++;var t=dl++;return cl.set(e,t),ul.set(t,e),t},pl=function(e,t){dl=t+1,cl.set(e,t),ul.set(t,e)},hl="style[".concat(gs,"][").concat(bs,'="').concat(vs,'"]'),ml=new RegExp("^".concat(gs,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),gl=function(e,t,r){for(var n,o=r.split(","),a=0,i=o.length;a<i;a++)(n=o[a])&&e.registerName(t,n)},yl=function(e,t){for(var r,n=(null!==(r=t.textContent)&&void 0!==r?r:"").split(xs),o=[],a=0,i=n.length;a<i;a++){var s=n[a].trim();if(s){var l=s.match(ml);if(l){var c=0|parseInt(l[1],10),u=l[2];0!==c&&(pl(u,c),gl(e,u,l[3]),e.getTag().insertRules(c,o)),o.length=0}else o.push(s)}}},bl=function(e){for(var t=document.querySelectorAll(hl),r=0,n=t.length;r<n;r++){var o=t[r];o&&o.getAttribute(gs)!==ys&&(yl(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function vl(){return r.nc}var xl=function(e){var t=document.head,r=e||t,n=document.createElement("style"),o=function(e){var t=Array.from(e.querySelectorAll("style[".concat(gs,"]")));return t[t.length-1]}(r),a=void 0!==o?o.nextSibling:null;n.setAttribute(gs,ys),n.setAttribute(bs,vs);var i=vl();return i&&n.setAttribute("nonce",i),r.insertBefore(n,a),n},wl=function(){function e(e){this.element=xl(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,r=0,n=t.length;r<n;r++){var o=t[r];if(o.ownerNode===e)return o}throw sl(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),kl=function(){function e(e){this.element=xl(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var r=document.createTextNode(t);return this.element.insertBefore(r,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),Sl=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),jl=ws,_l={isServer:!ws,useCSSOMInjection:!ks},El=function(){function e(e,t,r){void 0===e&&(e=js),void 0===t&&(t={});var n=this;this.options=pi(pi({},_l),e),this.gs=t,this.names=new Map(r),this.server=!!e.isServer,!this.server&&ws&&jl&&(jl=!1,bl(this)),il(this,function(){return function(e){for(var t=e.getTag(),r=t.length,n="",o=function(r){var o=function(e){return ul.get(e)}(r);if(void 0===o)return"continue";var a=e.names.get(o),i=t.getGroup(r);if(void 0===a||!a.size||0===i.length)return"continue";var s="".concat(gs,".g").concat(r,'[id="').concat(o,'"]'),l="";void 0!==a&&a.forEach(function(e){e.length>0&&(l+="".concat(e,","))}),n+="".concat(i).concat(s,'{content:"').concat(l,'"}').concat(xs)},a=0;a<r;a++)o(a);return n}(n)})}return e.registerId=function(e){return fl(e)},e.prototype.rehydrate=function(){!this.server&&ws&&bl(this)},e.prototype.reconstructWithOptions=function(t,r){return void 0===r&&(r=!0),new e(pi(pi({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,r=e.target;return e.isServer?new Sl(r):t?new wl(r):new kl(r)}(this.options),new ll(e)));var e},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(fl(e),this.names.has(e))this.names.get(e).add(t);else{var r=new Set;r.add(t),this.names.set(e,r)}},e.prototype.insertRules=function(e,t,r){this.registerName(e,t),this.getTag().insertRules(fl(e),r)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(fl(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Cl=/&/g,Tl=/^\s*\/\/.*$/gm;function Rl(e,t){return e.map(function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return"".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=Rl(e.children,t)),e})}function Pl(e){var t,r,n,o=void 0===e?js:e,a=o.options,i=void 0===a?js:a,s=o.plugins,l=void 0===s?Ss:s,c=function(e,n,o){return o.startsWith(r)&&o.endsWith(r)&&o.replaceAll(r,"").length>0?".".concat(t):e},u=l.slice();u.push(function(e){e.type===wi&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(Cl,r).replace(n,c))}),i.prefix&&u.push(cs),u.push(ss);var d=function(e,o,a,s){void 0===o&&(o=""),void 0===a&&(a=""),void 0===s&&(s="&"),t=s,r=o,n=new RegExp("\\".concat(r,"\\b"),"g");var l=e.replace(Tl,""),c=us(a||o?"".concat(a," ").concat(o," { ").concat(l," }"):l);i.namespace&&(c=Rl(c,i.namespace));var d,f=[];return is(c,function(e){var t=Ai(e);return function(r,n,o,a){for(var i="",s=0;s<t;s++)i+=e[s](r,n,o,a)||"";return i}}(u.concat((d=function(e){return f.push(e)},function(e){e.root||(e=e.return)&&d(e)})))),f};return d.hash=l.length?l.reduce(function(e,t){return t.name||sl(15),As(e,t.name)},5381).toString():"",d}var zl=new El,Nl=Pl(),Ol=n.createContext({shouldForwardProp:void 0,styleSheet:zl,stylis:Nl}),Al=(Ol.Consumer,n.createContext(void 0));function Ll(){return(0,n.useContext)(Ol)}function Dl(e){var t=(0,n.useState)(e.stylisPlugins),r=t[0],o=t[1],a=Ll().styleSheet,i=(0,n.useMemo)(function(){var t=a;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t},[e.disableCSSOMInjection,e.sheet,e.target,a]),s=(0,n.useMemo)(function(){return Pl({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:r})},[e.enableVendorPrefixes,e.namespace,r]);(0,n.useEffect)(function(){gi()(r,e.stylisPlugins)||o(e.stylisPlugins)},[e.stylisPlugins]);var l=(0,n.useMemo)(function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:i,stylis:s}},[e.shouldForwardProp,i,s]);return n.createElement(Ol.Provider,{value:l},n.createElement(Al.Provider,{value:s},e.children))}var Il=function(){function e(e,t){var r=this;this.inject=function(e,t){void 0===t&&(t=Nl);var n=r.name+t.hash;e.hasNameForId(r.id,n)||e.insertRules(r.id,n,t(r.rules,n,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,il(this,function(){throw sl(12,String(r.name))})}return e.prototype.getName=function(e){return void 0===e&&(e=Nl),this.name+e.hash},e}(),$l=function(e){return e>="A"&&e<="Z"};function Fl(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(1===r&&"-"===n&&"-"===e[0])return e;$l(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var Ml=function(e){return null==e||!1===e||""===e},Bl=function(e){var t,r,n=[];for(var o in e){var a=e[o];e.hasOwnProperty(o)&&!Ml(a)&&(Array.isArray(a)&&a.isCss||el(a)?n.push("".concat(Fl(o),":"),a,";"):ol(a)?n.push.apply(n,hi(hi(["".concat(o," {")],Bl(a),!1),["}"],!1)):n.push("".concat(Fl(o),": ").concat((t=o,null==(r=a)||"boolean"==typeof r||""===r?"":"number"!=typeof r||0===r||t in ms||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function Ul(e,t,r,n){return Ml(e)?[]:tl(e)?[".".concat(e.styledComponentId)]:el(e)?!el(o=e)||o.prototype&&o.prototype.isReactComponent||!t?[e]:Ul(e(t),t,r,n):e instanceof Il?r?(e.inject(r,n),[e.getName(n)]):[e]:ol(e)?Bl(e):Array.isArray(e)?Array.prototype.concat.apply(Ss,e.map(function(e){return Ul(e,t,r,n)})):[e.toString()];var o}function ql(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(el(r)&&!tl(r))return!1}return!0}var Hl=Ls(vs),Wl=function(){function e(e,t,r){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===r||r.isStatic)&&ql(e),this.componentId=t,this.baseHash=As(Hl,t),this.baseStyle=r,El.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,r){var n=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,r):"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))n=rl(n,this.staticRulesId);else{var o=nl(Ul(this.rules,e,t,r)),a=Ns(As(this.baseHash,o)>>>0);if(!t.hasNameForId(this.componentId,a)){var i=r(o,".".concat(a),void 0,this.componentId);t.insertRules(this.componentId,a,i)}n=rl(n,a),this.staticRulesId=a}else{for(var s=As(this.baseHash,r.hash),l="",c=0;c<this.rules.length;c++){var u=this.rules[c];if("string"==typeof u)l+=u;else if(u){var d=nl(Ul(u,e,t,r));s=As(s,d+c),l+=d}}if(l){var f=Ns(s>>>0);t.hasNameForId(this.componentId,f)||t.insertRules(this.componentId,f,r(l,".".concat(f),void 0,this.componentId)),n=rl(n,f)}}return n},e}(),Vl=n.createContext(void 0);Vl.Consumer;var Yl={};new Set;function Kl(e,t,r){var o=tl(e),a=e,i=!$s(e),s=t.attrs,l=void 0===s?Ss:s,c=t.componentId,u=void 0===c?function(e,t){var r="string"!=typeof e?"sc":Rs(e);Yl[r]=(Yl[r]||0)+1;var n="".concat(r,"-").concat(Ds(vs+r+Yl[r]));return t?"".concat(t,"-").concat(n):n}(t.displayName,t.parentComponentId):c,d=t.displayName,f=void 0===d?function(e){return $s(e)?"styled.".concat(e):"Styled(".concat(Is(e),")")}(e):d,p=t.displayName&&t.componentId?"".concat(Rs(t.displayName),"-").concat(t.componentId):t.componentId||u,h=o&&a.attrs?a.attrs.concat(l).filter(Boolean):l,m=t.shouldForwardProp;if(o&&a.shouldForwardProp){var g=a.shouldForwardProp;if(t.shouldForwardProp){var y=t.shouldForwardProp;m=function(e,t){return g(e,t)&&y(e,t)}}else m=g}var b=new Wl(r,p,o?a.componentStyle:void 0);function v(e,t){return function(e,t,r){var o=e.attrs,a=e.componentStyle,i=e.defaultProps,s=e.foldedComponentIds,l=e.styledComponentId,c=e.target,u=n.useContext(Vl),d=Ll(),f=e.shouldForwardProp||d.shouldForwardProp,p=_s(t,u,i)||js,h=function(e,t,r){for(var n,o=pi(pi({},t),{className:void 0,theme:r}),a=0;a<e.length;a+=1){var i=el(n=e[a])?n(o):n;for(var s in i)o[s]="className"===s?rl(o[s],i[s]):"style"===s?pi(pi({},o[s]),i[s]):i[s]}return t.className&&(o.className=rl(o.className,t.className)),o}(o,t,p),m=h.as||c,g={};for(var y in h)void 0===h[y]||"$"===y[0]||"as"===y||"theme"===y&&h.theme===p||("forwardedAs"===y?g.as=h.forwardedAs:f&&!f(y,m)||(g[y]=h[y]));var b=function(e,t){var r=Ll();return e.generateAndInjectStyles(t,r.styleSheet,r.stylis)}(a,h),v=rl(s,l);return b&&(v+=" "+b),h.className&&(v+=" "+h.className),g[$s(m)&&!Es.has(m)?"class":"className"]=v,r&&(g.ref=r),(0,n.createElement)(m,g)}(x,e,t)}v.displayName=f;var x=n.forwardRef(v);return x.attrs=h,x.componentStyle=b,x.displayName=f,x.shouldForwardProp=m,x.foldedComponentIds=o?rl(a.foldedComponentIds,a.styledComponentId):"",x.styledComponentId=p,x.target=o?a.target:e,Object.defineProperty(x,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=o?function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];for(var n=0,o=t;n<o.length;n++)al(e,o[n],!0);return e}({},a.defaultProps,e):e}}),il(x,function(){return".".concat(x.styledComponentId)}),i&&Zs(x,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),x}function Ql(e,t){for(var r=[e[0]],n=0,o=t.length;n<o;n+=1)r.push(t[n],e[n+1]);return r}var Xl=function(e){return Object.assign(e,{isCss:!0})};function Gl(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(el(e)||ol(e))return Xl(Ul(Ql(Ss,hi([e],t,!0))));var n=e;return 0===t.length&&1===n.length&&"string"==typeof n[0]?Ul(n):Xl(Ul(Ql(n,t)))}function Jl(e,t,r){if(void 0===r&&(r=js),!t)throw sl(1,t);var n=function(n){for(var o=[],a=1;a<arguments.length;a++)o[a-1]=arguments[a];return e(t,r,Gl.apply(void 0,hi([n],o,!1)))};return n.attrs=function(n){return Jl(e,t,pi(pi({},r),{attrs:Array.prototype.concat(r.attrs,n).filter(Boolean)}))},n.withConfig=function(n){return Jl(e,t,pi(pi({},r),n))},n}var Zl=function(e){return Jl(Kl,e)},ec=Zl;Es.forEach(function(e){ec[e]=Zl(e)});!function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=ql(e),El.registerId(this.componentId+1)}e.prototype.createStyles=function(e,t,r,n){var o=n(nl(Ul(this.rules,t,r,n)),""),a=this.componentId+e;r.insertRules(a,a,o)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,r,n){e>2&&El.registerId(this.componentId+e),this.removeStyles(e,r),this.createStyles(e,t,r,n)}}();function tc(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=nl(Gl.apply(void 0,hi([e],t,!1))),o=Ds(n);return new Il(o,n)}(function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var r=vl(),n=nl([r&&'nonce="'.concat(r,'"'),"".concat(gs,'="true"'),"".concat(bs,'="').concat(vs,'"')].filter(Boolean)," ");return"<style ".concat(n,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw sl(2);return e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)throw sl(2);var r=e.instance.toString();if(!r)return[];var o=((t={})[gs]="",t[bs]=vs,t.dangerouslySetInnerHTML={__html:r},t),a=vl();return a&&(o.nonce=a),[n.createElement("style",pi({},o,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new El({isServer:!0}),this.sealed=!1}e.prototype.collectStyles=function(e){if(this.sealed)throw sl(2);return n.createElement(Dl,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw sl(3)}})(),"__sc-".concat(gs,"__");const rc=tc`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`,nc=(tc`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`,ec.nav`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(241, 245, 249, 0.8);
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
  
  @supports not (backdrop-filter: blur(12px)) {
    background: white;
  }
`),oc=ec.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 1rem;
    height: 64px;
  }
`,ac=ec(st)`
  display: flex;
  align-items: center;
  text-decoration: none;
  position: relative;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: scale(1.05);
  }

  img {
    height: 120px;
    width: auto;
  }
`,ic=ec.div`
  position: absolute;
  left: 98px;
  top: 50%;
  transform: translateY(-40%);
  font-size: 2.2rem;
  font-weight: 800;
  color: #0f172a;
  white-space: nowrap;
  
  span {
    color: #0fc179;
  }
  
  @media (max-width: 640px) {
    font-size: 1.8rem;
    left: 110px;
  }
`,sc=ec.div`
  display: none;
  align-items: center;
  gap: 2rem;

  @media (min-width: 1024px) {
    display: flex;
  }
`,lc=ec(st)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${e=>e.$active?"#059669":"#334155"};
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.6rem 1rem;
  border-radius: 8px;
  background: ${e=>e.$active?"rgba(15, 193, 121, 0.12)":"transparent"};
  position: relative;

  &:hover {
    color: #059669;
    background: ${e=>e.$active?"rgba(15, 193, 121, 0.12)":"rgba(15, 193, 121, 0.05)"};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: scale(0.98);
  }
`,cc=(ec.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`,ec.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.4rem 0.5rem 0.4rem 0.4rem;
  border-radius: 9999px;
  cursor: pointer;
  color: #334155;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: #0fc179;
    color: #0fc179;
    background: #f0fdf4;
    box-shadow: 0 4px 6px -1px rgba(15, 193, 121, 0.1);
    transform: translateY(-1px);
  }

  svg.chevron {
    color: #94a3b8;
    transition: transform 0.3s ease;
    transform: ${e=>e.$isOpen?"rotate(180deg)":"rotate(0)"};
  }
`),uc=ec.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 240px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  overflow: hidden;
  padding: 0.5rem;
  z-index: 100;
  animation: ${rc} 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top right;
`,dc=ec(st)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #334155;
  text-decoration: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    color: #0fc179;
    transform: translateX(4px);
  }

  svg {
    color: #94a3b8;
    transition: color 0.2s ease;
  }
  
  &:hover svg {
    color: #0fc179;
  }
`,fc=ec.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #ef4444;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.25rem;
  border-top: 1px solid #f1f5f9;
  padding-top: 1rem;

  &:hover {
    background: #fef2f2;
    transform: translateX(4px);
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(2px);
  }
`,pc=ec.button`
  display: none;
  color: #64748b;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: #0fc179;
    transform: scale(1.1);
  }

  @media (max-width: 1024px) {
    display: block;
  }
`,hc=ec.div`
  display: none;
  background: white;
  padding: 1.5rem;
  border-top: 1px solid #f1f5f9;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  animation: ${rc} 0.3s ease-out;

  @media (max-width: 1024px) {
    display: ${e=>e.$isOpen?"block":"none"};
  }
`,mc=ec(st)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  text-decoration: none;
  color: ${e=>e.$active?"#0fc179":"#334155"};
  background: ${e=>e.$active?"#f0fdf4":"transparent"};
  border-radius: 12px;
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    color: #0fc179;
    transform: translateX(4px);
  }
`,gc=ec(st)`
  background: #0fc179;
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(15, 193, 121, 0.3), 0 2px 4px -1px rgba(15, 193, 121, 0.15);

  &:hover {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(15, 193, 121, 0.4), 0 4px 6px -2px rgba(15, 193, 121, 0.2);
    color: white;
  }
`,yc=ec(st)`
  color: #64748b;
  padding: 0.6rem 1.5rem;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  border-radius: 12px;

  &:hover {
    color: #0f172a;
    background: #f8fafc;
  }
`,bc=()=>{const[e,t]=(0,n.useState)(!1),[r,o]=(0,n.useState)(!1),{user:a,logout:i}=jo(),s=ne(),l=ee(),c=(0,n.useRef)(null),u=(0,n.useRef)(null);(0,n.useEffect)(()=>{const e=e=>{c.current&&!c.current.contains(e.target)&&o(!1),u.current&&!u.current.contains(e.target)&&t(!1)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,n.useEffect)(()=>{t(!1),o(!1)},[l.pathname]);const d=e=>l.pathname===e,f=()=>{i(),s("/"),o(!1)};return(0,ko.jsxs)(nc,{children:[(0,ko.jsxs)(oc,{children:[(0,ko.jsxs)(ac,{to:a?"/dashboard":"/",children:[(0,ko.jsx)("img",{src:"/dataleaf-logo.png",alt:"DataLeaf"}),(0,ko.jsxs)(ic,{children:["Data",(0,ko.jsx)("span",{children:"Leaf"})]})]}),(0,ko.jsx)(sc,{children:a?(0,ko.jsxs)(ko.Fragment,{children:[(0,ko.jsxs)(lc,{to:"/dashboard",$active:d("/dashboard"),children:[(0,ko.jsx)(oi,{size:18}),"Dashboard"]}),(0,ko.jsxs)(lc,{to:"/surveys",$active:d("/surveys"),children:[(0,ko.jsx)(ai,{size:18}),"Surveys"]}),(0,ko.jsxs)(lc,{to:"/rewards",$active:d("/rewards"),children:[(0,ko.jsx)(ii,{size:18}),"Rewards"]})]}):null}),(0,ko.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"1rem"},children:[a?(0,ko.jsxs)("div",{style:{position:"relative"},ref:c,children:[(0,ko.jsxs)(cc,{onClick:()=>o(!r),$isOpen:r,children:[(0,ko.jsx)("div",{style:{width:32,height:32,borderRadius:"50%",background:"#e2e8f0",display:"flex",alignItems:"center",justifyContent:"center",color:"#64748b"},children:(0,ko.jsx)(si,{size:18})}),(0,ko.jsx)("span",{className:"hidden sm:block",children:a.firstName}),(0,ko.jsx)(li,{size:14,className:"chevron"})]}),r&&(0,ko.jsxs)(uc,{children:[(0,ko.jsxs)(dc,{to:"/profile",children:[(0,ko.jsx)(si,{size:18}),"Profile"]}),(0,ko.jsxs)(dc,{to:"/payment-history",children:[(0,ko.jsx)(ci,{size:18}),"History"]}),(0,ko.jsxs)(fc,{onClick:f,children:[(0,ko.jsx)(ui,{size:18}),"Logout"]})]})]}):(0,ko.jsxs)("div",{className:"hidden lg:flex items-center gap-2",children:[(0,ko.jsx)(yc,{to:"/login",children:"Login"}),(0,ko.jsx)(gc,{to:"/register",children:"Sign Up"})]}),(0,ko.jsx)(pc,{onClick:()=>t(!e),children:e?(0,ko.jsx)(di,{size:24}):(0,ko.jsx)(fi,{size:24})})]})]}),(0,ko.jsx)(hc,{$isOpen:e,ref:u,children:a?(0,ko.jsxs)(ko.Fragment,{children:[(0,ko.jsxs)(mc,{to:"/dashboard",$active:d("/dashboard"),children:[(0,ko.jsx)(oi,{size:20}),"Dashboard"]}),(0,ko.jsxs)(mc,{to:"/surveys",$active:d("/surveys"),children:[(0,ko.jsx)(ai,{size:20}),"Surveys"]}),(0,ko.jsxs)(mc,{to:"/rewards",$active:d("/rewards"),children:[(0,ko.jsx)(ii,{size:20}),"Rewards"]}),(0,ko.jsx)("hr",{style:{margin:"0.5rem 0",border:"none",borderTop:"1px solid #f1f5f9"}}),(0,ko.jsxs)(mc,{to:"/profile",children:[(0,ko.jsx)(si,{size:20}),"Profile"]}),(0,ko.jsxs)(mc,{to:"/payment-history",children:[(0,ko.jsx)(ci,{size:20}),"History"]}),(0,ko.jsxs)("button",{onClick:f,style:{display:"flex",alignItems:"center",gap:"0.75rem",padding:"1rem",width:"100%",background:"#fef2f2",color:"#ef4444",border:"none",borderRadius:"8px",fontWeight:500,fontSize:"1rem",cursor:"pointer",marginTop:"0.5rem"},children:[(0,ko.jsx)(ui,{size:20}),"Logout"]})]}):(0,ko.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem"},children:[(0,ko.jsx)(mc,{to:"/login",style:{justifyContent:"center"},children:"Login"}),(0,ko.jsx)(gc,{to:"/register",style:{textAlign:"center",justifyContent:"center"},children:"Sign Up"})]})})]})},vc=ni("linkedin",[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]]),xc=ni("twitter",[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",key:"pff0z6"}]]),wc=ni("mail",[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]]),kc=ec.footer`
  background: #0d3d3d;
  color: #e2e8f0;
  padding: 3rem 0 2rem;
  margin-top: auto;
  font-family: 'Inter', sans-serif;
`,Sc=ec.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`,jc=ec.div`
  display: flex;
  flex-direction: column;

  h2 {
    color: white;
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 0.5rem 0;
    position: relative;
    padding-bottom: 0.5rem;
    display: inline-block;
    width: fit-content;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 40px;
      height: 3px;
      background: #0fc179;
      border-radius: 2px;
    }
    
    span {
      color: #0fc179;
    }
  }

  h3 {
    color: white;
    margin: 0 0 1rem;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
    color: #cbd5e1;
  }
`,_c=ec.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 0.75rem;
    
    a {
      color: #cbd5e1;
      text-decoration: none;
      transition: all 0.2s ease;
      font-size: 0.95rem;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      
      &:before {
        content: '•';
        color: #0fc179;
        margin-right: 0.5rem;
      }
      
      &:hover {
        color: #0fc179;
        transform: translateX(5px);
      }
    }
  }
`,Ec=ec.div`
  display: flex;
  gap: 1rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.08);
    color: #cbd5e1;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
      background: #0fc179;
      color: #0d3d3d;
      border-color: #0fc179;
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(15, 193, 121, 0.3);
    }
  }
`,Cc=ec.div`
  max-width: 1200px;
  margin: 2.5rem auto 0;
  padding: 1.5rem 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  
  p {
    margin: 0;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
  }
`,Tc=()=>(0,ko.jsxs)(kc,{children:[(0,ko.jsxs)(Sc,{children:[(0,ko.jsxs)(jc,{children:[(0,ko.jsxs)("h2",{children:["Data",(0,ko.jsx)("span",{children:"Leaf"})]}),(0,ko.jsx)("p",{children:"Premium market research rooted in empathy and evidence. We help you make decisions that matter."}),(0,ko.jsxs)(Ec,{children:[(0,ko.jsx)("a",{href:"https://linkedin.com",target:"_blank",rel:"noopener noreferrer","aria-label":"LinkedIn",children:(0,ko.jsx)(vc,{size:20})}),(0,ko.jsx)("a",{href:"https://twitter.com",target:"_blank",rel:"noopener noreferrer","aria-label":"Twitter",children:(0,ko.jsx)(xc,{size:20})}),(0,ko.jsx)("a",{href:"mailto:info@dataleafinsights.com","aria-label":"Email",children:(0,ko.jsx)(wc,{size:20})})]})]}),(0,ko.jsxs)(jc,{children:[(0,ko.jsx)("h3",{children:"Company"}),(0,ko.jsxs)(_c,{children:[(0,ko.jsx)("li",{children:(0,ko.jsx)(st,{to:"/dashboard",children:"About Us"})}),(0,ko.jsx)("li",{children:(0,ko.jsx)(st,{to:"/dashboard",children:"Contact"})}),(0,ko.jsx)("li",{children:(0,ko.jsx)(st,{to:"/dashboard",children:"Careers"})})]}),(0,ko.jsxs)("div",{style:{marginTop:"1.5rem"},children:[(0,ko.jsx)("h3",{style:{fontSize:"0.9rem",marginBottom:"0.5rem",color:"white"},children:"Email Us"}),(0,ko.jsx)("a",{href:"mailto:info@dataleafinsights.com",style:{color:"#0fc179",textDecoration:"none",fontSize:"0.95rem"},children:"info@dataleafinsights.com"})]})]})]}),(0,ko.jsx)(Cc,{children:(0,ko.jsxs)("p",{children:["\xa9 ",(new Date).getFullYear()," DataLeaf. All rights reserved."]})})]}),Rc=e=>{let{message:t="Loading..."}=e;return(0,ko.jsx)("div",{className:"min-h-screen flex items-center justify-center bg-gray-50",children:(0,ko.jsxs)("div",{className:"text-center",children:[(0,ko.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"}),(0,ko.jsx)("p",{className:"text-gray-600",children:t})]})})};var Pc={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},zc=n.createContext&&n.createContext(Pc),Nc=["attr","size","title"];function Oc(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function Ac(){return Ac=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Ac.apply(this,arguments)}function Lc(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function Dc(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Lc(Object(r),!0).forEach(function(t){Ic(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Lc(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function Ic(e,t,r){return t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function $c(e){return e&&e.map((e,t)=>n.createElement(e.tag,Dc({key:t},e.attr),$c(e.child)))}function Fc(e){return t=>n.createElement(Mc,Ac({attr:Dc({},e.attr)},t),$c(e.child))}function Mc(e){var t=t=>{var r,{attr:o,size:a,title:i}=e,s=Oc(e,Nc),l=a||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",Ac({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,o,s,{className:r,style:Dc(Dc({color:e.color||t.color},t.style),e.style),height:l,width:l,xmlns:"http://www.w3.org/2000/svg"}),i&&n.createElement("title",null,i),e.children)};return void 0!==zc?n.createElement(zc.Consumer,null,e=>t(e)):t(Pc)}function Bc(e){return Fc({tag:"svg",attr:{viewBox:"0 0 488 512"},child:[{tag:"path",attr:{d:"M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"},child:[]}]})(e)}function Uc(e){return Fc({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"},child:[]}]})(e)}function qc(e){return Fc({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"},child:[]}]})(e)}function Hc(e){return Fc({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"},child:[]}]})(e)}function Wc(e){return Fc({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"},child:[]}]})(e)}function Vc(e){return Fc({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"},child:[]}]})(e)}function Yc(e){return Fc({tag:"svg",attr:{viewBox:"0 0 384 512"},child:[{tag:"path",attr:{d:"M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"},child:[]}]})(e)}function Kc(e){return Fc({tag:"svg",attr:{viewBox:"0 0 288 512"},child:[{tag:"path",attr:{d:"M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"},child:[]}]})(e)}function Qc(e){return Fc({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"},child:[]}]})(e)}function Xc(e){return Fc({tag:"svg",attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"},child:[]}]})(e)}function Gc(e){return Fc({tag:"svg",attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"},child:[]}]})(e)}function Jc(e){return Fc({tag:"svg",attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"},child:[]}]})(e)}function Zc(e){return Fc({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"},child:[]}]})(e)}function eu(e){return Fc({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"},child:[]}]})(e)}function tu(e){return Fc({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z"},child:[]}]})(e)}function ru(e){return Fc({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"},child:[]}]})(e)}function nu(e){return Fc({tag:"svg",attr:{viewBox:"0 0 352 512"},child:[{tag:"path",attr:{d:"M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"},child:[]}]})(e)}function ou(e){return Fc({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"},child:[]}]})(e)}function au(e){return Fc({tag:"svg",attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"},child:[]}]})(e)}const iu=ec.div`
  min-height: calc(100vh - 200px);
`,su=ec.section`
  background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="white" opacity="0.1"/></svg>') repeat;
    background-size: 40px 40px;
  }
`,lu=ec.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
`,cu=ec.h1`
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`,uu=ec.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
  font-family: 'Inter', sans-serif;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`,du=ec.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`,fu=ec(st)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  margin: 0 0.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  font-family: 'Inter', sans-serif;
  
  ${e=>e.$primary?"\n    background: white;\n    color: #0fc179;\n    border-color: white;\n    \n    &:hover {\n      background: #f8fafc;\n      color: #0fc179;\n      border-color: #f8fafc;\n      transform: translateY(-2px);\n      box-shadow: 0 10px 25px rgba(0,0,0,0.2);\n    }\n  ":"\n    background: transparent;\n    color: white;\n    border-color: white;\n    \n    &:hover {\n      background: white;\n      color: #0fc179;\n      transform: translateY(-2px);\n      box-shadow: 0 10px 25px rgba(0,0,0,0.2);\n    }\n  "}
`,pu=ec.section`
  padding: 3.5rem 0;
  background: #f8fafc;
`,hu=ec.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
`,mu=ec.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
`,gu=ec.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`,yu=ec.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 3px 12px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  border: 1px solid #e2e8f0;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(15, 193, 121, 0.15);
    border-color: #0fc179;
  }
`,bu=ec.div`
  font-size: 2.5rem;
  color: #0fc179;
  margin-bottom: 1rem;
`,vu=ec.h3`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: #2c3e50;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
`,xu=ec.p`
  color: #7f8c8d;
  line-height: 1.5;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
`,wu=ec.section`
  background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;
`,ku=ec.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  text-align: center;
`,Su=ec.div`
  h3 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: white;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
  }
  
  p {
    font-size: 1rem;
    opacity: 0.9;
    font-family: 'Inter', sans-serif;
  }
`,ju=()=>{const{user:e}=jo();return(0,ko.jsxs)(iu,{children:[(0,ko.jsx)(su,{children:(0,ko.jsxs)(lu,{children:[(0,ko.jsx)(cu,{children:"Share Your Opinion, Earn Rewards"}),(0,ko.jsx)(uu,{children:"Join thousands of members worldwide and get paid for your valuable opinions. Complete surveys, earn points, and redeem amazing rewards."}),(0,ko.jsx)(du,{children:e?(0,ko.jsxs)(ko.Fragment,{children:[(0,ko.jsx)(fu,{to:"/dashboard",$primary:!0,children:"Go to Dashboard"}),(0,ko.jsx)(fu,{to:"/surveys",children:"Browse Surveys"})]}):(0,ko.jsxs)(ko.Fragment,{children:[(0,ko.jsx)(fu,{to:"/register",$primary:!0,children:"Join Now - It's Free!"}),(0,ko.jsx)(fu,{to:"/login",children:"Already a Member?"})]})})]})}),(0,ko.jsx)(pu,{children:(0,ko.jsxs)(hu,{children:[(0,ko.jsx)(mu,{children:"Why Choose DataLeaf?"}),(0,ko.jsxs)(gu,{children:[(0,ko.jsxs)(yu,{children:[(0,ko.jsx)(bu,{children:(0,ko.jsx)(Yc,{})}),(0,ko.jsx)(vu,{children:"Easy Surveys"}),(0,ko.jsx)(xu,{children:"Complete simple surveys on topics you care about. Each survey takes just 5-15 minutes of your time."})]}),(0,ko.jsxs)(yu,{children:[(0,ko.jsx)(bu,{children:(0,ko.jsx)(Kc,{})}),(0,ko.jsx)(vu,{children:"Earn Real Money"}),(0,ko.jsx)(xu,{children:"Get paid for every completed survey. Earn points that can be redeemed for cash, gift cards, and more."})]}),(0,ko.jsxs)(yu,{children:[(0,ko.jsx)(bu,{children:(0,ko.jsx)(Zc,{})}),(0,ko.jsx)(vu,{children:"Amazing Rewards"}),(0,ko.jsx)(xu,{children:"Choose from hundreds of rewards including PayPal cash, Amazon gift cards, and exclusive merchandise."})]}),(0,ko.jsxs)(yu,{children:[(0,ko.jsx)(bu,{children:(0,ko.jsx)(au,{})}),(0,ko.jsx)(vu,{children:"Global Community"}),(0,ko.jsx)(xu,{children:"Join a worldwide community of opinion leaders and help shape the future of products and services."})]}),(0,ko.jsxs)(yu,{children:[(0,ko.jsx)(bu,{children:(0,ko.jsx)(Hc,{})}),(0,ko.jsx)(vu,{children:"Track Progress"}),(0,ko.jsx)(xu,{children:"Monitor your earnings, survey completion rate, and rewards history with our comprehensive dashboard."})]}),(0,ko.jsxs)(yu,{children:[(0,ko.jsx)(bu,{children:(0,ko.jsx)(ru,{})}),(0,ko.jsx)(vu,{children:"Secure & Private"}),(0,ko.jsx)(xu,{children:"Your data is protected with industry-standard security. We never share your personal information."})]})]})]})}),(0,ko.jsx)(wu,{children:(0,ko.jsxs)(hu,{children:[(0,ko.jsx)(mu,{style:{color:"white"},children:"Our Impact"}),(0,ko.jsxs)(ku,{children:[(0,ko.jsxs)(Su,{children:[(0,ko.jsx)("h3",{children:"50K+"}),(0,ko.jsx)("p",{children:"Active Members"})]}),(0,ko.jsxs)(Su,{children:[(0,ko.jsx)("h3",{children:"1M+"}),(0,ko.jsx)("p",{children:"Surveys Completed"})]}),(0,ko.jsxs)(Su,{children:[(0,ko.jsx)("h3",{children:"$2M+"}),(0,ko.jsx)("p",{children:"Rewards Distributed"})]}),(0,ko.jsxs)(Su,{children:[(0,ko.jsx)("h3",{children:"150+"}),(0,ko.jsx)("p",{children:"Countries Served"})]})]})]})})]})},_u=ni("lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]),Eu=ni("eye-off",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]),Cu=ni("eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),Tu=ni("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]),Ru=tc`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`,Pu=ec.div`
  min-height: 100vh;
  display: flex;
  background: white;
  overflow: hidden;

  @media (max-width: 968px) {
    flex-direction: column;
  }
`,zu=ec.div`
  flex: 1;
  background: linear-gradient(135deg, #022c22 0%, #064e3b 100%);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  color: white;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(15, 193, 121, 0.15) 0%, transparent 70%);
    top: -100px;
    right: -100px;
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(15, 193, 121, 0.1) 0%, transparent 70%);
    bottom: -50px;
    left: -100px;
    border-radius: 50%;
  }

  @media (max-width: 968px) {
    display: none;
  }
`,Nu=ec.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem;
  border-radius: 24px;
  max-width: 480px;
  width: 100%;
  z-index: 10;
  animation: ${Ru} 0.8s ease-out;
`,Ou=ec.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #a7f3d0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
`,Au=ec.p`
  font-size: 1.125rem;
  line-height: 1.6;
  color: #d1fae5;
  margin-bottom: 2rem;
  font-weight: 400;
`,Lu=ec.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`,Du=ec.span`
  background: rgba(15, 193, 121, 0.1);
  border: 1px solid rgba(15, 193, 121, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: 0.875rem;
  color: #34d399;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,Iu=ec.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #ffffff;
  position: relative;
`,$u=ec.div`
  width: 100%;
  max-width: 440px;
  animation: ${Ru} 0.6s ease-out;
`,Fu=ec.div`
  display: none;
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 968px) {
    display: block;
  }

  h2 {
    color: #064e3b;
    font-size: 2rem;
    font-weight: 700;
  }
`,Mu=ec.div`
  margin-bottom: 2.5rem;

  h2 {
    font-size: 2rem;
    color: #111827;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  p {
    color: #6b7280;
    font-size: 1rem;
    
    a {
      color: #0fc179;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s;
      
      &:hover {
        color: #059669;
      }
    }
  }
`,Bu=ec.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,Uu=ec.div`
  position: relative;
`,qu=ec.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`,Hu=ec.div`
  position: relative;
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    transition: color 0.2s;
    width: 20px;
    height: 20px;
  }

  &:focus-within svg {
    color: #0fc179;
  }
`,Wu=ec.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #f9fafb;
  color: #1f2937;

  &:focus {
    outline: none;
    border-color: #0fc179;
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(15, 193, 121, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`,Vu=ec.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  &:hover {
    color: #4b5563;
  }
`,Yu=ec(st)`
  text-align: right;
  color: #0fc179;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  
  &:hover {
    color: #059669;
    text-decoration: underline;
  }
`,Ku=ec.button`
  background: linear-gradient(135deg, #0fc179 0%, #059669 100%);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 0 10px 20px rgba(15, 193, 121, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 25px rgba(15, 193, 121, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  svg.spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`,Qu=ec.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;
  color: #9ca3af;
  font-size: 0.875rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e5e7eb;
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`,Xu=ec.button`
  width: 100%;
  background: white;
  border: 1.5px solid #e5e7eb;
  color: #374151;
  padding: 0.875rem;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }
`,Gu=ec.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin: 2rem 0;
`,Ju=ec.input`
  width: 50px;
  height: 60px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 700;
  color: #111827;
  transition: all 0.2s;
  background: #f9fafb;

  &:focus {
    outline: none;
    border-color: #0fc179;
    background: white;
    box-shadow: 0 0 0 4px rgba(15, 193, 121, 0.1);
    transform: translateY(-2px);
  }
`,Zu=()=>{const[e,t]=(0,n.useState)({email:"",password:""}),[r,o]=(0,n.useState)(!1),[a,i]=(0,n.useState)(!1),[s,l]=(0,n.useState)(""),[c,u]=(0,n.useState)(!1),[d,f]=(0,n.useState)(!1),[p,h]=(0,n.useState)(""),{login:m}=jo(),g=ne(),y=r=>{t({...e,[r.target.name]:r.target.value}),l("")};return(0,ko.jsxs)(Pu,{children:[(0,ko.jsx)(zu,{children:(0,ko.jsxs)(Nu,{children:[(0,ko.jsx)(Ou,{children:"DataLeaf"}),(0,ko.jsx)(Au,{children:"Unlock the power of your opinions. Join our global community of insights and start earning rewards today."}),(0,ko.jsxs)(Lu,{children:[(0,ko.jsx)(Du,{children:"Global Surveys"}),(0,ko.jsx)(Du,{children:"Instant Rewards"}),(0,ko.jsx)(Du,{children:"Secure Data"})]})]})}),(0,ko.jsx)(Iu,{children:(0,ko.jsxs)($u,{children:[(0,ko.jsx)(Fu,{children:(0,ko.jsx)("h2",{children:"DataLeaf"})}),c||d?(0,ko.jsxs)(Bu,{onSubmit:async t=>{t.preventDefault(),i(!0);try{const t=await wo.post("/auth/verify-login",{email:e.email,otp:p});t.data.success&&(localStorage.setItem("token",t.data.token),localStorage.setItem("user",JSON.stringify(t.data.user)),window.location.href="/dashboard")}catch(s){l("Invalid verification code")}i(!1)},children:[(0,ko.jsxs)(Mu,{children:[(0,ko.jsx)("h2",{children:"Verification"}),(0,ko.jsxs)("p",{children:["Enter the 6-digit code sent to ",(0,ko.jsx)("strong",{children:e.email})]})]}),(0,ko.jsx)(Gu,{children:(0,ko.jsx)(Ju,{type:"text",maxLength:6,value:p,placeholder:"------",onChange:e=>h(e.target.value.replace(/\D/g,"").slice(0,6)),autoFocus:!0})}),s&&(0,ko.jsx)("div",{style:{color:"#ef4444",textAlign:"center",marginBottom:"1rem"},children:s}),(0,ko.jsx)(Ku,{type:"submit",disabled:a||6!==p.length,children:a?"Verifying...":"Verify Login"}),(0,ko.jsx)("div",{style:{textAlign:"center",marginTop:"1.5rem"},children:(0,ko.jsx)("button",{type:"button",onClick:()=>{u(!1),f(!1)},style:{background:"none",border:"none",color:"#6b7280",cursor:"pointer",fontWeight:500},children:"Back to Login"})})]}):(0,ko.jsxs)(ko.Fragment,{children:[(0,ko.jsxs)(Mu,{children:[(0,ko.jsx)("h2",{children:"Welcome back"}),(0,ko.jsxs)("p",{children:["New to DataLeaf? ",(0,ko.jsx)(st,{to:"/register",children:"Create an account"})]})]}),(0,ko.jsxs)(Bu,{onSubmit:async t=>{t.preventDefault(),i(!0),l("");try{const t=await m(e.email,e.password);t.success?g("/dashboard"):l(t.message||"Invalid credentials")}catch(s){l("Connection failed. Please try again.")}i(!1)},children:[(0,ko.jsxs)(Uu,{children:[(0,ko.jsx)(qu,{children:"Email Address"}),(0,ko.jsxs)(Hu,{children:[(0,ko.jsx)(wc,{}),(0,ko.jsx)(Wu,{type:"email",name:"email",placeholder:"name@company.com",value:e.email,onChange:y,required:!0})]})]}),(0,ko.jsxs)(Uu,{children:[(0,ko.jsx)(qu,{children:"Password"}),(0,ko.jsxs)(Hu,{children:[(0,ko.jsx)(_u,{}),(0,ko.jsx)(Wu,{type:r?"text":"password",name:"password",placeholder:"Enter your password",value:e.password,onChange:y,required:!0}),(0,ko.jsx)(Vu,{type:"button",onClick:()=>o(!r),children:r?(0,ko.jsx)(Eu,{size:20}):(0,ko.jsx)(Cu,{size:20})})]})]}),(0,ko.jsx)(Yu,{to:"/forgot-password",children:"Forgot password?"}),s&&(0,ko.jsx)("div",{style:{color:"#ef4444",fontSize:"0.875rem",marginTop:"-0.5rem"},children:s}),(0,ko.jsx)(Ku,{type:"submit",disabled:a,children:a?(0,ko.jsxs)(ko.Fragment,{children:[(0,ko.jsx)(Tu,{className:"spinner",size:20}),"Signing in..."]}):(0,ko.jsxs)(ko.Fragment,{children:["Sign In",(0,ko.jsx)(qc,{})]})})]}),(0,ko.jsx)(Qu,{children:"Or continue with"}),(0,ko.jsxs)(Xu,{onClick:()=>{window.location.href="https://dataleaf-server-production.up.railway.app/auth/google"},children:[(0,ko.jsx)(Bc,{style:{color:"#DB4437"}}),"Sign in with Google"]})]})]})})]})},ed=ec.div`
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 1.5rem 0.8rem; // Reduced from 2rem 1rem
`,td=ec.div`
  background: white;
  padding: 1.5rem; // Reduced from 2rem
  border-radius: 12px; // Reduced from 15px
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08); // Reduced shadow
  width: 100%;
  max-width: 400px; // Reduced from 450px
`,rd=ec.div`
  text-align: center;
  margin-bottom: 1.2rem; // Reduced from 1.5rem
  
  h1 {
    color: #2c3e50;
    margin-bottom: 0.4rem; // Reduced from 0.5rem
    font-size: 1.5rem; // Reduced from 1.75rem
  }
  
  p {
    color: #7f8c8d;
    margin: 0;
    font-size: 0.9rem; // Added smaller font size
  }
`,nd=ec.form`
  display: flex;
  flex-direction: column;
  gap: 1rem; // Reduced from 1.25rem
`,od=ec.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem; // Reduced from 1rem
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,ad=ec.div`
  position: relative;
`,id=ec.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
  z-index: 1;
`,sd=ec.input`
  width: 100%;
  padding: 0.75rem 0.875rem 0.75rem 2.75rem; // Reduced padding
  border: 2px solid #666666;
  border-radius: 6px; // Reduced from 8px
  font-size: 0.9rem; // Reduced from 1rem
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #0fc179;
  }
  
  &::placeholder {
    color: #bdc3c7;
  }
`,ld=ec.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #7f8c8d;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    color: #0fc179;
  }
`,cd=ec.div`
  display: flex;
  align-items: flex-start;
  gap: 0.4rem; // Reduced from 0.5rem
  
  input[type="checkbox"] {
    margin-top: 0.2rem; // Reduced from 0.25rem
  }
  
  label {
    font-size: 0.8rem; // Reduced from 0.9rem
    color: #7f8c8d;
    line-height: 1.3; // Reduced from 1.4
    
    a {
      color: #0fc179;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`,ud=ec.button`
  background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
  color: white;
  padding: 0.75rem; // Reduced from 0.875rem
  border: none;
  border-radius: 6px; // Reduced from 8px
  font-size: 0.9rem; // Reduced from 1rem
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px); // Reduced from -2px
    box-shadow: 0 4px 12px rgba(15, 193, 121, 0.25); // Reduced shadow
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,dd=ec.button`
  background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
  color: white;
  padding: 0.75rem; // Reduced from 1rem
  border: none;
  border-radius: 6px; // Reduced from 8px
  font-size: 0.9rem; // Reduced from 1rem
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  
  &:hover {
    transform: translateY(-1px); // Reduced from -2px
    box-shadow: 0 4px 12px rgba(15, 193, 121, 0.25); // Reduced shadow
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,fd=ec.div`
  display: flex;
  align-items: center;
  margin: 0.6rem 0; // Reduced from 0.75rem 0
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e0e0e0;
  }
  
  span {
    padding: 0 0.8rem; // Reduced from 1rem
    color: #7f8c8d;
    font-size: 0.8rem; // Reduced from 0.9rem
  }
`,pd=ec.div`
  text-align: center;
  margin-top: 0.8rem; // Reduced from 1rem
  color: #7f8c8d;
  font-size: 0.85rem; // Added smaller font size
  
  a {
    color: #0fc179;
    text-decoration: none;
    font-weight: bold;
    
    &:hover {
      text-decoration: underline;
    }
  }
`,hd=ec.div`
  background: #fee;
  color: #e74c3c;
  padding: 0.8rem; // Reduced from 1rem
  border-radius: 6px; // Reduced from 8px
  border: 1px solid #fcc;
  font-size: 0.8rem; // Reduced from 0.9rem
`,md=ec.div`
  background: #efe;
  color: #27ae60;
  padding: 0.8rem; // Reduced from 1rem
  border-radius: 6px; // Reduced from 8px
  border: 1px solid #cfc;
  font-size: 0.8rem; // Reduced from 0.9rem
`,gd=ec.div`
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  
  .requirement {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &.met {
      color: #27ae60;
    }
    
    &.unmet {
      color: #e74c3c;
    }
  }
`,yd=ec.div`
  margin-top: 0.5rem;
  
  .strength-bar {
    height: 4px;
    background: #e9ecef;
    border-radius: 2px;
    overflow: hidden;
    
    .strength-fill {
      height: 100%;
      transition: all 0.3s ease;
      
      &.weak {
        width: 25%;
        background: #e74c3c;
      }
      
      &.fair {
        width: 50%;
        background: #f39c12;
      }
      
      &.good {
        width: 75%;
        background: #f1c40f;
      }
      
      &.strong {
        width: 100%;
        background: #27ae60;
      }
    }
  }
  
  .strength-text {
    font-size: 0.75rem;
    margin-top: 0.25rem;
    font-weight: 500;
    
    &.weak { color: #e74c3c; }
    &.fair { color: #f39c12; }
    &.good { color: #f1c40f; }
    &.strong { color: #27ae60; }
  }
`,bd=ec.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &.match {
    color: #27ae60;
  }
  
  &.no-match {
    color: #e74c3c;
  }
`,vd=()=>{const[e,t]=(0,n.useState)({firstName:"",lastName:"",email:"",password:"",confirmPassword:"",agreeToTerms:!1}),[r,o]=(0,n.useState)(!1),[a,i]=(0,n.useState)(!1),[s,l]=(0,n.useState)(!1),[c,u]=(0,n.useState)(""),[d,f]=(0,n.useState)(""),{register:p,sendVerificationEmail:h}=jo(),m=ne(),g=e=>({length:e.length>=8,uppercase:/[A-Z]/.test(e),lowercase:/[a-z]/.test(e),number:/\d/.test(e),special:/[!@#$%^&*(),.?":{}|<>]/.test(e)}),y=e=>{const t=g(e),r=Object.values(t).filter(Boolean).length;return r<=2?"weak":3===r?"fair":4===r?"good":"strong"},b=r=>{const{name:n,value:o,type:a,checked:i}=r.target;t({...e,[n]:"checkbox"===a?i:o}),u(""),f("")},v=()=>e.firstName.trim()?e.lastName.trim()?e.email.trim()?(e=>{const t=g(e);return Object.values(t).every(Boolean)})(e.password)?e.password!==e.confirmPassword?(u("Passwords do not match"),!1):!!e.agreeToTerms||(u("You must agree to the terms and conditions"),!1):(u("Password must meet all security requirements"),!1):(u("Email is required"),!1):(u("Last name is required"),!1):(u("First name is required"),!1);return(0,ko.jsx)(ed,{children:(0,ko.jsxs)(td,{children:[(0,ko.jsxs)(rd,{children:[(0,ko.jsx)("h1",{children:"Join DataLeaf"}),(0,ko.jsx)("p",{children:"Create your account and start earning rewards"})]}),c&&(0,ko.jsx)(hd,{children:c}),d&&(0,ko.jsx)(md,{children:d}),(0,ko.jsxs)(nd,{onSubmit:async t=>{if(t.preventDefault(),v()){l(!0),u(""),f("");try{(await wo.post("/api/auth/register",{firstName:e.firstName,lastName:e.lastName,email:e.email,password:e.password})).data.success&&(localStorage.setItem("pendingRegistration",JSON.stringify({firstName:e.firstName,lastName:e.lastName,email:e.email,password:e.password})),f("Account created successfully! Please check your email for verification."),setTimeout(()=>{m("/verify-email",{state:{email:e.email,isRegistration:!0}})},2e3))}catch(c){var r,n;u((null===(r=c.response)||void 0===r||null===(n=r.data)||void 0===n?void 0:n.message)||"Registration failed. Please try again.")}finally{l(!1)}}},children:[(0,ko.jsxs)(od,{children:[(0,ko.jsxs)(ad,{children:[(0,ko.jsx)(id,{children:(0,ko.jsx)(ou,{})}),(0,ko.jsx)(sd,{type:"text",name:"firstName",placeholder:"First Name",value:e.firstName,onChange:b,required:!0})]}),(0,ko.jsxs)(ad,{children:[(0,ko.jsx)(id,{children:(0,ko.jsx)(ou,{})}),(0,ko.jsx)(sd,{type:"text",name:"lastName",placeholder:"Last Name",value:e.lastName,onChange:b,required:!0})]})]}),(0,ko.jsxs)(ad,{children:[(0,ko.jsx)(id,{children:(0,ko.jsx)(Qc,{})}),(0,ko.jsx)(sd,{type:"email",name:"email",placeholder:"Email Address",value:e.email,onChange:b,required:!0})]}),(0,ko.jsxs)(ad,{children:[(0,ko.jsx)(id,{children:(0,ko.jsx)(eu,{})}),(0,ko.jsx)(sd,{type:r?"text":"password",name:"password",placeholder:"Create a strong password",value:e.password,onChange:b,required:!0}),(0,ko.jsx)(ld,{type:"button",onClick:()=>o(!r),children:r?(0,ko.jsx)(Gc,{}):(0,ko.jsx)(Jc,{})})]}),e.password&&(0,ko.jsxs)(ko.Fragment,{children:[(0,ko.jsxs)(gd,{children:[(0,ko.jsxs)("div",{className:"requirement "+(g(e.password).length?"met":"unmet"),children:[g(e.password).length?(0,ko.jsx)(Vc,{}):(0,ko.jsx)(nu,{}),"At least 8 characters"]}),(0,ko.jsxs)("div",{className:"requirement "+(g(e.password).uppercase?"met":"unmet"),children:[g(e.password).uppercase?(0,ko.jsx)(Vc,{}):(0,ko.jsx)(nu,{}),"One uppercase letter"]}),(0,ko.jsxs)("div",{className:"requirement "+(g(e.password).lowercase?"met":"unmet"),children:[g(e.password).lowercase?(0,ko.jsx)(Vc,{}):(0,ko.jsx)(nu,{}),"One lowercase letter"]}),(0,ko.jsxs)("div",{className:"requirement "+(g(e.password).number?"met":"unmet"),children:[g(e.password).number?(0,ko.jsx)(Vc,{}):(0,ko.jsx)(nu,{}),"One number"]}),(0,ko.jsxs)("div",{className:"requirement "+(g(e.password).special?"met":"unmet"),children:[g(e.password).special?(0,ko.jsx)(Vc,{}):(0,ko.jsx)(nu,{}),"One special character (!@#$%^&*)"]})]}),(0,ko.jsxs)(yd,{children:[(0,ko.jsx)("div",{className:"strength-bar",children:(0,ko.jsx)("div",{className:`strength-fill ${y(e.password)}`})}),(0,ko.jsxs)("div",{className:`strength-text ${y(e.password)}`,children:["Password strength: ",y(e.password).charAt(0).toUpperCase()+y(e.password).slice(1)]})]})]}),(0,ko.jsxs)(ad,{children:[(0,ko.jsx)(id,{children:(0,ko.jsx)(eu,{})}),(0,ko.jsx)(sd,{type:a?"text":"password",name:"confirmPassword",placeholder:"Confirm Password",value:e.confirmPassword,onChange:b,required:!0}),(0,ko.jsx)(ld,{type:"button",onClick:()=>i(!a),children:a?(0,ko.jsx)(Gc,{}):(0,ko.jsx)(Jc,{})})]}),e.confirmPassword&&(0,ko.jsxs)(bd,{className:e.password===e.confirmPassword?"match":"no-match",children:[e.password===e.confirmPassword?(0,ko.jsx)(Vc,{}):(0,ko.jsx)(nu,{}),e.password===e.confirmPassword?"Passwords match":"Passwords do not match"]}),(0,ko.jsxs)(cd,{children:[(0,ko.jsx)("input",{type:"checkbox",id:"agreeToTerms",name:"agreeToTerms",checked:e.agreeToTerms,onChange:b,required:!0}),(0,ko.jsxs)("label",{htmlFor:"agreeToTerms",children:["I agree to the ",(0,ko.jsx)("a",{href:"#",children:"Terms of Service"})," and ",(0,ko.jsx)("a",{href:"#",children:"Privacy Policy"})]})]}),(0,ko.jsx)(ud,{type:"submit",disabled:s,children:s?"Creating Account...":"Create Account"})]}),(0,ko.jsx)(fd,{children:(0,ko.jsx)("span",{children:"or"})}),(0,ko.jsxs)(dd,{onClick:()=>{window.location.href="https://dataleaf-server-production.up.railway.app/auth/google"},children:[(0,ko.jsx)(Bc,{}),"Continue with Google"]}),(0,ko.jsxs)(pd,{children:["Already have an account? ",(0,ko.jsx)(st,{to:"/login",children:"Sign in here"})]})]})})},xd=ni("circle-play",[["path",{d:"M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z",key:"kmsa83"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]),wd=ni("trending-up",[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]]),kd=ni("wallet",[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]]),Sd=ni("award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]),jd=ni("arrow-up-right",[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]),_d=ni("credit-card",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]),Ed=ni("zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]),Cd=ni("clock",[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]),Td=ni("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),Rd=ni("target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]),Pd=ec.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  min-height: calc(100vh - 80px);

  @media (max-width: 1024px) {
    padding: 1rem;
  }
`,zd=ec.div`
  background: linear-gradient(135deg, #0fc179 0%, #059669 100%);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  color: white;
  margin-bottom: 1.25rem;
  box-shadow: 0 4px 15px -1px rgba(15, 193, 121, 0.3);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 100px;

  // Abstract shapes
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: 10%;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem;
  }
`,Nd=ec.div`
  position: relative;
  z-index: 1;

  h1 {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0;
    color: white;
    letter-spacing: -0.025em;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    margin: 0.25rem 0 0;
    color: rgba(255, 255, 255, 0.95);
    font-size: 0.9rem;
    font-weight: 500;
  }
`,Od=ec.div`
  display: flex;
  gap: 1rem;
`,Ad=tc`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`,Ld=tc`
  0% { box-shadow: 0 0 0 0 rgba(15, 193, 121, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(15, 193, 121, 0); }
  100% { box-shadow: 0 0 0 0 rgba(15, 193, 121, 0); }
`,Dd=ec.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,Id=ec.div`
  background: white;
  border-radius: 16px;
  padding: 1rem 1.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  animation: ${Ad} 0.6s ease-out backwards;
  animation-delay: ${e=>.1*e.index}s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-color: #0fc179;
  }

  /* Decorative sheen effect on hover */
  // ... (kept same but lighter)
`,$d=ec.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  z-index: 1;
`,Fd=ec.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${e=>e.bg||"#f0fdf4"};
  color: ${e=>e.color||"#0fc179"};
  font-size: 1.25rem;
  transition: transform 0.3s ease;
  box-shadow: inset 0 2px 4px 0 rgba(255, 255, 255, 0.6);

  ${Id}:hover & {
    transform: rotate(5deg) scale(1.1);
  }
`,Md=ec.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
`,Bd=ec.div`
  font-size: 1.75rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0px;
  letter-spacing: -0.03em;
  line-height: 1.1;
`,Ud=ec.div`
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: -0.01em;
`,qd=ec.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${e=>e.$pulse?"#ecfdf5":"#f1f5f9"};
  color: ${e=>e.$pulse?"#059669":"#475569"};
  border: 1px solid ${e=>e.$pulse?"#d1fae5":"transparent"};
  
  ${e=>e.$pulse&&Gl`
    animation: ${Ld} 2s infinite;
  `}
`,Hd=ec.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.5rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,Wd=ec.h2`
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 1.5rem 0 0.75rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:first-child {
    margin-top: 0;
  }

  svg {
    color: #0fc179;
  }
`,Vd=ec.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  overflow: hidden;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-bottom: 0;
  }
`,Yd=ec.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`,Kd=ec.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.2s ease;
  cursor: ${e=>e.$clickable?"pointer":"default"};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${e=>e.$clickable?"#f8fafc":"white"};
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`,Qd=ec.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background-color: ${e=>e.bg||"#f1f5f9"};
  color: ${e=>e.color||"#64748b"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
`,Xd=ec.div`
  flex: 1;
  
  h4 {
    margin: 0 0 0.25rem 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: #0f172a;
  }

  p {
    margin: 0;
    color: #64748b;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`,Gd=ec.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
`,Jd=ec.span`
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${e=>e.bg||"#f1f5f9"};
  color: ${e=>e.color||"#475569"};
`,Zd=ec(st)`
  background: white;
  color: #0fc179;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    background: #f0fdf4;
    color: #059669;
  }
`,ef=ec(Vd)`
  background: linear-gradient(135deg, #0fc179 0%, #059669 100%);
  color: white;
  border: none;
  padding: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(15, 193, 121, 0.3);
  margin-bottom: 1.5rem;
`,tf=ec.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: white;
  }
`,rf=ec.div`
  background: rgba(255, 255, 255, 0.1);
  height: 8px;
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;
`,nf=ec.div`
  height: 100%;
  background: white;
  border-radius: 4px;
  width: ${e=>e.width||"0%"};
  transition: width 1s ease-out;
`,of=ec.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 0.5rem;
`,af=ec.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`,sf=ec(st)`
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 1.25rem;
  text-align: center;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    border-color: #0fc179;
    background: #f0fdf4;
    transform: translateY(-2px);
  }

  svg {
    color: #0fc179;
    margin-bottom: 0.25rem;
  }

  span {
    font-weight: 600;
    font-size: 0.875rem;
    color: #334155;
  }
`,lf=ec.div`
  padding: 3rem;
  text-align: center;
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`,cf=()=>{const{user:e,refreshUser:t}=jo(),{socket:r}=Xa(),o=ne(),[a,i]=dt(),[s,l]=(0,n.useState)(null),[c,u]=(0,n.useState)(!0),[d,f]=(0,n.useState)(""),p=(0,n.useCallback)(async()=>{try{u(!0);const e=await wo.get("/users/dashboard");e.data.success?l(e.data.dashboard):f("Failed to load dashboard data")}catch(d){var e,t;console.error("Dashboard fetch error:",d),f("Failed to load dashboard data. Error: "+((null===(e=d.response)||void 0===e||null===(t=e.data)||void 0===t?void 0:t.message)||d.message))}finally{u(!1)}},[]);if((0,n.useEffect)(()=>{e&&p()},[e,p]),(0,n.useEffect)(()=>{if(r&&e){const e=async e=>{"withdrawal_approved"===e.reason?Ht.success(e.message):"withdrawal_rejected"===e.reason&&Ht.info(e.message),await t(),p()};return r.on("pointsUpdated",e),()=>r.off("pointsUpdated",e)}},[r,e,t,p]),(0,n.useEffect)(()=>{const e=a.get("completed"),r=a.get("refresh");if("true"===e&&"true"===r){const e=async()=>{try{await t(),await p();const e=new URLSearchParams(a);e.delete("completed"),e.delete("refresh"),i(e,{replace:!0})}catch(d){console.error("Error refreshing dashboard data:",d)}};e()}},[a,i,t]),c)return(0,ko.jsx)(Pd,{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:(0,ko.jsx)(Rc,{})});if(d)return(0,ko.jsx)(Pd,{children:(0,ko.jsxs)("div",{style:{textAlign:"center",padding:"3rem",background:"#fee2e2",borderRadius:"16px",color:"#dc2626"},children:[(0,ko.jsx)("p",{children:d}),(0,ko.jsx)("button",{onClick:()=>window.location.reload(),style:{marginTop:"1rem",padding:"0.75rem 1.5rem",background:"#dc2626",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},children:"Retry"})]})});const h=(null===s||void 0===s?void 0:s.stats)||{totalSurveys:0,totalPointsEarned:0,totalRedemptions:0,currentPoints:(null===e||void 0===e?void 0:e.points)||0,approvedWithdrawalAmount:0},m=(null===s||void 0===s?void 0:s.recentCompletedSurveys)||[],g=(null===s||void 0===s?void 0:s.recentOpenSurveys)||[],y=Math.min(h.currentPoints/1e3*100,100);return(0,ko.jsxs)(Pd,{children:[(0,ko.jsxs)(zd,{children:[(0,ko.jsxs)(Nd,{children:[(0,ko.jsxs)("h1",{children:["Hello, ",(null===e||void 0===e?void 0:e.firstName)||"Member","! \ud83d\udc4b"]}),(0,ko.jsx)("p",{children:"Ready to earn some rewards today?"})]}),(0,ko.jsx)(Od,{style:{position:"relative",zIndex:1},children:(0,ko.jsxs)(Zd,{to:"/surveys",children:[(0,ko.jsx)(xd,{size:20}),"Start Earning Now"]})})]}),(0,ko.jsxs)(Dd,{children:[(0,ko.jsxs)(Id,{index:0,glowColor:"rgba(147, 51, 234, 0.15)",children:[(0,ko.jsxs)($d,{children:[(0,ko.jsx)(Fd,{bg:"#f3e8ff",color:"#9333ea",children:(0,ko.jsx)(oi,{size:24,strokeWidth:2})}),(0,ko.jsxs)(qd,{children:[(0,ko.jsx)(wd,{size:14}),"Total"]})]}),(0,ko.jsxs)(Md,{children:[(0,ko.jsx)(Bd,{children:h.totalSurveys}),(0,ko.jsx)(Ud,{children:"Surveys Completed"})]})]}),(0,ko.jsxs)(Id,{index:1,glowColor:"rgba(15, 193, 121, 0.15)",children:[(0,ko.jsxs)($d,{children:[(0,ko.jsx)(Fd,{bg:"#dcfce7",color:"#15803d",children:(0,ko.jsx)(kd,{size:24,strokeWidth:2})}),(0,ko.jsxs)(qd,{$pulse:!0,children:[(0,ko.jsx)("div",{style:{width:6,height:6,borderRadius:"50%",background:"#059669",marginRight:4}}),"Live"]})]}),(0,ko.jsxs)(Md,{children:[(0,ko.jsx)(Bd,{style:{color:"#059669"},children:h.currentPoints}),(0,ko.jsx)(Ud,{children:"Current Balance (Pts)"})]})]}),(0,ko.jsxs)(Id,{index:2,glowColor:"rgba(217, 119, 6, 0.15)",children:[(0,ko.jsxs)($d,{children:[(0,ko.jsx)(Fd,{bg:"#fef3c7",color:"#d97706",children:(0,ko.jsx)(Sd,{size:24,strokeWidth:2})}),(0,ko.jsxs)(qd,{children:[(0,ko.jsx)(jd,{size:14}),"Earned"]})]}),(0,ko.jsxs)(Md,{children:[(0,ko.jsx)(Bd,{children:h.totalPointsEarned}),(0,ko.jsx)(Ud,{children:"Lifetime Earnings"})]})]}),(0,ko.jsxs)(Id,{index:3,glowColor:"rgba(220, 38, 38, 0.15)",children:[(0,ko.jsx)($d,{children:(0,ko.jsx)(Fd,{bg:"#fee2e2",color:"#dc2626",children:(0,ko.jsx)(_d,{size:24,strokeWidth:2})})}),(0,ko.jsxs)(Md,{children:[(0,ko.jsxs)(Bd,{children:["\u20b9",(h.approvedWithdrawalAmount||0).toLocaleString()]}),(0,ko.jsx)(Ud,{children:"Total Withdrawn"})]})]})]}),(0,ko.jsxs)(Hd,{children:[(0,ko.jsxs)("div",{children:[(0,ko.jsxs)(Wd,{children:[(0,ko.jsx)(Ed,{size:20}),"Recommended for You"]}),(0,ko.jsxs)(Vd,{children:[(0,ko.jsx)(Yd,{children:g.length>0?g.slice(0,3).map((e,t)=>(0,ko.jsxs)(Kd,{$clickable:!0,onClick:()=>{return t=e.id,void o(`/surveys/${t}`);var t},children:[(0,ko.jsx)(Qd,{bg:"#f0fdf4",color:"#0fc179",children:(0,ko.jsx)(xd,{size:20})}),(0,ko.jsxs)(Xd,{children:[(0,ko.jsx)("h4",{children:e.title}),(0,ko.jsxs)("p",{children:[(0,ko.jsx)(Cd,{size:14})," ",e.estimatedTime," min \u2022 ",e.category||"General"]})]}),(0,ko.jsxs)(Gd,{children:[(0,ko.jsxs)(Jd,{bg:"#e6fffa",color:"#0fc179",children:["+",e.pointsReward," pts"]}),(0,ko.jsx)(Td,{size:18,color:"#cbd5e1"})]})]},e.id)):(0,ko.jsxs)(lf,{children:[(0,ko.jsx)(oi,{size:40,strokeWidth:1.5}),(0,ko.jsx)("span",{children:"No new surveys available right now."})]})}),g.length>0&&(0,ko.jsx)("div",{style:{padding:"1rem",borderTop:"1px solid #f1f5f9"},children:(0,ko.jsxs)(st,{to:"/surveys",style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",fontSize:"0.875rem",fontWeight:600},children:["View All Surveys ",(0,ko.jsx)(jd,{size:16})]})})]}),(0,ko.jsxs)(Wd,{children:[(0,ko.jsx)(Cd,{size:20,style:{color:"#0f172a"}}),"Recent History"]}),(0,ko.jsx)(Vd,{children:(0,ko.jsx)(Yd,{children:m.length>0?m.slice(0,3).map((e,t)=>{var r;return(0,ko.jsxs)(Kd,{$clickable:!1,children:[(0,ko.jsx)(Qd,{bg:"#f1f5f9",color:"#64748b",children:(0,ko.jsx)(Sd,{size:20})}),(0,ko.jsxs)(Xd,{children:[(0,ko.jsx)("h4",{children:(null===(r=e.Survey)||void 0===r?void 0:r.title)||"Completed Survey"}),(0,ko.jsx)("p",{children:new Date(e.createdAt).toLocaleDateString()})]}),(0,ko.jsx)(Gd,{children:(0,ko.jsxs)(Jd,{bg:"#fcf8e3",color:"#b45309",children:["+",e.pointsEarned," pts"]})})]},t)}):(0,ko.jsxs)(lf,{children:[(0,ko.jsx)(Cd,{size:40,strokeWidth:1.5}),(0,ko.jsx)("span",{children:"No recent activity yet. Start a survey!"})]})})})]}),(0,ko.jsxs)("div",{children:[(0,ko.jsx)(Wd,{children:"Your Goals"}),(0,ko.jsxs)(ef,{children:[(0,ko.jsxs)(tf,{children:[(0,ko.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},children:[(0,ko.jsx)(Rd,{size:24,color:"white"}),(0,ko.jsxs)("div",{children:[(0,ko.jsx)("h3",{children:"Next Reward"}),(0,ko.jsx)("div",{style:{fontSize:"0.8rem",color:"rgba(255, 255, 255, 0.8)",marginTop:"2px"},children:"Track your progress"})]})]}),(0,ko.jsxs)("span",{style:{fontWeight:700,fontSize:"1.25rem",color:"white"},children:[Math.round(y),"%"]})]}),(0,ko.jsx)(rf,{children:(0,ko.jsx)(nf,{width:`${y}%`})}),(0,ko.jsxs)(of,{children:[(0,ko.jsxs)("span",{children:[h.currentPoints," pts"]}),(0,ko.jsxs)("span",{children:["Target: ",1e3," pts"]})]})]}),(0,ko.jsx)(Wd,{children:"Quick Actions"}),(0,ko.jsxs)(af,{children:[(0,ko.jsxs)(sf,{to:"/rewards",children:[(0,ko.jsx)(ii,{size:24}),(0,ko.jsx)("span",{children:"Redeem"})]}),(0,ko.jsxs)(sf,{to:"/profile",children:[(0,ko.jsx)(_d,{size:24}),(0,ko.jsx)("span",{children:"Profile"})]}),(0,ko.jsxs)(sf,{to:"/surveys",children:[(0,ko.jsx)(Ed,{size:24}),(0,ko.jsx)("span",{children:"Surveys"})]}),(0,ko.jsxs)(sf,{to:"/payment-history",children:[(0,ko.jsx)(Cd,{size:24}),(0,ko.jsx)("span",{children:"History"})]})]})]})]})]})},uf=ni("circle-check-big",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]),df=ni("circle-alert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]),ff=ni("timer",[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]]),pf=ni("play",[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]),hf=ec.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  min-height: calc(100vh - 80px);
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`,mf=ec.div`
  background: linear-gradient(135deg, #0fc179 0%, #059669 100%);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  color: white;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(15, 193, 121, 0.2);
  position: relative;
  overflow: hidden;

  h1 {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 0.25rem 0;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    opacity: 0.9;
    max-width: 600px;
  }

  /* Abstract Pattern */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
    transform: translate(30%, -30%);
  }
`,gf=ec.div`
  display: grid;
  gap: 1rem;
`,yf=ec.div`
  display: flex;
  background: white;
  padding: 0.4rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  width: fit-content;
  margin-bottom: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`,bf=ec.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  background: ${e=>e.$active?"#0fc179":"transparent"};
  color: ${e=>e.$active?"white":"#64748b"};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${e=>e.$active?"white":"#1e293b"};
    background: ${e=>e.$active?"#0fc179":"#f1f5f9"};
  }
`,vf=ec.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`,xf=ec.div`
  background: white;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr auto;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${e=>e.$loading?.7:1};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px -2px rgba(0, 0, 0, 0.1);
    border-color: #e2e8f0;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`,wf=ec.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  div.icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: ${e=>e.$completed?"#ecfdf5":"#f0f9ff"};
    color: ${e=>e.$completed?"#059669":"#0284c7"};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  div.text {
    h3 {
      font-size: 0.9rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 0.15rem 0;
    }
    span {
      font-size: 0.75rem;
      color: #64748b;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
  }
`,kf=ec.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  label {
    font-size: 0.65rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }

  span {
    font-size: 0.85rem;
    color: #334155;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.3rem;

    svg {
      width: 14px;
      height: 14px;
      color: #0fc179;
    }
  }
`,Sf=ec.div`
  background: #f0fdf4;
  color: #059669;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  width: fit-content;

  svg {
    fill: currentColor;
    width: 12px;
    height: 12px;
  }
`,jf=ec.button`
  background: #0fc179;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  box-shadow: 0 1px 3px rgba(15, 193, 121, 0.2);

  &:hover {
    background: #059669;
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(15, 193, 121, 0.3);
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`,_f=ec.div`
  text-align: center;
  padding: 2rem 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px dashed #e2e8f0;
  
  div {
    width: 48px;
    height: 48px;
    background: #f8fafc;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    color: #94a3b8;
  }
  
  h3 {
    margin: 0 0 0.35rem 0;
    color: #1e293b;
    font-size: 0.95rem;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    color: #64748b;
    font-size: 0.85rem;
  }
`,Ef=ec.div`
  background: #f0fdf4;
  color: #166534;
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  border: 1px solid #bbf7d0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;

  svg {
    color: #15803d;
  }
`,Cf=()=>{const{user:e,refreshUser:t}=jo(),r=ne(),[o,a]=dt(),[i,s]=(0,n.useState)("active"),[l,c]=(0,n.useState)(!1),[u,d]=(0,n.useState)(""),[f,p]=(0,n.useState)(!0),[h,m]=(0,n.useState)(""),[g,y]=(0,n.useState)([]),[b,v]=(0,n.useState)([]),[x,w]=(0,n.useState)([]),k=(0,n.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||p(!0),m("");const t=await wo.get("/surveys",{timeout:1e4});let r=[];t.data.success&&(r=t.data.surveys||[],y(r),w(r));const n=await wo.get("/surveys/user/history",{timeout:1e4});n.data.success&&v(n.data.responses||[])}catch(h){console.error("Error fetching survey data:",h),e||m("Failed to load surveys. Please try again.")}finally{e||p(!1)}},[]);(0,n.useEffect)(()=>{k()},[k]),(0,n.useEffect)(()=>{void 0!==(null===e||void 0===e?void 0:e.points)&&k()},[null===e||void 0===e?void 0:e.points,k]),(0,n.useEffect)(()=>{const t=setInterval(()=>{e&&!f&&k(!0)},3e4);return()=>clearInterval(t)},[e,f,k]);const S=e=>{if(e<60)return`${e} min`;const t=Math.floor(e/60),r=e%60;return r>0?`${t}h ${r}m`:`${t}h`};(0,n.useEffect)(()=>{if("true"===o.get("completed")){t(),k(),d("Survey completed successfully! Your points have been updated."),c(!0);const e=new URLSearchParams(o);e.delete("completed"),e.delete("refresh"),a(e,{replace:!0}),setTimeout(()=>c(!1),5e3)}},[o,a,t,k]);const j="active"===i?g:b;return(0,ko.jsxs)(hf,{children:[(0,ko.jsxs)(mf,{children:[(0,ko.jsx)("h1",{children:"Survey Dashboard"}),(0,ko.jsx)("p",{children:"Complete surveys to earn points and unlock rewards. Your opinion matters!"})]}),l&&(0,ko.jsxs)(Ef,{children:[(0,ko.jsx)(uf,{size:20}),u]}),h&&(0,ko.jsxs)("div",{style:{textAlign:"center",padding:"2rem",color:"#ef4444"},children:[(0,ko.jsx)(df,{size:32,style:{marginBottom:"0.5rem"}}),(0,ko.jsx)("p",{children:h})]}),!h&&(0,ko.jsxs)(gf,{children:[(0,ko.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"},children:(0,ko.jsxs)(yf,{children:[(0,ko.jsxs)(bf,{$active:"active"===i,onClick:()=>s("active"),children:[(0,ko.jsx)(oi,{size:18}),"Available (",g.length,")"]}),(0,ko.jsxs)(bf,{$active:"completed"===i,onClick:()=>s("completed"),children:[(0,ko.jsx)(uf,{size:18}),"Completed (",b.length,")"]})]})}),f?(0,ko.jsxs)("div",{style:{textAlign:"center",padding:"4rem"},children:[(0,ko.jsx)("div",{style:{width:"40px",height:"40px",border:"3px solid #f1f5f9",borderTopColor:"#0fc179",borderRadius:"50%",margin:"0 auto 1rem",animation:"spin 1s linear infinite"}}),(0,ko.jsx)("p",{style:{color:"#64748b"},children:"Loading surveys..."}),(0,ko.jsx)("style",{children:"@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }"})]}):j.length>0?(0,ko.jsx)(vf,{children:j.map((e,t)=>{const n="completed"===i,o=n?e.survey:e;return n&&!o?null:(0,ko.jsxs)(xf,{children:[(0,ko.jsxs)(wf,{$completed:n,children:[(0,ko.jsx)("div",{className:"icon",children:n?(0,ko.jsx)(uf,{size:24}):(0,ko.jsx)(ai,{size:24})}),(0,ko.jsxs)("div",{className:"text",children:[(0,ko.jsx)("h3",{children:o.title}),(0,ko.jsx)("span",{children:o.category||"General Survey"})]})]}),(0,ko.jsxs)(kf,{children:[(0,ko.jsx)("label",{children:"Estimated Time"}),(0,ko.jsxs)("span",{children:[(0,ko.jsx)(ff,{})," ",S(o.estimatedTime)]})]}),(0,ko.jsxs)(Sf,{children:[(0,ko.jsx)(Ed,{}),n?e.pointsEarned:o.pointsReward," pts"]}),n?(0,ko.jsx)("div",{style:{textAlign:"right"},children:(0,ko.jsxs)("span",{style:{fontSize:"0.85rem",color:"#64748b"},children:["Completed on ",new Date(e.completedAt).toLocaleDateString()]})}):(0,ko.jsxs)(jf,{onClick:()=>(e=>{r(`/surveys/${e.id}`)})(o),children:["Start Survey ",(0,ko.jsx)(pf,{size:16,fill:"white"})]})]},`${n?e.id:o.id}-${t}`)})}):(0,ko.jsxs)(_f,{children:[(0,ko.jsx)("div",{children:"active"===i?(0,ko.jsx)(ai,{size:32}):(0,ko.jsx)(uf,{size:32})}),(0,ko.jsx)("h3",{children:"active"===i?"No Available Surveys":"No Completed Surveys"}),(0,ko.jsx)("p",{children:"active"===i?"You've completed all available tasks! Check back later for more.":"Start completing surveys to see your history here."})]})]})]})},Tf=ni("dollar-sign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]),Rf=ni("users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]),Pf=ni("chevron-left",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]),zf=ec.div`
  max-width: 1000px; // Reduced from 1200px
  margin: 0 auto;
  padding: 0.25rem; // Reduced from 0.3rem
  min-height: calc(100vh - 120px);
`,Nf=ec.button`
  background: none;
  border: none;
  color: #0fc179;
  font-size: 0.55rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.3rem;
  padding: 0.25rem 0;
  transition: color 0.3s ease;
  
  &:hover {
    color: #0fc179;
  }
  
  svg {
    font-size: 0.55rem;
    flex-shrink: 0;
  }
`,Of=(ec.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  gap: 0.75rem;
  
  button {
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    &.previous {
      background: white;
      color: #0fc179;
      border: 1px solid #e2e8f0;
      
      &:hover:not(:disabled) {
        background: #f8fafc;
        border-color: #0fc179;
        transform: translateY(-1px);
      }
    }
    
    &.next {
      background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
      color: white;
      
      &:hover:not(:disabled) {
        background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(15, 193, 121, 0.3);
      }
    }
    
    &.submit {
      background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
      color: white;
      
      &:hover:not(:disabled) {
        background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
      }
    }
    
    svg {
      font-size: 0.8rem;
      flex-shrink: 0;
    }
  }
`,ec.div`
  background: linear-gradient(to bottom, #0fc179 0%, #0fc179 100%);
  color: white;
  padding: 0.3rem; // Reduced from 0.4rem
  border-radius: 2px;
  margin-bottom: 0.6rem; // Reduced from 0.8rem
  
  h1 {
    color: white;
    margin: 0 0 0.25rem 0;
    font-size: 0.9rem; // Reduced from 1rem
  }
  
  p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    opacity: 0.9;
    font-size: 0.65rem; // Reduced from 0.7rem
  }
`),Af=ec.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); // Reduced from 200px
  gap: 0.4rem; // Reduced from 0.5rem
  margin-bottom: 0.6rem; // Reduced from 0.8rem
`,Lf=ec.div`
  background: white;
  padding: 0.4rem; // Reduced from 0.5rem
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 0.4rem; // Reduced from 0.5rem
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e2e8f0;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(15, 193, 121, 0.12);
  }
`,Df=ec.div`
  display: grid;
  grid-template-columns: 1fr 240px; // Reduced from 280px
  gap: 0.6rem; // Reduced from 0.75rem
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,If=ec.div`
  background: white;
  border-radius: 5px; // Reduced from 6px
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 1px solid #e2e8f0;
`,$f=ec.div`
  padding: 0.6rem; // Reduced from 0.75rem
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h2 {
    margin: 0;
    color: #2c3e50;
    font-size: 0.7rem; // Reduced from 0.8rem
  }
`,Ff=ec.div`
  padding: 0.6rem; // Reduced from 0.75rem
  
  .progress-track {
    width: 100%;
    height: 10px;
    background: #f1f5f9;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #0fc179 0%, #0fc179 50%, #0fc179 100%);
      transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 6px;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
        animation: shimmer 2s infinite;
      }
    }
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`,Mf=ec.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideIn 0.4s ease-out;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
  }
  
  .question-header {
    padding: 0.75rem;
    border-bottom: 1px solid #e0e0e0;
    background: #f8fafc;
    
    .question-number {
      color: #0fc179;
      font-weight: 600;
      font-size: 0.8rem;
      margin-bottom: 0.2rem;
    }
    
    .question-text {
      color: #2c3e50;
      font-size: 1rem;
      font-weight: 500;
      margin: 0;
      line-height: 1.4;
    }
    
    .question-required {
      color: #e74c3c;
      font-size: 0.8rem;
      margin-top: 0.5rem;
    }
  }
  
  .question-content {
    padding: 0.75rem;
  }
`,Bf=ec.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`,Uf=ec.label`
  display: flex;
  align-items: center;
  padding: 0.4rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  
  &:hover {
    background: #f8fafc;
    border-color: #0fc179;
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(15, 193, 121, 0.1);
  }
  
  &.selected {
    border-color: #0fc179;
    background: rgba(15, 193, 121, 0.05);
    box-shadow: 0 2px 8px rgba(15, 193, 121, 0.15);
  }
  
  input {
    margin: 0;
    margin-right: 0.75rem;
    accent-color: #0fc179;
  }
  
  span {
    color: #2c3e50;
    font-size: 0.65rem;
    font-weight: 500;
  }
`,qf=ec.input`
  width: 100%;
  padding: 0.6rem;
  border: 2px solid rgba(15, 193, 121, 0.2);
  border-radius: 6px;
  font-size: 0.65rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #0fc179;
  }
`,Hf=ec.textarea`
  width: 100%;
  padding: 0.6rem;
  border: 2px solid rgba(15, 193, 121, 0.2);
  border-radius: 6px;
  font-size: 0.75rem;
  min-height: 40px;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #0fc179;
  }
`,Wf=ec.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
  
  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.75rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }
    
    &:hover::before {
      left: 100%;
    }
    
    &.previous {
      background: #f8fafc;
      color: #64748b;
      border: 1px solid #e2e8f0;
      
      &:hover:not(:disabled) {
        background: #f1f5f9;
        color: #475569;
        transform: translateX(-2px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    
    &.next, &.submit {
      background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
      color: white;
      box-shadow: 0 2px 8px rgba(15, 193, 121, 0.3);
      
      &:hover:not(:disabled) {
        background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(15, 193, 121, 0.4);
      }
      
      &:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: 0 2px 8px rgba(15, 193, 121, 0.3);
      }
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        box-shadow: 0 2px 8px rgba(15, 193, 121, 0.2);
      }
    }
    
    &.submit {
      background: linear-gradient(135deg, #059669 0%, #10b981 100%);
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
      
      &:hover:not(:disabled) {
        background: linear-gradient(135deg, #047857 0%, #059669 100%);
        box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
      }
      
      &:disabled {
        box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
      }
    }
  }
`,Vf=ec.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  
  &::after {
    content: '';
    width: 32px;
    height: 32px;
    border: 3px solid rgba(15, 193, 121, 0.1);
    border-top: 3px solid #0fc179;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,Yf=ec.div`
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
  font-size: 0.9rem;
`,Kf=ec.div`
  background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
  color: white;
  padding: 0.8rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(15, 193, 121, 0.2);
  
  h3 {
    margin: 1rem 0;
    color: white;
    font-size: 1rem;
  }
  
  p {
    margin: 0.5rem 0;
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.85rem;
  }
  
  button {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    padding: 0.4rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 1rem;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }
  }
`,Qf=()=>{const{id:e}=oe(),t=ne(),{user:r,refreshUser:o}=jo(),[a,i]=(0,n.useState)(null),[s,l]=(0,n.useState)(!0),[c,u]=(0,n.useState)(""),[d,f]=(0,n.useState)(0),[p,h]=(0,n.useState)({}),[m,g]=(0,n.useState)(!1),[y,b]=(0,n.useState)(!1),[v]=(0,n.useState)(Date.now()),x=(0,n.useCallback)(async()=>{try{const t=await wo.get(`/surveys/${e}`);if(t.data.success){const e=t.data.survey,r=(e.questions||[]).map((e,t)=>{const r=void 0!==e.id?e.id:t+1;switch(e.type){case"mcq_single":return{...e,id:r,type:"multiple-choice",options:e.options||[]};case"mcq_multi":return{...e,id:r,type:"checkbox",options:e.options||[]};case"short_text":return{...e,id:r,type:"text"};case"number":return{...e,id:r,type:"number"};case"rating":return{...e,id:r,type:"rating",maxRating:e.scale||e.maxRating||5};case"dropdown":return{...e,id:r,type:"dropdown",options:e.options||[]};case"date":return{...e,id:r,type:"date",format:e.format||"yyyy-MM-dd"};case"matrix":return{...e,id:r,type:"matrix",rows:e.rows||[],columns:e.columns||[]};default:return{...e,id:r}}});i({...e,questions:r})}else u("Survey not found or not available")}catch(c){c.response&&400===c.response.status&&"Survey already completed"===c.response.data.message?(b(!0),u("You have already completed this survey. Thank you for your participation!")):u("Failed to load survey. Please try again.")}finally{l(!1)}},[e]);(0,n.useEffect)(()=>{x()},[x]);const w=(e,t)=>{h(r=>({...r,[e]:t}))},k=()=>{if(!a||!a.questions)return!1;const e=a.questions[d],t=p[e.id];if("checkbox"===e.type)return Array.isArray(t)&&t.length>0;if("matrix"===e.type){const r=(e.rows||[]).length;if(!t||"object"!==typeof t)return!1;return Object.keys(t).length>=r}return void 0!==t&&""!==t&&null!==t},S=()=>{if(!a||!a.questions)return!1;for(const e of a.questions)if(e.required){const t=p[e.id];if("checkbox"===e.type){if(!Array.isArray(t)||0===t.length)return!1}else if(void 0===t||""===t||null===t)return!1}return!0},j=()=>{if(!a||!a.questions)return{completed:0,total:0};const e=a.questions.filter(e=>e.required);return{completed:e.filter(e=>{const t=p[e.id];return"checkbox"===e.type?Array.isArray(t)&&t.length>0:void 0!==t&&""!==t&&null!==t}).length,total:e.length}},_=()=>{d<a.questions.length-1&&f(e=>e+1)},E=async()=>{if(S()){g(!0),u("");try{const e=Math.floor((Date.now()-v)/1e3),r={responses:p,timeSpent:e};console.log("Submitting survey:",{surveyId:a.id,submissionData:r,endpoint:`/surveys/${a.id}/submit`});const n=await wo.post(`/surveys/${a.id}/submit`,r);console.log("Survey submission response:",n.data),n.data.success?(b(!0),await o(),setTimeout(()=>{t("/surveys?completed=true&refresh=true")},2e3)):u(n.data.message||"Failed to submit survey")}catch(c){var e,r,n;console.error("Survey submission error:",c),console.error("Error response:",null===(e=c.response)||void 0===e?void 0:e.data),u((null===(r=c.response)||void 0===r||null===(n=r.data)||void 0===n?void 0:n.message)||"Failed to submit survey. Please try again.")}finally{g(!1)}}else u("Please answer all required questions before submitting.")},C=(0,n.useCallback)(e=>{if("Enter"!==e.key)return;const t=document.activeElement;if(!t||"INPUT"!==t.tagName&&"TEXTAREA"!==t.tagName||"text"!==t.type&&"email"!==t.type&&"tel"!==t.type&&"url"!==t.type&&"number"!==t.type&&"date"!==t.type&&"TEXTAREA"!==t.tagName)if(e.preventDefault(),d===a.questions.length-1)S()&&E();else{a.questions[d].required&&!k()||_()}else if(e.preventDefault(),d===a.questions.length-1)S()&&E();else{a.questions[d].required&&!k()||_()}},[d,a,p,_,E,k,S]);(0,n.useEffect)(()=>{if(a&&a.questions&&a.questions.length>0)return document.addEventListener("keydown",C),()=>{document.removeEventListener("keydown",C)}},[C,a]);if(s)return(0,ko.jsx)(Vf,{});if(c&&!a)return(0,ko.jsxs)(zf,{children:[(0,ko.jsxs)(Yf,{children:[(0,ko.jsx)(Xc,{}),c]}),(0,ko.jsxs)(Nf,{onClick:()=>t("/surveys"),children:[(0,ko.jsx)(Uc,{}),"Back to Surveys"]})]});if(y)return(0,ko.jsx)(zf,{children:(0,ko.jsxs)(Kf,{children:[(0,ko.jsx)(Wc,{size:48,style:{color:"#27ae60"}}),(0,ko.jsx)("h3",{children:"Survey Already Completed!"}),(0,ko.jsx)("p",{children:c||"Thank you for your participation."}),a&&a.pointsReward&&(0,ko.jsxs)("p",{children:["You've earned ",(0,ko.jsxs)("strong",{children:[a.pointsReward," points"]})," for completing this survey."]}),(0,ko.jsx)("button",{onClick:()=>t("/surveys?completed=true"),children:"Back to Surveys"})]})});if(!a||!a.questions||0===a.questions.length)return(0,ko.jsxs)(zf,{children:[(0,ko.jsxs)(Yf,{children:[(0,ko.jsx)(Xc,{}),"This survey is not available or has no questions."]}),(0,ko.jsxs)(Nf,{onClick:()=>t("/surveys"),children:[(0,ko.jsx)(Uc,{}),"Back to Surveys"]})]});const T=a.questions[d],R=(d+1)/a.questions.length*100;return(0,ko.jsxs)(zf,{children:[(0,ko.jsxs)(Nf,{onClick:()=>t("/surveys"),children:[(0,ko.jsx)(Uc,{}),"Back to Surveys"]}),(0,ko.jsxs)(Of,{children:[(0,ko.jsx)("h1",{children:a.title}),(0,ko.jsx)("p",{children:a.description})]}),(0,ko.jsxs)(Af,{children:[(0,ko.jsxs)(Lf,{children:[(0,ko.jsx)(Cd,{size:20,color:"#0fc179"}),(0,ko.jsxs)("div",{children:[(0,ko.jsx)("div",{style:{fontWeight:"600",color:"#2c3e50"},children:(e=>{if(e<60)return`${e} min`;const t=Math.floor(e/60),r=e%60;return r>0?`${t}h ${r}m`:`${t}h`})(a.estimatedTime)}),(0,ko.jsx)("div",{style:{fontSize:"0.85rem",color:"#64748b"},children:"Estimated time"})]})]}),(0,ko.jsxs)(Lf,{children:[(0,ko.jsx)(Tf,{size:20,color:"#10b981"}),(0,ko.jsxs)("div",{children:[(0,ko.jsxs)("div",{style:{fontWeight:"600",color:"#2c3e50"},children:[a.pointsReward," points"]}),(0,ko.jsx)("div",{style:{fontSize:"0.85rem",color:"#64748b"},children:"Reward"})]})]}),(0,ko.jsxs)(Lf,{children:[(0,ko.jsx)(Rf,{size:20,color:"#f59e0b"}),(0,ko.jsxs)("div",{children:[(0,ko.jsx)("div",{style:{fontWeight:"600",color:"#2c3e50"},children:a.targetAudience||"General"}),(0,ko.jsx)("div",{style:{fontSize:"0.85rem",color:"#64748b"},children:"Target audience"})]})]})]}),c&&(0,ko.jsxs)(Yf,{children:[(0,ko.jsx)(Xc,{}),c]}),(0,ko.jsxs)(Df,{children:[(0,ko.jsxs)("div",{children:[(0,ko.jsxs)(Mf,{children:[(0,ko.jsxs)("div",{className:"question-header",children:[(0,ko.jsxs)("div",{className:"question-number",children:["Question ",d+1]}),(0,ko.jsx)("h2",{className:"question-text",children:T.question}),T.required&&(0,ko.jsx)("div",{className:"question-required",children:"* This question is required"})]}),(0,ko.jsx)("div",{className:"question-content",children:(e=>{const t=p[e.id];switch(e.type){case"multiple-choice":return(0,ko.jsx)(Bf,{children:e.options.map((r,n)=>(0,ko.jsxs)(Uf,{className:t===r?"selected":"",children:[(0,ko.jsx)("input",{type:"radio",name:`question_${e.id}`,value:r,checked:t===r,onChange:t=>w(e.id,t.target.value)}),(0,ko.jsx)("span",{children:r})]},n))});case"checkbox":return(0,ko.jsx)(Bf,{children:e.options.map((r,n)=>{const o=t||[];return(0,ko.jsxs)(Uf,{className:o.includes(r)?"selected":"",children:[(0,ko.jsx)("input",{type:"checkbox",value:r,checked:o.includes(r),onChange:t=>{const n=o.includes(r)?o.filter(e=>e!==r):[...o,r];w(e.id,n)}}),(0,ko.jsx)("span",{children:r})]},n)})});case"dropdown":return(0,ko.jsxs)("select",{value:t||"",onChange:t=>w(e.id,t.target.value),style:{padding:"0.6rem",border:"1px solid #e0e0e0",borderRadius:"6px"},children:[(0,ko.jsx)("option",{value:"",children:"Select an option"}),e.options.map((e,t)=>(0,ko.jsx)("option",{value:e,children:e},t))]});case"text":return(0,ko.jsx)(qf,{type:"text",value:t||"",onChange:t=>w(e.id,t.target.value),placeholder:"Enter your answer..."});case"textarea":return(0,ko.jsx)(Hf,{value:t||"",onChange:t=>w(e.id,t.target.value),placeholder:"Enter your detailed response..."});case"rating":const r=e.maxRating||5;return(0,ko.jsx)(Bf,{children:Array.from({length:r},(e,t)=>t+1).map(r=>(0,ko.jsxs)(Uf,{className:t===r?"selected":"",children:[(0,ko.jsx)("input",{type:"radio",name:`question_${e.id}`,value:r,checked:t===r,onChange:t=>w(e.id,parseInt(t.target.value))}),(0,ko.jsx)("span",{children:r})]},r))});case"fill-in-the-blank":return(0,ko.jsx)(qf,{type:"text",value:t||"",onChange:t=>w(e.id,t.target.value),placeholder:"Fill in the blank..."});case"date":return(0,ko.jsx)(qf,{type:"date",value:t||"",onChange:t=>w(e.id,t.target.value),placeholder:"Select a date..."});case"number":return(0,ko.jsx)(qf,{type:"number",value:t||"",onChange:t=>w(e.id,t.target.value),placeholder:"Enter a number..."});case"matrix":const n=e.rows||[],o=e.columns||[],a=t||{};return(0,ko.jsx)("div",{style:{overflowX:"auto"},children:(0,ko.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,ko.jsx)("thead",{children:(0,ko.jsxs)("tr",{children:[(0,ko.jsx)("th",{style:{textAlign:"left",padding:"8px"}}),o.map((e,t)=>(0,ko.jsx)("th",{style:{textAlign:"center",padding:"8px",fontSize:"0.85rem",color:"#64748b"},children:e},t))]})}),(0,ko.jsx)("tbody",{children:n.map((t,r)=>(0,ko.jsxs)("tr",{children:[(0,ko.jsx)("td",{style:{padding:"8px",fontSize:"0.9rem",color:"#374151"},children:t}),o.map((t,n)=>(0,ko.jsx)("td",{style:{textAlign:"center",padding:"8px"},children:(0,ko.jsx)("input",{type:"radio",name:`matrix_${e.id}_row_${r}`,checked:a[r]===n,onChange:()=>w(e.id,{...a,[r]:n})})},n))]},r))})]})});case"email":return(0,ko.jsx)(qf,{type:"email",value:t||"",onChange:t=>w(e.id,t.target.value),placeholder:"Enter your email..."});case"phone":return(0,ko.jsx)(qf,{type:"tel",value:t||"",onChange:t=>w(e.id,t.target.value),placeholder:"Enter your phone number..."});case"url":return(0,ko.jsx)(qf,{type:"url",value:t||"",onChange:t=>w(e.id,t.target.value),placeholder:"Enter a URL..."});default:return(0,ko.jsx)(qf,{type:"text",value:t||"",onChange:t=>w(e.id,t.target.value),placeholder:`Enter your answer for ${e.type} question...`})}})(T)}),(0,ko.jsxs)("div",{style:{marginTop:"0.75rem",padding:"0.5rem",background:"rgba(15, 193, 121, 0.05)",border:"1px solid rgba(15, 193, 121, 0.1)",borderRadius:"4px",fontSize:"0.8rem",color:"#64748b",textAlign:"center"},children:["\ud83d\udca1 Press ",(0,ko.jsx)("kbd",{style:{background:"#f1f5f9",border:"1px solid #cbd5e1",borderRadius:"3px",padding:"0.1rem 0.3rem",fontSize:"0.75rem",fontFamily:"monospace"},children:"Enter"})," to ",d===a.questions.length-1?"submit survey":"move to next question"]})]}),(0,ko.jsxs)(Wf,{children:[(0,ko.jsxs)("button",{className:"previous",onClick:()=>{d>0&&f(e=>e-1)},disabled:0===d,children:[(0,ko.jsx)(Pf,{size:16}),"Previous"]}),d===a.questions.length-1?(0,ko.jsx)("button",{className:"submit",onClick:E,disabled:m||!S(),children:m?"Submitting...":"Submit Survey"}):(0,ko.jsxs)("button",{className:"next",onClick:_,disabled:T.required&&!k(),children:["Next",(0,ko.jsx)(Td,{size:16})]})]})]}),(0,ko.jsxs)("div",{children:[(0,ko.jsxs)(If,{children:[(0,ko.jsxs)($f,{children:[(0,ko.jsx)("h2",{children:"Progress"}),(0,ko.jsxs)("span",{style:{color:"#0fc179",fontWeight:"600"},children:[Math.round(R),"%"]})]}),(0,ko.jsxs)(Ff,{children:[(0,ko.jsx)("div",{className:"progress-track",children:(0,ko.jsx)("div",{className:"progress-fill",style:{width:`${R}%`}})}),(0,ko.jsxs)("div",{style:{marginTop:"0.5rem",fontSize:"0.9rem",color:"#64748b"},children:["Question ",d+1," of ",a.questions.length]})]})]}),(0,ko.jsxs)(If,{style:{marginTop:"1rem"},children:[(0,ko.jsx)($f,{children:(0,ko.jsx)("h2",{children:"Survey Info"})}),(0,ko.jsx)(Ff,{children:(0,ko.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"0.8rem"},children:[(0,ko.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,ko.jsx)("span",{style:{color:"#64748b"},children:"Total Questions:"}),(0,ko.jsx)("span",{style:{fontWeight:"500"},children:a.questions.length})]}),(0,ko.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,ko.jsx)("span",{style:{color:"#64748b"},children:"Current:"}),(0,ko.jsx)("span",{style:{fontWeight:"500"},children:d+1})]}),(0,ko.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,ko.jsx)("span",{style:{color:"#64748b"},children:"Answered:"}),(0,ko.jsx)("span",{style:{fontWeight:"500"},children:Object.keys(p).length})]}),(0,ko.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,ko.jsx)("span",{style:{color:"#64748b"},children:"Required:"}),(0,ko.jsxs)("span",{style:{fontWeight:"500",color:j().completed===j().total?"#059669":"#e74c3c"},children:[j().completed,"/",j().total]})]}),!S()&&(0,ko.jsx)("div",{style:{padding:"0.5rem",background:"#fef2f2",border:"1px solid #fecaca",borderRadius:"4px",fontSize:"0.8rem",color:"#dc2626"},children:"Please complete all required questions to submit"})]})})]})]})]})]})},Xf=ni("activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]),Gf=ni("loader",[["path",{d:"M12 2v4",key:"3427ic"}],["path",{d:"m16.2 7.8 2.9-2.9",key:"r700ao"}],["path",{d:"M18 12h4",key:"wj9ykh"}],["path",{d:"m16.2 16.2 2.9 2.9",key:"1bxg5t"}],["path",{d:"M12 18v4",key:"jadmvz"}],["path",{d:"m4.9 19.1 2.9-2.9",key:"bwix9q"}],["path",{d:"M2 12h4",key:"j09sii"}],["path",{d:"m4.9 4.9 2.9 2.9",key:"giyufr"}]]),Jf=ni("arrow-right",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]),Zf=ni("shopping-cart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]]),ep=tc`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`,tp=tc`
  from { transform: translateX(-10px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`,rp=tc`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`,np=ec.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.75rem 1.25rem;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  min-height: calc(100vh - 80px);

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`,op=ec.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 0.85rem;
  margin-bottom: 1rem;
  animation: ${ep} 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 0.65rem;
  }
`,ap=ec.div`
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
    border-color: #0fc179;
    transform: translateY(-2px);
  }
`,ip=ec(ap)`
  padding: 1rem;
  background: white;
  justify-content: space-between;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #0fc179, #059669);
  }
`,sp=ec.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;

  h2 {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 0.15rem 0;
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  span.subtitle {
    font-size: 0.75rem;
    color: #64748b;
  }

  div.icon-circle {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #ecfdf5;
    color: #059669;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;

    ${ip}:hover & {
      transform: rotate(10deg);
      background: #0fc179;
      color: white;
    }
  }
`,lp=ec.div`
  div.main {
    font-size: 1.9rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.04em;
    line-height: 1;
    margin-bottom: 0.5rem;
    
    span {
      font-size: 1rem;
      color: #059669;
      margin-left: 0.2rem;
    }
  }

  div.secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.65rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.8rem;
    color: #334155;
    font-weight: 600;

    svg {
      color: #059669;
    }
  }
`,cp=ec(ap)`
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  align-items: center;
  background: white;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`,up=ec.div`
  h2 {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 0.35rem 0;
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  p {
    font-size: 0.8rem;
    color: #64748b;
    line-height: 1.4;
    margin: 0 0 1rem 0;
  }

  div.bank-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #f1f5f9;

    div.icon {
      width: 26px;
      height: 26px;
      border-radius: 6px;
      background: #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #64748b;
      
      &.active {
        background: #ecfdf5;
        color: #059669;
      }
    }

    div.details {
      flex: 1;
      
      strong {
        display: block;
        font-size: 0.75rem;
        color: #0f172a;
      }
      span {
        font-size: 0.68rem;
        color: #64748b;
      }
    }
  }
`,dp=ec.div`
  background: #f8fafc;
  padding: 0.85rem;
  border-radius: 8px;
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;

  &:focus-within {
    background: white;
    border-color: #0fc179;
    box-shadow: 0 4px 12px rgba(15, 193, 121, 0.1);
  }

  label {
    display: block;
    font-size: 0.7rem;
    font-weight: 600;
    color: #475569;
    margin-bottom: 0.35rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  div.input-group {
    position: relative;
    margin-bottom: 0.75rem;

    input {
      width: 100%;
      padding: 0.6rem 0.6rem 0.6rem 2.1rem;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      font-size: 0.9rem;
      color: #0f172a;
      font-weight: 600;
      outline: none;
      transition: all 0.2s;
      background: white;

      &:focus {
        border-color: #0fc179;
      }
    }

    svg {
      position: absolute;
      left: 0.7rem;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      transition: color 0.2s;
    }

    input:focus + svg {
      color: #0fc179;
    }
  }

  div.summary {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: #64748b;
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px dashed #e2e8f0;
  }
`,fp=ec.button`
  width: ${e=>e.$full?"100%":"auto"};
  background: ${e=>e.$disabled?"#e2e8f0":"#0fc179"};
  color: ${e=>e.$disabled?"#94a3b8":"white"};
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: ${e=>e.$disabled?"not-allowed":"pointer"};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;

  &:hover {
    background: ${e=>e.$disabled?"#e2e8f0":"#059669"};
    transform: ${e=>e.$disabled?"none":"translateY(-1px)"};
  }
`,pp=ec.h3`
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.65rem 0;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  animation: ${tp} 0.4s ease-out;
  
  svg {
    color: #0fc179;
  }
`,hp=ec.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.85rem;
  animation: ${ep} 0.6s ease-out;
`,mp=ec.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #cbd5e1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  animation: ${rp} 0.5s ease-out backwards;
  animation-delay: ${e=>e.$index?.05*e.$index+"s":"0s"};

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15), 0 4px 8px -2px rgba(15, 193, 121, 0.1);
    border-color: #0fc179;
    
    div.image-overlay {
      opacity: 1;
    }
  }
`,gp=ec.div`
  height: 90px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-bottom: 1px solid #cbd5e1;
  transition: all 0.3s ease;

  svg.reward-icon {
    width: 36px;
    height: 36px;
    color: #94a3b8;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  span.brand {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: white;
    padding: 0.15rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.6rem;
    font-weight: 700;
    color: #334155;
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    z-index: 2;
    transition: all 0.3s ease;
  }

  ${mp}:hover & {
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    
    svg.reward-icon {
      transform: scale(1.15) rotate(5deg);
      color: #059669;
    }
    
    span.brand {
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(0,0,0,0.12);
    }
  }
`,yp=ec.div`
  padding: 0.75rem 0.85rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  h4 {
    margin: 0 0 0.15rem 0;
    font-size: 0.85rem;
    font-weight: 700;
    color: #1e293b;
    transition: color 0.3s ease;
  }

  p {
    color: #475569;
    font-size: 0.75rem;
    margin: 0 0 0.75rem 0;
    line-height: 1.4;
    flex: 1;
    transition: color 0.3s ease;
  }
  
  ${mp}:hover & {
    h4 {
      color: #0f172a;
    }
    
    p {
      color: #334155;
    }
  }
`,bp=ec.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 0.65rem;
  border-top: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  
  div.cost {
    display: flex;
    align-items: center;
    gap: 0.15rem;
    color: #059669;
    font-weight: 700;
    font-size: 0.8rem;
    transition: all 0.3s ease;
  }
  
  ${mp}:hover & {
    border-top-color: #cbd5e1;
    
    div.cost {
      color: #0fc179;
      transform: scale(1.05);
    }
  }
`,vp=ec.button`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: none;
  background: ${e=>e.$disabled?"#f1f5f9":"#ecfdf5"};
  color: ${e=>e.$disabled?"#94a3b8":"#059669"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${e=>e.$disabled?"not-allowed":"pointer"};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${e=>e.$disabled?"#f1f5f9":"#0fc179"};
    color: ${e=>e.$disabled?"#94a3b8":"white"};
    transform: ${e=>e.$disabled?"none":"scale(1.1) rotate(5deg)"};
    box-shadow: ${e=>e.$disabled?"none":"0 4px 8px rgba(15, 193, 121, 0.2)"};
  }
  
  &:active {
    transform: ${e=>e.$disabled?"none":"scale(0.95)"};
  }
`,xp=ec.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 1.75rem;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px dashed #cbd5e1;

  svg {
    color: #94a3b8;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #64748b;
    font-size: 0.8rem;
  }
`,wp=()=>{const{user:e,refreshUser:t}=jo(),{socket:r}=Xa(),o=ne(),[a,i]=(0,n.useState)([]),[s,l]=(0,n.useState)(!0),[c,u]=(0,n.useState)(null),[d,f]=(0,n.useState)(""),[p,h]=(0,n.useState)(!1);(0,n.useEffect)(()=>{m()},[]),(0,n.useEffect)(()=>{if(r&&e){const e=e=>{"withdrawal_approved"===e.reason?Ht.success(`Withdrawal approved! ${Math.abs(e.change)} points deducted.`):"withdrawal_rejected"===e.reason&&Ht.info(`Withdrawal rejected. ${e.change} points restored.`),t()};return r.on("pointsUpdated",e),()=>r.off("pointsUpdated",e)}},[r,e,t]);const m=async()=>{try{const e=localStorage.getItem("token"),t=await wo.get("/users/rewards",{headers:{Authorization:`Bearer ${e}`}});t.data.success&&i(t.data.rewards||[])}catch(e){console.error("Error fetching rewards:",e)}finally{l(!1)}},g=(null===e||void 0===e?void 0:e.points)||0,y=g;return(0,ko.jsxs)(np,{children:[(0,ko.jsxs)(op,{children:[(0,ko.jsxs)(ip,{children:[(0,ko.jsxs)(sp,{children:[(0,ko.jsxs)("div",{children:[(0,ko.jsx)("h2",{children:"My Balance"}),(0,ko.jsx)("span",{className:"subtitle",children:"Total available earnings"})]}),(0,ko.jsx)("div",{className:"icon-circle",children:(0,ko.jsx)(wd,{size:20})})]}),(0,ko.jsxs)(lp,{children:[(0,ko.jsxs)("div",{className:"main",children:[g.toLocaleString(),(0,ko.jsx)("span",{children:"pts"})]}),(0,ko.jsxs)("div",{className:"secondary",children:[(0,ko.jsx)(Ed,{size:14,fill:"#059669"}),"\u2248 \u20b9",y.toLocaleString()," INR"]})]}),(0,ko.jsxs)("div",{style:{marginTop:"1.5rem",display:"flex",gap:"0.75rem"},children:[(0,ko.jsxs)(fp,{style:{background:"#0f172a",flex:1,fontSize:"0.85rem"},onClick:()=>o("/payment-history"),children:[(0,ko.jsx)(ci,{size:16})," History"]}),(0,ko.jsxs)(fp,{style:{background:"#f1f5f9",color:"#0f172a",flex:1,fontSize:"0.85rem"},onClick:()=>o("/surveys"),children:[(0,ko.jsx)(Xf,{size:16})," Earn"]})]})]}),(0,ko.jsxs)(cp,{children:[(0,ko.jsxs)(up,{children:[(0,ko.jsxs)("h2",{children:[(0,ko.jsx)(kd,{size:20})," Cash Withdrawal"]}),(0,ko.jsx)("p",{children:"Transfer earnings to your bank account instantly. Minimum: 100 pts."}),(0,ko.jsxs)("div",{className:"bank-status",children:[(0,ko.jsx)("div",{className:"icon "+(null!==e&&void 0!==e&&e.accountNumber?"active":""),children:(0,ko.jsx)(_d,{size:18})}),(0,ko.jsxs)("div",{className:"details",children:[(0,ko.jsx)("strong",{children:null!==e&&void 0!==e&&e.accountNumber?"Bank Connected":"No Account Linked"}),(0,ko.jsx)("span",{children:null!==e&&void 0!==e&&e.accountNumber?`Ends in \u2022\u2022\u2022\u2022${e.accountNumber.slice(-4)}`:"Link account to withdraw"})]})]})]}),(0,ko.jsx)(dp,{children:null!==e&&void 0!==e&&e.accountNumber?(0,ko.jsxs)(ko.Fragment,{children:[(0,ko.jsx)("label",{children:"Amount to Withdraw"}),(0,ko.jsxs)("div",{className:"input-group",children:[(0,ko.jsx)("input",{type:"number",placeholder:"Points",min:"100",value:d,onChange:e=>f(e.target.value)}),(0,ko.jsx)(kd,{size:16})]}),(0,ko.jsxs)("div",{className:"summary",children:[(0,ko.jsx)("span",{children:"Receive:"}),(0,ko.jsxs)("span",{style:{fontWeight:"600",color:"#0f172a"},children:["\u20b9",d||0]})]}),(0,ko.jsxs)(fp,{$full:!0,onClick:async()=>{try{h(!0);const e=localStorage.getItem("token");(await wo.post("/users/withdrawal-request",{amount:parseInt(d)},{headers:{Authorization:`Bearer ${e}`}})).data.success&&(Ht.success("Withdrawal request submitted!"),f(""),t())}catch(n){var e,r;Ht.error((null===(e=n.response)||void 0===e||null===(r=e.data)||void 0===r?void 0:r.message)||"Failed to submit request")}finally{h(!1)}},$disabled:p||!d||d<100||d>g,children:[p?(0,ko.jsx)(Gf,{className:"spin",size:16}):(0,ko.jsx)(Jf,{size:16}),p?"Processing":"Withdraw"]})]}):(0,ko.jsxs)("div",{style:{textAlign:"center"},children:[(0,ko.jsx)("p",{style:{fontSize:"0.85rem",color:"#64748b",marginBottom:"1rem"},children:"Please connect a bank account"}),(0,ko.jsxs)(fp,{$full:!0,onClick:()=>o("/profile"),children:[(0,ko.jsx)(si,{size:16})," Link Now"]})]})})]})]}),(0,ko.jsxs)(pp,{children:[(0,ko.jsx)(ii,{size:20})," Available Rewards"]}),s?(0,ko.jsxs)(xp,{children:[(0,ko.jsx)(Gf,{size:32,style:{animation:"spin 1s linear infinite"}}),(0,ko.jsx)("p",{style:{marginTop:"0.5rem"},children:"Loading rewards..."})]}):a.length>0?(0,ko.jsx)(hp,{children:a.map(e=>{const r=g>=e.pointsCost,n=c===e.id;return(0,ko.jsxs)(mp,{children:[(0,ko.jsxs)(gp,{children:[(0,ko.jsx)(ii,{className:"reward-icon"}),e.brand&&(0,ko.jsx)("span",{className:"brand",children:e.brand})]}),(0,ko.jsxs)(yp,{children:[(0,ko.jsx)("h4",{children:e.name}),(0,ko.jsx)("p",{children:e.description}),(0,ko.jsxs)(bp,{children:[(0,ko.jsxs)("div",{className:"cost",children:[(0,ko.jsx)(Ed,{size:14,fill:"#059669"})," ",e.pointsCost]}),(0,ko.jsx)(vp,{$disabled:!r||n,onClick:()=>(async e=>{try{u(e);const r=localStorage.getItem("token");(await wo.post(`/users/rewards/${e}/redeem`,{},{headers:{Authorization:`Bearer ${r}`}})).data.success&&(Ht.success("Redeemed successfully! Check your email."),t(),m())}catch(o){var r,n;Ht.error((null===(r=o.response)||void 0===r||null===(n=r.data)||void 0===n?void 0:n.message)||"Failed to redeem")}finally{u(null)}})(e.id),children:n?(0,ko.jsx)(Gf,{size:18,className:"spin"}):(0,ko.jsx)(Zf,{size:18})})]})]})]},e.id)})}):(0,ko.jsxs)(xp,{children:[(0,ko.jsx)(ii,{size:40}),(0,ko.jsx)("p",{children:"No rewards available yet."})]}),(0,ko.jsx)("style",{children:"\n        .spin { animation: spin 1s linear infinite; }\n        @keyframes spin { 100% { transform: rotate(360deg); } }\n      "})]})},kp=ni("calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]),Sp=ni("shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]),jp=ni("pen",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]]),_p=ni("triangle-alert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),Ep=ni("globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]),Cp=tc`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`,Tp=ec.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1.25rem;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  min-height: calc(100vh - 80px);

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`,Rp=ec.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`,Pp=ec.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0fc179 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(15, 193, 121, 0.3);
`,zp=ec.div`
  flex: 1;

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 0.5rem 0;
  }

  div.meta {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    color: #64748b;
    font-size: 0.9rem;

    span {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
  }

  @media (max-width: 640px) {
    div.meta {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`,Np=ec.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,Op=ec.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  height: fit-content;
  animation: ${Cp} 0.5s ease-out;
`,Ap=ec.div`
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8fafc;

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: #0fc179;
    }
  }

  button.edit-btn {
    background: transparent;
    border: none;
    color: #64748b;
    cursor: pointer;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    transition: all 0.2s;

    &:hover {
      background: #e2e8f0;
      color: #0f172a;
    }
  }
`,Lp=ec.div`
  padding: 1.25rem;
`,Dp=ec.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }

  span.label {
    color: #64748b;
    font-size: 0.9rem;
  }

  span.value {
    color: #0f172a;
    font-weight: 500;
    font-size: 0.95rem;
  }
`,Ip=ec.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #475569;
    }

    input {
      padding: 0.6rem 0.8rem;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 0.95rem;
      color: #0f172a;
      transition: all 0.2s;

      &:focus {
        outline: none;
        border-color: #0fc179;
        box-shadow: 0 0 0 3px rgba(15, 193, 121, 0.1);
      }
    }
  }

  div.actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }
`,$p=ec.button`
  flex: 1;
  padding: 0.6rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &.primary {
    background: #0fc179;
    color: white;
    &:hover { background: #059669; }
  }

  &.secondary {
    background: #f1f5f9;
    color: #475569;
    &:hover { background: #e2e8f0; color: #0f172a; }
  }
  
  &.danger {
    background: #fee2e2;
    color: #dc2626;
    &:hover { background: #fecaca; }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,Fp=ec.span`
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: #ecfdf5;
  color: #059669;
  border: 1px solid #d1fae5;
`,Mp=()=>{var e,t;const{user:r,refreshUser:o,getUserProfile:a}=jo(),[i,s]=(ne(),(0,n.useState)(!1)),[l,c]=(0,n.useState)({totalPoints:0,memberSince:""}),[u,d]=(0,n.useState)(!1),[f,p]=(0,n.useState)({accountHolderName:"",accountNumber:"",ifscCode:""}),[h,m]=(0,n.useState)(!1),[g,y]=(0,n.useState)(!1),[b,v]=(0,n.useState)({current:"",new:"",confirm:""}),x=(0,n.useCallback)(async()=>{try{const{data:e}=await wo.get("/users/dashboard",{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}),t=new Date(e.dashboard.user.createdAt);c({totalPoints:e.dashboard.stats.totalPointsEarned||0,memberSince:t.toLocaleDateString("en-US",{month:"long",year:"numeric"})})}catch(mm){console.error(mm)}},[]),w=(0,n.useCallback)(async()=>{try{const{data:e}=await wo.get("/users/bank-details",{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});e.success&&e.bankDetails&&p({accountHolderName:e.bankDetails.accountHolderName||"",accountNumber:e.bankDetails.accountNumber||"",ifscCode:e.bankDetails.ifscCode||""})}catch(mm){console.error(mm)}},[]);(0,n.useEffect)(()=>{r&&(x(),w())},[r,x,w]);return(0,ko.jsxs)(Tp,{children:[(0,ko.jsxs)(Rp,{children:[(0,ko.jsx)(Pp,{children:(null===r||void 0===r||null===(e=r.name)||void 0===e?void 0:e.charAt(0).toUpperCase())||(0,ko.jsx)(si,{})}),(0,ko.jsxs)(zp,{children:[(0,ko.jsx)("h1",{children:null===r||void 0===r?void 0:r.name}),(0,ko.jsxs)("div",{className:"meta",children:[(0,ko.jsxs)("span",{children:[(0,ko.jsx)(wc,{size:16})," ",null===r||void 0===r?void 0:r.email]}),(0,ko.jsxs)("span",{children:[(0,ko.jsx)(kp,{size:16})," Member since ",l.memberSince]}),(0,ko.jsx)(Fp,{children:"Active Member"})]})]})]}),(0,ko.jsxs)(Np,{children:[(0,ko.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[(0,ko.jsxs)(Op,{children:[(0,ko.jsx)(Ap,{children:(0,ko.jsxs)("h3",{children:[(0,ko.jsx)(si,{size:18})," Personal Info"]})}),(0,ko.jsxs)(Lp,{children:[(0,ko.jsxs)(Dp,{children:[(0,ko.jsx)("span",{className:"label",children:"Full Name"}),(0,ko.jsx)("span",{className:"value",children:null===r||void 0===r?void 0:r.name})]}),(0,ko.jsxs)(Dp,{children:[(0,ko.jsx)("span",{className:"label",children:"Email Address"}),(0,ko.jsx)("span",{className:"value",children:null===r||void 0===r?void 0:r.email})]}),(0,ko.jsxs)(Dp,{children:[(0,ko.jsx)("span",{className:"label",children:"Account ID"}),(0,ko.jsxs)("span",{className:"value",children:["#",null===r||void 0===r||null===(t=r._id)||void 0===t?void 0:t.slice(-6).toUpperCase()]})]}),(0,ko.jsxs)(Dp,{children:[(0,ko.jsx)("span",{className:"label",children:"Total Points Earned"}),(0,ko.jsxs)("span",{className:"value",style:{color:"#059669"},children:[l.totalPoints," pts"]})]})]})]}),(0,ko.jsxs)(Op,{children:[(0,ko.jsxs)(Ap,{children:[(0,ko.jsxs)("h3",{children:[(0,ko.jsx)(Sp,{size:18})," Security"]}),(0,ko.jsx)("button",{className:"edit-btn",onClick:()=>y(!g),children:g?"Cancel":"Change Password"})]}),(0,ko.jsx)(Lp,{children:g?(0,ko.jsxs)(Ip,{children:[(0,ko.jsxs)("div",{className:"form-group",children:[(0,ko.jsx)("label",{children:"Current Password"}),(0,ko.jsx)("input",{type:"password",value:b.current,onChange:e=>v({...b,current:e.target.value})})]}),(0,ko.jsxs)("div",{className:"form-group",children:[(0,ko.jsx)("label",{children:"New Password"}),(0,ko.jsx)("input",{type:"password",value:b.new,onChange:e=>v({...b,new:e.target.value})})]}),(0,ko.jsxs)("div",{className:"actions",children:[(0,ko.jsx)($p,{className:"secondary",onClick:()=>y(!1),children:"Cancel"}),(0,ko.jsx)($p,{className:"primary",children:"Update Password"})]})]}):(0,ko.jsxs)("div",{style:{padding:"1rem",textAlign:"center",color:"#64748b",fontSize:"0.9rem"},children:[(0,ko.jsx)(_u,{size:32,style:{marginBottom:"0.5rem",opacity:.5}}),(0,ko.jsx)("p",{children:"Your account is secured with a password."})]})})]})]}),(0,ko.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[(0,ko.jsxs)(Op,{children:[(0,ko.jsxs)(Ap,{children:[(0,ko.jsxs)("h3",{children:[(0,ko.jsx)(_d,{size:18})," Banking Details"]}),(0,ko.jsxs)("button",{className:"edit-btn",onClick:()=>d(!u),children:[(0,ko.jsx)(jp,{size:14})," ",u?"Cancel":"Edit"]})]}),(0,ko.jsx)(Lp,{children:u?(0,ko.jsxs)(Ip,{children:[(0,ko.jsxs)("div",{className:"form-group",children:[(0,ko.jsx)("label",{children:"Account Holder Name"}),(0,ko.jsx)("input",{value:f.accountHolderName,onChange:e=>p({...f,accountHolderName:e.target.value}),placeholder:"As per bank records"})]}),(0,ko.jsxs)("div",{className:"form-group",children:[(0,ko.jsx)("label",{children:"Account Number"}),(0,ko.jsx)("input",{value:f.accountNumber,onChange:e=>p({...f,accountNumber:e.target.value}),placeholder:"Enter account number"})]}),(0,ko.jsxs)("div",{className:"form-group",children:[(0,ko.jsx)("label",{children:"IFSC Code"}),(0,ko.jsx)("input",{value:f.ifscCode,onChange:e=>p({...f,ifscCode:e.target.value.toUpperCase()}),placeholder:"e.g. HDFC0001234"})]}),(0,ko.jsxs)("div",{className:"actions",children:[(0,ko.jsx)($p,{className:"secondary",onClick:()=>{d(!1),w()},children:"Cancel"}),(0,ko.jsx)($p,{className:"primary",onClick:async()=>{m(!0);try{await wo.post("/users/bank-details",f,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}),Ht.success("Bank details updated!"),d(!1),o()}catch(mm){var e,t;Ht.error((null===(e=mm.response)||void 0===e||null===(t=e.data)||void 0===t?void 0:t.message)||"Update failed")}finally{m(!1)}},disabled:h,children:h?"Saving...":"Save Details"})]})]}):(0,ko.jsx)(ko.Fragment,{children:f.accountNumber?(0,ko.jsxs)(ko.Fragment,{children:[(0,ko.jsxs)(Dp,{children:[(0,ko.jsx)("span",{className:"label",children:"Beneficiary"}),(0,ko.jsx)("span",{className:"value",children:f.accountHolderName})]}),(0,ko.jsxs)(Dp,{children:[(0,ko.jsx)("span",{className:"label",children:"Account Number"}),(0,ko.jsxs)("span",{className:"value",children:["\u2022\u2022\u2022\u2022 ",f.accountNumber.slice(-4)]})]}),(0,ko.jsxs)(Dp,{children:[(0,ko.jsx)("span",{className:"label",children:"IFSC Code"}),(0,ko.jsx)("span",{className:"value",children:f.ifscCode})]}),(0,ko.jsxs)("div",{style:{marginTop:"1rem",padding:"0.75rem",background:"#ecfdf5",borderRadius:"8px",color:"#059669",fontSize:"0.85rem",display:"flex",gap:"0.5rem",alignItems:"center"},children:[(0,ko.jsx)(uf,{size:16})," Bank account verified and linked."]})]}):(0,ko.jsxs)("div",{style:{textAlign:"center",padding:"2rem 1rem"},children:[(0,ko.jsx)(_p,{size:32,color:"#fbbf24",style:{marginBottom:"0.5rem"}}),(0,ko.jsx)("p",{style:{color:"#475569",fontSize:"0.9rem",marginBottom:"1rem"},children:"No bank account linked yet."}),(0,ko.jsx)($p,{className:"primary",onClick:()=>d(!0),children:"Link Bank Account"})]})})})]}),(0,ko.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"},children:[(0,ko.jsxs)(Op,{style:{padding:"1rem",textAlign:"center"},children:[(0,ko.jsx)(Xf,{size:24,color:"#0fc179",style:{marginBottom:"0.5rem"}}),(0,ko.jsx)("div",{style:{fontSize:"1.5rem",fontWeight:"700",color:"#0f172a"},children:l.totalPoints}),(0,ko.jsx)("div",{style:{fontSize:"0.8rem",color:"#64748b"},children:"Lifetime Earnings"})]}),(0,ko.jsxs)(Op,{style:{padding:"1rem",textAlign:"center"},children:[(0,ko.jsx)(Ep,{size:24,color:"#3b82f6",style:{marginBottom:"0.5rem"}}),(0,ko.jsx)("div",{style:{fontSize:"1.5rem",fontWeight:"700",color:"#0f172a"},children:"Active"}),(0,ko.jsx)("div",{style:{fontSize:"0.8rem",color:"#64748b"},children:"Account Status"})]})]})]})]})]})},Bp=ni("circle-x",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]),Up=ni("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]),qp=ni("funnel",[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]]),Hp=tc`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`,Wp=ec.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.75rem 1.25rem;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  min-height: calc(100vh - 80px);

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`,Vp=ec.div`
  background: linear-gradient(135deg, #0fc179 0%, #059669 100%);
  border-radius: 10px;
  padding: 1rem 1.5rem;
  color: white;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(15, 193, 121, 0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  
  div.icon-box {
    width: 42px;
    height: 42px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
  }

  div.content {
    h1 {
      font-size: 1.15rem;
      font-weight: 700;
      margin: 0 0 0.15rem 0;
      letter-spacing: -0.02em;
    }
    p {
      margin: 0;
      font-size: 0.85rem;
      opacity: 0.9;
    }
  }
`,Yp=ec.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`,Kp=ec.div`
  display: flex;
  background: white;
  padding: 0.25rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
`,Qp=ec.button`
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
  border: none;
  background: ${e=>e.$active?"#0fc179":"transparent"};
  color: ${e=>e.$active?"white":"#64748b"};
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${e=>e.$active?"white":"#0f172a"};
    background: ${e=>e.$active?"#0fc179":"#f1f5f9"};
  }
`,Xp=ec.select`
  padding: 0.4rem 1.75rem 0.4rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #1e293b;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23059669' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;

  &:focus {
    border-color: #0fc179;
    box-shadow: 0 0 0 3px rgba(15, 193, 121, 0.1);
  }
`,Gp=ec.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: ${Hp} 0.4s ease-out;
`,Jp=ec.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-1px);
    border-color: #0fc179;
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.05);
  }

  /* Status Indicator Line */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${e=>e.$statusColor};
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`,Zp=ec.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: ${e=>e.$bg};
  color: ${e=>e.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 640px) {
    display: none;
  }
`,eh=ec.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  h4 {
    margin: 0;
    color: #0f172a;
    font-size: 0.85rem;
    font-weight: 600;
  }

  div.meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.75rem;
    color: #64748b;

    span {
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }
  }

  code {
    font-size: 0.7rem;
    background: #f1f5f9;
    padding: 0.1rem 0.35rem;
    border-radius: 4px;
    color: #0f172a;
    border: 1px solid #e2e8f0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    width: fit-content;

    &:hover {
      background: #e2e8f0;
      border-color: #cbd5e1;
    }
  }
`,th=ec.div`
  text-align: right;
  
  div.value {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
  }

  div.status {
    font-size: 0.7rem;
    font-weight: 600;
    margin-top: 0.2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    padding: 0.1rem 0.4rem;
    border-radius: 9999px;
    background: ${e=>e.$statusBg};
    color: ${e=>e.$statusColor};
  }

  @media (max-width: 640px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    border-top: 1px solid #f0fdf4;
    padding-top: 0.75rem;
  }
`,rh=ec.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
  
  button {
    background: white;
    border: 1px solid #e2e8f0;
    color: #64748b;
    padding: 0.4rem;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    &:hover:not(:disabled) {
      background: #f8fafc;
      border-color: #cbd5e1;
      color: #0f172a;
    }
  }

  span {
    font-size: 0.8rem;
    font-weight: 600;
    color: #475569;
  }
`,nh=ec.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  border: 1px dashed #e2e8f0;
  color: #64748b;

  svg {
    opacity: 0.5;
    margin-bottom: 0.5rem;
    color: #94a3b8;
  }
  
  p {
    font-size: 0.85rem;
  }
`,oh=()=>{const{user:e}=jo(),{socket:t}=Xa(),[r,o]=(0,n.useState)("withdrawals"),[a,i]=(0,n.useState)([]),[s,l]=(0,n.useState)(!0),[c,u]=(0,n.useState)(1),[d,f]=(0,n.useState)(1),[p,h]=(0,n.useState)("all"),[m,g]=(0,n.useState)([]),[y,b]=(0,n.useState)(!0),[v,x]=(0,n.useState)(1),[w,k]=(0,n.useState)(1),[S,j]=(0,n.useState)("all"),_=(0,n.useCallback)(async()=>{try{var e;l(!0);const t={page:c,limit:10,sortBy:"requestDate",sortOrder:"desc",..."all"!==p&&{status:p}},r=await wo.get("/users/withdrawal-history",{params:t,headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});i(r.data.withdrawalHistory||[]),f((null===(e=r.data.pagination)||void 0===e?void 0:e.totalPages)||1)}catch(t){console.error("Fetch withdrawals error:",t),Ht.error("Failed to load transaction history")}finally{l(!1)}},[c,p]),E=(0,n.useCallback)(async()=>{try{var e;b(!0);const t={page:v,limit:10,..."all"!==S&&{status:S}},r=await wo.get("/users/rewards/history",{params:t,headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});g(r.data.redemptions||[]),k((null===(e=r.data.pagination)||void 0===e?void 0:e.totalPages)||1)}catch(t){console.error("Fetch redemptions error:",t)}finally{b(!1)}},[v,S]);(0,n.useEffect)(()=>{"withdrawals"===r?_():E()},[r,_,E]),(0,n.useEffect)(()=>{if(t&&e){const e=()=>{"withdrawals"===r?_():E()};return t.on("pointsUpdated",e),()=>t.off("pointsUpdated",e)}},[t,e,r,_,E]);const C=e=>{switch(e){case"approved":case"delivered":case"processed":return"#0fc179";case"pending":case"processing":return"#f59e0b";case"rejected":case"cancelled":case"expired":return"#ef4444";default:return"#94a3b8"}},T=e=>{const t=C(e),r=`${t}15`;let n=Cd;return"approved"!==e&&"delivered"!==e&&"processed"!==e||(n=uf),"rejected"!==e&&"cancelled"!==e||(n=Bp),(0,ko.jsxs)("div",{className:"status",style:{background:r,color:t},children:[(0,ko.jsx)(n,{size:12})," ",e.charAt(0).toUpperCase()+e.slice(1)]})};return(0,ko.jsxs)(Wp,{children:[(0,ko.jsxs)(Vp,{children:[(0,ko.jsx)("div",{className:"icon-box",children:(0,ko.jsx)(ci,{size:28,color:"white"})}),(0,ko.jsxs)("div",{className:"content",children:[(0,ko.jsx)("h1",{children:"Transaction History"}),(0,ko.jsx)("p",{children:"View details of your past earnings and reward redemptions."})]})]}),(0,ko.jsxs)(Yp,{children:[(0,ko.jsxs)(Kp,{children:[(0,ko.jsx)(Qp,{$active:"withdrawals"===r,onClick:()=>{o("withdrawals"),u(1)},children:"Cash Withdrawals"}),(0,ko.jsx)(Qp,{$active:"redemptions"===r,onClick:()=>{o("redemptions"),x(1)},children:"Gift Redemptions"})]}),(0,ko.jsxs)("div",{style:{display:"flex",gap:"0.5rem",alignItems:"center"},children:[(0,ko.jsx)(qp,{size:16,color:"#059669"}),(0,ko.jsxs)(Xp,{value:"withdrawals"===r?p:S,onChange:e=>"withdrawals"===r?h(e.target.value):j(e.target.value),children:[(0,ko.jsx)("option",{value:"all",children:"All Status"}),(0,ko.jsx)("option",{value:"pending",children:"Pending"}),(0,ko.jsx)("option",{value:"approved",children:"Approved"}),(0,ko.jsx)("option",{value:"rejected",children:"Rejected"})]})]})]}),(()=>{const e="withdrawals"===r?a:m;return("withdrawals"===r?s:y)?(0,ko.jsxs)("div",{style:{textAlign:"center",padding:"4rem",color:"#0fc179"},children:[(0,ko.jsx)(Gf,{size:40,style:{animation:"spin 1s linear infinite"}}),(0,ko.jsx)("style",{children:"@keyframes spin { 100% { transform: rotate(360deg); } }"})]}):0===e.length?(0,ko.jsxs)(nh,{children:[(0,ko.jsx)(ci,{size:48}),(0,ko.jsx)("p",{children:"No transactions found for this category."})]}):(0,ko.jsx)(Gp,{children:e.map(e=>{var t,n,o,a;const i="withdrawals"===r,s=C(e.status);return(0,ko.jsxs)(Jp,{$statusColor:s,children:[(0,ko.jsx)(Zp,{$bg:i?"#f0fdf4":"#ecfdf5",$color:"#059669",children:i?(0,ko.jsx)(Tf,{size:20}):(0,ko.jsx)(ii,{size:20})}),(0,ko.jsxs)(eh,{children:[(0,ko.jsx)("h4",{children:i?`Withdrawal to ${(null===(t=e.bankDetails)||void 0===t?void 0:t.bankName)||"Bank"}`:(null===(n=e.Reward)||void 0===n?void 0:n.name)||"Reward Redemption"}),(0,ko.jsxs)("div",{className:"meta",children:[(0,ko.jsxs)("span",{children:[(0,ko.jsx)(kp,{size:14})," ",new Date(i?e.requestDate:e.createdAt).toLocaleDateString()]}),(0,ko.jsxs)("span",{children:[(0,ko.jsx)(Cd,{size:14})," ",new Date(i?e.requestDate:e.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})]})]}),i&&e.rejectionReason&&(0,ko.jsxs)("div",{style:{fontSize:"0.8rem",color:"#ef4444",marginTop:"0.25rem"},children:["Reason: ",e.rejectionReason]}),!i&&"delivered"===e.status&&(e.voucherCode||(null===(o=e.voucher)||void 0===o?void 0:o.code))&&(0,ko.jsxs)("code",{onClick:()=>{var t,r;return r=e.voucherCode||(null===(t=e.voucher)||void 0===t?void 0:t.code),navigator.clipboard.writeText(r),void Ht.success("Code copied!")},children:[(0,ko.jsx)(Up,{size:12})," ",e.voucherCode||(null===(a=e.voucher)||void 0===a?void 0:a.code)]})]}),(0,ko.jsxs)(th,{$statusColor:s,$statusBg:`${s}15`,children:[(0,ko.jsx)("div",{className:"value",children:i?`\u20b9${e.amount}`:`-${e.pointsSpent} pts`}),T(e.status)]})]},e.id)})})})(),("withdrawals"===r&&d>1||"redemptions"===r&&w>1)&&(0,ko.jsxs)(rh,{children:[(0,ko.jsx)("button",{disabled:"withdrawals"===r?1===c:1===v,onClick:()=>"withdrawals"===r?u(e=>e-1):x(e=>e-1),children:(0,ko.jsx)(Pf,{size:16})}),(0,ko.jsxs)("span",{children:["Page ","withdrawals"===r?c:v," of ","withdrawals"===r?d:w]}),(0,ko.jsx)("button",{disabled:"withdrawals"===r?c===d:v===w,onClick:()=>"withdrawals"===r?u(e=>e+1):x(e=>e+1),children:(0,ko.jsx)(Td,{size:16})})]})]})},ah=ec.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 160px);
  padding: 2rem;
  background-color: #f8fafc;
`,ih=ec.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 500px;
`,sh=ec.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    color: #0fc179;
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
  }
  
  p {
    color: #64748b;
    font-size: 1rem;
  }
`,lh=ec.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,ch=ec.div`
  position: relative;
  display: flex;
  align-items: center;
`,uh=ec.div`
  position: absolute;
  left: 1rem;
  color: #64748b;
`,dh=ec.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #0fc179;
  }
`,fh=ec.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  
  input {
    width: 3rem;
    height: 3rem;
    text-align: center;
    font-size: 1.5rem;
    border: 1px solid #666666;
    border-radius: 8px;
    
    &:focus {
      outline: none;
      border-color: #0fc179;
    }
  }
`,ph=ec.button`
  background: #0fc179;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: #0fc179;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,hh=ec.button`
  background: transparent;
  color: #0fc179;
  padding: 0.5rem;
  border: 1px solid #0fc179;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  
  &:hover {
    background: #e6f9f3;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,mh=ec(st)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  color: #0fc179;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`,gh=ec.div`
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`,yh=ec.div`
  background-color: #dcfce7;
  color: #166534;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`,bh=ec.div`
  text-align: center;
  margin-top: 1rem;
  color: #64748b;
  font-size: 0.9rem;
`,vh=()=>{var e,t;const r=ne(),o=ee(),{verifyEmail:a,completeRegistration:i,sendVerificationEmail:s,resendRegistrationEmail:l}=jo(),c=null===(e=o.state)||void 0===e?void 0:e.email,u=(null===(t=o.state)||void 0===t?void 0:t.isRegistration)||!1,[d,f]=(0,n.useState)(c||""),[p,h]=(0,n.useState)(["","","","","",""]),[m,g]=(0,n.useState)(!1),[y,b]=(0,n.useState)(!1),[v,x]=(0,n.useState)(""),[w,k]=(0,n.useState)(""),[S,j]=(0,n.useState)(0),_=Array(6).fill(0).map(()=>n.createRef());(0,n.useEffect)(()=>{if(S>0){const e=setTimeout(()=>j(S-1),1e3);return()=>clearTimeout(e)}},[S]);return(0,ko.jsx)(ah,{children:(0,ko.jsxs)(ih,{children:[(0,ko.jsxs)(sh,{children:[(0,ko.jsx)("h1",{children:"Verify Your Email"}),(0,ko.jsx)("p",{children:"Enter the 6-digit code sent to your email"})]}),v&&(0,ko.jsx)(gh,{children:v}),w&&(0,ko.jsx)(yh,{children:w}),(0,ko.jsxs)(lh,{onSubmit:async e=>{if(e.preventDefault(),x(""),k(""),!d)return void x("Email is required");const t=p.join("");if(6===t.length){g(!0);try{const e=u?await i(d,t):await a(d,t);e.success?(k(u?"Registration completed successfully!":"Email verified successfully!"),setTimeout(()=>{r("/dashboard")},2e3)):x(e.message||"Verification failed")}catch(v){var n,o;x((null===(n=v.response)||void 0===n||null===(o=n.data)||void 0===o?void 0:o.message)||"An error occurred. Please try again later."),console.error("Email verification error:",v)}finally{g(!1)}}else x("Please enter the complete 6-digit OTP")},children:[(0,ko.jsxs)(ch,{children:[(0,ko.jsx)(uh,{children:(0,ko.jsx)(Qc,{})}),(0,ko.jsx)(dh,{type:"email",placeholder:"Email Address",value:d,onChange:e=>f(e.target.value),required:!0,readOnly:!!c})]}),(0,ko.jsx)(fh,{children:p.map((e,t)=>(0,ko.jsx)("input",{type:"text",maxLength:"1",value:e,onChange:e=>((e,t)=>{if(t&&!/^\d+$/.test(t))return;const r=[...p];r[e]=t,h(r),t&&e<5&&_[e+1].current.focus()})(t,e.target.value),onKeyDown:e=>((e,t)=>{"Backspace"===t.key&&!p[e]&&e>0&&_[e-1].current.focus()})(t,e),ref:_[t],required:!0},t))}),(0,ko.jsx)(ph,{type:"submit",disabled:m,children:m?"Verifying...":(0,ko.jsxs)(ko.Fragment,{children:[(0,ko.jsx)(Vc,{})," Verify Email"]})})]}),S>0?(0,ko.jsxs)(bh,{children:["Resend code in ",S," seconds"]}):(0,ko.jsxs)(hh,{type:"button",onClick:async()=>{if(x(""),k(""),d){b(!0);try{let e;e=u?await l(d):await s(d),e.success?(k("Verification email sent successfully!"),j(60)):x(e.message||"Failed to resend verification email")}catch(v){x("An error occurred. Please try again later."),console.error("Resend verification email error:",v)}finally{b(!1)}}else x("Email is required")},disabled:y||S>0,children:[(0,ko.jsx)(tu,{})," Resend Verification Code"]}),(0,ko.jsxs)(mh,{to:"/login",children:[(0,ko.jsx)(Uc,{})," Back to Login"]})]})})},xh=ec.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 160px);
  padding: 2rem;
  background-color: #f8fafc;
`,wh=ec.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 500px;
`,kh=ec.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    color: #0fc179;
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
  }
  
  p {
    color: #64748b;
    font-size: 1rem;
  }
`,Sh=ec.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,jh=ec.div`
  position: relative;
  display: flex;
  align-items: center;
`,_h=ec.div`
  position: absolute;
  left: 1rem;
  color: #64748b;
`,Eh=ec.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #0fc179;
  }
`,Ch=ec.button`
  background: #0fc179;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #0fc179;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,Th=ec(st)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  color: #0fc179;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`,Rh=ec.div`
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`,Ph=ec.div`
  background-color: #dcfce7;
  color: #166534;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`,zh=()=>{const e=ne(),{forgotPassword:t}=jo(),[r,o]=(0,n.useState)(""),[a,i]=(0,n.useState)(!1),[s,l]=(0,n.useState)(""),[c,u]=(0,n.useState)("");return(0,ko.jsx)(xh,{children:(0,ko.jsxs)(wh,{children:[(0,ko.jsxs)(kh,{children:[(0,ko.jsx)("h1",{children:"Forgot Password"}),(0,ko.jsx)("p",{children:"Enter your email to receive a password reset code"})]}),s&&(0,ko.jsx)(Rh,{children:s}),c&&(0,ko.jsx)(Ph,{children:c}),(0,ko.jsxs)(Sh,{onSubmit:async n=>{if(n.preventDefault(),l(""),u(""),r){i(!0);try{const n=await t(r);if(n.success){u("If an account with that email exists, a password reset OTP has been sent. Please check your email.");try{const t=await fetch("/api/auth/check-user-type",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:r})});(await t.json()).isGoogleUser?setTimeout(()=>{e("/set-password",{state:{email:r}})},3e3):setTimeout(()=>{e("/reset-password",{state:{email:r}})},3e3)}catch(a){setTimeout(()=>{e("/reset-password",{state:{email:r}})},3e3)}o("")}else l(n.message||"Failed to send password reset email")}catch(s){l("An error occurred. Please try again later."),console.error("Forgot password error:",s)}finally{i(!1)}}else l("Please enter your email address")},children:[(0,ko.jsxs)(jh,{children:[(0,ko.jsx)(_h,{children:(0,ko.jsx)(Qc,{})}),(0,ko.jsx)(Eh,{type:"email",placeholder:"Email Address",value:r,onChange:e=>o(e.target.value),required:!0})]}),(0,ko.jsx)(Ch,{type:"submit",disabled:a,children:a?"Sending...":"Send Reset Code"})]}),(0,ko.jsxs)(Th,{to:"/login",children:[(0,ko.jsx)(Uc,{})," Back to Login"]})]})})},Nh=ec.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 160px);
  padding: 2rem;
  background-color: #f8fafc;
`,Oh=ec.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 500px;
`,Ah=ec.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    color: #0fc179;
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
  }
  
  p {
    color: #64748b;
    font-size: 1rem;
  }
`,Lh=ec.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,Dh=ec.div`
  position: relative;
  display: flex;
  align-items: center;
`,Ih=ec.div`
  position: absolute;
  left: 1rem;
  color: #64748b;
`,$h=ec.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #0fc179;
  }
`,Fh=ec.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
`,Mh=ec.button`
  background: #0fc179;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #0fc179;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,Bh=ec(st)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  color: #0fc179;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`,Uh=ec.div`
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`,qh=ec.div`
  background-color: #dcfce7;
  color: #166534;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`,Hh=()=>{var e;const t=ne(),r=ee(),{resetPassword:o}=jo(),a=null===(e=r.state)||void 0===e?void 0:e.email,[i,s]=(0,n.useState)({email:a||"",otp:"",newPassword:"",confirmPassword:""}),[l,c]=(0,n.useState)(!1),[u,d]=(0,n.useState)(!1),[f,p]=(0,n.useState)(!1),[h,m]=(0,n.useState)(""),[g,y]=(0,n.useState)(""),b=e=>{const{name:t,value:r}=e.target;s(e=>({...e,[t]:r}))};return(0,ko.jsx)(Nh,{children:(0,ko.jsxs)(Oh,{children:[(0,ko.jsxs)(Ah,{children:[(0,ko.jsx)("h1",{children:"Reset Password"}),(0,ko.jsx)("p",{children:"Enter the OTP sent to your email and your new password"})]}),h&&(0,ko.jsx)(Uh,{children:h}),g&&(0,ko.jsx)(qh,{children:g}),(0,ko.jsxs)(Lh,{onSubmit:async e=>{if(e.preventDefault(),m(""),y(""),i.email&&i.otp&&i.newPassword&&i.confirmPassword)if(i.newPassword.length<6)m("Password must be at least 6 characters");else if(i.newPassword===i.confirmPassword){p(!0);try{const e=await o(i.email,i.otp,i.newPassword);e.success?(y("Password reset successful! Redirecting to login..."),s({email:"",otp:"",newPassword:"",confirmPassword:""}),setTimeout(()=>{t("/login")},2e3)):m(e.message||"Failed to reset password")}catch(h){var r,n;m((null===(r=h.response)||void 0===r||null===(n=r.data)||void 0===n?void 0:n.message)||"An error occurred. Please try again later."),console.error("Reset password error:",h)}finally{p(!1)}}else m("Passwords do not match");else m("All fields are required")},children:[(0,ko.jsxs)(Dh,{children:[(0,ko.jsx)(Ih,{children:(0,ko.jsx)(Qc,{})}),(0,ko.jsx)($h,{type:"email",name:"email",placeholder:"Email Address",value:i.email,onChange:b,required:!0,readOnly:!!a})]}),(0,ko.jsxs)(Dh,{children:[(0,ko.jsx)(Ih,{children:(0,ko.jsx)(eu,{})}),(0,ko.jsx)($h,{type:"text",name:"otp",placeholder:"OTP Code",value:i.otp,onChange:b,required:!0})]}),(0,ko.jsxs)(Dh,{children:[(0,ko.jsx)(Ih,{children:(0,ko.jsx)(eu,{})}),(0,ko.jsx)($h,{type:l?"text":"password",name:"newPassword",placeholder:"New Password (min. 6 characters)",value:i.newPassword,onChange:b,required:!0}),(0,ko.jsx)(Fh,{type:"button",onClick:()=>c(!l),children:l?(0,ko.jsx)(Gc,{}):(0,ko.jsx)(Jc,{})})]}),(0,ko.jsxs)(Dh,{children:[(0,ko.jsx)(Ih,{children:(0,ko.jsx)(eu,{})}),(0,ko.jsx)($h,{type:u?"text":"password",name:"confirmPassword",placeholder:"Confirm New Password",value:i.confirmPassword,onChange:b,required:!0}),(0,ko.jsx)(Fh,{type:"button",onClick:()=>d(!u),children:u?(0,ko.jsx)(Gc,{}):(0,ko.jsx)(Jc,{})})]}),(0,ko.jsx)(Mh,{type:"submit",disabled:f,children:f?"Resetting...":"Reset Password"})]}),(0,ko.jsxs)(Bh,{to:"/login",children:[(0,ko.jsx)(Uc,{})," Back to Login"]})]})})},Wh=ec.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 160px);
  padding: 2rem;
  background-color: #f8fafc;
`,Vh=ec.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 500px;
`,Yh=ec.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    color: #0fc179;
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
  }
  
  p {
    color: #64748b;
    font-size: 1rem;
  }
`,Kh=ec.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,Qh=ec.div`
  position: relative;
  display: flex;
  align-items: center;
`,Xh=ec.div`
  position: absolute;
  left: 1rem;
  color: #64748b;
`,Gh=ec.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #0fc179;
  }
`,Jh=ec.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    color: #0fc179;
  }
`,Zh=ec.button`
  background: #0fc179;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #0fc179;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,em=ec(st)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  color: #0fc179;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`,tm=ec.div`
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`,rm=ec.div`
  background-color: #dcfce7;
  color: #166534;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`,nm=ec.div`
  background-color: #ccf3e7;
  color: #0fc179;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`,om=()=>{var e;const t=ne(),r=ee(),{setPasswordForGoogleUser:o}=jo(),a=null===(e=r.state)||void 0===e?void 0:e.email,[i,s]=(0,n.useState)({email:a||"",otp:"",newPassword:"",confirmPassword:""}),[l,c]=(0,n.useState)(!1),[u,d]=(0,n.useState)(!1),[f,p]=(0,n.useState)(!1),[h,m]=(0,n.useState)(""),[g,y]=(0,n.useState)(""),b=e=>{const{name:t,value:r}=e.target;s(e=>({...e,[t]:r}))};return(0,ko.jsx)(Wh,{children:(0,ko.jsxs)(Vh,{children:[(0,ko.jsxs)(Yh,{children:[(0,ko.jsx)("h1",{children:"Set Password"}),(0,ko.jsx)("p",{children:"Set a password for your Google account to enable email/password login"})]}),(0,ko.jsx)(nm,{children:"A verification code has been sent to your email. Enter it below along with your new password."}),h&&(0,ko.jsx)(tm,{children:h}),g&&(0,ko.jsx)(rm,{children:g}),(0,ko.jsxs)(Kh,{onSubmit:async e=>{if(e.preventDefault(),m(""),y(""),i.email&&i.otp&&i.newPassword&&i.confirmPassword)if(i.newPassword.length<6)m("Password must be at least 6 characters");else if(i.newPassword===i.confirmPassword){p(!0);try{const e=await o(i.email,i.otp,i.newPassword);e.success?(y("Password set successfully! You can now login with email and password. Redirecting to login..."),s({email:"",otp:"",newPassword:"",confirmPassword:""}),setTimeout(()=>{t("/login")},3e3)):m(e.message||"Failed to set password")}catch(h){var r,n;m((null===(r=h.response)||void 0===r||null===(n=r.data)||void 0===n?void 0:n.message)||"An error occurred. Please try again later."),console.error("Set password error:",h)}finally{p(!1)}}else m("Passwords do not match");else m("All fields are required")},children:[(0,ko.jsxs)(Qh,{children:[(0,ko.jsx)(Xh,{children:(0,ko.jsx)(Qc,{})}),(0,ko.jsx)(Gh,{type:"email",name:"email",placeholder:"Email Address",value:i.email,onChange:b,required:!0,readOnly:!!a})]}),(0,ko.jsxs)(Qh,{children:[(0,ko.jsx)(Xh,{children:(0,ko.jsx)(ru,{})}),(0,ko.jsx)(Gh,{type:"text",name:"otp",placeholder:"OTP Code",value:i.otp,onChange:b,required:!0})]}),(0,ko.jsxs)(Qh,{children:[(0,ko.jsx)(Xh,{children:(0,ko.jsx)(eu,{})}),(0,ko.jsx)(Gh,{type:l?"text":"password",name:"newPassword",placeholder:"New Password (min. 6 characters)",value:i.newPassword,onChange:b,required:!0}),(0,ko.jsx)(Jh,{type:"button",onClick:()=>c(!l),children:l?(0,ko.jsx)(Gc,{}):(0,ko.jsx)(Jc,{})})]}),(0,ko.jsxs)(Qh,{children:[(0,ko.jsx)(Xh,{children:(0,ko.jsx)(eu,{})}),(0,ko.jsx)(Gh,{type:u?"text":"password",name:"confirmPassword",placeholder:"Confirm New Password",value:i.confirmPassword,onChange:b,required:!0}),(0,ko.jsx)(Jh,{type:"button",onClick:()=>d(!u),children:u?(0,ko.jsx)(Gc,{}):(0,ko.jsx)(Jc,{})})]}),(0,ko.jsx)(Zh,{type:"submit",disabled:f,children:f?"Setting Password...":"Set Password"})]}),(0,ko.jsxs)(em,{to:"/login",children:[(0,ko.jsx)(Uc,{})," Back to Login"]})]})})},am=ec.div`
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem 1rem;
`,im=ec.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`,sm=ec.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0fc179;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,lm=ec.p`
  color: #64748b;
  font-size: 1rem;
  margin: 0;
`,cm=(ec.p`
  color: #ef4444;
  font-size: 1rem;
  margin: 0;
`,()=>{const e=ne(),[t]=dt(),{setAuthenticatedUser:r}=jo();return(0,n.useEffect)(()=>{(async()=>{try{const o=t.get("token"),a=t.get("error");if(a)return console.error("OAuth error:",a),void e("/login?error=Authentication failed. Please try again.");if(o){localStorage.setItem("token",o);try{JSON.parse(atob(o.split(".")[1]));const t=await wo.get("/users/profile",{headers:{Authorization:`Bearer ${o}`}});if(!t.data.success||!t.data.user)throw new Error("Invalid user data received");r(t.data.user,o),e("/dashboard")}catch(n){console.error("Token decode error:",n),e("/login?error=Authentication failed. Please try again.")}}else e("/login?error=No authentication token received.")}catch(o){console.error("OAuth callback error:",o),e("/login?error=Authentication failed. Please try again.")}})()},[t,e,r]),(0,ko.jsx)(am,{children:(0,ko.jsxs)(im,{children:[(0,ko.jsx)(sm,{}),(0,ko.jsx)(lm,{children:"Completing your sign-in..."})]})})}),um=e=>{let{children:t}=e;const{user:r,loading:n}=jo();return n?(0,ko.jsx)(Rc,{}):r?t:(0,ko.jsx)(we,{to:"/login"})},dm=e=>{let{children:t}=e;const{user:r,loading:n}=jo();return n?(0,ko.jsx)(Rc,{}):r?(0,ko.jsx)(we,{to:"/dashboard"}):t},fm=()=>{const{user:e,loading:t}=jo();return t?(0,ko.jsx)(Rc,{}):e?(0,ko.jsx)(we,{to:"/dashboard"}):(0,ko.jsx)(ju,{})};const pm=function(){return(0,ko.jsx)(_o,{children:(0,ko.jsx)(Ga,{children:(0,ko.jsx)(at,{children:(0,ko.jsxs)("div",{className:"min-h-screen flex flex-col bg-gray-50",children:[(0,ko.jsx)(bc,{}),(0,ko.jsx)("main",{className:"flex-1",children:(0,ko.jsxs)(je,{children:[(0,ko.jsx)(ke,{path:"/",element:(0,ko.jsx)(fm,{})}),(0,ko.jsx)(ke,{path:"/login",element:(0,ko.jsx)(dm,{children:(0,ko.jsx)(Zu,{})})}),(0,ko.jsx)(ke,{path:"/register",element:(0,ko.jsx)(dm,{children:(0,ko.jsx)(vd,{})})}),(0,ko.jsx)(ke,{path:"/dashboard",element:(0,ko.jsx)(um,{children:(0,ko.jsx)(cf,{})})}),(0,ko.jsx)(ke,{path:"/surveys",element:(0,ko.jsx)(um,{children:(0,ko.jsx)(Cf,{})})}),(0,ko.jsx)(ke,{path:"/surveys/:id",element:(0,ko.jsx)(um,{children:(0,ko.jsx)(Qf,{})})}),(0,ko.jsx)(ke,{path:"/rewards",element:(0,ko.jsx)(um,{children:(0,ko.jsx)(wp,{})})}),(0,ko.jsx)(ke,{path:"/profile",element:(0,ko.jsx)(um,{children:(0,ko.jsx)(Mp,{})})}),(0,ko.jsx)(ke,{path:"/payment-history",element:(0,ko.jsx)(um,{children:(0,ko.jsx)(oh,{})})}),(0,ko.jsx)(ke,{path:"/verify-email",element:(0,ko.jsx)(dm,{children:(0,ko.jsx)(vh,{})})}),(0,ko.jsx)(ke,{path:"/forgot-password",element:(0,ko.jsx)(dm,{children:(0,ko.jsx)(zh,{})})}),(0,ko.jsx)(ke,{path:"/reset-password",element:(0,ko.jsx)(dm,{children:(0,ko.jsx)(Hh,{})})}),(0,ko.jsx)(ke,{path:"/set-password",element:(0,ko.jsx)(dm,{children:(0,ko.jsx)(om,{})})}),(0,ko.jsx)(ke,{path:"/oauth-callback",element:(0,ko.jsx)(cm,{})})]})}),(0,ko.jsx)(Tc,{}),(0,ko.jsx)(er,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,draggable:!0,pauseOnHover:!0,className:"mt-16"})]})})})})};o.createRoot(document.getElementById("root")).render((0,ko.jsx)(n.StrictMode,{children:(0,ko.jsx)(pm,{})}))})()})();
//# sourceMappingURL=main.71986aec.js.map