/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package Reto2.interfaces;

import Reto2.modelo.User;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author Wilmer_Sánchez
 */
public interface InterfaceUser extends MongoRepository <User, Integer> {
Optional<User> findByEmail (String email);
Optional<User> findByEmailAndPassword (String email,String password);    
}
