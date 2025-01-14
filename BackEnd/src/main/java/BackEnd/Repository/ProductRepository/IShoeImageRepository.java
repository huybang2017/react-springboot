package BackEnd.Repository.ProductRepository;

import BackEnd.Entity.ProductEntity.ShoeImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IShoeImageRepository extends JpaRepository<ShoeImage,  Integer>, JpaSpecificationExecutor<ShoeImage> {
    ShoeImage findTopByShoe_ShoeIdAndPriority(Integer shoeId, Boolean priority);
    ShoeImage findByShoeImageId( Integer shoeImageId);
    List<ShoeImage> findByShoe_shoeId( Integer shoeId);

    @Modifying
    @Query(value = "UPDATE ShoeImage SET Priority = false WHERE ShoeId = :shoeId", nativeQuery = true)
    int updateShoeImagePathByShoeIdAndPriorityTrue(@Param("shoeId") Integer shoeId);

}