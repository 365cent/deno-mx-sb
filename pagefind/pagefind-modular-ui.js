(()=>{var m=Object.defineProperty;var f=(n,e)=>{for(var t in e)m(n,t,{get:e[t],enumerable:!0})};var u={};f(u,{Input:()=>a,Instance:()=>h,ResultList:()=>o,Summary:()=>l});var r=class{constructor(e){this.element=document.createElement(e)}class(e){return this.element.classList.add(e),this}attrs(e){for(let[t,i]of Object.entries(e))this.element.setAttribute(t,i);return this}text(e){return this.element.innerText=e,this}html(e){return this.element.innerHTML=e,this}handle(e,t){return this.element.addEventListener(e,t),this}addTo(e){return e instanceof r?e.element.appendChild(this.element):e.appendChild(this.element),this.element}};var _=async(n=100)=>new Promise(e=>setTimeout(e,n)),a=class{constructor(e){if(this.inputEl=null,this.clearEl=null,this.instance=null,this.searchID=0,this.debounceTimeoutMs=e.debounceTimeoutMs??300,e.inputElement){if(e.containerElement){console.warn("[Pagefind Input component]: inputElement and containerElement both supplied. Ignoring the container option.");return}this.initExisting(e.inputElement)}else if(e.containerElement)this.initContainer(e.containerElement);else{console.error("[Pagefind Input component]: No selector supplied for containerElement or inputElement");return}this.inputEl.addEventListener("input",async t=>{if(this.instance&&typeof t?.target?.value=="string"){this.updateState(t.target.value);let i=++this.searchID;if(await _(this.debounceTimeoutMs),i!==this.searchID)return null;this.instance.triggerSearch(t.target.value)}})}initContainer(e){let t=document.querySelector(e);if(!t){console.error(`[Pagefind Input component]: No container found for ${e} selector`);return}if(t.tagName==="INPUT")console.warn(`[Pagefind Input component]: Encountered input element for ${e} when a container was expected`),console.warn("[Pagefind Input component]: Treating containerElement option as inputElement and proceeding"),this.initExisting(e);else{t.innerHTML="";let i=new r("form").class("pagefind-modular-input-wrapper").attrs({role:"search","aria-label":"Search this site",action:"javascript:void(0);"});this.inputEl=new r("input").class("pagefind-modular-input").addTo(i),this.clearEl=new r("button").class("pagefind-modular-input-clear").attrs({"data-pfmod-suppressed":"true"}).text("Clear").handle("click",()=>{this.inputEl.value="",this.instance.triggerSearch(""),this.updateState("")}).addTo(i),i.addTo(t)}}initExisting(e){let t=document.querySelector(e);if(!t){console.error(`[Pagefind Input component]: No input element found for ${e} selector`);return}if(t.tagName!=="INPUT"){console.error(`[Pagefind Input component]: Expected ${e} to be an <input> element`);return}this.inputEl=t}updateState(e){this.clearEl&&(e&&e?.length?this.clearEl.removeAttribute("data-pfmod-suppressed"):this.clearEl.setAttribute("data-pfmod-suppressed","true"))}register(e){this.instance=e,this.instance.on("search",(t,i)=>{this.inputEl&&document.activeElement!==this.inputEl&&(this.inputEl.value=t,this.updateState(t))})}};var p=n=>{if(n instanceof Element)return[n];if(Array.isArray(n)&&n.every(e=>e instanceof Element))return n;if(typeof n=="string"||n instanceof String){let e=document.createElement("div");return e.innerHTML=n,[...e.childNodes]}else return console.error(`[Pagefind ResultList component]: Expected template function to return an HTML element or string, got ${typeof n}`),[]},g=()=>{let n=(e=30)=>". ".repeat(Math.floor(10+Math.random()*e));return`<li class="pagefind-modular-list-result">
    <div class="pagefind-modular-list-thumb" data-pfmod-loading></div>
    <div class="pagefind-modular-list-inner">
        <p class="pagefind-modular-list-title" data-pfmod-loading>${n(30)}</p>
        <p class="pagefind-modular-list-excerpt" data-pfmod-loading>${n(40)}</p>
    </div>
</li>`},E=n=>{let e=new r("li").class("pagefind-modular-list-result"),t=new r("div").class("pagefind-modular-list-thumb").addTo(e);n?.meta?.image&&new r("img").class("pagefind-modular-list-image").attrs({src:n.meta.image,alt:n.meta.image_alt||n.meta.title}).addTo(t);let i=new r("div").class("pagefind-modular-list-inner").addTo(e),s=new r("p").class("pagefind-modular-list-title").addTo(i);return new r("a").class("pagefind-modular-list-link").text(n.meta?.title).attrs({href:n.meta?.url||n.url}).addTo(s),new r("p").class("pagefind-modular-list-excerpt").html(n.excerpt).addTo(i),e.element},d=class{constructor(e){this.rawResult=e.result,this.placeholderNodes=e.placeholderNodes,this.resultFn=e.resultFn,this.result=null,this.load()}async load(){if(!this.placeholderNodes?.length)return;this.result=await this.rawResult.data();let e=this.resultFn(this.result),t=p(e);for(;this.placeholderNodes.length>1;)this.placeholderNodes.pop().remove();this.placeholderNodes[0].replaceWith(...t)}},o=class{constructor(e){if(this.containerEl=null,this.results=[],this.placeholderTemplate=e.placeholderTemplate??g,this.resultTemplate=e.resultTemplate??E,e.containerElement)this.initContainer(e.containerElement);else{console.error("[Pagefind ResultList component]: No selector supplied for containerElement");return}}initContainer(e){let t=document.querySelector(e);if(!t){console.error(`[Pagefind ResultList component]: No container found for ${e} selector`);return}this.containerEl=t}append(e){for(let t of e)this.containerEl.appendChild(t)}register(e){e.on("results",t=>{this.containerEl&&(this.containerEl.innerHTML="",this.results=t.results.map(i=>{let s=p(this.placeholderTemplate());return this.append(s),new d({result:i,placeholderNodes:s,resultFn:this.resultTemplate})}))}),e.on("loading",()=>{this.containerEl&&(this.containerEl.innerHTML="")})}};var l=class{constructor(e){if(this.containerEl=null,this.term="",e.containerElement)this.initContainer(e.containerElement);else{console.error("[Pagefind Summary component]: No selector supplied for containerElement");return}}initContainer(e){let t=document.querySelector(e);if(!t){console.error(`[Pagefind Summary component]: No container found for ${e} selector`);return}this.containerEl=t}register(e){e.on("search",(t,i)=>{this.term=t}),e.on("results",t=>{if(!this.containerEl||!t)return;if(!this.term){this.containerEl.innerText="";return}let i=t?.results?.length??0;this.containerEl.innerText=`${i} result${i===1?"":"s"} for ${this.term}`}),e.on("loading",()=>{this.containerEl&&(this.containerEl.innerText=`Searching for ${this.term}...`)})}};var c;try{c=new URL(document.currentScript.src).pathname.match(/^(.*\/)(?:pagefind-)?modular-ui.js.*$/)[1]}catch{c="/_pagefind/",console.warn(`Pagefind couldn't determine the base of the bundle from the javascript import path. Falling back to the default of ${c}.`),console.warn("You can configure this by passing a bundlePath option to PagefindComposable Instance"),console.warn(`[DEBUG: Loaded from ${document?.currentScript?.src??"unknown"}]`)}var h=class{constructor(e={}){this.__pagefind__=null,this.__initializing__=null,this.__searchID__=0,this.__hooks__={search:[],filters:[],loading:[],results:[]},this.components=[],this.searchTerm="",this.searchFilters={},this.searchResult={},this.availableFilters=null,this.options={bundlePath:e.bundlePath??c,mergeIndex:e.mergeIndex??[]},delete e.bundlePath,delete e.resetStyles,delete e.processResult,delete e.processTerm,delete e.debounceTimeoutMs,delete e.mergeIndex,delete e.translations,this.pagefindOptions=e}add(e){e?.register?.(this),this.components.push(e)}on(e,t){if(!this.__hooks__[e]){let i=Object.keys(this.__hooks__).join(", ");console.error(`[Pagefind Composable]: Unknown event type ${e}. Supported events: [${i}]`);return}if(typeof t!="function"){console.error(`[Pagefind Composable]: Expected callback to be a function, received ${typeof t}`);return}this.__hooks__[e].push(t)}triggerLoad(){this.__load__()}triggerSearch(e,t){this.searchTerm=e,this.searchFilters=t,this.__dispatch__("search",e,t),this.__search__(e,t)}__dispatch__(e,...t){this.__hooks__[e]?.forEach(i=>i?.(...t))}async __clear__(){this.__dispatch__("results",{results:[]}),this.availableFilters=await this.__pagefind__.filters(),this.__dispatch__("filters",this.availableFilters)}async __search__(e,t){this.__dispatch__("loading"),await this.__load__();let i=++this.__searchID__;if(!e||!e.length)return this.__clear__();let s=await this.__pagefind__.search(e,{filters:t});s&&this.__searchID__===i&&(s.filters&&Object.keys(s.filters)?.length&&(this.availableFilters=s.filters,this.__dispatch__("filters",this.availableFilters)),this.searchResult=s,this.__dispatch__("results",this.searchResult))}async __load__(){if(!this.__initializing__){if(this.__initializing__=!0,!this.__pagefind__){let e=await import(`${this.options.bundlePath}pagefind.js`);await e.options(this.pagefindOptions||{});for(let t of this.options.mergeIndex){if(!t.bundlePath)throw new Error("mergeIndex requires a bundlePath parameter");let i=t.bundlePath;delete t.bundlePath,await e.mergeIndex(i,t)}this.__pagefind__=e}this.availableFilters=await this.__pagefind__.filters(),this.__dispatch__("filters",this.availableFilters)}}};window.PagefindModularUI=u;})();