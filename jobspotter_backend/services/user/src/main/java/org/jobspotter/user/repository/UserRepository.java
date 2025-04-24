package org.jobspotter.user.repository;

import org.jobspotter.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


// This interface is a repository for the User model. It extends the JpaRepository interface,
// which provides methods for performing CRUD operations on the User model.

// This is kind off like a querry builder for the User model.So it offloads work.
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByUsernameAndEmail(String username, String email);

    User findByUserId(UUID userIdFromToken);

    List<User> findAllByUserIdIn(List<UUID> userIds);

    @Query("SELECT COUNT(u) FROM User u")
    Integer getUsersCount();
}
