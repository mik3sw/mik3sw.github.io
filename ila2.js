var step = 0;

const questions = ["È vero che conosci tutti dallo stesso tempo? (Michi, Ale, Ste, Simo)",
                   "Ti piace leccare gli alluci delle persone?",
                   "È vero che sei ludopatica",
                   "Fai ridere simone per continuare",
                   "Tra di noi si nasconde un omofobo?",
                   "Se ti dovessero tirare della farina in faccia moriresti?",
                   "\"Mi stavi cercando ma hai sbagliato strada. Non lo so come mai. Ti amo ____ proprio non ti sopporto\"",
                   "Fatti uno shot di tequila per proseguire",
                   "Ramarro marrone è il tuo scioglilingua preferito?",
                   "È vero che sei gobba?",
                   "È vero che sei stata ingiustamente truffata su instagram facendo BuZnEs?",
                   "Non ho mai obbligato i miei amici ad aspettarmi fino alle 3:30 di notte perchè sono una pussy e non reggo l'alcool",
                   "\"Ce n'est pas posible\" Chi l'ha detto?",
                   "Qual è la massa del sole?",
                   "Sei la nostra lesbo-celiaca preferita?"
                ]
var q = questions[0]

document.getElementById("domanda").innerHTML = q


const answers = [false, true, true, "sbrumma", true, true, "però", "tequila", false, true, true, false, "michele", false, false];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

function handleClick2(){
    
    if(document.getElementById("f1").checked){
        document.getElementById("v1").checked = false
    }
    checkAnswer(document.getElementById("v1").checked, document.getElementById("f1").checked)
}

function handleClick(){   
    if(document.getElementById("v1").checked){
        document.getElementById("f1").checked = false
    }
    checkAnswer(document.getElementById("v1").checked, document.getElementById("f1").checked)
}


async function checkAnswer(v, f){
    if(answers[step]==true){
        if(v){
            console.log("Risposta esatta " + step + " " + answers[step]);
            step += 1;
            document.getElementById("domanda").innerHTML = "Risposta esatta!";
            await sleep(1000);
            document.getElementById("domanda").innerHTML = questions[step];
            document.getElementById("f1").checked = false;
            document.getElementById("v1").checked = false;

        }
        if(f){
            console.log("Risposta errata " + step + " " + answers[step]);
            step = 0;
            document.getElementById("domanda").innerHTML = "NO! Ricomincia";
            await sleep(1000);
            document.getElementById("domanda").innerHTML = questions[step]
            document.getElementById("f1").checked = false
            document.getElementById("v1").checked = false
        }
    }

    else if(answers[step]==false){
        if(f){
            console.log("Risposta esatta " + step + " " + answers[step]);
            step += 1;
            document.getElementById("domanda").innerHTML = "Risposta esatta!";
            await sleep(1000);
            document.getElementById("domanda").innerHTML = questions[step]
            document.getElementById("f1").checked = false
            document.getElementById("v1").checked = false
        }
        if(v){
            console.log("Risposta errata " + step + " " + answers[step])
            step = 0;
            document.getElementById("domanda").innerHTML = "NO! Ricomincia";
            await sleep(1000);
            document.getElementById("domanda").innerHTML = questions[step]
            document.getElementById("f1").checked = false
            document.getElementById("v1").checked = false
        }
    }
    else if((typeof answers[step])=="string"){
        if(answers[step]==document.getElementById("mytext").value){
            console.log("Risposta esatta " + step + " " + answers[step]);
            step += 1;
            document.getElementById("domanda").innerHTML = "Risposta esatta!";
            await sleep(1000);
            document.getElementById("domanda").innerHTML = questions[step]
            document.getElementById("f1").checked = false
            document.getElementById("v1").checked = false
            document.getElementById("mytext").value = ""
        }
        else{
            console.log("Risposta errata " + step + " " + answers[step])
            step = 0;
            document.getElementById("domanda").innerHTML = "NO! Ricomincia";
            await sleep(1000);
            document.getElementById("domanda").innerHTML = questions[step]
            document.getElementById("f1").checked = false
            document.getElementById("v1").checked = false
            document.getElementById("mytext").value = ""
        }
    }
    

    if((typeof answers[step])=="string"){
        document.getElementById("textbox").style.display = "block";
        document.getElementById("checkboxes").style.display = "none";
    }
    else if(answers[step]==true || answers[step]==false){
        document.getElementById("checkboxes").style.display = "block";
        document.getElementById("textbox").style.display = "none";
    }
    else{
        document.getElementById("domanda").innerHTML = "Fine";
        document.getElementById("checkboxes").style.display = "none";
        document.getElementById("textbox").style.display = "none";
        await sleep(2000);

        document.getElementById("domanda").innerHTML = "<i>Sul bugliettino due coordinate possono bastarti...<br>Scopri dove, ma ancora non ci puoi andare...<br>Non fare domande, il tempo giusto arriverà e potrai goderti ciò che cerchi da tempo.<br><br>Buon compleanno.</i>";
        document.getElementById("domanda").style.fontSize = "4rem";
    }

}
