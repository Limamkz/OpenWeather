const API_KEY = "98eb7397a091b162868f85e5127c6ccc";

const resultado = document.getElementById("resultado");


async function buscarClima(){

const cidade = document.getElementById("cidade").value.trim();


if(!cidade){

resultado.innerHTML="<p>Digite uma cidade válida</p>";
return;

}


resultado.innerHTML="<p>Consultando clima...</p>";


try{


const url =
`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${API_KEY}&units=metric&lang=pt_br`;


const resposta = await fetch(url);


const dados = await resposta.json();


if(!resposta.ok){

throw new Error(dados.message || "Erro ao buscar cidade");

}



resultado.innerHTML=`

<div class="weather-card">

<h2>${dados.name}</h2>

<img src="https://openweathermap.org/img/wn/${dados.weather[0].icon}@4x.png">


<div class="weather-info">

<div class="info">
Temperatura: ${dados.main.temp.toFixed(1)}°C
</div>


<div class="info">
Sensação térmica: ${dados.main.feels_like.toFixed(1)}°C
</div>


<div class="info">
Umidade: ${dados.main.humidity}%
</div>


<div class="info">
${dados.weather[0].description}
</div>

</div>

</div>

`;



}catch(error){

resultado.innerHTML=`<p>${error.message}</p>`;

}

}


document.getElementById("cidade")
.addEventListener("keypress",e=>{

if(e.key==="Enter"){
buscarClima();
}

});