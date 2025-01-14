package BackEnd.Repository.NewsRepositories;


import BackEnd.Entity.NewsEntities.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

public interface IFeedbackRepository extends JpaRepository<Feedback, Integer>, JpaSpecificationExecutor<Feedback> {

    @Query(value = "SELECT * FROM Feedback f WHERE f.orderId = :orderId ORDER BY f.createTime DESC LIMIT 1", nativeQuery = true)
    Feedback findNewestFeedbackByOrderId(@Param("orderId") String orderId);
}

