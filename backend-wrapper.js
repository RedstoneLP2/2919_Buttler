const food = require('./modules/foodstuff.js');
const HW = require('./modules/HW.js');

let args = process.argv;
args.splice(0,2);
console.log(args)
switch(args[0]){
    case ('food'):
        async function servefood(modeselec){
   	        let sfood = await food.sendforfood(modeselec);
       	    console.log(sfood);
        }

        if(args[1] == '--help'){
            console.log('!food: +0 == Today | +1 == This Week | +2 == AllFood');
        }else if(args[1] == undefined){
            servefood('udf');
        }else{
            servefood(args[1]);
        }
        break;
    case('echo'):
        console.log(args[1]);
        break;

};
