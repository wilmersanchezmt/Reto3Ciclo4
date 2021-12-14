package Reto2.repositorio;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

// import javax.management.Query;
// import com.jayway.jsonpath.Criteria;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import Reto2.interfaces.InterfaceOrden;
import Reto2.modelo.Order;

@Repository
public class OrderRepositorio {
    @Autowired
        private InterfaceOrden interfaceOrden;
    
        @Autowired
        private MongoTemplate mongoTemplate;
    
        public List<Order> getAll() {
            return (List<Order>) interfaceOrden.findAll();
        }
    
        public InterfaceOrden getInterfaceOrden() {
            return interfaceOrden;
        }

        public void setInterfaceOrden(InterfaceOrden interfaceOrden) {
            this.interfaceOrden = interfaceOrden;
        }

        public Optional<Order> getOrder(int id) {
            return interfaceOrden.findById(id);
        }
    
        public Order create(Order order) {
            return interfaceOrden.save(order);
        }
    
        public void update(Order order) {
            interfaceOrden.save(order);
        }
    
        public void delete(Order order) {
            interfaceOrden.delete(order);
        }
    
        public List<Order> findByZone(String zona) {
            return interfaceOrden.findByZone(zona);
        }
    
        public List<Order> ordersSalesManByDate(String dateStr, Integer id) {
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    
            Query query = new Query();
            Criteria dateCriteria = Criteria.where("registerDay")
                    .gte(LocalDate.parse(dateStr, dtf).minusDays(1).atStartOfDay())
                    .lt(LocalDate.parse(dateStr, dtf).plusDays(2).atStartOfDay())
                    .and("salesMan.id").is(id);
    
            query.addCriteria(dateCriteria);
            List<Order> orders = mongoTemplate.find(query, Order.class);
    
            return orders;
        }
    
        public List<Order> ordersSalesManByState(String state, Integer id) {
    
            Query query = new Query();
            Criteria dateCriteria = Criteria.where("salesMan.id").is(id)
                    .and("status").is(state);
    
            query.addCriteria(dateCriteria);
            List<Order> orders = mongoTemplate.find(query, Order.class);
    
            return orders;
        }
}
