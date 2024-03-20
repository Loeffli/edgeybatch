 /* 
const form = '<h2>Contact Us</h2><div class="p-4"><form id="myform">  <div class="form-group">    <label for="myform_name">Name</label>    <input type="text" name="firstName" class="form-control" id="myform_name" placeholder="Your Name">  </div>  <div class="form-group">    <label for="myform_email">Email address:</label>    <input type="text" name="lastName" class="form-control" id="myform_email"  placeholder="Your email">  </div>  <div class="form-group"><label for="myform_message">Message</label>    <textarea class="form-control" name="ASV" id="myform_message" rows="3"></textarea>  </div>    <button type="submit" class="btn btn-primary">Submit</button></form></div>';
let $wrapper = document.querySelector(".admission-form");
$wrapper.style.backgroundColor = "#eeeeee";

const $formular = document.createElement('div');
$formular.id = "Formular";
$formular.innerHTML = form;
$wrapper.append($formular);


function submitForm(e) {
    e.preventDefault();
   
   var myform =    document.getElementById("myform");
    
    var formData = new FormData(myform);

    fetch("https://main--edgeybatch--loeffli.hlx.page/clinic/clinic-requests", {
      method: "POST",
      headers: {"Content-Type": "application/json"},          
      body: {"data": {"firstName":"b","lastName":"bb","drNumber":"bbb","ASV":"bbbb"}}
    })
      .then(response => {
      if (!response.ok) {
        throw new Error('network returns error');
      }
      return response.json();
    })
      .then((resp) => {
        let respdiv = document.createElement("pre");
        respdiv.innerHTML = JSON.stringify(resp, null, 2);
        myform.replaceWith(respdiv);
        console.log("resp from server ", resp);
      })
      .catch((error) => {
        // Handle error
        console.log("error ", error);
      });
  }
  
  var myform = document.getElementById("myform");
  
  myform.addEventListener("submit", submitForm);

  */



  fetch("https://main--edgeybatch--loeffli.hlx.page/clinic/clinic-requests", {
  method: "POST",
  headers: { "Content-type": "application/json" },
  body: JSON.stringify({"firstName": "e", "lastName": "Fix the bugs", "ASV": "1231213"})
});

alert("jkj");