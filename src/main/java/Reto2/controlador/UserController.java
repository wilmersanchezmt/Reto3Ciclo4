/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Reto2.controlador;
/**
* Area para las importacipones de las cales y librerias a usar
*/
import Reto2.modelo.User;
import Reto2.servicio.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * Indica que User Controller sera un servicio
 * @author Wilmer_Sánchez
 */
@RestController
/**
 * Registramos la URL base para acceso
 */
@RequestMapping ("/api/user")
/**
 * Permite realizar cualqueir tipo de peticion sin restriccion
 */
@CrossOrigin ("*")
/**
 * clase UserController
 */
public class UserController {
    /**
     * @Autowired instancia la clase UserService
     */
    @Autowired
    private UserService userService;
    /**
      * Metodo Get que permite mostrar todos los usuarios
      * return retorna todos los usuarios
     * @return  user
      */
    @GetMapping("/all")
    public List<User> getAll() {
        return userService.getAll();
    }
    /**
     * Metodo post para agregar un usuario
     * trae todos los parametros 
     * para crear el usuario
     * @param user vienen por url
     * @return user
     */
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@RequestBody User user) {
        return userService.create(user);
    }
    /**
     * Metodo Update para modificar un usuario
     * trae todos los parametros 
     * para crear el usuario
     * @param user vienen por url
     * @return user
     */
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public User update(@RequestBody User user) {
        return userService.update(user);
    }
    /**
     * Metodo Delete para eliminar un usario
     * param va atraves de la url
     * eliminar el usuario
     * @param id viene por url
     * @return user boorado
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id) {
        return userService.delete(id);
    }
    /**
     * Metodo Autenticar un usuario
     * param va atraves de la url
     * param que va atraves de la url
     * return el usuario autenticado con el email y password
     * @param email viene por url
     * @param password viene por url
     * @return  email y password
     */
    @GetMapping("/{email}/{password}")
    public User authenticateUser(@PathVariable("email") String email, @PathVariable("password") String password) {
        return userService.authenticateUser(email, password);
    }
    /**
     * Metodo Email exist para validar si esta un usuario
     * @param email que va atraves de la url
     * @return el usuario autenticado con el email y password
     */
    @GetMapping("/emailexist/{email}")
    public boolean emailExists(@PathVariable("email") String email) {
        return userService.emailExists(email);
    }
    /**
    * Fin de la clase UserController
    */
}
