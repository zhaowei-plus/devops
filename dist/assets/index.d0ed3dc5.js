var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,n=Object.getOwnPropertySymbols,a=Object.prototype.propertyIsEnumerable,o=(t,n,a)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[n]=a,r=(e,r)=>{for(var i in r||(r={}))t.call(r,i)&&o(e,i,r[i]);if(n)for(var i of n(r))a.call(r,i)&&o(e,i,r[i]);return e},i=(e,o)=>{var r={};for(var i in e)t.call(e,i)&&o.indexOf(i)<0&&(r[i]=e[i]);if(null!=e&&n)for(var i of n(e))o.indexOf(i)<0&&a.call(e,i)&&(r[i]=e[i]);return r},s=(e,t,n)=>(o(e,"symbol"!=typeof t?t+"":t,n),n);import{_ as c,w as l,S as p,m,R as d,a as h,b as u,c as _,M as E,L as f,j as y,N as v,D as g,d as b,e as C,T as x,I as L,l as j,s as O,f as k,C as R,z as D,H as P,g as w}from"./vendor.931d8f24.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(n){const a=new URL(e,location),o=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((n,r)=>{const i=new URL(e,a);if(self[t].moduleMap[i])return n(self[t].moduleMap[i]);const s=new Blob([`import * as m from '${i}';`,`${t}.moduleMap['${i}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(s),onerror(){r(new Error(`Failed to import: ${e}`)),o(c)},onload(){n(self[t].moduleMap[i]),o(c)}});document.head.appendChild(c)})),self[t].moduleMap={}}}("/devops/assets/");const I=e=>"function"==typeof e,N=c.createContext(),T=c.createContext(),z=(e,t)=>{if(!I(c.useContext))return;const n=c.useContext(T);c.useEffect((()=>{if(I(n[e])){const a=n[e](t);return()=>{a()}}}),[])};z.bind(null,"didCache"),z.bind(null,"didRecover");const A=()=>c.useContext(N),M=e=>{const{history:t,location:{pathname:n}}=e,[a,o]=c.useState([]),i=c.useCallback(((e,t)=>{-1===a.findIndex((t=>t.key===e))&&o(a.concat([r({key:e},t)]))}),[a]),s=c.useCallback(((e,t)=>{const n=JSON.parse(JSON.stringify(a)),i=a.findIndex((t=>t.key===e));i>-1&&(n.splice(i,1,r(r({key:e},n[i]),t)),o(n))}),[a]),l=c.useCallback((e=>{const r=a.findIndex((t=>t.key===e)),i=a.filter((t=>t.key!==e));if(o(i),e===n){if(0===i.length)return void t.replace("/");if(0===r)return void t.replace(i[0].path);t.replace(i[r-1].path)}}),[a]),p=c.useCallback((()=>{o([])}),[]),m=c.useCallback((e=>a.findIndex((t=>t.key===e))>-1),[a]);return c.createElement(N.Provider,{value:{cache:a,isCache:m,registerCache:i,removeCache:l,clearCache:p,setCacheProps:s}},e.children)};M.displayName="CacheProvider";var V=l(M);class S extends c.Component{render(){return I(this.props.children)?this.props.children():this.props.children}shouldComponentUpdate(e,t){return this.props.when||e.when}}class U extends p{render(){const{children:e,location:t,level:n=1}=this.props;return c.createElement(N.Consumer,null,(n=>c.Children.map(e,(e=>{if(c.isValidElement(e)){const a=e.props.path||e.props.form,o=m(t.pathname,r(r({},e.props),{path:a})),i=n.isCache(a);return o||i?c.createElement(S,{when:!!o,key:a},c.cloneElement(e,{location:t,computedMatch:o,matched:!!o,cached:i})):null}}))))}}(U=l(U)).displayName="CacheSwitch";var $=U;class B extends c.Component{constructor(e){super(e),s(this,"injectDOM",(()=>{this.parentNode&&this.parentNode.insertBefore(this.wrapper,this.placeholderNode),this.cacheLifeCycles.notify("didRecover")})),s(this,"ejectDOM",(()=>{this.parentNode&&(this.parentNode=this.wrapper.parentNode,this.parentNode.insertBefore(this.placeholderNode,this.wrapper)),this.cacheLifeCycles.notify("didCache")})),s(this,"computedStyle",(()=>{const{matched:e}=this.props;return e?{width:"100%",height:"100%",display:"block",overflow:"inherit"}:{display:"none",overflow:"inherit"}}));const{path:t}=e;this.wrapper=c.createRef(),this.cacheLifeCycles={listener:{},on:(e,t)=>(this.cacheLifeCycles.listener[e]=t,()=>{delete this.cacheLifeCycles.listener[e]}),didCache:e=>{this.cacheLifeCycles.listener.didCache=e},didRecover:e=>{this.cacheLifeCycles.listener.didRecover=e},notify:e=>{this.cacheLifeCycles.listener[e]&&this.cacheLifeCycles.listener[e]()}},this.placeholderNode=document.createComment(`Route cached ${t}`),this.state={cached:!1,matched:!1,key:Date.now()}}componentDidMount(){const{matched:e,path:t,registerCache:n}=this.props;e&&n(t,this.props)}shouldComponentUpdate(e,t){const n=!1===this.props.matched&&!0===e.matched,a=!0===this.props.matched&&!1===e.matched;return(this.props.matched||e.matched||this.state.cached!==t.cached)&&(n&&this.injectDOM(),a&&this.ejectDOM()),!0}componentDidUpdate(e,t,n){e.cached&&this.state.cached&&(!0===t.matched&&!1===this.state.matched&&(this.props.unmount&&this.ejectDOM(),this.cacheLifeCycles.notify("didCache")),!1===t.matched&&!0===this.state.matched&&(this.props.unmount&&this.injectDOM(),this.cacheLifeCycles.notify("didRecover")))}componentWillUnmount(){this.placeholderNode.remove()}render(){const{cached:e}=this.state,{children:t}=this.props;return e?null:c.createElement("div",{ref:e=>{this.wrapper=e},style:this.computedStyle()},c.createElement(T.Provider,{value:this.cacheLifeCycles},t(this.cacheLifeCycles)))}}class q extends c.Component{render(){const e=this.props,{children:t,render:n,component:a}=e,o=i(e,["children","render","component"]);return c.createElement(N.Consumer,null,(e=>c.createElement(S,{when:o.matched},c.createElement(d,r({},o),(i=>c.createElement(B,r(r(r({},o),e),i),(e=>a?c.createElement(a,r(r({},e),i)):n?n(e):t?c.Children.map(t):void 0)))))))}}q.displayName="CacheRoute",h.interceptors.request.use((e=>e)),h.interceptors.response.use((e=>{const{data:t,config:n={}}=e,{notify:a=!0}=n;return!0===t.success||200===t.code?t:(((null==t?void 0:t.msg)||(null==t?void 0:t.message)||(null==t?void 0:t.errorMsg))&&a&&u.error((null==t?void 0:t.msg)||(null==t?void 0:t.message)||(null==t?void 0:t.errorMsg)),[100,403,602].includes(t.code)?(u.warn("无权限"),location.hash="/login",Promise.reject()):Promise.reject())}));var F={get:(e,t,n={})=>h.get(e,r({params:t},n)),post:(e,t,n={})=>h.post(e,t,n)};let K;const J={},W=function(e,t){if(!t)return e();if(void 0===K){const e=document.createElement("link").relList;K=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in J)return;J[e]=!0;const t=e.endsWith(".css"),n=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${n}`))return;const a=document.createElement("link");return a.rel=t?"stylesheet":K,t||(a.as="script",a.crossOrigin=""),a.href=e,document.head.appendChild(a),t?new Promise(((e,t)=>{a.addEventListener("load",e),a.addEventListener("error",t)})):void 0}))).then((()=>e()))},H=[{title:"登录页",path:"/login",component:c.lazy((()=>W((()=>__import__("./index.cb6215df.js")),["/devops/assets/index.cb6215df.js","/devops/assets/index.65a4e3ea.css","/devops/assets/vendor.931d8f24.js"])))},{title:"未知页面",path:"/404",component:c.lazy((()=>W((()=>__import__("./index.435ca8da.js")),["/devops/assets/index.435ca8da.js","/devops/assets/vendor.931d8f24.js"])))}],Q=[{path:"/operation",title:"运维",routes:[{title:"看门狗",path:"/operation/watch-dog",component:c.lazy((()=>W((()=>__import__("./index.cf976ce5.js")),["/devops/assets/index.cf976ce5.js","/devops/assets/index.eee430ff.css","/devops/assets/vendor.931d8f24.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css"]))),isDefault:!0},{title:"镜像管理",path:"/operation/mirror-manage",component:c.lazy((()=>W((()=>__import__("./index.72c76b95.js")),["/devops/assets/index.72c76b95.js","/devops/assets/index.0a67086a.css","/devops/assets/vendor.931d8f24.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/index.f4c393b6.js","/devops/assets/index.6547ff7d.js"])))},{title:"Yaml管理",path:"/operation/yaml-manage",component:c.lazy((()=>W((()=>__import__("./index.c679352e.js")),["/devops/assets/index.c679352e.js","/devops/assets/index.28adcc28.css","/devops/assets/vendor.931d8f24.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/index.90e87015.js","/devops/assets/index.f4c393b6.js","/devops/assets/useVisible.7f795f63.js","/devops/assets/index.6547ff7d.js","/devops/assets/index.0d0bb693.js"])))},{title:"前端资源管理",path:"/operation/fe-manage",component:c.lazy((()=>W((()=>__import__("./index.38ec4389.js")),["/devops/assets/index.38ec4389.js","/devops/assets/index.43c7d08e.css","/devops/assets/vendor.931d8f24.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/index.f4c393b6.js","/devops/assets/useVisible.7f795f63.js","/devops/assets/index.0d0bb693.js","/devops/assets/index.6547ff7d.js"])))},{title:"前端配置",path:"/operation/fe-config",component:c.lazy((()=>W((()=>__import__("./index.efd893be.js")),["/devops/assets/index.efd893be.js","/devops/assets/index.aa100e38.css","/devops/assets/vendor.931d8f24.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/index.90e87015.js","/devops/assets/index.0d0bb693.js","/devops/assets/useVisible.7f795f63.js","/devops/assets/index.f4c393b6.js"])))},{title:"后端配置",path:"/operation/ae-config",component:c.lazy((()=>W((()=>__import__("./index.100e5d11.js")),["/devops/assets/index.100e5d11.js","/devops/assets/index.a480cf6b.css","/devops/assets/vendor.931d8f24.js","/devops/assets/index.f4c393b6.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/index.90e87015.js"])))},{title:"发布记录",path:"/operation/publish-record",component:c.lazy((()=>W((()=>__import__("./index.4e8549ed.js")),["/devops/assets/index.4e8549ed.js","/devops/assets/vendor.931d8f24.js","/devops/assets/useList.da577dd6.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/index.cd79d446.js","/devops/assets/index.6547ff7d.js"])))},{title:"远程查看",path:"/operation/show-logs",component:c.lazy((()=>W((()=>__import__("./index.1112f473.js")),["/devops/assets/index.1112f473.js","/devops/assets/index.941e282f.css","/devops/assets/vendor.931d8f24.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/index.cd79d446.js","/devops/assets/index.f4c393b6.js","/devops/assets/useList.da577dd6.js"])))}]},{path:"/database",title:"DB后台",routes:[{title:"SQL查询",path:"/database/sql-query",component:c.lazy((()=>W((()=>__import__("./index.23333866.js")),["/devops/assets/index.23333866.js","/devops/assets/index.854c43ea.css","/devops/assets/vendor.931d8f24.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css"])))},{title:"订正|导出|表结构",path:"/database/table-structure",component:c.lazy((()=>W((()=>__import__("./index.25c02c71.js")),["/devops/assets/index.25c02c71.js","/devops/assets/vendor.931d8f24.js","/devops/assets/useList.da577dd6.js","/devops/assets/useVisible.7f795f63.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/index.cd79d446.js","/devops/assets/index.6547ff7d.js","/devops/assets/constant.79d8e8f2.js"])))},{title:"操作记录列表",path:"/database/record-list",component:c.lazy((()=>W((()=>__import__("./index.fb0c674d.js")),["/devops/assets/index.fb0c674d.js","/devops/assets/vendor.931d8f24.js","/devops/assets/useList.da577dd6.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/index.cd79d446.js","/devops/assets/index.6547ff7d.js","/devops/assets/constant.79d8e8f2.js"])))}]},{path:"/monitor",title:"监控",routes:[{title:"任务",path:"/monitor/tasks",component:c.lazy((()=>W((()=>__import__("./index.39be19c0.js")),["/devops/assets/index.39be19c0.js","/devops/assets/index.2ec8020b.css","/devops/assets/vendor.931d8f24.js","/devops/assets/useList.da577dd6.js","/devops/assets/useVisible.7f795f63.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/index.6547ff7d.js"])))},{title:"报警规则",path:"/monitor/alarm-rules",component:c.lazy((()=>W((()=>__import__("./index.4c5e80a5.js")),["/devops/assets/index.4c5e80a5.js","/devops/assets/vendor.931d8f24.js","/devops/assets/useList.da577dd6.js","/devops/assets/useVisible.7f795f63.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/index.6547ff7d.js"])))},{title:"报警分组",path:"/monitor/alarm-group",component:c.lazy((()=>W((()=>__import__("./index.696b0638.js")),["/devops/assets/index.696b0638.js","/devops/assets/vendor.931d8f24.js","/devops/assets/useList.da577dd6.js","/devops/assets/useVisible.7f795f63.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/index.6547ff7d.js"])))},{title:"健康检查",path:"/monitor/health-check",component:c.lazy((()=>W((()=>__import__("./index.d20ab571.js")),["/devops/assets/index.d20ab571.js","/devops/assets/index.74e3c85a.css","/devops/assets/vendor.931d8f24.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/useList.da577dd6.js","/devops/assets/useVisible.7f795f63.js","/devops/assets/index.6547ff7d.js"])))},{title:"运行报表",path:"/monitor/operation-report",children:[{title:"服务器",path:"/monitor/operation-report/server",component:c.lazy((()=>W((()=>__import__("./index.7c2240f7.js")),["/devops/assets/index.7c2240f7.js","/devops/assets/vendor.931d8f24.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/index.760fb3dd.js"])))},{title:"数据库",path:"/monitor/operation-report/database",component:c.lazy((()=>W((()=>__import__("./index.1ef4a8e9.js")),["/devops/assets/index.1ef4a8e9.js","/devops/assets/vendor.931d8f24.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/index.760fb3dd.js"])))},{title:"Redis",path:"/monitor/operation-report/redis",component:c.lazy((()=>W((()=>__import__("./index.ab4055f8.js")),["/devops/assets/index.ab4055f8.js","/devops/assets/vendor.931d8f24.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/index.760fb3dd.js"])))},{title:"Docker",path:"/monitor/operation-report/docker",component:c.lazy((()=>W((()=>__import__("./index.359f22da.js")),["/devops/assets/index.359f22da.js","/devops/assets/vendor.931d8f24.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/index.760fb3dd.js"])))},{title:"服务状态",path:"/monitor/operation-report/service-status",component:c.lazy((()=>W((()=>__import__("./index.fc1b0da4.js")),["/devops/assets/index.fc1b0da4.js","/devops/assets/index.02b7ea11.css","/devops/assets/vendor.931d8f24.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/useVisible.7f795f63.js","/devops/assets/index.6547ff7d.js"])))}]}]},{path:"/gateway",title:"网关",visible:!1,routes:[{title:"路由配置",path:"/gateway/route-config",component:c.lazy((()=>W((()=>__import__("./index.23cb8ff5.js")),["/devops/assets/index.23cb8ff5.js","/devops/assets/index.614e764d.css","/devops/assets/vendor.931d8f24.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/index.cd79d446.js","/devops/assets/useList.da577dd6.js","/devops/assets/useVisible.7f795f63.js","/devops/assets/index.6547ff7d.js"])))},{title:"插件配置",path:"/gateway/plugin-config",component:c.lazy((()=>W((()=>__import__("./index.16581b0d.js")),["/devops/assets/index.16581b0d.js","/devops/assets/vendor.931d8f24.js","/devops/assets/index.54d80d25.js","/devops/assets/index.4a13b61b.css","/devops/assets/index.cd79d446.js","/devops/assets/useList.da577dd6.js","/devops/assets/useVisible.7f795f63.js","/devops/assets/index.6547ff7d.js"])))}]}];var Y=()=>{const[e,t]=c.useState([]),n=H.concat(Q.reduce(((e,t)=>e.concat(t.routes)),[])).find((e=>e.isDefault));c.useEffect((()=>{F.get("/dev-ops/power/menuList").then((e=>{t(e.data)}))}),[]);const a=(e=[],t=!0)=>e.filter((({visible:e=!0})=>e)).map((e=>{const{path:n,title:o,children:r=[],component:i}=e;return r.length>0?a(r):t?c.createElement(q,{key:n,path:n,title:o,component:i}):c.createElement(d,{exact:!0,key:n,path:n,title:o,component:i})}));return c.createElement($,null,a(H),Q.filter((e=>!1!==e.visible)).map((e=>a(e.routes))),Q.map((e=>c.createElement(d,{exact:!0,key:e.path,path:e.path,component:()=>c.createElement(_,{to:e.routes[0].path})}))),c.createElement(d,{key:"404",component:()=>c.createElement(_,{to:"/404"})}),n&&c.createElement(d,{exact:!0,key:"/",path:"/",component:()=>c.createElement(_,{to:n.path})}))};const{Sider:G}=f,{SubMenu:X}=E,Z=e=>{const{history:t,menus:n,pathname:a}=e,o=c.useMemo((()=>a.split("/").filter(Boolean).map(((e,t,n)=>`/${n.slice(0,t+1).join("/")}`))),[a]),r=(e=[])=>e.filter((({visible:e=!0})=>e)).map((({title:e,path:t,children:n=[]})=>n.length>0?c.createElement(X,{key:t,title:e},r(n)):c.createElement(E.Item,{key:t},e))),i=n.filter((e=>Array.isArray(e.children)&&e.children.length>0)).map((e=>e.path));return c.createElement(G,{style:{backgroundColor:"#fff"},className:"xm-sider"},n.length>0&&c.createElement(E,{mode:"inline",selectedKeys:o,onClick:({key:e})=>{e!==a&&t.push(e)},defaultOpenKeys:i},r(n)))};const ee=e=>{const{menus:t,history:n,pathname:a,onChange:o}=e,{clearCache:r}=A(),{loginName:i}=c.useMemo((()=>{const e=y.get("b_name");return e?{loginName:decodeURIComponent(escape(window.atob(e))),loginUid:y.get("b_name"),loginMobile:y.get("b_mobile")}:{}}),[]),s=c.useMemo((()=>a.split("/").filter(Boolean).map(((e,t,n)=>`/${n.slice(0,t+1).join("/")}`))),[a]),l=c.useMemo((()=>{const e=t.find((e=>s.includes(e.path)));return e?(setTimeout((()=>{o(e.path)})),e.path):""}),[s,t]),p=({key:e})=>{"logout"===e&&F.post("/baas-login/login/logout").then((e=>{y.remove("myself"),n.push("/logout")}))};return c.createElement("div",{className:"xm-header"},c.createElement("div",{className:"xm-header__project"},c.createElement("i",{className:"icon icon-devops"}),c.createElement("span",{className:"title"},"DevOps")),c.createElement("div",{className:"xm-header__icon"}),c.createElement("div",{className:"xm-header__menus"},c.createElement(E,{theme:"dark",mode:"horizontal",selectedKeys:[l],onSelect:({key:e})=>{o(e),r()}},t.map((e=>c.createElement(E.Item,{key:e.path},c.createElement(v,{to:e.path},e.title)))))),c.createElement(g,{overlay:c.createElement(E,{onClick:p},c.createElement(E.Item,{key:"logout"},c.createElement("a",null,"退出"))),trigger:["click"]},c.createElement("div",{className:"xm-header__user"},c.createElement("div",{className:"info"},i),c.createElement("div",{className:"icon"},c.createElement(b,null)))))};const te=e=>{const{history:t,pathname:n}=e,{cache:a,removeCache:o}=A(),r=c.useMemo((()=>n.split("/").filter(Boolean).map(((e,t,n)=>`/${n.slice(0,t+1).join("/")}`))),[n]),i=c.useMemo((()=>{const e=a.find((e=>r.includes(e.path)));if(e)return e.path}),[a,r]);return c.createElement("div",{className:C("cache-tabs",{hidden:0===a.length})},c.createElement(x,{hideAdd:!0,size:"small",onEdit:e=>{o(e)},activeKey:i,onChange:e=>{t.push(e)},type:a.length>1?"editable-card":"card"},a.map(((e,t)=>c.createElement(x.TabPane,{key:e.path,tab:e.title})))))};var ne=l((e=>{const{history:t,location:{pathname:n}}=e,[a,o]=c.useState(),r=c.useMemo((()=>{const e=Q.find((e=>e.path===a));return e?e.routes:[]}),[a]);return H.map((e=>e.path)).includes(n)?e.children:c.createElement("div",{className:"xm-container"},c.createElement(ee,{active:a,history:t,pathname:n,menus:Q.filter((e=>!1!==e.visible)),onChange:e=>{o(e)}}),c.createElement("div",{className:"xm-container__content"},c.createElement(Z,{key:a,history:t,pathname:n,menus:r}),c.createElement("div",{className:"content"},c.createElement(te,{history:t,pathname:n}),e.children)))}));j.registerFormFields({"xm-password":j.connect()((e=>{const{value:t="",onChange:n,placeholder:a,disabled:o=!1}=e,s=i(e,["value","onChange","placeholder","disabled"]);return o?c.createElement("span",null,"********"):c.createElement(L.Password,r({value:t,onChange:e=>{n(e.target.value)},visibilityToggle:!1,placeholder:a},s))}))}),O(),k.render(c.createElement(R,{locale:D},c.createElement(P,null,c.createElement(V,null,c.createElement(ne,null,c.createElement(c.Suspense,{fallback:c.createElement(w,null)},c.createElement(Y,null)))))),document.getElementById("root"));export{F as r};
