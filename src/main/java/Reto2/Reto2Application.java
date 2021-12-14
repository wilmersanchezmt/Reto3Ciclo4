package Reto2;

import Reto2.interfaces.InterfaceChocolate;
import Reto2.interfaces.InterfaceUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

@Component
@SpringBootApplication
public class Reto2Application implements CommandLineRunner {

    @Autowired
    private InterfaceChocolate interfaceChocolate;
    @Autowired
    private InterfaceUser interfaceUser;
    
	public static void main(String[] args) {
		SpringApplication.run(Reto2Application.class, args);
	}

        @Override
        public void run(String... args) throws Exception{
        interfaceChocolate.deleteAll();
        interfaceUser.deleteAll();
        }
}
