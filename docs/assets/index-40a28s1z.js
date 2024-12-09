(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();const d="https://api.themoviedb.org/3",l="9274b6bb9987cfeee16d49f4d20492c0",h=async(e=1)=>{try{return(await(await fetch(`${d}/movie/now_playing?api_key=${l}&language=es-ES&page=${e}`)).json()).results}catch(t){console.error("Error getting the films:",t)}},f=async(e,t=1)=>{try{const r=await(await fetch(`${d}/search/movie?api_key=${l}&query=${e}&language=es-ES&page=${t}`)).json();return console.log(r),r.results}catch(s){console.error("Error getting the films; ",s)}},w=async()=>{try{return(await(await fetch(`${d}/genre/movie/list?api_key=${l}&language=es-ES`)).json()).genres}catch(e){console.error("Error fetching genres: ",e)}},E=async(e,t=1)=>{try{return(await(await fetch(`${d}/discover/movie?api_key=${l}&with_genres=${e}&language=es-ES&page=${t}`)).json()).results}catch(s){console.error("Error fetching films by genre: ",s)}},b=async e=>{try{return await(await fetch(`${d}/movie/${e}?api_key=${l}&language=es-ES`)).json()}catch(t){console.error("Error fetching info of movie: ",t)}},u="/api",g=async(e,t)=>(await(await fetch(`${u}/${t}`)).json()).some(o=>o.id===e),$=async()=>await(await fetch(`${u}/favorites`)).json(),B=async e=>{if(await g(e.id,"favorites")){alert("This movie is already in your favorites!");return}return await(await fetch(`${u}/favorites`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json()},k=async()=>await(await fetch(`${u}/watchlist`)).json(),L=async e=>{if(await g(e.id,"watchlist")){alert("This movie is already in your watchlist!");return}return await(await fetch(`${u}/watchlist`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json()};let a=1;window.onload=()=>{h(a).then(e=>{console.log("Most recent films"+e),c(e)}),w().then(e=>{console.log("Genres",e),j(e)})};const I=document.getElementById("comeBackHere"),y=()=>{I.scrollIntoView({behavior:"smooth"})},M=()=>{a==1?a=a:a--,h(a).then(e=>{c(e)})},S=()=>{a++,h(a).then(e=>{c(e)})},T=document.getElementById("loadMoreFilmsButtonPreviousPage");T.addEventListener("click",()=>{M(),y()});const x=document.getElementById("loadMoreFilmsButtonNextPage");x.addEventListener("click",()=>{S(),y()});document.getElementById("favouritesLink").addEventListener("click",()=>{$().then(e=>{console.log("Favorites:",e),c(e)})});document.getElementById("watchlistLink").addEventListener("click",()=>{k().then(e=>{console.log("Watchlist:",e),c(e)})});document.getElementById("shrekButton").addEventListener("click",()=>{document.body.classList.toggle("shrek-mode");const e=document.getElementById("shrekImage");document.body.classList.contains("shrek-mode")?e.style.display="block":e.style.display="none"});const c=e=>{const t=document.querySelector(".movies-container");t.innerHTML="";const s=document.createElement("div");s.classList.add("row","justify-content-center"),e.forEach(o=>{const n=`
      <div class="col-md-4 col-lg-3 mb-4 d-flex align-items-stretch">
        <div class="card h-100 rounded shadow hover-shadow d-flex flex-column movie-card" data-id="${o.id}">
          <img src="https://image.tmdb.org/t/p/w500${o.poster_path}" class="card-img-top rounded" alt="${o.title}">
          <div class="card-body">
            <h5 class="card-title fw-bold">${o.title}</h5>
            <p class="card-text">${o.overview}</p>
            <div class="rating-circle">
            <span class="rating-text">${o.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    `;s.innerHTML+=n}),t.appendChild(s),document.querySelectorAll(".movie-card").forEach(o=>{o.addEventListener("click",n=>{const i=n.currentTarget.getAttribute("data-id");b(i).then(p=>{console.log(p),P(p)})})})},P=e=>{const t=document.querySelector(".movie-details-container");document.querySelector(".movies-container"),t.innerHTML=`
    <div class="row">
      <div class="col-md-4">
        <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.title}" class="img-fluid rounded shadow-lg">
      </div>
      <div class="col-md-8">
        <h2 class="fw-bold mb-3">${e.title}</h2>
        <p class="text-muted"><strong>Release Date:</strong> ${e.release_date}</p>
        <p class="lead mb-4">${e.overview}</p>
        <button class="btn btn-outline-success btn-sm add-to-favorites">Add to Favorites</button>
        <button class="btn btn-outline-primary btn-sm add-to-watchlist">Add to Watchlist</button>
        <div class="genres">
          <h5 class="fw-bold">Genres:</h5>
          <p>${e.genres.map(o=>o.name).join(", ")}</p>
        </div>

        <div class="row">
          <div class="col-6">
            <button id="goBackButton" class="btn btn-primary w-100">Go Back</button>
          </div>
          <div class="col-6">
            <a href="https://www.themoviedb.org/movie/${e.id}" target="_blank" class="btn btn-info w-100">More on TMDB</a>
          </div>
        </div>
      </div>
    </div>
  `,t.style.display="block",t.scrollIntoView({behavior:"smooth"}),document.getElementById("goBackButton").addEventListener("click",_);const s=document.querySelector(".add-to-favorites"),r=document.querySelector(".add-to-watchlist");s.addEventListener("click",()=>{B(e)}),r.addEventListener("click",()=>{L(e)})},_=()=>{const e=document.querySelector(".movie-details-container"),t=document.querySelector(".movies-container");e.style.display="none",t.style.display="block",t.scrollIntoView({behavior:"smooth"})},j=e=>{const t=document.getElementById("genresDropdown");t.innerHTML="",e.forEach(s=>{const r=document.createElement("a");r.classList.add("dropdown-item"),r.textContent=s.name,r.href="#",r.dataset.genreId=s.id,r.addEventListener("click",o=>{o.preventDefault(),E(s.id).then(n=>{console.log(`Movies in genre ${s.name}`,n),c(n)})}),t.appendChild(r)})},v=document.getElementById("searchFilmButton"),m=document.getElementById("searchFilmInput");v.addEventListener("click",()=>{console.log(m.value.trim()),m&&f(m.value.trim()).then(e=>{console.log(e),c(e)})});m.addEventListener("keypress",e=>{e.key==="Enter"&&(e.preventDefault(),v.click())});
