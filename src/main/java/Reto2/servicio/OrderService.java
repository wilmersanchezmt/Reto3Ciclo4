package Reto2.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Reto2.modelo.Order;
import Reto2.repositorio.OrderRepositorio;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepositorio orderRepository;

    public List<Order> getAll() {
        return orderRepository.getAll();
    }

    public Optional<Order> getOrder(int id) {
        return orderRepository.getOrder(id);
    }

    public Order create(Order gadget) {
        if (gadget.getId() == null) {
            return gadget;
        } else {
            return orderRepository.create(gadget);
        }
    }

    public Order update(Order gadget) {

        if (gadget.getId() != null) {
            Optional<Order> orderDb = orderRepository.getOrder(gadget.getId());
            if (!orderDb.isEmpty()) {
                if (gadget.getStatus() != null) {
                    orderDb.get().setStatus(gadget.getStatus());
                }
                orderRepository.update(orderDb.get());
                return orderDb.get();
            } else {
                return gadget;
            }
        } else {
            return gadget;
        }
    }

    public boolean delete(int id) {
        Boolean aBoolean = getOrder(id).map(order -> {
            orderRepository.delete(order);
            return true;
        }).orElse(false);
        return aBoolean;
    }

    //Ordenes de pedido asociadas a los asesores de una zona
    public List<Order> findByZone(String zona) {
        return orderRepository.findByZone(zona);
    }

    public List<Order> ordersSalesManByDate(String dateStr, int id) {
        return orderRepository.ordersSalesManByDate(dateStr, id);
    }
    
    public List<Order> ordersSalesManByState(String state, Integer id) {
        return orderRepository.ordersSalesManByState(state, id);
    }
}
