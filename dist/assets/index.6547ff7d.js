var e=Object.defineProperty,r=Object.prototype.hasOwnProperty,o=Object.getOwnPropertySymbols,a=Object.prototype.propertyIsEnumerable,p=(r,o,a)=>o in r?e(r,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[o]=a,t=(e,t)=>{for(var l in t||(t={}))r.call(t,l)&&p(e,l,t[l]);if(o)for(var l of o(t))a.call(t,l)&&p(e,l,t[l]);return e};import{aj as l}from"./vendor.931d8f24.js";import{c as s}from"./index.54d80d25.js";const n=(e,r="YYYY-MM-DD HH:mm:ss",o="-")=>e?l(e).format(r):o,c=(e,r=[],o="-",a="value",p="label")=>{const t=r.find((r=>r[`${a}`]===e));return t?t[`${p}`]:o},i=e=>{const r=s(e);return Object.keys(r).forEach((e=>{const o=r[e];["string","number","textarea"].includes(o.type)&&(Reflect.has(o,"x-props")||(o["x-props"]={}),Reflect.has(o["x-props"],"placeholder")||(Array.isArray(o.enum)?(o["x-props"].placeholder="请选择",o["x-props"].getPopupContainer=e=>e.parentNode,Reflect.has(o["x-props"],"allowClear")||(o["x-props"].allowClear=!0)):o["x-props"].placeholder="请输入"))})),r},d=(e=[],r,o=[])=>e.map((e=>e.key===r?t(t({},e),{children:o}):e.children?t(t({},e),{children:d(e.children,r,o)}):e));export{i as a,n as f,c as m,d as u};