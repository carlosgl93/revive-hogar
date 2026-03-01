const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-RxLXDU8I.js","assets/Button-2MxQ38BI.js","assets/App-jhJcd5b2.js","assets/index-Bz2Huzy7.js","assets/index-tn0RQdqM.css","assets/Container-AWMHH4mN.js","assets/CardContent-BtjHixjE.js","assets/Alert-DbEfz_pC.js","assets/IconButton-xlnm6lLT.js","assets/Select-DMs8d-8T.js","assets/Menu-BkOvJMet.js","assets/hooks-f2-2Iv5N.js","assets/index-CE7nx1B5.js","assets/WhatsApp-BQFjsF4O.js","assets/index-CRPbhER0.js","assets/index-Ck2kLHbl.js"])))=>i.map(i=>d[i]);
import{_ as Us}from"./index-Bz2Huzy7.js";import{a as q,t as ui,h as ya,i as va,j as V,c as vs,n as Ea,k as js,o as $n,l as Es,p as wr,X as Ta,y as eh,w as Qi,b as Yf,v as ti,Z as Jf,m as wa,Y as sl,_ as Xf,U as Ti}from"./Button-2MxQ38BI.js";import{a as Zf,S as wo,T as ep,b as th,L as tp,B as np,O as nh,c as rp,N as rh,R as ip,d as kn,f as Bs}from"./App-jhJcd5b2.js";import{P as sp,e as Kn,g as Yi,o as as,D as op,m as ol,A as ap,T as cp,M as lp,L as up,a as hp,b as dp,d as fp,c as pp}from"./Menu-BkOvJMet.js";import{G as mp,a as gp,b as _p,u as yp}from"./hooks-f2-2Iv5N.js";import{a as vp,m as Ep,b as Tp,o as Zn,c as ih,g as wp,u as Kr,d as Ip,f as al,I as Io}from"./IconButton-xlnm6lLT.js";function Ap({controlled:n,default:e,name:t,state:r="value"}){const{current:i}=q.useRef(n!==void 0),[s,a]=q.useState(e),c=i?n:s,u=q.useCallback(d=>{i||a(d)},[]);return[c,u]}function bp(n){var y;const{elementType:e,externalSlotProps:t,ownerState:r,skipResolvingSlotProps:i=!1,...s}=n,a=i?{}:vp(t,r),{props:c,internalRef:u}=Ep({...s,externalSlotProps:a}),d=ui(u,a==null?void 0:a.ref,(y=n.additionalProps)==null?void 0:y.ref);return Tp(e,{...c,ref:d},r)}var nt="top",dt="bottom",ft="right",rt="left",Ia="auto",wi=[nt,dt,ft,rt],hr="start",hi="end",Rp="clippingParents",sh="viewport",Hr="popper",Sp="reference",cl=wi.reduce(function(n,e){return n.concat([e+"-"+hr,e+"-"+hi])},[]),oh=[].concat(wi,[Ia]).reduce(function(n,e){return n.concat([e,e+"-"+hr,e+"-"+hi])},[]),Pp="beforeRead",Cp="read",kp="afterRead",Dp="beforeMain",Op="main",Vp="afterMain",Np="beforeWrite",xp="write",Lp="afterWrite",Mp=[Pp,Cp,kp,Dp,Op,Vp,Np,xp,Lp];function kt(n){return n?(n.nodeName||"").toLowerCase():null}function at(n){if(n==null)return window;if(n.toString()!=="[object Window]"){var e=n.ownerDocument;return e&&e.defaultView||window}return n}function Ln(n){var e=at(n).Element;return n instanceof e||n instanceof Element}function ht(n){var e=at(n).HTMLElement;return n instanceof e||n instanceof HTMLElement}function Aa(n){if(typeof ShadowRoot>"u")return!1;var e=at(n).ShadowRoot;return n instanceof e||n instanceof ShadowRoot}function Fp(n){var e=n.state;Object.keys(e.elements).forEach(function(t){var r=e.styles[t]||{},i=e.attributes[t]||{},s=e.elements[t];!ht(s)||!kt(s)||(Object.assign(s.style,r),Object.keys(i).forEach(function(a){var c=i[a];c===!1?s.removeAttribute(a):s.setAttribute(a,c===!0?"":c)}))})}function Up(n){var e=n.state,t={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,t.popper),e.styles=t,e.elements.arrow&&Object.assign(e.elements.arrow.style,t.arrow),function(){Object.keys(e.elements).forEach(function(r){var i=e.elements[r],s=e.attributes[r]||{},a=Object.keys(e.styles.hasOwnProperty(r)?e.styles[r]:t[r]),c=a.reduce(function(u,d){return u[d]="",u},{});!ht(i)||!kt(i)||(Object.assign(i.style,c),Object.keys(s).forEach(function(u){i.removeAttribute(u)}))})}}const jp={name:"applyStyles",enabled:!0,phase:"write",fn:Fp,effect:Up,requires:["computeStyles"]};function At(n){return n.split("-")[0]}var Vn=Math.max,Ts=Math.min,dr=Math.round;function jo(){var n=navigator.userAgentData;return n!=null&&n.brands&&Array.isArray(n.brands)?n.brands.map(function(e){return e.brand+"/"+e.version}).join(" "):navigator.userAgent}function ah(){return!/^((?!chrome|android).)*safari/i.test(jo())}function fr(n,e,t){e===void 0&&(e=!1),t===void 0&&(t=!1);var r=n.getBoundingClientRect(),i=1,s=1;e&&ht(n)&&(i=n.offsetWidth>0&&dr(r.width)/n.offsetWidth||1,s=n.offsetHeight>0&&dr(r.height)/n.offsetHeight||1);var a=Ln(n)?at(n):window,c=a.visualViewport,u=!ah()&&t,d=(r.left+(u&&c?c.offsetLeft:0))/i,f=(r.top+(u&&c?c.offsetTop:0))/s,y=r.width/i,w=r.height/s;return{width:y,height:w,top:f,right:d+y,bottom:f+w,left:d,x:d,y:f}}function ba(n){var e=fr(n),t=n.offsetWidth,r=n.offsetHeight;return Math.abs(e.width-t)<=1&&(t=e.width),Math.abs(e.height-r)<=1&&(r=e.height),{x:n.offsetLeft,y:n.offsetTop,width:t,height:r}}function ch(n,e){var t=e.getRootNode&&e.getRootNode();if(n.contains(e))return!0;if(t&&Aa(t)){var r=e;do{if(r&&n.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function Mt(n){return at(n).getComputedStyle(n)}function Bp(n){return["table","td","th"].indexOf(kt(n))>=0}function _n(n){return((Ln(n)?n.ownerDocument:n.document)||window.document).documentElement}function $s(n){return kt(n)==="html"?n:n.assignedSlot||n.parentNode||(Aa(n)?n.host:null)||_n(n)}function ll(n){return!ht(n)||Mt(n).position==="fixed"?null:n.offsetParent}function $p(n){var e=/firefox/i.test(jo()),t=/Trident/i.test(jo());if(t&&ht(n)){var r=Mt(n);if(r.position==="fixed")return null}var i=$s(n);for(Aa(i)&&(i=i.host);ht(i)&&["html","body"].indexOf(kt(i))<0;){var s=Mt(i);if(s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].indexOf(s.willChange)!==-1||e&&s.willChange==="filter"||e&&s.filter&&s.filter!=="none")return i;i=i.parentNode}return null}function Ii(n){for(var e=at(n),t=ll(n);t&&Bp(t)&&Mt(t).position==="static";)t=ll(t);return t&&(kt(t)==="html"||kt(t)==="body"&&Mt(t).position==="static")?e:t||$p(n)||e}function Ra(n){return["top","bottom"].indexOf(n)>=0?"x":"y"}function ni(n,e,t){return Vn(n,Ts(e,t))}function qp(n,e,t){var r=ni(n,e,t);return r>t?t:r}function lh(){return{top:0,right:0,bottom:0,left:0}}function uh(n){return Object.assign({},lh(),n)}function hh(n,e){return e.reduce(function(t,r){return t[r]=n,t},{})}var Hp=function(e,t){return e=typeof e=="function"?e(Object.assign({},t.rects,{placement:t.placement})):e,uh(typeof e!="number"?e:hh(e,wi))};function zp(n){var e,t=n.state,r=n.name,i=n.options,s=t.elements.arrow,a=t.modifiersData.popperOffsets,c=At(t.placement),u=Ra(c),d=[rt,ft].indexOf(c)>=0,f=d?"height":"width";if(!(!s||!a)){var y=Hp(i.padding,t),w=ba(s),b=u==="y"?nt:rt,P=u==="y"?dt:ft,k=t.rects.reference[f]+t.rects.reference[u]-a[u]-t.rects.popper[f],C=a[u]-t.rects.reference[u],L=Ii(s),N=L?u==="y"?L.clientHeight||0:L.clientWidth||0:0,U=k/2-C/2,F=y[b],j=N-w[f]-y[P],B=N/2-w[f]/2+U,v=ni(F,B,j),g=u;t.modifiersData[r]=(e={},e[g]=v,e.centerOffset=v-B,e)}}function Wp(n){var e=n.state,t=n.options,r=t.element,i=r===void 0?"[data-popper-arrow]":r;i!=null&&(typeof i=="string"&&(i=e.elements.popper.querySelector(i),!i)||ch(e.elements.popper,i)&&(e.elements.arrow=i))}const Gp={name:"arrow",enabled:!0,phase:"main",fn:zp,effect:Wp,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function pr(n){return n.split("-")[1]}var Kp={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Qp(n,e){var t=n.x,r=n.y,i=e.devicePixelRatio||1;return{x:dr(t*i)/i||0,y:dr(r*i)/i||0}}function ul(n){var e,t=n.popper,r=n.popperRect,i=n.placement,s=n.variation,a=n.offsets,c=n.position,u=n.gpuAcceleration,d=n.adaptive,f=n.roundOffsets,y=n.isFixed,w=a.x,b=w===void 0?0:w,P=a.y,k=P===void 0?0:P,C=typeof f=="function"?f({x:b,y:k}):{x:b,y:k};b=C.x,k=C.y;var L=a.hasOwnProperty("x"),N=a.hasOwnProperty("y"),U=rt,F=nt,j=window;if(d){var B=Ii(t),v="clientHeight",g="clientWidth";if(B===at(t)&&(B=_n(t),Mt(B).position!=="static"&&c==="absolute"&&(v="scrollHeight",g="scrollWidth")),B=B,i===nt||(i===rt||i===ft)&&s===hi){F=dt;var _=y&&B===j&&j.visualViewport?j.visualViewport.height:B[v];k-=_-r.height,k*=u?1:-1}if(i===rt||(i===nt||i===dt)&&s===hi){U=ft;var T=y&&B===j&&j.visualViewport?j.visualViewport.width:B[g];b-=T-r.width,b*=u?1:-1}}var E=Object.assign({position:c},d&&Kp),I=f===!0?Qp({x:b,y:k},at(t)):{x:b,y:k};if(b=I.x,k=I.y,u){var m;return Object.assign({},E,(m={},m[F]=N?"0":"",m[U]=L?"0":"",m.transform=(j.devicePixelRatio||1)<=1?"translate("+b+"px, "+k+"px)":"translate3d("+b+"px, "+k+"px, 0)",m))}return Object.assign({},E,(e={},e[F]=N?k+"px":"",e[U]=L?b+"px":"",e.transform="",e))}function Yp(n){var e=n.state,t=n.options,r=t.gpuAcceleration,i=r===void 0?!0:r,s=t.adaptive,a=s===void 0?!0:s,c=t.roundOffsets,u=c===void 0?!0:c,d={placement:At(e.placement),variation:pr(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:i,isFixed:e.options.strategy==="fixed"};e.modifiersData.popperOffsets!=null&&(e.styles.popper=Object.assign({},e.styles.popper,ul(Object.assign({},d,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:a,roundOffsets:u})))),e.modifiersData.arrow!=null&&(e.styles.arrow=Object.assign({},e.styles.arrow,ul(Object.assign({},d,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:u})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})}const Jp={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Yp,data:{}};var Ji={passive:!0};function Xp(n){var e=n.state,t=n.instance,r=n.options,i=r.scroll,s=i===void 0?!0:i,a=r.resize,c=a===void 0?!0:a,u=at(e.elements.popper),d=[].concat(e.scrollParents.reference,e.scrollParents.popper);return s&&d.forEach(function(f){f.addEventListener("scroll",t.update,Ji)}),c&&u.addEventListener("resize",t.update,Ji),function(){s&&d.forEach(function(f){f.removeEventListener("scroll",t.update,Ji)}),c&&u.removeEventListener("resize",t.update,Ji)}}const Zp={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Xp,data:{}};var em={left:"right",right:"left",bottom:"top",top:"bottom"};function cs(n){return n.replace(/left|right|bottom|top/g,function(e){return em[e]})}var tm={start:"end",end:"start"};function hl(n){return n.replace(/start|end/g,function(e){return tm[e]})}function Sa(n){var e=at(n),t=e.pageXOffset,r=e.pageYOffset;return{scrollLeft:t,scrollTop:r}}function Pa(n){return fr(_n(n)).left+Sa(n).scrollLeft}function nm(n,e){var t=at(n),r=_n(n),i=t.visualViewport,s=r.clientWidth,a=r.clientHeight,c=0,u=0;if(i){s=i.width,a=i.height;var d=ah();(d||!d&&e==="fixed")&&(c=i.offsetLeft,u=i.offsetTop)}return{width:s,height:a,x:c+Pa(n),y:u}}function rm(n){var e,t=_n(n),r=Sa(n),i=(e=n.ownerDocument)==null?void 0:e.body,s=Vn(t.scrollWidth,t.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),a=Vn(t.scrollHeight,t.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),c=-r.scrollLeft+Pa(n),u=-r.scrollTop;return Mt(i||t).direction==="rtl"&&(c+=Vn(t.clientWidth,i?i.clientWidth:0)-s),{width:s,height:a,x:c,y:u}}function Ca(n){var e=Mt(n),t=e.overflow,r=e.overflowX,i=e.overflowY;return/auto|scroll|overlay|hidden/.test(t+i+r)}function dh(n){return["html","body","#document"].indexOf(kt(n))>=0?n.ownerDocument.body:ht(n)&&Ca(n)?n:dh($s(n))}function ri(n,e){var t;e===void 0&&(e=[]);var r=dh(n),i=r===((t=n.ownerDocument)==null?void 0:t.body),s=at(r),a=i?[s].concat(s.visualViewport||[],Ca(r)?r:[]):r,c=e.concat(a);return i?c:c.concat(ri($s(a)))}function Bo(n){return Object.assign({},n,{left:n.x,top:n.y,right:n.x+n.width,bottom:n.y+n.height})}function im(n,e){var t=fr(n,!1,e==="fixed");return t.top=t.top+n.clientTop,t.left=t.left+n.clientLeft,t.bottom=t.top+n.clientHeight,t.right=t.left+n.clientWidth,t.width=n.clientWidth,t.height=n.clientHeight,t.x=t.left,t.y=t.top,t}function dl(n,e,t){return e===sh?Bo(nm(n,t)):Ln(e)?im(e,t):Bo(rm(_n(n)))}function sm(n){var e=ri($s(n)),t=["absolute","fixed"].indexOf(Mt(n).position)>=0,r=t&&ht(n)?Ii(n):n;return Ln(r)?e.filter(function(i){return Ln(i)&&ch(i,r)&&kt(i)!=="body"}):[]}function om(n,e,t,r){var i=e==="clippingParents"?sm(n):[].concat(e),s=[].concat(i,[t]),a=s[0],c=s.reduce(function(u,d){var f=dl(n,d,r);return u.top=Vn(f.top,u.top),u.right=Ts(f.right,u.right),u.bottom=Ts(f.bottom,u.bottom),u.left=Vn(f.left,u.left),u},dl(n,a,r));return c.width=c.right-c.left,c.height=c.bottom-c.top,c.x=c.left,c.y=c.top,c}function fh(n){var e=n.reference,t=n.element,r=n.placement,i=r?At(r):null,s=r?pr(r):null,a=e.x+e.width/2-t.width/2,c=e.y+e.height/2-t.height/2,u;switch(i){case nt:u={x:a,y:e.y-t.height};break;case dt:u={x:a,y:e.y+e.height};break;case ft:u={x:e.x+e.width,y:c};break;case rt:u={x:e.x-t.width,y:c};break;default:u={x:e.x,y:e.y}}var d=i?Ra(i):null;if(d!=null){var f=d==="y"?"height":"width";switch(s){case hr:u[d]=u[d]-(e[f]/2-t[f]/2);break;case hi:u[d]=u[d]+(e[f]/2-t[f]/2);break}}return u}function di(n,e){e===void 0&&(e={});var t=e,r=t.placement,i=r===void 0?n.placement:r,s=t.strategy,a=s===void 0?n.strategy:s,c=t.boundary,u=c===void 0?Rp:c,d=t.rootBoundary,f=d===void 0?sh:d,y=t.elementContext,w=y===void 0?Hr:y,b=t.altBoundary,P=b===void 0?!1:b,k=t.padding,C=k===void 0?0:k,L=uh(typeof C!="number"?C:hh(C,wi)),N=w===Hr?Sp:Hr,U=n.rects.popper,F=n.elements[P?N:w],j=om(Ln(F)?F:F.contextElement||_n(n.elements.popper),u,f,a),B=fr(n.elements.reference),v=fh({reference:B,element:U,placement:i}),g=Bo(Object.assign({},U,v)),_=w===Hr?g:B,T={top:j.top-_.top+L.top,bottom:_.bottom-j.bottom+L.bottom,left:j.left-_.left+L.left,right:_.right-j.right+L.right},E=n.modifiersData.offset;if(w===Hr&&E){var I=E[i];Object.keys(T).forEach(function(m){var ne=[ft,dt].indexOf(m)>=0?1:-1,ue=[nt,dt].indexOf(m)>=0?"y":"x";T[m]+=I[ue]*ne})}return T}function am(n,e){e===void 0&&(e={});var t=e,r=t.placement,i=t.boundary,s=t.rootBoundary,a=t.padding,c=t.flipVariations,u=t.allowedAutoPlacements,d=u===void 0?oh:u,f=pr(r),y=f?c?cl:cl.filter(function(P){return pr(P)===f}):wi,w=y.filter(function(P){return d.indexOf(P)>=0});w.length===0&&(w=y);var b=w.reduce(function(P,k){return P[k]=di(n,{placement:k,boundary:i,rootBoundary:s,padding:a})[At(k)],P},{});return Object.keys(b).sort(function(P,k){return b[P]-b[k]})}function cm(n){if(At(n)===Ia)return[];var e=cs(n);return[hl(n),e,hl(e)]}function lm(n){var e=n.state,t=n.options,r=n.name;if(!e.modifiersData[r]._skip){for(var i=t.mainAxis,s=i===void 0?!0:i,a=t.altAxis,c=a===void 0?!0:a,u=t.fallbackPlacements,d=t.padding,f=t.boundary,y=t.rootBoundary,w=t.altBoundary,b=t.flipVariations,P=b===void 0?!0:b,k=t.allowedAutoPlacements,C=e.options.placement,L=At(C),N=L===C,U=u||(N||!P?[cs(C)]:cm(C)),F=[C].concat(U).reduce(function(be,Ne){return be.concat(At(Ne)===Ia?am(e,{placement:Ne,boundary:f,rootBoundary:y,padding:d,flipVariations:P,allowedAutoPlacements:k}):Ne)},[]),j=e.rects.reference,B=e.rects.popper,v=new Map,g=!0,_=F[0],T=0;T<F.length;T++){var E=F[T],I=At(E),m=pr(E)===hr,ne=[nt,dt].indexOf(I)>=0,ue=ne?"width":"height",Q=di(e,{placement:E,boundary:f,rootBoundary:y,altBoundary:w,padding:d}),oe=ne?m?ft:rt:m?dt:nt;j[ue]>B[ue]&&(oe=cs(oe));var Te=cs(oe),Ve=[];if(s&&Ve.push(Q[I]<=0),c&&Ve.push(Q[oe]<=0,Q[Te]<=0),Ve.every(function(be){return be})){_=E,g=!1;break}v.set(E,Ve)}if(g)for(var Fe=P?3:1,Je=function(Ne){var Xe=F.find(function($){var re=v.get($);if(re)return re.slice(0,Ne).every(function(ie){return ie})});if(Xe)return _=Xe,"break"},Ke=Fe;Ke>0;Ke--){var it=Je(Ke);if(it==="break")break}e.placement!==_&&(e.modifiersData[r]._skip=!0,e.placement=_,e.reset=!0)}}const um={name:"flip",enabled:!0,phase:"main",fn:lm,requiresIfExists:["offset"],data:{_skip:!1}};function fl(n,e,t){return t===void 0&&(t={x:0,y:0}),{top:n.top-e.height-t.y,right:n.right-e.width+t.x,bottom:n.bottom-e.height+t.y,left:n.left-e.width-t.x}}function pl(n){return[nt,ft,dt,rt].some(function(e){return n[e]>=0})}function hm(n){var e=n.state,t=n.name,r=e.rects.reference,i=e.rects.popper,s=e.modifiersData.preventOverflow,a=di(e,{elementContext:"reference"}),c=di(e,{altBoundary:!0}),u=fl(a,r),d=fl(c,i,s),f=pl(u),y=pl(d);e.modifiersData[t]={referenceClippingOffsets:u,popperEscapeOffsets:d,isReferenceHidden:f,hasPopperEscaped:y},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":f,"data-popper-escaped":y})}const dm={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:hm};function fm(n,e,t){var r=At(n),i=[rt,nt].indexOf(r)>=0?-1:1,s=typeof t=="function"?t(Object.assign({},e,{placement:n})):t,a=s[0],c=s[1];return a=a||0,c=(c||0)*i,[rt,ft].indexOf(r)>=0?{x:c,y:a}:{x:a,y:c}}function pm(n){var e=n.state,t=n.options,r=n.name,i=t.offset,s=i===void 0?[0,0]:i,a=oh.reduce(function(f,y){return f[y]=fm(y,e.rects,s),f},{}),c=a[e.placement],u=c.x,d=c.y;e.modifiersData.popperOffsets!=null&&(e.modifiersData.popperOffsets.x+=u,e.modifiersData.popperOffsets.y+=d),e.modifiersData[r]=a}const mm={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:pm};function gm(n){var e=n.state,t=n.name;e.modifiersData[t]=fh({reference:e.rects.reference,element:e.rects.popper,placement:e.placement})}const _m={name:"popperOffsets",enabled:!0,phase:"read",fn:gm,data:{}};function ym(n){return n==="x"?"y":"x"}function vm(n){var e=n.state,t=n.options,r=n.name,i=t.mainAxis,s=i===void 0?!0:i,a=t.altAxis,c=a===void 0?!1:a,u=t.boundary,d=t.rootBoundary,f=t.altBoundary,y=t.padding,w=t.tether,b=w===void 0?!0:w,P=t.tetherOffset,k=P===void 0?0:P,C=di(e,{boundary:u,rootBoundary:d,padding:y,altBoundary:f}),L=At(e.placement),N=pr(e.placement),U=!N,F=Ra(L),j=ym(F),B=e.modifiersData.popperOffsets,v=e.rects.reference,g=e.rects.popper,_=typeof k=="function"?k(Object.assign({},e.rects,{placement:e.placement})):k,T=typeof _=="number"?{mainAxis:_,altAxis:_}:Object.assign({mainAxis:0,altAxis:0},_),E=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,I={x:0,y:0};if(B){if(s){var m,ne=F==="y"?nt:rt,ue=F==="y"?dt:ft,Q=F==="y"?"height":"width",oe=B[F],Te=oe+C[ne],Ve=oe-C[ue],Fe=b?-g[Q]/2:0,Je=N===hr?v[Q]:g[Q],Ke=N===hr?-g[Q]:-v[Q],it=e.elements.arrow,be=b&&it?ba(it):{width:0,height:0},Ne=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:lh(),Xe=Ne[ne],$=Ne[ue],re=ni(0,v[Q],be[Q]),ie=U?v[Q]/2-Fe-re-Xe-T.mainAxis:Je-re-Xe-T.mainAxis,fe=U?-v[Q]/2+Fe+re+$+T.mainAxis:Ke+re+$+T.mainAxis,pe=e.elements.arrow&&Ii(e.elements.arrow),se=pe?F==="y"?pe.clientTop||0:pe.clientLeft||0:0,Re=(m=E==null?void 0:E[F])!=null?m:0,_e=oe+ie-Re-se,Qe=oe+fe-Re,me=ni(b?Ts(Te,_e):Te,oe,b?Vn(Ve,Qe):Ve);B[F]=me,I[F]=me-oe}if(c){var we,Ze=F==="x"?nt:rt,ye=F==="x"?dt:ft,ce=B[j],ct=j==="y"?"height":"width",vn=ce+C[Ze],qt=ce-C[ye],En=[nt,rt].indexOf(L)!==-1,vt=(we=E==null?void 0:E[j])!=null?we:0,Tn=En?vn:ce-v[ct]-g[ct]-vt+T.altAxis,Ot=En?ce+v[ct]+g[ct]-vt-T.altAxis:qt,Ht=b&&En?qp(Tn,ce,Ot):ni(b?Tn:vn,ce,b?Ot:qt);B[j]=Ht,I[j]=Ht-ce}e.modifiersData[r]=I}}const Em={name:"preventOverflow",enabled:!0,phase:"main",fn:vm,requiresIfExists:["offset"]};function Tm(n){return{scrollLeft:n.scrollLeft,scrollTop:n.scrollTop}}function wm(n){return n===at(n)||!ht(n)?Sa(n):Tm(n)}function Im(n){var e=n.getBoundingClientRect(),t=dr(e.width)/n.offsetWidth||1,r=dr(e.height)/n.offsetHeight||1;return t!==1||r!==1}function Am(n,e,t){t===void 0&&(t=!1);var r=ht(e),i=ht(e)&&Im(e),s=_n(e),a=fr(n,i,t),c={scrollLeft:0,scrollTop:0},u={x:0,y:0};return(r||!r&&!t)&&((kt(e)!=="body"||Ca(s))&&(c=wm(e)),ht(e)?(u=fr(e,!0),u.x+=e.clientLeft,u.y+=e.clientTop):s&&(u.x=Pa(s))),{x:a.left+c.scrollLeft-u.x,y:a.top+c.scrollTop-u.y,width:a.width,height:a.height}}function bm(n){var e=new Map,t=new Set,r=[];n.forEach(function(s){e.set(s.name,s)});function i(s){t.add(s.name);var a=[].concat(s.requires||[],s.requiresIfExists||[]);a.forEach(function(c){if(!t.has(c)){var u=e.get(c);u&&i(u)}}),r.push(s)}return n.forEach(function(s){t.has(s.name)||i(s)}),r}function Rm(n){var e=bm(n);return Mp.reduce(function(t,r){return t.concat(e.filter(function(i){return i.phase===r}))},[])}function Sm(n){var e;return function(){return e||(e=new Promise(function(t){Promise.resolve().then(function(){e=void 0,t(n())})})),e}}function Pm(n){var e=n.reduce(function(t,r){var i=t[r.name];return t[r.name]=i?Object.assign({},i,r,{options:Object.assign({},i.options,r.options),data:Object.assign({},i.data,r.data)}):r,t},{});return Object.keys(e).map(function(t){return e[t]})}var ml={placement:"bottom",modifiers:[],strategy:"absolute"};function gl(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];return!e.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Cm(n){n===void 0&&(n={});var e=n,t=e.defaultModifiers,r=t===void 0?[]:t,i=e.defaultOptions,s=i===void 0?ml:i;return function(c,u,d){d===void 0&&(d=s);var f={placement:"bottom",orderedModifiers:[],options:Object.assign({},ml,s),modifiersData:{},elements:{reference:c,popper:u},attributes:{},styles:{}},y=[],w=!1,b={state:f,setOptions:function(L){var N=typeof L=="function"?L(f.options):L;k(),f.options=Object.assign({},s,f.options,N),f.scrollParents={reference:Ln(c)?ri(c):c.contextElement?ri(c.contextElement):[],popper:ri(u)};var U=Rm(Pm([].concat(r,f.options.modifiers)));return f.orderedModifiers=U.filter(function(F){return F.enabled}),P(),b.update()},forceUpdate:function(){if(!w){var L=f.elements,N=L.reference,U=L.popper;if(gl(N,U)){f.rects={reference:Am(N,Ii(U),f.options.strategy==="fixed"),popper:ba(U)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach(function(T){return f.modifiersData[T.name]=Object.assign({},T.data)});for(var F=0;F<f.orderedModifiers.length;F++){if(f.reset===!0){f.reset=!1,F=-1;continue}var j=f.orderedModifiers[F],B=j.fn,v=j.options,g=v===void 0?{}:v,_=j.name;typeof B=="function"&&(f=B({state:f,options:g,name:_,instance:b})||f)}}}},update:Sm(function(){return new Promise(function(C){b.forceUpdate(),C(f)})}),destroy:function(){k(),w=!0}};if(!gl(c,u))return b;b.setOptions(d).then(function(C){!w&&d.onFirstUpdate&&d.onFirstUpdate(C)});function P(){f.orderedModifiers.forEach(function(C){var L=C.name,N=C.options,U=N===void 0?{}:N,F=C.effect;if(typeof F=="function"){var j=F({state:f,name:L,instance:b,options:U}),B=function(){};y.push(j||B)}})}function k(){y.forEach(function(C){return C()}),y=[]}return b}}var km=[Zp,_m,Jp,jp,mm,um,Em,Gp,dm],Dm=Cm({defaultModifiers:km});function Om(n){return ya("MuiPopper",n)}va("MuiPopper",["root"]);function Vm(n,e){if(e==="ltr")return n;switch(n){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return n}}function $o(n){return typeof n=="function"?n():n}function Nm(n){return n.nodeType!==void 0}const xm=n=>{const{classes:e}=n;return Ea({root:["root"]},Om,e)},Lm={},Mm=q.forwardRef(function(e,t){const{anchorEl:r,children:i,direction:s,disablePortal:a,modifiers:c,open:u,placement:d,popperOptions:f,popperRef:y,slotProps:w={},slots:b={},TransitionProps:P,ownerState:k,...C}=e,L=q.useRef(null),N=ui(L,t),U=q.useRef(null),F=ui(U,y),j=q.useRef(F);vs(()=>{j.current=F},[F]),q.useImperativeHandle(y,()=>U.current,[]);const B=Vm(d,s),[v,g]=q.useState(B),[_,T]=q.useState($o(r));q.useEffect(()=>{U.current&&U.current.forceUpdate()}),q.useEffect(()=>{r&&T($o(r))},[r]),vs(()=>{if(!_||!u)return;const ue=Te=>{g(Te.placement)};let Q=[{name:"preventOverflow",options:{altBoundary:a}},{name:"flip",options:{altBoundary:a}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:Te})=>{ue(Te)}}];c!=null&&(Q=Q.concat(c)),f&&f.modifiers!=null&&(Q=Q.concat(f.modifiers));const oe=Dm(_,L.current,{placement:B,...f,modifiers:Q});return j.current(oe),()=>{oe.destroy(),j.current(null)}},[_,a,c,u,f,B]);const E={placement:v};P!==null&&(E.TransitionProps=P);const I=xm(e),m=b.root??"div",ne=bp({elementType:m,externalSlotProps:w.root,externalForwardedProps:C,additionalProps:{role:"tooltip",ref:N},ownerState:e,className:I.root});return V.jsx(m,{...ne,children:typeof i=="function"?i(E):i})}),Fm=q.forwardRef(function(e,t){const{anchorEl:r,children:i,container:s,direction:a="ltr",disablePortal:c=!1,keepMounted:u=!1,modifiers:d,open:f,placement:y="bottom",popperOptions:w=Lm,popperRef:b,style:P,transition:k=!1,slotProps:C={},slots:L={},...N}=e,[U,F]=q.useState(!0),j=()=>{F(!1)},B=()=>{F(!0)};if(!u&&!f&&(!k||U))return null;let v;if(s)v=s;else if(r){const T=$o(r);v=T&&Nm(T)?Zn(T).body:Zn(null).body}const g=!f&&u&&(!k||U)?"none":void 0,_=k?{in:f,onEnter:j,onExited:B}:void 0;return V.jsx(sp,{disablePortal:c,container:v,children:V.jsx(Mm,{anchorEl:r,direction:a,disablePortal:c,modifiers:d,ref:t,open:k?!U:f,placement:y,popperOptions:w,popperRef:b,slotProps:C,slots:L,...N,style:{position:"fixed",top:0,left:0,display:g,...P},TransitionProps:_,children:i})})}),Um=$n(Fm,{name:"MuiPopper",slot:"Root",overridesResolver:(n,e)=>e.root})({}),ph=q.forwardRef(function(e,t){const r=ih(),i=js({props:e,name:"MuiPopper"}),{anchorEl:s,component:a,components:c,componentsProps:u,container:d,disablePortal:f,keepMounted:y,modifiers:w,open:b,placement:P,popperOptions:k,popperRef:C,transition:L,slots:N,slotProps:U,...F}=i,j=(N==null?void 0:N.root)??(c==null?void 0:c.Root),B={anchorEl:s,container:d,disablePortal:f,keepMounted:y,modifiers:w,open:b,placement:P,popperOptions:k,popperRef:C,transition:L,...F};return V.jsx(Um,{as:a,direction:r?"rtl":"ltr",slots:{root:j},slotProps:U??u,...B,ref:t})});function jm(n){return ya("MuiDivider",n)}const qI=va("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]),Bm=n=>{const{absolute:e,children:t,classes:r,flexItem:i,light:s,orientation:a,textAlign:c,variant:u}=n;return Ea({root:["root",e&&"absolute",u,s&&"light",a==="vertical"&&"vertical",i&&"flexItem",t&&"withChildren",t&&a==="vertical"&&"withChildrenVertical",c==="right"&&a!=="vertical"&&"textAlignRight",c==="left"&&a!=="vertical"&&"textAlignLeft"],wrapper:["wrapper",a==="vertical"&&"wrapperVertical"]},jm,r)},$m=$n("div",{name:"MuiDivider",slot:"Root",overridesResolver:(n,e)=>{const{ownerState:t}=n;return[e.root,t.absolute&&e.absolute,e[t.variant],t.light&&e.light,t.orientation==="vertical"&&e.vertical,t.flexItem&&e.flexItem,t.children&&e.withChildren,t.children&&t.orientation==="vertical"&&e.withChildrenVertical,t.textAlign==="right"&&t.orientation!=="vertical"&&e.textAlignRight,t.textAlign==="left"&&t.orientation!=="vertical"&&e.textAlignLeft]}})(wr(({theme:n})=>({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(n.vars||n).palette.divider,borderBottomWidth:"thin",variants:[{props:{absolute:!0},style:{position:"absolute",bottom:0,left:0,width:"100%"}},{props:{light:!0},style:{borderColor:n.vars?`rgba(${n.vars.palette.dividerChannel} / 0.08)`:Ta(n.palette.divider,.08)}},{props:{variant:"inset"},style:{marginLeft:72}},{props:{variant:"middle",orientation:"horizontal"},style:{marginLeft:n.spacing(2),marginRight:n.spacing(2)}},{props:{variant:"middle",orientation:"vertical"},style:{marginTop:n.spacing(1),marginBottom:n.spacing(1)}},{props:{orientation:"vertical"},style:{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"}},{props:{flexItem:!0},style:{alignSelf:"stretch",height:"auto"}},{props:({ownerState:e})=>!!e.children,style:{display:"flex",textAlign:"center",border:0,borderTopStyle:"solid",borderLeftStyle:"solid","&::before, &::after":{content:'""',alignSelf:"center"}}},{props:({ownerState:e})=>e.children&&e.orientation!=="vertical",style:{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(n.vars||n).palette.divider}`,borderTopStyle:"inherit"}}},{props:({ownerState:e})=>e.orientation==="vertical"&&e.children,style:{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(n.vars||n).palette.divider}`,borderLeftStyle:"inherit"}}},{props:({ownerState:e})=>e.textAlign==="right"&&e.orientation!=="vertical",style:{"&::before":{width:"90%"},"&::after":{width:"10%"}}},{props:({ownerState:e})=>e.textAlign==="left"&&e.orientation!=="vertical",style:{"&::before":{width:"10%"},"&::after":{width:"90%"}}}]}))),qm=$n("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(n,e)=>{const{ownerState:t}=n;return[e.wrapper,t.orientation==="vertical"&&e.wrapperVertical]}})(wr(({theme:n})=>({display:"inline-block",paddingLeft:`calc(${n.spacing(1)} * 1.2)`,paddingRight:`calc(${n.spacing(1)} * 1.2)`,whiteSpace:"nowrap",variants:[{props:{orientation:"vertical"},style:{paddingTop:`calc(${n.spacing(1)} * 1.2)`,paddingBottom:`calc(${n.spacing(1)} * 1.2)`}}]}))),qo=q.forwardRef(function(e,t){const r=js({props:e,name:"MuiDivider"}),{absolute:i=!1,children:s,className:a,orientation:c="horizontal",component:u=s||c==="vertical"?"div":"hr",flexItem:d=!1,light:f=!1,role:y=u!=="hr"?"separator":void 0,textAlign:w="center",variant:b="fullWidth",...P}=r,k={...r,absolute:i,component:u,flexItem:d,light:f,orientation:c,role:y,textAlign:w,variant:b},C=Bm(k);return V.jsx($m,{as:u,className:Es(C.root,a),role:y,ref:t,ownerState:k,"aria-orientation":y==="separator"&&(u!=="hr"||c==="vertical")?c:void 0,...P,children:s?V.jsx(qm,{className:C.wrapper,ownerState:k,children:s}):null})});qo&&(qo.muiSkipListHighlight=!0);function Hm(n){const{children:e,defer:t=!1,fallback:r=null}=n,[i,s]=q.useState(!1);return vs(()=>{t||s(!0)},[t]),q.useEffect(()=>{t&&s(!0)},[t]),i?e:r}function zm(n){return ya("MuiTooltip",n)}const Ee=va("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]);function Wm(n){return Math.round(n*1e5)/1e5}const Gm=n=>{const{classes:e,disableInteractive:t,arrow:r,touch:i,placement:s}=n,a={popper:["popper",!t&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",i&&"touch",`tooltipPlacement${wa(s.split("-")[0])}`],arrow:["arrow"]};return Ea(a,zm,e)},Km=$n(ph,{name:"MuiTooltip",slot:"Popper",overridesResolver:(n,e)=>{const{ownerState:t}=n;return[e.popper,!t.disableInteractive&&e.popperInteractive,t.arrow&&e.popperArrow,!t.open&&e.popperClose]}})(wr(({theme:n})=>({zIndex:(n.vars||n).zIndex.tooltip,pointerEvents:"none",variants:[{props:({ownerState:e})=>!e.disableInteractive,style:{pointerEvents:"auto"}},{props:({open:e})=>!e,style:{pointerEvents:"none"}},{props:({ownerState:e})=>e.arrow,style:{[`&[data-popper-placement*="bottom"] .${Ee.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${Ee.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${Ee.arrow}`]:{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}},[`&[data-popper-placement*="left"] .${Ee.arrow}`]:{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}}}},{props:({ownerState:e})=>e.arrow&&!e.isRtl,style:{[`&[data-popper-placement*="right"] .${Ee.arrow}`]:{left:0,marginLeft:"-0.71em"}}},{props:({ownerState:e})=>e.arrow&&!!e.isRtl,style:{[`&[data-popper-placement*="right"] .${Ee.arrow}`]:{right:0,marginRight:"-0.71em"}}},{props:({ownerState:e})=>e.arrow&&!e.isRtl,style:{[`&[data-popper-placement*="left"] .${Ee.arrow}`]:{right:0,marginRight:"-0.71em"}}},{props:({ownerState:e})=>e.arrow&&!!e.isRtl,style:{[`&[data-popper-placement*="left"] .${Ee.arrow}`]:{left:0,marginLeft:"-0.71em"}}}]}))),Qm=$n("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(n,e)=>{const{ownerState:t}=n;return[e.tooltip,t.touch&&e.touch,t.arrow&&e.tooltipArrow,e[`tooltipPlacement${wa(t.placement.split("-")[0])}`]]}})(wr(({theme:n})=>({backgroundColor:n.vars?n.vars.palette.Tooltip.bg:Ta(n.palette.grey[700],.92),borderRadius:(n.vars||n).shape.borderRadius,color:(n.vars||n).palette.common.white,fontFamily:n.typography.fontFamily,padding:"4px 8px",fontSize:n.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:n.typography.fontWeightMedium,[`.${Ee.popper}[data-popper-placement*="left"] &`]:{transformOrigin:"right center"},[`.${Ee.popper}[data-popper-placement*="right"] &`]:{transformOrigin:"left center"},[`.${Ee.popper}[data-popper-placement*="top"] &`]:{transformOrigin:"center bottom",marginBottom:"14px"},[`.${Ee.popper}[data-popper-placement*="bottom"] &`]:{transformOrigin:"center top",marginTop:"14px"},variants:[{props:({ownerState:e})=>e.arrow,style:{position:"relative",margin:0}},{props:({ownerState:e})=>e.touch,style:{padding:"8px 16px",fontSize:n.typography.pxToRem(14),lineHeight:`${Wm(16/14)}em`,fontWeight:n.typography.fontWeightRegular}},{props:({ownerState:e})=>!e.isRtl,style:{[`.${Ee.popper}[data-popper-placement*="left"] &`]:{marginRight:"14px"},[`.${Ee.popper}[data-popper-placement*="right"] &`]:{marginLeft:"14px"}}},{props:({ownerState:e})=>!e.isRtl&&e.touch,style:{[`.${Ee.popper}[data-popper-placement*="left"] &`]:{marginRight:"24px"},[`.${Ee.popper}[data-popper-placement*="right"] &`]:{marginLeft:"24px"}}},{props:({ownerState:e})=>!!e.isRtl,style:{[`.${Ee.popper}[data-popper-placement*="left"] &`]:{marginLeft:"14px"},[`.${Ee.popper}[data-popper-placement*="right"] &`]:{marginRight:"14px"}}},{props:({ownerState:e})=>!!e.isRtl&&e.touch,style:{[`.${Ee.popper}[data-popper-placement*="left"] &`]:{marginLeft:"24px"},[`.${Ee.popper}[data-popper-placement*="right"] &`]:{marginRight:"24px"}}},{props:({ownerState:e})=>e.touch,style:{[`.${Ee.popper}[data-popper-placement*="top"] &`]:{marginBottom:"24px"}}},{props:({ownerState:e})=>e.touch,style:{[`.${Ee.popper}[data-popper-placement*="bottom"] &`]:{marginTop:"24px"}}}]}))),Ym=$n("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(n,e)=>e.arrow})(wr(({theme:n})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:n.vars?n.vars.palette.Tooltip.bg:Ta(n.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}})));let Xi=!1;const _l=new Jf;let zr={x:0,y:0};function Zi(n,e){return(t,...r)=>{e&&e(t,...r),n(t,...r)}}const yl=q.forwardRef(function(e,t){const r=js({props:e,name:"MuiTooltip"}),{arrow:i=!1,children:s,classes:a,components:c={},componentsProps:u={},describeChild:d=!1,disableFocusListener:f=!1,disableHoverListener:y=!1,disableInteractive:w=!1,disableTouchListener:b=!1,enterDelay:P=100,enterNextDelay:k=0,enterTouchDelay:C=700,followCursor:L=!1,id:N,leaveDelay:U=0,leaveTouchDelay:F=1500,onClose:j,onOpen:B,open:v,placement:g="bottom",PopperComponent:_,PopperProps:T={},slotProps:E={},slots:I={},title:m,TransitionComponent:ne,TransitionProps:ue,...Q}=r,oe=q.isValidElement(s)?s:V.jsx("span",{children:s}),Te=eh(),Ve=ih(),[Fe,Je]=q.useState(),[Ke,it]=q.useState(null),be=q.useRef(!1),Ne=w||L,Xe=Qi(),$=Qi(),re=Qi(),ie=Qi(),[fe,pe]=Ap({controlled:v,default:!1,name:"Tooltip",state:"open"});let se=fe;const Re=Yf(N),_e=q.useRef(),Qe=ti(()=>{_e.current!==void 0&&(document.body.style.WebkitUserSelect=_e.current,_e.current=void 0),ie.clear()});q.useEffect(()=>Qe,[Qe]);const me=K=>{_l.clear(),Xi=!0,pe(!0),B&&!se&&B(K)},we=ti(K=>{_l.start(800+U,()=>{Xi=!1}),pe(!1),j&&se&&j(K),Xe.start(Te.transitions.duration.shortest,()=>{be.current=!1})}),Ze=K=>{be.current&&K.type!=="touchstart"||(Fe&&Fe.removeAttribute("title"),$.clear(),re.clear(),P||Xi&&k?$.start(Xi?k:P,()=>{me(K)}):me(K))},ye=K=>{$.clear(),re.start(U,()=>{we(K)})},[,ce]=q.useState(!1),ct=K=>{sl(K.target)||(ce(!1),ye(K))},vn=K=>{Fe||Je(K.currentTarget),sl(K.target)&&(ce(!0),Ze(K))},qt=K=>{be.current=!0;const xe=oe.props;xe.onTouchStart&&xe.onTouchStart(K)},En=K=>{qt(K),re.clear(),Xe.clear(),Qe(),_e.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",ie.start(C,()=>{document.body.style.WebkitUserSelect=_e.current,Ze(K)})},vt=K=>{oe.props.onTouchEnd&&oe.props.onTouchEnd(K),Qe(),re.start(F,()=>{we(K)})};q.useEffect(()=>{if(!se)return;function K(xe){xe.key==="Escape"&&we(xe)}return document.addEventListener("keydown",K),()=>{document.removeEventListener("keydown",K)}},[we,se]);const Tn=ui(wp(oe),Je,t);!m&&m!==0&&(se=!1);const Ot=q.useRef(),Ht=K=>{const xe=oe.props;xe.onMouseMove&&xe.onMouseMove(K),zr={x:K.clientX,y:K.clientY},Ot.current&&Ot.current.update()},wn={},Dr=typeof m=="string";d?(wn.title=!se&&Dr&&!y?m:null,wn["aria-describedby"]=se?Re:null):(wn["aria-label"]=Dr?m:null,wn["aria-labelledby"]=se&&!Dr?Re:null);const et={...wn,...Q,...oe.props,className:Es(Q.className,oe.props.className),onTouchStart:qt,ref:Tn,...L?{onMouseMove:Ht}:{}},zt={};b||(et.onTouchStart=En,et.onTouchEnd=vt),y||(et.onMouseOver=Zi(Ze,et.onMouseOver),et.onMouseLeave=Zi(ye,et.onMouseLeave),Ne||(zt.onMouseOver=Ze,zt.onMouseLeave=ye)),f||(et.onFocus=Zi(vn,et.onFocus),et.onBlur=Zi(ct,et.onBlur),Ne||(zt.onFocus=vn,zt.onBlur=ct));const st={...r,isRtl:Ve,arrow:i,disableInteractive:Ne,placement:g,PopperComponentProp:_,touch:be.current},Ye=typeof E.popper=="function"?E.popper(st):E.popper,Or=q.useMemo(()=>{var xe,Fi;let K=[{name:"arrow",enabled:!!Ke,options:{element:Ke,padding:4}}];return(xe=T.popperOptions)!=null&&xe.modifiers&&(K=K.concat(T.popperOptions.modifiers)),(Fi=Ye==null?void 0:Ye.popperOptions)!=null&&Fi.modifiers&&(K=K.concat(Ye.popperOptions.modifiers)),{...T.popperOptions,...Ye==null?void 0:Ye.popperOptions,modifiers:K}},[Ke,T.popperOptions,Ye==null?void 0:Ye.popperOptions]),pt=Gm(st),Ni=typeof E.transition=="function"?E.transition(st):E.transition,Vt={slots:{popper:c.Popper,transition:c.Transition??ne,tooltip:c.Tooltip,arrow:c.Arrow,...I},slotProps:{arrow:E.arrow??u.arrow,popper:{...T,...Ye??u.popper},tooltip:E.tooltip??u.tooltip,transition:{...ue,...Ni??u.transition}}},[xi,In]=Kr("popper",{elementType:Km,externalForwardedProps:Vt,ownerState:st,className:Es(pt.popper,T==null?void 0:T.className)}),[Li,Ue]=Kr("transition",{elementType:mp,externalForwardedProps:Vt,ownerState:st}),[Mi,An]=Kr("tooltip",{elementType:Qm,className:pt.tooltip,externalForwardedProps:Vt,ownerState:st}),[bn,oo]=Kr("arrow",{elementType:Ym,className:pt.arrow,externalForwardedProps:Vt,ownerState:st,ref:it});return V.jsxs(q.Fragment,{children:[q.cloneElement(oe,et),V.jsx(xi,{as:_??ph,placement:g,anchorEl:L?{getBoundingClientRect:()=>({top:zr.y,left:zr.x,right:zr.x,bottom:zr.y,width:0,height:0})}:Fe,popperRef:Ot,open:Fe?se:!1,id:Re,transition:!0,...zt,...In,popperOptions:Or,children:({TransitionProps:K})=>V.jsx(Li,{timeout:Te.transitions.duration.shorter,...K,...Ue,children:V.jsxs(Mi,{...An,children:[m,i?V.jsx(bn,{...oo}):null]})})})]})}),Jm=$n("div",{name:"MuiSwipeArea",shouldForwardProp:Xf})(wr(({theme:n})=>({position:"fixed",top:0,left:0,bottom:0,zIndex:n.zIndex.drawer-1,variants:[{props:{anchor:"left"},style:{right:"auto"}},{props:{anchor:"right"},style:{left:"auto",right:0}},{props:{anchor:"top"},style:{bottom:"auto",right:0}},{props:{anchor:"bottom"},style:{top:"auto",bottom:0,right:0}}]}))),Xm=q.forwardRef(function(e,t){const{anchor:r,classes:i={},className:s,width:a,style:c,...u}=e,d=e;return V.jsx(Jm,{className:Es("PrivateSwipeArea-root",i.root,i[`anchor${wa(r)}`],s),ref:t,style:{[Kn(r)?"width":"height"]:a,...c},ownerState:d,...u})}),es=3,Ao=20;let Nt=null;function bo(n,e,t){return n==="right"?t.body.offsetWidth-e[0].pageX:e[0].pageX}function Ro(n,e,t){return n==="bottom"?t.innerHeight-e[0].clientY:e[0].clientY}function Wr(n,e){return n?e.clientWidth:e.clientHeight}function vl(n,e,t,r){return Math.min(Math.max(t?e-n:r+e-n,0),r)}function Zm(n,e){const t=[];for(;n&&n!==e.parentElement;){const r=as(e).getComputedStyle(n);r.getPropertyValue("position")==="absolute"||r.getPropertyValue("overflow-x")==="hidden"||(n.clientWidth>0&&n.scrollWidth>n.clientWidth||n.clientHeight>0&&n.scrollHeight>n.clientHeight)&&t.push(n),n=n.parentElement}return t}function eg({domTreeShapes:n,start:e,current:t,anchor:r}){const i={scrollPosition:{x:"scrollLeft",y:"scrollTop"},scrollLength:{x:"scrollWidth",y:"scrollHeight"},clientLength:{x:"clientWidth",y:"clientHeight"}};return n.some(s=>{let a=t>=e;(r==="top"||r==="left")&&(a=!a);const c=r==="left"||r==="right"?"x":"y",u=Math.round(s[i.scrollPosition[c]]),d=u>0,f=u+s[i.clientLength[c]]<s[i.scrollLength[c]];return!!(a&&f||!a&&d)})}const tg=typeof navigator<"u"&&/iPad|iPhone|iPod/.test(navigator.userAgent),ng=q.forwardRef(function(e,t){const r=js({name:"MuiSwipeableDrawer",props:e}),i=eh(),s={enter:i.transitions.duration.enteringScreen,exit:i.transitions.duration.leavingScreen},{anchor:a="left",disableBackdropTransition:c=!1,disableDiscovery:u=!1,disableSwipeToOpen:d=tg,hideBackdrop:f,hysteresis:y=.52,allowSwipeInChildren:w=!1,minFlingVelocity:b=450,ModalProps:{BackdropProps:P,...k}={},onClose:C,onOpen:L,open:N=!1,PaperProps:U={},SwipeAreaProps:F,swipeAreaWidth:j=20,transitionDuration:B=s,variant:v="temporary",slots:g={},slotProps:_={},...T}=r,[E,I]=q.useState(!1),m=q.useRef({isSwiping:null}),ne=q.useRef(),ue=q.useRef(),Q=q.useRef(),oe=ui(U.ref,Q),Te=q.useRef(!1),Ve=q.useRef();vs(()=>{Ve.current=null},[N]);const Fe=q.useCallback(($,re={})=>{const{mode:ie=null,changeTransition:fe=!0}=re,pe=Yi(i,a),se=["right","bottom"].includes(pe)?1:-1,Re=Kn(a),_e=Re?`translate(${se*$}px, 0)`:`translate(0, ${se*$}px)`,Qe=Q.current.style;Qe.webkitTransform=_e,Qe.transform=_e;let me="";if(ie&&(me=i.transitions.create("all",Ip({easing:void 0,style:void 0,timeout:B},{mode:ie}))),fe&&(Qe.webkitTransition=me,Qe.transition=me),!c&&!f){const we=ue.current.style;we.opacity=1-$/Wr(Re,Q.current),fe&&(we.webkitTransition=me,we.transition=me)}},[a,c,f,i,B]),Je=ti($=>{if(!Te.current)return;if(Nt=null,Te.current=!1,al.flushSync(()=>{I(!1)}),!m.current.isSwiping){m.current.isSwiping=null;return}m.current.isSwiping=null;const re=Yi(i,a),ie=Kn(a);let fe;ie?fe=bo(re,$.changedTouches,Zn($.currentTarget)):fe=Ro(re,$.changedTouches,as($.currentTarget));const pe=ie?m.current.startX:m.current.startY,se=Wr(ie,Q.current),Re=vl(fe,pe,N,se),_e=Re/se;if(Math.abs(m.current.velocity)>b&&(Ve.current=Math.abs((se-Re)/m.current.velocity)*1e3),N){m.current.velocity>b||_e>y?C():Fe(0,{mode:"exit"});return}m.current.velocity<-b||1-_e>y?L():Fe(Wr(ie,Q.current),{mode:"enter"})}),Ke=($=!1)=>{if(!E){($||!(u&&w))&&al.flushSync(()=>{I(!0)});const re=Kn(a);!N&&Q.current&&Fe(Wr(re,Q.current)+(u?15:-Ao),{changeTransition:!1}),m.current.velocity=0,m.current.lastTime=null,m.current.lastTranslate=null,m.current.paperHit=!1,Te.current=!0}},it=ti($=>{if(!Q.current||!Te.current||Nt!==null&&Nt!==m.current)return;Ke(!0);const re=Yi(i,a),ie=Kn(a),fe=bo(re,$.touches,Zn($.currentTarget)),pe=Ro(re,$.touches,as($.currentTarget));if(N&&Q.current.contains($.target)&&Nt===null){const me=Zm($.target,Q.current);if(eg({domTreeShapes:me,start:ie?m.current.startX:m.current.startY,current:ie?fe:pe,anchor:a})){Nt=!0;return}Nt=m.current}if(m.current.isSwiping==null){const me=Math.abs(fe-m.current.startX),we=Math.abs(pe-m.current.startY),Ze=ie?me>we&&me>es:we>me&&we>es;if(Ze&&$.cancelable&&$.preventDefault(),Ze===!0||(ie?we>es:me>es)){if(m.current.isSwiping=Ze,!Ze){Je($);return}m.current.startX=fe,m.current.startY=pe,!u&&!N&&(ie?m.current.startX-=Ao:m.current.startY-=Ao)}}if(!m.current.isSwiping)return;const se=Wr(ie,Q.current);let Re=ie?m.current.startX:m.current.startY;N&&!m.current.paperHit&&(Re=Math.min(Re,se));const _e=vl(ie?fe:pe,Re,N,se);if(N)if(m.current.paperHit)_e===0&&(m.current.startX=fe,m.current.startY=pe);else if(ie?fe<se:pe<se)m.current.paperHit=!0,m.current.startX=fe,m.current.startY=pe;else return;m.current.lastTranslate===null&&(m.current.lastTranslate=_e,m.current.lastTime=performance.now()+1);const Qe=(_e-m.current.lastTranslate)/(performance.now()-m.current.lastTime)*1e3;m.current.velocity=m.current.velocity*.4+Qe*.6,m.current.lastTranslate=_e,m.current.lastTime=performance.now(),$.cancelable&&$.preventDefault(),Fe(_e)}),be=ti($=>{var se;if($.defaultPrevented||$.defaultMuiPrevented||N&&(f||!ue.current.contains($.target))&&!Q.current.contains($.target))return;const re=Yi(i,a),ie=Kn(a),fe=bo(re,$.touches,Zn($.currentTarget)),pe=Ro(re,$.touches,as($.currentTarget));if(!N){if(d||!($.target===ne.current||(se=Q.current)!=null&&se.contains($.target)&&(typeof w=="function"?w($,ne.current,Q.current):w)))return;if(ie){if(fe>j)return}else if(pe>j)return}$.defaultMuiPrevented=!0,Nt=null,m.current.startX=fe,m.current.startY=pe,Ke()});q.useEffect(()=>{if(v==="temporary"){const $=Zn(Q.current);return $.addEventListener("touchstart",be),$.addEventListener("touchmove",it,{passive:!N}),$.addEventListener("touchend",Je),()=>{$.removeEventListener("touchstart",be),$.removeEventListener("touchmove",it,{passive:!N}),$.removeEventListener("touchend",Je)}}},[v,N,be,it,Je]),q.useEffect(()=>()=>{Nt===m.current&&(Nt=null)},[]),q.useEffect(()=>{N||I(!1)},[N]);const[Ne,Xe]=Kr("swipeArea",{ref:ne,elementType:Xm,ownerState:r,externalForwardedProps:{slots:g,slotProps:{swipeArea:F,..._}},additionalProps:{width:j,anchor:a}});return V.jsxs(q.Fragment,{children:[V.jsx(op,{open:v==="temporary"&&E?!0:N,variant:v,ModalProps:{BackdropProps:{...P,ref:ue},...v==="temporary"&&{keepMounted:!0},...k},hideBackdrop:f,anchor:a,transitionDuration:Ve.current||B,onClose:C,ref:t,slots:g,slotProps:{..._,backdrop:ol(_.backdrop??P,{ref:ue}),paper:ol(_.paper??U,{style:{pointerEvents:v==="temporary"&&!N&&!w?"none":""},ref:oe})},...T}),!d&&v==="temporary"&&V.jsx(Hm,{children:V.jsx(Ne,{...Xe})})]})}),rg=Ti(V.jsx("path",{d:"m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"}),"Logout"),ig=Ti(V.jsx("path",{d:"M12 4.81V19c-3.31 0-6-2.63-6-5.87 0-1.56.62-3.03 1.75-4.14zM6.35 7.56C4.9 8.99 4 10.96 4 13.13 4 17.48 7.58 21 12 21s8-3.52 8-7.87c0-2.17-.9-4.14-2.35-5.57L12 2z"}),"InvertColors");/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sg=()=>{};var El={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},og=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],a=n[t++],c=n[t++],u=((i&7)<<18|(s&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},gh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],a=i+1<n.length,c=a?n[i+1]:0,u=i+2<n.length,d=u?n[i+2]:0,f=s>>2,y=(s&3)<<4|c>>4;let w=(c&15)<<2|d>>6,b=d&63;u||(b=64,a||(w=64)),r.push(t[f],t[y],t[w],t[b])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(mh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):og(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const d=i<n.length?t[n.charAt(i)]:64;++i;const y=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||d==null||y==null)throw new ag;const w=s<<2|c>>4;if(r.push(w),d!==64){const b=c<<4&240|d>>2;if(r.push(b),y!==64){const P=d<<6&192|y;r.push(P)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class ag extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const cg=function(n){const e=mh(n);return gh.encodeByteArray(e,!0)},ws=function(n){return cg(n).replace(/\./g,"")},_h=function(n){try{return gh.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ug=()=>lg().__FIREBASE_DEFAULTS__,hg=()=>{if(typeof process>"u"||typeof El>"u")return;const n=El.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},dg=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&_h(n[1]);return e&&JSON.parse(e)},qs=()=>{try{return sg()||ug()||hg()||dg()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},yh=n=>{var e,t;return(t=(e=qs())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},vh=n=>{const e=yh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Eh=()=>{var n;return(n=qs())==null?void 0:n.config},Th=n=>{var e;return(e=qs())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fg{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ka(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pg(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ws(JSON.stringify(t)),ws(JSON.stringify(a)),""].join(".")}const ii={};function mg(){const n={prod:[],emulator:[]};for(const e of Object.keys(ii))ii[e]?n.emulator.push(e):n.prod.push(e);return n}function gg(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Tl=!1;function Da(n,e){if(typeof window>"u"||typeof document>"u"||!qn(window.location.host)||ii[n]===e||ii[n]||Tl)return;ii[n]=e;function t(w){return`__firebase__banner__${w}`}const r="__firebase__banner",s=mg().prod.length>0;function a(){const w=document.getElementById(r);w&&w.remove()}function c(w){w.style.display="flex",w.style.background="#7faaf0",w.style.position="fixed",w.style.bottom="5px",w.style.left="5px",w.style.padding=".5em",w.style.borderRadius="5px",w.style.alignItems="center"}function u(w,b){w.setAttribute("width","24"),w.setAttribute("id",b),w.setAttribute("height","24"),w.setAttribute("viewBox","0 0 24 24"),w.setAttribute("fill","none"),w.style.marginLeft="-6px"}function d(){const w=document.createElement("span");return w.style.cursor="pointer",w.style.marginLeft="16px",w.style.fontSize="24px",w.innerHTML=" &times;",w.onclick=()=>{Tl=!0,a()},w}function f(w,b){w.setAttribute("id",b),w.innerText="Learn more",w.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",w.setAttribute("target","__blank"),w.style.paddingLeft="5px",w.style.textDecoration="underline"}function y(){const w=gg(r),b=t("text"),P=document.getElementById(b)||document.createElement("span"),k=t("learnmore"),C=document.getElementById(k)||document.createElement("a"),L=t("preprendIcon"),N=document.getElementById(L)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(w.created){const U=w.element;c(U),f(C,k);const F=d();u(N,L),U.append(N,P,C,F),document.body.appendChild(U)}s?(P.innerText="Preview backend disconnected.",N.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(N.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,P.innerText="Preview backend running in this workspace."),P.setAttribute("id",b)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",y):y()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ge(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function _g(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ge())}function yg(){var e;const n=(e=qs())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function vg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Eg(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Tg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function wg(){const n=Ge();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Ig(){return!yg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ag(){try{return typeof indexedDB=="object"}catch{return!1}}function bg(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)==null?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rg="FirebaseError";class $t extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Rg,Object.setPrototypeOf(this,$t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ai.prototype.create)}}class Ai{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?Sg(s,r):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new $t(i,c,r)}}function Sg(n,e){return n.replace(Pg,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Pg=/\{\$([^}]+)}/g;function Cg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Mn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],a=e[i];if(wl(s)&&wl(a)){if(!Mn(s,a))return!1}else if(s!==a)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function wl(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bi(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Qr(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Yr(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function kg(n,e){const t=new Dg(n,e);return t.subscribe.bind(t)}class Dg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Og(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=So),i.error===void 0&&(i.error=So),i.complete===void 0&&(i.complete=So);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Og(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function So(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ke(n){return n&&n._delegate?n._delegate:n}class un{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vg{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new fg;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(xg(e))try{this.getOrInitializeService({instanceIdentifier:Dn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Dn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Dn){return this.instances.has(e)}getOptions(e=Dn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);r===c&&a.resolve(i)}return i}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Ng(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Dn){return this.component?this.component.multipleInstances?e:Dn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ng(n){return n===Dn?void 0:n}function xg(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Vg(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var J;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(J||(J={}));const Mg={debug:J.DEBUG,verbose:J.VERBOSE,info:J.INFO,warn:J.WARN,error:J.ERROR,silent:J.SILENT},Fg=J.INFO,Ug={[J.DEBUG]:"log",[J.VERBOSE]:"log",[J.INFO]:"info",[J.WARN]:"warn",[J.ERROR]:"error"},jg=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=Ug[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Oa{constructor(e){this.name=e,this._logLevel=Fg,this._logHandler=jg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in J))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Mg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,J.DEBUG,...e),this._logHandler(this,J.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,J.VERBOSE,...e),this._logHandler(this,J.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,J.INFO,...e),this._logHandler(this,J.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,J.WARN,...e),this._logHandler(this,J.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,J.ERROR,...e),this._logHandler(this,J.ERROR,...e)}}const Bg=(n,e)=>e.some(t=>n instanceof t);let Il,Al;function $g(){return Il||(Il=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function qg(){return Al||(Al=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const wh=new WeakMap,Ho=new WeakMap,Ih=new WeakMap,Po=new WeakMap,Va=new WeakMap;function Hg(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(on(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&wh.set(t,n)}).catch(()=>{}),Va.set(e,n),e}function zg(n){if(Ho.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});Ho.set(n,e)}let zo={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ho.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Ih.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return on(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Wg(n){zo=n(zo)}function Gg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Co(this),e,...t);return Ih.set(r,e.sort?e.sort():[e]),on(r)}:qg().includes(n)?function(...e){return n.apply(Co(this),e),on(wh.get(this))}:function(...e){return on(n.apply(Co(this),e))}}function Kg(n){return typeof n=="function"?Gg(n):(n instanceof IDBTransaction&&zg(n),Bg(n,$g())?new Proxy(n,zo):n)}function on(n){if(n instanceof IDBRequest)return Hg(n);if(Po.has(n))return Po.get(n);const e=Kg(n);return e!==n&&(Po.set(n,e),Va.set(e,n)),e}const Co=n=>Va.get(n);function Qg(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const a=indexedDB.open(n,e),c=on(a);return r&&a.addEventListener("upgradeneeded",u=>{r(on(a.result),u.oldVersion,u.newVersion,on(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const Yg=["get","getKey","getAll","getAllKeys","count"],Jg=["put","add","delete","clear"],ko=new Map;function bl(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ko.get(e))return ko.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=Jg.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Yg.includes(t)))return;const s=async function(a,...c){const u=this.transaction(a,i?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),i&&u.done]))[0]};return ko.set(e,s),s}Wg(n=>({...n,get:(e,t,r)=>bl(e,t)||n.get(e,t,r),has:(e,t)=>!!bl(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Zg(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Zg(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Wo="@firebase/app",Rl="0.14.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ft=new Oa("@firebase/app"),e_="@firebase/app-compat",t_="@firebase/analytics-compat",n_="@firebase/analytics",r_="@firebase/app-check-compat",i_="@firebase/app-check",s_="@firebase/auth",o_="@firebase/auth-compat",a_="@firebase/database",c_="@firebase/data-connect",l_="@firebase/database-compat",u_="@firebase/functions",h_="@firebase/functions-compat",d_="@firebase/installations",f_="@firebase/installations-compat",p_="@firebase/messaging",m_="@firebase/messaging-compat",g_="@firebase/performance",__="@firebase/performance-compat",y_="@firebase/remote-config",v_="@firebase/remote-config-compat",E_="@firebase/storage",T_="@firebase/storage-compat",w_="@firebase/firestore",I_="@firebase/ai",A_="@firebase/firestore-compat",b_="firebase",R_="12.9.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Go="[DEFAULT]",S_={[Wo]:"fire-core",[e_]:"fire-core-compat",[n_]:"fire-analytics",[t_]:"fire-analytics-compat",[i_]:"fire-app-check",[r_]:"fire-app-check-compat",[s_]:"fire-auth",[o_]:"fire-auth-compat",[a_]:"fire-rtdb",[c_]:"fire-data-connect",[l_]:"fire-rtdb-compat",[u_]:"fire-fn",[h_]:"fire-fn-compat",[d_]:"fire-iid",[f_]:"fire-iid-compat",[p_]:"fire-fcm",[m_]:"fire-fcm-compat",[g_]:"fire-perf",[__]:"fire-perf-compat",[y_]:"fire-rc",[v_]:"fire-rc-compat",[E_]:"fire-gcs",[T_]:"fire-gcs-compat",[w_]:"fire-fst",[A_]:"fire-fst-compat",[I_]:"fire-vertex","fire-js":"fire-js",[b_]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Is=new Map,P_=new Map,Ko=new Map;function Sl(n,e){try{n.container.addComponent(e)}catch(t){Ft.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Fn(n){const e=n.name;if(Ko.has(e))return Ft.debug(`There were multiple attempts to register component ${e}.`),!1;Ko.set(e,n);for(const t of Is.values())Sl(t,n);for(const t of P_.values())Sl(t,n);return!0}function Hs(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function lt(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},an=new Ai("app","Firebase",C_);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k_{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new un("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw an.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ir=R_;function Ah(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Go,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw an.create("bad-app-name",{appName:String(i)});if(t||(t=Eh()),!t)throw an.create("no-options");const s=Is.get(i);if(s){if(Mn(t,s.options)&&Mn(r,s.config))return s;throw an.create("duplicate-app",{appName:i})}const a=new Lg(i);for(const u of Ko.values())a.addComponent(u);const c=new k_(t,r,a);return Is.set(i,c),c}function Na(n=Go){const e=Is.get(n);if(!e&&n===Go&&Eh())return Ah();if(!e)throw an.create("no-app",{appName:n});return e}function bt(n,e,t){let r=S_[n]??n;t&&(r+=`-${t}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const a=[`Unable to register library "${r}" with version "${e}":`];i&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&a.push("and"),s&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ft.warn(a.join(" "));return}Fn(new un(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D_="firebase-heartbeat-database",O_=1,fi="firebase-heartbeat-store";let Do=null;function bh(){return Do||(Do=Qg(D_,O_,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(fi)}catch(t){console.warn(t)}}}}).catch(n=>{throw an.create("idb-open",{originalErrorMessage:n.message})})),Do}async function V_(n){try{const t=(await bh()).transaction(fi),r=await t.objectStore(fi).get(Rh(n));return await t.done,r}catch(e){if(e instanceof $t)Ft.warn(e.message);else{const t=an.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ft.warn(t.message)}}}async function Pl(n,e){try{const r=(await bh()).transaction(fi,"readwrite");await r.objectStore(fi).put(e,Rh(n)),await r.done}catch(t){if(t instanceof $t)Ft.warn(t.message);else{const r=an.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Ft.warn(r.message)}}}function Rh(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N_=1024,x_=30;class L_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new F_(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Cl();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>x_){const a=U_(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Ft.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Cl(),{heartbeatsToSend:r,unsentEntries:i}=M_(this._heartbeatsCache.heartbeats),s=ws(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Ft.warn(t),""}}}function Cl(){return new Date().toISOString().substring(0,10)}function M_(n,e=N_){const t=[];let r=n.slice();for(const i of n){const s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),kl(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),kl(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class F_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ag()?bg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await V_(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Pl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Pl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function kl(n){return ws(JSON.stringify({version:2,heartbeats:n})).length}function U_(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j_(n){Fn(new un("platform-logger",e=>new Xg(e),"PRIVATE")),Fn(new un("heartbeat",e=>new L_(e),"PRIVATE")),bt(Wo,Rl,n),bt(Wo,Rl,"esm2020"),bt("fire-js","")}j_("");function Sh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const B_=Sh,Ph=new Ai("auth","Firebase",Sh());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const As=new Oa("@firebase/auth");function $_(n,...e){As.logLevel<=J.WARN&&As.warn(`Auth (${Ir}): ${n}`,...e)}function ls(n,...e){As.logLevel<=J.ERROR&&As.error(`Auth (${Ir}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(n,...e){throw xa(n,...e)}function Rt(n,...e){return xa(n,...e)}function Ch(n,e,t){const r={...B_(),[e]:t};return new Ai("auth","Firebase",r).create(e,{appName:n.name})}function cn(n){return Ch(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function xa(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Ph.create(n,...e)}function z(n,e,...t){if(!n)throw xa(e,...t)}function xt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ls(e),new Error(e)}function Ut(n,e){n||xt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qo(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function q_(){return Dl()==="http:"||Dl()==="https:"}function Dl(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(q_()||Eg()||"connection"in navigator)?navigator.onLine:!0}function z_(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ri{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ut(t>e,"Short delay should be less than long delay!"),this.isMobile=_g()||Tg()}get(){return H_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function La(n,e){Ut(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kh{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;xt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;xt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;xt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G_=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],K_=new Ri(3e4,6e4);function Hn(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function yn(n,e,t,r,i={}){return Dh(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});const c=bi({key:n.config.apiKey,...a}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:u,...s};return vg()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&qn(n.emulatorConfig.host)&&(d.credentials="include"),kh.fetch()(await Oh(n,n.config.apiHost,t,c),d)})}async function Dh(n,e,t){n._canInitEmulator=!1;const r={...W_,...e};try{const i=new Y_(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw ts(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const c=s.ok?a.errorMessage:a.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ts(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw ts(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw ts(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Ch(n,f,d);_t(n,f)}}catch(i){if(i instanceof $t)throw i;_t(n,"network-request-failed",{message:String(i)})}}async function zs(n,e,t,r,i={}){const s=await yn(n,e,t,r,i);return"mfaPendingCredential"in s&&_t(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function Oh(n,e,t,r){const i=`${e}${t}?${r}`,s=n,a=s.config.emulator?La(n.config,i):`${n.config.apiScheme}://${i}`;return G_.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}function Q_(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Y_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Rt(this.auth,"network-request-failed")),K_.get())})}}function ts(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=Rt(n,e,r);return i.customData._tokenResponse=t,i}function Ol(n){return n!==void 0&&n.enterprise!==void 0}class J_{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Q_(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function X_(n,e){return yn(n,"GET","/v2/recaptchaConfig",Hn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Z_(n,e){return yn(n,"POST","/v1/accounts:delete",e)}async function bs(n,e){return yn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function si(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HI(n,e=!1){return ke(n).getIdToken(e)}async function ey(n,e=!1){const t=ke(n),r=await t.getIdToken(e),i=Ma(r);z(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,a=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:si(Oo(i.auth_time)),issuedAtTime:si(Oo(i.iat)),expirationTime:si(Oo(i.exp)),signInProvider:a||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Oo(n){return Number(n)*1e3}function Ma(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return ls("JWT malformed, contained fewer than 3 sections"),null;try{const i=_h(t);return i?JSON.parse(i):(ls("Failed to decode base64 JWT payload"),null)}catch(i){return ls("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Vl(n){const e=Ma(n);return z(e,"internal-error"),z(typeof e.exp<"u","internal-error"),z(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pi(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof $t&&ty(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function ty({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ny{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=si(this.lastLoginAt),this.creationTime=si(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rs(n){var y;const e=n.auth,t=await n.getIdToken(),r=await pi(n,bs(e,{idToken:t}));z(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];n._notifyReloadListener(i);const s=(y=i.providerUserInfo)!=null&&y.length?Vh(i.providerUserInfo):[],a=iy(n.providerData,s),c=n.isAnonymous,u=!(n.email&&i.passwordHash)&&!(a!=null&&a.length),d=c?u:!1,f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new Yo(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(n,f)}async function ry(n){const e=ke(n);await Rs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function iy(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Vh(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sy(n,e){const t=await Dh(n,{},async()=>{const r=bi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=await Oh(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&qn(n.emulatorConfig.host)&&(u.credentials="include"),kh.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function oy(n,e){return yn(n,"POST","/v2/accounts:revokeToken",Hn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){z(e.idToken,"internal-error"),z(typeof e.idToken<"u","internal-error"),z(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Vl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){z(e.length!==0,"internal-error");const t=Vl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(z(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await sy(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new nr;return r&&(z(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(z(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(z(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new nr,this.toJSON())}_performRefresh(){return xt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xt(n,e){z(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class mt{constructor({uid:e,auth:t,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new ny(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Yo(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await pi(this,this.stsTokenManager.getToken(this.auth,e));return z(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ey(this,e)}reload(){return ry(this)}_assign(e){this!==e&&(z(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new mt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){z(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Rs(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(lt(this.auth.app))return Promise.reject(cn(this.auth));const e=await this.getIdToken();return await pi(this,Z_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,i=t.email??void 0,s=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,d=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:y,emailVerified:w,isAnonymous:b,providerData:P,stsTokenManager:k}=t;z(y&&k,e,"internal-error");const C=nr.fromJSON(this.name,k);z(typeof y=="string",e,"internal-error"),Xt(r,e.name),Xt(i,e.name),z(typeof w=="boolean",e,"internal-error"),z(typeof b=="boolean",e,"internal-error"),Xt(s,e.name),Xt(a,e.name),Xt(c,e.name),Xt(u,e.name),Xt(d,e.name),Xt(f,e.name);const L=new mt({uid:y,auth:e,email:i,emailVerified:w,displayName:r,isAnonymous:b,photoURL:a,phoneNumber:s,tenantId:c,stsTokenManager:C,createdAt:d,lastLoginAt:f});return P&&Array.isArray(P)&&(L.providerData=P.map(N=>({...N}))),u&&(L._redirectEventId=u),L}static async _fromIdTokenResponse(e,t,r=!1){const i=new nr;i.updateFromServerResponse(t);const s=new mt({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Rs(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];z(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Vh(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new nr;c.updateFromIdToken(r);const u=new mt({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Yo(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nl=new Map;function Lt(n){Ut(n instanceof Function,"Expected a class definition");let e=Nl.get(n);return e?(Ut(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Nl.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Nh.type="NONE";const xl=Nh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function us(n,e,t){return`firebase:${n}:${e}:${t}`}class rr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=us(this.userKey,i.apiKey,s),this.fullPersistenceKey=us("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await bs(this.auth,{idToken:e}).catch(()=>{});return t?mt._fromGetAccountInfoResponse(this.auth,t,e):null}return mt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new rr(Lt(xl),e,r);const i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let s=i[0]||Lt(xl);const a=us(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const f=await d._get(a);if(f){let y;if(typeof f=="string"){const w=await bs(e,{idToken:f}).catch(()=>{});if(!w)break;y=await mt._fromGetAccountInfoResponse(e,w,f)}else y=mt._fromJSON(e,f);d!==s&&(c=y),s=d;break}}catch{}const u=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new rr(s,e,r):(s=u[0],c&&await s._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(a)}catch{}})),new rr(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ll(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Fh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(xh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(jh(e))return"Blackberry";if(Bh(e))return"Webos";if(Lh(e))return"Safari";if((e.includes("chrome/")||Mh(e))&&!e.includes("edge/"))return"Chrome";if(Uh(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function xh(n=Ge()){return/firefox\//i.test(n)}function Lh(n=Ge()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Mh(n=Ge()){return/crios\//i.test(n)}function Fh(n=Ge()){return/iemobile/i.test(n)}function Uh(n=Ge()){return/android/i.test(n)}function jh(n=Ge()){return/blackberry/i.test(n)}function Bh(n=Ge()){return/webos/i.test(n)}function Fa(n=Ge()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function ay(n=Ge()){var e;return Fa(n)&&!!((e=window.navigator)!=null&&e.standalone)}function cy(){return wg()&&document.documentMode===10}function $h(n=Ge()){return Fa(n)||Uh(n)||Bh(n)||jh(n)||/windows phone/i.test(n)||Fh(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qh(n,e=[]){let t;switch(n){case"Browser":t=Ll(Ge());break;case"Worker":t=`${Ll(Ge())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Ir}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ly{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((a,c)=>{try{const u=e(s);a(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uy(n,e={}){return yn(n,"GET","/v2/passwordPolicy",Hn(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hy=6;class dy{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??hy,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fy{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ml(this),this.idTokenSubscription=new Ml(this),this.beforeStateQueue=new ly(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ph,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Lt(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await rr.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await bs(this,{idToken:e}),r=await mt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(lt(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(s=this.redirectUser)==null?void 0:s._redirectEventId,c=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===c)&&(u!=null&&u.user)&&(r=u.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return z(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Rs(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=z_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(lt(this.app))return Promise.reject(cn(this));const t=e?ke(e):null;return t&&z(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&z(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return lt(this.app)?Promise.reject(cn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return lt(this.app)?Promise.reject(cn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Lt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await uy(this),t=new dy(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ai("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await oy(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Lt(e)||this._popupRedirectResolver;z(t,this,"argument-error"),this.redirectPersistenceManager=await rr.create(this,[Lt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(z(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,i);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return z(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=qh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(lt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&$_(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Ar(n){return ke(n)}class Ml{constructor(e){this.auth=e,this.observer=null,this.addObserver=kg(t=>this.observer=t)}get next(){return z(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ws={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function py(n){Ws=n}function Hh(n){return Ws.loadJS(n)}function my(){return Ws.recaptchaEnterpriseScript}function gy(){return Ws.gapiScript}function _y(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class yy{constructor(){this.enterprise=new vy}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class vy{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Ey="recaptcha-enterprise",zh="NO_RECAPTCHA";class Ty{constructor(e){this.type=Ey,this.auth=Ar(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,c)=>{X_(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new J_(u);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,a(d.siteKey)}}).catch(u=>{c(u)})})}function i(s,a,c){const u=window.grecaptcha;Ol(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(d=>{a(d)}).catch(()=>{a(zh)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new yy().execute("siteKey",{action:"verify"}):new Promise((s,a)=>{r(this.auth).then(c=>{if(!t&&Ol(window.grecaptcha))i(c,s,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=my();u.length!==0&&(u+=c),Hh(u).then(()=>{i(c,s,a)}).catch(d=>{a(d)})}}).catch(c=>{a(c)})})}}async function Fl(n,e,t,r=!1,i=!1){const s=new Ty(n);let a;if(i)a=zh;else try{a=await s.verify(t)}catch{a=await s.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Ul(n,e,t,r,i){var s;if((s=n._getRecaptchaConfig())!=null&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await Fl(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await Fl(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wy(n,e){const t=Hs(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Mn(s,e??{}))return i;_t(i,"already-initialized")}return t.initialize({options:e})}function Iy(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Lt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Ay(n,e,t){const r=Ar(n);z(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=Wh(e),{host:a,port:c}=by(e),u=c===null?"":`:${c}`,d={url:`${s}//${a}${u}/`},f=Object.freeze({host:a,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){z(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),z(Mn(d,r.config.emulator)&&Mn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,qn(a)?(ka(`${s}//${a}${u}`),Da("Auth",!0)):Ry()}function Wh(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function by(n){const e=Wh(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:jl(r.substr(s.length+1))}}else{const[s,a]=r.split(":");return{host:s,port:jl(a)}}}function jl(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Ry(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ua{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return xt("not implemented")}_getIdTokenResponse(e){return xt("not implemented")}_linkToIdToken(e,t){return xt("not implemented")}_getReauthenticationResolver(e){return xt("not implemented")}}async function Sy(n,e){return yn(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Py(n,e){return zs(n,"POST","/v1/accounts:signInWithPassword",Hn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cy(n,e){return zs(n,"POST","/v1/accounts:signInWithEmailLink",Hn(n,e))}async function ky(n,e){return zs(n,"POST","/v1/accounts:signInWithEmailLink",Hn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi extends Ua{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new mi(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new mi(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ul(e,t,"signInWithPassword",Py);case"emailLink":return Cy(e,{email:this._email,oobCode:this._password});default:_t(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ul(e,r,"signUpPassword",Sy);case"emailLink":return ky(e,{idToken:t,email:this._email,oobCode:this._password});default:_t(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ir(n,e){return zs(n,"POST","/v1/accounts:signInWithIdp",Hn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dy="http://localhost";class Un extends Ua{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Un(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):_t("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=t;if(!r||!i)return null;const a=new Un(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return ir(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,ir(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,ir(e,t)}buildRequest(){const e={requestUri:Dy,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=bi(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oy(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Vy(n){const e=Qr(Yr(n)).link,t=e?Qr(Yr(e)).deep_link_id:null,r=Qr(Yr(n)).deep_link_id;return(r?Qr(Yr(r)).link:null)||r||t||e||n}class ja{constructor(e){const t=Qr(Yr(e)),r=t.apiKey??null,i=t.oobCode??null,s=Oy(t.mode??null);z(r&&i&&s,"argument-error"),this.apiKey=r,this.operation=s,this.code=i,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=Vy(e);try{return new ja(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(){this.providerId=br.PROVIDER_ID}static credential(e,t){return mi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=ja.parseLink(t);return z(r,"argument-error"),mi._fromEmailAndCode(e,r.code,r.tenantId)}}br.PROVIDER_ID="password";br.EMAIL_PASSWORD_SIGN_IN_METHOD="password";br.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gh{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si extends Gh{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt extends Si{constructor(){super("facebook.com")}static credential(e){return Un._fromParams({providerId:Zt.PROVIDER_ID,signInMethod:Zt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Zt.credentialFromTaggedObject(e)}static credentialFromError(e){return Zt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Zt.credential(e.oauthAccessToken)}catch{return null}}}Zt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Zt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en extends Si{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Un._fromParams({providerId:en.PROVIDER_ID,signInMethod:en.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return en.credentialFromTaggedObject(e)}static credentialFromError(e){return en.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return en.credential(t,r)}catch{return null}}}en.GOOGLE_SIGN_IN_METHOD="google.com";en.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn extends Si{constructor(){super("github.com")}static credential(e){return Un._fromParams({providerId:tn.PROVIDER_ID,signInMethod:tn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return tn.credentialFromTaggedObject(e)}static credentialFromError(e){return tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return tn.credential(e.oauthAccessToken)}catch{return null}}}tn.GITHUB_SIGN_IN_METHOD="github.com";tn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn extends Si{constructor(){super("twitter.com")}static credential(e,t){return Un._fromParams({providerId:nn.PROVIDER_ID,signInMethod:nn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return nn.credentialFromTaggedObject(e)}static credentialFromError(e){return nn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return nn.credential(t,r)}catch{return null}}}nn.TWITTER_SIGN_IN_METHOD="twitter.com";nn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await mt._fromIdTokenResponse(e,r,i),a=Bl(r);return new mr({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=Bl(r);return new mr({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function Bl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss extends $t{constructor(e,t,r,i){super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Ss.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Ss(e,t,r,i)}}function Kh(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ss._fromErrorAndOperation(n,s,e,r):s})}async function Ny(n,e,t=!1){const r=await pi(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return mr._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xy(n,e,t=!1){const{auth:r}=n;if(lt(r.app))return Promise.reject(cn(r));const i="reauthenticate";try{const s=await pi(n,Kh(r,i,e,n),t);z(s.idToken,r,"internal-error");const a=Ma(s.idToken);z(a,r,"internal-error");const{sub:c}=a;return z(n.uid===c,r,"user-mismatch"),mr._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&_t(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qh(n,e,t=!1){if(lt(n.app))return Promise.reject(cn(n));const r="signIn",i=await Kh(n,r,e),s=await mr._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function Ly(n,e){return Qh(Ar(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function My(n){const e=Ar(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function zI(n,e,t){return lt(n.app)?Promise.reject(cn(n)):Ly(ke(n),br.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&My(n),r})}function Fy(n,e,t,r){return ke(n).onIdTokenChanged(e,t,r)}function Uy(n,e,t){return ke(n).beforeAuthStateChanged(e,t)}function jy(n,e,t,r){return ke(n).onAuthStateChanged(e,t,r)}function By(n){return ke(n).signOut()}const Ps="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yh{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ps,"1"),this.storage.removeItem(Ps),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $y=1e3,qy=10;class Jh extends Yh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=$h(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);cy()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,qy):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},$y)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Jh.type="LOCAL";const Hy=Jh;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh extends Yh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Xh.type="SESSION";const Zh=Xh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zy(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gs{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Gs(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(a).map(async d=>d(t.origin,s)),u=await zy(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Gs.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ba(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wy{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((c,u)=>{const d=Ba("",20);i.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(y){const w=y;if(w.data.eventId===d)switch(w.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(w.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(){return window}function Gy(n){St().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ed(){return typeof St().WorkerGlobalScope<"u"&&typeof St().importScripts=="function"}async function Ky(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Qy(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function Yy(){return ed()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const td="firebaseLocalStorageDb",Jy=1,Cs="firebaseLocalStorage",nd="fbase_key";class Pi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ks(n,e){return n.transaction([Cs],e?"readwrite":"readonly").objectStore(Cs)}function Xy(){const n=indexedDB.deleteDatabase(td);return new Pi(n).toPromise()}function Jo(){const n=indexedDB.open(td,Jy);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Cs,{keyPath:nd})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Cs)?e(r):(r.close(),await Xy(),e(await Jo()))})})}async function $l(n,e,t){const r=Ks(n,!0).put({[nd]:e,value:t});return new Pi(r).toPromise()}async function Zy(n,e){const t=Ks(n,!1).get(e),r=await new Pi(t).toPromise();return r===void 0?null:r.value}function ql(n,e){const t=Ks(n,!0).delete(e);return new Pi(t).toPromise()}const ev=800,tv=3;class rd{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Jo(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>tv)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ed()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Gs._getInstance(Yy()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await Ky(),!this.activeServiceWorker)return;this.sender=new Wy(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Qy()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Jo();return await $l(e,Ps,"1"),await ql(e,Ps),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>$l(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Zy(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>ql(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Ks(i,!1).getAll();return new Pi(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),ev)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}rd.type="LOCAL";const nv=rd;new Ri(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rv(n,e){return e?Lt(e):(z(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $a extends Ua{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ir(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ir(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ir(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function iv(n){return Qh(n.auth,new $a(n),n.bypassAuthState)}function sv(n){const{auth:e,user:t}=n;return z(t,e,"internal-error"),xy(t,new $a(n),n.bypassAuthState)}async function ov(n){const{auth:e,user:t}=n;return z(t,e,"internal-error"),Ny(t,new $a(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return iv;case"linkViaPopup":case"linkViaRedirect":return ov;case"reauthViaPopup":case"reauthViaRedirect":return sv;default:_t(this.auth,"internal-error")}}resolve(e){Ut(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ut(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const av=new Ri(2e3,1e4);class er extends id{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,er.currentPopupAction&&er.currentPopupAction.cancel(),er.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return z(e,this.auth,"internal-error"),e}async onExecution(){Ut(this.filter.length===1,"Popup operations only handle one event");const e=Ba();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Rt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Rt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,er.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Rt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,av.get())};e()}}er.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cv="pendingRedirect",hs=new Map;class lv extends id{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=hs.get(this.auth._key());if(!e){try{const r=await uv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}hs.set(this.auth._key(),e)}return this.bypassAuthState||hs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function uv(n,e){const t=fv(e),r=dv(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function hv(n,e){hs.set(n._key(),e)}function dv(n){return Lt(n._redirectPersistence)}function fv(n){return us(cv,n.config.apiKey,n.name)}async function pv(n,e,t=!1){if(lt(n.app))return Promise.reject(cn(n));const r=Ar(n),i=rv(r,e),a=await new lv(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mv=600*1e3;class gv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!_v(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!sd(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(Rt(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=mv&&this.cachedEventUids.clear(),this.cachedEventUids.has(Hl(e))}saveEventToCache(e){this.cachedEventUids.add(Hl(e)),this.lastProcessedEventTime=Date.now()}}function Hl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function sd({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function _v(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return sd(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yv(n,e={}){return yn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ev=/^https?/;async function Tv(n){if(n.config.emulator)return;const{authorizedDomains:e}=await yv(n);for(const t of e)try{if(wv(t))return}catch{}_t(n,"unauthorized-domain")}function wv(n){const e=Qo(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Ev.test(t))return!1;if(vv.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iv=new Ri(3e4,6e4);function zl(){const n=St().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Av(n){return new Promise((e,t)=>{var i,s,a;function r(){zl(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{zl(),t(Rt(n,"network-request-failed"))},timeout:Iv.get()})}if((s=(i=St().gapi)==null?void 0:i.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((a=St().gapi)!=null&&a.load)r();else{const c=_y("iframefcb");return St()[c]=()=>{gapi.load?r():t(Rt(n,"network-request-failed"))},Hh(`${gy()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw ds=null,e})}let ds=null;function bv(n){return ds=ds||Av(n),ds}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rv=new Ri(5e3,15e3),Sv="__/auth/iframe",Pv="emulator/auth/iframe",Cv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},kv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Dv(n){const e=n.config;z(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?La(e,Pv):`https://${n.config.authDomain}/${Sv}`,r={apiKey:e.apiKey,appName:n.name,v:Ir},i=kv.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${bi(r).slice(1)}`}async function Ov(n){const e=await bv(n),t=St().gapi;return z(t,n,"internal-error"),e.open({where:document.body,url:Dv(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Cv,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const a=Rt(n,"network-request-failed"),c=St().setTimeout(()=>{s(a)},Rv.get());function u(){St().clearTimeout(c),i(r)}r.ping(u).then(u,()=>{s(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Nv=500,xv=600,Lv="_blank",Mv="http://localhost";class Wl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Fv(n,e,t,r=Nv,i=xv){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...Vv,width:r.toString(),height:i.toString(),top:s,left:a},d=Ge().toLowerCase();t&&(c=Mh(d)?Lv:t),xh(d)&&(e=e||Mv,u.scrollbars="yes");const f=Object.entries(u).reduce((w,[b,P])=>`${w}${b}=${P},`,"");if(ay(d)&&c!=="_self")return Uv(e||"",c),new Wl(null);const y=window.open(e||"",c,f);z(y,n,"popup-blocked");try{y.focus()}catch{}return new Wl(y)}function Uv(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jv="__/auth/handler",Bv="emulator/auth/handler",$v=encodeURIComponent("fac");async function Gl(n,e,t,r,i,s){z(n.config.authDomain,n,"auth-domain-config-required"),z(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Ir,eventId:i};if(e instanceof Gh){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Cg(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,y]of Object.entries({}))a[f]=y}if(e instanceof Si){const f=e.getScopes().filter(y=>y!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),d=u?`#${$v}=${encodeURIComponent(u)}`:"";return`${qv(n)}?${bi(c).slice(1)}${d}`}function qv({config:n}){return n.emulator?La(n,Bv):`https://${n.authDomain}/${jv}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo="webStorageSupport";class Hv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Zh,this._completeRedirectFn=pv,this._overrideRedirectResult=hv}async _openPopup(e,t,r,i){var a;Ut((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const s=await Gl(e,t,r,Qo(),i);return Fv(e,s,Ba())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await Gl(e,t,r,Qo(),i);return Gy(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Ut(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Ov(e),r=new gv(e);return t.register("authEvent",i=>(z(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Vo,{type:Vo},i=>{var a;const s=(a=i==null?void 0:i[0])==null?void 0:a[Vo];s!==void 0&&t(!!s),_t(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Tv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return $h()||Lh()||Fa()}}const zv=Hv;var Kl="@firebase/auth",Ql="1.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){z(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gv(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Kv(n){Fn(new un("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;z(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:qh(n)},d=new fy(r,i,s,u);return Iy(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Fn(new un("auth-internal",e=>{const t=Ar(e.getProvider("auth").getImmediate());return(r=>new Wv(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),bt(Kl,Ql,Gv(n)),bt(Kl,Ql,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qv=300,Yv=Th("authIdTokenMaxAge")||Qv;let Yl=null;const Jv=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Yv)return;const i=t==null?void 0:t.token;Yl!==i&&(Yl=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Xv(n=Na()){const e=Hs(n,"auth");if(e.isInitialized())return e.getImmediate();const t=wy(n,{popupRedirectResolver:zv,persistence:[nv,Hy,Zh]}),r=Th("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const a=Jv(s.toString());Uy(t,a,()=>a(t.currentUser)),Fy(t,c=>a(c))}}const i=yh("auth");return i&&Ay(t,`http://${i}`),t}function Zv(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}py({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=Rt("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",Zv().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Kv("Browser");var eE="firebase",tE="12.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */bt(eE,tE,"app");var Jl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ln,od;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,g){function _(){}_.prototype=g.prototype,v.F=g.prototype,v.prototype=new _,v.prototype.constructor=v,v.D=function(T,E,I){for(var m=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)m[ne-2]=arguments[ne];return g.prototype[E].apply(T,m)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(v,g,_){_||(_=0);const T=Array(16);if(typeof g=="string")for(var E=0;E<16;++E)T[E]=g.charCodeAt(_++)|g.charCodeAt(_++)<<8|g.charCodeAt(_++)<<16|g.charCodeAt(_++)<<24;else for(E=0;E<16;++E)T[E]=g[_++]|g[_++]<<8|g[_++]<<16|g[_++]<<24;g=v.g[0],_=v.g[1],E=v.g[2];let I=v.g[3],m;m=g+(I^_&(E^I))+T[0]+3614090360&4294967295,g=_+(m<<7&4294967295|m>>>25),m=I+(E^g&(_^E))+T[1]+3905402710&4294967295,I=g+(m<<12&4294967295|m>>>20),m=E+(_^I&(g^_))+T[2]+606105819&4294967295,E=I+(m<<17&4294967295|m>>>15),m=_+(g^E&(I^g))+T[3]+3250441966&4294967295,_=E+(m<<22&4294967295|m>>>10),m=g+(I^_&(E^I))+T[4]+4118548399&4294967295,g=_+(m<<7&4294967295|m>>>25),m=I+(E^g&(_^E))+T[5]+1200080426&4294967295,I=g+(m<<12&4294967295|m>>>20),m=E+(_^I&(g^_))+T[6]+2821735955&4294967295,E=I+(m<<17&4294967295|m>>>15),m=_+(g^E&(I^g))+T[7]+4249261313&4294967295,_=E+(m<<22&4294967295|m>>>10),m=g+(I^_&(E^I))+T[8]+1770035416&4294967295,g=_+(m<<7&4294967295|m>>>25),m=I+(E^g&(_^E))+T[9]+2336552879&4294967295,I=g+(m<<12&4294967295|m>>>20),m=E+(_^I&(g^_))+T[10]+4294925233&4294967295,E=I+(m<<17&4294967295|m>>>15),m=_+(g^E&(I^g))+T[11]+2304563134&4294967295,_=E+(m<<22&4294967295|m>>>10),m=g+(I^_&(E^I))+T[12]+1804603682&4294967295,g=_+(m<<7&4294967295|m>>>25),m=I+(E^g&(_^E))+T[13]+4254626195&4294967295,I=g+(m<<12&4294967295|m>>>20),m=E+(_^I&(g^_))+T[14]+2792965006&4294967295,E=I+(m<<17&4294967295|m>>>15),m=_+(g^E&(I^g))+T[15]+1236535329&4294967295,_=E+(m<<22&4294967295|m>>>10),m=g+(E^I&(_^E))+T[1]+4129170786&4294967295,g=_+(m<<5&4294967295|m>>>27),m=I+(_^E&(g^_))+T[6]+3225465664&4294967295,I=g+(m<<9&4294967295|m>>>23),m=E+(g^_&(I^g))+T[11]+643717713&4294967295,E=I+(m<<14&4294967295|m>>>18),m=_+(I^g&(E^I))+T[0]+3921069994&4294967295,_=E+(m<<20&4294967295|m>>>12),m=g+(E^I&(_^E))+T[5]+3593408605&4294967295,g=_+(m<<5&4294967295|m>>>27),m=I+(_^E&(g^_))+T[10]+38016083&4294967295,I=g+(m<<9&4294967295|m>>>23),m=E+(g^_&(I^g))+T[15]+3634488961&4294967295,E=I+(m<<14&4294967295|m>>>18),m=_+(I^g&(E^I))+T[4]+3889429448&4294967295,_=E+(m<<20&4294967295|m>>>12),m=g+(E^I&(_^E))+T[9]+568446438&4294967295,g=_+(m<<5&4294967295|m>>>27),m=I+(_^E&(g^_))+T[14]+3275163606&4294967295,I=g+(m<<9&4294967295|m>>>23),m=E+(g^_&(I^g))+T[3]+4107603335&4294967295,E=I+(m<<14&4294967295|m>>>18),m=_+(I^g&(E^I))+T[8]+1163531501&4294967295,_=E+(m<<20&4294967295|m>>>12),m=g+(E^I&(_^E))+T[13]+2850285829&4294967295,g=_+(m<<5&4294967295|m>>>27),m=I+(_^E&(g^_))+T[2]+4243563512&4294967295,I=g+(m<<9&4294967295|m>>>23),m=E+(g^_&(I^g))+T[7]+1735328473&4294967295,E=I+(m<<14&4294967295|m>>>18),m=_+(I^g&(E^I))+T[12]+2368359562&4294967295,_=E+(m<<20&4294967295|m>>>12),m=g+(_^E^I)+T[5]+4294588738&4294967295,g=_+(m<<4&4294967295|m>>>28),m=I+(g^_^E)+T[8]+2272392833&4294967295,I=g+(m<<11&4294967295|m>>>21),m=E+(I^g^_)+T[11]+1839030562&4294967295,E=I+(m<<16&4294967295|m>>>16),m=_+(E^I^g)+T[14]+4259657740&4294967295,_=E+(m<<23&4294967295|m>>>9),m=g+(_^E^I)+T[1]+2763975236&4294967295,g=_+(m<<4&4294967295|m>>>28),m=I+(g^_^E)+T[4]+1272893353&4294967295,I=g+(m<<11&4294967295|m>>>21),m=E+(I^g^_)+T[7]+4139469664&4294967295,E=I+(m<<16&4294967295|m>>>16),m=_+(E^I^g)+T[10]+3200236656&4294967295,_=E+(m<<23&4294967295|m>>>9),m=g+(_^E^I)+T[13]+681279174&4294967295,g=_+(m<<4&4294967295|m>>>28),m=I+(g^_^E)+T[0]+3936430074&4294967295,I=g+(m<<11&4294967295|m>>>21),m=E+(I^g^_)+T[3]+3572445317&4294967295,E=I+(m<<16&4294967295|m>>>16),m=_+(E^I^g)+T[6]+76029189&4294967295,_=E+(m<<23&4294967295|m>>>9),m=g+(_^E^I)+T[9]+3654602809&4294967295,g=_+(m<<4&4294967295|m>>>28),m=I+(g^_^E)+T[12]+3873151461&4294967295,I=g+(m<<11&4294967295|m>>>21),m=E+(I^g^_)+T[15]+530742520&4294967295,E=I+(m<<16&4294967295|m>>>16),m=_+(E^I^g)+T[2]+3299628645&4294967295,_=E+(m<<23&4294967295|m>>>9),m=g+(E^(_|~I))+T[0]+4096336452&4294967295,g=_+(m<<6&4294967295|m>>>26),m=I+(_^(g|~E))+T[7]+1126891415&4294967295,I=g+(m<<10&4294967295|m>>>22),m=E+(g^(I|~_))+T[14]+2878612391&4294967295,E=I+(m<<15&4294967295|m>>>17),m=_+(I^(E|~g))+T[5]+4237533241&4294967295,_=E+(m<<21&4294967295|m>>>11),m=g+(E^(_|~I))+T[12]+1700485571&4294967295,g=_+(m<<6&4294967295|m>>>26),m=I+(_^(g|~E))+T[3]+2399980690&4294967295,I=g+(m<<10&4294967295|m>>>22),m=E+(g^(I|~_))+T[10]+4293915773&4294967295,E=I+(m<<15&4294967295|m>>>17),m=_+(I^(E|~g))+T[1]+2240044497&4294967295,_=E+(m<<21&4294967295|m>>>11),m=g+(E^(_|~I))+T[8]+1873313359&4294967295,g=_+(m<<6&4294967295|m>>>26),m=I+(_^(g|~E))+T[15]+4264355552&4294967295,I=g+(m<<10&4294967295|m>>>22),m=E+(g^(I|~_))+T[6]+2734768916&4294967295,E=I+(m<<15&4294967295|m>>>17),m=_+(I^(E|~g))+T[13]+1309151649&4294967295,_=E+(m<<21&4294967295|m>>>11),m=g+(E^(_|~I))+T[4]+4149444226&4294967295,g=_+(m<<6&4294967295|m>>>26),m=I+(_^(g|~E))+T[11]+3174756917&4294967295,I=g+(m<<10&4294967295|m>>>22),m=E+(g^(I|~_))+T[2]+718787259&4294967295,E=I+(m<<15&4294967295|m>>>17),m=_+(I^(E|~g))+T[9]+3951481745&4294967295,v.g[0]=v.g[0]+g&4294967295,v.g[1]=v.g[1]+(E+(m<<21&4294967295|m>>>11))&4294967295,v.g[2]=v.g[2]+E&4294967295,v.g[3]=v.g[3]+I&4294967295}r.prototype.v=function(v,g){g===void 0&&(g=v.length);const _=g-this.blockSize,T=this.C;let E=this.h,I=0;for(;I<g;){if(E==0)for(;I<=_;)i(this,v,I),I+=this.blockSize;if(typeof v=="string"){for(;I<g;)if(T[E++]=v.charCodeAt(I++),E==this.blockSize){i(this,T),E=0;break}}else for(;I<g;)if(T[E++]=v[I++],E==this.blockSize){i(this,T),E=0;break}}this.h=E,this.o+=g},r.prototype.A=function(){var v=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);v[0]=128;for(var g=1;g<v.length-8;++g)v[g]=0;g=this.o*8;for(var _=v.length-8;_<v.length;++_)v[_]=g&255,g/=256;for(this.v(v),v=Array(16),g=0,_=0;_<4;++_)for(let T=0;T<32;T+=8)v[g++]=this.g[_]>>>T&255;return v};function s(v,g){var _=c;return Object.prototype.hasOwnProperty.call(_,v)?_[v]:_[v]=g(v)}function a(v,g){this.h=g;const _=[];let T=!0;for(let E=v.length-1;E>=0;E--){const I=v[E]|0;T&&I==g||(_[E]=I,T=!1)}this.g=_}var c={};function u(v){return-128<=v&&v<128?s(v,function(g){return new a([g|0],g<0?-1:0)}):new a([v|0],v<0?-1:0)}function d(v){if(isNaN(v)||!isFinite(v))return y;if(v<0)return C(d(-v));const g=[];let _=1;for(let T=0;v>=_;T++)g[T]=v/_|0,_*=4294967296;return new a(g,0)}function f(v,g){if(v.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(v.charAt(0)=="-")return C(f(v.substring(1),g));if(v.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=d(Math.pow(g,8));let T=y;for(let I=0;I<v.length;I+=8){var E=Math.min(8,v.length-I);const m=parseInt(v.substring(I,I+E),g);E<8?(E=d(Math.pow(g,E)),T=T.j(E).add(d(m))):(T=T.j(_),T=T.add(d(m)))}return T}var y=u(0),w=u(1),b=u(16777216);n=a.prototype,n.m=function(){if(k(this))return-C(this).m();let v=0,g=1;for(let _=0;_<this.g.length;_++){const T=this.i(_);v+=(T>=0?T:4294967296+T)*g,g*=4294967296}return v},n.toString=function(v){if(v=v||10,v<2||36<v)throw Error("radix out of range: "+v);if(P(this))return"0";if(k(this))return"-"+C(this).toString(v);const g=d(Math.pow(v,6));var _=this;let T="";for(;;){const E=F(_,g).g;_=L(_,E.j(g));let I=((_.g.length>0?_.g[0]:_.h)>>>0).toString(v);if(_=E,P(_))return I+T;for(;I.length<6;)I="0"+I;T=I+T}},n.i=function(v){return v<0?0:v<this.g.length?this.g[v]:this.h};function P(v){if(v.h!=0)return!1;for(let g=0;g<v.g.length;g++)if(v.g[g]!=0)return!1;return!0}function k(v){return v.h==-1}n.l=function(v){return v=L(this,v),k(v)?-1:P(v)?0:1};function C(v){const g=v.g.length,_=[];for(let T=0;T<g;T++)_[T]=~v.g[T];return new a(_,~v.h).add(w)}n.abs=function(){return k(this)?C(this):this},n.add=function(v){const g=Math.max(this.g.length,v.g.length),_=[];let T=0;for(let E=0;E<=g;E++){let I=T+(this.i(E)&65535)+(v.i(E)&65535),m=(I>>>16)+(this.i(E)>>>16)+(v.i(E)>>>16);T=m>>>16,I&=65535,m&=65535,_[E]=m<<16|I}return new a(_,_[_.length-1]&-2147483648?-1:0)};function L(v,g){return v.add(C(g))}n.j=function(v){if(P(this)||P(v))return y;if(k(this))return k(v)?C(this).j(C(v)):C(C(this).j(v));if(k(v))return C(this.j(C(v)));if(this.l(b)<0&&v.l(b)<0)return d(this.m()*v.m());const g=this.g.length+v.g.length,_=[];for(var T=0;T<2*g;T++)_[T]=0;for(T=0;T<this.g.length;T++)for(let E=0;E<v.g.length;E++){const I=this.i(T)>>>16,m=this.i(T)&65535,ne=v.i(E)>>>16,ue=v.i(E)&65535;_[2*T+2*E]+=m*ue,N(_,2*T+2*E),_[2*T+2*E+1]+=I*ue,N(_,2*T+2*E+1),_[2*T+2*E+1]+=m*ne,N(_,2*T+2*E+1),_[2*T+2*E+2]+=I*ne,N(_,2*T+2*E+2)}for(v=0;v<g;v++)_[v]=_[2*v+1]<<16|_[2*v];for(v=g;v<2*g;v++)_[v]=0;return new a(_,0)};function N(v,g){for(;(v[g]&65535)!=v[g];)v[g+1]+=v[g]>>>16,v[g]&=65535,g++}function U(v,g){this.g=v,this.h=g}function F(v,g){if(P(g))throw Error("division by zero");if(P(v))return new U(y,y);if(k(v))return g=F(C(v),g),new U(C(g.g),C(g.h));if(k(g))return g=F(v,C(g)),new U(C(g.g),g.h);if(v.g.length>30){if(k(v)||k(g))throw Error("slowDivide_ only works with positive integers.");for(var _=w,T=g;T.l(v)<=0;)_=j(_),T=j(T);var E=B(_,1),I=B(T,1);for(T=B(T,2),_=B(_,2);!P(T);){var m=I.add(T);m.l(v)<=0&&(E=E.add(_),I=m),T=B(T,1),_=B(_,1)}return g=L(v,E.j(g)),new U(E,g)}for(E=y;v.l(g)>=0;){for(_=Math.max(1,Math.floor(v.m()/g.m())),T=Math.ceil(Math.log(_)/Math.LN2),T=T<=48?1:Math.pow(2,T-48),I=d(_),m=I.j(g);k(m)||m.l(v)>0;)_-=T,I=d(_),m=I.j(g);P(I)&&(I=w),E=E.add(I),v=L(v,m)}return new U(E,v)}n.B=function(v){return F(this,v).h},n.and=function(v){const g=Math.max(this.g.length,v.g.length),_=[];for(let T=0;T<g;T++)_[T]=this.i(T)&v.i(T);return new a(_,this.h&v.h)},n.or=function(v){const g=Math.max(this.g.length,v.g.length),_=[];for(let T=0;T<g;T++)_[T]=this.i(T)|v.i(T);return new a(_,this.h|v.h)},n.xor=function(v){const g=Math.max(this.g.length,v.g.length),_=[];for(let T=0;T<g;T++)_[T]=this.i(T)^v.i(T);return new a(_,this.h^v.h)};function j(v){const g=v.g.length+1,_=[];for(let T=0;T<g;T++)_[T]=v.i(T)<<1|v.i(T-1)>>>31;return new a(_,v.h)}function B(v,g){const _=g>>5;g%=32;const T=v.g.length-_,E=[];for(let I=0;I<T;I++)E[I]=g>0?v.i(I+_)>>>g|v.i(I+_+1)<<32-g:v.i(I+_);return new a(E,v.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,od=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=f,ln=a}).apply(typeof Jl<"u"?Jl:typeof self<"u"?self:typeof window<"u"?window:{});var ns=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ad,Jr,cd,fs,Xo,ld,ud,hd;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof ns=="object"&&ns];for(var l=0;l<o.length;++l){var h=o[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function i(o,l){if(l)e:{var h=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var A=o[p];if(!(A in h))break e;h=h[A]}o=o[o.length-1],p=h[o],l=l(p),l!=p&&l!=null&&e(h,o,{configurable:!0,writable:!0,value:l})}}i("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(o){return o||function(l){var h=[],p;for(p in l)Object.prototype.hasOwnProperty.call(l,p)&&h.push([p,l[p]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var s=s||{},a=this||self;function c(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function u(o,l,h){return o.call.apply(o.bind,arguments)}function d(o,l,h){return d=u,d.apply(null,arguments)}function f(o,l){var h=Array.prototype.slice.call(arguments,1);return function(){var p=h.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function y(o,l){function h(){}h.prototype=l.prototype,o.Z=l.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(p,A,R){for(var O=Array(arguments.length-2),Y=2;Y<arguments.length;Y++)O[Y-2]=arguments[Y];return l.prototype[A].apply(p,O)}}var w=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function b(o){const l=o.length;if(l>0){const h=Array(l);for(let p=0;p<l;p++)h[p]=o[p];return h}return[]}function P(o,l){for(let p=1;p<arguments.length;p++){const A=arguments[p];var h=typeof A;if(h=h!="object"?h:A?Array.isArray(A)?"array":h:"null",h=="array"||h=="object"&&typeof A.length=="number"){h=o.length||0;const R=A.length||0;o.length=h+R;for(let O=0;O<R;O++)o[h+O]=A[O]}else o.push(A)}}class k{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function C(o){a.setTimeout(()=>{throw o},0)}function L(){var o=v;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class N{constructor(){this.h=this.g=null}add(l,h){const p=U.get();p.set(l,h),this.h?this.h.next=p:this.g=p,this.h=p}}var U=new k(()=>new F,o=>o.reset());class F{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let j,B=!1,v=new N,g=()=>{const o=Promise.resolve(void 0);j=()=>{o.then(_)}};function _(){for(var o;o=L();){try{o.h.call(o.g)}catch(h){C(h)}var l=U;l.j(o),l.h<100&&(l.h++,o.next=l.g,l.g=o)}B=!1}function T(){this.u=this.u,this.C=this.C}T.prototype.u=!1,T.prototype.dispose=function(){this.u||(this.u=!0,this.N())},T.prototype[Symbol.dispose]=function(){this.dispose()},T.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var I=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};a.addEventListener("test",h,l),a.removeEventListener("test",h,l)}catch{}return o})();function m(o){return/^[\s\xa0]*$/.test(o)}function ne(o,l){E.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,l)}y(ne,E),ne.prototype.init=function(o,l){const h=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget,l||(h=="mouseover"?l=o.fromElement:h=="mouseout"&&(l=o.toElement)),this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&ne.Z.h.call(this)},ne.prototype.h=function(){ne.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var ue="closure_listenable_"+(Math.random()*1e6|0),Q=0;function oe(o,l,h,p,A){this.listener=o,this.proxy=null,this.src=l,this.type=h,this.capture=!!p,this.ha=A,this.key=++Q,this.da=this.fa=!1}function Te(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Ve(o,l,h){for(const p in o)l.call(h,o[p],p,o)}function Fe(o,l){for(const h in o)l.call(void 0,o[h],h,o)}function Je(o){const l={};for(const h in o)l[h]=o[h];return l}const Ke="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function it(o,l){let h,p;for(let A=1;A<arguments.length;A++){p=arguments[A];for(h in p)o[h]=p[h];for(let R=0;R<Ke.length;R++)h=Ke[R],Object.prototype.hasOwnProperty.call(p,h)&&(o[h]=p[h])}}function be(o){this.src=o,this.g={},this.h=0}be.prototype.add=function(o,l,h,p,A){const R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);const O=Xe(o,l,p,A);return O>-1?(l=o[O],h||(l.fa=!1)):(l=new oe(l,this.src,R,!!p,A),l.fa=h,o.push(l)),l};function Ne(o,l){const h=l.type;if(h in o.g){var p=o.g[h],A=Array.prototype.indexOf.call(p,l,void 0),R;(R=A>=0)&&Array.prototype.splice.call(p,A,1),R&&(Te(l),o.g[h].length==0&&(delete o.g[h],o.h--))}}function Xe(o,l,h,p){for(let A=0;A<o.length;++A){const R=o[A];if(!R.da&&R.listener==l&&R.capture==!!h&&R.ha==p)return A}return-1}var $="closure_lm_"+(Math.random()*1e6|0),re={};function ie(o,l,h,p,A){if(Array.isArray(l)){for(let R=0;R<l.length;R++)ie(o,l[R],h,p,A);return null}return h=Ze(h),o&&o[ue]?o.J(l,h,c(p)?!!p.capture:!1,A):fe(o,l,h,!1,p,A)}function fe(o,l,h,p,A,R){if(!l)throw Error("Invalid event type");const O=c(A)?!!A.capture:!!A;let Y=me(o);if(Y||(o[$]=Y=new be(o)),h=Y.add(l,h,p,O,R),h.proxy)return h;if(p=pe(),h.proxy=p,p.src=o,p.listener=h,o.addEventListener)I||(A=O),A===void 0&&(A=!1),o.addEventListener(l.toString(),p,A);else if(o.attachEvent)o.attachEvent(_e(l.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return h}function pe(){function o(h){return l.call(o.src,o.listener,h)}const l=Qe;return o}function se(o,l,h,p,A){if(Array.isArray(l))for(var R=0;R<l.length;R++)se(o,l[R],h,p,A);else p=c(p)?!!p.capture:!!p,h=Ze(h),o&&o[ue]?(o=o.i,R=String(l).toString(),R in o.g&&(l=o.g[R],h=Xe(l,h,p,A),h>-1&&(Te(l[h]),Array.prototype.splice.call(l,h,1),l.length==0&&(delete o.g[R],o.h--)))):o&&(o=me(o))&&(l=o.g[l.toString()],o=-1,l&&(o=Xe(l,h,p,A)),(h=o>-1?l[o]:null)&&Re(h))}function Re(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[ue])Ne(l.i,o);else{var h=o.type,p=o.proxy;l.removeEventListener?l.removeEventListener(h,p,o.capture):l.detachEvent?l.detachEvent(_e(h),p):l.addListener&&l.removeListener&&l.removeListener(p),(h=me(l))?(Ne(h,o),h.h==0&&(h.src=null,l[$]=null)):Te(o)}}}function _e(o){return o in re?re[o]:re[o]="on"+o}function Qe(o,l){if(o.da)o=!0;else{l=new ne(l,this);const h=o.listener,p=o.ha||o.src;o.fa&&Re(o),o=h.call(p,l)}return o}function me(o){return o=o[$],o instanceof be?o:null}var we="__closure_events_fn_"+(Math.random()*1e9>>>0);function Ze(o){return typeof o=="function"?o:(o[we]||(o[we]=function(l){return o.handleEvent(l)}),o[we])}function ye(){T.call(this),this.i=new be(this),this.M=this,this.G=null}y(ye,T),ye.prototype[ue]=!0,ye.prototype.removeEventListener=function(o,l,h,p){se(this,o,l,h,p)};function ce(o,l){var h,p=o.G;if(p)for(h=[];p;p=p.G)h.push(p);if(o=o.M,p=l.type||l,typeof l=="string")l=new E(l,o);else if(l instanceof E)l.target=l.target||o;else{var A=l;l=new E(p,o),it(l,A)}A=!0;let R,O;if(h)for(O=h.length-1;O>=0;O--)R=l.g=h[O],A=ct(R,p,!0,l)&&A;if(R=l.g=o,A=ct(R,p,!0,l)&&A,A=ct(R,p,!1,l)&&A,h)for(O=0;O<h.length;O++)R=l.g=h[O],A=ct(R,p,!1,l)&&A}ye.prototype.N=function(){if(ye.Z.N.call(this),this.i){var o=this.i;for(const l in o.g){const h=o.g[l];for(let p=0;p<h.length;p++)Te(h[p]);delete o.g[l],o.h--}}this.G=null},ye.prototype.J=function(o,l,h,p){return this.i.add(String(o),l,!1,h,p)},ye.prototype.K=function(o,l,h,p){return this.i.add(String(o),l,!0,h,p)};function ct(o,l,h,p){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();let A=!0;for(let R=0;R<l.length;++R){const O=l[R];if(O&&!O.da&&O.capture==h){const Y=O.listener,De=O.ha||O.src;O.fa&&Ne(o.i,O),A=Y.call(De,p)!==!1&&A}}return A&&!p.defaultPrevented}function vn(o,l){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=d(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:a.setTimeout(o,l||0)}function qt(o){o.g=vn(()=>{o.g=null,o.i&&(o.i=!1,qt(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class En extends T{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:qt(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function vt(o){T.call(this),this.h=o,this.g={}}y(vt,T);var Tn=[];function Ot(o){Ve(o.g,function(l,h){this.g.hasOwnProperty(h)&&Re(l)},o),o.g={}}vt.prototype.N=function(){vt.Z.N.call(this),Ot(this)},vt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ht=a.JSON.stringify,wn=a.JSON.parse,Dr=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function et(){}function zt(){}var st={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Ye(){E.call(this,"d")}y(Ye,E);function Or(){E.call(this,"c")}y(Or,E);var pt={},Ni=null;function Vt(){return Ni=Ni||new ye}pt.Ia="serverreachability";function xi(o){E.call(this,pt.Ia,o)}y(xi,E);function In(o){const l=Vt();ce(l,new xi(l))}pt.STAT_EVENT="statevent";function Li(o,l){E.call(this,pt.STAT_EVENT,o),this.stat=l}y(Li,E);function Ue(o){const l=Vt();ce(l,new Li(l,o))}pt.Ja="timingevent";function Mi(o,l){E.call(this,pt.Ja,o),this.size=l}y(Mi,E);function An(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},l)}function bn(){this.g=!0}bn.prototype.ua=function(){this.g=!1};function oo(o,l,h,p,A,R){o.info(function(){if(o.g)if(R){var O="",Y=R.split("&");for(let ae=0;ae<Y.length;ae++){var De=Y[ae].split("=");if(De.length>1){const Le=De[0];De=De[1];const Tt=Le.split("_");O=Tt.length>=2&&Tt[1]=="type"?O+(Le+"="+De+"&"):O+(Le+"=redacted&")}}}else O=null;else O=R;return"XMLHTTP REQ ("+p+") [attempt "+A+"]: "+l+`
`+h+`
`+O})}function K(o,l,h,p,A,R,O){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+A+"]: "+l+`
`+h+`
`+R+" "+O})}function xe(o,l,h,p){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+Df(o,h)+(p?" "+p:"")})}function Fi(o,l){o.info(function(){return"TIMEOUT: "+l})}bn.prototype.info=function(){};function Df(o,l){if(!o.g)return l;if(!l)return null;try{const R=JSON.parse(l);if(R){for(o=0;o<R.length;o++)if(Array.isArray(R[o])){var h=R[o];if(!(h.length<2)){var p=h[1];if(Array.isArray(p)&&!(p.length<1)){var A=p[0];if(A!="noop"&&A!="stop"&&A!="close")for(let O=1;O<p.length;O++)p[O]=""}}}}return Ht(R)}catch{return l}}var Ui={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ec={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Tc;function ao(){}y(ao,et),ao.prototype.g=function(){return new XMLHttpRequest},Tc=new ao;function Vr(o){return encodeURIComponent(String(o))}function Of(o){var l=1;o=o.split(":");const h=[];for(;l>0&&o.length;)h.push(o.shift()),l--;return o.length&&h.push(o.join(":")),h}function Wt(o,l,h,p){this.j=o,this.i=l,this.l=h,this.S=p||1,this.V=new vt(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new wc}function wc(){this.i=null,this.g="",this.h=!1}var Ic={},co={};function lo(o,l,h){o.M=1,o.A=Bi(Et(l)),o.u=h,o.R=!0,Ac(o,null)}function Ac(o,l){o.F=Date.now(),ji(o),o.B=Et(o.A);var h=o.B,p=o.S;Array.isArray(p)||(p=[String(p)]),Mc(h.i,"t",p),o.C=0,h=o.j.L,o.h=new wc,o.g=tl(o.j,h?l:null,!o.u),o.P>0&&(o.O=new En(d(o.Y,o,o.g),o.P)),l=o.V,h=o.g,p=o.ba;var A="readystatechange";Array.isArray(A)||(A&&(Tn[0]=A.toString()),A=Tn);for(let R=0;R<A.length;R++){const O=ie(h,A[R],p||l.handleEvent,!1,l.h||l);if(!O)break;l.g[O.key]=O}l=o.J?Je(o.J):{},o.u?(o.v||(o.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,l)):(o.v="GET",o.g.ea(o.B,o.v,null,l)),In(),oo(o.i,o.v,o.B,o.l,o.S,o.u)}Wt.prototype.ba=function(o){o=o.target;const l=this.O;l&&Qt(o)==3?l.j():this.Y(o)},Wt.prototype.Y=function(o){try{if(o==this.g)e:{const Y=Qt(this.g),De=this.g.ya(),ae=this.g.ca();if(!(Y<3)&&(Y!=3||this.g&&(this.h.h||this.g.la()||Hc(this.g)))){this.K||Y!=4||De==7||(De==8||ae<=0?In(3):In(2)),uo(this);var l=this.g.ca();this.X=l;var h=Vf(this);if(this.o=l==200,K(this.i,this.v,this.B,this.l,this.S,Y,l),this.o){if(this.U&&!this.L){t:{if(this.g){var p,A=this.g;if((p=A.g?A.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!m(p)){var R=p;break t}}R=null}if(o=R)xe(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,ho(this,o);else{this.o=!1,this.m=3,Ue(12),Rn(this),Nr(this);break e}}if(this.R){o=!0;let Le;for(;!this.K&&this.C<h.length;)if(Le=Nf(this,h),Le==co){Y==4&&(this.m=4,Ue(14),o=!1),xe(this.i,this.l,null,"[Incomplete Response]");break}else if(Le==Ic){this.m=4,Ue(15),xe(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else xe(this.i,this.l,Le,null),ho(this,Le);if(bc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Y!=4||h.length!=0||this.h.h||(this.m=1,Ue(16),o=!1),this.o=this.o&&o,!o)xe(this.i,this.l,h,"[Invalid Chunked Response]"),Rn(this),Nr(this);else if(h.length>0&&!this.W){this.W=!0;var O=this.j;O.g==this&&O.aa&&!O.P&&(O.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),Eo(O),O.P=!0,Ue(11))}}else xe(this.i,this.l,h,null),ho(this,h);Y==4&&Rn(this),this.o&&!this.K&&(Y==4?Jc(this.j,this):(this.o=!1,ji(this)))}else Kf(this.g),l==400&&h.indexOf("Unknown SID")>0?(this.m=3,Ue(12)):(this.m=0,Ue(13)),Rn(this),Nr(this)}}}catch{}finally{}};function Vf(o){if(!bc(o))return o.g.la();const l=Hc(o.g);if(l==="")return"";let h="";const p=l.length,A=Qt(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return Rn(o),Nr(o),"";o.h.i=new a.TextDecoder}for(let R=0;R<p;R++)o.h.h=!0,h+=o.h.i.decode(l[R],{stream:!(A&&R==p-1)});return l.length=0,o.h.g+=h,o.C=0,o.h.g}function bc(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Nf(o,l){var h=o.C,p=l.indexOf(`
`,h);return p==-1?co:(h=Number(l.substring(h,p)),isNaN(h)?Ic:(p+=1,p+h>l.length?co:(l=l.slice(p,p+h),o.C=p+h,l)))}Wt.prototype.cancel=function(){this.K=!0,Rn(this)};function ji(o){o.T=Date.now()+o.H,Rc(o,o.H)}function Rc(o,l){if(o.D!=null)throw Error("WatchDog timer not null");o.D=An(d(o.aa,o),l)}function uo(o){o.D&&(a.clearTimeout(o.D),o.D=null)}Wt.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Fi(this.i,this.B),this.M!=2&&(In(),Ue(17)),Rn(this),this.m=2,Nr(this)):Rc(this,this.T-o)};function Nr(o){o.j.I==0||o.K||Jc(o.j,o)}function Rn(o){uo(o);var l=o.O;l&&typeof l.dispose=="function"&&l.dispose(),o.O=null,Ot(o.V),o.g&&(l=o.g,o.g=null,l.abort(),l.dispose())}function ho(o,l){try{var h=o.j;if(h.I!=0&&(h.g==o||fo(h.h,o))){if(!o.L&&fo(h.h,o)&&h.I==3){try{var p=h.Ba.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var A=p;if(A[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)Wi(h),Hi(h);else break e;vo(h),Ue(18)}}else h.xa=A[1],0<h.xa-h.K&&A[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=An(d(h.Va,h),6e3));Cc(h.h)<=1&&h.ta&&(h.ta=void 0)}else Pn(h,11)}else if((o.L||h.g==o)&&Wi(h),!m(l))for(A=h.Ba.g.parse(l),l=0;l<A.length;l++){let ae=A[l];const Le=ae[0];if(!(Le<=h.K))if(h.K=Le,ae=ae[1],h.I==2)if(ae[0]=="c"){h.M=ae[1],h.ba=ae[2];const Tt=ae[3];Tt!=null&&(h.ka=Tt,h.j.info("VER="+h.ka));const Cn=ae[4];Cn!=null&&(h.za=Cn,h.j.info("SVER="+h.za));const Yt=ae[5];Yt!=null&&typeof Yt=="number"&&Yt>0&&(p=1.5*Yt,h.O=p,h.j.info("backChannelRequestTimeoutMs_="+p)),p=h;const Jt=o.g;if(Jt){const Ki=Jt.g?Jt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ki){var R=p.h;R.g||Ki.indexOf("spdy")==-1&&Ki.indexOf("quic")==-1&&Ki.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(po(R,R.h),R.h=null))}if(p.G){const To=Jt.g?Jt.g.getResponseHeader("X-HTTP-Session-Id"):null;To&&(p.wa=To,le(p.J,p.G,To))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),p=h;var O=o;if(p.na=el(p,p.L?p.ba:null,p.W),O.L){kc(p.h,O);var Y=O,De=p.O;De&&(Y.H=De),Y.D&&(uo(Y),ji(Y)),p.g=O}else Qc(p);h.i.length>0&&zi(h)}else ae[0]!="stop"&&ae[0]!="close"||Pn(h,7);else h.I==3&&(ae[0]=="stop"||ae[0]=="close"?ae[0]=="stop"?Pn(h,7):yo(h):ae[0]!="noop"&&h.l&&h.l.qa(ae),h.A=0)}}In(4)}catch{}}var xf=class{constructor(o,l){this.g=o,this.map=l}};function Sc(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Pc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Cc(o){return o.h?1:o.g?o.g.size:0}function fo(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function po(o,l){o.g?o.g.add(l):o.h=l}function kc(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}Sc.prototype.cancel=function(){if(this.i=Dc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Dc(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const h of o.g.values())l=l.concat(h.G);return l}return b(o.i)}var Oc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Lf(o,l){if(o){o=o.split("&");for(let h=0;h<o.length;h++){const p=o[h].indexOf("=");let A,R=null;p>=0?(A=o[h].substring(0,p),R=o[h].substring(p+1)):A=o[h],l(A,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function Gt(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;o instanceof Gt?(this.l=o.l,xr(this,o.j),this.o=o.o,this.g=o.g,Lr(this,o.u),this.h=o.h,mo(this,Fc(o.i)),this.m=o.m):o&&(l=String(o).match(Oc))?(this.l=!1,xr(this,l[1]||"",!0),this.o=Mr(l[2]||""),this.g=Mr(l[3]||"",!0),Lr(this,l[4]),this.h=Mr(l[5]||"",!0),mo(this,l[6]||"",!0),this.m=Mr(l[7]||"")):(this.l=!1,this.i=new Ur(null,this.l))}Gt.prototype.toString=function(){const o=[];var l=this.j;l&&o.push(Fr(l,Vc,!0),":");var h=this.g;return(h||l=="file")&&(o.push("//"),(l=this.o)&&o.push(Fr(l,Vc,!0),"@"),o.push(Vr(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Fr(h,h.charAt(0)=="/"?Uf:Ff,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Fr(h,Bf)),o.join("")},Gt.prototype.resolve=function(o){const l=Et(this);let h=!!o.j;h?xr(l,o.j):h=!!o.o,h?l.o=o.o:h=!!o.g,h?l.g=o.g:h=o.u!=null;var p=o.h;if(h)Lr(l,o.u);else if(h=!!o.h){if(p.charAt(0)!="/")if(this.g&&!this.h)p="/"+p;else{var A=l.h.lastIndexOf("/");A!=-1&&(p=l.h.slice(0,A+1)+p)}if(A=p,A==".."||A==".")p="";else if(A.indexOf("./")!=-1||A.indexOf("/.")!=-1){p=A.lastIndexOf("/",0)==0,A=A.split("/");const R=[];for(let O=0;O<A.length;){const Y=A[O++];Y=="."?p&&O==A.length&&R.push(""):Y==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),p&&O==A.length&&R.push("")):(R.push(Y),p=!0)}p=R.join("/")}else p=A}return h?l.h=p:h=o.i.toString()!=="",h?mo(l,Fc(o.i)):h=!!o.m,h&&(l.m=o.m),l};function Et(o){return new Gt(o)}function xr(o,l,h){o.j=h?Mr(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function Lr(o,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);o.u=l}else o.u=null}function mo(o,l,h){l instanceof Ur?(o.i=l,$f(o.i,o.l)):(h||(l=Fr(l,jf)),o.i=new Ur(l,o.l))}function le(o,l,h){o.i.set(l,h)}function Bi(o){return le(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function Mr(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Fr(o,l,h){return typeof o=="string"?(o=encodeURI(o).replace(l,Mf),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Mf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Vc=/[#\/\?@]/g,Ff=/[#\?:]/g,Uf=/[#\?]/g,jf=/[#\?@]/g,Bf=/#/g;function Ur(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function Sn(o){o.g||(o.g=new Map,o.h=0,o.i&&Lf(o.i,function(l,h){o.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}n=Ur.prototype,n.add=function(o,l){Sn(this),this.i=null,o=Wn(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(l),this.h+=1,this};function Nc(o,l){Sn(o),l=Wn(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function xc(o,l){return Sn(o),l=Wn(o,l),o.g.has(l)}n.forEach=function(o,l){Sn(this),this.g.forEach(function(h,p){h.forEach(function(A){o.call(l,A,p,this)},this)},this)};function Lc(o,l){Sn(o);let h=[];if(typeof l=="string")xc(o,l)&&(h=h.concat(o.g.get(Wn(o,l))));else for(o=Array.from(o.g.values()),l=0;l<o.length;l++)h=h.concat(o[l]);return h}n.set=function(o,l){return Sn(this),this.i=null,o=Wn(this,o),xc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},n.get=function(o,l){return o?(o=Lc(this,o),o.length>0?String(o[0]):l):l};function Mc(o,l,h){Nc(o,l),h.length>0&&(o.i=null,o.g.set(Wn(o,l),b(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(let p=0;p<l.length;p++){var h=l[p];const A=Vr(h);h=Lc(this,h);for(let R=0;R<h.length;R++){let O=A;h[R]!==""&&(O+="="+Vr(h[R])),o.push(O)}}return this.i=o.join("&")};function Fc(o){const l=new Ur;return l.i=o.i,o.g&&(l.g=new Map(o.g),l.h=o.h),l}function Wn(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function $f(o,l){l&&!o.j&&(Sn(o),o.i=null,o.g.forEach(function(h,p){const A=p.toLowerCase();p!=A&&(Nc(this,p),Mc(this,A,h))},o)),o.j=l}function qf(o,l){const h=new bn;if(a.Image){const p=new Image;p.onload=f(Kt,h,"TestLoadImage: loaded",!0,l,p),p.onerror=f(Kt,h,"TestLoadImage: error",!1,l,p),p.onabort=f(Kt,h,"TestLoadImage: abort",!1,l,p),p.ontimeout=f(Kt,h,"TestLoadImage: timeout",!1,l,p),a.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else l(!1)}function Hf(o,l){const h=new bn,p=new AbortController,A=setTimeout(()=>{p.abort(),Kt(h,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:p.signal}).then(R=>{clearTimeout(A),R.ok?Kt(h,"TestPingServer: ok",!0,l):Kt(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(A),Kt(h,"TestPingServer: error",!1,l)})}function Kt(o,l,h,p,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),p(h)}catch{}}function zf(){this.g=new Dr}function go(o){this.i=o.Sb||null,this.h=o.ab||!1}y(go,et),go.prototype.g=function(){return new $i(this.i,this.h)};function $i(o,l){ye.call(this),this.H=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}y($i,ye),n=$i.prototype,n.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=l,this.readyState=1,Br(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(l.body=o),(this.H||a).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,jr(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Br(this)),this.g&&(this.readyState=3,Br(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Uc(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function Uc(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?jr(this):Br(this),this.readyState==3&&Uc(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,jr(this))},n.Na=function(o){this.g&&(this.response=o,jr(this))},n.ga=function(){this.g&&jr(this)};function jr(o){o.readyState=4,o.l=null,o.j=null,o.B=null,Br(o)}n.setRequestHeader=function(o,l){this.A.append(o,l)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=l.next();return o.join(`\r
`)};function Br(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty($i.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function jc(o){let l="";return Ve(o,function(h,p){l+=p,l+=":",l+=h,l+=`\r
`}),l}function _o(o,l,h){e:{for(p in h){var p=!1;break e}p=!0}p||(h=jc(h),typeof o=="string"?h!=null&&Vr(h):le(o,l,h))}function ve(o){ye.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}y(ve,ye);var Wf=/^https?$/i,Gf=["POST","PUT"];n=ve.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,l,h,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Tc.g(),this.g.onreadystatechange=w(d(this.Ca,this));try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(R){Bc(this,R);return}if(o=h||"",h=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var A in p)h.set(A,p[A]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const R of p.keys())h.set(R,p.get(R));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(h.keys()).find(R=>R.toLowerCase()=="content-type"),A=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Gf,l,void 0)>=0)||p||A||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,O]of h)this.g.setRequestHeader(R,O);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(R){Bc(this,R)}};function Bc(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.o=5,$c(o),qi(o)}function $c(o){o.A||(o.A=!0,ce(o,"complete"),ce(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,ce(this,"complete"),ce(this,"abort"),qi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),qi(this,!0)),ve.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?qc(this):this.Xa())},n.Xa=function(){qc(this)};function qc(o){if(o.h&&typeof s<"u"){if(o.v&&Qt(o)==4)setTimeout(o.Ca.bind(o),0);else if(ce(o,"readystatechange"),Qt(o)==4){o.h=!1;try{const R=o.ca();e:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var h;if(!(h=l)){var p;if(p=R===0){let O=String(o.D).match(Oc)[1]||null;!O&&a.self&&a.self.location&&(O=a.self.location.protocol.slice(0,-1)),p=!Wf.test(O?O.toLowerCase():"")}h=p}if(h)ce(o,"complete"),ce(o,"success");else{o.o=6;try{var A=Qt(o)>2?o.g.statusText:""}catch{A=""}o.l=A+" ["+o.ca()+"]",$c(o)}}finally{qi(o)}}}}function qi(o,l){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const h=o.g;o.g=null,l||ce(o,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Qt(o){return o.g?o.g.readyState:0}n.ca=function(){try{return Qt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),wn(l)}};function Hc(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Kf(o){const l={};o=(o.g&&Qt(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(m(o[p]))continue;var h=Of(o[p]);const A=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const R=l[A]||[];l[A]=R,R.push(h)}Fe(l,function(p){return p.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function $r(o,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||l}function zc(o){this.za=0,this.i=[],this.j=new bn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=$r("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=$r("baseRetryDelayMs",5e3,o),this.Za=$r("retryDelaySeedMs",1e4,o),this.Ta=$r("forwardChannelMaxRetries",2,o),this.va=$r("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new Sc(o&&o.concurrentRequestLimit),this.Ba=new zf,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=zc.prototype,n.ka=8,n.I=1,n.connect=function(o,l,h,p){Ue(0),this.W=o,this.H=l||{},h&&p!==void 0&&(this.H.OSID=h,this.H.OAID=p),this.F=this.X,this.J=el(this,null,this.W),zi(this)};function yo(o){if(Wc(o),o.I==3){var l=o.V++,h=Et(o.J);if(le(h,"SID",o.M),le(h,"RID",l),le(h,"TYPE","terminate"),qr(o,h),l=new Wt(o,o.j,l),l.M=2,l.A=Bi(Et(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(l.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=l.A,h=!0),h||(l.g=tl(l.j,null),l.g.ea(l.A)),l.F=Date.now(),ji(l)}Zc(o)}function Hi(o){o.g&&(Eo(o),o.g.cancel(),o.g=null)}function Wc(o){Hi(o),o.v&&(a.clearTimeout(o.v),o.v=null),Wi(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function zi(o){if(!Pc(o.h)&&!o.m){o.m=!0;var l=o.Ea;j||g(),B||(j(),B=!0),v.add(l,o),o.D=0}}function Qf(o,l){return Cc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=l.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=An(d(o.Ea,o,l),Xc(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const A=new Wt(this,this.j,o);let R=this.o;if(this.U&&(R?(R=Je(R),it(R,this.U)):R=this.U),this.u!==null||this.R||(A.J=R,R=null),this.S)e:{for(var l=0,h=0;h<this.i.length;h++){t:{var p=this.i[h];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,l>4096){l=h;break e}if(l===4096||h===this.i.length-1){l=h+1;break e}}l=1e3}else l=1e3;l=Kc(this,A,l),h=Et(this.J),le(h,"RID",o),le(h,"CVER",22),this.G&&le(h,"X-HTTP-Session-Id",this.G),qr(this,h),R&&(this.R?l="headers="+Vr(jc(R))+"&"+l:this.u&&_o(h,this.u,R)),po(this.h,A),this.Ra&&le(h,"TYPE","init"),this.S?(le(h,"$req",l),le(h,"SID","null"),A.U=!0,lo(A,h,null)):lo(A,h,l),this.I=2}}else this.I==3&&(o?Gc(this,o):this.i.length==0||Pc(this.h)||Gc(this))};function Gc(o,l){var h;l?h=l.l:h=o.V++;const p=Et(o.J);le(p,"SID",o.M),le(p,"RID",h),le(p,"AID",o.K),qr(o,p),o.u&&o.o&&_o(p,o.u,o.o),h=new Wt(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),l&&(o.i=l.G.concat(o.i)),l=Kc(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),po(o.h,h),lo(h,p,l)}function qr(o,l){o.H&&Ve(o.H,function(h,p){le(l,p,h)}),o.l&&Ve({},function(h,p){le(l,p,h)})}function Kc(o,l,h){h=Math.min(o.i.length,h);const p=o.l?d(o.l.Ka,o.l,o):null;e:{var A=o.i;let Y=-1;for(;;){const De=["count="+h];Y==-1?h>0?(Y=A[0].g,De.push("ofs="+Y)):Y=0:De.push("ofs="+Y);let ae=!0;for(let Le=0;Le<h;Le++){var R=A[Le].g;const Tt=A[Le].map;if(R-=Y,R<0)Y=Math.max(0,A[Le].g-100),ae=!1;else try{R="req"+R+"_"||"";try{var O=Tt instanceof Map?Tt:Object.entries(Tt);for(const[Cn,Yt]of O){let Jt=Yt;c(Yt)&&(Jt=Ht(Yt)),De.push(R+Cn+"="+encodeURIComponent(Jt))}}catch(Cn){throw De.push(R+"type="+encodeURIComponent("_badmap")),Cn}}catch{p&&p(Tt)}}if(ae){O=De.join("&");break e}}O=void 0}return o=o.i.splice(0,h),l.G=o,O}function Qc(o){if(!o.g&&!o.v){o.Y=1;var l=o.Da;j||g(),B||(j(),B=!0),v.add(l,o),o.A=0}}function vo(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=An(d(o.Da,o),Xc(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,Yc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=An(d(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ue(10),Hi(this),Yc(this))};function Eo(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function Yc(o){o.g=new Wt(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var l=Et(o.na);le(l,"RID","rpc"),le(l,"SID",o.M),le(l,"AID",o.K),le(l,"CI",o.F?"0":"1"),!o.F&&o.ia&&le(l,"TO",o.ia),le(l,"TYPE","xmlhttp"),qr(o,l),o.u&&o.o&&_o(l,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=Bi(Et(l)),h.u=null,h.R=!0,Ac(h,o)}n.Va=function(){this.C!=null&&(this.C=null,Hi(this),vo(this),Ue(19))};function Wi(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function Jc(o,l){var h=null;if(o.g==l){Wi(o),Eo(o),o.g=null;var p=2}else if(fo(o.h,l))h=l.G,kc(o.h,l),p=1;else return;if(o.I!=0){if(l.o)if(p==1){h=l.u?l.u.length:0,l=Date.now()-l.F;var A=o.D;p=Vt(),ce(p,new Mi(p,h)),zi(o)}else Qc(o);else if(A=l.m,A==3||A==0&&l.X>0||!(p==1&&Qf(o,l)||p==2&&vo(o)))switch(h&&h.length>0&&(l=o.h,l.i=l.i.concat(h)),A){case 1:Pn(o,5);break;case 4:Pn(o,10);break;case 3:Pn(o,6);break;default:Pn(o,2)}}}function Xc(o,l){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*l}function Pn(o,l){if(o.j.info("Error code "+l),l==2){var h=d(o.bb,o),p=o.Ua;const A=!p;p=new Gt(p||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||xr(p,"https"),Bi(p),A?qf(p.toString(),h):Hf(p.toString(),h)}else Ue(2);o.I=0,o.l&&o.l.pa(l),Zc(o),Wc(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Ue(2)):(this.j.info("Failed to ping google.com"),Ue(1))};function Zc(o){if(o.I=0,o.ja=[],o.l){const l=Dc(o.h);(l.length!=0||o.i.length!=0)&&(P(o.ja,l),P(o.ja,o.i),o.h.i.length=0,b(o.i),o.i.length=0),o.l.oa()}}function el(o,l,h){var p=h instanceof Gt?Et(h):new Gt(h);if(p.g!="")l&&(p.g=l+"."+p.g),Lr(p,p.u);else{var A=a.location;p=A.protocol,l=l?l+"."+A.hostname:A.hostname,A=+A.port;const R=new Gt(null);p&&xr(R,p),l&&(R.g=l),A&&Lr(R,A),h&&(R.h=h),p=R}return h=o.G,l=o.wa,h&&l&&le(p,h,l),le(p,"VER",o.ka),qr(o,p),p}function tl(o,l,h){if(l&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Aa&&!o.ma?new ve(new go({ab:h})):new ve(o.ma),l.Fa(o.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function nl(){}n=nl.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Gi(){}Gi.prototype.g=function(o,l){return new ot(o,l)};function ot(o,l){ye.call(this),this.g=new zc(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(o?o["X-WebChannel-Client-Profile"]=l.sa:o={"X-WebChannel-Client-Profile":l.sa}),this.g.U=o,(o=l&&l.Qb)&&!m(o)&&(this.g.u=o),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!m(l)&&(this.g.G=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new Gn(this)}y(ot,ye),ot.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},ot.prototype.close=function(){yo(this.g)},ot.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=Ht(o),o=h);l.i.push(new xf(l.Ya++,o)),l.I==3&&zi(l)},ot.prototype.N=function(){this.g.l=null,delete this.j,yo(this.g),delete this.g,ot.Z.N.call(this)};function rl(o){Ye.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const h in l){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}y(rl,Ye);function il(){Or.call(this),this.status=1}y(il,Or);function Gn(o){this.g=o}y(Gn,nl),Gn.prototype.ra=function(){ce(this.g,"a")},Gn.prototype.qa=function(o){ce(this.g,new rl(o))},Gn.prototype.pa=function(o){ce(this.g,new il)},Gn.prototype.oa=function(){ce(this.g,"b")},Gi.prototype.createWebChannel=Gi.prototype.g,ot.prototype.send=ot.prototype.o,ot.prototype.open=ot.prototype.m,ot.prototype.close=ot.prototype.close,hd=function(){return new Gi},ud=function(){return Vt()},ld=pt,Xo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ui.NO_ERROR=0,Ui.TIMEOUT=8,Ui.HTTP_ERROR=6,fs=Ui,Ec.COMPLETE="complete",cd=Ec,zt.EventType=st,st.OPEN="a",st.CLOSE="b",st.ERROR="c",st.MESSAGE="d",ye.prototype.listen=ye.prototype.J,Jr=zt,ve.prototype.listenOnce=ve.prototype.K,ve.prototype.getLastError=ve.prototype.Ha,ve.prototype.getLastErrorCode=ve.prototype.ya,ve.prototype.getStatus=ve.prototype.ca,ve.prototype.getResponseJson=ve.prototype.La,ve.prototype.getResponseText=ve.prototype.la,ve.prototype.send=ve.prototype.ea,ve.prototype.setWithCredentials=ve.prototype.Fa,ad=ve}).apply(typeof ns<"u"?ns:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}qe.UNAUTHENTICATED=new qe(null),qe.GOOGLE_CREDENTIALS=new qe("google-credentials-uid"),qe.FIRST_PARTY=new qe("first-party-uid"),qe.MOCK_USER=new qe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rr="12.9.0";function nE(n){Rr=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jn=new Oa("@firebase/firestore");function Qn(){return jn.logLevel}function x(n,...e){if(jn.logLevel<=J.DEBUG){const t=e.map(qa);jn.debug(`Firestore (${Rr}): ${n}`,...t)}}function jt(n,...e){if(jn.logLevel<=J.ERROR){const t=e.map(qa);jn.error(`Firestore (${Rr}): ${n}`,...t)}}function Bn(n,...e){if(jn.logLevel<=J.WARN){const t=e.map(qa);jn.warn(`Firestore (${Rr}): ${n}`,...t)}}function qa(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,dd(n,r,t)}function dd(n,e,t){let r=`FIRESTORE (${Rr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw jt(r),new Error(r)}function ge(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||dd(e,i,r)}function ee(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends $t{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class rE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(qe.UNAUTHENTICATED)))}shutdown(){}}class iE{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class sE{constructor(e){this.t=e,this.currentUser=qe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ge(this.o===void 0,42304);let r=this.i;const i=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let s=new sr;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new sr,e.enqueueRetryable((()=>i(this.currentUser)))};const a=()=>{const u=s;e.enqueueRetryable((async()=>{await u.promise,await i(this.currentUser)}))},c=u=>{x("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(x("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new sr)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(x("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ge(typeof r.accessToken=="string",31837,{l:r}),new fd(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ge(e===null||typeof e=="string",2055,{h:e}),new qe(e)}}class oE{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=qe.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class aE{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new oE(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(qe.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Xl{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class cE{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,lt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){ge(this.o===void 0,3512);const r=s=>{s.error!=null&&x("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.m;return this.m=s.token,x("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable((()=>r(s)))};const i=s=>{x("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((s=>i(s))),setTimeout((()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):x("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Xl(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(ge(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Xl(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lE(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=lE(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}}function X(n,e){return n<e?-1:n>e?1:0}function Zo(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const i=n.charAt(r),s=e.charAt(r);if(i!==s)return No(i)===No(s)?X(i,s):No(i)?1:-1}return X(n.length,e.length)}const uE=55296,hE=57343;function No(n){const e=n.charCodeAt(0);return e>=uE&&e<=hE}function gr(n,e,t){return n.length===e.length&&n.every(((r,i)=>t(r,e[i])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zl="__name__";class wt{constructor(e,t,r){t===void 0?t=0:t>e.length&&G(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&G(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return wt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof wt?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=wt.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return X(e.length,t.length)}static compareSegments(e,t){const r=wt.isNumericId(e),i=wt.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?wt.extractNumericId(e).compare(wt.extractNumericId(t)):Zo(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return ln.fromString(e.substring(4,e.length-2))}}class he extends wt{construct(e,t,r){return new he(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new M(D.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((i=>i.length>0)))}return new he(t)}static emptyPath(){return new he([])}}const dE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ze extends wt{construct(e,t,r){return new ze(e,t,r)}static isValidIdentifier(e){return dE.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ze.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Zl}static keyField(){return new ze([Zl])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new M(D.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new M(D.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new M(D.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else c==="`"?(a=!a,i++):c!=="."||a?(r+=c,i++):(s(),i++)}if(s(),a)throw new M(D.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ze(t)}static emptyPath(){return new ze([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{constructor(e){this.path=e}static fromPath(e){return new H(he.fromString(e))}static fromName(e){return new H(he.fromString(e).popFirst(5))}static empty(){return new H(he.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&he.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return he.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new H(new he(e.slice()))}}function fE(n,e,t,r){if(e===!0&&r===!0)throw new M(D.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function eu(n){if(H.isDocumentKey(n))throw new M(D.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function md(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Qs(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":G(12329,{type:typeof n})}function ps(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new M(D.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Qs(n);throw new M(D.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ce(n,e){const t={typeString:n};return e&&(t.value=e),t}function Ci(n,e){if(!md(n))throw new M(D.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(i&&typeof a!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&a!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new M(D.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tu=-62135596800,nu=1e6;class de{static now(){return de.fromMillis(Date.now())}static fromDate(e){return de.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*nu);return new de(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new M(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new M(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<tu)throw new M(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new M(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/nu}_compareTo(e){return this.seconds===e.seconds?X(this.nanoseconds,e.nanoseconds):X(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:de._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Ci(e,de._jsonSchema))return new de(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-tu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}de._jsonSchemaVersion="firestore/timestamp/1.0",de._jsonSchema={type:Ce("string",de._jsonSchemaVersion),seconds:Ce("number"),nanoseconds:Ce("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{static fromTimestamp(e){return new W(e)}static min(){return new W(new de(0,0))}static max(){return new W(new de(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gi=-1;function pE(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=W.fromTimestamp(r===1e9?new de(t+1,0):new de(t,r));return new hn(i,H.empty(),e)}function mE(n){return new hn(n.readTime,n.key,gi)}class hn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new hn(W.min(),H.empty(),gi)}static max(){return new hn(W.max(),H.empty(),gi)}}function gE(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=H.comparator(n.documentKey,e.documentKey),t!==0?t:X(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _E="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class yE{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ys(n){if(n.code!==D.FAILED_PRECONDITION||n.message!==_E)throw n;x("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&G(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new S(((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof S?t:S.resolve(t)}catch(t){return S.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):S.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):S.reject(t)}static resolve(e){return new S(((t,r)=>{t(e)}))}static reject(e){return new S(((t,r)=>{r(e)}))}static waitFor(e){return new S(((t,r)=>{let i=0,s=0,a=!1;e.forEach((c=>{++i,c.next((()=>{++s,a&&s===i&&t()}),(u=>r(u)))})),a=!0,s===i&&t()}))}static or(e){let t=S.resolve(!1);for(const r of e)t=t.next((i=>i?S.resolve(i):r()));return t}static forEach(e,t){const r=[];return e.forEach(((i,s)=>{r.push(t.call(this,i,s))})),this.waitFor(r)}static mapArray(e,t){return new S(((r,i)=>{const s=e.length,a=new Array(s);let c=0;for(let u=0;u<s;u++){const d=u;t(e[d]).next((f=>{a[d]=f,++c,c===s&&r(a)}),(f=>i(f)))}}))}static doWhile(e,t){return new S(((r,i)=>{const s=()=>{e()===!0?t().next((()=>{s()}),i):r()};s()}))}}function vE(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Sr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Js.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EE=-1;function Xs(n){return n==null}function ks(n){return n===0&&1/n==-1/0}function TE(n){return typeof n=="number"&&Number.isInteger(n)&&!ks(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gd="";function wE(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=ru(e)),e=IE(n.get(t),e);return ru(e)}function IE(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case gd:t+="";break;default:t+=s}}return t}function ru(n){return n+gd+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iu(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Pr(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function _d(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e,t){this.comparator=e,this.root=t||je.EMPTY}insert(e,t){return new Ae(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,je.BLACK,null,null))}remove(e){return new Ae(this.comparator,this.root.remove(e,this.comparator).copy(null,null,je.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new rs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new rs(this.root,e,this.comparator,!1)}getReverseIterator(){return new rs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new rs(this.root,e,this.comparator,!0)}}class rs{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class je{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??je.RED,this.left=i??je.EMPTY,this.right=s??je.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new je(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return je.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return je.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,je.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,je.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw G(43730,{key:this.key,value:this.value});if(this.right.isRed())throw G(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw G(27949);return e+(this.isRed()?0:1)}}je.EMPTY=null,je.RED=!0,je.BLACK=!1;je.EMPTY=new class{constructor(){this.size=0}get key(){throw G(57766)}get value(){throw G(16141)}get color(){throw G(16727)}get left(){throw G(29726)}get right(){throw G(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new je(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e){this.comparator=e,this.data=new Ae(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new su(this.data.getIterator())}getIteratorFrom(e){return new su(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof Oe)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new Oe(this.comparator);return t.data=e,t}}class su{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e){this.fields=e,e.sort(ze.comparator)}static empty(){return new rn([])}unionWith(e){let t=new Oe(ze.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new rn(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return gr(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new yd("Invalid base64 string: "+s):s}})(e);return new Be(t)}static fromUint8Array(e){const t=(function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s})(e);return new Be(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return X(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Be.EMPTY_BYTE_STRING=new Be("");const AE=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function dn(n){if(ge(!!n,39018),typeof n=="string"){let e=0;const t=AE.exec(n);if(ge(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ie(n.seconds),nanos:Ie(n.nanos)}}function Ie(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function fn(n){return typeof n=="string"?Be.fromBase64String(n):Be.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vd="server_timestamp",Ed="__type__",Td="__previous_value__",wd="__local_write_time__";function Ha(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Ed])==null?void 0:r.stringValue)===vd}function Zs(n){const e=n.mapValue.fields[Td];return Ha(e)?Zs(e):e}function _i(n){const e=dn(n.mapValue.fields[wd].timestampValue);return new de(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bE{constructor(e,t,r,i,s,a,c,u,d,f,y){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=d,this.isUsingEmulator=f,this.apiKey=y}}const Ds="(default)";class yi{constructor(e,t){this.projectId=e,this.database=t||Ds}static empty(){return new yi("","")}get isDefaultDatabase(){return this.database===Ds}isEqual(e){return e instanceof yi&&e.projectId===this.projectId&&e.database===this.database}}function RE(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new M(D.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new yi(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Id="__type__",SE="__max__",is={mapValue:{}},Ad="__vector__",Os="value";function pn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ha(n)?4:CE(n)?9007199254740991:PE(n)?10:11:G(28295,{value:n})}function Dt(n,e){if(n===e)return!0;const t=pn(n);if(t!==pn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return _i(n).isEqual(_i(e));case 3:return(function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const a=dn(i.timestampValue),c=dn(s.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(i,s){return fn(i.bytesValue).isEqual(fn(s.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(i,s){return Ie(i.geoPointValue.latitude)===Ie(s.geoPointValue.latitude)&&Ie(i.geoPointValue.longitude)===Ie(s.geoPointValue.longitude)})(n,e);case 2:return(function(i,s){if("integerValue"in i&&"integerValue"in s)return Ie(i.integerValue)===Ie(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const a=Ie(i.doubleValue),c=Ie(s.doubleValue);return a===c?ks(a)===ks(c):isNaN(a)&&isNaN(c)}return!1})(n,e);case 9:return gr(n.arrayValue.values||[],e.arrayValue.values||[],Dt);case 10:case 11:return(function(i,s){const a=i.mapValue.fields||{},c=s.mapValue.fields||{};if(iu(a)!==iu(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!Dt(a[u],c[u])))return!1;return!0})(n,e);default:return G(52216,{left:n})}}function vi(n,e){return(n.values||[]).find((t=>Dt(t,e)))!==void 0}function _r(n,e){if(n===e)return 0;const t=pn(n),r=pn(e);if(t!==r)return X(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return X(n.booleanValue,e.booleanValue);case 2:return(function(s,a){const c=Ie(s.integerValue||s.doubleValue),u=Ie(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,e);case 3:return ou(n.timestampValue,e.timestampValue);case 4:return ou(_i(n),_i(e));case 5:return Zo(n.stringValue,e.stringValue);case 6:return(function(s,a){const c=fn(s),u=fn(a);return c.compareTo(u)})(n.bytesValue,e.bytesValue);case 7:return(function(s,a){const c=s.split("/"),u=a.split("/");for(let d=0;d<c.length&&d<u.length;d++){const f=X(c[d],u[d]);if(f!==0)return f}return X(c.length,u.length)})(n.referenceValue,e.referenceValue);case 8:return(function(s,a){const c=X(Ie(s.latitude),Ie(a.latitude));return c!==0?c:X(Ie(s.longitude),Ie(a.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return au(n.arrayValue,e.arrayValue);case 10:return(function(s,a){var w,b,P,k;const c=s.fields||{},u=a.fields||{},d=(w=c[Os])==null?void 0:w.arrayValue,f=(b=u[Os])==null?void 0:b.arrayValue,y=X(((P=d==null?void 0:d.values)==null?void 0:P.length)||0,((k=f==null?void 0:f.values)==null?void 0:k.length)||0);return y!==0?y:au(d,f)})(n.mapValue,e.mapValue);case 11:return(function(s,a){if(s===is.mapValue&&a===is.mapValue)return 0;if(s===is.mapValue)return 1;if(a===is.mapValue)return-1;const c=s.fields||{},u=Object.keys(c),d=a.fields||{},f=Object.keys(d);u.sort(),f.sort();for(let y=0;y<u.length&&y<f.length;++y){const w=Zo(u[y],f[y]);if(w!==0)return w;const b=_r(c[u[y]],d[f[y]]);if(b!==0)return b}return X(u.length,f.length)})(n.mapValue,e.mapValue);default:throw G(23264,{he:t})}}function ou(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return X(n,e);const t=dn(n),r=dn(e),i=X(t.seconds,r.seconds);return i!==0?i:X(t.nanos,r.nanos)}function au(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=_r(t[i],r[i]);if(s)return s}return X(t.length,r.length)}function yr(n){return ea(n)}function ea(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=dn(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return fn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return H.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=ea(s);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const a of r)s?s=!1:i+=",",i+=`${a}:${ea(t.fields[a])}`;return i+"}"})(n.mapValue):G(61005,{value:n})}function ms(n){switch(pn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Zs(n);return e?16+ms(e):16;case 5:return 2*n.stringValue.length;case 6:return fn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((i,s)=>i+ms(s)),0)})(n.arrayValue);case 10:case 11:return(function(r){let i=0;return Pr(r.fields,((s,a)=>{i+=s.length+ms(a)})),i})(n.mapValue);default:throw G(13486,{value:n})}}function cu(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ta(n){return!!n&&"integerValue"in n}function za(n){return!!n&&"arrayValue"in n}function lu(n){return!!n&&"nullValue"in n}function uu(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function xo(n){return!!n&&"mapValue"in n}function PE(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Id])==null?void 0:r.stringValue)===Ad}function oi(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Pr(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=oi(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=oi(n.arrayValue.values[t]);return e}return{...n}}function CE(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===SE}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e){this.value=e}static empty(){return new It({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!xo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=oi(t)}setAll(e){let t=ze.emptyPath(),r={},i=[];e.forEach(((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,i),r={},i=[],t=c.popLast()}a?r[c.lastSegment()]=oi(a):i.push(c.lastSegment())}));const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());xo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Dt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];xo(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Pr(t,((i,s)=>e[i]=s));for(const i of r)delete e[i]}clone(){return new It(oi(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e,t,r,i,s,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=c}static newInvalidDocument(e){return new He(e,0,W.min(),W.min(),W.min(),It.empty(),0)}static newFoundDocument(e,t,r,i){return new He(e,1,t,W.min(),r,i,0)}static newNoDocument(e,t){return new He(e,2,t,W.min(),W.min(),It.empty(),0)}static newUnknownDocument(e,t){return new He(e,3,t,W.min(),W.min(),It.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(W.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=It.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=It.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=W.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof He&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new He(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(e,t){this.position=e,this.inclusive=t}}function hu(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],a=n.position[i];if(s.field.isKeyField()?r=H.comparator(H.fromName(a.referenceValue),t.key):r=_r(a,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function du(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Dt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(e,t="asc"){this.field=e,this.dir=t}}function kE(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd{}class Pe extends bd{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new OE(e,t,r):t==="array-contains"?new xE(e,r):t==="in"?new LE(e,r):t==="not-in"?new ME(e,r):t==="array-contains-any"?new FE(e,r):new Pe(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new VE(e,r):new NE(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(_r(t,this.value)):t!==null&&pn(this.value)===pn(t)&&this.matchesComparison(_r(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return G(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class yt extends bd{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new yt(e,t)}matches(e){return Rd(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Rd(n){return n.op==="and"}function Sd(n){return DE(n)&&Rd(n)}function DE(n){for(const e of n.filters)if(e instanceof yt)return!1;return!0}function na(n){if(n instanceof Pe)return n.field.canonicalString()+n.op.toString()+yr(n.value);if(Sd(n))return n.filters.map((e=>na(e))).join(",");{const e=n.filters.map((t=>na(t))).join(",");return`${n.op}(${e})`}}function Pd(n,e){return n instanceof Pe?(function(r,i){return i instanceof Pe&&r.op===i.op&&r.field.isEqual(i.field)&&Dt(r.value,i.value)})(n,e):n instanceof yt?(function(r,i){return i instanceof yt&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce(((s,a,c)=>s&&Pd(a,i.filters[c])),!0):!1})(n,e):void G(19439)}function Cd(n){return n instanceof Pe?(function(t){return`${t.field.canonicalString()} ${t.op} ${yr(t.value)}`})(n):n instanceof yt?(function(t){return t.op.toString()+" {"+t.getFilters().map(Cd).join(" ,")+"}"})(n):"Filter"}class OE extends Pe{constructor(e,t,r){super(e,t,r),this.key=H.fromName(r.referenceValue)}matches(e){const t=H.comparator(e.key,this.key);return this.matchesComparison(t)}}class VE extends Pe{constructor(e,t){super(e,"in",t),this.keys=kd("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class NE extends Pe{constructor(e,t){super(e,"not-in",t),this.keys=kd("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function kd(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((r=>H.fromName(r.referenceValue)))}class xE extends Pe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return za(t)&&vi(t.arrayValue,this.value)}}class LE extends Pe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&vi(this.value.arrayValue,t)}}class ME extends Pe{constructor(e,t){super(e,"not-in",t)}matches(e){if(vi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!vi(this.value.arrayValue,t)}}class FE extends Pe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!za(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>vi(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UE{constructor(e,t=null,r=[],i=[],s=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=c,this.Te=null}}function fu(n,e=null,t=[],r=[],i=null,s=null,a=null){return new UE(n,e,t,r,i,s,a)}function Wa(n){const e=ee(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>na(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(s){return s.field.canonicalString()+s.dir})(r))).join(","),Xs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>yr(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>yr(r))).join(",")),e.Te=t}return e.Te}function Ga(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!kE(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Pd(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!du(n.startAt,e.startAt)&&du(n.endAt,e.endAt)}function ra(n){return H.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(e,t=null,r=[],i=[],s=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function jE(n,e,t,r,i,s,a,c){return new Cr(n,e,t,r,i,s,a,c)}function Ka(n){return new Cr(n)}function pu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function BE(n){return H.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Dd(n){return n.collectionGroup!==null}function ai(n){const e=ee(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ie.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Oe(ze.comparator);return a.filters.forEach((u=>{u.getFlattenedFilters().forEach((d=>{d.isInequality()&&(c=c.add(d.field))}))})),c})(e).forEach((s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ie.push(new Ei(s,r))})),t.has(ze.keyField().canonicalString())||e.Ie.push(new Ei(ze.keyField(),r))}return e.Ie}function Pt(n){const e=ee(n);return e.Ee||(e.Ee=$E(e,ai(n))),e.Ee}function $E(n,e){if(n.limitType==="F")return fu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((i=>{const s=i.dir==="desc"?"asc":"desc";return new Ei(i.field,s)}));const t=n.endAt?new Vs(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Vs(n.startAt.position,n.startAt.inclusive):null;return fu(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function ia(n,e){const t=n.filters.concat([e]);return new Cr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function qE(n,e){const t=n.explicitOrderBy.concat([e]);return new Cr(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function sa(n,e,t){return new Cr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ki(n,e){return Ga(Pt(n),Pt(e))&&n.limitType===e.limitType}function Od(n){return`${Wa(Pt(n))}|lt:${n.limitType}`}function Yn(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((i=>Cd(i))).join(", ")}]`),Xs(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((i=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(i))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((i=>yr(i))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((i=>yr(i))).join(",")),`Target(${r})`})(Pt(n))}; limitType=${n.limitType})`}function eo(n,e){return e.isFoundDocument()&&(function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):H.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)})(n,e)&&(function(r,i){for(const s of ai(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0})(n,e)&&(function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0})(n,e)&&(function(r,i){return!(r.startAt&&!(function(a,c,u){const d=hu(a,c,u);return a.inclusive?d<=0:d<0})(r.startAt,ai(r),i)||r.endAt&&!(function(a,c,u){const d=hu(a,c,u);return a.inclusive?d>=0:d>0})(r.endAt,ai(r),i))})(n,e)}function HE(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Vd(n){return(e,t)=>{let r=!1;for(const i of ai(n)){const s=zE(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function zE(n,e,t){const r=n.field.isKeyField()?H.comparator(e.key,t.key):(function(s,a,c){const u=a.data.field(s),d=c.data.field(s);return u!==null&&d!==null?_r(u,d):G(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return G(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Pr(this.inner,((t,r)=>{for(const[i,s]of r)e(i,s)}))}isEmpty(){return _d(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WE=new Ae(H.comparator);function mn(){return WE}const Nd=new Ae(H.comparator);function Xr(...n){let e=Nd;for(const t of n)e=e.insert(t.key,t);return e}function GE(n){let e=Nd;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function On(){return ci()}function xd(){return ci()}function ci(){return new zn((n=>n.toString()),((n,e)=>n.isEqual(e)))}const KE=new Oe(H.comparator);function te(...n){let e=KE;for(const t of n)e=e.add(t);return e}const QE=new Oe(X);function YE(){return QE}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qa(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ks(e)?"-0":e}}function Ld(n){return{integerValue:""+n}}function JE(n,e){return TE(e)?Ld(e):Qa(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(){this._=void 0}}function XE(n,e,t){return n instanceof oa?(function(i,s){const a={fields:{[Ed]:{stringValue:vd},[wd]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Ha(s)&&(s=Zs(s)),s&&(a.fields[Td]=s),{mapValue:a}})(t,e):n instanceof Ns?Md(n,e):n instanceof xs?Fd(n,e):(function(i,s){const a=eT(i,s),c=mu(a)+mu(i.Ae);return ta(a)&&ta(i.Ae)?Ld(c):Qa(i.serializer,c)})(n,e)}function ZE(n,e,t){return n instanceof Ns?Md(n,e):n instanceof xs?Fd(n,e):t}function eT(n,e){return n instanceof aa?(function(r){return ta(r)||(function(s){return!!s&&"doubleValue"in s})(r)})(e)?e:{integerValue:0}:null}class oa extends to{}class Ns extends to{constructor(e){super(),this.elements=e}}function Md(n,e){const t=Ud(e);for(const r of n.elements)t.some((i=>Dt(i,r)))||t.push(r);return{arrayValue:{values:t}}}class xs extends to{constructor(e){super(),this.elements=e}}function Fd(n,e){let t=Ud(e);for(const r of n.elements)t=t.filter((i=>!Dt(i,r)));return{arrayValue:{values:t}}}class aa extends to{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function mu(n){return Ie(n.integerValue||n.doubleValue)}function Ud(n){return za(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function tT(n,e){return n.field.isEqual(e.field)&&(function(r,i){return r instanceof Ns&&i instanceof Ns||r instanceof xs&&i instanceof xs?gr(r.elements,i.elements,Dt):r instanceof aa&&i instanceof aa?Dt(r.Ae,i.Ae):r instanceof oa&&i instanceof oa})(n.transform,e.transform)}class Nn{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Nn}static exists(e){return new Nn(void 0,e)}static updateTime(e){return new Nn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function gs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Ya{}function jd(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new rT(n.key,Nn.none()):new Ja(n.key,n.data,Nn.none());{const t=n.data,r=It.empty();let i=new Oe(ze.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new no(n.key,r,new rn(i.toArray()),Nn.none())}}function nT(n,e,t){n instanceof Ja?(function(i,s,a){const c=i.value.clone(),u=_u(i.fieldTransforms,s,a.transformResults);c.setAll(u),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(n,e,t):n instanceof no?(function(i,s,a){if(!gs(i.precondition,s))return void s.convertToUnknownDocument(a.version);const c=_u(i.fieldTransforms,s,a.transformResults),u=s.data;u.setAll(Bd(i)),u.setAll(c),s.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(n,e,t):(function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function li(n,e,t,r){return n instanceof Ja?(function(s,a,c,u){if(!gs(s.precondition,a))return c;const d=s.value.clone(),f=yu(s.fieldTransforms,u,a);return d.setAll(f),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null})(n,e,t,r):n instanceof no?(function(s,a,c,u){if(!gs(s.precondition,a))return c;const d=yu(s.fieldTransforms,u,a),f=a.data;return f.setAll(Bd(s)),f.setAll(d),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map((y=>y.field)))})(n,e,t,r):(function(s,a,c){return gs(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c})(n,e,t)}function gu(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&gr(r,i,((s,a)=>tT(s,a)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Ja extends Ya{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class no extends Ya{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Bd(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function _u(n,e,t){const r=new Map;ge(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let i=0;i<t.length;i++){const s=n[i],a=s.transform,c=e.data.field(s.field);r.set(s.field,ZE(a,c,t[i]))}return r}function yu(n,e,t){const r=new Map;for(const i of n){const s=i.transform,a=t.data.field(i.field);r.set(i.field,XE(s,a,e))}return r}class rT extends Ya{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iT{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&nT(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=li(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=li(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=xd();return this.mutations.forEach((i=>{const s=e.get(i.key),a=s.overlayedDocument;let c=this.applyToLocalView(a,s.mutatedFields);c=t.has(i.key)?null:c;const u=jd(a,c);u!==null&&r.set(i.key,u),a.isValidDocument()||a.convertToNoDocument(W.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),te())}isEqual(e){return this.batchId===e.batchId&&gr(this.mutations,e.mutations,((t,r)=>gu(t,r)))&&gr(this.baseMutations,e.baseMutations,((t,r)=>gu(t,r)))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sT{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oT{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Se,Z;function $d(n){if(n===void 0)return jt("GRPC error has no .code"),D.UNKNOWN;switch(n){case Se.OK:return D.OK;case Se.CANCELLED:return D.CANCELLED;case Se.UNKNOWN:return D.UNKNOWN;case Se.DEADLINE_EXCEEDED:return D.DEADLINE_EXCEEDED;case Se.RESOURCE_EXHAUSTED:return D.RESOURCE_EXHAUSTED;case Se.INTERNAL:return D.INTERNAL;case Se.UNAVAILABLE:return D.UNAVAILABLE;case Se.UNAUTHENTICATED:return D.UNAUTHENTICATED;case Se.INVALID_ARGUMENT:return D.INVALID_ARGUMENT;case Se.NOT_FOUND:return D.NOT_FOUND;case Se.ALREADY_EXISTS:return D.ALREADY_EXISTS;case Se.PERMISSION_DENIED:return D.PERMISSION_DENIED;case Se.FAILED_PRECONDITION:return D.FAILED_PRECONDITION;case Se.ABORTED:return D.ABORTED;case Se.OUT_OF_RANGE:return D.OUT_OF_RANGE;case Se.UNIMPLEMENTED:return D.UNIMPLEMENTED;case Se.DATA_LOSS:return D.DATA_LOSS;default:return G(39323,{code:n})}}(Z=Se||(Se={}))[Z.OK=0]="OK",Z[Z.CANCELLED=1]="CANCELLED",Z[Z.UNKNOWN=2]="UNKNOWN",Z[Z.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Z[Z.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Z[Z.NOT_FOUND=5]="NOT_FOUND",Z[Z.ALREADY_EXISTS=6]="ALREADY_EXISTS",Z[Z.PERMISSION_DENIED=7]="PERMISSION_DENIED",Z[Z.UNAUTHENTICATED=16]="UNAUTHENTICATED",Z[Z.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Z[Z.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Z[Z.ABORTED=10]="ABORTED",Z[Z.OUT_OF_RANGE=11]="OUT_OF_RANGE",Z[Z.UNIMPLEMENTED=12]="UNIMPLEMENTED",Z[Z.INTERNAL=13]="INTERNAL",Z[Z.UNAVAILABLE=14]="UNAVAILABLE",Z[Z.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aT(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cT=new ln([4294967295,4294967295],0);function vu(n){const e=aT().encode(n),t=new od;return t.update(e),new Uint8Array(t.digest())}function Eu(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new ln([t,r],0),new ln([i,s],0)]}class Xa{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Zr(`Invalid padding: ${t}`);if(r<0)throw new Zr(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Zr(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Zr(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=ln.fromNumber(this.ge)}ye(e,t,r){let i=e.add(t.multiply(ln.fromNumber(r)));return i.compare(cT)===1&&(i=new ln([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=vu(e),[r,i]=Eu(t);for(let s=0;s<this.hashCount;s++){const a=this.ye(r,i,s);if(!this.we(a))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new Xa(s,i,t);return r.forEach((c=>a.insert(c))),a}insert(e){if(this.ge===0)return;const t=vu(e),[r,i]=Eu(t);for(let s=0;s<this.hashCount;s++){const a=this.ye(r,i,s);this.be(a)}}be(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Zr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,Di.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ro(W.min(),i,new Ae(X),mn(),te())}}class Di{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Di(r,t,te(),te(),te())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(e,t,r,i){this.Se=e,this.removedTargetIds=t,this.key=r,this.De=i}}class qd{constructor(e,t){this.targetId=e,this.Ce=t}}class Hd{constructor(e,t,r=Be.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class Tu{constructor(){this.ve=0,this.Fe=wu(),this.Me=Be.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=te(),t=te(),r=te();return this.Fe.forEach(((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:G(38017,{changeType:s})}})),new Di(this.Me,this.xe,e,t,r)}Ke(){this.Oe=!1,this.Fe=wu()}qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,ge(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class lT{constructor(e){this.Ge=e,this.ze=new Map,this.je=mn(),this.He=ss(),this.Je=ss(),this.Ze=new Ae(X)}Xe(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.Ke(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:G(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,i)=>{this.rt(i)&&t(i)}))}st(e){const t=e.targetId,r=e.Ce.count,i=this.ot(t);if(i){const s=i.target;if(ra(s))if(r===0){const a=new H(s.path);this.et(t,a,He.newNoDocument(a,W.min()))}else ge(r===1,20013,{expectedCount:r});else{const a=this._t(t);if(a!==r){const c=this.ut(e),u=c?this.ct(c,e,a):1;if(u!==0){this.it(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let a,c;try{a=fn(r).toUint8Array()}catch(u){if(u instanceof yd)return Bn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Xa(a,i,s)}catch(u){return Bn(u instanceof Zr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let i=0;return r.forEach((s=>{const a=this.Ge.ht(),c=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.et(t,s,null),i++)})),i}Tt(e){const t=new Map;this.ze.forEach(((s,a)=>{const c=this.ot(a);if(c){if(s.current&&ra(c.target)){const u=new H(c.target.path);this.It(u).has(a)||this.Et(a,u)||this.et(a,u,He.newNoDocument(u,e))}s.Be&&(t.set(a,s.ke()),s.Ke())}}));let r=te();this.Je.forEach(((s,a)=>{let c=!0;a.forEachWhile((u=>{const d=this.ot(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(s))})),this.je.forEach(((s,a)=>a.setReadTime(e)));const i=new ro(e,t,this.Ze,this.je,r);return this.je=mn(),this.He=ss(),this.Je=ss(),this.Ze=new Ae(X),i}Ye(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).qe(t.key,r),this.je=this.je.insert(t.key,t),this.He=this.He.insert(t.key,this.It(t.key).add(e)),this.Je=this.Je.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const i=this.nt(e);this.Et(e,t)?i.qe(t,1):i.Ue(t),this.Je=this.Je.insert(t,this.Rt(t).delete(e)),this.Je=this.Je.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Tu,this.ze.set(e,t)),t}Rt(e){let t=this.Je.get(e);return t||(t=new Oe(X),this.Je=this.Je.insert(e,t)),t}It(e){let t=this.He.get(e);return t||(t=new Oe(X),this.He=this.He.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||x("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Tu),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function ss(){return new Ae(H.comparator)}function wu(){return new Ae(H.comparator)}const uT={asc:"ASCENDING",desc:"DESCENDING"},hT={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},dT={and:"AND",or:"OR"};class fT{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ca(n,e){return n.useProto3Json||Xs(e)?e:{value:e}}function la(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function zd(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function or(n){return ge(!!n,49232),W.fromTimestamp((function(t){const r=dn(t);return new de(r.seconds,r.nanos)})(n))}function Wd(n,e){return ua(n,e).canonicalString()}function ua(n,e){const t=(function(i){return new he(["projects",i.projectId,"databases",i.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Gd(n){const e=he.fromString(n);return ge(Xd(e),10190,{key:e.toString()}),e}function Lo(n,e){const t=Gd(e);if(t.get(1)!==n.databaseId.projectId)throw new M(D.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new M(D.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new H(Qd(t))}function Kd(n,e){return Wd(n.databaseId,e)}function pT(n){const e=Gd(n);return e.length===4?he.emptyPath():Qd(e)}function Iu(n){return new he(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Qd(n){return ge(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function mT(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:G(39313,{state:d})})(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=(function(d,f){return d.useProto3Json?(ge(f===void 0||typeof f=="string",58123),Be.fromBase64String(f||"")):(ge(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Be.fromUint8Array(f||new Uint8Array))})(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&(function(d){const f=d.code===void 0?D.UNKNOWN:$d(d.code);return new M(f,d.message||"")})(a);t=new Hd(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Lo(n,r.document.name),s=or(r.document.updateTime),a=r.document.createTime?or(r.document.createTime):W.min(),c=new It({mapValue:{fields:r.document.fields}}),u=He.newFoundDocument(i,s,a,c),d=r.targetIds||[],f=r.removedTargetIds||[];t=new _s(d,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Lo(n,r.document),s=r.readTime?or(r.readTime):W.min(),a=He.newNoDocument(i,s),c=r.removedTargetIds||[];t=new _s([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Lo(n,r.document),s=r.removedTargetIds||[];t=new _s([],s,i,null)}else{if(!("filter"in e))return G(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,a=new oT(i,s),c=r.targetId;t=new qd(c,a)}}return t}function gT(n,e){return{documents:[Kd(n,e.path)]}}function _T(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Kd(n,i);const s=(function(d){if(d.length!==0)return Jd(yt.create(d,"and"))})(e.filters);s&&(t.structuredQuery.where=s);const a=(function(d){if(d.length!==0)return d.map((f=>(function(w){return{field:Jn(w.field),direction:ET(w.dir)}})(f)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=ca(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(d){return{before:d.inclusive,values:d.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(d){return{before:!d.inclusive,values:d.position}})(e.endAt)),{ft:t,parent:i}}function yT(n){let e=pT(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){ge(r===1,65062);const f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];t.where&&(s=(function(y){const w=Yd(y);return w instanceof yt&&Sd(w)?w.getFilters():[w]})(t.where));let a=[];t.orderBy&&(a=(function(y){return y.map((w=>(function(P){return new Ei(Xn(P.field),(function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(P.direction))})(w)))})(t.orderBy));let c=null;t.limit&&(c=(function(y){let w;return w=typeof y=="object"?y.value:y,Xs(w)?null:w})(t.limit));let u=null;t.startAt&&(u=(function(y){const w=!!y.before,b=y.values||[];return new Vs(b,w)})(t.startAt));let d=null;return t.endAt&&(d=(function(y){const w=!y.before,b=y.values||[];return new Vs(b,w)})(t.endAt)),jE(e,i,a,s,c,"F",u,d)}function vT(n,e){const t=(function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return G(28987,{purpose:i})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Yd(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Xn(t.unaryFilter.field);return Pe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Xn(t.unaryFilter.field);return Pe.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Xn(t.unaryFilter.field);return Pe.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Xn(t.unaryFilter.field);return Pe.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return G(61313);default:return G(60726)}})(n):n.fieldFilter!==void 0?(function(t){return Pe.create(Xn(t.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return G(58110);default:return G(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return yt.create(t.compositeFilter.filters.map((r=>Yd(r))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return G(1026)}})(t.compositeFilter.op))})(n):G(30097,{filter:n})}function ET(n){return uT[n]}function TT(n){return hT[n]}function wT(n){return dT[n]}function Jn(n){return{fieldPath:n.canonicalString()}}function Xn(n){return ze.fromServerFormat(n.fieldPath)}function Jd(n){return n instanceof Pe?(function(t){if(t.op==="=="){if(uu(t.value))return{unaryFilter:{field:Jn(t.field),op:"IS_NAN"}};if(lu(t.value))return{unaryFilter:{field:Jn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(uu(t.value))return{unaryFilter:{field:Jn(t.field),op:"IS_NOT_NAN"}};if(lu(t.value))return{unaryFilter:{field:Jn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Jn(t.field),op:TT(t.op),value:t.value}}})(n):n instanceof yt?(function(t){const r=t.getFilters().map((i=>Jd(i)));return r.length===1?r[0]:{compositeFilter:{op:wT(t.op),filters:r}}})(n):G(54877,{filter:n})}function Xd(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Zd(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e,t,r,i,s=W.min(),a=W.min(),c=Be.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new sn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new sn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new sn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new sn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IT{constructor(e){this.yt=e}}function AT(n){const e=yT({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?sa(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bT{constructor(){this.Sn=new RT}addToCollectionParentIndex(e,t){return this.Sn.add(t),S.resolve()}getCollectionParents(e,t){return S.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return S.resolve()}deleteFieldIndex(e,t){return S.resolve()}deleteAllFieldIndexes(e){return S.resolve()}createTargetIndexes(e,t){return S.resolve()}getDocumentsMatchingTarget(e,t){return S.resolve(null)}getIndexType(e,t){return S.resolve(0)}getFieldIndexes(e,t){return S.resolve([])}getNextCollectionGroupToUpdate(e){return S.resolve(null)}getMinOffset(e,t){return S.resolve(hn.min())}getMinOffsetFromCollectionGroup(e,t){return S.resolve(hn.min())}updateCollectionGroup(e,t,r){return S.resolve()}updateIndexEntries(e,t){return S.resolve()}}class RT{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Oe(he.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Oe(he.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Au={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},ef=41943040;class tt{static withCacheSize(e){return new tt(e,tt.DEFAULT_COLLECTION_PERCENTILE,tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */tt.DEFAULT_COLLECTION_PERCENTILE=10,tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,tt.DEFAULT=new tt(ef,tt.DEFAULT_COLLECTION_PERCENTILE,tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),tt.DISABLED=new tt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new vr(0)}static ar(){return new vr(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bu="LruGarbageCollector",ST=1048576;function Ru([n,e],[t,r]){const i=X(n,t);return i===0?X(e,r):i}class PT{constructor(e){this.Pr=e,this.buffer=new Oe(Ru),this.Tr=0}Ir(){return++this.Tr}Er(e){const t=[e,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Ru(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class CT{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){x(bu,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Sr(t)?x(bu,"Ignoring IndexedDB error during garbage collection: ",t):await Ys(t)}await this.Ar(3e5)}))}}class kT{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return S.resolve(Js.ce);const r=new PT(t);return this.Vr.forEachTarget(e,(i=>r.Er(i.sequenceNumber))).next((()=>this.Vr.mr(e,(i=>r.Er(i))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(x("LruGarbageCollector","Garbage collection skipped; disabled"),S.resolve(Au)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(x("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Au):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,i,s,a,c,u,d;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((y=>(y>this.params.maximumSequenceNumbersToCollect?(x("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${y}`),i=this.params.maximumSequenceNumbersToCollect):i=y,a=Date.now(),this.nthSequenceNumber(e,i)))).next((y=>(r=y,c=Date.now(),this.removeTargets(e,r,t)))).next((y=>(s=y,u=Date.now(),this.removeOrphanedDocuments(e,r)))).next((y=>(d=Date.now(),Qn()<=J.DEBUG&&x("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${i} in `+(c-a)+`ms
	Removed ${s} targets in `+(u-c)+`ms
	Removed ${y} documents in `+(d-u)+`ms
Total Duration: ${d-f}ms`),S.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:y}))))}}function DT(n,e){return new kT(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OT{constructor(){this.changes=new zn((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,He.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?S.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VT{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NT{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((i=>(r=i,this.remoteDocumentCache.getEntry(e,t)))).next((i=>(r!==null&&li(r.mutation,i,rn.empty(),de.now()),i)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,te()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=te()){const i=On();return this.populateOverlays(e,i,t).next((()=>this.computeViews(e,t,i,r).next((s=>{let a=Xr();return s.forEach(((c,u)=>{a=a.insert(c,u.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const r=On();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,te())))}populateOverlays(e,t,r){const i=[];return r.forEach((s=>{t.has(s)||i.push(s)})),this.documentOverlayCache.getOverlays(e,i).next((s=>{s.forEach(((a,c)=>{t.set(a,c)}))}))}computeViews(e,t,r,i){let s=mn();const a=ci(),c=(function(){return ci()})();return t.forEach(((u,d)=>{const f=r.get(d.key);i.has(d.key)&&(f===void 0||f.mutation instanceof no)?s=s.insert(d.key,d):f!==void 0?(a.set(d.key,f.mutation.getFieldMask()),li(f.mutation,d,f.mutation.getFieldMask(),de.now())):a.set(d.key,rn.empty())})),this.recalculateAndSaveOverlays(e,s).next((u=>(u.forEach(((d,f)=>a.set(d,f))),t.forEach(((d,f)=>c.set(d,new VT(f,a.get(d)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=ci();let i=new Ae(((a,c)=>a-c)),s=te();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const c of a)c.keys().forEach((u=>{const d=t.get(u);if(d===null)return;let f=r.get(u)||rn.empty();f=c.applyToLocalView(d,f),r.set(u,f);const y=(i.get(c.batchId)||te()).add(u);i=i.insert(c.batchId,y)}))})).next((()=>{const a=[],c=i.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),d=u.key,f=u.value,y=xd();f.forEach((w=>{if(!s.has(w)){const b=jd(t.get(w),r.get(w));b!==null&&y.set(w,b),s=s.add(w)}})),a.push(this.documentOverlayCache.saveOverlays(e,d,y))}return S.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,i){return BE(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Dd(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next((s=>{const a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):S.resolve(On());let c=gi,u=s;return a.next((d=>S.forEach(d,((f,y)=>(c<y.largestBatchId&&(c=y.largestBatchId),s.get(f)?S.resolve():this.remoteDocumentCache.getEntry(e,f).next((w=>{u=u.insert(f,w)}))))).next((()=>this.populateOverlays(e,d,s))).next((()=>this.computeViews(e,u,d,te()))).next((f=>({batchId:c,changes:GE(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new H(t)).next((r=>{let i=Xr();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let a=Xr();return this.indexManager.getCollectionParents(e,s).next((c=>S.forEach(c,(u=>{const d=(function(y,w){return new Cr(w,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)})(t,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next((f=>{f.forEach(((y,w)=>{a=a.insert(y,w)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i)))).next((a=>{s.forEach(((u,d)=>{const f=d.getKey();a.get(f)===null&&(a=a.insert(f,He.newInvalidDocument(f)))}));let c=Xr();return a.forEach(((u,d)=>{const f=s.get(u);f!==void 0&&li(f.mutation,d,rn.empty(),de.now()),eo(t,d)&&(c=c.insert(u,d))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xT{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return S.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(i){return{id:i.id,version:i.version,createTime:or(i.createTime)}})(t)),S.resolve()}getNamedQuery(e,t){return S.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(i){return{name:i.name,query:AT(i.bundledQuery),readTime:or(i.readTime)}})(t)),S.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LT{constructor(){this.overlays=new Ae(H.comparator),this.Lr=new Map}getOverlay(e,t){return S.resolve(this.overlays.get(t))}getOverlays(e,t){const r=On();return S.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&r.set(i,s)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((i,s)=>{this.bt(e,t,s)})),S.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Lr.get(r);return i!==void 0&&(i.forEach((s=>this.overlays=this.overlays.remove(s))),this.Lr.delete(r)),S.resolve()}getOverlaysForCollection(e,t,r){const i=On(),s=t.length+1,a=new H(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return S.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new Ae(((d,f)=>d-f));const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let f=s.get(d.largestBatchId);f===null&&(f=On(),s=s.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const c=On(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((d,f)=>c.set(d,f))),!(c.size()>=i)););return S.resolve(c)}bt(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const a=this.Lr.get(i.largestBatchId).delete(r.key);this.Lr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new sT(t,r));let s=this.Lr.get(t);s===void 0&&(s=te(),this.Lr.set(t,s)),this.Lr.set(t,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MT{constructor(){this.sessionToken=Be.EMPTY_BYTE_STRING}getSessionToken(e){return S.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,S.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{constructor(){this.kr=new Oe(Me.Kr),this.qr=new Oe(Me.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new Me(e,t);this.kr=this.kr.add(r),this.qr=this.qr.add(r)}$r(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Wr(new Me(e,t))}Qr(e,t){e.forEach((r=>this.removeReference(r,t)))}Gr(e){const t=new H(new he([])),r=new Me(t,e),i=new Me(t,e+1),s=[];return this.qr.forEachInRange([r,i],(a=>{this.Wr(a),s.push(a.key)})),s}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.qr=this.qr.delete(e)}jr(e){const t=new H(new he([])),r=new Me(t,e),i=new Me(t,e+1);let s=te();return this.qr.forEachInRange([r,i],(a=>{s=s.add(a.key)})),s}containsKey(e){const t=new Me(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Me{constructor(e,t){this.key=e,this.Hr=t}static Kr(e,t){return H.comparator(e.key,t.key)||X(e.Hr,t.Hr)}static Ur(e,t){return X(e.Hr,t.Hr)||H.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FT{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Jr=new Oe(Me.Kr)}checkEmpty(e){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new iT(s,t,r,i);this.mutationQueue.push(a);for(const c of i)this.Jr=this.Jr.add(new Me(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return S.resolve(a)}lookupMutationBatch(e,t){return S.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Xr(r),s=i<0?0:i;return S.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?EE:this.Yn-1)}getAllMutationBatches(e){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Me(t,0),i=new Me(t,Number.POSITIVE_INFINITY),s=[];return this.Jr.forEachInRange([r,i],(a=>{const c=this.Zr(a.Hr);s.push(c)})),S.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Oe(X);return t.forEach((i=>{const s=new Me(i,0),a=new Me(i,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([s,a],(c=>{r=r.add(c.Hr)}))})),S.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;H.isDocumentKey(s)||(s=s.child(""));const a=new Me(new H(s),0);let c=new Oe(X);return this.Jr.forEachWhile((u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(c=c.add(u.Hr)),!0)}),a),S.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach((r=>{const i=this.Zr(r);i!==null&&t.push(i)})),t}removeMutationBatch(e,t){ge(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return S.forEach(t.mutations,(i=>{const s=new Me(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)})).next((()=>{this.Jr=r}))}nr(e){}containsKey(e,t){const r=new Me(t,0),i=this.Jr.firstAfterOrEqual(r);return S.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,S.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UT{constructor(e){this.ti=e,this.docs=(function(){return new Ae(H.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,a=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return S.resolve(r?r.document.mutableCopy():He.newInvalidDocument(t))}getEntries(e,t){let r=mn();return t.forEach((i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():He.newInvalidDocument(i))})),S.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=mn();const a=t.path,c=new H(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||gE(mE(f),r)<=0||(i.has(f.key)||eo(t,f))&&(s=s.insert(f.key,f.mutableCopy()))}return S.resolve(s)}getAllFromCollectionGroup(e,t,r,i){G(9500)}ni(e,t){return S.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new jT(this)}getSize(e){return S.resolve(this.size)}}class jT extends OT{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,i)=>{i.isValidDocument()?t.push(this.Mr.addEntry(e,i)):this.Mr.removeEntry(r)})),S.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BT{constructor(e){this.persistence=e,this.ri=new zn((t=>Wa(t)),Ga),this.lastRemoteSnapshotVersion=W.min(),this.highestTargetId=0,this.ii=0,this.si=new Za,this.targetCount=0,this.oi=vr._r()}forEachTarget(e,t){return this.ri.forEach(((r,i)=>t(i))),S.resolve()}getLastRemoteSnapshotVersion(e){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return S.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),S.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new vr(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,S.resolve()}updateTargetData(e,t){return this.lr(t),S.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,S.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.ri.forEach(((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ri.delete(a),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)})),S.waitFor(s).next((()=>i))}getTargetCount(e){return S.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return S.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),S.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach((a=>{s.push(i.markPotentiallyOrphaned(e,a))})),S.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),S.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return S.resolve(r)}containsKey(e,t){return S.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf{constructor(e,t){this._i={},this.overlays={},this.ai=new Js(0),this.ui=!1,this.ui=!0,this.ci=new MT,this.referenceDelegate=e(this),this.li=new BT(this),this.indexManager=new bT,this.remoteDocumentCache=(function(i){return new UT(i)})((r=>this.referenceDelegate.hi(r))),this.serializer=new IT(t),this.Pi=new xT(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new LT,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new FT(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){x("MemoryPersistence","Starting transaction:",e);const i=new $T(this.ai.next());return this.referenceDelegate.Ti(),r(i).next((s=>this.referenceDelegate.Ii(i).next((()=>s)))).toPromise().then((s=>(i.raiseOnCommittedEvent(),s)))}Ei(e,t){return S.or(Object.values(this._i).map((r=>()=>r.containsKey(e,t))))}}class $T extends yE{constructor(e){super(),this.currentSequenceNumber=e}}class ec{constructor(e){this.persistence=e,this.Ri=new Za,this.Ai=null}static Vi(e){return new ec(e)}get di(){if(this.Ai)return this.Ai;throw G(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),S.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),S.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),S.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((i=>this.di.add(i.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((i=>{i.forEach((s=>this.di.add(s.toString())))})).next((()=>r.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ii(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.di,(r=>{const i=H.fromPath(r);return this.mi(e,i).next((s=>{s||t.removeEntry(i,W.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return S.or([()=>S.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class Ls{constructor(e,t){this.persistence=e,this.fi=new zn((r=>wE(r.path)),((r,i)=>r.isEqual(i))),this.garbageCollector=DT(this,t)}static Vi(e,t){return new Ls(e,t)}Ti(){}Ii(e){return S.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((i=>r+i))))}pr(e){let t=0;return this.mr(e,(r=>{t++})).next((()=>t))}mr(e,t){return S.forEach(this.fi,((r,i)=>this.wr(e,r,i).next((s=>s?S.resolve():t(i)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ni(e,(a=>this.wr(e,a,t).next((c=>{c||(r++,s.removeEntry(a,W.min()))})))).next((()=>s.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),S.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),S.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),S.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),S.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ms(e.data.value)),t}wr(e,t,r){return S.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.fi.get(t);return S.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Ts=r,this.Is=i}static Es(e,t){let r=te(),i=te();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new tc(e,t.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qT{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HT{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return Ig()?8:vE(Ge())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.gs(e,t).next((a=>{s.result=a})).next((()=>{if(!s.result)return this.ps(e,t,i,r).next((a=>{s.result=a}))})).next((()=>{if(s.result)return;const a=new qT;return this.ys(e,t,a).next((c=>{if(s.result=c,this.As)return this.ws(e,t,a,c.size)}))})).next((()=>s.result))}ws(e,t,r,i){return r.documentReadCount<this.Vs?(Qn()<=J.DEBUG&&x("QueryEngine","SDK will not create cache indexes for query:",Yn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),S.resolve()):(Qn()<=J.DEBUG&&x("QueryEngine","Query:",Yn(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.ds*i?(Qn()<=J.DEBUG&&x("QueryEngine","The SDK decides to create cache indexes for query:",Yn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Pt(t))):S.resolve())}gs(e,t){if(pu(t))return S.resolve(null);let r=Pt(t);return this.indexManager.getIndexType(e,r).next((i=>i===0?null:(t.limit!==null&&i===1&&(t=sa(t,null,"F"),r=Pt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((s=>{const a=te(...s);return this.fs.getDocuments(e,a).next((c=>this.indexManager.getMinOffset(e,r).next((u=>{const d=this.bs(t,c);return this.Ss(t,d,a,u.readTime)?this.gs(e,sa(t,null,"F")):this.Ds(e,d,t,u)}))))})))))}ps(e,t,r,i){return pu(t)||i.isEqual(W.min())?S.resolve(null):this.fs.getDocuments(e,r).next((s=>{const a=this.bs(t,s);return this.Ss(t,a,r,i)?S.resolve(null):(Qn()<=J.DEBUG&&x("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Yn(t)),this.Ds(e,a,t,pE(i,gi)).next((c=>c)))}))}bs(e,t){let r=new Oe(Vd(e));return t.forEach(((i,s)=>{eo(e,s)&&(r=r.add(s))})),r}Ss(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ys(e,t,r){return Qn()<=J.DEBUG&&x("QueryEngine","Using full collection scan to execute query:",Yn(t)),this.fs.getDocumentsMatchingQuery(e,t,hn.min(),r)}Ds(e,t,r,i){return this.fs.getDocumentsMatchingQuery(e,r,i).next((s=>(t.forEach((a=>{s=s.insert(a.key,a)})),s)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nc="LocalStore",zT=3e8;class WT{constructor(e,t,r,i){this.persistence=e,this.Cs=t,this.serializer=i,this.vs=new Ae(X),this.Fs=new zn((s=>Wa(s)),Ga),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new NT(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function GT(n,e,t,r){return new WT(n,e,t,r)}async function nf(n,e){const t=ee(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next((s=>(i=s,t.Os(e),t.mutationQueue.getAllMutationBatches(r)))).next((s=>{const a=[],c=[];let u=te();for(const d of i){a.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of s){c.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next((d=>({Ns:d,removedBatchIds:a,addedBatchIds:c})))}))}))}function rf(n){const e=ee(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function KT(n,e){const t=ee(n),r=e.snapshotVersion;let i=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(s=>{const a=t.xs.newChangeBuffer({trackRemovals:!0});i=t.vs;const c=[];e.targetChanges.forEach(((f,y)=>{const w=i.get(y);if(!w)return;c.push(t.li.removeMatchingKeys(s,f.removedDocuments,y).next((()=>t.li.addMatchingKeys(s,f.addedDocuments,y))));let b=w.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(y)!==null?b=b.withResumeToken(Be.EMPTY_BYTE_STRING,W.min()).withLastLimboFreeSnapshotVersion(W.min()):f.resumeToken.approximateByteSize()>0&&(b=b.withResumeToken(f.resumeToken,r)),i=i.insert(y,b),(function(k,C,L){return k.resumeToken.approximateByteSize()===0||C.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=zT?!0:L.addedDocuments.size+L.modifiedDocuments.size+L.removedDocuments.size>0})(w,b,f)&&c.push(t.li.updateTargetData(s,b))}));let u=mn(),d=te();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,f))})),c.push(QT(s,a,e.documentUpdates).next((f=>{u=f.Bs,d=f.Ls}))),!r.isEqual(W.min())){const f=t.li.getLastRemoteSnapshotVersion(s).next((y=>t.li.setTargetsMetadata(s,s.currentSequenceNumber,r)));c.push(f)}return S.waitFor(c).next((()=>a.apply(s))).next((()=>t.localDocuments.getLocalViewOfDocuments(s,u,d))).next((()=>u))})).then((s=>(t.vs=i,s)))}function QT(n,e,t){let r=te(),i=te();return t.forEach((s=>r=r.add(s))),e.getEntries(n,r).next((s=>{let a=mn();return t.forEach(((c,u)=>{const d=s.get(c);u.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),u.isNoDocument()&&u.version.isEqual(W.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):x(nc,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",u.version)})),{Bs:a,Ls:i}}))}function YT(n,e){const t=ee(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let i;return t.li.getTargetData(r,e).next((s=>s?(i=s,S.resolve(i)):t.li.allocateTargetId(r).next((a=>(i=new sn(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.li.addTargetData(r,i).next((()=>i)))))))})).then((r=>{const i=t.vs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.vs=t.vs.insert(r.targetId,r),t.Fs.set(e,r.targetId)),r}))}async function ha(n,e,t){const r=ee(n),i=r.vs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,(a=>r.persistence.referenceDelegate.removeTarget(a,i)))}catch(a){if(!Sr(a))throw a;x(nc,`Failed to update sequence numbers for target ${e}: ${a}`)}r.vs=r.vs.remove(e),r.Fs.delete(i.target)}function Su(n,e,t){const r=ee(n);let i=W.min(),s=te();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(u,d,f){const y=ee(u),w=y.Fs.get(f);return w!==void 0?S.resolve(y.vs.get(w)):y.li.getTargetData(d,f)})(r,a,Pt(e)).next((c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(a,c.targetId).next((u=>{s=u}))})).next((()=>r.Cs.getDocumentsMatchingQuery(a,e,t?i:W.min(),t?s:te()))).next((c=>(JT(r,HE(e),c),{documents:c,ks:s})))))}function JT(n,e,t){let r=n.Ms.get(e)||W.min();t.forEach(((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)})),n.Ms.set(e,r)}class Pu{constructor(){this.activeTargetIds=YE()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class XT{constructor(){this.vo=new Pu,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new Pu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZT{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cu="ConnectivityMonitor";class ku{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){x(Cu,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){x(Cu,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let os=null;function da(){return os===null?os=(function(){return 268435456+Math.round(2147483648*Math.random())})():os++,"0x"+os.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mo="RestConnection",ew={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class tw{get Ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.$o=this.databaseId.database===Ds?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,t,r,i,s){const a=da(),c=this.Qo(e,t.toUriEncodedString());x(Mo,`Sending RPC '${e}' ${a}:`,c,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,i,s);const{host:d}=new URL(c),f=qn(d);return this.zo(e,c,u,r,f).then((y=>(x(Mo,`Received RPC '${e}' ${a}: `,y),y)),(y=>{throw Bn(Mo,`RPC '${e}' ${a} failed with error: `,y,"url: ",c,"request:",r),y}))}jo(e,t,r,i,s,a){return this.Wo(e,t,r,i,s)}Go(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Rr})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((i,s)=>e[s]=i)),r&&r.headers.forEach(((i,s)=>e[s]=i))}Qo(e,t){const r=ew[e];let i=`${this.qo}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(i=`${i}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),i}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nw{constructor(e){this.Ho=e.Ho,this.Jo=e.Jo}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Jo()}send(e){this.Ho(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $e="WebChannelConnection",Gr=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(i){setTimeout((()=>{throw i}),0)}}))};class ar extends tw{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!ar.c_){const e=ud();Gr(e,ld.STAT_EVENT,(t=>{t.stat===Xo.PROXY?x($e,"STAT_EVENT: detected buffering proxy"):t.stat===Xo.NOPROXY&&x($e,"STAT_EVENT: detected no buffering proxy")})),ar.c_=!0}}zo(e,t,r,i,s){const a=da();return new Promise(((c,u)=>{const d=new ad;d.setWithCredentials(!0),d.listenOnce(cd.COMPLETE,(()=>{try{switch(d.getLastErrorCode()){case fs.NO_ERROR:const y=d.getResponseJson();x($e,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(y)),c(y);break;case fs.TIMEOUT:x($e,`RPC '${e}' ${a} timed out`),u(new M(D.DEADLINE_EXCEEDED,"Request time out"));break;case fs.HTTP_ERROR:const w=d.getStatus();if(x($e,`RPC '${e}' ${a} failed with status:`,w,"response text:",d.getResponseText()),w>0){let b=d.getResponseJson();Array.isArray(b)&&(b=b[0]);const P=b==null?void 0:b.error;if(P&&P.status&&P.message){const k=(function(L){const N=L.toLowerCase().replace(/_/g,"-");return Object.values(D).indexOf(N)>=0?N:D.UNKNOWN})(P.status);u(new M(k,P.message))}else u(new M(D.UNKNOWN,"Server responded with status "+d.getStatus()))}else u(new M(D.UNAVAILABLE,"Connection failed."));break;default:G(9055,{l_:e,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{x($e,`RPC '${e}' ${a} completed.`)}}));const f=JSON.stringify(i);x($e,`RPC '${e}' ${a} sending request:`,i),d.send(t,"POST",f,r,15)}))}T_(e,t,r){const i=da(),s=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const d=s.join("");x($e,`Creating RPC '${e}' stream ${i}: ${d}`,c);const f=a.createWebChannel(d,c);this.I_(f);let y=!1,w=!1;const b=new nw({Ho:P=>{w?x($e,`Not sending because RPC '${e}' stream ${i} is closed:`,P):(y||(x($e,`Opening RPC '${e}' stream ${i} transport.`),f.open(),y=!0),x($e,`RPC '${e}' stream ${i} sending:`,P),f.send(P))},Jo:()=>f.close()});return Gr(f,Jr.EventType.OPEN,(()=>{w||(x($e,`RPC '${e}' stream ${i} transport opened.`),b.i_())})),Gr(f,Jr.EventType.CLOSE,(()=>{w||(w=!0,x($e,`RPC '${e}' stream ${i} transport closed`),b.o_(),this.E_(f))})),Gr(f,Jr.EventType.ERROR,(P=>{w||(w=!0,Bn($e,`RPC '${e}' stream ${i} transport errored. Name:`,P.name,"Message:",P.message),b.o_(new M(D.UNAVAILABLE,"The operation could not be completed")))})),Gr(f,Jr.EventType.MESSAGE,(P=>{var k;if(!w){const C=P.data[0];ge(!!C,16349);const L=C,N=(L==null?void 0:L.error)||((k=L[0])==null?void 0:k.error);if(N){x($e,`RPC '${e}' stream ${i} received error:`,N);const U=N.status;let F=(function(v){const g=Se[v];if(g!==void 0)return $d(g)})(U),j=N.message;U==="NOT_FOUND"&&j.includes("database")&&j.includes("does not exist")&&j.includes(this.databaseId.database)&&Bn(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),F===void 0&&(F=D.INTERNAL,j="Unknown error status: "+U+" with message "+N.message),w=!0,b.o_(new M(F,j)),f.close()}else x($e,`RPC '${e}' stream ${i} received:`,C),b.__(C)}})),ar.u_(),setTimeout((()=>{b.s_()}),0),b}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}I_(e){this.a_.push(e)}E_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return hd()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rw(n){return new ar(n)}function Fo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function io(n){return new fT(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ar.c_=!1;class sf{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=i,this.V_=s,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),i=Math.max(0,t-r);i>0&&x("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,i,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Du="PersistentStream";class iw{constructor(e,t,r,i,s,a,c,u){this.Ci=e,this.b_=r,this.S_=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new sf(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,(()=>this.k_())))}K_(e){this.q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===D.RESOURCE_EXHAUSTED?(jt(t.toString()),jt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===D.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,i])=>{this.D_===t&&this.G_(r,i)}),(r=>{e((()=>{const i=new M(D.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(i)}))}))}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.Yo((()=>{r((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((i=>{r((()=>this.z_(i)))})),this.stream.onMessage((i=>{r((()=>++this.F_==1?this.H_(i):this.onNext(i)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return x(Du,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(x(Du,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class sw extends iw{constructor(e,t,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}H_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=mT(this.serializer,e),r=(function(s){if(!("targetChange"in s))return W.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?W.min():a.readTime?or(a.readTime):W.min()})(e);return this.listener.J_(t,r)}Z_(e){const t={};t.database=Iu(this.serializer),t.addTarget=(function(s,a){let c;const u=a.target;if(c=ra(u)?{documents:gT(s,u)}:{query:_T(s,u).ft},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=zd(s,a.resumeToken);const d=ca(s,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(W.min())>0){c.readTime=la(s,a.snapshotVersion.toTimestamp());const d=ca(s,a.expectedCount);d!==null&&(c.expectedCount=d)}return c})(this.serializer,e);const r=vT(this.serializer,e);r&&(t.labels=r),this.K_(t)}X_(e){const t={};t.database=Iu(this.serializer),t.removeTarget=e,this.K_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ow{}class aw extends ow{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new M(D.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,a])=>this.connection.Wo(e,ua(t,r),i,s,a))).catch((s=>{throw s.name==="FirebaseError"?(s.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new M(D.UNKNOWN,s.toString())}))}jo(e,t,r,i,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,c])=>this.connection.jo(e,ua(t,r),i,a,c,s))).catch((a=>{throw a.name==="FirebaseError"?(a.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new M(D.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function cw(n,e,t,r){return new aw(n,e,t,r)}class lw{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(jt(t),this.aa=!1):x("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Er="RemoteStore";class uw{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=s,this.Aa.Mo((a=>{r.enqueueAndForget((async()=>{Vi(this)&&(x(Er,"Restarting streams for network reachability change."),await(async function(u){const d=ee(u);d.Ea.add(4),await Oi(d),d.Va.set("Unknown"),d.Ea.delete(4),await so(d)})(this))}))})),this.Va=new lw(r,i)}}async function so(n){if(Vi(n))for(const e of n.Ra)await e(!0)}async function Oi(n){for(const e of n.Ra)await e(!1)}function of(n,e){const t=ee(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),oc(t)?sc(t):kr(t).O_()&&ic(t,e))}function rc(n,e){const t=ee(n),r=kr(t);t.Ia.delete(e),r.O_()&&af(t,e),t.Ia.size===0&&(r.O_()?r.L_():Vi(t)&&t.Va.set("Unknown"))}function ic(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(W.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}kr(n).Z_(e)}function af(n,e){n.da.$e(e),kr(n).X_(e)}function sc(n){n.da=new lT({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),kr(n).start(),n.Va.ua()}function oc(n){return Vi(n)&&!kr(n).x_()&&n.Ia.size>0}function Vi(n){return ee(n).Ea.size===0}function cf(n){n.da=void 0}async function hw(n){n.Va.set("Online")}async function dw(n){n.Ia.forEach(((e,t)=>{ic(n,e)}))}async function fw(n,e){cf(n),oc(n)?(n.Va.ha(e),sc(n)):n.Va.set("Unknown")}async function pw(n,e,t){if(n.Va.set("Online"),e instanceof Hd&&e.state===2&&e.cause)try{await(async function(i,s){const a=s.cause;for(const c of s.targetIds)i.Ia.has(c)&&(await i.remoteSyncer.rejectListen(c,a),i.Ia.delete(c),i.da.removeTarget(c))})(n,e)}catch(r){x(Er,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ou(n,r)}else if(e instanceof _s?n.da.Xe(e):e instanceof qd?n.da.st(e):n.da.tt(e),!t.isEqual(W.min()))try{const r=await rf(n.localStore);t.compareTo(r)>=0&&await(function(s,a){const c=s.da.Tt(a);return c.targetChanges.forEach(((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const f=s.Ia.get(d);f&&s.Ia.set(d,f.withResumeToken(u.resumeToken,a))}})),c.targetMismatches.forEach(((u,d)=>{const f=s.Ia.get(u);if(!f)return;s.Ia.set(u,f.withResumeToken(Be.EMPTY_BYTE_STRING,f.snapshotVersion)),af(s,u);const y=new sn(f.target,u,d,f.sequenceNumber);ic(s,y)})),s.remoteSyncer.applyRemoteEvent(c)})(n,t)}catch(r){x(Er,"Failed to raise snapshot:",r),await Ou(n,r)}}async function Ou(n,e,t){if(!Sr(e))throw e;n.Ea.add(1),await Oi(n),n.Va.set("Offline"),t||(t=()=>rf(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{x(Er,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await so(n)}))}async function Vu(n,e){const t=ee(n);t.asyncQueue.verifyOperationInProgress(),x(Er,"RemoteStore received new credentials");const r=Vi(t);t.Ea.add(3),await Oi(t),r&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await so(t)}async function mw(n,e){const t=ee(n);e?(t.Ea.delete(2),await so(t)):e||(t.Ea.add(2),await Oi(t),t.Va.set("Unknown"))}function kr(n){return n.ma||(n.ma=(function(t,r,i){const s=ee(t);return s.sa(),new sw(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(n.datastore,n.asyncQueue,{Zo:hw.bind(null,n),Yo:dw.bind(null,n),t_:fw.bind(null,n),J_:pw.bind(null,n)}),n.Ra.push((async e=>{e?(n.ma.B_(),oc(n)?sc(n):n.Va.set("Unknown")):(await n.ma.stop(),cf(n))}))),n.ma}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new sr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const a=Date.now()+r,c=new ac(e,t,a,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new M(D.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function lf(n,e){if(jt("AsyncQueue",`${e}: ${n}`),Sr(n))return new M(D.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr{static emptySet(e){return new cr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||H.comparator(t.key,r.key):(t,r)=>H.comparator(t.key,r.key),this.keyedMap=Xr(),this.sortedSet=new Ae(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof cr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new cr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nu{constructor(){this.ga=new Ae(H.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):G(63341,{Vt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,r)=>{e.push(r)})),e}}class Tr{constructor(e,t,r,i,s,a,c,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,i,s){const a=[];return t.forEach((c=>{a.push({type:0,doc:c})})),new Tr(e,t,cr.emptySet(t),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ki(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gw{constructor(){this.wa=void 0,this.ba=[]}Sa(){return this.ba.some((e=>e.Da()))}}class _w{constructor(){this.queries=xu(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const i=ee(t),s=i.queries;i.queries=xu(),s.forEach(((a,c)=>{for(const u of c.ba)u.onError(r)}))})(this,new M(D.ABORTED,"Firestore shutting down"))}}function xu(){return new zn((n=>Od(n)),ki)}async function yw(n,e){const t=ee(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.Sa()&&e.Da()&&(r=2):(s=new gw,r=e.Da()?0:1);try{switch(r){case 0:s.wa=await t.onListen(i,!0);break;case 1:s.wa=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){const c=lf(a,`Initialization of query '${Yn(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.ba.push(e),e.va(t.onlineState),s.wa&&e.Fa(s.wa)&&cc(t)}async function vw(n,e){const t=ee(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const a=s.ba.indexOf(e);a>=0&&(s.ba.splice(a,1),s.ba.length===0?i=e.Da()?0:1:!s.Sa()&&e.Da()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Ew(n,e){const t=ee(n);let r=!1;for(const i of e){const s=i.query,a=t.queries.get(s);if(a){for(const c of a.ba)c.Fa(i)&&(r=!0);a.wa=i}}r&&cc(t)}function Tw(n,e,t){const r=ee(n),i=r.queries.get(e);if(i)for(const s of i.ba)s.onError(t);r.queries.delete(e)}function cc(n){n.Ca.forEach((e=>{e.next()}))}var fa,Lu;(Lu=fa||(fa={})).Ma="default",Lu.Cache="cache";class ww{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Tr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.Ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Tr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==fa.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uf{constructor(e){this.key=e}}class hf{constructor(e){this.key=e}}class Iw{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=te(),this.mutatedKeys=te(),this.eu=Vd(e),this.tu=new cr(this.eu)}get nu(){return this.Za}ru(e,t){const r=t?t.iu:new Nu,i=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,a=i,c=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal(((f,y)=>{const w=i.get(f),b=eo(this.query,y)?y:null,P=!!w&&this.mutatedKeys.has(w.key),k=!!b&&(b.hasLocalMutations||this.mutatedKeys.has(b.key)&&b.hasCommittedMutations);let C=!1;w&&b?w.data.isEqual(b.data)?P!==k&&(r.track({type:3,doc:b}),C=!0):this.su(w,b)||(r.track({type:2,doc:b}),C=!0,(u&&this.eu(b,u)>0||d&&this.eu(b,d)<0)&&(c=!0)):!w&&b?(r.track({type:0,doc:b}),C=!0):w&&!b&&(r.track({type:1,doc:w}),C=!0,(u||d)&&(c=!0)),C&&(b?(a=a.add(b),s=k?s.add(f):s.delete(f)):(a=a.delete(f),s=s.delete(f)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{tu:a,iu:r,Ss:c,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort(((f,y)=>(function(b,P){const k=C=>{switch(C){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return G(20277,{Vt:C})}};return k(b)-k(P)})(f.type,y.type)||this.eu(f.doc,y.doc))),this.ou(r),i=i??!1;const c=t&&!i?this._u():[],u=this.Ya.size===0&&this.current&&!i?1:0,d=u!==this.Xa;return this.Xa=u,a.length!==0||d?{snapshot:new Tr(this.query,e.tu,s,a,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Nu,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=te(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))}));const t=[];return e.forEach((r=>{this.Ya.has(r)||t.push(new hf(r))})),this.Ya.forEach((r=>{e.has(r)||t.push(new uf(r))})),t}cu(e){this.Za=e.ks,this.Ya=te();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Tr.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const lc="SyncEngine";class Aw{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class bw{constructor(e){this.key=e,this.hu=!1}}class Rw{constructor(e,t,r,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new zn((c=>Od(c)),ki),this.Iu=new Map,this.Eu=new Set,this.Ru=new Ae(H.comparator),this.Au=new Map,this.Vu=new Za,this.du={},this.mu=new Map,this.fu=vr.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Sw(n,e,t=!0){const r=gf(n);let i;const s=r.Tu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.lu()):i=await df(r,e,t,!0),i}async function Pw(n,e){const t=gf(n);await df(t,e,!0,!1)}async function df(n,e,t,r){const i=await YT(n.localStore,Pt(e)),s=i.targetId,a=n.sharedClientState.addLocalQueryTarget(s,t);let c;return r&&(c=await Cw(n,e,s,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&of(n.remoteStore,i),c}async function Cw(n,e,t,r,i){n.pu=(y,w,b)=>(async function(k,C,L,N){let U=C.view.ru(L);U.Ss&&(U=await Su(k.localStore,C.query,!1).then((({documents:v})=>C.view.ru(v,U))));const F=N&&N.targetChanges.get(C.targetId),j=N&&N.targetMismatches.get(C.targetId)!=null,B=C.view.applyChanges(U,k.isPrimaryClient,F,j);return Fu(k,C.targetId,B.au),B.snapshot})(n,y,w,b);const s=await Su(n.localStore,e,!0),a=new Iw(e,s.ks),c=a.ru(s.documents),u=Di.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),d=a.applyChanges(c,n.isPrimaryClient,u);Fu(n,t,d.au);const f=new Aw(e,t,a);return n.Tu.set(e,f),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),d.snapshot}async function kw(n,e,t){const r=ee(n),i=r.Tu.get(e),s=r.Iu.get(i.targetId);if(s.length>1)return r.Iu.set(i.targetId,s.filter((a=>!ki(a,e)))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await ha(r.localStore,i.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(i.targetId),t&&rc(r.remoteStore,i.targetId),pa(r,i.targetId)})).catch(Ys)):(pa(r,i.targetId),await ha(r.localStore,i.targetId,!0))}async function Dw(n,e){const t=ee(n),r=t.Tu.get(e),i=t.Iu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),rc(t.remoteStore,r.targetId))}async function ff(n,e){const t=ee(n);try{const r=await KT(t.localStore,e);e.targetChanges.forEach(((i,s)=>{const a=t.Au.get(s);a&&(ge(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.hu=!0:i.modifiedDocuments.size>0?ge(a.hu,14607):i.removedDocuments.size>0&&(ge(a.hu,42227),a.hu=!1))})),await mf(t,r,e)}catch(r){await Ys(r)}}function Mu(n,e,t){const r=ee(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Tu.forEach(((s,a)=>{const c=a.view.va(e);c.snapshot&&i.push(c.snapshot)})),(function(a,c){const u=ee(a);u.onlineState=c;let d=!1;u.queries.forEach(((f,y)=>{for(const w of y.ba)w.va(c)&&(d=!0)})),d&&cc(u)})(r.eventManager,e),i.length&&r.Pu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Ow(n,e,t){const r=ee(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Au.get(e),s=i&&i.key;if(s){let a=new Ae(H.comparator);a=a.insert(s,He.newNoDocument(s,W.min()));const c=te().add(s),u=new ro(W.min(),new Map,new Ae(X),a,c);await ff(r,u),r.Ru=r.Ru.remove(s),r.Au.delete(e),uc(r)}else await ha(r.localStore,e,!1).then((()=>pa(r,e,t))).catch(Ys)}function pa(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach((r=>{n.Vu.containsKey(r)||pf(n,r)}))}function pf(n,e){n.Eu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(rc(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),uc(n))}function Fu(n,e,t){for(const r of t)r instanceof uf?(n.Vu.addReference(r.key,e),Vw(n,r)):r instanceof hf?(x(lc,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,e),n.Vu.containsKey(r.key)||pf(n,r.key)):G(19791,{wu:r})}function Vw(n,e){const t=e.key,r=t.path.canonicalString();n.Ru.get(t)||n.Eu.has(r)||(x(lc,"New document in limbo: "+t),n.Eu.add(r),uc(n))}function uc(n){for(;n.Eu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new H(he.fromString(e)),r=n.fu.next();n.Au.set(r,new bw(t)),n.Ru=n.Ru.insert(t,r),of(n.remoteStore,new sn(Pt(Ka(t.path)),r,"TargetPurposeLimboResolution",Js.ce))}}async function mf(n,e,t){const r=ee(n),i=[],s=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach(((c,u)=>{a.push(r.pu(u,e,t).then((d=>{var f;if((d||t)&&r.isPrimaryClient){const y=d?!d.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,y?"current":"not-current")}if(d){i.push(d);const y=tc.Es(u.targetId,d);s.push(y)}})))})),await Promise.all(a),r.Pu.J_(i),await(async function(u,d){const f=ee(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(y=>S.forEach(d,(w=>S.forEach(w.Ts,(b=>f.persistence.referenceDelegate.addReference(y,w.targetId,b))).next((()=>S.forEach(w.Is,(b=>f.persistence.referenceDelegate.removeReference(y,w.targetId,b)))))))))}catch(y){if(!Sr(y))throw y;x(nc,"Failed to update sequence numbers: "+y)}for(const y of d){const w=y.targetId;if(!y.fromCache){const b=f.vs.get(w),P=b.snapshotVersion,k=b.withLastLimboFreeSnapshotVersion(P);f.vs=f.vs.insert(w,k)}}})(r.localStore,s))}async function Nw(n,e){const t=ee(n);if(!t.currentUser.isEqual(e)){x(lc,"User change. New user:",e.toKey());const r=await nf(t.localStore,e);t.currentUser=e,(function(s,a){s.mu.forEach((c=>{c.forEach((u=>{u.reject(new M(D.CANCELLED,a))}))})),s.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await mf(t,r.Ns)}}function xw(n,e){const t=ee(n),r=t.Au.get(e);if(r&&r.hu)return te().add(r.key);{let i=te();const s=t.Iu.get(e);if(!s)return i;for(const a of s){const c=t.Tu.get(a);i=i.unionWith(c.view.nu)}return i}}function gf(n){const e=ee(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=ff.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=xw.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Ow.bind(null,e),e.Pu.J_=Ew.bind(null,e.eventManager),e.Pu.yu=Tw.bind(null,e.eventManager),e}class Ms{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=io(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return GT(this.persistence,new HT,e.initialUser,this.serializer)}Cu(e){return new tf(ec.Vi,this.serializer)}Du(e){return new XT}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ms.provider={build:()=>new Ms};class Lw extends Ms{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){ge(this.persistence.referenceDelegate instanceof Ls,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new CT(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?tt.withCacheSize(this.cacheSizeBytes):tt.DEFAULT;return new tf((r=>Ls.Vi(r,t)),this.serializer)}}class ma{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Mu(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Nw.bind(null,this.syncEngine),await mw(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new _w})()}createDatastore(e){const t=io(e.databaseInfo.databaseId),r=rw(e.databaseInfo);return cw(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,i,s,a,c){return new uw(r,i,s,a,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>Mu(this.syncEngine,t,0)),(function(){return ku.v()?new ku:new ZT})())}createSyncEngine(e,t){return(function(i,s,a,c,u,d,f){const y=new Rw(i,s,a,c,u,d);return f&&(y.gu=!0),y})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(i){const s=ee(i);x(Er,"RemoteStore shutting down."),s.Ea.add(5),await Oi(s),s.Aa.shutdown(),s.Va.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}ma.provider={build:()=>new ma};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mw{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):jt("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gn="FirestoreClient";class Fw{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=i,this.user=qe.UNAUTHENTICATED,this.clientId=pd.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,(async a=>{x(gn,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(x(gn,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new sr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=lf(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Uo(n,e){n.asyncQueue.verifyOperationInProgress(),x(gn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async i=>{r.isEqual(i)||(await nf(e.localStore,i),r=i)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function Uu(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Uw(n);x(gn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>Vu(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,i)=>Vu(e.remoteStore,i))),n._onlineComponents=e}async function Uw(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){x(gn,"Using user provided OfflineComponentProvider");try{await Uo(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(i){return i.name==="FirebaseError"?i.code===D.FAILED_PRECONDITION||i.code===D.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(t))throw t;Bn("Error using user provided cache. Falling back to memory cache: "+t),await Uo(n,new Ms)}}else x(gn,"Using default OfflineComponentProvider"),await Uo(n,new Lw(void 0));return n._offlineComponents}async function jw(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(x(gn,"Using user provided OnlineComponentProvider"),await Uu(n,n._uninitializedComponentsProvider._online)):(x(gn,"Using default OnlineComponentProvider"),await Uu(n,new ma))),n._onlineComponents}async function ju(n){const e=await jw(n),t=e.eventManager;return t.onListen=Sw.bind(null,e.syncEngine),t.onUnlisten=kw.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Pw.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Dw.bind(null,e.syncEngine),t}function Bw(n,e,t,r){const i=new Mw(r),s=new ww(e,i,t);return n.asyncQueue.enqueueAndForget((async()=>yw(await ju(n),s))),()=>{i.Nu(),n.asyncQueue.enqueueAndForget((async()=>vw(await ju(n),s)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _f(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $w="ComponentProvider",Bu=new Map;function qw(n,e,t,r,i){return new bE(n,e,t,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,_f(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yf="firestore.googleapis.com",$u=!0;class qu{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new M(D.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=yf,this.ssl=$u}else this.host=e.host,this.ssl=e.ssl??$u;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=ef;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<ST)throw new M(D.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}fE("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=_f(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new M(D.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new M(D.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new M(D.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,i){return r.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class hc{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new qu({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new M(D.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new M(D.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new qu(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new rE;switch(r.type){case"firstParty":return new aE(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new M(D.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=Bu.get(t);r&&(x($w,"Removing Datastore"),Bu.delete(t),r.terminate())})(this),Promise.resolve()}}function Hw(n,e,t,r={}){var d;n=ps(n,hc);const i=qn(e),s=n._getSettings(),a={...s,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;i&&(ka(`https://${c}`),Da("Firestore",!0)),s.host!==yf&&s.host!==c&&Bn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...s,host:c,ssl:i,emulatorOptions:r};if(!Mn(u,a)&&(n._setSettings(u),r.mockUserToken)){let f,y;if(typeof r.mockUserToken=="string")f=r.mockUserToken,y=qe.MOCK_USER;else{f=pg(r.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const w=r.mockUserToken.sub||r.mockUserToken.user_id;if(!w)throw new M(D.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");y=new qe(w)}n._authCredentials=new iE(new fd(f,y))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Bt(this.firestore,e,this._query)}}class We{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new lr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new We(this.firestore,e,this._key)}toJSON(){return{type:We._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Ci(t,We._jsonSchema))return new We(e,r||null,new H(he.fromString(t.referencePath)))}}We._jsonSchemaVersion="firestore/documentReference/1.0",We._jsonSchema={type:Ce("string",We._jsonSchemaVersion),referencePath:Ce("string")};class lr extends Bt{constructor(e,t,r){super(e,t,Ka(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new We(this.firestore,null,new H(e))}withConverter(e){return new lr(this.firestore,e,this._path)}}function GI(n,e,...t){if(n=ke(n),n instanceof hc){const r=he.fromString(e,...t);return eu(r),new lr(n,null,r)}{if(!(n instanceof We||n instanceof lr))throw new M(D.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(he.fromString(e,...t));return eu(r),new lr(n.firestore,null,r)}}function KI(n,e){return n=ke(n),e=ke(e),n instanceof Bt&&e instanceof Bt&&n.firestore===e.firestore&&ki(n._query,e._query)&&n.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hu="AsyncQueue";class zu{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new sf(this,"async_queue_retry"),this._c=()=>{const r=Fo();r&&x(Hu,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=Fo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Fo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new sr;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Sr(e))throw e;x(Hu,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((r=>{throw this.nc=r,this.rc=!1,jt("INTERNAL UNHANDLED ERROR: ",Wu(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const i=ac.createAndSchedule(this,e,t,r,(s=>this.hc(s)));return this.tc.push(i),i}uc(){this.nc&&G(47125,{Pc:Wu(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Wu(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class ga extends hc{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new zu,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new zu(e),this._firestoreClient=void 0,await e}}}function zw(n,e){const t=typeof n=="object"?n:Na(),r=typeof n=="string"?n:Ds,i=Hs(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=vh("firestore");s&&Hw(i,...s)}return i}function Ww(n){if(n._terminated)throw new M(D.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Gw(n),n._firestoreClient}function Gw(n){var r,i,s,a;const e=n._freezeSettings(),t=qw(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(i=n._app)==null?void 0:i.options.apiKey,e);n._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((a=e.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Fw(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(u){const d=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(d),_online:d}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ut(Be.fromBase64String(e))}catch(t){throw new M(D.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ut(Be.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:ut._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Ci(e,ut._jsonSchema))return ut.fromBase64String(e.bytes)}}ut._jsonSchemaVersion="firestore/bytes/1.0",ut._jsonSchema={type:Ce("string",ut._jsonSchemaVersion),bytes:Ce("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vf{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new M(D.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ze(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new M(D.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new M(D.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return X(this._lat,e._lat)||X(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ct._jsonSchemaVersion}}static fromJSON(e){if(Ci(e,Ct._jsonSchema))return new Ct(e.latitude,e.longitude)}}Ct._jsonSchemaVersion="firestore/geoPoint/1.0",Ct._jsonSchema={type:Ce("string",Ct._jsonSchemaVersion),latitude:Ce("number"),longitude:Ce("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0})(this._values,e._values)}toJSON(){return{type:gt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Ci(e,gt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new gt(e.vectorValues);throw new M(D.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}gt._jsonSchemaVersion="firestore/vectorValue/1.0",gt._jsonSchema={type:Ce("string",gt._jsonSchemaVersion),vectorValues:Ce("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kw=/^__.*__$/;function Tf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw G(40011,{dataSource:n})}}class dc{constructor(e,t,r,i,s,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.validatePath(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new dc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var i;const t=(i=this.path)==null?void 0:i.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){var i;const t=(i=this.path)==null?void 0:i.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Fs(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(Tf(this.dataSource)&&Kw.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class Qw{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||io(e)}createContext(e,t,r,i=!1){return new dc({dataSource:e,methodName:t,targetDoc:r,path:ze.emptyPath(),arrayElement:!1,hasConverter:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Yw(n){const e=n._freezeSettings(),t=io(n._databaseId);return new Qw(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Jw(n,e,t,r=!1){return fc(t,n.createContext(r?4:3,e))}function fc(n,e){if(wf(n=ke(n)))return Zw("Unsupported field value:",e,n),Xw(n,e);if(n instanceof Ef)return(function(r,i){if(!Tf(i.dataSource))throw i.createError(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(r,i){const s=[];let a=0;for(const c of r){let u=fc(c,i.childContextForArray(a));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),a++}return{arrayValue:{values:s}}})(n,e)}return(function(r,i){if((r=ke(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return JE(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=de.fromDate(r);return{timestampValue:la(i.serializer,s)}}if(r instanceof de){const s=new de(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:la(i.serializer,s)}}if(r instanceof Ct)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ut)return{bytesValue:zd(i.serializer,r._byteString)};if(r instanceof We){const s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.createError(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Wd(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof gt)return(function(a,c){const u=a instanceof gt?a.toArray():a;return{mapValue:{fields:{[Id]:{stringValue:Ad},[Os]:{arrayValue:{values:u.map((f=>{if(typeof f!="number")throw c.createError("VectorValues must only contain numeric values.");return Qa(c.serializer,f)}))}}}}}})(r,i);if(Zd(r))return r._toProto(i.serializer);throw i.createError(`Unsupported field value: ${Qs(r)}`)})(n,e)}function Xw(n,e){const t={};return _d(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Pr(n,((r,i)=>{const s=fc(i,e.childContextForField(r));s!=null&&(t[r]=s)})),{mapValue:{fields:t}}}function wf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof de||n instanceof Ct||n instanceof ut||n instanceof We||n instanceof Ef||n instanceof gt||Zd(n))}function Zw(n,e,t){if(!wf(t)||!md(t)){const r=Qs(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function pc(n,e,t){if((e=ke(e))instanceof vf)return e._internalPath;if(typeof e=="string")return tI(n,e);throw Fs("Field path arguments must be of type string or ",n,!1,void 0,t)}const eI=new RegExp("[~\\*/\\[\\]]");function tI(n,e,t){if(e.search(eI)>=0)throw Fs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new vf(...e.split("."))._internalPath}catch{throw Fs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Fs(n,e,t,r,i){const s=r&&!r.isEmpty(),a=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(s||a)&&(u+=" (found",s&&(u+=` in field ${r}`),a&&(u+=` in document ${i}`),u+=")"),new M(D.INVALID_ARGUMENT,c+n+u)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nI{convertValue(e,t="none"){switch(pn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ie(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(fn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw G(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Pr(e,((i,s)=>{r[i]=this.convertValue(s,t)})),r}convertVectorValue(e){var r,i,s;const t=(s=(i=(r=e.fields)==null?void 0:r[Os].arrayValue)==null?void 0:i.values)==null?void 0:s.map((a=>Ie(a.doubleValue)));return new gt(t)}convertGeoPoint(e){return new Ct(Ie(e.latitude),Ie(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Zs(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(_i(e));default:return null}}convertTimestamp(e){const t=dn(e);return new de(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=he.fromString(e);ge(Xd(r),9688,{name:e});const i=new yi(r.get(1),r.get(3)),s=new H(r.popFirst(5));return i.isEqual(t)||jt(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If extends nI{constructor(e){super(),this.firestore=e}convertBytes(e){return new ut(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new We(this.firestore,null,t)}}const Gu="@firebase/firestore",Ku="4.11.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qu(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1})(n,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Af{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new We(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new rI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(pc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class rI extends Af{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iI(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new M(D.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class mc{}class bf extends mc{}function QI(n,e,...t){let r=[];e instanceof mc&&r.push(e),r=r.concat(t),(function(s){const a=s.filter((u=>u instanceof _c)).length,c=s.filter((u=>u instanceof gc)).length;if(a>1||a>0&&c>0)throw new M(D.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const i of r)n=i._apply(n);return n}class gc extends bf{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new gc(e,t,r)}_apply(e){const t=this._parse(e);return Rf(e._query,t),new Bt(e.firestore,e.converter,ia(e._query,t))}_parse(e){const t=Yw(e.firestore);return(function(s,a,c,u,d,f,y){let w;if(d.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new M(D.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Ju(y,f);const P=[];for(const k of y)P.push(Yu(u,s,k));w={arrayValue:{values:P}}}else w=Yu(u,s,y)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Ju(y,f),w=Jw(c,a,y,f==="in"||f==="not-in");return Pe.create(d,f,w)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class _c extends mc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new _c(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:yt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(i,s){let a=i;const c=s.getFlattenedFilters();for(const u of c)Rf(a,u),a=ia(a,u)})(e._query,t),new Bt(e.firestore,e.converter,ia(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class yc extends bf{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new yc(e,t)}_apply(e){const t=(function(i,s,a){if(i.startAt!==null)throw new M(D.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new M(D.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ei(s,a)})(e._query,this._field,this._direction);return new Bt(e.firestore,e.converter,qE(e._query,t))}}function YI(n,e="asc"){const t=e,r=pc("orderBy",n);return yc._create(r,t)}function Yu(n,e,t){if(typeof(t=ke(t))=="string"){if(t==="")throw new M(D.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Dd(e)&&t.indexOf("/")!==-1)throw new M(D.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(he.fromString(t));if(!H.isDocumentKey(r))throw new M(D.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return cu(n,new H(r))}if(t instanceof We)return cu(n,t._key);throw new M(D.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Qs(t)}.`)}function Ju(n,e){if(!Array.isArray(n)||n.length===0)throw new M(D.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Rf(n,e){const t=(function(i,s){for(const a of i)for(const c of a.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new M(D.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new M(D.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class ei{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class xn extends Af{constructor(e,t,r,i,s,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ys(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(pc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new M(D.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=xn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}xn._jsonSchemaVersion="firestore/documentSnapshot/1.0",xn._jsonSchema={type:Ce("string",xn._jsonSchemaVersion),bundleSource:Ce("string","DocumentSnapshot"),bundleName:Ce("string"),bundle:Ce("string")};class ys extends xn{data(e={}){return super.data(e)}}class ur{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new ei(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new ys(this._firestore,this._userDataWriter,r.key,r,new ei(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new M(D.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map((c=>{const u=new ys(i._firestore,i._userDataWriter,c.doc.key,c.doc,new ei(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}}))}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((c=>s||c.type!==3)).map((c=>{const u=new ys(i._firestore,i._userDataWriter,c.doc.key,c.doc,new ei(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,f=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:sI(c.type),doc:u,oldIndex:d,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new M(D.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=ur._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=pd.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],i=[];return this.docs.forEach((s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function sI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return G(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ur._jsonSchemaVersion="firestore/querySnapshot/1.0",ur._jsonSchema={type:Ce("string",ur._jsonSchemaVersion),bundleSource:Ce("string","QuerySnapshot"),bundleName:Ce("string"),bundle:Ce("string")};function JI(n,...e){var d,f,y;n=ke(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||Qu(e[r])||(t=e[r++]);const i={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Qu(e[r])){const w=e[r];e[r]=(d=w.next)==null?void 0:d.bind(w),e[r+1]=(f=w.error)==null?void 0:f.bind(w),e[r+2]=(y=w.complete)==null?void 0:y.bind(w)}let s,a,c;if(n instanceof We)a=ps(n.firestore,ga),c=Ka(n._key.path),s={next:w=>{e[r]&&e[r](oI(a,n,w))},error:e[r+1],complete:e[r+2]};else{const w=ps(n,Bt);a=ps(w.firestore,ga),c=w._query;const b=new If(a);s={next:P=>{e[r]&&e[r](new ur(a,b,w,P))},error:e[r+1],complete:e[r+2]},iI(n._query)}const u=Ww(a);return Bw(u,c,i,s)}function oI(n,e,t){const r=t.docs.get(e._key),i=new If(n);return new xn(n,i,e._key,r,new ei(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){nE(Ir),Fn(new un("firestore",((r,{instanceIdentifier:i,options:s})=>{const a=r.getProvider("app").getImmediate(),c=new ga(new sE(r.getProvider("auth-internal")),new cE(a,r.getProvider("app-check-internal")),RE(a,i),a);return s={useFetchStreams:t,...s},c._setSettings(s),c}),"PUBLIC").setMultipleInstances(!0)),bt(Gu,Ku,e),bt(Gu,Ku,"esm2020")})();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sf="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aI{constructor(e,t,r,i){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,lt(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(s=>this.auth=s,()=>{}),this.messaging||r.get().then(s=>this.messaging=s,()=>{}),this.appCheck||i==null||i.get().then(s=>this.appCheck=s,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e==null?void 0:e.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),i=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:i}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _a="us-central1";class cI{constructor(e,t,r,i,s=_a,a=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=a,this.emulatorOrigin=null,this.contextProvider=new aI(e,t,r,i),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(s);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=_a}catch{this.customDomain=null,this.region=s}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function lI(n,e,t){const r=qn(e);n.emulatorOrigin=`http${r?"s":""}://${e}:${t}`,r&&(ka(n.emulatorOrigin+"/backends"),Da("Functions",!0))}const Xu="@firebase/functions",Zu="0.13.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uI="auth-internal",hI="app-check-internal",dI="messaging-internal";function fI(n){const e=(t,{instanceIdentifier:r})=>{const i=t.getProvider("app").getImmediate(),s=t.getProvider(uI),a=t.getProvider(dI),c=t.getProvider(hI);return new cI(i,s,a,c,r)};Fn(new un(Sf,e,"PUBLIC").setMultipleInstances(!0)),bt(Xu,Zu,n),bt(Xu,Zu,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pI(n=Na(),e=_a){const r=Hs(ke(n),Sf).getImmediate({identifier:e}),i=vh("functions");return i&&mI(r,...i),r}function mI(n,e,t){lI(ke(n),e,t)}fI();const gI={apiKey:"AIzaSyCKPAcATM0DB_-XLjvppvD831HZfWIxrNk",authDomain:"revive-hogar.firebaseapp.com",projectId:"revive-hogar",storageBucket:"revive-hogar.firebasestorage.app",messagingSenderId:"416614703495",appId:"1:416614703495:web:a779be5cd3a55a13e73322"},vc=Ah(gI),Pf=Xv(vc),XI=zw(vc);pI(vc,"southamerica-west1");const _I=gp(!1);function Cf(){const[n,e]=_p(_I),t=q.useCallback(()=>e(s=>!s),[e]),r=q.useCallback(()=>e(!1),[e]),i=q.useCallback(()=>e(!0),[e]);return{isOpen:n,toggle:t,close:r,open:i}}function yI(){const{themeMode:n,toggle:e}=yp(),{open:t}=Cf(),r=Zf();async function i(){await By(Pf),r("/admin/login")}return V.jsx(ap,{position:"static",color:"primary",elevation:2,"data-pw":`theme-${n}`,enableColorOnDark:!0,children:V.jsx(cp,{children:V.jsxs(wo,{direction:"row",justifyContent:"space-between",alignItems:"center",flex:1,children:[V.jsxs(wo,{direction:"row",gap:1,alignItems:"center",children:[V.jsx(Io,{size:"large",edge:"start",color:"inherit","aria-label":"menu",onClick:t,children:V.jsx(lp,{})}),V.jsx(ep,{variant:"h6",color:"inherit",noWrap:!0,children:"Revive Hogar - Admin"})]}),V.jsxs(wo,{direction:"row",alignItems:"center",children:[V.jsx(yl,{title:"Cambiar tema",arrow:!0,children:V.jsx(Io,{color:"inherit",size:"large",onClick:e,"data-pw":"theme-toggle",children:V.jsx(ig,{})})}),V.jsx(qo,{orientation:"vertical",flexItem:!0,sx:{mx:1,borderColor:"rgba(255,255,255,0.3)"}}),V.jsx(yl,{title:"Cerrar sesion",arrow:!0,children:V.jsx(Io,{color:"inherit",edge:"end",size:"large",onClick:i,children:V.jsx(rg,{})})})]})]})})})}const vI=Ti([V.jsx("path",{d:"M12 3v18c4.97 0 9-4.03 9-9s-4.03-9-9-9"},"0"),V.jsx("circle",{cx:"6",cy:"14",r:"1"},"1"),V.jsx("circle",{cx:"6",cy:"18",r:"1"},"2"),V.jsx("circle",{cx:"6",cy:"10",r:"1"},"3"),V.jsx("circle",{cx:"3",cy:"10",r:".5"},"4"),V.jsx("circle",{cx:"6",cy:"6",r:"1"},"5"),V.jsx("circle",{cx:"3",cy:"14",r:".5"},"6"),V.jsx("circle",{cx:"10",cy:"21",r:".5"},"7"),V.jsx("circle",{cx:"10",cy:"3",r:".5"},"8"),V.jsx("circle",{cx:"10",cy:"6",r:"1"},"9"),V.jsx("circle",{cx:"10",cy:"14",r:"1.5"},"10"),V.jsx("circle",{cx:"10",cy:"10",r:"1.5"},"11"),V.jsx("circle",{cx:"10",cy:"18",r:"1"},"12")],"Deblur"),EI=Ti(V.jsx("path",{d:"M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2m0 14H4v-6h16zm0-10H4V6h16z"}),"Payment"),TI=Ti(V.jsx("path",{d:"M5 20h14v-2H5zm0-10h4v6h6v-6h4l-7-7z"}),"Upload"),wI=[{path:"/admin/pagos",title:"Pagos",icon:EI},{path:"/admin/importar",title:"Importar",icon:TI}];function II(){const{isOpen:n,open:e,close:t}=Cf(),r=th();return V.jsx(ng,{anchor:"left",open:n,onClose:t,onOpen:e,disableBackdropTransition:!1,swipeAreaWidth:30,"data-pw":"sidebar",children:V.jsx(up,{sx:{width:250,pt:i=>`${i.mixins.toolbar.minHeight}px`},children:wI.map(({path:i,title:s,icon:a})=>V.jsx(hp,{sx:{p:0},onClick:t,children:V.jsxs(dp,{component:tp,to:i,selected:r.pathname===i,children:[V.jsx(fp,{children:a?V.jsx(a,{}):V.jsx(vI,{})}),V.jsx(pp,{children:s})]})},i))})})}function AI(){return V.jsxs(q.Fragment,{children:[V.jsx(yI,{}),V.jsx(II,{}),V.jsx(np,{component:"main",sx:{height:n=>`calc(100vh - ${Number(n.mixins.toolbar.minHeight)+parseInt(n.spacing(1))}px)`,overflow:"auto"},children:V.jsx(nh,{})})]})}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function bI(n,e,t,r){function i(s){return s instanceof t?s:new t(function(a){a(s)})}return new(t||(t=Promise))(function(s,a){function c(f){try{d(r.next(f))}catch(y){a(y)}}function u(f){try{d(r.throw(f))}catch(y){a(y)}}function d(f){f.done?s(f.value):i(f.value).then(c,u)}d((r=r.apply(n,[])).next())})}function RI(n,e){var t={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},r,i,s,a;return a={next:c(0),throw:c(1),return:c(2)},typeof Symbol=="function"&&(a[Symbol.iterator]=function(){return this}),a;function c(d){return function(f){return u([d,f])}}function u(d){if(r)throw new TypeError("Generator is already executing.");for(;t;)try{if(r=1,i&&(s=d[0]&2?i.return:d[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,d[1])).done)return s;switch(i=0,s&&(d=[d[0]&2,s.value]),d[0]){case 0:case 1:s=d;break;case 4:return t.label++,{value:d[1],done:!1};case 5:t.label++,i=d[1],d=[0];continue;case 7:d=t.ops.pop(),t.trys.pop();continue;default:if(s=t.trys,!(s=s.length>0&&s[s.length-1])&&(d[0]===6||d[0]===2)){t=0;continue}if(d[0]===3&&(!s||d[1]>s[0]&&d[1]<s[3])){t.label=d[1];break}if(d[0]===6&&t.label<s[1]){t.label=s[1],s=d;break}if(s&&t.label<s[2]){t.label=s[2],t.ops.push(d);break}s[2]&&t.ops.pop(),t.trys.pop();continue}d=e.call(n,t)}catch(f){d=[6,f],i=0}finally{r=s=0}if(d[0]&5)throw d[1];return{value:d[0]?d[1]:void 0,done:!0}}}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var tr=function(){return tr=Object.assign||function(e){for(var t,r=1,i=arguments.length;r<i;r++){t=arguments[r];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s])}return e},tr.apply(this,arguments)},kf=function(n){return{loading:n==null,value:n}},SI=function(){return function(n,e){switch(e.type){case"error":return tr(tr({},n),{error:e.error,loading:!1,value:void 0});case"reset":return kf(e.defaultValue);case"value":return tr(tr({},n),{error:void 0,loading:!1,value:e.value});default:return n}}},PI=(function(n){var e=n?n():void 0,t=q.useReducer(SI(),kf(e)),r=t[0],i=t[1],s=q.useCallback(function(){var u=n?n():void 0;i({type:"reset",defaultValue:u})},[n]),a=q.useCallback(function(u){i({type:"error",error:u})},[]),c=q.useCallback(function(u){i({type:"value",value:u})},[]);return q.useMemo(function(){return{error:r.error,loading:r.loading,reset:s,setError:a,setValue:c,value:r.value}},[r.error,r.loading,s,a,c,r.value])}),CI=(function(n,e){var t=PI(function(){return n.currentUser}),r=t.error,i=t.loading,s=t.setError,a=t.setValue,c=t.value;return q.useEffect(function(){var u=jy(n,function(d){return bI(void 0,void 0,void 0,function(){var f;return RI(this,function(y){switch(y.label){case 0:return[3,4];case 1:return y.trys.push([1,3,,4]),[4,e.onUserChanged(d)];case 2:return y.sent(),[3,4];case 3:return f=y.sent(),s(f),[3,4];case 4:return a(d),[2]}})})},s);return function(){u()}},[n]),[c,i,r]});function kI(){const[n,e,t]=CI(Pf);return{user:n,loading:e,error:t,isAuthenticated:!!n}}function DI(){const{user:n,loading:e}=kI(),t=th();return e?V.jsx(rp,{}):n?V.jsx(nh,{}):V.jsx(rh,{to:"/admin/login",state:{from:t},replace:!0})}const OI=Bs(()=>Us(()=>import("./index-RxLXDU8I.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]))),VI=Bs(()=>Us(()=>import("./index-CE7nx1B5.js"),__vite__mapDeps([12,1,13,8,2,3,4,9,10,11,5,7]))),NI=Bs(()=>Us(()=>import("./index-CRPbhER0.js"),__vite__mapDeps([14,1,5,2,3,4,7,8,10,11]))),xI=Bs(()=>Us(()=>import("./index-Ck2kLHbl.js"),__vite__mapDeps([15,1,2,3,4])));function LI(){return V.jsxs(ip,{children:[V.jsx(kn,{path:"login",element:V.jsx(OI,{})}),V.jsx(kn,{element:V.jsx(DI,{}),children:V.jsxs(kn,{element:V.jsx(AI,{}),children:[V.jsx(kn,{index:!0,element:V.jsx(rh,{to:"pagos",replace:!0})}),V.jsx(kn,{path:"pagos",element:V.jsx(VI,{})}),V.jsx(kn,{path:"importar",element:V.jsx(NI,{})})]})}),V.jsx(kn,{path:"*",element:V.jsx(xI,{})})]})}const ZI=Object.freeze(Object.defineProperty({__proto__:null,default:LI},Symbol.toStringTag,{value:"Module"}));export{ZI as A,qo as D,yl as T,TI as U,Pf as a,QI as b,YI as c,qI as d,GI as e,XI as f,HI as g,Ap as h,JI as o,KI as q,zI as s,bp as u};
