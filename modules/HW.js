exports.HW = async function(mode){

    switch(mode){

        case('add'):

        async function HWadd(){

            let authid = msg.author.id;
            var HWlist = [];
            let i = 1;
            const authfilter = m => m.author.id === authid;

            msg.channel.send('Key: ');
            let collector = msg.channel.createMessageCollector(authfilter, {maxMatches: 2});

            collector.on('collect', m => {
                if (m.content == 'cancel'){
                    collector.stop();
                    msg.channel.send('cancelled successfully'); 
                    HWlist = [];
                    //console.log(HWlist);
                    i = 0;
                    return
                }
                        
                console.log(`collected ${m.content}|[${i}]`);
                i++;
                HWlist.push(m.content);
                console.log(`HWlist = [${HWlist}]`);
                if (i == 2){
                    msg.channel.send('conetent: '); 
                }
            });

            collector.on('end', collection => {
                console.log(`colectionsize :[${collection.size}]`);
                console.log(`HWlist after collection= [${HWlist}]`);
            });
        }
        HWadd();



    }


}


                //console.log(`after collector end : ${HWlist}`);