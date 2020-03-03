(function() {
    Array.prototype.forEach.call(
      document.querySelectorAll("form input[type=password]"),
      function(pass) {
        var form = pass.closest("form");
        var users = Array.prototype.filter.call(
          form.querySelectorAll("input"),
          function(input) {
            return input.type == "text" || input.type == "email";
          }
        ); 
  
        function getOffsets(element) {
          for ( 
            var lx = 0, ly = 0;
            element != null;
            lx += element.offsetLeft, ly += element.offsetTop, element = element.offsetParent
            
          );
          return { x: lx, y: ly };
        }
  
        if (users.length == 1) {
          var user = users[0];
          var image = document.createElement("IMG");
          var positionFeilds = getOffsets(user);
          var topButton = positionFeilds.y + (user.offsetHeight / 2)-8;
          var leftButton = positionFeilds.x + user.offsetWidth - 30;
          image.src="https://app.vaultilo.com/favicon.ico";
          image.height="16";
          image.width="16";
          image.style.cssText =
            "position:absolute;top:" +
            topButton +
            "px;left:" +
            leftButton +
            "px;display:block; z-index:1000;border: none;";
  
          image.addEventListener(
            "click",
            function() {
             //Handle the icon click in the form 
              
            },
            false
          );
  
          document.body.appendChild(image);
      
          var eventMethod = window.addEventListener
            ? "addEventListener"
            : "attachEvent";
          
          
          chrome.runtime.onMessage.addListener(function(
            message,
            sender,
            respond
          ) {
            if (message.from == "ext") {
              if (message.action == "do_fill") {
            
                user.value = message.user;
                pass.value = message.pass;
  
                user.style.backgroundColor = "#fafafa";
                pass.style.backgroundColor = "#fafafa";
              }
            }
          });
          
        }
      }
    );
  })();
  