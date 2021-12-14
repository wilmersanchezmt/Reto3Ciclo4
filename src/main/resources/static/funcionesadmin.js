'use strict'
function mostrartablausuarios() {
    
    $("#miResultadomensajes1").html("");
    $("#miResultadomensajes").html("");
    $.ajax({
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        url: "http://140.238.187.245:8082/api/user/all",
        type: 'GET',
        // data: JSON.stringify(datos),

        success: function (response10) {
            console.log("mostrando tabla");
            console.log(response10);
            var misItems3 = response10;
            $("#miResultadomensajes1").html("");
            $("#miResultadomensajes1").append("<h1>" + "USUARIOS" + "</h1>");
            $("#miResultadomensajes1").append('<td class= "botonadd" ><button onclick="btnAbrirFormNuevoUserr()"  class="button3" id="button3" name ="button3">Agregar</button></td>');
            $("#miResultadomensajes1").append("<tr>");
            $("#miResultadomensajes1").append("<td>" + "ID" + "</td>");
            $("#miResultadomensajes1").append("<td>" + "IDENTIFICACIÓN" + "</td>");
            $("#miResultadomensajes1").append("<td>" + "NAME" + "</td>");
            $("#miResultadomensajes1").append("<td>" + "DIRECCIÓN" + "</td>");
            $("#miResultadomensajes1").append("<td>" + "CELULAR" + "</td>");
            $("#miResultadomensajes1").append("<td>" + "EMAIL" + "</td>");
            $("#miResultadomensajes1").append("<td>" + "PASSWORD" + "</td>");
            $("#miResultadomensajes1").append("<td>" + "ZONA" + "</td>");
            $("#miResultadomensajes1").append("<td>" + "TIPO" + "</td>");
            $("#miResultadomensajes1").append("</tr>");

            misItems3.forEach(function (item) {
                // console.log("cargando item ");
                // console.log(item); {
                $("#miResultadomensajes").append("<tr>");
                $("#miResultadomensajes").append("<td>" + item.id + "</td>");
                $("#miResultadomensajes").append("<td>" + item.identification + "</td>");
                $("#miResultadomensajes").append("<td>" + item.name + "</td>");
                $("#miResultadomensajes").append("<td>" + item.address + "</td>");
                $("#miResultadomensajes").append("<td>" + item.cellPhone + "</td>");
                $("#miResultadomensajes").append("<td>" + item.email + "</td>");
                $("#miResultadomensajes").append("<td>" + item.password + "</td>");
                $("#miResultadomensajes").append("<td>" + item.zone + "</td>");
                $("#miResultadomensajes").append("<td>" + item.type + "</td>");
                console.log("dato que enviaremos user");
                console.log(typeof (item.id));

                $("#miResultadomensajes").append('<td><button onclick="borrarUsuario(' + item.id + ')"  class="button1">  Eliminar </button></td>');
                $("#miResultadomensajes").append('<td><button onclick="btnAbrirFormNuevoUserr2(' + item.id + ')""  class="button2"> Editar </button></td>');
                $("#miResultadomensajes").append("</tr>");
                // }

            });
        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
///////// validar si el usuario existe ////
///////////////////////////////////////////
function validarusuario() {
    var elemento2 = {
        email: $("#email").val(),
    };
    console.log("email para validar si ya esta =>");
    console.log(elemento2);

    $.ajax({
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        url: "http://140.238.187.245:8082/api/user/emailexist/" + elemento2.email,
        type: 'GET',

        success: function (response10) {
            console.log("respuest de validar email");
            console.log(response10);
            if (response10 == true) {
                alert(' El email ya existe!');
                return 0;
            } else {
                // console.log("email no existe");
                // alert('email no existe!');
                return (registroUsuarios());
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

            // registroUsuarios();
        }
    });
}

//////////  Registro Usuarios ///////////
function registroUsuarios() {
    var elemento1 = {
        id: $("#id").val(),
        identification: $("#identification").val(),
        name: $("#name").val(),
        address: $("#address").val(),
        cellPhone: $("#cellPhone").val(),
        email: $("#email").val(),
        password: $("#clave").val(),
        zone: $("#zone").val(),
        type: $("#type").val(),
    }

    var dataToSend6 = JSON.stringify(elemento1);
    //JSON= JavaScript Object Notation
    $.ajax({
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        url: "http://140.238.187.245:8082/api/user/new",
        type: 'POST',
        data: dataToSend6,

        success: function (response5) {
            console.log("respuesta de creacion");
            console.log(response5);
            alert('Usuario Creado!');
            return (cancelarPopup());
        },
        error: function (jqXHR, textStatus, errorThrown) {}
    });
    return (mostrartablausuarios());
}
///////// obtener usuario ////////
function obtenerUsuario(idItem2) {
    console.log(idItem2)
    $.ajax({
        dataType: 'json',
        data: {
            idItem2
        },
        url: "http://140.238.187.245:8082/api/user/all",
        type: 'GET',
        success: function (response8) {
            console.log("traemos todos los ITEM")
            console.log(response8);
            var misItems4 = response8;
            console.log(misItems4);
            misItems4.forEach(function (item) {

                console.log("id item en Db =>");
                console.log(item.id);

                console.log("id item a busacar =>");
                console.log(idItem2);
                if (item.id == idItem2) {
                    console.log("ingresamos");
                    $("#popup_user").html("");
                    $("#id2").val(item.id);
                    console.log(item.id);
                    $("#identification2").val(item.identification);
                    $("#name2").val(item.name);
                    $("#address2").val(item.address);
                    $("#cellPhone2").val(item.cellPhone);
                    $("#email2").val(item.email);
                    $("#zone2").val(item.zone);
                    $("#clave2").val(item.password);
                    $("#type2").val(item.type);
                };
                console.log("no es item");
            });

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
/////////// editar usuario  /////////
function actualizarusuario() {
    var elemento5 = {
        id: $("#id2").val(),
        identification: $("#identification2").val(),
        name: $("#name2").val(),
        address: $("#address2").val(),
        cellPhone: $("#cellPhone2").val(),
        email: $("#email2").val(),
        password: $("#clave2").val(),
        zone: $("#zone2").val(),
        type: $("#type2").val(),
    }
    console.log(elemento5);
    var dataToSend = JSON.stringify(elemento5);
    //JSON= JavaScript Object Notation
    $.ajax({
        dataType: 'json',
        data: dataToSend,
        contentType: 'application/json',
        url: "http://140.238.187.245:8082/api/user/update",
        type: 'PUT',

        success: function (response9) {
            console.log(response9);
            alert('Usuario Actualizado!');
            cancelarPopup2();
        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
    return (mostrartablausuarios());
}

//////   Borrar usuarios  ///////
function borrarUsuario(iduser) {
    var elemento5 = {
        id: iduser
    };
    // console.log("elemento 5 .id  =>");
    // console.log(elemento5.id);
    var dataToSend = JSON.stringify(elemento5.id);
    // console.log("JSON a enviar  =>");
    // console.log(dataToSend);
    //JSON= JavaScript Object Notation
    $.ajax({
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        // data: dataToSend,
        url: "http://140.238.187.245:8082/api/user/" + dataToSend,
        type: 'DELETE',

        success: function (response7) {
            console.log("recibiendo respuuesta");
        },
        error: function (jqXHR, textStatus, errorThrown) {}

    });
    return(mostrartablausuarios());
}
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// Tabla Productos/////////////
//////////////////////////////////////////////////////////////////////
/************mostrar tabla productos  *********** */
function traerInformacionProductos() {
    
    $("#miResultadomensajes1").html("");
    $("#miResultadomensajes").html("");
    console.log("iniciamos consulta a db");
    $.ajax({
        url: "http://140.238.187.245:8082/api/chocolate/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta.length);
            console.log("Bienvenido creando tabla productos elementos=>");
            // console.log(response10);
            // var misItems3 = response10;
            $("#miResultadomensajes1").html("");
            $("#miResultadomensajes1").append("<h1>" + "PRODUCTOS" + "</h1>");
            $("#miResultadomensajes1").append('<td class= "botonadd"><button onclick="btnAbrirFormProd()"  class="button4" id="button4">  Agregar </button></td>');
            $("#miResultadomensajes1").append("<tr>");
            $("#miResultadomensajes1").append("<td>" + "REFERENCIA" + "</td>");
            $("#miResultadomensajes1").append("<td>" + "CATEGORIA" + "</td>");
            $("#miResultadomensajes1").append("<td>" + "DESCRIPCIÓN" + "</td>");
            $("#miResultadomensajes1").append("<td>" + "DISPONIBILIDAD" + "</td>");
            $("#miResultadomensajes1").append("<td>" + "PRECIO" + "</td>");
            $("#miResultadomensajes1").append("<td>" + "CANTIDAD" + "</td>");
            $("#miResultadomensajes1").append("<td>" + "IMAGEN" + "</td>");
            $("#miResultadomensajes1").append("</tr>");
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta) {
    console.log("pintamos tabla");
    let myTable = "<table>";

    var i = 0;
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].reference + "</td>";
        myTable += "<td>" + respuesta[i].category + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        myTable += "<td>" + respuesta[i].availability + "</td>";
        myTable += "<td>" + respuesta[i].price + "</td>";
        myTable += "<td>" + respuesta[i].quantity + "</td>";
        myTable += "<td>" + respuesta[i].photography + "</td>";
        myTable += "<td > <button onclick='borrarProducto(" + JSON.stringify(respuesta[i].reference) + ")' class='button1'>Eliminar</button></td>";
        myTable += "<td> <button onclick='btnAbrirFormProdedit(" + JSON.stringify(respuesta[i].reference) + ")' class='button2'>Editar</button></td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#miResultadomensajes").html(myTable);
}

///////// validar si el producto existe ////
///////////////////////////////////////////
function validarproducto() {
    console.log("ingresamos a validar producto");
    var elemento2 = {
        reference: $("#reference").val(),
    };

    console.log("esto enviaremos a validar en url");
    console.log(elemento2.reference);
    var datostr = JSON.stringify(elemento2.reference);
    console.log("dato con stringitfy");
    console.log(datostr);
    $.ajax({
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        url: "http://140.238.187.245:8082/api/chocolate/" + elemento2.reference,
        type: 'GET',
        success: function (response10) {
            console.log("positivo respuest de consulta get con referencia");
            var datoresp = JSON.stringify(response10);
            console.log(datoresp);
            if (response10 == null) {
                console.log("no exixte por el if elemento");
                // alert('producto no existe no existe!');
                return (registroProducto());

            } else if (response10.reference == elemento2.reference) {
                alert(' El producto ya existe!');
                return 0;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {}

    });
    // console.log("negativo respuesta de consulta get con referencia y vamos a registrarlo ");
    // // console.log(response10);
    // return (registroProducto());
}

////////////////////  Agregar  Producto //////////////////////////////////
function registroProducto() {
    console.log("ingreasmos a crear producto");
    var elemento1 = {
        reference: $("#reference").val(),
        category: $("#category").val(),
        description: $("#description").val(),
        availability: $("#availability").val(),
        price: $("#price").val(),
        quantity: $("#quantity").val(),
        photography: $("#photography").val(),
    }

    var dataToSend7 = JSON.stringify(elemento1);
    //JSON= JavaScript Object Notation
    console.log("datos que se envian");
    console.log(dataToSend7);
    $.ajax({
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        url: "http://140.238.187.245:8082/api/chocolate/new",
        type: 'POST',
        data: dataToSend7,
        success: function (response2) {
            console.log("producto creado");
            console.log(response2);
            alert('Producto Creado!');
            return (cancelarPopupProd());
        },
        error: function (jqXHR, textStatus, errorThrown) {}
    });
    return (traerInformacionProductos());
}
///////// obtener usuario ////////
function editarProducto(idItem2) {
    console.log("recibimos para editar producto");

    console.log("esto enviaremos a validar en url");
    console.log(idItem2);

    $.ajax({
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        url: "http://140.238.187.245:8082/api/chocolate/all" ,
        type: 'GET',
        success: function (response8) {
            console.log("traemos todos los ITEM")
            console.log(response8);
            var misItems4 = response8;
            console.log(misItems4);
            
            misItems4.forEach(function (item) {
                console.log(item);
                if(item.reference == idItem2){
                    console.log("encontramos ITem");
                    console.log(item);
                    $("#reference2").val(item.reference);
                    $("#reference2").val(item.reference);
                    $("#category2").val(item.category);
                    $("#description2").val(item.description);
                    $("#availability2").val(item.availability);
                    $("#price2").val(item.price);
                    $("#quantity2").val(item.quantity);
                    $("#photography2").val(item.photography);
                };
            });
            
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
/////////// editar usuario  /////////
function actualizarproducto() {
    var elemento5 = {
        reference: $("#reference2").val(),
        category: $("#category2").val(),
        description: $("#description2").val(),
        availability: $("#availability2").val(),
        price: $("#price2").val(),
        quantity: $("#quantity2").val(),
        photography: $("#photography2").val(),
    }
    console.log(elemento5);
    var dataToSend = JSON.stringify(elemento5);
    //JSON= JavaScript Object Notation
    $.ajax({
        dataType: 'json',
        data: dataToSend,
        contentType: 'application/json',
        url: "http://140.238.187.245:8082/api/chocolate/update",
        type: 'PUT',

        success: function (response9) {
            console.log(response9);
            alert('Usuario Actualizado!');
            cancelarPopup2();
        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
    return (traerInformacionProductos());
}

//////   Borrar usuarios  ///////
function borrarProducto(item5) {
    $.ajax({
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        // data: dataToSend,
        url: "http://140.238.187.245:8082/api/chocolate/" + item5,
        type: 'DELETE',
        data: item5,

        success: function (response7) {
            console.log("recibiendo respuuesta despues de borrar");
            console.log(response7);
        },
        error: function (jqXHR, textStatus, errorThrown) {}

    });
    return (traerInformacionProductos());
}

//////////// funciones  popUP usuarios  /////////////
function btnAbrirFormNuevoUserr() {
    var overlay = document.getElementById("overlay");
    var popup = document.getElementById("popup_user");
    overlay.classList.add('active');
    popup.classList.add('active');
}

function btnAbrirFormNuevoUserr2(item) {

    console.log("traemos id para editar =>");
    console.log(item);
    var iditem = item;
    var overlay = document.getElementById("overlay2");
    var popup = document.getElementById("popup_user");
    overlay.classList.add('active');
    popup.classList.add('active');
    obtenerUsuario(iditem);
}

function cancelarPopup() {
    var popup_user = document.getElementById("popup_user");
    var overlay = document.getElementById("overlay");
    $("#id").val(""),
        $("#identification").val(""),
        $("#name").val(""),
        $("#address").val(""),
        $("#cellPhone").val(""),
        $("#email").val(""),
        $("#clave").val(""),
        $("#zone").val(""),
        $("#type").val(""),
        popup_user.classList.remove('active');
    overlay.classList.remove('active');
    return (mostrartablausuarios());
}

function cancelarPopup2() {
    var popup_user2 = document.getElementById("popup_user2");
    var overlay2 = document.getElementById("overlay2");
    $("#id2").val(""),
        $("#identification2").val(""),
        $("#name2").val(""),
        $("#address2").val(""),
        $("#cellPhone2").val(""),
        $("#email2").val(""),
        $("#clave2").val(""),
        $("#zone2").val(""),
        $("#type2").val(""),
        popup_user2.classList.remove('active');
    overlay2.classList.remove('active');
    mostrartablausuarios();
}


//////////// funciones  popUP productos  /////////////

function btnAbrirFormProd() {
    var overlay_prod = document.getElementById("overlayprod");
    var popup_prod = document.getElementById("popup_prod");
    overlay_prod.classList.add('active');
    popup_prod.classList.add('active');
}

function btnAbrirFormProdedit(idItem2) {
    
    var iditem = idItem2;
    var overlay_prod2 = document.getElementById("overlayprod2");
    var popup_prod2 = document.getElementById("popup_prod2");
    overlay_prod2.classList.add('active');
    popup_prod2.classList.add('active');
    console.log("abrimos Popup de edicion");
    editarProducto(iditem);
}

function cancelarPopupProd() {
    var overlay = document.getElementById("overlayprod");
    var popup_prod = document.getElementById("popup_prod");
    overlay.classList.remove('active');
    popup_prod.classList.remove('active');
    $("#reference").val(""),
        $("#category").val(""),
        $("#description").val(""),
        $("#availability").val(""),
        $("#price").val(""),
        $("#quantity").val(""),
        $("#photography").val(""),
        traerInformacionProductos();
}

function cancelarPopupProd2() {
    var overlay = document.getElementById("overlayprod2");
    var popup_prod = document.getElementById("popup_prod2");
    overlay.classList.remove('active');
    popup_prod.classList.remove('active');
    $("#reference").val(""),
        $("#category").val(""),
        $("#description").val(""),
        $("#availability").val(""),
        $("#price").val(""),
        $("#quantity").val(""),
        $("#photography").val(""),
        traerInformacionProductos();
}