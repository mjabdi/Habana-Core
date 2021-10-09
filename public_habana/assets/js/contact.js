document.addEventListener("DOMContentLoaded", function(el) {
    var flipdown = new FlipDown(1635999711, {
        theme: 'light' // or dark
    });
    flipdown.start();

    document.getElementById("submit-contact-form").addEventListener("click", function (event){
        event.preventDefault(); 
        submitcontactform(event);


   }, false)
});


function submitcontactform (e) {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;
    const data = {name, email, phone, subject, message}

    if (name && email && phone && subject && message)
    {
        sendEmailData(data)

    }else
    {
        document.getElementById("alert-error-contact").style.display = "block";
        document.getElementById("alert-success-contact").style.display = "none";
    }


}

function sendEmailData(data){
    $.ajax({
            type: "POST",
            url: "https://habanatoken.com:9090/api/email/sendemail",
            data: JSON.stringify(data),// now data come in this function
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {

                 document.getElementById('name').value = "";
                 document.getElementById('email').value = "";
                 document.getElementById('phone').value = "";
                 document.getElementById('subject').value = "";
                 document.getElementById('message').value = "";
            

                 document.getElementById("alert-error-contact").style.display = "none";
                 document.getElementById("alert-success-contact").style.display = "block";

            },

            error: function (jqXHR, status) {
                // error handler
                console.error(jqXHR);
                console.error('fail' + status.code);
            }
         });
   }



