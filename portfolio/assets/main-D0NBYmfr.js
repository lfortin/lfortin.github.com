(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const w=Backbone.Model.extend({defaults:{title:"",description:"",link:null,hasCounter:!1,counter:0},sync:function(){const e=Backbone.sync.apply(this,arguments);return this._xhr=e,e.always(()=>{this._xhr=null}),e},abort:function(){this._xhr&&(this._xhr.abort(),this._xhr=null,this.trigger("abort"))}}),v=Backbone.Collection.extend({model:w,sync:function(){const e=Backbone.sync.apply(this,arguments);return this._xhr=e,e.always(()=>{this._xhr=null}),e},abort:function(){this._xhr&&(this._xhr.abort(),this._xhr=null,this.trigger("abort"))}}),k=`
<div class="container mt-4">
  <div class="row">
    {{#each usecases}}
      <div class="col-md-4 mb-3">
        <div class="card h-100 shadow-sm" data-model-id="{{id}}">
          <div class="card-body usecase-card">
            <h5 class="card-title">{{title}}</h5>
            <p class="card-text">{{description}}</p>
            {{#if link}}
              <a href="{{link}}" class="btn btn-primary learn-more" target="_blank">Learn More</a>
            {{/if}}
            {{#if hasCounter}}
              <a href="#" class="btn btn-success button-counter">count is {{counter}}</a>
            {{/if}}
          </div>
        </div>
      </div>
    {{/each}}
  </div>
</div>
`,y=Backbone.View.extend({id:"home",tagName:"div",events:{"click a.button-counter":"onCounterClick"},onCounterClick(e){e.stopPropagation(),e.preventDefault();const t=$(e.target).closest(".card").attr("data-model-id"),a=this.collection.get(t);a.set("counter",a.get("counter")+1)},initialize(){this.collection=new v,this.listenTo(this.collection,"update reset change",this.render)},template:Handlebars.compile(k),render(){const e=this.template({usecases:this.collection.toJSON()});return this.$el.html(e),this}}),x=`
<div class="container mt-4">
  <h2>About</h2>
  <p>This portfolio is built using <a href="https://github.com/lfortin/vite-backbone#readme" target="_blank">vite-backbone</a>, a Vite + Backbone starter template using Bootstrap, Handlebars, and more.</p>
  <p> <a href="https://github.com/lfortin/vite-backbone#readme" target="_blank">vite-backbone</a> is released under the MIT-0 License.</p>
</div>
`,B=Backbone.View.extend({id:"about",tagName:"div",render(){return this.$el.html(x),this}}),P=`
  <div class="container mt-4">
    <h2>Help</h2>
    <p>Need help? Create an issue on the <a href="https://github.com/lfortin/vite-backbone" target="_blank">GitHub repo</a> or check the <a href="https://backbonejs.org/#Getting-started" target="_blank">Backbone.js docs</a>.</p>
  </div>
`,V=Backbone.View.extend({id:"help",tagName:"div",render(){return this.$el.html(P),this}}),S=`
  <div class="container mt-4">
    <h2 class="text-danger"><i class="bi bi-exclamation-triangle"></i> 404 Not Found</h2>
    <p>The page you requested could not be found.</p>
  </div>
`,C=Backbone.View.extend({id:"not-found",tagName:"div",render(){return this.$el.html(S),this}}),T=Backbone.Model.extend({idAttribute:"slug",defaults:{slug:"",title:"",date:"",excerpt:"",content:"",tags:[]}}),m=Backbone.Collection.extend({model:T}),d=5,_=`
<div class="container mt-4 blog-list">
  <div class="row">
    <div class="col-lg-8">
      <h2 class="mb-4">Blog</h2>

      {{#if posts.length}}
        {{#each posts}}
          <article class="card mb-3 shadow-sm">
            <div class="card-body">
              <h5 class="card-title mb-1">
                <a href="#blog/{{slug}}" class="blog-post-link text-decoration-none">
                  {{title}}
                </a>
              </h5>
              <p class="text-muted small mb-2">{{date}}</p>
              <p class="card-text mb-0">{{excerpt}}</p>
            </div>
          </article>
        {{/each}}
      {{else}}
        <p>No blog posts available yet.</p>
      {{/if}}

      {{#if hasPagination}}
        <nav aria-label="Blog pagination">
          <ul class="pagination justify-content-center mt-4">
            <li class="page-item {{#if isFirstPage}}disabled{{/if}}">
              <a class="page-link" href="#blog/page/{{prevPage}}" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            {{#each pages}}
              <li class="page-item {{#if isCurrent}}active{{/if}}">
                <a class="page-link" href="#blog/page/{{number}}">{{number}}</a>
              </li>
            {{/each}}

            <li class="page-item {{#if isLastPage}}disabled{{/if}}">
              <a class="page-link" href="#blog/page/{{nextPage}}" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      {{/if}}
    </div>
  </div>
</div>
`,I=Backbone.View.extend({id:"blog",tagName:"div",initialize(){this.collection=new m,this.currentPage=1,this.listenTo(this.collection,"update reset",this.render)},setPage(e){const t=this._getTotalPages(),a=Math.min(Math.max(e,1),t||1);this.currentPage=a,this.render()},_getTotalPages(){if(!this.collection)return 1;const e=this.collection.length;return e>0?Math.ceil(e/d):1},template:Handlebars.compile(_),render(){const e=this._getTotalPages(),t=this.currentPage||1,a=(t-1)*d,l=a+d,i=(this.collection?this.collection.slice(a,l):[]).map(n=>n.toJSON()),o=[];for(let n=1;n<=e;n+=1)o.push({number:n,isCurrent:n===t});const f=this.template({posts:i,hasPagination:e>1,pages:o,isFirstPage:t===1,isLastPage:t===e,prevPage:t-1,nextPage:t+1});return this.$el.html(f),this}}),H=`
<div class="container mt-4 blog-post">
  <div class="row">
    <div class="col-lg-8">
      {{#if post}}
        <article>
          <h1 class="mb-1">{{post.title}}</h1>
          <p class="text-muted small mb-3">{{post.date}}</p>

          <div class="blog-content">
            {{{post.content}}}
          </div>

          {{#if post.tags.length}}
            <p class="mt-3">
              <strong>Tags:</strong>
              {{#each post.tags}}
                <span class="badge bg-secondary me-1">{{this}}</span>
              {{/each}}
            </p>
          {{/if}}

          <p class="mt-4">
            <a href="#blog" class="btn btn-outline-primary">
              &laquo; Back to blog
            </a>
          </p>
        </article>
      {{else}}
        <p>That blog post could not be found.</p>
        <p>
          <a href="#blog" class="btn btn-outline-primary">
            &laquo; Back to blog
          </a>
        </p>
      {{/if}}
    </div>
  </div>
</div>
`,L=Backbone.View.extend({id:"blog-post",tagName:"div",initialize(){this.collection=new m,this.currentPost=null},showBySlug(e){if(!this.collection)return!1;const t=this.collection.get(e);return t?(this.currentPost=t,this.render(),!0):(this.currentPost=null,this.render(),!1)},template:Handlebars.compile(H),render(){const e=this.template({post:this.currentPost?this.currentPost.toJSON():null});return this.$el.html(e),this}}),R=[
{id:"cc895078-2ab0-45e8-b346-2a4d025647c0",title:"os-monitor",description:"A very simple monitor for Node.js that allows you to observe some OS parameters, such as free memory available, load average or free disk space.",link:"/os-monitor"},{id:"eae3cb6c-d6fb-4007-8afd-7d2e32c5b759",title:"cgi-core",description:"A lightweight, zero-dependency middleware for hosting CGI scripts with HTTP/1.1 support.",link:"/cgi-core"},{id:"5916615a-0fca-4854-bfc4-c1ffdbea9337",title:"react-floorlamp",description:"Straightforward state management for React.",link:"https://www.npmjs.com/package/react-floorlamp"},{id:"177aa50c-a466-4c56-987c-c3c794e4fb8d",title:"vite-backbone",description:"A starter template for building Backbone.js applications with Vite.",link:"https://github.com/lfortin/vite-backbone#readme"},{id:"fabe99de-cc77-4d37-9e97-decc3e73fa15",title:"mock-os",description:"Testing module for the os built-in module in Node.js.",link:"https://www.npmjs.com/package/mock-os"},{id:"03b7a643-52db-4daa-a5b0-f276782cfcca",title:"jquery-drive",description:"A jQuery plugin to construct the DOM using basic jQuery selectors. (deprecated)",link:"https://www.npmjs.com/package/jquery-drive"},{id:"77ed2189-0949-45cd-9746-3ad82b1df137",title:"stream-tk",description:"Experimental toolkit for handling Node.js data streams.",link:"https://www.npmjs.com/package/stream-tk"}
],h=[{slug:"2026-03-03-first-blog-post",date:"2026-03-03",title:"Hello, World! Welcome to My Portfolio",excerpt:"A quick hello and a look at what to expect from this blog.",content:`
      <p>
        Welcome to my corner of the web!
        I finally decided to carve out a space to document my projects, share some technical deep-dives, and keep track of what I'm learning.
        Whether you're a recruiter, a fellow developer, or just lost on the internet—I'm glad you're here.
        Stay tuned for more updates soon!
      </p>
    `,tags:["welcome", "webdev", "2026"]}
  ],p=new y,u=new B,g=new V,r=new I,c=new L,b=new C,M=Backbone.Router.extend({routes:{"":"home",about:"about",blog:"blogIndex","blog/page/:page":"blogIndex","blog/:slug":"blogPost","*path":"notFound"},initialize(){$("#app").empty(),$("#app").append(p.$el),$("#app").append(u.$el),$("#app").append(g.$el),$("#app").append(r.$el),$("#app").append(c.$el),$("#app").append(b.$el)},_showView(e){e?.$el&&($("#app > div").not(e.el).hide(),e.$el.show())},home(){p.collection.reset(R),this._showView(p)},about(){this._showView(u.render())},help(){this._showView(g.render())},blogIndex(e=1){r.collection.reset(h),r.setPage(e),this._showView(r)},blogPost(e){if(c.collection.reset(h),!c.showBySlug(e)){this.notFound();return}this._showView(c)},notFound(){this._showView(b.render())}});new M;Backbone.history.start();$(function(){});
