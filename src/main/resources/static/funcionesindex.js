function validar2() {
    const email = document.getElementById('email');
    const clave = document.getElementById('clave');
  
    if (email.value.length == 0) {
    
      // alert("Ingrese un usuario")
      email.focus()
      Swal.fire({
        title: 'Ingrese un Usuario',
        icon: 'error',
        confirmButtonText:'Ok',
      })
      return 0;
    }
  
    if (clave.value.length == 0) {
      // alert("Ingrese una contraseña")
      Swal.fire({
        title: 'Ingrese una Contraseña',
        icon: 'error',
        confirmButtonText:'Ok',
      })

      clave.focus()
      return 0;
  
    }
  
    let credentials = {
      email: $("#email").val(),
      clave: $("#clave").val(),
    };
  
    $.ajax({
      type: 'GET',
      contentType: "application/json; charset=utf-8",
      dataType: 'JSON',
      
  
      url: "http://140.238.187.245:8082/api/user/" + credentials.email + "/" + credentials.clave,
      // url: "http://140.238.187.245:8081/api/user/wilmerandressr@hotmail.com/123",
  
      success: function (response) {
        
        console.log(response);
        if (response.name == 'NO DEFINIDO') {
          Swal.fire({
            title: 'Usuario o clave incorrectos!',
            icon: 'error',
            confirmButtonText:'Ok',
          });
          // alert('Usuario o clave incorrectos!');
          $("#email").val("");
          $("#clave").val("");
          return;
        }
        else if (response.type == 'COORD') {
          Swal.fire({
            title: 'Bienvenid@ !' ,
            text:response.name,
            icon: 'success',
          });
          $("#email").val("");
          $("#clave").val("");
          location="admin.html";
          return;
        }
        
        else if (response.name == null) {
          Swal.fire({
            title: 'Usuario o clave incorrectos!',
            icon: 'error',
            confirmButtonText:'Ok',
          });
          // alert('Usuario o clave incorrectos!');
          $("#email").val("");
          $("#clave").val("");
          return;

        }
        else{
          
        console.log(response);
        console.log("Bienvenido");
        Swal.fire({
          title: 'Acabas de iniciar sesion ',
          text:  response.name,
          icon: 'success',
          confirmButtonText:'Ok',
        });
        // alert("Acabas de iniciar sesion");

        $("#email").val("");
        $("#clave").val("");

      }
      },
  
      error: function (jqXHR, textStatus, errorThrown) {
        
        alert("Usuario no registrado");
      }
      
    }
    );
  }
