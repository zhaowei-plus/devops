import{_ as e,ak as a,ah as t,b as n}from"./vendor.931d8f24.js";import{r as s}from"./index.d0ed3dc5.js";import"./index.54d80d25.js";var l=l=>{const{params:m={},onCancel:o,onOk:c}=l,{title:d}=m,[i,r]=e.useState([]),[p,v]=e.useState([]);return e.useEffect((()=>{s.get("/dev-ops/devops/monitor/dogs").then((e=>{v(e.data)}))}),[]),e.createElement(a,{visible:!0,title:"选择主机",onOk:()=>0===i.length?(n.warn("请选择主机"),!1):c(i),onCancel:o,className:"machine-select-modal"},d&&e.createElement("div",{className:"machine-select-modal__header"},d),e.createElement("div",{className:"machine-select-modal__content"},e.createElement(t.Group,{onChange:e=>{r(e)}},p.map((a=>e.createElement("div",{className:"item",key:a.ip},e.createElement(t,{value:a.ip,disabled:"false"===a.online},a.name,"(",a.ip,")")))))))};export{l as M};