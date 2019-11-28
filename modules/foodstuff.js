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

                //console.log('got here');
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

            }

        }
        menu = menu.sort(function(a,b){
            
            aDate=Date.parse(a.split('|')[0]);
            
            bDate=Date.parse(b.split('|')[0]);

            return aDate-bDate;
        })
        console.log(menu.length)

            //Dash per day
            let menuLength=menu.length;
            for (let n = 3; n<=menuLength;n+=4){    
                console.log(n)
                menu.splice(n,0,`----------------------------------------------`);
            }
            console.log("after for")
            // /Dash per day

    }else if(modeselec == '2'){
    	let foodDay = 0;
        menu = [];
            for (let x in rawfood){
                let foodTime = rawfood[x].datum.slice(0,10);
                menu.push(`${foodTime}|${rawfood[x].gerichtname}`);
            }
            menu = menu.sort(function(a,b){
            
            aDate=Date.parse(a.split('|')[0]);
            
            bDate=Date.parse(b.split('|')[0]);

            return aDate-bDate;
        })
                    
                            //Dash per day
                for (let n = 3; n<menu.length;n+=4){    
                    console.log("test2")
                    menu.splice(n,0,`----------------------------------------------`);
                }
                // /Dash per day
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
    
    if (res.status!=200){
        return ["HTTP STATUS CODE "+res.status];
    }

    let rawfood = await res.json();

    // let rawfood = await JSON.parse(res);
    // console.log(res.status==200);
    // console.log(rawfood);
    await foodProcessing(rawfood,modeselec);
    return menu;
};

