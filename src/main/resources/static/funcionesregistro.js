function validar(){
    const usuario=document.getElementById('name');
    const email=document.getElementById('email');    
    const clave=document.getElementById('clave');
    const clave2=document.getElementById('clave2');
    const expReg=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

    if (usuario.value.length==0) {
        Swal.fire({
            title: 'Ingrese un Usuario',
            icon: 'error',
            confirmButtonText:'Ok',
        })
        // alert("Nombre no ingresado")
        usuario.focus()
        return 0;        
    }

    if (email.value.length==0) {
        Swal.fire({
            title: 'Ingrese un e-mail',
            icon: 'error',
            confirmButtonText:'Ok',
        })
        // alert("Tiene que escribir email")
        email.focus()
        return 0;        
    }

    if (expReg.test(email.value)==false) {
        Swal.fire({
            title: 'Ingrese un e-mail valido',
            icon: 'error',
            confirmButtonText:'Ok',
        })
        $("#email").val("");
        // alert("Tiene que escribir un email valido")
        email.focus()
        return 0;
        
    }

    if (clave.value.length==0) {
        Swal.fire({
            title: 'Ingrese una Contraseña',
            icon: 'error',
            confirmButtonText:'Ok',
        })
        // alert("Tiene que escribir una contraseña")
        clave.focus()
        return 0;
        
    }

    if (clave2.value.length==0) {
        Swal.fire({
            title: 'Debes confirmar la contraseña',
            icon: 'error',
            confirmButtonText:'Ok',
        })
        // alert("Tiene que confirmar la contraseña")
        clave2.focus()
        return 0;
        
    }

    if (clave.value!=clave2.value) {
        Swal.fire({
            title: 'Las contraseñas deben coincidir',
            icon: 'error',
            confirmButtonText:'Ok',
        })
        // alert("Las contraseñas deben coincidir")
        clave.focus();
        return 0;
        
    }

    var datos = {
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#clave").val(),
        // password2: $("#clave2").val(),

    };

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(datos),

        url: "http://140.238.187.245:8082/api/user/new",


        success: function (response) {
            $("#name").val("");
            $("#email").val("");
            $("#clave").val("");
            $("#clave2").val("");

            console.log(response);
            console.log("Se guardo correctamente");
            Swal.fire({
                title: 'Registro Exitoso',
                icon: 'success',
                confirmButtonText:'Ok',
            })
            // alert("Registro exitoso");
            // window.location.reload()

        },

        error: function (jqXHR, textStatus, errorThrown) {
            // window.location.reload()
            Swal.fire({
                title: 'No se guardo correctamente',
                icon: 'error',
                confirmButtonText:'Ok',
            })
            // alert("No se guardo correctamente");


        }
    }
    );

}

