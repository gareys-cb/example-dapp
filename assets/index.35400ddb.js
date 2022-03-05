import{b as S,p as y,u as A,W as h,C as P,a as k,r,j as b,R as E,c as I}from"./vendor.2e00e048.js";const N=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}};N();window.Buffer=S.Buffer;window.process=y;window.util=A;var M="./assets/padlock.3a1fe527.png",O="./assets/padlock_open.c4541ffd.png";const C="YOUR_INFURA_PROJECT_ID",W="Sesame",_="https://gareys-cb.github.io/sesame/assets/padlock.png",R=`https://mainnet.infura.io/v3/${C}`,U=1,D=()=>new P({appName:W,appLogoUrl:_,darkMode:!1,overrideIsMetaMask:!1}).makeWeb3Provider(R,U),F=async()=>{const t=D(),n=new h(t),e=await t.request({method:"eth_requestAccounts"});return{provider:t,web3:n,accounts:e}},T=()=>{var t,n,e;return(e=(n=(t=window.ethereum)==null?void 0:t.providers)==null?void 0:n.find(i=>!!i.isMetaMask))!=null?e:window.ethereum},j=async()=>{const t=T();if(!t||!t.isMetaMask||!window.ethereum)throw window.open("https://metamask.io/download.html","_blank"),new Error("NO METAMASK WALLET FOUND!");const n=new h(t),e=await t.request({method:"eth_requestAccounts"});return{provider:t,web3:n,accounts:e}},q=()=>new k({infuraId:C}),B=async()=>new Promise(async(t,n)=>{const e=q(),i=new h(e);let o=!0;const s=()=>o,c=()=>{s()&&n()};e.connector.on("disconnect",c);try{const u=await e.enable();o=!1,t({provider:e,web3:i,accounts:u})}catch{n()}}),K=async t=>{switch(t){case"coinbase":return F();case"metamask":return j();case"walletconnect":return B();default:if(!window.ethereum)throw new Error("NO WALLET FOUND!");return{provider:window.ethereum,web3:new h(window.ethereum),accounts:[]}}},f="web3-provider",G=()=>{const[t,n]=r.exports.useState(),[e,i]=r.exports.useState(),[o,s]=r.exports.useState(),[c,u]=r.exports.useState(window.localStorage.getItem(f)),l=r.exports.useCallback(()=>{localStorage.removeItem(f),i(void 0),n(void 0),s(void 0)},[e]),m=r.exports.useCallback(async d=>{try{const{provider:w,web3:x,accounts:L}=await K(d);localStorage.setItem(f,d),i(w),n(x),s(L[0])}catch{console.warn("FAILED TO SIGN IN!"),l()}},[l]);return r.exports.useEffect(()=>{u(window.localStorage.getItem(f))},[e]),r.exports.useEffect(()=>{const d=w=>{if(!w.length){l();return}s(w[0])};return e==null||e.on("accountsChanged",d),()=>{e==null||e.removeListener("accountsChanged",d)}},[e,l]),r.exports.useEffect(()=>{const d=()=>{l()};return e==null||e.on("disconnect",d),()=>{e==null||e.removeListener("disconnect",d)}},[e,l]),r.exports.useEffect(()=>{if(c!=="coinbase"){removeEventListener("beforeunload",g);return}return addEventListener("beforeunload",g),()=>{removeEventListener("beforeunload",g)}},[c]),r.exports.useEffect(()=>{c&&m(c).catch(l)},[]),{providerString:c,connectProvider:m,changeProvider:l,account:o,web3:t}},g=()=>{localStorage.getItem("-walletlink:https://www.walletlink.org:version")||localStorage.removeItem(f)},a=b.exports.jsx,p=b.exports.jsxs,v=r.exports.memo(({providerString:t,handleConnect:n,text:e})=>a("button",{type:"button",onClick:()=>n(t),children:e})),J=r.exports.memo(({handleConnect:t})=>p("div",{className:"content",children:[a("p",{children:"Connect your wallet"}),a(v,{providerString:"coinbase",handleConnect:t,text:"Coinbase Wallet"}),a(v,{providerString:"metamask",handleConnect:t,text:"MetaMask"}),a(v,{providerString:"walletconnect",handleConnect:t,text:"WalletConnect"})]})),Y=r.exports.memo(({account:t,web3:n,providerString:e,handleLogout:i})=>p("div",{className:"content",children:[a("p",{children:"Open Sesame!"}),p("small",{children:["Selected account: ",t]}),a("button",{type:"button",onClick:()=>$({web3:n,account:t}),children:"Sign Message"}),a("button",{className:"change-provider",type:"button",onClick:i,children:"Change Provider"}),p("small",{children:["Connected via ",e]})]})),$=async({web3:t,account:n})=>{try{if(!n||!t)throw new Error("NO ACCOUNT AVAILABLE");const e=await t.eth.personal.sign("Open Sesame!",n,"");console.info(e)}catch(e){console.warn(e)}};function H(){const{connectProvider:t,changeProvider:n,providerString:e,account:i,web3:o}=G(),[s,c]=r.exports.useState(!!e),u=!!i&&!!o;r.exports.useEffect(()=>{u&&s&&c(!1)},[u,s]);const l=r.exports.useCallback(async d=>{c(!0),await t(d).finally(()=>{c(!1)})},[t]),m=r.exports.useCallback(()=>{c(!0),n(),c(!1)},[n]);return p("div",{className:"App",children:[a("h1",{children:"Sesame"}),a("img",{src:u?O:M,className:"App-logo",alt:"logo"}),s?a("p",{children:"loading..."}):p("div",{children:[!u&&a(J,{handleConnect:l}),u&&a(Y,{web3:o,account:i,providerString:e,handleLogout:m})]})]})}E.render(a(I.StrictMode,{children:a(H,{})}),document.getElementById("root"));
