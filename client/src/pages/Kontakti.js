import React from "react";
import "../assets/styles/kontakti.css";



export default function Kontakti(){
   return(
    <div class="layer">

    <div id="parallax-wrap" class="parallax-search" data-parallax="scroll"data-position="top"data-bleed="10" style="background-image: url('bottom-image-contact.jpg');">
        <div class="search-wraps">
            <h1>Kontakti</h1>
            <p>
               " Rr. Zejnel Salihu, Prishtinë Kosovo"
            </p>
            <p>
                " +383 43 922 224 "
            </p>
            <p> " info@dishdash.com"</p>
        </div>
    </div>
    <div class="contact-map" style="background-image: url('map.png');">
    <div class="container-map">
        <div class="inner">
           <div class="row">
              <div class="col-md-7 dim">
                <h2>Kontakti DishDash </h2>
                <p>
                Ne jemi gjithmonë të gatshëm të kontaktojmë me klientët dhe vizitorët tanë.             </p>
                
                <p></p>
                             
              </div>
              <div class="col-md-5 black">
              
                <div class="top30"></div>
              
                <form class="uk-form uk-form-horizontal forms has-validation-callback" id="forms" onsubmit="return false;">   
                <input type="hidden" value="contacUsSubmit" name="action" id="action"> </input>           
                 <input type="hidden" value="store" name="currentController" id="currentController">        </input>                  
                             
                
                                                                                
                   <div class="row top10">
                <div class="col-md-12">
                  <input placeholder="Emri" class="grey-fields full-width" data-validation="required" type="text" value="" name="name" id="name">    </input>
                           </div>
                </div>
                             
                                                                   
                             <div class="row top10">
                <div class="col-md-12">
                  <input placeholder="Email Adresa" class="grey-fields full-width" data-validation="email" type="text" value="" name="email" id="email">    </input>         </div>
                </div>
                             
                                                                   
                             <div class="row top10">
                <div class="col-md-12">
                  <input placeholder="Tel." class="grey-fields full-width" data-validation="required" type="text" value="" name="phone" id="phone">     </input>        </div>
                </div>
                             
                                                                   
                             <div class="row top10">
                <div class="col-md-12">
                  <textarea placeholder="Mesazhi" class="grey-fields full-width" name="message" id="message"></textarea>           
                    </div>
                </div>
                             
                             
                                           
                <div class="row top10">
                <div class="col-md-12 text-center">
                   <input type="submit" value="Dërgo" class="orange-button medium inline rounded"></input>
                </div>
                </div>
                             </form>
                
                
                               </div> 
           </div> 
        </div> 
     </div>
       </div>
    </div>

   );

}