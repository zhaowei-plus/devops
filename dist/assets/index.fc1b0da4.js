var e=Object.defineProperty,a=Object.prototype.hasOwnProperty,t=Object.getOwnPropertySymbols,r=Object.prototype.propertyIsEnumerable,l=(a,t,r)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[t]=r,s=(e,s)=>{for(var n in s||(s={}))a.call(s,n)&&l(e,n,s[n]);if(t)for(var n of t(s))r.call(s,n)&&l(e,n,s[n]);return e};import{_ as n,au as o,h as c,av as m,l as i,ag as p,e as d,k as v}from"./vendor.931d8f24.js";import{r as u}from"./index.d0ed3dc5.js";import{L as f}from"./index.54d80d25.js";import{u as b}from"./useVisible.7f795f63.js";import{m as E}from"./index.6547ff7d.js";var y=e=>{const{processes:a=[],onInfo:t}=e;return n.createElement("div",{className:"process-tags"},a.length>0?n.createElement("div",{className:"process-tags__content"},a.map(((e,a)=>n.createElement("div",{className:"tag",key:a,onClick:()=>t(e)},e.processName)))):"无相关进程")},x=e=>{const{params:l={},onCancel:s,onShowProcess:p}=e,{proxy:d,proxys:v=[]}=l,u=((e,l)=>{var s={};for(var n in e)a.call(e,n)&&l.indexOf(n)<0&&(s[n]=e[n]);if(null!=e&&t)for(var n of t(e))l.indexOf(n)<0&&r.call(e,n)&&(s[n]=e[n]);return s})(l,["proxy","proxys"]);return n.createElement(o,{visible:!0,closable:!0,width:500,placement:"right",onClose:s,className:"process-info"},n.createElement(c,{labelCol:6,validateFirst:!0,wrapperCol:16,editable:!1,initialValues:l,previewPlaceholder:"-"},n.createElement(m,{title:`${d}详细信息`},Object.keys(u).map(((e,a)=>n.createElement(i.SchemaMarkupField,{type:"string",key:a,name:e,title:e})))),n.createElement(m,{title:"proxy列表"},n.createElement(i.FormSlot,null,(v||[]).map(((e,a)=>n.createElement("div",{className:"item",key:a},e,n.createElement("a",{style:{margin:"0 10px"},onClick:()=>p(e)},"查看相关进程"))))))))};const{Content:h}=f;var k=e=>{const{params:a={},onBack:t}=e,{proxy:r}=a,l=b(),[s,o]=n.useState({}),[c,m]=n.useState([]),{process:i={},childrenProcesses:p=[],parentProcesses:d=[]}=s,v=(e,a=c)=>(m([...a,e]),u.get("/dev-ops/devops/dependency/getByProxy",{proxyName:e.toLowerCase()}).then((e=>{o(e.data)}))),E=e=>{l.open(e)};return n.useEffect((()=>{r&&v(r)}),[]),n.createElement(f,null,n.createElement(h,{wrapperClassName:"service-monitor-detail"},n.createElement("div",{className:"breadcrumb"},n.createElement("div",{className:"breadcrumb__item",onClick:t},"返回"),c.map(((e,a)=>n.createElement("div",{key:a,className:"breadcrumb__item",onClick:()=>((e,a)=>{setTimeout((()=>{v(e,c.slice(0,a))}))})(e,a)},e)))),n.createElement(y,{key:"parentProcesses",onInfo:E,processes:d}),n.createElement(y,{key:"process",onInfo:E,processes:[i]}),n.createElement(y,{key:"childrenProcesses",onInfo:E,processes:p}),l.visible&&n.createElement(x,{params:l.params,onCancel:l.close,onShowProcess:e=>{l.close(),v(e)}})))};const g=[{label:"停止",value:0},{label:"正常",value:2}],C=[{label:"正常",value:0,color:"#37a956"},{label:"错误",value:1,color:"#ea4236"},{label:"警告",value:2,color:"#fbbc05"}];const{Header:N,Content:P}=f;var w=()=>{const e=b(),[a,t]=n.useState([]);n.useEffect((()=>{u.get("/dev-ops/devops/monitor/allProxy").then((e=>{t(e.data.map(((e,a)=>e.servers&&e.servers.length>0?s(s({},e.servers[0]),{id:a}):{id:a})))}))}),[]);const r=(e=>[{title:"服务名",dataIndex:"proxy",render:(a,t)=>n.createElement("a",{onClick:()=>e(t)},a)},{title:"机器IP",dataIndex:"hostIp"},{title:"服务端口",dataIndex:"hostPort"},{title:"服务状态",dataIndex:"status",render:e=>E(e,g)},{title:"预期状态",dataIndex:"flag",render:e=>{const a=C.find((a=>a.value===e));return a?n.createElement(n.Fragment,null,n.createElement("i",{className:"dib mr-10 w12 h12 br-half va-m",style:{backgroundColor:a.color}}),n.createElement("span",{className:"va-m"},a.label)):"-"}}])((a=>{e.open(a)}));return n.createElement(f,null,n.createElement(N,{title:"服务监控",extra:n.createElement(p,{type:"link",target:"_blank",className:"link",href:"/service-graph"},"服务依赖全景图")}),n.createElement(P,{wrapperClassName:d("service-monitor-list",{hidden:e.visible})},n.createElement(v,{rowKey:"id",columns:r,pagination:!1,dataSource:a})),e.visible&&n.createElement(k,{params:e.params,onBack:e.close}))};export default e=>n.createElement(w,null);