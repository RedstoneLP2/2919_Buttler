const fetch = require('node-fetch');
const dotenv = require('dotenv').config({ path:'config/env/.env'});

let menu = [];
function foodProcessing(rawfood,modeselec){

    let now_jso = new Date().toJSON().slice(0,10);
    let now = new Date();
    
    
    
    // console.log(rawfood);
    // let jfood = JSON.parse(rawfood);
    console.log(modeselec);   

    if(modeselec == '0' || modeselec == 'udf'){

                console.log('got here');
        menu = [];
        for (let x in rawfood){

            let foodTime = rawfood[x].datum.slice(0,10);

            if (foodTime == now_jso){

                menu.push(rawfood[x].gerichtname);
            }
        }
    }else if(modeselec == '1'){

                menu = [];
        let datearr = [];

        while(now.getDay() > 1){

            now.setDate(now.getDate() -1);

        }

        let i = 0;

        while(now.getDay() < 6){

            datearr.push(now.toJSON().slice(0, 10))
            now.setDate(now.getDate() +1);
        }

        let foodDay = 0;
        for (let x in rawfood){

            let foodTime = rawfood[x].datum.slice(0,10);

            if (datearr.indexOf(foodTime) > -1){

                menu.push(`${foodTime}|${rawfood[x].gerichtname}`);
                

                //Dash per day
                foodDay=foodDay+1;
                //console.log(foodDay);
                if (foodDay==3){
                	foodDay=0;
                	menu.push(`----------------------------------------------`);
                }
                let prevFoodTime = foodTime;
                // /Dash per day
            }

        }
    }else if(modeselec == '2'){

                menu = [];
        for (let x in rawfood){

            menu.push(`${foodTime}|${rawfood[x].gerichtname}`);
        }
    }else{
        menu = 'No food Found'
    }
    return menu;
};



exports.sendforfood = async function(modeselec){

    const url = process.env.url
    const options = {
        headers: {
            'Accept': "application/json",
            'Authorization': `${process.env.apiauth}`
        }
    }
    let res = await fetch(url,options);
    let rawfood = await res.json();
    // let rawfood = await JSON.parse(res);

    //console.log(rawfood);
    await foodProcessing(rawfood,modeselec);
    return menu;
};

