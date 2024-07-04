const mainurl = "https://latest.currency-api.pages.dev/v1/currencies/eur.json";

const dropdown = document.querySelectorAll(".dropdown select");

const updateflag = (element) =>{
    let code = element.value;
    let idd = element.name;
    let imgc = document.querySelector(`.${idd}Img`);
    imgc.src = `https://flagsapi.com/${code}/flat/64.png`
}
for(let item of dropdown){
    for(let code in countryList){
        let newoptn = document.createElement("option");
        newoptn.innerText = code;
        newoptn.value = countryList[code];
        item.append(newoptn);
        if(item.name == "from" && code == "USD"){
            newoptn.selected = "slected";
        }
        if(item.name == "to" && code=="INR"){
            newoptn.selected = "slected";
        }
    }
    item.addEventListener("change" , (evt) => {
        updateflag(evt.target);
    });
}


const btn = document.querySelector("button");

btn.addEventListener("click" , async(evt) =>{
    evt.preventDefault();
    let amt = document.querySelector(".amount input");
    let amtval = amt.value;
    if(amtval=="" || amtval<=0){
        amtval = 1;
        amt.value = "1";
    }
        
    let f1 = document.querySelector("#froms");
    let f2 = f1[f1.selectedIndex].text;
    let t1 = document.querySelector("#tos");
    let t2 = t1[t1.selectedIndex].text;
    f2 = f2.toLowerCase();
    t2 = t2.toLowerCase();
    //console.log(amtval);
    let exg1 ,exg2;
    let response = await fetch(mainurl);
    let data = await response.json();
    //console.log(data.eur);
    for(let val in data.eur){
        //console.log(val , f2 , t2);
        if(val==f2){
            exg1 = data.eur[val];
        }
        if(val==t2){
            exg2 = data.eur[val];
        }
    }
    let msgbox = document.querySelector(".msg");
    msgbox.innerText = `${amtval} ${f2.toUpperCase()} = ${amtval*(exg2/exg1).toFixed(3)} ${t2.toUpperCase()}`;

});


