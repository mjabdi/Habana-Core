"use strict";

document.addEventListener("DOMContentLoaded", function(el) {

    document.getElementById("submit-airdrop-form").addEventListener("click", function (event){
        event.preventDefault(); 
        submitairdropform(event);


   }, false)
});


function submitairdropform (e) {
    var name = document.getElementById('ad_name').value;
    var email = document.getElementById('ad_email').value;
    var address = document.getElementById('ad_address').value;
    const data = {name, email, address}

    if (name && email && address)
    {
        sendData(data)

    }else
    {
        document.getElementById("alert-error-airdrop").style.display = "block";
        document.getElementById("alert-success-airdrop").style.display = "none";
    }


}


// async function sendData2(data) {
//     try{
//         const response = await axios.post(`https://habanatoken.com/api/email/registerairdrop`, JSON.stringify(data));
//         console.log(response)
//     }
//     catch(err)
//     {
//         console.error(err)
//     }

 
// }

function sendData(data){
    $.ajax({
            type: "POST",
            url: "https://habanatoken.com/api/email/registerairdrop",
            data: JSON.stringify(data),// now data come in this function
            contentType: "application/json; charset=utf-8",
            crossDomain: false,
            dataType: "json",
            success: function (data, status, jqXHR) {

                 document.getElementById('ad_name').value = "";
                 document.getElementById('ad_email').value = "";
                 document.getElementById('ad_address').value = "";            

                 document.getElementById("alert-error-airdrop").style.display = "none";
                 document.getElementById("alert-success-airdrop").style.display = "block";

            },

            error: function (jqXHR, status) {
                // error handler
                console.error(jqXHR);
                console.error('fail' + status.code);
            }
         });
   }



