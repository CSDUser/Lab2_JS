/**
 * Created by d on 19.12.2016.
 */
var fs = require("fs");
re = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.)/;
re2 = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/ig;
var web;


function unique(arr) {
    var answer = [];
    nextInput:
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i];
            for (var j = 0; j < answer.length; j++) {
                if (answer[j] == str) continue nextInput;
            }
            answer.push(str);
        }
    return answer;
}

fs.open("access.log", "r", 0644, function(err, file_handle)
{
    if (!err)
    {
        var text = fs.readFileSync(file_handle, 'utf8');
        var ip2 = text.match(re2);
        var ip = unique(ip2);
        ip.sort();
        console.log('List of Ip :\n', ip);
        console.log('Amount of Ip: ',  ip.length, '\n');
        web = ip[0].split(re);
        console.log('Subnetwork:', web[1]);
        var j = 1;
        for(var i = 0; i < ip.length; i++){
            if(ip[i].startsWith(web[1]) == true){console.log('           ', ip[i]);}
            else{
                web = ip[i].split(re);
                console.log('Subnetwork:' , web[1]);
                console.log('           ', ip[i]);
                j++;
            }
        }
        console.log('Amount of Subnetworks: ' , j);
    }
});