var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,r=Object.prototype.propertyIsEnumerable,s=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r;import{_ as l,ae as n,af as c,ag as o,e as m,ah as i,b as d,ai as u,T as p}from"./vendor.931d8f24.js";import{L as h,O as g}from"./index.54d80d25.js";import{r as v}from"./index.d0ed3dc5.js";import{_ as f}from"./index.f4c393b6.js";import{u as E}from"./index.6547ff7d.js";const y=[{label:"上传镜像",value:1},{label:"历史上传镜像",value:2}];var b=e=>{const{logRef:u}=e,[p,h]=l.useState([]),[g,E]=l.useState([]),y={name:"file",showUploadList:!1,action:"/dev-ops/devops/respo/upload",onChange:({file:e,fileList:t})=>{const{status:a,response:r={},name:s,size:l}=e;if("done"===a&&r.success){const e={label:r.data,value:t.length};E(g.concat([e]))}("error"===a||"done"===a&&!r.success)&&d.error("资源包上传错误")}},b=l.useMemo((()=>g.length===p.length),[g,p]);return l.createElement("div",{className:"resource-upload"},l.createElement("div",{className:"resource-upload__header"},l.createElement(n,null,l.createElement(c,((e,l)=>{for(var n in l||(l={}))t.call(l,n)&&s(e,n,l[n]);if(a)for(var n of a(l))r.call(l,n)&&s(e,n,l[n]);return e})({},y),l.createElement(o,{type:"primary"},"上传镜像")),l.createElement(o,{type:"primary",onClick:()=>{const e=p.map((e=>g.find((t=>t.value===e)).label)),t=u.current.batchAddLogs(e.map((e=>({title:`资源地址：${e}`,record:[{title:"重装镜像",status:"pending"}]}))));return Promise.all(e.map(((e,a)=>{const r=t[a];return v.post("/dev-ops/devops/respo/dockerload",f({filePath:e})).then((()=>{r.record=[{title:"重装镜像",status:"success"}]})).catch((e=>{r.record=[{title:e.msg,status:"error"}]}))}))).then((()=>{d.success("重装镜像成功")})).finally((()=>{u.current.batchUpdateLogs(t)}))},disabled:0===p.length},"重装镜像"))),l.createElement("div",{className:"resource-upload__content package"},l.createElement("div",{className:"package__header"},"资源包列表"),l.createElement("div",{className:m("package__content",{hidden:0===g.length})},l.createElement("div",{className:"check-all"},l.createElement(i,{checked:b,onChange:e=>{e.target.checked?h(g.map((e=>e.value))):h([])}},"全选")),l.createElement("div",{className:"check-list"},l.createElement(i.Group,{value:p,options:g,onChange:e=>{h(e)}})))))},k=e=>{const{logRef:t}=e,[a,r]=l.useState(0),[s,c]=l.useState([]),[m,i]=l.useState([]),p=(e="")=>v.get("/dev-ops/devops/file/list",{type:3,path:e}).then((t=>{const{success:a,data:r=[]}=t;return a?r.map((t=>({key:`${e}/${t.name}`,title:t.name,isLeaf:1===t.type}))):[]})).finally((()=>{r(a-1)}));return l.useEffect((()=>{p().then((e=>{c(e)}))}),[]),l.createElement("div",{className:"resource-history"},l.createElement("div",{className:"resource-history__header"},l.createElement(n,null,l.createElement(o,{type:"primary",disabled:0===m.length,onClick:()=>{const e=t.current.batchAddLogs(m.map((e=>({title:`资源地址：${e}`,record:[{title:"重装镜像",status:"pending"}]}))));return Promise.all(m.map(((t,a)=>{const r=e[a];return v.post("/dev-ops/devops/respo/dockerload",f({filePath:t})).then((()=>{r.record=[{title:"重装镜像",status:"success"}],d.success("重装成功")})).catch((e=>{r.record=[{title:e.msg,status:"error"}]}))}))).finally((()=>{t.current.batchUpdateLogs(e)}))}},"重装镜像"),l.createElement(o,{type:"primary",disabled:0===m.length,onClick:()=>{i([])}},"清空选中资源"))),l.createElement("div",{className:"resource-history__content"},s.length>0&&l.createElement(u,{showIcon:!0,showLine:!0,checkable:!0,treeData:s,onCheck:e=>{i(e)},loadData:async e=>{const{key:t,isLeaf:a}=e.props.data;return new Promise((e=>{a&&e(),p(t).then((a=>{c((e=>E(e,t,a))),e()}))}))},checkedKeys:m})))};const{Header:_,Content:N}=h,{TabPane:L}=p;export default()=>{const e=l.useRef(),[t,a]=l.useState(y[0].value.toString());return l.createElement(h,null,l.createElement(_,{title:"镜像管理"}),l.createElement(N,{wrapperClassName:"mirror-manage"},l.createElement("div",{className:"mirror-manage__header"},l.createElement(p,{activeKey:t,onChange:t=>{a(t),e.current.clearLogs()}},y.map((e=>l.createElement(L,{key:e.value,tab:e.label}))))),l.createElement("div",{className:"mirror-manage__content"},l.createElement("div",{className:"manage-pane"},Number(t)===y[0].value&&l.createElement(b,{logRef:e}),Number(t)===y[1].value&&l.createElement(k,{logRef:e})),l.createElement("div",{className:"log-pane"},l.createElement(g,{ref:e})))))};