(this["webpackJsonpbullet-time"]=this["webpackJsonpbullet-time"]||[]).push([[0],{67:function(e,t,a){e.exports=a.p+"static/media/header.7b6f2411.jpg"},81:function(e,t,a){e.exports=a(92)},89:function(e,t,a){},91:function(e,t,a){},92:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(9),l=a.n(i),c=a(41),u=a(42),o=a(51),s=a(52),m=a(70),d=a(144),h=a(130),f=a(28);function g(e){var t=Object(n.useRef)(null),a=Object(n.useState)(0),i=Object(f.a)(a,2),l=i[0],c=i[1];return Object(n.useEffect)((function(){c(t.current?t.current.offsetWidth:0)})),Object(n.useEffect)((function(){e.handleWidthChange(e.index,l)}),[l,e.value]),r.a.createElement("div",{ref:t,className:"bullet-tester"},e.value)}function b(e){return r.a.createElement("div",{className:"guide",style:{left:e.position+"px"}})}function E(e){return r.a.createElement("textarea",{className:"bullet-area ".concat(e.disabled?"disabled":""),value:e.bullets.join("\n"),placeholder:"Write your bullets here...",rows:"10",onChange:function(t){return e.onChange(t)},autofocus:"true"})}var p=a(93);function v(e){return r.a.createElement(p.a,{elevation:6},r.a.createElement("div",{className:"guided-bullet-area"},r.a.createElement(E,{bullets:e.bullets,disabled:e.disabled,onChange:function(t){return e.onChange(t)}}),r.a.createElement(b,{position:e.guide})))}var y=a(129),j=a(136),w=a(137),C=a(33),k=a(138),O=a(139),x=a(140),S=a(148),z=a(131),N=a(145),T=a(134),B=a(132),G=a(135),I=Object(y.a)((function(e){return{root:{margin:e.spacing(1)}}}));function W(e){var t=I(),a=r.a.useState({trim:0}),n=Object(f.a)(a,2),i=n[0],l=n[1],c=function(t){return function(a){var n=i.trim;if("string"===typeof t)"left"===t?n--:"right"===t&&n++,l({trim:n}),e.onTrim(n);else{var r=a.target.value;/^-?[0-9]*$/.test(r)&&(l({trim:r}),isNaN(r)?e.onTrim(0):e.onTrim(parseInt(r,10)))}}};return r.a.createElement(h.a,{container:!0,alignItems:"center",className:t.root},r.a.createElement(h.a,{item:!0},r.a.createElement(z.a,{color:"secondary",onClick:c("left")},r.a.createElement(B.a,{color:"primary"}))),r.a.createElement(h.a,{item:!0},r.a.createElement(N.a,{style:{width:80},value:i.trim,size:"small",label:"Trim",variant:"outlined",color:"secondary",onChange:c(),onBlur:function(e){return""===e.target.value||"-"===e.target.value?l({trim:0}):0},InputProps:{endAdornment:r.a.createElement(T.a,{position:"end"},"px")}})),r.a.createElement(h.a,{item:!0},r.a.createElement(z.a,{color:"secondary",onClick:c("right")},r.a.createElement(G.a,{color:"primary"}))))}var D=Object(y.a)((function(e){return{root:{margin:e.spacing(1)},title:{flexGrow:1}}}));function _(e){var t=D();return r.a.createElement(p.a,{elevation:6},r.a.createElement(j.a,{position:"static"},r.a.createElement(w.a,{variant:"dense"},r.a.createElement(C.a,{variant:"h6",className:t.title},"Spacing Menu"))),r.a.createElement(k.a,null,r.a.createElement(W,{onTrim:function(t){return e.onTrim(t)}}),r.a.createElement(O.a,null),r.a.createElement(x.a,{control:r.a.createElement(S.a,{checked:e.checked,onChange:function(){return e.onGraberize()}}),label:"Graberize"})))}a(89);var A=function(e){Object(s.a)(a,e);var t=Object(o.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={bullets:[],widths:[],graberized:!1,guide:763,trim:0},n}return Object(u.a)(a,[{key:"handleBulletChange",value:function(e){if(!this.state.graberized){var t=this.state.bullets;t=e.target.value.split("\n"),this.setState({bullets:t})}}},{key:"handleAutoSpace",value:function(){var e=this,t=this.state.bullets;t.forEach((function(a,n){e.state.graberized?t[n]=a.replace(/[\u2004\u2006\u2007\u2009]/g," "):(console.log("trigger width",e.state.widths[n]),t[n]=e.graberSpace(n,e.state.widths[n]))}),this),this.setState({bullets:t,graberized:!this.state.graberized})}},{key:"handleWidthChange",value:function(e,t){var a=this.state.guide,n=this.state.widths;if(n[e]=t,this.setState({widths:n}),this.state.graberized&&(t<a-6||t>a-1)){var r=this.state.bullets;r[e]=this.graberSpace(e,t),this.setState({bullets:r})}}},{key:"handleGuideChange",value:function(e){this.setState({guide:763+e})}},{key:"graberSpace",value:function(e,t){for(var a=function(e){switch(e){case"\u2004":case"\u2006":case"\u2007":case"\u2009":case" ":return!0;default:return!1}},n=["\u2006","\u2009"," ","\u2004","\u2007"],r=this.state.guide,i=this.state.bullets[e],l=[],c=[],u=i.split(""),o=u.findIndex(a);-1!==o;){l.push(o),c.push(n.findIndex((function(e){return e===u[o]})));var s=u.slice(o+1).findIndex(a);o=-1!==s?s+o+1:s}return t>r-1?c=function(e){var t=e,a=e.slice(1).reduce((function(e,t,a,n){return t>n[e]?a:e}),0)+1;return t[a]--,t[a]<0&&(t[a]=0),t}(c):t<r-1&&(c=function(e){var t=e,a=e.slice(1).reduce((function(e,t,a,n){return t<n[e]?a:e}),0)+1;return t[a]++,t[a]>4&&(t[a]=4),t}(c)),console.log(c),console.log(t),l.forEach((function(e,t){u[e]=n[c[t]]})),u.join("")}},{key:"createBulletTesters",value:function(){var e=[];return this.state.bullets.forEach((function(t,a){var n=this;e.push(r.a.createElement(g,{value:t,index:a,handleWidthChange:function(e,t){return n.handleWidthChange(e,t)}}))}),this),e}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(h.a,{container:!0,spacing:1},r.a.createElement(h.a,{item:!0,xs:!0},r.a.createElement(v,{bullets:this.state.bullets,guide:this.state.guide,disabled:this.state.graberized,onChange:function(t){return e.handleBulletChange(t)}})),r.a.createElement(h.a,{item:!0},r.a.createElement(_,{checked:this.state.graberized,onGraberize:function(){return e.handleAutoSpace()},onTrim:function(t){return e.handleGuideChange(t)}}))),this.createBulletTesters())}}]),a}(r.a.Component),J=a(71),R=a(67),F=a.n(R),H=a(69),K=a.n(H),M=(a(3),a(147)),P=a(133),V=a(141),$=a(142),q=a(143),L=a(68),Q=a.n(L),U=Object(y.a)({list:{width:250}});function X(e){var t=U();return r.a.createElement("div",null,r.a.createElement(M.a,{open:e.open,onClose:e.toggleDrawer(!1)},r.a.createElement("div",{className:t.list,role:"presentation",onClick:e.toggleDrawer(!1),onKeyDown:e.toggleDrawer(!1)},r.a.createElement(P.a,null,r.a.createElement(V.a,{button:!0,component:"a",href:"https://github.com/smpentecost/BulletTime/tree/master",target:"_blank"},r.a.createElement($.a,null,r.a.createElement(Q.a,null)),r.a.createElement(q.a,{primary:"View Source"}))))))}var Y=Object(y.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));function Z(){var e=Y(),t=r.a.useState({open_drawer:!1}),a=Object(f.a)(t,2),n=a[0],i=a[1],l=function(e){return function(t){("keydown"!==t.type||"Tab"!==t.key&&"Shift"!==t.key)&&i(Object(J.a)({},n,{open_drawer:e}))}};return r.a.createElement("div",{className:e.root},r.a.createElement(j.a,{position:"static"},r.a.createElement("img",{src:F.a,style:{objectFit:"cover",maxHeight:"40px"}}),r.a.createElement(w.a,null,r.a.createElement(z.a,{edge:"start",className:e.menuButton,color:"inherit","aria-label":"menu"},r.a.createElement(K.a,{onClick:l(!0)})),r.a.createElement(C.a,{variant:"h6",className:e.title},"Bullet Time"))),r.a.createElement(X,{toggleDrawer:function(){return l()},open:n.open_drawer}))}a(91);var ee=Object(m.a)({palette:{primary:{main:"#0d0811"},secondary:{main:"#08ff11"}}}),te=function(e){Object(s.a)(a,e);var t=Object(o.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement(d.a,{theme:ee},r.a.createElement(h.a,{container:!0,direction:"column",spacing:1},r.a.createElement(h.a,{item:!0},r.a.createElement(Z,null)),r.a.createElement(h.a,{item:!0},r.a.createElement(A,null))))}}]),a}(r.a.Component);l.a.render(r.a.createElement(te,null),document.getElementById("root"))}},[[81,1,2]]]);
//# sourceMappingURL=main.2a4f0a5a.chunk.js.map