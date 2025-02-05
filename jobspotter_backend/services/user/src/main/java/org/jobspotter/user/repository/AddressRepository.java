package org.jobspotter.user.repository;

import org.jobspotter.user.model.Address;
import org.jobspotter.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAllByUser(User user);
}
