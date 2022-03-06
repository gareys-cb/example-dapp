import{b as L,p as S,u as k,W as g,C as E,a as P,r,j as b,R as A,c as I}from"./vendor.2e00e048.js";const M=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}};M();window.global=window;window.Buffer=L.Buffer;window.process=S;window.util=k;var N="./assets/padlock.3a1fe527.png",W="./assets/padlock_open.c4541ffd.png";const x="YOUR_INFURA_PROJECT_ID",_="Example Dapp",O="https://gareys-cb.github.io/example-dapp/assets/padlock.png",R=`https://mainnet.infura.io/v3/${x}`,D=1,U=()=>new E({appName:_,appLogoUrl:O,darkMode:!1,overrideIsMetaMask:!1}).makeWeb3Provider(R,D),F=async()=>{const t=U(),n=new g(t),e=await t.request({method:"eth_requestAccounts"});return{provider:t,web3:n,accounts:e}},T=()=>{var t,n,e;return(e=(n=(t=window.ethereum)==null?void 0:t.providers)==null?void 0:n.find(i=>!!i.isMetaMask))!=null?e:window.ethereum},j=async()=>{const t=T();if(!t||!t.isMetaMask||!window.ethereum)throw window.open("https://metamask.io/download.html","_blank"),new Error("NO METAMASK WALLET FOUND!");const n=new g(t),e=await t.request({method:"eth_requestAccounts"});return{provider:t,web3:n,accounts:e}},q=()=>new P({infuraId:x}),B=async()=>new Promise(async(t,n)=>{const e=q(),i=new g(e);let o=!0;const s=()=>o,c=()=>{s()&&n()};e.connector.on("disconnect",c);try{const d=await e.enable();o=!1,t({provider:e,web3:i,accounts:d})}catch{n()}}),K=async t=>{switch(t){case"coinbase":return F();case"metamask":return j();case"walletconnect":return B();default:if(!window.ethereum)throw new Error("NO WALLET FOUND!");return{provider:window.ethereum,web3:new g(window.ethereum),accounts:[]}}},f="web3-provider",G=()=>{const[t,n]=r.exports.useState(),[e,i]=r.exports.useState(),[o,s]=r.exports.useState(),[c,d]=r.exports.useState(window.localStorage.getItem(f)),u=r.exports.useCallback(()=>{localStorage.removeItem(f),d(void 0),i(void 0),n(void 0),s(void 0)},[e]),m=r.exports.useCallback(async a=>{try{const{provider:w,web3:C,accounts:y}=await K(a);localStorage.setItem(f,a),d(a),i(w),n(C),s(y[0])}catch{console.warn("FAILED TO SIGN IN!"),u()}},[u]);return r.exports.useEffect(()=>{const a=w=>{if(!w.length){u();return}s(w[0])};return e==null||e.on("accountsChanged",a),()=>{e==null||e.removeListener("accountsChanged",a)}},[e,u]),r.exports.useEffect(()=>{const a=()=>{u()};return e==null||e.on("disconnect",a),()=>{e==null||e.removeListener("disconnect",a)}},[e,u]),r.exports.useEffect(()=>{if(c!=="coinbase"){removeEventListener("beforeunload",h);return}return addEventListener("beforeunload",h),()=>{removeEventListener("beforeunload",h)}},[c]),r.exports.useEffect(()=>{const a=window.localStorage.getItem(f);d(a),a&&m(a).catch(u)},[]),{providerString:c,connectProvider:m,changeProvider:u,account:o,web3:t}},h=()=>{localStorage.getItem("-walletlink:https://www.walletlink.org:version")||localStorage.removeItem(f)},l=b.exports.jsx,p=b.exports.jsxs,v=r.exports.memo(({providerString:t,handleConnect:n,text:e})=>l("button",{type:"button",onClick:()=>n(t),children:e})),J=r.exports.memo(({handleConnect:t})=>p("div",{className:"content",children:[l("p",{children:"Connect your wallet"}),l(v,{providerString:"coinbase",handleConnect:t,text:"Coinbase Wallet"}),l(v,{providerString:"metamask",handleConnect:t,text:"MetaMask"}),l(v,{providerString:"walletconnect",handleConnect:t,text:"WalletConnect"})]})),Y=r.exports.memo(({account:t,web3:n,providerString:e,handleChangeProvider:i})=>p("div",{className:"content",children:[p("small",{children:["Selected account: ",t]}),l("button",{type:"button",onClick:()=>$({web3:n,account:t}),children:"Sign Message"}),l("button",{className:"change-provider",type:"button",onClick:i,children:"Change Provider"}),p("small",{children:["Connected via ",e]})]})),$=async({web3:t,account:n})=>{try{const e=await t.eth.personal.sign("Example message",n,"");console.info(e)}catch(e){console.warn(e)}};function H(){const{connectProvider:t,changeProvider:n,providerString:e,account:i,web3:o}=G(),[s,c]=r.exports.useState(!!e),d=!!i&&!!o;r.exports.useEffect(()=>{d&&s&&c(!1)},[d,s]);const u=r.exports.useCallback(async a=>{c(!0),await t(a).finally(()=>{c(!1)})},[t]),m=r.exports.useCallback(()=>{c(!0),n(),c(!1)},[n]);return p("div",{className:"App",children:[l("h1",{children:"Example Dapp"}),l("img",{src:d?W:N,className:"App-logo",alt:"logo"}),s?l("p",{children:"loading..."}):p("div",{children:[!d&&l(J,{handleConnect:u}),d&&l(Y,{web3:o,account:i,providerString:e,handleChangeProvider:m})]})]})}A.render(l(I.StrictMode,{children:l(H,{})}),document.getElementById("root"));
